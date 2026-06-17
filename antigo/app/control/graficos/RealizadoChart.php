<?php

class RealizadoChart extends TPage
{
    private $form; // form
    private $loaded;
    private static $database = 'consultor';
    private static $activeRecord = 'Realizado';
    private static $primaryKey = 'id';
    private static $formName = 'formChart_Realizado';

    /**
     * Class constructor
     * Creates the page, the form and the listing
     */
    public function __construct($param = null)
    {
        parent::__construct();

        if(!empty($param['target_container']))
        {
            $this->adianti_target_container = $param['target_container'];
        }

        // creates the form
        $this->form = new BootstrapFormBuilder(self::$formName);

        // define the form title
        $this->form->setFormTitle("Gráfico de horas totais por profissional");

        $criteria_empresa_id = new TCriteria();

        $inicio = new TDate('inicio');
        $fim = new TDate('fim');
        $empresa_id = new TDBCombo('empresa_id', 'consultor', 'Empresa', 'id', '{nome}','nome asc' , $criteria_empresa_id );
        $contrato_id = new TCombo('contrato_id');
        $profissional_id = new TCombo('profissional_id');

        $empresa_id->setChangeAction(new TAction([$this,'onChangeempresa_id']));
        $contrato_id->setChangeAction(new TAction([$this,'onChangeContrato']));

        $fim->setMask('dd/mm/yyyy');
        $inicio->setMask('dd/mm/yyyy');

        $fim->setDatabaseMask('yyyy-mm-dd');
        $inicio->setDatabaseMask('yyyy-mm-dd');

        $fim->setSize(150);
        $inicio->setSize(150);
        $empresa_id->setSize('100%');
        $contrato_id->setSize('100%');
        $profissional_id->setSize('100%');

        $row1 = $this->form->addFields([new TLabel("Data inicial:", null, '14px', null)],[$inicio],[new TLabel("Data final:", null, '14px', null)],[$fim]);
        $row2 = $this->form->addFields([new TLabel("Empresa:", null, '14px', null)],[$empresa_id],[new TLabel("Contrato:", null, '14px', null)],[$contrato_id]);
        $row3 = $this->form->addFields([new TLabel("Profissional:", null, '14px', null)],[$profissional_id],[],[]);

        // keep the form filled during navigation with session data
        $this->form->setData( TSession::getValue(__CLASS__.'_filter_data') );
        $this->fireEvents( TSession::getValue(__CLASS__.'_filter_data') );

        $btn_ongenerate = $this->form->addAction("Gerar", new TAction([$this, 'onGenerate']), 'fas:search #ffffff');
        $this->btn_ongenerate = $btn_ongenerate;
        $btn_ongenerate->addStyleClass('btn-primary'); 

        // vertical box container
        $container = new TVBox;
        $container->style = 'width: 100%';
        if(empty($param['target_container']))
        {
            $container->add(TBreadCrumb::create(["Gráficos","Horas prestadas por profissional"]));
        }
        $container->add($this->form);

        parent::add($container);

    }

    public static function onChangeempresa_id($param)
    {
        try
        {

            if (isset($param['empresa_id']) && $param['empresa_id'])
            { 
                $criteria = TCriteria::create(['empresa_id' => $param['empresa_id']]);
                TDBCombo::reloadFromModel(self::$formName, 'contrato_id', 'consultor', 'Contrato', 'id', '{descricao}', 'id asc', $criteria, TRUE); 
            } 
            else 
            { 
                TCombo::clearField(self::$formName, 'contrato_id'); 
            }  

        }
        catch (Exception $e)
        {
            new TMessage('error', $e->getMessage());
        }
    } 

    public static function onChangeContrato($param = null) 
    {
        try 
        {
            if (!empty($param['contrato_id']))
            { 
                TTransaction::open('consultor');
                $criteria = new TCriteria();
                $criteria->add(new TFilter('contrato_id', '=', $param['contrato_id']));

                TCombo::reload(self::$formName, 'profissional_id', [''=>''] + ContratoProfissional::getIndexedArray('id', '{profissional->nome}', $criteria));
                TTransaction::close();
            } 
            else 
            { 
                TCombo::clearField(self::$formName, 'profissional_id'); 
            } 

        }
        catch (Exception $e) 
        {
            new TMessage('error', $e->getMessage());    
        }
    }

