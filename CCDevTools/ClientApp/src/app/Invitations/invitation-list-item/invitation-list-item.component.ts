import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-invitation-list-item',
  templateUrl: './invitation-list-item.component.html',
  styleUrls: ['./invitation-list-item.component.css']
})
export class InvitationListItemComponent implements OnInit {
  @Input() project: any;
  @Input() invitation: any;
  @Output() onUpdate = new EventEmitter();
  isEditing: boolean = false;
  isLoaded: boolean = false;

  editForm = this.fb.group({
    invitationId: "",
    email: "",
    projectId: "",
    userId: "",
    level: "",
  });

  constructor(private data: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editForm.patchValue({
      invitationId: this.invitation.invitationId,
      email: this.invitation.email,
      projectId: this.invitation.projectId,
      level: this.invitation.level,
    });
  }

  onDelete() {
    this.data.removeInvitationById(this.invitation.invitationId).subscribe(data => {
      console.log(data);
      this.onUpdate.emit();
    })
  }

  onEdit() {
    this.isEditing = !this.isEditing;
  }

  onSubmit() {
    console.log('form values', this.editForm.value);

    let invitation = {
      invitationId: this.editForm.value.invitationId,
      email: this.editForm.value.email,
      projectId: this.editForm.value.projectId,
      userId: this.editForm.value.userId,
      level: this.editForm.value.level,
    }

    console.log('the invitation before sending', invitation);

    this.data.updateInvitation(invitation).subscribe(results => {
      this.invitation = results;
      this.onUpdate.emit();
      this.isEditing = false;
    })
  }
}
