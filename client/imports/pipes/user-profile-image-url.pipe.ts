import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '../../../both/collections/images.collection';

@Pipe({
    name: 'userProfileImageUrl'
})
export class UserProfileImageUrlPipe implements PipeTransform {
    transform(userId: string) {
        if (!userId) {
            return;
        }

        let imageId: string = '';

        let user = Meteor.users.findOne({ _id : userId }, { fields: { profile : 1 } });

        if (user && user.profile && user.profile.image && user.profile.image.url) {
            imageId = user.profile.image.url;
        }

        if (!imageId) {
            return 'img/icons/account_circle.png';;
        }

        const found = Images.findOne(imageId);

        if (found) {
            imageUrl = found.url;
        }

        return imageUrl;
    }
}