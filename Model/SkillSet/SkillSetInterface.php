<?php

namespace Model\SkillSet;

interface SkillSetInterface extends \Model\Entity\EntityInterface
{
    const NAME = 'name';
    const DESCRIPTION = 'description';
    const SKILLS = 'skills';
    const IS_VISIBLE = 'is_visible';
    const ORDER = 'order';

    public function getName();
    public function setName($value);

    public function getDescription();
    public function setDescription($value);

    public function getSkills();
    public function setSkills($value);

    public function getIsVisible();
    public function setIsVisible($value);

    public function getOrder();
    public function setOrder($value);
}
