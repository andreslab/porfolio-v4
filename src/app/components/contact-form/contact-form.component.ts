import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { }

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

}
