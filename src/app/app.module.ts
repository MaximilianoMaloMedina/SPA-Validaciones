import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

// importar el routerModule de qangular core
import { RouterModule, Routes } from '@angular/router';
// importar la clase creada en el archivo app.routes
import { routes } from './app.routes';
// para trabajar con formularios
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
