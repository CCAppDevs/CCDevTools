import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];
  invitations: any[] = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getAllProjects().subscribe(result => {
      console.log(result);
      this.projects = result;
    });

    this.data.getAllInvitations().subscribe(result => {
      console.log(result);
    });
  }

}
