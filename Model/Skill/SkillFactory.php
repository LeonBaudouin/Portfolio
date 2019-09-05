<?php

namespace Model\Skill;

class SkillFactory {
    
    public static function create(array $data = [])
    {
        $skillConstants = (new \ReflectionClass(SkillInterface::class))->getConstants();
        $reducedData = array_intersect_key($data, array_flip($skillConstants));

        return new Skill($reducedData);
    }
}