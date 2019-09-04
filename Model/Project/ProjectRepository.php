<?php

namespace Model\Project;

class ProjectRepository
{
    const TABLE_NAME = 'projects';

    public static function getById($id)
    {
        $pdo = \Model\Connection::getConnection();
        $statement = $pdo->prepare('SELECT * FROM ' . self::TABLE_NAME . ' WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $id]);
        $data = $statement->fetch(\PDO::FETCH_ASSOC);

        return new Project($data);
    }
}
