<?php

$n = rand(0,1);
$ar = array(
	"0"=>"重發成功...blah blah(message from server-side)",
	"1"=>"重發失敗...blah blah(message from server-side)",
);
echo $ar[$n];

?>