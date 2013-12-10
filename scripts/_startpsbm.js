var __psbm_stamp = "@STAMP@";
var __psbm_js_prefix = "@SCRIPT_PATH@";
var __psbm_css_prefix = "@CSS_PATH@";

//var __protobm_path = "http://localhost/~bscott/yprotokit";
//var __protobm_path = "http://protoscript.com";

___createJSNode = function(id, src, callback) {
	var body = document.getElementsByTagName("body")[0];
	var js = document.createElement("script");
	js.src = src;
	js.id = id;
	
	if(callback) {
		js.onload = js.onreadystatechange = (function() {
			if(js.readyState && js.readyState!="loaded" && js.readyState!="complete") { 
				return; 
			};	
			callback();
		});
	}
	
	body.appendChild(js);
	return js;
};

var ___createCSSNode = function(id, src) {
	var hd = document.getElementsByTagName("head")[0];
	// need to test for no head, etc.
    var lnk = document.createElement("link");
    lnk.rel = "stylesheet";
    lnk.type = "text/css";
    lnk.id = id;
    lnk.href = src;
    hd.appendChild(lnk);	
    return lnk;
};

// will hold correct offset value when this is loaded
var __psbm_css_div = document.createElement("div");
__psbm_css_div.id="yahoo-psbm-ccs-has-been-loaded";
__psbm_css_div.style.display="block";
__psbm_css_div.style.position="absolute";
__psbm_css_div.style.left="-1000px";
__psbm_css_div.style.top="-1000px";
document.body.appendChild(__psbm_css_div);
___createCSSNode("__psbm_css", 
 			__psbm_css_prefix + __psbm_stamp + ".css");

// We are looking for the offsetWidth && offsetHeight to be set
// they are the last settings in the CSS file
// If they are set we know the CSS has been loaded
var __psbm_interval_id = setInterval(function() {
	if(__psbm_css_div.offsetWidth >= 99 && __psbm_css_div.offsetHeight >= 99) {
		clearInterval(__psbm_interval_id);
		document.body.removeChild(__psbm_css_div);
		___createJSNode ("__psbm_js",
					__psbm_js_prefix + __psbm_stamp + ".js",
						function() {
							ProtoScript.Core.registerBehaviorSet($, YAHOO.protoscript);
							YAHOO.protoscript.UI.createUI();
						});
	}
}, 10);



/*

___createCSSNode("__yuicontainercss",  "http://yui.yahooapis.com/2.3.0/build/container/assets/container.css");
___createCSSNode("__yuiprotocss",      __protobm_path+"/css/psbm.css");

___createJSNode ("__yahoodomevent",    "http://yui.yahooapis.com/2.3.0/build/utilities/utilities.js");
___createJSNode ("__yahoocontainer",   "http://yui.yahooapis.com/2.3.0/build/container/container-min.js");
___createJSNode ("__jquery",           __protobm_path+"/scripts/jquery-1.1.3.1.js");
___createJSNode ("__yuiproto",         __protobm_path+"/scripts/yui_proto.js");
___createJSNode ("__proto",            __protobm_path+"/scripts/proto.js");
___createJSNode ("__psbm",    __protobm_path+"/scripts/psbm.js",
	function() {
		ProtoScript.Core.registerBehaviorSet($, YAHOO.protoscript);
		YAHOO.protoscript.UI.createUI();
	});
*/