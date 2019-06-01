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

  handleModalInputLoginClose(response){
    //alert("se ha cerrado el modal");

    // is response an object?
    if (response === Object(response)) {
      if (response.createMode) {
        //si esta creando un nuevo contact
        response.todo.id = response.id;
        this.contact.unshift(response.todo);
      } else {
        //si esta editando un contact
        let index = this.contact.findIndex(value => value.id == response.id);
        this.contact[index] = response.todo;
      }
    }
  }

  checkedDone(index: number){
    const newDoneValue = !this.contact[index].done
    this.contact[index].done = newDoneValue;
    const obj = {done: newDoneValue};
    const id = this.contact[index].id;
    this.contactService.editContactPartial(id, obj);
  }

  handleEditClick(contact: ContactViewModel){
    //abrimos el modal
    const modal = this.modalService.open(ContactFormComponent);

    modal.result.then(
      this.handleModalInputLoginClose.bind(this),
      this.handleModalInputLoginClose.bind(this)
    )

    modal.componentInstance.createMode = false;
    modal.componentInstance.contact = contact;
  }

  handleDeleteClick(contactId: string, index: number) {
    this.contactService.deleteContact(contactId)
    .then(() => {
      //elimina en el arreglo de contact
      this.contact.splice(index, 1)
    })
    .catch(err => console.error(err));
  }
}


