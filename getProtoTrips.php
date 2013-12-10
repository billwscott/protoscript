<?php
header('Content-type: text/json; charset: UTF-8');
header('Cache-Control: must-revalidate');

require_once('JSON.php');

error_reporting(E_ALL);

import_request_variables("gp", "rvar_");

$request = "http://travel.yahooapis.com/TripService/V1.1/tripSearch?appid=openrico" . 
				"&query=" . urlencode($rvar_query) . 
				"&start=" . $rvar_start .
				"&results=" . $rvar_results .
				"&output=json";

// $request = "http://api.travel.yahoo.com/TripService/V1/tripSearch?appid=openrico" . 
// 				"&query=" . urlencode($rvar_query) . 
// 				"&start=" . $rvar_start .
// 				"&results=" . $rvar_results .
// 				"&output=json";

$ch = curl_init();
$timeout = 5; // set to zero for no timeout
curl_setopt ($ch, CURLOPT_URL, $request);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$json_response = curl_exec($ch);
curl_close($ch);

// return results
//echo $json_response;


 $json = new Services_JSON();
// 
// 
 $jsonObj = $json->decode($json_response);
 $result = $jsonObj->ResultSet->Result;


$resultSize = sizeof($result);
for ($idx = 0; $idx < $resultSize; $idx += 1) {
	$title = $result[$idx]->Title;
	$summary = $result[$idx]->Summary;
	$id = $idx + 1;
echo <<< TITLE
<div>
	<h3>
		<span style="float: left;" class="opened-title" id="title-{$id}">{$title}</span>
	</h3>
TITLE;

/*
	<div>
		<h3>
			<span style="float: left;" class="opened-title" id="title-{$id}">{$title}</span>
			<span style="float: right;">
				<a href="javascript:void(0);">view</a> | <a href="javascript:void(0);">delete</a>
			</span>
		</h3>

*/

echo <<< BODY
	<div style="clear: both;">{$summary}</div>
</div>
BODY;
}


// <div>
// 						<h3>
// 							<span style="float: left;" class="opened-title" id="title-1">Project One</span>
// 							<span style="float: right;">
// 								<a href="javascript:void(0);">view</a> | <a href="javascript:void(0);">delete</a>
// 							</span>
// 						</h3>
// 						<div style="clear: both;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin tempor, lectus aliquet ornare suscipit, diam turpis suscipit velit, rhoncus feugiat purus metus gravida turpis. Nam nisl. Nulla et est in neque laoreet consequat. Quisque quis pede. Curabitur pretium. Etiam varius. Suspendisse tempus nisl eu lectus. Integer et velit. Quisque quis magna. Nunc pellentesque pharetra ligula. Morbi semper.</div>
// 					</div>
?>









