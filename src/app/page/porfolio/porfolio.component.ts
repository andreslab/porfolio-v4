import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';
import { InputLoginComponent } from 'src/app/components/input-login/input-login.component';
import { ContactService } from 'src/app/components/contact-form/services/contact.service';
import { ContactViewModel } from 'src/app/components/contact-form/models/contact-view-model';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private contactService: ContactService) { }

  ngOnInit() {
    this.loadContact();
  }

  contact: ContactViewModel[] = [];
  loadContact(){
    this.contactService.getContacts().subscribe(response => {
      this.contact = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const contact: ContactViewModel = {
          id: id,
          title: data.title,
          description: data.description,
          done: data.done,
          lastModifiedDate: data.lastModifiedDate.toDate()
        };
        this.contact.push(contact);
      })
    });
  }

  showWebProjects(){
    //alert("web");
    const modal = this.modalService.open(ContactFormComponent);
    modal.result.then(
      this.handleModalInputLoginClose.bind(this),
      this.handleModalInputLoginClose.bind(this)
    )
  }
  showAppProjects(){alert("app");}
  showDataScienceProjects(){alert("data science");}
  showGameProjects(){alert("game");}
  show3DProjects(){alert("3D");}
  showMakerProjects(){alert("Maker");}

  handleModalInputLoginClose(){
    //alert("se ha cerrado el modal");
  }

  checkedDone(index: number){
    const newDoneValue = !this.contact[index].done
    this.contact[index].done = newDoneValue;
    const obj = {done: newDoneValue};
    const id = this.contact[index].id;
    this.contactService.editContactPartial(id, obj);
  }
}


