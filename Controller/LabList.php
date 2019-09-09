<?php

namespace Controller;

class LabList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getLabs();
        self::getRenderer()->render('lab-list.twig', ['projects' => $projects]);
    }
}
