<?php

namespace Model\Course;

class Course extends \Model\Entity\AbstractEntity implements CourseInterface
{
    public function getName()
    {
        return $this->_get(self::NAME);
    }
    
    public function setName($value)
    {
        $this->_set(self::NAME, $value);
    }
    
    
    public function getDate()
    {
        return $this->_get(self::DATE);
    }
    
    public function setDate($value)
    {
        $this->_set(self::DATE, $value);
    }
    
    
    public function getDescription()
    {
        return $this->_get(self::DESCRIPTION);
    }
    
    public function setDescription($value)
    {
        $this->_set(self::DESCRIPTION, $value);
    }
}
