import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-board-delete',
  templateUrl: './board-delete.component.html',
  styleUrls: ['./board-delete.component.css']
})
export class BoardDeleteComponent implements OnInit {

  id: number = 0;
  board: any;

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = Number(params.get('id'));
        return this.data.getBoardById(this.id);
      })
    ).subscribe(result => {
      this.board = result;
    });
  }

  onCancel(): void {
    // redirect back to the board list
    this.router.navigate(['boards']);
  }

  onDelete(): void {
    console.log('Deleting');

    this.data.deleteBoard(this.id).subscribe(result => {
      this.router.navigate(['boards']);
    });
  }

}
