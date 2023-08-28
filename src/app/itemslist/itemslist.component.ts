import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { ItemModel } from './itemslist.model';

@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.css']
})
export class ItemslistComponent implements OnInit {

  formValue !: FormGroup;
  ItemModelObj:ItemModel=new ItemModel()
  ItemDetails!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,private api:ApiService){ }
  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      itemName:[''],
      itemPrice:['']
    })
    this.getItemDetails();
  }
  clickAddItem(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postItemDetails(){
    this.ItemModelObj.itemName=this.formValue.value.itemName;
    //this.ItemModelObj.itemImage=this.formValue.value.itemImage;
    this.ItemModelObj.itemPrice=this.formValue.value.itemPrice;

    this.api.postItem(this.ItemModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Item added successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getItemDetails();
    })
  }
  getItemDetails(){
    this.api.getItem()
    .subscribe(res=>{
      this.ItemDetails=res;
    })
  }
  deleteItem(row:any){
    this.api.deleteItem(row.id)
    .subscribe(res=>{
      alert("Item deleted successfully")
      this.getItemDetails();
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.ItemModelObj.id=row.id;
    this.formValue.controls['itemName'].setValue(row.itemName);
    //this.formValue.controls['itemImage'].setValue(row.itemImage);
    this.formValue.controls['itemPrice'].setValue(row.itemPrice);
  }
  updateItemDetails(){
    this.ItemModelObj.itemName=this.formValue.value.itemName;
    //this.ItemModelObj.itemImage=this.formValue.value.itemImage;
    this.ItemModelObj.itemPrice=this.formValue.value.itemPrice;
    this.api.updateItem(this.ItemModelObj,this.ItemModelObj.id)
    .subscribe(res=>{
      alert("Item updated successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getItemDetails();
    })
  }

}
