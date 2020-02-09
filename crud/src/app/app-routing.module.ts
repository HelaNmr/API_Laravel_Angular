import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { AddReplyComponent } from './add-reply/add-reply.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-tickets', component: ListTicketsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add-ticket', component: AddTicketComponent },
  { path: 'edit-ticket', component: EditTicketComponent },
  { path: 'add-reply', component: AddReplyComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
