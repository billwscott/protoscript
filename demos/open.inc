<!-- CLICK -->

<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>Here's an example that opens an image on the left. Click inside the dashed box.</p><p> Afterwards, you can <a href="javascript:void(0);">click here</a> to close the image.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('.example-live', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open : {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '#avatar'<br/>
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
				onClick: {
					Open : {
						target: '#avatar'
					}
				}	
			}
		});
		$proto('a:contains(click here)', {
			Click: {
				onClick: {
					Close : {
						target:'#avatar'
					}
				}	
			}
		});
		
	});
</script>
