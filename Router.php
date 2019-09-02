<?php

class Router
{
    const ROUTES = [
        'home' => [
            'path' => '/',
            'controller' => \Controller\MainPage::class
        ],
        'profile' => [
            'path'=> '/profile',
            'controller' => \Controller\Profile::class
        ],
        'project_list' => [
            'path'=> '/project',
            'controller' => \Controller\ProjectList::class
        ],
        'lab_list' => [
            'path'=> '/lab',
            'controller' => \Controller\LabList::class
        ]
    ];

    private static $instance;
    private $altoRouter;

    private function __construct()
    {
        $this->altoRouter = new \AltoRouter();
        $this->addRoutes();
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Router();
        }
        return self::$instance;
    }

    public function route()
    {
        $match = $this->altoRouter->match();
        if( is_array($match) && is_callable( $match['target'] ) ) {
            $function = $match['target'];
            $function($match['params']);
        } else {
            \Controller\NotFound::execute([]);
        }
    }

    public function generate($route, $params = [])
    {
        return $this->altoRouter->generate($route, $params);
    }

    private function addRoutes()
    {
        $routes = [];
        foreach (self::ROUTES as $name => $data) {
            $routes[] = $this->createRoute($data['path'], $data['controller'], $name);
        }
        $this->altoRouter->addRoutes($routes);
    }

    private function createRoute($path, $controllerClass, $name)
    {
        $callback = function($params) use ($controllerClass) {
            $controllerClass::execute($params);
        };

        return ['GET', $path, $callback, $name];
    }
}
