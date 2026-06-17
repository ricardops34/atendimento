<?php

class AgendamentoCalendarioForm extends TPage
{
    protected BootstrapFormBuilder $form;
    private $formFields = [];
    private static $database = 'consultor';
    private static $activeRecord = 'Agendamento';
    private static $primaryKey = 'id';
    private static $formName = 'form_AgendamentoCalendarioForm';
    private static $startDateField = 'horario_inicial';
    private static $endDateField = 'horario_final';

    /**
     * Form constructor
     * @param $param Request
     */
    public function __construct( $param )
    {
        parent::__construct();

        if(!empty($param['target_container']))
        {
            $this->adianti_target_container = $param['target_container'];
        }

        // creates the form
        $this->form = new BootstrapFormBuilder(self::$formName);
        // define the form title
        $this->form->setFormTitle("Calendario");

        $view = new THidden('view');

        $criteria_contrato_id = new TCriteria();
        $criteria_profissional_id = new TCriteria();

        $id = new THidden('id');
        $contrato_id = new TDBCombo('contrato_id', 'consultor', 'Contrato', 'id', '{descricao} ({empresa->nome})','id asc' , $criteria_contrato_id );
        $profissional_id = new TDBCombo('profissional_id', 'consultor', 'Profissional', 'id', '{nome}','nome asc' , $criteria_profissional_id );
        $cor = new TColor('cor');
        $local = new TCombo('local');
        $descricao = new TEntry('descricao');
        $data_agenda = new TDate('data_agenda');
        $hora_inicio = new TTime('hora_inicio');
        $hora_intervalo_inicial = new TTime('hora_intervalo_inicial');
        $hora_intervalo_final = new TTime('hora_intervalo_final');
        $hora_fim = new TTime('hora_fim');
        $hora_total = new TTime('hora_total');
        $horario_inicial = new TDateTime('horario_inicial');
        $intervalo_inicial = new TDateTime('intervalo_inicial');
        $intervalo_final = new TDateTime('intervalo_final');
        $horario_final = new TDateTime('horario_final');
        $tipo = new TCombo('tipo');
        $observacao = new THtmlEditor('observacao');

        $contrato_id->setChangeAction(new TAction([$this,'OnChangeContrato']));

        $hora_fim->setExitAction(new TAction([$this,'onExitHoraFim']));

        $descricao->addValidation("Descrição", new TRequiredValidator()); 
        $hora_inicio->addValidation("Horario Inicial", new TRequiredValidator()); 
        $hora_fim->addValidation("Horario Final", new TRequiredValidator()); 

        $local->addItems(["P"=>"Presencial","R"=>"Remoto","F"=>"Falta"]);
        $tipo->addItems(["A"=>" Agendada","R"=>" Realizada","C"=>" Cancelada","F"=>"Feriado"]);

        $local->setValue('P');
        $hora_intervalo_final->setValue('00:00');
        $hora_intervalo_inicial->setValue('00:00');

        $tipo->enableSearch();
        $local->enableSearch();
        $contrato_id->enableSearch();
        $profissional_id->enableSearch();

        $data_agenda->setMask('dd/mm/yyyy');
        $horario_final->setMask('dd/mm/yyyy hh:ii');
        $horario_inicial->setMask('dd/mm/yyyy hh:ii');
        $intervalo_final->setMask('dd/mm/yyyy hh:ii');
        $intervalo_inicial->setMask('dd/mm/yyyy hh:ii');

        $data_agenda->setDatabaseMask('yyyy-mm-dd');
        $horario_final->setDatabaseMask('yyyy-mm-dd hh:ii');
        $horario_inicial->setDatabaseMask('yyyy-mm-dd hh:ii');
        $intervalo_final->setDatabaseMask('yyyy-mm-dd hh:ii');
        $intervalo_inicial->setDatabaseMask('yyyy-mm-dd hh:ii');

        $tipo->setEditable(false);
        $hora_total->setEditable(false);
        $horario_final->setEditable(false);
        $horario_inicial->setEditable(false);
        $intervalo_final->setEditable(false);
        $intervalo_inicial->setEditable(false);

        $id->setSize(200);
        $cor->setSize('100%');
        $tipo->setSize('100%');
        $local->setSize('100%');
        $hora_fim->setSize('100%');
        $descricao->setSize('100%');
        $hora_total->setSize('100%');
        $contrato_id->setSize('100%');
        $data_agenda->setSize('100%');
        $hora_inicio->setSize('100%');
        $horario_final->setSize('100%');
        $profissional_id->setSize('100%');
        $horario_inicial->setSize('100%');
        $intervalo_final->setSize('100%');
        $observacao->setSize('100%', 210);
        $intervalo_inicial->setSize('100%');
        $hora_intervalo_final->setSize('100%');
        $hora_intervalo_inicial->setSize('100%');

        $row1 = $this->form->addFields([new TLabel("Contrato:", null, '14px', null, '100%'),$id,$contrato_id],[new TLabel("Profissional:", null, '14px', null, '100%'),$profissional_id],[new TLabel("Cor:", null, '14px', null, '100%'),$cor],[new TLabel("Tipo:", null, '14px', null, '100%'),$local]);
        $row1->layout = [' col-sm-4',' col-sm-4','col-sm-2','col-sm-2'];

        $row2 = $this->form->addFields([new TLabel("Descrição:", '#ff0000', '14px', null, '100%'),$descricao],[new TLabel("Data:", null, '14px', null, '100%'),$data_agenda]);
        $row2->layout = [' col-sm-9',' col-sm-3'];

        $row3 = $this->form->addFields([new TLabel("Horario Inicial:", '#FF0000', '14px', null, '100%'),$hora_inicio],[new TLabel("Intervalo Inicial:", null, '14px', null, '100%'),$hora_intervalo_inicial],[new TLabel("Intervalo Final:", null, '14px', null, '100%'),$hora_intervalo_final],[new TLabel("Horario Final:", '#FF0000', '14px', null, '100%'),$hora_fim],[new TLabel("Total:", null, '14px', null, '100%'),$hora_total]);
        $row3->layout = [' col-sm-3',' col-sm-2',' col-sm-2',' col-sm-3','col-sm-2'];

        $row4 = $this->form->addFields([new TLabel("Horário inicial:", null, '14px', null, '100%'),$horario_inicial],[new TLabel("Intervalo Inicial:", null, '14px', null, '100%'),$intervalo_inicial],[new TLabel("Intervalo Final:", null, '14px', null, '100%'),$intervalo_final],[new TLabel("Horário final:", null, '14px', null, '100%'),$horario_final],[new TLabel("Tipo de Atividade:", null, '14px', null, '100%'),$tipo]);
        $row4->layout = ['col-sm-3',' col-sm-2',' col-sm-2','col-sm-3','col-sm-2'];

        $row5 = $this->form->addFields([new TLabel("Observações:", null, '14px', null, '100%'),$observacao]);
        $row5->layout = [' col-sm-12'];

        $this->form->addFields([$view]);

        // create the form actions

        $btnsalvar = $this->form->addHeaderAction("Salvar", new TAction([$this, 'onSave']), 'fas:save #FFFFFF');
        $this->btnsalvar = $btnsalvar;
        $btnsalvar->addStyleClass('btn-primary'); 

        $btnexcluir = $this->form->addHeaderAction("Excluir", new TAction([$this, 'onDelete']), 'fas:trash-alt #FFFFFF');
        $this->btnexcluir = $btnexcluir;
        $btnexcluir->addStyleClass('btn-danger'); 

        $btnconfirmar = $this->form->addHeaderAction("Confirmar", new TAction([$this, 'onConfirmar']), 'fas:check-circle #FFFFFF');
        $this->btnconfirmar = $btnconfirmar;
        $btnconfirmar->addStyleClass('btn-success'); 

        $btnos = $this->form->addHeaderAction("OS", new TAction([$this, 'onOrdem'],['static' => 1]), 'fas:print #FFFFFF');
        $this->btnos = $btnos;
        $btnos->addStyleClass('btn-info'); 

        parent::setTargetContainer('adianti_right_panel');

        $btnClose = new TButton('closeCurtain');
        $btnClose->class = 'btn btn-sm btn-default';
        $btnClose->style = 'margin-right:10px;';
        $btnClose->onClick = "Template.closeRightPanel();";
        $btnClose->setLabel("Fechar");
        $btnClose->setImage('fas:times');

        $this->form->addHeaderWidget($btnClose);

        if(isset($param['method']) and $param['method'] == 'onEdit'){

            if(isset($param['id'])){

                /*
                $btnsalvar->style = 'display: none';
                $btnexcluir->style = 'display: none';
                $btnconfirmar->style = 'display: none';
                */
            }                

        }

        parent::add($this->form);

    }

