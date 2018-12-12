/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
/* ===================================================
 * bootstrap-transition.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  $(function () {

    "use strict"

    /* CSS TRANSITION SUPPORT (https://gist.github.com/373874)
     * ======================================================= */

    $.support.transition = (function () {
      var thisBody = document.body || document.documentElement
        , thisStyle = thisBody.style
        , support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined

      return support && {
        end: (function () {
          var transitionEnd = "TransitionEnd"
          if ( $.browser.webkit ) {
          	transitionEnd = "webkitTransitionEnd"
          } else if ( $.browser.mozilla ) {
          	transitionEnd = "transitionend"
          } else if ( $.browser.opera ) {
          	transitionEnd = "oTransitionEnd"
          }
          return transitionEnd
        }())
      }
    })()

  })

}( window.jQuery );
/* =========================================================
 * bootstrap-modal.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function ( content, options ) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}( window.jQuery );
/* ============================================================
 * bootstrap-dropdown.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function( $ ){

  "use strict"

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function ( element ) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent
        , isActive

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()
      !isActive && $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}( window.jQuery );
/* =============================================================
 * bootstrap-scrollspy.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

!function ( $ ) {

  "use strict"

  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body').on('click.scroll.data-api', this.selector, process)
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        this.targets = this.$body
          .find(this.selector)
          .map(function () {
            var href = $(this).attr('href')
            return /^#\w/.test(href) && $(href).length ? href : null
          })

        this.offsets = $.map(this.targets, function (id) {
          return $(id).position().top
        })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active

        this.activeTarget = target

        this.$body
          .find(this.selector).parent('.active')
          .removeClass('active')

        active = this.$body
          .find(this.selector + '[href="' + target + '"]')
          .parent('li')
          .addClass('active')

        if ( active.parent('.dropdown-menu') )  {
          active.closest('li.dropdown').addClass('active')
        }
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}( window.jQuery );
/* ========================================================
 * bootstrap-tab.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function( $ ){

  "use strict"

 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      $this.trigger({
        type: 'show'
      , relatedTarget: previous
      })

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}( window.jQuery );
/* ===========================================================
 * bootstrap-tooltip.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  "use strict"

 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function ( element, options ) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function ( type, element, options ) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function ( options ) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) {
        self.show()
      } else {
        self.hoverState = 'in'
        setTimeout(function() {
          if (self.hoverState == 'in') {
            self.show()
          }
        }, self.options.delay.show)
      }
    }

  , leave: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.hide) {
        self.hide()
      } else {
        self.hoverState = 'out'
        setTimeout(function() {
          if (self.hoverState == 'out') {
            self.hide()
          }
        }, self.options.delay.hide)
      }
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
      $tip.find('.tooltip-inner').html(this.getTitle())
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      title = (title || '').toString().replace(/(^\s*|\s*$)/, "")

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , delay: 0
  , selector: false
  , placement: 'top'
  , trigger: 'hover'
  , title: ''
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  }

}( window.jQuery );
/* ===========================================================
 * bootstrap-popover.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function( $ ) {

 "use strict"

  var Popover = function ( element, options ) {
    this.init('popover', element, options)
  }

  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[ $.type(title) == 'object' ? 'append' : 'html' ](title)
      $tip.find('.popover-content > *')[ $.type(content) == 'object' ? 'append' : 'html' ](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      content = content.toString().replace(/(^\s*|\s*$)/, "")

      return content
    }

  , tip: function() {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}( window.jQuery );
/* ==========================================================
 * bootstrap-alert.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function ( el ) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype = {

    constructor: Alert

  , close: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.trigger('close')

      e && e.preventDefault()

      $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

      $parent
        .trigger('close')
        .removeClass('in')

      function removeElement() {
        $parent
          .trigger('closed')
          .remove()
      }

      $.support.transition && $parent.hasClass('fade') ?
        $parent.on($.support.transition.end, removeElement) :
        removeElement()
    }

  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}( window.jQuery );
/* ============================================================
 * bootstrap-button.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype = {

      constructor: Button

    , setState: function ( state ) {
        var d = 'disabled'
          , $el = this.$element
          , data = $el.data()
          , val = $el.is('input') ? 'val' : 'html'

        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout(function () {
          state == 'loadingText' ?
            $el.addClass(d).attr(d, d) :
            $el.removeClass(d).removeAttr(d)
        }, 0)
      }

    , toggle: function () {
        var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

        $parent && $parent
          .find('.active')
          .removeClass('active')

        this.$element.toggleClass('active')
      }

  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}( window.jQuery );
/* =============================================================
 * bootstrap-collapse.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Collapse = function ( element, options ) {
  	this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options["parent"]) {
      this.$parent = $(this.options["parent"])
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension = this.dimension()
        , scroll = $.camelCase(['scroll', dimension].join('-'))
        , actives = this.$parent && this.$parent.find('.in')
        , hasData

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', 'show', 'shown')
      this.$element[dimension](this.$element[0][scroll])

    }

  , hide: function () {
      var dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', 'hide', 'hidden')
      this.$element[dimension](0)
    }

  , reset: function ( size ) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function ( method, startEvent, completeEvent ) {
      var that = this
        , complete = function () {
            if (startEvent == 'show') that.reset()
            that.$element.trigger(completeEvent)
          }

      this.$element
        .trigger(startEvent)
        [method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
  	}

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
  	}

  }

  /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function ( e ) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $(target).collapse(option)
    })
  })

}( window.jQuery );
/* ==========================================================
 * bootstrap-carousel.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.carousel.defaults, options)
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function () {
      this.interval = setInterval($.proxy(this.next, this), this.options.interval)
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function () {
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if (!$.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger('slide')
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      } else {
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.trigger('slide')
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = typeof option == 'object' && option
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (typeof option == 'string' || (option = options.slide)) data[option]()
      else data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}( window.jQuery );
/* =============================================================
 * bootstrap-typeahead.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Typeahead = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element.val(val)
      this.$element.change();
      return this.hide()
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        if (that.matcher(item)) return item
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      return item.replace(new RegExp('(' + this.query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}( window.jQuery );
window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var JSON=window.JSON,cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a,b){"use strict";var c=a.History=a.History||{},d=a.jQuery;if(typeof c.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");c.Adapter={bind:function(a,b,c){d(a).bind(b,c)},trigger:function(a,b,c){d(a).trigger(b,c)},extractEventData:function(a,c,d){var e=c&&c.originalEvent&&c.originalEvent[a]||d&&d[a]||b;return e},onDomLoad:function(a){d(a)}},typeof c.init!="undefined"&&c.init()}(window),function(a,b){"use strict";var c=a.document,d=a.setTimeout||d,e=a.clearTimeout||e,f=a.setInterval||f,g=a.History=a.History||{};if(typeof g.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined")return!1;g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(a){var b=g.getHashByIndex(),c;return c=a===b,c},g.saveHash=function(a){return g.isLastHash(a)?!1:(g.savedHashes.push(a),!0)},g.getHashByIndex=function(a){var b=null;return typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a],b},g.discardedHashes={},g.discardedStates={},g.discardState=function(a,b,c){var d=g.getHashByState(a),e;return e={discardedState:a,backState:c,forwardState:b},g.discardedStates[d]=e,!0},g.discardHash=function(a,b,c){var d={discardedHash:a,backState:c,forwardState:b};return g.discardedHashes[a]=d,!0},g.discardedState=function(a){var b=g.getHashByState(a),c;return c=g.discardedStates[b]||!1,c},g.discardedHash=function(a){var b=g.discardedHashes[a]||!1;return b},g.recycleState=function(a){var b=g.getHashByState(a);return g.discardedState(a)&&delete g.discardedStates[b],!0},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;var b="",d,e,h,i;return g.isInternetExplorer()?(d="historyjs-iframe",e=c.createElement("iframe"),e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close(),h="",i=!1,g.checkerFunction=function(){if(i)return!1;i=!0;var c=g.getHash()||"",d=g.unescapeHash(e.contentWindow.document.location.hash)||"";return c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1,!0}):g.checkerFunction=function(){var c=g.getHash();return c!==b&&(b=c,g.Adapter.trigger(a,"hashchange")),!0},g.intervalList.push(f(g.checkerFunction,g.options.hashChangeInterval)),!0},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){var d=b&&b.newURL||c.location.href,e=g.getHashByUrl(d),f=null,h=null,i=null,j;return g.isLastHash(e)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(e),e&&g.isTraditionalAnchor(e)?(g.Adapter.trigger(a,"anchorchange"),g.busy(!1),!1):(f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0),g.isLastSavedState(f)?(g.busy(!1),!1):(h=g.getHashByState(f),j=g.discardedState(f),j?(g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(f.data,f.title,f.url,!1),!0))))},g.Adapter.bind(a,"hashchange",g.onHashChange),g.pushState=function(b,d,e,f){if(g.getHashByUrl(e))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(f!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:f}),!1;g.busy(!0);var h=g.createStateObject(b,d,e),i=g.getHashByState(h),j=g.getState(!1),k=g.getHashByState(j),l=g.getHash();return g.storeState(h),g.expectedStateId=h.id,g.recycleState(h),g.setTitle(h),i===k?(g.busy(!1),!1):i!==l&&i!==g.getShortUrl(c.location.href)?(g.setHash(i,!1),!1):(g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1),!0)},g.replaceState=function(a,b,c,d){if(g.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(d!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:d}),!1;g.busy(!0);var e=g.createStateObject(a,b,c),f=g.getState(!1),h=g.getStateByIndex(-2);return g.discardState(f,e,h),g.pushState(e.data,e.title,e.url,!1),!0}),g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")})},typeof g.init!="undefined"&&g.init()}(window),function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.sessionStorage||!1,g=a.setTimeout,h=a.clearTimeout,i=a.setInterval,j=a.clearInterval,k=a.JSON,l=a.alert,m=a.History=a.History||{},n=a.history;k.stringify=k.stringify||k.encode,k.parse=k.parse||k.decode;if(typeof m.init!="undefined")throw new Error("History.js Core has already been loaded...");m.init=function(){return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)},m.initCore=function(){if(typeof m.initCore.initialized!="undefined")return!1;m.initCore.initialized=!0,m.options=m.options||{},m.options.hashChangeInterval=m.options.hashChangeInterval||100,m.options.safariPollInterval=m.options.safariPollInterval||500,m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,m.options.storeInterval=m.options.storeInterval||1e3,m.options.busyDelay=m.options.busyDelay||250,m.options.debug=m.options.debug||!1,m.options.initialTitle=m.options.initialTitle||d.title,m.intervalList=[],m.clearAllIntervals=function(){var a,b=m.intervalList;if(typeof b!="undefined"&&b!==null){for(a=0;a<b.length;a++)j(b[a]);m.intervalList=null}},m.debug=function(){(m.options.debug||!1)&&m.log.apply(m,arguments)},m.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g,h,i;a?(h=Array.prototype.slice.call(arguments),e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){i=arguments[f];if(typeof i=="object"&&typeof k!="undefined")try{i=k.stringify(i)}catch(j){}e+="\n"+i+"\n"}return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),!0},m.getInternetExplorerMajorVersion=function(){var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},m.isInternetExplorer=function(){var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());return a},m.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)},m.enabled=!m.emulated.pushState,m.bugs={setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)},m.isEmptyObject=function(a){for(var b in a)return!1;return!0},m.cloneObject=function(a){var b,c;return a?(b=k.stringify(a),c=k.parse(b)):c={},c},m.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;return a+="/",a},m.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/"),c},m.getBaseUrl=function(){var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();return a},m.getPageUrl=function(){var a=m.getState(!1,!1),b=(a||{}).url||d.location.href,c;return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"}),c},m.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},m.getFullUrl=function(a,b){var c=a,d=a.substring(0,1);return b=typeof b=="undefined"?!0:b,/[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),c.replace(/\#$/,"")},m.getShortUrl=function(a){var b=a,c=m.getBaseUrl(),d=m.getRootUrl();return m.emulated.pushState&&(b=b.replace(c,"")),b=b.replace(d,"/"),m.isTraditionalAnchor(b)&&(b="./"+b),b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),b},m.store={},m.idToState=m.idToState||{},m.stateToId=m.stateToId||{},m.urlToId=m.urlToId||{},m.storedStates=m.storedStates||[],m.savedStates=m.savedStates||[],m.normalizeStore=function(){m.store.idToState=m.store.idToState||{},m.store.urlToId=m.store.urlToId||{},m.store.stateToId=m.store.stateToId||{}},m.getState=function(a,b){typeof a=="undefined"&&(a=!0),typeof b=="undefined"&&(b=!0);var c=m.getLastSavedState();return!c&&b&&(c=m.createStateObject()),a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),c},m.getIdByState=function(a){var b=m.extractId(a.url),c;if(!b){c=m.getStateString(a);if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];else if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];else{for(;;){b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")break}m.stateToId[c]=b,m.idToState[b]=a}}return b},m.normalizeState=function(a){var b,c;if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};b={},b.normalized=!0,b.title=a.title||"",b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),b.hash=m.getShortUrl(b.url),b.data=m.cloneObject(a.data),b.id=m.getIdByState(b),b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),b.url=b.cleanUrl,c=!m.isEmptyObject(b.data);if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;return b.hashedUrl=m.getFullUrl(b.hash),(m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),b},m.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};return d=m.normalizeState(d),d},m.getStateById=function(a){a=String(a);var c=m.idToState[a]||m.store.idToState[a]||b;return c},m.getStateString=function(a){var b,c,d;return b=m.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=k.stringify(c),d},m.getStateId=function(a){var b,c;return b=m.normalizeState(a),c=b.id,c},m.getHashByState=function(a){var b,c;return b=m.normalizeState(a),c=b.hash,c},m.extractId=function(a){var b,c,d;return c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"",b||!1},m.isTraditionalAnchor=function(a){var b=!/[\/\?\.]/.test(a);return b},m.extractState=function(a,b){var c=null,d,e;return b=b||!1,d=m.extractId(a),d&&(c=m.getStateById(d)),c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),c},m.getIdByUrl=function(a){var c=m.urlToId[a]||m.store.urlToId[a]||b;return c},m.getLastSavedState=function(){return m.savedStates[m.savedStates.length-1]||b},m.getLastStoredState=function(){return m.storedStates[m.storedStates.length-1]||b},m.hasUrlDuplicate=function(a){var b=!1,c;return c=m.extractState(a.url),b=c&&c.id!==a.id,b},m.storeState=function(a){return m.urlToId[a.url]=a.id,m.storedStates.push(m.cloneObject(a)),a},m.isLastSavedState=function(a){var b=!1,c,d,e;return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),b},m.saveState=function(a){return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)},m.getStateByIndex=function(a){var b=null;return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],b},m.getHash=function(){var a=m.unescapeHash(d.location.hash);return a},m.unescapeString=function(b){var c=b,d;for(;;){d=a.unescape(c);if(d===c)break;c=d}return c},m.unescapeHash=function(a){var b=m.normalizeHash(a);return b=m.unescapeString(b),b},m.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},m.setHash=function(a,b){var c,e,f;return b!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.setHash,args:arguments,queue:b}),!1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)},m.escapeHash=function(b){var c=m.normalizeHash(b);return c=a.escape(c),m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),c},m.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return b=m.unescapeHash(b),b},m.setTitle=function(a){var b=a.title,c;b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return d.title=b,m},m.queues=[],m.busy=function(a){typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);if(!m.busy.flag){h(m.busy.timeout);var b=function(){var a,c,d;if(m.busy.flag)return;for(a=m.queues.length-1;a>=0;--a){c=m.queues[a];if(c.length===0)continue;d=c.shift(),m.fireQueueItem(d),m.busy.timeout=g(b,m.options.busyDelay)}};m.busy.timeout=g(b,m.options.busyDelay)}return m.busy.flag},m.busy.flag=!1,m.fireQueueItem=function(a){return a.callback.apply(a.scope||m,a.args||[])},m.pushQueue=function(a){return m.queues[a.queue||0]=m.queues[a.queue||0]||[],m.queues[a.queue||0].push(a),m},m.queue=function(a,b){return typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),m.busy()?m.pushQueue(a):m.fireQueueItem(a),m},m.clearQueue=function(){return m.busy.flag=!1,m.queues=[],m},m.stateChanged=!1,m.doubleChecker=!1,m.doubleCheckComplete=function(){return m.stateChanged=!0,m.doubleCheckClear(),m},m.doubleCheckClear=function(){return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),m},m.doubleCheck=function(a){return m.stateChanged=!1,m.doubleCheckClear(),m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){return m.doubleCheckClear(),m.stateChanged||a(),!0},m.options.doubleCheckInterval)),m},m.safariStatePoll=function(){var b=m.extractState(d.location.href),c;if(!m.isLastSavedState(b))c=b;else return;return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),m},m.back=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.back,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.back(!1)}),n.go(-1),!0)},m.forward=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.forward,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.forward(!1)}),n.go(1),!0)},m.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)m.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)m.back(b)}return m};if(m.emulated.pushState){var o=function(){};m.pushState=m.pushState||o,m.replaceState=m.replaceState||o}else m.onPopState=function(b,c){var e=!1,f=!1,g,h;return m.doubleCheckComplete(),g=m.getHash(),g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))},m.Adapter.bind(a,"popstate",m.onPopState),m.pushState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.pushState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0},m.replaceState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.replaceState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0};if(f){try{m.store=k.parse(f.getItem("History.store"))||{}}catch(p){m.store={}}m.normalizeStore()}else m.store={},m.normalizeStore();m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),m.Adapter.bind(a,"unload",m.clearAllIntervals),m.saveState(m.storeState(m.extractState(d.location.href,!0))),f&&(m.onUnload=function(){var a,b;try{a=k.parse(f.getItem("History.store"))||{}}catch(c){a={}}a.idToState=a.idToState||{},a.urlToId=a.urlToId||{},a.stateToId=a.stateToId||{};for(b in m.idToState){if(!m.idToState.hasOwnProperty(b))continue;a.idToState[b]=m.idToState[b]}for(b in m.urlToId){if(!m.urlToId.hasOwnProperty(b))continue;a.urlToId[b]=m.urlToId[b]}for(b in m.stateToId){if(!m.stateToId.hasOwnProperty(b))continue;a.stateToId[b]=m.stateToId[b]}m.store=a,m.normalizeStore(),f.setItem("History.store",k.stringify(a))},m.intervalList.push(i(m.onUnload,m.options.storeInterval)),m.Adapter.bind(a,"beforeunload",m.onUnload),m.Adapter.bind(a,"unload",m.onUnload));if(!m.emulated.pushState){m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){m.Adapter.trigger(a,"popstate")}),m.getHash()&&m.Adapter.onDomLoad(function(){m.Adapter.trigger(a,"hashchange")})}},m.init()}(window)

/**
 * attention - this function needs to be retired
 * as it cannot accurately give url to the media file
 */
var mediaUrl = function (resource) {
    return askbot.settings.static_url + 'default' + '/' + resource;
};

var getCookie = function (name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
    }
    return cookieValue;
};

var csrfSafeMethod = function(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};

var sameOrigin = function(url) {
    var host = document.location.host;
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    return (
        (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        !(/^(\/\/|http:|https:).*/.test(url))

    );
};

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            var csrfCookieName = askbot['settings']['csrfCookieName'];
            xhr.setRequestHeader("X-CSRFToken", getCookie(csrfCookieName));
        }
    }
});


