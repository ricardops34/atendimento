<?php

class Agendamento extends TRecord
{
    const TABLENAME  = 'agendamento';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    private Contrato $contrato;
    private Profissional $profissional;

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('contrato_id');
        parent::addAttribute('profissional_id');
        parent::addAttribute('descricao');
        parent::addAttribute('horario_inicial');
        parent::addAttribute('intervalo_inicial');
        parent::addAttribute('intervalo_final');
        parent::addAttribute('horario_final');
        parent::addAttribute('cor');
        parent::addAttribute('observacao');
        parent::addAttribute('tipo');
        parent::addAttribute('data_agenda');
        parent::addAttribute('hora_inicio');
        parent::addAttribute('hora_fim');
        parent::addAttribute('hora_intervalo_inicial');
        parent::addAttribute('hora_intervalo_final');
        parent::addAttribute('hora_total');
        parent::addAttribute('local');
            
    }

    /**
     * Method set_contrato
     * Sample of usage: $var->contrato = $object;
     * @param $object Instance of Contrato
     */
    public function set_contrato(Contrato $object)
    {
        $this->contrato = $object;
        $this->contrato_id = $object->id;
    }

    /**
     * Method get_contrato
     * Sample of usage: $var->contrato->attribute;
     * @returns Contrato instance
     */
    public function get_contrato()
    {
    
        // loads the associated object
        if (empty($this->contrato))
            $this->contrato = new Contrato($this->contrato_id);
    
        // returns the associated object
        return $this->contrato;
    }
    /**
     * Method set_profissional
     * Sample of usage: $var->profissional = $object;
     * @param $object Instance of Profissional
     */
    public function set_profissional(Profissional $object)
    {
        $this->profissional = $object;
        $this->profissional_id = $object->id;
    }

    /**
     * Method get_profissional
     * Sample of usage: $var->profissional->attribute;
     * @returns Profissional instance
     */
    public function get_profissional()
    {
    
        // loads the associated object
        if (empty($this->profissional))
            $this->profissional = new Profissional($this->profissional_id);
    
        // returns the associated object
        return $this->profissional;
    }

    
}

