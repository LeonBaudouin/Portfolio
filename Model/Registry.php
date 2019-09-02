<?php

namespace Model;

class Registry
{
    private static $registry;

    public static function init()
    { 
        self::$registry = [];
    }

    public static function registry($key)
    {
        return self::$registry[$key];
    }
    
    public static function register($key, $value)
    {
        self::$registry[$key] = $value;
    }
}
