<?php

class EmpresaForm extends TPage
{
    protected BootstrapFormBuilder $form;
    private $formFields = [];
    private static $database = 'consultor';
    private static $activeRecord = 'Empresa';
    private static $primaryKey = 'id';
    private static $formName = 'form_Empresa';

    use BuilderMasterDetailTrait;

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
        $this->form->setFormTitle("Cadastro de empresa");

        $criteria_cidade_estado_id = new TCriteria();
        $criteria_empresa_colaborador_empresa_colaborador_id = new TCriteria();

        $id = new THidden('id');
        $nome = new TEntry('nome');
        $razao = new TEntry('razao');
        $cor = new TColor('cor');
        $endereco = new TEntry('endereco');
        $cidade_estado_id = new TDBCombo('cidade_estado_id', 'consultor', 'Estado', 'id', '{nome}','nome asc' , $criteria_cidade_estado_id );
        $cidade_id = new TCombo('cidade_id');
        $empresa_colaborador_empresa_colaborador_id = new TDBCombo('empresa_colaborador_empresa_colaborador_id', 'consultor', 'Colaborador', 'id', '{nome}','nome asc' , $criteria_empresa_colaborador_empresa_colaborador_id );
        $empresa_colaborador_empresa_id = new THidden('empresa_colaborador_empresa_id');
        $button_adicionar_empresa_colaborador_empresa = new TButton('button_adicionar_empresa_colaborador_empresa');

        $cidade_estado_id->setChangeAction(new TAction([$this,'onChangecidade_estado_id']));

        $nome->addValidation("Nome", new TRequiredValidator()); 
        $cor->addValidation("Cor na Agenda", new TRequiredValidator()); 
        $cidade_id->addValidation("Cidade", new TRequiredValidator()); 

        $empresa_colaborador_empresa_colaborador_id->enableSearch();
        $empresa_colaborador_empresa_colaborador_id->configureNoResultsCreateButton(new TAction(['ColaboradorForm', 'onShow']), "Adicionar", "fas:plus ", "btn-success");
        $empresa_colaborador_empresa_colaborador_id->setNoResultsMessage("Nenhum registro encontrado");
        $button_adicionar_empresa_colaborador_empresa->setAction(new TAction([$this, 'onAddDetailEmpresaColaboradorEmpresa'],['static' => 1]), "Adicionar");
        $button_adicionar_empresa_colaborador_empresa->addStyleClass('btn-default');
        $button_adicionar_empresa_colaborador_empresa->setImage('fas:plus #2ecc71');
        $id->setSize(200);
        $cor->setSize(100);
        $nome->setSize('100%');
        $razao->setSize('100%');
        $endereco->setSize('100%');
        $cidade_id->setSize('100%');
        $cidade_estado_id->setSize('100%');
        $empresa_colaborador_empresa_id->setSize(200);
        $empresa_colaborador_empresa_colaborador_id->setSize('100%');

        $button_adicionar_empresa_colaborador_empresa->id = '688c045575170';

        $row1 = $this->form->addFields([new TLabel("Nome:", '#ff0000', '14px', null, '100%'),$id,$nome],[new TLabel("Razão:", '#ff0000', '14px', null, '100%'),$razao],[new TLabel("Cor:", '#f20c0c', '14px', null, '100%'),$cor]);
        $row1->layout = [' col-sm-4',' col-sm-5',' col-sm-3'];

        $row2 = $this->form->addFields([new TLabel("Endereço:", null, '14px', null, '100%'),$endereco],[new TLabel("Estado:", '#ff0000', '14px', null, '100%'),$cidade_estado_id],[new TLabel("Cidade:", '#ff0000', '14px', null, '100%'),$cidade_id]);
        $row2->layout = [' col-sm-7','col-sm-2','col-sm-3'];

        $this->detailFormEmpresaColaboradorEmpresa = new BootstrapFormBuilder('detailFormEmpresaColaboradorEmpresa');
        $this->detailFormEmpresaColaboradorEmpresa->setProperty('style', 'border:none; box-shadow:none; width:100%;');

