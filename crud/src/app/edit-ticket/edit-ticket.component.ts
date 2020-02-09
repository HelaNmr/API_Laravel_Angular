import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketService } from '../share/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    category: new FormControl(''),
    subject: new FormControl(''),
    content: new FormControl(''),

  });
  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
    console.log(' ticket from navigation : ', window.history.state)
    var ticket = window.history.state
    this.editForm = new FormGroup({
      id: new FormControl(ticket.id),
      category: new FormControl(ticket.category),
      subject: new FormControl(ticket.subject),
      content: new FormControl(ticket.content),

    });
  }
  editTicket() {
    this.ticketService.updateTicket(this.editForm, this.editForm.value.id).subscribe(data => {
      console.log(data)
      this.router.navigateByUrl('list-tickets')
    })
  }
}
