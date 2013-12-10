<!-- CLICK -->

<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>The image will fade out after 4 seconds.</p><p> You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Timer: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;delay:4,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onTimer: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#avatar', {
			Timer: {
				delay:4,
				onTimer: {
					Fade: {
						opacity: {to: 0}
					}
				}	
			}
		});
		
	});
</script>
