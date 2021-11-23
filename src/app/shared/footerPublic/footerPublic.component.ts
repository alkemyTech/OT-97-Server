import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../features/public/services/public.service';
import { organization, organResp } from '../../features/public/models/organization.interface';
import { Link } from '../../features/models/link.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthState } from 'src/app/core/redux/reducers/authReducer.reducer';
import { getAuth } from 'src/app/core/redux/selectors/auth.selectors';



@Component({
  selector: 'app-footerPublic',
  templateUrl: './footerPublic.component.html',
  styleUrls: ['./footerPublic.component.scss']
})
export class FooterPublicComponent implements OnInit {
  organization!:organResp;
  loader:boolean = true;
  links: Link[];
  authentication$: Observable<boolean>;
  loggedIn: boolean = false;

  constructor(
    private publicServices:PublicService,
    private store: Store<AuthState>
  ) {
    this.links = [
      {
        route: '/home',
        text: 'Inicio',
        renderize: true
      },
      {
        route: '/nosotros',
        text: 'Nosotros',
        renderize: true
      },
      {
        route: '/contacto',
        text: 'Contacto',
        renderize: true
      },
      {
        route: '/actividades',
        text: 'Actividades',
        renderize: false
      },
      {
        route: '/novedades',
        text: 'Novedades',
        renderize: false
      },
      {
        route: '/testimonios',
        text: 'Testimonios',
        renderize: false
      },
      {
        route: '/donar',
        text: 'Contribuye',
        renderize: false
      }
    ];
    
    this.authentication$ = this.store.pipe(select(getAuth));

    this.authentication$.subscribe( auth => {

      this.loggedIn = auth;

      if (!this.loggedIn) {
        for (let link of this.links) {
          if (
            link.route === '/actividades' ||
            link.route === '/novedades' ||
            link.route === '/testimonios' ||
            link.route === '/donar'
          ) {
            link.renderize = false;
          }
        }
      }

      if (this.loggedIn) {
        for (let link of this.links) {
          link.renderize = true;
        }
      }

    });

    
  }


  ngOnInit(){
   return this.publicServices.getEntities<organization<organResp>>('http://ongapi.alkemy.org/api/organization').subscribe((resp)=>{
      this.organization  = resp.data;
    })
  }


}
