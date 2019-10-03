import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { AutosearchDirective } from './directives/autosearch.directive';



@NgModule({
  declarations: [ErrorModalComponent, SuccessModalComponent, AutosearchDirective],
  exports: [ErrorModalComponent, SuccessModalComponent, AutosearchDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
