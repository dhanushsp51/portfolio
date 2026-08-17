/* Simple Express server to forward contact form to email using Nodemailer
   Requires environment variables:
   - GMAIL_USER (email address to send from, e.g., your Gmail)
   - GMAIL_PASS (app password or SMTP password)

   Run: node server.js
*/

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/api/send', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  const user = process.env.GMAIL_USER || 'dhanushsp89@gmail.com';
  const pass = process.env.GMAIL_PASS;

  if (!pass) {
    return res.status(500).json({ ok: false, error: 'SMTP credentials not configured on server. Set GMAIL_PASS in environment.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    });

    const mail = {
      from: `"${name}" <${email}>`,
      to: user,
      subject: subject || `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '-'}\n\n${message}`,
    };

    const info = await transporter.sendMail(mail);
    console.log('Email sent', info.messageId);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Email send error', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server listening on http://localhost:${PORT}`);
});