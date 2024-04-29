import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Goal } from '../../interfaces/goal';
import { MatButtonModule } from '@angular/material/button';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-goal-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,MatDialogModule],
  templateUrl: './goal-item.component.html',
  styleUrl: './goal-item.component.css'
})
export class GoalItemComponent {
  @Input() goal!: Goal;
  @Output() refreshRequested = new EventEmitter<void>();

  constructor(public dialog: MatDialog) { }

  openDialog(goal: Goal, action: string): void {

    const dialogRef = this.dialog.open(CrudModalComponent, {
      height: '400px',
      width: '400px',
      data: { goal: goal, action: action },
      panelClass: 'custom-dialog-padding'
    });


    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', this.refreshRequested);
      this.refreshRequested.emit();
    });
  }

}
