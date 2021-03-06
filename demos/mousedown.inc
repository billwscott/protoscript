<!-- CLICK -->

<!-- Object to work on -->
<h2>Fade &amp; Close on Mousedown</h2>
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>Here's an example that fades &amp; closes the image on the left when the user presses the mouse down on the avatar (different than a click which is a mousedown + mouseup). The protoscript below says: for an element with id set to <strong>avatar</strong>, fade it out when the user presses the mouse down on it and close it when the fade completes. You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Mousedown: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onMousedown: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {Close : {} },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#avatar', {
			Mousedown: {
				onMousedown: {
					Fade: {
						opacity: {to: 0},
						onComplete: {Close : {} }
					}
				}	
			}
		});
		
	});
</script>
