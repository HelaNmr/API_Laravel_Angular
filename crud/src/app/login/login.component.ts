import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../share/auth.service';
@NgModule({
  imports: [MatFormFieldModule],
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),

  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(loginform: FormGroup) {
    this.auth.getAccessToken(loginform);

    this.router.navigate(['list-tickets']);
  }
}
