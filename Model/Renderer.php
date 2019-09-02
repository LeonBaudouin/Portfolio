<?php

namespace Model;

class Renderer {

    private $loader;
    private $twig;

    public function __construct()
    {
        $templateDir = dirname(__DIR__) . '/View';
        $this->loader = new \Twig_Loader_Filesystem($templateDir);
        
        $config = include('config.php');
        
        $this->twig = new \Twig_Environment($this->loader, [
            'cache' => $config['production'] ? $config['cache_path'] : false,
            'debug' => !$config['production']
        ]);
    }

    public function render($fileName, $data = [])
    {
        echo $this->twig->render($fileName, $data);
    }
}