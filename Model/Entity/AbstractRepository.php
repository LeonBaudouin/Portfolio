<?php

namespace Model\Entity;

abstract class AbstractRepository
{
    public static function getById($id)
    {
        $data = self::Select(['id' => $id]);
        if (empty($data)) {
            return null;
        }

        return \call_user_func(static::POPULATE_METHOD, $data[0]);
    }

    public static function getAll(
        array $params = [],
        bool $order = false,
        string $order_attr = 'order'
    ) {
        $dataArray = self::Select($params, $order, $order_attr);
        return array_map(static::POPULATE_METHOD, $dataArray);
    }

    protected static function Select(
        array $params = [],
        bool $order = false,
        string $order_attr = 'order'
    ) {
        $pdo = \Model\Connection::getConnection();
        $query = 'SELECT * FROM ' . static::TABLE_NAME;

        if ($params) {
            $conditions = [];
            foreach ($params as $param => $value) {
                $conditions[] = "$param = :$param";
            }
            $query .= ' WHERE ' . implode(' AND ', $conditions);
        }

        if ($order) {
            $query .= ' ORDER BY `'.$order_attr.'`';
        }
            
        $statement = $pdo->prepare($query);
        $statement->execute($params);
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }
}
