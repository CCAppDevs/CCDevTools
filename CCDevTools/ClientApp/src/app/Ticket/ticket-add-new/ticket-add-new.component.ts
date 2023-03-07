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
    id: ["0"],
    description: ['ticket description'],
    status: ["0"],
    projectId: ["1"],
    created: [Date.now()],
    modified: [Date.now()]
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let ticket = {
      id: 0,
      description: this.newTicketForm.value.description,
      //status: this.newTicketForm.value.status,
      projectId: this.newTicketForm.value.projectId,
      //created: Date.now
    };

    console.log('before submit', ticket);

    this.data.createNewTicket(ticket).subscribe(results => {
      console.log(results);
      this.router.navigate(['/tickets', results.id]);
    });

  }
}
