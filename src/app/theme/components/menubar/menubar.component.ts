import { Component, OnInit, ElementRef, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit, AfterViewInit {
  sidenav: MatSidenav;
  mostrarmenu: boolean = false;
  CargueMenuInicial: boolean = true;
  events: string[] = [];
  opened: boolean;
  public mensaje = 'Selecciono';


  @Output() miEventoMenuBar = new EventEmitter<string>();




  @Input() sidenavWidth: number;
  @Input() menuChild: any;
  private sub: any;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private observer: BreakpointObserver,
  ) {



    if (localStorage.getItem('Inicio') == null || localStorage.getItem('Inicio') == undefined || localStorage.getItem('Inicio') == 'true') {

      this.mostrarmenu = false;
    }
    else {
      this.mostrarmenu = true;
    }

    this.opened = true;

    // if(this.mostrarmenu)
    // {
    //   if(localStorage.getItem('SistemaSelect')=='mipae')
    //   {
    //     if(localStorage.getItem('MenuMipae')=='false')
    //     {
    //       localStorage.setItem('MenuMipae','true');
    //       this.CargueMenuInicial=true;
    //     }
    //     else
    //     {
    //       this.CargueMenuInicial=false;
    //     }

    //   } else if(localStorage.getItem('SistemaSelect')=='sigepae')
    //   {
    //     if(localStorage.getItem('MenuSigepae')=='false')
    //     {
    //       localStorage.setItem('MenuSigepae','true');
    //       this.CargueMenuInicial=true;
    //     }
    //     else
    //     {
    //       this.CargueMenuInicial=false;
    //     }
    //   }



    // }







  }

  ngOnInit(): void {
    // this.sub = this.router.params.subscribe(params => {
    //   this.sedeId = +params['sedeId'];
    //   // (+) converts string 'id' to a number
    //   // In a real app: dispatch action to load the details here.
    // });

  }

  ngAfterViewInit() {
  }


  routerMenu(router: any) {
    for (let i = 0; i < this.menuChild.length; i++) {

      if (this.menuChild[i].router[0] != '' || this.menuChild[i].router[0] != '-') {
        this.menuChild[i].activeclass = 'active';
      } else {
        this.menuChild[i].activeclass = '';
      }
    }
    localStorage.setItem('KeylayoutC', 'Si');
    this.router.navigate(router);
    this.miEventoMenuBar.emit(router);
  }

  routerMenu1(router: any) {
    
    for (let i = 0; i < this.menuChild.length; i++) {

      this.menuChild.forEach(function (value: any) {
        value.activeclass = '';
        if (value.nombre == router.nombre) {
          value.activeclass = 'activado';
        } else {
          value.activeclass = '';
        }
      });
      /* this.menuChild[i]['menuDetalle'].forEach(function (value: any) {
        value.activeclass = '';
        if (value.router[0] == router[0]) {
          value.activeclass = 'active';
        } else {
          value.activeclass = '';
        }
      }); */
    }

  }
  routerSubMenu(router: any) {
    //  
    for (let i = 0; i < this.menuChild.length; i++) {
      this.menuChild[i]['menuDetalle'].forEach(function (value: any) {
        value.activeclass = '';
        if (value.router[0] == router[0]) {
          value.activeclass = 'active';
        } else {
          value.activeclass = '';
        }
      });
    }
    let rutaelegida = router[0];

    this.mostrarmenu = true;
    localStorage.setItem('KeylayoutC', 'Si');

    if (rutaelegida.includes('www.'))  //www.paestaraldia.gov.co/Home
    {

      this.router.navigate(['/TablerosUapa']);
      this.miEventoMenuBar.emit(router);
      window.open(router, '_blank');
      //this.miEventoMenuBar.emit(router);
    }
    else {

      this.router.navigate(router);
      this.miEventoMenuBar.emit(router);
    }

  }

}
