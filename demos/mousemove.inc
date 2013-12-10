
<!-- Object to work on -->
<h2>Toggle Style Class on Mousemove</h2>
<div class="example-live"><img class="over" id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>When the mouse moves <strong>while</strong> over the avatar then toggle the style class back and forth between the 'over' and 'not-over' style classes (defined in demos.css). The effect is to turn the border back and forth between dashed and solid.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Mousemove: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onMousemove: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ToggleClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;styleClass: 'over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;otherStyleClass: 'not-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#avatar', {
			Mousemove: {
				onMousemove: {
					ToggleClass: {
						styleClass: 'over',
						otherStyleClass: 'not-over'
					}
				}	
			}
		});
		
	});
</script>
