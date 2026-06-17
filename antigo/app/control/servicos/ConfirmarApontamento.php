<?php

class ConfirmarApontamento extends TWindow
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
        parent::setTitle("Confirmar Apontamentos");
        parent::setProperty('class', 'window_modal');

        // creates the form
        $this->form = new BootstrapFormBuilder(self::$formName);
        // define the form title
        $this->form->setFormTitle("Gerar Apontamentos");


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
            $cDataAte = str_replace('/','',$param['DataAte']);// 31122019 //new DateTime($param['DataAte']);
            $cDataDe  = substr($cDataDe,4,4).'-'.substr($cDataDe,2,2).'-'.substr($cDataDe,0,2).' 00:00:00';   //2019-09-01 00:00:00
            $cDataAte = substr($cDataAte,4,4).'-'.substr($cDataAte,2,2).'-'.substr($cDataAte,0,2).' 23:59:59';//2019-09-30 23:59:59

            //$dDataDe  = new DateTime($cDataDe);
            //$dDataAte = new DateTime($cDataAte);
            
            $messageAction = null;
            
            if ($dDataAte < $dDataDe)
            {
                throw new Exception('A Data Final é menor que a Data Inicial. Verifique os Parâmetros!');
            }
            $ClienteDe = $param['ClienteDe'];

            $ProfissionalDe = $param['ProfissionalDe'];
            
            TTransaction::open('consultor');
            TTransaction::setLogger(new TLoggerSTD);
            $criteria = new TCriteria;

            $criteria->add( new TFilter( 'horario_inicial', '>=', $cDataDe ));
            $criteria->add( new TFilter( 'horario_final'  , '<=', $cDataAte ));

            //if(!Empty($ClienteDe)){
            //    $criteria->add( new TFilter( 'empresa_id', '=', $ClienteDe ));
            //}    

            if(!Empty($ProfissionalDe)){
                $criteria->add( new TFilter( 'profissional_id', '=', $ProfissionalDe));
            }    

            $count = Agendamento::countObjects($criteria);
            
            if ($count==0){
                throw new Exception('Nenhum Apontamento Gerado. Verifique os Parâmetros!');
            }
            
            $oAgendamentos = Agendamento::getObjects($criteria);

            if($oAgendamentos)
            {
                
                $nReg=0;
                
                foreach($oAgendamentos as $oAgendamento) 
                {
                    $count = Realizado::where('contrato_id',  '=', $oAgendamento->contrato_id)
                        ->where('profissional_id','=', $oAgendamento->profissional_id)
                        ->where('inicio'        , '=', $oAgendamento->horario_inicial)
                        ->where('inter_inicial' , '=', $oAgendamento->intervalo_final)
                        ->where('inter_final'   , '=', $oAgendamento->intervalo_final)
                        ->where('fim'           , '=', $oAgendamento->horario_final)
                        ->where('agendamento_id', '=', $oAgendamento->id)
                        ->count();
        
                    if ($count==0){
                        $oAponta = Agendamento::find( $oAgendamento->id );
                        $oAponta->tipo = 'R';
                        //$oAponta->cor  = '#868080';
                        $oAponta->store();
                        
                        $horario_inicial    = new DateTime($oAgendamento->horario_inicial);
                        $intervalo_inicial  = new DateTime($oAgendamento->intervalo_inicial);
                        $intervalo_final    = new DateTime($oAgendamento->intervalo_final);
                        $horario_final      = new DateTime($oAgendamento->horario_final);
    
                        $hora1 = round( ((abs($horario_inicial->getTimestamp()   - $horario_final->getTimestamp())/60)/60), 2);
                        $hora2 = round( ((abs($intervalo_inicial->getTimestamp() - $intervalo_final->getTimestamp())/60)/60), 2);
                        
                        $oRealizado = new Realizado();
                        $oRealizado->contrato_id    = $oAgendamento->contrato_id;
                        $oRealizado->profissional_id= $oAgendamento->profissional_id;
                        $oRealizado->descricao      = $oAgendamento->descricao;
                        $oRealizado->inicio         = $oAgendamento->horario_inicial;
                        $oRealizado->inter_inicial  = $oAgendamento->intervalo_inicial;
                        $oRealizado->inter_final    = $oAgendamento->intervalo_final;
                        $oRealizado->fim            = $oAgendamento->horario_final;
                        $oRealizado->observacao     = $oAgendamento->observacao;
                        $oRealizado->agendamento_id = $oAgendamento->id;
                        $oRealizado->horas          = $hora1 - $hora2 ;
                        $oRealizado->store();
                        $nReg =$nReg+1;
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

