import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDeleteComponent } from './board-delete.component';

describe('BoardDeleteComponent', () => {
  let component: BoardDeleteComponent;
  let fixture: ComponentFixture<BoardDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
