<?php

class Funcao extends TRecord
{
    const TABLENAME  = 'funcao';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('descricao');
            
    }

    /**
     * Method getColaboradors
     */
    public function getColaboradors()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('funcao_id', '=', $this->id));
        return Colaborador::getObjects( $criteria );
    }

    public function set_colaborador_funcao_to_string($colaborador_funcao_to_string)
    {
        if(is_array($colaborador_funcao_to_string))
        {
            $values = Funcao::where('id', 'in', $colaborador_funcao_to_string)->getIndexedArray('descricao', 'descricao');
            $this->colaborador_funcao_to_string = implode(', ', $values);
        }
        else
        {
            $this->colaborador_funcao_to_string = $colaborador_funcao_to_string;
        }

        $this->vdata['colaborador_funcao_to_string'] = $this->colaborador_funcao_to_string;
    }

    public function get_colaborador_funcao_to_string()
    {
        if(!empty($this->colaborador_funcao_to_string))
        {
            return $this->colaborador_funcao_to_string;
        }
    
        $values = Colaborador::where('funcao_id', '=', $this->id)->getIndexedArray('funcao_id','{funcao->descricao}');
        return implode(', ', $values);
    }

    /**
     * Method onBeforeDelete
     */
    public function onBeforeDelete()
    {
            

        if(Colaborador::where('funcao_id', '=', $this->id)->first())
        {
            throw new Exception("Não é possível deletar este registro pois ele está sendo utilizado em outra parte do sistema");
        }
    
    }

    
}

