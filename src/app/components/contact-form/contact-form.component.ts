import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from './models/contact';
import { DocumentReference } from '@angular/fire/firestore';
import { ContactService } from './services/contact.service';
import { ContactViewModel } from './models/contact-view-model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  

  contactForm: FormGroup;
  createMode: boolean = true; // diferenciar si esta creando o editando
  contact: ContactViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private contactService: ContactService) { }

    //public activeModal: NgbActiveModal es requerido porque el boton "X" del formulario lo usa

  ngOnInit() {
    //lo utilizamos para inicializar, las entradas del formulario se guardaran en los siguientes campos donde coincidan los nombres
    this.contactForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      done: false
    });
    //done es un checkbox por defecto no esta seleccioando

    //si esta en modo de edicion
    if(!this.createMode){
      this.loadContact(this.contact);
    }
  }

  loadContact(contact){

    //podemos modificar los valores de un formulario con los valores que se le pasan
    this.contactForm.patchValue(contact);
  }

  saveTodo() {
    if (this.contactForm.invalid) {
      return;
    }

    if (this.createMode){
      let contact: Contact = this.contactForm.value;
      contact.lastModifiedDate = new Date();
      contact.createDate = new Date();
      this.contactService.saveContact(contact)
      .then(response => this.handleSuccessfulSaveContact(response, contact))
      .catch(err => console.error(err));
    } else{
      let contact: ContactViewModel = this.contactForm.value;
      contact.id = this.contact.id;
      contact.lastModifiedDate = new Date();
      this.contactService.editContact(contact)
        .then(() => this.handleSuccessfulEditContact(contact))
        .catch(err => console.error(err));
    }

  }
  handleSuccessfulSaveContact(response: DocumentReference, contact: Contact) {
    this.activeModal.dismiss({ contact: contact, id: response.id, createMode: true });
  }

  handleSuccessfulEditContact(contact: ContactViewModel) {
    this.activeModal.dismiss({ contact: contact, id: contact.id, createMode: false });
  }


}
