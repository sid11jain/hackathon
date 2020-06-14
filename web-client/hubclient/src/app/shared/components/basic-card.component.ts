import { OnInit, Component, Input } from '@angular/core';
import { Idea } from 'src/app/models/innovation-hub.model';


@Component({
    selector:'basic-card',
    templateUrl: './basic-card.component.html',
    styleUrls:['./basic-card.component.scss']
    
})
export class BasicCardComponent implements OnInit{

    @Input() heading: string;

    @Input() datatypeToDisplay: any[];

    @Input()
    postedOn: Date;

    @Input()
    stage: string;

    @Input()
    description: string;

    @Input() useDefault: boolean;

    numberOfElements: number;

    ngOnInit(): void {
        if(this.datatypeToDisplay){
            this.numberOfElements= this.datatypeToDisplay.length;
        }
        this.numberOfElements =7;
    }


}