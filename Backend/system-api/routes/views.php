<?php

use Dotenv\Repository\Adapter\WriterInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Selective\BasePath\BasePathMiddleware;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/db.php';

$app = AppFactory::create();

$app->addRoutingMiddleware();

$app->add(new BasePathMiddleware($app));

$app->addErrorMiddleware(true, true, true);

$app->get('/view/all', function (Request $req, Response $resp, array $args) {
    $table = "questionanswerdb";
    $sql = "SELECT * FROM " . ($table) . " WHERE pid = 0";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);

        $db = null;
        $resp->getBody()->write(json_encode($data));
        return $resp
            ->withStatus(200);
    } catch(PDOException $e) {
        $error = array (
            "message" => $e->getMessage()
        );

        $resp->getBody()->write(json_encode($error));
        return $resp
            ->withStatus(500); 
    }
})->setName('root');

$app->get('/view/{id}', function (Request $req, Response $resp, array $args) {
    $table = "questionanswerdb";
    $id = $args['id'];
    $sql = "SELECT * FROM " . $table . " WHERE id = $id";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);

        $db = null;
        $resp->getBody()->write(json_encode($data));
        return $resp 
            ->withStatus(200);
    } catch(PDOException $e) {
        $error = array (
            "message" => $e->getMessage()
        );

        $resp->getBody()->write(json_encode($error));
        return $resp 
            ->withStatus(500);
    }
})->setName('root');

$app->get('/view/{id}/answers', function (Request $req, Response $resp, array $args) {
    $table = "questionanswerdb";
    $id = $args['id'];
    $sql = "SELECT * FROM " . $table . " WHERE pid = $id ORDER BY created ASC";
    // All data having id as there pid and sort them based on their time of insertion;
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);

        $db = null;
        $resp->getBody()->write(json_encode($data));
        return $resp 
            ->withStatus(200);
    } catch(PDOException $e) {
        $error = array (
            "message" => $e->getMessage()
        );

        $resp->getBody()->write(json_encode($error));
        return $resp 
            ->withStatus(500);
    }
})->setName('root');

$app->get('/view/{id}/comments', function(Request $req, Response $resp, array $args) {
    $table = "questionanswerdb";
    $id = $args['id'];
    $sql = "SELECT comments FROM " . $table . " WHERE id = $id";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);

        $db = null;
        $resp->getBody()->write(json_encode($data));
        return $resp 
            ->withStatus(200);
    } catch(PDOException $e) {
        $error = array (
            "message" => $e->getMessage()
        );

        $resp->getBody()->write(json_encode($error));
        return $resp 
            ->withStatus(500);
    }
})->setName('root');

$app->post('/adddata', function(Request $req, Response $resp, array $args) {
    $table = "questionanswerdb";
    $recievedData = $req->getParsedBody();
    $title = $recievedData['title'];
    $body = $recievedData['body'];
    $author = $recievedData['author'];
    $votes = 0;
    $comments = $recievedData['comments'];
    $level = $recievedData['level'];
    $deleted = 0;
    $pid = $recievedData['pid'];
    $sql = "INSERT INTO " . $table . " (title, body, votes, comments, author, level, deleted, pid) VALUE 
            (:title, :body, :votes, :comments, :author, :level, :deleted, :pid)";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':body', $body);
        $stmt->bindParam(':votes', $votes);
        $stmt->bindParam(':comments', $comments);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':level', $level);
        $stmt->bindParam(':deleted', $deleted);
        $stmt->bindParam(':pid', $pid);
        $result = $stmt->execute();

        $db = null;
        $resp->getBody()->write(json_encode($result));
        return $resp
            ->withStatus(200);
    } catch(PDOException $e) {
        $error = array (
            "message" => $e->getMessage()
        );

        $resp->getBody()->write(json_encode($error));
        return $resp
            ->withStatus(500);
    }
})->setName('root');
