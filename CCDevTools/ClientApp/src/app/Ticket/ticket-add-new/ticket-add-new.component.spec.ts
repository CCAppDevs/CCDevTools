import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddNewComponent } from './ticket-add-new.component';

describe('TicketAddNewComponent', () => {
  let component: TicketAddNewComponent;
  let fixture: ComponentFixture<TicketAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
