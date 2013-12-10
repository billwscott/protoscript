<!-- Drag Drop -->

<h2>Drag from a Set to One Place</h2>
<div class="example-instruction"><p>Each of the images below has been set as draggable. They may be dropped into the 'Send It' dotted box below the images. </p><p>When you hover over an image you get a 'move' style cursor. Hovering over the drop area (Send It) will cause it to highlight it's border solid blue. </p><p>If you drop the image into the 'Send It' box:</p>
<ul>
<li>a copy of the image is displayed there</li>
<li>it flashes momentarily to let you know the drop happened</li>
<li>the original image fades to 50% (showing it has been sent)</li>
<li>and the dotted border is returned to the 'Send It' box</li>
</ul>
<p>You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>

<!-- Object to work on -->
<div class="example-live">
	
	<h3>My Pix</h3>
	<div id="my-pix">
		<img src="images/thumb_1.jpg" alt="scratch-1"/>
		<img src="images/thumb_2.jpg" alt="scratch-2"/>
		<img src="images/thumb_3.jpg" alt="scratch-3"/>
		<img src="images/thumb_4.jpg" alt="scratch-4"/>
		<img src="images/thumb_5.jpg" alt="scratch-5"/>
		<img src="images/thumb_6.jpg" alt="scratch-6"/>
		<img src="images/thumb_7.jpg" alt="scratch-7"/>
		<img src="images/thumb_8.jpg" alt="scratch-8"/>
		<img src="images/thumb_9.jpg" alt="scratch-9"/>
		<img src="images/thumb_10.jpg" alt="scratch-10"/>
		<img src="images/thumb_11.jpg" alt="scratch-11"/>
		<img src="images/thumb_12.jpg" alt="scratch-12"/>
	</div>
	
	<h3>Send It</h3>
	<div class="not-dragged-over" id="send-it">
		
	</div>	
	
</div>

