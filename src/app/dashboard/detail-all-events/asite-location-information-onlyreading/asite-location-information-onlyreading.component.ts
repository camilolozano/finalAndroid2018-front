import { Component, OnChanges, Input } from '@angular/core';
import { DetailAllEventsService } from '../shared/detail-all-events.service';
@Component({
  selector: 'app-asite-location-information-onlyreading',
  templateUrl: './asite-location-information-onlyreading.component.html',
  styleUrls: ['./asite-location-information-onlyreading.component.scss'],
  providers: [ DetailAllEventsService]
})
export class AsiteLocationInformationOnlyreadingComponent implements OnChanges {
  private params: any;
  public data: any;
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
    this.detailAllEventsService.getAsiteLocationInformationData(this.params).subscribe(
      t => {
        // console.log(t);
        if (t.success) {
          this.data = t.data[0];
        } else {
          console.log('Error en la consulta');
        }
      }
    );
  }

}
