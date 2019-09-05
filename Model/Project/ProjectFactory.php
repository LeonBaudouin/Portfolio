<?php

namespace Model\Project;

class ProjectFactory {
    
    public static function create(array $data = [])
    {
        $projectConstants = (new \ReflectionClass(ProjectInterface::class))->getConstants();
        $reducedData = array_intersect_key($data, array_flip($projectConstants));

        return new Project($reducedData);
    }
}