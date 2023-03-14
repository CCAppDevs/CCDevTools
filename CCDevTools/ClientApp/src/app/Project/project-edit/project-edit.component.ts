import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  id: number = 0;

  project = {
    tickets: []
  };

  projectForm = this.fb.group({
    id: [0],
    name: [''],
    description: [''],
    startdate: [new Date()],
    version: ['0'],
    url: [''],
    tickets: this.fb.array([])
  });

  constructor(private data: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe
      (
        switchMap(params => {
          this.id = Number(params.get('id'));
          return this.data.getProjectById(this.id);
        })
      ).subscribe(result => {
        console.log(result);
        this.project = result;

        this.projectForm.patchValue({
          id: this.id,
          name: result.name,
          description: result.description,
          startdate: result.startDate,
          version: result.version,
          tickets: result.tickets,
          url: result.url
        });
      });
  }

  onSubmit(): void {
    let project =
    {
      id: this.projectForm.value.id,
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      startdate: this.projectForm.value.startdate,
      version: this.projectForm.value.version,
      url: this.projectForm.value.url,
      tickets: []
    };

    console.log('before submit', project)

    this.data.updateProject(project).subscribe(results => {
      this.router.navigate(['/projects', this.id]);
    });
  }

}
