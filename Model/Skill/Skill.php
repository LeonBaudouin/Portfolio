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

    public function getParentSkill()
    {
        return $this->_get(self::PARENT_SKILL);
    }

    public function setParentSkill($value)
    {
        $this->_set(self::PARENT_SKILL, $value);
    }

    public function getIsVisible()
    {
        return $this->_get(self::IS_VISIBLE);
    }

    public function setIsVisible($value)
    {
        $this->_set(self::IS_VISIBLE, $value);
    }
}
