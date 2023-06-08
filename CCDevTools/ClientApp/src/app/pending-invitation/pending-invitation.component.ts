import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-pending-invitation',
  templateUrl: './pending-invitation.component.html',
  styleUrls: ['./pending-invitation.component.css']
})
export class PendingInvitationComponent implements OnInit {
  invitations: any[] = [];
  username: any;

  constructor(private data: DataService, private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    // TODO: TOP PRIORITY, get user email from user data

    this.authorizeService.getUser().pipe(
      switchMap(u => {
        this.username = u!.name;
        return this.data.getPendingInvitationsByEmail(this.username);
      })
    ).subscribe(data => {
      this.invitations = data;
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
