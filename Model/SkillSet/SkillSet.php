<?php

namespace Model\SkillSet;

class SkillSet extends \Model\Entity\AbstractEntity implements SkillSetInterface
{

    public function getName()
    {
        return $this->_get(self::NAME);
    }
    
    public function setName($value)
    {
        $this->_set(self::NAME, $value);
    }
    
    
    public function getDescription()
    {
        return $this->_get(self::DESCRIPTION);
    }
    
    public function setDescription($value)
    {
        $this->_set(self::DESCRIPTION, $value);
    }
    
    
    public function getSkills()
    {
        return $this->_get(self::SKILLS);
    }
    
    public function setSkills($value)
    {
        $this->_set(self::SKILLS, $value);
    }

    public function getHigherSkills()
    {
        $skills = $this->getSkills();
        $skillWithParentId = [];

        foreach ($skills as $skill) {
            if ($skill->getParentSkill()) {
                $skillWithParentId[] = $skill->getParentSkill();
            }
        }

        $filterParent = function ($skill) use ($skillWithParentId) {
            return !in_array($skill->getId(), $skillWithParentId);
        };

        return array_filter($skills, $filterParent);
    }
}
