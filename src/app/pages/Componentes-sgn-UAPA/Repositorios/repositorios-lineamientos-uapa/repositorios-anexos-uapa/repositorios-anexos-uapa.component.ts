import { filter } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { RepositoriosAnexosModel } from 'src/app/shared/model/RepositoriosAnexos';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { RepositoriosAnexosService } from 'src/app/shared/services/RepositoriosAnexos.services';
import { RepositoriosCajaHerramientasService } from 'src/app/shared/services/RepositoriosCajaHerramientas.services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repositorios-anexos-uapa',
  templateUrl: './repositorios-anexos-uapa.component.html',
  styleUrls: ['./repositorios-anexos-uapa.component.scss']
})
export class RepositoriosAnexosUapaComponent implements OnInit {
  @Input('idRepositorio')
  public idRepositorio!: number;
  @Input('active')
  public active!: number;
  @Input('accion')
  public accion!: number;
  @Output('anexos')
  public anexos: any = new EventEmitter<boolean>();
  public dataAnexos: RepositoriosAnexosModel[] = [];
  contenidoRespuesta: string = '';
  btnAnexosDisab: boolean = true;
  myDatepipe!: any;

  //alertas
  mesajesalert: boolean = false;
  mesajesalert2: boolean = false;
  mesajesalert3: boolean = false;
  mesajesalert4: boolean = false;
  verCaja: boolean = false;
  constructor(public RepositoriosService: RepositoriosExtendService,
    private _RepositoriosAnexosService: RepositoriosAnexosService,
    private _messageService: MessageService,
    private _RepositorioCajaService: RepositoriosCajaHerramientasService,
    private datepipe: DatePipe,
  ) {
    this.myDatepipe = datepipe;
  }

