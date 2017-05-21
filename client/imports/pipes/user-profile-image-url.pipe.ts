import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '../../../both/collections/images.collection';

@Pipe({
    name: 'userProfileImageUrl'
})
export class UserProfileImageUrlPipe implements PipeTransform {
    transform(userId: string) {
        // if no usedId is sent
        if (!userId) {
            // return it.
            return;
        }
        // initialize imageId and imageUrl variables
        const defaultImageUrl: string = 'img/icons/account_circle.png';
        let imageId:string = '';
        // get the user
        let user = Meteor.users.findOne({_id: userId}, {fields: {profile: 1}});
        // if there is a user with profile.image.url
        if (user && user.profile && user.profile.imageId && user.profile.imageId.length > 0) {
            // get the imageId
            imageId = user.profile.imageId;
        }
        // if there is not image id returned
        if (!imageId) {
            // return custom account_circle
            return defaultImageUrl;
        }
        // lets get image with the imageId
        const found = Images.findOne(imageId);
        // yep. there is an existing image
        if (found) {
            // assign url as returned valeu
            return found.url;
        }
        // return assigned imageUrl
        return defaultImageUrl;
    }
}
