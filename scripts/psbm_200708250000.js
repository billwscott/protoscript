/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/

if(typeof YAHOO=="undefined"){var YAHOO={};}
YAHOO.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=YAHOO;for(j=(d[0]=="YAHOO")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};YAHOO.log=function(msg,cat,src){var l=YAHOO.widget.Logger;if(l&&l.log){return l.log(msg,cat,src);}else{return false;}};YAHOO.register=function(name,mainClass,data){var mods=YAHOO.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]};}
var m=mods[name],v=data.version,b=data.build,ls=YAHOO.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m);}
if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b;}else{YAHOO.log("mainClass is undefined for module "+name,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(name){return YAHOO.env.modules[name]||null;};YAHOO.env.ua=function(){var o={ie:0,opera:0,gecko:0,webkit:0};var ua=navigator.userAgent,m;if((/KHTML/).test(ua)){o.webkit=1;}
m=ua.match(/AppleWebKit\/([^\s]*)/);if(m&&m[1]){o.webkit=parseFloat(m[1]);}
if(!o.webkit){m=ua.match(/Opera[\s\/]([^\s]*)/);if(m&&m[1]){o.opera=parseFloat(m[1]);}else{m=ua.match(/MSIE\s([^;]*)/);if(m&&m[1]){o.ie=parseFloat(m[1]);}else{m=ua.match(/Gecko\/([^\s]*)/);if(m){o.gecko=1;m=ua.match(/rv:([^\s\)]*)/);if(m&&m[1]){o.gecko=parseFloat(m[1]);}}}}}
return o;}();(function(){YAHOO.namespace("util","widget","example");if(typeof YAHOO_config!="undefined"){var l=YAHOO_config.listener,ls=YAHOO.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break;}}
if(unique){ls.push(l);}}}})();YAHOO.lang={isArray:function(o){if(o){var l=YAHOO.lang;return l.isNumber(o.length)&&l.isFunction(o.splice)&&!l.hasOwnProperty(o.length);}
return false;},isBoolean:function(o){return typeof o==='boolean';},isFunction:function(o){return typeof o==='function';},isNull:function(o){return o===null;},isNumber:function(o){return typeof o==='number'&&isFinite(o);},isObject:function(o){return(o&&(typeof o==='object'||YAHOO.lang.isFunction(o)))||false;},isString:function(o){return typeof o==='string';},isUndefined:function(o){return typeof o==='undefined';},hasOwnProperty:function(o,prop){if(Object.prototype.hasOwnProperty){return o.hasOwnProperty(prop);}
return!YAHOO.lang.isUndefined(o[prop])&&o.constructor.prototype[prop]!==o[prop];},_IEEnumFix:function(r,s){if(YAHOO.env.ua.ie){var add=["toString","valueOf"];for(i=0;i<add.length;i=i+1){var fname=add[i],f=s[fname];if(YAHOO.lang.isFunction(f)&&f!=Object.prototype[fname]){r[fname]=f;}}}},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.");}
var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc;}
if(overrides){for(var i in overrides){subc.prototype[i]=overrides[i];}
YAHOO.lang._IEEnumFix(subc.prototype,overrides);}},augmentObject:function(r,s){if(!s||!r){throw new Error("Absorb failed, verify dependencies.");}
var a=arguments,i,p,override=a[2];if(override&&override!==true){for(i=2;i<a.length;i=i+1){r[a[i]]=s[a[i]];}}else{for(p in s){if(override||!r[p]){r[p]=s[p];}}
YAHOO.lang._IEEnumFix(r,s);}},augmentProto:function(r,s){if(!s||!r){throw new Error("Augment failed, verify dependencies.");}
var a=[r.prototype,s.prototype];for(var i=2;i<arguments.length;i=i+1){a.push(arguments[i]);}
YAHOO.lang.augmentObject.apply(this,a);},dump:function(o,d){var l=YAHOO.lang,i,len,s=[],OBJ="{...}",FUN="f(){...}",COMMA=', ',ARROW=' => ';if(!l.isObject(o)||o instanceof Date||("nodeType"in o&&"tagName"in o)){return o;}else if(l.isFunction(o)){return FUN;}
d=(l.isNumber(d))?d:3;if(l.isArray(o)){s.push("[");for(i=0,len=o.length;i<len;i=i+1){if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}
if(s.length>1){s.pop();}
s.push("]");}else{s.push("{");for(i in o){if(l.hasOwnProperty(o,i)){s.push(i+ARROW);if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}}
if(s.length>1){s.pop();}
s.push("}");}
return s.join("");},substitute:function(s,o,f){var i,j,k,key,v,meta,l=YAHOO.lang,saved=[],token,DUMP='dump',SPACE=' ',LBRACE='{',RBRACE='}';for(;;){i=s.lastIndexOf(LBRACE);if(i<0){break;}
j=s.indexOf(RBRACE,i);if(i+1>=j){break;}
token=s.substring(i+1,j);key=token;meta=null;k=key.indexOf(SPACE);if(k>-1){meta=key.substring(k+1);key=key.substring(0,k);}
v=o[key];if(f){v=f(key,v,meta);}
if(l.isObject(v)){if(l.isArray(v)){v=l.dump(v,parseInt(meta,10));}else{meta=meta||"";var dump=meta.indexOf(DUMP);if(dump>-1){meta=meta.substring(4);}
if(v.toString===Object.prototype.toString||dump>-1){v=l.dump(v,parseInt(meta,10));}else{v=v.toString();}}}else if(!l.isString(v)&&!l.isNumber(v)){v="~-"+saved.length+"-~";saved[saved.length]=token;}
s=s.substring(0,i)+v+s.substring(j+1);}
for(i=saved.length-1;i>=0;i=i-1){s=s.replace(new RegExp("~-"+i+"-~"),"{"+saved[i]+"}","g");}
return s;},trim:function(s){try{return s.replace(/^\s+|\s+$/g,"");}catch(e){return s;}},merge:function(){var o={},a=arguments,i;for(i=0;i<a.length;i=i+1){YAHOO.lang.augmentObject(o,a[i],true);}
return o;},isValue:function(o){var l=YAHOO.lang;return(l.isObject(o)||l.isString(o)||l.isNumber(o)||l.isBoolean(o));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.0",build:"442"});
(function(){var Y=YAHOO.util,getStyle,setStyle,id_counter=0,propertyCache={},reClassNameCache={};var isOpera=YAHOO.env.ua.opera,isSafari=YAHOO.env.ua.webkit,isGecko=YAHOO.env.ua.gecko,isIE=YAHOO.env.ua.ie;var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property;}
if(propertyCache[property]){return propertyCache[property];}
var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}
propertyCache[property]=converted;return converted;};var getClassRegEx=function(className){var re=reClassNameCache[className];if(!re){re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');reClassNameCache[className]=re;}
return re;};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat';}
var computed=document.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)];}
return el.style[property]||value;};}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity;}catch(e){try{val=el.filters('alpha').opacity;}catch(e){}}
return val/100;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value);}};}else{getStyle=function(el,property){return el.style[property];};}
if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(YAHOO.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}
break;case'float':property='styleFloat';default:el.style[property]=val;}};}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat';}
el.style[property]=val;};}
var testElement=function(node,method){return node&&node.nodeType==1&&(!method||method(node));};YAHOO.util.Dom={get:function(el){if(!el||el.tagName||el.item){return el;}
if(YAHOO.lang.isString(el)){return document.getElementById(el);}
if(el.splice){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i]);}
return c;}
return el;},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property);};return Y.Dom.batch(el,f,Y.Dom,true);},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val);};Y.Dom.batch(el,f,Y.Dom,true);},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var parentNode=null;var pos=[];var box;var doc=el.ownerDocument;if(el.getBoundingClientRect){box=el.getBoundingClientRect();return[box.left+Y.Dom.getDocumentScrollLeft(el.ownerDocument),box.top+Y.Dom.getDocumentScrollTop(el.ownerDocument)];}
else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;var hasAbs=this.getStyle(el,'position')=='absolute';if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(isSafari&&!hasAbs&&this.getStyle(parentNode,'position')=='absolute'){hasAbs=true;}
parentNode=parentNode.offsetParent;}}
if(isSafari&&hasAbs){pos[0]-=el.ownerDocument.body.offsetLeft;pos[1]-=el.ownerDocument.body.offsetTop;}}
parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName))
{if(Y.Dom.getStyle(parentNode,'display').search(/^inline|table-row.*$/i)){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}
parentNode=parentNode.parentNode;}
return pos;};return Y.Dom.batch(el,f,Y.Dom,true);},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0];};return Y.Dom.batch(el,f,Y.Dom,true);},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1];};return Y.Dom.batch(el,f,Y.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}
var pageXY=this.getXY(el);if(pageXY===false){return false;}
var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}
if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}
if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}
if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}
if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true);}}};Y.Dom.batch(el,f,Y.Dom,true);},setX:function(el,x){Y.Dom.setXY(el,[x,null]);},setY:function(el,y){Y.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var region=Y.Region.getRegion(el);return region;};return Y.Dom.batch(el,f,Y.Dom,true);},getClientWidth:function(){return Y.Dom.getViewportWidth();},getClientHeight:function(){return Y.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag),re=getClassRegEx(className);for(var i=0,len=elements.length;i<len;++i){if(re.test(elements[i].className)){nodes[nodes.length]=elements[i];if(apply){apply.call(elements[i],elements[i]);}}}
return nodes;},hasClass:function(el,className){var re=getClassRegEx(className);var f=function(el){return re.test(el.className);};return Y.Dom.batch(el,f,Y.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return false;}
el.className=YAHOO.lang.trim([el.className,className].join(' '));return true;};return Y.Dom.batch(el,f,Y.Dom,true);},removeClass:function(el,className){var re=getClassRegEx(className);var f=function(el){if(!this.hasClass(el,className)){return false;}
var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(!newClassName||oldClassName===newClassName){return false;}
var re=getClassRegEx(oldClassName);var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return true;}
el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';var f=function(el){if(el&&el.id){return el.id;}
var id=prefix+id_counter++;if(el){el.id=id;}
return id;};return Y.Dom.batch(el,f,Y.Dom,true)||f.apply(Y.Dom,arguments);},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);if(!haystack||!needle){return false;}
var f=function(node){if(haystack.contains&&node.nodeType&&!isSafari){return haystack.contains(node);}
else if(haystack.compareDocumentPosition&&node.nodeType){return!!(haystack.compareDocumentPosition(node)&16);}else if(node.nodeType){return!!this.getAncestorBy(node,function(el){return el==haystack;});}
return false;};return Y.Dom.batch(needle,f,Y.Dom,true);},inDocument:function(el){var f=function(el){if(isSafari){while(el=el.parentNode){if(el==document.documentElement){return true;}}
return false;}
return this.isAncestor(document.documentElement,el);};return Y.Dom.batch(el,f,Y.Dom,true);},getElementsBy:function(method,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag);for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];if(apply){apply(elements[i]);}}}
return nodes;},batch:function(el,method,o,override){el=(el&&el.tagName)?el:Y.Dom.get(el);if(!el||!method){return false;}
var scope=(override)?o:window;if(el.tagName||(!el.item&&!el.slice)){return method.call(scope,el,o);}
var collection=[];for(var i=0,len=el.length;i<len;++i){collection[collection.length]=method.call(scope,el[i],o);}
return collection;},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h;},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w;},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight;}
return height;},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth;}
return width;},getAncestorBy:function(node,method){while(node=node.parentNode){if(testElement(node,method)){return node;}}
return null;},getAncestorByClassName:function(node,className){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return Y.Dom.hasClass(el,className);};return Y.Dom.getAncestorBy(node,method);},getAncestorByTagName:function(node,tagName){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return el.tagName&&el.tagName.toUpperCase()==tagName.toUpperCase();};return Y.Dom.getAncestorBy(node,method);},getPreviousSiblingBy:function(node,method){while(node){node=node.previousSibling;if(testElement(node,method)){return node;}}
return null;},getPreviousSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getPreviousSiblingBy(node);},getNextSiblingBy:function(node,method){while(node){node=node.nextSibling;if(testElement(node,method)){return node;}}
return null;},getNextSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getNextSiblingBy(node);},getFirstChildBy:function(node,method){var child=(testElement(node.firstChild,method))?node.firstChild:null;return child||Y.Dom.getNextSiblingBy(node.firstChild,method);},getFirstChild:function(node,method){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getFirstChildBy(node);},getLastChildBy:function(node,method){if(!node){return null;}
var child=(testElement(node.lastChild,method))?node.lastChild:null;return child||Y.Dom.getPreviousSiblingBy(node.lastChild,method);},getLastChild:function(node){node=Y.Dom.get(node);return Y.Dom.getLastChildBy(node);},getChildrenBy:function(node,method){var child=Y.Dom.getFirstChildBy(node,method);var children=child?[child]:[];Y.Dom.getNextSiblingBy(child,function(node){if(!method||method(node)){children[children.length]=node;}
return false;});return children;},getChildren:function(node){node=Y.Dom.get(node);if(!node){}
return Y.Dom.getChildrenBy(node);},getDocumentScrollLeft:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);},getDocumentScrollTop:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);},insertBefore:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
return referenceNode.parentNode.insertBefore(newNode,referenceNode);},insertAfter:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
if(referenceNode.nextSibling){return referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}else{return referenceNode.parentNode.appendChild(newNode);}}};})();YAHOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};YAHOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO.util.Region(t,r,b,l);}else{return null;}};YAHOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(el){var p=YAHOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Point=function(x,y){if(YAHOO.lang.isArray(x)){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.0",build:"442"});
YAHOO.util.CustomEvent=function(type,oScope,silent,signature){this.type=type;this.scope=oScope||window;this.silent=silent;this.signature=signature||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}
var onsubscribeType="_YUICEOnSubscribe";if(type!==onsubscribeType){this.subscribeEvent=new YAHOO.util.CustomEvent(onsubscribeType,this,true);}};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(fn,obj,override){if(!fn){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}
if(this.subscribeEvent){this.subscribeEvent.fire(fn,obj,override);}
this.subscribers.push(new YAHOO.util.Subscriber(fn,obj,override));},unsubscribe:function(fn,obj){if(!fn){return this.unsubscribeAll();}
var found=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,obj)){this._delete(i);found=true;}}
return found;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return true;}
var args=[],ret=true,i,rebuild=false;for(i=0;i<arguments.length;++i){args.push(arguments[i]);}
var argslength=args.length;if(!this.silent){}
for(i=0;i<len;++i){var s=this.subscribers[i];if(!s){rebuild=true;}else{if(!this.silent){}
var scope=s.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var param=null;if(args.length>0){param=args[0];}
ret=s.fn.call(scope,param,s.obj);}else{ret=s.fn.call(scope,this.type,args,s.obj);}
if(false===ret){if(!this.silent){}
return false;}}}
if(rebuild){var newlist=[],subs=this.subscribers;for(i=0,len=subs.length;i<len;++i){s=subs[i];newlist.push(subs[i]);}
this.subscribers=newlist;}
return true;},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}
this.subscribers=[];return i;},_delete:function(index){var s=this.subscribers[index];if(s){delete s.fn;delete s.obj;}
this.subscribers[index]=null;},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,override){this.fn=fn;this.obj=YAHOO.lang.isUndefined(obj)?null:obj;this.override=override;};YAHOO.util.Subscriber.prototype.getScope=function(defaultScope){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}
return defaultScope;};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){if(obj){return(this.fn==fn&&this.obj==obj);}else{return(this.fn==fn);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var loadComplete=false;var DOMReady=false;var listeners=[];var unloadListeners=[];var legacyEvents=[];var legacyHandlers=[];var retryCount=0;var onAvailStack=[];var legacyMap=[];var counter=0;var webkitKeymap={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}},onAvailable:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(p_fn,p_obj,p_override){if(DOMReady){setTimeout(function(){var s=window;if(p_override){if(p_override===true){s=p_obj;}else{s=p_override;}}
p_fn.call(s,"DOMReady",[],p_obj);},0);}else{this.DOMReadyEvent.subscribe(p_fn,p_obj,p_override);}},onContentReady:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:true});retryCount=this.POLL_RETRYS;this.startInterval();},addListener:function(el,sType,fn,obj,override){if(!fn||!fn.call){return false;}
if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=this.on(el[i],sType,fn,obj,override)&&ok;}
return ok;}else if(YAHOO.lang.isString(el)){var oEl=this.getEl(el);if(oEl){el=oEl;}else{this.onAvailable(el,function(){YAHOO.util.Event.on(el,sType,fn,obj,override);});return true;}}
if(!el){return false;}
if("unload"==sType&&obj!==this){unloadListeners[unloadListeners.length]=[el,sType,fn,obj,override];return true;}
var scope=el;if(override){if(override===true){scope=obj;}else{scope=override;}}
var wrappedFn=function(e){return fn.call(scope,YAHOO.util.Event.getEvent(e),obj);};var li=[el,sType,fn,wrappedFn,scope];var index=listeners.length;listeners[index]=li;if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);if(legacyIndex==-1||el!=legacyEvents[legacyIndex][0]){legacyIndex=legacyEvents.length;legacyMap[el.id+sType]=legacyIndex;legacyEvents[legacyIndex]=[el,sType,el["on"+sType]];legacyHandlers[legacyIndex]=[];el["on"+sType]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),legacyIndex);};}
legacyHandlers[legacyIndex].push(li);}else{try{this._simpleAdd(el,sType,wrappedFn,false);}catch(ex){this.lastError=ex;this.removeListener(el,sType,fn);return false;}}
return true;},fireLegacyEvent:function(e,legacyIndex){var ok=true,le,lh,li,scope,ret;lh=legacyHandlers[legacyIndex];for(var i=0,len=lh.length;i<len;++i){li=lh[i];if(li&&li[this.WFN]){scope=li[this.ADJ_SCOPE];ret=li[this.WFN].call(scope,e);ok=(ok&&ret);}}
le=legacyEvents[legacyIndex];if(le&&le[2]){le[2](e);}
return ok;},getLegacyIndex:function(el,sType){var key=this.generateId(el)+sType;if(typeof legacyMap[key]=="undefined"){return-1;}else{return legacyMap[key];}},useLegacyEvent:function(el,sType){if(this.webkit&&("click"==sType||"dblclick"==sType)){var v=parseInt(this.webkit,10);if(!isNaN(v)&&v<418){return true;}}
return false;},removeListener:function(el,sType,fn){var i,len;if(typeof el=="string"){el=this.getEl(el);}else if(this._isValidCollection(el)){var ok=true;for(i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],sType,fn)&&ok);}
return ok;}
if(!fn||!fn.call){return this.purgeElement(el,false,sType);}
if("unload"==sType){for(i=0,len=unloadListeners.length;i<len;i++){var li=unloadListeners[i];if(li&&li[0]==el&&li[1]==sType&&li[2]==fn){unloadListeners[i]=null;return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"==typeof index){index=this._getCacheIndex(el,sType,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);var llist=legacyHandlers[legacyIndex];if(llist){for(i=0,len=llist.length;i<len;++i){li=llist[i];if(li&&li[this.EL]==el&&li[this.TYPE]==sType&&li[this.FN]==fn){llist[i]=null;break;}}}}else{try{this._simpleRemove(el,sType,cacheItem[this.WFN],false);}catch(ex){this.lastError=ex;return false;}}
delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners[index]=null;return true;},getTarget:function(ev,resolveTextNode){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(node){if(node&&3==node.nodeType){return node.parentNode;}else{return node;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}
return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}
return y;},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){this.lastError=ex;return t;}}
return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;},getCharCode:function(ev){var code=ev.keyCode||ev.charCode||0;if(YAHOO.env.ua.webkit&&(code in webkitKeymap)){code=webkitKeymap[code];}
return code;},_getCacheIndex:function(el,sType,fn){for(var i=0,len=listeners.length;i<len;++i){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==sType){return i;}}
return-1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+counter;++counter;el.id=id;}
return id;},_isValidCollection:function(o){try{return(o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");}catch(e){return false;}},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(e){if(!loadComplete){loadComplete=true;var EU=YAHOO.util.Event;EU._ready();EU._tryPreloadAttach();}},_ready:function(e){if(!DOMReady){DOMReady=true;var EU=YAHOO.util.Event;EU.DOMReadyEvent.fire();EU._simpleRemove(document,"DOMContentLoaded",EU._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}
if(this.isIE){if(!DOMReady){this.startInterval();return false;}}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0);}
var notAvail=[];var executeItem=function(el,item){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);};var i,len,item,el;for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&!item.checkReady){el=this.getEl(item.id);if(el){executeItem(el,item);onAvailStack[i]=null;}else{notAvail.push(item);}}}
for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&item.checkReady){el=this.getEl(item.id);if(el){if(loadComplete||el.nextSibling){executeItem(el,item);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return true;},purgeElement:function(el,recurse,sType){var elListeners=this.getListeners(el,sType);if(elListeners){for(var i=0,len=elListeners.length;i<len;++i){var l=elListeners[i];this.removeListener(el,l.type,l.fn,l.index);}}
if(recurse&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],recurse,sType);}}},getListeners:function(el,sType){var results=[],searchLists;if(!sType){searchLists=[listeners,unloadListeners];}else if(sType=="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
for(var j=0;j<searchLists.length;++j){var searchList=searchLists[j];if(searchList&&searchList.length>0){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===el&&(!sType||sType===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;},_unload:function(e){var EU=YAHOO.util.Event,i,j,l,len,index;for(i=0,len=unloadListeners.length;i<len;++i){l=unloadListeners[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e),l[EU.OBJ]);unloadListeners[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners&&listeners.length>0){j=listeners.length;while(j){index=j-1;l=listeners[index];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],index);}
j=j-1;}
l=null;EU.clearCache();}
for(i=0,len=legacyEvents.length;i<len;++i){legacyEvents[i][0]=null;legacyEvents[i]=null;}
legacyEvents=null;EU._simpleRemove(window,"unload",EU._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(el,sType,fn,capture){el.addEventListener(sType,fn,(capture));};}else if(window.attachEvent){return function(el,sType,fn,capture){el.attachEvent("on"+sType,fn);};}else{return function(){};}}(),_simpleRemove:function(){if(window.removeEventListener){return function(el,sType,fn,capture){el.removeEventListener(sType,fn,(capture));};}else if(window.detachEvent){return function(el,sType,fn){el.detachEvent("on"+sType,fn);};}else{return function(){};}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var el,d=document,b=d.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){el=document.createElement("script");var p=d.getElementsByTagName("head")[0]||b;p.insertBefore(el,p.firstChild);}else{d.write('<scr'+'ipt id="_yui_eu_dr" defer="true" src="//:"><'+'/script>');el=document.getElementById("_yui_eu_dr");}
if(el){el.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};}else{}
el=null;}else if(EU.webkit){EU._drwatch=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._drwatch);EU._drwatch=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}
EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}
YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(p_type,p_fn,p_obj,p_override){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){ce.subscribe(p_fn,p_obj,p_override);}else{this.__yui_subscribers=this.__yui_subscribers||{};var subs=this.__yui_subscribers;if(!subs[p_type]){subs[p_type]=[];}
subs[p_type].push({fn:p_fn,obj:p_obj,override:p_override});}},unsubscribe:function(p_type,p_fn,p_obj){this.__yui_events=this.__yui_events||{};var evts=this.__yui_events;if(p_type){var ce=evts[p_type];if(ce){return ce.unsubscribe(p_fn,p_obj);}}else{for(var i in evts){var ret=true;if(YAHOO.lang.hasOwnProperty(evts,i)){ret=ret&&evts[i].unsubscribe(p_fn,p_obj);}}
return ret;}
return false;},unsubscribeAll:function(p_type){return this.unsubscribe(p_type);},createEvent:function(p_type,p_config){this.__yui_events=this.__yui_events||{};var opts=p_config||{};var events=this.__yui_events;if(events[p_type]){}else{var scope=opts.scope||this;var silent=(opts.silent);var ce=new YAHOO.util.CustomEvent(p_type,scope,silent,YAHOO.util.CustomEvent.FLAT);events[p_type]=ce;if(opts.onSubscribeCallback){ce.subscribeEvent.subscribe(opts.onSubscribeCallback);}
this.__yui_subscribers=this.__yui_subscribers||{};var qs=this.__yui_subscribers[p_type];if(qs){for(var i=0;i<qs.length;++i){ce.subscribe(qs[i].fn,qs[i].obj,qs[i].override);}}}
return events[p_type];},fireEvent:function(p_type,arg1,arg2,etc){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(!ce){return null;}
var args=[];for(var i=1;i<arguments.length;++i){args.push(arguments[i]);}
return ce.fire.apply(ce,args);},hasEvent:function(type){if(this.__yui_events){if(this.__yui_events[type]){return true;}}
return false;}};YAHOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!attachTo){}else if(!keyData){}else if(!handler){}
if(!event){event=YAHOO.util.KeyListener.KEYDOWN;}
var keyEvent=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){var dataItem;var keyPressed;if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){dataItem=keyData.keys[i];if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);break;}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);break;}}}else{dataItem=keyData.keys;if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);}}}}
this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+
(attachTo.id?"["+attachTo.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.0",build:"442"});
YAHOO.util.Connect={_msxml_progid:['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:'application/x-www-form-urlencoded; charset=UTF-8',_use_default_xhr_header:true,_default_xhr_header:'XMLHttpRequest',_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function()
{if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,'click',function(e){var obj=YAHOO.util.Event.getTarget(e);if(obj.type=='submit'){YAHOO.util.Connect._submitElementValue=encodeURIComponent(obj.name)+"="+encodeURIComponent(obj.value);}});return true;}
return false;})(),startEvent:new YAHOO.util.CustomEvent('start'),completeEvent:new YAHOO.util.CustomEvent('complete'),successEvent:new YAHOO.util.CustomEvent('success'),failureEvent:new YAHOO.util.CustomEvent('failure'),uploadEvent:new YAHOO.util.CustomEvent('upload'),abortEvent:new YAHOO.util.CustomEvent('abort'),_customEvents:{onStart:['startEvent','start'],onComplete:['completeEvent','complete'],onSuccess:['successEvent','success'],onFailure:['failureEvent','failure'],onUpload:['uploadEvent','upload'],onAbort:['abortEvent','abort']},setProgId:function(id)
{this._msxml_progid.unshift(id);},setDefaultPostHeader:function(b)
{this._use_default_post_header=b;},setDefaultXhrHeader:function(b)
{this._use_default_xhr_header=b;},setPollingInterval:function(i)
{if(typeof i=='number'&&isFinite(i)){this._polling_interval=i;}},createXhrObject:function(transactionId)
{var obj,http;try
{http=new XMLHttpRequest();obj={conn:http,tId:transactionId};}
catch(e)
{for(var i=0;i<this._msxml_progid.length;++i){try
{http=new ActiveXObject(this._msxml_progid[i]);obj={conn:http,tId:transactionId};break;}
catch(e){}}}
finally
{return obj;}},getConnectionObject:function(isFileUpload)
{var o;var tId=this._transaction_id;try
{if(!isFileUpload){o=this.createXhrObject(tId);}
else{o={};o.tId=tId;o.isUpload=true;}
if(o){this._transaction_id++;}}
catch(e){}
finally
{return o;}},asyncRequest:function(method,uri,callback,postData)
{var o=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();if(!o){return null;}
else{if(callback&&callback.customevents){this.initCustomEvents(o,callback);}
if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(o,callback,uri,postData);return o;}
if(method.toUpperCase()=='GET'){if(this._sFormData.length!==0){uri+=((uri.indexOf('?')==-1)?'?':'&')+this._sFormData;}
else{uri+="?"+this._sFormData;}}
else if(method.toUpperCase()=='POST'){postData=postData?this._sFormData+"&"+postData:this._sFormData;}}
o.conn.open(method,uri,true);if(this._use_default_xhr_header){if(!this._default_headers['X-Requested-With']){this.initHeader('X-Requested-With',this._default_xhr_header,true);}}
if(this._isFormSubmit||(postData&&this._use_default_post_header)){this.initHeader('Content-Type',this._default_post_header);if(this._isFormSubmit){this.resetFormState();}}
if(this._has_default_headers||this._has_http_headers){this.setHeader(o);}
this.handleReadyState(o,callback);o.conn.send(postData||null);this.startEvent.fire(o);if(o.startEvent){o.startEvent.fire(o);}
return o;}},initCustomEvents:function(o,callback)
{for(var prop in callback.customevents){if(this._customEvents[prop][0]){o[this._customEvents[prop][0]]=new YAHOO.util.CustomEvent(this._customEvents[prop][1],(callback.scope)?callback.scope:null);o[this._customEvents[prop][0]].subscribe(callback.customevents[prop]);}}},handleReadyState:function(o,callback)
{var oConn=this;if(callback&&callback.timeout){this._timeOut[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
this._poll[o.tId]=window.setInterval(function(){if(o.conn&&o.conn.readyState===4){window.clearInterval(oConn._poll[o.tId]);delete oConn._poll[o.tId];if(callback&&callback.timeout){window.clearTimeout(oConn._timeOut[o.tId]);delete oConn._timeOut[o.tId];}
oConn.completeEvent.fire(o);if(o.completeEvent){o.completeEvent.fire(o);}
oConn.handleTransactionResponse(o,callback);}},this._polling_interval);},handleTransactionResponse:function(o,callback,isAbort)
{if(!callback){this.releaseObject(o);return;}
var httpStatus,responseObject;try
{if(o.conn.status!==undefined&&o.conn.status!==0){httpStatus=o.conn.status;}
else{httpStatus=13030;}}
catch(e){httpStatus=13030;}
if(httpStatus>=200&&httpStatus<300||httpStatus===1223){responseObject=this.createResponseObject(o,callback.argument);if(callback.success){if(!callback.scope){callback.success(responseObject);}
else{callback.success.apply(callback.scope,[responseObject]);}}
this.successEvent.fire(responseObject);if(o.successEvent){o.successEvent.fire(responseObject);}}
else{switch(httpStatus){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:responseObject=this.createExceptionObject(o.tId,callback.argument,(isAbort?isAbort:false));if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}
break;default:responseObject=this.createResponseObject(o,callback.argument);if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}}
this.failureEvent.fire(responseObject);if(o.failureEvent){o.failureEvent.fire(responseObject);}}
this.releaseObject(o);responseObject=null;},createResponseObject:function(o,callbackArg)
{var obj={};var headerObj={};try
{var headerStr=o.conn.getAllResponseHeaders();var header=headerStr.split('\n');for(var i=0;i<header.length;i++){var delimitPos=header[i].indexOf(':');if(delimitPos!=-1){headerObj[header[i].substring(0,delimitPos)]=header[i].substring(delimitPos+2);}}}
catch(e){}
obj.tId=o.tId;obj.status=(o.conn.status==1223)?204:o.conn.status;obj.statusText=(o.conn.status==1223)?"No Content":o.conn.statusText;obj.getResponseHeader=headerObj;obj.getAllResponseHeaders=headerStr;obj.responseText=o.conn.responseText;obj.responseXML=o.conn.responseXML;if(typeof callbackArg!==undefined){obj.argument=callbackArg;}
return obj;},createExceptionObject:function(tId,callbackArg,isAbort)
{var COMM_CODE=0;var COMM_ERROR='communication failure';var ABORT_CODE=-1;var ABORT_ERROR='transaction aborted';var obj={};obj.tId=tId;if(isAbort){obj.status=ABORT_CODE;obj.statusText=ABORT_ERROR;}
else{obj.status=COMM_CODE;obj.statusText=COMM_ERROR;}
if(callbackArg){obj.argument=callbackArg;}
return obj;},initHeader:function(label,value,isDefault)
{var headerObj=(isDefault)?this._default_headers:this._http_headers;if(headerObj[label]===undefined){headerObj[label]=value;}
else{headerObj[label]=value+","+headerObj[label];}
if(isDefault){this._has_default_headers=true;}
else{this._has_http_headers=true;}},setHeader:function(o)
{if(this._has_default_headers){for(var prop in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,prop)){o.conn.setRequestHeader(prop,this._default_headers[prop]);}}}
if(this._has_http_headers){for(var prop in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,prop)){o.conn.setRequestHeader(prop,this._http_headers[prop]);}}
delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false;},setForm:function(formId,isUpload,secureUri)
{this.resetFormState();var oForm;if(typeof formId=='string'){oForm=(document.getElementById(formId)||document.forms[formId]);}
else if(typeof formId=='object'){oForm=formId;}
else{return;}
if(isUpload){var io=this.createFrame(secureUri?secureUri:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=oForm;return;}
var oElement,oName,oValue,oDisabled;var hasSubmit=false;for(var i=0;i<oForm.elements.length;i++){oElement=oForm.elements[i];oDisabled=oForm.elements[i].disabled;oName=oForm.elements[i].name;oValue=oForm.elements[i].value;if(!oDisabled&&oName)
{switch(oElement.type)
{case'select-one':case'select-multiple':for(var j=0;j<oElement.options.length;j++){if(oElement.options[j].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].attributes['value'].specified?oElement.options[j].value:oElement.options[j].text)+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].hasAttribute('value')?oElement.options[j].value:oElement.options[j].text)+'&';}}}
break;case'radio':case'checkbox':if(oElement.checked){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
break;case'file':case undefined:case'reset':case'button':break;case'submit':if(hasSubmit===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
hasSubmit=true;}
break;default:this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}}}
this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(secureUri){var frameId='yuiIO'+this._transaction_id;var io;if(window.ActiveXObject){io=document.createElement('<iframe id="'+frameId+'" name="'+frameId+'" />');if(typeof secureUri=='boolean'){io.src='javascript:false';}
else if(typeof secureURI=='string'){io.src=secureUri;}}
else{io=document.createElement('iframe');io.id=frameId;io.name=frameId;}
io.style.position='absolute';io.style.top='-1000px';io.style.left='-1000px';document.body.appendChild(io);},appendPostData:function(postData)
{var formElements=[];var postMessage=postData.split('&');for(var i=0;i<postMessage.length;i++){var delimitPos=postMessage[i].indexOf('=');if(delimitPos!=-1){formElements[i]=document.createElement('input');formElements[i].type='hidden';formElements[i].name=postMessage[i].substring(0,delimitPos);formElements[i].value=postMessage[i].substring(delimitPos+1);this._formNode.appendChild(formElements[i]);}}
return formElements;},uploadFile:function(o,callback,uri,postData){var frameId='yuiIO'+o.tId;var uploadEncoding='multipart/form-data';var io=document.getElementById(frameId);var oConn=this;var rawFormAttributes={action:this._formNode.getAttribute('action'),method:this._formNode.getAttribute('method'),target:this._formNode.getAttribute('target')};this._formNode.setAttribute('action',uri);this._formNode.setAttribute('method','POST');this._formNode.setAttribute('target',frameId);if(this._formNode.encoding){this._formNode.setAttribute('encoding',uploadEncoding);}
else{this._formNode.setAttribute('enctype',uploadEncoding);}
if(postData){var oElements=this.appendPostData(postData);}
this._formNode.submit();this.startEvent.fire(o);if(o.startEvent){o.startEvent.fire(o);}
if(callback&&callback.timeout){this._timeOut[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
if(oElements&&oElements.length>0){for(var i=0;i<oElements.length;i++){this._formNode.removeChild(oElements[i]);}}
for(var prop in rawFormAttributes){if(YAHOO.lang.hasOwnProperty(rawFormAttributes,prop)){if(rawFormAttributes[prop]){this._formNode.setAttribute(prop,rawFormAttributes[prop]);}
else{this._formNode.removeAttribute(prop);}}}
this.resetFormState();var uploadCallback=function()
{if(callback&&callback.timeout){window.clearTimeout(oConn._timeOut[o.tId]);delete oConn._timeOut[o.tId];}
oConn.completeEvent.fire(o);if(o.completeEvent){o.completeEvent.fire(o);}
var obj={};obj.tId=o.tId;obj.argument=callback.argument;try
{obj.responseText=io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:io.contentWindow.document.documentElement.textContent;obj.responseXML=io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;}
catch(e){}
if(callback&&callback.upload){if(!callback.scope){callback.upload(obj);}
else{callback.upload.apply(callback.scope,[obj]);}}
oConn.uploadEvent.fire(obj);if(o.uploadEvent){o.uploadEvent.fire(obj);}
if(YAHOO.util.Event){YAHOO.util.Event.removeListener(io,"load",uploadCallback);}
else if(window.detachEvent){io.detachEvent('onload',uploadCallback);}
else{io.removeEventListener('load',uploadCallback,false);}
setTimeout(function(){document.body.removeChild(io);oConn.releaseObject(o);},100);};if(YAHOO.util.Event){YAHOO.util.Event.addListener(io,"load",uploadCallback);}
else if(window.attachEvent){io.attachEvent('onload',uploadCallback);}
else{io.addEventListener('load',uploadCallback,false);}},abort:function(o,callback,isTimeout)
{var abortStatus;if(o.conn){if(this.isCallInProgress(o)){o.conn.abort();window.clearInterval(this._poll[o.tId]);delete this._poll[o.tId];if(isTimeout){window.clearTimeout(this._timeOut[o.tId]);delete this._timeOut[o.tId];}
abortStatus=true;}}
else if(o.isUpload===true){var frameId='yuiIO'+o.tId;var io=document.getElementById(frameId);if(io){document.body.removeChild(io);if(isTimeout){window.clearTimeout(this._timeOut[o.tId]);delete this._timeOut[o.tId];}
abortStatus=true;}}
else{abortStatus=false;}
if(abortStatus===true){this.abortEvent.fire(o);if(o.abortEvent){o.abortEvent.fire(o);}
this.handleTransactionResponse(o,callback,true);}
else{}
return abortStatus;},isCallInProgress:function(o)
{if(o&&o.conn){return o.conn.readyState!==4&&o.conn.readyState!==0;}
else if(o&&o.isUpload===true){var frameId='yuiIO'+o.tId;return document.getElementById(frameId)?true:false;}
else{return false;}},releaseObject:function(o)
{if(o.conn){o.conn=null;}
o=null;}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.3.0",build:"442"});
YAHOO.util.Anim=function(el,attributes,duration,method){if(!el){}
this.init(el,attributes,duration,method);};YAHOO.util.Anim.prototype={toString:function(){var el=this.getEl();var id=el.id||el.tagName||el;return("Anim "+id);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(attr,start,end){return this.method(this.currentFrame,start,end-start,this.totalFrames);},setAttribute:function(attr,val,unit){if(this.patterns.noNegatives.test(attr)){val=(val>0)?val:0;}
YAHOO.util.Dom.setStyle(this.getEl(),attr,val+unit);},getAttribute:function(attr){var el=this.getEl();var val=YAHOO.util.Dom.getStyle(el,attr);if(val!=='auto'&&!this.patterns.offsetUnit.test(val)){return parseFloat(val);}
var a=this.patterns.offsetAttribute.exec(attr)||[];var pos=!!(a[3]);var box=!!(a[2]);if(box||(YAHOO.util.Dom.getStyle(el,'position')=='absolute'&&pos)){val=el['offset'+a[0].charAt(0).toUpperCase()+a[0].substr(1)];}else{val=0;}
return val;},getDefaultUnit:function(attr){if(this.patterns.defaultUnit.test(attr)){return'px';}
return'';},setRuntimeAttribute:function(attr){var start;var end;var attributes=this.attributes;this.runtimeAttributes[attr]={};var isset=function(prop){return(typeof prop!=='undefined');};if(!isset(attributes[attr]['to'])&&!isset(attributes[attr]['by'])){return false;}
start=(isset(attributes[attr]['from']))?attributes[attr]['from']:this.getAttribute(attr);if(isset(attributes[attr]['to'])){end=attributes[attr]['to'];}else if(isset(attributes[attr]['by'])){if(start.constructor==Array){end=[];for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+attributes[attr]['by'][i]*1;}}else{end=start+attributes[attr]['by']*1;}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;this.runtimeAttributes[attr].unit=(isset(attributes[attr].unit))?attributes[attr]['unit']:this.getDefaultUnit(attr);return true;},init:function(el,attributes,duration,method){var isAnimated=false;var startTime=null;var actualFrames=0;el=YAHOO.util.Dom.get(el);this.attributes=attributes||{};this.duration=!YAHOO.lang.isUndefined(duration)?duration:1;this.method=method||YAHOO.util.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=YAHOO.util.AnimMgr.fps;this.setEl=function(element){el=YAHOO.util.Dom.get(element);};this.getEl=function(){return el;};this.isAnimated=function(){return isAnimated;};this.getStartTime=function(){return startTime;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}
this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(YAHOO.util.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}
YAHOO.util.AnimMgr.registerElement(this);return true;};this.stop=function(finish){if(finish){this.currentFrame=this.totalFrames;this._onTween.fire();}
YAHOO.util.AnimMgr.stop(this);};var onStart=function(){this.onStart.fire();this.runtimeAttributes={};for(var attr in this.attributes){this.setRuntimeAttribute(attr);}
isAnimated=true;actualFrames=0;startTime=new Date();};var onTween=function(){var data={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};data.toString=function(){return('duration: '+data.duration+', currentFrame: '+data.currentFrame);};this.onTween.fire(data);var runtimeAttributes=this.runtimeAttributes;for(var attr in runtimeAttributes){this.setAttribute(attr,this.doMethod(attr,runtimeAttributes[attr].start,runtimeAttributes[attr].end),runtimeAttributes[attr].unit);}
actualFrames+=1;};var onComplete=function(){var actual_duration=(new Date()-startTime)/1000;var data={duration:actual_duration,frames:actualFrames,fps:actualFrames/actual_duration};data.toString=function(){return('duration: '+data.duration+', frames: '+data.frames+', fps: '+data.fps);};isAnimated=false;actualFrames=0;this.onComplete.fire(data);};this._onStart=new YAHOO.util.CustomEvent('_start',this,true);this.onStart=new YAHOO.util.CustomEvent('start',this);this.onTween=new YAHOO.util.CustomEvent('tween',this);this._onTween=new YAHOO.util.CustomEvent('_tween',this,true);this.onComplete=new YAHOO.util.CustomEvent('complete',this);this._onComplete=new YAHOO.util.CustomEvent('_complete',this,true);this._onStart.subscribe(onStart);this._onTween.subscribe(onTween);this._onComplete.subscribe(onComplete);}};YAHOO.util.AnimMgr=new function(){var thread=null;var queue=[];var tweenCount=0;this.fps=1000;this.delay=1;this.registerElement=function(tween){queue[queue.length]=tween;tweenCount+=1;tween._onStart.fire();this.start();};this.unRegister=function(tween,index){tween._onComplete.fire();index=index||getIndex(tween);if(index==-1){return false;}
queue.splice(index,1);tweenCount-=1;if(tweenCount<=0){this.stop();}
return true;};this.start=function(){if(thread===null){thread=setInterval(this.run,this.delay);}};this.stop=function(tween){if(!tween){clearInterval(thread);for(var i=0,len=queue.length;i<len;++i){if(queue[0].isAnimated()){this.unRegister(queue[0],0);}}
queue=[];thread=null;tweenCount=0;}
else{this.unRegister(tween);}};this.run=function(){for(var i=0,len=queue.length;i<len;++i){var tween=queue[i];if(!tween||!tween.isAnimated()){continue;}
if(tween.currentFrame<tween.totalFrames||tween.totalFrames===null)
{tween.currentFrame+=1;if(tween.useSeconds){correctFrame(tween);}
tween._onTween.fire();}
else{YAHOO.util.AnimMgr.stop(tween,i);}}};var getIndex=function(anim){for(var i=0,len=queue.length;i<len;++i){if(queue[i]==anim){return i;}}
return-1;};var correctFrame=function(tween){var frames=tween.totalFrames;var frame=tween.currentFrame;var expected=(tween.currentFrame*tween.duration*1000/tween.totalFrames);var elapsed=(new Date()-tween.getStartTime());var tweak=0;if(elapsed<tween.duration*1000){tweak=Math.round((elapsed/expected-1)*tween.currentFrame);}else{tweak=frames-(frame+1);}
if(tweak>0&&isFinite(tweak)){if(tween.currentFrame+tweak>=frames){tweak=frames-(frame+1);}
tween.currentFrame+=tweak;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(points,t){var n=points.length;var tmp=[];for(var i=0;i<n;++i){tmp[i]=[points[i][0],points[i][1]];}
for(var j=1;j<n;++j){for(i=0;i<n-j;++i){tmp[i][0]=(1-t)*tmp[i][0]+t*tmp[parseInt(i+1,10)][0];tmp[i][1]=(1-t)*tmp[i][1]+t*tmp[parseInt(i+1,10)][1];}}
return[tmp[0][0],tmp[0][1]];};};(function(){YAHOO.util.ColorAnim=function(el,attributes,duration,method){YAHOO.util.ColorAnim.superclass.constructor.call(this,el,attributes,duration,method);};YAHOO.extend(YAHOO.util.ColorAnim,YAHOO.util.Anim);var Y=YAHOO.util;var superclass=Y.ColorAnim.superclass;var proto=Y.ColorAnim.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("ColorAnim "+id);};proto.patterns.color=/color$/i;proto.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;proto.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;proto.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;proto.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;proto.parseColor=function(s){if(s.length==3){return s;}
var c=this.patterns.hex.exec(s);if(c&&c.length==4){return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)];}
c=this.patterns.rgb.exec(s);if(c&&c.length==4){return[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)];}
c=this.patterns.hex3.exec(s);if(c&&c.length==4){return[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)];}
return null;};proto.getAttribute=function(attr){var el=this.getEl();if(this.patterns.color.test(attr)){var val=YAHOO.util.Dom.getStyle(el,attr);if(this.patterns.transparent.test(val)){var parent=el.parentNode;val=Y.Dom.getStyle(parent,attr);while(parent&&this.patterns.transparent.test(val)){parent=parent.parentNode;val=Y.Dom.getStyle(parent,attr);if(parent.tagName.toUpperCase()=='HTML'){val='#fff';}}}}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val;if(this.patterns.color.test(attr)){val=[];for(var i=0,len=start.length;i<len;++i){val[i]=superclass.doMethod.call(this,attr,start[i],end[i]);}
val='rgb('+Math.floor(val[0])+','+Math.floor(val[1])+','+Math.floor(val[2])+')';}
else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){superclass.setRuntimeAttribute.call(this,attr);if(this.patterns.color.test(attr)){var attributes=this.attributes;var start=this.parseColor(this.runtimeAttributes[attr].start);var end=this.parseColor(this.runtimeAttributes[attr].end);if(typeof attributes[attr]['to']==='undefined'&&typeof attributes[attr]['by']!=='undefined'){end=this.parseColor(attributes[attr].by);for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+end[i];}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;}};})();YAHOO.util.Easing={easeNone:function(t,b,c,d){return c*t/d+b;},easeIn:function(t,b,c,d){return c*(t/=d)*t+b;},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeBoth:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b;}
return-c/2*((--t)*(t-2)-1)+b;},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeBothStrong:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b;}
return-c/2*((t-=2)*t*t*t-2)+b;},elasticIn:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},elasticOut:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},elasticBoth:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d/2)==2){return b+c;}
if(!p){p=d*(.3*1.5);}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
if(t<1){return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},backIn:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*(t/=d)*t*((s+1)*t-s)+b;},backOut:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},backBoth:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},bounceIn:function(t,b,c,d){return c-YAHOO.util.Easing.bounceOut(d-t,0,c,d)+b;},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}
return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},bounceBoth:function(t,b,c,d){if(t<d/2){return YAHOO.util.Easing.bounceIn(t*2,0,c,d)*.5+b;}
return YAHOO.util.Easing.bounceOut(t*2-d,0,c,d)*.5+c*.5+b;}};(function(){YAHOO.util.Motion=function(el,attributes,duration,method){if(el){YAHOO.util.Motion.superclass.constructor.call(this,el,attributes,duration,method);}};YAHOO.extend(YAHOO.util.Motion,YAHOO.util.ColorAnim);var Y=YAHOO.util;var superclass=Y.Motion.superclass;var proto=Y.Motion.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("Motion "+id);};proto.patterns.points=/^points$/i;proto.setAttribute=function(attr,val,unit){if(this.patterns.points.test(attr)){unit=unit||'px';superclass.setAttribute.call(this,'left',val[0],unit);superclass.setAttribute.call(this,'top',val[1],unit);}else{superclass.setAttribute.call(this,attr,val,unit);}};proto.getAttribute=function(attr){if(this.patterns.points.test(attr)){var val=[superclass.getAttribute.call(this,'left'),superclass.getAttribute.call(this,'top')];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val=null;if(this.patterns.points.test(attr)){var t=this.method(this.currentFrame,0,100,this.totalFrames)/100;val=Y.Bezier.getPosition(this.runtimeAttributes[attr],t);}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){if(this.patterns.points.test(attr)){var el=this.getEl();var attributes=this.attributes;var start;var control=attributes['points']['control']||[];var end;var i,len;if(control.length>0&&!(control[0]instanceof Array)){control=[control];}else{var tmp=[];for(i=0,len=control.length;i<len;++i){tmp[i]=control[i];}
control=tmp;}
if(Y.Dom.getStyle(el,'position')=='static'){Y.Dom.setStyle(el,'position','relative');}
if(isset(attributes['points']['from'])){Y.Dom.setXY(el,attributes['points']['from']);}
else{Y.Dom.setXY(el,Y.Dom.getXY(el));}
start=this.getAttribute('points');if(isset(attributes['points']['to'])){end=translateValues.call(this,attributes['points']['to'],start);var pageXY=Y.Dom.getXY(this.getEl());for(i=0,len=control.length;i<len;++i){control[i]=translateValues.call(this,control[i],start);}}else if(isset(attributes['points']['by'])){end=[start[0]+attributes['points']['by'][0],start[1]+attributes['points']['by'][1]];for(i=0,len=control.length;i<len;++i){control[i]=[start[0]+control[i][0],start[1]+control[i][1]];}}
this.runtimeAttributes[attr]=[start];if(control.length>0){this.runtimeAttributes[attr]=this.runtimeAttributes[attr].concat(control);}
this.runtimeAttributes[attr][this.runtimeAttributes[attr].length]=end;}
else{superclass.setRuntimeAttribute.call(this,attr);}};var translateValues=function(val,start){var pageXY=Y.Dom.getXY(this.getEl());val=[val[0]-pageXY[0]+start[0],val[1]-pageXY[1]+start[1]];return val;};var isset=function(prop){return(typeof prop!=='undefined');};})();(function(){YAHOO.util.Scroll=function(el,attributes,duration,method){if(el){YAHOO.util.Scroll.superclass.constructor.call(this,el,attributes,duration,method);}};YAHOO.extend(YAHOO.util.Scroll,YAHOO.util.ColorAnim);var Y=YAHOO.util;var superclass=Y.Scroll.superclass;var proto=Y.Scroll.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("Scroll "+id);};proto.doMethod=function(attr,start,end){var val=null;if(attr=='scroll'){val=[this.method(this.currentFrame,start[0],end[0]-start[0],this.totalFrames),this.method(this.currentFrame,start[1],end[1]-start[1],this.totalFrames)];}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.getAttribute=function(attr){var val=null;var el=this.getEl();if(attr=='scroll'){val=[el.scrollLeft,el.scrollTop];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.setAttribute=function(attr,val,unit){var el=this.getEl();if(attr=='scroll'){el.scrollLeft=val[0];el.scrollTop=val[1];}else{superclass.setAttribute.call(this,attr,val,unit);}};})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.3.0",build:"442"});
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var Event=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(sMethod,args){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}
oDD[sMethod].apply(oDD,args);}}},_onLoad:function(){this.init();Event.on(document,"mouseup",this.handleMouseUp,this,true);Event.on(document,"mousemove",this.handleMouseMove,this,true);Event.on(window,"unload",this._onUnload,this,true);Event.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,sGroup){if(!this.initialized){this.init();}
if(!this.ids[sGroup]){this.ids[sGroup]={};}
this.ids[sGroup][oDD.id]=oDD;},removeDDFromGroup:function(oDD,sGroup){if(!this.ids[sGroup]){this.ids[sGroup]={};}
var obj=this.ids[sGroup];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}
delete this.handleIds[oDD.id];},regHandle:function(sDDId,sHandleId){if(!this.handleIds[sDDId]){this.handleIds[sDDId]={};}
this.handleIds[sDDId][sHandleId]=sHandleId;},isDragDrop:function(id){return(this.getDDById(id))?true:false;},getRelated:function(p_oDD,bTargetsOnly){var oDDs=[];for(var i in p_oDD.groups){for(j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}
if(!bTargetsOnly||dd.isTarget){oDDs[oDDs.length]=dd;}}}
return oDDs;},isLegalTarget:function(oDD,oTargetDD){var targets=this.getRelated(oDD,true);for(var i=0,len=targets.length;i<len;++i){if(targets[i].id==oTargetDD.id){return true;}}
return false;},isTypeOfDD:function(oDD){return(oDD&&oDD.__ygDragDrop);},isHandle:function(sDDId,sHandleId){return(this.handleIds[sDDId]&&this.handleIds[sDDId][sHandleId]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}
return null;},handleMouseDown:function(e,oDD){this.currentTarget=YAHOO.util.Event.getTarget(e);this.dragCurrent=oDD;var el=oDD.getEl();this.startX=YAHOO.util.Event.getPageX(e);this.startY=YAHOO.util.Event.getPageY(e);this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=YAHOO.util.DDM;DDM.startDrag(DDM.startX,DDM.startY);},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);var dc=this.dragCurrent;if(dc){dc.b4StartDrag(x,y);}
if(dc){dc.startDrag(x,y);}
this.dragThreshMet=true;},handleMouseUp:function(e){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(e,true);}else{}
this.stopDrag(e);this.stopEvent(e);}},stopEvent:function(e){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(e);}
if(this.preventDefault){YAHOO.util.Event.preventDefault(e);}},stopDrag:function(e,silent){if(this.dragCurrent&&!silent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(e);this.dragCurrent.endDrag(e);}
this.dragCurrent.onMouseUp(e);}
this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){var dc=this.dragCurrent;if(dc){if(YAHOO.util.Event.isIE&&!e.button){this.stopEvent(e);return this.handleMouseUp(e);}
if(!this.dragThreshMet){var diffX=Math.abs(this.startX-YAHOO.util.Event.getPageX(e));var diffY=Math.abs(this.startY-YAHOO.util.Event.getPageY(e));if(diffX>this.clickPixelThresh||diffY>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}
if(this.dragThreshMet){dc.b4Drag(e);if(dc){dc.onDrag(e);}
if(dc){this.fireEvents(e,false);}}
this.stopEvent(e);}},fireEvents:function(e,isDrop){var dc=this.dragCurrent;if(!dc||dc.isLocked()){return;}
var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);var pt=new YAHOO.util.Point(x,y);var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);var oldOvers=[];var outEvts=[];var overEvts=[];var dropEvts=[];var enterEvts=[];for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}
if(!this.isOverTarget(pt,ddo,this.mode,curRegion)){outEvts.push(ddo);}
oldOvers[i]=true;delete this.dragOvers[i];}
for(var sGroup in dc.groups){if("string"!=typeof sGroup){continue;}
for(i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(!this.isTypeOfDD(oDD)){continue;}
if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode,curRegion)){if(isDrop){dropEvts.push(oDD);}else{if(!oldOvers[oDD.id]){enterEvts.push(oDD);}else{overEvts.push(oDD);}
this.dragOvers[oDD.id]=oDD;}}}}}
this.interactionInfo={out:outEvts,enter:enterEvts,over:overEvts,drop:dropEvts,point:pt,draggedRegion:curRegion,sourceRegion:this.locationCache[dc.id],validDrop:isDrop};if(isDrop&&!dropEvts.length){this.interactionInfo.validDrop=false;dc.onInvalidDrop(e);}
if(this.mode){if(outEvts.length){dc.b4DragOut(e,outEvts);if(dc){dc.onDragOut(e,outEvts);}}
if(enterEvts.length){if(dc){dc.onDragEnter(e,enterEvts);}}
if(overEvts.length){if(dc){dc.b4DragOver(e,overEvts);}
if(dc){dc.onDragOver(e,overEvts);}}
if(dropEvts.length){if(dc){dc.b4DragDrop(e,dropEvts);}
if(dc){dc.onDragDrop(e,dropEvts);}}}else{var len=0;for(i=0,len=outEvts.length;i<len;++i){if(dc){dc.b4DragOut(e,outEvts[i].id);}
if(dc){dc.onDragOut(e,outEvts[i].id);}}
for(i=0,len=enterEvts.length;i<len;++i){if(dc){dc.onDragEnter(e,enterEvts[i].id);}}
for(i=0,len=overEvts.length;i<len;++i){if(dc){dc.b4DragOver(e,overEvts[i].id);}
if(dc){dc.onDragOver(e,overEvts[i].id);}}
for(i=0,len=dropEvts.length;i<len;++i){if(dc){dc.b4DragDrop(e,dropEvts[i].id);}
if(dc){dc.onDragDrop(e,dropEvts[i].id);}}}},getBestMatch:function(dds){var winner=null;var len=dds.length;if(len==1){winner=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(this.mode==this.INTERSECT&&dd.cursorIsOver){winner=dd;break;}else{if(!winner||!winner.overlap||(dd.overlap&&winner.overlap.getArea()<dd.overlap.getArea())){winner=dd;}}}}
return winner;},refreshCache:function(groups){var g=groups||this.ids;for(var sGroup in g){if("string"!=typeof sGroup){continue;}
for(var i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){try{if(el){var parent=el.offsetParent;if(parent){return true;}}}catch(e){}
return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}
var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=YAHOO.util.Dom.getXY(el);}catch(e){}
if(!pos){return null;}
x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new YAHOO.util.Region(t,r,b,l);},isOverTarget:function(pt,oTarget,intersect,curRegion){var loc=this.locationCache[oTarget.id];if(!loc||!this.useCache){loc=this.getLocation(oTarget);this.locationCache[oTarget.id]=loc;}
if(!loc){return false;}
oTarget.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||(!intersect&&!dc.constrainX&&!dc.constrainY)){return oTarget.cursorIsOver;}
oTarget.overlap=null;if(!curRegion){var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);}
var overlap=curRegion.intersect(loc);if(overlap){oTarget.overlap=overlap;return(intersect)?true:oTarget.cursorIsOver;}else{return false;}},_onUnload:function(e,me){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}
this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i];}
this.elementCache={};this.ids={};},elementCache:{},getElWrapper:function(id){var oWrapper=this.elementCache[id];if(!oWrapper||!oWrapper.el){oWrapper=this.elementCache[id]=new this.ElementWrapper(YAHOO.util.Dom.get(id));}
return oWrapper;},getElement:function(id){return YAHOO.util.Dom.get(id);},getCss:function(id){var el=YAHOO.util.Dom.get(id);return(el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return YAHOO.util.Dom.getX(el);},getPosY:function(el){return YAHOO.util.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else if(db){t=db.scrollTop;l=db.scrollLeft;}else{}
return{top:t,left:l};},getStyle:function(el,styleProp){return YAHOO.util.Dom.getStyle(el,styleProp);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(moveEl,targetEl){var aCoord=YAHOO.util.Dom.getXY(targetEl);YAHOO.util.Dom.setXY(moveEl,aCoord);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(a,b){return(a-b);},_timeoutCount:0,_addListeners:function(){var DDM=YAHOO.util.DDM;if(YAHOO.util.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(node,id){if(this.isHandle(id,node.id)){return true;}else{var p=node.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}
return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}
(function(){var Event=YAHOO.util.Event;var Dom=YAHOO.util.Dom;YAHOO.util.DragDrop=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=Dom.get(this.id);}
return this._domRef;},getDragEl:function(){return Dom.get(this.dragElId);},init:function(id,sGroup,config){this.initTarget(id,sGroup,config);Event.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);},initTarget:function(id,sGroup,config){this.config=config||{};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof id!=="string"){this._domRef=id;id=Dom.generateId(id);}
this.id=id;this.addToGroup((sGroup)?sGroup:"default");this.handleElId=id;Event.onAvailable(id,this.handleOnAvailable,this,true);this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(iTop,iRight,iBot,iLeft){if(!iRight&&0!==iRight){this.padding=[iTop,iTop,iTop,iTop];}else if(!iBot&&0!==iBot){this.padding=[iTop,iRight,iTop,iRight];}else{this.padding=[iTop,iRight,iBot,iLeft];}},setInitPosition:function(diffX,diffY){var el=this.getEl();if(!this.DDM.verifyEl(el)){return;}
var dx=diffX||0;var dy=diffY||0;var p=Dom.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||Dom.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(sGroup){this.groups[sGroup]=true;this.DDM.regDragDrop(this,sGroup);},removeFromGroup:function(sGroup){if(this.groups[sGroup]){delete this.groups[sGroup];}
this.DDM.removeDDFromGroup(this,sGroup);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
Event.on(id,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){Event.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){var button=e.which||e.button;if(this.primaryButtonOnly&&button>1){return;}
if(this.isLocked()){return;}
this.b4MouseDown(e);this.onMouseDown(e);this.DDM.refreshCache(this.groups);var pt=new YAHOO.util.Point(Event.getPageX(e),Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var target=Event.getTarget(e);return(this.isValidHandleChild(target)&&(this.id==this.handleElId||this.DDM.handleWasClicked(target,this.id)));},getTargetCoord:function(iPageX,iPageY){var x=iPageX-this.deltaX;var y=iPageY-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}
if(x>this.maxX){x=this.maxX;}}
if(this.constrainY){if(y<this.minY){y=this.minY;}
if(y>this.maxY){y=this.maxY;}}
x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return{x:x,y:y};},addInvalidHandleType:function(tagName){var type=tagName.toUpperCase();this.invalidHandleTypes[type]=type;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(cssClass){this.invalidHandleClasses.push(cssClass);},removeInvalidHandleType:function(tagName){var type=tagName.toUpperCase();delete this.invalidHandleTypes[type];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(cssClass){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==cssClass){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(node){var valid=true;var nodeName;try{nodeName=node.nodeName.toUpperCase();}catch(e){nodeName=node.nodeName;}
valid=valid&&!this.invalidHandleTypes[nodeName];valid=valid&&!this.invalidHandleIds[node.id];for(var i=0,len=this.invalidHandleClasses.length;valid&&i<len;++i){valid=!Dom.hasClass(node,this.invalidHandleClasses[i]);}
return valid;},setXTicks:function(iStartX,iTickSize){this.xTicks=[];this.xTickSize=iTickSize;var tickMap={};for(var i=this.initPageX;i>=this.minX;i=i-iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageX;i<=this.maxX;i=i+iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(iStartY,iTickSize){this.yTicks=[];this.yTickSize=iTickSize;var tickMap={};for(var i=this.initPageY;i>=this.minY;i=i-iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageY;i<=this.maxY;i=i+iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(iLeft,iRight,iTickSize){this.leftConstraint=parseInt(iLeft,10);this.rightConstraint=parseInt(iRight,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(iTickSize){this.setXTicks(this.initPageX,iTickSize);}
this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,iDown,iTickSize){this.topConstraint=parseInt(iUp,10);this.bottomConstraint=parseInt(iDown,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(iTickSize){this.setYTicks(this.initPageY,iTickSize);}
this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}
if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}
if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,tickArray){if(!tickArray){return val;}else if(tickArray[0]>=val){return tickArray[0];}else{for(var i=0,len=tickArray.length;i<len;++i){var next=i+1;if(tickArray[next]&&tickArray[next]>=val){var diff1=val-tickArray[i];var diff2=tickArray[next]-val;return(diff2>diff1)?tickArray[i]:tickArray[next];}}
return tickArray[tickArray.length-1];}},toString:function(){return("DragDrop "+this.id);}};})();YAHOO.util.DD=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(iPageX,iPageY){var x=iPageX-this.startPageX;var y=iPageY-this.startPageY;this.setDelta(x,y);},setDelta:function(iDeltaX,iDeltaY){this.deltaX=iDeltaX;this.deltaY=iDeltaY;},setDragElPos:function(iPageX,iPageY){var el=this.getDragEl();this.alignElWithMouse(el,iPageX,iPageY);},alignElWithMouse:function(el,iPageX,iPageY){var oCoord=this.getTargetCoord(iPageX,iPageY);if(!this.deltaSetXY){var aCoord=[oCoord.x,oCoord.y];YAHOO.util.Dom.setXY(el,aCoord);var newLeft=parseInt(YAHOO.util.Dom.getStyle(el,"left"),10);var newTop=parseInt(YAHOO.util.Dom.getStyle(el,"top"),10);this.deltaSetXY=[newLeft-oCoord.x,newTop-oCoord.y];}else{YAHOO.util.Dom.setStyle(el,"left",(oCoord.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(el,"top",(oCoord.y+this.deltaSetXY[1])+"px");}
this.cachePosition(oCoord.x,oCoord.y);this.autoScroll(oCoord.x,oCoord.y,el.offsetHeight,el.offsetWidth);},cachePosition:function(iPageX,iPageY){if(iPageX){this.lastPageX=iPageX;this.lastPageY=iPageY;}else{var aCoord=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=aCoord[0];this.lastPageY=aCoord[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var clientH=this.DDM.getClientHeight();var clientW=this.DDM.getClientWidth();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var right=w+x;var toBot=(clientH+st-y-this.deltaY);var toRight=(clientW+sl-x-this.deltaX);var thresh=40;var scrAmt=(document.all)?80:30;if(bot>clientH&&toBot<thresh){window.scrollTo(sl,st+scrAmt);}
if(y<st&&st>0&&y-st<thresh){window.scrollTo(sl,st-scrAmt);}
if(right>clientW&&toRight<thresh){window.scrollTo(sl+scrAmt,st);}
if(x<sl&&sl>0&&x-sl<thresh){window.scrollTo(sl-scrAmt,st);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},b4Drag:function(e){this.setDragElPos(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(id,sGroup,config){if(id){this.init(id,sGroup,config);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this,body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}
var div=this.getDragEl(),Dom=YAHOO.util.Dom;if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;s.height="25px";s.width="25px";var _data=document.createElement('div');Dom.setStyle(_data,'height','100%');Dom.setStyle(_data,'width','100%');Dom.setStyle(_data,'background-color','#ccc');Dom.setStyle(_data,'opacity','0');div.appendChild(_data);body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(iPageX,iPageY){var el=this.getEl();var dragEl=this.getDragEl();var s=dragEl.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}
this.setDragElPos(iPageX,iPageY);YAHOO.util.Dom.setStyle(dragEl,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var DOM=YAHOO.util.Dom;var el=this.getEl();var dragEl=this.getDragEl();var bt=parseInt(DOM.getStyle(dragEl,"borderTopWidth"),10);var br=parseInt(DOM.getStyle(dragEl,"borderRightWidth"),10);var bb=parseInt(DOM.getStyle(dragEl,"borderBottomWidth"),10);var bl=parseInt(DOM.getStyle(dragEl,"borderLeftWidth"),10);if(isNaN(bt)){bt=0;}
if(isNaN(br)){br=0;}
if(isNaN(bb)){bb=0;}
if(isNaN(bl)){bl=0;}
var newWidth=Math.max(0,el.offsetWidth-br-bl);var newHeight=Math.max(0,el.offsetHeight-bt-bb);DOM.setStyle(dragEl,"width",newWidth+"px");DOM.setStyle(dragEl,"height",newHeight+"px");}},b4MouseDown:function(e){this.setStartPosition();var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.autoOffset(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(e){var DOM=YAHOO.util.Dom;var lel=this.getEl();var del=this.getDragEl();DOM.setStyle(del,"visibility","");DOM.setStyle(lel,"visibility","hidden");YAHOO.util.DDM.moveToEl(lel,del);DOM.setStyle(del,"visibility","hidden");DOM.setStyle(lel,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(id,sGroup,config){if(id){this.initTarget(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.3.0",build:"442"});
YAHOO.util.Attribute=function(hash,owner){if(owner){this.owner=owner;this.configure(hash,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value;},setValue:function(value,silent){var beforeRetVal;var owner=this.owner;var name=this.name;var event={type:name,prevValue:this.getValue(),newValue:value};if(this.readOnly||(this.writeOnce&&this._written)){return false;}
if(this.validator&&!this.validator.call(owner,value)){return false;}
if(!silent){beforeRetVal=owner.fireBeforeChangeEvent(event);if(beforeRetVal===false){return false;}}
if(this.method){this.method.call(owner,value);}
this.value=value;this._written=true;event.type=name;if(!silent){this.owner.fireChangeEvent(event);}
return true;},configure:function(map,init){map=map||{};this._written=false;this._initialConfig=this._initialConfig||{};for(var key in map){if(key&&YAHOO.lang.hasOwnProperty(map,key)){this[key]=map[key];if(init){this._initialConfig[key]=map[key];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig);},refresh:function(silent){this.setValue(this.value,silent);}};(function(){var Lang=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(key){var configs=this._configs||{};var config=configs[key];if(!config){return undefined;}
return config.value;},set:function(key,value,silent){var configs=this._configs||{};var config=configs[key];if(!config){return false;}
return config.setValue(value,silent);},getAttributeKeys:function(){var configs=this._configs;var keys=[];var config;for(var key in configs){config=configs[key];if(Lang.hasOwnProperty(configs,key)&&!Lang.isUndefined(config)){keys[keys.length]=key;}}
return keys;},setAttributes:function(map,silent){for(var key in map){if(Lang.hasOwnProperty(map,key)){this.set(key,map[key],silent);}}},resetValue:function(key,silent){var configs=this._configs||{};if(configs[key]){this.set(key,configs[key]._initialConfig.value,silent);return true;}
return false;},refresh:function(key,silent){var configs=this._configs;key=((Lang.isString(key))?[key]:key)||this.getAttributeKeys();for(var i=0,len=key.length;i<len;++i){if(configs[key[i]]&&!Lang.isUndefined(configs[key[i]].value)&&!Lang.isNull(configs[key[i]].value)){configs[key[i]].refresh(silent);}}},register:function(key,map){this.setAttributeConfig(key,map);},getAttributeConfig:function(key){var configs=this._configs||{};var config=configs[key]||{};var map={};for(key in config){if(Lang.hasOwnProperty(config,key)){map[key]=config[key];}}
return map;},setAttributeConfig:function(key,map,init){var configs=this._configs||{};map=map||{};if(!configs[key]){map.name=key;configs[key]=new YAHOO.util.Attribute(map,this);}else{configs[key].configure(map,init);}},configureAttribute:function(key,map,init){this.setAttributeConfig(key,map,init);},resetAttributeConfig:function(key){var configs=this._configs||{};configs[key].resetConfig();},fireBeforeChangeEvent:function(e){var type='before';type+=e.type.charAt(0).toUpperCase()+e.type.substr(1)+'Change';e.type=type;return this.fireEvent(e.type,e);},fireChangeEvent:function(e){e.type+='Change';return this.fireEvent(e.type,e);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var Dom=YAHOO.util.Dom,AttributeProvider=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(el,map){if(arguments.length){this.init(el,map);}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(child){child=child.get?child.get('element'):child;this.get('element').appendChild(child);},getElementsByTagName:function(tag){return this.get('element').getElementsByTagName(tag);},hasChildNodes:function(){return this.get('element').hasChildNodes();},insertBefore:function(element,before){element=element.get?element.get('element'):element;before=(before&&before.get)?before.get('element'):before;this.get('element').insertBefore(element,before);},removeChild:function(child){child=child.get?child.get('element'):child;this.get('element').removeChild(child);return true;},replaceChild:function(newNode,oldNode){newNode=newNode.get?newNode.get('element'):newNode;oldNode=oldNode.get?oldNode.get('element'):oldNode;return this.get('element').replaceChild(newNode,oldNode);},initAttributes:function(map){},addListener:function(type,fn,obj,scope){var el=this.get('element');scope=scope||this;el=this.get('id')||el;var self=this;if(!this._events[type]){if(this.DOM_EVENTS[type]){YAHOO.util.Event.addListener(el,type,function(e){if(e.srcElement&&!e.target){e.target=e.srcElement;}
self.fireEvent(type,e);},obj,scope);}
this.createEvent(type,this);}
YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.addListener.apply(this,arguments);},subscribe:function(){this.addListener.apply(this,arguments);},removeListener:function(type,fn){this.unsubscribe.apply(this,arguments);},addClass:function(className){Dom.addClass(this.get('element'),className);},getElementsByClassName:function(className,tag){return Dom.getElementsByClassName(className,tag,this.get('element'));},hasClass:function(className){return Dom.hasClass(this.get('element'),className);},removeClass:function(className){return Dom.removeClass(this.get('element'),className);},replaceClass:function(oldClassName,newClassName){return Dom.replaceClass(this.get('element'),oldClassName,newClassName);},setStyle:function(property,value){var el=this.get('element');if(!el){return this._queue[this._queue.length]=['setStyle',arguments];}
return Dom.setStyle(el,property,value);},getStyle:function(property){return Dom.getStyle(this.get('element'),property);},fireQueue:function(){var queue=this._queue;for(var i=0,len=queue.length;i<len;++i){this[queue[i][0]].apply(this,queue[i][1]);}},appendTo:function(parent,before){parent=(parent.get)?parent.get('element'):Dom.get(parent);this.fireEvent('beforeAppendTo',{type:'beforeAppendTo',target:parent});before=(before&&before.get)?before.get('element'):Dom.get(before);var element=this.get('element');if(!element){return false;}
if(!parent){return false;}
if(element.parent!=parent){if(before){parent.insertBefore(element,before);}else{parent.appendChild(element);}}
this.fireEvent('appendTo',{type:'appendTo',target:parent});},get:function(key){var configs=this._configs||{};var el=configs.element;if(el&&!configs[key]&&!YAHOO.lang.isUndefined(el.value[key])){return el.value[key];}
return AttributeProvider.prototype.get.call(this,key);},setAttributes:function(map,silent){var el=this.get('element');for(var key in map){if(!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){this.setAttributeConfig(key);}}
for(var i=0,len=this._configOrder.length;i<len;++i){if(map[this._configOrder[i]]){this.set(this._configOrder[i],map[this._configOrder[i]],silent);}}},set:function(key,value,silent){var el=this.get('element');if(!el){this._queue[this._queue.length]=['set',arguments];if(this._configs[key]){this._configs[key].value=value;}
return;}
if(!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){_registerHTMLAttr.call(this,key);}
return AttributeProvider.prototype.set.apply(this,arguments);},setAttributeConfig:function(key,map,init){var el=this.get('element');if(el&&!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){_registerHTMLAttr.call(this,key,map);}else{AttributeProvider.prototype.setAttributeConfig.apply(this,arguments);}
this._configOrder.push(key);},getAttributeKeys:function(){var el=this.get('element');var keys=AttributeProvider.prototype.getAttributeKeys.call(this);for(var key in el){if(!this._configs[key]){keys[key]=keys[key]||el[key];}}
return keys;},createEvent:function(type,scope){this._events[type]=true;AttributeProvider.prototype.createEvent.apply(this,arguments);},init:function(el,attr){_initElement.apply(this,arguments);}};var _initElement=function(el,attr){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];attr=attr||{};attr.element=attr.element||el||null;this.DOM_EVENTS={'click':true,'dblclick':true,'keydown':true,'keypress':true,'keyup':true,'mousedown':true,'mousemove':true,'mouseout':true,'mouseover':true,'mouseup':true,'focus':true,'blur':true,'submit':true};var isReady=false;if(YAHOO.lang.isString(el)){_registerHTMLAttr.call(this,'id',{value:attr.element});}
if(Dom.get(el)){isReady=true;_initHTMLElement.call(this,attr);_initContent.call(this,attr);}
YAHOO.util.Event.onAvailable(attr.element,function(){if(!isReady){_initHTMLElement.call(this,attr);}
this.fireEvent('available',{type:'available',target:attr.element});},this,true);YAHOO.util.Event.onContentReady(attr.element,function(){if(!isReady){_initContent.call(this,attr);}
this.fireEvent('contentReady',{type:'contentReady',target:attr.element});},this,true);};var _initHTMLElement=function(attr){this.setAttributeConfig('element',{value:Dom.get(attr.element),readOnly:true});};var _initContent=function(attr){this.initAttributes(attr);this.setAttributes(attr,true);this.fireQueue();};var _registerHTMLAttr=function(key,map){var el=this.get('element');map=map||{};map.name=key;map.method=map.method||function(value){el[key]=value;};map.value=map.value||el[key];this._configs[key]=new YAHOO.util.Attribute(map,this);};YAHOO.augment(YAHOO.util.Element,AttributeProvider);})();YAHOO.register("element",YAHOO.util.Element,{version:"2.3.0",build:"442"});YAHOO.register("utilities", YAHOO, {version: "2.3.0", build: "442"});
/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/

(function(){YAHOO.util.Config=function(owner){if(owner){this.init(owner);}
if(!owner){}};var Lang=YAHOO.lang,CustomEvent=YAHOO.util.CustomEvent,Config=YAHOO.util.Config;Config.CONFIG_CHANGED_EVENT="configChanged";Config.BOOLEAN_TYPE="boolean";Config.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(owner){this.owner=owner;this.configChangedEvent=this.createEvent(Config.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=CustomEvent.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(val){return(typeof val==Config.BOOLEAN_TYPE);},checkNumber:function(val){return(!isNaN(val));},fireEvent:function(key,value){var property=this.config[key];if(property&&property.event){property.event.fire(value);}},addProperty:function(key,propertyObject){key=key.toLowerCase();this.config[key]=propertyObject;propertyObject.event=this.createEvent(key,{scope:this.owner});propertyObject.event.signature=CustomEvent.LIST;propertyObject.key=key;if(propertyObject.handler){propertyObject.event.subscribe(propertyObject.handler,this.owner);}
this.setProperty(key,propertyObject.value,true);if(!propertyObject.suppressEvent){this.queueProperty(key,propertyObject.value);}},getConfig:function(){var cfg={},prop,property;for(prop in this.config){property=this.config[prop];if(property&&property.event){cfg[prop]=property.value;}}
return cfg;},getProperty:function(key){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.value;}else{return undefined;}},resetProperty:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event){if(this.initialConfig[key]&&!Lang.isUndefined(this.initialConfig[key])){this.setProperty(key,this.initialConfig[key]);return true;}}else{return false;}},setProperty:function(key,value,silent){var property;key=key.toLowerCase();if(this.queueInProgress&&!silent){this.queueProperty(key,value);return true;}else{property=this.config[key];if(property&&property.event){if(property.validator&&!property.validator(value)){return false;}else{property.value=value;if(!silent){this.fireEvent(key,value);this.configChangedEvent.fire([key,value]);}
return true;}}else{return false;}}},queueProperty:function(key,value){key=key.toLowerCase();var property=this.config[key],foundDuplicate=false,iLen,queueItem,queueItemKey,queueItemValue,sLen,supercedesCheck,qLen,queueItemCheck,queueItemCheckKey,queueItemCheckValue,i,s,q;if(property&&property.event){if(!Lang.isUndefined(value)&&property.validator&&!property.validator(value)){return false;}else{if(!Lang.isUndefined(value)){property.value=value;}else{value=property.value;}
foundDuplicate=false;iLen=this.eventQueue.length;for(i=0;i<iLen;i++){queueItem=this.eventQueue[i];if(queueItem){queueItemKey=queueItem[0];queueItemValue=queueItem[1];if(queueItemKey==key){this.eventQueue[i]=null;this.eventQueue.push([key,(!Lang.isUndefined(value)?value:queueItemValue)]);foundDuplicate=true;break;}}}
if(!foundDuplicate&&!Lang.isUndefined(value)){this.eventQueue.push([key,value]);}}
if(property.supercedes){sLen=property.supercedes.length;for(s=0;s<sLen;s++){supercedesCheck=property.supercedes[s];qLen=this.eventQueue.length;for(q=0;q<qLen;q++){queueItemCheck=this.eventQueue[q];if(queueItemCheck){queueItemCheckKey=queueItemCheck[0];queueItemCheckValue=queueItemCheck[1];if(queueItemCheckKey==supercedesCheck.toLowerCase()){this.eventQueue.push([queueItemCheckKey,queueItemCheckValue]);this.eventQueue[q]=null;break;}}}}}
return true;}else{return false;}},refireEvent:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event&&!Lang.isUndefined(property.value)){if(this.queueInProgress){this.queueProperty(key);}else{this.fireEvent(key,property.value);}}},applyConfig:function(userConfig,init){var sKey,oValue,oConfig;if(init){oConfig={};for(sKey in userConfig){if(Lang.hasOwnProperty(userConfig,sKey)){oConfig[sKey.toLowerCase()]=userConfig[sKey];}}
this.initialConfig=oConfig;}
for(sKey in userConfig){if(Lang.hasOwnProperty(userConfig,sKey)){this.queueProperty(sKey,userConfig[sKey]);}}},refresh:function(){var prop;for(prop in this.config){this.refireEvent(prop);}},fireQueue:function(){var i,queueItem,key,value,property;this.queueInProgress=true;for(i=0;i<this.eventQueue.length;i++){queueItem=this.eventQueue[i];if(queueItem){key=queueItem[0];value=queueItem[1];property=this.config[key];property.value=value;this.fireEvent(key,value);}}
this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(key,handler,obj,override){var property=this.config[key.toLowerCase()];if(property&&property.event){if(!Config.alreadySubscribed(property.event,handler,obj)){property.event.subscribe(handler,obj,override);}
return true;}else{return false;}},unsubscribeFromConfigEvent:function(key,handler,obj){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.event.unsubscribe(handler,obj);}else{return false;}},toString:function(){var output="Config";if(this.owner){output+=" ["+this.owner.toString()+"]";}
return output;},outputEventQueue:function(){var output="",queueItem,q,nQueue=this.eventQueue.length;for(q=0;q<nQueue;q++){queueItem=this.eventQueue[q];if(queueItem){output+=queueItem[0]+"="+queueItem[1]+", ";}}
return output;},destroy:function(){var oConfig=this.config,sProperty,oProperty;for(sProperty in oConfig){if(Lang.hasOwnProperty(oConfig,sProperty)){oProperty=oConfig[sProperty];oProperty.event.unsubscribeAll();oProperty.event=null;}}
this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};Config.alreadySubscribed=function(evt,fn,obj){var nSubscribers=evt.subscribers.length,subsc,i;if(nSubscribers>0){i=nSubscribers-1;do{subsc=evt.subscribers[i];if(subsc&&subsc.obj==obj&&subsc.fn==fn){return true;}}
while(i--);}
return false;};YAHOO.lang.augmentProto(Config,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(el,userConfig){if(el){this.init(el,userConfig);}else{}};var Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,Event=YAHOO.util.Event,CustomEvent=YAHOO.util.CustomEvent,Module=YAHOO.widget.Module,m_oModuleTemplate,m_oHeaderTemplate,m_oBodyTemplate,m_oFooterTemplate,EVENT_TYPES={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},DEFAULT_CONFIG={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true}};Module.IMG_ROOT=null;Module.IMG_ROOT_SSL=null;Module.CSS_MODULE="yui-module";Module.CSS_HEADER="hd";Module.CSS_BODY="bd";Module.CSS_FOOTER="ft";Module.RESIZE_MONITOR_SECURE_URL="javascript:false;";Module.textResizeEvent=new CustomEvent("textResize");function createModuleTemplate(){if(!m_oModuleTemplate){m_oModuleTemplate=document.createElement("div");m_oModuleTemplate.innerHTML=("<div class=\""+
Module.CSS_HEADER+"\"></div>"+"<div class=\""+
Module.CSS_BODY+"\"></div><div class=\""+
Module.CSS_FOOTER+"\"></div>");m_oHeaderTemplate=m_oModuleTemplate.firstChild;m_oBodyTemplate=m_oHeaderTemplate.nextSibling;m_oFooterTemplate=m_oBodyTemplate.nextSibling;}
return m_oModuleTemplate;}
function createHeader(){if(!m_oHeaderTemplate){createModuleTemplate();}
return(m_oHeaderTemplate.cloneNode(false));}
function createBody(){if(!m_oBodyTemplate){createModuleTemplate();}
return(m_oBodyTemplate.cloneNode(false));}
function createFooter(){if(!m_oFooterTemplate){createModuleTemplate();}
return(m_oFooterTemplate.cloneNode(false));}
Module.prototype={constructor:Module,element:null,header:null,body:null,footer:null,id:null,imageRoot:Module.IMG_ROOT,initEvents:function(){var SIGNATURE=CustomEvent.LIST;this.beforeInitEvent=this.createEvent(EVENT_TYPES.BEFORE_INIT);this.beforeInitEvent.signature=SIGNATURE;this.initEvent=this.createEvent(EVENT_TYPES.INIT);this.initEvent.signature=SIGNATURE;this.appendEvent=this.createEvent(EVENT_TYPES.APPEND);this.appendEvent.signature=SIGNATURE;this.beforeRenderEvent=this.createEvent(EVENT_TYPES.BEFORE_RENDER);this.beforeRenderEvent.signature=SIGNATURE;this.renderEvent=this.createEvent(EVENT_TYPES.RENDER);this.renderEvent.signature=SIGNATURE;this.changeHeaderEvent=this.createEvent(EVENT_TYPES.CHANGE_HEADER);this.changeHeaderEvent.signature=SIGNATURE;this.changeBodyEvent=this.createEvent(EVENT_TYPES.CHANGE_BODY);this.changeBodyEvent.signature=SIGNATURE;this.changeFooterEvent=this.createEvent(EVENT_TYPES.CHANGE_FOOTER);this.changeFooterEvent.signature=SIGNATURE;this.changeContentEvent=this.createEvent(EVENT_TYPES.CHANGE_CONTENT);this.changeContentEvent.signature=SIGNATURE;this.destroyEvent=this.createEvent(EVENT_TYPES.DESTORY);this.destroyEvent.signature=SIGNATURE;this.beforeShowEvent=this.createEvent(EVENT_TYPES.BEFORE_SHOW);this.beforeShowEvent.signature=SIGNATURE;this.showEvent=this.createEvent(EVENT_TYPES.SHOW);this.showEvent.signature=SIGNATURE;this.beforeHideEvent=this.createEvent(EVENT_TYPES.BEFORE_HIDE);this.beforeHideEvent.signature=SIGNATURE;this.hideEvent=this.createEvent(EVENT_TYPES.HIDE);this.hideEvent.signature=SIGNATURE;},platform:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1){return"windows";}else if(ua.indexOf("macintosh")!=-1){return"mac";}else{return false;}}(),browser:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf('opera')!=-1){return'opera';}else if(ua.indexOf('msie 7')!=-1){return'ie7';}else if(ua.indexOf('msie')!=-1){return'ie';}else if(ua.indexOf('safari')!=-1){return'safari';}else if(ua.indexOf('gecko')!=-1){return'gecko';}else{return false;}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(DEFAULT_CONFIG.VISIBLE.key,{handler:this.configVisible,value:DEFAULT_CONFIG.VISIBLE.value,validator:DEFAULT_CONFIG.VISIBLE.validator});this.cfg.addProperty(DEFAULT_CONFIG.EFFECT.key,{suppressEvent:DEFAULT_CONFIG.EFFECT.suppressEvent,supercedes:DEFAULT_CONFIG.EFFECT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:DEFAULT_CONFIG.MONITOR_RESIZE.value});},init:function(el,userConfig){var elId,i,child;this.initEvents();this.beforeInitEvent.fire(Module);this.cfg=new Config(this);if(this.isSecure){this.imageRoot=Module.IMG_ROOT_SSL;}
if(typeof el=="string"){elId=el;el=document.getElementById(el);if(!el){el=(createModuleTemplate()).cloneNode(false);el.id=elId;}}
this.element=el;if(el.id){this.id=el.id;}
child=this.element.firstChild;if(child){do{switch(child.className){case Module.CSS_HEADER:this.header=child;break;case Module.CSS_BODY:this.body=child;break;case Module.CSS_FOOTER:this.footer=child;break;}}while((child=child.nextSibling));}
this.initDefaultConfig();Dom.addClass(this.element,Module.CSS_MODULE);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(!Config.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}
this.initEvent.fire(Module);},initResizeMonitor:function(){var oDoc,oIFrame,sHTML;function fireTextResize(){Module.textResizeEvent.fire();}
if(!YAHOO.env.ua.opera){oIFrame=Dom.get("_yuiResizeMonitor");if(!oIFrame){oIFrame=document.createElement("iframe");if(this.isSecure&&Module.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){oIFrame.src=Module.RESIZE_MONITOR_SECURE_URL;}
if(YAHOO.env.ua.gecko){sHTML="<html><head><script "+"type=\"text/javascript\">"+"window.onresize=function(){window.parent."+"YAHOO.widget.Module.textResizeEvent."+"fire();};window.parent.YAHOO.widget.Module."+"textResizeEvent.fire();</script></head>"+"<body></body></html>";oIFrame.src="data:text/html;charset=utf-8,"+
encodeURIComponent(sHTML);}
oIFrame.id="_yuiResizeMonitor";oIFrame.style.position="absolute";oIFrame.style.visibility="hidden";document.body.appendChild(oIFrame);oIFrame.style.width="10em";oIFrame.style.height="10em";oIFrame.style.top=(-1*oIFrame.offsetHeight)+"px";oIFrame.style.left=(-1*oIFrame.offsetWidth)+"px";oIFrame.style.borderWidth="0";oIFrame.style.visibility="visible";if(YAHOO.env.ua.webkit){oDoc=oIFrame.contentWindow.document;oDoc.open();oDoc.close();}}
if(oIFrame&&oIFrame.contentWindow){Module.textResizeEvent.subscribe(this.onDomResize,this,true);if(!Module.textResizeInitialized){if(!Event.on(oIFrame.contentWindow,"resize",fireTextResize)){Event.on(oIFrame,"resize",fireTextResize);}
Module.textResizeInitialized=true;}
this.resizeMonitor=oIFrame;}}},onDomResize:function(e,obj){var nLeft=-1*this.resizeMonitor.offsetWidth,nTop=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=nTop+"px";this.resizeMonitor.style.left=nLeft+"px";},setHeader:function(headerContent){var oHeader=this.header||(this.header=createHeader());if(typeof headerContent=="string"){oHeader.innerHTML=headerContent;}else{oHeader.innerHTML="";oHeader.appendChild(headerContent);}
this.changeHeaderEvent.fire(headerContent);this.changeContentEvent.fire();},appendToHeader:function(element){var oHeader=this.header||(this.header=createHeader());oHeader.appendChild(element);this.changeHeaderEvent.fire(element);this.changeContentEvent.fire();},setBody:function(bodyContent){var oBody=this.body||(this.body=createBody());if(typeof bodyContent=="string"){oBody.innerHTML=bodyContent;}else{oBody.innerHTML="";oBody.appendChild(bodyContent);}
this.changeBodyEvent.fire(bodyContent);this.changeContentEvent.fire();},appendToBody:function(element){var oBody=this.body||(this.body=createBody());oBody.appendChild(element);this.changeBodyEvent.fire(element);this.changeContentEvent.fire();},setFooter:function(footerContent){var oFooter=this.footer||(this.footer=createFooter());if(typeof footerContent=="string"){oFooter.innerHTML=footerContent;}else{oFooter.innerHTML="";oFooter.appendChild(footerContent);}
this.changeFooterEvent.fire(footerContent);this.changeContentEvent.fire();},appendToFooter:function(element){var oFooter=this.footer||(this.footer=createFooter());oFooter.appendChild(element);this.changeFooterEvent.fire(element);this.changeContentEvent.fire();},render:function(appendToNode,moduleElement){var me=this,firstChild;function appendTo(element){if(typeof element=="string"){element=document.getElementById(element);}
if(element){element.appendChild(me.element);me.appendEvent.fire();}}
this.beforeRenderEvent.fire();if(!moduleElement){moduleElement=this.element;}
if(appendToNode){appendTo(appendToNode);}else{if(!Dom.inDocument(this.element)){return false;}}
if(this.header&&!Dom.inDocument(this.header)){firstChild=moduleElement.firstChild;if(firstChild){moduleElement.insertBefore(this.header,firstChild);}else{moduleElement.appendChild(this.header);}}
if(this.body&&!Dom.inDocument(this.body)){if(this.footer&&Dom.isAncestor(this.moduleElement,this.footer)){moduleElement.insertBefore(this.body,this.footer);}else{moduleElement.appendChild(this.body);}}
if(this.footer&&!Dom.inDocument(this.footer)){moduleElement.appendChild(this.footer);}
this.renderEvent.fire();return true;},destroy:function(){var parent,e;if(this.element){Event.purgeElement(this.element,true);parent=this.element.parentNode;}
if(parent){parent.removeChild(this.element);}
this.element=null;this.header=null;this.body=null;this.footer=null;Module.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();for(e in this){if(e instanceof CustomEvent){e.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(type,args,obj){var visible=args[0];if(visible){this.beforeShowEvent.fire();Dom.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();Dom.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(type,args,obj){var monitor=args[0];if(monitor){this.initResizeMonitor();}else{Module.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(Module,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(el,userConfig){YAHOO.widget.Overlay.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,CustomEvent=YAHOO.util.CustomEvent,Module=YAHOO.widget.Module,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,Overlay=YAHOO.widget.Overlay,m_oIFrameTemplate,EVENT_TYPES={"BEFORE_MOVE":"beforeMove","MOVE":"move"},DEFAULT_CONFIG={"X":{key:"x",validator:Lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:Lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:Lang.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:Lang.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:Lang.isBoolean,supercedes:["zindex"]}};Overlay.IFRAME_SRC="javascript:false;";Overlay.IFRAME_OFFSET=3;Overlay.TOP_LEFT="tl";Overlay.TOP_RIGHT="tr";Overlay.BOTTOM_LEFT="bl";Overlay.BOTTOM_RIGHT="br";Overlay.CSS_OVERLAY="yui-overlay";Overlay.windowScrollEvent=new CustomEvent("windowScroll");Overlay.windowResizeEvent=new CustomEvent("windowResize");Overlay.windowScrollHandler=function(e){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}
clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){Overlay.windowScrollEvent.fire();},1);}else{Overlay.windowScrollEvent.fire();}};Overlay.windowResizeHandler=function(e){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}
clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){Overlay.windowResizeEvent.fire();},100);}else{Overlay.windowResizeEvent.fire();}};Overlay._initialized=null;if(Overlay._initialized===null){Event.on(window,"scroll",Overlay.windowScrollHandler);Event.on(window,"resize",Overlay.windowResizeHandler);Overlay._initialized=true;}
YAHOO.extend(Overlay,Module,{init:function(el,userConfig){Overlay.superclass.init.call(this,el);this.beforeInitEvent.fire(Overlay);Dom.addClass(this.element,Overlay.CSS_OVERLAY);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!Config.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}
if(!Config.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}
this.initEvent.fire(Overlay);},initEvents:function(){Overlay.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.beforeMoveEvent=this.createEvent(EVENT_TYPES.BEFORE_MOVE);this.beforeMoveEvent.signature=SIGNATURE;this.moveEvent=this.createEvent(EVENT_TYPES.MOVE);this.moveEvent.signature=SIGNATURE;},initDefaultConfig:function(){Overlay.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.X.key,{handler:this.configX,validator:DEFAULT_CONFIG.X.validator,suppressEvent:DEFAULT_CONFIG.X.suppressEvent,supercedes:DEFAULT_CONFIG.X.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.Y.key,{handler:this.configY,validator:DEFAULT_CONFIG.Y.validator,suppressEvent:DEFAULT_CONFIG.Y.suppressEvent,supercedes:DEFAULT_CONFIG.Y.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.XY.key,{handler:this.configXY,suppressEvent:DEFAULT_CONFIG.XY.suppressEvent,supercedes:DEFAULT_CONFIG.XY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.CONTEXT.key,{handler:this.configContext,suppressEvent:DEFAULT_CONFIG.CONTEXT.suppressEvent,supercedes:DEFAULT_CONFIG.CONTEXT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.FIXED_CENTER.key,{handler:this.configFixedCenter,value:DEFAULT_CONFIG.FIXED_CENTER.value,validator:DEFAULT_CONFIG.FIXED_CENTER.validator,supercedes:DEFAULT_CONFIG.FIXED_CENTER.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.WIDTH.key,{handler:this.configWidth,suppressEvent:DEFAULT_CONFIG.WIDTH.suppressEvent,supercedes:DEFAULT_CONFIG.WIDTH.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.HEIGHT.key,{handler:this.configHeight,suppressEvent:DEFAULT_CONFIG.HEIGHT.suppressEvent,supercedes:DEFAULT_CONFIG.HEIGHT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.ZINDEX.key,{handler:this.configzIndex,value:DEFAULT_CONFIG.ZINDEX.value});this.cfg.addProperty(DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.value,validator:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.validator,supercedes:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.IFRAME.key,{handler:this.configIframe,value:DEFAULT_CONFIG.IFRAME.value,validator:DEFAULT_CONFIG.IFRAME.validator,supercedes:DEFAULT_CONFIG.IFRAME.supercedes});},moveTo:function(x,y){this.cfg.setProperty("xy",[x,y]);},hideMacGeckoScrollbars:function(){Dom.removeClass(this.element,"show-scrollbars");Dom.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){Dom.removeClass(this.element,"hide-scrollbars");Dom.addClass(this.element,"show-scrollbars");},configVisible:function(type,args,obj){var visible=args[0],currentVis=Dom.getStyle(this.element,"visibility"),effect=this.cfg.getProperty("effect"),effectInstances=[],isMacGecko=(this.platform=="mac"&&YAHOO.env.ua.gecko),alreadySubscribed=Config.alreadySubscribed,eff,ei,e,i,j,k,h,nEffects,nEffectInstances;if(currentVis=="inherit"){e=this.element.parentNode;while(e.nodeType!=9&&e.nodeType!=11){currentVis=Dom.getStyle(e,"visibility");if(currentVis!="inherit"){break;}
e=e.parentNode;}
if(currentVis=="inherit"){currentVis="visible";}}
if(effect){if(effect instanceof Array){nEffects=effect.length;for(i=0;i<nEffects;i++){eff=effect[i];effectInstances[effectInstances.length]=eff.effect(this,eff.duration);}}else{effectInstances[effectInstances.length]=effect.effect(this,effect.duration);}}
if(visible){if(isMacGecko){this.showMacGeckoScrollbars();}
if(effect){if(visible){if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();nEffectInstances=effectInstances.length;for(j=0;j<nEffectInstances;j++){ei=effectInstances[j];if(j===0&&!alreadySubscribed(ei.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){ei.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}
ei.animateIn();}}}}else{if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();Dom.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(isMacGecko){this.hideMacGeckoScrollbars();}
if(effect){if(currentVis=="visible"){this.beforeHideEvent.fire();nEffectInstances=effectInstances.length;for(k=0;k<nEffectInstances;k++){h=effectInstances[k];if(k===0&&!alreadySubscribed(h.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){h.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}
h.animateOut();}}else if(currentVis===""){Dom.setStyle(this.element,"visibility","hidden");}}else{if(currentVis=="visible"||currentVis===""){this.beforeHideEvent.fire();Dom.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(type,args,obj){var val=args[0],alreadySubscribed=Config.alreadySubscribed,windowResizeEvent=Overlay.windowResizeEvent,windowScrollEvent=Overlay.windowScrollEvent;if(val){this.center();if(!alreadySubscribed(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}
if(!alreadySubscribed(windowResizeEvent,this.doCenterOnDOMEvent,this)){windowResizeEvent.subscribe(this.doCenterOnDOMEvent,this,true);}
if(!alreadySubscribed(windowScrollEvent,this.doCenterOnDOMEvent,this)){windowScrollEvent.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(type,args,obj){var height=args[0],el=this.element;Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");},configWidth:function(type,args,obj){var width=args[0],el=this.element;Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");},configzIndex:function(type,args,obj){var zIndex=args[0],el=this.element;if(!zIndex){zIndex=Dom.getStyle(el,"zIndex");if(!zIndex||isNaN(zIndex)){zIndex=0;}}
if(this.iframe){if(zIndex<=0){zIndex=1;}
Dom.setStyle(this.iframe,"zIndex",(zIndex-1));}
Dom.setStyle(el,"zIndex",zIndex);this.cfg.setProperty("zIndex",zIndex,true);},configXY:function(type,args,obj){var pos=args[0],x=pos[0],y=pos[1];this.cfg.setProperty("x",x);this.cfg.setProperty("y",y);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},configX:function(type,args,obj){var x=args[0],y=this.cfg.getProperty("y");this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");Dom.setX(this.element,x,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},configY:function(type,args,obj){var x=this.cfg.getProperty("x"),y=args[0];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");Dom.setY(this.element,y,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},showIframe:function(){var oIFrame=this.iframe,oParentNode;if(oIFrame){oParentNode=this.element.parentNode;if(oParentNode!=oIFrame.parentNode){oParentNode.appendChild(oIFrame);}
oIFrame.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var oIFrame=this.iframe,oElement=this.element,nOffset=Overlay.IFRAME_OFFSET,nDimensionOffset=(nOffset*2),aXY;if(oIFrame){oIFrame.style.width=(oElement.offsetWidth+nDimensionOffset+"px");oIFrame.style.height=(oElement.offsetHeight+nDimensionOffset+"px");aXY=this.cfg.getProperty("xy");if(!Lang.isArray(aXY)||(isNaN(aXY[0])||isNaN(aXY[1]))){this.syncPosition();aXY=this.cfg.getProperty("xy");}
Dom.setXY(oIFrame,[(aXY[0]-nOffset),(aXY[1]-nOffset)]);}},configIframe:function(type,args,obj){var bIFrame=args[0];function createIFrame(){var oIFrame=this.iframe,oElement=this.element,oParent,aXY;if(!oIFrame){if(!m_oIFrameTemplate){m_oIFrameTemplate=document.createElement("iframe");if(this.isSecure){m_oIFrameTemplate.src=Overlay.IFRAME_SRC;}
if(YAHOO.env.ua.ie){m_oIFrameTemplate.style.filter="alpha(opacity=0)";m_oIFrameTemplate.frameBorder=0;}
else{m_oIFrameTemplate.style.opacity="0";}
m_oIFrameTemplate.style.position="absolute";m_oIFrameTemplate.style.border="none";m_oIFrameTemplate.style.margin="0";m_oIFrameTemplate.style.padding="0";m_oIFrameTemplate.style.display="none";}
oIFrame=m_oIFrameTemplate.cloneNode(false);oParent=oElement.parentNode;if(oParent){oParent.appendChild(oIFrame);}else{document.body.appendChild(oIFrame);}
this.iframe=oIFrame;}
this.showIframe();this.syncIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}
function onBeforeShow(){createIFrame.call(this);this.beforeShowEvent.unsubscribe(onBeforeShow);this._iframeDeferred=false;}
if(bIFrame){if(this.cfg.getProperty("visible")){createIFrame.call(this);}
else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(onBeforeShow);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},configConstrainToViewport:function(type,args,obj){var val=args[0];if(val){if(!Config.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(type,args,obj){var contextArgs=args[0],contextEl,elementMagnetCorner,contextMagnetCorner;if(contextArgs){contextEl=contextArgs[0];elementMagnetCorner=contextArgs[1];contextMagnetCorner=contextArgs[2];if(contextEl){if(typeof contextEl=="string"){this.cfg.setProperty("context",[document.getElementById(contextEl),elementMagnetCorner,contextMagnetCorner],true);}
if(elementMagnetCorner&&contextMagnetCorner){this.align(elementMagnetCorner,contextMagnetCorner);}}}},align:function(elementAlign,contextAlign){var contextArgs=this.cfg.getProperty("context"),me=this,context,element,contextRegion;function doAlign(v,h){switch(elementAlign){case Overlay.TOP_LEFT:me.moveTo(h,v);break;case Overlay.TOP_RIGHT:me.moveTo((h-element.offsetWidth),v);break;case Overlay.BOTTOM_LEFT:me.moveTo(h,(v-element.offsetHeight));break;case Overlay.BOTTOM_RIGHT:me.moveTo((h-element.offsetWidth),(v-element.offsetHeight));break;}}
if(contextArgs){context=contextArgs[0];element=this.element;me=this;if(!elementAlign){elementAlign=contextArgs[1];}
if(!contextAlign){contextAlign=contextArgs[2];}
if(element&&context){contextRegion=Dom.getRegion(context);switch(contextAlign){case Overlay.TOP_LEFT:doAlign(contextRegion.top,contextRegion.left);break;case Overlay.TOP_RIGHT:doAlign(contextRegion.top,contextRegion.right);break;case Overlay.BOTTOM_LEFT:doAlign(contextRegion.bottom,contextRegion.left);break;case Overlay.BOTTOM_RIGHT:doAlign(contextRegion.bottom,contextRegion.right);break;}}}},enforceConstraints:function(type,args,obj){var pos=args[0],x=pos[0],y=pos[1],offsetHeight=this.element.offsetHeight,offsetWidth=this.element.offsetWidth,viewPortWidth=Dom.getViewportWidth(),viewPortHeight=Dom.getViewportHeight(),scrollX=Dom.getDocumentScrollLeft(),scrollY=Dom.getDocumentScrollTop(),topConstraint=scrollY+10,leftConstraint=scrollX+10,bottomConstraint=scrollY+viewPortHeight-offsetHeight-10,rightConstraint=scrollX+viewPortWidth-offsetWidth-10;if(x<leftConstraint){x=leftConstraint;}else if(x>rightConstraint){x=rightConstraint;}
if(y<topConstraint){y=topConstraint;}else if(y>bottomConstraint){y=bottomConstraint;}
this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.cfg.setProperty("xy",[x,y],true);},center:function(){var scrollX=Dom.getDocumentScrollLeft(),scrollY=Dom.getDocumentScrollTop(),viewPortWidth=Dom.getClientWidth(),viewPortHeight=Dom.getClientHeight(),elementWidth=this.element.offsetWidth,elementHeight=this.element.offsetHeight,x=(viewPortWidth/2)-(elementWidth/2)+scrollX,y=(viewPortHeight/2)-(elementHeight/2)+scrollY;this.cfg.setProperty("xy",[parseInt(x,10),parseInt(y,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var pos=Dom.getXY(this.element);this.cfg.setProperty("x",pos[0],true);this.cfg.setProperty("y",pos[1],true);this.cfg.setProperty("xy",pos,true);},onDomResize:function(e,obj){var me=this;Overlay.superclass.onDomResize.call(this,e,obj);setTimeout(function(){me.syncPosition();me.cfg.refireEvent("iframe");me.cfg.refireEvent("context");},0);},bringToTop:function(){var aOverlays=[],oElement=this.element;function compareZIndexDesc(p_oOverlay1,p_oOverlay2){var sZIndex1=Dom.getStyle(p_oOverlay1,"zIndex"),sZIndex2=Dom.getStyle(p_oOverlay2,"zIndex"),nZIndex1=(!sZIndex1||isNaN(sZIndex1))?0:parseInt(sZIndex1,10),nZIndex2=(!sZIndex2||isNaN(sZIndex2))?0:parseInt(sZIndex2,10);if(nZIndex1>nZIndex2){return-1;}else if(nZIndex1<nZIndex2){return 1;}else{return 0;}}
function isOverlayElement(p_oElement){var oOverlay=Dom.hasClass(p_oElement,Overlay.CSS_OVERLAY),Panel=YAHOO.widget.Panel;if(oOverlay&&!Dom.isAncestor(oElement,oOverlay)){if(Panel&&Dom.hasClass(p_oElement,Panel.CSS_PANEL)){aOverlays[aOverlays.length]=p_oElement.parentNode;}
else{aOverlays[aOverlays.length]=p_oElement;}}}
Dom.getElementsBy(isOverlayElement,"DIV",document.body);aOverlays.sort(compareZIndexDesc);var oTopOverlay=aOverlays[0],nTopZIndex;if(oTopOverlay){nTopZIndex=Dom.getStyle(oTopOverlay,"zIndex");if(!isNaN(nTopZIndex)&&oTopOverlay!=oElement){this.cfg.setProperty("zindex",(parseInt(nTopZIndex,10)+2));}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}
this.iframe=null;Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);Overlay.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(userConfig){this.init(userConfig);};var Overlay=YAHOO.widget.Overlay,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,CustomEvent=YAHOO.util.CustomEvent,OverlayManager=YAHOO.widget.OverlayManager;OverlayManager.CSS_FOCUSED="focused";OverlayManager.prototype={constructor:OverlayManager,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(userConfig){this.cfg=new Config(this);this.initDefaultConfig();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.fireQueue();var activeOverlay=null;this.getActive=function(){return activeOverlay;};this.focus=function(overlay){var o=this.find(overlay);if(o){if(activeOverlay!=o){if(activeOverlay){activeOverlay.blur();}
this.bringToTop(o);activeOverlay=o;Dom.addClass(activeOverlay.element,OverlayManager.CSS_FOCUSED);o.focusEvent.fire();}}};this.remove=function(overlay){var o=this.find(overlay),originalZ;if(o){if(activeOverlay==o){activeOverlay=null;}
originalZ=Dom.getStyle(o.element,"zIndex");o.cfg.setProperty("zIndex",-1000,true);this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));o.hideEvent.unsubscribe(o.blur);o.destroyEvent.unsubscribe(this._onOverlayDestroy,o);if(o.element){Event.removeListener(o.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);}
o.cfg.setProperty("zIndex",originalZ,true);o.cfg.setProperty("manager",null);o.focusEvent.unsubscribeAll();o.blurEvent.unsubscribeAll();o.focusEvent=null;o.blurEvent=null;o.focus=null;o.blur=null;}};this.blurAll=function(){var nOverlays=this.overlays.length,i;if(nOverlays>0){i=nOverlays-1;do{this.overlays[i].blur();}
while(i--);}};this._onOverlayBlur=function(p_sType,p_aArgs){activeOverlay=null;};var overlays=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}
if(overlays){this.register(overlays);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(p_oEvent){var oTarget=Event.getTarget(p_oEvent),oClose=this.close;if(oClose&&(oTarget==oClose||Dom.isAncestor(oClose,oTarget))){this.blur();}
else{this.focus();}},_onOverlayDestroy:function(p_sType,p_aArgs,p_oOverlay){this.remove(p_oOverlay);},register:function(overlay){var mgr=this,zIndex,regcount,i,nOverlays;if(overlay instanceof Overlay){overlay.cfg.addProperty("manager",{value:this});overlay.focusEvent=overlay.createEvent("focus");overlay.focusEvent.signature=CustomEvent.LIST;overlay.blurEvent=overlay.createEvent("blur");overlay.blurEvent.signature=CustomEvent.LIST;overlay.focus=function(){mgr.focus(this);};overlay.blur=function(){if(mgr.getActive()==this){Dom.removeClass(this.element,OverlayManager.CSS_FOCUSED);this.blurEvent.fire();}};overlay.blurEvent.subscribe(mgr._onOverlayBlur);overlay.hideEvent.subscribe(overlay.blur);overlay.destroyEvent.subscribe(this._onOverlayDestroy,overlay,this);Event.on(overlay.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,overlay);zIndex=Dom.getStyle(overlay.element,"zIndex");if(!isNaN(zIndex)){overlay.cfg.setProperty("zIndex",parseInt(zIndex,10));}else{overlay.cfg.setProperty("zIndex",0);}
this.overlays.push(overlay);this.bringToTop(overlay);return true;}else if(overlay instanceof Array){regcount=0;nOverlays=overlay.length;for(i=0;i<nOverlays;i++){if(this.register(overlay[i])){regcount++;}}
if(regcount>0){return true;}}else{return false;}},bringToTop:function(p_oOverlay){var oOverlay=this.find(p_oOverlay),nTopZIndex,oTopOverlay,aOverlays;if(oOverlay){aOverlays=this.overlays;aOverlays.sort(this.compareZIndexDesc);oTopOverlay=aOverlays[0];if(oTopOverlay){nTopZIndex=Dom.getStyle(oTopOverlay.element,"zIndex");if(!isNaN(nTopZIndex)&&oTopOverlay!=oOverlay){oOverlay.cfg.setProperty("zIndex",(parseInt(nTopZIndex,10)+2));}
aOverlays.sort(this.compareZIndexDesc);}}},find:function(overlay){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;if(overlay instanceof Overlay){do{if(aOverlays[i]==overlay){return aOverlays[i];}}
while(i--);}else if(typeof overlay=="string"){do{if(aOverlays[i].id==overlay){return aOverlays[i];}}
while(i--);}
return null;}},compareZIndexDesc:function(o1,o2){var zIndex1=o1.cfg.getProperty("zIndex"),zIndex2=o2.cfg.getProperty("zIndex");if(zIndex1>zIndex2){return-1;}else if(zIndex1<zIndex2){return 1;}else{return 0;}},showAll:function(){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;do{aOverlays[i].show();}
while(i--);}},hideAll:function(){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;do{aOverlays[i].hide();}
while(i--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.Tooltip=function(el,userConfig){YAHOO.widget.Tooltip.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Tooltip=YAHOO.widget.Tooltip,m_oShadowTemplate,DEFAULT_CONFIG={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:Lang.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:Lang.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:Lang.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:Lang.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"}};Tooltip.CSS_TOOLTIP="yui-tt";function restoreOriginalWidth(p_sType,p_aArgs,p_oObject){var sOriginalWidth=p_oObject[0],sNewWidth=p_oObject[1],oConfig=this.cfg,sCurrentWidth=oConfig.getProperty("width");if(sCurrentWidth==sNewWidth){oConfig.setProperty("width",sOriginalWidth);}
this.unsubscribe("hide",this._onHide,p_oObject);}
function setWidthToOffsetWidth(p_sType,p_aArgs){var oBody=document.body,oConfig=this.cfg,sOriginalWidth=oConfig.getProperty("width"),sNewWidth,oClone;if((!sOriginalWidth||sOriginalWidth=="auto")&&(oConfig.getProperty("container")!=oBody||oConfig.getProperty("x")>=Dom.getViewportWidth()||oConfig.getProperty("y")>=Dom.getViewportHeight())){oClone=this.element.cloneNode(true);oClone.style.visibility="hidden";oClone.style.top="0px";oClone.style.left="0px";oBody.appendChild(oClone);sNewWidth=(oClone.offsetWidth+"px");oBody.removeChild(oClone);oClone=null;oConfig.setProperty("width",sNewWidth);oConfig.refireEvent("xy");this.subscribe("hide",restoreOriginalWidth,[(sOriginalWidth||""),sNewWidth]);}}
function onDOMReady(p_sType,p_aArgs,p_oObject){this.render(p_oObject);}
function onInit(){Event.onDOMReady(onDOMReady,this.cfg.getProperty("container"),this);}
YAHOO.extend(Tooltip,YAHOO.widget.Overlay,{init:function(el,userConfig){Tooltip.superclass.init.call(this,el);this.beforeInitEvent.fire(Tooltip);Dom.addClass(this.element,Tooltip.CSS_TOOLTIP);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.subscribe("beforeShow",setWidthToOffsetWidth);this.subscribe("init",onInit);this.subscribe("render",this.onRender);this.initEvent.fire(Tooltip);},initDefaultConfig:function(){Tooltip.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.PREVENT_OVERLAP.key,{value:DEFAULT_CONFIG.PREVENT_OVERLAP.value,validator:DEFAULT_CONFIG.PREVENT_OVERLAP.validator,supercedes:DEFAULT_CONFIG.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:DEFAULT_CONFIG.SHOW_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.value,validator:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.HIDE_DELAY.key,{handler:this.configHideDelay,value:DEFAULT_CONFIG.HIDE_DELAY.value,validator:DEFAULT_CONFIG.HIDE_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.CONTAINER.key,{handler:this.configContainer,value:document.body});},configText:function(type,args,obj){var text=args[0];if(text){this.setBody(text);}},configContainer:function(type,args,obj){var container=args[0];if(typeof container=='string'){this.cfg.setProperty("container",document.getElementById(container),true);}},_removeEventListeners:function(){var aElements=this._context,nElements,oElement,i;if(aElements){nElements=aElements.length;if(nElements>0){i=nElements-1;do{oElement=aElements[i];Event.removeListener(oElement,"mouseover",this.onContextMouseOver);Event.removeListener(oElement,"mousemove",this.onContextMouseMove);Event.removeListener(oElement,"mouseout",this.onContextMouseOut);}
while(i--);}}},configContext:function(type,args,obj){var context=args[0],aElements,nElements,oElement,i;if(context){if(!(context instanceof Array)){if(typeof context=="string"){this.cfg.setProperty("context",[document.getElementById(context)],true);}else{this.cfg.setProperty("context",[context],true);}
context=this.cfg.getProperty("context");}
this._removeEventListeners();this._context=context;aElements=this._context;if(aElements){nElements=aElements.length;if(nElements>0){i=nElements-1;do{oElement=aElements[i];Event.on(oElement,"mouseover",this.onContextMouseOver,this);Event.on(oElement,"mousemove",this.onContextMouseMove,this);Event.on(oElement,"mouseout",this.onContextMouseOut,this);}
while(i--);}}}},onContextMouseMove:function(e,obj){obj.pageX=Event.getPageX(e);obj.pageY=Event.getPageY(e);},onContextMouseOver:function(e,obj){var context=this;if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
Event.on(context,"mousemove",obj.onContextMouseMove,obj);if(context.title){obj._tempTitle=context.title;context.title="";}
obj.showProcId=obj.doShow(e,context);},onContextMouseOut:function(e,obj){var el=this;if(obj._tempTitle){el.title=obj._tempTitle;obj._tempTitle=null;}
if(obj.showProcId){clearTimeout(obj.showProcId);obj.showProcId=null;}
if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
obj.hideProcId=setTimeout(function(){obj.hide();},obj.cfg.getProperty("hidedelay"));},doShow:function(e,context){var yOffset=25,me=this;if(YAHOO.env.ua.opera&&context.tagName&&context.tagName.toUpperCase()=="A"){yOffset+=12;}
return setTimeout(function(){if(me._tempTitle){me.setBody(me._tempTitle);}else{me.cfg.refireEvent("text");}
me.moveTo(me.pageX,me.pageY+yOffset);if(me.cfg.getProperty("preventoverlap")){me.preventOverlap(me.pageX,me.pageY);}
Event.removeListener(context,"mousemove",me.onContextMouseMove);me.show();me.hideProcId=me.doHide();},this.cfg.getProperty("showdelay"));},doHide:function(){var me=this;return setTimeout(function(){me.hide();},this.cfg.getProperty("autodismissdelay"));},preventOverlap:function(pageX,pageY){var height=this.element.offsetHeight,mousePoint=new YAHOO.util.Point(pageX,pageY),elementRegion=Dom.getRegion(this.element);elementRegion.top-=5;elementRegion.left-=5;elementRegion.right+=5;elementRegion.bottom+=5;if(elementRegion.contains(mousePoint)){this.cfg.setProperty("y",(pageY-height-5));}},onRender:function(p_sType,p_aArgs){function sizeShadow(){var oElement=this.element,oShadow=this._shadow;if(oShadow){oShadow.style.width=(oElement.offsetWidth+6)+"px";oShadow.style.height=(oElement.offsetHeight+1)+"px";}}
function addShadowVisibleClass(){Dom.addClass(this._shadow,"yui-tt-shadow-visible");}
function removeShadowVisibleClass(){Dom.removeClass(this._shadow,"yui-tt-shadow-visible");}
function createShadow(){var oShadow=this._shadow,oElement,Module,nIE,me;if(!oShadow){oElement=this.element;Module=YAHOO.widget.Module;nIE=YAHOO.env.ua.ie;me=this;if(!m_oShadowTemplate){m_oShadowTemplate=document.createElement("div");m_oShadowTemplate.className="yui-tt-shadow";}
oShadow=m_oShadowTemplate.cloneNode(false);oElement.appendChild(oShadow);this._shadow=oShadow;addShadowVisibleClass.call(this);this.subscribe("beforeShow",addShadowVisibleClass);this.subscribe("beforeHide",removeShadowVisibleClass);if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){window.setTimeout(function(){sizeShadow.call(me);},0);this.cfg.subscribeToConfigEvent("width",sizeShadow);this.cfg.subscribeToConfigEvent("height",sizeShadow);this.subscribe("changeContent",sizeShadow);Module.textResizeEvent.subscribe(sizeShadow,this,true);this.subscribe("destroy",function(){Module.textResizeEvent.unsubscribe(sizeShadow,this);});}}}
function onBeforeShow(){createShadow.call(this);this.unsubscribe("beforeShow",onBeforeShow);}
if(this.cfg.getProperty("visible")){createShadow.call(this);}
else{this.subscribe("beforeShow",onBeforeShow);}},destroy:function(){this._removeEventListeners();Tooltip.superclass.destroy.call(this);},toString:function(){return"Tooltip "+this.id;}});}());(function(){YAHOO.widget.Panel=function(el,userConfig){YAHOO.widget.Panel.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,DD=YAHOO.util.DD,Dom=YAHOO.util.Dom,Event=YAHOO.util.Event,Overlay=YAHOO.widget.Overlay,CustomEvent=YAHOO.util.CustomEvent,Config=YAHOO.util.Config,Panel=YAHOO.widget.Panel,m_oMaskTemplate,m_oUnderlayTemplate,m_oCloseIconTemplate,EVENT_TYPES={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},DEFAULT_CONFIG={"CLOSE":{key:"close",value:true,validator:Lang.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(DD?true:false),validator:Lang.isBoolean,supercedes:["visible"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:Lang.isBoolean,supercedes:["visible"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]}};Panel.CSS_PANEL="yui-panel";Panel.CSS_PANEL_CONTAINER="yui-panel-container";function createHeader(p_sType,p_aArgs){if(!this.header){this.setHeader("&#160;");}}
function restoreOriginalWidth(p_sType,p_aArgs,p_oObject){var sOriginalWidth=p_oObject[0],sNewWidth=p_oObject[1],oConfig=this.cfg,sCurrentWidth=oConfig.getProperty("width");if(sCurrentWidth==sNewWidth){oConfig.setProperty("width",sOriginalWidth);}
this.unsubscribe("hide",restoreOriginalWidth,p_oObject);}
function setWidthToOffsetWidth(p_sType,p_aArgs){var nIE=YAHOO.env.ua.ie,oConfig,sOriginalWidth,sNewWidth;if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){oConfig=this.cfg;sOriginalWidth=oConfig.getProperty("width");if(!sOriginalWidth||sOriginalWidth=="auto"){sNewWidth=(this.element.offsetWidth+"px");oConfig.setProperty("width",sNewWidth);this.subscribe("hide",restoreOriginalWidth,[(sOriginalWidth||""),sNewWidth]);}}}
function onElementFocus(){this.blur();}
function addFocusEventHandlers(p_sType,p_aArgs){var me=this;function isFocusable(el){var sTagName=el.tagName.toUpperCase(),bFocusable=false;switch(sTagName){case"A":case"BUTTON":case"SELECT":case"TEXTAREA":if(!Dom.isAncestor(me.element,el)){Event.on(el,"focus",onElementFocus,el,true);bFocusable=true;}
break;case"INPUT":if(el.type!="hidden"&&!Dom.isAncestor(me.element,el)){Event.on(el,"focus",onElementFocus,el,true);bFocusable=true;}
break;}
return bFocusable;}
this.focusableElements=Dom.getElementsBy(isFocusable);}
function removeFocusEventHandlers(p_sType,p_aArgs){var aElements=this.focusableElements,nElements=aElements.length,el2,i;for(i=0;i<nElements;i++){el2=aElements[i];Event.removeListener(el2,"focus",onElementFocus);}}
YAHOO.extend(Panel,Overlay,{init:function(el,userConfig){Panel.superclass.init.call(this,el);this.beforeInitEvent.fire(Panel);Dom.addClass(this.element,Panel.CSS_PANEL);this.buildWrapper();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.subscribe("showMask",addFocusEventHandlers);this.subscribe("hideMask",removeFocusEventHandlers);this.initEvent.fire(Panel);},initEvents:function(){Panel.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.showMaskEvent=this.createEvent(EVENT_TYPES.SHOW_MASK);this.showMaskEvent.signature=SIGNATURE;this.hideMaskEvent=this.createEvent(EVENT_TYPES.HIDE_MASK);this.hideMaskEvent.signature=SIGNATURE;this.dragEvent=this.createEvent(EVENT_TYPES.DRAG);this.dragEvent.signature=SIGNATURE;},initDefaultConfig:function(){Panel.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.CLOSE.key,{handler:this.configClose,value:DEFAULT_CONFIG.CLOSE.value,validator:DEFAULT_CONFIG.CLOSE.validator,supercedes:DEFAULT_CONFIG.CLOSE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.DRAGGABLE.key,{handler:this.configDraggable,value:DEFAULT_CONFIG.DRAGGABLE.value,validator:DEFAULT_CONFIG.DRAGGABLE.validator,supercedes:DEFAULT_CONFIG.DRAGGABLE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.UNDERLAY.key,{handler:this.configUnderlay,value:DEFAULT_CONFIG.UNDERLAY.value,supercedes:DEFAULT_CONFIG.UNDERLAY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MODAL.key,{handler:this.configModal,value:DEFAULT_CONFIG.MODAL.value,validator:DEFAULT_CONFIG.MODAL.validator,supercedes:DEFAULT_CONFIG.MODAL.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:DEFAULT_CONFIG.KEY_LISTENERS.suppressEvent,supercedes:DEFAULT_CONFIG.KEY_LISTENERS.supercedes});},configClose:function(type,args,obj){var val=args[0],oClose=this.close;function doHide(e,obj){obj.hide();}
if(val){if(!oClose){if(!m_oCloseIconTemplate){m_oCloseIconTemplate=document.createElement("span");m_oCloseIconTemplate.innerHTML="&#160;";m_oCloseIconTemplate.className="container-close";}
oClose=m_oCloseIconTemplate.cloneNode(true);this.innerElement.appendChild(oClose);Event.on(oClose,"click",doHide,this);this.close=oClose;}else{oClose.style.display="block";}}else{if(oClose){oClose.style.display="none";}}},configDraggable:function(type,args,obj){var val=args[0];if(val){if(!DD){this.cfg.setProperty("draggable",false);return;}
if(this.header){Dom.setStyle(this.header,"cursor","move");this.registerDragDrop();}
this.subscribe("beforeRender",createHeader);this.subscribe("beforeShow",setWidthToOffsetWidth);}else{if(this.dd){this.dd.unreg();}
if(this.header){Dom.setStyle(this.header,"cursor","auto");}
this.unsubscribe("beforeRender",createHeader);this.unsubscribe("beforeShow",setWidthToOffsetWidth);}},configUnderlay:function(type,args,obj){var UA=YAHOO.env.ua,bMacGecko=(this.platform=="mac"&&UA.gecko),sUnderlay=args[0].toLowerCase(),oUnderlay=this.underlay,oElement=this.element;function createUnderlay(){var nIE;if(!oUnderlay){if(!m_oUnderlayTemplate){m_oUnderlayTemplate=document.createElement("div");m_oUnderlayTemplate.className="underlay";}
oUnderlay=m_oUnderlayTemplate.cloneNode(false);this.element.appendChild(oUnderlay);this.underlay=oUnderlay;nIE=UA.ie;if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){this.sizeUnderlay();this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.subscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);}}}
function onBeforeShow(){createUnderlay.call(this);this._underlayDeferred=false;this.beforeShowEvent.unsubscribe(onBeforeShow);}
function destroyUnderlay(){if(this._underlayDeferred){this.beforeShowEvent.unsubscribe(onBeforeShow);this._underlayDeferred=false;}
if(oUnderlay){this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);this.element.removeChild(oUnderlay);this.underlay=null;}}
switch(sUnderlay){case"shadow":Dom.removeClass(oElement,"matte");Dom.addClass(oElement,"shadow");break;case"matte":if(!bMacGecko){destroyUnderlay.call(this);}
Dom.removeClass(oElement,"shadow");Dom.addClass(oElement,"matte");break;default:if(!bMacGecko){destroyUnderlay.call(this);}
Dom.removeClass(oElement,"shadow");Dom.removeClass(oElement,"matte");break;}
if((sUnderlay=="shadow")||(bMacGecko&&!oUnderlay)){if(this.cfg.getProperty("visible")){createUnderlay.call(this);}
else{if(!this._underlayDeferred){this.beforeShowEvent.subscribe(onBeforeShow);this._underlayDeferred=true;}}}},configModal:function(type,args,obj){var modal=args[0];if(modal){if(!this._hasModalityEventListeners){this.subscribe("beforeShow",this.buildMask);this.subscribe("beforeShow",this.bringToTop);this.subscribe("beforeShow",this.showMask);this.subscribe("hide",this.hideMask);Overlay.windowResizeEvent.subscribe(this.sizeMask,this,true);this._hasModalityEventListeners=true;}}else{if(this._hasModalityEventListeners){if(this.cfg.getProperty("visible")){this.hideMask();this.removeMask();}
this.unsubscribe("beforeShow",this.buildMask);this.unsubscribe("beforeShow",this.bringToTop);this.unsubscribe("beforeShow",this.showMask);this.unsubscribe("hide",this.hideMask);Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);this._hasModalityEventListeners=false;}}},removeMask:function(){var oMask=this.mask,oParentNode;if(oMask){this.hideMask();oParentNode=oMask.parentNode;if(oParentNode){oParentNode.removeChild(oMask);}
this.mask=null;}},configKeyListeners:function(type,args,obj){var listeners=args[0],listener,nListeners,i;if(listeners){if(listeners instanceof Array){nListeners=listeners.length;for(i=0;i<nListeners;i++){listener=listeners[i];if(!Config.alreadySubscribed(this.showEvent,listener.enable,listener)){this.showEvent.subscribe(listener.enable,listener,true);}
if(!Config.alreadySubscribed(this.hideEvent,listener.disable,listener)){this.hideEvent.subscribe(listener.disable,listener,true);this.destroyEvent.subscribe(listener.disable,listener,true);}}}else{if(!Config.alreadySubscribed(this.showEvent,listeners.enable,listeners)){this.showEvent.subscribe(listeners.enable,listeners,true);}
if(!Config.alreadySubscribed(this.hideEvent,listeners.disable,listeners)){this.hideEvent.subscribe(listeners.disable,listeners,true);this.destroyEvent.subscribe(listeners.disable,listeners,true);}}}},configHeight:function(type,args,obj){var height=args[0],el=this.innerElement;Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");},configWidth:function(type,args,obj){var width=args[0],el=this.innerElement;Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");},configzIndex:function(type,args,obj){Panel.superclass.configzIndex.call(this,type,args,obj);var maskZ=0,currentZ=Dom.getStyle(this.element,"zIndex");if(this.mask){if(!currentZ||isNaN(currentZ)){currentZ=0;}
if(currentZ===0){this.cfg.setProperty("zIndex",1);}else{maskZ=currentZ-1;Dom.setStyle(this.mask,"zIndex",maskZ);}}},buildWrapper:function(){var elementParent=this.element.parentNode,originalElement=this.element,wrapper=document.createElement("div");wrapper.className=Panel.CSS_PANEL_CONTAINER;wrapper.id=originalElement.id+"_c";if(elementParent){elementParent.insertBefore(wrapper,originalElement);}
wrapper.appendChild(originalElement);this.element=wrapper;this.innerElement=originalElement;Dom.setStyle(this.innerElement,"visibility","inherit");},sizeUnderlay:function(){var oUnderlay=this.underlay,oElement;if(oUnderlay){oElement=this.element;oUnderlay.style.width=oElement.offsetWidth+"px";oUnderlay.style.height=oElement.offsetHeight+"px";}},registerDragDrop:function(){var me=this;if(this.header){if(!DD){return;}
this.dd=new DD(this.element.id,this.id);if(!this.header.id){this.header.id=this.id+"_h";}
this.dd.startDrag=function(){var offsetHeight,offsetWidth,viewPortWidth,viewPortHeight,scrollX,scrollY,topConstraint,leftConstraint,bottomConstraint,rightConstraint;if(YAHOO.env.ua.ie==6){Dom.addClass(me.element,"drag");}
if(me.cfg.getProperty("constraintoviewport")){offsetHeight=me.element.offsetHeight;offsetWidth=me.element.offsetWidth;viewPortWidth=Dom.getViewportWidth();viewPortHeight=Dom.getViewportHeight();scrollX=Dom.getDocumentScrollLeft();scrollY=Dom.getDocumentScrollTop();topConstraint=scrollY+10;leftConstraint=scrollX+10;bottomConstraint=scrollY+viewPortHeight-offsetHeight-10;rightConstraint=scrollX+viewPortWidth-offsetWidth-10;this.minX=leftConstraint;this.maxX=rightConstraint;this.constrainX=true;this.minY=topConstraint;this.maxY=bottomConstraint;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}
me.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){me.syncPosition();me.cfg.refireEvent("iframe");if(this.platform=="mac"&&YAHOO.env.ua.gecko){this.showMacGeckoScrollbars();}
me.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(YAHOO.env.ua.ie==6){Dom.removeClass(me.element,"drag");}
me.dragEvent.fire("endDrag",arguments);me.moveEvent.fire(me.cfg.getProperty("xy"));};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}},buildMask:function(){var oMask=this.mask;if(!oMask){if(!m_oMaskTemplate){m_oMaskTemplate=document.createElement("div");m_oMaskTemplate.className="mask";m_oMaskTemplate.innerHTML="&#160;";}
oMask=m_oMaskTemplate.cloneNode(true);oMask.id=this.id+"_mask";document.body.insertBefore(oMask,document.body.firstChild);this.mask=oMask;}},hideMask:function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";this.hideMaskEvent.fire();Dom.removeClass(document.body,"masked");}},showMask:function(){if(this.cfg.getProperty("modal")&&this.mask){Dom.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}},sizeMask:function(){if(this.mask){this.mask.style.height=Dom.getDocumentHeight()+"px";this.mask.style.width=Dom.getDocumentWidth()+"px";}},render:function(appendToNode){return Panel.superclass.render.call(this,appendToNode,this.innerElement);},destroy:function(){Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);this.removeMask();if(this.close){Event.purgeElement(this.close);}
Panel.superclass.destroy.call(this);},toString:function(){return"Panel "+this.id;}});}());(function(){YAHOO.widget.Dialog=function(el,userConfig){YAHOO.widget.Dialog.superclass.constructor.call(this,el,userConfig);};var Event=YAHOO.util.Event,CustomEvent=YAHOO.util.CustomEvent,Dom=YAHOO.util.Dom,KeyListener=YAHOO.util.KeyListener,Connect=YAHOO.util.Connect,Dialog=YAHOO.widget.Dialog,Lang=YAHOO.lang,EVENT_TYPES={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},DEFAULT_CONFIG={"POST_METHOD":{key:"postmethod",value:"async"},"BUTTONS":{key:"buttons",value:"none"}};Dialog.CSS_DIALOG="yui-dialog";function removeButtonEventHandlers(){var aButtons=this._aButtons,nButtons,oButton,i;if(Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){i=nButtons-1;do{oButton=aButtons[i];if(oButton instanceof YAHOO.widget.Button){oButton.destroy();}
else if(oButton.tagName.toUpperCase()=="BUTTON"){Event.purgeElement(oButton);Event.purgeElement(oButton,false);}}
while(i--);}}}
YAHOO.extend(Dialog,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){Dialog.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};this.cfg.addProperty(DEFAULT_CONFIG.POST_METHOD.key,{handler:this.configPostMethod,value:DEFAULT_CONFIG.POST_METHOD.value,validator:function(val){if(val!="form"&&val!="async"&&val!="none"&&val!="manual"){return false;}else{return true;}}});this.cfg.addProperty(DEFAULT_CONFIG.BUTTONS.key,{handler:this.configButtons,value:DEFAULT_CONFIG.BUTTONS.value});},initEvents:function(){Dialog.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.beforeSubmitEvent=this.createEvent(EVENT_TYPES.BEFORE_SUBMIT);this.beforeSubmitEvent.signature=SIGNATURE;this.submitEvent=this.createEvent(EVENT_TYPES.SUBMIT);this.submitEvent.signature=SIGNATURE;this.manualSubmitEvent=this.createEvent(EVENT_TYPES.MANUAL_SUBMIT);this.manualSubmitEvent.signature=SIGNATURE;this.asyncSubmitEvent=this.createEvent(EVENT_TYPES.ASYNC_SUBMIT);this.asyncSubmitEvent.signature=SIGNATURE;this.formSubmitEvent=this.createEvent(EVENT_TYPES.FORM_SUBMIT);this.formSubmitEvent.signature=SIGNATURE;this.cancelEvent=this.createEvent(EVENT_TYPES.CANCEL);this.cancelEvent.signature=SIGNATURE;},init:function(el,userConfig){Dialog.superclass.init.call(this,el);this.beforeInitEvent.fire(Dialog);Dom.addClass(this.element,Dialog.CSS_DIALOG);this.cfg.setProperty("visible",false);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.subscribe("changeBody",this.registerForm);this.initEvent.fire(Dialog);},doSubmit:function(){var oForm=this.form,bUseFileUpload=false,bUseSecureFileUpload=false,aElements,nElements,i,sMethod;switch(this.cfg.getProperty("postmethod")){case"async":aElements=oForm.elements;nElements=aElements.length;if(nElements>0){i=nElements-1;do{if(aElements[i].type=="file"){bUseFileUpload=true;break;}}
while(i--);}
if(bUseFileUpload&&YAHOO.env.ua.ie&&this.isSecure){bUseSecureFileUpload=true;}
sMethod=(oForm.getAttribute("method")||"POST").toUpperCase();Connect.setForm(oForm,bUseFileUpload,bUseSecureFileUpload);Connect.asyncRequest(sMethod,oForm.getAttribute("action"),this.callback);this.asyncSubmitEvent.fire();break;case"form":oForm.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}},registerForm:function(){var form=this.element.getElementsByTagName("form")[0],me=this,firstElement,lastElement;if(this.form){if(this.form==form&&Dom.isAncestor(this.element,this.form)){return;}
else{Event.purgeElement(this.form);this.form=null;}}
if(!form){form=document.createElement("form");form.name="frm_"+this.id;this.body.appendChild(form);}
if(form){this.form=form;Event.on(form,"submit",function(e){Event.stopEvent(e);this.submit();this.form.blur();});this.firstFormElement=function(){var f,el,nElements=form.elements.length;for(f=0;f<nElements;f++){el=form.elements[f];if(el.focus&&!el.disabled&&el.type!="hidden"){return el;}}
return null;}();this.lastFormElement=function(){var f,el,nElements=form.elements.length;for(f=nElements-1;f>=0;f--){el=form.elements[f];if(el.focus&&!el.disabled&&el.type!="hidden"){return el;}}
return null;}();if(this.cfg.getProperty("modal")){firstElement=this.firstFormElement||this.firstButton;if(firstElement){this.preventBackTab=new KeyListener(firstElement,{shift:true,keys:9},{fn:me.focusLast,scope:me,correctScope:true});this.showEvent.subscribe(this.preventBackTab.enable,this.preventBackTab,true);this.hideEvent.subscribe(this.preventBackTab.disable,this.preventBackTab,true);}
lastElement=this.lastButton||this.lastFormElement;if(lastElement){this.preventTabOut=new KeyListener(lastElement,{shift:false,keys:9},{fn:me.focusFirst,scope:me,correctScope:true});this.showEvent.subscribe(this.preventTabOut.enable,this.preventTabOut,true);this.hideEvent.subscribe(this.preventTabOut.disable,this.preventTabOut,true);}}}},configClose:function(type,args,obj){var val=args[0];function doCancel(e,obj){obj.cancel();}
if(val){if(!this.close){this.close=document.createElement("div");Dom.addClass(this.close,"container-close");this.close.innerHTML="&#160;";this.innerElement.appendChild(this.close);Event.on(this.close,"click",doCancel,this);}else{this.close.style.display="block";}}else{if(this.close){this.close.style.display="none";}}},configButtons:function(type,args,obj){var Button=YAHOO.widget.Button,aButtons=args[0],oInnerElement=this.innerElement,oButton,oButtonEl,oYUIButton,nButtons,oSpan,oFooter,i;removeButtonEventHandlers.call(this);this._aButtons=null;if(Lang.isArray(aButtons)){oSpan=document.createElement("span");oSpan.className="button-group";nButtons=aButtons.length;this._aButtons=[];for(i=0;i<nButtons;i++){oButton=aButtons[i];if(Button){oYUIButton=new Button({label:oButton.text,container:oSpan});oButtonEl=oYUIButton.get("element");if(oButton.isDefault){oYUIButton.addClass("default");this.defaultHtmlButton=oButtonEl;}
if(Lang.isFunction(oButton.handler)){oYUIButton.set("onclick",{fn:oButton.handler,obj:this,scope:this});}
else if(Lang.isObject(oButton.handler)&&Lang.isFunction(oButton.handler.fn)){oYUIButton.set("onclick",{fn:oButton.handler.fn,obj:((!Lang.isUndefined(oButton.handler.obj))?oButton.handler.obj:this),scope:(oButton.handler.scope||this)});}
this._aButtons[this._aButtons.length]=oYUIButton;}
else{oButtonEl=document.createElement("button");oButtonEl.setAttribute("type","button");if(oButton.isDefault){oButtonEl.className="default";this.defaultHtmlButton=oButtonEl;}
oButtonEl.innerHTML=oButton.text;if(Lang.isFunction(oButton.handler)){Event.on(oButtonEl,"click",oButton.handler,this,true);}
else if(Lang.isObject(oButton.handler)&&Lang.isFunction(oButton.handler.fn)){Event.on(oButtonEl,"click",oButton.handler.fn,((!Lang.isUndefined(oButton.handler.obj))?oButton.handler.obj:this),(oButton.handler.scope||this));}
oSpan.appendChild(oButtonEl);this._aButtons[this._aButtons.length]=oButtonEl;}
oButton.htmlButton=oButtonEl;if(i===0){this.firstButton=oButtonEl;}
if(i==(nButtons-1)){this.lastButton=oButtonEl;}}
this.setFooter(oSpan);oFooter=this.footer;if(Dom.inDocument(this.element)&&!Dom.isAncestor(oInnerElement,oFooter)){oInnerElement.appendChild(oFooter);}
this.buttonSpan=oSpan;}else{oSpan=this.buttonSpan;oFooter=this.footer;if(oSpan&&oFooter){oFooter.removeChild(oSpan);this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}
this.cfg.refireEvent("iframe");this.cfg.refireEvent("underlay");},getButtons:function(){var aButtons=this._aButtons;if(aButtons){return aButtons;}},focusFirst:function(type,args,obj){var oElement=this.firstFormElement,oEvent;if(args){oEvent=args[1];if(oEvent){Event.stopEvent(oEvent);}}
if(oElement){try{oElement.focus();}
catch(oException){}}else{this.focusDefaultButton();}},focusLast:function(type,args,obj){var aButtons=this.cfg.getProperty("buttons"),oElement=this.lastFormElement,oEvent;if(args){oEvent=args[1];if(oEvent){Event.stopEvent(oEvent);}}
if(aButtons&&Lang.isArray(aButtons)){this.focusLastButton();}else{if(oElement){try{oElement.focus();}
catch(oException){}}}},focusDefaultButton:function(){var oElement=this.defaultHtmlButton;if(oElement){try{oElement.focus();}
catch(oException){}}},blurButtons:function(){var aButtons=this.cfg.getProperty("buttons"),nButtons,oButton,oElement,i;if(aButtons&&Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){i=(nButtons-1);do{oButton=aButtons[i];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.blur();}
catch(oException){}}}}
while(i--);}}},focusFirstButton:function(){var aButtons=this.cfg.getProperty("buttons"),oButton,oElement;if(aButtons&&Lang.isArray(aButtons)){oButton=aButtons[0];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.focus();}
catch(oException){}}}}},focusLastButton:function(){var aButtons=this.cfg.getProperty("buttons"),nButtons,oButton,oElement;if(aButtons&&Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){oButton=aButtons[(nButtons-1)];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.focus();}
catch(oException){}}}}}},configPostMethod:function(type,args,obj){var postmethod=args[0];this.registerForm();},validate:function(){return true;},submit:function(){if(this.validate()){this.beforeSubmitEvent.fire();this.doSubmit();this.submitEvent.fire();this.hide();return true;}else{return false;}},cancel:function(){this.cancelEvent.fire();this.hide();},getData:function(){var oForm=this.form,aElements,nTotalElements,oData,sName,oElement,nElements,sType,sTagName,aOptions,nOptions,aValues,oOption,sValue,oRadio,oCheckbox,i,n;function isFormElement(p_oElement){var sTag=p_oElement.tagName.toUpperCase();return((sTag=="INPUT"||sTag=="TEXTAREA"||sTag=="SELECT")&&p_oElement.name==sName);}
if(oForm){aElements=oForm.elements;nTotalElements=aElements.length;oData={};for(i=0;i<nTotalElements;i++){sName=aElements[i].name;oElement=Dom.getElementsBy(isFormElement,"*",oForm);nElements=oElement.length;if(nElements>0){if(nElements==1){oElement=oElement[0];sType=oElement.type;sTagName=oElement.tagName.toUpperCase();switch(sTagName){case"INPUT":if(sType=="checkbox"){oData[sName]=oElement.checked;}
else if(sType!="radio"){oData[sName]=oElement.value;}
break;case"TEXTAREA":oData[sName]=oElement.value;break;case"SELECT":aOptions=oElement.options;nOptions=aOptions.length;aValues=[];for(n=0;n<nOptions;n++){oOption=aOptions[n];if(oOption.selected){sValue=oOption.value;if(!sValue||sValue===""){sValue=oOption.text;}
aValues[aValues.length]=sValue;}}
oData[sName]=aValues;break;}}
else{sType=oElement[0].type;switch(sType){case"radio":for(n=0;n<nElements;n++){oRadio=oElement[n];if(oRadio.checked){oData[sName]=oRadio.value;break;}}
break;case"checkbox":aValues=[];for(n=0;n<nElements;n++){oCheckbox=oElement[n];if(oCheckbox.checked){aValues[aValues.length]=oCheckbox.value;}}
oData[sName]=aValues;break;}}}}}
return oData;},destroy:function(){removeButtonEventHandlers.call(this);this._aButtons=null;var aForms=this.element.getElementsByTagName("form"),oForm;if(aForms.length>0){oForm=aForms[0];if(oForm){Event.purgeElement(oForm);this.body.removeChild(oForm);this.form=null;}}
Dialog.superclass.destroy.call(this);},toString:function(){return"Dialog "+this.id;}});}());(function(){YAHOO.widget.SimpleDialog=function(el,userConfig){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,el,userConfig);};var Dom=YAHOO.util.Dom,SimpleDialog=YAHOO.widget.SimpleDialog,DEFAULT_CONFIG={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};SimpleDialog.ICON_BLOCK="blckicon";SimpleDialog.ICON_ALARM="alrticon";SimpleDialog.ICON_HELP="hlpicon";SimpleDialog.ICON_INFO="infoicon";SimpleDialog.ICON_WARN="warnicon";SimpleDialog.ICON_TIP="tipicon";SimpleDialog.ICON_CSS_CLASSNAME="yui-icon";SimpleDialog.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.extend(SimpleDialog,YAHOO.widget.Dialog,{initDefaultConfig:function(){SimpleDialog.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.ICON.key,{handler:this.configIcon,value:DEFAULT_CONFIG.ICON.value,suppressEvent:DEFAULT_CONFIG.ICON.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,value:DEFAULT_CONFIG.TEXT.value,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent,supercedes:DEFAULT_CONFIG.TEXT.supercedes});},init:function(el,userConfig){SimpleDialog.superclass.init.call(this,el);this.beforeInitEvent.fire(SimpleDialog);Dom.addClass(this.element,SimpleDialog.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(SimpleDialog);},registerForm:function(){SimpleDialog.superclass.registerForm.call(this);this.form.innerHTML+="<input type=\"hidden\" name=\""+
this.id+"\" value=\"\"/>";},configIcon:function(type,args,obj){var sIcon=args[0],oBody=this.body,sCSSClass=SimpleDialog.ICON_CSS_CLASSNAME,oIcon,oIconParent;if(sIcon&&sIcon!="none"){oIcon=Dom.getElementsByClassName(sCSSClass,"*",oBody);if(oIcon){oIconParent=oIcon.parentNode;if(oIconParent){oIconParent.removeChild(oIcon);oIcon=null;}}
if(sIcon.indexOf(".")==-1){oIcon=document.createElement("span");oIcon.className=(sCSSClass+" "+sIcon);oIcon.innerHTML="&#160;";}else{oIcon=document.createElement("img");oIcon.src=(this.imageRoot+sIcon);oIcon.className=sCSSClass;}
if(oIcon){oBody.insertBefore(oIcon,oBody.firstChild);}}},configText:function(type,args,obj){var text=args[0];if(text){this.setBody(text);this.cfg.refireEvent("icon");}},toString:function(){return"SimpleDialog "+this.id;}});}());(function(){YAHOO.widget.ContainerEffect=function(overlay,attrIn,attrOut,targetElement,animClass){if(!animClass){animClass=YAHOO.util.Anim;}
this.overlay=overlay;this.attrIn=attrIn;this.attrOut=attrOut;this.targetElement=targetElement||overlay.element;this.animClass=animClass;};var Dom=YAHOO.util.Dom,CustomEvent=YAHOO.util.CustomEvent,Easing=YAHOO.util.Easing,ContainerEffect=YAHOO.widget.ContainerEffect;ContainerEffect.FADE=function(overlay,dur){var fade=new ContainerEffect(overlay,{attributes:{opacity:{from:0,to:1}},duration:dur,method:Easing.easeIn},{attributes:{opacity:{to:0}},duration:dur,method:Easing.easeOut},overlay.element);fade.handleStartAnimateIn=function(type,args,obj){Dom.addClass(obj.overlay.element,"hide-select");if(!obj.overlay.underlay){obj.overlay.cfg.refireEvent("underlay");}
if(obj.overlay.underlay){obj.initialUnderlayOpacity=Dom.getStyle(obj.overlay.underlay,"opacity");obj.overlay.underlay.style.filter=null;}
Dom.setStyle(obj.overlay.element,"visibility","visible");Dom.setStyle(obj.overlay.element,"opacity",0);};fade.handleCompleteAnimateIn=function(type,args,obj){Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
if(obj.overlay.underlay){Dom.setStyle(obj.overlay.underlay,"opacity",obj.initialUnderlayOpacity);}
obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};fade.handleStartAnimateOut=function(type,args,obj){Dom.addClass(obj.overlay.element,"hide-select");if(obj.overlay.underlay){obj.overlay.underlay.style.filter=null;}};fade.handleCompleteAnimateOut=function(type,args,obj){Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
Dom.setStyle(obj.overlay.element,"visibility","hidden");Dom.setStyle(obj.overlay.element,"opacity",1);obj.overlay.cfg.refireEvent("iframe");obj.animateOutCompleteEvent.fire();};fade.init();return fade;};ContainerEffect.SLIDE=function(overlay,dur){var x=overlay.cfg.getProperty("x")||Dom.getX(overlay.element),y=overlay.cfg.getProperty("y")||Dom.getY(overlay.element),clientWidth=Dom.getClientWidth(),offsetWidth=overlay.element.offsetWidth,slide=new ContainerEffect(overlay,{attributes:{points:{to:[x,y]}},duration:dur,method:Easing.easeIn},{attributes:{points:{to:[(clientWidth+25),y]}},duration:dur,method:Easing.easeOut},overlay.element,YAHOO.util.Motion);slide.handleStartAnimateIn=function(type,args,obj){obj.overlay.element.style.left=((-25)-offsetWidth)+"px";obj.overlay.element.style.top=y+"px";};slide.handleTweenAnimateIn=function(type,args,obj){var pos=Dom.getXY(obj.overlay.element),currentX=pos[0],currentY=pos[1];if(Dom.getStyle(obj.overlay.element,"visibility")=="hidden"&&currentX<x){Dom.setStyle(obj.overlay.element,"visibility","visible");}
obj.overlay.cfg.setProperty("xy",[currentX,currentY],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateIn=function(type,args,obj){obj.overlay.cfg.setProperty("xy",[x,y],true);obj.startX=x;obj.startY=y;obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};slide.handleStartAnimateOut=function(type,args,obj){var vw=Dom.getViewportWidth(),pos=Dom.getXY(obj.overlay.element),yso=pos[1],currentTo=obj.animOut.attributes.points.to;obj.animOut.attributes.points.to=[(vw+25),yso];};slide.handleTweenAnimateOut=function(type,args,obj){var pos=Dom.getXY(obj.overlay.element),xto=pos[0],yto=pos[1];obj.overlay.cfg.setProperty("xy",[xto,yto],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateOut=function(type,args,obj){Dom.setStyle(obj.overlay.element,"visibility","hidden");obj.overlay.cfg.setProperty("xy",[x,y]);obj.animateOutCompleteEvent.fire();};slide.init();return slide;};ContainerEffect.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=CustomEvent.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=CustomEvent.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=CustomEvent.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=CustomEvent.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(type,args,obj){},handleTweenAnimateIn:function(type,args,obj){},handleCompleteAnimateIn:function(type,args,obj){},handleStartAnimateOut:function(type,args,obj){},handleTweenAnimateOut:function(type,args,obj){},handleCompleteAnimateOut:function(type,args,obj){},toString:function(){var output="ContainerEffect";if(this.overlay){output+=" ["+this.overlay.toString()+"]";}
return output;}};YAHOO.lang.augmentProto(ContainerEffect,YAHOO.util.EventProvider);})();YAHOO.register("container",YAHOO.widget.Module,{version:"2.3.0",build:"442"});// prevent execution of jQuery if included more than once
if(typeof window.jQuery == "undefined") {
/*
 * jQuery 1.1.3.1 - New Wave Javascript
 *
 * Copyright (c) 2007 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2007-07-05 00:43:24 -0400 (Thu, 05 Jul 2007) $
 * $Rev: 2243 $
 */

// Global undefined variable
window.undefined = window.undefined;
var jQuery = function(a,c) {
	// If the context is global, return a new object
	if ( window == this || !this.init )
		return new jQuery(a,c);
	
	return this.init(a,c);
};

// Map over the $ in case of overwrite
if ( typeof $ != "undefined" )
	jQuery._$ = $;
	
// Map the jQuery namespace to the '$' one
var $ = jQuery;

jQuery.fn = jQuery.prototype = {
	init: function(a,c) {
		// Make sure that a selection was provided
		a = a || document;

		// HANDLE: $(function)
		// Shortcut for document ready
		if ( jQuery.isFunction(a) )
			return new jQuery(document)[ jQuery.fn.ready ? "ready" : "load" ]( a );

		// Handle HTML strings
		if ( typeof a  == "string" ) {
			// HANDLE: $(html) -> $(array)
			var m = /^[^<]*(<(.|\s)+>)[^>]*$/.exec(a);
			if ( m )
				a = jQuery.clean( [ m[1] ] );

			// HANDLE: $(expr)
			else
				return new jQuery( c ).find( a );
		}

		return this.setArray(
			// HANDLE: $(array)
			a.constructor == Array && a ||

			// HANDLE: $(arraylike)
			// Watch for when an array-like object is passed as the selector
			(a.jquery || a.length && a != window && !a.nodeType && a[0] != undefined && a[0].nodeType) && jQuery.makeArray( a ) ||

			// HANDLE: $(*)
			[ a ] );
	},
	jquery: "1.1.3.1",

	size: function() {
		return this.length;
	},
	
	length: 0,

	get: function( num ) {
		return num == undefined ?

			// Return a 'clean' array
			jQuery.makeArray( this ) :

			// Return just the object
			this[num];
	},
	pushStack: function( a ) {
		var ret = jQuery(a);
		ret.prevObject = this;
		return ret;
	},
	setArray: function( a ) {
		this.length = 0;
		[].push.apply( this, a );
		return this;
	},
	each: function( fn, args ) {
		return jQuery.each( this, fn, args );
	},
	index: function( obj ) {
		var pos = -1;
		this.each(function(i){
			if ( this == obj ) pos = i;
		});
		return pos;
	},

	attr: function( key, value, type ) {
		var obj = key;
		
		// Look for the case where we're accessing a style value
		if ( key.constructor == String )
			if ( value == undefined )
				return this.length && jQuery[ type || "attr" ]( this[0], key ) || undefined;
			else {
				obj = {};
				obj[ key ] = value;
			}
		
		// Check to see if we're setting style values
		return this.each(function(index){
			// Set all the styles
			for ( var prop in obj )
				jQuery.attr(
					type ? this.style : this,
					prop, jQuery.prop(this, obj[prop], type, index, prop)
				);
		});
	},

	css: function( key, value ) {
		return this.attr( key, value, "curCSS" );
	},

	text: function(e) {
		if ( typeof e == "string" )
			return this.empty().append( document.createTextNode( e ) );

		var t = "";
		jQuery.each( e || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					t += this.nodeType != 1 ?
						this.nodeValue : jQuery.fn.text([ this ]);
			});
		});
		return t;
	},

	wrap: function() {
		// The elements to wrap the target around
		var a, args = arguments;

		// Wrap each of the matched elements individually
		return this.each(function(){
			if ( !a )
				a = jQuery.clean(args, this.ownerDocument);

			// Clone the structure that we're using to wrap
			var b = a[0].cloneNode(true);

			// Insert it before the element to be wrapped
			this.parentNode.insertBefore( b, this );

			// Find the deepest point in the wrap structure
			while ( b.firstChild )
				b = b.firstChild;

			// Move the matched element to within the wrap structure
			b.appendChild( this );
		});
	},
	append: function() {
		return this.domManip(arguments, true, 1, function(a){
			this.appendChild( a );
		});
	},
	prepend: function() {
		return this.domManip(arguments, true, -1, function(a){
			this.insertBefore( a, this.firstChild );
		});
	},
	before: function() {
		return this.domManip(arguments, false, 1, function(a){
			this.parentNode.insertBefore( a, this );
		});
	},
	after: function() {
		return this.domManip(arguments, false, -1, function(a){
			this.parentNode.insertBefore( a, this.nextSibling );
		});
	},
	end: function() {
		return this.prevObject || jQuery([]);
	},
	find: function(t) {
		var data = jQuery.map(this, function(a){ return jQuery.find(t,a); });
		return this.pushStack( /[^+>] [^+>]/.test( t ) || t.indexOf("..") > -1 ?
			jQuery.unique( data ) : data );
	},
	clone: function(deep) {
		// Need to remove events on the element and its descendants
		var $this = this.add(this.find("*"));
		$this.each(function() {
			this._$events = {};
			for (var type in this.$events)
				this._$events[type] = jQuery.extend({},this.$events[type]);
		}).unbind();

		// Do the clone
		var r = this.pushStack( jQuery.map( this, function(a){
			return a.cloneNode( deep != undefined ? deep : true );
		}) );

		// Add the events back to the original and its descendants
		$this.each(function() {
			var events = this._$events;
			for (var type in events)
				for (var handler in events[type])
					jQuery.event.add(this, type, events[type][handler], events[type][handler].data);
			this._$events = null;
		});

		// Return the cloned set
		return r;
	},

	filter: function(t) {
		return this.pushStack(
			jQuery.isFunction( t ) &&
			jQuery.grep(this, function(el, index){
				return t.apply(el, [index])
			}) ||

			jQuery.multiFilter(t,this) );
	},

	not: function(t) {
		return this.pushStack(
			t.constructor == String &&
			jQuery.multiFilter(t, this, true) ||

			jQuery.grep(this, function(a) {
				return ( t.constructor == Array || t.jquery )
					? jQuery.inArray( a, t ) < 0
					: a != t;
			})
		);
	},

	add: function(t) {
		return this.pushStack( jQuery.merge(
			this.get(),
			t.constructor == String ?
				jQuery(t).get() :
				t.length != undefined && (!t.nodeName || t.nodeName == "FORM") ?
					t : [t] )
		);
	},
	is: function(expr) {
		return expr ? jQuery.multiFilter(expr,this).length > 0 : false;
	},

	val: function( val ) {
		return val == undefined ?
			( this.length ? this[0].value : null ) :
			this.attr( "value", val );
	},

	html: function( val ) {
		return val == undefined ?
			( this.length ? this[0].innerHTML : null ) :
			this.empty().append( val );
	},
	domManip: function(args, table, dir, fn){
		var clone = this.length > 1, a; 

		return this.each(function(){
			if ( !a ) {
				a = jQuery.clean(args, this.ownerDocument);
				if ( dir < 0 )
					a.reverse();
			}

			var obj = this;

			if ( table && jQuery.nodeName(this, "table") && jQuery.nodeName(a[0], "tr") )
				obj = this.getElementsByTagName("tbody")[0] || this.appendChild(document.createElement("tbody"));

			jQuery.each( a, function(){
				fn.apply( obj, [ clone ? this.cloneNode(true) : this ] );
			});

		});
	}
};

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0], a = 1;

	// extend jQuery itself if only one argument is passed
	if ( arguments.length == 1 ) {
		target = this;
		a = 0;
	}
	var prop;
	while ( (prop = arguments[a++]) != null )
		// Extend the base object
		for ( var i in prop ) target[i] = prop[i];

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function() {
		if ( jQuery._$ )
			$ = jQuery._$;
		return jQuery;
	},

	// This may seem like some crazy code, but trust me when I say that this
	// is the only cross-browser way to do this. --John
	isFunction: function( fn ) {
		return !!fn && typeof fn != "string" && !fn.nodeName && 
			fn.constructor != Array && /function/i.test( fn + "" );
	},
	
	// check if an element is in a XML document
	isXMLDoc: function(elem) {
		return elem.tagName && elem.ownerDocument && !elem.ownerDocument.body;
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},
	// args is for internal usage only
	each: function( obj, fn, args ) {
		if ( obj.length == undefined )
			for ( var i in obj )
				fn.apply( obj[i], args || [i, obj[i]] );
		else
			for ( var i = 0, ol = obj.length; i < ol; i++ )
				if ( fn.apply( obj[i], args || [i, obj[i]] ) === false ) break;
		return obj;
	},
	
	prop: function(elem, value, type, index, prop){
			// Handle executable functions
			if ( jQuery.isFunction( value ) )
				value = value.call( elem, [index] );
				
			// exclude the following css properties to add px
			var exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;

			// Handle passing in a number to a CSS property
			return value && value.constructor == Number && type == "curCSS" && !exclude.test(prop) ?
				value + "px" :
				value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, c ){
			jQuery.each( c.split(/\s+/), function(i, cur){
				if ( !jQuery.className.has( elem.className, cur ) )
					elem.className += ( elem.className ? " " : "" ) + cur;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, c ){
			elem.className = c != undefined ?
				jQuery.grep( elem.className.split(/\s+/), function(cur){
					return !jQuery.className.has( c, cur );	
				}).join(" ") : "";
		},

		// internal only, use is(".class")
		has: function( t, c ) {
			return jQuery.inArray( c, (t.className || t).toString().split(/\s+/) ) > -1;
		}
	},
	swap: function(e,o,f) {
		for ( var i in o ) {
			e.style["old"+i] = e.style[i];
			e.style[i] = o[i];
		}
		f.apply( e, [] );
		for ( var i in o )
			e.style[i] = e.style["old"+i];
	},

	css: function(e,p) {
		if ( p == "height" || p == "width" ) {
			var old = {}, oHeight, oWidth, d = ["Top","Bottom","Right","Left"];

			jQuery.each( d, function(){
				old["padding" + this] = 0;
				old["border" + this + "Width"] = 0;
			});

			jQuery.swap( e, old, function() {
				if ( jQuery(e).is(':visible') ) {
					oHeight = e.offsetHeight;
					oWidth = e.offsetWidth;
				} else {
					e = jQuery(e.cloneNode(true))
						.find(":radio").removeAttr("checked").end()
						.css({
							visibility: "hidden", position: "absolute", display: "block", right: "0", left: "0"
						}).appendTo(e.parentNode)[0];

					var parPos = jQuery.css(e.parentNode,"position") || "static";
					if ( parPos == "static" )
						e.parentNode.style.position = "relative";

					oHeight = e.clientHeight;
					oWidth = e.clientWidth;

					if ( parPos == "static" )
						e.parentNode.style.position = "static";

					e.parentNode.removeChild(e);
				}
			});

			return p == "height" ? oHeight : oWidth;
		}

		return jQuery.curCSS( e, p );
	},

	curCSS: function(elem, prop, force) {
		var ret;

		if (prop == "opacity" && jQuery.browser.msie) {
			ret = jQuery.attr(elem.style, "opacity");
			return ret == "" ? "1" : ret;
		}
		
		if (prop.match(/float/i))
			prop = jQuery.styleFloat;

		if (!force && elem.style[prop])
			ret = elem.style[prop];

		else if (document.defaultView && document.defaultView.getComputedStyle) {

			if (prop.match(/float/i))
				prop = "float";

			prop = prop.replace(/([A-Z])/g,"-$1").toLowerCase();
			var cur = document.defaultView.getComputedStyle(elem, null);

			if ( cur )
				ret = cur.getPropertyValue(prop);
			else if ( prop == "display" )
				ret = "none";
			else
				jQuery.swap(elem, { display: "block" }, function() {
				    var c = document.defaultView.getComputedStyle(this, "");
				    ret = c && c.getPropertyValue(prop) || "";
				});

		} else if (elem.currentStyle) {
			var newProp = prop.replace(/\-(\w)/g,function(m,c){return c.toUpperCase();});
			ret = elem.currentStyle[prop] || elem.currentStyle[newProp];
		}

		return ret;
	},
	
	clean: function(a, doc) {
		var r = [];
		doc = doc || document;

		jQuery.each( a, function(i,arg){
			if ( !arg ) return;

			if ( arg.constructor == Number )
				arg = arg.toString();
			
			// Convert html string into DOM nodes
			if ( typeof arg == "string" ) {
				// Trim whitespace, otherwise indexOf won't work as expected
				var s = jQuery.trim(arg).toLowerCase(), div = doc.createElement("div"), tb = [];

				var wrap =
					// option or optgroup
					!s.indexOf("<opt") &&
					[1, "<select>", "</select>"] ||
					
					!s.indexOf("<leg") &&
					[1, "<fieldset>", "</fieldset>"] ||
					
					(!s.indexOf("<thead") || !s.indexOf("<tbody") || !s.indexOf("<tfoot") || !s.indexOf("<colg")) &&
					[1, "<table>", "</table>"] ||
					
					!s.indexOf("<tr") &&
					[2, "<table><tbody>", "</tbody></table>"] ||
					
				 	// <thead> matched above
					(!s.indexOf("<td") || !s.indexOf("<th")) &&
					[3, "<table><tbody><tr>", "</tr></tbody></table>"] ||
					
					!s.indexOf("<col") &&
					[2, "<table><colgroup>", "</colgroup></table>"] ||
					
					[0,"",""];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + arg + wrap[2];
				
				// Move to the right depth
				while ( wrap[0]-- )
					div = div.firstChild;
				
				// Remove IE's autoinserted <tbody> from table fragments
				if ( jQuery.browser.msie ) {
					
					// String was a <table>, *may* have spurious <tbody>
					if ( !s.indexOf("<table") && s.indexOf("<tbody") < 0 ) 
						tb = div.firstChild && div.firstChild.childNodes;
						
					// String was a bare <thead> or <tfoot>
					else if ( wrap[1] == "<table>" && s.indexOf("<tbody") < 0 )
						tb = div.childNodes;

					for ( var n = tb.length-1; n >= 0 ; --n )
						if ( jQuery.nodeName(tb[n], "tbody") && !tb[n].childNodes.length )
							tb[n].parentNode.removeChild(tb[n]);
					
				}
				
				arg = jQuery.makeArray( div.childNodes );
			}

			if ( 0 === arg.length && (!jQuery.nodeName(arg, "form") && !jQuery.nodeName(arg, "select")) )
				return;

			if ( arg[0] == undefined || jQuery.nodeName(arg, "form") || arg.options )
				r.push( arg );
			else
				r = jQuery.merge( r, arg );

		});

		return r;
	},
	
	attr: function(elem, name, value){
		var fix = jQuery.isXMLDoc(elem) ? {} : jQuery.props;
		
		// Certain attributes only work when accessed via the old DOM 0 way
		if ( fix[name] ) {
			if ( value != undefined ) elem[fix[name]] = value;
			return elem[fix[name]];

		} else if ( value == undefined && jQuery.browser.msie && jQuery.nodeName(elem, "form") && (name == "action" || name == "method") )
			return elem.getAttributeNode(name).nodeValue;

		// IE elem.getAttribute passes even for style
		else if ( elem.tagName ) {
			

			if ( value != undefined ) elem.setAttribute( name, value );
			if ( jQuery.browser.msie && /href|src/.test(name) && !jQuery.isXMLDoc(elem) ) 
				return elem.getAttribute( name, 2 );
			return elem.getAttribute( name );

		// elem is actually elem.style ... set the style
		} else {
			// IE actually uses filters for opacity
			if ( name == "opacity" && jQuery.browser.msie ) {
				if ( value != undefined ) {
					// IE has trouble with opacity if it does not have layout
					// Force it by setting the zoom level
					elem.zoom = 1; 
	
					// Set the alpha filter to set the opacity
					elem.filter = (elem.filter || "").replace(/alpha\([^)]*\)/,"") +
						(parseFloat(value).toString() == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
				}
	
				return elem.filter ? 
					(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100).toString() : "";
			}
			name = name.replace(/-([a-z])/ig,function(z,b){return b.toUpperCase();});
			if ( value != undefined ) elem[name] = value;
			return elem[name];
		}
	},
	trim: function(t){
		return t.replace(/^\s+|\s+$/g, "");
	},

	makeArray: function( a ) {
		var r = [];

		// Need to use typeof to fight Safari childNodes crashes
		if ( typeof a != "array" )
			for ( var i = 0, al = a.length; i < al; i++ )
				r.push( a[i] );
		else
			r = a.slice( 0 );

		return r;
	},

	inArray: function( b, a ) {
		for ( var i = 0, al = a.length; i < al; i++ )
			if ( a[i] == b )
				return i;
		return -1;
	},
	merge: function(first, second) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		for ( var i = 0; second[i]; i++ )
			first.push(second[i]);
		return first;
	},
	unique: function(first) {
		var r = [], num = jQuery.mergeNum++;

		for ( var i = 0, fl = first.length; i < fl; i++ )
			if ( num != first[i].mergeNum ) {
				first[i].mergeNum = num;
				r.push(first[i]);
			}

		return r;
	},

	mergeNum: 0,
	grep: function(elems, fn, inv) {
		// If a string is passed in for the function, make a function
		// for it (a handy shortcut)
		if ( typeof fn == "string" )
			fn = new Function("a","i","return " + fn);

		var result = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, el = elems.length; i < el; i++ )
			if ( !inv && fn(elems[i],i) || inv && !fn(elems[i],i) )
				result.push( elems[i] );

		return result;
	},
	map: function(elems, fn) {
		// If a string is passed in for the function, make a function
		// for it (a handy shortcut)
		if ( typeof fn == "string" )
			fn = new Function("a","return " + fn);

		var result = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, el = elems.length; i < el; i++ ) {
			var val = fn(elems[i],i);

			if ( val !== null && val != undefined ) {
				if ( val.constructor != Array ) val = [val];
				result = result.concat( val );
			}
		}

		return result;
	}
});
 
/*
 * Whether the W3C compliant box model is being used.
 *
 * @property
 * @name $.boxModel
 * @type Boolean
 * @cat JavaScript
 */
new function() {
	var b = navigator.userAgent.toLowerCase();

	// Figure out what browser is being used
	jQuery.browser = {
		version: (b.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
		safari: /webkit/.test(b),
		opera: /opera/.test(b),
		msie: /msie/.test(b) && !/opera/.test(b),
		mozilla: /mozilla/.test(b) && !/(compatible|webkit)/.test(b)
	};

	// Check to see if the W3C box model is being used
	jQuery.boxModel = !jQuery.browser.msie || document.compatMode == "CSS1Compat";

	jQuery.styleFloat = jQuery.browser.msie ? "styleFloat" : "cssFloat",

	jQuery.props = {
		"for": "htmlFor",
		"class": "className",
		"float": jQuery.styleFloat,
		cssFloat: jQuery.styleFloat,
		styleFloat: jQuery.styleFloat,
		innerHTML: "innerHTML",
		className: "className",
		value: "value",
		disabled: "disabled",
		checked: "checked",
		readonly: "readOnly",
		selected: "selected",
		maxlength: "maxLength"
	};
};

jQuery.each({
	parent: "a.parentNode",
	parents: "jQuery.parents(a)",
	next: "jQuery.nth(a,2,'nextSibling')",
	prev: "jQuery.nth(a,2,'previousSibling')",
	siblings: "jQuery.sibling(a.parentNode.firstChild,a)",
	children: "jQuery.sibling(a.firstChild)"
}, function(i,n){
	jQuery.fn[ i ] = function(a) {
		var ret = jQuery.map(this,n);
		if ( a && typeof a == "string" )
			ret = jQuery.multiFilter(a,ret);
		return this.pushStack( ret );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after"
}, function(i,n){
	jQuery.fn[ i ] = function(){
		var a = arguments;
		return this.each(function(){
			for ( var j = 0, al = a.length; j < al; j++ )
				jQuery(a[j])[n]( this );
		});
	};
});

jQuery.each( {
	removeAttr: function( key ) {
		jQuery.attr( this, key, "" );
		this.removeAttribute( key );
	},
	addClass: function(c){
		jQuery.className.add(this,c);
	},
	removeClass: function(c){
		jQuery.className.remove(this,c);
	},
	toggleClass: function( c ){
		jQuery.className[ jQuery.className.has(this,c) ? "remove" : "add" ](this, c);
	},
	remove: function(a){
		if ( !a || jQuery.filter( a, [this] ).r.length )
			this.parentNode.removeChild( this );
	},
	empty: function() {
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(i,n){
	jQuery.fn[ i ] = function() {
		return this.each( n, arguments );
	};
});

jQuery.each( [ "eq", "lt", "gt", "contains" ], function(i,n){
	jQuery.fn[ n ] = function(num,fn) {
		return this.filter( ":" + n + "(" + num + ")", fn );
	};
});

jQuery.each( [ "height", "width" ], function(i,n){
	jQuery.fn[ n ] = function(h) {
		return h == undefined ?
			( this.length ? jQuery.css( this[0], n ) : null ) :
			this.css( n, h.constructor == String ? h : h + "px" );
	};
});
jQuery.extend({
	expr: {
		"": "m[2]=='*'||jQuery.nodeName(a,m[2])",
		"#": "a.getAttribute('id')==m[2]",
		":": {
			// Position Checks
			lt: "i<m[3]-0",
			gt: "i>m[3]-0",
			nth: "m[3]-0==i",
			eq: "m[3]-0==i",
			first: "i==0",
			last: "i==r.length-1",
			even: "i%2==0",
			odd: "i%2",

			// Child Checks
			"first-child": "a.parentNode.getElementsByTagName('*')[0]==a",
			"last-child": "jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a",
			"only-child": "!jQuery.nth(a.parentNode.lastChild,2,'previousSibling')",

			// Parent Checks
			parent: "a.firstChild",
			empty: "!a.firstChild",

			// Text Check
			contains: "(a.textContent||a.innerText||'').indexOf(m[3])>=0",

			// Visibility
			visible: '"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"',
			hidden: '"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"',

			// Form attributes
			enabled: "!a.disabled",
			disabled: "a.disabled",
			checked: "a.checked",
			selected: "a.selected||jQuery.attr(a,'selected')",

			// Form elements
			text: "'text'==a.type",
			radio: "'radio'==a.type",
			checkbox: "'checkbox'==a.type",
			file: "'file'==a.type",
			password: "'password'==a.type",
			submit: "'submit'==a.type",
			image: "'image'==a.type",
			reset: "'reset'==a.type",
			button: '"button"==a.type||jQuery.nodeName(a,"button")',
			input: "/input|select|textarea|button/i.test(a.nodeName)"
		},
		"[": "jQuery.find(m[2],a).length"
	},
	
	// The regular expressions that power the parsing engine
	parse: [
		// Match: [@value='test'], [@foo]
		/^\[ *(@)([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,

		// Match: [div], [div p]
		/^(\[)\s*(.*?(\[.*?\])?[^[]*?)\s*\]/,

		// Match: :contains('foo')
		/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,

		// Match: :even, :last-chlid, #id, .class
		new RegExp("^([:.#]*)(" + 
			( jQuery.chars = jQuery.browser.safari && jQuery.browser.version < "3.0.0" ? "\\w" : "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)" ) + "+)")
	],

	multiFilter: function( expr, elems, not ) {
		var old, cur = [];

		while ( expr && expr != old ) {
			old = expr;
			var f = jQuery.filter( expr, elems, not );
			expr = f.t.replace(/^\s*,\s*/, "" );
			cur = not ? elems = f.r : jQuery.merge( cur, f.r );
		}

		return cur;
	},
	find: function( t, context ) {
		// Quickly handle non-string expressions
		if ( typeof t != "string" )
			return [ t ];

		// Make sure that the context is a DOM Element
		if ( context && !context.nodeType )
			context = null;

		// Set the correct context (if none is provided)
		context = context || document;

		// Handle the common XPath // expression
		if ( !t.indexOf("//") ) {
			context = context.documentElement;
			t = t.substr(2,t.length);

		// And the / root expression
		} else if ( !t.indexOf("/") && !context.ownerDocument ) {
			context = context.documentElement;
			t = t.substr(1,t.length);
			if ( t.indexOf("/") >= 1 )
				t = t.substr(t.indexOf("/"),t.length);
		}

		// Initialize the search
		var ret = [context], done = [], last;

		// Continue while a selector expression exists, and while
		// we're no longer looping upon ourselves
		while ( t && last != t ) {
			var r = [];
			last = t;

			t = jQuery.trim(t).replace( /^\/\//, "" );

			var foundToken = false;

			// An attempt at speeding up child selectors that
			// point to a specific element tag
			var re = new RegExp("^[/>]\\s*(" + jQuery.chars + "+)");
			var m = re.exec(t);

			if ( m ) {
				var nodeName = m[1].toUpperCase();

				// Perform our own iteration and filter
				for ( var i = 0; ret[i]; i++ )
					for ( var c = ret[i].firstChild; c; c = c.nextSibling )
						if ( c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName.toUpperCase()) )
							r.push( c );

				ret = r;
				t = t.replace( re, "" );
				if ( t.indexOf(" ") == 0 ) continue;
				foundToken = true;
			} else {
				re = /^((\/?\.\.)|([>\/+~]))\s*([a-z]*)/i;

				if ( (m = re.exec(t)) != null ) {
					r = [];

					var nodeName = m[4], mergeNum = jQuery.mergeNum++;
					m = m[1];

					for ( var j = 0, rl = ret.length; j < rl; j++ )
						if ( m.indexOf("..") < 0 ) {
							var n = m == "~" || m == "+" ? ret[j].nextSibling : ret[j].firstChild;
							for ( ; n; n = n.nextSibling )
								if ( n.nodeType == 1 ) {
									if ( m == "~" && n.mergeNum == mergeNum ) break;
									
									if (!nodeName || n.nodeName.toUpperCase() == nodeName.toUpperCase() ) {
										if ( m == "~" ) n.mergeNum = mergeNum;
										r.push( n );
									}
									
									if ( m == "+" ) break;
								}
						} else
							r.push( ret[j].parentNode );

					ret = r;

					// And remove the token
					t = jQuery.trim( t.replace( re, "" ) );
					foundToken = true;
				}
			}

			// See if there's still an expression, and that we haven't already
			// matched a token
			if ( t && !foundToken ) {
				// Handle multiple expressions
				if ( !t.indexOf(",") ) {
					// Clean the result set
					if ( context == ret[0] ) ret.shift();

					// Merge the result sets
					done = jQuery.merge( done, ret );

					// Reset the context
					r = ret = [context];

					// Touch up the selector string
					t = " " + t.substr(1,t.length);

				} else {
					// Optomize for the case nodeName#idName
					var re2 = new RegExp("^(" + jQuery.chars + "+)(#)(" + jQuery.chars + "+)");
					var m = re2.exec(t);
					
					// Re-organize the results, so that they're consistent
					if ( m ) {
					   m = [ 0, m[2], m[3], m[1] ];

					} else {
						// Otherwise, do a traditional filter check for
						// ID, class, and element selectors
						re2 = new RegExp("^([#.]?)(" + jQuery.chars + "*)");
						m = re2.exec(t);
					}

					m[2] = m[2].replace(/\\/g, "");

					var elem = ret[ret.length-1];

					// Try to do a global search by ID, where we can
					if ( m[1] == "#" && elem && elem.getElementById ) {
						// Optimization for HTML document case
						var oid = elem.getElementById(m[2]);
						
						// Do a quick check for the existence of the actual ID attribute
						// to avoid selecting by the name attribute in IE
						// also check to insure id is a string to avoid selecting an element with the name of 'id' inside a form
						if ( (jQuery.browser.msie||jQuery.browser.opera) && oid && typeof oid.id == "string" && oid.id != m[2] )
							oid = jQuery('[@id="'+m[2]+'"]', elem)[0];

						// Do a quick check for node name (where applicable) so
						// that div#foo searches will be really fast
						ret = r = oid && (!m[3] || jQuery.nodeName(oid, m[3])) ? [oid] : [];
					} else {
						// We need to find all descendant elements
						for ( var i = 0; ret[i]; i++ ) {
							// Grab the tag name being searched for
							var tag = m[1] != "" || m[0] == "" ? "*" : m[2];

							// Handle IE7 being really dumb about <object>s
							if ( tag == "*" && ret[i].nodeName.toLowerCase() == "object" )
								tag = "param";

							r = jQuery.merge( r, ret[i].getElementsByTagName( tag ));
						}

						// It's faster to filter by class and be done with it
						if ( m[1] == "." )
							r = jQuery.classFilter( r, m[2] );

						// Same with ID filtering
						if ( m[1] == "#" ) {
							var tmp = [];

							// Try to find the element with the ID
							for ( var i = 0; r[i]; i++ )
								if ( r[i].getAttribute("id") == m[2] ) {
									tmp = [ r[i] ];
									break;
								}

							r = tmp;
						}

						ret = r;
					}

					t = t.replace( re2, "" );
				}

			}

			// If a selector string still exists
			if ( t ) {
				// Attempt to filter it
				var val = jQuery.filter(t,r);
				ret = r = val.r;
				t = jQuery.trim(val.t);
			}
		}

		// An error occurred with the selector;
		// just return an empty set instead
		if ( t )
			ret = [];

		// Remove the root context
		if ( ret && context == ret[0] )
			ret.shift();

		// And combine the results
		done = jQuery.merge( done, ret );

		return done;
	},

	classFilter: function(r,m,not){
		m = " " + m + " ";
		var tmp = [];
		for ( var i = 0; r[i]; i++ ) {
			var pass = (" " + r[i].className + " ").indexOf( m ) >= 0;
			if ( !not && pass || not && !pass )
				tmp.push( r[i] );
		}
		return tmp;
	},

	filter: function(t,r,not) {
		var last;

		// Look for common filter expressions
		while ( t  && t != last ) {
			last = t;

			var p = jQuery.parse, m;

			for ( var i = 0; p[i]; i++ ) {
				m = p[i].exec( t );

				if ( m ) {
					// Remove what we just matched
					t = t.substring( m[0].length );

					m[2] = m[2].replace(/\\/g, "");
					break;
				}
			}

			if ( !m )
				break;

			// :not() is a special case that can be optimized by
			// keeping it out of the expression list
			if ( m[1] == ":" && m[2] == "not" )
				r = jQuery.filter(m[3], r, true).r;

			// We can get a big speed boost by filtering by class here
			else if ( m[1] == "." )
				r = jQuery.classFilter(r, m[2], not);

			else if ( m[1] == "@" ) {
				var tmp = [], type = m[3];
				
				for ( var i = 0, rl = r.length; i < rl; i++ ) {
					var a = r[i], z = a[ jQuery.props[m[2]] || m[2] ];
					
					if ( z == null || /href|src/.test(m[2]) )
						z = jQuery.attr(a,m[2]) || '';

					if ( (type == "" && !!z ||
						 type == "=" && z == m[5] ||
						 type == "!=" && z != m[5] ||
						 type == "^=" && z && !z.indexOf(m[5]) ||
						 type == "$=" && z.substr(z.length - m[5].length) == m[5] ||
						 (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ not )
							tmp.push( a );
				}
				
				r = tmp;

			// We can get a speed boost by handling nth-child here
			} else if ( m[1] == ":" && m[2] == "nth-child" ) {
				var num = jQuery.mergeNum++, tmp = [],
					test = /(\d*)n\+?(\d*)/.exec(
						m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" ||
						!/\D/.test(m[3]) && "n+" + m[3] || m[3]),
					first = (test[1] || 1) - 0, last = test[2] - 0;

				for ( var i = 0, rl = r.length; i < rl; i++ ) {
					var node = r[i], parentNode = node.parentNode;

					if ( num != parentNode.mergeNum ) {
						var c = 1;

						for ( var n = parentNode.firstChild; n; n = n.nextSibling )
							if ( n.nodeType == 1 )
								n.nodeIndex = c++;

						parentNode.mergeNum = num;
					}

					var add = false;

					if ( first == 1 ) {
						if ( last == 0 || node.nodeIndex == last )
							add = true;
					} else if ( (node.nodeIndex + last) % first == 0 )
						add = true;

					if ( add ^ not )
						tmp.push( node );
				}

				r = tmp;

			// Otherwise, find the expression to execute
			} else {
				var f = jQuery.expr[m[1]];
				if ( typeof f != "string" )
					f = jQuery.expr[m[1]][m[2]];

				// Build a custom macro to enclose it
				eval("f = function(a,i){return " + f + "}");

				// Execute it against the current filter
				r = jQuery.grep( r, f, not );
			}
		}

		// Return an array of filtered elements (r)
		// and the modified expression string (t)
		return { r: r, t: t };
	},
	parents: function( elem ){
		var matched = [];
		var cur = elem.parentNode;
		while ( cur && cur != document ) {
			matched.push( cur );
			cur = cur.parentNode;
		}
		return matched;
	},
	nth: function(cur,result,dir,elem){
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] )
			if ( cur.nodeType == 1 && ++num == result )
				break;

		return cur;
	},
	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType == 1 && (!elem || n != elem) )
				r.push( n );
		}

		return r;
	}
});
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code orignated from 
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(element, type, handler, data) {
		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( jQuery.browser.msie && element.setInterval != undefined )
			element = window;
		
		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;
			
		// if data is passed, bind to handler 
		if( data != undefined ) { 
        	// Create temporary function pointer to original handler 
			var fn = handler; 

			// Create unique handler function, wrapped around original handler 
			handler = function() { 
				// Pass arguments and context to original handler 
				return fn.apply(this, arguments); 
			};

			// Store data in unique handler 
			handler.data = data;

			// Set the guid of unique handler to the same of original handler, so it can be removed 
			handler.guid = fn.guid;
		}

		// Init the element's event structure
		if (!element.$events)
			element.$events = {};
		
		if (!element.$handle)
			element.$handle = function() {
				// returned undefined or false
				var val;

				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				if ( typeof jQuery == "undefined" || jQuery.event.triggered )
				  return val;
				
				val = jQuery.event.handle.apply(element, arguments);
				
				return val;
			};

		// Get the current list of functions bound to this event
		var handlers = element.$events[type];

		// Init the event handler queue
		if (!handlers) {
			handlers = element.$events[type] = {};	
			
			// And bind the global event handler to the element
			if (element.addEventListener)
				element.addEventListener(type, element.$handle, false);
			else
				element.attachEvent("on" + type, element.$handle);
		}

		// Add the function to the element's handler list
		handlers[handler.guid] = handler;

		// Remember the function in a global list (for triggering)
		if (!this.global[type])
			this.global[type] = [];
		// Only add the element to the global list once
		if (jQuery.inArray(element, this.global[type]) == -1)
			this.global[type].push( element );
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(element, type, handler) {
		var events = element.$events, ret, index;

		if ( events ) {
			// type is actually an event object here
			if ( type && type.type ) {
				handler = type.handler;
				type = type.type;
			}
			
			if ( !type ) {
				for ( type in events )
					this.remove( element, type );

			} else if ( events[type] ) {
				// remove the given handler for the given type
				if ( handler )
					delete events[type][handler.guid];
				
				// remove all handlers for the given type
				else
					for ( handler in element.$events[type] )
						delete events[type][handler];

				// remove generic event handler if no more handlers exist
				for ( ret in events[type] ) break;
				if ( !ret ) {
					if (element.removeEventListener)
						element.removeEventListener(type, element.$handle, false);
					else
						element.detachEvent("on" + type, element.$handle);
					ret = null;
					delete events[type];
					
					// Remove element from the global event type cache
					while ( this.global[type] && ( (index = jQuery.inArray(element, this.global[type])) >= 0 ) )
						delete this.global[type][index];
				}
			}

			// Remove the expando if it's no longer used
			for ( ret in events ) break;
			if ( !ret )
				element.$handle = element.$events = null;
		}
	},

	trigger: function(type, data, element) {
		// Clone the incoming data, if any
		data = jQuery.makeArray(data || []);

		// Handle a global trigger
		if ( !element )
			jQuery.each( this.global[type] || [], function(){
				jQuery.event.trigger( type, data, this );
			});

		// Handle triggering a single element
		else {
			var val, ret, fn = jQuery.isFunction( element[ type ] || null );
			
			// Pass along a fake event
			data.unshift( this.fix({ type: type, target: element }) );

			// Trigger the event
			if ( jQuery.isFunction(element.$handle) && (val = element.$handle.apply( element, data )) !== false )
				this.triggered = true;

			if ( fn && val !== false && !jQuery.nodeName(element, 'a') )
				element[ type ]();

			this.triggered = false;
		}
	},

	handle: function(event) {
		// returned undefined or false
		var val;

		// Empty object is for triggered events with no data
		event = jQuery.event.fix( event || window.event || {} ); 

		var c = this.$events && this.$events[event.type], args = [].slice.call( arguments, 1 );
		args.unshift( event );

		for ( var j in c ) {
			// Pass in a reference to the handler function itself
			// So that we can later remove it
			args[0].handler = c[j];
			args[0].data = c[j].data;

			if ( c[j].apply( this, args ) === false ) {
				event.preventDefault();
				event.stopPropagation();
				val = false;
			}
		}

		// Clean up added properties in IE to prevent memory leak
		if (jQuery.browser.msie)
			event.target = event.preventDefault = event.stopPropagation =
				event.handler = event.data = null;

		return val;
	},

	fix: function(event) {
		// store a copy of the original event object 
		// and clone to set read-only properties
		var originalEvent = event;
		event = jQuery.extend({}, originalEvent);
		
		// add preventDefault and stopPropagation since 
		// they will not work on the clone
		event.preventDefault = function() {
			// if preventDefault exists run it on the original event
			if (originalEvent.preventDefault)
				return originalEvent.preventDefault();
			// otherwise set the returnValue property of the original event to false (IE)
			originalEvent.returnValue = false;
		};
		event.stopPropagation = function() {
			// if stopPropagation exists run it on the original event
			if (originalEvent.stopPropagation)
				return originalEvent.stopPropagation();
			// otherwise set the cancelBubble property of the original event to true (IE)
			originalEvent.cancelBubble = true;
		};
		
		// Fix target property, if necessary
		if ( !event.target && event.srcElement )
			event.target = event.srcElement;
				
		// check if target is a textnode (safari)
		if (jQuery.browser.safari && event.target.nodeType == 3)
			event.target = originalEvent.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var e = document.documentElement, b = document.body;
			event.pageX = event.clientX + (e && e.scrollLeft || b.scrollLeft);
			event.pageY = event.clientY + (e && e.scrollTop || b.scrollTop);
		}
			
		// Add which for key events
		if ( !event.which && (event.charCode || event.keyCode) )
			event.which = event.charCode || event.keyCode;
		
		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
			
		return event;
	}
};

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},
	one: function( type, data, fn ) {
		return this.each(function(){
			jQuery.event.add( this, type, function(event) {
				jQuery(this).unbind(event);
				return (fn || data).apply( this, arguments);
			}, fn && data);
		});
	},
	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},
	trigger: function( type, data ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this );
		});
	},
	toggle: function() {
		// Save reference to arguments for access in closure
		var a = arguments;

		return this.click(function(e) {
			// Figure out which function to execute
			this.lastToggle = 0 == this.lastToggle ? 1 : 0;
			
			// Make sure that clicks stop
			e.preventDefault();
			
			// and execute the function
			return a[this.lastToggle].apply( this, [e] ) || false;
		});
	},
	hover: function(f,g) {
		
		// A private function for handling mouse 'hovering'
		function handleHover(e) {
			// Check if mouse(over|out) are still within the same parent element
			var p = e.relatedTarget;
	
			// Traverse up the tree
			while ( p && p != this ) try { p = p.parentNode } catch(e) { p = this; };
			
			// If we actually just moused on to a sub-element, ignore it
			if ( p == this ) return false;
			
			// Execute the right function
			return (e.type == "mouseover" ? f : g).apply(this, [e]);
		}
		
		// Bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	},
	ready: function(f) {
		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			f.apply( document, [jQuery] );
			
		// Otherwise, remember the function for later
		else
			// Add the function to the wait list
			jQuery.readyList.push( function() { return f.apply(this, [jQuery]) } );
	
		return this;
	}
});

jQuery.extend({
	/*
	 * All the code that makes DOM Ready work nicely.
	 */
	isReady: false,
	readyList: [],
	
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;
			
			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.apply( document );
				});
				
				// Reset the list of functions
				jQuery.readyList = null;
			}
			// Remove event listener to avoid memory leak
			if ( jQuery.browser.mozilla || jQuery.browser.opera )
				document.removeEventListener( "DOMContentLoaded", jQuery.ready, false );
			
			// Remove script element used by IE hack
			if( !window.frames.length ) // don't remove if frames are present (#1187)
				jQuery(window).load(function(){ jQuery("#__ie_init").remove(); });
		}
	}
});

new function(){

	jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
		"mousedown,mouseup,mousemove,mouseover,mouseout,change,select," + 
		"submit,keydown,keypress,keyup,error").split(","), function(i,o){
		
		// Handle event binding
		jQuery.fn[o] = function(f){
			return f ? this.bind(o, f) : this.trigger(o);
		};
			
	});
	
	// If Mozilla is used
	if ( jQuery.browser.mozilla || jQuery.browser.opera )
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", jQuery.ready, false );
	
	// If IE is used, use the excellent hack by Matthias Miller
	// http://www.outofhanwell.com/blog/index.php?title=the_window_onload_problem_revisited
	else if ( jQuery.browser.msie ) {
	
		// Only works if you document.write() it
		document.write("<scr" + "ipt id=__ie_init defer=true " + 
			"src=//:><\/script>");
	
		// Use the defer script hack
		var script = document.getElementById("__ie_init");
		
		// script does not exist if jQuery is loaded dynamically
		if ( script ) 
			script.onreadystatechange = function() {
				if ( this.readyState != "complete" ) return;
				jQuery.ready();
			};
	
		// Clear from memory
		script = null;
	
	// If Safari  is used
	} else if ( jQuery.browser.safari )
		// Continually check to see if the document.readyState is valid
		jQuery.safariTimer = setInterval(function(){
			// loaded and complete are both valid states
			if ( document.readyState == "loaded" || 
				document.readyState == "complete" ) {
	
				// If either one are found, remove the timer
				clearInterval( jQuery.safariTimer );
				jQuery.safariTimer = null;
	
				// and execute any waiting functions
				jQuery.ready();
			}
		}, 10); 

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
	
};

// Clean up after IE to avoid memory leaks
if (jQuery.browser.msie)
	jQuery(window).one("unload", function() {
		var global = jQuery.event.global;
		for ( var type in global ) {
			var els = global[type], i = els.length;
			if ( i && type != 'unload' )
				do
					els[i-1] && jQuery.event.remove(els[i-1], type);
				while (--i);
		}
	});
jQuery.fn.extend({
	loadIfModified: function( url, params, callback ) {
		this.load( url, params, callback, 1 );
	},
	load: function( url, params, callback, ifModified ) {
		if ( jQuery.isFunction( url ) )
			return this.bind("load", url);

		callback = callback || function(){};

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			data: params,
			ifModified: ifModified,
			complete: function(res, status){
				if ( status == "success" || !ifModified && status == "notmodified" )
					// Inject the HTML into all the matched elements
					self.attr("innerHTML", res.responseText)
					  // Execute all the scripts inside of the newly-injected HTML
					  .evalScripts()
					  // Execute callback
					  .each( callback, [res.responseText, status, res] );
				else
					callback.apply( self, [res.responseText, status, res] );
			}
		});
		return this;
	},
	serialize: function() {
		return jQuery.param( this );
	},
	evalScripts: function() {
		return this.find("script").each(function(){
			if ( this.src )
				jQuery.getScript( this.src );
			else
				jQuery.globalEval( this.text || this.textContent || this.innerHTML || "" );
		}).end();
	}

});

// Attach a bunch of functions for handling common AJAX events

jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

jQuery.extend({
	get: function( url, data, callback, type, ifModified ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}
		
		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type,
			ifModified: ifModified
		});
	},
	getIfModified: function( url, data, callback, type ) {
		return jQuery.get(url, data, callback, type, 1);
	},
	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},
	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},
	post: function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},
	ajaxTimeout: function( timeout ) {
		jQuery.ajaxSettings.timeout = timeout;
	},
	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		global: true,
		type: "GET",
		timeout: 0,
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		data: null
	},
	
	// Last-Modified header cache for next request
	lastModified: {},
	ajax: function( s ) {
		// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
		s = jQuery.extend({}, jQuery.ajaxSettings, s);

		// if data available
		if ( s.data ) {
			// convert data if not already a string
			if (s.processData && typeof s.data != "string")
    			s.data = jQuery.param(s.data);
			// append data to url for get requests
			if( s.type.toLowerCase() == "get" ) {
				// "?" + data or "&" + data (in case there are already params)
				s.url += ((s.url.indexOf("?") > -1) ? "&" : "?") + s.data;
				// IE likes to send both get and post data, prevent this
				s.data = null;
			}
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		var requestDone = false;

		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		var xml = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

		// Open the socket
		xml.open(s.type, s.url, s.async);

		// Set the correct header, if data is being sent
		if ( s.data )
			xml.setRequestHeader("Content-Type", s.contentType);

		// Set the If-Modified-Since header, if ifModified mode.
		if ( s.ifModified )
			xml.setRequestHeader("If-Modified-Since",
				jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

		// Set header so the called script knows that it's an XMLHttpRequest
		xml.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		// Allow custom headers/mimetypes
		if( s.beforeSend )
			s.beforeSend(xml);
			
		if ( s.global )
		    jQuery.event.trigger("ajaxSend", [xml, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The transfer is complete and the data is available, or the request timed out
			if ( xml && (xml.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;
				
				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}
				
				var status;
				try {
					status = jQuery.httpSuccess( xml ) && isTimeout != "timeout" ?
						s.ifModified && jQuery.httpNotModified( xml, s.url ) ? "notmodified" : "success" : "error";
					// Make sure that the request was successful or notmodified
					if ( status != "error" ) {
						// Cache Last-Modified header, if ifModified mode.
						var modRes;
						try {
							modRes = xml.getResponseHeader("Last-Modified");
						} catch(e) {} // swallow exception thrown by FF if header is not available
	
						if ( s.ifModified && modRes )
							jQuery.lastModified[s.url] = modRes;
	
						// process the data (runs the xml through httpData regardless of callback)
						var data = jQuery.httpData( xml, s.dataType );
	
						// If a local callback was specified, fire it and pass it the data
						if ( s.success )
							s.success( data, status );
	
						// Fire the global callback
						if( s.global )
							jQuery.event.trigger( "ajaxSuccess", [xml, s] );
					} else
						jQuery.handleError(s, xml, status);
				} catch(e) {
					status = "error";
					jQuery.handleError(s, xml, status, e);
				}

				// The request was completed
				if( s.global )
					jQuery.event.trigger( "ajaxComplete", [xml, s] );

				// Handle the global AJAX counter
				if ( s.global && ! --jQuery.active )
					jQuery.event.trigger( "ajaxStop" );

				// Process result
				if ( s.complete )
					s.complete(xml, status);

				// Stop memory leaks
				if(s.async)
					xml = null;
			}
		};
		
		// don't attach the handler to the request, just poll it instead
		var ival = setInterval(onreadystatechange, 13); 

		// Timeout checker
		if ( s.timeout > 0 )
			setTimeout(function(){
				// Check to see if the request is still happening
				if ( xml ) {
					// Cancel the request
					xml.abort();

					if( !requestDone )
						onreadystatechange( "timeout" );
				}
			}, s.timeout);
			
		// Send the data
		try {
			xml.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xml, null, e);
		}
		
		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();
		
		// return XMLHttpRequest to allow aborting the request etc.
		return xml;
	},

	handleError: function( s, xml, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xml, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xml, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( r ) {
		try {
			return !r.status && location.protocol == "file:" ||
				( r.status >= 200 && r.status < 300 ) || r.status == 304 ||
				jQuery.browser.safari && r.status == undefined;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xml, url ) {
		try {
			var xmlRes = xml.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xml.status == 304 || xmlRes == jQuery.lastModified[url] ||
				jQuery.browser.safari && xml.status == undefined;
		} catch(e){}
		return false;
	},

	/* Get the data out of an XMLHttpRequest.
	 * Return parsed XML if content-type header is "xml" and type is "xml" or omitted,
	 * otherwise return plain text.
	 * (String) data - The type of data that you're expecting back,
	 * (e.g. "xml", "html", "script")
	 */
	httpData: function( r, type ) {
		var ct = r.getResponseHeader("content-type");
		var data = !type && ct && ct.indexOf("xml") >= 0;
		data = type == "xml" || data ? r.responseXML : r.responseText;

		// If the type is "script", eval it in global context
		if ( type == "script" )
			jQuery.globalEval( data );

		// Get the JavaScript object, if JSON is used.
		if ( type == "json" )
			data = eval("(" + data + ")");

		// evaluate scripts within html
		if ( type == "html" )
			jQuery("<div>").html(data).evalScripts();

		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [];

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( a.constructor == Array || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				s.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( this.value ) );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( a[j] && a[j].constructor == Array )
					jQuery.each( a[j], function(){
						s.push( encodeURIComponent(j) + "=" + encodeURIComponent( this ) );
					});
				else
					s.push( encodeURIComponent(j) + "=" + encodeURIComponent( a[j] ) );

		// Return the resulting serialization
		return s.join("&");
	},
	
	// evalulates a script in global context
	// not reliable for safari
	globalEval: function( data ) {
		if ( window.execScript )
			window.execScript( data );
		else if ( jQuery.browser.safari )
			// safari doesn't provide a synchronous global eval
			window.setTimeout( data, 0 );
		else
			eval.call( window, data );
	}

});
jQuery.fn.extend({

	show: function(speed,callback){
		return speed ?
			this.animate({
				height: "show", width: "show", opacity: "show"
			}, speed, callback) :
			
			this.filter(":hidden").each(function(){
				this.style.display = this.oldblock ? this.oldblock : "";
				if ( jQuery.css(this,"display") == "none" )
					this.style.display = "block";
			}).end();
	},

	hide: function(speed,callback){
		return speed ?
			this.animate({
				height: "hide", width: "hide", opacity: "hide"
			}, speed, callback) :
			
			this.filter(":visible").each(function(){
				this.oldblock = this.oldblock || jQuery.css(this,"display");
				if ( this.oldblock == "none" )
					this.oldblock = "block";
				this.style.display = "none";
			}).end();
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,
	toggle: function( fn, fn2 ){
		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle( fn, fn2 ) :
			fn ?
				this.animate({
					height: "toggle", width: "toggle", opacity: "toggle"
				}, fn, fn2) :
				this.each(function(){
					jQuery(this)[ jQuery(this).is(":hidden") ? "show" : "hide" ]();
				});
	},
	slideDown: function(speed,callback){
		return this.animate({height: "show"}, speed, callback);
	},
	slideUp: function(speed,callback){
		return this.animate({height: "hide"}, speed, callback);
	},
	slideToggle: function(speed, callback){
		return this.animate({height: "toggle"}, speed, callback);
	},
	fadeIn: function(speed, callback){
		return this.animate({opacity: "show"}, speed, callback);
	},
	fadeOut: function(speed, callback){
		return this.animate({opacity: "hide"}, speed, callback);
	},
	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},
	animate: function( prop, speed, easing, callback ) {
		return this.queue(function(){
			var hidden = jQuery(this).is(":hidden"),
				opt = jQuery.speed(speed, easing, callback),
				self = this;
			
			for ( var p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return jQuery.isFunction(opt.complete) && opt.complete.apply(this);

				if ( p == "height" || p == "width" ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}
			}

			if ( opt.overflow != null )
				this.style.overflow = "hidden";

			this.curAnim = jQuery.extend({}, prop);
			
			jQuery.each( prop, function(name, val){
				var e = new jQuery.fx( self, opt, name );
				if ( val.constructor == Number )
					e.custom( e.cur(), val );
				else
					e[ val == "toggle" ? hidden ? "show" : "hide" : val ]( prop );
			});
		});
	},
	queue: function(type,fn){
		if ( !fn ) {
			fn = type;
			type = "fx";
		}
	
		return this.each(function(){
			if ( !this.queue )
				this.queue = {};
	
			if ( !this.queue[type] )
				this.queue[type] = [];
	
			this.queue[type].push( fn );
		
			if ( this.queue[type].length == 1 )
				fn.apply(this);
		});
	}

});

jQuery.extend({
	
	speed: function(speed, easing, fn) {
		var opt = speed && speed.constructor == Object ? speed : {
			complete: fn || !fn && easing || 
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && easing.constructor != Function && easing || (jQuery.easing.swing ? "swing" : "linear")
		};

		opt.duration = (opt.duration && opt.duration.constructor == Number ? 
			opt.duration : 
			{ slow: 600, fast: 200 }[opt.duration]) || 400;
	
		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			jQuery.dequeue(this, "fx");
			if ( jQuery.isFunction( opt.old ) )
				opt.old.apply( this );
		};
	
		return opt;
	},
	
	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},
	
	queue: {},
	
	dequeue: function(elem,type){
		type = type || "fx";
	
		if ( elem.queue && elem.queue[type] ) {
			// Remove self
			elem.queue[type].shift();
	
			// Get next function
			var f = elem.queue[type][0];
		
			if ( f ) f.apply( elem );
		}
	},

	timers: [],

	/*
	 * I originally wrote fx() as a clone of moo.fx and in the process
	 * of making it small in size the code became illegible to sane
	 * people. You've been warned.
	 */
	
	fx: function( elem, options, prop ){

		var z = this;

		// The styles
		var y = elem.style;
		
		// Simple function for setting a style value
		z.a = function(){
			if ( options.step )
				options.step.apply( elem, [ z.now ] );

			if ( prop == "opacity" )
				jQuery.attr(y, "opacity", z.now); // Let attr handle opacity
			else {
				y[prop] = parseInt(z.now) + "px";
				y.display = "block"; // Set display property to block for animation
			}
		};

		// Figure out the maximum number to run to
		z.max = function(){
			return parseFloat( jQuery.css(elem,prop) );
		};

		// Get the current size
		z.cur = function(){
			var r = parseFloat( jQuery.curCSS(elem, prop) );
			return r && r > -10000 ? r : z.max();
		};

		// Start an animation from one number to another
		z.custom = function(from,to){
			z.startTime = (new Date()).getTime();
			z.now = from;
			z.a();

			jQuery.timers.push(function(){
				return z.step(from, to);
			});

			if ( jQuery.timers.length == 1 ) {
				var timer = setInterval(function(){
					var timers = jQuery.timers;
					
					for ( var i = 0; i < timers.length; i++ )
						if ( !timers[i]() )
							timers.splice(i--, 1);

					if ( !timers.length )
						clearInterval( timer );
				}, 13);
			}
		};

		// Simple 'show' function
		z.show = function(){
			if ( !elem.orig ) elem.orig = {};

			// Remember where we started, so that we can go back to it later
			elem.orig[prop] = jQuery.attr( elem.style, prop );

			options.show = true;

			// Begin the animation
			z.custom(0, this.cur());

			// Make sure that we start at a small width/height to avoid any
			// flash of content
			if ( prop != "opacity" )
				y[prop] = "1px";
			
			// Start by showing the element
			jQuery(elem).show();
		};

		// Simple 'hide' function
		z.hide = function(){
			if ( !elem.orig ) elem.orig = {};

			// Remember where we started, so that we can go back to it later
			elem.orig[prop] = jQuery.attr( elem.style, prop );

			options.hide = true;

			// Begin the animation
			z.custom(this.cur(), 0);
		};

		// Each step of an animation
		z.step = function(firstNum, lastNum){
			var t = (new Date()).getTime();

			if (t > options.duration + z.startTime) {
				z.now = lastNum;
				z.a();

				if (elem.curAnim) elem.curAnim[ prop ] = true;

				var done = true;
				for ( var i in elem.curAnim )
					if ( elem.curAnim[i] !== true )
						done = false;

				if ( done ) {
					if ( options.display != null ) {
						// Reset the overflow
						y.overflow = options.overflow;
					
						// Reset the display
						y.display = options.display;
						if ( jQuery.css(elem, "display") == "none" )
							y.display = "block";
					}

					// Hide the element if the "hide" operation was done
					if ( options.hide )
						y.display = "none";

					// Reset the properties, if the item has been hidden or shown
					if ( options.hide || options.show )
						for ( var p in elem.curAnim )
							jQuery.attr(y, p, elem.orig[p]);
				}

				// If a callback was provided, execute it
				if ( done && jQuery.isFunction( options.complete ) )
					// Execute the complete function
					options.complete.apply( elem );

				return false;
			} else {
				var n = t - this.startTime;
				// Figure out where in the animation we are and set the number
				var p = n / options.duration;
				
				// Perform the easing function, defaults to swing
				z.now = jQuery.easing[options.easing](p, n, firstNum, (lastNum-firstNum), options.duration);

				// Perform the next step of the animation
				z.a();
			}

			return true;
		};
	
	}
});
}
YAHOO.namespace("protoscript");

YAHOO.protoscript.Behaviors = [
{
   name:'Timer', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Click', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Blur', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Dblclick', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Focus', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keydown', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keypress', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keyup', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Keydown', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mousedown', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mousemove', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mouseover', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mouseout', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Mouseup', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Resize', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ToggleOpenClose', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ToggleClass', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Fade', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Move', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Close', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Resize', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Animate', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Spotlight', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'SetClass', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'SetStyle', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ReplaceClass', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Hide', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Show', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Script', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'ToggleShowHide', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Open', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'InnerHtml', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'FetchHtml', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'Popup', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
},
{
   name:'DragDrop', 
   attributes:[
      {name:'attr1', default:'val',type:'type'} 
   ],
   callbacks:[
      {name:'callback1'}
   ] 
}


];

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
				}(i), behaviorCfg.timer*1000);	
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
					var scope = ProtoScript.Core.createScope(behaviorCfg['on'+behaviorName], idx);
					if(ProtoScript.Core.testModifier(behaviorCfg.modifier, e)) {
						if(behaviorCfg.delay && behaviorCfg.delay > 0) {
							setTimeout(function() {
								ProtoScript.Core.callBehaviors(behaviorCfg['on'+behaviorName], scope);
							}, behaviorCfg.delay*1000);
						} else {
							ProtoScript.Core.callBehaviors(behaviorCfg['on'+behaviorName], scope);
						}
					}
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
YAHOO.protoscript.Keydown = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Keydown.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'keydown');}
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
YAHOO.protoscript.Keyup = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Keyup.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'keyup');}
};
YAHOO.protoscript.Keydown = function(behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Keydown.prototype = {
	defaultCfg : {},
	init: function(behaviorName, behaviorCfg) {
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	action: function(currScope) { YAHOO.protoscript.Trigger(this.cfg, currScope, 'keydown');}
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
			ProtoScript.Core.callBehaviors(cfg.onToggleOpenClose, currScope);
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
			ProtoScript.Core.callBehaviors(cfg.onToggleClass, currScope);
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
		animationMethod: YAHOO.util.Easing.easeOut
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
					animAttr, this.cfg.duration, this.cfg.animationMethod);

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
		animationMethod: YAHOO.util.Easing.easeOut
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
					animAttr, this.cfg.duration, this.cfg.animationMethod);

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
			ProtoScript.Core.callBehaviors(cfg.onClose, currScope);
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
		animationMethod: YAHOO.util.Easing.easeOut
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
					animAttr, this.cfg.duration, this.cfg.animationMethod);
					
		// Handle callbacks
		YAHOO.protoscript.Util.handleAnimMoments(this.cfg, anim, currScope);	
		anim.animate();
		
		if(this.cfg.onResize) {
			ProtoScript.Core.callBehaviors(cfg.onResize, currScope);
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
				
		// color properties (to)
		color: null,
		backgroundColor: null,
		borderTopColor: null,
		borderRightColor: null,
		borderBottomColor: null,
		borderLeftColor: null,
		
		// time and method
		duration:        0.5,
		animationMethod: YAHOO.util.Easing.easeOut,
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Animate.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {

		var animAttr = ProtoScript.Core.createAnimConfig(this.cfg);
		var anim = new YAHOO.util.Anim(currScope.elems, 
					animAttr, this.cfg.duration, this.cfg.animationMethod);

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
		animationMethod: YAHOO.util.Easing.easeOut
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
					animAttr, this.cfg.duration, this.cfg.animationMethod);
		
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
		// console.log("SetClass.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		for(var styleName in this.cfg) {
			var styleVal = this.cfg[styleName];
			YAHOO.util.Dom.setStyle(currScope.elems, styleName, styleVal);
		}
		if(this.cfg.onSetStyle) {
			ProtoScript.Core.callBehaviors(cfg.onSetStyle, currScope);
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
		YAHOO.util.Dom.addClass(currScope.elems, this.cfg.addClass);
		if(this.cfg.onSetClass) {
			ProtoScript.Core.callBehaviors(cfg.onSetClass, currScope);
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
		YAHOO.util.Dom.replaceClass(currScope.elems, this.cfg.removeClass, this.cfg.addClass);
		if(this.cfg.onReplaceClass) {
			ProtoScript.Core.callBehaviors(cfg.onReplaceClass, currScope);
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
			ProtoScript.Core.callBehaviors(cfg.onHide, currScope);
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
			ProtoScript.Core.callBehaviors(cfg.onShow, currScope);
		}
	}
};

