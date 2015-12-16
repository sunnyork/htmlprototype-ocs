<?php
$conf = $_GET;
$toPage = $conf["toPage"];
$obj1["pagination"]=array("current"=>$toPage,"startPage"=>1,"pagesLength"=>10,"finalPage"=>16);
$obj1["dataObj"]=array(
	"a12301"=>array(
		"desc"=>"lorem ipsum 1",
		"date"=>"2014/12/5"
	),
	"a12402"=>array(
	"desc"=>"lorem ipsum 2",
	"date"=>"2014/11/10"
	),
	"b12303"=>array(
	"desc"=>"alorem ipsum 3",
	"date"=>"2014/10/4"
	),
	"z13304"=>array(
	"desc"=>"l4orem ipsum 4",
	"date"=>"2014/3/23"
	),
	"z13305"=>array(
	"desc"=>"l4orem ipsum 5",
	"date"=>"2014/12/5"
	),
	"a12306"=>array(
	"desc"=>"lorem ipsum 6",
	"date"=>"2014/3/23"
	),
	"a12407"=>array(
	"desc"=>"lorem ipsum 7",
	"date"=>"2014/1/23"
	),
	"b12308"=>array(
	"desc"=>"alorem ipsum 8",
	"date"=>"2014/10/4"
	),
	"z13309"=>array(
	"desc"=>"l4orem ipsum 9",
	"date"=>"2014/3/23"
	),
	"z13310"=>array(
	"desc"=>"l4orem ipsum 10",
	"date"=>"2014/12/5"
	)
);
$obj2["pagination"]=array("current"=>$toPage,"startPage"=>11,"pagesLength"=>6,"finalPage"=>16);
$obj2["dataObj"]=array(
	"a23101"=>array(
		"desc"=>"lorem ipsum 101",
		"date"=>"2014/3/23"
	),
	"a24102"=>array(
	"desc"=>"lorem ipsum 102",
	"date"=>"2014/1/23"
	),
	"b23103"=>array(
	"desc"=>"alorem ipsum 103",
	"date"=>"2014/10/4"
	),
	"z13104"=>array(
	"desc"=>"l4orem ipsum 104",
	"date"=>"2014/3/23"
	),
	"z13105"=>array(
	"desc"=>"l4orem ipsum 105",
	"date"=>"2014/12/5"
	),
	"a13106"=>array(
	"desc"=>"lorem ipsum 106",
	"date"=>"2014/3/23"
	),
	"a24107"=>array(
	"desc"=>"lorem ipsum 107",
	"date"=>"2014/1/23"
	),
	"b13108"=>array(
	"desc"=>"alorem ipsum 108",
	"date"=>"2014/10/4"
	),
	"z13109"=>array(
	"desc"=>"l4orem ipsum 109",
	"date"=>"2014/3/23"
	),
	"z13110"=>array(
	"desc"=>"l4orem ipsum 110",
	"date"=>"2014/12/5"
	),
);

if($toPage > 10){
	echo json_encode($obj2);
}else {
	echo json_encode($obj1);
}


?>