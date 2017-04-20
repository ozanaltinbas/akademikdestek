import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";

import '../../../../../both/methods/blog.methods.ts';

import template from './blog-entry.component.html';
import style from './blog-entry.component.scss';

@Component({
    selector: 'blog-entry',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class BlogEntryComponent implements OnInit, OnDestroy {

    blogForm: FormGroup;
    user: Meteor.User;
    onProgress: boolean = false;

    constructor(private formBuilder:FormBuilder) {

    }

    ngOnInit() {
        this.initializeBlogEntryForm();
        this.initEditor();
    }

    ngAfterViewInit(): void {

    }

    initializeBlogEntryForm() : void {
        // initialize blog form
        this.blogForm = this.formBuilder.group({
            title: ['', Validators.required],
            subtitle: ['', Validators.required]
        });
    }

    insertBlog(event) {
        // prevent default event.
        event.preventDefault();
        // get the value.
        let content = $('div#froala-editor').froalaEditor('html.get');
        // if the blog form is valid,
        if (this.blogForm.valid && content && content.length > 0) {
            // set as on progress
            this.onProgress = true;
            // send the mail.
            MeteorObservable.call('insertBlog', this.blogForm.value.title, this.blogForm.value.subtitle, content, this.user._id).subscribe(() => {
                // mail successfully sent.
                this.initializeBlogEntryForm();
                this.onProgress = false;
            }, (error) => {
                console.log(error);
                this.onProgress = false;
            });
        }
    }

    initEditor() {
        $(function() {
            $.FroalaEditor.RegisterCommand('clear', {
                title: 'Clear HTML',
                focus: false,
                undo: true,
                refreshAfterCallback: true,
                callback: function () {
                    this.html.set('');
                    this.events.focus();
                }
            });
            $('div#froala-editor').froalaEditor({
                toolbarButtons: ['fontFamily', '|' , 'fontSize', '|', 'align', '|', 'paragraphFormat', '|' , 'formatOL', '|' , 'formatUL', '|', 'bold', '|', 'italic', '|', 'underline', '|', 'undo', '|', 'redo', '|', 'outdent', '|', 'indent', '|', 'clearFormatting', '|', 'insertTable', '|', 'html'],
                heightMin: 200,
                heightMax: 500
            })
        });
    }

    destroyEditor() : void {
        if ($('div#froala-editor').data('froala.editor')) {
            $('div#froala-editor').froalaEditor('destroy');
        }
    }

    ngOnDestroy() {
        this.destroyEditor();
    }

}