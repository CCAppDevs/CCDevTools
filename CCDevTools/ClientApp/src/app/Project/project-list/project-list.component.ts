import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getAllProjects().subscribe(result => {
      console.log(result);
    })
  }

}
