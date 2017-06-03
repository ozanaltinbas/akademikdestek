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
        let user = Meteor.users.findOne({_id: userId}, {fields: {"profile": 1, "services.twitter.profile_image_url" : 1,
            "services.facebook.profile_image_url" : 1, "services.instagram.profile_image_url" : 1,
            "services.google.profile_image_url" : 1}});
        // if there is a user with profile.image.url
        if (user && user.profile && user.profile.imageId && user.profile.imageId.length > 0) {
            // get the imageId
            imageId = user.profile.imageId;
            // lets get image with the imageId
            const found = Images.findOne(imageId);
            // yep. there is an existing image
            if (found) {
                // assign url as returned valeu
                return found.url;
            }
        }
        // twitter image url
        if (user.services && user.services.twitter && user.services.twitter.profile_image_url) {
            // return image
            return user.services.twitter.profile_image_url;
        }
        // facebook image url
        if (user.services && user.services.facebook && user.services.facebook.profile_image_url) {
            // return image
            return user.services.facebook.profile_image_url;
        }
        // google image url
        if (user.services && user.services.google && user.services.google.profile_image_url) {
            // return image
            return user.services.google.profile_image_url;
        }
        // instagram image url
        if (user.services && user.services.instagram && user.services.instagram.profile_image_url) {
            // return image
            return user.services.instagram.profile_image_url;
        }
        // if there is not image id returned
        if (!imageId) {
            // return custom account_circle
            return defaultImageUrl;
        }

        // return assigned imageUrl
        return defaultImageUrl;
    }
}
