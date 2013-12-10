<!-- CLICK -->

<h2>Fade Down, then Back Up</h2>
<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>Here's an example that fades the image to 50% in 1 second, then fades back up to 100% (opaque) in 1/4 seconds. </p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
<em>// select the image with id='avatar'</em><br/>
$proto('#avatar', {<br/>
<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// when they click</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// fade it to 50% slowly</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0.5},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 1.0,<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// when that finishes, fade it back up to 100% quickly</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 1.0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.25<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		
		// select the image with id='avatar'
		$proto('#avatar', {
			Click: {
				
				// when they click
				onClick: {
					
					// fade it to 50% slowly
					Fade: {
						opacity: {to: 0.5},
						duration: 1.0,
						onComplete: {
							
							// when that finishes, fade it back up to 100% quickly
							Fade: {
								opacity: {to: 1.0},
								duration: 0.25
							}
						}
					}
				}	
			}
		});
		
	});
</script>
