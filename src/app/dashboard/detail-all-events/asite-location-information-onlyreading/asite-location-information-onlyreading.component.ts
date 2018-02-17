import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../../forms/service/data-forms.service';
import { UpdateDataService } from '../../forms/service/update-data.service';
import { MatSnackBar } from '@angular/material';
import { DetailAllEventsService } from '../shared/detail-all-events.service';
@Component({
  selector: 'app-asite-location-information-onlyreading',
  templateUrl: './asite-location-information-onlyreading.component.html',
  styleUrls: ['./asite-location-information-onlyreading.component.scss'],
  providers: [DataFormsService, UpdateDataService],
})
export class AsiteLocationInformationOnlyreadingComponent  {
  public aSiteLocationInformationForm: FormGroup;
  public locationType: any[];
  public AcPowerAvailable: any[];
  public data: any;
  public selectedLocationType: any;
  private idUser: number;
  public checked: Boolean;

  @Input() idEvent: number;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dataFormsService: DataFormsService,
    private updateDataService: UpdateDataService
  ) {
    this.aSiteLocationInformationForm = this.fb.group({
      name: [
       {value: null, disabled: true},
        Validators.required,
      ],
      owner: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      address: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      city: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      state: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      zip: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      county: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      location_type: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      loam: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      sand_and_gravel: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      shale: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      clay: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      limestone: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      sandstone: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      granite: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      slate: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      other: [
        null,
      ],
      otherBoolean: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      access_road: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      type_of_access_road: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      _4x4_required: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      ac_power_available: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      solar_power: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      size_solar_power: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      point_of_contact: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      phone: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      latitude: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      longitude: [
        {value: null, disabled: true},
        Validators.required,,
      ],
      ground_elevation: [
        {value: null, disabled: true},
        Validators.required,
      ],

    });
  }

  ngOnInit() {
    this.locationType = [];
    this.AcPowerAvailable = [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    this.getLocationType();
    this.getAcPowerAvailable();
    this.getData();
  }

  getLocationType() {
    this.dataFormsService.getLocationType(this.idUser).subscribe(
      t =>{
        if(t.success) {
          this.locationType = t.data;
        } else {
          console.log('Error en la busqueda');
        }
      }
    )
  }

  getAcPowerAvailable() {
    this.dataFormsService.getAcPowerAvailable(this.idUser).subscribe(
      t =>{
        if(t.success) {
          this.AcPowerAvailable = t.data;
        } else {
          console.log('Error en la busqueda');
        }
      }
    )
  }

  getData()  {
    this.dataFormsService.getAsiteLocationInformationData(this.idUser, +this.idEvent).subscribe(
      async (t) => {
        this.data = await t.data[0];
        this.setFormData();
      }
    )
  }

  setFormData(){
    this.aSiteLocationInformationForm.controls['name'].setValue(this.data['name']);
    this.aSiteLocationInformationForm.controls['owner'].setValue(this.data['owner']);
    this.aSiteLocationInformationForm.controls['address'].setValue(this.data['address']);
    this.aSiteLocationInformationForm.controls['city'].setValue(this.data['city'])
    this.aSiteLocationInformationForm.controls['state'].setValue(this.data['state'])
    this.aSiteLocationInformationForm.controls['zip'].setValue(this.data['zip'])
    this.aSiteLocationInformationForm.controls['county'].setValue(this.data['county'])
    this.aSiteLocationInformationForm.controls['location_type'].setValue(+this.data['idLocationType'])

    this.aSiteLocationInformationForm.controls['shale'].setValue(this.data['shale'])
    this.aSiteLocationInformationForm.controls['sand_and_gravel'].setValue(this.data['sendAndGravel'])
    this.aSiteLocationInformationForm.controls['loam'].setValue(this.data['loam'])
    this.aSiteLocationInformationForm.controls['clay'].setValue(this.data['clay'])
    this.aSiteLocationInformationForm.controls['limestone'].setValue(this.data['limestone'])
    this.aSiteLocationInformationForm.controls['sandstone'].setValue(this.data['sandstone'])
    this.aSiteLocationInformationForm.controls['granite'].setValue(this.data['granite'])
    this.aSiteLocationInformationForm.controls['slate'].setValue(this.data['slate'])
    this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(this.data['other'])

    if(this.data['other'] !== ''){
      this.checked = this.data['other'];
      this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(true);

    } else {
      this.checked = this.data['other'];
      this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(false);
    }

    if(this.data['other'] !== ''){
      this.checked = this.data['other'];
      this.aSiteLocationInformationForm.controls['other'].setValue(this.data['other'])
    }

    if(this.data['other'] === '[NULL]') {
      this.aSiteLocationInformationForm.controls['otherBoolean'].setValue(false);
      this.aSiteLocationInformationForm.controls['other'].setValue('')
      this.checked = false;
    }

    this.aSiteLocationInformationForm.controls['type_of_access_road'].setValue(this.data['typeAccessRoad'])
    this.aSiteLocationInformationForm.controls['access_road'].setValue(this.data['accessRoad'])
    this.aSiteLocationInformationForm.controls['_4x4_required'].setValue(this.data['required4x4'])
    this.aSiteLocationInformationForm.controls['ac_power_available'].setValue(+this.data['idAcPowerAvailable'])
    this.aSiteLocationInformationForm.controls['solar_power'].setValue(this.data['solarPower'])
    this.aSiteLocationInformationForm.controls['size_solar_power'].setValue(this.data['sizeSolarPower'])
    this.aSiteLocationInformationForm.controls['point_of_contact'].setValue(this.data['pointOfContact'])
    this.aSiteLocationInformationForm.controls['phone'].setValue(this.data['phone'])
    this.aSiteLocationInformationForm.controls['latitude'].setValue(this.data['latitude'])
    this.aSiteLocationInformationForm.controls['longitude'].setValue(this.data['longitude'])
    this.aSiteLocationInformationForm.controls['ground_elevation'].setValue(this.data['groundElevation'])
  }

  updateData(){
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
    )
  }

  test(e) {
    this.checked = e.checked;
    if(!this.checked) {
      this.aSiteLocationInformationForm.controls['other'].setValue('');
    }
  }

}