  ngOnInit(): void {
    if (this.active == 1) {
      this.get_AnexosRepositorios();
    }
  }
  addAnexos() {
    this.dataAnexos.push({
      id: 0,
      id_Repositorio: this.idRepositorio,
      pathArchivo: '',
      nombre: '',
      descripcion: '',
      auditoria: '',
      fechaActualizacion: undefined,
      CajaHerramientas: {},
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
      addInfo: true,
      tamanoarchivo: '',
      pahtArchivo2:''
    })
    if (this.accion == 1) {
      this.verCaja = false;
    } else {
      this.verCaja = true;
    }
  }
  get_AnexosRepositorios() {
    this._RepositoriosAnexosService.getRepositoriosAnexosList().subscribe(
      (response: any) => {
        this.dataAnexos = response.filter(item => item.id_Repositorio === this.idRepositorio);

        this.dataAnexos.forEach(
          element => {
            if (this.accion === 1) {

              let ConvertDate = this.myDatepipe.transform(element.fechaActualizacion, 'yyyy-MM-dd');
              element.fechaActualizacion = ConvertDate;
              element.readonly = true;
              element.editInfo = false;
              element.addInfo = true;
              this.verCaja = false;
            } else {
              let ConvertDate = this.myDatepipe.transform(element.fechaActualizacion, 'yyyy-MM-dd');
              element.fechaActualizacion = ConvertDate;
              element.readonly = false;
              element.editInfo = true;
              element.addInfo = false;
              this.verCaja = true;

            }

          }
        );

        this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
      },
      (err) => {
      }
    );
  }
  public onFileSelected(File: string | any[], itemIndice: number, name: any, item: any): void {
    if (File[0]) {
      const bytes = File[0].size
      const k = 1024;
      const dm = 2 < 0 ? 0 : 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      const f = parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
      this.dataAnexos[itemIndice]['tamanoArchivo'] = f;
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
      let sinEspa = this.idRepositorio + 'RelAnx' + nombre
      this.dataAnexos[itemIndice]['pahtArchivo2'] = fileupload;
      this.dataAnexos[itemIndice][name] = sinEspa;
      /* let _fileUpload : fileUploadModel;
       _fileUpload = {file:formData, fileName:sinEspa, cnx:environment.cnxBS, container:environment.containerBS};
        this.addFileBlobRepositorios(_fileUpload,itemIndice,name);
         */


    }

  }
  guardarAnexos(itemIndex: number) {

    if (this.dataAnexos[itemIndex].nombre == '' || this.dataAnexos[itemIndex].descripcion == '' || this.dataAnexos[itemIndex].fechaActualizacion == undefined || this.dataAnexos[itemIndex].pathArchivo == '') {
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
          if (this.dataAnexos[itemIndex].editInfo == true &&
            this.dataAnexos[itemIndex].addInfo == false) {
            this._RepositoriosAnexosService.updateRepositoriosAnexos(this.dataAnexos[itemIndex]).subscribe(
              async (response) => {
                if (response.id != 0) {
                  this.dataAnexos[itemIndex].id = response.id;
                  this.dataAnexos[itemIndex].readonly = true;
                  this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
                  await this.saveArchivo(this.dataAnexos[itemIndex], itemIndex);
                  this.verCaja = true;
                } else {
                  this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
                }

              },
              (err) => {
              }
            );

            // INSERTAR ANEXOS
          } else if (this.dataAnexos[itemIndex].editInfo == false &&
            this.dataAnexos[itemIndex].addInfo == true) {
            this._RepositoriosAnexosService.addRepositoriosAnexos(this.dataAnexos[itemIndex]).subscribe(
              async (response) => {
                if (response.id != 0) {
                  this.dataAnexos[itemIndex].id = response.id;
                  this.dataAnexos[itemIndex].readonly = true;
                  this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
                  await this.saveArchivo(this.dataAnexos[itemIndex], itemIndex);
                  this.verCaja = true;
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

        if (this.dataAnexos[itemIndex].editInfo == true &&
          this.dataAnexos[itemIndex].addInfo == false) {

          this._RepositoriosAnexosService.updateRepositoriosAnexos(this.dataAnexos[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataAnexos[itemIndex].id = response.id;
                this.dataAnexos[itemIndex].readonly = true;
                this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
                await this.saveArchivo(this.dataAnexos[itemIndex], itemIndex);
                if (this.accion == 1) {
                  this.verCaja = true;
                } else {
                  this.verCaja = true;
                }
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );

          // INSERTAR ANEXOS
        } else if (this.dataAnexos[itemIndex].editInfo == false &&
          this.dataAnexos[itemIndex].addInfo == true) {
          this._RepositoriosAnexosService.addRepositoriosAnexos(this.dataAnexos[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataAnexos[itemIndex].id = response.id;
                this.dataAnexos[itemIndex].readonly = true;
                this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
                await this.saveArchivo(this.dataAnexos[itemIndex], itemIndex);
                if (this.accion == 1) {
                  this.verCaja = true;
                } else {
                  this.verCaja = false;
                }

              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );
        } else if (this.dataAnexos[itemIndex].id != 0) {
          this._RepositoriosAnexosService.updateRepositoriosAnexos(this.dataAnexos[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataAnexos[itemIndex].id = response.id;
                this.dataAnexos[itemIndex].readonly = true;
                await this.saveArchivo(this.dataAnexos[itemIndex], itemIndex);
                if (this.accion == 1) {
                  this.verCaja = true;
                } else {
                  this.verCaja = false;
                }
                this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );
        } else if (this.dataAnexos[itemIndex].id == 0) {
          this._RepositoriosAnexosService.addRepositoriosAnexos(this.dataAnexos[itemIndex]).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.dataAnexos[itemIndex].id = response.id;
                this.dataAnexos[itemIndex].readonly = true;
                await this.saveArchivo(this.dataAnexos[itemIndex], itemIndex);
                if (this.accion == 1) {
                  this.verCaja = true;
                } else {
                  this.verCaja = true;
                }
                this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
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

  async saveArchivo(response: any, itemIndex: number): Promise<void> {
    // Verifica que pathArchivo esté presente
    let nombre = response.pathArchivo;
    if (!nombre) {
      return; // Detiene la ejecución si no hay nombre de archivo
    }

    // Verifica que pahtArchivo2 sea un archivo válido
    if (!response.pahtArchivo2 || !(response.pahtArchivo2 instanceof File)) {
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

     this.updateRowData(response, itemIndex);


  }
  updateRowData(row: any, itemIndex: number) {
    this._RepositoriosAnexosService.updateRepositoriosAnexos(row).subscribe(
      (response) => {

      },
      (err) => {
      }
    );
  }
  validar(itemIndex: number) {

    if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre y descripcion
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre,descripcion,fecha
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta menos descripcion
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      return false;
    }

    else if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta menos fecha
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo != '') {
      //todos les falta menos archivo
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }

    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta menos nombre y fecha
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo != '') {
      //todos les falta menos nombre y archivo
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //todos les falta menos descripcion y fecha
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo != '') {
      //todos les falta menos descripcion y archivo
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo != '') {
      //todos les falta menos archivo y fecha
      this.mesajesalert = true;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre == '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo != '') {
      //les falta nombre
      this.mesajesalert = true;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion == '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo != '') {
      //les falta decrip
      this.mesajesalert = false;
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion == undefined && this.dataAnexos[itemIndex].pathArchivo != '') {
      //les falta fecha
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      return false;
    }
    else if (this.dataAnexos[itemIndex].nombre != '' && this.dataAnexos[itemIndex].descripcion != '' && this.dataAnexos[itemIndex].fechaActualizacion != undefined && this.dataAnexos[itemIndex].pathArchivo == '') {
      //les falta archivo
      this.mesajesalert = false;
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      return false;
    }
    return true;

  }



  eliminarAnexos(id: number, pathArchivo: string, nombre: string, itemIndex: number) {
    let anex: any = this.dataAnexos.filter(item => item.id === id);
    let Repo: any;

    if (this.active == 1) {
      anex.forEach(dato => {
        this._RepositorioCajaService.getRepositoriosCajaHerramientaListfilter(dato.id).subscribe(
          (response) => {
            Repo = [];
            Repo = response

            if (anex != 0 && Repo == 0) {
              anex.forEach(dato => {
                this._RepositoriosAnexosService.deleteRepositoriosAnexos(dato.id, dato.nombre, dato.pathArchivo).subscribe(
                  (response) => {
                    this.dataAnexos.splice(itemIndex, 1);
                    this.anexos.emit(this.dataAnexos.length == 0 ? true : false);
                  },
                  (err) => {
                  }
                );

              });
            } else if (anex != 0 && Repo != 0) {
              Repo.forEach(dato => {
                this._RepositorioCajaService.deleteRepositoriosCajaHerramienta(dato.id, dato.pathArchivo).subscribe(
                  (response) => {

                    anex.forEach(dato => {
                      this._RepositoriosAnexosService.deleteRepositoriosAnexos(dato.id, dato.nombre, dato.pathArchivo).subscribe(
                        (response) => {
                          this.dataAnexos.splice(itemIndex, 1);
                          this.anexos.emit(this.dataAnexos.length == 0 ? true : false);

                        },
                        (err) => {

                        });
                    });

                  },
                  (err) => {

                  }
                );

              })
            }

          },
          (err) => {

          });

      })

    }

  }
  editarAnexos(itemIndex: number) {
    if (this.active == 1) {
      this.dataAnexos[itemIndex].readonly = false;
      this.dataAnexos[itemIndex].editInfo = true;
      if (this.accion == 1) {

        this.verCaja = true;
      } else {
        this.verCaja = false;
      }
    }

  }
  cancelarAnexos(itemIndex: number) {
    if (this.active == 1) {
      if (this.dataAnexos[itemIndex].addInfo == true) {
        this.dataAnexos.splice(itemIndex, 1);

      } else if (this.dataAnexos[itemIndex].readonly == false &&
        this.dataAnexos[itemIndex].editInfo == true) {
        this.dataAnexos[itemIndex].editInfo = false;
        this.dataAnexos[itemIndex].readonly = true;
      }
    }
  }

  addFileBlobRepositorios(fileUpload): void {

    this.RepositoriosService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        if (this.active == 1) {
          this.contenidoRespuesta = String.fromCharCode.apply(null, new Uint8Array(response));
          this.mesajesalert4 = false;

        }
      },
      (err) => {
      }
    );
  }
  Anexos(disabled: boolean) {
    this.btnAnexosDisab = disabled;
  }

  ItemNombre(value: any, itemIndice: number, name: any) {
    if (this.active == 1) {
      this.dataAnexos[itemIndice][name] = value;
      this.mesajesalert = false;


    }

  }
  ItemDescripcion(value: any, itemIndice: number, name: any) {
    if (this.active == 1) {
      this.dataAnexos[itemIndice][name] = value;
      this.mesajesalert2 = false;


    }
  }
  ItemFecha(value: any, itemIndice: number, name: any) {
    if (this.active == 1) {
      this.dataAnexos[itemIndice][name] = value;
      this.mesajesalert3 = false;


    }
  }
}
