import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  id: number = 0;
  ticket: any = {
    id: 0
  }

  constructor(private data: DataService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.paramMap.pipe(
      switchMap(params => {
        this.id = Number(params.get('id'));
        return this.data.getTicketById(this.id);
      })
    ).subscribe(ticketData => {
      console.log(ticketData);
      this.ticket = ticketData;
    });
  }

}
