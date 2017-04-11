import { ProfileComponent } from './profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileUpdateSuccessComponent } from './profile-update/message/profile-update-success.component';
import { ProfileUpdateFailComponent } from './profile-update/message/profile-update-fail.component';

export const PROFILE_DECLARATIONS = [
    ProfileComponent,
    ProfileUpdateComponent,
    ProfileUpdateSuccessComponent,
    ProfileUpdateFailComponent
];