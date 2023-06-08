import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, of, switchMap, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') base: string) {
    this.baseUrl = base + "api";
  }

// Projects

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${id}`);
  }

  createNewProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/projects`, project)
  }

  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${project.id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/projects/${id}`);
  }

  // invitations
  getAllInvitations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/invitations`);
  }

  getAllInvitationsByProject(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/invitations`).pipe(
      map(results => results.filter(invite => invite.projectId == id))
    );
  }

  getPendingInvitationsByEmail(email: string): Observable<any[]> {
    return this.getAllInvitations().pipe(
      map(results => results.filter(i => i.email == email))
    );
  }

  removeInvitationById(invitationId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/invitations/${invitationId}`);
  }

  acceptInvitationById(invitation: any): Observable<any> {
    // add a row to membership table
    // delete the row from invitation table
    let membership = {
      projectId: invitation.projectId,
      userId: invitation.userId,
      level: invitation.Level,
      project: undefined,
      user: undefined
    } // TODO: make a membership based on the current data.

    return this.http.post<any>(`${this.baseUrl}/memberships`, membership).pipe(
      switchMap(data => {
        return this.removeInvitationById(invitation.invitationId);
      })
    );
  }

  createInvitation(invitation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/invitations/`, invitation);
  }

  updateInvitation(invitation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/invitations/${invitation.invitationId}`, invitation);
  }

  // tickets

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tickets`);
  }

  getTicketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tickets/${id}`);
  }

  createNewTicket(ticket: any): Observable<any> {
    console.log('creating ticket', ticket);
    return this.http.post<any>(`${this.baseUrl}/tickets`, ticket);
  }

  updateTicket(ticket: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tickets/${ticket.id}`, ticket);
  }
  
  deleteTicket(id: number): Observable<any>
  {
    return this.http.delete<any>(`${this.baseUrl}/tickets/${id}`);
  }
   

  // board list
  getAllBoards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/taskboards`);
  }

  getBoardById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/taskboards/${id}`);
  }

  createNewBoard(board: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/taskboards`, board);
  }

  updateBoard(board: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/taskboards/${board.id}`, board);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/taskboards/${id}`);
  }
}
