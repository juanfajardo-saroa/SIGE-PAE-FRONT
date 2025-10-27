import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabsedesinterno',
  templateUrl: './tabsedesinterno.component.html',
  styleUrls: ['./tabsedesinterno.component.scss']
})
export class TabsedesinternoComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  selectedTabIndex: number;
  idTabs = 0;
  myTabFocusChange(selectedTabIndex: number) {
    if (selectedTabIndex === 0) {
        this.router.navigate(['/Sedes'],{ queryParams: {tab:0} })
    }else if(selectedTabIndex === 1){
        this.router.navigate(['/Sedes'],{ queryParams: {tab:1} })

    } else if(selectedTabIndex === 2){
        this.router.navigate(['/Sedes'],{ queryParams: {tab:2} })

    } else if(selectedTabIndex === 3){
        this.router.navigate(['/Sedes'],{ queryParams: {tab:3} })

    }else{
    }


  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idTabs = +params.tab;
      if (this.idTabs === 2) {
        this.selectedTabIndex = this.idTabs;
      }else if(this.idTabs===0){
        this.selectedTabIndex = this.idTabs;
      }else if(this.idTabs===1){
        this.selectedTabIndex = this.idTabs;
      }else if(this.idTabs===3){
        this.selectedTabIndex = this.idTabs;
      }else{
      }
    });
  }


}
