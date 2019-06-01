import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from './models/contact';
import { DocumentReference } from '@angular/fire/firestore';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
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
  }

  saveContact(){
    alert("guardando");

    //validar el formulario
    if(this.contactForm.invalid){
      return;
    }
    alert("procesando...");

    let contact: Contact = this.contactForm.value;
    contact.lastModifiedDate = new Date();
    contact.createDate = new Date();
    this.contactService.saveContact(contact)
    .then(response => this.handleSuccessfulSaveContact(response, contact))
    .catch(err => console.error(err));
  }

  //enviar la informacion hacia firebase
  handleSuccessfulSaveContact(response: DocumentReference, contact: Contact){
    this.activeModal.dismiss({contact: contact, id: response.id});
  }


}
