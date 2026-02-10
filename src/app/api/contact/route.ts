import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';
import { sendContactEmail } from '@/lib/email';

interface ContactFormRequest {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const supabase = createServerSupabase();

        // Parse request body
        const body: ContactFormRequest = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.phone || !body.message) {
            return NextResponse.json(
                { error: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Get recipient email from configuration
        const { data: configData, error: configError } = await supabase
            .from('app_config')
            .select('value')
            .eq('key', 'form_recipient_email')
            .single();

        if (configError) {
            console.error('Error fetching recipient email:', configError);
        }

        const recipientEmail = configData?.value || '';

        // Store message in database
        const { data: messageData, error: dbError } = await supabase
            .from('contact_messages')
            .insert({
                name: body.name,
                email: body.email,
                phone: body.phone,
                message: body.message,
                email_sent: false,
            })
            .select()
            .single();

        if (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json(
                { error: 'Error al guardar el mensaje. Por favor intenta de nuevo.' },
                { status: 500 }
            );
        }

        // Send email if recipient is configured
        let emailSent = false;
        let emailError = null;

        if (recipientEmail && recipientEmail.trim() !== '') {
            const result = await sendContactEmail(
                {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    message: body.message,
                },
                recipientEmail
            );

            emailSent = result.success;
            emailError = result.error || null;

            // Update message with email status
            await supabase
                .from('contact_messages')
                .update({
                    email_sent: emailSent,
                    email_error: emailError,
                })
                .eq('id', messageData.id);
        } else {
            // No recipient configured
            emailError = 'No recipient email configured';
            await supabase
                .from('contact_messages')
                .update({
                    email_sent: false,
                    email_error: emailError,
                })
                .eq('id', messageData.id);
        }

        // Return success even if email fails (message is still saved)
        return NextResponse.json({
            success: true,
            message: 'Tu mensaje ha sido recibido. Te contactaremos pronto.',
            emailSent,
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            {
                error: 'Error al procesar tu mensaje. Por favor intenta de nuevo.',
            },
            { status: 500 }
        );
    }
}
