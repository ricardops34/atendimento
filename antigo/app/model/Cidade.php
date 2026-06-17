<?php

class Cidade extends TRecord
{
    const TABLENAME  = 'cidade';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    private Estado $estado;

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('estado_id');
        parent::addAttribute('nome');
            
    }

    /**
     * Method set_estado
     * Sample of usage: $var->estado = $object;
     * @param $object Instance of Estado
     */
    public function set_estado(Estado $object)
    {
        $this->estado = $object;
        $this->estado_id = $object->id;
    }

    /**
     * Method get_estado
     * Sample of usage: $var->estado->attribute;
     * @returns Estado instance
     */
    public function get_estado()
    {
    
        // loads the associated object
        if (empty($this->estado))
            $this->estado = new Estado($this->estado_id);
    
        // returns the associated object
        return $this->estado;
    }

    /**
     * Method getEmpresas
     */
    public function getEmpresas()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('cidade_id', '=', $this->id));
        return Empresa::getObjects( $criteria );
    }

    public function set_empresa_cidade_to_string($empresa_cidade_to_string)
    {
        if(is_array($empresa_cidade_to_string))
        {
            $values = Cidade::where('id', 'in', $empresa_cidade_to_string)->getIndexedArray('nome', 'nome');
            $this->empresa_cidade_to_string = implode(', ', $values);
        }
        else
        {
            $this->empresa_cidade_to_string = $empresa_cidade_to_string;
        }

        $this->vdata['empresa_cidade_to_string'] = $this->empresa_cidade_to_string;
    }

    public function get_empresa_cidade_to_string()
    {
        if(!empty($this->empresa_cidade_to_string))
        {
            return $this->empresa_cidade_to_string;
        }
    
        $values = Empresa::where('cidade_id', '=', $this->id)->getIndexedArray('cidade_id','{cidade->nome}');
        return implode(', ', $values);
    }

    
}

