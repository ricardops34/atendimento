<?php

class ContratoForm extends TPage
{
    protected BootstrapFormBuilder $form;
    private $formFields = [];
    private static $database = 'consultor';
    private static $activeRecord = 'Contrato';
    private static $primaryKey = 'id';
    private static $formName = 'form_Contrato';

    use Adianti\Base\AdiantiMasterDetailTrait;

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
        $this->form->setFormTitle("Cadastro de contrato");

        $criteria_empresa_id = new TCriteria();
        $criteria_profissionais_id = new TCriteria();
        $criteria_contrato_item_contrato_profissional_id = new TCriteria();

        $id = new TEntry('id');
        $empresa_id = new TDBCombo('empresa_id', 'consultor', 'Empresa', 'id', '{nome}','nome asc' , $criteria_empresa_id );
        $descricao = new TEntry('descricao');
        $cor = new TColor('cor');
        $dt_inicio = new TDate('dt_inicio');
        $dt_fim = new TDate('dt_fim');
        $tipo = new TCombo('tipo');
        $valor_hora = new TNumeric('valor_hora', '2', ',', '.' );
        $valor_fixo = new TNumeric('valor_fixo', '2', ',', '.' );
        $profissionais_id = new TDBMultiSearch('profissionais_id', 'consultor', 'Profissional', 'id', 'nome','nome asc' , $criteria_profissionais_id );
        $contrato_item_contrato_dia_semana = new TCombo('contrato_item_contrato_dia_semana');
        $contrato_item_contrato_profissional_id = new TDBCombo('contrato_item_contrato_profissional_id', 'consultor', 'Profissional', 'id', '{nome}','nome asc' , $criteria_contrato_item_contrato_profissional_id );
        $contrato_item_contrato_hora_inicio = new TTime('contrato_item_contrato_hora_inicio');
        $contrato_item_contrato_intervalo_ini = new TTime('contrato_item_contrato_intervalo_ini');
        $contrato_item_contrato_intervalo_fim = new TTime('contrato_item_contrato_intervalo_fim');
        $contrato_item_contrato_hora_final = new TTime('contrato_item_contrato_hora_final');
        $contrato_item_contrato_id = new THidden('contrato_item_contrato_id');

        $contrato_item_contrato_dia_semana->setChangeAction(new TAction([$this,'OnDiaSemana']));

        $contrato_item_contrato_intervalo_ini->setExitAction(new TAction([$this,'OnIntervaloIni']));

        $empresa_id->addValidation("Empresa", new TRequiredValidator()); 
        $descricao->addValidation("Descrição", new TRequiredValidator()); 
        $dt_inicio->addValidation("Data de início", new TRequiredValidator()); 
        $dt_fim->addValidation("Data de fim", new TRequiredValidator()); 
        $tipo->addValidation("Tipo de Contrato", new TRequiredValidator()); 

        $id->setEditable(false);
        $profissionais_id->setMinLength(2);
        $dt_fim->setDatabaseMask('yyyy-mm-dd');
        $dt_inicio->setDatabaseMask('yyyy-mm-dd');

        $tipo->addItems(["F"=>" Fixo","H"=>" Hora"]);
        $contrato_item_contrato_dia_semana->addItems(["0"=>" Domingo","1"=>" Segunda-Feira","2"=>" Terça-Feira","3"=>" Quarta-Feira","4"=>" Quinta-Feira","5"=>" Sexta-Feira","6"=>" Sábado  "]);

        $dt_fim->setMask('dd/mm/yyyy');
        $dt_inicio->setMask('dd/mm/yyyy');
        $profissionais_id->setMask('{nome}');

        $id->setSize(100);
        $cor->setSize('70%');
        $dt_fim->setSize(110);
        $tipo->setSize('70%');
        $dt_inicio->setSize(110);
        $descricao->setSize('100%');
        $valor_hora->setSize('70%');
        $valor_fixo->setSize('70%');
        $empresa_id->setSize('100%');
        $profissionais_id->setSize('100%', 70);
        $contrato_item_contrato_hora_final->setSize(110);
        $contrato_item_contrato_hora_inicio->setSize(110);
        $contrato_item_contrato_dia_semana->setSize('70%');
        $contrato_item_contrato_intervalo_ini->setSize('70%');
        $contrato_item_contrato_intervalo_fim->setSize('70%');
        $contrato_item_contrato_profissional_id->setSize('70%');

