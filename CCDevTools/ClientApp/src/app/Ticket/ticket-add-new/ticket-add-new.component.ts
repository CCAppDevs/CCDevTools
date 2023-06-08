import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-ticket-add-new',
  templateUrl: './ticket-add-new.component.html',
  styleUrls: ['./ticket-add-new.component.css']
})
export class TicketAddNewComponent implements OnInit {

  projectId: string | null = "";

  newTicketForm = this.fb.group({
    id: ["0"],
    description: ['ticket description'],
    status: ["0"],
    projectId: ["1"],
    created: [new Date()],
    modified: [new Date()]
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get("id");
      this.newTicketForm.patchValue({ projectId: this.projectId })
    });

  }

  onSubmit() {
    let ticket = {
      id: 0,
      description: this.newTicketForm.value.description,
      status: this.newTicketForm.value.status,
      projectId: this.newTicketForm.value.projectId,
      created: new Date()
    };

    console.log('before submit', ticket);

    this.data.createNewTicket(ticket).subscribe(results => {
      console.log(results);
      this.router.navigate([`projects/${this.projectId}`]);
    });

  }
}
