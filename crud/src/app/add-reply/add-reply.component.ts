import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketService } from '../share/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reply',
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.css']
})
export class AddReplyComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    content: new FormControl('')
  })
  ticketId: any
  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
    this.ticketId = window.history.state.id
    console.log('id :', this.ticketId)
    this.addForm = new FormGroup({
      content: new FormControl('')
    })
  }
  add() {
    this.ticketService.createReply(this.addForm, this.ticketId).subscribe(data => {
      console.log(data)
      this.router.navigateByUrl('list-tickets')
    })
  }
}
