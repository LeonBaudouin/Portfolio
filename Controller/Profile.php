<?php

namespace Controller;

use Model\SkillSet\SkillSetRepository;
use Model\Course\CourseRepository;
class Profile extends AbstractController
{
    public static function execute($params)
    {
        $skillSets = SkillSetRepository::getAll();
        $courses = CourseRepository::getAll();
        self::getRenderer()->render('profile.twig', ['skillSets' => $skillSets, 'courses' => $courses]);
    }
}
