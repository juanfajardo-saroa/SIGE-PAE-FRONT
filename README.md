# SIGEPAEFront

Este proyecto fue generado por GeneraApp con Arquitectura Net Core 6.0 y Angular 12 [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## sitios para publicar
`MIPAE-Front-TI`
`SIGE-PAE-FRONT`
`SISPAE-Api`

## este es el repositorio local de los repositorios

`https://devops.softmanagement.com.co/SISPAE/_git/AlimentosAprender`

## comandos para clonar repositorios
## clonar repositorio de un branch especifico para sincronizar mi-pae

...


Nuevo Front de MipaE


git clone -b featrure/TI_Global_Dev https://ocortes:GStKk2nz10zrL@devops.softmanagement.com.co/SISPAE/AlimentosAprender/_git/MI-PAE-FRONT-TI

Desde <https://devops.softmanagement.com.co/SISPAE/AlimentosAprender/_git/MI-PAE-FRONT-TI> 

`git clone -b featrure/TI_Global_Dev https://ocortes:GStKk2nz10zrL@devops.softmanagement.com.co/SISPAE/AlimentosAprender/_git/MI-PAE-Front`
cd [MI-PAE-Front]
`git branch`
...


## clonar repositorio de un branch especifico para sincronizar sis-pae


## Para el gestor de paquetes de
## Gulp es un ejecutor de tareas de transmisión multiplataforma que permite a los desarrolladores automatizar muchas tareas de desarrollo. Para instalar gulp globalmente ha incluido

`npm install --global @angular/cli` ng --version

## Ahora, ejecute el siguiente comando (Este comando instalará las bibliotecas necesarias en node_modules carpeta que se genera con este comando):
`npm install`
es necesario actualizar


## Normalmente el proyecto se ejecutará en el localhost:4200 y para ejecutar el proyecto ejecute el siguiente comando:
`ng serve -o`

## si se quiere ejecutar en otro puerto debe hacer lo siguiente
`ng serve --port 44461`

## Estructura Prinicpal del Proyecto



## menu horizontal opciones para insertar

## Comandos git para usar
## comandos para sincronizar git pull
## El comando git pull se usa para descargar contenido desde el repositorio remoto al local, actualizando todo de manera automática para mostrar todos los cambios. El comando es en realidad la fusión de 2 comandos, el `git fetch` y el `git merge`. Primero se ejecuta el fetch y después un merge. El resultado será la fusión del código del repositorio remoto con el local. De esta forma git hará un commit para reflejar en el historial este cambio. Finalmente se actualizará el puntero de cabecera (HEAD) para que apunte a este último commit.]
## se conssulta las ramas
`GIT BRANCH --all`
## rama actual
`git branch`
SE INGRESA EN LA RAMA
## moverme a una rama especifica
`git checkout feature/TI_Global_Dev`
## preprar para checkin
`git pull`  
`git status`
`git add . `
`git status `
## subir cambios con commit
`git add file modificado`
`git commit -am "commit message"`
`git commit -m "eliminados comentarios en el startup" `
`git push `
## para compilarlo con todos los módulos y que no tenga problema de memoria es necesario
` npm i -g increase-memory-limit`
`SET NODE_OPTIONS=--max_old_space_size=8048`
## para azure blob stoarge  se debe incorporar  estas variables que son la cadena de conexion con azure blob storage
containerBS: `'bsrepositorioarchivos',`
cnxBS:`'DefaultEndpointsProtocol=https;AccountName=storagesispae;AccountKey=sJHmmzY3u0cF5V2JMdfGPDNnMkHktwdvJx7iUM2Cx/5a/aCDqgaeLU1jwGrWcLdGv5s9mlhfNTxkjrOsrV980A==;EndpointSuffix=core.windows.net'` 
## para publicar en azure
1. `ng build --prod`
2. incorporar en la carpeta /dist/project crear el archivo web.config con e  siguiente contenido
`<?xml version="1.0" encoding="UTF-8" ?><configuration><system.webServer><staticContent><remove fileExtension=".json" /><mimeMap fileExtension=".json" mimeType="application/json" /></staticContent></system.webServer></configuration>` 
3. `Conectar con azure`

## Esta es la estructura del proyecto




## llaves y parametros del environment
...

 apiURI_Acceso: 'http://52.151.243.21/sige-pae-acceso-api/api/',
  apiURI_Minutas: 'http://52.151.243.21/sige-pae-minutas-api/api/',
  apiURI_GestionUsuarios: 'http://52.151.243.21/sige-pae-gestion-usuarios-api/api/',
  apiURI_MasterData: 'http://52.151.243.21/sige-pae-master-data-api/api/',
  apiURI_AsignacionRecursos: 'http://52.151.243.21/sige-pae-asignacion-recursos-api/api/',
  apiURI_Costos: 'http://52.151.243.21/sige-pae-costos-api/api/',
  apiURI_Contratos: 'http://52.151.243.21/sige-pae-contratos-api/api/',
  apiURI_Pac: 'http://52.151.243.21/sige-pae-plan-pagos-api/api/',



   baseUrlAPI:'https://sis-pae-api.azurewebsites.net/api/',
  //baseUrlAPI:'https://localhost:44381/api/',

  baseUrlAPI_Acceso            :'https://sispaeapiacceso.azurewebsites.net/api/',
  baseUrlAPI_Alertas           :'https://sispaeapialertas.azurewebsites.net/api/',
  baseUrlAPI_AlimentosMenu     :'https://sis-pae-api.azurewebsites.net/api/api/',
  baseUrlAPI_Aprobaciones      :'https://sispaeapiaprobaciones.azurewebsites.net/api/',
  baseUrlAPI_Auditoria         :'https://sispaeapiauditoria.azurewebsites.net/api/',
  baseUrlAPI_Configuracion     :'https://sispaeapiconfiguracion.azurewebsites.net/api/',
  baseUrlAPI_Contenidos        :'https://sispaeapicontenidos.azurewebsites.net/api/',
  baseUrlAPI_Contratos         :'https://sispaeapicontratos.azurewebsites.net/api/',
  baseUrlAPI_ETC               :'https://sispaeapietc.azurewebsites.net/api/',
  baseUrlAPI_GestionSocial     :'https://sispaeapigestionsocial.azurewebsites.net/api/',
  baseUrlAPI_Infraestructura   :'https://sispaeapiinfraestructura.azurewebsites.net/api/', 
  baseUrlAPI_Minutas           :'https://sispaeapiminutas.azurewebsites.net/api/',
  baseUrlAPI_ModuloUApa        :'https://sispaeapimodulouapa.azurewebsites.net/api/',
  baseUrlAPI_PlanAlistamiento  :'https://sispaeapiplanalistamiento.azurewebsites.net/api/',
  baseUrlAPI_PlaneacionFinanciera:'https://sispaeapiplaneacionfinanciera.azurewebsites.net/api/',
  baseUrlAPI_Priorizacion      :'https://sispaeapipriorizacion.azurewebsites.net/api/',
  baseUrlAPI_Seguimiento       :'https://sispaeapiseguimiento.azurewebsites.net/api/',
  baseUrlAPI_Seguridad         :'https://sispaeapiseguridad.azurewebsites.net/api/',
  baseUrlAPI_SistemaEducativo  :'https://sispaeapisistemaeducativo.azurewebsites.net/api/',
  baseUrlAPI_Staging           :'https://sispaeapistaging.azurewebsites.net/api/',
  baseUrlAPI_Vigencias         :'https://sispaeapivigencias.azurewebsites.net/api/',
  baseUrlAPI_GestionExcedentes :'https://sispaeapigestionexcedentes.azurewebsites.net/api/',

  baseUrlFront: 'http://localhost:4200/#/',

  miPaeUrl: 'https://www.mipae.com',
  siGEPaeUrl: 'https://www.sigepae.com',
  paEstarAlDiaUrl: 'https://www.paestaraldia.com',


  pageLengthDatatable: 10,
  siteTitle: 'SIGE-PAE',
  nameETC: localstorage.getitem('Ubicacion'),
  idETC:localstorage.getitem('IdUbicacion'),,
  idUser: localStorage.getItem('KeyMaster'),
  consultarResoluciones:'https://www.mineducacion.gov.co/portal/normativa/Resoluciones/',
  pathRepositorio: '//azurewebsites.sispae//',
  tokeenBearer:'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU0lTUEFFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtb24iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE2MWUwYWJmLWFlYmYtNDIxMy1hNDhjLThkNDU0NTA4YTcwYyIsImV4cCI6MTczOTE4NjQ4NywiaXNzIjoid3d3LmNhci5nb3YuY28iLCJhdWQiOiJ3d3cuY2FyLmdvdi5jbyJ9.4GIj5RncnRlnWNq5xNxf1O5bZ2sZWjeieuXUrz9walg' ,
  containerBS: 'bsrepositorioarchivos',
  containerDS: 'dsrepositorioarchivos',
  cnxBS:'DefaultEndpointsProtocol=https;AccountName=storagesispae;AccountKey=sJHmmzY3u0cF5V2JMdfGPDNnMkHktwdvJx7iUM2Cx/5a/aCDqgaeLU1jwGrWcLdGv5s9mlhfNTxkjrOsrV980A==;EndpointSuffix=core.windows.net',
  nombrePAC: 'Planeación',
...

## Estructura Documentacion SISPAE del Proyecto



`npm run compodoc`  para proyecto Front
Ruta de Documentacion

`/documentation`  para front
`/documentation/database`  para database
`/documentation/api`  para microservicios


## Generaciión de Pruebas Unitarias 


  `Jasmine` 
  ## es un framework especializado en pruebas unitarias y contiene una serie de herramientas dedicadas.
  `Karma` 
  ## es un administrador de tareas en el navegador y lo usaremos para ejecutar las pruebas en un entorno realista.

  `npm install -g angular-spec-generator`
  `angular-spec-generator 'E:\MIPAE-TIGLOBAL\SIGE-PAE-Front\src'`
## comandos 
  `ng test`  lee el tsconfig.spec.json 
## comando principal
  `ng test --no-watch --code-coverage  --source-map=false`
  `ng test --source-map=false` 
  `npm test`
  `ng test --no-watch --code-coverage`
  `ng test --codeCoverage=true`  --max_old_space_size=8192

  git config --global core.autocrlf false  LF CRLF
  





`npm run compodoc`  para proyecto Front
Ruta de Documentacion

`/documentation`  para front
`/documentation/database`  para database
`/documentation/api`  para microservicios





## Estructura Principal del Proyecto

```

```
