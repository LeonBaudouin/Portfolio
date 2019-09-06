<?php

namespace Model\Entity;

abstract class AbstractRepository
{
    public abstract static function getById($id);

    public abstract static function getAll();

    protected static function Select(array $params = [])
    {
        $pdo = \Model\Connection::getConnection();
        $query = 'SELECT * FROM ' . self::getTableName();

        if ($params) {
            $conditions = [];
            foreach ($params as $param => $value) {
                $conditions[] = "$param = :$param";
            }
            $query .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $statement = $pdo->prepare($query);
        $statement->execute(['id' => '1']);
        $data = $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    private static function getTableName()
    {
        return (new \ReflectionClass(static::class))->getConstant('TABLE_NAME');
    } 
}
