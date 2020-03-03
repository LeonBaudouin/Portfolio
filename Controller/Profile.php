<?php

namespace Controller;

use Model\Course\CourseRepository;
use Model\SkillSet\SkillSet;
use Model\SkillSet\SkillSetRepository;

class Profile extends AbstractController
{
    public static function execute($params)
    {
        $skillSets = SkillSetRepository::getAll(['is_visible' => 1], true);
        $courses = CourseRepository::getAll(['is_visible' => 1]);
        $metaHead = [
            'color' => '#333131',
            'title' => 'Léon Baudouin - Profil',
            'og_title' => 'Léon Baudouin - Profil',
            'description' => 'Bonjour à tous, je suis Léon Baudouin, j’ai 20 ans. Je suis un développeur touche à tout mais surtout avide de création, motion designer à mes heures perdues.',
            'og_description' => 'Bonjour à tous, je suis Léon Baudouin, j’ai 20 ans. Je suis un développeur touche à tout mais surtout avide de création, motion designer à mes heures perdues.',
            'thumbnail' => \Helper\UrlBuilder::getImagePath('profileThumbnail.jpg', 'img', true),
        ];
        self::getRenderer()->render('profile.twig', ['skillSets' => $skillSets, 'courses' => $courses, 'metaHead' => $metaHead]);
    }
}
