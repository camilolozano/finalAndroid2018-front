import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../service/data-forms.service';
import { UpdateDataService } from '../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-osurvey-information',
  templateUrl: './osurvey-information.component.html',
  styleUrls: ['./osurvey-information.component.css'],
  providers: [DataFormsService, UpdateDataService]
})
export class OsurveyInformationComponent implements OnInit {

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
       null,
        Validators.required,
      ],
      date_create: [
        {value: null, disabled: true},
        Validators.required,
      ],
      weather_conditions: [
        null,
        Validators.required,
      ],
      temperature: [
        null,
        Validators.required,
      ],
      directions_to_site: [
        null,
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
    )
  }

  setFormData(){
    this.oSurveyInformationForm.controls['surveyor'].setValue(this.data['surveyor']);
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


