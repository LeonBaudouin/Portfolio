<?php

namespace Controller;

class MainPage extends AbstractController
{
    public static function execute($params)
    {
        self::getRenderer()->render('index.twig');
    }
}
