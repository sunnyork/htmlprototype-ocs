<?php

$n = rand(0,9);
$ar = array(
	"0"=>"未能刪除題目...blah blah(message from server-side)",
	"1"=>1
);
$result = ($n)>3?$ar[1]:$ar[0];//echo $ar[$n];
echo $result;

?>