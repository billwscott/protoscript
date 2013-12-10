YAHOO.namespace("protoscript");
/*
YAHOO.protoscript.Behaviors = [
{
   name:'Timer', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Click', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Blur', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Dblclick', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Focus', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keydown', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keypress', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keyup', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keydown', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mousedown', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mousemove', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mouseover', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mouseout', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mouseup', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Resize', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ToggleOpenClose', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ToggleClass', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Fade', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Move', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Close', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Resize', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Animate', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Spotlight', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'SetClass', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'SetStyle', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ReplaceClass', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Hide', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Show', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Script', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ToggleShowHide', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Open', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'InnerHtml', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'FetchHtml', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Popup', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'DragDrop', 
   attributes:[
      {name:'attr1', 'default':'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
}


];
*/
YAHOO.protoscript.Util = function() {
	
	return {
		handleAnimMoments: function(cfg, anim, currScope) {
			if(cfg.onStart) {
				anim.onStart.subscribe(function() {
					ProtoScript.Core.callBehaviors(cfg.onStart, currScope);			
				});
			}
			if(cfg.onTween) {
				anim.onTween.subscribe(function() {
					ProtoScript.Core.callBehaviors(cfg.onTween, currScope);			
				});
			}
			if(cfg.onComplete) {
				anim.onComplete.subscribe(function() {
					ProtoScript.Core.callBehaviors(cfg.onComplete, currScope);			
				});
			}
		}
	}
}();
YAHOO.protoscript.Ajax = function() {
   this.timeout = 60000; // 1 minute
};

YAHOO.protoscript.Ajax.prototype = {
   get: function(url, data, callback, args) {
      this.callback = callback;
      var that = this;
      this.showLoading();
      YAHOO.util.Connect.asyncRequest('GET', url, {
            success:that.onSuccess,
            failure:that.onFailure,
            argument:args,
            scope:that,
            timeout:this.timeout
      });
   },

   post: function(url, data, callback, args) {
      this.callback = callback;
      var that = this;
      this.showLoading();
      YAHOO.util.Connect.asyncRequest('POST', url, {
            success:that.onSuccess,
            failure:that.onFailure,
            argument:args,
            scope:that,
            timeout:this.timeout
      }, data);
   },

   formPost: function(url, frmId, callback, args) {
      this.callback = callback;
      var that = this;
	  if(!args || !args.noloading){
      	this.showLoading();
	  }
      YAHOO.util.Connect.setForm(frmId);
      YAHOO.util.Connect.asyncRequest('POST', url, {
            success:that.onSuccess,
            failure:that.onFailure,
            argument:args,
            scope:that,
            timeout:this.timeout
      });
   },

   showLoading: function() {
      //yros.Loading.show();
   },

   hideLoading: function() {
      //yros.Loading.hide();
   },

   onFailure: function(req) {
      var isCommunicationFailure = (req.status == 0 && req.statusText == 'communication failure') ? true : false;
	  var isAbort = (req.status == -1 && req.statusText == 'transaction aborted') ? true : false;
	  var isFailure = (isCommunicationFailure || isAbort) ? true : false;
	  this.showLoading();
   },

   onSuccess: function(req) {
      this.hideLoading();
      this.callback(req);
   }
};

YAHOO.protoscript.Timer = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Timer.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { 
		var scopeElems = currScope.elems;
		var behaviorCfg = this.cfg;
		
		//var behaviorName = behaviorCfg._name;
		// if there is an onTimer then set up the timer, otherwise no purpose
		if(behaviorCfg['onTimer']) {
			var onTimerElems = behaviorCfg['onTimer']._elems;

			// We will want to register a listener with each element individually.
			for(var i=0; i<scopeElems.length; i++) {
				var timerElem = scopeElems[i];
				var onTimerElem = [onTimerElems[i]]; // still will pass as an array of 1

				setTimeout(function(idx) {
					return function() {
						var scope = ProtoScript.Core.createScope(behaviorCfg['onTimer'], idx);
						ProtoScript.Core.callBehaviors(behaviorCfg['onTimer'], scope);
					};
				}(i), behaviorCfg.delay*1000);	
			}
		}	
	}
};

