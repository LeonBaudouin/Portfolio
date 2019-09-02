<?php

class Router
{
    const ROUTES = [
        '/' => \Controller\MainPage::class
    ];

    private $altoRouter;

    public function __construct()
    {
        $this->altoRouter = new \AltoRouter();
        $this->addRoutes();
    }

    public function route()
    {
        $match = $this->altoRouter->match();
        if( is_array($match) && is_callable( $match['target'] ) ) {
            $function = $match['target'];
            $function($match['params']);
        } else {
            $controller = new \Controller\NotFound();
            $controller->execute([]);
        }
    }

    private function addRoutes()
    {
        $routes = [];
        foreach (self::ROUTES as $path => $controllerClass) {
            $routes[] = $this->createRoute($path, $controllerClass);
        }
        $this->altoRouter->addRoutes($routes);
    }

    private function createRoute($path, $controllerClass)
    {
        $callback = function($params) use ($controllerClass) {
            $controller = new $controllerClass();
            $controller->execute($params);
        };

        return ['GET', $path, $callback];
    }
}
