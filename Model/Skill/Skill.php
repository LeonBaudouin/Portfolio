<?php

namespace Model\Skill;

class Skill extends \Model\Entity\AbstractEntity implements SkillInterface
{
    public function getName()
    {
        return $this->_get(self::NAME);
    }

    public function setName($value)
    {    
        $this->_set(self::NAME, $value);
    }
    

    public function getLogo()
    {
        return $this->_get(self::LOGO);
    }

    public function setLogo($value)
    {    
        $this->_set(self::LOGO, $value);
    }
    

    public function getSkillSet()
    {
        return $this->_get(self::SKILL_SET);
    }

    public function setSkillSet($value)
    {    
        $this->_set(self::SKILL_SET, $value);
    }
}