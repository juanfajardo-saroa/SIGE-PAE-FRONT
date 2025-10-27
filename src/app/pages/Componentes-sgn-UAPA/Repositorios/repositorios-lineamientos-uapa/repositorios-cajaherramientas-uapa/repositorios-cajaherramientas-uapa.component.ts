import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { RepositoriosCajaHerramientasModel } from 'src/app/shared/model/RepositoriosCajaHerramientas';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { RepositoriosCajaHerramientasService } from 'src/app/shared/services/RepositoriosCajaHerramientas.services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repositorios-cajaherramientas-uapa',
  templateUrl: './repositorios-cajaherramientas-uapa.component.html',
  styleUrls: ['./repositorios-cajaherramientas-uapa.component.scss']
})
export class RepositoriosCajaherramientasUapaComponent implements OnInit {
  @Input('idAnexo')
  public idAnexo!: number;
  @Input('active')
  public active!: number;
  @Output()
  public anexosLength: any = new EventEmitter<boolean>();
  public dataTipoPoliza: any[] = [];
  public dataSourceCajaHerramienta: RepositoriosCajaHerramientasModel[] = [];

  //alertas
  mesajesalert: boolean = false;
  mesajesalert2: boolean = false;
  mesajesalert3: boolean = false;
  mesajesalert4: boolean = false;
  constructor(public RepositoriosService: RepositoriosExtendService,
    private _RepositoriosCajaService: RepositoriosCajaHerramientasService,
    private _messageService: MessageService) { }

  ngOnInit(): void {

    if (this.active == 1) {
      this.get_CajaHerramientas();
    }
  }
  addCajaHerramienta() {
    this.dataSourceCajaHerramienta.push({
      id: 0,
      id_AnexoRecurso: this.idAnexo,
      pathArchivo: '',
      nombre: '',
      descripcion: '',
      auditoria: '',
      fechaActualizacion: undefined,
      extension: '',
      imagen: '',
      // atributos para gestión de auditoria del objeto
      _ippublica: '',
      _nombremaquina: '',
      _usuario: '',
      _ipdetrasproxy: '',
      _browser: '',
      _accion: '',
      _sessionid: '',
      _XMLAuditoria: '',
      // atributos adicionales genericos para gestión del objeto
      isValid: false,
      isSelected: false,
      completed: false,
      readonly: false,
      editInfo: false,
      addInfo: false,
      tamanoarchivo: '',
      pahtArchivo2:'',
    });
  }
  get_CajaHerramientas() {
    this._RepositoriosCajaService.getRepositoriosCajaHerramientaList().subscribe(
      (response: any) => {
        let h: any[] = response.filter(item => item.id_AnexoRecurso == this.idAnexo)
        h.forEach(element => {
          element.readonly = true;
          element.editInfo = false;
          element.addInfo = false;
        });

        this.dataSourceCajaHerramienta = h;

        //this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
      },
      (err) => {
      }
    );
  }
  ItemNombre(value: any, itemIndice: number, name: any) {
    if (this.active == 1) {
      this.dataSourceCajaHerramienta[itemIndice][name] = value;
      this.mesajesalert = false;

    }

  }
  ItemDescripcion(value: any, itemIndice: number, name: any) {
    if (this.active == 1) {
      this.dataSourceCajaHerramienta[itemIndice][name] = value;
      this.mesajesalert2 = false;

    }

  }