        $row1 = $this->form->addFields([new TLabel("Id:", null, '14px', null, '100%'),$id],[new TLabel("Empresa:", '#ff0000', '14px', null, '100%'),$empresa_id],[new TLabel("Descrição:", '#ff0000', '14px', null, '100%'),$descricao]);
        $row1->layout = [' col-sm-2',' col-sm-5',' col-sm-5'];

        $row2 = $this->form->addFields([new TLabel("cor:", null, '14px', null, '100%'),$cor],[new TLabel("Data de início:", '#ff0000', '14px', null, '100%'),$dt_inicio],[new TLabel("Data de fim:", '#ff0000', '14px', null, '100%'),$dt_fim]);
        $row2->layout = [' col-sm-4',' col-sm-4',' col-sm-4'];

        $row3 = $this->form->addFields([new TLabel("Tipo de Contrato:", '#ff0000', '14px', null, '100%'),$tipo],[new TLabel("Valor hora:", null, '14px', null, '100%'),$valor_hora],[new TLabel("Valor Fixo:", null, '14px', null, '100%'),$valor_fixo]);
        $row3->layout = [' col-sm-4',' col-sm-4',' col-sm-4'];

        $row4 = $this->form->addFields([new TLabel("Profissionais: ", '#ff0000', '14px', null, '100%'),$profissionais_id]);
        $row4->layout = [' col-sm-12'];

        $row5 = $this->form->addFields([new TFormSeparator("Detalhes:", '#333333', '18', '#eeeeee')],[new TLabel("Dia da Semana:", null, '14px', null, '100%'),$contrato_item_contrato_dia_semana],[new TLabel("Profissional:", null, '14px', null, '100%'),$contrato_item_contrato_profissional_id]);
        $row5->layout = [' col-sm-2',' col-sm-5',' col-sm-5'];

        $row6 = $this->form->addFields([new TLabel("Hora Inicial:", null, '14px', null, '100%'),$contrato_item_contrato_hora_inicio],[new TLabel("Intervalo Inicial:", null, '14px', null, '100%'),$contrato_item_contrato_intervalo_ini],[new TLabel("Intervalo Final:", null, '14px', null, '100%'),$contrato_item_contrato_intervalo_fim],[new TLabel("Hora Final:", null, '14px', null, '100%'),$contrato_item_contrato_hora_final]);
        $row6->layout = [' col-sm-3',' col-sm-3',' col-sm-3',' col-sm-3'];

        $row7 = $this->form->addFields([$contrato_item_contrato_id]);         
        $add_contrato_item_contrato = new TButton('add_contrato_item_contrato');

        $action_contrato_item_contrato = new TAction(array($this, 'onAddContratoItemContrato'));

        $add_contrato_item_contrato->setAction($action_contrato_item_contrato, "Adicionar");
        $add_contrato_item_contrato->setImage('fas:plus #000000');

        $this->form->addFields([$add_contrato_item_contrato]);

        $detailDatagrid = new TQuickGrid;
        $this->contrato_item_contrato_list = new BootstrapDatagridWrapper($detailDatagrid);
        $this->contrato_item_contrato_list->style = 'width:100%';
        $this->contrato_item_contrato_list->class .= ' table-bordered';
        $this->contrato_item_contrato_list->disableDefaultClick();
        $this->contrato_item_contrato_list->addQuickColumn('', 'edit', 'left', 50);
        $this->contrato_item_contrato_list->addQuickColumn('', 'delete', 'left', 50);

