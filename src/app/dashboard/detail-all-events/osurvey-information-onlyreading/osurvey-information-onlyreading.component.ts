import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { DetailAllEventsService } from '../shared/detail-all-events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../../forms/service/data-forms.service';
import { UpdateDataService } from '../../forms/service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-osurvey-information-onlyreading',
  templateUrl: './osurvey-information-onlyreading.component.html',
  styleUrls: ['./osurvey-information-onlyreading.component.scss'],
  providers: [ DetailAllEventsService, DataFormsService, UpdateDataService]
})
export class OsurveyInformationOnlyreadingComponent implements OnInit {

  public oSurveyInformationForm: FormGroup;
  private idUser: number;
  public data: any;

  @Input() idEvent: number;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dataFormsService: DataFormsService,
    private updateDataService: UpdateDataService
  ) {
    this.oSurveyInformationForm = this.fb.group({
      surveyor: [
        {value: null, disabled: true},
        Validators.required,
      ],
      identifier: [
        {value: null, disabled: true},
        Validators.required,
      ],
      site_name: [
        {value: null, disabled: true},
        Validators.required,
      ],
      date_create: [
        {value: null, disabled: true},
        Validators.required,
      ],
      weather_conditions: [
        {value: null, disabled: true},
        Validators.required,
      ],
      temperature: [
        {value: null, disabled: true},
        Validators.required,
      ],
      directions_to_site: [
        {value: null, disabled: true},
        Validators.required,
      ]
    });
  }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    this.getData();
  }

  getData() {
    this.dataFormsService.getOsurveyInformationData(this.idUser, +this.idEvent).subscribe(
      t => {
        if(t.success) {
          this.data = t.data[0];
          this.setFormData();
        } else {
          console.log('Error en la consulata');
        }
      }
    );
  }

  setFormData(){
    this.oSurveyInformationForm.controls['surveyor'].setValue(this.data['surveyor']);
    this.oSurveyInformationForm.controls['identifier'].setValue(this.data['identifier']);
    this.oSurveyInformationForm.controls['site_name'].setValue(this.data['site_name']);
    this.oSurveyInformationForm.controls['date_create'].setValue(this.data['date_create']);
    this.oSurveyInformationForm.controls['weather_conditions'].setValue(this.data['watherConditions']);
    this.oSurveyInformationForm.controls['temperature'].setValue(this.data['temperature']);
    this.oSurveyInformationForm.controls['directions_to_site'].setValue(this.data['directionToSite']);
  }

  updateData(){
    const body = this.oSurveyInformationForm.value;
    this.updateDataService.putOsurveyInformation(this.idUser, +this.idEvent, body).subscribe(
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


}