        $this->detailFormEmpresaColaboradorEmpresa->setProperty('class', 'form-horizontal builder-detail-form');

        $row3 = $this->detailFormEmpresaColaboradorEmpresa->addFields([new TLabel("Colaborador:", '#ff0000', '14px', null, '100%'),$empresa_colaborador_empresa_colaborador_id,$empresa_colaborador_empresa_id]);
        $row3->layout = [' col-sm-12'];

        $row4 = $this->detailFormEmpresaColaboradorEmpresa->addFields([$button_adicionar_empresa_colaborador_empresa]);
        $row4->layout = [' col-sm-12'];

        $row5 = $this->detailFormEmpresaColaboradorEmpresa->addFields([new THidden('empresa_colaborador_empresa__row__id')]);
        $this->empresa_colaborador_empresa_criteria = new TCriteria();

        $this->empresa_colaborador_empresa_list = new BootstrapDatagridWrapper(new TDataGrid);
        $this->empresa_colaborador_empresa_list->generateHiddenFields();
        $this->empresa_colaborador_empresa_list->setId('empresa_colaborador_empresa_list');

        $this->empresa_colaborador_empresa_list->style = 'width:100%';
        $this->empresa_colaborador_empresa_list->class .= ' table-bordered';

        $column_empresa_colaborador_empresa_colaborador_nome = new TDataGridColumn('colaborador->nome', "Colaborador", 'left');
        $column_empresa_colaborador_empresa_colaborador_funcao_descricao = new TDataGridColumn('colaborador->funcao->descricao', "Função", 'left');
        $column_empresa_colaborador_empresa_colaborador_telefone = new TDataGridColumn('colaborador->telefone', "Telefone", 'left');

        $column_empresa_colaborador_empresa__row__data = new TDataGridColumn('__row__data', '', 'center');
        $column_empresa_colaborador_empresa__row__data->setVisibility(false);

        $action_onEditDetailEmpresaColaborador = new TDataGridAction(array('EmpresaForm', 'onEditDetailEmpresaColaborador'));
        $action_onEditDetailEmpresaColaborador->setUseButton(false);
        $action_onEditDetailEmpresaColaborador->setButtonClass('btn btn-default btn-sm');
        $action_onEditDetailEmpresaColaborador->setLabel("Editar");
        $action_onEditDetailEmpresaColaborador->setImage('far:edit #478fca');
        $action_onEditDetailEmpresaColaborador->setFields(['__row__id', '__row__data']);

        $this->empresa_colaborador_empresa_list->addAction($action_onEditDetailEmpresaColaborador);
        $action_onDeleteDetailEmpresaColaborador = new TDataGridAction(array('EmpresaForm', 'onDeleteDetailEmpresaColaborador'));
        $action_onDeleteDetailEmpresaColaborador->setUseButton(false);
        $action_onDeleteDetailEmpresaColaborador->setButtonClass('btn btn-default btn-sm');
        $action_onDeleteDetailEmpresaColaborador->setLabel("Excluir");
        $action_onDeleteDetailEmpresaColaborador->setImage('fas:trash-alt #dd5a43');
        $action_onDeleteDetailEmpresaColaborador->setFields(['__row__id', '__row__data']);

        $this->empresa_colaborador_empresa_list->addAction($action_onDeleteDetailEmpresaColaborador);

        $this->empresa_colaborador_empresa_list->addColumn($column_empresa_colaborador_empresa_colaborador_nome);
        $this->empresa_colaborador_empresa_list->addColumn($column_empresa_colaborador_empresa_colaborador_funcao_descricao);
        $this->empresa_colaborador_empresa_list->addColumn($column_empresa_colaborador_empresa_colaborador_telefone);

        $this->empresa_colaborador_empresa_list->addColumn($column_empresa_colaborador_empresa__row__data);

