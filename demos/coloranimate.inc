<!-- ColorAnimate -->


<h2>Animating Color</h2>
<div class="example-live"><div id="box-target"><p>Click Me!</p></div></div>
<div class="wide-instruction"><p>Here's an example that fades &amp; closes the image on the left when the user clicks on it. (It's live, so go ahead and try it!). The protoscript below says: for an element with id set to <strong>avatar</strong>, fade it out when the user clicks on it and close it when the fade completes. You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#box-target',&nbsp;{<br/>
&nbsp;&nbsp;Click:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ColorAnimate:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backgroundColor:&nbsp;{&nbsp;from:'#fff',&nbsp;to:&nbsp;'#FEF59B'&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;borderTopColor:&nbsp;{&nbsp;from:'#2F6FAB',&nbsp;to:&nbsp;'#b3f'&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;borderLeftColor:&nbsp;{&nbsp;from:'#2F6FAB',&nbsp;to:&nbsp;'#b3f'&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;borderRightColor:&nbsp;{&nbsp;from:'#2F6FAB',&nbsp;to:&nbsp;'#b3f'&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;borderBottomColor:&nbsp;{&nbsp;from:'#2F6FAB',&nbsp;to:&nbsp;'#b3f'&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration:&nbsp;0.5,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onStart:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ColorAnimate:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:&nbsp;"#box-target&nbsp;p",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;{&nbsp;from:'#000',&nbsp;to:&nbsp;'#888'&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Animate:&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:&nbsp;"#box-target&nbsp;p",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontSize:&nbsp;{to:&nbsp;18,&nbsp;unit:&nbsp;'px'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>

<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
	
		$proto('#box-target', {
			Click: {
				onClick: {
				   ColorAnimate: {
						backgroundColor: { from:'#fff', to: '#FEF59B' },
						borderTopColor: { from:'#2F6FAB', to: '#b3f' },
						borderLeftColor: { from:'#2F6FAB', to: '#b3f' },
						borderRightColor: { from:'#2F6FAB', to: '#b3f' },
						borderBottomColor: { from:'#2F6FAB', to: '#b3f' },
				      duration: 0.5,
						onStart: {
						   ColorAnimate: {
								target: "#box-target p",
								color: { from:'#000', to: '#888' }
							},
							Animate: {
								target: "#box-target p",
								fontSize: {to: 18, unit: 'px'},
								duration: 0.5
							}
						}
				   }
				}
			}
		});
	});
</script>
