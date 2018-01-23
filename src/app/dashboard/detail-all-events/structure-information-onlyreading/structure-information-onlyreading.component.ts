import { Component, OnChanges, Input } from '@angular/core';
import { DetailAllEventsService } from '../shared/detail-all-events.service';

@Component({
  selector: 'app-structure-information-onlyreading',
  templateUrl: './structure-information-onlyreading.component.html',
  styleUrls: ['./structure-information-onlyreading.component.scss'],
  providers: [ DetailAllEventsService ]
})
export class StructureInformationOnlyreadingComponent implements OnChanges {
  private params: any;
  public data: any;
  public idStructureInformation: number;
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
    this.detailAllEventsService.getStructureInformation(this.params).subscribe(
      t => {
        // console.log(t);
        if (t.success) {
          this.data = t.data[0];
          this.idStructureInformation = t.data[0].idstructureInformation;
        } else {
          console.log('Error en la consulta');
        }
      }
    );
  }

}
