import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactCreateUpdateComponent } from './contact-create-update/contact-create-update.component';



@NgModule({
  declarations: [ContactListComponent, ContactCreateUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: ContactListComponent}
    ])
  ]
})
export class ContactModule { }