/**
 * Selects template by class
 * template selector must be a simple class selector
 * e.g. .comment
 */
var getTemplate = function (templateSelector) {
    var templates = $('.js-templates');
    return templates.find(templateSelector).clone(false);
};

var cleanUrl = function (url) {
    var re = new RegExp('//', 'g');
    return url.replace(re, '/');
};

var copyAltToTitle = function (sel) {
    sel.attr('title', sel.attr('alt'));
};

/**
 * @returns jQuery with same content and classes,
 * but different tag name (DOM node name)
 */
var setHtmlTag = function (fromElement, toTagName) {
    if (fromElement.attr('tagName') === toTagName.toUpperCase()) {
        return fromElement;
    }
    var newElement = $('<' + toTagName + '></' + toTagName + '>');
    //copy classes
    newElement.attr('class', fromElement.attr('class'));
    //move contents
    fromElement.children().detach().appendTo(newElement);
    //@todo: maybe copy event handlers
    //if element is in dom, insert new element and detach old element
    if ($(document).find(fromElement)) {
        fromElement.after(newElement);
        fromElement.remove();
    }
    return newElement;
};

var animateHashes = function () {
    var id_value = window.location.hash;
    if (id_value !== '') {
        var previous_color = $(id_value).css('background-color');
        $(id_value).css('backgroundColor', '#FFF8C6');
        $(id_value)
            .animate({backgroundColor: '#ff7f2a'}, 500)
            .animate({backgroundColor: '#FFF8C6'}, 500, function () {
                $(id_value).css('backgroundColor', previous_color);
            });
    }
};

var addExtraCssClasses = function (element, setting) {
    if (askbot.css && askbot.css[setting]) {
        element.addClass(askbot.css[setting]);
    }
};

/**
 * @param {string} id_token - any token
 * @param {string} unique_seed - the unique part
 * @returns {string} unique id that can be used in DOM
 */
var askbotMakeId = function (id_token, unique_seed) {
    return id_token + '-' + unique_seed;
};

var getNewUniqueInt = function () {
    var num = askbot.data.uniqueInt || 0;
    num = num + 1;
    askbot.data.uniqueInt = num;
    return num;
};

/**
 * generic tag cleaning function, settings
 * are from askbot live settings and askbot.const
 */
var cleanTag = function (tag_name, settings) {
    var tag_regex = new RegExp(settings.tag_regex);
    if (tag_regex.test(tag_name) === false) {
        var firstChar = tag_name.substring(0, 1);
        if (settings.tag_forbidden_first_chars.indexOf(firstChar) > -1) {
            throw settings.messages.wrong_first_char;
        } else {
            throw settings.messages.wrong_chars;
        }
    }

    var max_length = settings.max_tag_length;
    if (tag_name.length > max_length) {
        throw interpolate(
            ngettext(
                'must be shorter than %(max_chars)s character',
                'must be shorter than %(max_chars)s characters',
                max_length
            ),
            {'max_chars': max_length },
            true
        );
    }
    if (settings.force_lowercase_tags) {
        return tag_name.toLowerCase();
    } else {
        return tag_name;
    }
};


var getSingletonController = function (ControllerClass, name) {
    askbot.controllers = askbot.controllers || {};
    var controller = askbot.controllers[name];
    if (controller === undefined) {
        controller = new ControllerClass();
        askbot.controllers[name] = controller;
    }
    return controller;
};

var setController = function (controller, name) {
    askbot.controllers = askbot.controllers || {};
    askbot.controllers[name] = controller;
};

var sortChildNodes = function (node, cmpFunc) {
    var items = node.children().sort(cmpFunc);
    node.append(items);
};

var getUniqueValues = function (values) {
    var uniques = {};
    var out = [];
    $.each(values, function (idx, value) {
        if (!(value in uniques)) {
            uniques[value] = 1;
            out.push(value);
        }
    });
    return out;
};

var getUniqueWords = function (value) {
    var words = $.trim(value).split(/\s+/);
    return getUniqueValues(words);
};

/**
 * comma-joins items and uses "and'
 * between the last and penultimate items
 * @param {Array<string>} values
 * @return {string}
 */
var joinAsPhrase = function (values) {
    var count = values.length;
    if (count === 0) {
        return '';
    } else if (count === 1) {
        return values[0];
    } else {
        var last = values.pop();
        var prev = values.pop();
        return values.join(', ') + prev + ' ' + gettext('and') + ' ' + last;
    }
};

/**
 * @return {boolean}
 */
var inArray = function (item, itemsList) {
    for (var i = 0; i < itemsList.length; i++) {
        if (item === itemsList[i]) {
            return true;
        }
    }
    return false;
};

var showMessage = function (element, msg, where) {
    var div = $('<div class="vote-notification"><h3>' + msg + '</h3>(' +
    gettext('click to close') + ')</div>');
    where = where || 'parent';

    div.click(function (event) {
        if (event.target.nodeName === 'A') {
            return true;
        }
        $('.vote-notification').fadeOut('fast', function () { $(this).remove(); });
        return false;
    });

    if (where === 'parent') {
        element.parent().append(div);
    } else {
        element.after(div);
    }

    div.fadeIn('fast');
};

//outer html hack - https://github.com/brandonaaron/jquery-outerhtml/
(function ($) {
    var div;
    $.fn.outerHTML = function () {
        var elem = this[0],
        tmp;
        return !elem ? null
        : typeof (tmp = elem.outerHTML) === 'string' ? tmp
        : (div = div || $('<div/>')).html(this.eq(0).clone()).html();
    };
})(jQuery);

/**
 * @return {number} key code of the event or `undefined`
 */
var getKeyCode = function (e) {
    if (e.which) {
        return e.which;
    } else if (e.keyCode) {
        return e.keyCode;
    }
    return undefined;
};

var makeKeyHandler = function (key, callback) {
    return function (e) {
        if ((e.which && e.which === key) || (e.keyCode && e.keyCode === key)) {
            if (!e.shiftKey) {
                callback(e);
                return false;
            }
        }
    };
};


var setupButtonEventHandlers = function (button, callback) {
    button.keydown(makeKeyHandler(13, callback));
    button.click(callback);
};

var removeButtonEventHandlers = function (button) {
    button.unbind('click');
    button.unbind('keydown');
};

var decodeHtml = function (encodedText) {
    return $('<div/>').html(encodedText).text();
};

var putCursorAtEnd = function (element) {
    var el = $(element).get()[0];
    var jEl = $(el);
    if (el.setSelectionRange) {
        var len = jEl.val().length * 2;
        el.setSelectionRange(len, len);
    } else {
        jEl.val(jEl.val());
    }
    jEl.scrollTop(999999);
};

var setCheckBoxesIn = function (selector, value) {
    return $(selector + '> input[type=checkbox]').attr('checked', value);
};

/*
 * Old style notify handler
 */
var notify = (function () {
    var visible = false;
    return {
        show: function (html, autohide) {
            if (html) {
                $('body').addClass('user-messages');
                var par = $('<p class="notification"></p>');
                par.html(html);
                $('.notify').prepend(par);
            }
            $('.notify').fadeIn('slow');
            visible = true;
            if (autohide) {
                setTimeout(
                    function () {
                        notify.close(false);
                        notify.clear();
                    },
                    3000
                );
            }
        },
        clear: function () {
            $('.notify').empty();
        },
        close: function (doPostback) {
            if (doPostback) {
                $.post(
                    askbot.urls.mark_read_message,
                    { formdata: 'required' }
                );
            }
            $('.notify').fadeOut('fast');
            $('body').removeClass('user-messages');
            visible = false;
        },
        isVisible: function () { return visible; }
    };
})();

/* **************************************************** */

/* some google closure-like code for the ui elements */
var inherits = function (ChildCtor, ParentCtor) {
    /** @constructor taken from google closure */
    function TempCtor() {}

    TempCtor.prototype = ParentCtor.prototype;
    ChildCtor.superClass_ = ParentCtor.prototype;
    ChildCtor.prototype = new TempCtor();
    ChildCtor.prototype.constructor = ChildCtor;
};

var getSuperClass = function (cls) {
    return cls.superClass_;
};


/* **************************************************** */
// Search query-string manipulation utils
/* **************************************************** */

var QSutils = QSutils || {};  // TODO: unit-test me

QSutils.TAG_SEP = ','; // should match const.TAG_SEP; TODO: maybe prepopulate this in javascript.html ?

QSutils.DEFAULT_QUERY_STRING = 'scope:all/sort:activity-desc/page:1/';

QSutils.get_query_string_selector_value = function (query_string, selector) {
    var params = query_string.split('/');
    for (var i = 0; i < params.length; i++) {
        var param_split = params[i].split(':');
        if (param_split[0] === selector) {
            return param_split[1];
        }
    }
    return undefined;
};

QSutils.patch_query_string = function (query_string, patch, remove) {
    var params = query_string.split('/');
    var patch_split = patch.split(':');

    var new_query_string = '';
    var mapping = {};

    if (!remove) {
        // prepopulate the patched selector if it's not meant to be removed
        mapping[patch_split[0]] = patch_split[1];
    }

    for (var i = 0; i < params.length; i++) {
        var param_split = params[i].split(':');
        if (param_split[0] !== patch_split[0] && param_split[1]) {
            mapping[param_split[0]] = param_split[1];
        }
    }

    var add_selector = function (name) {
        if (name in mapping) {
            new_query_string += name + ':' + mapping[name] + '/';
        }
    };

    /* The order of selectors should match the Django URL */
    add_selector('scope');
    add_selector('sort');
    add_selector('tags');
    add_selector('author');
    add_selector('page');
    add_selector('page-size');
    add_selector('query');

    return new_query_string;
};

QSutils.remove_search_tag = function (query_string, tag) {
    var tag_string = this.get_query_string_selector_value(query_string, 'tags');
    if (!tag_string) {
        return query_string;
    }

    var tags = tag_string.split(this.TAG_SEP);

    var pos = $.inArray(encodeURIComponent(tag), tags);
    if (pos > -1) {
        tags.splice(pos, 1); /* array.splice() works in-place */
    }

    if (tags.length === 0) {
        return this.patch_query_string(query_string, 'tags:', true);
    } else {
        return this.patch_query_string(query_string, 'tags:' + tags.join(this.TAG_SEP));
    }
};

QSutils.add_search_tag = function (query_string, tag) {
    var tag_string = this.get_query_string_selector_value(query_string, 'tags');
    tag = encodeURIComponent(tag);
    if (!tag_string) {
        tag_string = tag;
    } else {
        tag_string = [tag_string, tag].join(this.TAG_SEP);
    }

    return this.patch_query_string(query_string, 'tags:' + tag_string);
};

/** wrapper around jQuery object
 * @constructor
 * the top level "class" for other elements
 * I.e. all other things must inherit this class.
 * For an example of the inheritance pattern,
 * please see the "TippedInput" below.
 */
var WrappedElement = function () {
    this._element = null;
    this._in_document = false;
    this._idSeed = null;
};
/* note that we do not call inherits() here
 * See TippedInput as an example of a subclass
 */

/**
 * returns a unique integer for any instance of WrappedElement
 * which can be used to construct a unique id for use in the DOM
 * @return {string}
 */
WrappedElement.prototype.getIdSeed = function () {
    var seed = this._idSeed || parseInt(getNewUniqueInt());
    this._idSeed = seed;
    return seed;
};

/**
 * returns unique ide based on the prefix and the id seed
 * @param {string} prefix
 * @return {string}
 */
WrappedElement.prototype.makeId = function (prefix) {
    return askbotMakeId(prefix, this.getIdSeed());
};

/**
 * notice that we use ObjCls.prototype.someMethod = function ()
 * notation - as we use Javascript's prototypal inheritance
 * explicitly. The point of this is to be able to eventually
 * use the Closure Compiler
 */
WrappedElement.prototype.setElement = function (element) {
    this._element = element;
};

/**
 * this function must be overridden for any object
 * what will use "DOM generation" pattern
 *
 * Inside this function two things can happen:
 * 1) dom structure creation
 * 2) event handlers attached to the dom structure
 */
WrappedElement.prototype.createDom = function () {
    /* inside at the very least you must assign
     * a jQuery object to a parameter called _element
     */
    this._element = $('<div></div>');
};

/**
 * @param {object} element, a jQuery object wrapping a single
 * DOM element.
 *
 * This function must be overridden in the subclasses
 * that are used in the "decoration" pattern
 */
WrappedElement.prototype.decorate = function (element) {
    this._element = element;
};

/**
 * This method should not be overridden
 * Normally you call this method to generate the dom
 * structure, if applicable, or just obtain the
 * jQuery object encapsulating the dom.
 *
 * @return {object} jQuery
 */
WrappedElement.prototype.getElement = function () {
    if (this._element === null) {
        this.createDom();
    }
    return this._element;
};

WrappedElement.prototype.hasElement = function () {
    return (this._element !== undefined);
};
WrappedElement.prototype.inDocument = function () {
    return (this._element && this._element.is(':hidden') === false);
};
WrappedElement.prototype.enterDocument = function () {
    this._in_document = true;
    return this._in_document;
};
WrappedElement.prototype.hasElement = function () {
    return (this._element !== null);
};
/**
 * A utility method, returning a new jQuery object for
 * some HTML tag
 *
 * Example:
 * var ageInput = this.makeElement('input');
 */
WrappedElement.prototype.makeElement = function (html_tag) {
    //makes jQuery element with tags
    return $('<' + html_tag + '></' + html_tag + '>');
};
/**
 * Removes object's DOM element from the DOM tree
 * should be overridden to remove the event handlers
 * and properly destroy the dom structure
 * as well as any other included sub-elements
 */
WrappedElement.prototype.dispose = function () {
    if (this._element) {
        this._element.remove();
    }
    this._in_document = false;
};

/**
 * @constructor
 * a loader
 */
var WaitIcon = function () {
    WrappedElement.call(this);
    this._isVisible = false;
};
inherits(WaitIcon, WrappedElement);

WaitIcon.prototype.setVisible = function (isVisible) {
    this._isVisible = isVisible;
    if (this._element) {
        if (this._isVisible === true) {
            this._element.show();
        } else {
            this._element.hide();
        }
    }
};

WaitIcon.prototype.hide = function () {
    this.setVisible(false);
};

WaitIcon.prototype.show = function () {
    this.setVisible(true);
};

WaitIcon.prototype.createDom = function () {
    var box = this.makeElement('div');
    box.addClass('wait-icon-box');
    this._element = box;
    var img = this.makeElement('img');
    img.attr('src', mediaUrl('media/images/ajax-loader.gif'));
    box.append(img);
    this.setVisible(this._isVisible);
};

var Paginator = function () {
    WrappedElement.call(this);
};
inherits(Paginator, WrappedElement);

/**
 * A mandotory method.
 * this method needs to be implemented by the subclass
 * @interface
 * @param data is json dict returted by the server
 */
Paginator.prototype.renderPage = function (data) {
    throw 'implement me in the subclass';
};

/**
 * A mandatory method.
 * @interface - implement in subclass
 * returns url that can be used to retrieve page data
 */
Paginator.prototype.getPageDataUrl = function (pageNo) {
    throw 'implement me in the subclass';
};

/**
 * Optional method
 * @interface - implement in subclass
 * returns url parameters for the page request
 */
Paginator.prototype.getPageDataUrlParams = function (pageNo) {};

Paginator.prototype.setIsLoading = function (isLoading) {
    this._isLoading = isLoading;
};

Paginator.prototype.startLoadingPageData = function (pageNo) {
    if (this._isLoading) {
        return;
    }
    var me = this;
    var requestParams = {
        type: 'GET',
        dataType: 'json',
        url: this.getPageDataUrl(pageNo),
        cache: false,
        success: function (data) {
            me.renderPage(data);
            me.setCurrentPage(pageNo);
            me.setIsLoading(false);
        },
        failure: function () {
            me.setIsLoading(false);
        }
    };
    var urlParams = this.getPageDataUrlParams(pageNo);
    if (urlParams) {
        requestParams.data = urlParams;
    }
    $.ajax(requestParams);
    me.setIsLoading(true);
    return false;
};

Paginator.prototype.getCurrentPageNo = function () {
    var page = this._element.find('.curr');
    return parseInt(page.attr('data-page'));
};

Paginator.prototype.getIncrementalPageHandler = function (direction) {
    var me = this;
    return function () {
        var pageNo = me.getCurrentPageNo();
        if (direction === 'next') {
            pageNo = pageNo + 1;
        } else {
            pageNo = pageNo - 1;
        }
        me.startLoadingPageData(pageNo);
        return false;
    };
};

Paginator.prototype.getWindowStart = function (pageNo) {
    var totalPages = this._numPages;
    var activePages = this._numActivePages;

    //paginator is "short" w/o prev or next, no need to rerender
    if (totalPages === activePages) {
        return 1;
    }

    //we are in leading range
    if (pageNo < activePages) {
        return 1;
    }

    //we are in trailing range
    var lastWindowStart = totalPages - activePages + 1;
    if (pageNo > lastWindowStart) {
        return lastWindowStart;
    }

    return pageNo - Math.floor(activePages / 2);
};

Paginator.prototype.renderPaginatorWindow = function (windowStart) {
    var anchors = this._paginatorAnchors;
    for (var i = 0; i < anchors.length; i++) {
        var anchor = $(anchors[i]);
        removeButtonEventHandlers(anchor);
        var pageNo = windowStart + i;
        //re-render displayed number
        anchor.html(pageNo);
        //re-render the tooltip text
        var labelTpl = gettext('page %s');
        anchor.attr('title', interpolate(labelTpl, [pageNo]));
        //re-render the "page" data value
        anchor.parent().attr('data-page', pageNo);
        //setup new event handler
        var pageHandler = this.getPageButtonHandler(pageNo);
        setupButtonEventHandlers(anchor, pageHandler);
    }
};

Paginator.prototype.renderPaginatorEdges = function (windowStart, pageNo) {
    //first page button
    var first = this._firstPageNav;
    if (windowStart === 1) {
        first.hide();
    } else {
        first.show();
    }

    //last page button
    var lastWindowStart = this._numPages - this._numActivePages + 1;
    var last = this._lastPageNav;
    if (windowStart === lastWindowStart) {
        last.hide();
    } else {
        last.show();
    }

    //show or hide "prev" and "next" buttons
    if (this._numPages === this._numActivePages) {
        this._prevPageButton.hide();
        this._nextPageButton.hide();
    } else {
        if (pageNo === 1) {
            this._prevPageButton.hide();
        } else {
            this._prevPageButton.show();
        }
        if (pageNo === this._numPages) {
            this._nextPageButton.hide();
        } else {
            this._nextPageButton.show();
        }
    }
};

Paginator.prototype.setCurrentPage = function (pageNo) {

    var currPageNo = this.getCurrentPageNo();
    var currWindow = this.getWindowStart(currPageNo);
    var newWindow = this.getWindowStart(pageNo);
    if (newWindow !== currWindow) {
        this.renderPaginatorWindow(newWindow);
    }

    //select the current page
    var page = this._mainPagesNav.find('[data-page="' + pageNo + '"]');
    if (page.length === 1) {
        var curr = this._element.find('.curr');
        curr.removeClass('curr');
        page.addClass('curr');
    }

    //show or hide ellipses (...) and the last/first page buttons
    //newWindow is starting page of the new paginator window
    this.renderPaginatorEdges(newWindow, pageNo);
};

