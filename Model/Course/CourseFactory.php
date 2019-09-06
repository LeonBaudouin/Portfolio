<?php

namespace Model\Course;

class CourseFactory {
    
    public static function create(array $data = [])
    {
        $courseConstants = (new \ReflectionClass(CourseInterface::class))->getConstants();
        $reducedData = array_intersect_key($data, array_flip($courseConstants));

        return new Course($reducedData);
    }
}