<div><p>The code below is commented to show each step of the interaction described above.</p></div>
<!-- Example Code -->
<div class="example-code">
$proto('#my-pix img', {<br/>
<br/>
&nbsp;&nbsp;SetStyle: {cursor:'move'}, <em>//move cursor for each img</em><br/>
<br/>
&nbsp;&nbsp;DragDrop: {<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// set the dropTarget to our drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;dropTarget: '#send-it',<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// show blue border when over drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragEnter: { <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'not-dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// return to normal border when not over drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragOut: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'not-dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;when drop happens:</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;1) select the drop area as our target (behaviors now operate on it)</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;2) clone the dragged image into drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;3) signal the drop happened</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) flash the drop target (fade down/then back up)</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) dim the dragged image </em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;4) return the border of drop area to normal</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragDrop: {<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (1) target</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (2) copy</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetHtml: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;copyFrom: '$drag'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (3) flash &amp; fade</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0.5},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 1.0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'$drag',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade:{ opacity: {to:0.5}}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (4) unhighlight</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'not-dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>


<h2>Drag from a Set to Multiple Places (All Valid)</h2>
<div class="example-instruction"><p>Same story as before. This time we have multiple places we can drop them. Setting the dropTarget to a string with a comman-separated list of selectors allows us to create multiple drop zones.</p><p>You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>

<!-- Object to work on -->
<div class="example-live">
	
	<h3>My Pix</h3>
	<div id="my-pix-2">
		<img src="images/thumb_1.jpg" alt="scratch-1"/>
		<img src="images/thumb_2.jpg" alt="scratch-2"/>
		<img src="images/thumb_3.jpg" alt="scratch-3"/>
		<img src="images/thumb_4.jpg" alt="scratch-4"/>
		<img src="images/thumb_5.jpg" alt="scratch-5"/>
		<img src="images/thumb_6.jpg" alt="scratch-6"/>
		<img src="images/thumb_7.jpg" alt="scratch-7"/>
		<img src="images/thumb_8.jpg" alt="scratch-8"/>
		<img src="images/thumb_9.jpg" alt="scratch-9"/>
		<img src="images/thumb_10.jpg" alt="scratch-10"/>
		<img src="images/thumb_11.jpg" alt="scratch-11"/>
		<img src="images/thumb_12.jpg" alt="scratch-12"/>
	</div>
	
	<h3>Like It</h3>
	<div class="not-dragged-over" id="like-it"></div>	
	<h3>Love It</h3>
	<div class="not-dragged-over" id="love-it"></div>	
	
</div>

<div><p>The code below is commented to show each step of the interaction described above.</p></div>
<!-- Example Code -->
<div class="example-code">
$proto('#my-pix-2 img', {<br/>
<br/>
&nbsp;&nbsp;SetStyle: {cursor:'move'}, <em>//move cursor for each img</em><br/>
<br/>
&nbsp;&nbsp;DragDrop: {<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// set the dropTarget to our drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>dropTarget: '#like-it, #love-it',</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>interactionGroup: 'my-like-love-group',</strong><br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// show blue border when over drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragEnter: { <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'not-dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// return to normal border when not over drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragOut: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'not-dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;when drop happens:</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;1) select the drop area as our target (behaviors now operate on it)</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;2) clone the dragged image into drop area</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;3) signal the drop happened</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) flash the drop target (fade down/then back up)</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) dim the dragged image </em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>//&nbsp;&nbsp;&nbsp;4) return the border of drop area to normal</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragDrop: {<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (1) target</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (2) copy</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetHtml: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;copyFrom: '$drag'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (3) flash &amp; fade</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0.5},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 1.0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'$drag',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade:{ opacity: {to:0.5}}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// (4) unhighlight</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'not-dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/></div>



<h2>Drag from a Set to Multiple Places (Different Valid Spots)</h2>
<div class="example-instruction"><p>In this example, we still have multiple places we can drop our images. The difference this time is you can only drop pictures of people into the 'People' spot and pictures of things into the 'Things' spot.</p><p>This is accomplished by creating a more complex 'interactionGroup'. Instead of giving a single group name (interactionGroups match drag objects to drop areas) we provide a list of two interaction groups -- one for people; the other for things.</p><p>Each group has a name (the name of the interaction group), a set of dragTargets and dropTarget that belong in the same group. The four images that have a class name of 'people' get matched with the drop area whose id name is 'people' (not because they have the same name, but because of the mapping in the interactionGroup.)</p><p>Same thing happens for the pictures of things. The eight images that have a class name of 'things' get mapped to the drop area whose id name is 'things' (again due to the mapping not that we named the id &amp; class the same).</p><p>You can <a href="demos.php?demo=<?php echo $behName ?>">click here</a> to restart the example.</p></div>

<!-- Object to work on -->
<div class="example-live">
	
	<h3>My Pix</h3>
	<div id="my-pix-3">
		<img class="people" src="images/thumb_1.jpg" alt="scratch-1"/>
		<img class="people" src="images/thumb_2.jpg" alt="scratch-2"/>
		<img class="people" src="images/thumb_3.jpg" alt="scratch-3"/>
		<img class="people" src="images/thumb_4.jpg" alt="scratch-4"/>
		<img class="things" src="images/thumb_5.jpg" alt="scratch-5"/>
		<img class="things" src="images/thumb_6.jpg" alt="scratch-6"/>
		<img class="things" src="images/thumb_7.jpg" alt="scratch-7"/>
		<img class="things" src="images/thumb_8.jpg" alt="scratch-8"/>
		<img class="things" src="images/thumb_9.jpg" alt="scratch-9"/>
		<img class="things" src="images/thumb_10.jpg" alt="scratch-10"/>
		<img class="things" src="images/thumb_11.jpg" alt="scratch-11"/>
		<img class="things" src="images/thumb_12.jpg" alt="scratch-12"/>
	</div>
	
	<h3>People</h3>
	<div class="not-dragged-over" id="people"></div>	
	<h3>Things</h3>
	<div class="not-dragged-over" id="things"></div>	
	
</div>

<div><p>The code below is commented to show each step of the interaction described above.</p></div>
<!-- Example Code -->
<div class="example-code">
$proto('#my-pix-3 img', {<br/>
&nbsp;&nbsp;SetStyle: {cursor:'move'},<br/>
&nbsp;&nbsp;DragDrop: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;dropTarget: <strong>'#people, #things'</strong>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<em>// This allows us to wire up drag items with drop areas</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>interactionGroup: [</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// wire the people images and the people drop zone together</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>name: 'people-group',</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>dragTarget: '#my-pix-3 img.people',</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>dropTarget: '#people'</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>},</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>// wire the thing images and the thing drop zone together</em><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>name: 'things-group',</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>dragTarget: '#my-pix-3 img.things',</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>dropTarget: '#things'</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>}</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>]</strong>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragEnter: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'not-dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragOut: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'not-dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onDragDrop: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target: '$drop',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetHtml: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;copyFrom: '$drag'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 0.5},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity: {to: 1.0},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;duration: 0.1,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onComplete: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'$drag',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fade:{ opacity: {to:0.5}}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReplaceClass: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeClass: 'dragged-over',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addClass: 'not-dragged-over'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>

<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);

		$proto('#my-pix img', {
			SetStyle: {cursor:'move'},
			DragDrop: {
				dropTarget: '#send-it',
				interactionGroup: 'my-pix-group',
				
				onDragEnter: {
					target: '$drop',
					ReplaceClass: {
						removeClass: 'not-dragged-over',
						addClass: 'dragged-over'
					}
				},
				onDragOut: {
					target: '$drop',
					ReplaceClass: {
						removeClass: 'dragged-over',
						addClass: 'not-dragged-over'
					}
				},
				onDragDrop: {
					target: '$drop',
					SetHtml: {
						copyFrom: '$drag'
					},
					Fade: {
						opacity: {to: 0.5},
						duration: 0.1,
						onComplete: {	
							Fade: {
								opacity: {to: 1.0},
								duration: 0.1,
								onComplete: {
									target:'$drag',
									Fade:{ opacity: {to:0.5}}
								}
							}
						}
					},
					ReplaceClass: {
						removeClass: 'dragged-over',
						addClass: 'not-dragged-over'
					}
				}
			}
		});
		
		
		$proto('#my-pix-2 img', {
			SetStyle: {cursor:'move'},
			DragDrop: {
				dropTarget: '#like-it, #love-it',
				interactionGroup: 'my-like-love-group',
				// dropTarget: '#idcard-mini div.icon',
				
				onDragEnter: {
					target: '$drop',
					ReplaceClass: {
						removeClass: 'not-dragged-over',
						addClass: 'dragged-over'
					}
				},
				onDragOut: {
					target: '$drop',
					ReplaceClass: {
						removeClass: 'dragged-over',
						addClass: 'not-dragged-over'
					}
				},
				onDragDrop: {
					target: '$drop',
					SetHtml: {
						copyFrom: '$drag'
					},
					Fade: {
						opacity: {to: 0.5},
						duration: 0.1,
						onComplete: {	
							Fade: {
								opacity: {to: 1.0},
								duration: 0.1,
								onComplete: {
									target:'$drag',
									Fade:{ opacity: {to:0.5}}
								}
							}
						}
					},
					ReplaceClass: {
						removeClass: 'dragged-over',
						addClass: 'not-dragged-over'
					}
				}
			}
		});

		$proto('#my-pix-3 img', {
			SetStyle: {cursor:'move'},
			DragDrop: {
				dropTarget: '#people, #things',
				
				// This allows us to wire up drag items with drop areas
				interactionGroup: [
					// wire the people images and the people drop zone together
					{
						name: 'people-group',
						dragTarget: '#my-pix-3 img.people',
						dropTarget: '#people'
					},
					
					// wire the thing images and the thing drop zone together
					{
						name: 'things-group',
						dragTarget: '#my-pix-3 img.things',
						dropTarget: '#things'
					}
				],
				
				onDragEnter: {
					target: '$drop',
					ReplaceClass: {
						removeClass: 'not-dragged-over',
						addClass: 'dragged-over'
					}
				},
				onDragOut: {
					target: '$drop',
					ReplaceClass: {
						removeClass: 'dragged-over',
						addClass: 'not-dragged-over'
					}
				},
				onDragDrop: {
					target: '$drop',
					SetHtml: {
						copyFrom: '$drag'
					},
					Fade: {
						opacity: {to: 0.5},
						duration: 0.1,
						onComplete: {	
							Fade: {
								opacity: {to: 1.0},
								duration: 0.1,
								onComplete: {
									target:'$drag',
									Fade:{ opacity: {to:0.5}}
								}
							}
						}
					},
					ReplaceClass: {
						removeClass: 'dragged-over',
						addClass: 'not-dragged-over'
					}
				}
			}
		});
		
	});
</script>
