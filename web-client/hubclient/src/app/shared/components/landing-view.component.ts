import { OnInit, Component } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationHubComponent } from 'src/app/components/innovation-hub.component';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { Idea, Collection } from 'src/app/models/innovation-hub.model';
import { InnovationHubIdeaComponent } from 'src/app/components/innovation-hub-idea.component';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';
import { HubCampaignCardComponent } from 'src/app/components/common/innovation-hub-card/hub-campaign-card.component';
import { OPERATION } from 'src/app/models/common/common-utility.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.scss'],
})
export class LandingViewComponent implements OnInit {
  bsModalRef: BsModalRef;
  operation: any = OPERATION;
  ideas: any[] = [];
  ideasLoaded = false;
  deckView = false;

  constructor(
    private modalService: BsModalService,
    private service: InnovationsHubService
  ) {}

  ngOnInit(): void {
    this.service.getAllIdeas().subscribe((resp: any) =>
    {
        if (resp && resp.data){
            this.ideas = resp.data as [];
        }
        this.ideasLoaded = true;
        console.log('All IDeas', this.ideas);
    });
  }

  openCampaignComponent(operationInput: OPERATION) {
    const initialState = { operation: operationInput };
    this.modalService.show(HubCampaignCardComponent,
        Object.assign({}, { initialState }));
  }

  switchView(){
this.deckView = !this.deckView;
  }
}
