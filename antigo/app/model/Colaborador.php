<?php

class Colaborador extends TRecord
{
    const TABLENAME  = 'colaborador';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    private Funcao $funcao;

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('nome');
        parent::addAttribute('telefone');
        parent::addAttribute('whatsapp');
        parent::addAttribute('email');
        parent::addAttribute('funcao_id');
            
    }

    /**
     * Method set_funcao
     * Sample of usage: $var->funcao = $object;
     * @param $object Instance of Funcao
     */
    public function set_funcao(Funcao $object)
    {
        $this->funcao = $object;
        $this->funcao_id = $object->id;
    }

    /**
     * Method get_funcao
     * Sample of usage: $var->funcao->attribute;
     * @returns Funcao instance
     */
    public function get_funcao()
    {
    
        // loads the associated object
        if (empty($this->funcao))
            $this->funcao = new Funcao($this->funcao_id);
    
        // returns the associated object
        return $this->funcao;
    }

    /**
     * Method getEmpresaColaboradors
     */
    public function getEmpresaColaboradors()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('colaborador_id', '=', $this->id));
        return EmpresaColaborador::getObjects( $criteria );
    }

    public function set_empresa_colaborador_empresa_to_string($empresa_colaborador_empresa_to_string)
    {
        if(is_array($empresa_colaborador_empresa_to_string))
        {
            $values = Empresa::where('id', 'in', $empresa_colaborador_empresa_to_string)->getIndexedArray('nome', 'nome');
            $this->empresa_colaborador_empresa_to_string = implode(', ', $values);
        }
        else
        {
            $this->empresa_colaborador_empresa_to_string = $empresa_colaborador_empresa_to_string;
        }

        $this->vdata['empresa_colaborador_empresa_to_string'] = $this->empresa_colaborador_empresa_to_string;
    }

    public function get_empresa_colaborador_empresa_to_string()
    {
        if(!empty($this->empresa_colaborador_empresa_to_string))
        {
            return $this->empresa_colaborador_empresa_to_string;
        }
    
        $values = EmpresaColaborador::where('colaborador_id', '=', $this->id)->getIndexedArray('empresa_id','{empresa->nome}');
        return implode(', ', $values);
    }

    public function set_empresa_colaborador_colaborador_to_string($empresa_colaborador_colaborador_to_string)
    {
        if(is_array($empresa_colaborador_colaborador_to_string))
        {
            $values = Colaborador::where('id', 'in', $empresa_colaborador_colaborador_to_string)->getIndexedArray('id', 'id');
            $this->empresa_colaborador_colaborador_to_string = implode(', ', $values);
        }
        else
        {
            $this->empresa_colaborador_colaborador_to_string = $empresa_colaborador_colaborador_to_string;
        }

        $this->vdata['empresa_colaborador_colaborador_to_string'] = $this->empresa_colaborador_colaborador_to_string;
    }

    public function get_empresa_colaborador_colaborador_to_string()
    {
        if(!empty($this->empresa_colaborador_colaborador_to_string))
        {
            return $this->empresa_colaborador_colaborador_to_string;
        }
    
        $values = EmpresaColaborador::where('colaborador_id', '=', $this->id)->getIndexedArray('colaborador_id','{colaborador->id}');
        return implode(', ', $values);
    }

    /**
     * Method onBeforeDelete
     */
    public function onBeforeDelete()
    {
            

        if(EmpresaColaborador::where('colaborador_id', '=', $this->id)->first())
        {
            throw new Exception("Não é possível deletar este registro pois ele está sendo utilizado em outra parte do sistema");
        }
    
    }

    
}

