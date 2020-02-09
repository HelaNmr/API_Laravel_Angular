import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { AddReplyComponent } from './add-reply/add-reply.component';
import { TicketService } from './share/ticket.service';
import { AuthService } from './share/auth.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListTicketsComponent,
    EditTicketComponent,
    AddTicketComponent,
    AddReplyComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AppRoutingModule,


  ],
  exports: [RouterModule],
  providers: [TicketService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
