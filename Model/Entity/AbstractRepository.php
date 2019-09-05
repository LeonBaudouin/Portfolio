<?php

namespace Model\Entity;

abstract class AbstractRepository
{
    public abstract static function getById($id);

    public abstract static function getAll();

    protected static function Select(array $params = [])
    {
        $pdo = \Model\Connection::getConnection();
        $query = 'SELECT * FROM ' . self::TABLE_NAME;

        if ($params) {
            $conditions = [];
            foreach ($params as $param => $value) {
                $conditions[] = "$param = :$param";
            }
            $query .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $statement = $pdo->prepare($query);
        $statement->execute($params);
        $data = $statement->fetch(\PDO::FETCH_ASSOC);
    }
}
