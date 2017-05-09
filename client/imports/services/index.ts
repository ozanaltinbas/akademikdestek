import { AccountsService } from './accounts.service';
import { CurrentUser } from './currentUser.service';
import { LanguageService } from './language.service';
import { AvatarService } from './avatar.service';
import { DisplayProfileImagePipe } from './display-profile-image.pipe';

export const SERVICES_DECLARATIONS: any[] = [
    AccountsService,
    CurrentUser,
    LanguageService,
    AvatarService,
    DisplayProfileImagePipe
]
