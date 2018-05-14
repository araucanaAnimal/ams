<?php
class Dia{
 
    // database connection and table name
    private $conn;
    private $table_name = "`calendario`";

    // object properties
    public $dia;
    
   
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
        // read products
    function diaMes($mes,$year){
       // echo "rg:". $region;
        $aux = "`mes`";
        $aux2 = "`year`";

        // select all query
        $query = "SELECT * FROM  
                    ". $this->table_name . "

                WHERE
                    ". $aux . "
                    = 
                    ". $mes. " 
                AND
                    ". $aux2 . "
                    = 
                    ". $year. " 
              
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
}