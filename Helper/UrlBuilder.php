<?php

namespace Helper;

class UrlBuilder {

    const FOREIGN_URL = [
        'github' => 'https://github.com/LeonBaudouin',
        'codepen' => 'https://codepen.io/leonbaudouin/',
        'twitter' => 'https://twitter.com/BaudouinLeon',
        'instagram' => 'https://www.instagram.com/leon2motion/',
        'youtube' => 'https://www.youtube.com/channel/UCbZjms-bVUHVsETHmuvnWRQ',
        'cv' => './cv.pdf'
    ];

    public static function getUrl($routeName, array $params = [], bool $fullRoute = false)
    {
        $base = $fullRoute ? UrlBuilder::getBaseUrl() : '';
        return $base . \Router::getInstance()->generate($routeName, $params);
    }

    public static function getCurrentUrl(bool $fullRoute = false) {
        $base = $fullRoute ? UrlBuilder::getBaseUrl() : '';
        return $base . $_SERVER['REQUEST_URI']; 
    }

    public static function getBaseUrl()
    {
        $base = "https://";     
        $base .= $_SERVER['HTTP_HOST'];
        return $base;
    }

    public static function getImagePath($imageName, $type = "img", bool $fullRoute = false)
    {
        $base = $fullRoute ? UrlBuilder::getBaseUrl() : '';
        $config = include('config.php');
        $typeToKey = [
            'img' => 'image_path',
            'svg' => 'svg_path'
        ];
        return $base . $config[$typeToKey[$type]] . '/' . $imageName;
    }

    public static function getForeignUrl($alias)
    {
        return self::FOREIGN_URL[$alias];
    }
}