YAHOO.protoscript.Trigger = function(behaviorCfg, currScope, eventType) {
	var idx = currScope.idx;
	var scopeElems = currScope.elems;
	// console.log("Trigger of type:" + eventType);

	// Look up onXXX Callback. Get all behaviors listed in their and invoke on the 
	// event callback
	var behaviorName = behaviorCfg._name;
	behaviorCfg._eventCnt = 0;
	// var parentCfg = behaviorCfg._parentCfg;
	// if there is an onXXX then set up the listener, otherwise no purpose
	if(behaviorCfg['on'+behaviorName]) {
		var onTriggerElems = behaviorCfg['on'+behaviorName]._elems;
	
		// We will want to register a listener with each element individually.
		for(var i=0; i<scopeElems.length; i++) {
			var triggerElem = scopeElems[i];
			var onTriggerElem = [onTriggerElems[i]]; // still will pass as an array of 1
			YAHOO.util.Event.addListener(triggerElem, eventType, function(idx) {
				return function(e) {
					if(behaviorCfg.oneTime && behaviorCfg._eventCnt) {
						return;
					}
					var scope = ProtoScript.Core.createScope(behaviorCfg['on'+behaviorName], idx);
					if(ProtoScript.Core.isKeyMatch(e, behaviorCfg.modifier||behaviorCfg.key)) {
						if(behaviorCfg.delay && behaviorCfg.delay > 0) {
							setTimeout(function() {
								ProtoScript.Core.callBehaviors(behaviorCfg['on'+behaviorName], scope);
							}, behaviorCfg.delay*1000);
						} else {
							ProtoScript.Core.callBehaviors(behaviorCfg['on'+behaviorName], scope);
						}
					}
					behaviorCfg._eventCnt++;
				};
			}(i));	
		}
	}	
};

YAHOO.protoscript.Click = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Click.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'click');}
};


YAHOO.protoscript.Blur = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Blur.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'blur');}
};
YAHOO.protoscript.Dblclick = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Dblclick.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'dblclick');}
};
YAHOO.protoscript.Focus = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Focus.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'focus');}
};
YAHOO.protoscript.Keypress = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Keypress.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'keypress');}
};
YAHOO.protoscript.Mousedown = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Mousedown.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'mousedown');}
};
YAHOO.protoscript.Mousemove = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Mousemove.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'mousemove');}
};
YAHOO.protoscript.Mouseover = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Mouseover.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'mouseover');}
};
YAHOO.protoscript.Mouseout = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Mouseout.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'mouseout');}
};
YAHOO.protoscript.Mouseup = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Mouseup.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'mouseup');}
};

// YAHOO.protoscript.Resize = function(behaviorName, behaviorCfg) {
// 	this.init(behaviorName, behaviorCfg);
// };
// YAHOO.protoscript.Resize.prototype = {
// 	defaultCfg : {},
// 	init: function(behaviorName, behaviorCfg) {
// 		this.name = behaviorName;
// 		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
// 	},
// 	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'resize');}
// };
// onabort
// onchange
// onerror
// onselect
// onsubmit
// onload
// onunload

