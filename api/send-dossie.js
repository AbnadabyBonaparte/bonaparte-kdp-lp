export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, name } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Configuração incompleta' });
  }

  const DOSSIE_URL = 'https://bonaparte-kdp-lp.vercel.app/dossie-casa-bonaparte.pdf';
  const AMAZON_URL = 'https://www.amazon.com.br/Cartografia-Soberania-Interior-Arquitetura-existencial-ebook/dp/B0GWSPPB82/';

  // Fallback ativo enquanto DNS do domínio próprio não propagar
  const FROM_EMAIL = process.env.RESEND_FROM || 'Casa Bonaparte <onboarding@resend.dev>';

  try {
    // 1. Enviar dossiê para o lead
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Seu Dossiê Introdutório — Casa Bonaparte',
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0b0e14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0e14;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:0 0 32px 0;text-align:center;">
  <p style="color:#c8a96e;font-size:11px;letter-spacing:3px;margin:0 0 8px 0;text-transform:uppercase;">Casa Bonaparte</p>
  <h1 style="color:#e8e6e1;font-size:22px;font-weight:600;margin:0;line-height:1.3;">Dossiê Introdutório</h1>
</td></tr>
<tr><td style="padding:0 0 32px 0;"><hr style="border:none;border-top:1px solid #2a2d35;margin:0;"></td></tr>
<tr><td style="color:#9a9890;font-size:15px;line-height:1.7;padding:0 0 24px 0;">
  ${name ? `${name}, v` : 'V'}ocê solicitou o Dossiê Introdutório da <strong style="color:#e8e6e1;">Cartografia da Soberania Interior</strong>.
</td></tr>
<tr><td style="color:#9a9890;font-size:15px;line-height:1.7;padding:0 0 32px 0;">
  Três ensaios sobre o que funciona contra você enquanto você funciona bem. Texto autônomo, denso, sem teaser. Se fizer sentido, o livro existe. Se não, o que está aqui já é seu.
</td></tr>
<tr><td align="center" style="padding:0 0 24px 0;">
  <a href="${DOSSIE_URL}" style="display:inline-block;background-color:#c8a96e;color:#0b0e14;font-size:14px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:6px;letter-spacing:0.5px;">
    ACESSAR O DOSSIÊ
  </a>
</td></tr>
<tr><td align="center" style="padding:0 0 20px 0;">
  <p style="color:#9a9890;font-size:14px;text-align:center;margin:0 0 12px 0;">
    Se o que você leu fez sentido, a obra completa está disponível.
  </p>
</td></tr>
<tr><td align="center" style="padding:0 0 40px 0;">
  <a href="${AMAZON_URL}" style="display:inline-block;background-color:#0b0e14;color:#c8a96e;font-size:13px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:6px;border:1px solid #c8a96e;">
    VER A OBRA COMPLETA
  </a>
</td></tr>
<tr><td style="padding:0 0 24px 0;"><hr style="border:none;border-top:1px solid #2a2d35;margin:0;"></td></tr>
<tr><td style="color:#9a9890;font-size:13px;line-height:1.6;padding:0 0 24px 0;text-align:center;">
  Sem pop-up. Sem escassez. Sem pressa.
</td></tr>
<tr><td style="color:#5a5850;font-size:11px;text-align:center;padding:16px 0 0 0;">
  Abnadaby Bonaparte · 12 livros publicados<br>
  Este email foi enviado porque você solicitou o dossiê em casabonaparte.com
</td></tr>
</table></td></tr></table></body></html>`,
      }),
    });

    if (!emailResponse.ok) {
      const err = await emailResponse.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Falha ao enviar email' });
    }

    // 2. Notificar admin (opcional — se ADMIN_EMAIL estiver setado)
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (ADMIN_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `Novo lead: ${email}`,
          html: `<p><strong>Novo lead Casa Bonaparte</strong></p>
<p>Email: ${email}</p>
${name ? `<p>Nome: ${name}</p>` : ''}
<p>Data: ${new Date().toISOString()}</p>`,
        }),
      }).catch(e => console.error('Admin notify error:', e));
    }

    const data = await emailResponse.json();
    return res.status(200).json({ success: true, id: data.id });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
