import { Component, Inject, Optional } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GoalService } from '../../services/goal.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  goal: Goal;
  action: string;
}

@Component({
  selector: 'app-crud-modal',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatInputModule,CommonModule],
  templateUrl: './crud-modal.component.html',
  styleUrl: './crud-modal.component.css',
})
export class CrudModalComponent {

  goal: Goal = {} as Goal;

  constructor(
    public dialogRef: MatDialogRef<CrudModalComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private goalService: GoalService,
    private snackBar: MatSnackBar
  ) {
      console.log(this.data);
     }


  onNoClick(): void {
    // console.log(this.data);
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration the snack bar will be shown
      horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }

  onSaveClick(): void {
    // console.log(this.data);
    console.log(this.goal);

    if (this.data.action === 'Edit') {
      this.goalService.updateGoal(this.data.goal).subscribe({
        next: () => {this.dialogRef.close(), this.openSnackBar('Goal updated successfully!', 'Close')},
        error: (error) => {console.error('Error updating goal:', error), this.openSnackBar('Error adding goal!: '+ error.error.error, 'Close')}
      });
    } else if(this.data.action === 'Delete' && this.data.goal.id) {
      this.goalService.deleteGoal(this.data.goal.id).subscribe({
        next: () => {this.dialogRef.close(), this.openSnackBar('Goal deleted successfully!', 'Close')},
        error: (error) => {console.error('Error deleting goal:', error), this.openSnackBar('Error deleting goal!: '+ error.error.error, 'Close')}
      });
    } else {
      this.goalService.addGoal(this.goal).subscribe({
        next: () => {this.dialogRef.close(), this.openSnackBar('Goal added successfully!', 'Close')},
        error: (error) => {console.error('Error adding goal:', error.error.error), this.openSnackBar('Error adding goal!: '+ error.error.error, 'Close')}
      });
    }

  }

}
