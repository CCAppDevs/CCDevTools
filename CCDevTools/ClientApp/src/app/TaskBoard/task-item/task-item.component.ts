import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: any;

  constructor() { }

  ngOnInit(): void {
  }

}
