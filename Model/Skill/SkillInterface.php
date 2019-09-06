<?php

namespace Model\Skill;

interface SkillInterface extends \Model\Entity\EntityInterface {

    const NAME = 'name';
    const LOGO = 'logo';
    const SKILL_SET = 'skill_set';
    const PARENT_SKILL = 'parent_skill';

    public function getName();
    public function setName($value);
    
    public function getLogo();
    public function setLogo($value);
    
    public function getSkillSet();
    public function setSkillSet($value);
    
    public function getParentSkill();
    public function setParentSkill($value);

}