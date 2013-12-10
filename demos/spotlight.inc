<!-- CLICK -->

<!-- Object to work on -->

<div class="example-live">This paragraph of text will be spotlighted when you <strong>click here</strong>. Spotlights are used to draw attention to a change that occurred in the interface or to draw the user's attention to a specific area of the interface.</div>
<div class="clrfix"></div>


<!-- Example Code -->
<div class="example-code">
$proto('.example-live', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spotlight:{}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('.example-live', {
			Click: {
				onClick: {
					Spotlight:{}
				}	
			}
		});
		
	});
</script>
