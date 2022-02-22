<?php
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

// $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '', function($req, $res) {
//     $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
//     return $handler($req, $res);
// });

$app->get('/tests/all', function (Request $req, Response $resp, array $args) {
    $sql = "SELECT * FROM test";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $test_data = $stmt->fetchAll(PDO::FETCH_OBJ);

        // echo $test_data;

        $db = null;
        $resp->getBody()->write(json_encode($test_data));
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

$app->get('/tests/{id}', function (Request $req, Response $resp, array $args) {
    $id = $args['id'];
    $sql = "SELECT * FROM test WHERE id = $id";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $test_data_single = $stmt->fetchAll(PDO::FETCH_OBJ);

        // echo $test_data_single;

        $db = null;
        $resp->getBody()->write(json_encode($test_data_single));
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

$app->post('/tests/add', function (Request $req, Response $resp, array $args) {
    $sent_params = $req->getParsedBody();
    $name = $sent_params['name'];
    $email = $sent_params['email'];
    $phone = $sent_params['phone'];
    $sql = "INSERT INTO test (name, email, phone) VALUE (:name, :email, :phone)";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $result = $stmt->execute();

        // echo $test_data_single;

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

$app->delete('/tests/delete/{id}', function (Request $req, Response $resp, array $args) {
    $id = $args['id'];
    $sql = "DELETE FROM test WHERE id = $id";
    try {
        $db = new Dbconnect();
        $conn = $db->connect();

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);

        // echo $test_data_single;

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