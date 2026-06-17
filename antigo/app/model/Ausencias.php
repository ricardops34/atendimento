<?php

class Ausencias extends TRecord
{
    const TABLENAME  = 'ausencias';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    private Profissional $profissional;

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('profissional_id');
        parent::addAttribute('descricao');
        parent::addAttribute('inicio');
        parent::addAttribute('final');
            
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

