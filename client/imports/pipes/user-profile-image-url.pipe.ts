import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '../../../both/collections/images.collection';

@Pipe({
    name: 'userProfileImageUrl'
})
export class UserProfileImageUrlPipe implements PipeTransform {
    transform(userId: string) {
        console.log(userId);
        console.log("1");
        // if no usedId is sent
        if (!userId) {
            // return it.
            return;
        }
        console.log("2");
        // initialize imageId and imageUrl variables
        const defaultImageUrl: string = 'img/icons/account_circle.png';
        console.log("3");
        let imageId:string = '';
        // get the user
        console.log("4");
        let user = Meteor.users.findOne({_id: userId}, {fields: {profile: 1}});
        // if there is a user with profile.image.url
        console.log("5");
        if (user && user.profile && user.profile.imageId && user.profile.imageId.length > 0) {
            // get the imageId
            console.log("6");
            imageId = user.profile.imageId;
        }
        console.log("7");
        // if there is not image id returned
        if (!imageId) {
            console.log("8");
            // return custom account_circle
            return defaultImageUrl;
        }
        console.log("9");
        // lets get image with the imageId
        const found = Images.findOne(imageId);
        // yep. there is an existing image
        console.log("10");
        if (found) {
            console.log("11");
            // assign url as returned valeu
            return found.url;
        }
        console.log("12");
        // return assigned imageUrl
        return defaultImageUrl;
    }
}
