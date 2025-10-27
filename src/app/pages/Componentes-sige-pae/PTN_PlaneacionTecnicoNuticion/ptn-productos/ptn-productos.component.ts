import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ptn-productos',
  templateUrl: './ptn-productos.component.html',
  styleUrls: ['./ptn-productos.component.scss']
})
export class PTNProductosComponent implements OnInit {

  datosPestanasProductos: any = [
    { id: 1, descripcion: 'Productos disponibles', active: true },
    { id: 2, descripcion: 'Productos en proceso de aprobación', active: false }
  ];
  productoVisible: boolean = false;
  itemsDisabled: boolean = true;
  componenteSeleccionado: number = 1;
  currentComponent: string;
  presentComponent: number;
  selectedTab: number;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.presentComponent = params.typeComponent;
      if(params.action > 0) {
        this.selectTab(params.action);
      }
      this.selectedTab = params.selectedTab;
      if(this.selectedTab == 2){
        this.seleccionarTabById(2);
      }
    });
  }

  ngOnInit(): void {
    this.getByUrl();
  }

  seleccionarTab(tab: any) {
    this.presentComponent = undefined;
    for (let i = 0; i < this.datosPestanasProductos.length; i++) {
      if (this.datosPestanasProductos[i] == tab) {
        this.datosPestanasProductos[i].active = true
      } else {
        this.datosPestanasProductos[i].active = false
      }
    }
    this.componenteSeleccionado = tab.id;
  }

  seleccionarTabById(id: any) {
    this.presentComponent = undefined;
    for (let i = 0; i < this.datosPestanasProductos.length; i++) {
      if (this.datosPestanasProductos[i].id == id) {
        this.datosPestanasProductos[i].active = true
      } else {
        this.datosPestanasProductos[i].active = false
      }
    }
    this.componenteSeleccionado = id;
  }

  selectTab(id: any) {
    for (let i = 0; i < this.datosPestanasProductos.length; i++) {
      if (this.datosPestanasProductos[i].id == id) {
        this.datosPestanasProductos[i].active = true
      } else {
        this.datosPestanasProductos[i].active = false
      }
    }
    this.componenteSeleccionado = id;
  }

  getByUrl() {
    const routeUrl = this.router.url;
    const currentUrl = routeUrl.split('/');
    this.currentComponent = currentUrl[2];
  }
}
