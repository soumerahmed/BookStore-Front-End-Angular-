import { Customer } from './customer';
import { LineCommand } from './line-command';

export class Bill {

idBill?: number;
totalPrice?: number;
date?: Date;
listLineCommand?: Array<LineCommand>;
customer?: Customer;

// constructor(customer: Customer, totalPrice: number){}
}

