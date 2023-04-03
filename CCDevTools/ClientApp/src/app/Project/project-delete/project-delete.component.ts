import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.css']
})
export class ProjectDeleteComponent implements OnInit {


  id: number = 0;
  project: any;

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = Number(params.get('id'));
        return this.data.getProjectById(this.id);
      })
    ).subscribe(result => {
      this.project = result;
    });
  }

  onCancel() {
    //this navigates back to the project details page
    this.router.navigate(['projects']);
  }
  onDelete() {
    console.log('deleting');

    this.data.deleteProject(this.id).subscribe(result => {
      this.router.navigate(['projects']);
    })
  }

}
