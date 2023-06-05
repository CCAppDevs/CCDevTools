import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {
  @Input() project: any = {};

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    console.log("deleting", id);
  }

  onEdit(id: number) {
    console.log("editing", id);
  }

  onNewInvite() {
    console.log('adding a new invite');
  }
}
