<?php

namespace Controller;

class ProjectShow extends AbstractController
{
    public static function execute($params)
    {
        $project = \Model\Project\ProjectRepository::getById($params['id']);
        $descriptions = \Model\Description\DescriptionRepository::getFromProject($project);

        $sort = function(
            \Model\Description\Description $a,
            \Model\Description\Description $b
        ) {
            if ($a->getOrder() == $b->getOrder()) {
                return 0;
            }
            return ($a->getOrder() < $b->getOrder()) ? -1 : 1;
        };

        usort($descriptions, $sort);
        self::getRenderer()->render('project-show.twig', ['project' => $project, 'description' => $descriptions]);
    }
}
