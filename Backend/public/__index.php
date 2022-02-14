<?php

use DI\Container;
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../vendor/autoload.php';

// $container = new Container();

// AppFactory::setContainer($container);

// test commit

$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->setBasePath("/Comment_System/public/");

$app->get('', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello World!");
    return $response;
});
try {
    $app->run();     
} catch (Exception $e) {    
    // We display a error message
    die( json_encode(array("status" => "failed", "message" => "This action is not allowed"))); 
}

?>