Paginator.prototype.createButton = function (cls, label) {
    var btn = this.makeElement('span');
    btn.addClass(cls);
    var link = this.makeElement('a');
    link.html(label);
    btn.append(link);
    return btn;
};

Paginator.prototype.getPageButtonHandler = function (pageNo) {
    var me = this;
    return function () {
        if (me.getCurrentPageNo() !== pageNo) {
            me.startLoadingPageData(pageNo);
        }
        return false;
    };
};

Paginator.prototype.decorate = function (element) {
    this._element = element;
    var pages = element.find('.page');
    this._firstPageNav = element.find('.first-page-nav');
    this._lastPageNav = element.find('.last-page-nav');
    this._mainPagesNav = element.find('.main-pages-nav');
    var paginatorButtons = element.find('.paginator');
    this._numPages = paginatorButtons.data('numPages');

    var mainNavButtons = element.find('.main-pages-nav a');
    this._paginatorAnchors =  mainNavButtons;
    this._numActivePages = mainNavButtons.length;

    for (var i = 0; i < pages.length; i++) {
        var page = $(pages[i]);
        var pageNo = page.data('page');
        var link = page.find('a');
        var pageHandler = this.getPageButtonHandler(pageNo);
        setupButtonEventHandlers(link, pageHandler);
    }

    var currPageNo = element.find('.curr').data('page');

    //next page button
    var nextPage = element.find('.next');
    this._nextPageButton = nextPage;
    if (currPageNo === this._numPages) {
        this._nextPageButton.hide();
    }

    setupButtonEventHandlers(
        this._nextPageButton,
        this.getIncrementalPageHandler('next')
    );

    var prevPage = element.find('.prev');
    this._prevPageButton = prevPage;
    if (currPageNo === 1) {
        this._prevPageButton.hide();
    }

    setupButtonEventHandlers(
        this._prevPageButton,
        this.getIncrementalPageHandler('prev')
    );
};

/**
 * makes images never take more spaces then they can take
 * @param {<Array>} breakPoints
 * @param {number} maxWidth
 * an array of array values like (min-width, width-offset)
 * where min-width is screen minimum width
 * width-offset - difference between the actual screen width and
 * max-width of the image.
 * width-offset may be undefined - this way we know that this is
 * the widest breakpoint and we apply the default max-width
 * instead.
 * We use this offset to calculate max-width in order to
 * have the images fit the layout no matter the size of the image
 */
var LimitedWidthImage = function (breakPoints, maxWidth) {
    /**
     * breakPoints must be sorted in decreasing
     * order of min-width
     */
    this._breakPoints = breakPoints;
    /**
     * this is width for the fully stretched
     * window, above the first widest breakpoint
     */
    this._maxWidth = maxWidth;
    WrappedElement.call(this);
};
inherits(LimitedWidthImage, WrappedElement);

LimitedWidthImage.prototype.getImageWidthOffset = function (width) {
    var numBreaks = this._breakPoints.length;
    var offset = this._breakPoints[0][1];
    for (var i = 0; i < numBreaks; i++) {
        var point = this._breakPoints[i];
        var minWidth = point[0];
        if (width >= minWidth) {
            break;
        } else {
            offset = point[1];
        }
    }
    return offset;
};

LimitedWidthImage.prototype.autoResize = function () {
    var windowWidth = $(window).width();
    //1) find the offset for the nearest breakpoint
    var widthOffset = this.getImageWidthOffset(windowWidth);
    var maxWidth = '100%';
    if (widthOffset !== undefined) {
        maxWidth = windowWidth - widthOffset;
    } else {
        maxWidth = this._maxWidth;
    }
    this._element.css('max-width', maxWidth);
    this._element.css('height', 'auto');
};

LimitedWidthImage.prototype.decorate = function (element) {
    this._element = element;
    this.autoResize();
    var me = this;
    $(window).resize(function () { me.autoResize(); });
};

/**
 * @contsructor
 * a form helper that disables submit button
 * after it is submitted the first time
 * to prevent double submits
 */
var OneShotForm = function () {
    WrappedElement.call(this);
    this._submitBtn = undefined;
};
inherits(OneShotForm, WrappedElement);

OneShotForm.prototype.setSubmitButton = function (button) {
    this._submitBtn = button;
};

OneShotForm.prototype.enable = function () {
    this._element.data('submitted', false);
    this._submitBtn.removeClass('disabled');
};

OneShotForm.prototype.disable = function () {
    this._element.data('submitted', true);
    this._submitBtn.addClass('disabled');
};

OneShotForm.prototype.decorate = function (element) {
    this._element = element;
    var me = this;
    var button = this._submitBtn;
    var disabler = function (evt) {
        if (element.data('submitted') === true) {
            evt.preventDefault();
        } else {
            me.disable();
            return true;
        }
    };
    element.submit(disabler);
};

/**
 * @constructor
 * a simple link
 */
var Link = function () {
    WrappedElement.call(this);
};
inherits(Link, WrappedElement);

Link.prototype.setUrl = function (url) {
    this._url = url;
};

Link.prototype.setText = function (text) {
    this._text = text;
};

Link.prototype.createDom = function () {
    var link = this.makeElement('a');
    this._element = link;
    link.attr('href', this._url);
    link.html(this._text);
};

/**
 * @constructor
 * Widget is a Wrapped element with state
 */
var Widget = function () {
    WrappedElement.call(this);
    this._state = undefined;
};
inherits(Widget, WrappedElement);

Widget.prototype.setState = function (state) {
    this._state = state;
};

Widget.prototype.getState = function () {
    return this._state;
};

Widget.prototype.makeButton = function (label, handler) {
    var button = this.makeElement('button');
    button.html(label);
    setupButtonEventHandlers(button, handler);
    return button;
};

/**
 * Can be used for an input box or textarea.
 * The original value will be treated as an instruction.
 * When user focuses on the field, the tip will be gone,
 * when the user escapes without typing anything besides
 * perhaps empty text, the instruction is restored.
 * When instruction is shown, class "blank" is present
 * in the input/textare element.
 *
 * For the usage examples - search for "new TippedInput"
 * there is at least one example for both - decoration and
 * the "dom creation" patterns.
 *
 * Also - in the FileUploadDialog the TippedInput is used
 * as a sub-element - the widget composition use case.
 */
var TippedInput = function () {
    /* the call below is part 1 of the inheritance pattern */
    WrappedElement.call(this);
    this._instruction = null;
    this._attrs = {};
    //this._is_one_shot = false;//if true on starting typing effect is gone
};
inherits(TippedInput, WrappedElement);
/* the line above is part 2 of the inheritance pattern
 see definition of the function "inherits" for more details
*/

/* Below are all the custom methods of the
  TippedInput class, as well as some required functions
*/

TippedInput.prototype.reset = function () {
    $(this._element).val(this._instruction);
    $(this._element).addClass('blank');
};

/*TippedInput.prototype.setIsOneShot = function (boolValue) {
    this._is_one_shot = boolValue;
};*/

TippedInput.prototype.setInstruction = function (text) {
    this._instruction = text;
};

TippedInput.prototype.setAttr = function (key, value) {
    this._attrs[key] = value;
};

TippedInput.prototype.isBlank = function () {
    return this.getVal() === this._instruction;
};

TippedInput.prototype.getVal = function () {
    return this._element.val();
};

TippedInput.prototype.setVal = function (value) {
    if (value) {
        this._element.val(value);
        if (this.isBlank()) {
            this._element.addClass('blank');
        } else {
            this._element.removeClass('blank');
        }
    }
};
/**
 * Creates the DOM of tipped input from scratch
 * Notice that there is also a "decorate" method.
 * At least one - createDom or decorate is required,
 * depending on the usage.
 */
TippedInput.prototype.createDom = function () {
    this._element = this.makeElement('input');
    var element = this._element;
    element.val(this._instruction);

    //here we re-use the decorate call (next method)
    //to avoid copy-pasting code
    this.decorate(element);
};

/**
 * Attaches the TippedInput behavior to
 * a pre-existing <input> element
 *
 * decorate() method normally does not create
 * new dom elements, but it might add some missing elements,
 * if necessary.
 *
 * for example the decorate might be composing inside
 * a more complex widget, in which case other elements
 * can be added via a "composition" pattern, or
 * just "naked dom elements" added to the current widget's element
 *
 */
TippedInput.prototype.decorate = function (element) {
    this._element = element;//mandatory line

    //part 1 - initialize some values and create dom
    element.attr(this._attrs);

    var instruction_text = this.getVal();
    this._instruction = instruction_text;
    this.reset();
    var me = this;

    //part 2 - attach event handlers
    $(element).focus(function () {
        if (me.isBlank()) {
            $(element)
                .val('')
                .removeClass('blank');
        }
    });
    $(element).blur(function () {
        var val = $(element).val();
        if ($.trim(val) === '') {
            $(element)
                .val(instruction_text)
                .addClass('blank');
        }
    });
    $(element).keydown(
        makeKeyHandler(27, function () {
            $(element).blur();
        })
    );
};

/**
 * creates an alert that will momentarily flash
 * and then self-destruct
 */
var FlashAlert = function (text) {
    WrappedElement.call(this);
    this._text = text;
};
inherits(FlashAlert, WrappedElement);

FlashAlert.prototype.setPostRunHandler = function (handler) {
    this._postRunHandler = handler;
};

FlashAlert.prototype.setText = function (text) {
    this._text = text;
    if (this.hasElement()) {
        this._element.html(text);
    }
};

FlashAlert.prototype.run = function () {
    var element = this._element;
    var me = this;
    var postRunHandler = this._postRunHandler;
    var finish = function () {
        element.fadeOut();
        me.dispose();
        if (postRunHandler) {
            postRunHandler();
        }
    };
    element.fadeIn(function () { setTimeout(finish, 1000); });
};

FlashAlert.prototype.createDom = function () {
    var element = this.makeElement('div');
    element.addClass('flash-alert');
    element.hide();
    this._element = element;
    if (this._text) {
        element.html(this._text);
    }
};

/**
 * will setup a bootstrap.js alert
 * programmatically
 */
var AlertBox = function () {
    WrappedElement.call(this);
    this._text = null;
};
inherits(AlertBox, WrappedElement);

AlertBox.prototype.setClass = function (classes) {
    this._classes = classes;
    if (this._element) {
        this._element.addClass(classes);
    }
};

AlertBox.prototype.setError = function (state) {
    this._is_error = state;
    if (this._element) {
        if (state === true) {
            this._element.addClass('alert-error');
        } else {
            this._element.removeClass('alert-error');
        }
    }
};

AlertBox.prototype.setText = function (text) {
    this._text = text;
    if (this._content) {
        this._content.html(text);
    }
};

AlertBox.prototype.getContent = function () {
    if (this._content) {
        return this._content;
    } else {
        this._content = this.makeElement('div');
        return this._content;
    }
};

AlertBox.prototype.setContent = function (content) {
    var container = this.getContent();
    container.empty();
    container.append(content);
};

AlertBox.prototype.addContent = function (content) {
    var container = this.getContent();
    container.append(content);
};

AlertBox.prototype.createDom = function () {
    this._element = this.makeElement('div');
    this._element.addClass('alert fade in');

    if (this._is_error) {
        this.setError(this._is_error);
    }

    if (this._classes) {
        this._element.addClass(this._classes);
    }

    this._cancel_button = this.makeElement('button');
    this._cancel_button
        .addClass('close')
        .attr('data-dismiss', 'alert')
        .html('&times;');
    this._element.append(this._cancel_button);

    this._element.append(this.getContent());
    if (this._text) {
        this.setText(this._text);
    }

    this._element.alert();//bootstrap.js alert
};

/**
 * @constructor
 * just a span with content
 * useful for subclassing
 */
var SimpleContent = function () {
    WrappedElement.call(this);
    this._content = '';
};
inherits(SimpleContent, WrappedElement);

SimpleContent.prototype.setContent = function (text) {
    this._content = text;
    if (this._element) {
        this._element.html(text);
    }
};

SimpleContent.prototype.getContent = function () {
    return this._content;
};

SimpleContent.prototype.createDom = function () {
    this._element = this.makeElement('span');
    this._element.html(this._content);
};

var SimpleControl = function () {
    WrappedElement.call(this);
    this._handler = null;
    this._title = null;
};
inherits(SimpleControl, WrappedElement);

SimpleControl.prototype.setHandler = function (handler) {
    this._handler = handler;
    if (this.hasElement()) {
        this.setHandlerInternal();
    }
};

SimpleControl.prototype.getHandler = function () {
    return this._handler;
};

SimpleControl.prototype.setHandlerInternal = function () {
    //default internal setHandler behavior
    setupButtonEventHandlers(this._element, this._handler);
};

SimpleControl.prototype.setTitle = function (title) {
    this._title = title;
};

SimpleControl.prototype.decorate = function (element) {
    this._element = element;
    this.setHandlerInternal();
};

/**
 * @constructor
 */
var PostExpander = function () {
    SimpleControl.call(this);
    this._handler = this.getExpandHandler();
};
inherits(PostExpander, SimpleControl);

PostExpander.prototype.setPostId = function (postId) {
    this._postId = postId;
};

PostExpander.prototype.getPostId = function () {
    return this._postId;
};

PostExpander.prototype.showWaitIcon = function () {
    var icon = new WaitIcon();
    this._element.html(icon.getElement());
    icon.show();
};

PostExpander.prototype.updateTheDots = function () {
    var numDots = this._cNumDots + 1;
    if (numDots > this._maxNumDots) {
        numDots = 1;
    }
    this._cNumDots = numDots;
    var dots = '';
    for (var i = 0; i < numDots; i++) {
        dots += '&bull;';
    }
    for (; i < this._maxNumDots; i++) {
        dots += '&nbsp;';
    }
    this._element.html(dots);
};

PostExpander.prototype.stopTheDots = function () {
    clearInterval(this._dotsInterval);
};

PostExpander.prototype.startTheDots = function () {
    var numDots = this._element.find('a').html().length + 2;
    this._maxNumDots = numDots;
    this._cNumDots = 0;
    var dots = '';
    for (var i = 0; i < numDots; i++) {
        dots += '&nbsp;';
    }
    this._element.html(dots);
    var me = this;
    var handler = function () {
        me.updateTheDots();
    };
    this._dotsInterval = setInterval(handler, 150);
};

PostExpander.prototype.getExpandHandler = function () {
    var me = this;
    return function () {
        var element = me.getElement();
        var snippet = $(element.parents('.snippet')[0]);
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: {'post_id': me.getPostId()},
            url: askbot.urls.getPostHtml,
            success: function (data) {
                if (data.post_html) {
                    snippet.hide();
                    snippet.html(data.post_html);
                    snippet.fadeIn();
                }
            }
        });
        me.showWaitIcon();
    };
};

var EditLink = function () {
    SimpleControl.call(this);
};
inherits(EditLink, SimpleControl);

EditLink.prototype.createDom = function () {
    var element = $('<a></a>');
    element.addClass('edit js-edit');
    this.decorate(element);
};

EditLink.prototype.decorate = function (element) {
    this._element = element;
    this._element.attr('title', gettext('click to edit this comment'));
    this._element.html(gettext('edit'));
    this.setHandlerInternal();
};

var CommentConvertLink = function (comment_id) {
    WrappedElement.call(this);
    this._comment_id = comment_id;
};
inherits(CommentConvertLink, WrappedElement);

CommentConvertLink.prototype.createDom = function () {
    var element = this.makeElement('form');
    element.addClass('convert-comment');
    element.attr('method', 'POST');
    element.attr('action', askbot.urls.convertComment);
    var hidden_input = this.makeElement('input');
    hidden_input.attr('type', 'hidden');
    hidden_input.attr('value', this._comment_id);
    hidden_input.attr('name', 'comment_id');
    element.append(hidden_input);

    var csrf_token = this.makeElement('input');
    csrf_token.attr('type', 'hidden');
    csrf_token.attr('name', 'csrfmiddlewaretoken');
    csrf_token.attr('value', getCookie(askbot.settings.csrfCookieName));
    element.append(csrf_token);

    var submit = this.makeElement('input');
    submit.attr('type', 'submit');
    submit.attr('value', gettext('convert to answer'));
    element.append(submit);
    this.decorate(element);
    this.getElement().trigger('askbot.afterCommentConvertLinkDecorate', [this]);
};


CommentConvertLink.prototype.decorate = function (element) {
    this._element = element;
};

var DeleteIcon = function (title) {
    SimpleControl.call(this);
    this._title = title;
    this._content = null;
};
inherits(DeleteIcon, SimpleControl);

DeleteIcon.prototype.decorate = function (element) {
    this._element = element;
    this._element.attr('class', 'js-delete-icon');
    this._element.attr('title', this._title);
    if (this._handler !== null) {
        this.setHandlerInternal();
    }
};

DeleteIcon.prototype.setHandlerInternal = function () {
    setupButtonEventHandlers(this._element, this._handler);
};

DeleteIcon.prototype.createDom = function () {
    this._element = this.makeElement('span');
    this.decorate(this._element);
    if (this._content !== null) {
        this.setContent(this._content);
    }
};

DeleteIcon.prototype.setContent = function (content) {
    if (this._element === null) {
        this._content = content;
    } else {
        this._content = content;
        this._element.html(content);
    }
};

/**
 * @contstructor
 * Simple modal dialog with Ok/Cancel buttons by default
 */
var ModalDialog = function () {
    WrappedElement.call(this);
    this._accept_button_text = gettext('Ok');
    this._acceptBtnEnabled = true;
    this._reject_button_text = gettext('Cancel');
    this._heading_text = 'Add heading by setHeadingText()';
    this._initial_content = undefined;
    this._accept_handler = function () {};
    var me = this;
    this._reject_handler = function () {
        me.hide();
    };
    this._content_element = undefined;
    this._headerEnabled = true;
    this._className = undefined;
};
inherits(ModalDialog, WrappedElement);

ModalDialog.prototype.show = function () {
    this._element.modal('show');
};

ModalDialog.prototype.hide = function () {
    this._element.modal('hide');
};

ModalDialog.prototype.setClass = function (cls) {
    this._cssClass = cls;
    if (this._element) {
        this._element.addClass(cls);
    }
};

ModalDialog.prototype.setContent = function (content) {
    this._initial_content = content;
    if (this._content_element) {
        this._content_element.html(content);
    }
};

ModalDialog.prototype.prependContent = function (content) {
    this._content_element.prepend(content);
};

ModalDialog.prototype.setHeadingText = function (text) {
    this._heading_text = text;
};

ModalDialog.prototype.setAcceptButtonText = function (text) {
    this._accept_button_text = text;
    if (this._acceptBtn) {
        this._acceptBtn.html(text);
    }
};

ModalDialog.prototype.setRejectButtonText = function (text) {
    this._reject_button_text = text;
};

ModalDialog.prototype.hideRejectButton = function () {
    this._rejectBtn.hide();
};

ModalDialog.prototype.hideAcceptButton = function () {
    this._acceptButton.hide();
};

ModalDialog.prototype.setAcceptHandler = function (handler) {
    this._accept_handler = handler;
};

