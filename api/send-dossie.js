// api/send-dossie.js
// Vercel Serverless Function — receives email (+ nome/whatsapp), envia dossiê via Resend.
// Notificação de lead (texto): por defeito abnadabybonaparte@gmail.com;
// opcional: LEAD_NOTIFY_EMAIL para outro destinatário.

export default async function handler(req, res) {
  // CORS headers
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

  const leadName = typeof name === 'string' ? name.trim() : '';
  const leadWhatsapp = typeof whatsapp === 'string' ? whatsapp.trim() : '';

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  // Resend exige User-Agent em pedidos HTTP diretos (sem SDK); sem isto devolve 403 / 1010.
  const resendHeaders = {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'bonaparte-kdp-lp/1.0 (https://github.com/AbnadabyBonaparte/bonaparte-kdp-lp)',
  };

  // URL do dossiê (hosted in public/)
  const DOSSIE_URL = 'https://bonaparte-kdp-lp.vercel.app/dossie-casa-bonaparte.pdf';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: resendHeaders,
      body: JSON.stringify({
        from: 'Casa Bonaparte <onboarding@resend.dev>',
        to: email,
        subject: 'Seu Dossiê Introdutório — Casa Bonaparte',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0b0e14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0e14;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
          
          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;text-align:center;">
              <p style="color:#c8a96e;font-size:11px;letter-spacing:3px;margin:0 0 8px 0;text-transform:uppercase;">
                Casa Bonaparte
              </p>
              <h1 style="color:#e8e6e1;font-size:22px;font-weight:600;margin:0;line-height:1.3;">
                Dossiê Introdutório
              </h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 0 32px 0;">
              <hr style="border:none;border-top:1px solid #2a2d35;margin:0;">
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="color:#9a9890;font-size:15px;line-height:1.7;padding:0 0 24px 0;">
              Você solicitou o Dossiê Introdutório da <strong style="color:#e8e6e1;">Cartografia da Soberania Interior</strong>.
            </td>
          </tr>

          <tr>
            <td style="color:#9a9890;font-size:15px;line-height:1.7;padding:0 0 32px 0;">
              Três ensaios sobre o que funciona contra você enquanto você funciona bem. Texto autônomo, denso, sem teaser. Se fizer sentido, o livro existe. Se não, o que está aqui já é seu.
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:0 0 40px 0;">
              <a href="${DOSSIE_URL}" 
                 style="display:inline-block;background-color:#c8a96e;color:#0b0e14;font-size:14px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:6px;letter-spacing:0.5px;">
                ACESSAR O DOSSIÊ
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 0 24px 0;">
              <hr style="border:none;border-top:1px solid #2a2d35;margin:0;">
            </td>
          </tr>

          <!-- Book link -->
          <tr>
            <td style="color:#9a9890;font-size:13px;line-height:1.6;padding:0 0 24px 0;text-align:center;">
              <em>Cartografia da Soberania Interior</em> está disponível na 
              <a href="https://www.amazon.com.br/Cartografia-Soberania-Interior-Arquitetura-existencial-ebook/dp/B0GWSPPB82/" 
                 style="color:#c8a96e;text-decoration:none;">Amazon</a>.
              <br>Sem pop-up. Sem escassez. Sem pressa.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="color:#5a5850;font-size:11px;text-align:center;padding:16px 0 0 0;">
              Abnadaby Bonaparte · 12 livros publicados
              <br>Este email foi enviado porque você solicitou o dossiê em casabonaparte.com
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return res.status(500).json({ error: 'Falha ao enviar email' });
    }

    const data = await response.json();

    const leadNotify =
      process.env.LEAD_NOTIFY_EMAIL || 'abnadabybonaparte@gmail.com';
    const leadSummary = [
      'Novo lead — Dossiê Casa Bonaparte',
      `Nome: ${leadName || '—'}`,
      `E-mail: ${email}`,
      `WhatsApp: ${leadWhatsapp || '—'}`,
    ].join('\n');

    try {
      const notifyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: resendHeaders,
        body: JSON.stringify({
          from: 'Casa Bonaparte <onboarding@resend.dev>',
          to: leadNotify,
          subject: `Lead dossiê: ${email}`,
          text: leadSummary,
        }),
      });
      if (!notifyRes.ok) {
        const errBody = await notifyRes.text();
        console.error('Lead notify email rejected:', notifyRes.status, errBody);
      }
    } catch (notifyErr) {
      console.error('Lead notify email failed:', notifyErr);
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
