import { Component, OnInit } from '@angular/core';
import { Ticket } from '../share/ticket.model';
import { TicketService } from '../share/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit {
  listTickets: Ticket[] = []
  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(data => {
      console.log(' data from api ', data)
      this.listTickets = data.data
    })
  }
  delete(ticket) {
    this.ticketService.deleteTicket(ticket.id).subscribe(data => {
      console.log('delete success')
    }
    )
  }

  toEdit(ticket) {
    this.router.navigateByUrl('edit-ticket', { state: ticket })
  }
  toReply(ticket) {
    this.router.navigateByUrl('add-reply', { state: ticket })
  }
}
