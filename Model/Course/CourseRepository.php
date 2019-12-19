<?php

namespace Model\Course;

class CourseRepository extends \Model\Entity\AbstractRepository
{
    const TABLE_NAME = 'courses';

    const POPULATE_METHOD = [CourseFactory::class, 'create'];
}
