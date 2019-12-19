<?php

namespace Controller;

class ProjectList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getAll(['is_lab' => 0, 'is_visible' => 1]);
        $projectsName = array_map(function($p) {return $p->getName();}, $projects);
        self::getRenderer()->render('project-list.twig', ['projects' => $projects, 'projectsName' => $projectsName]);
    }
}
