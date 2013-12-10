<!-- CLICK -->

<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>Click anywhere in the box to the left and the avatar will move (slide) into view. The image was positioned -95 pixels to the left and when a click occurs we move it to the right over 2/10 seconds by 95 pixels.</p><p>We set the <strong>oneTime</strong> attribute to true to keep the image from continuing to move to the right on subsequent clicks.</p><p> You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('.example-live', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;oneTime: true,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Move: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '#avatar',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;points: { by: [95, 0] },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>

<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('.example-live', {
			Click: {
				oneTime:true,
				onClick: {
					Move: {
						target: '#avatar',
						points: { by: [95, 0] },
						duration: 0.2
					}
				}	
			}
		});
		
	});
</script>
