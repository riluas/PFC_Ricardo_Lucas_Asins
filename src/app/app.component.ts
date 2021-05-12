import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    // { title: 'Misiones', url: '/folder/Misiones', icon: 'mail' },
    { title: 'Lanzamientos', url: '/lanzamientos', icon: 'planet' },
    { title: 'Vehículos', url: '/vehiculos', icon: 'paper-plane' },
    { title: 'Seguidos', url: '/seguidos', icon: 'archive' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
