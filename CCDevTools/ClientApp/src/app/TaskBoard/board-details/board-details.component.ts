import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DataService } from '../../data.service';

interface categoryItem {
  id: number;
  name: string;
  tasks: any[];
}


@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {
  board: any = {
    id: 0
  };
  id: number = 0;

  categoryList: categoryItem[] = [];

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(param => {
        this.id = Number(param.get('id'));
        return this.data.getBoardById(this.id);
      })
    ).subscribe(result => {
      this.board = result;
      this.categoryList = this.board.categories;
    });
  }

}