        $column_contrato_item_contrato_dia_semana_transformed = $this->contrato_item_contrato_list->addQuickColumn("Dia", 'contrato_item_contrato_dia_semana', 'left');
        $column_contrato_item_contrato_hora_inicio = $this->contrato_item_contrato_list->addQuickColumn("Hora Inicial", 'contrato_item_contrato_hora_inicio', 'left');
        $column_contrato_item_contrato_intervalo_ini = $this->contrato_item_contrato_list->addQuickColumn("Intervalo Inicial", 'contrato_item_contrato_intervalo_ini', 'left');
        $column_contrato_item_contrato_intervalo_fim = $this->contrato_item_contrato_list->addQuickColumn("Intervalo Final", 'contrato_item_contrato_intervalo_fim', 'left');
        $column_contrato_item_contrato_hora_final = $this->contrato_item_contrato_list->addQuickColumn("Hora Final", 'contrato_item_contrato_hora_final', 'left');
        $column_contrato_item_contrato_profissional_id = $this->contrato_item_contrato_list->addQuickColumn("Profissional", 'contrato_item_contrato_profissional_id', 'left');

        $this->contrato_item_contrato_list->createModel();
        $this->form->addContent([$this->contrato_item_contrato_list]);

        $column_contrato_item_contrato_dia_semana_transformed->setTransformer(function($value, $object, $row, $cell = null, $last_row = null)
        {
            //code here
            //0: Domingo1: Segunda-Feira2: Terça-Feira3: Quarta-Feira4: Quinta-Feira5: Sexta-Feira6: Sábado
            $diasemana = array('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado');
            $diareturn = $diasemana[$value];

            return($diareturn);
        });

        // create the form actions
        $btn_onsave = $this->form->addAction("Salvar", new TAction([$this, 'onSave']), 'far:save #ffffff');
        $this->btn_onsave = $btn_onsave;
        $btn_onsave->addStyleClass('btn-primary'); 

        $btn_onclear = $this->form->addAction("Limpar formulário", new TAction([$this, 'onClear']), 'fas:eraser #dd5a43');
        $this->btn_onclear = $btn_onclear;

        $btn_onshow = $this->form->addAction("Voltar para a listagem", new TAction(['ContratoList', 'onShow']), 'far:arrow-alt-circle-left #000000');
        $this->btn_onshow = $btn_onshow;

        // vertical box container
        $container = new TVBox;
        $container->style = 'width: 100%';
        $container->class = 'form-container';
        if(empty($param['target_container']))
        {
            $container->add(TBreadCrumb::create(["Serviços","Cadastro de contrato"]));
        }
        $container->add($this->form);

