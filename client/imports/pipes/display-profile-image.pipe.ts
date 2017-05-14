import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '../../../both/collections/images.collection';

@Pipe({
    name: 'displayProfileImage'
})
export class DisplayProfileImagePipe implements PipeTransform {
    
    transform(imageId: string) {
        console.log(imageId);
        // set default imageUrl
        let imageUrl: string = 'img/icons/account_circle.png';
        // if there is an incoming imageId
        if (imageId && imageId.length > 0) {
            console.log("imageId sent");
            // yeah, there is an incoming imageId. get the image object
            const found = Images.findOne(imageId);
            console.log(found);
            // if there is a image with it
            if (found) {
                // assign its url to returned value
                imageUrl = found.url;
            }
        }
        // after all, return imageUrl
        return imageUrl;
    }
}