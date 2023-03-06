import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-ticket-add-new',
  templateUrl: './ticket-add-new.component.html',
  styleUrls: ['./ticket-add-new.component.css']
})
export class TicketAddNewComponent implements OnInit {

  newTicketForm = this.fb.group({
    id: ['0'],
    description: ['ticket description'],
    ticketStatus: 0,
    ProjectId: ['1']
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.newTicketForm.value);
    this.data.createNewTicket(this.newTicketForm.value).subscribe(results => {
      console.log(results);
      this.router.navigate(['/tickets', results.id]);
    });

  }
}
