import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../service/data-forms.service';
import { UpdateDataService } from '../service/update-data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-structure-information',
  templateUrl: './structure-information.component.html',
  styleUrls: ['./structure-information.component.css'],
  providers: [DataFormsService, UpdateDataService]
})
export class StructureInformationComponent implements OnInit {

  public structureInformationForm: FormGroup;
  public type: any[];
  public legtype: any[];
  public generalcondition: any[];
  public anttenaTypeOpt: any[];
  public data: any;
  public idUser: number;
  public idStructureInformation: number;

  @Input() idEvent: number;

  constructor(
    private fb: FormBuilder,
    private dataFormsService: DataFormsService,
    private updateDataService: UpdateDataService,
    public snackBar: MatSnackBar,
  ) {
    this.structureInformationForm = this.fb.group({
      asr_number: [
       null,
        Validators.required
      ],
      faa: [
        null,
        Validators.required,
      ],
      fcc_call_sign: [
        null,
        Validators.required,
      ],
      owner: [
        null,
        Validators.required,
      ],
      manufacturer: [
        null,
        Validators.required,
      ],
      drawing_number: [
        null,
        Validators.required,
      ],
      design_number: [
        null,
        Validators.required,
      ],
      year_built: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      type: [
        null,
        Validators.required,
      ],
      height: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      leg_type: [
        null,
        Validators.required,
      ],
      sections: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      general_condition: [
        null,
        Validators.required,
      ],
      tower_size: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      top_of_taper: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      leg_size: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      caisson_height: [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
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
    this.type = [];
    this.legtype = [];
    this.generalcondition = [];
    this.anttenaTypeOpt = [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;
    this.getData();
    this.getType();
    this.getLegType();
    this.getGeneralCondition();
    this.getAnttenaTypeOpt();
  }

  getType() {
    this.dataFormsService.getType(this.idUser).subscribe(
      t => {
        if(t.success) {
          this.type = t.data;
        } else {
          console.log('Error en la consulata');
        }
      }
    )
  }

  getLegType() {
    this.dataFormsService.getLegType(this.idUser).subscribe(
      t => {
        if(t.success) {
          this.legtype = t.data;
        } else {
          console.log('Error en la consulta');
        }
      }
    )
  }

  getGeneralCondition() {
    this.dataFormsService.getGeneralConditionType(this.idUser).subscribe(
      t => {
        if(t.success) {
          this.generalcondition = t.data;
        } else {
          console.log('Error en la consulta');
        }
      }
    )
  }

  getAnttenaTypeOpt() {
    this.dataFormsService.getAnttenaTypeOpt(this.idUser).subscribe(
      t => {
        if(t.success) {
          this.anttenaTypeOpt = t.data;
        } else {
          console.log('Error en la consulta');
        }
      }
    )
  }

  getData() {
    this.dataFormsService.getStructureInformation(this.idUser, +this.idEvent).subscribe(
      t => {
        if(t.success) {
          this.data = t.data[0];
          this.idStructureInformation = t.data[0].idstructureInformation;
          this.setFormData();
        } else {
          console.log('Error en la consulta');
        }
      }
    )
  }

  setFormData(){
    this.structureInformationForm.controls['asr_number'].setValue(this.data['asr_number']);
    this.structureInformationForm.controls['faa'].setValue(this.data['faa']);
    this.structureInformationForm.controls['fcc_call_sign'].setValue(this.data['fcc_call_sign']);
    this.structureInformationForm.controls['owner'].setValue(this.data['owner']);
    this.structureInformationForm.controls['manufacturer'].setValue(this.data['manufacturer']);
    this.structureInformationForm.controls['drawing_number'].setValue(this.data['drawingNumber']);
    this.structureInformationForm.controls['design_number'].setValue(this.data['designNumber']);
    this.structureInformationForm.controls['year_built'].setValue(this.data['yearBuild']);
    this.structureInformationForm.controls['type'].setValue(+this.data['idStructureInformationType']);
    this.structureInformationForm.controls['height'].setValue(this.data['height']);
    this.structureInformationForm.controls['leg_type'].setValue(+this.data['idLegType']);
    this.structureInformationForm.controls['sections'].setValue(this.data['sections']);
    this.structureInformationForm.controls['general_condition'].setValue(+this.data['idGeneralConditionType']);
    this.structureInformationForm.controls['tower_size'].setValue(this.data['towerSize']);
    this.structureInformationForm.controls['top_of_taper'].setValue(this.data['topOfTaper']);
    this.structureInformationForm.controls['leg_size'].setValue(this.data['legSize']);
    this.structureInformationForm.controls['caisson_height'].setValue(this.data['caissonHeight']);
    this.structureInformationForm.controls['latitude'].setValue(this.data['latitude']);
    this.structureInformationForm.controls['longitude'].setValue(this.data['longitude']);
    this.structureInformationForm.controls['ground_elevation'].setValue(this.data['groundElevation']);
  }

  updateData(){
    const body = this.structureInformationForm.value;
    this.updateDataService.putStructureformation(this.idUser, +this.idEvent, body).subscribe(
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
