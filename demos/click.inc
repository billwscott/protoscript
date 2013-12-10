<!-- CLICK -->

<h2>On Click, Fade &amp; Close</h2>

<!-- Object to work on -->
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>Here's an example that fades &amp; closes the image on the left when the user clicks on it. (It's live, so go ahead and try it!). The protoscript below says: for an element with id set to <strong>avatar</strong>, fade it out when the user clicks on it and close it when the fade completes. You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {Close : {} },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>

<h2>Handling Click for Multiple Elements</h2>

<!-- Object to work on -->
<div id="multiple" class="example-live">

<p>Files</p>
<ul>
	<li><span><strong>[X]</strong>&nbsp;&nbsp;</span><span>mystuff.tmp</span></li>
	<li><span><strong>[X]</strong>&nbsp;&nbsp;</span><span>bigfile.tmp</span></li>
	<li><span><strong>[X]</strong>&nbsp;&nbsp;</span><span>oldmovie.mov</span></li>
	<li><span><strong>[X]</strong>&nbsp;&nbsp;</span><span>scrap.txt</span></li>
</ul>
</div>


<div class="med-instruction"><p>Let&apos;s say you want to delete files from a list. You would like to embed the delete control with the filename. </p><p>You can target two sets of objects: delete controls and list of file names. </p><p>We select the '[X]' with 'span:contains([X])' and associate with it the hand cursor and click event. </p></div>
<div class="clrfix"><p>The Fade &amp; Close target the list of file names with '#multiple li' (all LI items in our multiple example). When you click on an individual delete control it knows the corresponding LI item and operates on it correctly. You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<!-- Example Code -->
<div class="example-code">
$proto('span:contains([X])', {<br/>
&nbsp;&nbsp;SetStyle: {cursor:'pointer'},<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '#multiple li',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {Close : {} },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;},<br/>
});<br/></div>

<h2>Delay with Click</h2>
<div class="example-live"><img id="avatar-2" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>By setting the 'delay' attribute you can delay the action. In this example we set the delay to be 2 seconds. You can use the <strong>delay</strong> attribute for any event behavior (e.g., Click, Dblclick, Mousedown, etc.)</p><p> You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar-2', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;delay: 2,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {Close : {} },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>

<h2>Click with Modifier Key</h2>
<div class="example-live"><img id="avatar-3" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>By setting the 'modifier' attribute you can require a modifier key be pressed when the event occurs. In this example we set the modifier to 'shift'. <strong>Hold down the Shift key and click on the image to start the script.</strong> </p><p>You can use the <strong>modifier</strong> attribute with any event behavior (e.g., Click, Dblclick, Mousedown, etc.)</p><p> You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar-3', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;modifier: 'shift',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {Close : {} },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>

<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#avatar', {
			Click: {
				onClick: {
					Fade: {
						opacity: {to: 0},
						onComplete: {Close : {} }
					}
				}	
			}
		});
		
		
		$proto('span:contains([X])', {
			SetStyle: {cursor:'pointer'},
			Click: {
				onClick: {
					Fade: {
						target: '#multiple li',
						opacity: {to: 0},
						onComplete: {Close : {} }
					}
				}	
			}
		});
		
		$proto('#avatar-2', {
			Click: {
				delay: 2,
				onClick: {
					Fade: {
						opacity: {to: 0},
						onComplete: {Close : {} }
					}
				}	
			}
		});
		$proto('#avatar-3', {
			Click: {
				modifier: 'shift',
				onClick: {
					Fade: {
						opacity: {to: 0},
						onComplete: {Close : {} }
					}
				}	
			}
		});
		
		
	});
</script>
