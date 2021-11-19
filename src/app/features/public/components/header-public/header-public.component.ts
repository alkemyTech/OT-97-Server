import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/core/redux/actions/auth.actions';
import { AuthState } from 'src/app/core/redux/reducers/authReducer.reducer';
import { getAuth } from 'src/app/core/redux/selectors/auth.selectors';
import { Link } from '../../../models/link.model';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent implements OnInit {

  loggedIn:boolean=false;
  links: Link[];
  authentication$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.authentication$ = this.store.pipe(select(getAuth));
    
    this.authentication$.subscribe( auth => {

      this.loggedIn = auth;

      if (this.loggedIn) {
        for (let link of this.links) {
          link.renderize = true;
        }
      }

    });

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
        route: '/actividades',
        text: 'Actividades',
        renderize: true
      },
      {
        route: '/novedades',
        text: 'Novedades',
        renderize: true
      },
      {
        route: '/testimonios',
        text: 'Testimonios',
        renderize: true
      },
      {
        route: '/contacto',
        text: 'Contacto',
        renderize: true
      },
      {
        route: '/campanias',
        text: 'Campañas',
        renderize: true
      },
      {
        route: '/donar',
        text: 'Contribuye',
        renderize: false
      }
    ];
  }

  ngOnInit() {}

  logOut(){

    this.store.dispatch(logout());

    for (let link of this.links) {
      if (link.route === '/donar') {
        link.renderize = false;
      }
    }
  }

}
