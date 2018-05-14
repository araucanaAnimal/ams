<?php
class Region{
 
    // database connection and table name
    private $conn;
    private $table_name = "`TABLE 2`";
    private $campo = "`region`";
 
    // object properties
    public $region;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
    function region($mes,$year){
        $aux = "mes";
        $aux2 = "year";
     
        // select all query
        $query = "SELECT DISTINCT 
                    ". $this->campo . "
                FROM  
                    ". $this->table_name . "
                WHERE 
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