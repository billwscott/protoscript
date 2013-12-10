// Creates a simple gui that allows the user to enter the CSS query expression and 
// the protoscript config and execute it on the page

YAHOO.namespace("protoscript");

YAHOO.protoscript.UI = function() {
	// do some initialization
	var panel = null;
	
	return {
		save: function(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
			var cookie_string = name + "=" + escape ( value );

			if ( exp_y ) {
				var expires = new Date ( exp_y, exp_m, exp_d );
				cookie_string += "; expires=" + expires.toGMTString();
			}

			if ( path )
				cookie_string += "; path=" + escape ( path );

			if ( domain )
				cookie_string += "; domain=" + escape ( domain );

			if ( secure )
				cookie_string += "; secure";

			document.cookie = cookie_string;		
		},
		
	   	load: function(cookieName) {
			var results = document.cookie.match ( cookieName + '=(.*?)(;|$)' );
			if ( results )
				return ( unescape ( results[1] ) );
			else
				return null;
		},
		
		showUI: function() {
			this.panel.show();
		},
		
		createUI: function() {
			
			var priorSelectorVal = this.load("protoscript_selectorval");
			var priorScriptVal = this.load("protoscript_scriptval");
			
			this.panel = new YAHOO.widget.ResizePanel('prototype-ui', {
				fixedcenter: true,				
				close: true,
				draggable: true,
				underlay: 'shadow',
				model: false,
				x:100,
				width:'400px',
				visible: true,
				iframe:true
			});

			var innerHTML = '<div id="protoscripter">' + 
				'<div>' + 
					'<label>For elements matching:</label>' + 
					'<input id="the-query-field" type="text"/>' + 
					'<button id="find-elems">Find</button>' +
				'</div>' + 
				'<div style="clear:both;"></div>' + 
				'<div id="script-area">' + 
					'<label>Do the following:</label>' + 
					'<textarea id="the-script-field"></textarea>' + 
				'</div>' + 
				'<div style="clear:both;"></div>' + 
				'<button id="execute-script-button">Add Behaviors</button>' + 
			'</div>';
			
			this.panel.center = this.centerPanelY;
			this.panel.setHeader("Protoscripter");
			this.panel.setBody(innerHTML);
			this.panel.setFooter("");
			this.panel.render(document.body);
			this.panel.body.style.height =  400 + "px";
			this.panel.show();

			var yuv = YAHOO.util.Event;
			var yud = YAHOO.util.Dom;
			
			yud.get('the-query-field').value = priorSelectorVal || "";
			yud.get('the-script-field').value = priorScriptVal || "";
			
			var me = this;
			yuv.addListener('execute-script-button', 'click', function() {
				var selectorVal = yud.get('the-query-field').value;
				var protoscriptVal = yud.get('the-script-field').value;
				
				if(selectorVal.length > 0 && protoscriptVal.length > 0) {
					// trim leading whitespace
					protoscriptVal = protoscriptVal.replace(/\s*((\S+\s*)*)/, "$1");
					// add curly braces to wrap in case they left them off
					if(protoscriptVal.substr(0,1)!='{') {
						protoscriptVal = '{'+protoscriptVal+'}';
					}
					
					me.save("protoscript_selectorval", selectorVal);
					me.save("protoscript_scriptval", protoscriptVal);
					var psConfig;
					eval('psConfig=' + protoscriptVal);
					$proto(selectorVal, psConfig);
					
				}
			});

// this should work... try later...
			// $proto('#find-elems', {
			// 	Click:{},
			// 	onClick: {
			// 		Fade: {
			// 			target: selectorVal,
			// 			opacity: {to: 0.5},
			// 			duration: 0.1,
			// 			onComplete: {	
			// 				Fade: {
			// 					opacity: {to: 1.0},
			// 					duration: 0.1
			// 				}
			// 			}
			// 		}
			// 	}
			// });					

			yuv.addListener('find-elems', 'click', function() {
				var selectorVal = yud.get('the-query-field').value;
				
				if(selectorVal.length > 0) {
					// trim leading whitespace
					selectorVal = selectorVal.replace(/\s*((\S+\s*)*)/, "$1");
					$proto(selectorVal, {
						Fade: {
							opacity: {to: 0.5},
							duration: 0.1,
							onComplete: {	
								Fade: {
									opacity: {to: 1.0},
									duration: 0.1
								},
								SetStyle: {
									borderLeftWidth:'0px',
									borderLeftStyle:'none',
									borderTopWidth:'0px',
									borderTopStyle:'none',
									borderRightWidth:'0px',
									borderRightStyle:'none',
									borderBottomWidth:'0px',
									borderBottomStyle:'none'
								}
							}
						},
						SetStyle: {
							borderLeftWidth:'1px',
							borderLeftStyle:'solid',
							borderLeftColor:'red',
							borderTopWidth:'1px',
							borderTopStyle:'solid',
							borderTopColor:'red',
							borderRightWidth:'1px',
							borderRightStyle:'solid',
							borderRightColor:'red',
							borderBottomWidth:'1px',
							borderBottomStyle:'solid',
							borderBottomColor:'red'
						}
					});					
				}
			});

		},
		
		centerPanelY: function() {
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var viewPortWidth = YAHOO.util.Dom.getClientWidth();
			var viewPortHeight = YAHOO.util.Dom.getClientHeight();
			var elementWidth = this.element.offsetWidth;
			var elementHeight = this.element.offsetHeight;

// debugger;
			// Position gobbler horizontally IFF we resized the window so that the gobbler
			// would be cut off from view (extending beyond the right side)
			var pageRight = viewPortWidth + scrollX - 50;
			var gobblerRight = YAHOO.util.Dom.getX(this.element) + elementWidth + scrollX;
			if(gobblerRight > pageRight) {
				var gobblerLeft = (viewPortWidth-elementWidth) + scrollX - 50;
				this.element.style.left = parseInt(gobblerLeft,10) + "px";
			}

			// Position the gobbler vertically in the middle IFF the gobbler fits 
			// within the window vertically. If the gobbler is bigger than the height 
			// of the window, then just position it so that it is at the top of the page
			if(elementHeight <= viewPortHeight) {
				var top = (viewPortHeight / 2) - (elementHeight / 2) + scrollY;
				this.element.style.top = parseInt(top,10) + "px";
			} else {
				this.element.style.top = scrollY + "px";

			}

			// Move the gobbler
			this.syncPosition();
			this.cfg.refireEvent("iframe"); // need this?

		}
	};
}();

YAHOO.register("psbm", YAHOO.protoscript.UI, {version:"0.5.0", build:"1"});