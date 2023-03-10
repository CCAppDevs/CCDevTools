import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
    return this.http.put<any>(`${this.baseUrl}/projects`, project)
  }

  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${project.id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/projects/${id}`);
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
