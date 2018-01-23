import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../service/data-forms.service';
import { UpdateDataService } from '../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-services-availables',
  templateUrl: './services-availables.component.html',
  styleUrls: ['./services-availables.component.css'],
  providers: [DataFormsService, UpdateDataService]
})
export class ServicesAvailablesComponent implements OnInit {

  public servicesAvailableForms: FormGroup;
  public data: any;
  public idServiceAvailable: number;
  public publicPrivatewifi: any[];

  @Input() idEvent: number;
  private idUser: number;

  constructor(
    private fb: FormBuilder,
    private dataFormsService: DataFormsService,
    private updateDataService: UpdateDataService,
    public snackBar: MatSnackBar
  ) {
    this.servicesAvailableForms = this.fb.group({
      wifi: [
        null,
        Validators.required
      ],
      public_private_wifi: [
        null,
        Validators.required,
      ],
      phone: [
        null,
        Validators.required,
      ],
      microwave: [
        null,
        Validators.required,
      ],
      fiber: [
        null,
        Validators.required,
      ],
      satellite: [
        null,
        Validators.required,
      ],
      cable: [
        null,
        Validators.required,
      ],
      water: [
        null,
        Validators.required,
      ]
    });
  }

  ngOnInit() {
    this.publicPrivatewifi = [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;

    this.getData();
    this.getPublicPrivateWifi();
  }

  getPublicPrivateWifi() {
    this.dataFormsService.getPublicPrivateWifi(this.idUser).subscribe(
      t => {
        if(t.success) {
          this.publicPrivatewifi = t.data;
        } else {
          console.log('Error en la consulta');
        }
      }
    )
  }

  getData() {
    this.dataFormsService.getServicesAvailables(this.idUser, +this.idEvent).subscribe(
      t => {
        if(t.success) {
          this.data = t.data[0];
          this.idServiceAvailable = t.data[0].idServicesAvailable;
          this.setFormData();
        } else {
          console.log('Error en la consulta');
        }
      }
    )
  }

  updateData(){
    const body = this.servicesAvailableForms.value;
    this.updateDataService.putServicesAvailable(this.idUser, +this.idEvent, body).subscribe(
      t => {
        if(t.success){
          this.snackBar.open(t.msg, '', {
            duration: 5000,
          });
        }else {
          this.snackBar.open(t.msg, '', {
            duration: 5000,
          });
        }
      }
    )
  }

  setFormData() {
    console.log(+this.data['publicprivatewifi'])
    console.log(this.publicPrivatewifi)

    this.servicesAvailableForms.controls['wifi'].setValue(this.data['wifi']);
    this.servicesAvailableForms.controls['public_private_wifi'].setValue(this.data['publicprivatewifi']);
    this.servicesAvailableForms.controls['phone'].setValue(this.data['phone']);
    this.servicesAvailableForms.controls['microwave'].setValue(this.data['microwave']); // No esta
    this.servicesAvailableForms.controls['fiber'].setValue(this.data['fiber']);
    this.servicesAvailableForms.controls['satellite'].setValue(this.data['satellite']); // no esta
    this.servicesAvailableForms.controls['cable'].setValue(this.data['cable']);
    this.servicesAvailableForms.controls['water'].setValue(this.data['water']);
  }

}
