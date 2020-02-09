import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketService } from '../share/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    subject: new FormControl(''),
    content: new FormControl(''),

  });
  constructor(private ticketService: TicketService, private navRouter: Router) {

  }

  ngOnInit() {
  }
  add() {
    this.ticketService.createTicket(this.addForm).subscribe(reponse => {
      console.log(reponse);
      this.navRouter.navigate(['list-tickets']);
    });
  }
}
