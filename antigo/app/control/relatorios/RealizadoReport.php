<?php

class RealizadoReport extends TPage
{
    private $form; // form
    private $loaded;
    private static $database = 'consultor';
    private static $activeRecord = 'Realizado';
    private static $primaryKey = 'id';
    private static $formName = 'formReport_Realizado';

    /**
     * Class constructor
     * Creates the page, the form and the listing
     */
    public function __construct()
    {
        parent::__construct();

        // creates the form
        $this->form = new BootstrapFormBuilder(self::$formName);

        // define the form title
        $this->form->setFormTitle("Relatório de serviços realizados");

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

        $btn_ongeneratehtml = $this->form->addAction("Gerar HTML", new TAction([$this, 'onGenerateHtml']), 'fas:code #ffffff');
        $this->btn_ongeneratehtml = $btn_ongeneratehtml;
        $btn_ongeneratehtml->addStyleClass('btn-primary'); 

        $btn_ongeneratepdf = $this->form->addAction("Gerar PDF", new TAction([$this, 'onGeneratePdf']), 'far:file-pdf #d44734');
        $this->btn_ongeneratepdf = $btn_ongeneratepdf;

        $btn_ongeneratertf = $this->form->addAction("Gerar RTF", new TAction([$this, 'onGenerateRtf']), 'far:file-alt #324bcc');
        $this->btn_ongeneratertf = $btn_ongeneratertf;

        // vertical box container
        $container = new TVBox;
        $container->style = 'width: 100%';
        $container->class = 'form-container';
        $container->add(TBreadCrumb::create(["Relatórios","Relatório de serviços realizados"]));
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

    public function onGenerateHtml($param = null) 
    {
        $this->onGenerate('html');
    }

    public function onGeneratePdf($param = null) 
    {
        $this->onGenerate('pdf');
    }

    public function onGenerateRtf($param = null) 
    {
        $this->onGenerate('rtf');
    }

    /**
     * Register the filter in the session
     */
    public function getFilters()
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

        return $filters;
    }

