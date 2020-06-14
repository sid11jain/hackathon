import { OnInit, Component } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationHubComponent } from 'src/app/components/innovation-hub.component';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { Idea } from 'src/app/models/innovation-hub.model';


@Component({
    selector:'landing-view',
    templateUrl:'./landing-view.component.html',
    styleUrls:['./landing-view.component.scss']
})
export class LandingViewComponent implements OnInit{
    bsModalRef: BsModalRef;

    ideas: any[];

    constructor(private service:InnovationsHubService){

    }




    ngOnInit(): void {
        this.service.getCollection("Idea").forEach(element => {
            this.ideas.push(element);
        });;
    }
    

    openComponentToAdd(){
      alert("Button is clicked");
    }


       

}