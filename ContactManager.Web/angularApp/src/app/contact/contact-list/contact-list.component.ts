import { Component, OnInit } from '@angular/core';
import { ContactService } from './../../shared/services/contact.service';
import { Contact } from './../../_interfaces/contact.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[];
  public selectedContact: Contact;

  constructor(private contactService: ContactService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  public getAllContacts(){
    let apiUrl = `api/contact`;
    this.contactService.getData(apiUrl).subscribe(
      res => this.contacts = res as Contact[],
      err => {
        this.errorHandler.handleError(err);
      }
    );
  }

  public handleSearchResults(contacts: any){
    this.contacts = contacts as Contact[];
  }

  createContact(){
    this.selectedContact = {
      id: 0,
      firstName: '',
      lastName: '',
      emailAddresses: []
    };

    $('#createUpdateContactModal').modal();
  }

  editContact(contact: Contact){
    this.selectedContact = contact;
    $('#createUpdateContactModal').modal();
  }

}
