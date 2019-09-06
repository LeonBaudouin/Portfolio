<?php

namespace Model\SkillSet;

interface SkillSetInterface extends \Model\Entity\EntityInterface
{
    const NAME = 'name';
    const DESCRIPTION = 'description';
    const SKILLS = 'skills';

    public function getName();
    public function setName($value);
    
    public function getDescription();
    public function setDescription($value);
    
    public function getSkills();
    public function setSkills($value);
}