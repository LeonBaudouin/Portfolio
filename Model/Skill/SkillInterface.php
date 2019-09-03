<?php

namespace Model\Skill;

interface SkillInterface extends \Model\EntityInterface {

    const NAME = 'name';
    const LOGO = 'logo';
    const SKILL_SET = 'skill_set';

    public function getName();
    public function setName($value);
    
    public function getLogo();
    public function setLogo($value);
    
    public function getSkillSet();
    public function setSkillSet($value);

}