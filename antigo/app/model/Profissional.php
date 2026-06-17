<?php

class Profissional extends TRecord
{
    const TABLENAME  = 'profissional';
    const PRIMARYKEY = 'id';
    const IDPOLICY   =  'serial'; // {max, serial}

    private SystemUsers $system_user;

    

    /**
     * Constructor method
     */
    public function __construct($id = NULL, $callObjectLoad = TRUE)
    {
        parent::__construct($id, $callObjectLoad);
        parent::addAttribute('nome');
        parent::addAttribute('system_user_id');
            
    }

    /**
     * Method set_system_users
     * Sample of usage: $var->system_users = $object;
     * @param $object Instance of SystemUsers
     */
    public function set_system_user(SystemUsers $object)
    {
        $this->system_user = $object;
        $this->system_user_id = $object->id;
    }

    /**
     * Method get_system_user
     * Sample of usage: $var->system_user->attribute;
     * @returns SystemUsers instance
     */
    public function get_system_user()
    {
        try{
        TTransaction::openFake('permission');
        // loads the associated object
        if (empty($this->system_user))
            $this->system_user = new SystemUsers($this->system_user_id);
        TTransaction::close();
        }catch(Exception $e){
            TTransaction::close();
        }
        // returns the associated object
        return $this->system_user;
    }

    /**
     * Method getAgendamentos
     */
    public function getAgendamentos()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('profissional_id', '=', $this->id));
        return Agendamento::getObjects( $criteria );
    }
    /**
     * Method getContratoProfissionals
     */
    public function getContratoProfissionals()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('profissional_id', '=', $this->id));
        return ContratoProfissional::getObjects( $criteria );
    }
    /**
     * Method getRealizados
     */
    public function getRealizados()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('profissional_id', '=', $this->id));
        return Realizado::getObjects( $criteria );
    }
    /**
     * Method getContratoItems
     */
    public function getContratoItems()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('profissional_id', '=', $this->id));
        return ContratoItem::getObjects( $criteria );
    }
    /**
     * Method getAusenciass
     */
    public function getAusenciass()
    {
        $criteria = new TCriteria;
        $criteria->add(new TFilter('profissional_id', '=', $this->id));
        return Ausencias::getObjects( $criteria );
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
    
        $values = Agendamento::where('profissional_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
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
    
        $values = Agendamento::where('profissional_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
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
    
        $values = ContratoProfissional::where('profissional_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
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
    
        $values = ContratoProfissional::where('profissional_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
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
    
        $values = Realizado::where('profissional_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
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
    
        $values = Realizado::where('profissional_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
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
    
        $values = ContratoItem::where('profissional_id', '=', $this->id)->getIndexedArray('contrato_id','{contrato->id}');
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
    
        $values = ContratoItem::where('profissional_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
        return implode(', ', $values);
    }

    public function set_ausencias_profissional_to_string($ausencias_profissional_to_string)
    {
        if(is_array($ausencias_profissional_to_string))
        {
            $values = Profissional::where('id', 'in', $ausencias_profissional_to_string)->getIndexedArray('nome', 'nome');
            $this->ausencias_profissional_to_string = implode(', ', $values);
        }
        else
        {
            $this->ausencias_profissional_to_string = $ausencias_profissional_to_string;
        }

        $this->vdata['ausencias_profissional_to_string'] = $this->ausencias_profissional_to_string;
    }

    public function get_ausencias_profissional_to_string()
    {
        if(!empty($this->ausencias_profissional_to_string))
        {
            return $this->ausencias_profissional_to_string;
        }
    
        $values = Ausencias::where('profissional_id', '=', $this->id)->getIndexedArray('profissional_id','{profissional->nome}');
        return implode(', ', $values);
    }

    
}

