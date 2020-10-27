import { send, setApiKey } from '@sendgrid/mail';

interface EmailMessage {
    to: string, // Change to your recipient
    from: string, // Change to your verified sender
    subject: string,
    text: string,
    html: string,
}

class EmailService {
    async index( to: string, text: string, html: string) {
        setApiKey(process.env.API_KEY_EMAIL);
        const msg = {
            to: to, // Change to your recipient
            from: process.env.EMAIL, // Change to your verified sender
            subject: 'recuperção de senha DevHelpJS',
            text: html,
            html: html,
        } as EmailMessage;

        await send(msg);
    }
}

export default EmailService;