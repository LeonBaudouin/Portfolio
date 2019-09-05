<?php

namespace Controller;

class ProjectList extends AbstractController
{
    public static function execute($params)
    {
        $project = \Model\Project\ProjectRepository::getById(1);
        self::getRenderer()->render('project-list.twig');
    }
}
