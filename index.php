<?php

require 'vendor/autoload.php';

$router = new AltoRouter();

$router->map( 'GET', '/', function($params) {
    require 'index.html';
});

$router->map( 'GET', '/profil', function($params) {
    require 'profil.html';
});

$router->map( 'GET', '/projects', function($params) {
    require 'projects.html';
});

$router->map( 'GET', '/lab', function($params) {
    require 'lab.html';
});

$match = $router->match();


if( is_array($match) && is_callable( $match['target'] ) ) {
    $function = $match['target'];
    $function($match['params']);
} else {
	header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}