<?php

namespace Model\SkillSet;

use \Model\Entity\AbstractRepository;
use \Model\Skill\Skill;
use \Model\Skill\SkillRepository;

class SkillSetRepository extends AbstractRepository
{
    const TABLE_NAME = 'skill_sets';

    public static function getById($id)
    {
        $data = self::Select(['id' => $id]);
        if (empty($data)) {
            return null;
        }

        $skillSet = SkillSetFactory::create($data);
        $skillSet->setSkills(SkillRepository::getSkillsFromSkillSet($skillSet));

        return $skillSet;
    }

    public static function getAll()
    {
        $dataArray = self::Select();

        $createSkillSetAndAddSkills = function ($data) {
            $skillSet = SkillSetFactory::create($data);
            $skills = array_filter(
                SkillRepository::getSkillsFromSkillSet($skillSet),
                function (Skill $cur) {
                    return $cur->getIsVisible();
                }
            );
            $skillSet->setSkills($skills);
            return $skillSet;
        };

        return array_map($createSkillSetAndAddSkills, $dataArray);
    }
}
