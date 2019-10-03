import { EmailAddress } from './../../_interfaces/email-address.model';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './../../_interfaces/contact.model';
import {ErrorHandlerService} from './../../shared/services/error-handler.service';
import { ContactService } from './../../shared/services/contact.service';

@Component({
  selector: 'app-contact-create-update',
  templateUrl: './contact-create-update.component.html',
  styleUrls: ['./contact-create-update.component.css']
})
export class ContactCreateUpdateComponent implements OnInit {
  public errorMessage: string;
  public contactForm: FormGroup;
  @Output() public successEvent = new EventEmitter();
  @Input() contact: Contact;

  constructor(private contactService: ContactService, private errorHandler: ErrorHandlerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      emailType: new FormControl(''),
      newEmailAddress: new FormControl(''),
    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.contactForm){
      this.contactForm.get('firstName').setValue(this.contact.firstName.slice());
      this.contactForm.get('lastName').setValue(this.contact.lastName.slice());
    }
  }

  public validateControl(controlName: string) {
    if (this.contactForm.controls[controlName].invalid && this.contactForm.controls[controlName].touched) {
      return true;
    }
 
    return false;
  }
 
  public hasError(controlName: string, errorName: string) {
    if (this.contactForm.controls[controlName].hasError(errorName)) {
      return true;
    }
 
    return false;
  }

  public onSuccess(){
    this.successEvent.emit();
    this.contactForm.reset();
  }

  public addEmailAddress(emailType: number, emailAddress: string){
    this.contact.emailAddresses.push({
      id: 0,
      type: emailType,
      address: emailAddress,
      contactId: this.contact.id
    })
  }

  public removeEmailAddress(emailAddress: EmailAddress){
    let index = this.contact.emailAddresses.findIndex(email => email.id === emailAddress.id && email.type === emailAddress.type && email.address === emailAddress.address);

    if(index !== -1){
      this.contact.emailAddresses.splice(index, 1);
    }
  }

  public createUpdateContact(contactFormValue) {
    const apiUrl = 'api/contact';

    if ( this.contactForm.valid) {
      if (this.contact && this.contact.id > 0) {
        this.contact.firstName = contactFormValue.firstName;
        this.contact.lastName = contactFormValue.lastName;

        this.contactService.update(`${apiUrl}/${this.contact.id}`, this.contact)
        .subscribe(
          res => $('#successModal').modal(),
          err => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        } );
      } else {
        this.contact.firstName = contactFormValue.firstName;
        this.contact.lastName = contactFormValue.lastName;

        this.contactService.create(apiUrl, this.contact)
        .subscribe(
          res => $('#successModal').modal(),
          err => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        }
      ); }
    }
  }

}
