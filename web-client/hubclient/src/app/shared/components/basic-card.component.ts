import { OnInit, Component, Input } from '@angular/core';
import { Idea, CampaignField } from 'src/app/models/innovation-hub.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';
import { BasicCardCommentsComponent } from './basic-card-comments.component';

@Component({
  selector: 'basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss']
})
export class BasicCardComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private hubService: InnovationsHubService
  ) {}

  @Input() heading: string;

  @Input() datatypeToDisplay: any[];

  @Input()
  postedOn: Date;

  @Input()
  stage: string;

  @Input()
  description: string;

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

    const initialState = { campaign: providedIdea.campaign, providedIdea, editMode: false };
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
    const userSessionName = sessionStorage.getItem('userName');
    switch (attributeType) {
      case 'likes': {
        if (providedIdea.likes) {
          const userList = providedIdea.likes.filter(userName => {
            if (userSessionName === userName) {
              providedIdea.likeCount = providedIdea.likeCount - 1;
              return false;
            } 
          });
          providedIdea.likes = userList;
      //    this.hubService.updateCollectionDocument(providedIdea, false);
        }else{
          if(!providedIdea.likeCount){
              providedIdea.likeCount = 0;
          }
          providedIdea.likeCount = providedIdea.likeCount + 1;
          providedIdea.likes =[];
          providedIdea.likes.push(userSessionName);    
        }       
         break;
      }
      case 'comments': {
       const initialState = { idea: providedIdea};
       this.modalService.show(
        BasicCardCommentsComponent,
        Object.assign({}, { initialState })
        );    
        break;
      }
      case 'favourites': {
        if(providedIdea.favourites){
          const userList = providedIdea.favourites.filter(userName => {
            if (userSessionName === userName) {
              providedIdea.favouritesCount = providedIdea.favouritesCount - 1;
              return false;
            } 
          });
          providedIdea.favourites = userList;
       //   this.hubService.updateCollectionDocument(providedIdea, false);
        }else{
          if(! providedIdea.favouritesCount){
             providedIdea.favouritesCount = 0;
          }
          providedIdea.favouritesCount = providedIdea.favouritesCount + 1;
           providedIdea.favourites = [];
          providedIdea.favourites.push(userSessionName);
        }
        break;
     //   this.hubService.updateCollectionDocument(providedIdea, 'Favourite');
      }
      case 'Edit': {
        break;
      }
    }
    this.hubService.updateCollectionDocument(providedIdea, attributeType);
  }
}
