// goal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from '../interfaces/goal'; // Assuming you have a Goal interface

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:3000/goals'; // URL to web API

  constructor(private http: HttpClient) { }

  // Get all goals
  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.apiUrl);
  }

  // Get a single goal by id
  getGoalById(id: number): Observable<Goal> {
    return this.http.get<Goal>(`${this.apiUrl}/${id}`);
  }

  // Add a new goal
  addGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.apiUrl, goal);
  }

  // Update an existing goal
  updateGoal(goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(`${this.apiUrl}/${goal.id}`, goal);
  }

  // Delete a goal
  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
