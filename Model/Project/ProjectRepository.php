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
        if (empty($data)) {
            return null;
        }
        $project = ProjectFactory::create($data);

        $skills = SkillRepository::getSkillsFromProject($project);
        $project->setSkills($skills);

        return $project;
    }

    public static function getAll()
    {
        $dataArray = self::Select();
        return array_map([self::class, 'createAndAddSkills'], $dataArray);
    }

    public static function getProjects()
    {
        $dataArray = self::Select(['is_lab' => 0]);
        return array_map([self::class, 'createAndAddSkills'], $dataArray);
    }

    public static function getLabs()
    {
        $dataArray = self::Select(['is_lab' => 1]);
        return array_map([self::class, 'createAndAddSkills'], $dataArray);
    }

    private static function createAndAddSkills(array $data)
    {
        $project = ProjectFactory::create($data);
        $project->setSkills(SkillRepository::getSkillsFromProject($project));
        return $project;
    }
}
