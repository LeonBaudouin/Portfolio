<?php

namespace Model\Project;

use \Model\Entity\AbstractRepository;
use \Model\Skill\SkillRepository;

class ProjectRepository extends AbstractRepository
{
    const TABLE_NAME = 'projects';

    const POPULATE_METHOD = [self::class, 'createAndAddSkills'];

    public static function createAndAddSkills(array $data)
    {
        $project = ProjectFactory::create($data);
        $project->setSkills(SkillRepository::getSkillsFromProject($project));
        return $project;
    }
}