    public function onGenerate($format)
    {
        try
        {
            $filters = $this->getFilters();
            // open a transaction with database 'consultor'
            TTransaction::open(self::$database);
            $param = [];
            // creates a repository for Realizado
            $repository = new TRepository(self::$activeRecord);
            // creates a criteria
            $criteria = new TCriteria;

            $param['order'] = 'contrato_id,contrato_id';
            $param['direction'] = 'asc';

            $criteria->setProperties($param);

            if ($filters)
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
                $widths = array(50,120,175,120,120,100,150);
                $reportExtension = 'pdf';
                switch ($format)
                {
                    case 'html':
                        $tr = new TTableWriterHTML($widths);
                        $reportExtension = 'html';
                        break;
                    case 'xls':
                        $tr = new TTableWriterXLS($widths);
                        $reportExtension = 'xls';
                        break;
                    case 'pdf':
                        $tr = new TTableWriterPDF($widths, 'L', 'A4');
                        $reportExtension = 'pdf';
                        break;
                    case 'htmlPdf':
                        $reportExtension = 'pdf';
                        $tr = new BTableWriterHtmlPDF($widths, 'L', 'A4');
                        break;
                    case 'rtf':
                        if (!class_exists('PHPRtfLite_Autoloader'))
                        {
                            PHPRtfLite::registerAutoloader();
                        }
                        $reportExtension = 'rtf';
                        $tr = new TTableWriterRTF($widths, 'L', 'A4');
                        break;
                }

                if (!empty($tr))
                {
                    // create the document styles
                    $tr->addStyle('title', 'Helvetica', '10', 'B',   '#000000', '#dbdbdb');
                    $tr->addStyle('datap', 'Arial', '10', '',    '#333333', '#f0f0f0');
                    $tr->addStyle('datai', 'Arial', '10', '',    '#333333', '#ffffff');
                    $tr->addStyle('header', 'Helvetica', '16', 'B',   '#5a5a5a', '#6B6B6B');
                    $tr->addStyle('footer', 'Helvetica', '10', 'B',  '#5a5a5a', '#A3A3A3');
                    $tr->addStyle('break', 'Helvetica', '10', 'B',  '#ffffff', '#9a9a9a');
                    $tr->addStyle('total', 'Helvetica', '10', 'I',  '#000000', '#c7c7c7');
                    $tr->addStyle('breakTotal', 'Helvetica', '10', 'I',  '#000000', '#c6c8d0');

                    // add titles row
                    $tr->addRow();
                    $tr->addCell("Id", 'left', 'title');
                    $tr->addCell("Profissional", 'left', 'title');
                    $tr->addCell("Descrição", 'left', 'title');
                    $tr->addCell("Início", 'left', 'title');
                    $tr->addCell("Fim", 'left', 'title');
                    $tr->addCell("Horas", 'left', 'title');
                    $tr->addCell("Valor", 'left', 'title');

                    $grandTotal = [];
                    $breakTotal = [];
                    $breakValue = null;
                    $firstRow = true;

                    // controls the background filling
                    $colour = false;                
                    foreach ($objects as $object)
                    {
                        $style = $colour ? 'datap' : 'datai';

                        $column_calculated_2 = $object->evaluate('=( {horas} * {contrato->valor_hora}  )');

                        if ($object->contrato_id !== $breakValue)
                        {
                            if (!$firstRow)
                            {
                                $tr->addRow();

                                $breakTotal_horas = array_sum($breakTotal['horas']);
                                $breakTotal_column_calculated_2 = array_sum($breakTotal['column_calculated_2']);

                                $breakTotal_horas = call_user_func(function($value)
                                {
                                    if(!$value)
                                    {
                                        $value = 0;
                                    }

                                    if(is_numeric($value))
                                    {
                                        return "R$ " . number_format($value, 2, ",", ".");
                                    }
                                    else
                                    {
                                        return $value;
                                    }
                                }, $breakTotal_horas); 

                                $breakTotal_column_calculated_2 = call_user_func(function($value)
                                {
                                    if(!$value)
                                    {
                                        $value = 0;
                                    }

                                    if(is_numeric($value))
                                    {
                                        return "R$ " . number_format($value, 2, ",", ".");
                                    }
                                    else
                                    {
                                        return $value;
                                    }
                                }, $breakTotal_column_calculated_2); 

                                $tr->addCell('', 'center', 'breakTotal');
                                $tr->addCell('', 'center', 'breakTotal');
                                $tr->addCell('', 'center', 'breakTotal');
                                $tr->addCell('', 'center', 'breakTotal');
                                $tr->addCell('', 'center', 'breakTotal');
                                $tr->addCell($breakTotal_horas, 'left', 'breakTotal');
                                $tr->addCell($breakTotal_column_calculated_2, 'left', 'breakTotal');
                            }
                            $tr->addRow();
                            $tr->addCell($object->render('{contrato->descricao} ({contrato->empresa->nome})'), 'left', 'break', 7);
                            $breakTotal = [];
                        }
                        $breakValue = $object->contrato_id;

                        $grandTotal['horas'][] = $object->horas;
                        $breakTotal['horas'][] = $object->horas;
                        $grandTotal['column_calculated_2'][] = $column_calculated_2;
                        $breakTotal['column_calculated_2'][] = $column_calculated_2;

                        $firstRow = false;

                        $object->inicio = call_user_func(function($value, $object, $row)
                        {
                            if(!empty(trim((string) $value)))
                            {
                                try
                                {
                                    $date = new DateTime($value);
                                    return $date->format('d/m/Y H:i');
                                }
                                catch (Exception $e)
                                {
                                    return $value;
                                }
                            }
                        }, $object->inicio, $object, null);

                        $object->fim = call_user_func(function($value, $object, $row)
                        {
                            if(!empty(trim((string) $value)))
                            {
                                try
                                {
                                    $date = new DateTime($value);
                                    return $date->format('d/m/Y H:i');
                                }
                                catch (Exception $e)
                                {
                                    return $value;
                                }
                            }
                        }, $object->fim, $object, null);

                        $object->horas = call_user_func(function($value, $object, $row) 
                        {
                            if(!$value)
                            {
                                $value = 0;
                            }

                            if(is_numeric($value))
                            {
                                return "R$ " . number_format($value, 2, ",", ".");
                            }
                            else
                            {
                                return $value;
                            }
                        }, $object->horas, $object, null);

                        $column_calculated_2 = call_user_func(function($value, $object, $row) 
                        {
                            if(!$value)
                            {
                                $value = 0;
                            }

                            if(is_numeric($value))
                            {
                                return "R$ " . number_format($value, 2, ",", ".");
                            }
                            else
                            {
                                return $value;
                            }
                        }, $column_calculated_2, $object, null);

                        $tr->addRow();

                        $tr->addCell($object->id, 'left', $style);
                        $tr->addCell($object->profissional->nome, 'left', $style);
                        $tr->addCell($object->descricao, 'left', $style);
                        $tr->addCell($object->inicio, 'left', $style);
                        $tr->addCell($object->fim, 'left', $style);
                        $tr->addCell($object->horas, 'left', $style);
                        $tr->addCell($column_calculated_2, 'left', $style);

                        $colour = !$colour;

                    }

                    $tr->addRow();

                    $breakTotal_horas = array_sum($breakTotal['horas']);
                    $breakTotal_column_calculated_2 = array_sum($breakTotal['column_calculated_2']);

                    $breakTotal_horas = call_user_func(function($value)
                    {
                        if(!$value)
                        {
                            $value = 0;
                        }

                        if(is_numeric($value))
                        {
                            return "R$ " . number_format($value, 2, ",", ".");
                        }
                        else
                        {
                            return $value;
                        }
                    }, $breakTotal_horas); 

                    $breakTotal_column_calculated_2 = call_user_func(function($value)
                    {
                        if(!$value)
                        {
                            $value = 0;
                        }

                        if(is_numeric($value))
                        {
                            return "R$ " . number_format($value, 2, ",", ".");
                        }
                        else
                        {
                            return $value;
                        }
                    }, $breakTotal_column_calculated_2); 

                    $tr->addCell('', 'center', 'breakTotal');
                    $tr->addCell('', 'center', 'breakTotal');
                    $tr->addCell('', 'center', 'breakTotal');
                    $tr->addCell('', 'center', 'breakTotal');
                    $tr->addCell('', 'center', 'breakTotal');
                    $tr->addCell($breakTotal_horas, 'left', 'breakTotal');
                    $tr->addCell($breakTotal_column_calculated_2, 'left', 'breakTotal');

                    $tr->addRow();

                    $grandTotal_horas = array_sum($grandTotal['horas']);
                    $grandTotal_column_calculated_2 = array_sum($grandTotal['column_calculated_2']);

                    $grandTotal_horas = call_user_func(function($value)
                    {
                        if(!$value)
                        {
                            $value = 0;
                        }

                        if(is_numeric($value))
                        {
                            return "R$ " . number_format($value, 2, ",", ".");
                        }
                        else
                        {
                            return $value;
                        }
                    }, $grandTotal_horas); 

                    $grandTotal_column_calculated_2 = call_user_func(function($value)
                    {
                        if(!$value)
                        {
                            $value = 0;
                        }

                        if(is_numeric($value))
                        {
                            return "R$ " . number_format($value, 2, ",", ".");
                        }
                        else
                        {
                            return $value;
                        }
                    }, $grandTotal_column_calculated_2); 

                    $tr->addCell('', 'center', 'total');
                    $tr->addCell('', 'center', 'total');
                    $tr->addCell('', 'center', 'total');
                    $tr->addCell('', 'center', 'total');
                    $tr->addCell('', 'center', 'total');
                    $tr->addCell($grandTotal_horas, 'left', 'total');
                    $tr->addCell($grandTotal_column_calculated_2, 'left', 'total');

                    $file = 'report_'.uniqid().".{$reportExtension}";
                    // stores the file
                    if (!file_exists("app/output/{$file}") || is_writable("app/output/{$file}"))
                    {
                        $tr->save("app/output/{$file}");
                    }
                    else
                    {
                        throw new Exception(_t('Permission denied') . ': ' . "app/output/{$file}");
                    }

                    parent::openFile("app/output/{$file}");

                    // shows the success message
                    new TMessage('info', _t('Report generated. Please, enable popups'));
                }
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

    public function onShow($param = null)
    {

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


}