    public static function onExitHoraFim($param = null) 
    {
        try 
        {
            $hora_ini = $param['hora_inicio'];
            $hora_fim = $param['hora_fim'];

            $hora_int_ini = $param['hora_intervalo_inicial'];
            $hora_int_fim = $param['hora_intervalo_final'];

            $hora  = gmdate('H:i', strtotime( $hora_fim ) - strtotime( $hora_ini ) );
            $inter = gmdate('H:i', strtotime( $hora_int_fim ) - strtotime( $hora_int_ini ) );
            $total = gmdate('H:i', strtotime( $hora ) - strtotime( $inter ) );
            //date('d/m/Y H:i:s', $teste);

            $hora_total = $param['hora_total'];

            if ($total <> $hora_total and isset($hora_fim) and !empty($hora_fim)){

                $object = new stdClass();
                $object->hora_total = $total;
                TForm::sendData(self::$formName, $object);
            }

            /*
            echo $hora_ini.'<br>';
            echo $hora_fim.'<br>';
            echo $hora_int_ini.'<br>';
            echo $hora_int_fim.'<br>';
            echo $hora_total.'<br>';
            echo $hora.'<br>';
            echo $inter.'<br>';
            echo $total.'<br>';
            */

        }
        catch (Exception $e) 
        {
            new TMessage('error', $e->getMessage());    
        }
    }

