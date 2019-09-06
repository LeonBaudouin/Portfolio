<?php

namespace Model\Skill;

use \Model\Entity\AbstractRepository;

class SkillRepository extends AbstractRepository
{
    const TABLE_NAME = 'skills';
    const PROJECT_RELATION_TABLE = 'projects_skills_relation';

    public static function getById($id)
    {
        $data = self::Select(['id' => $id]);
        if (empty($data)) {
            return null;
        }
        return SkillFactory::create($data);
    }

    public static function getAll()
    {
        $dataArray = self::Select();
        return array_map([SkillFactory::class, 'create'], $dataArray);
    }

    public static function getSkillsFromProject(
        \Model\Project\Project $project
    ) {
        $pdo = \Model\Connection::getConnection();
        $statement = $pdo->prepare('SELECT * FROM ' . self::TABLE_NAME . ' INNER JOIN ' . self::PROJECT_RELATION_TABLE . ' ON id = skill_id WHERE project_id = :id');
        $statement->execute(['id' => $project->getId()]);
        $dataArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        
        return array_map([SkillFactory::class, 'create'], $dataArray);
    }

    public static function getSkillsFromSkillSet(
        \Model\SkillSet\SkillSet $skillSet
    ) {
        $dataArray = self::Select(['skill_set' => $skillSet->getId()]);
        return array_map([SkillFactory::class, 'create'], $dataArray);
    }
}
