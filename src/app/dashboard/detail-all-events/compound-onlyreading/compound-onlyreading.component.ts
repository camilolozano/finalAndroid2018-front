import { Component, OnChanges, Input } from '@angular/core';
import { DetailAllEventsService } from '../shared/detail-all-events.service';
@Component({
  selector: 'app-compound-onlyreading',
  templateUrl: './compound-onlyreading.component.html',
  styleUrls: ['./compound-onlyreading.component.scss'],
  providers: [ DetailAllEventsService ]
})
export class CompoundOnlyreadingComponent implements OnChanges {
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
    this.detailAllEventsService.getCompoundData(this.params).subscribe(
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
