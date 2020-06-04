import { Component, OnInit } from '@angular/core';
import { AccountService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
  }

  placeOrder(){
    this.accountService.placeOrder()
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Your order has been placed successful', { keepAfterRouteChange: true });
                  this.router.navigate(['/']);
              },
              error => {
                  this.alertService.error(error);
              });
  }
}
