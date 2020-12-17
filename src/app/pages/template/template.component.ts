import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContriesService } from '../../services/contries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  constructor( private cs: ContriesService) { }

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: ''
  };

  contries: any[] = [];

  ngOnInit(): void {
    this.cs.getContries().subscribe(data =>
    this.contries = data);
    console.log(this.contries);
    // agregar la opcion defaul
    this.contries.unshift({
      name: '--Seleccione un pais--',
      code: ''
    });
  }

  enviar(form: NgForm){
    console.log(form);
    if (form.invalid) Object.values(form.controls).forEach(control => control.markAsTouched());
  }

}
