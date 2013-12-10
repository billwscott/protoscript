// Version 0.5

if (typeof ProtoScript == "undefined") {
    /**
     * The YAHOO global namespace object.  If YAHOO is already defined, the
     * existing YAHOO object will not be overwritten so that defined
     * namespaces are preserved.
     * @class YAHOO
     * @static
     */
    var ProtoScript = {};
}

ProtoScript.Proto = function() {
	if(arguments.length === 1) {
		var config = arguments[0];
		if ( window == this || !this.init ) {
			return new ProtoScript.Proto(config);
		}

		return this.init(config);
		
	} else {
		var identifierStr = arguments[0];
		var config = arguments[1];
		if ( window == this || !this.init ) {
			return new ProtoScript.Proto(identifierStr, config);
		}
		var cfg = [];
		cfg[identifierStr] = config;
		return this.init(cfg);
	}
	
};
// // Map over the $ in case of overwrite
// if ( typeof $proto != "undefined" )
// 	ProtoScript.proto._$ = $proto;
	
var $proto = ProtoScript.Proto;

ProtoScript.Proto.prototype = {
	
	init: function(cfg) {
		ProtoScript.Core.startParseInteraction(cfg);
		ProtoScript.Core.startExecuteInteraction(cfg);		
	}
};

ProtoScript.Core = function() {

	return {

		behaviorNamespace: null,// = (YAHOO && YAHOO.protoscript) ? YAHOO.protoscript : null,
		$$: {}, 
		registerBehaviorSet: function(selectorMethod, behaviorNamespace) {
			this.$$ = selectorMethod;
			this.behaviorNamespace = behaviorNamespace;
		},
		
		getBehaviorNamespace: function() {
			return this.behaviorNamespace;
		},
		
		// Normalize between the different selectors... allow comma delimited
		// ... ignore $whatever
		$: function(selector) {
			// console.log("####### selector==" + selector);
			try {
				if(typeof(selector) === 'undefined' || selector === null || selector.length === 0) {
					return [];
				} else {
					if (selector.substr(0,1) === "$") {
						return [];
					} else if (selector === "document") {
						return [document];
					} else {
						var tmp = this.$$(selector);
						var elems = this.$$(selector);
						
						var cleanArr = [];
						
						for(var i=0; i<elems.length; i++) {
							cleanArr[i] = elems[i];
						}
						return cleanArr;
						//return this.$$(selector);
					}
				}
			} catch (err) {
				return [];
			}
		},
		
		parseInteraction: function(parentCfg, inCallback, level) {
			var indents = "                                   ";
			var indent = indents.substring(0, level*3);

			for(var propName in parentCfg) {

				// ---- BEHAVIOR 
				if(this.isBehavior(propName)) {
					if(propName === "Trigger") {
						// console.log(indent + " Listen for " + propName);
					} else {
						// console.log(indent + " Perform " + propName);
					}
					var behaviorCfg = parentCfg[propName];

					// inherit if no override supplied for this behavior.
					// check for targets that start with '$'. treat as special variable that the
					// behavior will have to resolve
					var scopeElems = behaviorCfg.target ? 
								ProtoScript.Core.$(behaviorCfg.target): parentCfg._elems;

					this.initCfg(parentCfg, behaviorCfg, propName, scopeElems, 'behavior');
					var elemstr;
					if (parentCfg._elems == null) {
						elemstr = "NULL";
					} else {
						elemstr = "[" + parentCfg._elems.length + "]";						
					}
					// console.log(indent + " elems="+elemstr);
					
					this.instantiateBehaviorExt(behaviorCfg, propName);

					// store behaviors in a list for easy access later	??? need this ???		
					if(!parentCfg._behaviors) parentCfg._behaviors = [];
					parentCfg._behaviors.push(behaviorCfg);

					this.parseInteraction(behaviorCfg, inCallback, level + 1);

				// ---- CALLBACK
				} else if (this.isCallback(propName)) {
					inCallback = true;
					// console.log(indent + " When " + propName);
					var callbackCfg = parentCfg[propName];

					// inherit if no override supplied for this callback.
					var scopeElems = callbackCfg.target ? ProtoScript.Core.$(callbackCfg.target): parentCfg._elems;
					this.initCfg(parentCfg, callbackCfg, propName, scopeElems, 'callback');						
					var elemstr;
					if (parentCfg._elems == null) {
						elemstr = "NULL";
					} else {
						elemstr = "[" + parentCfg._elems.length + "]";						
					}
					// console.log(indent + " elems="+elemstr);


					// store callbacks in a list for easy access later			
					if(!parentCfg._callbacks) parentCfg._callbacks = [];
					parentCfg._callbacks.push(callbackCfg);

					this.parseInteraction(callbackCfg, inCallback, level + 1);

				// ---- ATTRIBUTE
				} else {
				}
			}
		},

		/**
		 * containerCfg: For all behaviors in containerCfg call each behavior
		 * idx: If -1 then we are passing all matched elements to the behavior action
		 *      If >=0 then we are passing the behaviorCfg._elems[idx] for each 
		 *             behavior found. This is is important when events are triggered
		 *             on a single item of the set of objects in scope.
		 */
		callBehaviors: function(containerCfg, scope) {

			// console.log("*** CALLBACK="+containerCfg._name);
			var dependentBehaviors = containerCfg._behaviors;
			if(dependentBehaviors != null) {
				for(var i=0; i<dependentBehaviors.length; i++) {
					var behaviorCfg = dependentBehaviors[i];
					if(behaviorCfg._elems.length!==0){
						behaviorScope = this.createScope(behaviorCfg, scope.idx, scope.pseudoElems);
					} else {
						// there is no _elem calculated
						behaviorScope = scope;
						// if there is a target, then we need to calculate a new scope
						var cfgTarget = containerCfg.target;
						if(scope.pseudoElems && cfgTarget && cfgTarget.length > 0 && cfgTarget.substr(0,1)==="$") {
							var pseudoName = cfgTarget.substr(1, cfgTarget.length-1);
							behaviorScope.elems = [scope.pseudoElems[pseudoName]];
						} else {
							//already calculated
						}
					}	
					this.callBehavior(behaviorCfg, behaviorScope);

					// recurse down and invoke all the behaviors inside this behavior
					// DO WE NEED to even pass the behaviorScope???? it is calculated each time
					this.callBehaviors(behaviorCfg, behaviorScope);
				}	
			}
		},
		
		callBehavior: function(behaviorCfg, currScope) {
			// the currScope is correct... idx is only needed as it chains down
			// to find other scopes. idx maps a slice into the new scope
			var behavior = behaviorCfg._behaviorExt.action(currScope);				
		},

		startExecuteInteraction: function(cfg) {
			for (var identifierStr in cfg) {
				var identifierCfg = cfg[identifierStr];
				var elems = ProtoScript.Core.$(identifierStr);								
				this.executeInteraction(identifierCfg, false, 1);			
			}
		},
		
		createScope: function(cfg, idx, pseudoElems) {
			var cfgTarget = cfg.target;
			var scopeElems;

			// Elements in Scope comes from either pseudo elements, indexed element or all elements
			if(pseudoElems && cfgTarget && cfgTarget.length > 0 && cfgTarget.substr(0,1)==="$") {
				var pseudoName = cfgTarget.substr(1, cfgTarget.length-1);
				scopeElems = [pseudoElems[pseudoName]];
			} else if(typeof(idx)!='undefined' && idx !== null && idx >=0) {
				scopeElems = [cfg._elems[idx]];
			} else {
				// target stuff got resolved on first parse pass
				scopeElems = cfg._elems;
			}
				
			return {
				elems: scopeElems,
				idx: idx,
				pseudoElems: pseudoElems
			};
		},
		
		/**
		 * For a given psuedo name for an element (e.g., $drag)
		 * resolve the element this is mapped to within the scope object
		 * Returns null if not found.
		 */
		getPseudoElemInScope: function(scope, pseudoName) {
			
			var pseudoElems = scope.pseudoElems;
			var elem = null;
			if(pseudoElems) {
				elem = [pseudoElems[pseudoName]];
			}
	
			return elem;
		},
		
		/**
		 * For a selector, resolve to a set of elems.
		 * If scope is provided and scope.idx is available (and >= 0)
		 * then modify the elems to be the single item at idx
		 * If a pseudoElements object is available, then look up the elem
		 * from there.
		 */
		getElemInScope: function(scope, selector) {
			var elems = null;
			
			// if the selector exists
			if(selector !== null && selector !== '') {
				
				// try to resolve by selector lookup
				elems = ProtoScript.Core.$(selector);
				
				// yes, resolved by selector lookup
				if(elems && elems.length) {
					if(typeof(scope.idx) !== 'undefined' && scope.idx !== null && scope.idx >= 0) {
						var idx = scope.idx;
						elems = [elems[idx]];
					}
				// no could not resolve it, so see if it exists in the pseudo elems
				} else if(scope.pseudoElems) {
					var pseudoName = selector.substr(1, selector.length-1);
					elems = [scope.pseudoElems[pseudoName]];
				}			
			}
			return elems;
		},
		
		executeInteraction: function(parentCfg, inCallback, level) {
			var indents = "                                   ";
			var indent = indents.substring(0, level*3);

			for(var propName in parentCfg) {
				// ---- BEHAVIOR 
				if(this.isBehavior(propName)) {
					var behaviorCfg = parentCfg[propName];	
					// continue down chain... only behaviors not nested in a callback will execute immediately
					if(!inCallback) {		
						var behaviorScope = this.createScope(behaviorCfg, -1);
						this.callBehavior(behaviorCfg, behaviorScope);
					}
					this.executeInteraction(behaviorCfg, inCallback, level + 1);
				// ---- CALLBACK
				} else if (this.isCallback(propName)) {
					var callbackCfg = parentCfg[propName];
					this.executeInteraction(callbackCfg, true, level + 1);
				// ---- ATTRIBUTE
				} else {
				}
			}
		},

		// each cfg object stores its name, current scope, the elems of the scope, the cfg obj & the type name
		 initCfg: function(parentCfg, cfg, name, scopeElems, type) {
			cfg._parentCfg = parentCfg;
			cfg._name = name;
			cfg._elems = scopeElems;
			cfg._type = type;
		},

		instantiateBehaviorExt: function(cfg, behName) {
			var namespace = ProtoScript.Core.getBehaviorNamespace();
			if(namespace) {
				try {
					cfg._behaviorExt = new namespace[behName](behName, cfg);	
				} catch(e) {
					alert("Sorry, the behavior '" + behName + "' could not be found. Check your spelling to make sure that behavior exists.");
				}
			} else {
				// console.log("No Namespace defined for behavior set. Call ProtoScript.Core.registerBehaviorSet");
			}
		},

		isBehavior: function(name) { return (/^[A-Z]/.test(name))},
		isCallback: function(name) { return (/^on/.test(name))},

		echoIdentifier: function(cfg) {
			var elems = cfg._elems;
			var name = cfg._name;

			var tagName = elems.length>0?elems.tagName:"";
			var message = "";
			if(elems.length>1) {
				message = message + "For the " + elems.length + " elems: [ ";
				for(var i=0; i<elems.length; i++) {
					message += "<" + elems[i].tagName + "> "; 
				}
				message += "] matching '" + name + "'";
			} else if (elems.length===1 ) {
				message += "For the <" + elems[0].tagName + "> matching '" + name + "'";
			}
			return message;
		},

		startParseInteraction: function(cfg) {
			for (var identifierStr in cfg) {
				var identifierCfg = cfg[identifierStr];
				var elems = ProtoScript.Core.$(identifierStr);
				this.initCfg(null, identifierCfg, identifierStr, elems, 'element');

				// console.log(this.echoIdentifier(identifierCfg));
								
				this.parseInteraction(identifierCfg, false, 1);			
			}
		},
				
		applyConfig: function ( defaultConfig, userConfig ) {
			// walk through all the defaultConfig properties
			// for each one found if there is not a property
			// in the userConfig then apply it
			for(prop in defaultConfig) {
				// if there is NOT already a userConfig property AND
				// the defaultConfig value is not null then copy the property
				var userSetProp = 
						(typeof(userConfig[prop]) !== 'undefined' &&
						userConfig[prop] !== null && 
						userConfig[prop] !== '') ? true: false;
				// if there is an override, use it
				if(!userSetProp && defaultConfig[prop]) {
					userConfig[prop] = defaultConfig[prop];
				}
			}
			
			return userConfig;
		},
		
		// only copies over animation properties
		createAnimConfig: function(userConfig) {
			var animAttrs = "borderWidth bottom fontSize left right top height margin opacity lineHeight padding width points color backgroundColor borderTopColor borderRightColor borderBottomColor borderLeftColor";
			
			var animConfig = new Object();
			for(prop in userConfig) {
				if(animAttrs.match(prop)) {
					animConfig[prop] = userConfig[prop];
				}
			}
			
			return animConfig;
		},
		
		dump: function() {
			for (var identifier in ProtoScript.Config) {
				var behaviorSet = ProtoScript.Config[identifier];
				behaviorSet._name = identifier;
				var elems = ProtoScript.Core.$(identifier);
				var tagName = elems.length>0?elems.tagName:"";
				
				//
				var message = "";
				if(elems.length>1) {
					message = message + "For the " + elems.length + " elems: [ ";
					for(var i=0; i<elems.length; i++) {
						message += "<" + elems[i].tagName + "> "; 
					}
					message += "] matching '" + identifier + "'";
					// console.log(message);
				} else if (elems.length===1 ) {
					// console.log("For the <" + elems[0].tagName + "> matching '" + identifier + "'");
				}
				ProtoScript.Core.dumpConfig(behaviorSet, 1);			
			}
		},
		
		dumpConfig: function(props, level) {
			var indents = "                                   ";
			var indent = indents.substring(0, level*3);
			
			for(var propName in props) {
				var propObj = props[propName];
				
				if(this.isBehavior(propName)) {
					// console.log(indent + " Perform " + propName);
					this.dumpConfig(propObj, level + 1);
				} else if (this.isCallback(propName)) {
					// console.log(indent + " When " + propName);
					this.dumpConfig(propObj, level + 1);
				}
			}
		},
		
		/**
		 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
		 * Version : 1.00.A
		 * By Binny V A
		 * License : BSD
		 */
		isKeyMatch: function(e, keyPattern) {
			if(typeof(keyPattern) === 'undefined' || keyPattern === null || keyPattern === '') {
				return true;
			}
			// debugger;
			e = e || window.event;
			var code;
			var character;
			if(e.type === "keypress") {
				var code = e.charCode ? e.charCode : e.keyCode;
				if(code >= 32 && code < 127) {
					character = String.fromCharCode(code);
				} else {
					switch (code) {
						case 9:
							character = 'tab';
							break;
						case 13:
							character = 'enter';
							break;
						case 27:
							character = 'escape';
							break;
						default:
							character = "";
							break;
					}
				}
			} else {
				if (e.keyCode) 
					code = e.keyCode;
				else if (e.which) 
					code = e.which;
				character = String.fromCharCode(code).toLowerCase();
			}

			var listOfKeys = keyPattern.toLowerCase().split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;

			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8
			}

			for(var i=0; k=listOfKeys[i],i<listOfKeys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					if(e.ctrlKey) kp++;

				} else if(k ==  'shift') {
					if(e.shiftKey) kp++;

				} else if(k == 'alt') {
						if(e.altKey) kp++;

				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
				}
			}

			if(kp == listOfKeys.length) {
				return true;
			}

			return false;
		}
	};
}();