<?php
class Institucion{
 
    // database connection and table name
    private $conn;
    private $table_name = "`TABLE 2`";
    private $campo = "`institucion`";
 
    // object properties
    public $institucion;
  
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
    function institucion(){
     
        // select all query
        $query = "SELECT DISTINCT 
                    ". $this->campo . "
                FROM  
                    ". $this->table_name . "
                ";

     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
    function institucionSearch($localidad, $region){
        $aux1= "`localidad`";
        $aux2= "`region`";
     //   echo "lol:" . $localidad;
 
        // select all query
        $query = "SELECT DISTINCT 
                    ". $this->campo . "
                FROM  
                    ". $this->table_name . "
                WHERE 
                    ". $aux1 . "
                    = 
                    ". $localidad . "
                AND
                    ". $aux2 . "
                    = 
                    ". $region . "
                ";

     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
       
    }

}