<!-- HIDE -->
<h2>Hiding single element</h2>
<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>Click on the image to the left to hide it. We target '#avatar' the id of this image and associate a Click event that calls the Hide behavior.</p><p> You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hide: {} {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>
<h2>Hiding multiple elements</h2>
<!-- Object to work on -->
<div class="example-live">
	
	<h3>My Pix</h3>
	<div id="my-pix">
		<div>
			<img src="images/thumb_1.jpg" alt="scratch-1"/>
			<a href="javascript:void(0);" class="hide-control">Hide</a>
		</div>
		<div>
			<img src="images/thumb_2.jpg" alt="scratch-2"/>
			<a href="javascript:void(0);" class="hide-control">Hide</a>
		</div>
		<div>
			<img src="images/thumb_3.jpg" alt="scratch-3"/>
			<a href="javascript:void(0);" class="hide-control">Hide</a>
		</div>
		<div>
			<img src="images/thumb_4.jpg" alt="scratch-4"/>
			<a href="javascript:void(0);" class="hide-control">Hide</a>
		</div>
	</div>

	
</div>

<div class="wide-instruction"><p>Here we want to associate a click event with each of the 'Hide' links. So we target all the anchor tags that contain the word 'Hide' that are inside our my-pix example ('#my-pix a:contains(Hide))'. </p><p>Then when the onClick event is fired we change the selector to each of the DIVs that contain the image and the anchor link ('#my-pix div'). When you click on a Hide link it associates the related DIV and performs the Hide behavior on the correct element out of the set of elements.</p><p> You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hide: {} {<br/>
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
					Hide : {}
				}	
			}
		});
		$proto('#my-pix a:contains(Hide)', {
			Click: {
				onClick: {
					target: '#my-pix div',
					Hide : {}
				}	
			}
		});
		
	});
</script>
