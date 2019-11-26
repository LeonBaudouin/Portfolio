<?php

namespace Controller;

use Model\Course\CourseRepository;
use Model\SkillSet\SkillSet;
use Model\SkillSet\SkillSetRepository;

class Profile extends AbstractController
{
    public static function execute($params)
    {
        $skillSets = SkillSetRepository::getAll();
        $sort = function (
            SkillSet $a,
            SkillSet $b
        ) {
            if ($a->getOrder() == $b->getOrder()) {
                return 0;
            }
            return ($a->getOrder() < $b->getOrder()) ? -1 : 1;
        };

        usort($skillSets, $sort);

        $skillSets = array_filter($skillSets, function (Skillset $cur) {
            return $cur->getIsVisible();
        });

        $courses = CourseRepository::getAll();
        self::getRenderer()->render('profile.twig', ['skillSets' => $skillSets, 'courses' => $courses]);
    }
}
