import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      name:[''],
      password:['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUser")
    .subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.name === this.loginForm.value.name && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login successfull");
        this.loginForm.reset();
        if(user.role=='admin'){
          this.router.navigate(['list'])
        }
        else{
          this.router.navigate(['dashboard'])
        }
        //this.router.navigate(['list'])
      }else{
        //alert("User not found");
      }
    },err=>{
      alert("Something went wrong");
    })
  }
}
