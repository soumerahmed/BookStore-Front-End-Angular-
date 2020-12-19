import { Bill } from './bill';

export class Customer {
    idCustomer?: number ;
    lastName?: string ;
    firstName?: string ;
    cin?: number ;
    tel?: number ;
    role?: number ;
    listBill?: Array<Bill> ;
    // constructor(lastName: string, firstName: string, cin: number, tel: number ){}

}
