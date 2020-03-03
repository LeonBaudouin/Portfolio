<?php

namespace Model\Course;

interface CourseInterface extends \Model\Entity\EntityInterface
{
    const NAME = 'name';
    const DATE = 'date';
    const DESCRIPTION = 'description';
    const IS_VISIBLE = 'is_visible';

    public function getName();
    public function setName($value);
    
    public function getDate();
    public function setDate($value);
    
    public function getDescription();
    public function setDescription($value);

    public function getIsVisible();
    public function setIsVisible($value);
}