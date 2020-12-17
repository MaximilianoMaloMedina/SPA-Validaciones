import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  // variable para almacenr mi nuevo formulario
  form: FormGroup;

  // getters de los controles
  get ValidNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get validApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get ValidCorreo(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }
  // getter para controles dentro de un FormGrup
  get validEstado(){
    return this.form.get('direccion.estado').invalid && this.form.get('direccion.estado').touched;
  }
  get validMun(){
    return this.form.get('direccion.municipio').invalid && this.form.get('direccion.municipio').touched;
  }

  // getters para FormArray
  get arrayPT(){
    return this.form.get('pasatiempos') as FormArray;
  }

  // getters para passwords (validacion personalisada)
  get Pass1(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }


  get Pass2(){
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    // if de operador terneatio
    return (pass1 === pass2) ? false : true;
  }

  constructor( private fb: FormBuilder, private CustomVal: ValidationService) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
  this.form = this.fb.group({
    // primer valor string('') representa el valor por defecto de cada control
    // como segundo valor estaremos agregando las validaciones
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    apellido: ['', [Validators.required, Validators.minLength(4), this.CustomVal.noBerna]],
    correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    pass1: ['', Validators.required],
    pass2: ['', Validators.required],
    direccion: this.fb.group({
      estado: ['', [Validators.required, Validators.minLength(3)]],
      municipio: ['', [Validators.required, Validators.minLength(3)]]
    }),
    pasatiempos: this.fb.array([])
  },{
    validators: this.CustomVal.matchPassword('pass1', 'pass2')
  });
}
  enviar(){
    console.log(this.form);
    if (this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup){
          return Object.values(control.controls).forEach(control => control.markAsTouched())
        }else{
          control.markAllAsTouched();
        }
      });
    }
  }
// nos sirve para agregar elementos a el ngform
  newControl(){
    this.arrayPT?.push(this.fb.control('', Validators.required));
  }
  // ayuda a borrar el control seleccionado de la fila
  removeControl(id: number){
    this.arrayPT?.removeAt(id);
  }

}
