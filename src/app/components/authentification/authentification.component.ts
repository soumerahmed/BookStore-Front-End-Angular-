import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { CustomerServicesService } from 'src/app/services/customer-services.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  lastIdCustomer: any ;
  lastIdBill: any ;
  customer: Customer = new Customer() ;
  bill: Bill = new Bill () ;
  constructor(private route: Router, private billservice: BillServiceService,
              private customerService: CustomerServicesService,
              private cookieService: CookieService) {
              }

  ngOnInit(): void {
  }
  openCustomerBord(): void {
    this.route.navigate(['customer/home']);
    this.customerService.addCustomer(new Customer()).subscribe(
      () => {
        this.customerService.findLastIdCustomer().subscribe(
          data => { this.lastIdCustomer = data ;
                    this.cookieService.set('idCustomer', this.lastIdCustomer) ;
                    console.log(this.lastIdCustomer);
                    this.customerService.findBCustomerById(this.lastIdCustomer).subscribe(
                      dataC => { this.customer = dataC ;
                                 console.log(this.customer) ;
                                 this.bill.customer = this.customer ;
                                 this.billservice.addBill(this.bill).subscribe(
                                   dataB => { console.log(this.bill) ;
                                              this.billservice.findLastIdBill().subscribe(
                                                dataL => {
                                                  this.lastIdBill = dataL ;
                                                  console.log(this.lastIdBill);
                                                  this.cookieService.set('idBill', this.lastIdBill) ;
                                                }
                                              );
                                   }
                                 );
                      }
                    );
                  }
        );
      }
    );

  }
  openAdminBord(): void {
    this.route.navigate(['admin/home']);
  }

}
