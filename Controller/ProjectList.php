<?php

namespace Controller;

class ProjectList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getAll(['is_lab' => 0, 'is_visible' => 1], true);
        $projectsName = array_map(function ($p) {return $p->getName();}, $projects);
        $metaHead = [
            'color' => '#333131',
            'title' => 'Léon Baudouin - Projets',
            'og_title' => 'Léon Baudouin - Projets',
            'description' => 'Bienvenue dans ma galerie de projet, sites web, creative dev, jeux vidéos, motion design,... vous pouvez cliquer sur n\'importe quel projet pour en voir les détails !',
            'og_description' => 'Bienvenue dans ma galerie de projet, sites web, creative dev, jeux vidéos, motion design,... vous pouvez cliquer sur n\'importe quel projet pour en voir les détails !',
            'thumbnail' => \Helper\UrlBuilder::getImagePath('projectThumbnail.jpg', 'img', true),
        ];
        self::getRenderer()->render('project-list.twig', ['projects' => $projects, 'projectsName' => $projectsName, 'metaHead' => $metaHead]);
    }
}
