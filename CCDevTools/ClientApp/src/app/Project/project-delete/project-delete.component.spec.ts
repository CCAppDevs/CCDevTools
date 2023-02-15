import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeleteComponent } from './project-delete.component';

describe('ProjectDeleteComponent', () => {
  let component: ProjectDeleteComponent;
  let fixture: ComponentFixture<ProjectDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
