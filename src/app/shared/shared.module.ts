import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {  } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    // tambien puede haber importado el AppRoutingModule.
    // No estamos importando RouterModule dos veces (ya está en AppRoutingModule). Si Angular ya lo importó en algún otro lado,
    // no lo importa otra vez sino lo reutiliza.
    RouterModule
  ]
})
export class SharedModule { }
