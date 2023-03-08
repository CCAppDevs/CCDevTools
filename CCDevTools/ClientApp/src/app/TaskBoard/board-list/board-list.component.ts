import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  boards: any[] = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getAllBoards().subscribe(result => {
      this.boards = result;
    })
  }

}
