  import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-board-new',
  templateUrl: './board-new.component.html',
  styleUrls: ['./board-new.component.css']
})
export class BoardNewComponent implements OnInit {

  boardForm = this.fb.group({
    id: ['0'],
    name: ['new board name'],
    projectId: ['1'],
    description: ['new board description'],
    categories: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.boardForm.value);
    this.data.createNewBoard(this.boardForm.value).subscribe(results => {
      console.log(results);
      // redirect to the detail page
      this.router.navigate(['/boards', results.id]);
    })
  }

}
