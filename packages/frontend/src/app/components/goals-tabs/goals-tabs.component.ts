import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { GoalsListComponent } from '../goals-list/goals-list.component';
import { MatCardModule } from '@angular/material/card';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';

@Component({
  selector: 'app-goals-tabs',
  standalone: true,
  imports: [MatTabsModule, GoalsListComponent, MatCardModule, MatDialogModule, MatButtonModule],
  templateUrl: './goals-tabs.component.html',
  styleUrl: './goals-tabs.component.css'
})
export class GoalsTabsComponent implements OnInit {
  selectedTab: number = 0;
  goals: Goal[] = [];
  completedGoals: Goal[] = [];

  constructor(private goalService: GoalService,public dialog: MatDialog) {}

  ngOnInit() {
    this.loadGoals();
  }

  loadGoals() {
    this.goals=[]
    this.completedGoals = [];
    this.goalService.getGoals().subscribe({
      next: (goals) =>  goals.map((goal) => goal.completed ? this.completedGoals.push(goal) : this.goals.push(goal)),
      error: (error) => console.error('Error fetching goals:', error)
    });
  }
  onSelectedTab (event: any): void {
    console.log("🚀 ~ GoalsTabsComponent ~ onSelectedTab ~ event:", event, this.goals, this.completedGoals)

    this.selectedTab = event;
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
