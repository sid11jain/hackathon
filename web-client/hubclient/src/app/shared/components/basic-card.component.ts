import { OnInit, Component, Input } from '@angular/core';
import { Idea, CampaignField } from 'src/app/models/innovation-hub.model';
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

      this.numberOfElements = this.datatypeToDisplay.length;
    }
    this.numberOfElements = 7;
  }

  onCardClick(providedIdea: any) {
    console.log('Card clicked');

    const initialState = { campaign: providedIdea.campaign, providedIdea, editMode: false};
    this.modalService.show(
      InnovationHubCardComponent,
      Object.assign({}, { initialState })
    );
  }
}
