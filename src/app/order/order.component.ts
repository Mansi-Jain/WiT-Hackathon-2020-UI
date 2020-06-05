import { Component, OnInit } from '@angular/core';
import { AccountService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { Router} from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  uniqueId = null;
  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
  }

  placeOrder(){
    this.uniqueId = this.accountService.getUniqueId();

    this.accountService.placeOrder(this.uniqueId)
          .pipe()
          .subscribe(
            data => {
                this.alertService.success('Your Order has been placed successfully.', { keepAfterRouteChange: true });
                this.router.navigate(['order-list']);
            },
            error => {
                this.alertService.error("You already have an active order. You can place a new order after an interval of 10 days.", { keepAfterRouteChange: true });
                this.router.navigate(['order-list'])
            });
  }
}
