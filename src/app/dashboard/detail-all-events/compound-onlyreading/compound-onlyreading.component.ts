import { Component, OnChanges, Input } from '@angular/core';
import { DetailAllEventsService } from '../shared/detail-all-events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataFormsService } from '../../forms/service/data-forms.service';
import { UpdateDataService } from '../../forms/service/update-data.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-compound-onlyreading',
  templateUrl: './compound-onlyreading.component.html',
  styleUrls: ['./compound-onlyreading.component.scss'],
  providers: [ DetailAllEventsService, DataFormsService, UpdateDataService ]
})
export class CompoundOnlyreadingComponent {
  public compoundForm: FormGroup;
  public locationType: any[];
  public fencetype: any[];
  public access: any[];
  public buildingtype: any[];
  private idUser: number;
  private data: any;

  @Input() idEvent: number;

  constructor(
    private fb: FormBuilder,
    private dataFormsService: DataFormsService,
    public snackBar: MatSnackBar,
    private updateDataService: UpdateDataService
  ) {
    this.compoundForm = this.fb.group({
      location_type: [
       {value: null, disabled: true},
        Validators.required,
      ],
      location_description: [
       {value: null, disabled: true},
        Validators.required,
      ],
      location_fence: [
       {value: null, disabled: true},
        Validators.required,
      ],
      fence_type: [
       {value: null, disabled: true},
        Validators.required,
      ],
      fence_size: [
       {value: null, disabled: true},
        Validators.required,
      ],
      access: [
       {value: null, disabled: true},
        Validators.required,
      ],
      building_type: [
       {value: null, disabled: true},
        Validators.required,
      ],
      building_owner_if_available: [
       {value: null, disabled: true},
        Validators.required,
      ],
      genset: [
       {value: null, disabled: true},
        Validators.required,
      ],
      fue_Propane_tank_type: [
       {value: null, disabled: true},
        Validators.required,
      ],
      propane_fuel_tank_size: [
       {value: null, disabled: true},
        Validators.required,
      ]
    });
  }

  ngOnInit() {
    this.locationType = [];
    this.fencetype = [];
    this.access = [];
    this.buildingtype = [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = +userInfo.idSystemUser;

    this.getLocationType();
    this.getFencetype();
    this.getAccess();
    this.getBuildingType();
    this.getData();
  }

  getLocationType(){
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

  getFencetype(){
    this.dataFormsService.getFencetype(this.idUser).subscribe(
      t =>{
        if(t.success) {
          this.fencetype = t.data;
        } else {
          console.log('Error en la busqueda');
        }
      }
    )
  }
  getAccess(){
    this.dataFormsService.getAccesstype(this.idUser).subscribe(
      t =>{
        if(t.success) {
          this.access = t.data;
        } else {
          console.log('Error en la busqueda');
        }
      }
    )
  }

  getBuildingType(){
    this.dataFormsService.getBuildingType(this.idUser).subscribe(
      t =>{
        if(t.success) {
          this.buildingtype = t.data;
        } else {
          console.log('Error en la busqueda');
        }
      }
    )
  }

  getData() {
    this.dataFormsService.getCompoundData(this.idUser, +this.idEvent).subscribe(
      t => {
        this.data = t.data[0];
        this.setFormData();
      }
    )
  }

  updateData(){
    const body = this.compoundForm.value;
    this.updateDataService.putCompount(this.idUser, +this.idEvent, body).subscribe(
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

  setFormData(){
    this.compoundForm.controls['location_type'].setValue(+this.data['idLocationType']);
    this.compoundForm.controls['location_description'].setValue(this.data['locationDescription']);
    this.compoundForm.controls['location_fence'].setValue(this.data['locationFence']); // cambiar por bool
    this.compoundForm.controls['fence_type'].setValue(+this.data['idfenceType']);
    this.compoundForm.controls['fence_size'].setValue(this.data['fenceSize']);
    this.compoundForm.controls['access'].setValue(+this.data['idAccessType']);
    this.compoundForm.controls['building_type'].setValue(+this.data['idBuildingType']);
    this.compoundForm.controls['building_owner_if_available'].setValue(this.data['buildingOwnerIfAvailable']);
    this.compoundForm.controls['genset'].setValue(this.data['genset']); // Boolean
    this.compoundForm.controls['fue_Propane_tank_type'].setValue(+this.data['genset']);
    this.compoundForm.controls['propane_fuel_tank_size'].setValue(this.data['propaneFuelTankSize']);

  }

}
