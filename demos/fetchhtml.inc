<!-- FetchHtml -->


<h2>Fetching Html with Ajax</h2>

<div class="wide-instruction"><p>Clicking on the blank content area below will make a call to the Yahoo! Trip Planner Web service. It does by calling a local REST service that calls the trip planner service and bundles up the results as HTML. FetchHtml will call a given URL using Ajax and take the resulting HTML and stuff it inside the selected target (in this case '#content-target').</p><p>In this example, we use a relative URL. FetchHtml currently only supports URLs from the same domain (an Ajax restriction).</p><p>You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>

<div class="example-live"><div id="content-target"><p>Click Me! Data will load here...</p></div></div>

<!-- Example Code -->
<div class="example-code">
$proto('#content-target', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;   FetchHtml: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url:'getProtoTrips.php?query=Amsterdam&amp;start=1&amp;results=4'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>

<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
	
		$proto('#content-target', {
			Click: {
				onClick: {
				   FetchHtml: {
						url: 'getProtoTrips.php?query=Amsterdam&start=1&results=4'
					}
				}
			}
		});
	});
</script>
