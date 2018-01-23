import { Component, OnChanges, Input } from '@angular/core';
import { DetailAllEventsService } from '../shared/detail-all-events.service';
@Component({
  selector: 'app-services-availables-onlyreading',
  templateUrl: './services-availables-onlyreading.component.html',
  styleUrls: ['./services-availables-onlyreading.component.scss'],
  providers: [ DetailAllEventsService ]
})
export class ServicesAvailablesOnlyreadingComponent implements OnChanges {
  private params: any;
  public data: any;
  public idServiceAvailable: number;
  @Input() idEvent: number;

  constructor(
    private detailAllEventsService: DetailAllEventsService
  ) { }

  ngOnChanges() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userInfo);
    if (userInfo !== undefined && userInfo !== null) {
      this.params = {
        idUser: userInfo.idSystemUser,
        idCompany: userInfo.idCompany,
        idEvent: this.idEvent
      };
      this.getData();
    }
  }

  getData() {
    this.detailAllEventsService.getServicesAvailables(this.params).subscribe(
      t => {
        console.log(t);
        if (t.success) {
          this.data = t.data[0];
          this.idServiceAvailable = t.data[0].idServicesAvailable;
        } else {
          console.log('Error en la consulta');
        }
      }
    );
  }

}
