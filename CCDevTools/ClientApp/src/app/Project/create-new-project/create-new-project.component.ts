import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.css']
})
export class CreateNewProjectComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) { }
  newProjectForm = this.fb.group({
    id: [0],
    name: ['Name Text'],
    description: ['Describing text'],
    startdate: [Date.now()],
    version: [0],
    url: ['url.com']
  });

  ngOnInit(): void {
  }

  onSubmit()
  {
    let project =
    {
      id: 0,
      name: this.newProjectForm.value.name,
      description: this.newProjectForm.value.description,
      startdate: Date.now,
      version: this.newProjectForm.value.version,
      url: this.newProjectForm.value.url
    };

    console.log('before submit', project)

    this.data.createNewProject(project).subscribe(results => {
      console.log(results);
      this.router.navigate(['/projects', results.id]);
    });
  }
}
