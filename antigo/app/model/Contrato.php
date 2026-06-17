<?php

class Contrato extends TRecord
{
    const TABLENAME  = 'contrato';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    private Empresa $empresa;

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('empresa_id');
        parent::addAttribute('descricao');
        parent::addAttribute('dt_inicio');
        parent::addAttribute('dt_fim');
        parent::addAttribute('valor_hora');
        parent::addAttribute('cor');
        parent::addAttribute('valor_fixo');
        parent::addAttribute('tipo');
            
    }

    /**
     * Method set_empresa
     * Sample of usage: $var->empresa = $object;
     * @param $object Instance of Empresa
     */
    public function set_empresa(Empresa $object)
    {
        $this->empresa = $object;
        $this->empresa_id = $object->id;
    }

    /**
     * Method get_empresa
     * Sample of usage: $var->empresa->attribute;
     * @returns Empresa instance
     */
    public function get_empresa()
    {
    
        // loads the associated object
        if (empty($this->empresa))
            $this->empresa = new Empresa($this->empresa_id);
    
        // returns the associated object
        return $this->empresa;
    }

    /**
     * Method getAgendamentos
     */
    public function getAgendamentos()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('contrato_id', '=', $this->id));
        return Agendamento::getObjects( $criteria );
    }
    /**
     * Method getContratoProfissionals
     */
    public function getContratoProfissionals()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('contrato_id', '=', $this->id));
        return ContratoProfissional::getObjects( $criteria );
    }
    /**
     * Method getRealizados
     */
    public function getRealizados()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('contrato_id', '=', $this->id));
        return Realizado::getObjects( $criteria );
    }
    /**
     * Method getContratoItems
     */
    public function getContratoItems()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('contrato_id', '=', $this->id));
        return ContratoItem::getObjects( $criteria );
    }

    public function set_agendamento_contrato_to_string($agendamento_contrato_to_string)
    {
        if(is_array($agendamento_contrato_to_string))
        {
            $values = Contrato::where('id', 'in', $agendamento_contrato_to_string)->getIndexedArray('id', 'id');
            $this->agendamento_contrato_to_string = implode(', ', $values);
        }
        else
        {
            $this->agendamento_contrato_to_string = $agendamento_contrato_to_string;
        }

        $this->vdata['agendamento_contrato_to_string'] = $this->agendamento_contrato_to_string;
    }

    public function get_agendamento_contrato_to_string()
    {
        if(!empty($this->agendamento_contrato_to_string))
        {
            return $this->agendamento_contrato_to_string;
        }
    
        $values = Agendamento::where('contrato_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
        return implode(', ', $values);
    }

    public function set_agendamento_profissional_to_string($agendamento_profissional_to_string)
    {
        if(is_array($agendamento_profissional_to_string))
        {
            $values = Profissional::where('id', 'in', $agendamento_profissional_to_string)->getIndexedArray('nome', 'nome');
            $this->agendamento_profissional_to_string = implode(', ', $values);
        }
        else
        {
            $this->agendamento_profissional_to_string = $agendamento_profissional_to_string;
        }

        $this->vdata['agendamento_profissional_to_string'] = $this->agendamento_profissional_to_string;
    }

    public function get_agendamento_profissional_to_string()
    {
        if(!empty($this->agendamento_profissional_to_string))
        {
            return $this->agendamento_profissional_to_string;
        }
    
        $values = Agendamento::where('contrato_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
        return implode(', ', $values);
    }

    public function set_contrato_profissional_contrato_to_string($contrato_profissional_contrato_to_string)
    {
        if(is_array($contrato_profissional_contrato_to_string))
        {
            $values = Contrato::where('id', 'in', $contrato_profissional_contrato_to_string)->getIndexedArray('id', 'id');
            $this->contrato_profissional_contrato_to_string = implode(', ', $values);
        }
        else
        {
            $this->contrato_profissional_contrato_to_string = $contrato_profissional_contrato_to_string;
        }

        $this->vdata['contrato_profissional_contrato_to_string'] = $this->contrato_profissional_contrato_to_string;
    }

    public function get_contrato_profissional_contrato_to_string()
    {
        if(!empty($this->contrato_profissional_contrato_to_string))
        {
            return $this->contrato_profissional_contrato_to_string;
        }
    
        $values = ContratoProfissional::where('contrato_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
        return implode(', ', $values);
    }

    public function set_contrato_profissional_profissional_to_string($contrato_profissional_profissional_to_string)
    {
        if(is_array($contrato_profissional_profissional_to_string))
        {
            $values = Profissional::where('id', 'in', $contrato_profissional_profissional_to_string)->getIndexedArray('nome', 'nome');
            $this->contrato_profissional_profissional_to_string = implode(', ', $values);
        }
        else
        {
            $this->contrato_profissional_profissional_to_string = $contrato_profissional_profissional_to_string;
        }

        $this->vdata['contrato_profissional_profissional_to_string'] = $this->contrato_profissional_profissional_to_string;
    }

    public function get_contrato_profissional_profissional_to_string()
    {
        if(!empty($this->contrato_profissional_profissional_to_string))
        {
            return $this->contrato_profissional_profissional_to_string;
        }
    
        $values = ContratoProfissional::where('contrato_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
        return implode(', ', $values);
    }

    public function set_realizado_contrato_to_string($realizado_contrato_to_string)
    {
        if(is_array($realizado_contrato_to_string))
        {
            $values = Contrato::where('id', 'in', $realizado_contrato_to_string)->getIndexedArray('id', 'id');
            $this->realizado_contrato_to_string = implode(', ', $values);
        }
        else
        {
            $this->realizado_contrato_to_string = $realizado_contrato_to_string;
        }

        $this->vdata['realizado_contrato_to_string'] = $this->realizado_contrato_to_string;
    }

    public function get_realizado_contrato_to_string()
    {
        if(!empty($this->realizado_contrato_to_string))
        {
            return $this->realizado_contrato_to_string;
        }
    
        $values = Realizado::where('contrato_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
        return implode(', ', $values);
    }

    public function set_realizado_profissional_to_string($realizado_profissional_to_string)
    {
        if(is_array($realizado_profissional_to_string))
        {
            $values = Profissional::where('id', 'in', $realizado_profissional_to_string)->getIndexedArray('nome', 'nome');
            $this->realizado_profissional_to_string = implode(', ', $values);
        }
        else
        {
            $this->realizado_profissional_to_string = $realizado_profissional_to_string;
        }

        $this->vdata['realizado_profissional_to_string'] = $this->realizado_profissional_to_string;
    }

    public function get_realizado_profissional_to_string()
    {
        if(!empty($this->realizado_profissional_to_string))
        {
            return $this->realizado_profissional_to_string;
        }
    
        $values = Realizado::where('contrato_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
        return implode(', ', $values);
    }

    public function set_contrato_item_contrato_to_string($contrato_item_contrato_to_string)
    {
        if(is_array($contrato_item_contrato_to_string))
        {
            $values = Contrato::where('id', 'in', $contrato_item_contrato_to_string)->getIndexedArray('id', 'id');
            $this->contrato_item_contrato_to_string = implode(', ', $values);
        }
        else
        {
            $this->contrato_item_contrato_to_string = $contrato_item_contrato_to_string;
        }

        $this->vdata['contrato_item_contrato_to_string'] = $this->contrato_item_contrato_to_string;
    }

    public function get_contrato_item_contrato_to_string()
    {
        if(!empty($this->contrato_item_contrato_to_string))
        {
            return $this->contrato_item_contrato_to_string;
        }
    
        $values = ContratoItem::where('contrato_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
        return implode(', ', $values);
    }

    public function set_contrato_item_profissional_to_string($contrato_item_profissional_to_string)
    {
        if(is_array($contrato_item_profissional_to_string))
        {
            $values = Profissional::where('id', 'in', $contrato_item_profissional_to_string)->getIndexedArray('nome', 'nome');
            $this->contrato_item_profissional_to_string = implode(', ', $values);
        }
        else
        {
            $this->contrato_item_profissional_to_string = $contrato_item_profissional_to_string;
        }

        $this->vdata['contrato_item_profissional_to_string'] = $this->contrato_item_profissional_to_string;
    }

    public function get_contrato_item_profissional_to_string()
    {
        if(!empty($this->contrato_item_profissional_to_string))
        {
            return $this->contrato_item_profissional_to_string;
        }
    
        $values = ContratoItem::where('contrato_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
        return implode(', ', $values);
    }

    
}