ModalDialog.prototype.setRejectHandler = function (handler) {
    this._reject_handler = handler;
};

ModalDialog.prototype.clearMessages = function () {
    this._element.find('.alert').remove();
};

ModalDialog.prototype.setMessage = function (text, message_type) {
    var box = new AlertBox();
    box.setText(text);
    if (message_type === 'error') {
        box.setError(true);
    }
    this.prependContent(box.getElement());
};

ModalDialog.prototype.disableAcceptButton = function () {
    this._acceptBtnEnabled = false;
    if (this._acceptBtn) {
        this._acceptBtn.prop('disabled', true);
    }
};

ModalDialog.prototype.enableAcceptButton = function () {
    this._acceptBtnEnabled = true;
    if (this._acceptBtn) {
        this._acceptBtn.prop('disabled', false);
    }
};

ModalDialog.prototype.createDom = function () {
    this._element = this.makeElement('div');
    var element = this._element;

    if (this._cssClass) {
        element.addClass(this._cssClass);
    }

    element.addClass('modal');
    if (this._className) {
        element.addClass(this._className);
    }

    //1) create header
    var close_link = this.makeElement('div');
    if (this._headerEnabled) {
        var header = this.makeElement('div');
        header.addClass('modal-header');
        element.append(header);
        close_link.addClass('close');
        close_link.attr('data-dismiss', 'modal');
        close_link.html('x');
        header.append(close_link);
        var title = this.makeElement('h3');
        title.html(this._heading_text);
        header.append(title);
    }

    //2) create content
    var body = this.makeElement('div');
    body.addClass('modal-body');
    element.append(body);
    this._content_element = body;
    if (this._initial_content) {
        this._content_element.append(this._initial_content);
    }

    //3) create footer with accept and reject buttons (ok/cancel).
    var footer = this.makeElement('div');
    footer.addClass('modal-footer');
    element.append(footer);

    var accept_btn = this.makeElement('button');
    if (this._acceptBtnEnabled === false) {
        accept_btn.prop('disabled', true);
    }
    accept_btn.addClass('submit');
    accept_btn.html(this._accept_button_text);
    footer.append(accept_btn);
    this._acceptBtn = accept_btn;

    var reject_btn = this.makeElement('button');
    if (this._reject_button_text) {
        reject_btn.addClass('submit cancel');
        reject_btn.html(this._reject_button_text);
        footer.append(reject_btn);
        this._rejectBtn = reject_btn;
    }

    //4) attach event handlers to the buttons
    setupButtonEventHandlers(accept_btn, this._accept_handler);
    if (this._reject_button_text) {
        setupButtonEventHandlers(reject_btn, this._reject_handler);
    }
    if (this._headerEnabled) {
        setupButtonEventHandlers(close_link, this._reject_handler);
    }

    this.hide();
    //have to do this on document since _element is not in the DOM yet
    $(document).trigger('askbot.afterModalDialogCreateDom', [this]);
};

/**
 * @constructor
 */
var FileUploadDialog = function () {
    ModalDialog.call(this);
    this._className = 'file-upload-dialog';
    this._post_upload_handler = undefined;
    this._fileType = 'image';
    this._headerEnabled = false;
};
inherits(FileUploadDialog, ModalDialog);

/**
 * allowed values: 'image', 'attachment'
 */
FileUploadDialog.prototype.setFileType = function (fileType) {
    this._fileType = fileType;
};

FileUploadDialog.prototype.getFileType = function () {
    return this._fileType;
};

FileUploadDialog.prototype.setButtonText = function (text) {
    this._fakeInput.val(text);
};

FileUploadDialog.prototype.setPostUploadHandler = function (handler) {
    this._post_upload_handler = handler;
};

FileUploadDialog.prototype.runPostUploadHandler = function (url, descr) {
    this._post_upload_handler(url, descr);
};

FileUploadDialog.prototype.setInputId = function (id) {
    this._input_id = id;
};

FileUploadDialog.prototype.getInputId = function () {
    return this._input_id;
};

FileUploadDialog.prototype.setErrorText = function (text) {
    this.setLabelText(text);
    this._label.addClass('error');
};

FileUploadDialog.prototype.setLabelText = function (text) {
    this._label.html(text);
    this._label.removeClass('error');
};

FileUploadDialog.prototype.setUrlInputTooltip = function (text) {
    this._url_input_tooltip = text;
};

FileUploadDialog.prototype.getUrl = function () {
    var url_input = this._url_input;
    if (url_input.isBlank() === false) {
        return url_input.getVal();
    }
    return '';
};

//disable description for now
//FileUploadDialog.prototype.getDescription = function () {
//    return this._description_input.getVal();
//};

FileUploadDialog.prototype.resetInputs = function () {
    this._url_input.reset();
    //this._description_input.reset();
    this._upload_input.val('');
};

FileUploadDialog.prototype.getInputElement = function () {
    return $('#' + this.getInputId());
};

FileUploadDialog.prototype.installFileUploadHandler = function (handler) {
    var upload_input = this.getInputElement();
    upload_input.unbind('change');
    //todo: fix this - make event handler reinstall work
    upload_input.change(handler);
};

FileUploadDialog.prototype.show = function () {
    //hack around the ajaxFileUpload plugin
    FileUploadDialog.superClass_.show.call(this);
    var handler = this.getStartUploadHandler();
    this.installFileUploadHandler(handler);
};

FileUploadDialog.prototype.getUrlInputElement = function () {
    return this._url_input.getElement();
};

/*
 * argument startUploadHandler is very special it must
 * be a function calling this one!!! Todo: see if there
 * is a more civilized way to do this.
 */
FileUploadDialog.prototype.startFileUpload = function (startUploadHandler) {

    var spinner = this._spinner;
    var label = this._label;

    spinner.ajaxStart(function () {
        spinner.show();
        label.hide();
    });
    spinner.ajaxComplete(function () {
        spinner.hide();
        label.show();
    });

    /* important!!! upload input must be loaded by id
     * because ajaxFileUpload monkey-patches the upload form */
    var uploadInput = this.getInputElement();
    uploadInput.ajaxStart(function () { uploadInput.hide(); });
    uploadInput.ajaxComplete(function () { uploadInput.show(); });

    //var localFilePath = upload_input.val();

    var me = this;

    $.ajaxFileUpload({
        url: askbot.urls.upload,
        secureuri: false,//todo: check on https
        fileElementId: this.getInputId(),
        dataType: 'xml',
        success: function (data, status) {

            var fileURL = $(data).find('file_url').text();
            var origFileName = $(data).find('orig_file_name').text();
            var newStatus = interpolate(
                                gettext('Uploaded file: %s'),
                                [origFileName]
                            );
            /*
            * hopefully a fix for the "fakepath" issue
            * https://www.mediawiki.org/wiki/Special:Code/MediaWiki/83225
            */
            fileURL = fileURL.replace(/\w:.*\\(.*)$/, '$1');
            var error = $(data).find('error').text();
            if (error !== '') {
                me.setErrorText(error);
            } else {
                me.getUrlInputElement().attr('value', fileURL);
                me.setLabelText(newStatus);
                var buttonText = gettext('Choose a different file');
                if (me.getFileType() === 'image') {
                    buttonText = gettext('Choose a different image');
                }
                me.setButtonText(buttonText);
            }

            /* re-install this as the upload extension
             * will remove the handler to prevent double uploading
             * this hack is a manipulation around the
             * ajaxFileUpload jQuery plugin. */
            me.installFileUploadHandler(startUploadHandler);
        },
        error: function (data, status, e) {
            /* re-install this as the upload extension
            * will remove the handler to prevent double uploading */
            me.setErrorText(gettext('Oops, looks like we had an error. Sorry.'));
            me.installFileUploadHandler(startUploadHandler);
        }
    });
    return false;
};

FileUploadDialog.prototype.getStartUploadHandler = function () {
    var me = this;
    var handler = function () {
        /* the trick is that we need inside the function call
         * to have a reference to itself
         * in order to reinstall the handler later
         * because ajaxFileUpload jquery extension might be destroying it */
        return me.startFileUpload(handler);
    };
    return handler;
};

FileUploadDialog.prototype.createDom = function () {

    var superClass = FileUploadDialog.superClass_;

    var me = this;
    superClass.setAcceptHandler.call(this, function () {
        var url = $.trim(me.getUrl());
        //var description = me.getDescription();
        //@todo: have url cleaning code here
        if (url.length > 0) {
            me.runPostUploadHandler(url);//, description);
            me.resetInputs();
        }
        me.hide();
    });
    superClass.setRejectHandler.call(this, function () {
        me.resetInputs();
        me.hide();
    });
    superClass.createDom.call(this);

    var form = this.makeElement('form');
    form.addClass('ajax-file-upload');
    form.css('margin-bottom', 0);
    this.prependContent(form);

    // Browser native file upload field
    var upload_input = this.makeElement('input');
    upload_input.attr({
        id: this._input_id,
        type: 'file',
        name: 'file-upload'
        //size: 26???
    });
    form.append(upload_input);
    this._upload_input = upload_input;

    var fakeInput = this.makeElement('input');
    fakeInput.attr('type', 'button');
    fakeInput.addClass('submit');
    fakeInput.addClass('fake-file-input');
    var buttonText = gettext('Choose a file to insert');
    if (this._fileType === 'image') {
        buttonText = gettext('Choose an image to insert');
    }
    fakeInput.val(buttonText);
    this._fakeInput = fakeInput;
    form.append(fakeInput);

    setupButtonEventHandlers(fakeInput, function () { upload_input.click(); });

    // Label which will also serve as status display
    var label = this.makeElement('label');
    label.attr('for', this._input_id);
    var types = askbot.settings.allowedUploadFileTypes;
    types = types.join(', ');
    label.html(gettext('Allowed file types are:') + ' ' + types + '.');
    form.append(label);
    this._label = label;

    // The url input text box, probably unused in fact
    var url_input = new TippedInput();
    url_input.setInstruction(this._url_input_tooltip || gettext('Or paste file url here'));
    var url_input_element = url_input.getElement();
    url_input_element.css({
        'width': '200px',
        'display': 'none'
    });
    form.append(url_input_element);
    //form.append($('<br/>'));
    this._url_input = url_input;

    /* //Description input box
    var descr_input = new TippedInput();
    descr_input.setInstruction(gettext('Describe the image here'));
    this.makeElement('input');
    form.append(descr_input.getElement());
    form.append($('<br/>'));
    this._description_input = descr_input;
    */
    var spinner = this.makeElement('img');
    spinner.attr('src', mediaUrl('media/images/ajax-loader.gif'));
    spinner.css('display', 'none');
    spinner.addClass('spinner');
    form.append(spinner);
    this._spinner = spinner;

    upload_input.change(this.getStartUploadHandler());
};

/**
 * attaches a modal menu with a text editor
 * to a link. The modal menu is from bootstrap.js
 * todo: this should probably be a subclass of ModalDialog,
 * triggered by a link click, then a whole bunch of methods
 * would be simply inherited from the modal dialog:
 * clearMessages, etc.
 */
var TextPropertyEditor = function () {
    WrappedElement.call(this);
    this._editor = null;
};
inherits(TextPropertyEditor, WrappedElement);

TextPropertyEditor.prototype.getWidgetData = function () {
    var data = this._element.data();
    return {
        object_id: data.objectId,
        model_name: data.modelName,
        property_name: data.propertyName,
        url: data.url,
        help_text: data.helpText,
        editor_heading: data.editorHeading
    };
};

TextPropertyEditor.prototype.makeEditor = function () {
    if (this._editor) {
        return this._editor;
    }
    var editor = new ModalDialog();
    this._editor = editor;
    editor.setHeadingText(this.getWidgetData().editor_heading);

    //create main content for the editor
    var textarea = this.makeElement('textarea');
    textarea.addClass('tipped-input blank');
    textarea.val(this.getWidgetData().help_text);

    var tipped_input = new TippedInput();
    tipped_input.decorate(textarea);
    this._text_input = tipped_input;

    editor.setContent(textarea);
    //body.append(textarea);

    editor.setAcceptButtonText(gettext('Save'));
    editor.setRejectButtonText(gettext('Cancel'));

    var me = this;
    editor.setAcceptHandler(function () {
        me.saveData();
    });

    $('body').append(editor.getElement());
    return editor;
};

TextPropertyEditor.prototype.openEditor = function () {
    this._editor.show();
};

TextPropertyEditor.prototype.clearMessages = function () {
    this._editor.clearMessages();
};

TextPropertyEditor.prototype.showAlert = function (text) {
    this._editor.setMessage(text, 'alert');
};

TextPropertyEditor.prototype.showError = function (text) {
    this._editor.setMessage(text, 'error');
};

TextPropertyEditor.prototype.setText = function (text) {
    this._text_input.setVal(text);
};

TextPropertyEditor.prototype.getText = function () {
    return this._text_input.getVal();
};

TextPropertyEditor.prototype.hideDialog = function () {
    this._editor.hide();
};

TextPropertyEditor.prototype.startOpeningEditor = function () {
    var me = this;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        cache: false,
        url: me.getWidgetData().url,
        data: me.getWidgetData(),
        success: function (data) {
            if (data.success) {
                me.makeEditor();
                me.setText($.trim(data.text));
                me.openEditor();
            } else {
                showMessage(me.getElement(), data.message);
            }
        }
    });
};

TextPropertyEditor.prototype.saveData = function () {
    var data = this.getWidgetData();
    data.text = this.getText();
    var me = this;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        cache: false,
        url: me.getWidgetData().url,
        data: data,
        success: function (data) {
            if (data.success) {
                me.showAlert(gettext('saved'));
                setTimeout(function () {
                    me.clearMessages();
                    me.hideDialog();
                }, 1000);
            } else {
                me.showError(data.message);
            }
        }
    });
};

TextPropertyEditor.prototype.decorate = function (element) {
    this._element = element;
    var me = this;
    setupButtonEventHandlers(element, function () { me.startOpeningEditor(); });
};

/**
 * A button on which user can click
 * and change status with regard to certain item (follow/unfollow something,
 * join/leave group, or toggle some state)
 * The button has four states on-prompt, off-prompt, on-state and off-state
 * on-prompt is activated on mouseover, when user is not part of group
 * off-prompt - on mouseover, when user is part of group
 * on-state - when user is part of group and mouse is not over the button
 * off-state - same as above, but when user is not part of the group
 */
var TwoStateToggle = function () {
    SimpleControl.call(this);
    this._state = null;
    this._messages = {};
    this._states = [
        'on-state',
        'off-state',
        'on-prompt',
        'off-prompt'
    ];
    this._handler = this.getDefaultHandler();
    this._postData = {};
    this.toggleUrl = '';//public property
    this.setupDefaultDataValidators();
};
inherits(TwoStateToggle, SimpleControl);

TwoStateToggle.prototype.setPostData = function (data) {
    this._postData = data;
};

TwoStateToggle.prototype.getPostData = function () {
    return this._postData;
};

TwoStateToggle.prototype.resetStyles = function () {
    var element = this._element;
    var states = this._states;
    $.each(states, function (idx, state) {
        element.removeClass(state);
    });
    this.setText('');
};

TwoStateToggle.prototype.isOn = function () {
    return this._element.data('isOn');
};

TwoStateToggle.prototype.setupDefaultDataValidators = function () {
    this._validators = {
        'success': function (data) { return data.success; },
        'enabled': function (data) { return data.is_enabled; }
    }
};

TwoStateToggle.prototype.setDataValidator = function (name, func) {
    if (name === 'success' || name === 'enabled') {
        this._validators[name] = func;
    } else {
        throw 'unknown validator name ' + name;
    }
};

/**
 * func must either return `true` or `false`
 * if `false` is returned, data submission will be canceled
 */
TwoStateToggle.prototype.setBeforeSubmitHandler = function(func) {
    this._beforeSubmitHandler = func;
};

TwoStateToggle.prototype.getBeforeSubmitHandler = function () {
    return this._beforeSubmitHandler;
};

TwoStateToggle.prototype.datumIsValid = function (validatorName, data) {
    return this._validators[validatorName](data);
};

TwoStateToggle.prototype.getDefaultHandler = function () {
    var me = this;
    return function () {
        var handler = me.getBeforeSubmitHandler();
        if (handler && handler() === false) {
            return;
        }
        var data = me.getPostData();
        data.disable = me.isOn();
        /* @todo: need ability to prevent the ajax call
         * and do something else in certain conditions.
         * For example - invite an unauthenticated user to log in.
         * This functionality can be better
         * defined in the "SimpleControl".
         */
        $.ajax({
            type: 'POST',
            dataType: 'json',
            cache: false,
            url: me.toggleUrl,
            data: data,
            success: function (data) {
                if (me.datumIsValid('success', data)) {
                    if (me.datumIsValid('enabled', data)) {
                        me.setState('on-state');
                    } else {
                        me.setState('off-state');
                    }
                    me.getElement().trigger('askbot.two-state-toggle.success', data);
                } else {
                    if (data.message) {
                        showMessage(me.getElement(), data.message);
                    }
                    me.getElement().trigger('askbot.two-state-toggle.error', data);
                }
            }
        });
    };
};

TwoStateToggle.prototype.isCheckBox = function () {
    var element = this._element;
    return element.attr('type') === 'checkbox';
};

TwoStateToggle.prototype.setState = function (state) {
    var element = this._element;
    this._state = state;
    if (element) {
        this.resetStyles();
        element.addClass(state);
        if (state === 'on-state') {
            element.data('isOn', true);
        } else if (state === 'off-state') {
            element.data('isOn', false);
        }
        if (this.isCheckBox()) {
            if (state === 'on-state') {
                element.attr('checked', true);
            } else if (state === 'off-state') {
                element.attr('checked', false);
            }
        } else {
            this.setText(this._messages[state]);
        }
    }
};

TwoStateToggle.prototype.setText = function (text) {
    var btnText = this._element.find('.js-btn-text');
    var where  = btnText.length ? btnText : this._element;
    where.html(text);
};

TwoStateToggle.prototype.decorate = function (element) {
    this._element = element;
    //read messages for all states
    var messages = {};
    messages['on-state'] = element.data('onStateText') || gettext('enabled');
    messages['off-state'] = element.data('offStateText') || gettext('disabled');
    messages['on-prompt'] = element.data('onPromptText') || messages['on-state'];
    messages['off-prompt'] = element.data('offPromptText') || messages['off-state'];
    this._messages = messages;

    this.toggleUrl = element.data('toggleUrl');

    //detect state and save it
    if (this.isCheckBox()) {
        this._state = element.is(':checked') ? 'on-state' : 'off-state';
    } else {
        this._state = element.data('isOn') ? 'on-state' : 'off-state';
    }

    //set mouseover handler only for non-checkbox version
    if (this.isCheckBox() === false) {
        var me = this;
        element.mouseover(function () {
            var is_on = me.isOn();
            if (is_on) {
                me.setState('off-prompt');
            } else {
                me.setState('on-prompt');
            }
            return false;
        });
        element.mouseout(function () {
            var is_on = me.isOn();
            if (is_on) {
                me.setState('on-state');
            } else {
                me.setState('off-state');
            }
            return false;
        });
    }

    setupButtonEventHandlers(element, this.getHandler());
};

/**
 * @contstructor
 * a simple dropdown select element
 * which saves data to the server on change
 */
