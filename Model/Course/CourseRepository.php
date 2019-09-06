<?php

namespace Model\Course;

class CourseRepository extends \Model\Entity\AbstractRepository
{
    const TABLE_NAME = 'courses';

    public static function getById($id)
    {
        $data = self::Select(['id' => $id]);
        if (empty($data)) {
            return null;
        }
        return CourseFactory::create($data);
    }

    public static function getAll()
    {
        $dataArray = self::Select();
        return array_map([CourseFactory::class, 'create'], $dataArray);
    }
}