        $this->empresa_colaborador_empresa_list->createModel();
        $tableResponsiveDiv = new TElement('div');
        $tableResponsiveDiv->class = 'table-responsive';
        $tableResponsiveDiv->add($this->empresa_colaborador_empresa_list);
        $this->detailFormEmpresaColaboradorEmpresa->addContent([$tableResponsiveDiv]);
        $row6 = $this->form->addFields([$this->detailFormEmpresaColaboradorEmpresa]);
        $row6->layout = [' col-sm-12'];

        // create the form actions
        $btn_onsave = $this->form->addAction("Salvar", new TAction([$this, 'onSave'],['static' => 1]), 'far:save #ffffff');
        $this->btn_onsave = $btn_onsave;
        $btn_onsave->addStyleClass('btn-primary'); 

        $btn_onclear = $this->form->addAction("Novo", new TAction([$this, 'onClear']), 'fas:plus #69aa46');
        $this->btn_onclear = $btn_onclear;

        // vertical box container
        $container = new TVBox;
        $container->style = 'width: 100%';
        $container->class = 'form-container';
        if(empty($param['target_container']))
        {
            $container->add(TBreadCrumb::create(["Cadastros básicos","Cadastro de empresa"]));
        }
        $container->add($this->form);

        parent::add($container);

    }

    public static function onChangecidade_estado_id($param)
    {
        try
        {

            if (isset($param['cidade_estado_id']) && $param['cidade_estado_id'])
            { 
                $criteria = TCriteria::create(['estado_id' => $param['cidade_estado_id']]);
                TDBCombo::reloadFromModel(self::$formName, 'cidade_id', 'consultor', 'Cidade', 'id', '{nome}', 'nome asc', $criteria, TRUE); 
            } 
            else 
            { 
                TCombo::clearField(self::$formName, 'cidade_id'); 
            }  

        }
        catch (Exception $e)
        {
            new TMessage('error', $e->getMessage());
        }
    } 

    public  function onAddDetailEmpresaColaboradorEmpresa($param = null) 
    {
        try
        {
            $data = $this->form->getData();

                $errors = [];
                $requiredFields = [];
                $requiredFields[] = ['label'=>"Colaborador", 'name'=>"empresa_colaborador_empresa_colaborador_id", 'class'=>'TRequiredValidator', 'value'=>[]];
                foreach($requiredFields as $requiredField)
                {
                    try
                    {
                        (new $requiredField['class'])->validate($requiredField['label'], $data->{$requiredField['name']}, $requiredField['value']);
                    }
                    catch(Exception $e)
                    {
                        $errors[] = $e->getMessage() . '.';
                    }
                 }
                 if(count($errors) > 0)
                 {
                     throw new Exception(implode('<br>', $errors));
                 }

                $__row__id = !empty($data->empresa_colaborador_empresa__row__id) ? $data->empresa_colaborador_empresa__row__id : 'b'.uniqid();

                TTransaction::open(self::$database);

                $grid_data = new EmpresaColaborador();
                $grid_data->__row__id = $__row__id;
                $grid_data->colaborador_id = $data->empresa_colaborador_empresa_colaborador_id;
                $grid_data->id = $data->empresa_colaborador_empresa_id;

                $__row__data = array_merge($grid_data->toArray(), (array)$grid_data->getVirtualData());
                $__row__data['__row__id'] = $__row__id;
                $__row__data['__display__']['colaborador_id'] =  $param['empresa_colaborador_empresa_colaborador_id'] ?? null;
                $__row__data['__display__']['id'] =  $param['empresa_colaborador_empresa_id'] ?? null;

                $grid_data->__row__data = base64_encode(serialize((object)$__row__data));
                $row = $this->empresa_colaborador_empresa_list->addItem($grid_data);
                $row->id = $grid_data->__row__id;

                TDataGrid::replaceRowById('empresa_colaborador_empresa_list', $grid_data->__row__id, $row);

                TTransaction::close();

                $data = new stdClass;
                $data->empresa_colaborador_empresa_colaborador_id = '';
                $data->empresa_colaborador_empresa_id = '';
                $data->empresa_colaborador_empresa__row__id = '';

                TForm::sendData(self::$formName, $data);
                TScript::create("
                   var element = $('#688c045575170');
                   if(typeof element.attr('add') != 'undefined')
                   {
                       element.html(base64_decode(element.attr('add')));
                   }
                ");

        }
        catch (Exception $e) // in case of exception
        {
            new TMessage('error', $e->getMessage()); // shows the exception error message
        }
    }

    public static function onEditDetailEmpresaColaborador($param = null) 
    {
        try
        {

                $__row__data = unserialize(base64_decode($param['__row__data']));
                $__row__data->__display__ = is_array($__row__data->__display__) ? (object) $__row__data->__display__ : $__row__data->__display__;
                $fireEvents = true;
                $aggregate = false;

                $data = new stdClass;
                $data->empresa_colaborador_empresa_colaborador_id = $__row__data->__display__->colaborador_id ?? null;
                $data->empresa_colaborador_empresa_id = $__row__data->__display__->id ?? null;
                $data->empresa_colaborador_empresa__row__id = $__row__data->__row__id;

                TForm::sendData(self::$formName, $data, $aggregate, $fireEvents);
                TScript::create("
                   var element = $('#688c045575170');
                   if(!element.attr('add')){
                       element.attr('add', base64_encode(element.html()));
                   }
                   element.html(\"<span><i class='far fa-edit' style='color:#478fca;padding-right:4px;'></i>Editar</span>\");
                   if(!element.attr('edit')){
                       element.attr('edit', base64_encode(element.html()));
                   }
                ");

        }
        catch (Exception $e) // in case of exception
        {
            new TMessage('error', $e->getMessage()); // shows the exception error message
        }
    }

    public static function onDeleteDetailEmpresaColaborador($param = null) 
    {
        try
        {

                $__row__data = unserialize(base64_decode($param['__row__data']));

                $data = new stdClass;
                $data->empresa_colaborador_empresa_colaborador_id = '';
                $data->empresa_colaborador_empresa_id = '';
                $data->empresa_colaborador_empresa__row__id = '';

                TForm::sendData(self::$formName, $data);

                TDataGrid::removeRowById('empresa_colaborador_empresa_list', $__row__data->__row__id);
                TScript::create("
                   var element = $('#688c045575170');
                   if(typeof element.attr('add') != 'undefined')
                   {
                       element.html(base64_decode(element.attr('add')));
                   }
                ");

        }
        catch (Exception $e) // in case of exception
        {
            new TMessage('error', $e->getMessage()); // shows the exception error message
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

            $object->store(); // save the object

            $this->fireEvents($object);

            $messageAction = new TAction(['EmpresaList', 'onShow']);   

            if(!empty($param['target_container']))
            {
                $messageAction->setParameter('target_container', $param['target_container']);
            }

            TForm::sendData(self::$formName, (object)['id' => $object->id]);

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

    public function onEdit( $param )
    {
        try
        {
            if (isset($param['key']))
            {
                $key = $param['key'];  // get the parameter $key
                TTransaction::open(self::$database); // open a transaction
                $class = self::$activeRecord;
                $object = new $class($key); // instantiates the Active Record
                                $object->cidade_estado_id = $object->cidade->estado_id;

                $this->form->setData($object); // fill the form

                $this->fireEvents($object);

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

    } 

    public function fireEvents( $object )
    {
        $obj = new stdClass;
        if(is_object($object) && get_class($object) == 'stdClass')
        {
            if(isset($object->cidade_estado_id))
            {
                $value = $object->cidade_estado_id;

                $obj->cidade_estado_id = $value;
            }
            if(isset($object->cidade_id))
            {
                $value = $object->cidade_id;

                $obj->cidade_id = $value;
            }
        }
        elseif(is_object($object))
        {
            if(isset($object->cidade->estado_id))
            {
                $value = $object->cidade->estado_id;

                $obj->cidade_estado_id = $value;
            }
            if(isset($object->cidade_id))
            {
                $value = $object->cidade_id;

                $obj->cidade_id = $value;
            }
        }
        TForm::sendData(self::$formName, $obj);
    }  

    public static function getFormName()
    {
        return self::$formName;
    }

}

