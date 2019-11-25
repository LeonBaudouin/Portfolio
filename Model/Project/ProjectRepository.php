<?php

namespace Model\Project;

use \Model\Entity\AbstractRepository;
use \Model\Skill\SkillRepository;

class ProjectRepository extends AbstractRepository
{
    const TABLE_NAME = 'projects';

    public static function getById($id)
    {
        $data = self::Select(['id' => $id]);
        if (empty($data)) {
            return null;
        }
        $project = ProjectFactory::create($data[0]);

        $skills = SkillRepository::getSkillsFromProject($project);
        $project->setSkills($skills);

        return $project;
    }

    public static function getAll()
    {
        $dataArray = self::Select();
        return array_map([self::class, 'createAndAddSkills'], $dataArray);
    }

    public static function getProjects($onlyFeatured = false)
    {
        $params = $onlyFeatured ? ['is_lab' => 0, 'is_featured' => 1] : ['is_lab' => 0];
        $dataArray = self::Select($params);
        return array_map([self::class, 'createAndAddSkills'], $dataArray);
    }

    public static function getLabs($onlyFeatured = false)
    {
        $params = $onlyFeatured ? ['is_lab' => 1, 'is_featured' => 1] : ['is_lab' => 1];
        $dataArray = self::Select($params);
        return array_map([self::class, 'createAndAddSkills'], $dataArray);
    }

    private static function createAndAddSkills(array $data)
    {
        $project = ProjectFactory::create($data);
        $project->setSkills(SkillRepository::getSkillsFromProject($project));
        return $project;
    }
}
