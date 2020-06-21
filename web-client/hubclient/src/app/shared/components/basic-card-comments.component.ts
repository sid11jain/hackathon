import { OnInit, Component, Input } from '@angular/core';
import {
  Idea,
  COMMENT_COLUMN_ID,
  USERNAME_COLUMN_ID,
  COMMENTED_ON_COLUMN_ID,
  COLUMN_NAME_COMMENTS,
  COLUMN_NAME_COMMENTS_COUNT,
  COMMENTED_BY_COLUMN_ID,
  COMMENT_DATE_COLUMN_ID,
} from 'src/app/models/innovation-hub.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { IdValuePair, NameIdValuePair, Collection } from 'src/app/models/common/common-utility.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'basic-card-comments',
  templateUrl: './basic-card-comments.component.html',
  styleUrls: ['./basic-card-comments.component.scss'],
})
export class BasicCardCommentsComponent implements OnInit {
  @Input() idea: Idea;

  ideaCommentsForm: FormGroup;

  existingComments: any[];

  allUsers: any[];

  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private hubService: InnovationsHubService
  ) {}

  ngOnInit() {
    this.ideaCommentsForm = new FormGroup({
      commentToAdd: new FormControl('Write a comment...'),
    });

    const keyValue = [];
    const commentedBy = new IdValuePair();
    commentedBy.id = USERNAME_COLUMN_ID;
    commentedBy.value = this.hubService.currentUser;


    const comment = new IdValuePair();
    comment.id = COMMENT_COLUMN_ID;
    comment.value = this.ideaCommentsForm.value.commentToAdd;

    const commentedOn = new IdValuePair();
    commentedOn.id = COMMENT_DATE_COLUMN_ID;
    commentedOn.value = new Date();

    let arr = [commentedBy, comment, commentedOn];
    console.log("idvalue pair:" +JSON.stringify(arr));
   
    const a = new NameIdValuePair();
    a.name = COMMENTED_BY_COLUMN_ID;
    a.idValuePair = new IdValuePair();
    a.idValuePair.id = USERNAME_COLUMN_ID;
    a.idValuePair.value = this.hubService.currentUser;


    const b = new NameIdValuePair();
    b.name = COMMENT_COLUMN_ID;
    b.idValuePair = new IdValuePair();
    b.idValuePair.id = COMMENT_COLUMN_ID;
    b.idValuePair.value =  this.ideaCommentsForm.value.commentToAdd;

    const c = new NameIdValuePair();
    c.name = COMMENTED_ON_COLUMN_ID;
    c.idValuePair = new IdValuePair();
    c.idValuePair.id = COMMENT_DATE_COLUMN_ID;
    c.idValuePair.value =  this.ideaCommentsForm.value.commentToAdd;

    console.log("name id value pair stringify: " +JSON.stringify([a,b,c]));
  }

  saveComment() {
    const userSessionName = this.hubService.currentUser;

    const commentedBy = new IdValuePair();
    commentedBy.id = USERNAME_COLUMN_ID;
    commentedBy.value = userSessionName;


    const comment = new IdValuePair();
    comment.id = COMMENT_COLUMN_ID;
    comment.value = this.ideaCommentsForm.value.commentToAdd;

    const commentedOn = new IdValuePair();
    commentedOn.id = COMMENT_DATE_COLUMN_ID;
    commentedOn.value = new Date();

    console.log(JSON.stringify([commentedBy, comment, commentedOn]));

    
    //const commentAttribute = this.getNameIdValuePair(COMMENT_COLUMN_ID, commentPair);

    //const commentedOnPair = new IdValuePair();
    //commentedOnPair.id = COMMENTED_ON_COLUMN_ID;
    //commentedOnPair.value = new Date();

    //const commentedOnAttribute = this.getNameIdValuePair(COMMENTED_ON_COLUMN_ID, commentedOnPair);


    //this.idea.comments = this.idea.comments ? this.idea.comments : [];


    //this.idea.comments.push()

    



    this.hubService.getCollection(Collection.USERS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.allUsers = resp.data;
      }
    });

    //const pairToPush = new IdValuePair();
  //  pairToPush.id = pair;
  //  pairToPush.value = [commentPair , commentedOnPair];


  //  this.idea.comments.push({
  //    "comments:":"","":""
  //  });

    this.idea.commentsCount = this.idea.commentsCount
      ? this.idea.commentsCount + 1
      : 0 + 1;
    this.hubService.updateCollectionDocument(this.idea, [COLUMN_NAME_COMMENTS, COLUMN_NAME_COMMENTS_COUNT])
    .subscribe();

  }

  closeCommentModal() {
    this.modalRef.hide();
  }
}
