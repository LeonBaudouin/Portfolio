<?php

namespace Model\Description;

class Description extends \Model\Entity\AbstractEntity implements DescriptionInterface
{
    public function getType()
    {
        return $this->_get(self::TYPE);
    }
    
    public function setType($value)
    {
        $this->_set(self::TYPE, $value);
    }
    

    public function getContent()
    {
        return $this->_get(self::CONTENT);
    }
    
    public function setContent($value)
    {
        $this->_set(self::CONTENT, $value);
    }
    
    
    public function getOrder()
    {
        return $this->_get(self::ORDER);
    }
    
    public function setOrder($value)
    {
        $this->_set(self::ORDER, $value);
    }
}