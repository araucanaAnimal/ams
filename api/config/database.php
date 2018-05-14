<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    /*
        //conection Local

    private $db_name = "hernan";
    private $username = "vicente";
    private $password = "killua235435";
    public $conn;

    */
  
        //conection server

    private $db_name = "calendario";
    private $username = "root";
    private $password = "a0dd45a5d2e87270400b093196f162056350586c0918bdae";
    public $conn;


  
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>