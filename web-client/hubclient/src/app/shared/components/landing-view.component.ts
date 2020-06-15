import { OnInit, Component } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationHubComponent } from 'src/app/components/innovation-hub.component';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { Idea } from 'src/app/models/innovation-hub.model';
import { InnovationHubIdeaComponent } from 'src/app/components/innovation-hub-idea.component';
import { InnovationHubCardComponent } from 'src/app/components/common/innovation-hub-card/innovation-hub-card.component';
import { HubCampaignCardComponent } from 'src/app/components/common/innovation-hub-card/hub-campaign-card.component';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'landing-view',
    templateUrl: './landing-view.component.html',
    styleUrls: ['./landing-view.component.scss']
})
export class LandingViewComponent implements OnInit{
    bsModalRef: BsModalRef;

    ideas: any[] = [];

    constructor(        private modalService: BsModalService,
                        private service: InnovationsHubService){

    }




    ngOnInit(): void {
        this.service.getCollection('idea').forEach(element => {
            this.ideas.push(element);
        });
    }


    openComponentToAdd(){
      // alert('Button is clicked');
      this.modalService.show(
        HubCampaignCardComponent);
    //      Object.assign({}, {backdrop: 'static',
    //      keyboard: false}, { class: 'modal-xl',   })
    // );
    }




}
