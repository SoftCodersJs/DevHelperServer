import 'dotenv/config';

export default function templateEmail(url: string, name: string, token: string) {
    return `
        <p style="color: #000;">Ola! ${name} Parece que você esqueceu sua senha<p/>
        <p style="color: #000;">Use o link esse para recuperar sua conta
            <a href="${process.env.SITE_BASE_URL}/${token}">Visit W3Schools.com!</a>
        <p/>
    `
}