import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {
  @Input() project: any = {};
  @Output() dataChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onListUpdate() {
    this.dataChanged.emit();
  }
}
