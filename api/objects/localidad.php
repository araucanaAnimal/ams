<?php
class Localidad{
 
    // database connection and table name
    private $conn;
    private $table_name = "`TABLE 2`";
    private $campo = "`localidad`";
 
    // object properties
    public $localidad;
  
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
    function localidad(){
     
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

    function localidadRegion($region,$mes,$year){
        $campo2= "`region`";
        $aux = "mes";
        $aux2 = "year";

     //   echo "lol:" . $localidad;
 
        // select all query
        $query = "SELECT DISTINCT 
                    ". $this->campo . "
                FROM  
                    ". $this->table_name . "
                WHERE 
                    ". $campo2 . "
                    = 
                    ". $region . "
                AND 
                    ". $aux . "
                    = 
                    ". $mes . "
                AND 
                    ". $aux2 . "
                    = 
                    ". $year . "    
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
}