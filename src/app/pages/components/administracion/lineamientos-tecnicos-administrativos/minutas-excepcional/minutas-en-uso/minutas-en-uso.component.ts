import { Component, OnInit,OnDestroy } from '@angular/core';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-minutas-en-uso',
  templateUrl: './minutas-en-uso.component.html',
  styleUrls: ['./minutas-en-uso.component.scss'],
  //providers: [MinutasApiService]
})
export class MinutasEnUsoComponent implements OnInit ,OnDestroy{
  private idETC: number = Number(localStorage.getItem('IdUbicacion') ?? '0');
  private idVigencia: number = 1; //Constante Minuta Vigente
  private subs = new Subscription() 
  public loadingVisible: boolean = false;

  public minutasUsoList: any[];
  constructor(
    private _minutasApiService: MinutasApiService,
    private _messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadingVisible = true;
    if(this.idETC != 0){
      this._minutasApiService.get_listMinutaDiferencialenUso(this.idETC, this.idVigencia).subscribe(response => {
        if(response.success){
          this.minutasUsoList = response.result;
        }
      });
    }
    else{
      this._messageService.showError("ERROR: Debe seleccionar una ETC para realizar uso de este modulo.", "top center");
    }
    this.loadingVisible = false;
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
}
