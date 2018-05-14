<?php
$getLocalidad = $_GET['localidad'];
$getInstitucion = $_GET['institucion'];
$getDia = $_GET['dia'];
$getRegion = $_GET['region'];
$getYear = $_GET['year'];
$getMes = $_GET['mes'];

/*
echo "region:" . $getRegion;
echo "localidad:" . $getLocalidad;
echo "institucion:" . $getInstitucion;
echo "dia:" . $getDia;
echo "mes:" . $getMes;
echo "year:" . $getYear;
*/
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';


// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$product = new Product($db);
 
// query products
$stmt = $product->read();


if ( $getRegion != null && $getLocalidad == null && $getInstitucion == null && $getDia != null && $getMes != null && $getYear != null ){
   
    $stmt = $product->datosRegion($getRegion,$getDia,$getMes,$getYear);

}else if ($getRegion != null && $getLocalidad != null && $getInstitucion == null && $getDia != null && $getMes != null && $getYear != null){
    $stmt = $product->datosLocalidadRegion($getRegion, $getLocalidad,$getDia,$getMes, $getYear);
}else if ($getRegion != null && $getLocalidad != null && $getInstitucion != null && $getDia != null && $getMes != null && $getYear != null){
    $stmt = $product->datosLocalidadInstitucionRegion($getRegion, $getLocalidad,$getInstitucion,$getDia,$getMes,$getYear);
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
            "id" => $id,
            "institucion" => $institucion,
            "fecha" => $fecha,
            "localidad" => $localidad,
            "horaDesde" => $hora_desde,
            "horaHasta" => $hora_hasta,
            "ubicacion" => $ubicacion,
            "responsable" => $responsable
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