import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { LineCommand } from 'src/app/model/line-command';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { CustomerServicesService } from 'src/app/services/customer-services.service';
import { LineCommandServiceService } from 'src/app/services/line-command-service.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  lineCommands: Observable<Array<LineCommand>> ;
  customer: Customer = new Customer() ;
  bill: Bill = new Bill() ;
  total: any ;
  lastIdBill: any ;
  idCustomerAuth: any ;

  constructor(public dialogRef: MatDialogRef<BasketComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {totalLineNbr: number},
              private router: Router,
              private lineCommandService: LineCommandServiceService,
              private billService: BillServiceService,
              private customerService: CustomerServicesService,
              private cookieService: CookieService) {
                this.lastIdBill = this.cookieService.get('idBill') ;
                this.lineCommands = this.lineCommandService.findAllLineCommandByIdBill(Number(this.lastIdBill)) ;
                this.billService.calculateTotal(Number(this.lastIdBill)).subscribe(
                  dataT => this.total = dataT );
              }

  ngOnInit(): void {
    this.lastIdBill = this.cookieService.get('idBill') ;
    this.lineCommands = this.lineCommandService.findAllLineCommandByIdBill(Number(this.lastIdBill)) ;
    this.lineCommandService.findAllLineCommandByIdBill(Number(this.lastIdBill)).subscribe(
      data => {
                console.log(data);
                this.billService.calculateTotal(Number(this.lastIdBill)).subscribe(
                  dataT => this.total = dataT
                ); }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteLine(id: any): void {
    this.lineCommandService.deleteLine(Number(id)).subscribe(
      () => { this.lineCommands = this.lineCommandService.findAllLineCommandByIdBill(Number(this.lastIdBill)) ;
              this.lineCommandService.findAllLineCommandByIdBill(this.lastIdBill).subscribe(
              dataLi =>
                          this.billService.calculateTotal(Number(this.lastIdBill)).subscribe(
                          dataT => this.total = dataT
              )
      ) ;
     }
    ) ;
  }

  buyYes(): void {
    this.idCustomerAuth = this.cookieService.get('idCustomer') ;
    this.customerService.findBCustomerById(this.idCustomerAuth).subscribe(
data => { this.customer = data ;
          this.bill = new Bill() ;
          this.bill.customer = this.customer ;
          this.billService.addBill(this.bill).subscribe(
          () => {
            this.billService.findLastIdBill().subscribe(
              dataB => { this.lastIdBill = dataB ;
                         this.cookieService.set('idBill', this.lastIdBill) ;
                         this.lineCommands = this.lineCommandService.findAllLineCommandByIdBill(Number(this.lastIdBill)) ;
                         this.billService.calculateTotal(Number(this.lastIdBill)).subscribe(
                          dataT => { this.total = dataT ;
                                     this.onNoClick() ; });
              }
            );
          }
          );

}
    );

  }

  back(): void {
    this.onNoClick() ;
  }
}
