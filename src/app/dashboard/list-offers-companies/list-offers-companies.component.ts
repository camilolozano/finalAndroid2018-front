import { Component, OnInit } from '@angular/core';
import { ListOffersService } from './services/list-offers.service';

@Component({
  selector: 'app-list-offers-companies',
  templateUrl: './list-offers-companies.component.html',
  styleUrls: ['./list-offers-companies.component.css'],
  providers: [ListOffersService]
})
export class ListOffersCompaniesComponent implements OnInit {

  public displayedColumns: any[];
  public dataSource: any;
  public idUser: number;
  public idEmp: number;

  constructor(
    private listOffersService: ListOffersService
  ) {
    this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = userInfo.idSystemUser;
    this.idEmp = userInfo.idCompany;
    this.getListOfferts();
  }

  getListOfferts() {
      this.listOffersService.getListOffers(this.idUser, this.idEmp).subscribe(
      t => {
        if (t.success) {
          // console.log(t.data);
          this.dataSource = t.data;
        } else {
          console.log('No data');
        }
      }
    );
  }

}