YAHOO.protoscript.Script = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.Script.prototype = {	
	defaultCfg : {
		func: null,
	},
	
	init: function(behaviorName, behaviorCfg) {
		// console.log("Script.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
	},
	
	action: function(currScope) {
		eval(this.cfg.func);
		if(this.cfg.onScript) {
			ProtoScript.Core.callBehaviors(cfg.onScript, currScope);
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
			ProtoScript.Core.callBehaviors(cfg.onToggleShowHide, currScope);
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
			ProtoScript.Core.callBehaviors(cfg.onOpen, currScope);
		}
	}
};

YAHOO.protoscript.SetHtml = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.SetHtml.prototype = {
	defaultCfg : {
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
			} else if (this.cfg.copyFrom) {
				// resolve the copyfrom value
				var copyFromElems = ProtoScript.Core.getElemInScope(currScope, this.cfg.copyFrom);
				this.insertFromClone(copyFromElems[0], insertTarget);
				
			}
		}
		if(this.cfg.onSetHtml) {
			ProtoScript.Core.callBehaviors(cfg.onSetHtml, currScope);
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
		xy: null,
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
		bd: 'This is a dynamically generated Panel. Use the "bd" attribute to set the body text.',
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
			this.panel.setHeader(this.getContent(this.cfg.hd, idx));
			this.panel.setBody(this.getContent(this.cfg.bd, idx));
			this.panel.setFooter(this.getContent(this.cfg.ft, idx));
			this.panel.render(document.body);
		} else {
			this.cfg.context = this.getContext(this.context, idx);
			this.idx = idx;
			this.panel.cfg.setProperty('context', this.cfg.context);
			this.panel.setHeader(this.getContent(this.cfg.hd, idx));
			this.panel.setBody(this.getContent(this.cfg.bd, idx));
			this.panel.setFooter(this.getContent(this.cfg.ft, idx));
		}
				
		this.panel.show();
		if(this.cfg.onPopup) {
			ProtoScript.Core.callBehaviors(cfg.onPopup, currScope);
		}
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
	},
	

	getContent: function(contentCfg, idx) {
		// try to resolve as css query string first
		var elem = ProtoScript.Core.$(contentCfg);
		// got one
		if(elem && contentCfg !== '' && elem.length) {
			return elem[idx].innerHTML;
		} else if(contentCfg.substring(0,7)==="http://") {
			if(/[.]gif$|[.]jpg$|[.]jpeg$|[.]png$/i.test(contentCfg)) {
				// handle as img
				return '<img src="' + contentCfg + '" alt="mockup"/>'
			} else {
				// handle as url
				// later pull content from another page into an iframe and serve it up here
			}
		} else {
			// handle as text
			return contentCfg;
		}
	}
};


