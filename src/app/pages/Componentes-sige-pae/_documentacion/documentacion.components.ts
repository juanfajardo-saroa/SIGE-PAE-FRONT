import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValorCaracteristicasAdjuntosService } from 'src/app/shared/services/ValorCaracteristicasAdjuntos.services';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls:['./documentacion.component.scss']
})
export class DocumentacionComponent implements AfterViewInit {


  constructor( private Route: Router, private route: ActivatedRoute) { }

  ngOnInit() {

   // this.Route.navigate(['/documentation/doc.html']);
  //window.location.href = "/documentation/doc.html";




     }

     public documentos(){
      // this.Route.navigate(['/documentation/doc.html']);
 window.location.href = "/documentation/doc.html";


 }



  ngAfterViewInit() {}
}


