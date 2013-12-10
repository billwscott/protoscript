<!-- CLICK -->

<!-- Object to work on -->
<h2>Popup with Image</h2>
<div class="example-live"><img id="avatar" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>By clicking on the image we can show a popup. This popup will display an image (especially good for mockups). The image is chosen by setting the <strong>bd</strong> attribute to a URL that points to the image.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popup: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: 'about-bill',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width: '510px',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effect: {effect:YAHOO.widget.ContainerEffect.FADE, duration: 0.2},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hd: 'Bill Scott Yapping',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bd: 'http://farm1.static.flickr.com/46/113016311_39e40803ec.jpg',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ft: ''<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>

<!-- Object to work on -->
<h2>Popup with HTML Content</h2>
<div class="example-live"><img id="avatar-2" src="images/billavatar.jpg"/></div>
<div class="wide-instruction"><p>By clicking on the image we can show a popup. This popup will display some static content. The text is defined by setting the <strong>bd</strong> attribute to HTML text.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#avatar-2', {<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popup: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: 'static-content',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width: '300px',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effect: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effect:YAHOO.widget.ContainerEffect.FADE, duration: 0.2<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hd: 'Static Content',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bd: '&lt;p&gt;This is a paragraph of text. It starts in the previous sentence. It finishes at this period.&lt;/p&gt;&lt;p&gt;This is some &lt;strong&gt;bold text&lt;/strong&gt; and some &lt;em&gt;italic text&lt;/em&gt;.&lt;/p&gt;',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ft: ''<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});
</div>


<h2>Popup on Set of Elements</h2>
<div class="full-instruction"><p>Illustrates setting the content of the dialog to the content of another element on the page. The <strong>bdCopyFrom</strong> attribute is instead of the <strong>bd</strong> attribute to select the element to copy content from. Click on any title below to see a popup that displays the corresponding content.</p></div>
<div class="example-live">
	<div>
		<h3 class="header" id="title-1">
			Title One
		</h3>	
		<div class="content" style="clear: both;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam in augue. Aliquam auctor, felis ut nonummy vulputate, sapien justo consectetuer nisl, id ultricies velit sem in nibh.
		</div>
	</div>

	<div>
		<h3 class="header" id="title-2">
			Title Two
		</h3>	
		<div class="content" style="clear: both;">Pellentesque tempor. Donec dignissim, urna eget gravida varius, ipsum nisl blandit augue, eget tempus nibh felis non tortor. Etiam nec mi sed ante hendrerit venenatis.
		</div>
	</div>

	<div>
		<h3 class="header" id="title-3">
			Title Three
		</h3>	
		<div class="content" style="clear: both;">Duis cursus ullamcorper nulla. Proin nibh nisi, pretium eget, mattis ut, dictum eget, neque. Aliquam mi turpis, congue eget, rhoncus et, vehicula vel, sem. Curabitur mattis magna.
		</div>
	</div>

	<div>
		<h3 class="header" id="title-4">
			Title Four
		</h3>	
		<div class="content" style="clear: both;">Aenean bibendum sodales ipsum. Nullam placerat velit et justo. Nunc scelerisque. Suspendisse potenti. Donec massa. Nulla facilisis. Donec pulvinar consequat orci.
		</div>
	</div>
</div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('.header', {<br/>
&nbsp;&nbsp;SetStyle: {cursor: 'pointer'},<br/>
&nbsp;&nbsp;Click: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onClick: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popup: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: 'content-popup',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width: '510px',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effect: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effect:YAHOO.widget.ContainerEffect.FADE, duration: 0.2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hd: 'Content of Section',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bdCopyFrom: '.content',<br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ft: ''<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});
</div>



<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#avatar', {
			Click: {
				onClick: {
					Popup: {
						id: 'about-bill',
						width: '510px',
						effect: {effect:YAHOO.widget.ContainerEffect.FADE, duration: 0.2},
						hd: 'Bill Scott Yapping',
						bd: 'http://farm1.static.flickr.com/46/113016311_39e40803ec.jpg',
						ft: ''
					}
				}	
			}
		});

		$proto('#avatar-2', {
			Click: {
				onClick: {
					Popup: {
						id: 'static-content',
						width: '300px',
						effect: {effect:YAHOO.widget.ContainerEffect.FADE, duration: 0.2},
						hd: 'Static Content',
						bd: '<p>This is a paragraph of text. It starts in the previous sentence. It finishes at this period.</p><p>This is some <strong>bold text</strong> and some <em>italic text</em>.</p>',
						ft: ''
					}
				}	
			}
		});

		$proto('.header', {
			SetStyle: {cursor: 'pointer'},
			Click: {
				onClick: {
					Popup: {
						id: 'content-popup',
						width: '510px',
						effect: {effect:YAHOO.widget.ContainerEffect.FADE, duration: 0.2},
						hd: 'Content of Section',
						bdCopyFrom: '.content', // use the html of the related element (class=content) 
						ft: ''
					}
				}	
			}
		});
		
	});
</script>
