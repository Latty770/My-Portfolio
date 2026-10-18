const ZERION_ENQUIRY_URL =
  process.env.ZERION_ENQUIRY_URL ||
  'https://zerion-website-frontend.vercel.app/api/enquiry';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {});
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, errors: ['Method not allowed.'] });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { ok: false, errors: ['Invalid JSON body.'] });
  }

  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim().toLowerCase();
  const organisation = String(payload.organisation || '').trim();
  const interest = String(payload.interest || 'General enquiry').trim() || 'General enquiry';
  const message = String(payload.message || '').trim();

  const errors = [];
  if (name.length < 2) errors.push('Name must be at least 2 characters.');
  if (!EMAIL_PATTERN.test(email)) errors.push('A valid email address is required.');
  if (message.length < 10) errors.push('Message must be at least 10 characters.');
  if (errors.length) return json(400, { ok: false, errors });

  try {
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
          Source: 'Netlify portfolio contact form',
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
      return json(response.status || 502, {
        ok: false,
        errors: [
          data.message ||
            'Could not reach the Zerion enquiry inbox. Email zeriontechsys@gmail.com or call 0797 192 401.',
        ],
      });
    }

    return json(201, {
      ok: true,
      message: 'Enquiry sent to Zerion. We will reply to the email you provided.',
    });
  } catch (error) {
    return json(502, {
      ok: false,
      errors: [error.message || 'Unexpected error forwarding enquiry.'],
    });
  }
};
