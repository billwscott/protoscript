var MooBehaviors = {};

MooBehaviors.Util = function() {
	
	return {
		handleAnimMoments: function(cfg, anim, currScope) {
			if(cfg.onStart) {
				anim.onStart.subscribe(function() {
					ProtoScript.Core.callBehaviors(cfg.onStart, currScope);			
				});
			}
			if(cfg.onStop) {
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


MooBehaviors.Fade = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
MooBehaviors.Fade.prototype = {
	
	defaultCfg : {
		start: 1, // revisit
		end: 0, // revisit
		transition: null,
		duration: null,
		unit: null,
		wait: null,
		fps: null
	},
	
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		var scopeElems = currScope.elems;
		var cfg = this.cfg;
		for (var i=0; i<scopeElems.length; i++) {
			var myFx = new Fx.Style(scopeElems[i], 'opacity', {
				onComplete: function() {
					if(cfg.onComplete) {
						ProtoScript.Core.callBehaviors(cfg.onComplete, currScope);
					}
				}
			}).start(this.cfg.start,this.cfg.end); 
		}
	}
	
};

MooBehaviors.Trigger = function(behaviorCfg, currScope, eventType) {
	var idx = currScope.idx;
	var scopeElems = currScope.elems;
	// console.log("Trigger of type:" + eventType);

	// event callback
	var behaviorName = behaviorCfg._name;
	
	// if there is an onXXX then set up the listener, otherwise no purpose
	if(behaviorCfg['on'+behaviorName]) {
		var onTriggerElems = behaviorCfg['on'+behaviorName]._elems;
	
		// We will want to register a listener with each element individually.
		for(var i=0; i<scopeElems.length; i++) {
			var triggerElem = scopeElems[i];
			var onTriggerElem = [onTriggerElems[i]]; // still will pass as an array of 1
		
			triggerElem.addEvent(eventType, function(tElem, onTElem, idx) {
				return function(e) {
					var scope = ProtoScript.Core.createScope(behaviorCfg['on'+behaviorName], idx);
					
					if(ProtoScript.Core.isKeyMatch(e, behaviorCfg.modifier)) {
						if(behaviorCfg.delay && behaviorCfg.delay > 0) {
							setTimeout(function() {
								this.callBehaviors(behaviorCfg['on'+behaviorName], scope);
							}, behaviorCfg.delay*1000);
						} else {
							ProtoScript.Core.callBehaviors(behaviorCfg['on'+behaviorName], scope);
						}
					}
				};
			}(triggerElem, onTriggerElem, i));	
		}
	}	
};

MooBehaviors.Click = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
MooBehaviors.Click.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { MooBehaviors.Trigger(this.cfg, currScope, 'click');}
};
