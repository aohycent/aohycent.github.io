<?php
if (isset($_POST['q'])) {
	$q = $_POST['q'];
	header('Content-Type: application/json');
	$r = [
		'code'=>'200',
		'id'=>time()
	];
	echo json_decode($r, JSON_PRETTY_PRINT);
}
?>