<?php

namespace Controller;

class ProjectList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getAll();
        self::getRenderer()->render('project-list.twig', ['projects' => $projects]);
    }
}
