import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: any = {};
  id: number = 0;
  isLoaded: boolean = false;

  constructor(private data: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void
  {
    this.route.paramMap.pipe
    (
      switchMap(params =>{
        this.id = Number(params.get('id'));
        return this.data.getProjectById(this.id);
        })
    ).subscribe(projectData => {
      console.log(projectData);
      this.project = projectData;
      this.isLoaded = true;
    });
   
  }

}
