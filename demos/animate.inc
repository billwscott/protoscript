<!-- CLICK -->

<!-- Object to work on -->
<h2>Animating size</h2>
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>This shows how to animate the width &amp; height of an element. In this example, clicking on the image will cause it to grow by 10 pixels (in both dimensions) in about 1/10 seconds and then shrink back to original size in the same amount of time. You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('img#avatar',&nbsp;{<br/>
&nbsp;&nbsp;Click:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Animate:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;{by:&nbsp;10},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width&nbsp;:&nbsp;{by:&nbsp;10},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration:&nbsp;0.1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Animate:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;{by:&nbsp;-10},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width&nbsp;:&nbsp;{by:&nbsp;-10},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration:&nbsp;0.1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
	 $proto('#avatar', {
		Click: {
			onClick: {
			   Animate: {
			      height: {by: 10},
			      width : {by: 10},
			      duration: 0.1,
				   onComplete: {
					   Animate: {
					      height: {by: -10},
					      width : {by: -10},
					      duration: 0.1
						}
				   }
			   }
			}
		}
	 });	
	});
</script>
