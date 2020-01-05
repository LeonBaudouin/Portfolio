<?php

namespace Twig;

class UrlExtension extends \Twig_Extension
{
    public function getFunctions() {
        return [
            new \Twig_Function('getUrl', ['\Helper\UrlBuilder', 'getUrl']),
            new \Twig_Function('getCurrentUrl', ['\Helper\UrlBuilder', 'getCurrentUrl']),
            new \Twig_Function('getImagePath', ['\Helper\UrlBuilder', 'getImagePath']),
            new \Twig_Function('getForeignUrl', ['\Helper\UrlBuilder', 'getForeignUrl']),
            new \Twig_Function('getFromRegistry', ['\Model\Registry', 'registry'])
        ];
    }
}