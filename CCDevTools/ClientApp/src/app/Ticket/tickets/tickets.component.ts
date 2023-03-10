import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets: any[] = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getAllTickets().subscribe(result => {
      this.tickets = result;
    });
  }

}