YAHOO.protoscript.DragDrop = function (behaviorName, behaviorCfg) {
	this.init(behaviorName, behaviorCfg);
};
YAHOO.protoscript.DragDrop.prototype = {
	
	interactionGroup: 'bill', // change later
	
	defaultCfg : {
		dropTarget: null
		// 'onMouseDown': null,
		// 'startDrag | onStartDrag': null,
		// 'onDrag': null,
		// 'onDragEnter': null,
		// 'onDragOver': null,
		// 'onDragDrop': null,
		// 'onDragOut': null,
		// 'endDrag | onEndDrag': null,
		// 'onMouseUp': null
	},

	init: function(behaviorName, behaviorCfg) {
		// console.log("DragDrop.init");
		this.name = behaviorName;
		this.cfg = ProtoScript.Core.applyConfig(this.defaultCfg, behaviorCfg);
		// Create single or multiple drop targets based on how many elements are supplied to us
		var dropTargets = ProtoScript.Core.$(this.cfg.dropTarget);
		this.dropTargetDD = [];
		for(var i=0; i<dropTargets.length; i++){
			var dropElem = dropTargets[i];
			this.dropTargetDD[i] = new YAHOO.util.DDTarget(dropElem, this.interactionGroup);
		}
		
		this.dragProxyDD = [];
	},
	
	// Called once and passed all drag objects to register
	action: function(currScope) {
		var scopeElems = currScope.elems;
		
		var parName = this.parent ? this.parent.name : "ROOT";
		var me = this;
		
		for(var i=0; i<scopeElems.length; i++) {
		
			var dd = new YAHOO.util.DDProxy(scopeElems[i], this.interactionGroup);
			dd.scroll = false;
			this.registerCallbacks(this.cfg, dd, i);
			
		}
		
		this.dragProxyDD.push(dd); //XXX is this correct? should be in the loop?
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


// Version 0.3

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
		$$: $,
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
					
					console.log("passing instantiateBehaviorExt:name=", propName);
					
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
			console.log("instantiateBehaviorExt:name=", behName);
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
		
		// XXXX NEEDS TO CHANGE
		// needs to make a pass through the whole config tree initializing everything
		// Do not call any behaviors, the first time through
		// That gets everything set up
		
		// Then start a second pass through that starts the call behaviors pass
		// Basically split the parseInteraction into two passes
		// The "later" passes are invoked individually by calling callBehaviors()
		
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
		// this currently only works on FF
		// FIX for all browsers
		// function checkMods(evt) {
		//     evt = (evt) ? evt : (window.event) ? window.event : ""
		//     if (evt) {
		//         var elem = (evt.target) ? evt.target : evt.srcElement
		//         if (evt.modifiers) {
		//             evt.modifiers & Event.ALT_MASK
		//             evt.modifiers & Event.CONTROL_MASK
		//             evt.modifiers & Event.SHIFT_MASK
		//             evt.modifiers & Event.META_MASK
		//         } else {
		//             evt.altKey
		//             evt.ctrlKey
		//             evt.shiftKey
		//             false
		//         }
		//     }
		//     return false
		// }
		testModifier: function(modifier, evt) {
			return !modifier || evt[modifier];
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
		}
	};
}();
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
				width:'400px',
				visible: true,
				iframe:true
			});

			var innerHTML = '<div style="margin:12px;font-family:arial;font-size:12px; width:95%;height:90%">' + 
				'<div>' + 
					'<label style="display:block;text-align:left;padding:0px;width:auto;">For elements matching:</label>' + 
					'<input style="float:left;font-family:courier;padding:4px;border:1px solid gray;width:80%;" id="the-query-field" type="text"/>' + 
					'<button id="find-elems" style="border:1px solid gray;float:left;margin-top:2px;margin-left:10px;">Find</button>' +
				'</div>' + 
				'<div style="clear:both;"></div>' + 
				'<div style="margin-top:10px;height:80%">' + 
					'<label style="display:block;text-align:left;padding:0px; width:auto;">Do the following:</label>' + 
					'<textarea style="line-height:1em;overflow:visible;font-family:courier;padding:4px;border:1px solid gray;width:80%;height:100%;float:left" id="the-script-field"></textarea>' + 
				'</div>' + 
				'<div style="clear:both;"></div>' + 
				'<button style="float:left;border:1px solid gray;margin-top:4px;" id="execute-script-button">Add Behaviors</button>' + 
				// '<div style="clear:both;"></div>' + 
			'</div>';
			
			this.panel.center = this.centerPanelY;
			this.panel.setHeader("Test Protoscript");
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

		},

	};
}();
