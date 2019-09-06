<?php

namespace Model;

class Connection
{
    private static $connection = null;

    public static function getConnection()
    {
        if (self::$connection == null) {
            $config = include('config.php');
            $pdo = new \PDO("mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8", $config['db_user'], $config['db_password']);
            $pdo->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
            $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            self::$connection = $pdo;
        }
        return self::$connection;
    }
}