var DropdownSelect = function () {
    WrappedElement.call(this);
};
inherits(DropdownSelect, WrappedElement);

DropdownSelect.prototype.setPostData = function (data) {
    this._postData = data;
};

/**
 * posts value of selection to the url given
 * with data-url and parameter called "value"
 */
DropdownSelect.prototype.saveChoice = function () {
    var element = this._element;
    var url = this._url;
    var data = this._postData;
    data.value = element.val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: data,
        cache: false,
        url: url,
        success: function (data) {
            if (!data.success) {
                showMessage(element, data.message);
            }
        }
    });
};

DropdownSelect.prototype.decorate = function (element) {
    this._element = element;
    this._url = $(element).data('url');
    var me = this;
    this._element.change(function () {
        me.saveChoice();
    });
};

var BoxItemContent = function () {
    SimpleContent.call(this);
};
inherits(BoxItemContent, SimpleContent);

/**
 * @override to allow for more complex content
 */
BoxItemContent.prototype.setName = function (name) {
    BoxItemContent.superClass_.setContent.call(this, name);
};
BoxItemContent.prototype.getName = function () {
    return BoxItemContent.superClass_.getContent.call(this);
};

/**
 * @constructor
 * an item used for the select box described below
 */
var SelectBoxItem = function () {
    Widget.call(this);
    this._id = null;
    this._name = null;
    this._description = null;
    this._content_class = BoxItemContent;//default expects a single text node
    //content element - instance of this._content_class
    this._content = undefined;
    this._selector = undefined;//the selector object
};
inherits(SelectBoxItem, Widget);

SelectBoxItem.prototype.setId = function (id) {
    this._id = id;
    if (this._element) {
        this._element.data('itemId', id);
    }
};

SelectBoxItem.prototype.getId = function () {
    return this._id;
};

SelectBoxItem.prototype.setName = function (name) {
    this._name = name;
    if (this._content) {
        this._content.setName(name);
    }
};

SelectBoxItem.prototype.setDescription = function (description) {
    this._description = description;
    if (this._element) {
        this._element.data('originalTitle');
    }
};

SelectBoxItem.prototype.getData = function () {
    //todo: stuck using old key names, change after merge
    //with the user-groups branch
    return {
        id: this._id,
        title: this._name,
        details: this._description
    };
};

SelectBoxItem.prototype.setSelector = function (sel) {
    this._selector = sel;
};

SelectBoxItem.prototype.getSelector = function (sel) {
    return this._selector;
};

SelectBoxItem.prototype.getContent = function () {
    return this._content;
};

SelectBoxItem.prototype.isSelected = function () {
    return this._element.hasClass('selected');
};

SelectBoxItem.prototype.setSelected = function (is_selected) {
    if (is_selected) {
        this._element.addClass('selected');
    } else {
        this._element.removeClass('selected');
    }
};

SelectBoxItem.prototype.detach = function () {
    this._element.detach();
};

SelectBoxItem.prototype.createDom = function () {
    var elem = this.makeElement('li');
    this._element = elem;
    elem.data('itemId', this._id);
    elem.data('itemOriginalTitle', this._description);
    var content = new this._content_class();
    content.setName(this._name);
    elem.append(content.getElement());
    this._content = content;
};
/**
 * this method sets css class to the item's DOM element
 */
SelectBoxItem.prototype.addCssClass = function (css_class) {
    this._element.addClass(css_class);
};

SelectBoxItem.prototype.decorate = function (element) {
    this._element = element;
    //set id and description
    this._id = element.data('itemId');
    this._description = element.data('originalTitle');

    //work on setting name
    var content_source = element.contents().detach();
    var content = new this._content_class();
    //assume that we want first node only
    content.setContent(content_source[0]);
    this._content = content;
    this._name = content.getName();//allows to abstract from structure

    this._element.append(content.getElement());
};

/**
 * A list of items from where one can be selected
 */
var SelectBox = function () {
    Widget.call(this);
    this._items = [];
    this._select_handler = function () {};//empty default
    this._is_editable = false;
    this._item_class = SelectBoxItem;
};
inherits(SelectBox, Widget);

SelectBox.prototype.setItemClass = function (itemClass) {
    this._item_class = itemClass;
};

SelectBox.prototype.setEditable = function (is_editable) {
    this._is_editable = is_editable;
};

SelectBox.prototype.isEditable = function () {
    return this._is_editable;
};

SelectBox.prototype.detachAllItems = function () {
    var items = this._items;
    $.each(items, function (idx, item) {
        item.detach();
    });
    this._items = [];
};

SelectBox.prototype.getItem = function (id) {
    var items = this._items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].getId() === id) {
            return items[i];
        }
    }
    return undefined;
};

SelectBox.prototype.getItemByIndex = function (idx) {
    return this._items[idx];
};

/**
 * removes all items
 */
SelectBox.prototype.empty = function () {
    var items = this._items;
    $.each(items, function (idx, item) {
        item.dispose();
    });
    this._items = [];
};

/*
 * why do we have these two almost identical methods?
 * the difference seems to be remove/vs fade out
 */
SelectBox.prototype.removeItem = function (id) {
    var item = this.getItem(id);
    item.getElement().fadeOut();
    item.dispose();
    var idx = $.inArray(item, this._items);
    if (idx !== -1) {
        this._items.splice(idx, 1);
    }
};
SelectBox.prototype.deleteItem = function (id) {
    var item = this.getItem(id);
    if (item === undefined) {
        return;
    }
    item.dispose();
    var idx = $.inArray(item, this._items);
    if (idx !== -1) {
        this._items.splice(idx, 1);
    }
};

SelectBox.prototype.createItem = function () {
    return new this._item_class();
};

SelectBox.prototype.getItemIndex = function (item) {
    var idx = $.inArray(item, this._items);
    if (idx === -1) {
        throw 'index error';
    }
    return idx;
};

SelectBox.prototype.addItemObject = function (item) {
    this._items.push(item);
    this._element.append(item.getElement());
    this.selectItem(item);
    item.setSelector(this);
    //set event handler
    var me = this;
    setupButtonEventHandlers(
        item.getElement(),
        me.getSelectHandler(item)
    );
};

/** @todo: rename to setItem?? have a problem when id's are all say 0 */
SelectBox.prototype.addItem = function (id, name, description) {

    if (this.hasElement() === false) {
        return;
    }
    //delete old item
    this.deleteItem(id);
    //create new item
    var item = this.createItem();
    item.setId(id);
    item.setName(name);
    item.setDescription(description);
    //add item to the SelectBox
    this.addItemObject(item);

    return item;
};

SelectBox.prototype.getSelectedItem = function () {
    for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.isSelected()) {
            return item;
        }
    }
    return undefined;
};

SelectBox.prototype.getSelectedItemData = function () {
    var item = this.getSelectedItem();
    if (item) {
        return item.getData() || undefined;
    } else {
        return undefined;
    }
};

SelectBox.prototype.selectItem = function (item) {
    this.clearSelection();
    item.setSelected(true);
};

SelectBox.prototype.clearSelection = function () {
    $.each(this._items, function (idx, item) {
        item.setSelected(false);
    });
};

SelectBox.prototype.setSelectHandler = function (handler) {
    this._select_handler = handler;
};

SelectBox.prototype.getSelectHandlerInternal = function () {
    return this._select_handler;
};

SelectBox.prototype.getSelectHandler = function (item) {
    var me = this;
    return function () {
        me.selectItem(item);
        var handler = me.getSelectHandlerInternal();
        handler(item.getData());
    };
};

SelectBox.prototype.decorate = function (element) {
    this._element = element;
    var me = this;
    var box_items = this._items;
    var item_elements = this._element.find('.select-box-item');
    item_elements.each(function (idx, item_element) {
        var item = me.createItem();
        item.decorate($(item_element));
        box_items.push(item);
        setupButtonEventHandlers(
            item.getElement(),
            me.getSelectHandler(item)
        );
    });
};

SelectBox.prototype.createDom = function () {
    var element = this.makeElement('ul');
    this._element = element;
    element.addClass('select-box');
};

/**
 * This is a dropdown list elment
 */
var GroupDropdown = function (groups) {
    WrappedElement.call(this);
    this._group_list = groups;
};
inherits(GroupDropdown, WrappedElement);

GroupDropdown.prototype.createDom =  function () {
    this._element = this.makeElement('ul');
    this._element.attr('class', 'dropdown-menu');
    this._element.attr('id', 'groups-dropdown');
    this._element.attr('role', 'menu');
    this._element.attr('aria-labelledby', 'navGroups');

    this._input_box = new TippedInput();
    this._input_box.setInstruction(gettext('group name'));
    this._input_box.createDom();
    this._input_box_element = this._input_box.getElement();
    this._input_box_element.attr('class', 'group-name');
    this._input_box_element.hide();
    this._add_link = this.makeElement('a');
    this._add_link.attr('href', '#');
    this._add_link.attr('class', 'group-name');
    this._add_link.text(gettext('add new group'));

    for (var i = 0; i < this._group_list.length; i++) {
        var li = this.makeElement('li');
        var a = this.makeElement('a');
        a.text(this._group_list[i].name);
        a.attr('href', this._group_list[i].link);
        a.attr('class', 'group-name');
        li.append(a);
        this._element.append(li);
    }
    if (askbot.data.userIsAdmin) {
        this.enableAddGroups();
    }
};

/**
 * inserts a link to group with a given url to the group page
 * and name
 */
GroupDropdown.prototype.insertGroup = function (group_name, url) {

    //1) take out first and last list elements:
    // everyone and the "add group" item
    var list = this._element.children();
    var everyoneGroup = list.first().detach();
    var groupAdder = list.last().detach();
    var divider = this._element.find('.divider').detach();

    //2) append group link into the list
    var li = this.makeElement('li');
    var a = this.makeElement('a');
    a.attr('href', url);
    a.attr('class', 'group-name');
    a.text(group_name);
    li.append(a);
    li.hide();
    this._element.append(li);

    //3) sort rest of the list alphanumerically
    sortChildNodes(
        this._element,
        function (a, b) {
            var valA = $(a).find('a').text().toLowerCase();
            var valB = $(b).find('a').text().toLowerCase();
            return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
        }
    );

    //a dramatic effect
    li.fadeIn();

    //4) reinsert the first and last elements of the list:
    this._element.prepend(everyoneGroup);
    this._element.append(divider);
    this._element.append(groupAdder);
};

GroupDropdown.prototype.setState = function (state) {
    if (state === 'display') {
        this._input_box_element.hide();
        this._add_link.show();
    }
};

GroupDropdown.prototype.hasGroup = function (groupName) {
    var items = this._element.find('li');
    for (var i = 1; i < items.length - 1; i++) {
        var cGroupName = $(items[i]).find('a').text();
        if (cGroupName.toLowerCase() === groupName.toLowerCase()) {
            return true;
        }
    }
    return false;
};

GroupDropdown.prototype._add_group_handler = function () {
    var group_name = this._input_box_element.val();
    var me = this;
    if (!group_name) {
        return;
    }

    $.ajax({
        type: 'POST',
        url: askbot.urls.add_group,
        data: {group: group_name},
        success: function (data) {
            if (data.success) {
                var groupName = data.group_name;
                if (me.hasGroup(groupName)) {
                    var message = interpolate(gettext(
                            'Group %(name)s already exists. Group names are case-insensitive.'
                        ), {'name': groupName}, true
                    );
                    notify.show(message);
                    return false;
                } else {
                    me.insertGroup(data.group_name, data.url);
                    me.setState('display');
                    return true;
                }
            } else {
                notify.show(data.message);
                return false;
            }
        },
        error: function () {console.log('error');}
    });
};

GroupDropdown.prototype.enableAddGroups = function () {
    var self = this;
    this._add_link.click(function () {
        self._add_link.hide();
        self._input_box_element.show();
        self._input_box_element.focus();
    });
    this._input_box_element.keydown(function (event) {
        if (event.which === 13 || event.keyCode === 13) {
            self._add_group_handler();
            self._input_box_element.val('');
        }
    });

    var divider = this.makeElement('li');
    divider.attr('class', 'divider');
    this._element.append(divider);

    var container = this.makeElement('li');
    container.append(this._add_link);
    container.append(this._input_box_element);

    this._element.append(container);
};

var Tag = function () {
    SimpleControl.call(this);
    this._deletable = false;
    this._delete_handler = null;
    this._delete_icon_title = null;
    this._tag_title = null;
    this._name = null;
    this._url_params = '';
    this._inner_html_tag = 'a';
};
inherits(Tag, SimpleControl);

Tag.prototype.setName = function (name) {
    this._name = name;
};

Tag.prototype.getName = function () {
    return this._name;
};

Tag.prototype.setDeletable = function (is_deletable) {
    this._deletable = is_deletable;
};

Tag.prototype.setLinkable = function (is_linkable) {
    if (is_linkable === true) {
        this._inner_html_tag = 'a';
    } else {
        this._inner_html_tag = 'span';
    }
};

Tag.prototype.isLinkable = function () {
    return (this._inner_html_tag === 'a');
};

Tag.prototype.isDeletable = function () {
    return this._deletable;
};

Tag.prototype.isWildcard = function () {
    return (this.getName().substr(-1) === '*');
};

Tag.prototype.setUrlParams = function (url_params) {
    this._url_params = url_params;
};

Tag.prototype.setHandlerInternal = function () {
    setupButtonEventHandlers(this._element.find('.js-tag-name'), this._handler);
};

/* delete handler will be specific to the task */
Tag.prototype.setDeleteHandler = function (delete_handler) {
    this._delete_handler = delete_handler;
    if (this.hasElement() && this.isDeletable()) {
        this._delete_icon.setHandler(delete_handler);
    }
};

Tag.prototype.getDeleteHandler = function () {
    return this._delete_handler;
};

Tag.prototype.setDeleteIconTitle = function (title) {
    this._delete_icon_title = title;
};

Tag.prototype.decorate = function (element) {
    this._element = element;
    var del = element.find('.js-delete-icon');
    if (del.length === 1) {
        this.setDeletable(true);
        this._delete_icon = new DeleteIcon();
        if (this._delete_icon_title !== null) {
            this._delete_icon.setTitle(this._delete_icon_title);
        }
        //do not set the delete handler here
        this._delete_icon.decorate(del);
    }
    this._inner_element = this._element.find('.js-tag-name');
    this._name = this.decodeTagName(
        $.trim(this._inner_element.attr('data-tag-name'))
    );
    if (this._title !== null) {
        this._inner_element.attr('title', this._title);
    }
    if (this._handler !== null) {
        this.setHandlerInternal();
    }
};

Tag.prototype.getDisplayTagName = function () {
    //replaces the trailing * symbol with the unicode asterisk
    return this._name.replace(/\*$/, '&#10045;');
};

Tag.prototype.decodeTagName = function (encoded_name) {
    return encoded_name.replace('\u273d', '*');
};

Tag.prototype.createDom = function () {
    this._element = getTemplate('.js-tag');
    //render the outer element
    var deleter = this._element.find('.js-delete-icon');
    if (!this._deletable) {
        this._element.removeClass('js-deletable-tag');
        deleter.remove();
    } else {
        var del = new DeleteIcon();
        del.setHandler(this.getDeleteHandler());
        if (this._delete_icon_title !== null) {
            del.setTitle(this._delete_icon_title);
        }
        del.decorate(deleter);
        this._delete_icon = del;
    }
    //render the inner element
    this._inner_element = this._element.find('.js-tag-name');
    if (this._title === null) {
        var name = this.getName();
        this.setTitle(interpolate(gettext('see questions tagged \'%s\''), [name]));
    }
    if (this.isLinkable()) {
        //"replace" tag to 'a'
        this._inner_element = setHtmlTag(this._inner_element, 'a');
        var url = askbot.urls.questions;
        url += QSutils.add_search_tag(this._url_params, this.getName());
        this._inner_element.attr('href', url);
    }
    this._inner_element.attr('title', this._title);
    this._inner_element.html(this.getDisplayTagName());
    this._inner_element.data('tagName', this.getName());


    if (!this.isLinkable() && this._handler !== null) {
        this.setHandlerInternal();
    }
};

var PermsHoverCard = function () {
    WrappedElement.call(this);
    this._isLoaded = false;
};
inherits(PermsHoverCard, WrappedElement);

PermsHoverCard.prototype.setContent = function (data) {
    this._element.html(data.html);
};

PermsHoverCard.prototype.setTrigger = function (trigger) {
    this._trigger = trigger;
};

PermsHoverCard.prototype.setPosition = function () {
    var trigger = this._trigger.getElement();
    var coors = trigger.offset();
    var height = trigger.outerHeight();
    var triangle = this._element.find('.triangle');
    var triangleHeight = triangle.outerHeight();
    this._element.css({
        'top': coors.top + height + triangleHeight,
        'left': coors.left
    });
};

PermsHoverCard.prototype.setUrl = function (url) {
    this._url = url;
};

PermsHoverCard.prototype.startLoading = function (onLoad) {
    var me = this;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        cache: false,
        url: this._url,
        success: function (data) {
            if (data.success) {
                me.setContent(data);
                me.setPosition();
                onLoad();
                me.setIsLoaded();
            } else {
                notify.show(data.message);
            }
        }
    });
};

PermsHoverCard.prototype.isLoaded = function () {
    return this._isLoaded;
};

PermsHoverCard.prototype.setIsLoaded = function () {
    this._isLoaded = true;
};

PermsHoverCard.prototype.getOpenHandler = function () {
    var me = this;
    return function () {
        me.clearCancelOpenTimeout();
        if (me.isLoaded()) {
            me.getElement().show();
        } else {
            var onload = function () {
                me.getElement().show();
            };
            me.startLoading(onload);
        }
    };
};

PermsHoverCard.prototype.setCancelOpenTimoutId = function (timeoutId) {
    this._cancelOpenTimeoutId = timeoutId;
};

PermsHoverCard.prototype.clearCancelOpenTimeout = function () {
    var timeout = this._cancelOpenTimeoutId;
    if (timeout) {
        clearTimeout(timeout);
    }
};

PermsHoverCard.prototype.getCloseHandler = function () {
    var me = this;
    return function () {
        var element = me.getElement();
        //start timeout to close
        var timeout = setTimeout(function () {
            element.hide();
            //element.fadeOut('fast');
        }, 200);
        me.setCancelOpenTimoutId(timeout);
    };
};

PermsHoverCard.prototype.getImmediateCloseHandler = function () {
    var me = this;
    return function () {
        me.getElement().hide();
    };
};

PermsHoverCard.prototype.getKeepHandler = function () {
    var me = this;
    return function () {
        me.clearCancelOpenTimeout();
    };
};

PermsHoverCard.prototype.createDom = function () {
    var element = this.makeElement('div');
    this._element = element;
    element.addClass('hovercard');
    element.hover(
        this.getKeepHandler(),
        this.getCloseHandler()
    );
    this._element.hide();
};

var ShowPermsTrigger = function () {
    WrappedElement.call(this);
};
inherits(ShowPermsTrigger, WrappedElement);

