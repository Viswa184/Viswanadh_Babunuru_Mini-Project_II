import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) { }
  totalamount: any;
  ngOnInit(): void {
    this.totalamount = this.activatedRoute.snapshot.params["id"];
  }
}