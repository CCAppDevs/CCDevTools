import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-pending-invitation',
  templateUrl: './pending-invitation.component.html',
  styleUrls: ['./pending-invitation.component.css']
})
export class PendingInvitationComponent implements OnInit {
  invitations: any[] = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getPendingInvitationsByEmail("alice@alice.com").subscribe(results => {
      this.invitations = results;
    });
  }

  dismiss(id: number) {
    this.data.removeInvitationById(id).subscribe(data => {
      this.invitations = this.invitations.filter(inv => inv.invitationId != id);
    });
  }

  accept(id: number) {
    this.data.acceptInvitationById(this.invitations.find(inv => inv.invitationId == id)).subscribe(data => {
      console.log("Invitation accepted", data);
    })
  }

}
