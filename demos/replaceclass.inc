
<!-- Object to work on -->
<h2>ReplaceClass with Mouseout and Mouseover</h2>
<div class="example-live"><img class="not-over" id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>When the mouse enters the image replace the class 'not-over' with 'over'. When the mouse leaves the image replace the class 'over' with 'not-over'. These two classes switch between a dotted border and a solid blue border.</p></div>
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
