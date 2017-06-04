export function startSmtpConfiguration() : void {
    /*let smtp = {
        port: 587,
        username: 'academikdestek@gmail.com',
        password: '1244244Ha',
        server:   'smtp.gmail.com'
    }
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    */
    process.env.MAIL_URL = "smtp://postmaster@akademikdestek.online:6f54f2d89427153f9b953e07930e714a@smtp.mailgun.org:587";
}