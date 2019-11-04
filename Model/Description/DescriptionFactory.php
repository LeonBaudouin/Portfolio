<?php

namespace Model\Description;

class DescriptionFactory {
    
    public static function create(array $data = [])
    {
        $descriptionConstants = (new \ReflectionClass(DescriptionInterface::class))->getConstants();
        $reducedData = array_intersect_key($data, array_flip($descriptionConstants));

        return new Description($reducedData);
    }
}