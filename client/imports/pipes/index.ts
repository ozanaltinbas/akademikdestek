import { DisplayNamePipe } from './display-name.pipe';
import { DisplayProfileImagePipe } from './display-profile-image.pipe';
import { UserProfileImageUrlPipe } from './user-profile-image-url.pipe';

export const PIPE_DECLARATIONS: any[] = [
    DisplayNamePipe,
    DisplayProfileImagePipe,
    UserProfileImageUrlPipe
];
