import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { GoalService } from '../../services/goal.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { GoalItemComponent } from '../goal-item/goal-item.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [ MatButtonModule, CommonModule, MatCardModule, MatListModule, GoalItemComponent, MatDialogModule],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.css'
})

export class GoalsListComponent {
  @Input() goals: Goal[] = [];
  @Output() refreshRequested = new EventEmitter<void>();
  // goals: Goal[] = [];

  constructor(private goalService: GoalService, public dialog: MatDialog) {}

  // ngOnInit() {
  //   // this.loadGoals();
  // }

  // tloadGoals() {
  //   this.loadGoals()
  // }

  // openDialog(){
  //   const dialogRef = this.dialog.open(CrudModalComponent, {
  //     width: '250px',
  //     data: {
  //       goal: null,
  //       action: 'Add'
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log('The dialog was closed', result);
  //     this.loadGoals();
  //   });
  // }

}
