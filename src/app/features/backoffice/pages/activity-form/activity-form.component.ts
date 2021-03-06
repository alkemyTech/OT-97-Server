import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CkeditorService } from 'src/app/core/services/ckeditor.service';
import { HttpService } from 'src/app/core/services/http.service';
import { UserStatusService } from 'src/app/core/services/user-status.service';
import { Activity } from 'src/app/features/models/Activity';
import { HTTPResponse } from 'src/app/features/models/HTTPResponse';
import { ImageFile } from 'src/app/features/models/ImageFile';
import { ActivitiesService } from 'src/app/features/services/activities/activities.service';
import { StandarDialogComponent } from 'src/app/shared/components/standar-dialog/standar-dialog.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: "app-activity-form",
  templateUrl: "./activity-form.component.html",
  styleUrls: ["./activity-form.component.scss"],
})
export class ActivityFormComponent implements OnInit {
  public form: FormGroup;
  public editing: boolean = false;
  public sending: boolean = false;
  public action: string = "";
  public anActivity: Activity = {};
  public alertMessage: string="";
  public textEditor!:string;

  private imageFile!:ImageFile;
  public imageError=false;
  public anImage!:string;

  public resultData!: HTTPResponse<Activity>;

  public allowSend:boolean = false;


  

  constructor(
    private userStatusService: UserStatusService,
    private _builder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private httpService: HttpService,
    private ckeditorSvc: CkeditorService,
    public activitiesService:ActivitiesService,
    public dialog: MatDialog
  ) {
    this.form = this._builder.group({
      name: ["", [Validators.required]],
      description: ["",],
      image: ["", [Validators.required]],
    });
  }

  haveErrorsInputForm(input: string, type: string) {
    return Boolean(
      this.form.get(input)?.hasError(type) && this.form.get(input)?.touched
    );
  }

  save() {
    if (this.form.valid && !this.imageError) {
      this.allowSend     = true;
      this.sending = true;      
      let activity: Activity = {
        name: this.form.get("name")?.value,
        image: this.anImage,
        description: this.textEditor,
      };
      if (this.editing) {
        this.alertMessage = "La actividad fue editada correctamente";
        activity.id = this.anActivity.id;
        activity.image = this.anImage; 
        const url: string =
        environment.activitiesApiUrl   
        let req:Observable<HTTPResponse<Activity>>= this.activitiesService.updateActivity(url,activity);         
        req.subscribe((response) => {         
          this.resultData= response;   
              Swal.fire(this.alertMessage.toString()).then(() => {
                this.router.navigate(["/dashboard"]);
              });
        });               
      } else {                   
        this.anActivity.id = "0";
        this.anActivity.image = this.anImage;
        const url: string =
        environment.activitiesApiUrl     
        const req:Observable<HTTPResponse<Activity>>= this.activitiesService.createActivity(url,activity);
        req.subscribe((response) => {
          this.resultData = JSON.parse(JSON.stringify(response));
              //this.alertMessage = this.resultData.message;
              this.alertMessage = "La actividad fue agregada correctamente";      
              Swal.fire(this.alertMessage.toString()).then(() => {
                this.router.navigate(["/dashboard"]);
              });
        });          
      }
    } else {
      this.allowSend     = false;
      this.sending = false;
      this.form.markAllAsTouched();
      this.alertMessage = "Por favor complete los campos requeridos";
      Swal.fire(this.alertMessage.toString()).then(() => {});
    }
  }


  getActivity(){
    if (typeof this.route.snapshot.params["idActivity"] !== "undefined") {
      this.editing = true;
      this.action = "Editar actividad";     
        const req:Observable<HTTPResponse<Activity>> = this.activitiesService.getActivityById(this.route.snapshot.params["idActivity"]); 
        req.subscribe((response) => {
          this.resultData = response;         
          this.anActivity = JSON.parse(JSON.stringify(this.resultData.data));         
          this.ckeditorSvc.textEditor$.next(this.anActivity.description!)
          this.form.setValue({
            name: this.anActivity.name,
            image: this.anActivity.image,
            description: this.anActivity.description,
          });
        },
        (error)=>{
          let errorMessage="";           
            switch(error.status) { 
              case 404: { 
                errorMessage="Error al obtener la actividad"; 
                 break; 
              } 
              case 401: {  
                errorMessage="Usted no esta autorizado para acceder a este recurso";
                 break; 
              } 
              default: { 
                errorMessage="Error desconocido";
                 break; 
              } 
           }    
          
           let dialogRef = this.dialog.open(StandarDialogComponent, {
            height: '300px',
            width: '400px',
            data: {type: "error", titleToShow:"",messageToShow: errorMessage,showButtonsOkCancel:false},
          });            
          dialogRef.afterClosed().subscribe(result => {
            console.log(`if it is ok, the user press accept: ${result}`); 
          });
      
      



        }
        );
       
    } else {
      this.editing = false;
      this.action = "Nueva actividad";
    }

    this.ckeditorSvc.getHandlerTextEditor$().subscribe((text) => {
      this.textEditor=text;
    });
  }
  
   ngOnInit() {
    
    this.getActivity();
  }












//------------------------------------------------upload image----------------------------------------------------
fileEvent(event:any) {
  this.imageFile={ id: "0"}; 
  let reader = new FileReader();
  if(event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];   
    if ( (file.type!="image/jpeg") && (file.type!="image/png")   )    {
      this.imageError=true;      
      return false;
    }
    

    if ( (file.type!="image/jpeg") && (file.type!="image/png")   )    {
      this.imageError=true;      
      return false;
    }
   
    reader.readAsDataURL(file);
    reader.onload = () => {               
      this.anImage="data:image/png;base64,"+reader.result!.toString().split(',')[1];         
      var img = new Image();             
      img.addEventListener('load',
    function(){
      var formElement = <HTMLFormElement>document.getElementById('imageError');       
      // if (( img.width !== 590) || ( img.height !== 340) )    {  
      //   formElement.value="true";               
      // } else {
      //   formElement.value="false";
      // }
     }    
    ,false);

    img.src = this.anImage;    
    this.imageFile.imageFile=reader.result!.toString().split(',')[1];            
    };


  }
  return true;
}

//------------------------------------------------end upload image----------------------------------------------------




  
}