        parent::add($container);

    }

    public static function OnIntervaloIni($param = null) 
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

    public static function OnDiaSemana($param = null) 
    {
        try 
        {
            //code here
            $object = new stdClass();
            $object->contrato_item_contrato_hora_inicio = '08:30';
            $object->contrato_item_contrato_intervalo_ini = '11:30';
            $object->contrato_item_contrato_intervalo_fim = '13:00';
            $object->contrato_item_contrato_hora_final = '18:00';
            //code here
            TForm::sendData(self::$formName, $object);
            // -----

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

            $object = new Contrato(); // create an empty object 

            $data = $this->form->getData(); // get form data as array
            $object->fromArray( (array) $data); // load the object with data

            $object->store(); // save the object 

            $repository = ContratoProfissional::where('contrato_id', '=', $object->id);
            $repository->delete(); 

            if ($data->profissionais_id) 
            {
                foreach ($data->profissionais_id as $profissionais_id_value) 
                {
                    $contrato_profissional = new ContratoProfissional;

                    $contrato_profissional->profissional_id = $profissionais_id_value;
                    $contrato_profissional->contrato_id = $object->id;
                    $contrato_profissional->store();
                }
            }

            $contrato_item_contrato_items = $this->storeItems('ContratoItem', 'contrato_id', $object, 'contrato_item_contrato', function($masterObject, $detailObject){ 

                //code here

            }); 

            // get the generated {PRIMARY_KEY}
            $data->id = $object->id; 

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

    public function onEdit( $param )
    {
        try
        {
            if (isset($param['key']))
            {
                $key = $param['key'];  // get the parameter $key
                TTransaction::open(self::$database); // open a transaction

                $object = new Contrato($key); // instantiates the Active Record 

                $object->profissionais_id = ContratoProfissional::where('contrato_id', '=', $object->id)->getIndexedArray('profissional_id', 'profissional_id');

                $contrato_item_contrato_items = $this->loadItems('ContratoItem', 'contrato_id', $object, 'contrato_item_contrato', function($masterObject, $detailObject, $objectItems){ 

                    //code here

                }); 

                $this->form->setData($object); // fill the form 

                    $this->onReload();

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

        TSession::setValue('contrato_item_contrato_items', null);

        $this->onReload();
    }

    public function onAddContratoItemContrato( $param )
    {
        try
        {
            $data = $this->form->getData();

            $contrato_item_contrato_items = TSession::getValue('contrato_item_contrato_items');
            $key = isset($data->contrato_item_contrato_id) && $data->contrato_item_contrato_id ? $data->contrato_item_contrato_id : 'b'.uniqid();
            $fields = []; 

            $fields['contrato_item_contrato_dia_semana'] = $data->contrato_item_contrato_dia_semana;
            $fields['contrato_item_contrato_profissional_id'] = $data->contrato_item_contrato_profissional_id;
            $fields['contrato_item_contrato_hora_inicio'] = $data->contrato_item_contrato_hora_inicio;
            $fields['contrato_item_contrato_intervalo_ini'] = $data->contrato_item_contrato_intervalo_ini;
            $fields['contrato_item_contrato_intervalo_fim'] = $data->contrato_item_contrato_intervalo_fim;
            $fields['contrato_item_contrato_hora_final'] = $data->contrato_item_contrato_hora_final;
            $contrato_item_contrato_items[ $key ] = $fields;

            TSession::setValue('contrato_item_contrato_items', $contrato_item_contrato_items);

            $data->contrato_item_contrato_id = '';
            $data->contrato_item_contrato_dia_semana = '';
            $data->contrato_item_contrato_profissional_id = '';
            $data->contrato_item_contrato_hora_inicio = '';
            $data->contrato_item_contrato_intervalo_ini = '';
            $data->contrato_item_contrato_intervalo_fim = '';
            $data->contrato_item_contrato_hora_final = '';

            $this->form->setData($data);

            $this->onReload( $param );
        }
        catch (Exception $e)
        {
            $this->form->setData( $this->form->getData());

            new TMessage('error', $e->getMessage());
        }
    }

    public function onEditContratoItemContrato( $param )
    {
        $data = $this->form->getData();

        // read session items
        $items = TSession::getValue('contrato_item_contrato_items');

        // get the session item
        $item = $items[$param['contrato_item_contrato_id_row_id']];

        $data->contrato_item_contrato_dia_semana = $item['contrato_item_contrato_dia_semana'];
        $data->contrato_item_contrato_profissional_id = $item['contrato_item_contrato_profissional_id'];
        $data->contrato_item_contrato_hora_inicio = $item['contrato_item_contrato_hora_inicio'];
        $data->contrato_item_contrato_intervalo_ini = $item['contrato_item_contrato_intervalo_ini'];
        $data->contrato_item_contrato_intervalo_fim = $item['contrato_item_contrato_intervalo_fim'];
        $data->contrato_item_contrato_hora_final = $item['contrato_item_contrato_hora_final'];

        $data->contrato_item_contrato_id = $param['contrato_item_contrato_id_row_id'];

        // fill product fields
        $this->form->setData( $data );

        $this->onReload( $param );

    }

    public function onDeleteContratoItemContrato( $param )
    {
        $data = $this->form->getData();

        $data->contrato_item_contrato_dia_semana = '';
        $data->contrato_item_contrato_profissional_id = '';
        $data->contrato_item_contrato_hora_inicio = '';
        $data->contrato_item_contrato_intervalo_ini = '';
        $data->contrato_item_contrato_intervalo_fim = '';
        $data->contrato_item_contrato_hora_final = '';

        // clear form data
        $this->form->setData( $data );

        // read session items
        $items = TSession::getValue('contrato_item_contrato_items');

        // delete the item from session
        unset($items[$param['contrato_item_contrato_id_row_id']]);
        TSession::setValue('contrato_item_contrato_items', $items);

        // reload sale items
        $this->onReload( $param );

    }

    public function onReloadContratoItemContrato( $param )
    {
        $items = TSession::getValue('contrato_item_contrato_items'); 

        $this->contrato_item_contrato_list->clear(); 

        if($items) 
        { 
            $cont = 1; 
            foreach ($items as $key => $item) 
            {
                $rowItem = new StdClass;

                $action_del = new TAction(array($this, 'onDeleteContratoItemContrato')); 
                $action_del->setParameter('contrato_item_contrato_id_row_id', $key);
                $action_del->setParameter('row_data', base64_encode(serialize($item)));
                $action_del->setParameter('key', $key);

                $action_edi = new TAction(array($this, 'onEditContratoItemContrato'));  
                $action_edi->setParameter('contrato_item_contrato_id_row_id', $key);  
                $action_edi->setParameter('row_data', base64_encode(serialize($item)));
                $action_edi->setParameter('key', $key);

                $button_del = new TButton('delete_contrato_item_contrato'.$cont);
                $button_del->setAction($action_del, '');
                $button_del->setFormName($this->form->getName());
                $button_del->class = 'btn btn-link btn-sm';
                $button_del->title = "Excluir";
                $button_del->setImage('far:trash-alt #dd5a43');

                $rowItem->delete = $button_del;

                $button_edi = new TButton('edit_contrato_item_contrato'.$cont);
                $button_edi->setAction($action_edi, '');
                $button_edi->setFormName($this->form->getName());
                $button_edi->class = 'btn btn-link btn-sm';
                $button_edi->title = "Editar";
                $button_edi->setImage('far:edit #478fca');

                $rowItem->edit = $button_edi;

                $rowItem->contrato_item_contrato_dia_semana = isset($item['contrato_item_contrato_dia_semana']) ? $item['contrato_item_contrato_dia_semana'] : '';
                $rowItem->contrato_item_contrato_profissional_id = '';
                if(isset($item['contrato_item_contrato_profissional_id']) && $item['contrato_item_contrato_profissional_id'])
                {
                    TTransaction::open('consultor');
                    $profissional = Profissional::find($item['contrato_item_contrato_profissional_id']);
                    if($profissional)
                    {
                        $rowItem->contrato_item_contrato_profissional_id = $profissional->render('{nome}');
                    }
                    TTransaction::close();
                }

                $rowItem->contrato_item_contrato_hora_inicio = isset($item['contrato_item_contrato_hora_inicio']) ? $item['contrato_item_contrato_hora_inicio'] : '';
                $rowItem->contrato_item_contrato_intervalo_ini = isset($item['contrato_item_contrato_intervalo_ini']) ? $item['contrato_item_contrato_intervalo_ini'] : '';
                $rowItem->contrato_item_contrato_intervalo_fim = isset($item['contrato_item_contrato_intervalo_fim']) ? $item['contrato_item_contrato_intervalo_fim'] : '';
                $rowItem->contrato_item_contrato_hora_final = isset($item['contrato_item_contrato_hora_final']) ? $item['contrato_item_contrato_hora_final'] : '';

                $row = $this->contrato_item_contrato_list->addItem($rowItem);

                $cont++;
            } 
        } 
    } 

    public function onShow($param = null)
    {

        TSession::setValue('contrato_item_contrato_items', null);

        $this->onReload();

    } 

    public function onReload($params = null)
    {
        $this->loaded = TRUE;

        $this->onReloadContratoItemContrato($params);
    }

    public function show() 
    { 
        if (!$this->loaded AND (!isset($_GET['method']) OR $_GET['method'] !== 'onReload') ) 
        { 
            $this->onReload( func_get_arg(0) );
        }
        parent::show();
    }

    public static function getFormName()
    {
        return self::$formName;
    }

}

