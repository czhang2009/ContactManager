import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactUpsertComponent } from './contact-upsert/contact-upsert.component';



@NgModule({
  declarations: [ContactListComponent, ContactUpsertComponent],
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
