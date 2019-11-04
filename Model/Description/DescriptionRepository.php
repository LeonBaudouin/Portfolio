<?php

namespace Model\Description;

use \Model\Entity\AbstractRepository;

class DescriptionRepository extends AbstractRepository
{
    const TABLE_NAME = 'descriptions';

    public static function getById($id)
    {
        $data = self::Select(['id' => $id]);
        if (empty($data)) {
            return null;
        }
        $description = DescriptionFactory::create($data[0]);

        return $description;
    }
    
    public static function getAll()
    {
        $dataArray = self::Select();
        return array_map([DescriptionFactory::class, 'create'], $dataArray);
    }

    public static function getFromProject(
        \Model\Project\Project $project
    ) {
        $pdo = \Model\Connection::getConnection();
        $dataArray = self::Select(['project_id' => $project->getId()]);
        return array_map([DescriptionFactory::class, 'create'], $dataArray);
    }
}