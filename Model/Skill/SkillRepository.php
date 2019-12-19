<?php

namespace Model\Skill;

use \Model\Entity\AbstractRepository;

class SkillRepository extends AbstractRepository
{
    const TABLE_NAME = 'skills';
    const PROJECT_RELATION_TABLE = 'projects_skills_relation';

    const POPULATE_METHOD = [SkillFactory::class, 'create'];

    public static function getSkillsFromProject(
        \Model\Project\Project $project
    ) {
        $pdo = \Model\Connection::getConnection();
        $statement = $pdo->prepare('SELECT * FROM ' . self::TABLE_NAME . ' INNER JOIN ' . self::PROJECT_RELATION_TABLE . ' ON id = skill_id WHERE project_id = :id');
        $statement->execute(['id' => $project->getId()]);
        $dataArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        
        return array_map(self::POPULATE_METHOD, $dataArray);
    }

    public static function getSkillsFromSkillSet(
        \Model\SkillSet\SkillSet $skillSet
    ) {
        $dataArray = self::Select(['skill_set' => $skillSet->getId()]);
        return array_map(self::POPULATE_METHOD, $dataArray);
    }
}