    /**
     * Register the filter in the session
     */
    public function onSearch()
    {
        // get the search form data
        $data = $this->form->getData();
        $filters = [];

        TSession::setValue(__CLASS__.'_filter_data', NULL);
        TSession::setValue(__CLASS__.'_filters', NULL);

        if (isset($data->inicio) AND ( (is_scalar($data->inicio) AND $data->inicio !== '') OR (is_array($data->inicio) AND (!empty($data->inicio)) )) )
        {

            $filters[] = new TFilter('inicio', '>=', $data->inicio);// create the filter 
        }
        if (isset($data->fim) AND ( (is_scalar($data->fim) AND $data->fim !== '') OR (is_array($data->fim) AND (!empty($data->fim)) )) )
        {

            $filters[] = new TFilter('fim', '<=', $data->fim);// create the filter 
        }
        if (isset($data->empresa_id) AND ( (is_scalar($data->empresa_id) AND $data->empresa_id !== '') OR (is_array($data->empresa_id) AND (!empty($data->empresa_id)) )) )
        {

            $filters[] = new TFilter('contrato_id', 'in', "(SELECT id FROM contrato WHERE empresa_id = '{$data->empresa_id}')");// create the filter 
        }
        if (isset($data->contrato_id) AND ( (is_scalar($data->contrato_id) AND $data->contrato_id !== '') OR (is_array($data->contrato_id) AND (!empty($data->contrato_id)) )) )
        {

            $filters[] = new TFilter('contrato_id', '=', $data->contrato_id);// create the filter 
        }
        if (isset($data->profissional_id) AND ( (is_scalar($data->profissional_id) AND $data->profissional_id !== '') OR (is_array($data->profissional_id) AND (!empty($data->profissional_id)) )) )
        {

            $filters[] = new TFilter('profissional_id', '=', $data->profissional_id);// create the filter 
        }

        // fill the form with data again
        $this->form->setData($data);
        $this->fireEvents($data);

        // keep the search data in the session
        TSession::setValue(__CLASS__.'_filter_data', $data);
        TSession::setValue(__CLASS__.'_filters', $filters);
    }

    /**
     * Load the datagrid with data
     */
    public function onGenerate()
    {
        try
        {
            $this->onSearch();
            // open a transaction with database 'consultor'
            TTransaction::open(self::$database);
            $param = [];
            // creates a repository for Realizado
            $repository = new TRepository(self::$activeRecord);
            // creates a criteria
            $criteria = new TCriteria;

            if ($filters = TSession::getValue(__CLASS__.'_filters'))
            {
                foreach ($filters as $filter) 
                {
                    $criteria->add($filter);       
                }
            }

            // load the objects according to criteria
            $objects = $repository->load($criteria, FALSE);

            if ($objects)
            {

                $dataTotals = [];
                $groups = [];
                foreach ($objects as $obj)
                {
                    $group1 = $obj->profissional->nome;

                    $groups[$group1] = true;
                    $numericField = $obj->horas;

                    $dataTotals[$group1]['count'] = isset($dataTotals[$group1]['count']) ? $dataTotals[$group1]['count'] + 1 : 1;
                    $dataTotals[$group1]['sum'] = isset($dataTotals[$group1]['sum']) ? $dataTotals[$group1]['sum'] + $numericField  : $numericField;

                }

                $groups = ['x'=>true]+$groups;
                $data = [array_keys($groups)];
                $lineData = [_t('Value')];

                foreach ($dataTotals as $group1 => $totals) 
                {    
                    $lineData[] = $totals['sum'];

                }
                $data[] = $lineData;

                $chart = new THtmlRenderer('app/resources/c3_bar_chart.html');
                $chart->enableSection('main', [
                    'data'=> json_encode($data),
                    'height' => 300,
                    'precision' => 2,
                    'decimalSeparator' => ',',
                    'thousandSeparator' => '.',
                    'prefix' => '',
                    'sufix' => '',
                    'width' => 100,
                    'widthType' => '%',
                    'title' => 'Total horas por profissional',
                    'showLegend' => 'false',
                    'showPercentage' => 'false',
                    'barDirection' => 'false'
                ]);

                parent::add($chart);
            }
            else
            {
                new TMessage('error', _t('No records found'));
            }

            // close the transaction
            TTransaction::close();
        }
        catch (Exception $e) // in case of exception
        {
            // shows the exception error message
            new TMessage('error', $e->getMessage());
            // undo all pending operations
            TTransaction::rollback();
        }
    }

    public function fireEvents( $object )
    {
        $obj = new stdClass;
        if(is_object($object) && get_class($object) == 'stdClass')
        {
            if(isset($object->empresa_id))
            {
                $value = $object->empresa_id;

                $obj->empresa_id = $value;
            }
            if(isset($object->contrato_id))
            {
                $value = $object->contrato_id;

                $obj->contrato_id = $value;
            }
            if(isset($object->contrato_id))
            {
                $value = $object->contrato_id;

                $obj->contrato_id = $value;
            }
            if(isset($object->profissional_id))
            {
                $value = $object->profissional_id;

                $obj->profissional_id = $value;
            }
        }
        elseif(is_object($object))
        {
            if(isset($object->empresa_id))
            {
                $value = $object->empresa_id;

                $obj->empresa_id = $value;
            }
            if(isset($object->contrato_id))
            {
                $value = $object->contrato_id;

                $obj->contrato_id = $value;
            }
            if(isset($object->contrato_id))
            {
                $value = $object->contrato_id;

                $obj->contrato_id = $value;
            }
            if(isset($object->profissional_id))
            {
                $value = $object->profissional_id;

                $obj->profissional_id = $value;
            }
        }
        TForm::sendData(self::$formName, $obj);
    }  

    public function onShow($param = null)
    {

    }

}

