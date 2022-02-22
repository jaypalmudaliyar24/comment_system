<?php

class Dbconnect {
    private $host = 'localhost';
    private $user = 'root';
    private $pass = '';
    private $dbname = 'database';
    private $conn;

    public function connect() {
        $this->conn = null;
        $conn_str = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
        try {
            $this->conn = new PDO($conn_str, $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
        }
        return $this->conn;
    }
}