  ItemFecha(value: any, itemIndice: number, name: any) {
    if (this.active == 1) {
      this.dataSourceCajaHerramienta[itemIndice][name] = value;
      this.mesajesalert3 = false;
    }
  }
  public onFileSelected(File: string | any[], itemIndice: number, name: any, item: any): void {
    if (File[0]) {
      const bytes = File[0].size
      const k = 1024;
      const dm = 2 < 0 ? 0 : 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      const f = parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
      this.dataSourceCajaHerramienta[itemIndice]['tamanoArchivo'] = f;
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      let nombre = fileupload.name
      nombre = nombre
        .replace(/ /g, "")             // Eliminar espacios
        .replace(/á/g, "a")            // Reemplazar tildes
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n");           // Reemplazar ñ por n
      let sinEspa = this.idAnexo+'RelCjH' + nombre
      this.dataSourceCajaHerramienta[itemIndice]['pahtArchivo2'] = fileupload;
      this.dataSourceCajaHerramienta[itemIndice][name]=sinEspa;
      /* let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: sinEspa, cnx: environment.cnxBS, container: environment.containerBS };
      this.addFileBlobRepositorios(_fileUpload, itemIndice, name); */



    }
  }
  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.mesajesalert4 = false;
        //this.form.controls['pahtArchivo'].setValue(String.fromCharCode.apply(null,new Uint8Array(response)));
      },
      (err) => {
      }
    );
  }
  guardarCaja(itemIndex: number) {
    if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' || this.dataSourceCajaHerramienta[itemIndex].descripcion == '' || this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined || this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p style="text-align: left!important; font-size: 12px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 12px; color:#005ACA;"> formulario para poder continuar</p> ',
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar Aprobaciones',
        cancelButtonText: 'Cancelar',
        showDenyButton: false,
        denyButtonText: `Aceptar`,
      }).then((result) => {

        let valid: boolean = this.validar(itemIndex);
        if (valid) {
          this.mesajesalert = false;
          this.mesajesalert2 = false;
          this.mesajesalert3 = false;
          this.mesajesalert4 = false;
          // ACTUALIZAR PRODUCTO
          if (this.dataSourceCajaHerramienta[itemIndex].editInfo == true &&
            this.dataSourceCajaHerramienta[itemIndex].addInfo == false) {
            this._RepositoriosCajaService.updateRepositoriosCajaHerramienta(this.dataSourceCajaHerramienta[itemIndex]).subscribe(
              async (response) => {
                if (response.id != 0) {
                  this.dataSourceCajaHerramienta[itemIndex].id = response.id;
                  this.dataSourceCajaHerramienta[itemIndex].readonly = true;
                  await this.saveArchivo(this.dataSourceCajaHerramienta[itemIndex],itemIndex);
                  //this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
                } else {
                  this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
                }

              },
              (err) => {
              }
            );

            // INSERTAR ANEXOS
          } else if (this.dataSourceCajaHerramienta[itemIndex].editInfo == false &&
            this.dataSourceCajaHerramienta[itemIndex].addInfo == true) {

            this._RepositoriosCajaService.addRepositoriosCajaHerramienta(this.dataSourceCajaHerramienta[itemIndex]).subscribe(
              async (response) => {
                if (response.id != 0) {
                  this.dataSourceCajaHerramienta[itemIndex].id = response.id;
                  this.dataSourceCajaHerramienta[itemIndex].readonly = true;
                  this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
                  await this.saveArchivo(this.dataSourceCajaHerramienta[itemIndex],itemIndex);
                } else {
                  this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
                }

              },
              (err) => {
              }
            );
          }
        }

      })


    } else {


      let valid: boolean = this.validar(itemIndex);
      if (valid) {
        this.mesajesalert = false;
        this.mesajesalert2 = false;
        this.mesajesalert3 = false;
        this.mesajesalert4 = false;
        // ACTUALIZAR PRODUCTO

        if (this.dataSourceCajaHerramienta[itemIndex].editInfo == true &&
          this.dataSourceCajaHerramienta[itemIndex].addInfo == false) {

          this._RepositoriosCajaService.updateRepositoriosCajaHerramienta(this.dataSourceCajaHerramienta[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataSourceCajaHerramienta[itemIndex].id = response.id;
                this.dataSourceCajaHerramienta[itemIndex].readonly = true;
                await this.saveArchivo(this.dataSourceCajaHerramienta[itemIndex],itemIndex);
                //this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );

          // INSERTAR ANEXOS
        } else if (this.dataSourceCajaHerramienta[itemIndex].editInfo == false &&
          this.dataSourceCajaHerramienta[itemIndex].addInfo == true) {

          this._RepositoriosCajaService.addRepositoriosCajaHerramienta(this.dataSourceCajaHerramienta[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataSourceCajaHerramienta[itemIndex].id = response.id;
                this.dataSourceCajaHerramienta[itemIndex].readonly = true;
                this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
                await this.saveArchivo(this.dataSourceCajaHerramienta[itemIndex],itemIndex);
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );
        } else if (this.dataSourceCajaHerramienta[itemIndex].id != 0) {
          this._RepositoriosCajaService.updateRepositoriosCajaHerramienta(this.dataSourceCajaHerramienta[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataSourceCajaHerramienta[itemIndex].id = response.id;
                this.dataSourceCajaHerramienta[itemIndex].readonly = true;
                await this.saveArchivo(this.dataSourceCajaHerramienta[itemIndex],itemIndex);
                //this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );
        }
        else if (this.dataSourceCajaHerramienta[itemIndex].id == 0) {
          this._RepositoriosCajaService.addRepositoriosCajaHerramienta(this.dataSourceCajaHerramienta[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataSourceCajaHerramienta[itemIndex].id = response.id;
                this.dataSourceCajaHerramienta[itemIndex].readonly = true;
                await this.saveArchivo(this.dataSourceCajaHerramienta[itemIndex],itemIndex);
                //this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );
        }
      }
    }
  }

  async saveArchivo(response: any,itemIndex:number): Promise<void> {
 
    let nombre = response.pathArchivo;
    if (!nombre) {
      console.log("No se encontró pathArchivo en la respuesta.");
      return; // Detiene la ejecución si no hay nombre de archivo
    }

    // Verifica que pahtArchivo2 sea un archivo válido
    if (!response.pahtArchivo2 || !(response.pahtArchivo2 instanceof File)) {
      console.log("No se encontró un archivo válido en response.pahtArchivo2.");
      return; // Detiene la ejecución si pahtArchivo2 no es un archivo válido
    }
      const formData = new FormData();
      formData.append('file', response.pahtArchivo2);

  
      let _fileUpload: fileUploadModel = {
        file: formData,
        fileName: nombre,
        cnx: environment.cnxBS,
        container: environment.containerBS
      };
      
      this.addFileBlobRepositorios(_fileUpload)
     
      await this.updateRowData(response,itemIndex);
    
   
  }
  updateRowData(row:any,itemIndex:number){
    this._RepositoriosCajaService.updateRepositoriosCajaHerramienta(row).subscribe(
      (response) => {
        
      },
      (err) => {
      }
    );
  }

  validar(itemIndex: number) {

    if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre y descripcion
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre,descripcion,fecha
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta menos descripcion
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }

    else if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta menos fecha
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo != '') {
      //todos les falta menos archivo
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }

    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre y fecha
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo != '') {
      //todos les falta menos nombre y archivo
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //todos les falta menos descripcion y fecha
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo != '') {
      //todos les falta menos descripcion y archivo
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo != '') {
      //todos les falta menos archivo y fecha
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre == '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo != '') {
      //les falta nombre
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion == '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo != '') {
      //les falta decrip
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion == undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo != '') {
      //les falta fecha
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataSourceCajaHerramienta[itemIndex].nombre != '' && this.dataSourceCajaHerramienta[itemIndex].descripcion != '' && this.dataSourceCajaHerramienta[itemIndex].fechaActualizacion != undefined && this.dataSourceCajaHerramienta[itemIndex].pathArchivo == '') {
      //les falta archivo
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }

    return true;

  }
  cancelarCaja(itemIndex: number) {

    if (this.active == 1) {
      if (this.dataSourceCajaHerramienta[itemIndex].addInfo == true) {
        this.dataSourceCajaHerramienta.splice(itemIndex, 1);

      } else if (this.dataSourceCajaHerramienta[itemIndex].readonly == false &&
        this.dataSourceCajaHerramienta[itemIndex].editInfo == true) {
        this.dataSourceCajaHerramienta[itemIndex].editInfo = false;
        this.dataSourceCajaHerramienta[itemIndex].readonly = true;
      }
    }
  }
  editarCaja(itemIndex: number) {
    if (this.active == 1) {
      this.dataSourceCajaHerramienta[itemIndex].readonly = false;
      this.dataSourceCajaHerramienta[itemIndex].editInfo = true;
    }
  }
  eliminarCaja(id: number, pathArchivo: string, itemIndex: number) {
    this._RepositoriosCajaService.deleteRepositoriosCajaHerramienta(id, pathArchivo).subscribe(
      (response) => {
        this.dataSourceCajaHerramienta.splice(itemIndex, 1);
        this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);

      },
      (err) => {
      }
    );
  }

  actualizarCaja(itemIndex: number) {
    this._RepositoriosCajaService.updateRepositoriosCajaHerramienta(this.dataSourceCajaHerramienta[itemIndex]).subscribe(
      (response) => {
        if (response.id != 0) {
          this.dataSourceCajaHerramienta[itemIndex].id = response.id;
          //this.anexosLength.emit(this.dataSourceCajaHerramienta.length == 0 ? true : false);
        } else {
          this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
        }

      },
      (err) => {
      }
    );
  }
}
