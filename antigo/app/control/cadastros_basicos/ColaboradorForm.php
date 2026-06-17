<?php

class ColaboradorForm extends TWindow
{
    protected BootstrapFormBuilder $form;
    private $formFields = [];
    private static $database = 'consultor';
    private static $activeRecord = 'Colaborador';
    private static $primaryKey = 'id';
    private static $formName = 'form_ColaboradorForm';

    /**
     * Form constructor
     * @param $param Request
     */
    public function __construct( $param )
    {
        parent::__construct();
        parent::setSize(0.8, null);
        parent::setTitle("Cadastro de Colaborador");
        parent::setProperty('class', 'window_modal');

        if(!empty($param['target_container']))
        {
            $this->adianti_target_container = $param['target_container'];
        }

        // creates the form
        $this->form = new BootstrapFormBuilder(self::$formName);
        // define the form title
        $this->form->setFormTitle("Cadastro de Colaborador");

        $criteria_funcao_id = new TCriteria();

        $nome = new TEntry('nome');
        $id = new THidden('id');
        $email = new TEntry('email');
        $telefone = new TEntry('telefone');
        $whatsapp = new TEntry('whatsapp');
        $funcao_id = new TDBCombo('funcao_id', 'consultor', 'Funcao', 'id', '{descricao}','descricao asc' , $criteria_funcao_id );

        $nome->addValidation("Nome", new TRequiredValidator()); 
        $funcao_id->addValidation("Funcao id", new TRequiredValidator()); 

        $funcao_id->enableSearch();
        $telefone->setMaxLength(9);
        $whatsapp->setMaxLength(1);

        $id->setSize(200);
        $nome->setSize('100%');
        $email->setSize('100%');
        $telefone->setSize('100%');
        $whatsapp->setSize('100%');
        $funcao_id->setSize('100%');

        $row1 = $this->form->addFields([new TLabel("Nome:", '#ff0000', '14px', null, '100%'),$nome,$id]);
        $row1->layout = [' col-sm-12'];

        $row2 = $this->form->addFields([new TLabel("E-mail:", '#000000', '14px', null, '100%'),$email]);
        $row2->layout = [' col-sm-12'];

        $row3 = $this->form->addFields([new TLabel("Telefone:", null, '14px', null, '100%'),$telefone],[new TLabel("Whatsapp:", null, '14px', null, '100%'),$whatsapp],[new TLabel("Função:", '#ff0000', '14px', null, '100%'),$funcao_id]);
        $row3->layout = [' col-sm-4',' col-sm-4',' col-sm-4'];

        // create the form actions
        $btn_onsave = $this->form->addAction("Salvar", new TAction([$this, 'onSave']), 'fas:save #ffffff');
        $this->btn_onsave = $btn_onsave;
        $btn_onsave->addStyleClass('btn-primary'); 

        $btn_onclear = $this->form->addAction("Limpar formulário", new TAction([$this, 'onClear']), 'fas:eraser #dd5a43');
        $this->btn_onclear = $btn_onclear;

        $btn_onshow = $this->form->addAction("Voltar", new TAction(['ColaboradorList', 'onShow']), 'fas:arrow-left #000000');
        $this->btn_onshow = $btn_onshow;

        parent::add($this->form);

    }

    public function onSave($param = null) 
    {
        try
        {
            TTransaction::open(self::$database); // open a transaction

            $messageAction = null;

            $this->form->validate(); // validate form data

            $object = new Colaborador(); // create an empty object 

            $data = $this->form->getData(); // get form data as array
            $object->fromArray( (array) $data); // load the object with data

            $object->store(); // save the object 

            $loadPageParam = [];

            if(!empty($param['target_container']))
            {
                $loadPageParam['target_container'] = $param['target_container'];
            }

            // get the generated {PRIMARY_KEY}
            $data->id = $object->id; 

            $this->form->setData($data); // fill form data
            TTransaction::close(); // close the transaction

            if(BComboNoResultsService::getProperties($param))
            {
                BComboNoResultsService::handleRefreshComponent($param, $object);
            }
            else
            {
                TApplication::loadPage('ColaboradorList', 'onShow', $loadPageParam);
            }

            TToast::show('success', "Registro salvo", 'topRight', 'far:check-circle');

                TWindow::closeWindow(parent::getId()); 
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

                $object = new Colaborador($key); // instantiates the Active Record 

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

    public static function onQuickSave($param = null)
    {
        try
        {
            TTransaction::open(self::$database); // open a transaction

            $object = new Colaborador(); // create an empty object
            $object->nome = BComboNoResultsService::getQuickFieldValue($param);

            $object->store();

            BComboNoResultsService::handleRefreshComponent($param, $object);

            TTransaction::close();

            TToast::show('success', _t('Record saved'), 'topRight', 'far:check-circle');
        }
        catch (Exception $e)
        {
            new TMessage('error', $e->getMessage());
            TTransaction::rollback();
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

    public static function getFormName()
    {
        return self::$formName;
    }

}

