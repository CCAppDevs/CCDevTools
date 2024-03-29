import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-invite-user-form',
  templateUrl: './invite-user-form.component.html',
  styleUrls: ['./invite-user-form.component.css']
})
export class InviteUserFormComponent implements OnInit {

  @Input() project: any;
  inviteForm = this.fb.group({
    email: [""],
    projectId: [0],
    userId: [0],
    level: [100]
  });

  @Output() newInviteEvent = new EventEmitter<any>();

  constructor(private data: DataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.inviteForm.patchValue({
      projectId: this.project.id,
      // add user id here for owner
    });
    console.log("submitting form", this.inviteForm.value);

    let formData = {
      email: this.inviteForm.value.email,
      projectId: this.inviteForm.value.projectId,
      userId: this.inviteForm.value.userId,
      level: this.inviteForm.value.level
    }

    this.data.createInvitation(formData).subscribe(data => {
      console.log(data);
      this.newInviteEvent.emit(data);
    });
  }

}
