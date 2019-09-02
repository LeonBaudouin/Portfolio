<?php

namespace Helper;

class UrlBuilder {

    const FOREIGN_URL = [
        'github' => 'https://github.com/LeonBaudouin',
        'codepen' => 'https://codepen.io/leonbaudouin/',
        'instagram' => 'https://www.instagram.com/leon2motion/',
        'youtube' => 'https://www.youtube.com/channel/UCbZjms-bVUHVsETHmuvnWRQ',
        'cv' => './cv.pdf'
    ];

    public static function getUrl($routeName, array $params = [])
    {
        return \Router::getInstance()->generate($routeName, $params);
    }

    public static function getImagePath($imageName, $type = "img")
    {
        $config = include('config.php');
        $typeToKey = [
            'img' => 'image_path',
            'svg' => 'svg_path'
        ];
        return $config[$typeToKey[$type]] . '/' . $imageName;
    }

    public static function getForeignUrl($alias)
    {
        return self::FOREIGN_URL[$alias];
    }
}