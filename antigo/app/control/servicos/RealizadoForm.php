<?php

class RealizadoForm extends TPage
{
    protected BootstrapFormBuilder $form;
    private $formFields = [];
    private static $database = 'consultor';
    private static $activeRecord = 'Realizado';
    private static $primaryKey = 'id';
    private static $formName = 'form_Realizado';

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
        $this->form->setFormTitle("Cadastro de horas realizadas");

        $criteria_contrato_id = new TCriteria();

        $filterVar = TSession::getValue("userid");
        $criteria_contrato_id->add(new TFilter('id', 'in', "(SELECT contrato_id FROM contrato_profissional WHERE profissional_id in  (SELECT id FROM profissional WHERE id = '{$filterVar}') )")); 

        $id = new TEntry('id');
        $contrato_id = new TDBCombo('contrato_id', 'consultor', 'Contrato', 'id', '{descricao} ({empresa->nome} )','id asc' , $criteria_contrato_id );
        $inicio = new TDateTime('inicio');
        $inter_inicial = new TDateTime('inter_inicial');
        $inter_final = new TDateTime('inter_final');
        $fim = new TDateTime('fim');
        $descricao = new TText('descricao');
        $observacao = new TText('observacao');

        $contrato_id->addValidation("Contrato", new TRequiredValidator()); 
        $inicio->addValidation("Início", new TRequiredValidator()); 
        $fim->addValidation("Fim", new TRequiredValidator()); 
        $descricao->addValidation("Descrição", new TRequiredValidator()); 

        $id->setEditable(false);
        $fim->setMask('dd/mm/yyyy hh:ii');
        $inicio->setMask('dd/mm/yyyy hh:ii');
        $inter_final->setMask('dd/mm/yyyy hh:ii');
        $inter_inicial->setMask('dd/mm/yyyy hh:ii');

        $fim->setDatabaseMask('yyyy-mm-dd hh:ii');
        $inicio->setDatabaseMask('yyyy-mm-dd hh:ii');
        $inter_final->setDatabaseMask('yyyy-mm-dd hh:ii');
        $inter_inicial->setDatabaseMask('yyyy-mm-dd hh:ii');

        $id->setSize(150);
        $fim->setSize(150);
        $inicio->setSize(150);
        $inter_final->setSize(150);
        $inter_inicial->setSize(150);
        $contrato_id->setSize('100%');
        $descricao->setSize('100%', 100);
        $observacao->setSize('100%', 100);

        $row1 = $this->form->addFields([new TLabel("Id:", null, '14px', null)],[$id],[new TLabel("Contrato:", '#ff0000', '14px', null)],[$contrato_id]);
        $row2 = $this->form->addFields([new TLabel("Data/hora inicial:", '#ff0000', '14px', null, '100%'),$inicio],[new TLabel("Intervalo Inicial:", '#ff0000', '14px', null, '100%'),$inter_inicial],[new TLabel("Intervalo Final:", '#ff0000', '14px', null, '100%'),$inter_final],[new TLabel("Data/hora final:", '#ff0000', '14px', null, '100%'),$fim]);
        $row2->layout = ['col-sm-3','col-sm-3',' col-sm-3',' col-sm-3'];

        $row3 = $this->form->addFields([new TLabel("Descrição:", '#ff0000', '14px', null)],[$descricao],[new TLabel("Observações:", null, '14px', null)],[$observacao]);

        // create the form actions
        $btn_onsave = $this->form->addAction("Salvar", new TAction([$this, 'onSave']), 'far:save #ffffff');
        $this->btn_onsave = $btn_onsave;
        $btn_onsave->addStyleClass('btn-primary'); 

        $btn_onclear = $this->form->addAction("Novo", new TAction([$this, 'onClear']), 'fas:plus #69aa46');
        $this->btn_onclear = $btn_onclear;

        $btn_onshow = $this->form->addAction("Voltar para a listagem", new TAction(['RealizadoList', 'onShow']), 'far:arrow-alt-circle-left #000000');
        $this->btn_onshow = $btn_onshow;

        // vertical box container
        $container = new TVBox;
        $container->style = 'width: 100%';
        $container->class = 'form-container';
        if(empty($param['target_container']))
        {
            $container->add(TBreadCrumb::create(["Serviços","Cadastro de trabalho realizado"]));
        }
        $container->add($this->form);

        parent::add($container);

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

            $fim = new DateTime($object->fim);
            $ini = new DateTime($object->inicio);

            $object->horas = round( ((abs($fim->getTimestamp() - $ini->getTimestamp())/60)/60), 2);

            $criteria = new TCriteria;
            $criteria->add( new TFilter( 'system_user_id', '=', TSession::getValue('userid') ) );
            $object->profissional_id = Profissional::getObjects( $criteria)[0]->id;

            $object->store(); // save the object

            $messageAction = new TAction(['RealizadoList', 'onShow']);   

            if(!empty($param['target_container']))
            {
                $messageAction->setParameter('target_container', $param['target_container']);
            }

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

    } 

    public static function getFormName()
    {
        return self::$formName;
    }

}

