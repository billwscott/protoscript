<!-- CLICK -->

<h2>Setting Static HTML to Another Element</h2>
<div id="example-1" class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>By using the <strong>html</strong> attribute you can assign an element some HTML. It will replace the current HTML that is inside the element or elements you are targeting. </p><p>You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#example-1', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetHtml: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html: '&lt;p&gt;Image replaced&lt;br/&gt; by some &lt;br/&gt;&lt;strong&gt;bold text&lt;/strong&gt;&lt;/p&gt;'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>
<h2>Copying HTML from Another Element</h2>
<div id="example-2" class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div id="example-2-content" class="wide-instruction"><p>By using the <strong>htmlCopyFrom</strong> attribute you can copy HTML from another element. In this example we replace the image with this text.</p><p>You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#example-2', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetHtml: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;htmlCopyFrom: '#example-2-content'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/>
<br/></div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#example-1', {
			Click: {
				onClick: {
					SetHtml: {
						html: '<p>Image replaced<br/> by some <br/><strong>bold text</strong></p>'
					}
				}	
			}
		});
		$proto('#example-2', {
			Click: {
				onClick: {
					SetHtml: {
						htmlCopyFrom: '#example-2-content'
					}
				}	
			}
		});
		
	});
</script>
