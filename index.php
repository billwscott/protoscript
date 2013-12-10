<!doctype html public "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Protoscript - Home</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<!-- YUI Library -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.5.1/build/utilities/utilities.js"></script> 
<script type="text/javascript" src="http://yui.yahooapis.com/2.5.1/build/container/container-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.5.1/build/selector/selector-beta-min.js"></script>

<!-- Default Behavior Set - YUI --> 
<script type="text/javascript" src="scripts/yui_proto.js"></script>

<!-- Protoscript -->
<script type="text/javascript" src="scripts/proto.js"></script>

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

<style>
.not-dragged-over {
	border:2px solid transparent;
}
.dragged-over {
	border:2px solid blue;
}
div#tag-cloud {
	background-color:black;
	padding:10px;
}
div#tag-cloud p {
	margin:0px !important;
	padding:0px !important;
	font-size:18px;
	font-weight:normal;
	text-align:center;
	color:white;
}
div#tag-cloud a {
	color: white;
	text-decoration: none;
}
div#tag-cloud a:hover {
	color: white;
	text-decoration: underline;
}
</style>

</head>
<body>
	
	<div id="doc" class="yui-t7">
	   <div id="hd">
			<ul id="hmenu">
			<li class="first"><a href="index.php">Home</a></li>
			<li><a href="demos.php?demo=Click">Demos</a></li>
			<li><a href="http://docs.protoscript.com">Docs</a></li>
			<li><a href="download.php">Download</a></li>
			<li><a href="forum.html">Forum</a></li>
			</ul>
			<img src="images/logo.gif"/>		
		</div>
	   <div id="bd">
		<div class="yui-g">
	    <div class="yui-u first">
<div id="columnone">
			<!-- <h1>Protoscript - 0.0.1 - 08/03/2007</h1> -->
				<p>Protoscript is a simplified scripting language for creating Ajax style prototypes for the Web.  With Protoscript it's easy to bring interface elements to life. Simply connect them to behaviors and events to create complex interactions. </p>

<p>Here's an example that fades &amp; closes the image when the user clicks on it. (It's live, so go ahead and try it!)</p>
				<div id="idcard-mini" class="idmini clrfix">
				<div class="icon not-dragged-over"><img src="images/billavatar.jpg" id="avatar"/></div>
				<div class="desc">
						<div class="code">
$proto('img#avatar', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {Close : {} }<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});
						</div> 
				</div>
			   </div>

				<div class="clrfix"></div>

				<p>The protoscript above says: <em>for an image with id <strong>avatar</strong>, fade it out when the user clicks on it and close it when the fade completes</em>.</p>

				<p>By combining different behaviors with different elements and events you can create complex interactions without writing JavaScript.</p>

				<p>The current set of behaviors include:</p>
				<div id="tag-cloud">
				<p><a href="demos.php?demo=Animate" alt="Animate behavior">Animate</a> <a href="demos.php?demo=ColorAnimate" alt="ColorAnimate behavior">ColorAnimate</a> <a href="demos.php?demo=Fade" alt="Fade behavior">Fade</a> <a href="demos.php?demo=Move" alt="Move behavior">Move</a> <a href="demos.php?demo=Spotlight" alt="Spotlight behavior">Spotlight</a> <a href="demos.php?demo=Close" alt="Close behavior">Close</a> <a href="demos.php?demo=DragDrop" alt="DragDrop behavior">DragDrop</a> <a href="demos.php?demo=Hide" alt="Hide behavior">Hide</a> <a href="demos.php?demo=Open" alt="Open behavior">Open</a> <a href="demos.php?demo=Popup" alt="Popup behavior">Popup</a> <a href="demos.php?demo=ReplaceClass" alt="ReplaceClass behavior">ReplaceClass</a> <a href="demos.php?demo=Script" alt="Script behavior">Script</a> <a href="demos.php?demo=SetClass" alt="SetClass behavior">SetClass</a> <a href="demos.php?demo=SetStyle" alt="SetStyle behavior">SetStyle</a> <a href="demos.php?demo=Show" alt="Show behavior">Show</a> <a href="demos.php?demo=ToggleClass" alt="ToggleClass behavior">ToggleClass</a> <a href="demos.php?demo=ToggleOpenClose" alt="ToggleOpenClose behavior">ToggleOpenClose</a> <a href="demos.php?demo=ToggleShowHide" alt="ToggleShowHide behavior">ToggleShowHide</a> <a href="demos.php?demo=FetchHtml" alt="FetchHtml behavior">FetchHtml</a> <a href="demos.php?demo=SetHtml" alt="SetHtml behavior">SetHtml</a> <a href="demos.php?demo=Blur" alt="Blur behavior">Blur</a> <a href="demos.php?demo=Click" alt="Click behavior">Click</a> <a href="demos.php?demo=DblClick" alt="DblClick behavior">DblClick</a> <a href="demos.php?demo=Focus" alt="Focus behavior">Focus</a> <a href="demos.php?demo=Keypress" alt="Keypress behavior">Keypress</a> <a href="demos.php?demo=Mousedown" alt="Mousedown behavior">Mousedown</a> <a href="demos.php?demo=Mousemove" alt="Mousemove behavior">Mousemove</a> <a href="demos.php?demo=Mouseout" alt="Mouseout behavior">Mouseout</a> <a href="demos.php?demo=Mouseover" alt="Mouseover behavior">Mouseover</a> <a href="demos.php?demo=Mouseup" alt="Mouseup behavior">Mouseup</a> <a href="demos.php?demo=Timer" alt="Timer behavior">Timer</a></p>
				</div>
</div>
		  </div>
	    <div class="yui-u">
<div id="columntwo">
<img src="images/promo.gif"/>
<!-- <div id="droparea" style="height:200px;border:1px solid #B6CDE1;"></div> -->
<div>
	<p>You can play with the current version of protoscript with the ProtoScripter Bookmarklet.</p>
	
<?php
	include 'bookmarklet.inc';
?>

</div>


</div>
</div>
		</div>
	   <div id="ft">
	   	
	   </div>
	</div>	

<script>
	YAHOO.util.Event.onDOMReady( function() { 

		// registers the jQuery Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('img#avatar', {
			Click: {
				onClick: {
					Fade: {
						opacity: {to: 0},
						onComplete: {Close : {} }
					}
				}				
			}
		});
	});
</script>

</body>

</html>
