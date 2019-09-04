<?php

namespace Model\Entity;

abstract class AbstractEntity extends \Model\DataObject implements EntityInterface
{
    public function getId() {
        return $this->_get(self::ID);
    }

    public function setId($value) {
        return $this->_set(self::ID, $value);
    }
}