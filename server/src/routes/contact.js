import { Router } from 'express';
import { getSupabase } from '../lib/supabase.js';

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZERION_ENQUIRY_URL =
  process.env.ZERION_ENQUIRY_URL ||
  'https://zerion-website-frontend.vercel.app/api/enquiry';

function validateContact({ name, email, message }) {
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  if (!email || typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.');
  }

  return errors;
}

async function forwardToZerion({ name, email, organisation, interest, message }) {
  const response = await fetch(ZERION_ENQUIRY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      subject: `Portfolio enquiry - ${interest} - ${name}`,
      details: {
        Type: 'Portfolio reach me',
        Name: name,
        Email: email,
        Organisation: organisation || '—',
        Interest: interest,
        Message: message,
        Source: 'https://reaganmunene.netlify.app / portfolio contact form',
      },
    }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(
      data.message ||
        'Could not reach the Zerion enquiry inbox. Email zeriontechsys@gmail.com or call 0797 192 401.',
    );
    error.status = response.status;
    throw error;
  }
}

router.post('/', async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const organisation = String(req.body?.organisation ?? '').trim();
  const interest = String(req.body?.interest ?? 'General enquiry').trim() || 'General enquiry';
  const message = String(req.body?.message ?? '').trim();

  const errors = validateContact({ name, email, message });
  if (errors.length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  try {
    await forwardToZerion({ name, email, organisation, interest, message });
  } catch (error) {
    console.error('Zerion enquiry forward failed:', error.message);
    return res.status(error.status || 502).json({
      ok: false,
      errors: [error.message],
    });
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from('messages').insert({
      name,
      email,
      message: `[${interest}] ${organisation ? `${organisation} — ` : ''}${message}`,
    });

    if (error) {
      console.error('Supabase insert failed after Zerion send:', error.message);
    }
  }

  return res.status(201).json({
    ok: true,
    message: 'Enquiry sent to Zerion. We will reply to the email you provided.',
  });
});

export default router;
