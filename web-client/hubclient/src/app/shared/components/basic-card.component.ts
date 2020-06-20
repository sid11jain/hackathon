import { OnInit, Component, Input } from '@angular/core';
import {
  Idea,
  CampaignField,
  COLUMN_NAME_FAVOURITES,
  COLUMN_NAME_LIKES,
  COLUMN_NAME_LIKES_COUNT,
  COLUMN_NAME_FAVOURITES_COUNT,
  COLUMN_NAME_COMMENTS,
} from 'src/app/models/innovation-hub.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';
import { BasicCardCommentsComponent } from './basic-card-comments.component';

@Component({
  selector: 'basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss'],
})
export class BasicCardComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private hubService: InnovationsHubService
  ) {}

  @Input() datatypeToDisplay: any[];


  @Input()
  deckView = false;

  providedIdeaCampaignValues: any = {};
  // campaignFields: CampaignField[];

  numberOfElements: number;

  cardBg = [
    'bg-primary',
    'bg-secondary',
    'bg-success',
    'bg-danger',
    'bg-warning',
    'bg-info',
    'bg-light',
  ];

  ngOnInit(): void {
    console.log('In basic card', this.datatypeToDisplay);
    if (this.datatypeToDisplay) {
      this.datatypeToDisplay.forEach((idea) => {
        if (idea && idea.campaign) {
          this.providedIdeaCampaignValues = Object.assign(
            {},
            this.providedIdeaCampaignValues,
            {
              [idea.name]: this.hubService.mapIdeaCampaignValueAsKeyValue(
                idea,
                idea.campaign.campaignFields
              ),
            }
          );
        }
      });
      console.log('provided idea', this.providedIdeaCampaignValues);
    }
  }

  onCardClick(providedIdea: any) {
    console.log('Card clicked');

    const initialState = {
      campaign: providedIdea.campaign,
      providedIdea,
      editMode: false,
    };
    this.modalService.show(
      InnovationHubCardComponent,
      Object.assign({}, { initialState })
    );
  }

  switchView(deckView: boolean) {
    console.log(deckView);

    if (this.deckView) {
      if (!deckView) {
        this.deckView = false;
      }
    } else {
      if (deckView) {
        this.deckView = true;
      }
    }
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
        ]);
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
        ]);

        break;
      }
      case 'edit': {
        let userList = [];
        if (
          providedIdea.likes &&
          providedIdea.likes.includes(userSessionName)
        ) {
          userList = providedIdea.likes.filter(
            (userName) => userSessionName !== userName
          );
        }
        alert(userList);
        break;
      }
    }
  }
}
