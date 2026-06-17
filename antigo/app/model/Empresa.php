<?php

class Empresa extends TRecord
{
    const TABLENAME  = 'empresa';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    private Cidade $cidade;

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('nome');
        parent::addAttribute('razao');
        parent::addAttribute('responsalvel');
        parent::addAttribute('cidade_id');
        parent::addAttribute('endereco');
        parent::addAttribute('cor');
            
    }

    /**
     * Method set_cidade
     * Sample of usage: $var->cidade = $object;
     * @param $object Instance of Cidade
     */
    public function set_cidade(Cidade $object)
    {
        $this->cidade = $object;
        $this->cidade_id = $object->id;
    }

    /**
     * Method get_cidade
     * Sample of usage: $var->cidade->attribute;
     * @returns Cidade instance
     */
    public function get_cidade()
    {
    
        // loads the associated object
        if (empty($this->cidade))
            $this->cidade = new Cidade($this->cidade_id);
    
        // returns the associated object
        return $this->cidade;
    }

    /**
     * Method getContratos
     */
    public function getContratos()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('empresa_id', '=', $this->id));
        return Contrato::getObjects( $criteria );
    }
    /**
     * Method getEmpresaColaboradors
     */
    public function getEmpresaColaboradors()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('empresa_id', '=', $this->id));
        return EmpresaColaborador::getObjects( $criteria );
    }

    public function set_contrato_empresa_to_string($contrato_empresa_to_string)
    {
        if(is_array($contrato_empresa_to_string))
        {
            $values = Empresa::where('id', 'in', $contrato_empresa_to_string)->getIndexedArray('nome', 'nome');
            $this->contrato_empresa_to_string = implode(', ', $values);
        }
        else
        {
            $this->contrato_empresa_to_string = $contrato_empresa_to_string;
        }

        $this->vdata['contrato_empresa_to_string'] = $this->contrato_empresa_to_string;
    }

    public function get_contrato_empresa_to_string()
    {
        if(!empty($this->contrato_empresa_to_string))
        {
            return $this->contrato_empresa_to_string;
        }
    
        $values = Contrato::where('empresa_id', '=', $this->id)->getIndexedArray('empresa_id','{empresa->nome}');
        return implode(', ', $values);
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
    
        $values = EmpresaColaborador::where('empresa_id', '=', $this->id)->getIndexedArray('empresa_id','{empresa->nome}');
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
    
        $values = EmpresaColaborador::where('empresa_id', '=', $this->id)->getIndexedArray('colaborador_id','{colaborador->id}');
        return implode(', ', $values);
    }

    
}

