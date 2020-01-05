<?php

namespace Controller;

class LabList extends AbstractController
{
    public static function execute($params)
    {
        $projects = \Model\Project\ProjectRepository::getAll(['is_lab' => 1, 'is_visible' => 1], true);
        $projectsName = array_map(function ($p) {return $p->getName();}, $projects);
        $metaHead = [
            'color' => '#333131',
            'title' => 'Léon Baudouin - Lab',
            'og_title' => 'Léon Baudouin - Lab',
            'description' => 'Bienvenue dans le Lab ! Ici, vous retrouverez des expérimentations ou des plus petits projets.',
            'og_description' => 'Bienvenue dans le Lab ! Ici, vous retrouverez des expérimentations ou des plus petits projets.',
            'thumbnail' => \Helper\UrlBuilder::getImagePath('labThumbnail.jpg', 'img', true),
        ];
        self::getRenderer()->render('lab-list.twig', ['projects' => $projects, 'projectsName' => $projectsName, 'metaHead' => $metaHead]);
    }
}
