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
  }

  saveComment() {
    const userSessionName = this.hubService.currentUser;

    const commentedBy = new IdValuePair(USERNAME_COLUMN_ID, userSessionName);
    commentedBy.id = USERNAME_COLUMN_ID;
    commentedBy.value = userSessionName;

    const comment = new IdValuePair(COMMENT_COLUMN_ID, this.ideaCommentsForm.value.commentToAdd);
    comment.id = COMMENT_COLUMN_ID;
    comment.value = this.ideaCommentsForm.value.commentToAdd;

    const commentedOn = new IdValuePair(COMMENT_DATE_COLUMN_ID, new Date());
    commentedOn.id = COMMENT_DATE_COLUMN_ID;
    commentedOn.value = new Date();

    this.idea.comments = this.idea.comments ? this.idea.comments : [];

    this.idea.comments = [
      {
        'commentedBy': commentedBy,
        'comments': comment,
        'commentedOn': commentedOn,
      },
    ];

    console.log("comments print: " + this.idea.comments);

    this.hubService.getCollection(Collection.USERS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.allUsers = resp.data;
      }
    });

    this.idea.commentsCount = this.idea.commentsCount
      ? this.idea.commentsCount + 1
      : 0 + 1;
    this.hubService
      .updateCollectionDocument(
        this.idea,
        [COLUMN_NAME_COMMENTS, COLUMN_NAME_COMMENTS_COUNT],
        Collection.IDEA
      )
      .subscribe();
    this.modalRef.hide();

  }

  closeCommentModal() {
    this.modalRef.hide();
  }
}
