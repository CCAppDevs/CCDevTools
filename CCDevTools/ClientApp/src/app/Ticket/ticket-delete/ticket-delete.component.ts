import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-ticket-delete',
  templateUrl: './ticket-delete.component.html',
  styleUrls: ['./ticket-delete.component.css']
})
export class TicketDeleteComponent implements OnInit {

  id: number = 0;
  ticket: any;

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = Number(params.get('id'));
        return this.data.getTicketById(this.id);
      })
    ).subscribe(result => {
      this.ticket = result;
    });
  }

  onCancel(): void {
    this.router.navigate([`projects/${this.ticket.projectId}`]);
  }

  onDelete(): void {
    console.log('Deleting');

    this.data.deleteTicket(this.id).subscribe(result => {

      this.router.navigate([`projects/${this.ticket.projectId}`]);
    });
  }

}
