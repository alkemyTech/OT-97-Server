import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  title: string = 'nosotros';

  imgUrl: string = 'assets/slides1.jpg';  
  
  us: string = `
  Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás,
  abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de
  inserción social. Uniendo las manos de todas las familias, las que viven en el barrio y
  las que viven fuera de él, es que podemos pensar, crear y garantizar estos procesos. 
  Somos una asociación civil sin fines de lucro que se creó en 1997 con la intención de
  New Caso 1: ONG - Somos Más. 2
  dar alimento a las familias del barrio. Con el tiempo fuimos involucrándonos con la
  comunidad y agrandando y mejorando nuestra capacidad de trabajo. Hoy somos un
  centro comunitario que acompaña a más de 700 personas a través de las áreas de:
  Educación, deportes, primera infancia, salud, alimentación y trabajo social.
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
