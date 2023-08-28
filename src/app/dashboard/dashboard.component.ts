import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.http.get('http://localhost:3000/item')
      .subscribe(res => { this.menuItems = res; })
  }
  columnNames = ["Id", "Name", "Price", "Image", "Action"];
  menuItems: any;
  selectedItems: Array<any> = []; 
  
  onClick(item: any) {
    if (this.selectedItems.findIndex(x => x.itemId == item.item_id) == -1) {
      this.selectedItems.push({
        "itemId": item.item_id,
        "name": item.item_name,
        "price": item.item_price,
        "quantity": 1,
        "totalPrice": item.itemprice,
        "date": new Date()
      });
    }
  }
  updateTotalPrice(item: any, food: any) {
    const value = parseInt(item.target.value);
    food.totalPrice = value * food.price;
  }
  async saveCartItems() {
    var totalPrice = 0;
    let httpCalls: Observable<any>[] = [];
    this.selectedItems.forEach(element => {
      totalPrice = totalPrice + parseInt(element.totalPrice);
    });
    this.router.navigate(['order',totalPrice])   
  }
}
