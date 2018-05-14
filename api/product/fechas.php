<?php

$localidad = $_GET['localidad'];
$region = $_GET['region'];
$institucion = $_GET['institucion'];
$mes = $_GET['mes'];
$year = $_GET['year'];


// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/fecha.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$fecha = new Fecha($db);
$stmt = "";

if ($region != null && $localidad == null && $institucion == null & $mes != null && $year != null ){
 $stmt = $fecha->fechaRegion($region,$mes,$year);   
}else if ($region != null && $localidad != null && $institucion == null & $mes != null && $year != null ){
 $stmt = $fecha->fechaRegionLocalidad($region, $localidad, $mes,$year);   
}else if ($region != null && $localidad != null && $institucion != null  & $mes != null && $year != null){
 $stmt = $fecha->fechaRegionLocalidadInstitucion($region, $localidad, $institucion, $mes,$year);   
}
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){

    // products array
    $products_arr=array();
    $products_arr["data"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $product_item=array(
            "dia" => $dia
        );
 
        array_push($products_arr["data"], $product_item);
    }
 
    echo json_encode($products_arr);
}
 
else{
    echo json_encode(
        array("message" => "No products found.")
    );
}

?>