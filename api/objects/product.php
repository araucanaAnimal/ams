<?php
class Product{
 
    // database connection and table name
    private $conn;
    private $table_name = "`TABLE 2`";
 
    // object properties
    public $id;
    public $institución;
    public $fecha;
    public $localidad;
    public $hora_desde;
    public $hora_hasta;
    public $ubicacion;
    public $responsable;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
        // read products
    function read(){
        // select all query
        $query = "SELECT * FROM " . $this->table_name . " "   ;
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
    function datosRegion($getRegion,$getDia,$getMes,$getYear){
        $aux= "`region`";
        $aux11= "`mes`";
        $aux12= "`year`";
        $aux13= "`dia`";

        //echo "lol:" . $getLocalidad;
 
        // select all query
        $query = "SELECT *
                FROM  
                    ". $this->table_name . "
                WHERE 
                    ". $aux . "
                    = 
                    ". $getRegion . "
                AND
                    ". $aux11 . "
                    = 
                    ". $getMes . "
                AND
                    ". $aux12 . "
                    = 
                    ". $getYear . "
                AND
                    ". $aux13 . "
                    = 
                    ". $getDia . "
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute(); 
        return $stmt;
       
    }

    function datosLocalidadRegion($getRegion, $getLocalidad,$getDia,$getMes, $getYear){
        $aux= "`localidad`";
        $aux2= "`region`";
        $aux11= "`mes`";
        $aux12= "`year`";
        $aux13= "`dia`";
        // select all query
        $query = "SELECT *
                FROM  
                    ". $this->table_name . "
                WHERE 
                    ". $aux . "
                    = 
                    ". $getLocalidad . "
                AND
                    ". $aux2 . "
                    = 
                    ". $getRegion . "
                AND
                    ". $aux11 . "
                    = 
                    ". $getMes . "
                AND
                    ". $aux12 . "
                    = 
                    ". $getYear . "
                AND
                    ". $aux13 . "
                    = 
                    ". $getDia . "
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute(); 
        return $stmt;
       
    }
    function datosLocalidadInstitucionRegion($getRegion, $getLocalidad,$getInstitucion,$getDia,$getMes,$getYear){
        $aux= "`localidad`";
        $aux2= "`institucion`";
        $aux3= "`region`";
        $aux11= "`mes`";
        $aux12= "`year`";
        $aux13= "`dia`";

        // select all query
        $query = "SELECT *
                FROM  
                    ". $this->table_name . "
                WHERE 
                    ". $aux . "
                    = 
                    ". $getLocalidad . "
                AND 
                    ". $aux2 . "
                    = 
                    ". $getInstitucion . "
                AND
                    ". $aux3 . "
                    = 
                    ". $getRegion . "
                AND
                    ". $aux11 . "
                    = 
                    ". $getMes . "
                AND
                    ". $aux12 . "
                    = 
                    ". $getYear . "
                AND
                    ". $aux13 . "
                    = 
                    ". $getDia . "
                ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute(); 
        return $stmt;
       
    }
    function datosLocalidadInstitucionFechaRegion($getRegion,$getLocalidad,$getInstitucion,$getDia,$getMes,$getYear){
        $aux= "`localidad`";
        $aux2= "`institucion`";
        $aux3= "`dia`";
        $aux4= "`region`";
        $aux11= "`mes`";
        $aux12= "`year`";
        $aux13= "`dia`";

        // select all query
        $query = "SELECT *
                FROM  
                    ". $this->table_name . "
                WHERE 
                    ". $aux . "
                    = 
                    ". $getLocalidad . "
                AND 
                    ". $aux2 . "
                    = 
                    ". $getInstitucion . "
                AND 
                    ". $aux3 . "
                    = 
                    ". $getDia . "
                AND 
                    ". $aux4 . "
                    = 
                    ". $getRegion . "
                AND
                    ". $aux11 . "
                    = 
                    ". $getMes . "
                AND
                    ". $aux12 . "
                    = 
                    ". $getYear . "
                AND
                    ". $aux13 . "
                    = 
                    ". $getDia . "
                ";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute(); 
        return $stmt;      
    }


}