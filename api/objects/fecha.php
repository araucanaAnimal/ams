<?php
class Fecha{
 
    // database connection and table name
    private $conn;
    private $table_name = "`TABLE 2`";
    private $campo = "`dia`";
 
    // object properties
    public $fecha;

 
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
    function fechaRegion($region, $mes,$year){
       // echo "rg:". $region;
        $aux = "`REGION`";
        $aux22 = "mes";
        $aux23 = "year";

        // select all query
        $query = "SELECT DISTINCT 
                    ". $this->campo . "
                FROM  
                    ". $this->table_name . "

                WHERE
                    ". $aux . "
                    = 
                    ". $region . "
                AND
                    ". $aux22 . "
                    = 
                    ". $mes . "
                AND 
                     ". $aux23 . "
                    = 
                    ". $year . "
                ORDER by
                    ". $this->campo . "  
                ASC 
              
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
    function fechaRegionLocalidad($region, $localidad ,$mes,$year){
        $aux = "`REGION`";
        $aux2 = "`LOCALIDAD`";
        $aux22 = "mes";
        $aux23 = "year";
     
        // select all query
        $query = "SELECT DISTINCT 
                    ". $this->campo . "
                FROM  
                    ". $this->table_name . "

                WHERE
                    ". $aux . "
                    = 
                    ". $region . " 
                AND
                    ". $aux2 . "
                    = 
                    ". $localidad . "
                AND
                    ". $aux22 . "
                    = 
                    ". $mes . "
                AND 
                     ". $aux23 . "
                    = 
                    ". $year . "      
                ORDER by
                    ". $this->campo . "  
                ASC
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

      function fechaRegionLocalidadInstitucion($region, $localidad, $institucion,$mes,$year){
        $aux = "`REGION`";
        $aux2 = "`LOCALIDAD`";
        $aux3 = "`INSTITUCION`";
        $aux22 = "mes";
        $aux23 = "year";
     
        // select all query
        $query = "SELECT DISTINCT 
                    ". $this->campo . "
                FROM  
                    ". $this->table_name . "

                WHERE
                    ". $aux . "
                    = 
                    ". $region . " 
                AND
                    ". $aux2 . "
                    = 
                    ". $localidad . " 
                AND
                    ". $aux3 . "
                    = 
                    ". $institucion . "
                AND
                    ". $aux22 . "
                    = 
                    ". $mes . "
                AND 
                     ". $aux23 . "
                    = 
                    ". $year . "    
                ORDER by
                    ". $this->campo . "  
                ASC
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

}