import { OnInit, Component, Input } from '@angular/core';
import { Idea, COLUMN_NAME_LIKES, COLUMN_NAME_LIKES_COUNT, COLUMN_NAME_COMMENTS, COLUMN_NAME_FAVOURITES, COLUMN_NAME_FAVOURITES_COUNT } from 'src/app/models/innovation-hub.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BasicCardCommentsComponent } from './basic-card-comments.component';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';
import { Collection } from 'src/app/models/common/common-utility.model';

@Component({
    selector: 'app-card-footer',
    templateUrl: './card-footer.component.html',
    styleUrls: ['./card-footer.component.scss']

})
export class CardFooterComponent implements OnInit{

    @Input() providedIdea: Idea;

    @Input() showEditOption = false;

    showEdit = false;

    constructor(
        private modalService: BsModalService,
        private hubService: InnovationsHubService
      ) {}


    ngOnInit(): void {
      this.showEdit = this.showEditOption && this.hubService && this.hubService.currentUser === this.providedIdea.submittedBy;
    }

    updateIdea(providedIdea: Idea, attributeType: string) {
        const userSessionName = this.hubService.currentUser;
        switch (attributeType) {
          case COLUMN_NAME_LIKES: {
            if (
              providedIdea.likes &&
              providedIdea.likes.includes(userSessionName)
            ) {
              let userList = [];
              providedIdea.likesCount = providedIdea.likesCount - 1;
              userList = providedIdea.likes.filter(
                (userName) => userSessionName !== userName
              );
              providedIdea.likes = userList;
            } else {
              if (!providedIdea.likesCount) {
                providedIdea.likesCount = 0;
              }
              providedIdea.likesCount = providedIdea.likesCount + 1;
              providedIdea.likes = [];
              providedIdea.likes.push(userSessionName);
            }
            this.hubService.updateCollectionDocument(providedIdea, [
              COLUMN_NAME_LIKES,
              COLUMN_NAME_LIKES_COUNT,
            ], Collection.IDEA).subscribe();
            break;
          }
          case COLUMN_NAME_COMMENTS: {
            const initialState = { idea: providedIdea };
            this.modalService.show(
              BasicCardCommentsComponent,
              Object.assign({}, { initialState })
            );
            break;
          }
          case COLUMN_NAME_FAVOURITES: {
            if (
              providedIdea.favourites &&
              providedIdea.favourites.includes(userSessionName)
            ) {
              let userList = [];
              providedIdea.favouritesCount = providedIdea.favouritesCount - 1;
              userList = providedIdea.favourites.filter(
                (userName) => userSessionName !== userName
              );
              providedIdea.favourites = userList;
            } else {
              if (!providedIdea.favouritesCount) {
                providedIdea.favouritesCount = 0;
              }
              providedIdea.favouritesCount = providedIdea.favouritesCount + 1;
              providedIdea.favourites = [];
              providedIdea.favourites.push(userSessionName);
            }
            this.hubService.updateCollectionDocument(providedIdea, [
              COLUMN_NAME_FAVOURITES,
              COLUMN_NAME_FAVOURITES_COUNT,
            ], Collection.IDEA).subscribe();
            break;
          }
          case 'edit': {
            const initialState = {
              campaign: providedIdea.campaign,
              providedIdea,
              editMode: true,
              fromEditIconClick: true
            };
            this.modalService.show(
              InnovationHubCardComponent,
              Object.assign({}, { initialState })
            );
            let userList = [];
            if (
              providedIdea.likes &&
              providedIdea.likes.includes(userSessionName)
            ) {
              userList = providedIdea.likes.filter(
                (userName) => userSessionName !== userName
              );
            }
            break;
          }
        }
      }
}