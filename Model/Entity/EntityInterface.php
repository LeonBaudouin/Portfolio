<?php

namespace Model\Entity;

interface EntityInterface {
    
    const ID = 'id';
    
    public function getId();
    public function setId($value);
}