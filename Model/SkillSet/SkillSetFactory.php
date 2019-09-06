<?php

namespace Model\SkillSet;

class SkillSetFactory {
    
    public static function create(array $data = [])
    {
        $skillSetConstants = (new \ReflectionClass(SkillSetInterface::class))->getConstants();
        $reducedData = array_intersect_key($data, array_flip($skillSetConstants));

        return new SkillSet($reducedData);
    }
}