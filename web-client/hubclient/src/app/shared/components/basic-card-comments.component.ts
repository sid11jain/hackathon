import { OnInit, Component, Input } from '@angular/core';
import {
  Idea,
  COMMENT_COLUMN_ID,
  USERNAME_COLUMN_ID,
  COMMENTED_ON_COLUMN_ID,
  COLUMN_NAME_COMMENTS,
  COLUMN_NAME_COMMENTS_COUNT,
} from 'src/app/models/innovation-hub.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { IdValuePair } from 'src/app/models/common/common-utility.model';
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

  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private hubService: InnovationsHubService
  ) {}

  ngOnInit() {
    this.ideaCommentsForm = new FormGroup({
      commentToAdd: new FormControl(),
    });
    console.log('idea', this.idea);
    console.log(this.idea.comments);
  }
  saveComment() {
    const userSessionName = this.hubService.currenUser;

    const pair = new IdValuePair();
    pair.id = USERNAME_COLUMN_ID;
    pair.value = userSessionName;

    const commentPair = new IdValuePair();
    commentPair.id = COMMENT_COLUMN_ID;
    commentPair.value = this.ideaCommentsForm.value.commentToAdd;

    const commentedOnPair = new IdValuePair();
    commentedOnPair.id = COMMENTED_ON_COLUMN_ID;
    commentedOnPair.value = new Date();
    if (!this.idea.comments) {
      this.idea.comments = this.idea.comments ? this.idea.comments : [];
    }


    const pairToPush = new IdValuePair();
    pairToPush.id = pair;
    pairToPush.value = [commentPair , commentedOnPair];


    this.idea.comments.push({
      "comments:":"","":""
    });

    this.idea.commentsCount = this.idea.commentsCount
      ? this.idea.commentsCount + 1
      : 0 + 1;
    this.hubService.updateCollectionDocument(this.idea, [COLUMN_NAME_COMMENTS, COLUMN_NAME_COMMENTS_COUNT]);

  }

  closeCommentModal() {
    this.modalRef.hide();
  }
}
