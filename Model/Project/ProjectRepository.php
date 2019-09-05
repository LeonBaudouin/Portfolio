<?php

namespace Model\Project;

use \Model\Skill\SkillRepository;
use \Model\Entity\AbstractRepository;

class ProjectRepository extends AbstractRepository
{
    const TABLE_NAME = 'projects';

    public static function getById($id)
    {
        $data = self::Select(['id' => $id]);
        $project = ProjectFactory::create($data);

        $skills = SkillRepository::getSkillsFromProject($project);
        $project->setSkills($skills);

        return $project;
    }

    public static function getAll()
    {
        $dataArray = self::Select();
        return array_map([ProjectFactory::class, 'create'], $dataArray);
    }
}
