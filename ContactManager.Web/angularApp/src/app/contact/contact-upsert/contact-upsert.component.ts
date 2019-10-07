import { EmailAddress } from './../../_interfaces/email-address.model';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './../../_interfaces/contact.model';
import {ErrorHandlerService} from './../../shared/services/error-handler.service';
import { ContactService } from './../../shared/services/contact.service';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-upsert',
  templateUrl: './contact-upsert.component.html',
  styleUrls: ['./contact-upsert.component.css']
})
export class ContactUpsertComponent implements OnInit {
  public errorMessage: string;
  public contactForm: FormGroup;
  @Output() public successEvent = new EventEmitter();
  @Input() contact: Contact;
  emailAddresses: EmailAddress[];

  faMinus = faMinus;
  faPlus = faPlus;

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

      this.emailAddresses = this.contact.emailAddresses.slice();
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
    this.resetForm();
  }

  public addEmailAddress(emailType: string, emailAddress: string){
    this.emailAddresses.push({
      id: 0,
      type: parseInt(emailType),
      address: emailAddress,
      contactId: this.contact.id
    });

    this.contactForm.get('emailType').setValue('');
    this.contactForm.get('newEmailAddress').setValue('');
  }

  public removeEmailAddress(emailAddress: EmailAddress){
    let index = this.emailAddresses.findIndex(email => email.id === emailAddress.id && email.type === emailAddress.type && email.address === emailAddress.address);

    if(index !== -1){
      this.emailAddresses.splice(index, 1);
    }
  }

  public resetForm(){
    this.contactForm.reset();
    this.emailAddresses = this.contact.emailAddresses.slice();
  }

  public createUpdateContact(contactFormValue) {
    const apiUrl = 'api/contact';

    if ( this.contactForm.valid) {
      if (this.contact && this.contact.id > 0) {
        this.contact.firstName = contactFormValue.firstName;
        this.contact.lastName = contactFormValue.lastName;
        this.contact.emailAddresses = this.emailAddresses;

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
