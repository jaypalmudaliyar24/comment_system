<?php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->setBasePath("/Comment_System/public/");

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Tutorial</title>
</head>
<body>
    <div class="container">
        This is my first php website
    </div>
    <?php
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
</body>
</html> 
