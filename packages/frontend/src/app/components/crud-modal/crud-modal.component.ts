import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GoalService } from '../../services/goal.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  goal: Goal;
  action: string;
}

@Component({
  selector: 'app-crud-modal',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,MatInputModule,CommonModule, MatButtonModule],
  templateUrl: './crud-modal.component.html',
  styleUrl: './crud-modal.component.css',
})
export class CrudModalComponent implements OnInit {

  goal: Goal = {} as Goal;
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrudModalComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private goalService: GoalService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.pattern(/I want to (.+) (every \d+ \w+)/i)]]
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  onSaveClick(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form);
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
      } else if (this.data.action === 'Complete') {
        this.goalService.updateGoal({...this.data.goal, "completed": true}).subscribe({
          next: () => {this.dialogRef.close(), this.openSnackBar('Goal completed successfully!', 'Close')},
          error: (error) => {console.error('Error updating goal:', error), this.openSnackBar('Error completing goal!: '+ error.error.error, 'Close')}
        });
      } else {
        this.goalService.addGoal(this.goal).subscribe({
          next: () => {this.dialogRef.close(), this.openSnackBar('Goal added successfully!', 'Close')},
          error: (error) => {console.error('Error adding goal:', error.error.error), this.openSnackBar('Error adding goal!: '+ error.error.error, 'Close')}
        });
      }
    } else {
      console.log('Validation Errors:', this.form);
    }
  }

}
