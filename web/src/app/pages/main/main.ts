import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoModule, PoMenuItem } from '@po-ui/ng-components';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent implements OnInit {
  menus: Array<PoMenuItem> = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.dataService.getMenu().subscribe({
      next: (menuData) => {
        // Adiciona a opção de Sair ao final do menu recebido da API
        this.menus = [
          ...menuData,
          { label: 'Sair', action: () => this.logout(), icon: 'po-icon-exit', separator: true }
        ];
      },
      error: (err) => {
        console.error('Erro ao carregar menu dinâmico:', err);
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
