<?php

namespace Controller;

class MainPage extends AbstractController
{
    public static function execute($params)
    {
        $labs = \Model\Project\ProjectRepository::getAll(['is_lab' => 1, 'is_featured' => 1]);
        $projects = \Model\Project\ProjectRepository::getAll(['is_lab' => 0, 'is_featured' => 1]);
        self::getRenderer()->render('index.twig', ['projects' => $projects, 'labs' => $labs]);
    }
}
