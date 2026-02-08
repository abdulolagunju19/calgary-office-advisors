export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body;

  // Validate required fields
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Check for API key
  const apiKey = process.env.MAILERSEND_API_KEY;
  if (!apiKey) {
    console.error('MAILERSEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Construct email body
  const emailBody = `
New Contact Form Submission

From: ${name || 'Not provided'}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
  `.trim();

  // Construct HTML email body
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #102a43; color: #c9a227; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #102a43; }
    .value { margin-top: 5px; }
    .message-box { background-color: #fff; padding: 15px; border-left: 4px solid #c9a227; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From:</div>
        <div class="value">${name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Company:</div>
        <div class="value">${company || 'Not provided'}</div>
      </div>
      <div class="message-box">
        <div class="label">Message:</div>
        <div class="value">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: {
          email: 'noreply@test-eqvygm09ee5l0p7w.mlsender.net', // Must be a verified domain in MailerSend
          name: name || 'Contact Form',
        },
        to: [
          {
            email: 'abdulsamad.olagunju1@gmail.com',
            name: 'Abdul-Samad Olagunju',
          },
        ],
        reply_to: {
          email: email,
          name: name || 'Contact Form Submitter',
        },
        subject: 'New Contact Form Submission',
        text: emailBody,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('MailerSend API error:', response.status, errorData);
      return res.status(500).json({ 
        error: 'Failed to send email. Please try again later.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }
}
