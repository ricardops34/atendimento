<?php

class GerarApontamento extends TWindow
{
    protected $form;
    private $formFields = [];
    private static $database = '';
    private static $activeRecord = '';
    private static $primaryKey = '';
    private static $formName = 'form_';

    /**
     * Form constructor
     * @param $param Request
     */
    public function __construct( $param )
    {
        parent::__construct();
        parent::setSize(0.4, null);
        parent::setTitle("Gerar Apontamentos");
        parent::setProperty('class', 'window_modal');

        // creates the form
        $this->form = new BootstrapFormBuilder(self::$formName);
        // define the form title
        $this->form->setFormTitle("Gerar Apontamentos");

        $idSistema = 4;
        $DataDe = new TDate('DataDe');
        $DataAte = new TDate('DataAte');
        $ClienteDe = new TDBUniqueSearch('ClienteDe', 'consultor', 'Empresa', 'id', 'nome','nome asc'  );
        $ProfissionalDe = new TDBUniqueSearch('ProfissionalDe', 'consultor', 'Profissional', 'id', 'nome','nome asc'  );

        $DataDe->setDatabaseMask('yyyy-mm-dd');
        $DataAte->setDatabaseMask('yyyy-mm-dd');

        $ClienteDe->setMinLength(2);
        $ProfissionalDe->setMinLength(2);

        $DataDe->setSize('100%');
        $DataAte->setSize('100%');
        $ClienteDe->setSize('100%');
        $ProfissionalDe->setSize('100%');

        $ClienteDe->setMask('{nome}');
        $DataDe->setMask('dd/mm/yyyy');
        $DataAte->setMask('dd/mm/yyyy');
        $ProfissionalDe->setMask('{nome}');

        $row1 = $this->form->addFields([new TLabel("Data De:", null, '14px', null, '100%'),$DataDe],[new TLabel("Data Até:", null, '14px', null, '100%'),$DataAte]);
        $row1->layout = [' col-sm-6',' col-sm-6'];

        $row2 = $this->form->addFields([new TLabel("Cliente:", null, '14px', null, '100%'),$ClienteDe],[new TLabel("Profissional:", null, '14px', null, '100%'),$ProfissionalDe]);
        $row2->layout = ['col-sm-6',' col-sm-6'];

        // create the form actions
        $btn_onaction = $this->form->addAction("Gerar", new TAction([$this, 'onAction']), 'fa:rocket #ffffff');
        $btn_onaction->addStyleClass('btn-primary'); 

        $data_incio = mktime(0, 0, 0, date('m') , 1 , date('Y'));
        $data_fim = mktime(23, 59, 59, date('m'), date("t"), date('Y'));

        $DataDe->setValue(date('d/m/Y',$data_incio));
        $DataAte->setValue(date('d/m/Y',$data_fim));

        parent::add($this->form);
    }

