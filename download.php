<!doctype html public "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Protoscript - Download</title>
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

</head>
<body>

<div id="doc" class="yui-t7">
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
	<div class="yui-g">

<h2>Download</h2>
<ul>
	<li>The protoscript library: <a href="scripts/proto.js">proto.js</a></li>
	<li>The default behavior set: <a href="scripts/yui_proto.js">yui_proto.js</a></li>
</ul>

<h2>Default YUI Behavior Set</h2>


<p>Include the following in your page:</p>

<pre>

&lt;!-- YUI Library --&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;http://yui.yahooapis.com/2.5.1/build/utilities/utilities.js&quot;&gt;&lt;/script&gt; 
&lt;script type=&quot;text/javascript&quot; src=&quot;http://yui.yahooapis.com/2.5.1/build/container/container-min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;http://yui.yahooapis.com/2.5.1/build/selector/selector-beta-min.js&quot;&gt;&lt;/script&gt;

&lt;!-- Default Behavior Set - YUI --&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;scripts/yui_proto.js&quot;&gt;&lt;/script&gt;

&lt;!-- YUI CSS --&gt;
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;http://yui.yahooapis.com/2.5.1/build/reset-fonts-grids/reset-fonts-grids.css&quot;&gt;
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;http://yui.yahooapis.com/2.5.1/build/base/base-min.css&quot;&gt;
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;http://yui.yahooapis.com/2.5.1/build/container/assets/container.css&quot;&gt;
	
&lt;!-- Protoscript Library --&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;scripts/proto.js&quot;&gt;&lt;/script&gt;

</pre>

<h2>Code Repository - Subversion</h2>
<p>The code repository for protoscript is located at <a href="http://protoscript.googlecode.com/svn/trunk/" title="Google Code Protoscript Repository">googlecode</a></p>


<h2>Protoscripter Bookmarklet</h2>
<div>
<p>You can play with the current version of protoscript with the ProtoScripter Bookmarklet.</p>
	
<?php
	include 'bookmarklet.inc';
?>

</div>

		</div>

		</div>
	   <div id="ft"></div>
	</div>

<script>
	YAHOO.util.Event.onDOMReady( function() { 

		// // registers the jQuery Selector and the YUI behavior set
		// ProtoScript.Core.registerBehaviorSet($, YAHOO.protoscript);
		// $proto('img#avatar', {
		// 	Click: {},
		// 	onClick: {
		// 		Fade: {
		// 			opacity: {to: 0},
		// 			onComplete: {Close : {} },
		// 		}
		// 	}
		// });
		
	});
</script>

</body>

</html>
