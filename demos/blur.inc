<!-- CLICK -->

<h2>Handling Blur for One Element</h2>
<!-- Object to work on -->
<div class="example-live"><label>Nickname:</label><input type="text" id="nickname" value="Turd Blossom"></div>
<div class="med-instruction"><p>When the user puts their focus inside (tabbing or clicking into the field) the input field (with id equal to 'nickname'), we 'bold' the text. When they 'blur' (input field loses focus) we change the font weight back to 'normal'.</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('#nickname',&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;Blur:&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onBlur:&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle:&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight:&nbsp;&nbsp;'normal'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;Focus:&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onFocus:&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle:&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight:&nbsp;&nbsp;'bold'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>

<h2>Handling Blur for Multiple Elements</h2>
<!-- Object to work on -->
<div class="example-live employee-form">
<form>
	<label>First Name:</label><input  type="text" id="first-name" value="Karl"/>
	<label>Last Name:</label><input  type="text" id="last-name" value="Rove"/>
	<label>Address:</label><input type="text" id="address" value="100 E. Pennsylvania Ave."/>
	<label>City:</label><input type="text" id="city" value="Washington"/>
	<label>State:</label><input type="text" id="state" value="DC"/>
</form>
</div>
<div class="med-instruction"><p>A very powerful concept within protoscript is the ability to manage behavior across a set of elements and their related elements.</p><p>Here we have a form with 5 input fields, each with their own label. </p><p>We select the blur/focus events for the input fields ('.employee-form input' means select all elements of type 'input' that are inside an element with class name 'employee-form).</p><p>We then target the corresponding labels ('employee-form label') for style changes (SetStyle).</p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('.employee-form input', {<br/>
&nbsp;&nbsp;Blur: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onBlur: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'.employee-form label',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight: 'normal',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color:'#000000'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;Focus: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onFocus: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'.employee-form label',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight: 'bold',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color:'#0000FF'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;<br/>
});<br/>
</div>




<h2>Changing Select Targets to Manipulate Related Elements Simultaneously</h2>
<!-- Object to work on -->
<div class="example-live employee-form-2">
<form>
	<label>First Name:</label><input  type="text" id="first-name" value="Karl"/>
	<label>Last Name:</label><input  type="text" id="last-name" value="Rove"/>
	<label>Address:</label><input type="text" id="address" value="100 E. Pennsylvania Ave."/>
	<label>City:</label><input type="text" id="city" value="Washington"/>
	<label>State:</label><input type="text" id="state" value="DC"/>
</form>
</div>
<div class="med-instruction"><p>Here we have a variation on the previous example.</p><p> In the outer SetStyles we target the labels (changing their fontWeight and text color with blur/focus). All behaviors implement a callback that is fired when the behavior executes. Notice we use SetStyle's onSetStyle callback. </p><p>Inside these callbacks we select a new target-- the input fields changing their fontWeight.</p><p> The result is when the user tabs into a field both the label and the input field are bolded and the label is also set to blue. When the user tabs out of an input field, the label and the input field are set back to a normal fontWeight.  </p></div>
<div class="clrfix"></div>

<!-- Example Code -->
<div class="example-code">
$proto('.employee-form-2 input', {<br/>
&nbsp;&nbsp;Blur: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onBlur: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'.employee-form-2 label',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight: 'normal',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color:'#000000',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onSetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'.employee-form-2 input',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight: 'normal'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;Focus: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;onFocus: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'.employee-form-2 label',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight: 'bold',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color:'#0000FF',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onSetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:'.employee-form-2 input',<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SetStyle: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight: 'bold'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;}<br/>
});<br/>
</div>


<script>
	YAHOO.util.Event.onDOMReady( function() { 
		// // registers the YUI Selector and the YUI behavior set
		ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
		$proto('#nickname', {
			Blur: {
				onBlur: {
					SetStyle: {
						fontWeight: 'normal'
					}
				}
			},
			Focus: {
				onFocus: {
					SetStyle: {
						fontWeight: 'bold'
					}
				}
			}
			
		});
		
		$proto('.employee-form input', {
			Blur: {
				onBlur: {
					SetStyle: {
						target:'.employee-form label,',
						fontWeight: 'normal',
						color:'#000000'
					}
				}
			},
			Focus: {
				onFocus: {
					SetStyle: {
						target:'.employee-form label',
						fontWeight: 'bold',
						color:'#0000FF'
					}
				}
			}
			
		});

		$proto('.employee-form-2 input', {
			Blur: {
				onBlur: {
					SetStyle: {
						target:'.employee-form-2 label',
						fontWeight: 'normal',
						color:'#000000',
						onSetStyle: {
							target:'.employee-form-2 input',
							SetStyle: {
								fontWeight: 'normal'
							}
						}
					}
				}
			},
			Focus: {
				onFocus: {
					SetStyle: {
						target:'.employee-form-2 label',
						fontWeight: 'bold',
						color:'#0000FF',
						onSetStyle: {
							target:'.employee-form-2 input',
							SetStyle: {
								fontWeight: 'bold'
							}
						}
					}
				}
			}
			
		});		
	});
</script>