ShowPermsTrigger.prototype.decorate = function (element) {
    this._element = element;
    var hoverCard = new PermsHoverCard();
    this._hoverCard = hoverCard;
    $('body').append(hoverCard.getElement());

    hoverCard.setTrigger(this);
    hoverCard.setUrl(element.data('url'));

    var onEnter = hoverCard.getOpenHandler();
    var onExit = hoverCard.getCloseHandler();
    element.hover(onEnter, onExit);
    var onClose = hoverCard.getImmediateCloseHandler();
    $('body').click(onClose);
};

/**
 * AutoCompleter Object, refactored closure style from
 * jQuery autocomplete plugin
 * @param {Object=} options Settings
 * @constructor
 */
var AutoCompleter = function (options) {

    /**
     * Default options for autocomplete plugin
     */
    var defaults = {
        promptText: '',
        autocompleteMultiple: true,
        multipleSeparator: ' ',//a single character
        inputClass: 'acInput',
        loadingClass: 'acLoading',
        resultsClass: 'acResults',
        selectClass: 'acSelect',
        queryParamName: 'q',
        limitParamName: 'limit',
        extraParams: {},
        lineSeparator: '\n',
        cellSeparator: '|',
        minChars: 2,
        maxItemsToShow: 10,
        delay: 400,
        useCache: true,
        maxCacheLength: 10,
        matchSubset: true,
        matchCase: false,
        matchInside: true,
        mustMatch: false,
        preloadData: false,
        selectFirst: false,
        stopCharRegex: /\s+/,
        selectOnly: false,
        formatItem: null,           // TBD
        onItemSelect: false,
        autoFill: false,
        filterResults: true,
        sortResults: true,
        sortFunction: false,
        onNoMatch: false
    };

    /**
     * Options dictionary
     * @type Object
     * @private
     */
    this.options = $.extend({}, defaults, options);

    /**
     * Cached data
     * @type Object
     * @private
     */
    this.cacheData_ = {};

    /**
     * Number of cached data items
     * @type number
     * @private
     */
    this.cacheLength_ = 0;

    /**
     * Class name to mark selected item
     * @type string
     * @private
     */
    this.selectClass_ = 'jquery-autocomplete-selected-item';

    /**
     * Handler to activation timeout
     * @type ?number
     * @private
     */
    this.keyTimeout_ = null;

    /**
     * Last key pressed in the input field (store for behavior)
     * @type ?number
     * @private
     */
    this.lastKeyPressed_ = null;

    /**
     * Last value processed by the autocompleter
     * @type ?string
     * @private
     */
    this.lastProcessedValue_ = null;

    /**
     * Last value selected by the user
     * @type ?string
     * @private
     */
    this.lastSelectedValue_ = null;

    /**
     * Is this autocompleter active?
     * @type boolean
     * @private
     */
    this.active_ = false;

    /**
     * Is it OK to finish on blur?
     * @type boolean
     * @private
     */
    this.finishOnBlur_ = true;

    this.options.minChars = parseInt(this.options.minChars, 10);
    if (isNaN(this.options.minChars) || this.options.minChars < 1) {
        this.options.minChars = 2;
    }

    this.options.maxItemsToShow = parseInt(this.options.maxItemsToShow, 10);
    if (isNaN(this.options.maxItemsToShow) || this.options.maxItemsToShow < 1) {
        this.options.maxItemsToShow = 10;
    }

    this.options.maxCacheLength = parseInt(this.options.maxCacheLength, 10);
    if (isNaN(this.options.maxCacheLength) || this.options.maxCacheLength < 1) {
        this.options.maxCacheLength = 10;
    }

    if (this.options.preloadData === true) {
        this.fetchRemoteData('', function () {});
    }
};
inherits(AutoCompleter, WrappedElement);

AutoCompleter.prototype.decorate = function (element) {

    /**
     * Init DOM elements repository
     */
    this._element = element;

    /**
     * Switch off the native autocomplete
     */
    this._element.attr('autocomplete', 'off');

    /**
     * Set prompt text
     */
    if ($.trim(element.val()) === '') {
        this.setPrompt();
    }

    /**
     * Create DOM element to hold results
     */
    this._results = $('<div></div>').hide();
    if (this.options.resultsClass) {
        this._results.addClass(this.options.resultsClass);
    }
    this._results.css({
        position: 'absolute'
    });
    $('body').append(this._results);

    this.setEventHandlers();
};

AutoCompleter.prototype.setPrompt = function () {
    this._element.val(this.options.promptText);
    this._element.addClass('prompt');
};

AutoCompleter.prototype.removePrompt = function () {
    if (this._element.hasClass('prompt')) {
        this._element.removeClass('prompt');
        var val = this._element.val();
        if (val === this.options.promptText) {
            this._element.val('');
        }
    }
};

AutoCompleter.prototype.setEventHandlers = function () {
    /**
     * Shortcut to self
     */
    var self = this;

    /**
     * Attach keyboard monitoring to $elem
     */
    self._element.keydown(function (e) {

        self.removePrompt();

        self.lastKeyPressed_ = e.keyCode;
        switch (self.lastKeyPressed_) {

            case 38: // up
                e.preventDefault();
                if (self.active_) {
                    self.focusPrev();
                } else {
                    self.activate();
                }
                return false;

            case 40: // down
                e.preventDefault();
                if (self.active_) {
                    self.focusNext();
                } else {
                    self.activate();
                }
                return false;

            case 9: // tab
            case 13: // return
                if (self.active_) {
                    e.preventDefault();
                    self.selectCurrent();
                    return false;
                }
                break;

            case 27: // escape
                if ($.trim(self._element.val()) === '') {
                    self.setPrompt();
                    return false;
                }
                if (self.active_) {
                    e.preventDefault();
                    self.finish();
                    return false;
                }
                break;

            case 8: //backspace
                if ($.trim(self._element.val()).length === 1) {
                    self.setValue('');
                    self.finish();
                    return false;
                } else {
                    self.activate();
                }
            default:
                self.activate();

        }
    });
    self._element.blur(function () {
        if (self.finishOnBlur_) {
            setTimeout(function () { self.finish(); }, 200);
        }
    });
};

AutoCompleter.prototype.position = function () {
    var offset = this._element.offset();
    this._results.css({
        top: offset.top + this._element.outerHeight(),
        left: offset.left
    });
};

AutoCompleter.prototype.cacheRead = function (filter) {
    var filterLength, searchLength, search, maxPos, pos;
    if (this.options.useCache) {
        filter = String(filter);
        filterLength = filter.length;
        if (this.options.matchSubset) {
            searchLength = 1;
        } else {
            searchLength = filterLength;
        }
        while (searchLength <= filterLength) {
            if (this.options.matchInside) {
                maxPos = filterLength - searchLength;
            } else {
                maxPos = 0;
            }
            pos = 0;
            while (pos <= maxPos) {
                search = filter.substr(0, searchLength);
                if (this.cacheData_[search] !== undefined) {
                    return this.cacheData_[search];
                }
                pos++;
            }
            searchLength++;
        }
    }
    return false;
};

AutoCompleter.prototype.cacheWrite = function (filter, data) {
    if (this.options.useCache) {
        if (this.cacheLength_ >= this.options.maxCacheLength) {
            this.cacheFlush();
        }
        filter = String(filter);
        if (this.cacheData_[filter] !== undefined) {
            this.cacheLength_++;
        }
        this.cacheData_[filter] = data;
        return this.cacheData_[filter];
    }
    return false;
};

AutoCompleter.prototype.cacheFlush = function () {
    this.cacheData_ = {};
    this.cacheLength_ = 0;
};

AutoCompleter.prototype.callHook = function (hook, data) {
    var f = this.options[hook];
    if (f && $.isFunction(f)) {
        return f(data, this);
    }
    return false;
};

AutoCompleter.prototype.activate = function () {
    var self = this;
    var activateNow = function () {
        self.activateNow();
    };
    var delay = parseInt(this.options.delay, 10);
    if (isNaN(delay) || delay <= 0) {
        delay = 250;
    }
    if (this.keyTimeout_) {
        clearTimeout(this.keyTimeout_);
    }
    this.keyTimeout_ = setTimeout(activateNow, delay);
};

AutoCompleter.prototype.activateNow = function () {
    var value = this.getValue();
    if (value !== this.lastProcessedValue_ && value !== this.lastSelectedValue_) {
        if (value.length >= this.options.minChars) {
            this.active_ = true;
            this.lastProcessedValue_ = value;
            this.fetchData(value);
        }
    }
};

AutoCompleter.prototype.fetchData = function (value) {
    var self = this;
    this.fetchRemoteData(value, function (remoteData) {
        self.filterAndShowResults(remoteData, value);
    });
};

AutoCompleter.prototype.fetchRemoteData = function (filter, callback) {
    var data = this.cacheRead(filter);
    if (data) {
        callback(data);
    } else {
        var self = this;
        if (this._element) {
            this._element.addClass(this.options.loadingClass);
        }
        var ajaxCallback = function (data) {
            var parsed = false;
            if (data !== false) {
                parsed = self.parseRemoteData(data);
                // only cache when cache is enabled
                if (self.options.useCache) {
                    self.options.data = parsed;//cache data forever - E.F.
                }
                self.cacheWrite(filter, parsed);
            }
            if (self._element) {
                self._element.removeClass(self.options.loadingClass);
            }
            callback(parsed);
        };
        $.ajax({
            url: this.makeUrl(filter),
            success: ajaxCallback,
            error: function () {
                ajaxCallback(false);
            }
        });
    }
};

AutoCompleter.prototype.setOption = function (name, value) {
    this.options[name] = value;
};

AutoCompleter.prototype.setExtraParam = function (name, value) {
    var index = $.trim(String(name));
    if (index) {
        if (!this.options.extraParams) {
            this.options.extraParams = {};
        }
        if (this.options.extraParams[index] !== value) {
            this.options.extraParams[index] = value;
            this.cacheFlush();
        }
    }
};

AutoCompleter.prototype.makeUrl = function (param) {
    var self = this;
    var url = this.options.url;
    var params = $.extend({}, this.options.extraParams);
    // If options.queryParamName === false, append query to url
    // instead of using a GET parameter
    if (this.options.queryParamName === false) {
        url += encodeURIComponent(param);
    } else {
        params[this.options.queryParamName] = param;
    }

    if (this.options.limitParamName && this.options.maxItemsToShow) {
        params[this.options.limitParamName] = this.options.maxItemsToShow;
    }

    var urlAppend = [];
    $.each(params, function (index, value) {
        urlAppend.push(self.makeUrlParam(index, value));
    });
    if (urlAppend.length) {
        url += url.indexOf('?') === -1 ? '?' : '&';
        url += urlAppend.join('&');
    }
    return url;
};

AutoCompleter.prototype.makeUrlParam = function (name, value) {
    return String(name) + '=' + encodeURIComponent(value);
};

/**
 * Sanitize CR and LF, then split into lines
 */
AutoCompleter.prototype.splitText = function (text) {
    return String(text).replace(/(\r\n|\r|\n)/g, '\n').split(this.options.lineSeparator);
};

AutoCompleter.prototype.parseRemoteData = function (remoteData) {
    var value, i, j, data;
    var results = [];
    var lines = this.splitText(remoteData);
    for (i = 0; i < lines.length; i++) {
        var line = lines[i].split(this.options.cellSeparator);
        data = [];
        for (j = 0; j < line.length; j++) {
            data.push(unescape(line[j]));
        }
        value = data.shift();
        results.push({ value: unescape(value), data: data });
    }
    return results;
};

AutoCompleter.prototype.filterAndShowResults = function (results, filter) {
    this.showResults(this.filterResults(results, filter), filter);
};

AutoCompleter.prototype.filterResults = function (results, filter) {

    var filtered = [];
    var value, data, i, result, type, include;
    var regex, pattern, testValue;

    for (i = 0; i < results.length; i++) {
        result = results[i];
        type = typeof result;
        if (type === 'string') {
            value = result;
            data = {};
        } else if ($.isArray(result)) {
            value = result[0];
            data = result.slice(1);
        } else if (type === 'object') {
            value = result.value;
            data = result.data;
        }
        value = String(value);
        if (value > '') {
            if (typeof data !== 'object') {
                data = {};
            }
            if (this.options.filterResults) {
                pattern = String(filter);
                testValue = String(value);
                if (!this.options.matchCase) {
                    pattern = pattern.toLowerCase();
                    testValue = testValue.toLowerCase();
                }
                include = testValue.indexOf(pattern);
                if (this.options.matchInside) {
                    include = include > -1;
                } else {
                    include = include === 0;
                }
            } else {
                include = true;
            }
            if (include) {
                filtered.push({ value: value, data: data });
            }
        }
    }

    if (this.options.sortResults) {
        filtered = this.sortResults(filtered, filter);
    }

    if (this.options.maxItemsToShow > 0 && this.options.maxItemsToShow < filtered.length) {
        filtered.length = this.options.maxItemsToShow;
    }

    return filtered;

};

AutoCompleter.prototype.sortResults = function (results, filter) {
    var self = this;
    var sortFunction = this.options.sortFunction;
    if (!$.isFunction(sortFunction)) {
        sortFunction = function (a, b, f) {
            return self.sortValueAlpha(a, b, f);
        };
    }
    results.sort(function (a, b) {
        return sortFunction(a, b, filter);
    });
    return results;
};

AutoCompleter.prototype.sortValueAlpha = function (a, b, filter) {
    a = String(a.value);
    b = String(b.value);
    if (!this.options.matchCase) {
        a = a.toLowerCase();
        b = b.toLowerCase();
    }
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};

AutoCompleter.prototype.showResults = function (results, filter) {
    var self = this;
    var $ul = $('<ul></ul>');
    var i, result, $li, extraWidth, first = false, $first = false;
    var numResults = results.length;
    for (i = 0; i < numResults; i++) {
        result = results[i];
        $li = $('<li>' + this.showResult(result.value, result.data) + '</li>');
        $li.data('value', result.value);
        $li.data('data', result.data);
        $ul.append($li);
        if (first === false) {
            first = String(result.value);
            $first = $li;
            $li.addClass(this.options.firstItemClass);
        }
        if (i === numResults - 1) {
            $li.addClass(this.options.lastItemClass);
        }
    }

    $ul.children('li').click(function () {
        var $this = $(this);
        self.selectItem($this);
    }).mousedown(function () {
        self.finishOnBlur_ = false;
    }).mouseup(function () {
        self.finishOnBlur_ = true;
    });

    // Alway recalculate position before showing since window size or
    // input element location may have changed. This fixes #14
    this.position();

    this._results.html($ul).show();
    extraWidth = this._results.outerWidth() - this._results.width();
    this._results.width(this._element.outerWidth() - extraWidth);
    $('li', this._results).hover(
        function () { self.focusItem(this); },
        function () { /* void */ }
    );
    if (this.autoFill(first, filter)) {
        this.focusItem($first);
    }
};

AutoCompleter.prototype.showResult = function (value, data) {
    if ($.isFunction(this.options.showResult)) {
        return this.options.showResult(value, data);
    } else {
        return value;
    }
};

AutoCompleter.prototype.autoFill = function (value, filter) {
    var lcValue, lcFilter, valueLength, filterLength;
    if (this.options.autoFill && this.lastKeyPressed_ !== 8) {
        lcValue = String(value).toLowerCase();
        lcFilter = String(filter).toLowerCase();
        valueLength = value.length;
        filterLength = filter.length;
        if (lcValue.substr(0, filterLength) === lcFilter) {
            this._element.val(value);
            this.selectRange(filterLength, valueLength);
            return true;
        }
    }
    return false;
};

AutoCompleter.prototype.focusNext = function () {
    this.focusMove(+1);
};

AutoCompleter.prototype.focusPrev = function () {
    this.focusMove(-1);
};

AutoCompleter.prototype.focusMove = function (modifier) {
    var $items = $('li', this._results);
    modifier = parseInt(modifier, 10);
    for (var i = 0; i < $items.length; i++) {
        if ($($items[i]).hasClass(this.selectClass_)) {
            this.focusItem(i + modifier);
            return;
        }
    }
    this.focusItem(0);
};

AutoCompleter.prototype.focusItem = function (item) {
    var $item, $items = $('li', this._results);
    if ($items.length) {
        $items.removeClass(this.selectClass_).removeClass(this.options.selectClass);
        if (typeof item === 'number') {
            item = parseInt(item, 10);
            if (item < 0) {
                item = 0;
            } else if (item >= $items.length) {
                item = $items.length - 1;
            }
            $item = $($items[item]);
        } else {
            $item = $(item);
        }
        if ($item) {
            $item.addClass(this.selectClass_).addClass(this.options.selectClass);
        }
    }
};

AutoCompleter.prototype.selectCurrent = function () {
    var $item = $('li.' + this.selectClass_, this._results);
    if ($item.length === 1) {
        this.selectItem($item);
    } else {
        this.finish();
    }
};

AutoCompleter.prototype.selectItem = function ($li) {
    var value = $li.data('value');
    var data = $li.data('data');
    var displayValue = this.displayValue(value, data);
    this.lastProcessedValue_ = displayValue;
    this.lastSelectedValue_ = displayValue;

    this.setValue(displayValue);

    this.setCaret(this._element.val().length);
    this.callHook('onItemSelect', { value: value, data: data });
    this.finish();
};

/**
 * @return {boolean} true if the symbol matches something that is
 *                   considered content and false otherwise
 * @param {string} symbol - a single char string
 */
AutoCompleter.prototype.isContentChar = function (symbol) {
    if (symbol.match(this.options.stopCharRegex)) {
        return false;
    } else if (symbol === this.options.multipleSeparator) {
        return false;
    } else {
        return true;
    }
};

/**
 * takes value from the input box
 * and saves _selection_start and _selection_end coordinates
 * respects settings autocompleteMultiple and
 * multipleSeparator
 * @return {string} the current word in the
 * autocompletable word
 */
AutoCompleter.prototype.getValue = function () {
    var sel = this._element.getSelection();
    var text = this._element.val();
    var pos = sel.start;//estimated start
    //find real start
    var start = pos;
    for (cpos = pos; cpos >= 0; cpos = cpos - 1) {
        if (cpos === text.length) {
            continue;
        }
        var symbol_start = text.charAt(cpos);
        if (!this.isContentChar(symbol_start)) {
            break;
        }
        start = cpos;
    }
    //find real end
    var end = pos;
    for (cpos = pos; cpos < text.length; cpos = cpos + 1) {
        if (cpos === 0) {
            continue;
        }
        var symbol_end = text.charAt(cpos);
        if (!this.isContentChar(symbol_end)) {
            break;
        }
        end = cpos;
    }
    this._selection_start = start;
    this._selection_end = end;
    return text.substring(start, end);
};

/**
 * sets value of the input box
 * by replacing the previous selection
 * with the value from the autocompleter
 */
AutoCompleter.prototype.setValue = function (val) {
    var prefix = this._element.val().substring(0, this._selection_start);
    var postfix = this._element.val().substring(this._selection_end + 1);
    this._element.val(prefix + val + postfix);
};

AutoCompleter.prototype.displayValue = function (value, data) {
    if ($.isFunction(this.options.displayValue)) {
        return this.options.displayValue(value, data);
    } else {
        return value;
    }
};

AutoCompleter.prototype.finish = function () {
    if (this.keyTimeout_) {
        clearTimeout(this.keyTimeout_);
    }
    if (this._element.val() !== this.lastSelectedValue_) {
        if (this.options.mustMatch) {
            this._element.val('');
        }
        this.callHook('onNoMatch');
    }
    this._results.hide();
    this.lastKeyPressed_ = null;
    this.lastProcessedValue_ = null;
    if (this.active_) {
        this.callHook('onFinish');
    }
    this.active_ = false;
};