YAHOO.protoscript.ToggleOpenClose = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.ToggleOpenClose.prototype = {
	
	defaultCfg : {
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("ToggleOpenClose.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	// change to this?
	action: function(currScope) {
		var idx = currScope.idx;
		var scopeElems = currScope.elems;

		// console.log("ToggleOpenClose.action");
		// console.log("    scopeElems.length"+scopeElems.length);

		for(var i=0; i<scopeElems.length; i++) {
			var scopeElem = scopeElems[i];
			var currState = YAHOO.util.Dom.getStyle(scopeElem, "display");
	
			// CLOSE IT
			if(currState.toLowerCase() == "block") {
				YAHOO.util.Dom.setStyle(scopeElem, "display", "none");
			// OPEN IT
			} else {
				YAHOO.util.Dom.setStyle(scopeElem, "display", "block");
			}
		}
		if(this.cfg.onToggleOpenClose) {
			ProtoScript.Core.callBehaviors(this.cfg.onToggleOpenClose, currScope);
		}
		
	}
	
};

YAHOO.protoscript.ToggleClass = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.ToggleClass.prototype = {
	
	defaultCfg : {
		styleClass: null,
		otherStyleClass: null
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("ToggleClass.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	// change to this?
	action: function(currScope) {
		var idx = currScope.idx;
		var scopeElems = currScope.elems;

		// console.log("ToggleClass.action");
		// console.log("    scopeElems.length"+scopeElems.length);

		for(var i=0; i<scopeElems.length; i++) {
			var scopeElem = scopeElems[i];
			var setToNormal = YAHOO.util.Dom.hasClass(scopeElem, this.cfg.styleClass);

			if(setToNormal) {
				YAHOO.util.Dom.replaceClass(scopeElem, this.cfg.styleClass, this.cfg.otherStyleClass);			
			} else {
				YAHOO.util.Dom.replaceClass(scopeElem, this.cfg.otherStyleClass, this.cfg.styleClass);			
			}
			
		}
		if(this.cfg.onToggleClass) {
			ProtoScript.Core.callBehaviors(this.cfg.onToggleClass, currScope);
		}
		
		
	}
	
};

YAHOO.protoscript.Fade = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Fade.prototype = {
	
	defaultCfg : {
		opacity: { to: 0.0 },
		duration: 0.5,
		method: YAHOO.util.Easing.easeOut
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Fade.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var idx = currScope.idx;
		var scopeElems = currScope.elems;

		// console.log("Fade.action");
		// console.log("    scopeElems.length"+scopeElems.length);
		
		// var testArr = [];
		// 
		// for(var i=0; i<scopeElems.length; i++) {
		// 	testArr[i] = scopeElems[i];
		// }
		var animAttr = ProtoScript.Core.createAnimConfig(this.cfg);
		var anim = new YAHOO.util.Anim(scopeElems, 
					animAttr, this.cfg.duration, this.cfg.method);

		// Callbacks
		YAHOO.protoscript.Util.handleAnimMoments(this.cfg, anim, currScope);	
		
		anim.animate();
		
	}
	
};

YAHOO.protoscript.Move = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Move.prototype = {
	
	defaultCfg : {
		points: { by: [50, 0] },
		duration: 0.5,
		method: YAHOO.util.Easing.easeOut
	},
	
	init: function(behaviorName, behaviorCfg, idx) {
		// console.log("Move.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var idx = currScope.idx;
		var scopeElems = currScope.elems;

		var animAttr = ProtoScript.Core.createAnimConfig(this.cfg);
		var anim = new YAHOO.util.Motion(scopeElems, 
					animAttr, this.cfg.duration, this.cfg.method);

		// Callbacks
		YAHOO.protoscript.Util.handleAnimMoments(this.cfg, anim, currScope);	
		
		anim.animate();
		
	}
	
};

YAHOO.protoscript.Close = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Close.prototype = {
	
	defaultCfg : {
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Close.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var idx = currScope.idx;
		var scopeElems = currScope.elems;

		// console.log("Close.action");
		// console.log("    scopeElems.length"+scopeElems.length);
		
		YAHOO.util.Dom.setStyle(scopeElems, 'display', 'none');		
		
		if(this.cfg.onClose) {
			ProtoScript.Core.callBehaviors(this.cfg.onClose, currScope);
		}
	}
	
};

YAHOO.protoscript.Resize = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Resize.prototype = {
	// to: 100,
	// by: 100, //start at current, change by this much 
	// from: 100, //ignore current; start from this 
	// unit: 'em' //can be any legal numeric unit 
	defaultCfg : {
		width: null, 
		height: null,
		duration: 0.5,
		method: YAHOO.util.Easing.easeOut
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Resize.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var scopeElems = currScope.elems;

		var animAttr = ProtoScript.Core.createAnimConfig(this.cfg);
		var anim = new YAHOO.util.Anim(currScope.elems, 
					animAttr, this.cfg.duration, this.cfg.method);
					
		// Handle callbacks
		YAHOO.protoscript.Util.handleAnimMoments(this.cfg, anim, currScope);	
		anim.animate();
		
		if(this.cfg.onResize) {
			ProtoScript.Core.callBehaviors(this.cfg.onResize, currScope);
		}
	}
};

YAHOO.protoscript.Animate = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Animate.prototype = {
	defaultCfg : {
		borderWidth: null,
		bottom: null,
		fontSize: null,
		left: null,
		right: null,
		top: null,
		height: null,
		margin: null,
		opacity: null,
		lineHeight: null,
		padding: null,
		width: null,
				
		// time and method
		duration:        0.5,
		method: YAHOO.util.Easing.easeOut
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Animate.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {

		var animAttr = ProtoScript.Core.createAnimConfig(this.cfg);
		var anim = new YAHOO.util.Anim(currScope.elems, 
					animAttr, this.cfg.duration, this.cfg.method);

		// Handle Callbacks
		YAHOO.protoscript.Util.handleAnimMoments(this.cfg, anim, currScope);	
		anim.animate();
	}
	
};

YAHOO.protoscript.ColorAnimate = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.ColorAnimate.prototype = {
	defaultCfg : {				
		// color properties (to)
		color: null,
		backgroundColor: null,
		borderTopColor: null,
		borderRightColor: null,
		borderBottomColor: null,
		borderLeftColor: null,
		
		// time and method
		duration:        0.5,
		method: YAHOO.util.Easing.easeOut
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Animate.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {

		var animAttr = ProtoScript.Core.createAnimConfig(this.cfg);
		var anim = new YAHOO.util.ColorAnim(currScope.elems, 
					animAttr, this.cfg.duration, this.cfg.method);

		// Handle Callbacks
		YAHOO.protoscript.Util.handleAnimMoments(this.cfg, anim, currScope);	
		anim.animate();
	}
	
};


// changes background to a specified color (default yellow) for a 
// specified duration and then drops back to original color
YAHOO.protoscript.Spotlight = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Spotlight.prototype = {
	defaultCfg : {
		backgroundColor: '#FFFFFF',
		spotlightColor: '#FEF59B',
		// time and method
		duration:        3,
		method: YAHOO.util.Easing.easeOut
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Spotlight.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var scopeElems = currScope.elems;
		YAHOO.util.Dom.setStyle(scopeElems, 'backgroundColor', this.cfg.spotlightColor);
		var animAttr = { backgroundColor: {from: this.cfg.spotlightColor, to:this.cfg.backgroundColor} };
		anim = new YAHOO.util.ColorAnim(scopeElems, 
					animAttr, this.cfg.duration, this.cfg.method);
		
		// Handle Callbacks
		YAHOO.protoscript.Util.handleAnimMoments(this.cfg, anim, currScope);	
		anim.animate();
	}
};


YAHOO.protoscript.SetStyle = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};

YAHOO.protoscript.SetStyle.prototype = {
	defaultCfg : {
		// whatever is passed as a config use it to set style
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("SetStyle.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		for(var styleName in this.cfg) {
			var styleVal = this.cfg[styleName];
			YAHOO.util.Dom.setStyle(currScope.elems, styleName, styleVal);
		}
		if(this.cfg.onSetStyle) {
			ProtoScript.Core.callBehaviors(this.cfg.onSetStyle, currScope);
		}
	}
};


YAHOO.protoscript.SetClass = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};

YAHOO.protoscript.SetClass.prototype = {
	defaultCfg : {
		addClass: null
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("SetClass.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		YAHOO.util.Dom.addClass(currScope.elems, this.cfg.addClass||this.cfg.styleClass);
		if(this.cfg.onSetClass) {
			ProtoScript.Core.callBehaviors(this.cfg.onSetClass, currScope);
		}
	}
};

YAHOO.protoscript.ReplaceClass = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.ReplaceClass.prototype = {
	defaultCfg : {
		addClass: null,
		removeClass: null
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("ReplaceClass.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope, idx) {
		YAHOO.util.Dom.replaceClass(currScope.elems, this.cfg.removeClass||this.cfg.otherStyleClass, this.cfg.addClass||this.cfg.styleClass);
		if(this.cfg.onReplaceClass) {
			ProtoScript.Core.callBehaviors(this.cfg.onReplaceClass, currScope);
		}
	}
};

YAHOO.protoscript.Hide = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Hide.prototype = {	
	defaultCfg : {
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Hide.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		YAHOO.util.Dom.setStyle(currScope.elems, 'visibility', 'hidden');		
		if(this.cfg.onHide) {
			ProtoScript.Core.callBehaviors(this.cfg.onHide, currScope);
		}
	}

};

YAHOO.protoscript.Show = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Show.prototype = {	
	defaultCfg : {
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Show.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		YAHOO.util.Dom.setStyle(currScope.elems, 'visibility', 'visible');		
		if(this.cfg.onShow) {
			ProtoScript.Core.callBehaviors(this.cfg.onShow, currScope);
		}
	}
};

YAHOO.protoscript.Script = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Script.prototype = {	
	defaultCfg : {
		script: null
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Script.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		eval(this.cfg.javascript);
		if(this.cfg.onScript) {
			ProtoScript.Core.callBehaviors(this.cfg.onScript, currScope);
		}

	}
};

// --- CURRENTLY BROKEN
// YAHOO.protoscript.Toggle = function (parentBeh, behName) {
// 	this.init(parentBeh, behName);
// };
// YAHOO.protoscript.Toggle.prototype = {
// 	defaultCfg : {
// 	},
// 
// 	init: function(parentBeh, behName) {
// 		this.parent = parentBeh;
// 		this.name = behName;
// 		this.toggleStateOn = false;
// 		
// 	},
// 	
// 	action: function(cfg, behaviorTarget, triggerTarget) {
// 		cfg = ProtoScript.Core.applyConfig(this.defaultCfg, cfg);	
// 
// 		// Toggle it OFF
// 		if(this.toggleStateOn) {
// 			this.toggleStateOn = false;
// 			if(this.cfg.onToggleOff) {
// 				ProtoScript.Core.callDependentBehaviors(this, cfg.onToggleOff, behaviorTarget, triggerTarget);			
// 			}
// 		// Toggle it ON
// 		} else {
// 			this.toggleStateOn = true;
// 			if(this.cfg.onToggleOn) {
// 				ProtoScript.Core.callDependentBehaviors(this, cfg.onToggleOn, behaviorTarget, triggerTarget);			
// 			}
// 		}
// 	}		
// };

YAHOO.protoscript.ToggleShowHide = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.ToggleShowHide.prototype = {
	defaultCfg : {
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("ToggleShowHide.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var scopeElems = currScope.elems;

		for(var i=0; i<scopeElems.length; i++) {
			var scopeElem = scopeElems[i];
			var currState = YAHOO.util.Dom.getStyle(scopeElem, "visibility");
	
			// HIDE IT
			if(currState.toLowerCase() == "visible") {
				YAHOO.util.Dom.setStyle(scopeElem, 'visibility', 'hidden');		
			// SHOW IT
			} else {
				YAHOO.util.Dom.setStyle(scopeElem, 'visibility', 'visible');		
			}
		}
		if(this.cfg.onToggleShowHide) {
			ProtoScript.Core.callBehaviors(this.cfg.onToggleShowHide, currScope);
		}
	}		
};


YAHOO.protoscript.Open = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Open.prototype = {
	defaultCfg : {
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("Open.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		YAHOO.util.Dom.setStyle(currScope.elems, 'display', 'block');		
		if(this.cfg.onOpen) {
			ProtoScript.Core.callBehaviors(this.cfg.onOpen, currScope);
		}
	}
};

YAHOO.protoscript.SetHtml = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.SetHtml.prototype = {
	defaultCfg : {
		html: null,
		htmlCopyFrom: null,
		copyFrom: null
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("SetHtml.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var scopeElems = currScope.elems;
		
		for(var i=0; i<scopeElems.length; i++) {
			var scopeElem = scopeElems[i];
			var insertTarget = YAHOO.util.Dom.get(scopeElem);
			if(this.cfg.html) {
				insertTarget.innerHTML = this.cfg.html;	
			} else if (this.cfg.htmlCopyFrom||this.cfg.copyFrom) {
				// resolve the copyfrom value
				var copyFromElems = ProtoScript.Core.getElemInScope(currScope, this.cfg.copyFrom||this.cfg.htmlCopyFrom);
				this.insertFromClone(copyFromElems[0], insertTarget);
				
			}
		}
		if(this.cfg.onSetHtml) {
			ProtoScript.Core.callBehaviors(this.cfg.onSetHtml, currScope);
		}
	},
	
	insertFromClone: function(src, dest) {
		var cloneOfSrc = src.cloneNode(true);
		dest.innerHTML = "";
		dest.appendChild(cloneOfSrc);
	}
};

// make an ajax request, getting back HTML and stuffing result into behaviorTarget
YAHOO.protoscript.FetchHtml = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.FetchHtml.prototype = {
	defaultCfg : {
		url:null
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("FetchHtml.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var scopeElems = currScope.elems;
		if(!this.ajax)
			this.ajax = new YAHOO.protoscript.Ajax();
		
		var cfg = this.cfg;
		for(var i=0; i<scopeElems.length; i++) {
			var scopeElem = scopeElems[i];
			this.ajax.get(this.cfg.url, null, function(elem) {
				return function(req) { 
					YAHOO.util.Dom.get(elem).innerHTML = req.responseText;	
					if(cfg.onSuccess) {
						ProtoScript.Core.callBehaviors(cfg.onSuccess, currScope);
					} else if(cfg.onFailure) {
						ProtoScript.Core.callBehaviors(cfg.onFailure, currScope);
					}
				};
			}(scopeElem));
		}
		//TODO: where does the callbehaviors go??? in loop or outside
	}

};

YAHOO.protoscript.Popup = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Popup.prototype = {
	defaultCfg : {
		close: true,
		draggable: true,
		underlay: 'shadow',
		model: false,
		//keylisteners
		visible: true,
		effect: null,
		monitorresize: true,
		x: null,
		y: null,
		context: null,
		fixedcenter: true,
		width: '300px',
		height: null,
		zIndex: null,
		contraintoviewport: false,
		iframe: false,
		id: 'popup_panel',
		// content
		hd: 'Panel Title',
		bd: null,
		bdCopyFrom: null,
		ft: null	
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("Popup.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var scopeElems = currScope.elems;
		var idx = currScope.idx;
		
		var parName = this.parent ? this.parent.name : "ROOT";

		// Instantiate a Panel from script
		if(!this.panel) {
			this.idx = idx;
			this.context = new Object(this.cfg.context);
			this.cfg.context = this.getContext(this.context, idx);
			this.panel = new YAHOO.widget.Panel(this.cfg.id, this.cfg);
			this.panel.setHeader(this.cfg.hd);
			this.panel.setBody(this.getBdContent(this.cfg, idx));
			this.panel.setFooter(this.cfg.ft);
			this.panel.render(document.body);
		} else {
			this.cfg.context = this.getContext(this.context, idx);
			this.idx = idx;
			this.panel.cfg.setProperty('context', this.cfg.context);
			this.panel.setHeader(this.cfg.hd);
			this.panel.setBody(this.getBdContent(this.cfg, idx));
			this.panel.setFooter(this.cfg.ft);
		}
				
		this.panel.show();
		if(this.cfg.onPopup) {
			var cfg = this.cfg;
			this.panel.renderEvent = function(e) {
				ProtoScript.Core.callBehaviors(cfg.onPopup, currScope);
			};
		}
	},

	getBdContent: function(cfg, idx) {
		// if they provided regular body content then 
		// look for URL or just html/text
		if(cfg.bd && cfg.bd.length) {
			var contentCfg = cfg.bd;
			if(contentCfg.substring(0,7)==="http://") {
				if(/[.]gif$|[.]jpg$|[.]jpeg$|[.]png$/i.test(contentCfg)) {
					// handle as img
					return '<img src="' + contentCfg + '" alt="mockup"/>'
				} else {
					// handle as url
					// later pull content from another page into an iframe and serve it up here
					return contentCfg;
				}
			} else {
				// handle as text
				return contentCfg;
			}			
		} else if (cfg.bdCopyFrom && cfg.bdCopyFrom.length) {
			var contentCfg = cfg.bdCopyFrom;
			// try to resolve as css query string 
			var elem = ProtoScript.Core.$(contentCfg);
			// got one
			if(elem && contentCfg !== '' && elem.length) {
				return elem[idx].innerHTML;
			} 
		}
		
		return '';
	},

	getContext: function(contextCfg, idx) {
		var newContextCfg = [];
		if(contextCfg && contextCfg.length === 3) {
			newContextCfg[0] = contextCfg[0];
			newContextCfg[1] = contextCfg[1];
			newContextCfg[2] = contextCfg[2];
			
			var contextElems = ProtoScript.Core.$(newContextCfg[0]);
			if(contextElems && contextElems.length > 0) {
				newContextCfg[0] = contextElems[idx];
			}
		}

		return newContextCfg;
	}
	

};


YAHOO.protoscript.DragDrop = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.DragDrop.prototype = {
		
	defaultCfg : {
		dropTarget: null,
		interactionGroup: 'proto-yui-group'
	},

	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
		
		// Create single or multiple drop targets based on how many elements are supplied to us
		var dropTargets = ProtoScript.Core.$(this.cfg.dropTarget);
		this.dropTargetDD = [];

		for(var i=0; i<dropTargets.length; i++){
			var dropElem = dropTargets[i];
			this.dropTargetDD[i] = new YAHOO.util.DDTarget(dropElem, "dummy-drop-group");
		}
		
		this.dragProxyDD = [];
	},
	
	// Called once and passed all drag objects to register
	action: function(currScope) {
		var scopeElems = currScope.elems;
		
		var parName = this.parent ? this.parent.name : "ROOT";
		var me = this;
		
		for(var i=0; i<scopeElems.length; i++) {
			
			// set this drag object to an individual interaction group
			//var ig = this.cfg.interactionGroup + "-" + i;
			var dd = new YAHOO.util.DDProxy(scopeElems[i], "dummy-drag-group"+i);
			dd.scroll = false;
			
			// then for each drop zone add it to this interaction group
			// this ensures that drag objects don't get treated like drop zones
			for(var j=0; j<this.dropTargetDD.length; j++) {
				//alert('Hello first! '+this.dropTargetDD.length); // Debug
				var ig = this.getInteractionGroup(scopeElems[i], this.dropTargetDD[j].getEl(), i);
				//alert('Hello second! '+this.dropTargetDD.length); // Debug
				//kasper = 'Int. grp.: '+ig;
				if(ig) {
					// console.log(i+","+j+":"+ig);
					this.dropTargetDD[j].addToGroup(ig);
					dd.addToGroup(ig);
				}
			}
			this.registerCallbacks(this.cfg, dd, i);
			
			this.dragProxyDD.push(dd); 
		}
	},
	
	getInteractionGroup: function(dragElem, dropElem, idx) {
		var ig = this.cfg.interactionGroup;
		// if it is just a simple string, then create a unique interaction group 
		// for this specific drag element
		if (typeof ig == 'string') {
			return ig + "-" + idx;
		}
		// We have to determine if the dragElem is in the dragTarget list
		// We also have to determine if the dropElem is in the dropTarget list
		else if (ig instanceof Array) {
		 // array argument
			for(var i=0; i<ig.length; i++) {
				group = ig[i];

				//group.name
				//group.dragTarget
				//group.dropTarget

				var dragTarget = ProtoScript.Core.$(group.dragTarget);
				var dropTarget = ProtoScript.Core.$(group.dropTarget);
				
				if(this.isItemInList(dragElem, dragTarget) && this.isItemInList(dropElem, dropTarget)) {
					return group.name + "-" + idx;
				}
			}
			return null;
		}
	},
	
	isItemInList: function(item, items) {
		for(var i=0; i<items.length; i++) {
			if(item == items[i]) {
				return true;
			}
		}
		return false;
	},
	registerCallbacks: function(cfg, dd, idx) {
		
		var me = this;
		
		dd.onMouseDown = function(e) {			
			if(cfg.onMouseDown) {
				
				//XXXXXXXXX
				// If we create a new method called
				// callCallback(currScope, cfg.onMouseDown, idx, pseudoElems)
				// it could use the currScope if the cfg._elems.length=0
				var callbackScope = ProtoScript.Core.createScope(cfg.onMouseDown, idx);
				ProtoScript.Core.callBehaviors(cfg.onMouseDown, callbackScope);	
			}
		};
		
		dd.startDrag   = function(x, y) {
			if(cfg.onStartDrag) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onStartDrag, idx);
				ProtoScript.Core.callBehaviors(cfg.onStartDrag, callbackScope);			
			} 
		};
		
		dd.onDrag      = function(e) {			
			if(cfg.onDrag) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onDrag, idx);
				ProtoScript.Core.callBehaviors(cfg.onDrag, callbackScope);			
			}
		};
		
		dd.onDragEnter = function(e, dropId) {
			var dropTarget = YAHOO.util.Dom.get(dropId);
			var draggedItem = this.getEl();
			
			if(cfg.onDragEnter) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onDragEnter, idx, {drop:dropTarget, drag:draggedItem});
				ProtoScript.Core.callBehaviors(cfg.onDragEnter, callbackScope);			
			}
		};
		
		dd.onDragOver  = function(e, dropId) {
			var dropTarget = YAHOO.util.Dom.get(dropId);
			var draggedItem = this.getEl();
			if(cfg.onDragOver) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onDragOver, idx, {drop:dropTarget, drag:draggedItem});
				ProtoScript.Core.callBehaviors(cfg.onDragOver, callbackScope);			
			}
		};
		
		dd.onDragOut   = function(e, dropId) {
			var dropTarget = YAHOO.util.Dom.get(dropId);
			var draggedItem = this.getEl();
			
			if(cfg.onDragOut) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onDragOut, idx, {drop:dropTarget, drag:draggedItem});
				ProtoScript.Core.callBehaviors(cfg.onDragOut, callbackScope);			
			}
		};
		
		dd.onDragDrop  = function(e, dropId) {
			var dropTarget = YAHOO.util.Dom.get(dropId);
			var draggedItem = this.getEl();

			me.currDropTarget = dropTarget;
			me.currDragTarget = draggedItem;
			if(cfg.onDragDrop) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onDragDrop, idx, {drop:dropTarget, drag:draggedItem});
				ProtoScript.Core.callBehaviors(cfg.onDragDrop, callbackScope);			
			} else {
				var cloneOfDraggedItem = draggedItem.cloneNode(true);

				// insert with all the style, etc.
				dropTarget.innerHTML = "";
				dropTarget.appendChild(cloneOfDraggedItem);		
			}
		};
		
		dd.onInvalidDrop  = function(e) {			
			if(cfg.onInvalidDrop) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onInvalidDrop, idx);
				ProtoScript.Core.callBehaviors(cfg.onInvalidDrop, callbackScope);			
			}
		};

		dd.endDrag = function(e) {
	    	var lel = dd.getEl();
	    	var del = dd.getDragEl();

	    	// Show the drag frame briefly so we can get its position
	    	del.style.visibility = "";

	    	// Hide the linked element before the move to get around a Safari 
	    	// rendering bug.
	    	lel.style.visibility = "hidden";
	    	//YAHOO.util.DDM.moveToEl(lel, del);
	    	del.style.visibility = "hidden";
	    	lel.style.visibility = "";
	
			if(cfg.onEndDrag) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onEndDrag, idx);
				ProtoScript.Core.callBehaviors(cfg.onEndDrag, callbackScope);			
			} 
		};

		dd.onMouseUp   = function(e) {
			if(cfg.onMouseUp) {
				var callbackScope = ProtoScript.Core.createScope(cfg.onMouseUp, idx);
				ProtoScript.Core.callBehaviors(cfg.onMouseUp, callbackScope);			
			}
		};

	}
};