    public static function OnChangeContrato($param = null) 
    {
        try 
        {
            if(isset($param['contrato_id'])){
                TTransaction::open('consultor');
                $id_contrato = $param['contrato_id'];
                $oContrato = Contrato::find( $id_contrato );

                if($oContrato){

                    $object = new stdClass();
                    $object->cor = $oContrato->cor;
                    $object->descricao = $oContrato->descricao;
                    TForm::sendData(self::$formName, $object);

                }

                TTransaction::close();
            }
            //code here

        }
        catch (Exception $e) 
        {
            new TMessage('error', $e->getMessage());    
        }
    }

    public function onSave($param = null) 
    {
        try
        {
            TTransaction::open(self::$database); // open a transaction

            $messageAction = null;

            $this->form->validate(); // validate form data

            $object = new Agendamento(); // create an empty object 

            $data = $this->form->getData(); // get form data as array
            $object->fromArray( (array) $data); // load the object with data

            /*
            if($object->tipo <> 'A'){
                new TMessage('error', ' Registro não pode ser alterado'); // shows the exception error message
                $this->form->setData( $this->form->getData() ); // keep form data
                TTransaction::rollback();
                return;
            }
            */
            $date = date_create($object->data_agenda.$object->hora_inicio);
            $data_ini = date_format($date,"Y/m/d H:i:s");

            $date = date_create($object->data_agenda.$object->hora_fim);
            $data_fim = date_format($date,"Y/m/d H:i:s");

            $object->horario_inicial = $data_ini ;
            $object->horario_final   = $data_fim ;

            //Calculo de Tempo Total
            $hora_ini = $object->hora_inicio;
            $hora_fim = $object->hora_fim;
            $hora_int_ini = $object->hora_intervalo_inicial;
            $hora_int_fim = $object->hora_intervalo_final;
            $hora  = gmdate('H:i', strtotime( $hora_fim ) - strtotime( $hora_ini ) );
            $inter = gmdate('H:i', strtotime( $hora_int_fim ) - strtotime( $hora_int_ini ) );
            $total = gmdate('H:i', strtotime( $hora ) - strtotime( $inter ) );
            $object->hora_total = $total;

            if(empty($object->tipo)){
                $object->tipo = 'A';
            }   

            //$criteria = new TCriteria;
            //$criteria->add( new TFilter( 'system_user_id', '=', TSession::getValue('userid') ) );
            //$object->profissional_id = Profissional::getObjects( $criteria)[0]->id;

            $object->store(); // save the object 

            $messageAction = new TAction(['AgendamentoCalendarioFormView', 'onReload']);
            $messageAction->setParameter('view', $data->view);
            $messageAction->setParameter('date', explode(' ', $data->horario_inicial)[0]);

            // get the generated {PRIMARY_KEY}
            $data->id = $object->id; 

            $this->form->setData($data); // fill form data
            TTransaction::close(); // close the transaction

            TToast::show('success', "Registro salvo", 'topRight', 'fas:save'); 

                        TScript::create("Template.closeRightPanel();"); 

        }
        catch (Exception $e) // in case of exception
        {

            new TMessage('error', $e->getMessage()); // shows the exception error message
            $this->form->setData( $this->form->getData() ); // keep form data
            TTransaction::rollback(); // undo all pending operations
        }
    }
    public function onDelete($param = null) 
    {
        if(isset($param['delete']) && $param['delete'] == 1)
        {
            try
            {
                $key = $param[self::$primaryKey];

                // open a transaction with database
                TTransaction::open(self::$database);

                $class = self::$activeRecord;

                // instantiates object
                $object = new $class($key, FALSE);

                // deletes the object from the database
                $object->delete();

                // close the transaction
                TTransaction::close();

                $messageAction = new TAction(array(__CLASS__.'View', 'onReload'));
                $messageAction->setParameter('view', $param['view']);
                $messageAction->setParameter('date', explode(' ',$param[self::$startDateField])[0]);

                // shows the success message
                new TMessage('info', AdiantiCoreTranslator::translate('Record deleted'), $messageAction);
            }
            catch (Exception $e) // in case of exception
            {
                // shows the exception error message
                new TMessage('error', $e->getMessage());
                // undo all pending operations
                TTransaction::rollback();
            }
        }
        else
        {
            // define the delete action
            $action = new TAction(array($this, 'onDelete'));
            $action->setParameters((array) $this->form->getData());
            $action->setParameter('delete', 1);
            // shows a dialog to the user
            new TQuestion(AdiantiCoreTranslator::translate('Do you really want to delete ?'), $action);   
        }
    }
    public function onConfirmar($param = null) 
    {
        try 
        {
            TTransaction::open(self::$database); 

            $messageAction = null;
            $id = null;
            $this->form->validate(); 

            $object = new Agendamento(); 

            $data = $this->form->getData(); // get form data as array
            $object->fromArray( (array) $data); // load the object with data

            if($object->tipo <> 'A'){
                new TMessage('error', ' Registro não pode ser alterado'); // shows the exception error message
                $this->form->setData( $this->form->getData() ); // keep form data
                TTransaction::rollback();
                return;
            }

            $date = date_create($object->data_agenda.$object->hora_inicio);
            $data_ini = date_format($date,"Y/m/d H:i:s");

            $date = date_create($object->data_agenda.$object->hora_fim);
            $data_fim = date_format($date,"Y/m/d H:i:s");

            $object->horario_inicial = $data_ini ;
            $object->horario_final   = $data_fim ;

            //Calculo de Tempo Total
            $hora_ini = $object->hora_inicio;
            $hora_fim = $object->hora_fim;
            $hora_int_ini = $object->hora_intervalo_inicial;
            $hora_int_fim = $object->hora_intervalo_final;
            $hora  = gmdate('H:i', strtotime( $hora_fim ) - strtotime( $hora_ini ) );
            $inter = gmdate('H:i', strtotime( $hora_int_fim ) - strtotime( $hora_int_ini ) );
            $total = gmdate('H:i', strtotime( $hora ) - strtotime( $inter ) );
            $object->hora_total = $total;

            $object->tipo = 'R';

            //$criteria = new TCriteria;
            //$criteria->add( new TFilter( 'system_user_id', '=', TSession::getValue('userid') ) );
            //$object->profissional_id = Profissional::getObjects( $criteria)[0]->id;

            $object->store(); 

            $id = $object->id;

            $messageAction = new TAction(['AgendamentoCalendarioFormView', 'onReload']);
            $messageAction->setParameter('view', $data->view);
            $messageAction->setParameter('date', explode(' ', $data->horario_inicial)[0]);

            // get the generated {PRIMARY_KEY}
            $data->id = $object->id; 

            $this->form->setData($data); 
            TTransaction::close(); 

            new TMessage('info', "Registro Confirmado", $messageAction);
            /*
            if(isset($id)){
                $pageParam = ['key' => $id]; // ex.: = ['key' => 10]
                TApplication::loadPage('OrdemServicoDocument', 'onGenerate', $pageParam);
            }
            */

        }
        catch (Exception $e) 
        {
            new TMessage('error', $e->getMessage());    
        }
    }
    public static function onOrdem($param = null) 
    {
        try 
        {

            //var_dump($param);
            if (isset($param['id']))
            {
                //$data = $this->form->getData(); 
                //$this->form->setData($data); 
                TScript::create("Template.closeRightPanel();");
                //$action = new TAction(['OrdemServicoDocument','onGenerate']);
                //$action->setParameters(['key'=>$param['key']]);
                //$btn_ongenerate = $this->form->addAction("OS", $action, 'fas:print #000000');            //code here
                $pageParam = ['static' => 1 , 'key' => $param['id'] ]; // ex.: = ['key' => 10]
                TApplication::loadPage('OrdemServicoDocument', 'onGenerate', $pageParam);
            }

        }
        catch (Exception $e) 
        {
            new TMessage('error', $e->getMessage());    
        }
    }

