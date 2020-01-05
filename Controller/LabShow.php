<?php

namespace Controller;

use Model\Project\ProjectRepository;
use Model\Description\DescriptionRepository;
use Model\Description\Description;
use Helper\UrlBuilder;
class LabShow extends AbstractController
{
    public static function execute($params)
    {
        $project = ProjectRepository::getById($params['id']);
        $descriptions = DescriptionRepository::getAll(['project_id' => $project->getId()], true);

        $isText = function(Description $description) {return $description->getType() === 'text';};
        $texts = array_filter($descriptions, $isText);
        $firstText = array_shift($texts);
        $isImage = function(Description $description) {return $description->getType() === 'image';};
        $images = array_filter($descriptions, $isImage);

        $metaHead = [
            'color' => '#333131',
            'title' => 'Léon Baudouin - ' . $project->getName(),
            'og_title' => 'Léon Baudouin - ' . $project->getName(),
            'description' => substr($firstText->getContent(), 0, 125) . '...',
            'og_description' => substr($firstText->getContent(), 0, 75) . '...',
            'thumbnail' => empty($images)
                        ? UrlBuilder::getImagePath('gallery/'.$project->getDesktopGalleryImage(), 'img', true)
                        : UrlBuilder::getImagePath('description/'.array_shift($images)->getContent(), 'img', true)
        ];

        self::getRenderer()->render('lab-show.twig', ['project' => $project, 'description' => $descriptions, 'metaHead' => $metaHead]);
    }
}