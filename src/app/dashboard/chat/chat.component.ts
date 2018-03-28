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

import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  public messageForm: FormGroup;
  private idUser: number;
  private idCompany: number;

  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private chatService: ChatService
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

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
    this.idCompany = userInfo.idCompany;
  }
  onSubmit() {
    const doc  = this.data.data['document'];
    const body = {
      idDocument: doc,
      message: this.messageForm.value['msg'],
      idCompany: this.idCompany
    };
    this.chatService.postUrlSendMsg(this.idUser, body).subscribe(
      t => {
        console.log(t);
      }
    );
  }
}
