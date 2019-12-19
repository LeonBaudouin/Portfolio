<?php

namespace Controller;

class LabList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getAll(['is_lab' => 1, 'is_visible' => 1], true);
        $projectsName = array_map(function ($p) {return $p->getName();}, $projects);
        self::getRenderer()->render('lab-list.twig', ['projects' => $projects, 'projectsName' => $projectsName]);
    }
}
