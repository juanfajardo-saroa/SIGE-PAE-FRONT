import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-resumen-etc',
  templateUrl: './resumen-etc.component.html',
  styleUrls: ['./resumen-etc.component.scss']
})
export class ResumenEtcComponent implements OnInit {

  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;
  
  constructor() { }



  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {

    
    /* this.selectedTabIndex = 2; */
    /* this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)); */
  }



  ngOnDestroy() {}
  }

  


