import { EmailAddress } from './email-address.model';

export interface Contact {
    id?: number;
    firstName: string;
    lastName: string;

    emailAddresses?: EmailAddress[];
}
