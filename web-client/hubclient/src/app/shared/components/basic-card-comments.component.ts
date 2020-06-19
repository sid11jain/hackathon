import { OnInit, Component, Input } from '@angular/core';
import { Idea } from 'src/app/models/innovation-hub.model';
import { InnovationsHubService } from 'src/app/services/innovations-hub.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormArray, FormGroup } from '@angular/forms';

@Component({
    selector:'basic-card-comments',
    templateUrl: './basic-card-comments.component.html',
    styleUrls: ['./basic-card-comments.component.scss']
})
export class BasicCardCommentsComponent implements OnInit{

@Input() idea: Idea; 

ideaCommentsForm: FormGroup;

existingComments : any[];

constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private hubService: InnovationsHubService
  ) {}

  ngOnInit(){
   //   this.ideaCommentsForm = new FormGroup({
    //  comments: new FormControl()
    //});
  }
    saveComment(){
         const userSessionName = sessionStorage.getItem('userName');
        if(this.idea.comments){

            
        }else{
          this.idea.comments.push({ userSessionName: '' });

        }  
        this.hubService.updateCollectionDocument(this.idea, 'comments');

    }

    closeCommentModal(){
        this.modalRef.hide();
    }

  }
