import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverComponent } from './recover/recover.component';
import { UserCreatedComponent } from './message/user-created.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailMessageSend } from './message/verify-email-message-send.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ACCOUNTS_COMMON_DECLARATIONS } from './common/index';

export const ACCOUNTS_DECLARATIONS = [
    LoginComponent,
    SignupComponent,
    RecoverComponent,
    UserCreatedComponent,
    VerifyComponent,
    VerifyEmailComponent,
    VerifyEmailMessageSend,
    ResetPasswordComponent,
    ACCOUNTS_COMMON_DECLARATIONS
];