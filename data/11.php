<?php
$eid = $_POST["exam-id"];
$n = rand(0,9);
$ar = array(
	"0"=>"更新失敗",
	"1"=>"更新成功"
);
$result = ($n)>4?$ar[1]:$ar[0];

/* ===================

本網頁模擬上傳結果only
最下面有輸出方式(alert上傳結果)

* =================== */

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <meta name="description" content=""> not necessary for inside site-->
  <link rel="icon" href="../favicon.ico">
  <title>考題管理 / Audatex Online Certification System v3.0</title>
  <link href="../css/bootstrap.min.css" rel="stylesheet">
  <link href="../css/ocs30.css" rel="stylesheet">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>

  <!-- <body> -->
<body>

  <!-- Modal / delete exam-->
  <div class="modal" id="modal-container" >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title text-danger" id="myModalLabel">刪除考題</h4>
        </div>
        <div class="modal-body">
          確認要刪除這個考題?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" id="modal-cancel" data-dismiss="modal">否</button>
          <button type="button" class="btn btn-primary" id="modal-confirm" data-dismiss="modal">是</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal / REPLACE exam -->
  <div class="modal" id="replace-container" >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title text-danger" id="myModalLabel">替換這個考題</h4>
        </div>
        <form action="11.php" method="post">
          <div class="modal-body">
            <input type="file" id="replace-file">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" id="replace-cancel" data-dismiss="modal">否</button>
            <button type="button" class="btn btn-primary" id="replace-confirm" data-dismiss="modal">是</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- header -->
  <header class="container-fluid">
    <div class="row">
      <h2 class="col-md-5 col-lg-4">
				<a href="../index.htm">
					<img src="../img/ocslogo.png" alt="Audatex OCS 3.0">
					<!-- inline var.: brand logo image -->
					車損評估考試系統
				</a>
			</h2>
      </nav>
      <div class="col-md-7 col-lg-8 head-sub">
        <div class="user-info">            
          <span class="user-name">
            <span>
            <img src="../img/user_avatar.gif" alt="Betichiang" title="login as Betichiang">Betichiang</span>
          </span><!-- inline var.: member avatar img -->
          <span class="user-status">
            <span>
						<a href="../">登出</a></span></span>
        </div>
        <ul class="navi">
          <li class="active"><a href="../11j.html">考題管理</a>
          </li>
          <li><a href="../12.html">輸入考題</a>
          </li>
          <li><a href="../13.html">新增考生</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <!-- end header -->

  <!-- content wrap -->
  <div class="main-wrap">
    <div class="container">

      <!-- breadcrumb & page title -->
      <nav class="col-lg-12">
        <ol class="row breadcrumb hidden-xs hidden-sm">
          <li><a href="../">首頁</a>
          </li>
          <li class="active">考題管理</li>
        </ol>
      </nav>
      <div class="row">
      	<h1 class="col-lg-12">考題管理</h1>
      </div>

      <!-- major content -->
      <!-- ************************************ content start from HERE ************************************ -->
      <div class="row">
        <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">
          <div class="input-group main-search">
            <input type="text" class="form-control" placeholder="請輸入關鍵字尋找試題" id="search-kw">
            <span class="input-group-addon ocs-search" id="go-search"></span>
          </div>          
        </div>
      </div>

      <div class="table-responsive">
    		<table class="table table-striped table-bordered table-responsive center-1 center-5">
    			<col width="5%">
    			<col width="15%">
    			<col width="50%">
    			<col width="10%">
    			<col width="20%">
    	
    			<thead>
    				<tr>
    					<th class="text-center">No.</th>
    					<th>考題ID</th>
    					<th>考題內容</th>
              <th>建立日期</th>
    					<th class="text-center">動作</th>
    				</tr>
    			</thead>
          <tbody id="row-init" class="hide">
            <tr class="default-info">
              <td colspan="5">
                <p class="text-center">
                  <strong>請輸入關鍵字進行查詢</strong>
                </p>
              </td>
            </tr>
          </tbody>
          <tbody class="hide" id="row-prototype">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace replace-exam" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete del-exam" title="刪除"><span class="sr-only">Delete</span></button>
              </td>    
            </tr>
          </tbody>
    			<tbody id="result-container">
    				<tr>
    					<td>1</td>
    					<td>a000001</td>
    					<td style="background:pink;">
    						<h1 style="color:#f55;">注意，這是假的畫面，不要在本頁操作!</h1>
    						<a  style="color:#f55;" href="../11j.html">&raquo;&raquo; 退回原頁面</a>

    					</td>
    					<td>2014/12/31</td>
    					<td>
    						<button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
    						<button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>2</td>
    					<td>a123456</td>
    					<td>麼重樣！說的運電班能無方來案便財積美聲此，影一也樣關銀這度，這文手眾南員再真音。</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>3</td>
    					<td>a000002</td>
    					<td>聯沒轉濟苦主也產到，的型可，有散要一已班那，之期話間大腳人：的中紅案去問物機、外為供濟</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>

    					</td>
    				</tr>
    				<tr>
    					<td>4</td>
    					<td>a123454</td>
    					<td>麼重樣！說的運電班能無方來案便財積美聲此，影一也樣關銀這度，這文手眾南員再真音。</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>5</td>
    					<td>b123456</td>
    					<td>聯沒轉濟苦主也產到，的型可，有散要一已班那，之期話間大腳人：的中紅案去問物機、外為供濟</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>6</td>
    					<td>z00001</td>
    					<td>麼重樣！說的運電班能無方來案便財積美聲此，影一也樣關銀這度，這文手眾南員再真音。</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>7</td>
    					<td>a144456</td>
    					<td>聯沒轉濟苦主也產到，的型可，有散要一已班那，之期話間大腳人：的中紅案去問物機、外為供濟</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>8</td>
    					<td>5500001</td>
    					<td>麼重樣！說的運電班能無方來案便財積美聲此，影一也樣關銀這度，這文手眾南員再真音。</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>9</td>
    					<td>a1ss55456</td>
    					<td>聯沒轉濟苦主也產到，的型可，有散要一已班那，之期話間大腳人：的中紅案去問物機、外為供濟</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    				<tr>
    					<td>10</td>
    					<td>ahgf456</td>
    					<td>麼重樣！說的運電班能無方來案便財積美聲此，影一也樣關銀這度，這文手眾南員再真音。</td>
    					<td>2014/12/31</td>
    					<td>
                <button type="button" class="btn btn-default btn-xs ocs-btn ocs-btn-replace" title="取代"><span class="sr-only">Replace</span></button>
                <button type="button" class="btn btn-default btn-xs delete-exam ocs-btn ocs-btn-delete" title="刪除" eid="a000001"><span class="sr-only">Delete</span></button>
    					</td>
    				</tr>
    			</tbody>
    		</table>
    	</div>
      <div class="text-center" id="pagination">
        <ul class="pagination">

        </ul>
        <ul class="pagination-src hide">
          <li title="前10頁">
            <a><span aria-hidden="true">&laquo;</span><span class="sr-only">前10頁</span></a>
          </li>
          <li>
            <a></a>
          </li>
          <li title="後10頁">
            <a><span aria-hidden="true">&raquo;</span><span class="sr-only">後10頁</span></a>
          </li>
        </ul>
      </div>
      <!-- end major content -->
    </div>
  </div>
  <!-- content wrap -->

  <script src="../js/jquery.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
  <!--<script src="../js/ie10-viewport-bug-workaround.js"></script>-->
  <script>
  <?php 
  	$msg = "var msg = '試題ID: ";
  	$msg .= $eid;
  	$msg .= " ";
  	$msg .= $result;
  	$msg .= "';";
  	echo $msg;
  ?>
  window.alert(msg);
  </script>  
</body>

</html>
