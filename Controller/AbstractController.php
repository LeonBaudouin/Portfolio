<?php

namespace Controller;

abstract class AbstractController implements ControllerInterface
{
    protected $renderer;

    public abstract function execute(array $params);

    protected function getRenderer()
    {
        if (!$this->renderer) {
            $this->renderer = new \Model\Renderer();
        }
        return $this->renderer;
    }
}
