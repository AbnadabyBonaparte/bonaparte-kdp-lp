```js
// api/send-dossie.js
// Vercel Serverless Function — envia dossiê via Resend (CORRIGIDO)

// ==============================
// CONFIGURAÇÃO PRINCIPAL
// ==============================

const FROM_EMAIL =
  process.env.RESEND_FROM ||
  'Casa Bonaparte <dossie@envio.alshamglobal.com.br>';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// ==============================
// HANDLER
// ==============================

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, whatsapp } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  const leadName = typeof name === 'string' ? name.trim() : '';
  const leadWhatsapp = typeof whatsapp === 'string' ? whatsapp.trim() : '';

  const resendHeaders = {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'bonaparte-kdp-lp/1.0',
  };

  const DOSSIE_URL =
    'https://bonaparte-kdp-lp.vercel.app/dossie-casa-bonaparte.pdf';

  try {
    // ==============================
    // EMAIL PARA LEAD
    // ==============================
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: resendHeaders,
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Seu Dossiê Introdutório — Casa Bonaparte',
        html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0e14;color:#e8e6e1;font-family:sans-serif;">
  <div style="max-width:560px;margin:auto;padding:40px 20px;text-align:center;">
    
    <p style="color:#c8a96e;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
      Casa Bonaparte
    </p>

    <h1 style="font-size:22px;">
      Dossiê Introdutório
    </h1>

    <p style="color:#9a9890;font-size:15px;">
      Você solicitou o dossiê da Cartografia da Soberania Interior.
    </p>

    <p style="color:#9a9890;font-size:15px;">
      Três ensaios diretos. Sem distração. Sem promessa.
    </p>

    <a href="${DOSSIE_URL}"
      style="display:inline-block;background:#c8a96e;color:#0b0e14;
      padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;">
      ACESSAR O DOSSIÊ
    </a>

    <p style="margin-top:30px;font-size:13px;color:#9a9890;">
      <a href="https://www.amazon.com.br/Cartografia-Soberania-Interior-Arquitetura-existencial-ebook/dp/B0GWSPPB82/"
      style="color:#c8a96e;text-decoration:none;">
      Ver a obra completa na Amazon
      </a>
    </p>

    <p style="font-size:11px;color:#5a5850;margin-top:30px;">
      Abnadaby Bonaparte · Casa Bonaparte
    </p>

  </div>
</body>
</html>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend error:', errorData);
      return res.status(500).json({ error: 'Falha ao enviar email' });
    }

    const data = await response.json();

    // ==============================
    // NOTIFICAÇÃO ADMIN
    // ==============================
    const leadNotify =
      process.env.LEAD_NOTIFY_EMAIL ||
      'abnadabybonaparte@gmail.com';

    const notifyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: resendHeaders,
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: leadNotify,
        subject: `Novo lead: ${email}`,
        text: `
Novo lead capturado

Nome: ${leadName || '-'}
Email: ${email}
WhatsApp: ${leadWhatsapp || '-'}
        `,
      }),
    });

    if (!notifyRes.ok) {
      const err = await notifyRes.text();
      console.error('Notify error:', err);
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
```
