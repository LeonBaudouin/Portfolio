<?php

namespace Model\Description;

use \Model\Entity\AbstractRepository;

class DescriptionRepository extends AbstractRepository
{
    const TABLE_NAME = 'descriptions';

    const POPULATE_METHOD = [DescriptionFactory::class, 'create'];
}