import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBar,
  MatTableModule,
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messageForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({
      msg: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.messageForm.value);
  }
}
