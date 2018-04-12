import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateUsersService } from '../create-users/shared/create-users.service';
import { MatSnackBar } from '@angular/material';
import { CreateCompaniesService } from './services/create-companies.service';

@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.css'],
  providers: [CreateCompaniesService]
})
export class CreateCompaniesComponent implements OnInit {

  public createCompanyForm: FormGroup;
  public enableForm: Boolean;
  public isChecked: Boolean = true;
  public userTypes: any[];
  public identificationTypes: any[];
  private params: any;
  public loadSpiner: Boolean;

  public lat = 1.2152285;
  public lng = -77.2807421;
  public zoom = 13;

  public markers: marker[];

  constructor(
    private fb: FormBuilder,
    private createCompaniesService: CreateCompaniesService,
    private snackBar: MatSnackBar,
  ) {
    this.enableForm = true;
    this.createCompanyForm = this.fb.group({
      name1Company: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      name2Company: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      last1Company: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      last2Company: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      nameBusiness: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      nitCompany: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]+')])
      ],
      contactCompany: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]+')])
      ],
      addressCompany:  [
        null, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9A-Za-z ]+'), Validators.required])
      ],
      latitude:  [
        {value: null, disabled: true }, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      longitude:  [
        {value: null, disabled: true }, Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9]+'), Validators.required])
      ],
      emailCompany: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
        Validators.maxLength(150)
      ])],
      // Información del usuario administrador de la plataforma
      firstName: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      secondName: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      firstLastName: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      secondLastName: [
        null,
        Validators.compose([Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+'), Validators.maxLength(25)])
      ],
      emailUsername:  [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
        Validators.maxLength(150)
      ])],
      contactNumber: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]+')])
      ],
      identificationCard: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]+')])
      ],
    });
  }

  ngOnInit() {
    this.markers = [];
    this.loadSpiner = false;
    this.userTypes = [
      { value: '1', viewValue: 'ADMINISTRATOR' },
      { value: '2', viewValue: 'OPERATOR' }
    ];
    this.identificationTypes = [
      { value: 'ID_NUMBER', viewValue: 'ID_NUMBER' },
      { value: 'PASSPORT', viewValue: 'PASSPORT' }
    ];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userInfo);
    if (userInfo !== undefined && userInfo !== null) {
      this.params = {
        idUser: userInfo.idSystemUser,
        idCompany: userInfo.idCompany
      };
    }
  }

  mapClicked(e: any) {
    if (this.markers.length === 0 ) {
      this.markers.push(
        {
          lat: +e.coords.lat,
          lng: +e.coords.lng,
          draggable: true
        }
      );
      this.createCompanyForm.controls['latitude'].setValue(e.coords.lat);
    this.createCompanyForm.controls['longitude'].setValue(e.coords.lng);
    }
  }

  markerDragEnd(m: marker, e: any) {
    this.markers.pop();
    this.markers.push(
      {
        lat: +e.coords.lat,
        lng: +e.coords.lng,
        draggable: true
      }
    );
    this.createCompanyForm.controls['latitude'].setValue(e.coords.lat);
    this.createCompanyForm.controls['longitude'].setValue(e.coords.lng);
  }

  onSubmit() {
    this.loadSpiner = true;
    const body = this.createCompanyForm.value;
    console.log(body);
    this.createCompaniesService.postCreateCompanies(this.params, body).subscribe(
      data => {
        // console.log(data);
        this.snackBar.open(data.msg, data.success ? 'Successfull' : 'Error', {
          duration: 5000,
        });
      },
      err => console.log(err),
      () => {
        this.loadSpiner = false;
        this.createCompanyForm.reset();
      }
    );
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
