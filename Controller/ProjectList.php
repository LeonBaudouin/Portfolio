<?php

namespace Controller;

class ProjectList extends AbstractController
{
    public static function execute($params)
    {
        require 'projects.html';
    }
}
