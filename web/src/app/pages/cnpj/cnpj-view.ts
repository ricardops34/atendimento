import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoPageModule, 
  PoTabsModule, 
  PoInfoModule, 
  PoTableModule, 
  PoTableColumn,
  PoBreadcrumb 
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-cnpj-view',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoTabsModule, PoInfoModule, PoTableModule],
  template: `
    <po-page-default [p-title]="title" [p-breadcrumb]="breadcrumb">
      
      <po-tabs>
        <po-tab p-label="Dados da Empresa" p-icon="po-icon-company" [p-active]="true">
          <div class="po-row">
            <po-info class="po-md-4" p-label="CNPJ Básico" [p-value]="data?.cnpjBasico"></po-info>
            <po-info class="po-md-8" p-label="Razão Social" [p-value]="data?.razaoSocial"></po-info>
          </div>
          <div class="po-row">
            <po-info class="po-md-4" p-label="Capital Social" [p-value]="data?.capitalSocial | currency:'BRL'"></po-info>
            <po-info class="po-md-4" p-label="Natureza Jurídica" [p-value]="data?.naturezaJuridica"></po-info>
            <po-info class="po-md-4" p-label="Porte" [p-value]="data?.porteEmpresa"></po-info>
          </div>
        </po-tab>

        <po-tab p-label="Estabelecimentos" p-icon="po-icon-users">
          <po-table 
            [p-columns]="colEstabelecimentos" 
            [p-items]="data?.estabelecimentos">
          </po-table>
        </po-tab>

        <po-tab p-label="Quadro de Sócios" p-icon="po-icon-user">
          <po-table 
            [p-columns]="colSocios" 
            [p-items]="data?.socios">
          </po-table>
        </po-tab>
      </po-tabs>

    </po-page-default>
  `
})
export class CnpjViewComponent implements OnInit {
  private coreService = inject(CoreService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  data: any;
  title = 'Visualizando Empresa';
  
  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Empresas RFB', link: '/saas/cnpj/empresas' },
      { label: 'Detalhes' }
    ]
  };

  colEstabelecimentos: Array<PoTableColumn> = [
    { property: 'cnpjOrdem', label: 'Ordem', width: '80px' },
    { property: 'cnpjDv', label: 'DV', width: '50px' },
    { property: 'nomeFantasia', label: 'Nome Fantasia' },
    { property: 'situacaoCadastral', label: 'Situação', type: 'label', labels: [
      { value: '02', color: 'color-11', label: 'Ativa' },
      { value: '08', color: 'color-07', label: 'Baixada' },
      { value: '04', color: 'color-08', label: 'Inapta' },
      { value: '03', color: 'color-06', label: 'Suspensa' },
      { value: '01', color: 'color-05', label: 'Nula' }
    ]},
    { property: 'municipio', label: 'Município' },
    { property: 'uf', label: 'UF' }
  ];

  colSocios: Array<PoTableColumn> = [
    { property: 'nomeSocio', label: 'Nome do Sócio / Razão Social' },
    { property: 'qualificacaoSocio', label: 'Qualificação' },
    { property: 'dataEntradaSociedade', label: 'Admissão', type: 'date' },
    { property: 'paisId', label: 'País' }
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
    }
  }

  loadData(id: string) {
    this.http.get(`${this.coreService.apiUrl}/cnpj/detalhes/${id}`).subscribe({
      next: (res: any) => {
        this.data = res;
        this.title = res.razaoSocial;
      },
      error: () => {
        console.error('Erro ao carregar detalhes do CNPJ');
      }
    });
  }
}
