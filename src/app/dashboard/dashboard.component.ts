import { Component, OnInit } from '@angular/core';
import { LogOutService } from './services/log-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LogOutService]
})
export class DashboardComponent implements OnInit {

  private idUser: string;

  constructor(
    private logOutService: LogOutService,
    private router: Router
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
  }

  logOut() {
    this.logOutService.setlogOut(this.idUser).subscribe(
      t => {
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
  }

  security() {
    this.router.navigate(['home/update-password']);
  }

}
