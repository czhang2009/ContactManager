import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { AutosearchDirective } from './directives/autosearch.directive';
import { CursorDirective } from './directives/cursor.directive';
import { MyModalComponent } from './modals/my-modal/my-modal.component';



@NgModule({
  declarations: [ErrorModalComponent, SuccessModalComponent, AutosearchDirective, CursorDirective, MyModalComponent],
  exports: [ErrorModalComponent, SuccessModalComponent, MyModalComponent, AutosearchDirective, CursorDirective, FontAwesomeModule],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
