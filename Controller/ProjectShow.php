<?php

namespace Controller;

class ProjectShow extends AbstractController
{
    public static function execute($params)
    {
        $project = \Model\Project\ProjectRepository::getById($params['id']);
        $descriptions = \Model\Description\DescriptionRepository::getAll(['project_id' => $project->getId()], true);
        self::getRenderer()->render('project-show.twig', ['project' => $project, 'description' => $descriptions]);
    }
}
