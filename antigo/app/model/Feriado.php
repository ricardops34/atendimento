<?php

class Feriado extends TRecord
{
    const TABLENAME  = 'feriado';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('dt_feriado');
        parent::addAttribute('tipo');
        parent::addAttribute('descricao');
            
    }

    
}

