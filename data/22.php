<?php
$r = $_POST;
$br = "<br>";

echo "examTitle: " . $r["examTitle"] . $br;
echo "examStartDate: " . $r["examStartDate"] . $br;
echo "examEndDate: " . $r["examEndDate"] . $br;
echo "examDuration: " . $r["examDuration"] . $br . $br;

echo "examinees:" . $br;
for($x=0;$x<count($r["examineeList"]);$x++){
 echo "#" . ($x+1) . " " .  $r["examineeList"][$x] . $br;
}

for($x=0;$x<count($r["questionBrand"]);$x++){
	echo $br . "#" . ($x + 1) . $br;
	echo "brand ID	: " . $r["questionBrand"][$x];
	echo " / level	: " . $r["questionLevel"][$x];
	echo "  / count: " . $r["questionCount"][$x] .$br;
}


?>