<?php

namespace Controller;

class MainPage extends AbstractController
{
    public function execute($params)
    {
        $this->getRenderer()->render('index.twig');
    }
}
