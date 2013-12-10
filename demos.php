<?php
import_request_variables("gp", "r_");

if(!$r_demo) {
	$r_demo="Click";
}
$behName = $r_demo;
$behAction = strtolower($r_demo);
function get_demo_include($action) {
	return "demos/" . $action . ".inc";
}

?>

<!doctype html public "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Protoscript - <?php echo $behName ?> Behavior Demo</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<!-- YUI Library -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.5.1/build/utilities/utilities.js"></script> 
<script type="text/javascript" src="http://yui.yahooapis.com/2.5.1/build/container/container-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.5.1/build/selector/selector-beta-min.js"></script>

<!-- Default Behavior Set - YUI -->
<script  type="text/javascript" src="scripts/yui_proto.js"></script>
<script  type="text/javascript" src="scripts/proto.js"></script>

<!-- Testing bookmarklet -->
<!-- <script  type="text/javascript" src="scripts/psbm.js"></script> -->

<!-- YUI CSS -->
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.1/build/reset-fonts-grids/reset-fonts-grids.css">
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.1/build/base/base-min.css">
<!-- <link href="css/psbm.css" rel="stylesheet" type="text/css"> -->
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.1/build/container/assets/container.css">

<!-- Site CSS -->
<link href="css/yui.css" rel="stylesheet" type="text/css">
<link href="css/protoscript_site.css" rel="stylesheet" type="text/css">
<link href="css/demos.css" rel="stylesheet" type="text/css">

</head>
<body>

<div id="doc" class="yui-t1 demo">


	<div id="hd">
		<ul id="hmenu">
			<li class="first"><a href="index.php">Home</a></li>
			<li><a href="demos.php?demo=Click">Demos</a></li>
			<li><a href="http://docs.protoscript.com">Docs</a></li>
			<li><a href="download.php">Download</a></li>
			<li><a href="forum.php">Forum</a></li>
		</ul>
		<img src="images/logo.gif"/>		
	</div>


	<div id="bd">
		<div id="yui-main">
		    <div class="yui-b"><div class="yui-g"> 
				<div id="<?php echo $behAction ?>-demo">
					<a href="demos.php?demo=<?php echo $behName ?>">
						<h1>Demo of <?php echo $behName ?> Behavior</h1>
					</a>
					<?php
					include get_demo_include($behAction)
					?>

				  	<p>For a full description of this behavior see the <a href="http://docs.protoscript.com/YUI:<?php echo $behName ?>" alt="Wiki page for <?php echo $behName ?>"><?php echo $behName ?> Documentation Page</a>.</p>
				</div>
			</div></div>
		</div>	
		
		<div class="yui-b">
			<!-- YOUR NAVIGATION GOES HERE -->
			<h2>Behavior Demos</h2>
			<ul>
				<li><a href="demos.php?demo=Animate">Animate</a></li>	
				<li><a href="demos.php?demo=Blur">Blur</a></li>	
				<li><a href="demos.php?demo=Click">Click</a></li>	
				<li><a href="demos.php?demo=Close">Close</a></li>	
				<li><a href="demos.php?demo=ColorAnimate">ColorAnimate</a></li>	
				<li><a href="demos.php?demo=Dblclick">Dblclick</a></li>	
				<li><a href="demos.php?demo=DragDrop">DragDrop</a></li>	
				<li><a href="demos.php?demo=Fade">Fade</a></li>	
				<li><a href="demos.php?demo=FetchHtml">FetchHtml</a></li>	
				<li><a href="demos.php?demo=Focus">Focus</a></li>	
				<li><a href="demos.php?demo=Hide">Hide</a></li>	
				<li><a href="demos.php?demo=Keypress">Keypress</a></li>	
				<li><a href="demos.php?demo=Mousedown">Mousedown</a></li>	
				<li><a href="demos.php?demo=Mousemove">Mousemove</a></li>	
				<li><a href="demos.php?demo=Mouseout">Mouseout</a></li>	
				<li><a href="demos.php?demo=Mouseover">Mouseover</a></li>	
				<li><a href="demos.php?demo=Move">Move</a></li>	
				<li><a href="demos.php?demo=Open">Open</a></li>	
				<li><a href="demos.php?demo=Popup">Popup</a></li>	
				<li><a href="demos.php?demo=ReplaceClass">ReplaceClass</a></li>	
				<li><a href="demos.php?demo=Script">Script</a></li>	
				<li><a href="demos.php?demo=SetClass">SetClass</a></li>	
				<li><a href="demos.php?demo=SetHtml">SetHtml</a></li>	
				<li><a href="demos.php?demo=SetStyle">SetStyle</a></li>	
				<li><a href="demos.php?demo=Show">Show</a></li>	
				<li><a href="demos.php?demo=Spotlight">Spotlight</a></li>	
				<li><a href="demos.php?demo=Timer">Timer</a></li>	
				<li><a href="demos.php?demo=ToggleClass">ToggleClass</a></li>	
				<li><a href="demos.php?demo=ToggleOpenClose">ToggleOpenClose</a></li>	
				<li><a href="demos.php?demo=ToggleShowHide">ToggleShowHide</a></li>	
			</ul>
		</div> 
	</div>


   <div id="ft"></div>
</div>


</body>

</html>






