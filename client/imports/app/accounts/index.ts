import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverComponent } from './recover/recover.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ACCOUNTS_COMMON_DECLARATIONS } from './common/index';

export const ACCOUNTS_DECLARATIONS = [
    LoginComponent,
    SignupComponent,
    RecoverComponent,
    VerifyComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    ACCOUNTS_COMMON_DECLARATIONS
];