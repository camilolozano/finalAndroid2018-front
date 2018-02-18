import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {

  public menu: any;
  public emailUserName: string;
  public userType: string;
  public fullName: string;
  public tipoUser: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.emailUserName = userInfo.emailUsername;
    this.userType = userInfo.userTypeDesc;
    this.fullName = `${userInfo.names} ${userInfo.surnames}`;
    this.tipoUser = userInfo.idUserType;

    if(parseInt(this.tipoUser) === 1) {
      this.menu = [
        {
          name: 'Empresas',
          url: '#',
          params: '',
          child: [
            {
              name: 'Crear empresa',
              url: '/home/new-company',
              params: '',
              icon: 'view_carousel'
            }
          ]
        },
        {
          name: 'Gestion de usuarios',
          url: '#',
          params: '',
          icon: 'people',
          child: [
            {
              name: 'List users',
              url: '/home/list-users',
              params: '',
              icon: 'view_list'
            },
            {
              name: 'Create users',
              url: '/home/create-users',
              params: '',
              icon: 'create'
            }
          ]
        }
      ];
    } else {
      // this.menu = [
      //   {
      //     name: 'Events',
      //     url: '#',
      //     params: '',
      //     child: [
      //       {
      //         name: 'My events',
      //         url: '/home/my-events',
      //         params: '',
      //         icon: 'view_carousel'
      //       },
      //       {
      //         name: 'All events',
      //         url: '/home/all-events',
      //         params: '',
      //         icon: 'view_column'
      //       }
      //     ]
      //   }
      // ];
    }
  }

  getNavigate(_url: string) {
    this.router.navigate([_url]);
  }

}
