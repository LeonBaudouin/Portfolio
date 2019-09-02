<?php

namespace Controller;

class Profile extends AbstractController
{
    public static function execute($params)
    {
        self::getRenderer()->render('profile.twig');
    }
}
