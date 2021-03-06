import { Component, OnInit, OnChanges } from '@angular/core';
import { LogOutService } from './services/log-out.service';
import { Router } from '@angular/router';
import { NewOffertService } from './sokets-services/new-offert/new-offert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LogOutService, NewOffertService]
})
export class DashboardComponent implements OnInit, OnChanges {

  private idUser: string;
  public companyName: string;
  public alerts: number;
  private idCompany: number;

  constructor(
    private logOutService: LogOutService,
    private newOffertService: NewOffertService,
    private router: Router
  ) { }

  ngOnChanges() {
    this.getConuntOfferts();
  }

  ngOnInit() {
    this.alerts = 0;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.companyName = userInfo.nameBusiness;
    this.idUser = userInfo.idSystemUser;
    this.idCompany = userInfo.idCompany;
    this.getOferts();
    this.getConuntOfferts();
  }

  logOut() {
    this.logOutService.setlogOut(this.idUser).subscribe(
      t => {
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
  }

  getConuntOfferts() {
    this.logOutService.getCountOffersCompanyCount(this.idUser, this.idCompany).subscribe(
      data => {
        if (data.success) {
          this.alerts = data.data;
        }
      }
    );
  }

  getOferts() {
    this.newOffertService.getTurnoSocket().subscribe(
      t => {
        const companies = t.payload;
        companies.map((e, i) => {
          if (+this.idCompany === +e.idCompany) {
            this.getConuntOfferts();
          }
        });
      }
    );
  }

  security() {
    this.router.navigate(['home/update-password']);
  }

}
