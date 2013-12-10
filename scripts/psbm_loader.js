// Insert Yui! Loader as script node on current page
var body = document.getElementsByTagName("body")[0];
var js = document.createElement("script");
js.src = 'http://yui.yahooapis.com/2.5.1/build/yuiloader-dom-event/yuiloader-dom-event.js';
js.id = '__psbm_js';
body.appendChild(js);

// When YAHOO object exists, then let Yui! Loader do it's magic
var __psbm_interval_id = setInterval( function() {
	if (!(typeof YAHOO == "undefined" || !YAHOO)) {
		clearInterval(__psbm_interval_id);

		document.getElementsByTagName("body")[0].className = ' yui-skin-sam';
		
		var loader = new YAHOO.util.YUILoader();
		
		var protoscriptDomain = 'http://protoscript.com/';

		loader.addModule( {
			name :'psbm',
			type :'js',
			fullpath :protoscriptDomain + 'scripts/psbm.js',
			requires : [ 'psbmcss', 'protoscript' ]
		});

		loader.addModule( {
			name :'psbmcss',
			type :'css',
			fullpath :protoscriptDomain + 'css/psbm.css',
			requires : [ 'protoscript' ]
		});

		loader.addModule( {
			name :'protoscript',
			type :'js',
			fullpath :protoscriptDomain + 'scripts/proto.js',
			requires : [ 'yui_proto' ],
			varName : 'ProtoScript.Core'
		});

		loader.addModule( {
			name :'yui_proto',
			type :'js',
			fullpath :protoscriptDomain + 'scripts/yui_proto.js',
			requires : [ 'utilities', 'container', 'selector' ]
		});

		loader.require('psbm');

		loader.onSuccess = function() {
			ProtoScript.Core.registerBehaviorSet(YAHOO.util.Selector.query, YAHOO.protoscript);
			YAHOO.protoscript.UI.createUI();
		};

		loader.insert();
	}
}, 10);