<?php

namespace Model;

class Renderer {

    const EXTENSIONS = [
        \Twig\UrlExtension::class
    ];

    private $loader;
    private $twig;

    public function __construct()
    {
        $templateDir = dirname(__DIR__) . '/View';
        $this->loader = new \Twig_Loader_Filesystem($templateDir);
        
        $config = include('config.php');
        
        $this->twig = new \Twig_Environment($this->loader, [
            'cache' => $config['production'] ? __DIR__ . $config['cache_path'] : false,
            'debug' => !$config['production']
        ]);

        foreach (self::EXTENSIONS as $extensionClass) {
            $this->twig->addExtension(new $extensionClass());
        }
    }

    public function render($fileName, $data = [])
    {
        echo $this->twig->render($fileName, $data);
    }
}