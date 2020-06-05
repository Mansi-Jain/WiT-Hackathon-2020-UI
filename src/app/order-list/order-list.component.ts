import { Component, OnInit } from '@angular/core';
import { AccountService} from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders = null;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getAll()
            .pipe(first())
            .subscribe(orders => this.orders = orders);
  }

}
