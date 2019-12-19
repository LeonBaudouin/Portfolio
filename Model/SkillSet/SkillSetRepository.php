<?php

namespace Model\SkillSet;

use \Model\Entity\AbstractRepository;
use \Model\Skill\Skill;
use \Model\Skill\SkillRepository;

class SkillSetRepository extends AbstractRepository
{
    const TABLE_NAME = 'skill_sets';
    
    const POPULATE_METHOD = [self::class, 'createAndAddSkills'];

    public static function createAndAddSkills(array $data)
    {
        $skillSet = SkillSetFactory::create($data);
        $skillSet->setSkills(SkillRepository::getAll(['skill_set' => $skillSet->getId(), 'is_visible' => 1]));
        return $skillSet;
    }
}
