<?php

namespace Model\Description;

interface DescriptionInterface extends \Model\Entity\EntityInterface {

    const TYPE = 'type';
    const CONTENT = 'content';
    const ORDER = 'order';

    public function getType();
    public function setType($value);
    
    public function getContent();
    public function setContent($value);
    
    public function getOrder();
    public function setOrder($value);

}
