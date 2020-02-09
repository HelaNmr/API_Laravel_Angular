import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../share/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl('')
  })
  constructor(private userService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  register() {
    this.userService.register(this.registerForm).subscribe(data => {
      this.router.navigateByUrl('login')
    })
  }
}