// ======== RESIZE PANEL
// BEGIN RESIZEPANEL SUBCLASS //
YAHOO.widget.ResizePanel = function(el, userConfig) {
	if (arguments.length > 0) {
		YAHOO.widget.ResizePanel.superclass.constructor.call(this, el, userConfig);
	}
};

YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE = "yui-resizepanel";
YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE = "resizehandle";

YAHOO.extend(YAHOO.widget.ResizePanel, YAHOO.widget.Panel, {

    init: function(el, userConfig) {
        YAHOO.widget.ResizePanel.superclass.init.call(this, el);
        this.beforeInitEvent.fire(YAHOO.widget.ResizePanel);
        var Dom = YAHOO.util.Dom,
            Event = YAHOO.util.Event,
            oInnerElement = this.innerElement,
            oResizeHandle = document.createElement("DIV"),
            sResizeHandleId = this.id + "_resizehandle";
         oResizeHandle.id = sResizeHandleId;
         oResizeHandle.className = YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE;

        Dom.addClass(oInnerElement, YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE);
        this.resizeHandle = oResizeHandle;

        function initResizeFunctionality() {
            var me = this,
                oHeader = this.header,
                oBody = this.body,
                oFooter = this.footer,
                nStartWidth,
                nStartHeight,
                aStartPos,
                nBodyBorderTopWidth,
                nBodyBorderBottomWidth,
                nBodyTopPadding,
                nBodyBottomPadding,
                nBodyOffset;

            oInnerElement.appendChild(oResizeHandle);
            this.ddResize = new YAHOO.util.DragDrop(sResizeHandleId, this.id);
            this.ddResize.setHandleElId(sResizeHandleId);
            this.ddResize.onMouseDown = function(e) {
                nStartWidth = oInnerElement.offsetWidth;
                nStartHeight = oInnerElement.offsetHeight;

                if (YAHOO.env.ua.ie && document.compatMode == "BackCompat") {
                    nBodyOffset = 0;
                }
                else {
                    nBodyBorderTopWidth = parseInt(Dom.getStyle(oBody, "borderTopWidth"), 10),
                    nBodyBorderBottomWidth = parseInt(Dom.getStyle(oBody, "borderBottomWidth"), 10),
                    nBodyTopPadding = parseInt(Dom.getStyle(oBody, "paddingTop"), 10),
                    nBodyBottomPadding = parseInt(Dom.getStyle(oBody, "paddingBottom"), 10),
                    nBodyOffset = nBodyBorderTopWidth + nBodyBorderBottomWidth + nBodyTopPadding + nBodyBottomPadding;
                }
                me.cfg.setProperty("width", nStartWidth + "px");
                aStartPos = [Event.getPageX(e), Event.getPageY(e)];
            };

            this.ddResize.onDrag = function(e) {
                var aNewPos = [Event.getPageX(e), Event.getPageY(e)],
                    nOffsetX = aNewPos[0] - aStartPos[0],
                    nOffsetY = aNewPos[1] - aStartPos[1],

                    nNewWidth = Math.max(nStartWidth + nOffsetX, 10),
                    nNewHeight = Math.max(nStartHeight + nOffsetY, 10),
                    nBodyHeight = (nNewHeight - (oFooter.offsetHeight + oHeader.offsetHeight + nBodyOffset));

                me.cfg.setProperty("width", nNewWidth + "px");

                if (nBodyHeight < 0) {
                    nBodyHeight = 0;
                }

                oBody.style.height =  nBodyHeight + "px";
            };
        }

        function onBeforeShow() {
           initResizeFunctionality.call(this);
           this.unsubscribe("beforeShow", onBeforeShow);
        }

        function onBeforeRender() {
            if (!this.footer) {
                this.setFooter("");
            }
            if (this.cfg.getProperty("visible")) {
                initResizeFunctionality.call(this);
            }
            else {
                this.subscribe("beforeShow", onBeforeShow);
            }
            this.unsubscribe("beforeRender", onBeforeRender);
        }
        this.subscribe("beforeRender", onBeforeRender);

        if (userConfig) {
            this.cfg.applyConfig(userConfig, true);
        }
        this.initEvent.fire(YAHOO.widget.ResizePanel);
    },

    toString: function() {
        return "ResizePanel " + this.id;
    }
});

YAHOO.register("yui_proto", YAHOO.protoscript, {version:"0.5.0", build:"1"});