AutoCompleter.prototype.selectRange = function (start, end) {
    var input = this._element.get(0);
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(start, end);
    } else if (this.createTextRange) {
        var range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
    }
};

AutoCompleter.prototype.setCaret = function (pos) {
    this.selectRange(pos, pos);
};


/**
 * Switches the UI language while keeping user on the same
 * page
 */
var LangNav = function() {
    WrappedElement.call(this);
};
inherits(LangNav, WrappedElement);

LangNav.prototype.translateUrl = function(url, lang) {
    var result;
    $.ajax({
        type: 'GET',
        url: askbot['urls']['translateUrl'],
        data: {'url': url, 'language': lang },
        async: false,
        cache: false,
        dataType: 'json',
        success: function(data) {
            if (data['url']) {
                result = data['url'];
            }
        }
    });
    return result;
};

LangNav.prototype.handleUrl = function(url) {
    window.location.href = url;
};

LangNav.prototype.getNavHandler = function(link) {
    var me = this;
    return function() {
        var lang = link.data('lang');
        var url = window.location.pathname;
        //resolve url in current language
        url = me.translateUrl(url, lang) || link.attr('href');
        me.handleUrl(url, lang);
        //if resolution is successful, redirect to that url
        return false;
    };
};

LangNav.prototype.decorate = function(element) {
    this._element = element;
    var links = element.find('li>a');
    var len = links.length;
    for (var i=0; i<len; i++) {
        var link = $(links[i]);
        setupButtonEventHandlers(link, this.getNavHandler(link));
    }
};

Hilite={elementid:"content",exact:true,max_nodes:1000,onload:true,style_name:"hilite",style_name_suffix:true,debug_referrer:""};Hilite.search_engines=[["google\\.","q"],["search\\.yahoo\\.","p"],["search\\.msn\\.","q"],["search\\.live\\.","query"],["search\\.aol\\.","userQuery"],["ask\\.com","q"],["altavista\\.","q"],["feedster\\.","q"],["search\\.lycos\\.","q"],["alltheweb\\.","q"],["technorati\\.com/search/([^\\?/]+)",1],["dogpile\\.com/info\\.dogpl/search/web/([^\\?/]+)",1,true]];Hilite.decodeReferrer=function(d){var g=null;var e=new RegExp("");for(var c=0;c<Hilite.search_engines.length;c++){var f=Hilite.search_engines[c];e.compile("^http://(www\\.)?"+f[0],"i");var b=d.match(e);if(b){var a;if(isNaN(f[1])){a=Hilite.decodeReferrerQS(d,f[1])}else{a=b[f[1]+1]}if(a){a=decodeURIComponent(a);if(f.length>2&&f[2]){a=decodeURIComponent(a)}a=a.replace(/\'|"/g,"");a=a.split(/[\s,\+\.]+/);return a}break}}return null};Hilite.decodeReferrerQS=function(f,d){var b=f.indexOf("?");var c;if(b>=0){var a=new String(f.substring(b+1));b=0;c=0;while((b>=0)&&((c=a.indexOf("=",b))>=0)){var e,g;e=a.substring(b,c);b=a.indexOf("&",c)+1;if(e==d){if(b<=0){return a.substring(c+1)}else{return a.substring(c+1,b-1)}}else{if(b<=0){return null}}}}return null};Hilite.hiliteElement=function(f,e){if(!e||f.childNodes.length==0){return}var c=new Array();for(var b=0;b<e.length;b++){e[b]=e[b].toLowerCase();if(Hilite.exact){c.push("\\b"+e[b]+"\\b")}else{c.push(e[b])}}c=new RegExp(c.join("|"),"i");var a={};for(var b=0;b<e.length;b++){if(Hilite.style_name_suffix){a[e[b]]=Hilite.style_name+(b+1)}else{a[e[b]]=Hilite.style_name}}var d=function(m){var j=c.exec(m.data);if(j){var n=j[0];var i="";var h=m.splitText(j.index);var g=h.splitText(n.length);var l=m.ownerDocument.createElement("SPAN");m.parentNode.replaceChild(l,h);l.className=a[n.toLowerCase()];l.appendChild(h);return l}else{return m}};Hilite.walkElements(f.childNodes[0],1,d)};Hilite.hilite=function(){var a=Hilite.debug_referrer?Hilite.debug_referrer:document.referrer;var b=null;a=Hilite.decodeReferrer(a);if(a&&((Hilite.elementid&&(b=document.getElementById(Hilite.elementid)))||(b=document.body))){Hilite.hiliteElement(b,a)}};Hilite.walkElements=function(d,f,e){var a=/^(script|style|textarea)/i;var c=0;while(d&&f>0){c++;if(c>=Hilite.max_nodes){var b=function(){Hilite.walkElements(d,f,e)};setTimeout(b,50);return}if(d.nodeType==1){if(!a.test(d.tagName)&&d.childNodes.length>0){d=d.childNodes[0];f++;continue}}else{if(d.nodeType==3){d=e(d)}}if(d.nextSibling){d=d.nextSibling}else{while(f>0){d=d.parentNode;f--;if(d.nextSibling){d=d.nextSibling;break}}}}};if(Hilite.onload){if(window.attachEvent){window.attachEvent("onload",Hilite.hilite)}else{if(window.addEventListener){window.addEventListener("load",Hilite.hilite,false)}else{var __onload=window.onload;window.onload=function(){Hilite.hilite();__onload()}}}};
if(!this.JSON) {this.JSON={}}(function () {function f(n) {return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function") {Date.prototype.toJSON=function (key) {return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function (key) {return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string) {escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function (a) {var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder) {var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function") {value=value.toJSON(key)}if(typeof rep==="function") {value=rep.call(holder,key,value)}switch(typeof value) {case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value) {return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]") {length=value.length;for(i=0;i<length;i+=1) {partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object") {length=rep.length;for(i=0;i<length;i+=1) {k=rep[i];if(typeof k==="string") {v=str(k,value);if(v) {partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value) {if(Object.hasOwnProperty.call(value,k)) {v=str(k,value);if(v) {partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function") {JSON.stringify=function (value,replacer,space) {var i;gap="";indent="";if(typeof space==="number") {for(i=0;i<space;i+=1) {indent+=" "}}else{if(typeof space==="string") {indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")) {throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function") {JSON.parse=function (text,reviver) {var j;function walk(holder,key) {var k,v,value=holder[key];if(value&&typeof value==="object") {for(k in value) {if(Object.hasOwnProperty.call(value,k)) {v=walk(value,k);if(v!==undefined) {value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)) {text=text.replace(cx,function (a) {return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))) {j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

/*
 * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
 * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
 */

(function() {

	var fieldSelection = {

		getSelection: function() {

			var e = this.jquery ? this[0] : this;

			return (

				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					var l = e.selectionEnd - e.selectionStart;
					return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
				}) ||

				/* exploder */
				(document.selection && function() {

					e.focus();

					var r = document.selection.createRange();
					if (r == null) {
						return { start: 0, end: e.value.length, length: 0 }
					}

					var re = e.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint('EndToStart', re);

					return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
				}) ||

				/* browser not supported */
				function() {
					return { start: 0, end: e.value.length, length: 0 };
				}

			)();

		},

		replaceSelection: function() {

			var e = this.jquery ? this[0] : this;
			var text = arguments[0] || '';

			return (

				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
					return this;
				}) ||

				/* exploder */
				(document.selection && function() {
					e.focus();
					document.selection.createRange().text = text;
					return this;
				}) ||

				/* browser not supported */
				function() {
					e.value += text;
					return this;
				}

			)();

		}

	};

	jQuery.each(fieldSelection, function(i) { jQuery.fn[i] = this; });

})();

/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.11.1
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: gettext("ago"),
        suffixFromNow: gettext("from now"),
        seconds: gettext("just now"),
        minute: gettext("about a minute"),
        minutes: gettext("%d min"),
        hour: gettext("about an hour"),
        hours: gettext("%d h"),
        day: gettext("yesterday"),
        days: gettext("%d days"),
        month: gettext("about a month"),
        months: gettext("%d months"),
        year: gettext("about a year"),
        years: gettext("%d years"),
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator === undefined ?  " " : $l.wordSeparator;
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    var distanceMillis = distance(date);
    var seconds = Math.abs(distanceMillis) / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;
    var months = [
        gettext('Jan'),
        gettext('Feb'),
        gettext('Mar'),
        gettext('Apr'),
        gettext('May'),
        gettext('Jun'),
        gettext('Jul'),
        gettext('Aug'),
        gettext('Sep'),
        gettext('Oct'),
        gettext('Nov'),
        gettext('Dec')
    ];
    //todo: rewrite this in javascript
    if (days > 2){
        var month_date = months[date.getMonth()] + ' ' + date.getDate()
        if (years == 0){
            //how to do this in js???
            return month_date;
        } else {
            return month_date + ' ' + "'" + date.getYear() % 20;
        }
    } else if (days == 2) {
        return gettext('2 days ago')
    } else if (days == 1) {
        return gettext('yesterday')
    } else if (minutes >= 60) {
        var wholeHours = Math.floor(hours);
        return interpolate(
                    ngettext(
                        '%s hour ago',
                        '%s hours ago',
                        wholeHours
                    ),
                    [wholeHours,]
                )
    } else if (seconds > 90){
        var wholeMinutes = Math.floor(minutes);
        return interpolate(
                    ngettext(
                        '%s min ago',
                        '%s mins ago',
                        wholeMinutes
                    ),
                    [wholeMinutes,]
                )
    } else {
        return gettext('just now')
    }
  }

  function distance(date) {
    return (new Date() - date);
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}(jQuery));

var SearchDropMenu = function () {
    WrappedElement.call(this);
    this._data = undefined;
    this._selectedItemIndex = 0;
    this._askButtonEnabled = true;
};
inherits(SearchDropMenu, WrappedElement);

SearchDropMenu.prototype.setData = function (data) {
    this._data = data;
};

SearchDropMenu.prototype.setAskHandler = function (handler) {
    this._askHandler = handler;
};

SearchDropMenu.prototype.setSearchWidget = function (widget) {
    this._searchWidget = widget;
};

SearchDropMenu.prototype.getSearchWidget = function () {
    return this._searchWidget;
};

SearchDropMenu.prototype.setAskButtonEnabled = function (isEnabled) {
    this._askButtonEnabled = isEnabled;
};

/**
 * assumes that data is already set
 */
SearchDropMenu.prototype.render = function () {
    var list = this._resultsList;
    list.empty();
    var me = this;
    $.each(this._data, function (idx, item) {
        var listItem = me.makeElement('li');
        var link = me.makeElement('a');
        link.attr('href', item.url);
        link.html(item.title);
        listItem.append(link);
        list.append(listItem);
    });
    if (this._data.length === 0) {
        list.addClass('empty');
        this._element.addClass('empty');
    } else {
        list.removeClass('empty');
        this._element.removeClass('empty');
    }
};

SearchDropMenu.prototype.clearSelectedItem = function () {
    this._selectedItemIndex = 0;
    this._resultsList.find('li').removeClass('selected');
};

/**
 * @param {number} idx position of item starting from 1 for the topmost
 * Selects item inentified by position.
 * Scrolls the list to make top of the item visible.
 */
SearchDropMenu.prototype.selectItem = function (idx) {
    //idx is 1-based index
    this._selectedItemIndex = idx;
    var list = this._resultsList;
    list.find('li').removeClass('selected');
    var item = this.getItem(idx);
    if (item && idx > 0) {
        item.addClass('selected');
        var itemTopY = item.position().top;//relative to visible area
        var curScrollTop = list.scrollTop();

        /* if item is clipped on top, scroll down */
        if (itemTopY < 0) {
            list.scrollTop(curScrollTop + itemTopY);
            return;
        }

        var listHeight = list.outerHeight();
        /* pixels above the lower border of the list */
        var itemPeepHeight = listHeight - itemTopY;
        /* pixels below the lower border */
        var itemSinkHeight = item.outerHeight() - itemPeepHeight;
        if (itemSinkHeight > 0) {
            list.scrollTop(curScrollTop + itemSinkHeight);
        }
    }

};

SearchDropMenu.prototype.getItem = function (idx) {
    return $(this._resultsList.find('li')[idx - 1]);
};

SearchDropMenu.prototype.getItemCount = function () {
    return this._resultsList.find('li').length;
};

SearchDropMenu.prototype.getSelectedItemIndex = function () {
    return this._selectedItemIndex;
};

SearchDropMenu.prototype.navigateToItem = function (idx) {
    var item = this.getItem(idx);
    if (item) {
        window.location.href = item.find('a').attr('href');
    }
};

SearchDropMenu.prototype.makeKeyHandler = function () {
    var me = this;
    return function (e) {
        var keyCode = getKeyCode(e);
        if (keyCode === 27) {//escape
            me.hide();
            return false;
        }
        if (keyCode !== 38 && keyCode !== 40 && keyCode !== 13) {
            return;
        }
        var itemCount = me.getItemCount();
        if (itemCount > 0) {
            //count is 0 with no title matches, curItem is 0 when none is selected
            var curItem = me.getSelectedItemIndex();
            if (keyCode === 38) {//upArrow
                if (curItem > 0) {
                    curItem = curItem - 1;
                }
            } else if (keyCode === 40) {//downArrow
                if (curItem < itemCount) {
                    curItem = curItem + 1;
                }
            } else if (keyCode === 13) {//enter
                if (curItem === 0) {
                    return true;
                } else {
                    me.navigateToItem(curItem);
                    return false;
                }
            }

            var widget = me.getSearchWidget();
            if (curItem === 0) {
                //activate key handlers on input box
                widget.setFullTextSearchEnabled(true);
                me.clearSelectedItem();
            } else {
                //deactivate key handlers on input box
                widget.setFullTextSearchEnabled(false);
                me.selectItem(curItem);
            }
            return false;
        }
    };
};

/** todo: change this to state management as >1 thing happens */
SearchDropMenu.prototype.showWaitIcon = function () {
    if (this._askButtonEnabled) {
        this._waitIcon.show();
        this._footer.hide();
        this._element.addClass('empty');
    }
    this._element.addClass('waiting');
};

SearchDropMenu.prototype.hideWaitIcon = function () {
    if (this._askButtonEnabled) {
        this._waitIcon.hide();
        this._footer.show();
        this._element.removeClass('empty');
    }
    this._element.removeClass('waiting');
};

SearchDropMenu.prototype.hideHeader = function () {
    if (this._header) {
        this._header.hide();
    }
};

SearchDropMenu.prototype.showHeader = function () {
    if (this._header) {
        this._header.show();
    }
};

SearchDropMenu.prototype.createDom = function () {
    this._element = this.makeElement('div');
    this._element.addClass('search-drop-menu');
    this._element.hide();

    if (askbot.data.languageCode === 'ja') {
        var warning = this.makeElement('p');
        this._header = warning;
        warning.addClass('header');
        warning.html(gettext('To see search results, 2 or more characters may be required'));
        this._element.append(warning);
    }

    this._resultsList = this.makeElement('ul');
    this._element.append(this._resultsList);
    this._element.addClass('empty');

    var waitIcon = new WaitIcon();
    waitIcon.hide();
    this._element.append(waitIcon.getElement());
    this._waitIcon = waitIcon;

    //add ask button, @todo: make into separate class?
    var footer = this.makeElement('div');
    this._element.append(footer);
    this._footer = footer;

    if (this._askButtonEnabled) {
        footer.addClass('footer');
        var button = this.makeElement('button');
        button.addClass('submit btn btn-default');
        button.html(gettext('Ask Your Question'));
        footer.append(button);
        var handler = this._askHandler;
        setupButtonEventHandlers(button, handler);
    }

    $(document).keydown(this.makeKeyHandler());
};

SearchDropMenu.prototype.isOpen = function () {
    return this._element.is(':visible');
};

SearchDropMenu.prototype.show = function () {
    var searchBar = this.getSearchWidget();
    var searchBarHeight = searchBar.getWidgetHeight();
    var topOffset = searchBar.getElement().offset().top + searchBarHeight;
    this._element.show();//show so that size calcs work
    var footerHeight = this._footer.outerHeight();
    var windowHeight = $(window).height();
    this._resultsList.css(
        'max-height',
        windowHeight - topOffset - footerHeight - 40 //what is this number?
    );
};

SearchDropMenu.prototype.hide = function () {
    this._element.hide();
};

SearchDropMenu.prototype.reset = function () {
    this._data = undefined;
    this._resultsList.empty();
    this._selectedItemIndex = 0;
    this._element.hide();
};

var TagWarningBox = function () {
    WrappedElement.call(this);
    this._tags = [];
};
inherits(TagWarningBox, WrappedElement);

TagWarningBox.prototype.createDom = function () {
    this._element = this.makeElement('div');
    this._element.css('display', 'block');
    this._element.css('margin', '0 0 13px 2px');
    this._element.addClass('non-existing-tags');
    this._warning = this.makeElement('p');
    this._element.append(this._warning);
    this._tag_container = this.makeElement('ul');
    this._tag_container.addClass('tags');
    this._element.append(this._tag_container);
    this._element.append($('<div class="clearfix"></div>'));
    this._element.hide();
};

TagWarningBox.prototype.clear = function () {
    this._tags = [];
    if (this._tag_container) {
        this._tag_container.empty();
    }
    this._warning.hide();
    this._element.hide();
};

TagWarningBox.prototype.addTag = function (tag_name) {
    var tag = new Tag();
    tag.setName(tag_name);
    tag.setLinkable(false);
    tag.setDeletable(false);
    var elem = this.getElement();
    this._tag_container.append(tag.getElement());
    this._tag_container.css('display', 'block');
    this._tags.push(tag);
    elem.show();
};

TagWarningBox.prototype.showWarning = function () {
    this._warning.html(
        ngettext(
            'Sorry, this tag does not exist',
            'Sorry, these tags do not exist',
            this._tags.length
        )
    );
    this._warning.show();
};

/**
 * @constructor
 * tool tip to be shown on top of the search input
 */
var InputToolTip = function () {
    WrappedElement.call(this);
    this._promptText = gettext('search or ask your question');
};
inherits(InputToolTip, WrappedElement);

InputToolTip.prototype.show = function () {
    this._element.removeClass('dimmed');
    this._element.show();
};

InputToolTip.prototype.hide = function () {
    this._element.removeClass('dimmed');
    this._element.hide();
};

InputToolTip.prototype.dim = function () {
    this._element.addClass('dimmed');
};

InputToolTip.prototype.setPromptText = function (text) {
    this._promptText = text;
};

InputToolTip.prototype.setClickHandler = function (handler) {
    this._clickHandler = handler;
};

InputToolTip.prototype.createDom = function () {
    var element = this.makeElement('div');
    this._element = element;
    element.addClass('input-tool-tip');
    element.html(this._promptText);
    this.decorate(element);
};

InputToolTip.prototype.decorate = function (element) {
    this._element = element;
    var handler = this._clickHandler;
    var me = this;
    element.click(function () {
        handler();
        me.dim();
        return false;
    });
    $(document).click(function () {
        if (element.css('display') === 'block') {
            element.removeClass('dimmed');
        }
    });
};


/**
 * @constructor
 * provides full text search functionality
 * which re-draws contents of the main page
 * in response to the search query
 */
var FullTextSearch = function () {
    WrappedElement.call(this);
    this._running = false;
    this._baseUrl = askbot.urls.questions;
    this._q_list_sel = 'question-list';//id of question listing div
    /** @todo: the questions/ needs translation... */
    this._searchUrl = '/scope:all/sort:activity-desc/page:1/';
    this._askButtonEnabled = true;
    this._fullTextSearchEnabled = true;
};
inherits(FullTextSearch, WrappedElement);

/**
 * @param {{boolean=}} optional, if given then function is setter
 * otherwise it is a getter
 * isRunning returns `true` when search is running
 */
FullTextSearch.prototype.isRunning = function (val) {
    if (val === undefined) {
        return this._running;
    } else {
        this._running = val;
    }
};

FullTextSearch.prototype.setAskButtonEnabled = function (isEnabled) {
    this._askButtonEnabled = isEnabled;
};

/**
 * @param {{string}} url for the page displaying search results
 */
FullTextSearch.prototype.setSearchUrl = function (url) {
    this._searchUrl = url;
};

FullTextSearch.prototype.getSearchUrl = function () {
    return this._searchUrl;
};

FullTextSearch.prototype.renderTagWarning = function (tag_list) {
    if (!tag_list) {
        return;
    }
    var tagWarningBox = this._tag_warning_box;
    tagWarningBox.clear();
    $.each(tag_list, function (idx, tag_name) {
        tagWarningBox.addTag(tag_name);
    });
    tagWarningBox.showWarning();
};

FullTextSearch.prototype.runTagSearch = function () {
    var search_tags = $('#ab-tag-search').val().split(/\s+/);
    if (search_tags.length === 0) {
        return;
    }
    var searchUrl = this.getSearchUrl();
    //add all tags to the url
    searchUrl = QSutils.add_search_tag(searchUrl, search_tags);
    var url = this._baseUrl + searchUrl;
    var me = this;
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data, text_status, xhr) {
            me.renderFullTextSearchResult(data, text_status, xhr);
            $('#ab-tag-search').val('');
        }
    });
    this.updateHistory(url);
};

FullTextSearch.prototype.updateHistory = function (url) {
    var context = { state:1, rand:Math.random() };
    History.pushState(context, 'Questions', url);
    setTimeout(function () {
            /* HACK: For some weird reson, sometimes
             * overrides the above pushState so we re-aplly it
             * This might be caused by some other JS plugin.
             * The delay of 10msec allows the other plugin to override the URL.
             */
            History.replaceState(context, 'Questions', url);
        },
        10
    );
};

FullTextSearch.prototype.activateTagSearchInput = function () {
    //the autocomplete is set up in tag_selector.js
    var button = $('#ab-tag-search-add');
    if (button.length === 0) {//may be absent
        return;
    }
    var me = this;
    var ac = new AutoCompleter({
        url: askbot.urls.get_tag_list,
        minChars: 1,
        useCache: true,
        matchInside: true,
        maxCacheLength: 100,
        maxItemsToShow: 20,
        onItemSelect: function () { me.runTagSearch(); },
        delay: 10
    });
    ac.decorate($('#ab-tag-search'));
    setupButtonEventHandlers(
        button,
        function () { me.runTagSearch(); }
    );
};

FullTextSearch.prototype.sendTitleSearchQuery = function (query_text) {
    this.isRunning(true);
    this._prevText = query_text;
    var data = {query_text: query_text};
    var me = this;
    $.ajax({
        url: askbot.urls.apiGetQuestions,
        data: data,
        dataType: 'json',
        success: function (data, text_status, xhr) {
            me.renderTitleSearchResult(data, text_status, xhr);
        },
        complete: function () {
            me.isRunning(false);
            me.evalTitleSearchQuery();
        },
        cache: false
    });
};


FullTextSearch.prototype.sendFullTextSearchQuery = function (query_text) {
    this.isRunning(true);
    var searchUrl = this.getSearchUrl();
    var prevText = this._prevText;
    if (!prevText && query_text && askbot.settings.showSortByRelevance) {
        /* If there was no query but there is some
         * query now - and we support relevance search
         * - then switch to it
         */
        searchUrl = QSutils.patch_query_string(
                        searchUrl, 'sort:relevance-desc'
                    );
    }
    this._prevText = this.updateQueryString(query_text);

    /* if something has changed, then reset the page no. */
    searchUrl = QSutils.patch_query_string(searchUrl, 'page:1');
    var url = this._baseUrl + searchUrl;
    var me = this;
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data, text_status, xhr) {
            me.renderFullTextSearchResult(data, text_status, xhr);
        },
        complete: function () {
            me.isRunning(false);
        },
        cache: false
    });
    this.updateHistory(url);
};

