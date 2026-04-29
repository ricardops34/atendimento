import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoPageModule, 
  PoTabsModule, 
  PoDynamicModule, 
  PoDynamicFormField, 
  PoNotificationService,
  PoBreadcrumb
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-branches-edit',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoTabsModule, PoDynamicModule],
  template: `
    <po-page-edit 
      [p-title]="title" 
      [p-breadcrumb]="breadcrumb"
      (p-save)="save()" 
      (p-cancel)="cancel()">
      
      <po-tabs>
        <po-tab p-label="Dados Operacionais" [p-active]="true">
          <po-dynamic-form #formBasic [p-fields]="fieldsBasic" [p-value]="branch"></po-dynamic-form>
        </po-tab>
        
        <po-tab p-label="Endereço Fiscal">
          <po-dynamic-form #formFiscal [p-fields]="fieldsFiscal" [p-value]="branch"></po-dynamic-form>
        </po-tab>
        
        <po-tab p-label="Endereço Cobrança">
          <po-dynamic-form #formBilling [p-fields]="fieldsBilling" [p-value]="branch"></po-dynamic-form>
        </po-tab>
        
        <po-tab p-label="Branding e Identidade">
          <po-dynamic-form #formBranding [p-fields]="fieldsBranding" [p-value]="branch"></po-dynamic-form>
        </po-tab>
      </po-tabs>
      
    </po-page-edit>
  `
})
export class BranchesEditComponent implements OnInit {
  private coreService = inject(CoreService);
  private http = inject(HttpClient);
  private notification = inject(PoNotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  title = 'Nova Filial';
  
  // Valores padrão setados diretamente no objeto branch
  branch: any = { 
    isMain: false, 
    personType: 'J',
    country: 'Brasil',
    billingCountry: 'Brasil'
  };
  
  id: string | null = null;

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Filiais', link: '/app/branches' },
      { label: 'Cadastro' }
    ]
  };

  fieldsBasic: Array<PoDynamicFormField> = [
    { property: 'name', label: 'Razão Social', gridColumns: 6, required: true },
    { property: 'tradeName', label: 'Nome Fantasia', gridColumns: 6 },
    { property: 'document', label: 'CNPJ / CPF', gridColumns: 4, mask: '99.999.999/9999-99', required: true },
    { property: 'personType', label: 'Tipo Pessoa', gridColumns: 4, options: [
      { label: 'Física', value: 'F' }, { label: 'Jurídica', value: 'J' }, { label: 'Outros', value: 'O' }
    ]},
    { property: 'stateRegistration', label: 'Inscrição Estadual', gridColumns: 4 },
    { property: 'foundationDate', label: 'Data Abertura/Nasc.', type: 'date', gridColumns: 4 },
    { property: 'isMain', label: 'É a Matriz?', type: 'boolean', gridColumns: 4 },
    { property: 'email', label: 'E-mail Operacional', gridColumns: 4 },
    { property: 'phone', label: 'Telefone', gridColumns: 4 },
    { property: 'responsibleName', label: 'Nome do Responsável', gridColumns: 8 }
  ];

  fieldsFiscal: Array<PoDynamicFormField> = [
    { property: 'zipCode', label: 'CEP Fiscal', gridColumns: 3, mask: '99999-999' },
    { property: 'address', label: 'Logradouro', gridColumns: 6 },
    { property: 'number', label: 'Número', gridColumns: 3 },
    { property: 'complement', label: 'Complemento', gridColumns: 6 },
    { property: 'neighborhood', label: 'Bairro', gridColumns: 6 },
    { property: 'city', label: 'Cidade', gridColumns: 4 },
    { property: 'state', label: 'UF', gridColumns: 2 },
    { property: 'country', label: 'País', gridColumns: 6 }
  ];

  fieldsBilling: Array<PoDynamicFormField> = [
    { property: 'billingZipCode', label: 'CEP Cobrança', gridColumns: 3, mask: '99999-999' },
    { property: 'billingAddress', label: 'Logradouro', gridColumns: 6 },
    { property: 'billingNumber', label: 'Número', gridColumns: 3 },
    { property: 'billingComplement', label: 'Complemento', gridColumns: 6 },
    { property: 'billingNeighborhood', label: 'Bairro', gridColumns: 6 },
    { property: 'billingCity', label: 'Cidade', gridColumns: 4 },
    { property: 'billingState', label: 'UF', gridColumns: 2 },
    { property: 'billingCountry', label: 'País', gridColumns: 6 }
  ];

  fieldsBranding: Array<PoDynamicFormField> = [
    { property: 'domain', label: 'Domínio Próprio (Opcional)', gridColumns: 6, help: 'Ex: filial1.cliente.com' },
    { property: 'logoUrl', label: 'URL da Logo da Filial', gridColumns: 6 },
    { property: 'primaryColor', label: 'Cor Primária', gridColumns: 3 },
    { property: 'secondaryColor', label: 'Cor Secundária', gridColumns: 3 }
  ];

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = 'Editar Filial';
      this.loadBranch();
    }
  }

  loadBranch() {
    this.http.get(`${this.coreService.apiUrl}/branches/${this.id}`).subscribe((data: any) => {
      this.branch = data;
    });
  }

  save() {
    const method = this.id ? 'put' : 'post';
    const url = this.id ? `${this.coreService.apiUrl}/branches/${this.id}` : `${this.coreService.apiUrl}/branches`;

    this.http[method](url, this.branch).subscribe({
      next: () => {
        this.notification.success('Filial salva com sucesso!');
        this.router.navigate(['/app/branches']);
      },
      error: () => this.notification.error('Falha ao salvar dados da filial.')
    });
  }

  cancel() {
    this.router.navigate(['/app/branches']);
  }
}
