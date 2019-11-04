<?php

namespace Controller;

class ProjectList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getProjects();
        $projectsName = array_map(function($p) {return $p->getName();}, $projects);
        self::getRenderer()->render('project-list.twig', ['projects' => $projects, 'projectsName' => $projectsName]);
    }
}
