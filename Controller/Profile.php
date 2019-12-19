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
        $courses = CourseRepository::getAll();
        self::getRenderer()->render('profile.twig', ['skillSets' => $skillSets, 'courses' => $courses]);
    }
}
