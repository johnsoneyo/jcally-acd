import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from '../directives/role.directive';

@NgModule({

  declarations: [RoleDirective],
  exports: [
    RoleDirective
  ]
})
export class RoleModule { }
