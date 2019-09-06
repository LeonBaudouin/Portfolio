<?php

namespace Controller;

use Model\SkillSet\SkillSetRepository;
class Profile extends AbstractController
{
    public static function execute($params)
    {
        $skillSets = SkillSetRepository::getAll();
        self::getRenderer()->render('profile.twig', ['skillSets' => $skillSets]);
    }
}
