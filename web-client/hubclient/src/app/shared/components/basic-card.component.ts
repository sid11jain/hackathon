import { OnInit, Component, Input } from '@angular/core';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';

@Component({
  selector: 'basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss'],
})
export class BasicCardComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    public hubService: InnovationsHubService
  ) {}

  @Input() datatypeToDisplay: any[];


  @Input()
  deckView = false;

  providedIdeaCampaignValues: any = {};
  // campaignFields: CampaignField[];

  numberOfElements: number;

  cardBg = [
    'bg-hub-primary',
    'bg-hub-secondary',
    'bg-hub-success',
    'bg-hub-danger',
    'bg-hub-warning',
    'bg-hub-info',
    'bg-hub-light',
    'bg-hub-subtle'
  ];

  ngOnInit(): void {
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
    }
  }

  onCardClick(providedIdea: any) {

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

  calculateCampaignEndingDays(endingDate: any) {
    if (endingDate){
    const todaysDate = new Date();
    const endDate = new Date(Date.parse(endingDate));

    // endDate.setDate(endDate.getDate());
    const differenceInTime = endDate.getTime() - todaysDate.getTime();
    // To calculate the no. of days between two dates
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays >= 0 ? 'ending in: ' + (differenceInDays + 1) + ' days' : 'ended';
  }
    return 'ended';
    // ending in:
}

}
