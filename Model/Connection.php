<?php

namespace Model;

class Connection
{
    private static $connection = null;

    public static function getConnection()
    {
        if (self::$connection == null) {
            $config = include('config.php');
            self::$connection = new \PDO("mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8", $config['db_user'], $config['db_password']);
            self::$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        }
        return self::$connection;
    }
}
