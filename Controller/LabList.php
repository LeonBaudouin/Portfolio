<?php

namespace Controller;

class LabList extends AbstractController
{
    public static function execute($params)
    {
        require 'lab.html';
    }
}
