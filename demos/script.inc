<!-- CLICK -->

<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>If you can't find a behavior to do what you want, you can always resort to writing JavaScript code directly. The Script behavior allows you to specify a script fragment with the <strong>javascript</strong> attribute. Here we call the YUI library to set the avatar (image to the left) to hide and then popup an alert.'</p><p>This is also useful for debugging a protoscript.</p><p> You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Script: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;javascript: 'YAHOO.util.Dom.setStyle("avatar", "display", "none");alert("done!");'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#avatar', {
			Click: {
				onClick: {
					Script: {
						javascript: 'YAHOO.util.Dom.setStyle("avatar", "display", "none");alert("done!");'
					}
				}	
			}
		});
		
	});
</script>
