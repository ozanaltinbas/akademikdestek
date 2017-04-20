import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = "AkademikDestek";
Accounts.emailTemplates.from     = "AkademikDestek <academikdestek@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "[AkademikDestek] E-Posta Adresinizi Doğrulayın";
    },
    text( user, url ) {
        let emailAddress   = user.emails[0].address,
            urlWithoutHash = url.replace( '#/', '' ),
            supportEmail   = "academikdestek@gmail.com",
            emailBody      = `Mail adresinizi (${emailAddress}) doğrulamak için \n\n${urlWithoutHash}\n\n linkini tıklanıyınız. Eğer bu onay mailini siz talep etmediyseniz, lütfen bu postayı görmezden gelin. Eğer yanlış gittiğini düşündüğünüz herhangi birşey olursa, lütfen bizimle iletişime geçin: ${supportEmail}.`;

        return emailBody;
    }
};

Accounts.emailTemplates.resetPassword = {
    subject() {
        return "[AkademikDestek] Şifrenizi Yenileyin";
    },
    text( user, url ) {
        let urlWithoutHash = url.replace( '#/', '' ),
            supportEmail   = "academikdestek@gmail.com",
            emailBody      = `Şifrenizi yenilemek için \n\n${urlWithoutHash}\n\n linkini tıklanıyınız. Eğer bu onay mailini siz talep etmediyseniz, lütfen bu postayı görmezden gelin. Eğer yanlış gittiğini düşündüğünüz herhangi birşey olursa, lütfen bizimle iletişime geçin: ${supportEmail}.`;

        return emailBody;
    }
};