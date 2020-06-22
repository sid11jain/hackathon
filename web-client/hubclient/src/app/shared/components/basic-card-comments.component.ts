import { OnInit, Component, Input } from '@angular/core';
import {
  Idea,
  COMMENT_COLUMN_ID,
  USERNAME_COLUMN_ID,
  COLUMN_NAME_COMMENTS,
  COLUMN_NAME_COMMENTS_COUNT,
  COMMENT_DATE_COLUMN_ID,
} from 'src/app/models/innovation-hub.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import {  BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import {
  IdValuePair,
  Collection,
} from 'src/app/models/common/common-utility.model';

@Component({
  selector: 'basic-card-comments',
  templateUrl: './basic-card-comments.component.html',
  styleUrls: ['./basic-card-comments.component.scss'],
})
export class BasicCardCommentsComponent implements OnInit {
  @Input() idea: Idea;

  ideaCommentsForm: FormGroup;

  allUsers: any[];


  defaultText = 'Write a comment...';

  constructor(
    private modalRef: BsModalRef,
    private hubService: InnovationsHubService
  ) {}

  ngOnInit() {
    this.hubService.getCollection(Collection.USERS).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.allUsers = resp.data;
      }
    });

    this.ideaCommentsForm = new FormGroup({
      commentToAdd: new FormControl('Write a comment...'),
    });
  }

  saveComment() {
    if (this.defaultText !== this.ideaCommentsForm.value.commentToAdd) {
      const userSessionName = this.hubService.currentUser;
      const commentedByPair = new IdValuePair(
        USERNAME_COLUMN_ID,
        userSessionName
      );
      const commentPair = new IdValuePair(
        COMMENT_COLUMN_ID,
        this.ideaCommentsForm.value.commentToAdd
      );
      const commentedOnPair = new IdValuePair(
        COMMENT_DATE_COLUMN_ID,
        new Date()
      );
      this.idea.comments = this.idea.comments ? this.idea.comments : [];
      this.idea.comments.push(
        {
          commentedBy: commentedByPair,
          comment: commentPair,
          commentedOn: commentedOnPair,
        },
      );

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
    }
    this.modalRef.hide();
  }

  closeCommentModal() {
    this.modalRef.hide();
  }
}
