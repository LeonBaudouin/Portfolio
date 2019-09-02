<?php

namespace Controller;

abstract class AbstractController implements ControllerInterface
{
    private static $renderer;

    public static abstract function execute(array $params);

    protected static function getRenderer()
    {
        if (!self::$renderer) {
            self::$renderer = new \Model\Renderer();
        }
        return self::$renderer;
    }
}
