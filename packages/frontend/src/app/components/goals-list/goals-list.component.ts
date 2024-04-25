import { Component, OnInit } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { GoalService } from '../../services/goal.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { GoalItemComponent } from '../goal-item/goal-item.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';

@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, CommonModule, MatCardModule, MatListModule, GoalItemComponent, MatDialogModule],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.css'
})

export class GoalsListComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadGoals();
  }

  loadGoals() {
    this.goalService.getGoals().subscribe({
      next: (goals) => this.goals = goals,
      error: (error) => console.error('Error fetching goals:', error)
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(CrudModalComponent, {
      width: '250px',
      data: {
        goal: null,
        action: 'Add'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      this.loadGoals();
    });
  }

}
