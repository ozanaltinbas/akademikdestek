import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription, Observable } from "rxjs";
import { MeteorObservable } from "meteor-rxjs";
import { Meteor } from 'meteor/meteor';

import { upload } from '../../../../../both/methods/images.methods';
import '../../../../../both/methods/user.methods';
import { Thumb } from "../../../../../both/models/image.model";
import { Thumbs } from "../../../../../both/collections/images.collection";

import template from './profile-image-update.component.html';
import style from './profile-image-update.component.scss';

@Component({
    selector: 'profile-image-update',
    template,
    styles: [ style ]
})
export class ProfileImageComponent implements OnInit {

    fileIsOver: boolean = false;
    uploading: boolean = false;
    filesArray: string[] = [];
    files: Subject<string[]> = new Subject<string[]>();
    thumbsSubscription: Subscription;
    thumbs: Observable<Thumb[]>;

    constructor() {}

    ngOnInit() {
        this.files.subscribe((filesArray) => {
            MeteorObservable.autorun().subscribe(() => {
                if (this.thumbsSubscription) {
                    this.thumbsSubscription.unsubscribe();
                    this.thumbsSubscription = undefined;
                }

                this.thumbsSubscription = MeteorObservable.subscribe("thumbs", filesArray).subscribe(() => {
                    this.thumbs = Thumbs.find({
                        originalStore: 'images',
                        originalId: {
                            $in: filesArray
                        }
                    }).zone();
                });
            });
        });
    }

    fileOver(fileIsOver: boolean): void {
        this.fileIsOver = fileIsOver;
    }

    onFileDrop(file: File): void {
        this.uploading = true;

        upload(file)
            .then((result) => {
                this.uploading = false;
                this.addFile(result);
                console.log(result);

                MeteorObservable.call('updateProfileImageId', Meteor.userId(), result._id).subscribe(() => {
                    // update success message
                    alert('success');
                }, (error) => {
                    alert('error');
                });
                
            })
            .catch((error) => {
                this.uploading = false;
                console.log(`Something went wrong!`, error);
            });
    }

    addFile(file) {
        this.filesArray.push(file._id);
        this.files.next(this.filesArray);
    }

    reset() {
        this.filesArray = [];
        this.files.next(this.filesArray);
    }

}