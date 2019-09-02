<?php

namespace Controller;

class NotFound extends AbstractController
{
    public static function execute($params)
    {
        header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
        echo 'NotFound';
    }
}
