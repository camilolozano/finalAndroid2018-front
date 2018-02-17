import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../service/data-forms.service';
import { UpdateDataService } from '../service/update-data.service';
import { MatSnackBar } from '@angular/material';
import { SiteLocationData } from '../../data/location';

@Component({
  selector: 'app-asite-location-information',
  templateUrl: './asite-location-information.component.html',
  styleUrls: ['./asite-location-information.component.css'],
  providers: [DataFormsService, UpdateDataService]
})
export class AsiteLocationInformationComponent implements OnInit {

  public aSiteLocationInformationForm: FormGroup;
  public locationType: any[];
  public AcPowerAvailable: any[];
  public data: any;
  public selectedLocationType: any;
  private idUser: number;
  public checked: Boolean;

  public states: any;
  public cities: any;

  @Input() idEvent: number;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dataFormsService: DataFormsService,
    private updateDataService: UpdateDataService
  ) {
    this.aSiteLocationInformationForm = this.fb.group({
      name: [
       null,
       Validators.compose([Validators.required, Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(300)])
      ],
      owner: [
        null,
        Validators.required,
      ],
      address: [
        null,
        Validators.required,
      ],
      city: [
        null,
        Validators.required,
      ],
      state: [
        null,
        Validators.required,
      ],
      zip: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      county: [
        null,
        Validators.required,
      ],
      location_type: [
        null,
        Validators.required,
      ],
      loam: [
        null,
        Validators.required,
      ],
      sand_and_gravel: [
        null,
        Validators.required,
      ],
      shale: [
        null,
        Validators.required,
      ],
      clay: [
        null,
        Validators.required,
      ],
      limestone: [
        null,
        Validators.required,
      ],
      sandstone: [
        null,
        Validators.required,
      ],
      granite: [
        null,
        Validators.required,
      ],
      slate: [
        null,
        Validators.required,
      ],
      other: [
        null,
      ],
      otherBoolean: [
        null,
        Validators.required,
      ],
      access_road: [
        null,
        Validators.required,
      ],
      type_of_access_road: [
        null,
        Validators.required,
      ],
      _4x4_required: [
        null,
        Validators.required,
      ],
      ac_power_available: [
        null,
        Validators.required,
      ],
      solar_power: [
        null,
        Validators.required,
      ],
      size_solar_power: [
        null,
        Validators.required,
      ],
      point_of_contact: [
        null,
        Validators.required,
      ],
      phone: [
        null,
        Validators.required,
      ],
      latitude: [
        null,
        Validators.required,
      ],
      longitude: [
        null,
        Validators.required,
      ],
      ground_elevation: [
        null,
        Validators.required,
      ],

    });
  }

  ngOnInit() {

    this.states = [];
    this.cities = [];

    this.locationType = [];
    this.AcPowerAvailable = [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    this.getLocationType();
    this.getAcPowerAvailable();
    this.getData();
  }

  getStates() {
    const array =  SiteLocationData.states;
    for (let index = 0; index < array.length; index++) {
      this.states.push({value: array[index], viewValue: array[index]});
    }
  }

  getLocationType() {
    this.dataFormsService.getLocationType(this.idUser).subscribe(
      t => {
        if (t.success) {
          this.locationType = t.data;
        } else {
          console.log('Error en la busqueda');
        }
      }
    );
  }

  getAcPowerAvailable() {
    this.dataFormsService.getAcPowerAvailable(this.idUser).subscribe(
      t => {
        if (t.success) {
          this.AcPowerAvailable = t.data;
        } else {
          console.log('Error en la busqueda');
        }
      }
    );
  }

  getData() {
    this.dataFormsService.getAsiteLocationInformationData(this.idUser, +this.idEvent).subscribe(
      async (t) => {
        this.data = await t.data[0];
        this.setFormData();
        this.getStates();
        this.selectCitiInput();
      }
    );
  }

  setFormData() {
    this.aSiteLocationInformationForm.controls['name'].setValue(this.data['name']);
    this.aSiteLocationInformationForm.controls['owner'].setValue(this.data['owner']);
    this.aSiteLocationInformationForm.controls['address'].setValue(this.data['address']);

    this.aSiteLocationInformationForm.controls['city'].setValue(this.data['city']);
    this.aSiteLocationInformationForm.controls['state'].setValue(this.data['state']);


    this.aSiteLocationInformationForm.controls['zip'].setValue(this.data['zip']);
    this.aSiteLocationInformationForm.controls['county'].setValue(this.data['county']);
    this.aSiteLocationInformationForm.controls['location_type'].setValue(+this.data['idLocationType']);

    this.aSiteLocationInformationForm.controls['shale'].setValue(this.data['shale']);
    this.aSiteLocationInformationForm.controls['sand_and_gravel'].setValue(this.data['sendAndGravel']);
    this.aSiteLocationInformationForm.controls['loam'].setValue(this.data['loam']);
    this.aSiteLocationInformationForm.controls['clay'].setValue(this.data['clay']);
    this.aSiteLocationInformationForm.controls['limestone'].setValue(this.data['limestone']);
    this.aSiteLocationInformationForm.controls['sandstone'].setValue(this.data['sandstone']);
    this.aSiteLocationInformationForm.controls['granite'].setValue(this.data['granite']);
    this.aSiteLocationInformationForm.controls['slate'].setValue(this.data['slate']);
    this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(this.data['other']);

    if(this.data['other'] !== '') {
      this.checked = this.data['other'];
      this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(true);
    } else {
      this.checked = this.data['other'];
      this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(false);
    }

    if(this.data['other'] !== ''){
      this.checked = this.data['other'];
      this.aSiteLocationInformationForm.controls['other'].setValue(this.data['other']);
    }

    if(this.data['other'] === '[NULL]') {
      this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(false);
      this.aSiteLocationInformationForm.controls['other'].setValue('');
      this.checked = false;
    }

    this.aSiteLocationInformationForm.controls['type_of_access_road'].setValue(this.data['typeAccessRoad']);
    this.aSiteLocationInformationForm.controls['access_road'].setValue(this.data['accessRoad']);
    this.aSiteLocationInformationForm.controls['_4x4_required'].setValue(this.data['required4x4']);
    this.aSiteLocationInformationForm.controls['ac_power_available'].setValue(+this.data['idAcPowerAvailable']);
    this.aSiteLocationInformationForm.controls['solar_power'].setValue(this.data['solarPower']);
    this.aSiteLocationInformationForm.controls['size_solar_power'].setValue(this.data['sizeSolarPower']);
    this.aSiteLocationInformationForm.controls['point_of_contact'].setValue(this.data['pointOfContact']);
    this.aSiteLocationInformationForm.controls['phone'].setValue(this.data['phone']);
    this.aSiteLocationInformationForm.controls['latitude'].setValue(this.data['latitude']);
    this.aSiteLocationInformationForm.controls['longitude'].setValue(this.data['longitude']);
    this.aSiteLocationInformationForm.controls['ground_elevation'].setValue(this.data['groundElevation']);
  }

  selectCiti(e: any) {
    this.cities = [];
    const cities =  SiteLocationData.cities;
    const array = cities[`${e.value}`];
    for (let index = 0; index < array.length; index++) {
      this.cities.push({value: array[index], viewValue: array[index]});
    }
  }


  selectCitiInput() {
    const cities =  SiteLocationData.cities;
    const e = this.data['state'];
    const array = cities[`${e}`];
    for (let index = 0; index < array.length; index++) {
      this.cities.push({value: array[index], viewValue: array[index]});
    }
  }

  updateData() {
    const body = this.aSiteLocationInformationForm.value;
    this.updateDataService.putAsiteLocationformation(this.idUser, +this.idEvent, body).subscribe(
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
    );
  }

  test(e) {
    this.checked = e.checked;
    if (!this.checked) {
      this.aSiteLocationInformationForm.controls['other'].setValue('');
    }
  }

}
