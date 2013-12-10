
<!-- Object to work on -->
<h2>Toggle Style Class on Mouseout and Mouseover</h2>
<div class="example-live"><img class="not-over" id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>When the mouse enters the avatar then set the style class to the 'over' style class (solid blue) and when the mouse leaves set it to the 'not-over' style classes (dotted blue).</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Mouseover: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onMouseover: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'not-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;Mouseout: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onMouseout: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'not-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#avatar', {
			Mouseover: {
				onMouseover: {
					ReplaceClass: {
						removeClass: 'not-over',
						addClass: 'over'
					}
				}	
			},
			Mouseout: {
				onMouseout: {
					ReplaceClass: {
						removeClass: 'over',
						addClass: 'not-over'
					}
				}	
			}
		});
		
	});
</script>
