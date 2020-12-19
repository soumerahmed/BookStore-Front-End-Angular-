import { Bill } from './bill';
import { Book } from './book';

export class LineCommand {

    idLineCommand?: number ;
    qt?: number;
    book?: Book;
    bill?: Bill ;
    constructor(qt: number , book: Book , bill: Bill){}
}
