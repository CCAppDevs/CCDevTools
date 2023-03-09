import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { DataService } from './data.service';
import { ProjectListComponent } from './Project/project-list/project-list.component';
import { TicketsComponent } from './Ticket/tickets/tickets.component';
import { TicketDetailsComponent } from './Ticket/ticket-details/ticket-details.component';
import { TicketEditComponent } from './Ticket/ticket-edit/ticket-edit.component';
import { ProjectDetailComponent } from './Project/project-detail/project-detail.component';
import { TicketAddNewComponent } from './Ticket/ticket-add-new/ticket-add-new.component';
import { ProjectEditComponent } from './Project/project-edit/project-edit.component';
import { ProjectDeleteComponent } from './Project/project-delete/project-delete.component';
import { CreateNewProjectComponent } from './Project/create-new-project/create-new-project.component';
import { BoardListComponent } from './TaskBoard/board-list/board-list.component';
import { BoardDetailsComponent } from './TaskBoard/board-details/board-details.component';
import { BoardNewComponent } from './TaskBoard/board-new/board-new.component';
import { BoardEditComponent } from './TaskBoard/board-edit/board-edit.component';
import { BoardDeleteComponent } from './TaskBoard/board-delete/board-delete.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CategoryItemComponent } from './TaskBoard/category-item/category-item.component';
import { TaskItemComponent } from './TaskBoard/task-item/task-item.component';
import { TicketDeleteComponent } from './Ticket/ticket-delete/ticket-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    TicketsComponent,
    TicketDetailsComponent,
    TicketEditComponent,
    TicketAddNewComponent,
    TicketDeleteComponent,
    ProjectEditComponent,
    ProjectDeleteComponent,
    CreateNewProjectComponent,
    ProjectDeleteComponent,
    BoardListComponent,
    BoardDetailsComponent,
    BoardNewComponent,
    BoardEditComponent,
    BoardDeleteComponent,
    CategoryItemComponent,
    TaskItemComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    AlertModule.forRoot(),
    SortableModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent, canActivate: [AuthorizeGuard] },
      { path: 'tickets/new', component: TicketAddNewComponent, canActivate: [AuthorizeGuard] },
      { path: 'tickets/:id', component: TicketDetailsComponent, canActivate: [AuthorizeGuard] },
      { path: 'tickets/edit/:id', component: TicketEditComponent, canActivate: [AuthorizeGuard] },
      { path: 'tickets/delete/:id', component: TicketDeleteComponent, canActivate: [AuthorizeGuard], },
      { path: 'projects', component: ProjectListComponent, canActivate: [AuthorizeGuard] },
      { path: 'projects/new', component: CreateNewProjectComponent, canActivate: [AuthorizeGuard] },
      { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthorizeGuard] },
      { path: 'projects/edit/:id', component: ProjectEditComponent, canActivate: [AuthorizeGuard] },
      { path: 'projects/delete/:id', component: ProjectDeleteComponent, canActivate: [AuthorizeGuard] },
      { path: 'boards', component: BoardListComponent, canActivate: [AuthorizeGuard] },
      { path: 'boards/new', component: BoardNewComponent, canActivate: [AuthorizeGuard] },
      { path: 'boards/delete/:id', component: BoardDeleteComponent, canActivate: [AuthorizeGuard] },
      { path: 'boards/:id', component: BoardDetailsComponent, canActivate: [AuthorizeGuard] },
      { path: 'boards/edit/:id', component: BoardEditComponent, canActivate: [AuthorizeGuard] },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
