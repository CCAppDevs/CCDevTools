import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationListItemComponent } from './invitation-list-item.component';

describe('InvitationListItemComponent', () => {
  let component: InvitationListItemComponent;
  let fixture: ComponentFixture<InvitationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
