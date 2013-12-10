<!-- CLICK -->

<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>Key events are generally a mess because of cross browser issues as well as scoping keys to specific elements. To keep it simple this example sets the target to the top level ('document'). We wait for the 'f' key to be pressed. When it is we switch the target to our image avatar and fade it out.</p><p>To see it in action, press the <strong>f</strong> key</p><p>You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('document', {<br/>
&nbsp;&nbsp;Keypress: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;key: 'd',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onKeypress: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'#avatar',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {Close : {} },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('document', {
			Keypress: {
				key: 'f',
				onKeypress: {
					Fade: {
						target:'#avatar',
						opacity: {to: 0},
						onComplete: {Close : {} }
					}
				}	
			}
		});
		
	});
</script>
