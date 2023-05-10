import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  isShowDiv = true;
  showAll: boolean = false;
  toggleShowAll() {
    this.showAll = !this.showAll
  }
  toggleTicketDiv() {
    this.isShowDiv = !this.isShowDiv
  }
  @Input() tickets: any[] = [];
  @Input() projectId: number = 0;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    //this.data.getAllTickets().subscribe(result => {
    //  this.tickets = result;
    //});
  }
  canShow(status: number) {
    return status != 10 || this.showAll;

  }
}
