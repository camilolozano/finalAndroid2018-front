import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ListUsersService } from './services/list-users.service';
import { MatDialog, MatSnackBar, MatTableModule, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { User } from './services/user.model';
import 'rxjs/add/observable/of';
import { UpdateUserComponent } from './update-user/update-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [ListUsersService]
})
export class ListUsersComponent implements OnInit {

  public dialogResult: any;
  private idUser: string;
  public dataUsers: any;

  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private listUsersService: ListUsersService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  displayedColumns = [
    'no.',
    'userType',
    'identificationCard',
    'names',
    'emailUsername',
    'state',
    'action'
  ];

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
    this.getUsers();
  }

  getUsers(){
    this.listUsersService.getListUsers(this.idUser).subscribe(
      t => {
        this.dataUsers = t;
        this.dataSource = new MatTableDataSource<User>(this.dataUsers);
      },
      (err) => console.log(err),
      () => {
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(_element: User[]) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '800px',
      data: {
        elements: _element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  putUserState(_element: any) {
    const body = {
      idSystemUser: _element.idSystemUser,
      state: _element.state
    };
    this.listUsersService.putStateUser(this.idUser, body).subscribe(
      t => {
        if (t.success) {
          this.snackBar.open(t.msg, 'Successful', {
            duration: 5000,
          });
        } else {
          this.snackBar.open(t.msg, 'Error', {
            duration: 5000,
          });
        }
      }
    );
  }

}