    public function onAction($param = null) 
    {
        try
        {
            $cDataDe  = str_replace('/','',$param['DataDe']); // 01012019 //new DateTime($param['DataDe']);///
            $cDataAte = str_replace('/','',$param['DataAte']);//31122019 //new DateTime($param['DataAte']);
            $cDataDe  = substr($cDataDe,4,4).'-'.substr($cDataDe,2,2).'-'.substr($cDataDe,0,2);
            $cDataAte = substr($cDataAte,4,4).'-'.substr($cDataAte,2,2).'-'.substr($cDataAte,0,2);

            $dDataDe  = new DateTime($cDataDe);
            $dDataAte = new DateTime($cDataAte);

            $messageAction = null;
            
            if ($dDataAte < $dDataDe)
            {
                throw new Exception('A Data Final é menor que a Data Inicial. Verifique os Parâmetros!');
            }
            $ClienteDe = $param['ClienteDe'];

            $ProfissionalDe = $param['ProfissionalDe'];
            
            TTransaction::open('consultor');
            //TTransaction::setLogger(new TLoggerSTD);
            $criteria = new TCriteria;

            $criteria->add( new TFilter( 'dt_inicio', '<=', $cDataDe ));
            $criteria->add( new TFilter( 'dt_fim'   , '>=', $cDataAte ));

            if(!Empty($ClienteDe)){
                $criteria->add( new TFilter( 'empresa_id', '=', $ClienteDe ));
            }    

            if(!Empty($ProfissionalDe)){
                $criteria->add( new TFilter( 'id', 'IN', '(SELECT contrato_id FROM contrato_item WHERE profissional_id = '.$ProfissionalDe.')'));
            }    

            $count = Contrato::countObjects($criteria);
            
            if ($count==0){
                throw new Exception('Nenhum Apontamento Gerado. Verifique os Parâmetros!');
            }
            
            $oContratos = Contrato::getObjects($criteria);
            $dDataAte = $dDataAte->modify( '+1 day' );

            if($oContratos)
            {
                
                $nReg=0;
                
                foreach($oContratos as $oContrato) 
                {

                    $intervalo  = new DateInterval('P1D');
                    $interData  = new DatePeriod($dDataDe, $intervalo ,$dDataAte);
                    $diasemana  = array('Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado');

                    foreach($interData as $dData){

                        $oEmpresa  = Empresa::where('id', '=', $oContrato->empresa_id )->first();
                        $dData_atu = $dData->format("Y-m-d");//date('Y-m-d');
                        $diasemana_numero = date('w', strtotime($dData_atu));
                        $oItems    = ContratoItem::where('contrato_id', '=', $oContrato->id)
                                            ->where('dia_semana'   , '=', $diasemana_numero)
                                            ->load();
                        if($oItems){
                            foreach($oItems as $oItem) 
                            {   
                                $horario_inicial    = $dData_atu.' '.$oItem->hora_inicio.':00';
                                $intervalo_inicial  = $dData_atu.' '.$oItem->intervalo_ini.':00';
                                $intervalo_final    = $dData_atu.' '.$oItem->intervalo_fim.':00';
                                $horario_final      = $dData_atu.' '.$oItem->hora_final.':00' ;
                                $tipo = "A";
                                
                                $count = Feriado::where('dt_feriado',  '=', $dData_atu)
                                ->count();
           
                                if ($count==0){
                                    $count = Agendamento::where('contrato_id',  '=', $oItem->contrato_id)
                                    ->where('profissional_id'   , '=', $oItem->profissional_id)
                                    ->where('horario_inicial'   , '=', $horario_inicial)
                                    ->where('intervalo_inicial' , '=', $intervalo_inicial)
                                    ->where('intervalo_final'   , '=', $intervalo_final)
                                    ->where('horario_final'     , '=', $horario_final)
                                    ->count();
        
                                    if ($count==0){
                                        if(empty($oContrato->cor)){
                                            $cor = '#333333';
                                        }else{
                                            $cor = $oContrato->cor;
                                        }
                                        $oAgendamento = new Agendamento();
                                        $oAgendamento->contrato_id        = $oItem->contrato_id;
                                        $oAgendamento->profissional_id    = $oItem->profissional_id;
                                        $oAgendamento->descricao          = $oEmpresa->nome;
                                        $oAgendamento->horario_inicial    = $horario_inicial;
                                        $oAgendamento->intervalo_inicial  = $intervalo_inicial;
                                        $oAgendamento->intervalo_final    = $intervalo_final;
                                        $oAgendamento->horario_final      = $horario_final;
                                        $oAgendamento->cor                = $oContrato->cor;
                                        $oAgendamento->tipo               = $tipo;
                                        $oAgendamento->store();
                                        $nReg =$nReg+1;
                                    }
                                }else{
                                        $oContrato = Contrato::where('empresa_id',  '=', $idSistema)
                                        ->load();
                                        $oEmpresa  = Empresa::where('id', '=', $oContrato->empresa_id )->first();

                                        $oFeriado = Feriado::where('dt_feriado',  '=', $dData_atu)
                                        ->load();
                                        
                                        if($oFeriado){
                                            $oAgendamento = new Agendamento();
                                            $oAgendamento->descricao          = 'Feriado: '.$oFeriado->descricao;//.$oFeriado->descricao;
                                            $oAgendamento->contrato_id        = $oContrato->contrato_id;
                                            $oAgendamento->profissional_id    = $oItem->profissional_id;
                                            //$oAgendamento->descricao          = $oEmpresa->nome;
                                            $oAgendamento->horario_inicial    = $horario_inicial;
                                            $oAgendamento->intervalo_inicial  = $intervalo_inicial;
                                            $oAgendamento->intervalo_final    = $intervalo_final;
                                            $oAgendamento->horario_final      = $horario_final;
                                            $oAgendamento->cor                = "#f42b06";
                                            $oAgendamento->tipo               = "F";
                                            $oAgendamento->store();
                                            $nReg =$nReg+1;
                                        }    
                                }    
                            }
                        }    
                    }               
                }
                if ($nReg>0)
                {
                    new TMessage('info', 'Apontamentos Gerados -> '.$nReg, $messageAction);
                }else{
                    new TMessage('info', 'Nenhum Apontamento Gerado. Verifique os Parâmetros', $messageAction);
                } 
            } 
            TTransaction::close(); // close the transaction
            TWindow::closeWindow();
        }
        catch (Exception $e)
        {
            new TMessage('error', $e->getMessage());
        }
    }

    public function onShow($param = null)
    {               

    } 

}