    public function onEdit( $param )
    {
        try
        {
            if (isset($param['key']))
            {
                $key = $param['key'];  // get the parameter $key
                TTransaction::open(self::$database); // open a transaction

                $object = new Agendamento($key); // instantiates the Active Record 

                                $object->view = !empty($param['view']) ? $param['view'] : 'agendaWeek'; 

                $this->form->setData($object); // fill the form 

                TTransaction::close(); // close the transaction 

                /*
                if($object->tipo <> 'A' ){

                    THtmlEditor::disableField(self::$formName, 'observacao');

                    TButton::disableField(self::$formName, 'salvar');
                    TButton::disableField(self::$formName, 'excluir');
                    TButton::disableField(self::$formName, 'confirmar');

                    $this->form->setEditable(FALSE);
                }
                */
            }
            else
            {
                $this->form->clear();
            }
        }
        catch (Exception $e) // in case of exception
        {
            new TMessage('error', $e->getMessage()); // shows the exception error message
            TTransaction::rollback(); // undo all pending operations
        }
    }

    /**
     * Clear form data
     * @param $param Request
     */
    public function onClear( $param )
    {
        $this->form->clear(true);

    }

    public function onShow($param = null)
    {

    } 

    public function onStartEdit($param)
    {

        $this->form->clear(true);

        $data = new stdClass;
        $data->view = $param['view'] ?? 'agendaWeek'; // calendar view
        $data->cor = '#3a87ad';

        if (!empty($param['date']))
        {
            if(strlen($param['date']) == '10')
                $param['date'].= ' 09:00';

            $data->horario_inicial = str_replace('T', ' ', $param['date']);

            $horario_final = new DateTime($data->horario_inicial);
            $horario_final->add(new DateInterval('PT1H'));
            $data->horario_final = $horario_final->format('Y-m-d H:i:s');

            $data_agenda = new DateTime($param['date']);
            $data->data_agenda = $data_agenda->format('d/m/Y');

            if(empty($data->tipo) or $data->tipo == null){
                $data->tipo = 'A';
            }    

            //echo $data->tipo;
            /*
            if($data->tipo <> 'A' ){
                THtmlEditor::disableField(self::$formName, 'observacao');

                TButton::disableField(self::$formName, 'salvar');
                TButton::disableField(self::$formName, 'excluir');
                TButton::disableField(self::$formName, 'confirmar');

                $this->form->setEditable(FALSE);
            }
            */

        }

        $this->form->setData( $data );
    }

    public static function onUpdateEvent($param)
    {
        try
        {
            if (isset($param['id']))
            {
                TTransaction::open(self::$database);

                $class = self::$activeRecord;
                $object = new $class($param['id']);

                $object->horario_inicial = str_replace('T', ' ', $param['start_time']);
                $object->horario_final   = str_replace('T', ' ', $param['end_time']);

                $object->store();

                // close the transaction
                TTransaction::close();
            }
        }
        catch (Exception $e) // in case of exception
        {
            new TMessage('error', '<b>Error</b> ' . $e->getMessage());
            TTransaction::rollback();
        }
    }

    public static function getFormName()
    {
        return self::$formName;
    }

}

