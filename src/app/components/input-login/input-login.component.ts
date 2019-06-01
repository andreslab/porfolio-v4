import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-input-login',
  templateUrl: './input-login.component.html',
  styleUrls: ['./input-login.component.css']
})
export class InputLoginComponent implements OnInit {

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
