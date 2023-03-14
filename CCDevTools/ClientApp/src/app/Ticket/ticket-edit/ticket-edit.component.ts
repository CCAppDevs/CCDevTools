import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  id: number = 0;

  ticket = {
    id: 0,
    description: "",
    status: 0,
    projectId: 0,
    created: new Date(),
    modified: new Date()
  };

  ticketForm = this.fb.group({
    id: [0],
    description: [''],
    status: ["0"],
    projectId: ["1"],
    created: [new Date()],
    modified: [new Date()]
  });

  constructor(private data: DataService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = Number(params.get('id'));
        return this.data.getTicketById(this.id);
      })
    ).subscribe(ticketData => {
      console.log(ticketData);
      this.ticket = ticketData;

      this.ticketForm.patchValue({
        id: this.id,
        description: ticketData.description,
        status: ticketData.status,
        projectId: ticketData.projectId,
        modified: ticketData.modified
      });
    });
  }

  onSubmit(): void {
    let ticket = {
      id: this.ticketForm.value.id,
      description: this.ticketForm.value.description,
      status: this.ticketForm.value.status,
      projectId: this.ticketForm.value.projectId,
      created: this.ticket.created,
      modified: new Date()
    };

    console.log('before submit', ticket);

    this.data.updateTicket(ticket).subscribe(results => {
      console.log(results);
      this.router.navigate(['/tickets', this.id]);
    });
  }

}
