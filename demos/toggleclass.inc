
<!-- Object to work on -->
<h2>ToggleClass on Click</h2>
<div class="example-live"><img class="not-selected" id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>When the mouse is clicked on the avatar then toggle the style class back and forth between the 'selected' and 'not-selected' style classes. The effect is to turn a selection border on/off on each click.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ToggleClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;styleClass: 'selected',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;otherStyleClass: 'not-selected'<br/>
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
			Click: {
				onClick: {
					ToggleClass: {
						styleClass: 'selected',
						otherStyleClass: 'not-selected'
					}
				}	
			}
		});
		
	});
</script>
