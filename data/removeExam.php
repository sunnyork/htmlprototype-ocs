<?php
$conf = $_GET;
//$conf["isDel"]=false;
$n = rand(2,9);
//$conf["isDel"]=intval(substr($conf["eid"],-1))%$n; 
$conf["isDel"]=1;
//去掉eid第一個字母(英文)後取餘數N，故每N個會有一個餘0 (return false)
echo json_encode($conf);
?>