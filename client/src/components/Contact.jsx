import { useState } from 'react';
import { sendMessage } from '../api';

const INTERESTS = [
  'Z Crew App',
  'Z Booking',
  'Parcel Shop',
  'Z Management Hub',
  'Z REST POS',
  'Zerion ERP',
  'Custom software',
  'General enquiry',
];

const initialForm = {
  name: '',
  email: '',
  organisation: '',
  interest: 'Z Crew App',
  message: '',
};

export default function Contact({ profile }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const companyUrl = profile?.companyUrl || 'https://zerion-website-frontend.vercel.app/';
  const contactUrl = `${companyUrl.replace(/\/$/, '')}/#contact`;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const result = await sendMessage(form);
      setStatus({ type: 'success', text: result.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-rule">
          <p className="section-label">Contact</p>
          <span className="section-line" aria-hidden="true" />
        </div>
        <h2 className="section-title">Reach me</h2>
        <p className="section-lead">
          Same enquiry channel as{' '}
          <a className="text-link" href={contactUrl} target="_blank" rel="noreferrer">
            Zerion’s contact form
          </a>
          .
        </p>

        <div className="contact-shell">
          <aside className="contact-details">
            <a href="mailto:zeriontechsys@gmail.com">zeriontechsys@gmail.com</a>
            <a href="tel:+254797192401">0797 192 401</a>
            <a href={`mailto:${profile?.email}`}>{profile?.email}</a>
            <a href={profile?.github} target="_blank" rel="noreferrer">
              {profile?.github || 'https://github.com/Latty770'}
            </a>
            <a href={profile?.linkedin} target="_blank" rel="noreferrer">
              {profile?.linkedin || 'https://www.linkedin.com/in/reagan-munene'}
            </a>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label>
                Full name
                <input name="name" value={form.name} onChange={updateField} required minLength={2} />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={updateField} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Organisation
                <input name="organisation" value={form.organisation} onChange={updateField} />
              </label>
              <label>
                Interest
                <select name="interest" value={form.interest} onChange={updateField}>
                  {INTERESTS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Message
              <textarea name="message" rows={5} value={form.message} onChange={updateField} required minLength={10} />
            </label>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send enquiry'}
            </button>
            {status.text ? <p className={`form-status ${status.type}`}>{status.text}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
