<?php

namespace Controller;

class MainPage extends AbstractController
{
    public static function execute($params)
    {
        $labs = \Model\Project\ProjectRepository::getLabs(true);
        $projects = \Model\Project\ProjectRepository::getProjects(true);
        self::getRenderer()->render('index.twig', ['projects' => $projects, 'labs' => $labs]);
    }
}
