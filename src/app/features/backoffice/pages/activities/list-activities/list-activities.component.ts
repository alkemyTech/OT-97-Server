import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Activity } from 'src/app/features/models/Activity';
import { HTTPResponse } from 'src/app/features/models/HTTPResponse';
import { ActivitiesService } from 'src/app/features/services/activities/activities.service';
import { StandarDialogComponent } from 'src/app/shared/components/standar-dialog/standar-dialog.component';
import { environment } from 'src/environments/environment';

import { Store, select } from '@ngrx/store';
//import  {addActivity,invokeActivityAPI,removeActivity }   from 'src/app/core/state/activities/activities.actions';
//import { listActivities } from 'src/app/core/state/activities/activities.selector';

import * as activitiesActions from   'src/app/core/state/activities/activities.actions';
import { ActivityState } from 'src/app/core/state/activities/activity.state';

import * as activitySelector from 'src/app/core/state/activities/activities.selector';


@Component({
  selector: "app-list-activities",
  templateUrl: "./list-activities.component.html",
  styleUrls: ["./list-activities.component.scss"],
})
export class ListActivitiesComponent implements OnInit {
  public listActivities: Activity[] = [];
  public listActivitiesR: HTTPResponse<Activity>[] = [];
  displayedColumns: string[] = ["Id", "Titulo", "Descripcion"];

  private activitiesStore$!: Subscription;

  

  
  constructor(
    private activitiesService: ActivitiesService,
    public dialog: MatDialog,
    public store: Store<{ activities:any }>
  ) {

    

  }

  addActivity() {    
  // this.store.dispatch(activitiesActions.createActivity({ activity: this.tarea2 }));
  }

  removeActivity(id: string) {
    //const activityToDelete: Activity = { id };
    //this.store.dispatch(removeActivity(activityToDelete));
  }

  ngOnInit() { 

    this.activitiesStore$ = this.store.select(activitySelector.selectAllActivities)
      .subscribe((activities) => {
        alert("acaRRRRRRRRRR"+JSON.stringify(activities))
        this.listActivitiesR = JSON.parse(JSON.stringify(activities));
      });

      this.store.dispatch(activitiesActions.findAllActivities());


//Lo uso para agregar una actividad harcodeada ya que no tengo en esta pagina un formulario, para probar el agregar en el store
// public tarea2: Activity = {
//   id: "2",
//   name: "22222la actividad 1",
//   description: "2222la descrtppp",
// };




//this.store.pipe(... devuelve un observable.
  //El store  es un observable, por lo tanto le hago un pipe y con el select me quedo con el listado completo
  // ver que hay mas "select", por id, por nombre etc.El select lo que hace es sacar la logica de los filtros del store
  // a otro archivo .store
  // allActivities$ = this.store
  //   .pipe(select(listActivities()))
  //   .subscribe((result) => {
  //     this.listActivities = result;
  //   });

  // allActivities$ = this.store.pipe(
  //   select(listActivities())
  // );






// this.activitiesStore$! = this.store
//     .pipe(select(listActivities()))
//     .subscribe((result) => {
//       this.listActivities = result;
//     });


    //alert(this.store.)

    // this.store.subscribe(books => {
    //   console.error(books.actividades);
    //   //this.listActivities = books.activities;
    //  // this.listActivities = state
    //   //alert(this.store.);
    //   //alert(state.activities.listActivities.length)
    //   //this.listActivities=state
    // })

    // this.activitiesStore$ = this.store.select(bookSelector.selectAllBooks)
    //   .subscribe((books) => {
    //     this.books = [...books];
    //   });
    
    // this.activitiesStore$! = this.store
    // .pipe(select(listActivities()))
    // .subscribe((result) => {
    //   this.listActivities = result;
    // });
    
    // this.bookStore$ = this.store.select(bookSelector.selectAllBooks)
    // .subscribe((books) => {
    //   this.books = [...books];
    // });



     //Aqui se trae todas las actividades de la api y las guarda en el store, al ejecutar la accion invokeActivityAPI(),
    // y en la linea allActivities$ = this.store.pipe(.... al estar subsripto a este observable, se actualiza el array de actividades
    //this.store.dispatch(invokeActivityAPI());

    //this.store.dispatch(invokeActivityAPI());
    
    
    //EL SIGUIENTE CODIGO ES EL QUE OBTENIA LOS DATOS DE LA API, Y NO DEL STORE
    
    
    // const url: string =
    // environment.activitiesApiUrl;
    // const req:Observable<HTTPResponse<any>>= this.activitiesService.getActivities(url);
    //     req.subscribe((response) => {
    //       let resultData: HTTPResponse<Activity> = response;
    //       this.listActivities = JSON.parse(JSON.stringify(resultData.data));
    //     },
    //     (error)=>{
    //       let errorMessage="";
    //         switch(error.status) {
    //           case 404: {
    //             errorMessage="Error al obtener la actividad";
    //              break;
    //           }
    //           case 401: {
    //             errorMessage="Usted no esta autorizado para acceder a este recurso";
    //              break;
    //           }
    //           default: {
    //             errorMessage="Error desconocido";
    //              break;
    //           }
    //        }

    //        let dialogRef = this.dialog.open(StandarDialogComponent, {
    //         height: '300px',
    //         width: '400px',
    //         data: {type: "error", titleToShow:"",messageToShow: errorMessage,showButtonsOkCancel:false},
    //       });
    //       dialogRef.afterClosed().subscribe(result => {
    //         console.log(`if it is ok, the user press accept: ${result}`);
    //       });
    //     }
    //     );
  }
}
