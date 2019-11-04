<?php

namespace Controller;

class LabList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getLabs();
        $projectsName = array_map(function($p) {return $p->getName();}, $projects);
        self::getRenderer()->render('lab-list.twig', ['projects' => $projects, 'projectsName' => $projectsName]);
    }
}