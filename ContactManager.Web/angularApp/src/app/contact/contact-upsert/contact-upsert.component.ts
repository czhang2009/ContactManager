import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './../../_interfaces/contact.model';
import {ErrorHandlerService} from './../../shared/services/error-handler.service';
import { ContactService } from './../../shared/services/contact.service';
import { EmailAddress } from './../../_interfaces/email-address.model';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-upsert',
  templateUrl: './contact-upsert.component.html',
  styleUrls: ['./contact-upsert.component.css']
})
export class ContactUpsertComponent implements OnInit, OnChanges {
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
    if (this.contactForm) {
      this.contactForm.get('firstName').setValue(this.contact.firstName);
      this.contactForm.get('lastName').setValue(this.contact.lastName);

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

  public onSuccess() {
    this.successEvent.emit();
  }

  public onClose() {
    this.resetForm();
  }

  public addEmailAddress(emailType: string, emailAddress: string) {
    this.emailAddresses.push({
      id: 0,
      type: +emailType,
      address: emailAddress,
      contactId: this.contact.id
    });

    this.contactForm.get('emailType').setValue('');
    this.contactForm.get('newEmailAddress').setValue('');
  }

  public removeEmailAddress(emailAddress: EmailAddress){
    const index = this.emailAddresses.findIndex(email => email.id === emailAddress.id && email.type === emailAddress.type && email.address === emailAddress.address);

    if (index !== -1) {
      this.emailAddresses.splice(index, 1);
    }
  }

  public resetForm() {
    this.contactForm.reset({
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
    });
    this.emailAddresses = this.contact.emailAddresses.slice();
  }

  public createUpdateContact(contactFormValue) {
    const apiUrl = 'api/contact';

    if ( this.contactForm.valid) {
      if(contactFormValue.newEmailAddress) {
        this.addEmailAddress(contactFormValue.emailType, contactFormValue.newEmailAddress);
      }

      this.contact.firstName = contactFormValue.firstName;
      this.contact.lastName = contactFormValue.lastName;
      this.contact.emailAddresses = this.emailAddresses;

      if (this.contact.id > 0) {
        this.contactService.update(`${apiUrl}/${this.contact.id}`, this.contact)
        .subscribe(
          res => $('#successModal').modal(),
          err => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        } );
      } else {
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
