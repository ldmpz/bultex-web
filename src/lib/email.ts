import nodemailer from 'nodemailer';

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

// Create SMTP transporter
function createTransporter() {
    // Validate required environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('SMTP configuration is missing. Please configure SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local');
    }

    const port = parseInt(process.env.SMTP_PORT || '465');
    const secure = port === 465; // true for 465, false for other ports

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: secure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        // For debugging
        debug: process.env.NODE_ENV === 'development',
        logger: process.env.NODE_ENV === 'development',
    });
}

export async function sendContactEmail(
    data: ContactFormData,
    recipientEmail: string
): Promise<{ success: boolean; error?: string }> {
    try {
        if (!recipientEmail) {
            throw new Error('Recipient email is not configured');
        }

        const transporter = createTransporter();

        // Email HTML template
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #f8fafc;
            padding: 30px;
            border: 1px solid #e2e8f0;
            border-top: none;
        }
        .field {
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #3b82f6;
        }
        .label {
            font-weight: bold;
            color: #1e3a8a;
            text-transform: uppercase;
            font-size: 12px;
            margin-bottom: 5px;
        }
        .value {
            color: #334155;
            font-size: 16px;
        }
        .message-box {
            background: white;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            color: #64748b;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📧 Nuevo Mensaje de Contacto</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Recibido desde el formulario web de BULTEX</p>
    </div>
    
    <div class="content">
        <div class="field">
            <div class="label">Nombre</div>
            <div class="value">${data.name}</div>
        </div>
        
        <div class="field">
            <div class="label">Email</div>
            <div class="value">
                <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
                    ${data.email}
                </a>
            </div>
        </div>
        
        <div class="field">
            <div class="label">Teléfono</div>
            <div class="value">
                <a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">
                    ${data.phone}
                </a>
            </div>
        </div>
        
        <div class="field">
            <div class="label">Mensaje</div>
            <div class="message-box">${data.message}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Este mensaje fue enviado desde el formulario de contacto de BULTEX</p>
        <p style="margin-top: 5px;">
            Puedes responder directamente a este correo para contactar al cliente
        </p>
    </div>
</body>
</html>
        `;

        // Get FROM email from env or use SMTP_USER
        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
        const fromName = process.env.SMTP_FROM_NAME || 'BULTEX';

        // Send email
        const info = await transporter.sendMail({
            from: `${fromName} <${fromEmail}>`,
            to: recipientEmail,
            replyTo: data.email,
            subject: `Nuevo mensaje de contacto de ${data.name}`,
            html: htmlContent,
        });

        console.log('Email sent successfully:', info.messageId);
        return { success: true };

    } catch (error) {
        console.error('Email sending error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
