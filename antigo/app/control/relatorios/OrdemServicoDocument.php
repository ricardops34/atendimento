<?php

class OrdemServicoDocument extends TPage
{
    private static $database = 'consultor';
    private static $activeRecord = 'Agendamento';
    private static $primaryKey = 'id';
    private static $htmlFile = 'app/documents/OrdemServicoDocumentTemplate.html';

    /**
     * Form constructor
     * @param $param Request
     */
    public function __construct( $param )
    {

    }

    public static function onGenerate($param)
    {
        try 
        {
            TTransaction::open(self::$database);

            $class = self::$activeRecord;
            $object = new $class($param['key']);

            $html = new AdiantiHTMLDocumentParser(self::$htmlFile);
            $html->setMaster($object);

            $pageSize = 'A4';
            $document = 'tmp/'.uniqid().'.pdf'; 

            $data = new DateTime($object->data_agenda);
            $data_ini = new DateTime($object->horario_inicial);
            $data_fim = new DateTime($object->horario_final);

            $data_total = new DateTime($object->hora_total);

            $object->dEmissao = date("d/m/Y"); //$data_ini->format('d/m/Y');
            $object->dData = $data->format('d/m/Y');
            $object->HoraIni = $data_ini->format('H:i');
            $object->HoraFim = $data_fim->format('H:i');

            //$DInt_ini = new DateTime($object->intervalo_inicial);
            //$DInt_Fim = new DateTime($object->intervalo_final);

            //$DInt_total = $DInt_ini->diff($DInt_Fim);
            //$object->HoraInter = $DInt_total->format("%H:%I");;

            //$HrTotal = strtotime($data_ini->diff($data_fim)) - strtotime($DInt_ini->diff($DInt_Fim));//$data_ini->diff($data_fim);

            $object->HoraInter = gmdate('H:i', strtotime( $object->hora_intervalo_final ) - strtotime( $object->hora_intervalo_inicial ) );
            $object->HoraTotal = $data_total->format('H:i');  //date($HrTotal,"%H:%I");//$HrTotal->format("%H:%I");

            $html->process();

            $html->saveAsPDF($document, $pageSize, 'portrait');

            TTransaction::close();

            if(empty($param['returnFile']))
            {
                parent::openFile($document);

                new TMessage('info', _t('Document successfully generated'));    
            }
            else
            {
                return $document;
            }
        } 
        catch (Exception $e) 
        {
            // shows the exception error message
            new TMessage('error', $e->getMessage());

            // undo all pending operations
            TTransaction::rollback();
        }
    }

}

