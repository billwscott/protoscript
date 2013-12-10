<!-- CLICK -->

<!-- Object to work on -->
<div class="example-live">
	<div>
		<h3>
			<p class="header opened-title" id="title-1">Title One</p>
		</h3>	
		<div class="content" style="clear: both;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam in augue. Aliquam auctor, felis ut nonummy vulputate, sapien justo consectetuer nisl, id ultricies velit sem in nibh.
		</div>
	</div>

	<div>
		<h3>
			<p class="header opened-title" id="title-2">Title Two</p>
		</h3>	
		<div class="content" style="clear: both;">Pellentesque tempor. Donec dignissim, urna eget gravida varius, ipsum nisl blandit augue, eget tempus nibh felis non tortor. Etiam nec mi sed ante hendrerit venenatis.
		</div>
	</div>

	<div>
		<h3>
			<p class="header opened-title" id="title-3">Title Three</p>
		</h3>	
		<div class="content" style="clear: both;">Duis cursus ullamcorper nulla. Proin nibh nisi, pretium eget, mattis ut, dictum eget, neque. Aliquam mi turpis, congue eget, rhoncus et, vehicula vel, sem. Curabitur mattis magna.
		</div>
	</div>

	<div>
		<h3>
			<p class="header opened-title" id="title-4">Title Four</p>
		</h3>	
		<div class="content" style="clear: both;">Aenean bibendum sodales ipsum. Nullam placerat velit et justo. Nunc scelerisque. Suspendisse potenti. Donec massa. Nulla facilisis. Donec pulvinar consequat orci.
		</div>
	</div>
</div>
<div class="clrfix"></div>
<div class="full-instruction"><p>With the ToggleShowHide you can toggle opening and closing elements. In this example, we target the header of each content area ('.header'). The style for the cursor is set to the pointer and a Click event is set for it. On the click, we switch out a style class (with ToggleClass) that flips the open/close icon. </p><p>Finally, we target the content ('.content') and perform the ToggleShowHide behavior (which will switch the display of the content area from open/close).</p></div>

<!-- Example Code -->
<div class="example-code">
$proto('.header', {<br/>
&nbsp;&nbsp;SetStyle: {cursor: 'pointer'},<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ToggleClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;styleClass: 'closed-title',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;otherStyleClass: 'opened-title'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ToggleShowHide: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '.content'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('.header', {
			SetStyle: {cursor: 'pointer'},
			Click: {
				onClick: {
					ToggleClass: {
						styleClass: 'closed-title',
						otherStyleClass: 'opened-title'
					},
					ToggleShowHide: {
						target: '.content'
					}
				}	
			}
		});
		
	});
</script>
