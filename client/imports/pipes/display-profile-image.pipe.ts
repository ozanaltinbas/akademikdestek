import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '../../../both/collections/images.collection';

@Pipe({
    name: 'displayProfileImage'
})
export class DisplayProfileImagePipe implements PipeTransform {
    transform(imageId: string) {
        if (!imageId) {
            return;
        }

        let imageUrl: string = 'img/icons/account_circle.png';

        const found = Images.findOne(imageId);

        if (found) {
            imageUrl = found.url;
        }

        return imageUrl;
    }
}