import { Component, OnInit, Inject, OnChanges } from '@angular/core';
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
export class ChatComponent implements OnInit, OnChanges {
  public messageForm: FormGroup;
  private idUser: number;
  private idCompany: number;
  public msg: string;

  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private chatService: ChatService
  ) {
    this.messageForm = this.fb.group({
      msg: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ.,:-_()$%&!?¿0#-9 ]+'), Validators.maxLength(25)])
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnChanges() {
    this.messages();
    this.getSyncMessages();
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
    this.idCompany = userInfo.idCompany;
    this.messages();
    this.getSyncMessages();
  }

  messages() {
    this.chatService.getTalk(this.idUser, this.data.data['master'], this.data.data['idclient'], this.idCompany).subscribe(
      t => {
        this.msg = t.data;
      }
    );
  }

  getSyncMessages() {
    this.chatService.getSyncMessages().subscribe(
      t => {
        console.log(t);
        this.messages();
      }
    );
  }

  onSubmit() {
    if (this.messageForm.value['msg'].trim() === '') {
      console.log('no');
    } else {
      const doc  = this.data.data['master'];
      const body = {
        idMaster: doc,
        message: this.messageForm.value['msg'],
        idCompany: this.idCompany
      };
      this.chatService.postUrlSendMsg(this.idUser, body).subscribe(
      t => {
        this.messages();
      }, err => console.log(err), () => this.messageForm.reset());
    }
  }
}
