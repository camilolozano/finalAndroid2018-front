import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params} from '@angular/router';
import { DetailAllEventsService } from './shared/detail-all-events.service';
@Component({
  selector: 'app-detail-all-events',
  templateUrl: './detail-all-events.component.html',
  styleUrls: ['./detail-all-events.component.css'],
  providers: [ DetailAllEventsService ]
})
export class DetailAllEventsComponent implements OnInit {
  public idEvent: number;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private detailAllEventsService: DetailAllEventsService
  ) { }

  ngOnInit() {
    this.route.params.forEach((p: Params) => {
      this.idEvent = +p['idEvent'];
    });
  }

  returnPague() {
    this.location.back();
  }
}