FullTextSearch.prototype.refresh = function () {
    this.sendFullTextSearchQuery();/* used for tag search, maybe not necessary */
};

FullTextSearch.prototype.getSearchQuery = function () {
    return $.trim(this._query.val());
};

FullTextSearch.prototype.getWidgetHeight = function () {
    return this._element.outerHeight();
};

/**
 * renders title search result in the dropdown under the search input
 */
FullTextSearch.prototype.renderTitleSearchResult = function (data) {
    var menu = this._dropMenu;
    menu.hideWaitIcon();
    if (data.length > 0) {
        menu.hideHeader();
    }
    menu.setData(data);
    menu.render();
    menu.show();
};

FullTextSearch.prototype.renderFullTextSearchResult = function (data) {
    if (data.questions.length === 0) {
        return;
    }

    $('#pager').toggle(data.paginator !== '').html(data.paginator);
    $('#questionCount').html(data.question_counter);
    this.renderSearchTags(data.query_data.tags, data.query_string);
    if (data.faces.length > 0) {
        $('#contrib-users > a').remove();
        $('#contrib-users').append(data.faces.join(''));
    }
    this.renderRelatedTags(data.related_tags_html);
    this.renderRelevanceSortTab(data.query_string);
    this.renderTagWarning(data.non_existing_tags);
    this.setActiveSortTab(
        data.query_data.sort_order,
        data.query_string
    );
    if (data.feed_url) {
        // Change RSS URL
        $('#ContentLeft a.rss:first').attr('href', data.feed_url);
    }

    // Patch scope selectors
    var baseUrl = this._baseUrl;
    $('#scopeWrapper > a.scope-selector').each(function (index) {
        var old_qs = $(this).attr('href').replace(baseUrl, '');
        var scope = QSutils.get_query_string_selector_value(old_qs, 'scope');
        qs = QSutils.patch_query_string(data.query_string, 'scope:' + scope);
        $(this).attr('href', baseUrl + qs);
    });

    // Patch "Ask your question"
    var askButton = $('#askButton');
    var askHrefBase = askButton.attr('href').split('?')[0];
    askButton.attr(
        'href',
        askHrefBase + data.query_data.ask_query_string
    ); /* INFO: ask_query_string should already be URL-encoded! */

    this._query.focus();

    var old_list = $('#' + this._q_list_sel);
    var new_list = $('<div></div>').hide().html(data.questions);
    new_list.find('.timeago').timeago();

    var q_list_sel = this._q_list_sel;
    old_list.stop(true).after(new_list).fadeOut(200, function () {
        //show new div with a fadeIn effect
        old_list.remove();
        new_list.attr('id', q_list_sel);
        new_list.fadeIn(400);
    });
};

FullTextSearch.prototype.evalTitleSearchQuery = function () {
    var cur_query = this.getSearchQuery();
    var prevText = this._prevText;
    if (cur_query !== prevText && this.isRunning() === false) {
        if (cur_query.length >= askbot.settings.minSearchWordLength) {
            this.sendTitleSearchQuery(cur_query);
        } else if (cur_query.length === 0) {
            this.reset();
        }
    }
};

FullTextSearch.prototype.reset = function () {
    this._prevText = '';
    this._dropMenu.reset();
    this._element.val('');
    this._element.focus();
    this._xButton.hide();
};

FullTextSearch.prototype.refreshXButton = function () {
    if (this.getSearchQuery().length > 0) {
        if (this._query.hasClass('searchInput')) {
            $('#searchBar').addClass('cancelable');
            this._xButton.show();
        }
    } else {
        this._xButton.hide();
        $('#searchBar').removeClass('cancelable');
    }
};

FullTextSearch.prototype.updateQueryString = function (query_text) {
    if (query_text === undefined) { // handle missing parameter
        query_text = this.getSearchQuery();
    }
    var newUrl = QSutils.patch_query_string(
        this._searchUrl,
        'query:' + encodeURIComponent(query_text),
        query_text === ''   // remove if empty
    );
    this.setSearchUrl(newUrl);
    return query_text;
};

FullTextSearch.prototype.renderRelatedTags = function (tags_html) {
    $('.js-related-tags').html(tags_html);
};

FullTextSearch.prototype.renderSearchTags = function (tags, query_string) {
    var search_tags = $('#searchTags');
    search_tags.empty();
    var me = this;
    if (tags.length === 0) {
        $('#listSearchTags').hide();
        $('#search-tips').hide();//wrong - if there are search users
    } else {
        $('#listSearchTags').show();
        $('#search-tips').show();
        $.each(tags, function (idx, tag_name) {
            var el;
            var tag = new Tag();
            tag.setName(tag_name);
            tag.setLinkable(false);
            tag.setDeletable(true);
            tag.setDeleteHandler(
                function () {
                    me.removeSearchTag(tag_name, query_string);
                }
            );
            el = tag.getElement();
            // test if the Tag gets appended to a list
            if (search_tags.prop('tagName') === 'UL') {
                // wrap returns original element
                el = el.wrap('<li></li>').parent();
            }
            search_tags.append(el);
        });
    }
};

FullTextSearch.prototype.createRelevanceTab = function (query_string) {
    var relevance_tab = $('<a></a>');
    href = this._baseUrl + QSutils.patch_query_string(query_string, 'sort:relevance-desc');
    relevance_tab.attr('href', href);
    relevance_tab.attr('id', 'by_relevance');
    relevance_tab.html(
        '<span>' + askbot.data.sortButtonData.relevance.label + '</span>'
    );
    return relevance_tab;
};

FullTextSearch.prototype.removeSearchTag = function (tag) {
    var searchUrl = this.getSearchUrl();
    searchUrl = QSutils.remove_search_tag(searchUrl, tag);
    this.setSearchUrl(searchUrl);
    this.sendFullTextSearchQuery();
};

FullTextSearch.prototype.setActiveSortTab = function (sort_method, query_string) {
    var tabs = $('#sort_tabs > a');
    tabs.attr('class', 'off');
    var baseUrl = this._baseUrl;
    tabs.each(function (index, element) {
        var tab = $(element);
        if (tab.attr('id')) {
            var tab_name = tab.attr('id').replace(/^by_/, '');
            if (tab_name in askbot.data.sortButtonData) {
                href = baseUrl + QSutils.patch_query_string(
                                        query_string,
                                        'sort:' + tab_name + '-desc'
                                    );
                tab.attr('href', href);
                tab.attr(
                    'title',
                    askbot.data.sortButtonData[tab_name].desc_tooltip
                );
                tab.html(
                    askbot.data.sortButtonData[tab_name].label
                );
            }
        }
    });
    var bits = sort_method.split('-', 2);
    var name = bits[0];
    var sense = bits[1];//sense of sort
    var antisense = (sense === 'asc' ? 'desc' : 'asc');
    var arrow = (sense === 'asc' ? ' &#9650;' : ' &#9660;');
    var active_tab = $('#by_' + name);
    active_tab.attr('class', 'on');
    active_tab.attr(
        'title',
        askbot.data.sortButtonData[name][antisense + '_tooltip']
    );
    active_tab.html(
        askbot.data.sortButtonData[name].label + arrow
    );
};

FullTextSearch.prototype.renderRelevanceSortTab = function (query_string) {
    if (askbot.settings.showSortByRelevance === false) {
        return;
    }
    var relevance_tab = $('#by_relevance');
    var prevText = this._prevText;
    if (prevText && prevText.length > 0) {
        if (relevance_tab.length === 0) {
            relevance_tab = this.createRelevanceTab(query_string);
            $('#sort_tabs>span').after(relevance_tab);
        }
    } else {
        if (relevance_tab.length > 0) {
            relevance_tab.remove();
        }
    }
};

FullTextSearch.prototype.makeAskHandler = function () {
    var me = this;
    return function () {
        var query = me.getSearchQuery();
        window.location.href = askbot.urls.ask + '?title=' + query;
        return false;
    };
};

FullTextSearch.prototype.setFullTextSearchEnabled = function (enabled) {
    this._fullTextSearchEnabled = enabled;
};

FullTextSearch.prototype.getFullTextSearchEnabled = function () {
    return this._fullTextSearchEnabled;
};

/**
 * keydown handler operates on the tooltip and the X button
 * also opens and closes drop menu according to the min search word threshold
 * keyup is not good enough, because in that case
 * tooltip will be displayed with the input box simultaneously
 */
FullTextSearch.prototype.makeKeyDownHandler = function () {
    var me = this;
    var xButton = this._xButton;
    var dropMenu = this._dropMenu;
    var formSubmitHandler = this.makeFormSubmitHandler();
    return function (e) {//don't like the keyup delay to
        var keyCode = getKeyCode(e);

        if (keyCode === 27) {//escape key
            if (dropMenu.isOpen() === false) {
                me.reset();
                return false;
            }
        } else if (keyCode === 13) {
            if (me.getFullTextSearchEnabled()) {
                formSubmitHandler(e);
                return false;
            } else {
                return true;
            }
        }

        var query = me.getSearchQuery();
        if (query.length) {
            me.refreshXButton();
            var minQueryLength = askbot.settings.minSearchWordLength;
            if (query.length === minQueryLength) {
                if (keyCode !== 8 && keyCode !== 48) {//del and backspace
                    /* we get here if we were expanding the query
                       past the minimum length to trigger search */
                    dropMenu.show();
                    dropMenu.showWaitIcon();
                    dropMenu.showHeader();
                } else {
                    //close drop menu if we were deleting the query
                    dropMenu.reset();
                }
            }
        }
    };
};

FullTextSearch.prototype.makeFormSubmitHandler = function () {
    var me = this;
    var baseUrl = me._baseUrl;
    return function (evt) {
        // if user clicks the button the s(h)e probably wants page reload,
        // so provide that experience but first update the query string
        me.updateQueryString();
        var searchUrl = me.getSearchUrl();
        evt.preventDefault();
        window.location.href = baseUrl + searchUrl;
    };
};

FullTextSearch.prototype.decorate = function (element) {
    this._element = element;/* this is a bit artificial we don't use _element */
    this._query = element;
    this._xButton = $('input[name=reset_query]');
    this._prevText = this.getSearchQuery();
    this._tag_warning_box = new TagWarningBox();

    var dropMenu = new SearchDropMenu();
    dropMenu.setSearchWidget(this);
    dropMenu.setAskHandler(this.makeAskHandler());
    dropMenu.setAskButtonEnabled(this._askButtonEnabled);
    this._dropMenu = dropMenu;
    $('div.search-bar').append(this._dropMenu.getElement());

    $(element).click(function (e) { return false; });
    $(document).click(function () { dropMenu.reset(); });

    //the tag search input is optional in askbot
    $('#ab-tag-search').parent().before(
        this._tag_warning_box.getElement()
    );

    // make search tags functional
    var search_tags = $('#searchTags .js-tag');
    var searchUrl = this.getSearchUrl();
    var me = this;
    $.each(search_tags, function (idx, element) {
        var tag = new Tag();
        tag.decorate($(element));
        //todo: setDeleteHandler and setHandler
        //must work after decorate & must have getName
        tag.setDeleteHandler(
            function () {
                me.removeSearchTag(tag.getName(), searchUrl);
            }
        );
    });
    // enable x button (search reset)
    this._xButton.click(function () {
        /* wrapped in closure because it's not yet defined at this point */
        me.reset();
    });
    this.refreshXButton();

    // enable query box
    var main_page_eval_handle;
    this._query.keydown(this.makeKeyDownHandler());
    this._query.keyup(function (e) {
        me.refreshXButton();
        if (me.isRunning() === false) {
            clearTimeout(main_page_eval_handle);
            main_page_eval_handle = setTimeout(
                function () { me.evalTitleSearchQuery(); },
                400
            );
        }
    });

    this.activateTagSearchInput();

    $('form#searchForm').submit(me.makeFormSubmitHandler());
};

/**
 * @constructor
 */
var TagSearch = function () {
    WrappedElement.call(this);
    this._isRunning = false;
};
inherits(TagSearch, WrappedElement);

TagSearch.prototype.getQuery = function () {
    return $.trim(this._element.val());
};

TagSearch.prototype.setQuery = function (val) {
    this._element.val(val);
};

TagSearch.prototype.getSort = function () {
    //todo: read it off the page
    var link = $('.tabBar a.on');
    if (link.length === 1) {
        var sort = link.attr('id').replace('sort_', '');
        if (sort === 'name' || sort === 'used') {
            return sort;
        }
    }
    return 'name';
};

TagSearch.prototype.getIsRunning = function () {
    return this._isRunning;
};

TagSearch.prototype.setIsRunning = function (val) {
    this._isRunning = val;
};

TagSearch.prototype.renderResult = function (html) {
    this._contentBox.html(html);
};

TagSearch.prototype.runSearch = function () {
    var query = this.getQuery();
    var data = {
        'query': query,
        'sort': this.getSort(),
        'page': '1'
    };
    var me = this;
    $.ajax({
        dataType: 'json',
        data: data,
        cache: false,
        url: askbot.urls.tags,
        success: function (data) {
            if (data.success) {
                me.renderResult(data.html);
                me.setIsRunning(false);
                //rerun if query changed meanwhile
                if (query !== me.getQuery()) {
                    me.runSearch();
                }
            }
        },
        error: function () { me.setIsRunning(false); }
    });
    me.setIsRunning(true);
};

TagSearch.prototype.makeKeyUpHandler = function () {
    var me = this;
    return function (evt) {
        var keyCode = getKeyCode(evt);
        if (me.getIsRunning() === false) {
            me.runSearch();
        }
    };
};

TagSearch.prototype.makeKeyDownHandler = function () {
    var me = this;
    var xButton = this._xButton;
    return function (evt) {
        var query = me.getQuery();
        var keyCode = getKeyCode(evt);
        if (keyCode === 27) {//escape
            me.setQuery('');
            xButton.hide();
            return;
        }
        if (keyCode === 8 || keyCode === 48) {//del or backspace
            if (query.length === 1) {
                xButton.hide();
            }
        } else {
            xButton.show();
        }
    };
};

TagSearch.prototype.reset = function () {
    if (this.getIsRunning() === false) {
        this.setQuery('');
        this._xButton.hide();
        this.runSearch();
        this._element.focus();
    }
};

TagSearch.prototype.decorate = function (element) {
    this._element = element;
    this._contentBox = $('#ContentLeft');
    this._xButton = $('input[name=reset_query]');
    element.keyup(this.makeKeyUpHandler());
    element.keydown(this.makeKeyDownHandler());

    var me = this;
    this._xButton.click(function () { me.reset(); });
};
