<?php

class AgendaCalendarForm extends TWindow
{
    protected BootstrapFormBuilder $form;
    private $formFields = [];
    private static $database = 'consultor';
    private static $activeRecord = 'Agendamento';
    private static $primaryKey = 'id';
    private static $formName = 'form_Agendamento';
    private static $startDateField = 'horario_inicial';
    private static $endDateField = 'horario_final';

    /**
     * Form constructor
     * @param $param Request
     */
    public function __construct( $param )
    {
        parent::__construct();
        parent::setSize(0.8, null);
        parent::setTitle("Cadastro de agendamento");
        parent::setProperty('class', 'window_modal');

        if(!empty($param['target_container']))
        {
            $this->adianti_target_container = $param['target_container'];
        }

        // creates the form
        $this->form = new BootstrapFormBuilder(self::$formName);
        // define the form title
        $this->form->setFormTitle("Cadastro de agendamento");

        $view = new THidden('view');

        $criteria_contrato_id = new TCriteria();
        $criteria_profissional_id = new TCriteria();

        $filterVar = TSession::getValue("userid");
        $criteria_contrato_id->add(new TFilter('id', 'in', "(SELECT contrato_id FROM contrato_profissional WHERE profissional_id in  (SELECT id FROM profissional WHERE id = '{$filterVar}') )")); 

        $contrato_id = new TDBCombo('contrato_id', 'consultor', 'Contrato', 'id', '{descricao} ({empresa->nome})','id asc' , $criteria_contrato_id );
        $id = new THidden('id');
        $profissional_id = new TDBCombo('profissional_id', 'consultor', 'Profissional', 'id', '{nome}','nome asc' , $criteria_profissional_id );
        $cor = new TColor('cor');
        $local = new TCombo('local');
        $descricao = new TEntry('descricao');
        $tipo = new TCombo('tipo');
        $data_agenda = new TDate('data_agenda');
        $hora_inicio = new TTime('hora_inicio');
        $hora_intervalo_inicial = new TTime('hora_intervalo_inicial');
        $hora_intervalo_final = new TTime('hora_intervalo_final');
        $hora_fim = new TTime('hora_fim');
        $hora_total = new TTime('hora_total');
        $observacao = new THtmlEditor('observacao');

        $hora_fim->setExitAction(new TAction([$this,'onExitHoraFim']));

        $contrato_id->addValidation("Contrato", new TRequiredValidator()); 
        $descricao->addValidation("Descrição", new TRequiredValidator()); 
        $hora_inicio->addValidation("Horário inicial", new TRequiredValidator()); 
        $hora_fim->addValidation("Horário final", new TRequiredValidator()); 

        $local->enableSearch();
        $descricao->forceUpperCase();
        $tipo->setDefaultOption(false);
        $data_agenda->setMask('dd/mm/yyyy');
        $data_agenda->setDatabaseMask('yyyy-mm-dd');
        $local->addItems(["R"=>"Remoto","P"=>"Presencial","F"=>"Falta"]);
        $tipo->addItems(["A"=>" Agendada","R"=>" Realizada","C"=>" Cancelada","F"=>"Feriado"]);

        $tipo->setEditable(false);
        $hora_total->setEditable(false);

        $tipo->setValue('A');
        $local->setValue('P');
        $cor->setValue('#333333');
        $hora_intervalo_final->setValue('00:00');
        $hora_intervalo_inicial->setValue('00:00');

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
        $profissional_id->setSize('100%');
        $observacao->setSize('100%', 200);
        $hora_intervalo_final->setSize('100%');
        $hora_intervalo_inicial->setSize('100%');

        $row1 = $this->form->addFields([new TLabel("Contrato:", '#ff0000', '14px', null, '100%'),$contrato_id,$id],[new TLabel("Profissional:", null, '14px', null, '100%'),$profissional_id],[new TLabel("Cor:", null, '14px', null, '100%'),$cor],[new TLabel("Tipo:", null, '14px', null, '100%'),$local]);
        $row1->layout = ['col-sm-5',' col-sm-3','col-sm-2','col-sm-2'];

        $row2 = $this->form->addFields([new TLabel("Solicitação:", '#ff0000', '14px', null, '100%'),$descricao],[new TLabel("Tipo de Atividade:", '#ff0000', '14px', null, '100%'),$tipo]);
        $row2->layout = [' col-sm-8',' col-sm-4'];

        $row3 = $this->form->addFields([new TLabel("Data:", '#FF0000', '14px', null, '100%'),$data_agenda],[new TLabel("Inicial:", '#ff0000', '14px', null, '100%'),$hora_inicio],[new TLabel("Int.Inicial:", '#000000', '14px', null, '100%'),$hora_intervalo_inicial],[new TLabel("Int.Final:", '#000000', '14px', null, '100%'),$hora_intervalo_final],[new TLabel("Final:", '#ff0000', '14px', null, '100%'),$hora_fim],[new TLabel("Total:", null, '14px', null),$hora_total]);
        $row3->layout = ['col-sm-2','col-sm-2','col-sm-2','col-sm-2','col-sm-2','col-sm-2'];

        $row4 = $this->form->addFields([new TLabel("Atividades:", null, '14px', null, '100%'),$observacao]);
        $row4->layout = [' col-sm-12'];

        $this->form->addFields([$view]);

        // create the form actions
        $btn_onsave = $this->form->addAction("Salvar", new TAction([$this, 'onSave'],['static' => 1]), 'far:save #ffffff');
        $this->btn_onsave = $btn_onsave;
        $btn_onsave->addStyleClass('btn-primary'); 

        $btn_ondelete = $this->form->addAction("Excluir", new TAction([$this, 'onDelete']), 'far:trash-alt #dd5a43');
        $this->btn_ondelete = $btn_ondelete;

        $btn_onconfirmar = $this->form->addAction("Confirmar", new TAction([$this, 'onConfirmar']), 'far:check-square #171feb');
        $this->btn_onconfirmar = $btn_onconfirmar;

        $action = new TAction(['OrdemServicoDocument','onGenerate']);
        $action->setParameters(['key'=>$param['key']]);
        $btn_ongenerate = $this->form->addAction("OS", $action, 'fas:print #000000');
        //$btn_ongenerate = $this->form->addAction("OS", new TAction(['OrdemServicoDocument', 'onGenerate']), 'fas:print #000000');
        $this->btn_ongenerate = $btn_ongenerate;

        TButton::disableField(self::$formName, "Salvar"); 
        TButton::disableField(self::$formName, "Excluir"); 
        TButton::disableField(self::$formName, "Confirmar"); 
        TButton::disableField(self::$formName, "Cancelar"); 

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

    public function onSave($param = null) 
    {
        try
        {
            TTransaction::open(self::$database); // open a transaction

            /**
            // Enable Debug logger for SQL operations inside the transaction
            TTransaction::setLogger(new TLoggerSTD); // standard output
            TTransaction::setLogger(new TLoggerTXT('log.txt')); // file
            **/

            $messageAction = null;

            $this->form->validate(); // validate form data

            $class = self::$activeRecord;

            $object = new $class;  // create an empty object
            $data = $this->form->getData(); // get form data as array
            $object->fromArray( (array) $data); // load the object with data

            $date = date_create($object->data_agenda.$object->hora_inicio);
            $data_ini = date_format($date,"Y/m/d H:i:s");

            $date = date_create($object->data_agenda.$object->hora_fim);
            $data_fim = date_format($date,"Y/m/d H:i:s");

            $object->horario_inicial = $data_ini ;
            $object->horario_final   = $data_fim ;

            $criteria = new TCriteria;
            $criteria->add( new TFilter( 'system_user_id', '=', TSession::getValue('userid') ) );
            $object->profissional_id = Profissional::getObjects( $criteria)[0]->id;

            $object->store(); // save the object

            $messageAction = new TAction(['AgendaCalendarFormView', 'onReload']);
            $messageAction->setParameter('view', $data->view);
            $messageAction->setParameter('date', explode(' ', $data->horario_inicial)[0]);

            // get the generated {PRIMARY_KEY}
            $data->{self::$primaryKey} = $object->{self::$primaryKey};

            $this->form->setData($data); // fill form data
            TTransaction::close(); // close the transaction

            /**
            // To define an action to be executed on the message close event:
            $messageAction = new TAction(['className', 'methodName']);
            **/

            new TMessage('info', AdiantiCoreTranslator::translate('Record saved'), $messageAction);
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
            //code here

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

        //var_dump($param);

        TButton::disableField(self::$formName, "Excluir"); 
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

            if(strlen($param['date']) == '10')
                $param['date'].= ' 08:00';

            $data->horario_inicial = str_replace('T', ' ', $param['date']);

            $data_agenda = new DateTime($param['date']);
            $data->data_agenda = $data_agenda->format('d/m/Y');

            $horario_final = new DateTime($data->horario_inicial);
            $horario_final->add(new DateInterval('PT1H'));
            $data->horario_final = $horario_final->format('Y-m-d H:i:s');

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

