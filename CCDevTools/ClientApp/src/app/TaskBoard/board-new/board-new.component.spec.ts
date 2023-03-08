import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNewComponent } from './board-new.component';

describe('BoardNewComponent', () => {
  let component: BoardNewComponent;
  let fixture: ComponentFixture<BoardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
