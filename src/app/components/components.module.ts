import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images/images.component';
import { NgbAccordionModule, NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    ImagesComponent,
    LoginComponent,
    HomeComponent
    
  ],
  imports: [
    CommonModule,
    NgbCarouselModule, // Empaquetado el carrusel
    FormsModule,
    ReactiveFormsModule, 
    NgbAccordionModule,
    NgbPaginationModule       // Controles de formulario

  ]
})
export class ComponentsModule { }
