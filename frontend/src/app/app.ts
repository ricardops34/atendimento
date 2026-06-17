import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PoMenuModule, PoPageModule, PoToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('atendimento-frontend');

  public readonly menus: Array<PoMenuItem> = [
    { label: 'Início', icon: 'an an-house', link: '/' }
  ];
}
