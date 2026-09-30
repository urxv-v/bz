var Yh=Object.create;var Si=Object.defineProperty;var Jh=Object.getOwnPropertyDescriptor;var e0=Object.getOwnPropertyNames;var t0=Object.getPrototypeOf,a0=Object.prototype.hasOwnProperty;var da=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),r0=(e,t)=>{for(var a in t)Si(e,a,{get:t[a],enumerable:!0})},o0=(e,t,a,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of e0(t))!a0.call(e,o)&&o!==a&&Si(e,o,{get:()=>t[o],enumerable:!(r=Jh(t,o))||r.enumerable});return e};var q=(e,t,a)=>(a=e!=null?Yh(t0(e)):{},o0(t||!e||!e.__esModule?Si(a,"default",{value:e,enumerable:!0}):a,e));var _c=da(J=>{"use strict";var Xo=Symbol.for("react.element"),n0=Symbol.for("react.portal"),l0=Symbol.for("react.fragment"),s0=Symbol.for("react.strict_mode"),i0=Symbol.for("react.profiler"),u0=Symbol.for("react.provider"),d0=Symbol.for("react.context"),c0=Symbol.for("react.forward_ref"),f0=Symbol.for("react.suspense"),p0=Symbol.for("react.memo"),m0=Symbol.for("react.lazy"),Tc=Symbol.iterator;function g0(e){return e===null||typeof e!="object"?null:(e=Tc&&e[Tc]||e["@@iterator"],typeof e=="function"?e:null)}var Ac={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Mc=Object.assign,Dc={};function Qr(e,t,a){this.props=e,this.context=t,this.refs=Dc,this.updater=a||Ac}Qr.prototype.isReactComponent={};Qr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Qr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Bc(){}Bc.prototype=Qr.prototype;function Ci(e,t,a){this.props=e,this.context=t,this.refs=Dc,this.updater=a||Ac}var Ii=Ci.prototype=new Bc;Ii.constructor=Ci;Mc(Ii,Qr.prototype);Ii.isPureReactComponent=!0;var Ec=Array.isArray,zc=Object.prototype.hasOwnProperty,wi={current:null},Nc={key:!0,ref:!0,__self:!0,__source:!0};function Oc(e,t,a){var r,o={},n=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(n=""+t.key),t)zc.call(t,r)&&!Nc.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=a;else if(1<s){for(var i=Array(s),c=0;c<s;c++)i[c]=arguments[c+2];o.children=i}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:Xo,type:e,key:n,ref:l,props:o,_owner:wi.current}}function h0(e,t){return{$$typeof:Xo,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ki(e){return typeof e=="object"&&e!==null&&e.$$typeof===Xo}function x0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return t[a]})}var Fc=/\/+/g;function bi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?x0(""+e.key):t.toString(36)}function Dl(e,t,a,r,o){var n=typeof e;(n==="undefined"||n==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(n){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Xo:case n0:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+bi(l,0):r,Ec(o)?(a="",e!=null&&(a=e.replace(Fc,"$&/")+"/"),Dl(o,t,a,"",function(c){return c})):o!=null&&(ki(o)&&(o=h0(o,a+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(Fc,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Ec(e))for(var s=0;s<e.length;s++){n=e[s];var i=r+bi(n,s);l+=Dl(n,t,a,i,o)}else if(i=g0(e),typeof i=="function")for(e=i.call(e),s=0;!(n=e.next()).done;)n=n.value,i=r+bi(n,s++),l+=Dl(n,t,a,i,o);else if(n==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Ml(e,t,a){if(e==null)return e;var r=[],o=0;return Dl(e,r,"","",function(n){return t.call(a,n,o++)}),r}function y0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var et={current:null},Bl={transition:null},v0={ReactCurrentDispatcher:et,ReactCurrentBatchConfig:Bl,ReactCurrentOwner:wi};function Uc(){throw Error("act(...) is not supported in production builds of React.")}J.Children={map:Ml,forEach:function(e,t,a){Ml(e,function(){t.apply(this,arguments)},a)},count:function(e){var t=0;return Ml(e,function(){t++}),t},toArray:function(e){return Ml(e,function(t){return t})||[]},only:function(e){if(!ki(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};J.Component=Qr;J.Fragment=l0;J.Profiler=i0;J.PureComponent=Ci;J.StrictMode=s0;J.Suspense=f0;J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=v0;J.act=Uc;J.cloneElement=function(e,t,a){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Mc({},e.props),o=e.key,n=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(n=t.ref,l=wi.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(i in t)zc.call(t,i)&&!Nc.hasOwnProperty(i)&&(r[i]=t[i]===void 0&&s!==void 0?s[i]:t[i])}var i=arguments.length-2;if(i===1)r.children=a;else if(1<i){s=Array(i);for(var c=0;c<i;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:Xo,type:e.type,key:o,ref:n,props:r,_owner:l}};J.createContext=function(e){return e={$$typeof:d0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:u0,_context:e},e.Consumer=e};J.createElement=Oc;J.createFactory=function(e){var t=Oc.bind(null,e);return t.type=e,t};J.createRef=function(){return{current:null}};J.forwardRef=function(e){return{$$typeof:c0,render:e}};J.isValidElement=ki;J.lazy=function(e){return{$$typeof:m0,_payload:{_status:-1,_result:e},_init:y0}};J.memo=function(e,t){return{$$typeof:p0,type:e,compare:t===void 0?null:t}};J.startTransition=function(e){var t=Bl.transition;Bl.transition={};try{e()}finally{Bl.transition=t}};J.unstable_act=Uc;J.useCallback=function(e,t){return et.current.useCallback(e,t)};J.useContext=function(e){return et.current.useContext(e)};J.useDebugValue=function(){};J.useDeferredValue=function(e){return et.current.useDeferredValue(e)};J.useEffect=function(e,t){return et.current.useEffect(e,t)};J.useId=function(){return et.current.useId()};J.useImperativeHandle=function(e,t,a){return et.current.useImperativeHandle(e,t,a)};J.useInsertionEffect=function(e,t){return et.current.useInsertionEffect(e,t)};J.useLayoutEffect=function(e,t){return et.current.useLayoutEffect(e,t)};J.useMemo=function(e,t){return et.current.useMemo(e,t)};J.useReducer=function(e,t,a){return et.current.useReducer(e,t,a)};J.useRef=function(e){return et.current.useRef(e)};J.useState=function(e){return et.current.useState(e)};J.useSyncExternalStore=function(e,t,a){return et.current.useSyncExternalStore(e,t,a)};J.useTransition=function(){return et.current.useTransition()};J.version="18.3.1"});var Re=da((FS,Hc)=>{"use strict";Hc.exports=_c()});var Zc=da(de=>{"use strict";function Ei(e,t){var a=e.length;e.push(t);e:for(;0<a;){var r=a-1>>>1,o=e[r];if(0<zl(o,t))e[r]=t,e[a]=o,a=r;else break e}}function zt(e){return e.length===0?null:e[0]}function Ol(e){if(e.length===0)return null;var t=e[0],a=e.pop();if(a!==t){e[0]=a;e:for(var r=0,o=e.length,n=o>>>1;r<n;){var l=2*(r+1)-1,s=e[l],i=l+1,c=e[i];if(0>zl(s,a))i<o&&0>zl(c,s)?(e[r]=c,e[i]=a,r=i):(e[r]=s,e[l]=a,r=l);else if(i<o&&0>zl(c,a))e[r]=c,e[i]=a,r=i;else break e}}return t}function zl(e,t){var a=e.sortIndex-t.sortIndex;return a!==0?a:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(qc=performance,de.unstable_now=function(){return qc.now()}):(Pi=Date,Wc=Pi.now(),de.unstable_now=function(){return Pi.now()-Wc});var qc,Pi,Wc,Zt=[],Fa=[],L0=1,wt=null,Ge=3,Ul=!1,Lr=!1,Qo=!1,Gc=typeof setTimeout=="function"?setTimeout:null,$c=typeof clearTimeout=="function"?clearTimeout:null,Vc=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Fi(e){for(var t=zt(Fa);t!==null;){if(t.callback===null)Ol(Fa);else if(t.startTime<=e)Ol(Fa),t.sortIndex=t.expirationTime,Ei(Zt,t);else break;t=zt(Fa)}}function Ai(e){if(Qo=!1,Fi(e),!Lr)if(zt(Zt)!==null)Lr=!0,Di(Mi);else{var t=zt(Fa);t!==null&&Bi(Ai,t.startTime-e)}}function Mi(e,t){Lr=!1,Qo&&(Qo=!1,$c(Zo),Zo=-1),Ul=!0;var a=Ge;try{for(Fi(t),wt=zt(Zt);wt!==null&&(!(wt.expirationTime>t)||e&&!Qc());){var r=wt.callback;if(typeof r=="function"){wt.callback=null,Ge=wt.priorityLevel;var o=r(wt.expirationTime<=t);t=de.unstable_now(),typeof o=="function"?wt.callback=o:wt===zt(Zt)&&Ol(Zt),Fi(t)}else Ol(Zt);wt=zt(Zt)}if(wt!==null)var n=!0;else{var l=zt(Fa);l!==null&&Bi(Ai,l.startTime-t),n=!1}return n}finally{wt=null,Ge=a,Ul=!1}}var _l=!1,Nl=null,Zo=-1,Xc=5,Kc=-1;function Qc(){return!(de.unstable_now()-Kc<Xc)}function Ri(){if(Nl!==null){var e=de.unstable_now();Kc=e;var t=!0;try{t=Nl(!0,e)}finally{t?Ko():(_l=!1,Nl=null)}}else _l=!1}var Ko;typeof Vc=="function"?Ko=function(){Vc(Ri)}:typeof MessageChannel<"u"?(Ti=new MessageChannel,jc=Ti.port2,Ti.port1.onmessage=Ri,Ko=function(){jc.postMessage(null)}):Ko=function(){Gc(Ri,0)};var Ti,jc;function Di(e){Nl=e,_l||(_l=!0,Ko())}function Bi(e,t){Zo=Gc(function(){e(de.unstable_now())},t)}de.unstable_IdlePriority=5;de.unstable_ImmediatePriority=1;de.unstable_LowPriority=4;de.unstable_NormalPriority=3;de.unstable_Profiling=null;de.unstable_UserBlockingPriority=2;de.unstable_cancelCallback=function(e){e.callback=null};de.unstable_continueExecution=function(){Lr||Ul||(Lr=!0,Di(Mi))};de.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Xc=0<e?Math.floor(1e3/e):5};de.unstable_getCurrentPriorityLevel=function(){return Ge};de.unstable_getFirstCallbackNode=function(){return zt(Zt)};de.unstable_next=function(e){switch(Ge){case 1:case 2:case 3:var t=3;break;default:t=Ge}var a=Ge;Ge=t;try{return e()}finally{Ge=a}};de.unstable_pauseExecution=function(){};de.unstable_requestPaint=function(){};de.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var a=Ge;Ge=e;try{return t()}finally{Ge=a}};de.unstable_scheduleCallback=function(e,t,a){var r=de.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?r+a:r):a=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=a+o,e={id:L0++,callback:t,priorityLevel:e,startTime:a,expirationTime:o,sortIndex:-1},a>r?(e.sortIndex=a,Ei(Fa,e),zt(Zt)===null&&e===zt(Fa)&&(Qo?($c(Zo),Zo=-1):Qo=!0,Bi(Ai,a-r))):(e.sortIndex=o,Ei(Zt,e),Lr||Ul||(Lr=!0,Di(Mi))),e};de.unstable_shouldYield=Qc;de.unstable_wrapCallback=function(e){var t=Ge;return function(){var a=Ge;Ge=t;try{return e.apply(this,arguments)}finally{Ge=a}}}});var Jc=da((MS,Yc)=>{"use strict";Yc.exports=Zc()});var og=da(Lt=>{"use strict";var S0=Re(),yt=Jc();function D(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,a=1;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sp=new Set,Ln={};function Mr(e,t){yo(e,t),yo(e+"Capture",t)}function yo(e,t){for(Ln[e]=t,e=0;e<t.length;e++)sp.add(t[e])}var ha=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ou=Object.prototype.hasOwnProperty,b0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ef={},tf={};function C0(e){return ou.call(tf,e)?!0:ou.call(ef,e)?!1:b0.test(e)?tf[e]=!0:(ef[e]=!0,!1)}function I0(e,t,a,r){if(a!==null&&a.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:a!==null?!a.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function w0(e,t,a,r){if(t===null||typeof t>"u"||I0(e,t,a,r))return!0;if(r)return!1;if(a!==null)switch(a.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function rt(e,t,a,r,o,n,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=a,this.propertyName=e,this.type=t,this.sanitizeURL=n,this.removeEmptyString=l}var _e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){_e[e]=new rt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];_e[t]=new rt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){_e[e]=new rt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){_e[e]=new rt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){_e[e]=new rt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){_e[e]=new rt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){_e[e]=new rt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){_e[e]=new rt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){_e[e]=new rt(e,5,!1,e.toLowerCase(),null,!1,!1)});var Qu=/[\-:]([a-z])/g;function Zu(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Qu,Zu);_e[t]=new rt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Qu,Zu);_e[t]=new rt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Qu,Zu);_e[t]=new rt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){_e[e]=new rt(e,1,!1,e.toLowerCase(),null,!1,!1)});_e.xlinkHref=new rt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){_e[e]=new rt(e,1,!1,e.toLowerCase(),null,!0,!0)});function Yu(e,t,a,r){var o=_e.hasOwnProperty(t)?_e[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(w0(t,a,o,r)&&(a=null),r||o===null?C0(t)&&(a===null?e.removeAttribute(t):e.setAttribute(t,""+a)):o.mustUseProperty?e[o.propertyName]=a===null?o.type===3?!1:"":a:(t=o.attributeName,r=o.attributeNamespace,a===null?e.removeAttribute(t):(o=o.type,a=o===3||o===4&&a===!0?"":""+a,r?e.setAttributeNS(r,t,a):e.setAttribute(t,a))))}var La=S0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Hl=Symbol.for("react.element"),Jr=Symbol.for("react.portal"),eo=Symbol.for("react.fragment"),Ju=Symbol.for("react.strict_mode"),nu=Symbol.for("react.profiler"),ip=Symbol.for("react.provider"),up=Symbol.for("react.context"),ed=Symbol.for("react.forward_ref"),lu=Symbol.for("react.suspense"),su=Symbol.for("react.suspense_list"),td=Symbol.for("react.memo"),Ma=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var dp=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var af=Symbol.iterator;function Yo(e){return e===null||typeof e!="object"?null:(e=af&&e[af]||e["@@iterator"],typeof e=="function"?e:null)}var Se=Object.assign,zi;function ln(e){if(zi===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);zi=t&&t[1]||""}return`
`+zi+e}var Ni=!1;function Oi(e,t){if(!e||Ni)return"";Ni=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),n=r.stack.split(`
`),l=o.length-1,s=n.length-1;1<=l&&0<=s&&o[l]!==n[s];)s--;for(;1<=l&&0<=s;l--,s--)if(o[l]!==n[s]){if(l!==1||s!==1)do if(l--,s--,0>s||o[l]!==n[s]){var i=`
`+o[l].replace(" at new "," at ");return e.displayName&&i.includes("<anonymous>")&&(i=i.replace("<anonymous>",e.displayName)),i}while(1<=l&&0<=s);break}}}finally{Ni=!1,Error.prepareStackTrace=a}return(e=e?e.displayName||e.name:"")?ln(e):""}function k0(e){switch(e.tag){case 5:return ln(e.type);case 16:return ln("Lazy");case 13:return ln("Suspense");case 19:return ln("SuspenseList");case 0:case 2:case 15:return e=Oi(e.type,!1),e;case 11:return e=Oi(e.type.render,!1),e;case 1:return e=Oi(e.type,!0),e;default:return""}}function iu(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case eo:return"Fragment";case Jr:return"Portal";case nu:return"Profiler";case Ju:return"StrictMode";case lu:return"Suspense";case su:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case up:return(e.displayName||"Context")+".Consumer";case ip:return(e._context.displayName||"Context")+".Provider";case ed:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case td:return t=e.displayName||null,t!==null?t:iu(e.type)||"Memo";case Ma:t=e._payload,e=e._init;try{return iu(e(t))}catch{}}return null}function P0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return iu(t);case 8:return t===Ju?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function $a(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function cp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function R0(e){var t=cp(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var o=a.get,n=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,n.call(this,l)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ql(e){e._valueTracker||(e._valueTracker=R0(e))}function fp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),r="";return e&&(r=cp(e)?e.checked?"true":"false":e.value),e=r,e!==a?(t.setValue(e),!0):!1}function hs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function uu(e,t){var a=t.checked;return Se({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??e._wrapperState.initialChecked})}function rf(e,t){var a=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;a=$a(t.value!=null?t.value:a),e._wrapperState={initialChecked:r,initialValue:a,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function pp(e,t){t=t.checked,t!=null&&Yu(e,"checked",t,!1)}function du(e,t){pp(e,t);var a=$a(t.value),r=t.type;if(a!=null)r==="number"?(a===0&&e.value===""||e.value!=a)&&(e.value=""+a):e.value!==""+a&&(e.value=""+a);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?cu(e,t.type,a):t.hasOwnProperty("defaultValue")&&cu(e,t.type,$a(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function of(e,t,a){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,a||t===e.value||(e.value=t),e.defaultValue=t}a=e.name,a!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,a!==""&&(e.name=a)}function cu(e,t,a){(t!=="number"||hs(e.ownerDocument)!==e)&&(a==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+a&&(e.defaultValue=""+a))}var sn=Array.isArray;function fo(e,t,a,r){if(e=e.options,t){t={};for(var o=0;o<a.length;o++)t["$"+a[o]]=!0;for(a=0;a<e.length;a++)o=t.hasOwnProperty("$"+e[a].value),e[a].selected!==o&&(e[a].selected=o),o&&r&&(e[a].defaultSelected=!0)}else{for(a=""+$a(a),t=null,o=0;o<e.length;o++){if(e[o].value===a){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function fu(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(D(91));return Se({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function nf(e,t){var a=t.value;if(a==null){if(a=t.children,t=t.defaultValue,a!=null){if(t!=null)throw Error(D(92));if(sn(a)){if(1<a.length)throw Error(D(93));a=a[0]}t=a}t==null&&(t=""),a=t}e._wrapperState={initialValue:$a(a)}}function mp(e,t){var a=$a(t.value),r=$a(t.defaultValue);a!=null&&(a=""+a,a!==e.value&&(e.value=a),t.defaultValue==null&&e.defaultValue!==a&&(e.defaultValue=a)),r!=null&&(e.defaultValue=""+r)}function lf(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function gp(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function pu(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?gp(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Wl,hp=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,a,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,a,r,o)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Wl=Wl||document.createElement("div"),Wl.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Wl.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Sn(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var cn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},T0=["Webkit","ms","Moz","O"];Object.keys(cn).forEach(function(e){T0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),cn[t]=cn[e]})});function xp(e,t,a){return t==null||typeof t=="boolean"||t===""?"":a||typeof t!="number"||t===0||cn.hasOwnProperty(e)&&cn[e]?(""+t).trim():t+"px"}function yp(e,t){e=e.style;for(var a in t)if(t.hasOwnProperty(a)){var r=a.indexOf("--")===0,o=xp(a,t[a],r);a==="float"&&(a="cssFloat"),r?e.setProperty(a,o):e[a]=o}}var E0=Se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mu(e,t){if(t){if(E0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(D(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(D(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(D(61))}if(t.style!=null&&typeof t.style!="object")throw Error(D(62))}}function gu(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var hu=null;function ad(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xu=null,po=null,mo=null;function sf(e){if(e=Un(e)){if(typeof xu!="function")throw Error(D(280));var t=e.stateNode;t&&(t=Vs(t),xu(e.stateNode,e.type,t))}}function vp(e){po?mo?mo.push(e):mo=[e]:po=e}function Lp(){if(po){var e=po,t=mo;if(mo=po=null,sf(e),t)for(e=0;e<t.length;e++)sf(t[e])}}function Sp(e,t){return e(t)}function bp(){}var Ui=!1;function Cp(e,t,a){if(Ui)return e(t,a);Ui=!0;try{return Sp(e,t,a)}finally{Ui=!1,(po!==null||mo!==null)&&(bp(),Lp())}}function bn(e,t){var a=e.stateNode;if(a===null)return null;var r=Vs(a);if(r===null)return null;a=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(D(231,t,typeof a));return a}var yu=!1;if(ha)try{Zr={},Object.defineProperty(Zr,"passive",{get:function(){yu=!0}}),window.addEventListener("test",Zr,Zr),window.removeEventListener("test",Zr,Zr)}catch{yu=!1}var Zr;function F0(e,t,a,r,o,n,l,s,i){var c=Array.prototype.slice.call(arguments,3);try{t.apply(a,c)}catch(p){this.onError(p)}}var fn=!1,xs=null,ys=!1,vu=null,A0={onError:function(e){fn=!0,xs=e}};function M0(e,t,a,r,o,n,l,s,i){fn=!1,xs=null,F0.apply(A0,arguments)}function D0(e,t,a,r,o,n,l,s,i){if(M0.apply(this,arguments),fn){if(fn){var c=xs;fn=!1,xs=null}else throw Error(D(198));ys||(ys=!0,vu=c)}}function Dr(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Ip(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function uf(e){if(Dr(e)!==e)throw Error(D(188))}function B0(e){var t=e.alternate;if(!t){if(t=Dr(e),t===null)throw Error(D(188));return t!==e?null:e}for(var a=e,r=t;;){var o=a.return;if(o===null)break;var n=o.alternate;if(n===null){if(r=o.return,r!==null){a=r;continue}break}if(o.child===n.child){for(n=o.child;n;){if(n===a)return uf(o),e;if(n===r)return uf(o),t;n=n.sibling}throw Error(D(188))}if(a.return!==r.return)a=o,r=n;else{for(var l=!1,s=o.child;s;){if(s===a){l=!0,a=o,r=n;break}if(s===r){l=!0,r=o,a=n;break}s=s.sibling}if(!l){for(s=n.child;s;){if(s===a){l=!0,a=n,r=o;break}if(s===r){l=!0,r=n,a=o;break}s=s.sibling}if(!l)throw Error(D(189))}}if(a.alternate!==r)throw Error(D(190))}if(a.tag!==3)throw Error(D(188));return a.stateNode.current===a?e:t}function wp(e){return e=B0(e),e!==null?kp(e):null}function kp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=kp(e);if(t!==null)return t;e=e.sibling}return null}var Pp=yt.unstable_scheduleCallback,df=yt.unstable_cancelCallback,z0=yt.unstable_shouldYield,N0=yt.unstable_requestPaint,ke=yt.unstable_now,O0=yt.unstable_getCurrentPriorityLevel,rd=yt.unstable_ImmediatePriority,Rp=yt.unstable_UserBlockingPriority,vs=yt.unstable_NormalPriority,U0=yt.unstable_LowPriority,Tp=yt.unstable_IdlePriority,_s=null,ta=null;function _0(e){if(ta&&typeof ta.onCommitFiberRoot=="function")try{ta.onCommitFiberRoot(_s,e,void 0,(e.current.flags&128)===128)}catch{}}var Ht=Math.clz32?Math.clz32:W0,H0=Math.log,q0=Math.LN2;function W0(e){return e>>>=0,e===0?32:31-(H0(e)/q0|0)|0}var Vl=64,jl=4194304;function un(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ls(e,t){var a=e.pendingLanes;if(a===0)return 0;var r=0,o=e.suspendedLanes,n=e.pingedLanes,l=a&268435455;if(l!==0){var s=l&~o;s!==0?r=un(s):(n&=l,n!==0&&(r=un(n)))}else l=a&~o,l!==0?r=un(l):n!==0&&(r=un(n));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,n=t&-t,o>=n||o===16&&(n&4194240)!==0))return t;if((r&4)!==0&&(r|=a&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)a=31-Ht(t),o=1<<a,r|=e[a],t&=~o;return r}function V0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function j0(e,t){for(var a=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,n=e.pendingLanes;0<n;){var l=31-Ht(n),s=1<<l,i=o[l];i===-1?((s&a)===0||(s&r)!==0)&&(o[l]=V0(s,t)):i<=t&&(e.expiredLanes|=s),n&=~s}}function Lu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ep(){var e=Vl;return Vl<<=1,(Vl&4194240)===0&&(Vl=64),e}function _i(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Nn(e,t,a){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ht(t),e[t]=a}function G0(e,t){var a=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<a;){var o=31-Ht(a),n=1<<o;t[o]=0,r[o]=-1,e[o]=-1,a&=~n}}function od(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var r=31-Ht(a),o=1<<r;o&t|e[r]&t&&(e[r]|=t),a&=~o}}var oe=0;function Fp(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Ap,nd,Mp,Dp,Bp,Su=!1,Gl=[],Ua=null,_a=null,Ha=null,Cn=new Map,In=new Map,Ba=[],$0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function cf(e,t){switch(e){case"focusin":case"focusout":Ua=null;break;case"dragenter":case"dragleave":_a=null;break;case"mouseover":case"mouseout":Ha=null;break;case"pointerover":case"pointerout":Cn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":In.delete(t.pointerId)}}function Jo(e,t,a,r,o,n){return e===null||e.nativeEvent!==n?(e={blockedOn:t,domEventName:a,eventSystemFlags:r,nativeEvent:n,targetContainers:[o]},t!==null&&(t=Un(t),t!==null&&nd(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function X0(e,t,a,r,o){switch(t){case"focusin":return Ua=Jo(Ua,e,t,a,r,o),!0;case"dragenter":return _a=Jo(_a,e,t,a,r,o),!0;case"mouseover":return Ha=Jo(Ha,e,t,a,r,o),!0;case"pointerover":var n=o.pointerId;return Cn.set(n,Jo(Cn.get(n)||null,e,t,a,r,o)),!0;case"gotpointercapture":return n=o.pointerId,In.set(n,Jo(In.get(n)||null,e,t,a,r,o)),!0}return!1}function zp(e){var t=Cr(e.target);if(t!==null){var a=Dr(t);if(a!==null){if(t=a.tag,t===13){if(t=Ip(a),t!==null){e.blockedOn=t,Bp(e.priority,function(){Mp(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ls(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=bu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);hu=r,a.target.dispatchEvent(r),hu=null}else return t=Un(a),t!==null&&nd(t),e.blockedOn=a,!1;t.shift()}return!0}function ff(e,t,a){ls(e)&&a.delete(t)}function K0(){Su=!1,Ua!==null&&ls(Ua)&&(Ua=null),_a!==null&&ls(_a)&&(_a=null),Ha!==null&&ls(Ha)&&(Ha=null),Cn.forEach(ff),In.forEach(ff)}function en(e,t){e.blockedOn===t&&(e.blockedOn=null,Su||(Su=!0,yt.unstable_scheduleCallback(yt.unstable_NormalPriority,K0)))}function wn(e){function t(o){return en(o,e)}if(0<Gl.length){en(Gl[0],e);for(var a=1;a<Gl.length;a++){var r=Gl[a];r.blockedOn===e&&(r.blockedOn=null)}}for(Ua!==null&&en(Ua,e),_a!==null&&en(_a,e),Ha!==null&&en(Ha,e),Cn.forEach(t),In.forEach(t),a=0;a<Ba.length;a++)r=Ba[a],r.blockedOn===e&&(r.blockedOn=null);for(;0<Ba.length&&(a=Ba[0],a.blockedOn===null);)zp(a),a.blockedOn===null&&Ba.shift()}var go=La.ReactCurrentBatchConfig,Ss=!0;function Q0(e,t,a,r){var o=oe,n=go.transition;go.transition=null;try{oe=1,ld(e,t,a,r)}finally{oe=o,go.transition=n}}function Z0(e,t,a,r){var o=oe,n=go.transition;go.transition=null;try{oe=4,ld(e,t,a,r)}finally{oe=o,go.transition=n}}function ld(e,t,a,r){if(Ss){var o=bu(e,t,a,r);if(o===null)$i(e,t,r,bs,a),cf(e,r);else if(X0(o,e,t,a,r))r.stopPropagation();else if(cf(e,r),t&4&&-1<$0.indexOf(e)){for(;o!==null;){var n=Un(o);if(n!==null&&Ap(n),n=bu(e,t,a,r),n===null&&$i(e,t,r,bs,a),n===o)break;o=n}o!==null&&r.stopPropagation()}else $i(e,t,r,null,a)}}var bs=null;function bu(e,t,a,r){if(bs=null,e=ad(r),e=Cr(e),e!==null)if(t=Dr(e),t===null)e=null;else if(a=t.tag,a===13){if(e=Ip(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return bs=e,null}function Np(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(O0()){case rd:return 1;case Rp:return 4;case vs:case U0:return 16;case Tp:return 536870912;default:return 16}default:return 16}}var Na=null,sd=null,ss=null;function Op(){if(ss)return ss;var e,t=sd,a=t.length,r,o="value"in Na?Na.value:Na.textContent,n=o.length;for(e=0;e<a&&t[e]===o[e];e++);var l=a-e;for(r=1;r<=l&&t[a-r]===o[n-r];r++);return ss=o.slice(e,1<r?1-r:void 0)}function is(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function $l(){return!0}function pf(){return!1}function vt(e){function t(a,r,o,n,l){this._reactName=a,this._targetInst=o,this.type=r,this.nativeEvent=n,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(a=e[s],this[s]=a?a(n):n[s]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?$l:pf,this.isPropagationStopped=pf,this}return Se(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=$l)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=$l)},persist:function(){},isPersistent:$l}),t}var wo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},id=vt(wo),On=Se({},wo,{view:0,detail:0}),Y0=vt(On),Hi,qi,tn,Hs=Se({},On,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ud,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==tn&&(tn&&e.type==="mousemove"?(Hi=e.screenX-tn.screenX,qi=e.screenY-tn.screenY):qi=Hi=0,tn=e),Hi)},movementY:function(e){return"movementY"in e?e.movementY:qi}}),mf=vt(Hs),J0=Se({},Hs,{dataTransfer:0}),ex=vt(J0),tx=Se({},On,{relatedTarget:0}),Wi=vt(tx),ax=Se({},wo,{animationName:0,elapsedTime:0,pseudoElement:0}),rx=vt(ax),ox=Se({},wo,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),nx=vt(ox),lx=Se({},wo,{data:0}),gf=vt(lx),sx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ix={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ux={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dx(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ux[e])?!!t[e]:!1}function ud(){return dx}var cx=Se({},On,{key:function(e){if(e.key){var t=sx[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=is(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ix[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ud,charCode:function(e){return e.type==="keypress"?is(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?is(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),fx=vt(cx),px=Se({},Hs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hf=vt(px),mx=Se({},On,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ud}),gx=vt(mx),hx=Se({},wo,{propertyName:0,elapsedTime:0,pseudoElement:0}),xx=vt(hx),yx=Se({},Hs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),vx=vt(yx),Lx=[9,13,27,32],dd=ha&&"CompositionEvent"in window,pn=null;ha&&"documentMode"in document&&(pn=document.documentMode);var Sx=ha&&"TextEvent"in window&&!pn,Up=ha&&(!dd||pn&&8<pn&&11>=pn),xf=" ",yf=!1;function _p(e,t){switch(e){case"keyup":return Lx.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var to=!1;function bx(e,t){switch(e){case"compositionend":return Hp(t);case"keypress":return t.which!==32?null:(yf=!0,xf);case"textInput":return e=t.data,e===xf&&yf?null:e;default:return null}}function Cx(e,t){if(to)return e==="compositionend"||!dd&&_p(e,t)?(e=Op(),ss=sd=Na=null,to=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Up&&t.locale!=="ko"?null:t.data;default:return null}}var Ix={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ix[e.type]:t==="textarea"}function qp(e,t,a,r){vp(r),t=Cs(t,"onChange"),0<t.length&&(a=new id("onChange","change",null,a,r),e.push({event:a,listeners:t}))}var mn=null,kn=null;function wx(e){Jp(e,0)}function qs(e){var t=oo(e);if(fp(t))return e}function kx(e,t){if(e==="change")return t}var Wp=!1;ha&&(ha?(Kl="oninput"in document,Kl||(Vi=document.createElement("div"),Vi.setAttribute("oninput","return;"),Kl=typeof Vi.oninput=="function"),Xl=Kl):Xl=!1,Wp=Xl&&(!document.documentMode||9<document.documentMode));var Xl,Kl,Vi;function Lf(){mn&&(mn.detachEvent("onpropertychange",Vp),kn=mn=null)}function Vp(e){if(e.propertyName==="value"&&qs(kn)){var t=[];qp(t,kn,e,ad(e)),Cp(wx,t)}}function Px(e,t,a){e==="focusin"?(Lf(),mn=t,kn=a,mn.attachEvent("onpropertychange",Vp)):e==="focusout"&&Lf()}function Rx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qs(kn)}function Tx(e,t){if(e==="click")return qs(t)}function Ex(e,t){if(e==="input"||e==="change")return qs(t)}function Fx(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Wt=typeof Object.is=="function"?Object.is:Fx;function Pn(e,t){if(Wt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),r=Object.keys(t);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var o=a[r];if(!ou.call(t,o)||!Wt(e[o],t[o]))return!1}return!0}function Sf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function bf(e,t){var a=Sf(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=t&&r>=t)return{node:a,offset:t-e};e=r}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Sf(a)}}function jp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?jp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gp(){for(var e=window,t=hs();t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=hs(e.document)}return t}function cd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ax(e){var t=Gp(),a=e.focusedElem,r=e.selectionRange;if(t!==a&&a&&a.ownerDocument&&jp(a.ownerDocument.documentElement,a)){if(r!==null&&cd(a)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in a)a.selectionStart=t,a.selectionEnd=Math.min(e,a.value.length);else if(e=(t=a.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=a.textContent.length,n=Math.min(r.start,o);r=r.end===void 0?n:Math.min(r.end,o),!e.extend&&n>r&&(o=r,r=n,n=o),o=bf(a,n);var l=bf(a,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),n>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=a;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<t.length;a++)e=t[a],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Mx=ha&&"documentMode"in document&&11>=document.documentMode,ao=null,Cu=null,gn=null,Iu=!1;function Cf(e,t,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Iu||ao==null||ao!==hs(r)||(r=ao,"selectionStart"in r&&cd(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),gn&&Pn(gn,r)||(gn=r,r=Cs(Cu,"onSelect"),0<r.length&&(t=new id("onSelect","select",null,t,a),e.push({event:t,listeners:r}),t.target=ao)))}function Ql(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var ro={animationend:Ql("Animation","AnimationEnd"),animationiteration:Ql("Animation","AnimationIteration"),animationstart:Ql("Animation","AnimationStart"),transitionend:Ql("Transition","TransitionEnd")},ji={},$p={};ha&&($p=document.createElement("div").style,"AnimationEvent"in window||(delete ro.animationend.animation,delete ro.animationiteration.animation,delete ro.animationstart.animation),"TransitionEvent"in window||delete ro.transitionend.transition);function Ws(e){if(ji[e])return ji[e];if(!ro[e])return e;var t=ro[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in $p)return ji[e]=t[a];return e}var Xp=Ws("animationend"),Kp=Ws("animationiteration"),Qp=Ws("animationstart"),Zp=Ws("transitionend"),Yp=new Map,If="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ka(e,t){Yp.set(e,t),Mr(t,[e])}for(Zl=0;Zl<If.length;Zl++)Yl=If[Zl],wf=Yl.toLowerCase(),kf=Yl[0].toUpperCase()+Yl.slice(1),Ka(wf,"on"+kf);var Yl,wf,kf,Zl;Ka(Xp,"onAnimationEnd");Ka(Kp,"onAnimationIteration");Ka(Qp,"onAnimationStart");Ka("dblclick","onDoubleClick");Ka("focusin","onFocus");Ka("focusout","onBlur");Ka(Zp,"onTransitionEnd");yo("onMouseEnter",["mouseout","mouseover"]);yo("onMouseLeave",["mouseout","mouseover"]);yo("onPointerEnter",["pointerout","pointerover"]);yo("onPointerLeave",["pointerout","pointerover"]);Mr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Mr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Mr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Mr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Mr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Mr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var dn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dx=new Set("cancel close invalid load scroll toggle".split(" ").concat(dn));function Pf(e,t,a){var r=e.type||"unknown-event";e.currentTarget=a,D0(r,t,void 0,e),e.currentTarget=null}function Jp(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],o=r.event;r=r.listeners;e:{var n=void 0;if(t)for(var l=r.length-1;0<=l;l--){var s=r[l],i=s.instance,c=s.currentTarget;if(s=s.listener,i!==n&&o.isPropagationStopped())break e;Pf(o,s,c),n=i}else for(l=0;l<r.length;l++){if(s=r[l],i=s.instance,c=s.currentTarget,s=s.listener,i!==n&&o.isPropagationStopped())break e;Pf(o,s,c),n=i}}}if(ys)throw e=vu,ys=!1,vu=null,e}function fe(e,t){var a=t[Tu];a===void 0&&(a=t[Tu]=new Set);var r=e+"__bubble";a.has(r)||(em(t,e,2,!1),a.add(r))}function Gi(e,t,a){var r=0;t&&(r|=4),em(a,e,r,t)}var Jl="_reactListening"+Math.random().toString(36).slice(2);function Rn(e){if(!e[Jl]){e[Jl]=!0,sp.forEach(function(a){a!=="selectionchange"&&(Dx.has(a)||Gi(a,!1,e),Gi(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Jl]||(t[Jl]=!0,Gi("selectionchange",!1,t))}}function em(e,t,a,r){switch(Np(t)){case 1:var o=Q0;break;case 4:o=Z0;break;default:o=ld}a=o.bind(null,t,a,e),o=void 0,!yu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,a,{capture:!0,passive:o}):e.addEventListener(t,a,!0):o!==void 0?e.addEventListener(t,a,{passive:o}):e.addEventListener(t,a,!1)}function $i(e,t,a,r,o){var n=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var i=l.tag;if((i===3||i===4)&&(i=l.stateNode.containerInfo,i===o||i.nodeType===8&&i.parentNode===o))return;l=l.return}for(;s!==null;){if(l=Cr(s),l===null)return;if(i=l.tag,i===5||i===6){r=n=l;continue e}s=s.parentNode}}r=r.return}Cp(function(){var c=n,p=ad(a),m=[];e:{var h=Yp.get(e);if(h!==void 0){var L=id,f=e;switch(e){case"keypress":if(is(a)===0)break e;case"keydown":case"keyup":L=fx;break;case"focusin":f="focus",L=Wi;break;case"focusout":f="blur",L=Wi;break;case"beforeblur":case"afterblur":L=Wi;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":L=mf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":L=ex;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":L=gx;break;case Xp:case Kp:case Qp:L=rx;break;case Zp:L=xx;break;case"scroll":L=Y0;break;case"wheel":L=vx;break;case"copy":case"cut":case"paste":L=nx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":L=hf}var b=(t&4)!==0,E=!b&&e==="scroll",u=b?h!==null?h+"Capture":null:h;b=[];for(var d=c,g;d!==null;){g=d;var S=g.stateNode;if(g.tag===5&&S!==null&&(g=S,u!==null&&(S=bn(d,u),S!=null&&b.push(Tn(d,S,g)))),E)break;d=d.return}0<b.length&&(h=new L(h,f,null,a,p),m.push({event:h,listeners:b}))}}if((t&7)===0){e:{if(h=e==="mouseover"||e==="pointerover",L=e==="mouseout"||e==="pointerout",h&&a!==hu&&(f=a.relatedTarget||a.fromElement)&&(Cr(f)||f[xa]))break e;if((L||h)&&(h=p.window===p?p:(h=p.ownerDocument)?h.defaultView||h.parentWindow:window,L?(f=a.relatedTarget||a.toElement,L=c,f=f?Cr(f):null,f!==null&&(E=Dr(f),f!==E||f.tag!==5&&f.tag!==6)&&(f=null)):(L=null,f=c),L!==f)){if(b=mf,S="onMouseLeave",u="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(b=hf,S="onPointerLeave",u="onPointerEnter",d="pointer"),E=L==null?h:oo(L),g=f==null?h:oo(f),h=new b(S,d+"leave",L,a,p),h.target=E,h.relatedTarget=g,S=null,Cr(p)===c&&(b=new b(u,d+"enter",f,a,p),b.target=g,b.relatedTarget=E,S=b),E=S,L&&f)t:{for(b=L,u=f,d=0,g=b;g;g=Yr(g))d++;for(g=0,S=u;S;S=Yr(S))g++;for(;0<d-g;)b=Yr(b),d--;for(;0<g-d;)u=Yr(u),g--;for(;d--;){if(b===u||u!==null&&b===u.alternate)break t;b=Yr(b),u=Yr(u)}b=null}else b=null;L!==null&&Rf(m,h,L,b,!1),f!==null&&E!==null&&Rf(m,E,f,b,!0)}}e:{if(h=c?oo(c):window,L=h.nodeName&&h.nodeName.toLowerCase(),L==="select"||L==="input"&&h.type==="file")var T=kx;else if(vf(h))if(Wp)T=Ex;else{T=Rx;var k=Px}else(L=h.nodeName)&&L.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(T=Tx);if(T&&(T=T(e,c))){qp(m,T,a,p);break e}k&&k(e,h,c),e==="focusout"&&(k=h._wrapperState)&&k.controlled&&h.type==="number"&&cu(h,"number",h.value)}switch(k=c?oo(c):window,e){case"focusin":(vf(k)||k.contentEditable==="true")&&(ao=k,Cu=c,gn=null);break;case"focusout":gn=Cu=ao=null;break;case"mousedown":Iu=!0;break;case"contextmenu":case"mouseup":case"dragend":Iu=!1,Cf(m,a,p);break;case"selectionchange":if(Mx)break;case"keydown":case"keyup":Cf(m,a,p)}var w;if(dd)e:{switch(e){case"compositionstart":var F="onCompositionStart";break e;case"compositionend":F="onCompositionEnd";break e;case"compositionupdate":F="onCompositionUpdate";break e}F=void 0}else to?_p(e,a)&&(F="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(F="onCompositionStart");F&&(Up&&a.locale!=="ko"&&(to||F!=="onCompositionStart"?F==="onCompositionEnd"&&to&&(w=Op()):(Na=p,sd="value"in Na?Na.value:Na.textContent,to=!0)),k=Cs(c,F),0<k.length&&(F=new gf(F,e,null,a,p),m.push({event:F,listeners:k}),w?F.data=w:(w=Hp(a),w!==null&&(F.data=w)))),(w=Sx?bx(e,a):Cx(e,a))&&(c=Cs(c,"onBeforeInput"),0<c.length&&(p=new gf("onBeforeInput","beforeinput",null,a,p),m.push({event:p,listeners:c}),p.data=w))}Jp(m,t)})}function Tn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Cs(e,t){for(var a=t+"Capture",r=[];e!==null;){var o=e,n=o.stateNode;o.tag===5&&n!==null&&(o=n,n=bn(e,a),n!=null&&r.unshift(Tn(e,n,o)),n=bn(e,t),n!=null&&r.push(Tn(e,n,o))),e=e.return}return r}function Yr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Rf(e,t,a,r,o){for(var n=t._reactName,l=[];a!==null&&a!==r;){var s=a,i=s.alternate,c=s.stateNode;if(i!==null&&i===r)break;s.tag===5&&c!==null&&(s=c,o?(i=bn(a,n),i!=null&&l.unshift(Tn(a,i,s))):o||(i=bn(a,n),i!=null&&l.push(Tn(a,i,s)))),a=a.return}l.length!==0&&e.push({event:t,listeners:l})}var Bx=/\r\n?/g,zx=/\u0000|\uFFFD/g;function Tf(e){return(typeof e=="string"?e:""+e).replace(Bx,`
`).replace(zx,"")}function es(e,t,a){if(t=Tf(t),Tf(e)!==t&&a)throw Error(D(425))}function Is(){}var wu=null,ku=null;function Pu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ru=typeof setTimeout=="function"?setTimeout:void 0,Nx=typeof clearTimeout=="function"?clearTimeout:void 0,Ef=typeof Promise=="function"?Promise:void 0,Ox=typeof queueMicrotask=="function"?queueMicrotask:typeof Ef<"u"?function(e){return Ef.resolve(null).then(e).catch(Ux)}:Ru;function Ux(e){setTimeout(function(){throw e})}function Xi(e,t){var a=t,r=0;do{var o=a.nextSibling;if(e.removeChild(a),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(r===0){e.removeChild(o),wn(t);return}r--}else a!=="$"&&a!=="$?"&&a!=="$!"||r++;a=o}while(a);wn(t)}function qa(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ff(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}var ko=Math.random().toString(36).slice(2),ea="__reactFiber$"+ko,En="__reactProps$"+ko,xa="__reactContainer$"+ko,Tu="__reactEvents$"+ko,_x="__reactListeners$"+ko,Hx="__reactHandles$"+ko;function Cr(e){var t=e[ea];if(t)return t;for(var a=e.parentNode;a;){if(t=a[xa]||a[ea]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Ff(e);e!==null;){if(a=e[ea])return a;e=Ff(e)}return t}e=a,a=e.parentNode}return null}function Un(e){return e=e[ea]||e[xa],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function oo(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(D(33))}function Vs(e){return e[En]||null}var Eu=[],no=-1;function Qa(e){return{current:e}}function pe(e){0>no||(e.current=Eu[no],Eu[no]=null,no--)}function ce(e,t){no++,Eu[no]=e.current,e.current=t}var Xa={},Qe=Qa(Xa),ut=Qa(!1),Rr=Xa;function vo(e,t){var a=e.type.contextTypes;if(!a)return Xa;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},n;for(n in a)o[n]=t[n];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function dt(e){return e=e.childContextTypes,e!=null}function ws(){pe(ut),pe(Qe)}function Af(e,t,a){if(Qe.current!==Xa)throw Error(D(168));ce(Qe,t),ce(ut,a)}function tm(e,t,a){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return a;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(D(108,P0(e)||"Unknown",o));return Se({},a,r)}function ks(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Xa,Rr=Qe.current,ce(Qe,e),ce(ut,ut.current),!0}function Mf(e,t,a){var r=e.stateNode;if(!r)throw Error(D(169));a?(e=tm(e,t,Rr),r.__reactInternalMemoizedMergedChildContext=e,pe(ut),pe(Qe),ce(Qe,e)):pe(ut),ce(ut,a)}var fa=null,js=!1,Ki=!1;function am(e){fa===null?fa=[e]:fa.push(e)}function qx(e){js=!0,am(e)}function Za(){if(!Ki&&fa!==null){Ki=!0;var e=0,t=oe;try{var a=fa;for(oe=1;e<a.length;e++){var r=a[e];do r=r(!0);while(r!==null)}fa=null,js=!1}catch(o){throw fa!==null&&(fa=fa.slice(e+1)),Pp(rd,Za),o}finally{oe=t,Ki=!1}}return null}var lo=[],so=0,Ps=null,Rs=0,kt=[],Pt=0,Tr=null,pa=1,ma="";function Sr(e,t){lo[so++]=Rs,lo[so++]=Ps,Ps=e,Rs=t}function rm(e,t,a){kt[Pt++]=pa,kt[Pt++]=ma,kt[Pt++]=Tr,Tr=e;var r=pa;e=ma;var o=32-Ht(r)-1;r&=~(1<<o),a+=1;var n=32-Ht(t)+o;if(30<n){var l=o-o%5;n=(r&(1<<l)-1).toString(32),r>>=l,o-=l,pa=1<<32-Ht(t)+o|a<<o|r,ma=n+e}else pa=1<<n|a<<o|r,ma=e}function fd(e){e.return!==null&&(Sr(e,1),rm(e,1,0))}function pd(e){for(;e===Ps;)Ps=lo[--so],lo[so]=null,Rs=lo[--so],lo[so]=null;for(;e===Tr;)Tr=kt[--Pt],kt[Pt]=null,ma=kt[--Pt],kt[Pt]=null,pa=kt[--Pt],kt[Pt]=null}var xt=null,ht=null,he=!1,_t=null;function om(e,t){var a=Rt(5,null,null,0);a.elementType="DELETED",a.stateNode=t,a.return=e,t=e.deletions,t===null?(e.deletions=[a],e.flags|=16):t.push(a)}function Df(e,t){switch(e.tag){case 5:var a=e.type;return t=t.nodeType!==1||a.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,xt=e,ht=qa(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,xt=e,ht=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(a=Tr!==null?{id:pa,overflow:ma}:null,e.memoizedState={dehydrated:t,treeContext:a,retryLane:1073741824},a=Rt(18,null,null,0),a.stateNode=t,a.return=e,e.child=a,xt=e,ht=null,!0):!1;default:return!1}}function Fu(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Au(e){if(he){var t=ht;if(t){var a=t;if(!Df(e,t)){if(Fu(e))throw Error(D(418));t=qa(a.nextSibling);var r=xt;t&&Df(e,t)?om(r,a):(e.flags=e.flags&-4097|2,he=!1,xt=e)}}else{if(Fu(e))throw Error(D(418));e.flags=e.flags&-4097|2,he=!1,xt=e}}}function Bf(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xt=e}function ts(e){if(e!==xt)return!1;if(!he)return Bf(e),he=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Pu(e.type,e.memoizedProps)),t&&(t=ht)){if(Fu(e))throw nm(),Error(D(418));for(;t;)om(e,t),t=qa(t.nextSibling)}if(Bf(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(D(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"){if(t===0){ht=qa(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++}e=e.nextSibling}ht=null}}else ht=xt?qa(e.stateNode.nextSibling):null;return!0}function nm(){for(var e=ht;e;)e=qa(e.nextSibling)}function Lo(){ht=xt=null,he=!1}function md(e){_t===null?_t=[e]:_t.push(e)}var Wx=La.ReactCurrentBatchConfig;function an(e,t,a){if(e=a.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(D(309));var r=a.stateNode}if(!r)throw Error(D(147,e));var o=r,n=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===n?t.ref:(t=function(l){var s=o.refs;l===null?delete s[n]:s[n]=l},t._stringRef=n,t)}if(typeof e!="string")throw Error(D(284));if(!a._owner)throw Error(D(290,e))}return e}function as(e,t){throw e=Object.prototype.toString.call(t),Error(D(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function zf(e){var t=e._init;return t(e._payload)}function lm(e){function t(u,d){if(e){var g=u.deletions;g===null?(u.deletions=[d],u.flags|=16):g.push(d)}}function a(u,d){if(!e)return null;for(;d!==null;)t(u,d),d=d.sibling;return null}function r(u,d){for(u=new Map;d!==null;)d.key!==null?u.set(d.key,d):u.set(d.index,d),d=d.sibling;return u}function o(u,d){return u=Ga(u,d),u.index=0,u.sibling=null,u}function n(u,d,g){return u.index=g,e?(g=u.alternate,g!==null?(g=g.index,g<d?(u.flags|=2,d):g):(u.flags|=2,d)):(u.flags|=1048576,d)}function l(u){return e&&u.alternate===null&&(u.flags|=2),u}function s(u,d,g,S){return d===null||d.tag!==6?(d=au(g,u.mode,S),d.return=u,d):(d=o(d,g),d.return=u,d)}function i(u,d,g,S){var T=g.type;return T===eo?p(u,d,g.props.children,S,g.key):d!==null&&(d.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Ma&&zf(T)===d.type)?(S=o(d,g.props),S.ref=an(u,d,g),S.return=u,S):(S=gs(g.type,g.key,g.props,null,u.mode,S),S.ref=an(u,d,g),S.return=u,S)}function c(u,d,g,S){return d===null||d.tag!==4||d.stateNode.containerInfo!==g.containerInfo||d.stateNode.implementation!==g.implementation?(d=ru(g,u.mode,S),d.return=u,d):(d=o(d,g.children||[]),d.return=u,d)}function p(u,d,g,S,T){return d===null||d.tag!==7?(d=Pr(g,u.mode,S,T),d.return=u,d):(d=o(d,g),d.return=u,d)}function m(u,d,g){if(typeof d=="string"&&d!==""||typeof d=="number")return d=au(""+d,u.mode,g),d.return=u,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Hl:return g=gs(d.type,d.key,d.props,null,u.mode,g),g.ref=an(u,null,d),g.return=u,g;case Jr:return d=ru(d,u.mode,g),d.return=u,d;case Ma:var S=d._init;return m(u,S(d._payload),g)}if(sn(d)||Yo(d))return d=Pr(d,u.mode,g,null),d.return=u,d;as(u,d)}return null}function h(u,d,g,S){var T=d!==null?d.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return T!==null?null:s(u,d,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Hl:return g.key===T?i(u,d,g,S):null;case Jr:return g.key===T?c(u,d,g,S):null;case Ma:return T=g._init,h(u,d,T(g._payload),S)}if(sn(g)||Yo(g))return T!==null?null:p(u,d,g,S,null);as(u,g)}return null}function L(u,d,g,S,T){if(typeof S=="string"&&S!==""||typeof S=="number")return u=u.get(g)||null,s(d,u,""+S,T);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Hl:return u=u.get(S.key===null?g:S.key)||null,i(d,u,S,T);case Jr:return u=u.get(S.key===null?g:S.key)||null,c(d,u,S,T);case Ma:var k=S._init;return L(u,d,g,k(S._payload),T)}if(sn(S)||Yo(S))return u=u.get(g)||null,p(d,u,S,T,null);as(d,S)}return null}function f(u,d,g,S){for(var T=null,k=null,w=d,F=d=0,A=null;w!==null&&F<g.length;F++){w.index>F?(A=w,w=null):A=w.sibling;var C=h(u,w,g[F],S);if(C===null){w===null&&(w=A);break}e&&w&&C.alternate===null&&t(u,w),d=n(C,d,F),k===null?T=C:k.sibling=C,k=C,w=A}if(F===g.length)return a(u,w),he&&Sr(u,F),T;if(w===null){for(;F<g.length;F++)w=m(u,g[F],S),w!==null&&(d=n(w,d,F),k===null?T=w:k.sibling=w,k=w);return he&&Sr(u,F),T}for(w=r(u,w);F<g.length;F++)A=L(w,u,F,g[F],S),A!==null&&(e&&A.alternate!==null&&w.delete(A.key===null?F:A.key),d=n(A,d,F),k===null?T=A:k.sibling=A,k=A);return e&&w.forEach(function(N){return t(u,N)}),he&&Sr(u,F),T}function b(u,d,g,S){var T=Yo(g);if(typeof T!="function")throw Error(D(150));if(g=T.call(g),g==null)throw Error(D(151));for(var k=T=null,w=d,F=d=0,A=null,C=g.next();w!==null&&!C.done;F++,C=g.next()){w.index>F?(A=w,w=null):A=w.sibling;var N=h(u,w,C.value,S);if(N===null){w===null&&(w=A);break}e&&w&&N.alternate===null&&t(u,w),d=n(N,d,F),k===null?T=N:k.sibling=N,k=N,w=A}if(C.done)return a(u,w),he&&Sr(u,F),T;if(w===null){for(;!C.done;F++,C=g.next())C=m(u,C.value,S),C!==null&&(d=n(C,d,F),k===null?T=C:k.sibling=C,k=C);return he&&Sr(u,F),T}for(w=r(u,w);!C.done;F++,C=g.next())C=L(w,u,F,C.value,S),C!==null&&(e&&C.alternate!==null&&w.delete(C.key===null?F:C.key),d=n(C,d,F),k===null?T=C:k.sibling=C,k=C);return e&&w.forEach(function(W){return t(u,W)}),he&&Sr(u,F),T}function E(u,d,g,S){if(typeof g=="object"&&g!==null&&g.type===eo&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Hl:e:{for(var T=g.key,k=d;k!==null;){if(k.key===T){if(T=g.type,T===eo){if(k.tag===7){a(u,k.sibling),d=o(k,g.props.children),d.return=u,u=d;break e}}else if(k.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Ma&&zf(T)===k.type){a(u,k.sibling),d=o(k,g.props),d.ref=an(u,k,g),d.return=u,u=d;break e}a(u,k);break}else t(u,k);k=k.sibling}g.type===eo?(d=Pr(g.props.children,u.mode,S,g.key),d.return=u,u=d):(S=gs(g.type,g.key,g.props,null,u.mode,S),S.ref=an(u,d,g),S.return=u,u=S)}return l(u);case Jr:e:{for(k=g.key;d!==null;){if(d.key===k)if(d.tag===4&&d.stateNode.containerInfo===g.containerInfo&&d.stateNode.implementation===g.implementation){a(u,d.sibling),d=o(d,g.children||[]),d.return=u,u=d;break e}else{a(u,d);break}else t(u,d);d=d.sibling}d=ru(g,u.mode,S),d.return=u,u=d}return l(u);case Ma:return k=g._init,E(u,d,k(g._payload),S)}if(sn(g))return f(u,d,g,S);if(Yo(g))return b(u,d,g,S);as(u,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,d!==null&&d.tag===6?(a(u,d.sibling),d=o(d,g),d.return=u,u=d):(a(u,d),d=au(g,u.mode,S),d.return=u,u=d),l(u)):a(u,d)}return E}var So=lm(!0),sm=lm(!1),Ts=Qa(null),Es=null,io=null,gd=null;function hd(){gd=io=Es=null}function xd(e){var t=Ts.current;pe(Ts),e._currentValue=t}function Mu(e,t,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===a)break;e=e.return}}function ho(e,t){Es=e,gd=io=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(it=!0),e.firstContext=null)}function Et(e){var t=e._currentValue;if(gd!==e)if(e={context:e,memoizedValue:t,next:null},io===null){if(Es===null)throw Error(D(308));io=e,Es.dependencies={lanes:0,firstContext:e}}else io=io.next=e;return t}var Ir=null;function yd(e){Ir===null?Ir=[e]:Ir.push(e)}function im(e,t,a,r){var o=t.interleaved;return o===null?(a.next=a,yd(t)):(a.next=o.next,o.next=a),t.interleaved=a,ya(e,r)}function ya(e,t){e.lanes|=t;var a=e.alternate;for(a!==null&&(a.lanes|=t),a=e,e=e.return;e!==null;)e.childLanes|=t,a=e.alternate,a!==null&&(a.childLanes|=t),a=e,e=e.return;return a.tag===3?a.stateNode:null}var Da=!1;function vd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function um(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ga(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Wa(e,t,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(te&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,ya(e,a)}return o=r.interleaved,o===null?(t.next=t,yd(r)):(t.next=o.next,o.next=t),r.interleaved=t,ya(e,a)}function us(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,a|=r,t.lanes=a,od(e,a)}}function Nf(e,t){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var o=null,n=null;if(a=a.firstBaseUpdate,a!==null){do{var l={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};n===null?o=n=l:n=n.next=l,a=a.next}while(a!==null);n===null?o=n=t:n=n.next=t}else o=n=t;a={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:n,shared:r.shared,effects:r.effects},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}function Fs(e,t,a,r){var o=e.updateQueue;Da=!1;var n=o.firstBaseUpdate,l=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var i=s,c=i.next;i.next=null,l===null?n=c:l.next=c,l=i;var p=e.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==l&&(s===null?p.firstBaseUpdate=c:s.next=c,p.lastBaseUpdate=i))}if(n!==null){var m=o.baseState;l=0,p=c=i=null,s=n;do{var h=s.lane,L=s.eventTime;if((r&h)===h){p!==null&&(p=p.next={eventTime:L,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var f=e,b=s;switch(h=t,L=a,b.tag){case 1:if(f=b.payload,typeof f=="function"){m=f.call(L,m,h);break e}m=f;break e;case 3:f.flags=f.flags&-65537|128;case 0:if(f=b.payload,h=typeof f=="function"?f.call(L,m,h):f,h==null)break e;m=Se({},m,h);break e;case 2:Da=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,h=o.effects,h===null?o.effects=[s]:h.push(s))}else L={eventTime:L,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(c=p=L,i=m):p=p.next=L,l|=h;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;h=s,s=h.next,h.next=null,o.lastBaseUpdate=h,o.shared.pending=null}}while(!0);if(p===null&&(i=m),o.baseState=i,o.firstBaseUpdate=c,o.lastBaseUpdate=p,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else n===null&&(o.shared.lanes=0);Fr|=l,e.lanes=l,e.memoizedState=m}}function Of(e,t,a){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=a,typeof o!="function")throw Error(D(191,o));o.call(r)}}}var _n={},aa=Qa(_n),Fn=Qa(_n),An=Qa(_n);function wr(e){if(e===_n)throw Error(D(174));return e}function Ld(e,t){switch(ce(An,t),ce(Fn,e),ce(aa,_n),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:pu(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=pu(t,e)}pe(aa),ce(aa,t)}function bo(){pe(aa),pe(Fn),pe(An)}function dm(e){wr(An.current);var t=wr(aa.current),a=pu(t,e.type);t!==a&&(ce(Fn,e),ce(aa,a))}function Sd(e){Fn.current===e&&(pe(aa),pe(Fn))}var ve=Qa(0);function As(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Qi=[];function bd(){for(var e=0;e<Qi.length;e++)Qi[e]._workInProgressVersionPrimary=null;Qi.length=0}var ds=La.ReactCurrentDispatcher,Zi=La.ReactCurrentBatchConfig,Er=0,Le=null,Ae=null,Be=null,Ms=!1,hn=!1,Mn=0,Vx=0;function $e(){throw Error(D(321))}function Cd(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!Wt(e[a],t[a]))return!1;return!0}function Id(e,t,a,r,o,n){if(Er=n,Le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ds.current=e===null||e.memoizedState===null?Xx:Kx,e=a(r,o),hn){n=0;do{if(hn=!1,Mn=0,25<=n)throw Error(D(301));n+=1,Be=Ae=null,t.updateQueue=null,ds.current=Qx,e=a(r,o)}while(hn)}if(ds.current=Ds,t=Ae!==null&&Ae.next!==null,Er=0,Be=Ae=Le=null,Ms=!1,t)throw Error(D(300));return e}function wd(){var e=Mn!==0;return Mn=0,e}function Jt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Be===null?Le.memoizedState=Be=e:Be=Be.next=e,Be}function Ft(){if(Ae===null){var e=Le.alternate;e=e!==null?e.memoizedState:null}else e=Ae.next;var t=Be===null?Le.memoizedState:Be.next;if(t!==null)Be=t,Ae=e;else{if(e===null)throw Error(D(310));Ae=e,e={memoizedState:Ae.memoizedState,baseState:Ae.baseState,baseQueue:Ae.baseQueue,queue:Ae.queue,next:null},Be===null?Le.memoizedState=Be=e:Be=Be.next=e}return Be}function Dn(e,t){return typeof t=="function"?t(e):t}function Yi(e){var t=Ft(),a=t.queue;if(a===null)throw Error(D(311));a.lastRenderedReducer=e;var r=Ae,o=r.baseQueue,n=a.pending;if(n!==null){if(o!==null){var l=o.next;o.next=n.next,n.next=l}r.baseQueue=o=n,a.pending=null}if(o!==null){n=o.next,r=r.baseState;var s=l=null,i=null,c=n;do{var p=c.lane;if((Er&p)===p)i!==null&&(i=i.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var m={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};i===null?(s=i=m,l=r):i=i.next=m,Le.lanes|=p,Fr|=p}c=c.next}while(c!==null&&c!==n);i===null?l=r:i.next=s,Wt(r,t.memoizedState)||(it=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=i,a.lastRenderedState=r}if(e=a.interleaved,e!==null){o=e;do n=o.lane,Le.lanes|=n,Fr|=n,o=o.next;while(o!==e)}else o===null&&(a.lanes=0);return[t.memoizedState,a.dispatch]}function Ji(e){var t=Ft(),a=t.queue;if(a===null)throw Error(D(311));a.lastRenderedReducer=e;var r=a.dispatch,o=a.pending,n=t.memoizedState;if(o!==null){a.pending=null;var l=o=o.next;do n=e(n,l.action),l=l.next;while(l!==o);Wt(n,t.memoizedState)||(it=!0),t.memoizedState=n,t.baseQueue===null&&(t.baseState=n),a.lastRenderedState=n}return[n,r]}function cm(){}function fm(e,t){var a=Le,r=Ft(),o=t(),n=!Wt(r.memoizedState,o);if(n&&(r.memoizedState=o,it=!0),r=r.queue,kd(gm.bind(null,a,r,e),[e]),r.getSnapshot!==t||n||Be!==null&&Be.memoizedState.tag&1){if(a.flags|=2048,Bn(9,mm.bind(null,a,r,o,t),void 0,null),ze===null)throw Error(D(349));(Er&30)!==0||pm(a,t,o)}return o}function pm(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function mm(e,t,a,r){t.value=a,t.getSnapshot=r,hm(t)&&xm(e)}function gm(e,t,a){return a(function(){hm(t)&&xm(e)})}function hm(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!Wt(e,a)}catch{return!0}}function xm(e){var t=ya(e,1);t!==null&&qt(t,e,1,-1)}function Uf(e){var t=Jt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Dn,lastRenderedState:e},t.queue=e,e=e.dispatch=$x.bind(null,Le,e),[t.memoizedState,e]}function Bn(e,t,a,r){return e={tag:e,create:t,destroy:a,deps:r,next:null},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.lastEffect=e.next=e):(a=t.lastEffect,a===null?t.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,t.lastEffect=e)),e}function ym(){return Ft().memoizedState}function cs(e,t,a,r){var o=Jt();Le.flags|=e,o.memoizedState=Bn(1|t,a,void 0,r===void 0?null:r)}function Gs(e,t,a,r){var o=Ft();r=r===void 0?null:r;var n=void 0;if(Ae!==null){var l=Ae.memoizedState;if(n=l.destroy,r!==null&&Cd(r,l.deps)){o.memoizedState=Bn(t,a,n,r);return}}Le.flags|=e,o.memoizedState=Bn(1|t,a,n,r)}function _f(e,t){return cs(8390656,8,e,t)}function kd(e,t){return Gs(2048,8,e,t)}function vm(e,t){return Gs(4,2,e,t)}function Lm(e,t){return Gs(4,4,e,t)}function Sm(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bm(e,t,a){return a=a!=null?a.concat([e]):null,Gs(4,4,Sm.bind(null,t,e),a)}function Pd(){}function Cm(e,t){var a=Ft();t=t===void 0?null:t;var r=a.memoizedState;return r!==null&&t!==null&&Cd(t,r[1])?r[0]:(a.memoizedState=[e,t],e)}function Im(e,t){var a=Ft();t=t===void 0?null:t;var r=a.memoizedState;return r!==null&&t!==null&&Cd(t,r[1])?r[0]:(e=e(),a.memoizedState=[e,t],e)}function wm(e,t,a){return(Er&21)===0?(e.baseState&&(e.baseState=!1,it=!0),e.memoizedState=a):(Wt(a,t)||(a=Ep(),Le.lanes|=a,Fr|=a,e.baseState=!0),t)}function jx(e,t){var a=oe;oe=a!==0&&4>a?a:4,e(!0);var r=Zi.transition;Zi.transition={};try{e(!1),t()}finally{oe=a,Zi.transition=r}}function km(){return Ft().memoizedState}function Gx(e,t,a){var r=ja(e);if(a={lane:r,action:a,hasEagerState:!1,eagerState:null,next:null},Pm(e))Rm(t,a);else if(a=im(e,t,a,r),a!==null){var o=at();qt(a,e,r,o),Tm(a,t,r)}}function $x(e,t,a){var r=ja(e),o={lane:r,action:a,hasEagerState:!1,eagerState:null,next:null};if(Pm(e))Rm(t,o);else{var n=e.alternate;if(e.lanes===0&&(n===null||n.lanes===0)&&(n=t.lastRenderedReducer,n!==null))try{var l=t.lastRenderedState,s=n(l,a);if(o.hasEagerState=!0,o.eagerState=s,Wt(s,l)){var i=t.interleaved;i===null?(o.next=o,yd(t)):(o.next=i.next,i.next=o),t.interleaved=o;return}}catch{}finally{}a=im(e,t,o,r),a!==null&&(o=at(),qt(a,e,r,o),Tm(a,t,r))}}function Pm(e){var t=e.alternate;return e===Le||t!==null&&t===Le}function Rm(e,t){hn=Ms=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Tm(e,t,a){if((a&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,a|=r,t.lanes=a,od(e,a)}}var Ds={readContext:Et,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useInsertionEffect:$e,useLayoutEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useMutableSource:$e,useSyncExternalStore:$e,useId:$e,unstable_isNewReconciler:!1},Xx={readContext:Et,useCallback:function(e,t){return Jt().memoizedState=[e,t===void 0?null:t],e},useContext:Et,useEffect:_f,useImperativeHandle:function(e,t,a){return a=a!=null?a.concat([e]):null,cs(4194308,4,Sm.bind(null,t,e),a)},useLayoutEffect:function(e,t){return cs(4194308,4,e,t)},useInsertionEffect:function(e,t){return cs(4,2,e,t)},useMemo:function(e,t){var a=Jt();return t=t===void 0?null:t,e=e(),a.memoizedState=[e,t],e},useReducer:function(e,t,a){var r=Jt();return t=a!==void 0?a(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Gx.bind(null,Le,e),[r.memoizedState,e]},useRef:function(e){var t=Jt();return e={current:e},t.memoizedState=e},useState:Uf,useDebugValue:Pd,useDeferredValue:function(e){return Jt().memoizedState=e},useTransition:function(){var e=Uf(!1),t=e[0];return e=jx.bind(null,e[1]),Jt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,a){var r=Le,o=Jt();if(he){if(a===void 0)throw Error(D(407));a=a()}else{if(a=t(),ze===null)throw Error(D(349));(Er&30)!==0||pm(r,t,a)}o.memoizedState=a;var n={value:a,getSnapshot:t};return o.queue=n,_f(gm.bind(null,r,n,e),[e]),r.flags|=2048,Bn(9,mm.bind(null,r,n,a,t),void 0,null),a},useId:function(){var e=Jt(),t=ze.identifierPrefix;if(he){var a=ma,r=pa;a=(r&~(1<<32-Ht(r)-1)).toString(32)+a,t=":"+t+"R"+a,a=Mn++,0<a&&(t+="H"+a.toString(32)),t+=":"}else a=Vx++,t=":"+t+"r"+a.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Kx={readContext:Et,useCallback:Cm,useContext:Et,useEffect:kd,useImperativeHandle:bm,useInsertionEffect:vm,useLayoutEffect:Lm,useMemo:Im,useReducer:Yi,useRef:ym,useState:function(){return Yi(Dn)},useDebugValue:Pd,useDeferredValue:function(e){var t=Ft();return wm(t,Ae.memoizedState,e)},useTransition:function(){var e=Yi(Dn)[0],t=Ft().memoizedState;return[e,t]},useMutableSource:cm,useSyncExternalStore:fm,useId:km,unstable_isNewReconciler:!1},Qx={readContext:Et,useCallback:Cm,useContext:Et,useEffect:kd,useImperativeHandle:bm,useInsertionEffect:vm,useLayoutEffect:Lm,useMemo:Im,useReducer:Ji,useRef:ym,useState:function(){return Ji(Dn)},useDebugValue:Pd,useDeferredValue:function(e){var t=Ft();return Ae===null?t.memoizedState=e:wm(t,Ae.memoizedState,e)},useTransition:function(){var e=Ji(Dn)[0],t=Ft().memoizedState;return[e,t]},useMutableSource:cm,useSyncExternalStore:fm,useId:km,unstable_isNewReconciler:!1};function Ot(e,t){if(e&&e.defaultProps){t=Se({},t),e=e.defaultProps;for(var a in e)t[a]===void 0&&(t[a]=e[a]);return t}return t}function Du(e,t,a,r){t=e.memoizedState,a=a(r,t),a=a==null?t:Se({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var $s={isMounted:function(e){return(e=e._reactInternals)?Dr(e)===e:!1},enqueueSetState:function(e,t,a){e=e._reactInternals;var r=at(),o=ja(e),n=ga(r,o);n.payload=t,a!=null&&(n.callback=a),t=Wa(e,n,o),t!==null&&(qt(t,e,o,r),us(t,e,o))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var r=at(),o=ja(e),n=ga(r,o);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=Wa(e,n,o),t!==null&&(qt(t,e,o,r),us(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=at(),r=ja(e),o=ga(a,r);o.tag=2,t!=null&&(o.callback=t),t=Wa(e,o,r),t!==null&&(qt(t,e,r,a),us(t,e,r))}};function Hf(e,t,a,r,o,n,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,n,l):t.prototype&&t.prototype.isPureReactComponent?!Pn(a,r)||!Pn(o,n):!0}function Em(e,t,a){var r=!1,o=Xa,n=t.contextType;return typeof n=="object"&&n!==null?n=Et(n):(o=dt(t)?Rr:Qe.current,r=t.contextTypes,n=(r=r!=null)?vo(e,o):Xa),t=new t(a,n),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=$s,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=n),t}function qf(e,t,a,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,r),t.state!==e&&$s.enqueueReplaceState(t,t.state,null)}function Bu(e,t,a,r){var o=e.stateNode;o.props=a,o.state=e.memoizedState,o.refs={},vd(e);var n=t.contextType;typeof n=="object"&&n!==null?o.context=Et(n):(n=dt(t)?Rr:Qe.current,o.context=vo(e,n)),o.state=e.memoizedState,n=t.getDerivedStateFromProps,typeof n=="function"&&(Du(e,t,n,a),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&$s.enqueueReplaceState(o,o.state,null),Fs(e,a,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Co(e,t){try{var a="",r=t;do a+=k0(r),r=r.return;while(r);var o=a}catch(n){o=`
Error generating stack: `+n.message+`
`+n.stack}return{value:e,source:t,stack:o,digest:null}}function eu(e,t,a){return{value:e,source:null,stack:a??null,digest:t??null}}function zu(e,t){try{console.error(t.value)}catch(a){setTimeout(function(){throw a})}}var Zx=typeof WeakMap=="function"?WeakMap:Map;function Fm(e,t,a){a=ga(-1,a),a.tag=3,a.payload={element:null};var r=t.value;return a.callback=function(){zs||(zs=!0,Gu=r),zu(e,t)},a}function Am(e,t,a){a=ga(-1,a),a.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;a.payload=function(){return r(o)},a.callback=function(){zu(e,t)}}var n=e.stateNode;return n!==null&&typeof n.componentDidCatch=="function"&&(a.callback=function(){zu(e,t),typeof r!="function"&&(Va===null?Va=new Set([this]):Va.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),a}function Wf(e,t,a){var r=e.pingCache;if(r===null){r=e.pingCache=new Zx;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(a)||(o.add(a),e=cy.bind(null,e,t,a),t.then(e,e))}function Vf(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function jf(e,t,a,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(t=ga(-1,1),t.tag=2,Wa(a,t,1))),a.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var Yx=La.ReactCurrentOwner,it=!1;function tt(e,t,a,r){t.child=e===null?sm(t,null,a,r):So(t,e.child,a,r)}function Gf(e,t,a,r,o){a=a.render;var n=t.ref;return ho(t,o),r=Id(e,t,a,r,n,o),a=wd(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,va(e,t,o)):(he&&a&&fd(t),t.flags|=1,tt(e,t,r,o),t.child)}function $f(e,t,a,r,o){if(e===null){var n=a.type;return typeof n=="function"&&!Bd(n)&&n.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(t.tag=15,t.type=n,Mm(e,t,n,r,o)):(e=gs(a.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(n=e.child,(e.lanes&o)===0){var l=n.memoizedProps;if(a=a.compare,a=a!==null?a:Pn,a(l,r)&&e.ref===t.ref)return va(e,t,o)}return t.flags|=1,e=Ga(n,r),e.ref=t.ref,e.return=t,t.child=e}function Mm(e,t,a,r,o){if(e!==null){var n=e.memoizedProps;if(Pn(n,r)&&e.ref===t.ref)if(it=!1,t.pendingProps=r=n,(e.lanes&o)!==0)(e.flags&131072)!==0&&(it=!0);else return t.lanes=e.lanes,va(e,t,o)}return Nu(e,t,a,r,o)}function Dm(e,t,a){var r=t.pendingProps,o=r.children,n=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ce(co,gt),gt|=a;else{if((a&1073741824)===0)return e=n!==null?n.baseLanes|a:a,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ce(co,gt),gt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=n!==null?n.baseLanes:a,ce(co,gt),gt|=r}else n!==null?(r=n.baseLanes|a,t.memoizedState=null):r=a,ce(co,gt),gt|=r;return tt(e,t,o,a),t.child}function Bm(e,t){var a=t.ref;(e===null&&a!==null||e!==null&&e.ref!==a)&&(t.flags|=512,t.flags|=2097152)}function Nu(e,t,a,r,o){var n=dt(a)?Rr:Qe.current;return n=vo(t,n),ho(t,o),a=Id(e,t,a,r,n,o),r=wd(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,va(e,t,o)):(he&&r&&fd(t),t.flags|=1,tt(e,t,a,o),t.child)}function Xf(e,t,a,r,o){if(dt(a)){var n=!0;ks(t)}else n=!1;if(ho(t,o),t.stateNode===null)fs(e,t),Em(t,a,r),Bu(t,a,r,o),r=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var i=l.context,c=a.contextType;typeof c=="object"&&c!==null?c=Et(c):(c=dt(a)?Rr:Qe.current,c=vo(t,c));var p=a.getDerivedStateFromProps,m=typeof p=="function"||typeof l.getSnapshotBeforeUpdate=="function";m||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==r||i!==c)&&qf(t,l,r,c),Da=!1;var h=t.memoizedState;l.state=h,Fs(t,r,l,o),i=t.memoizedState,s!==r||h!==i||ut.current||Da?(typeof p=="function"&&(Du(t,a,p,r),i=t.memoizedState),(s=Da||Hf(t,a,s,r,h,i,c))?(m||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=i),l.props=r,l.state=i,l.context=c,r=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,um(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Ot(t.type,s),l.props=c,m=t.pendingProps,h=l.context,i=a.contextType,typeof i=="object"&&i!==null?i=Et(i):(i=dt(a)?Rr:Qe.current,i=vo(t,i));var L=a.getDerivedStateFromProps;(p=typeof L=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==m||h!==i)&&qf(t,l,r,i),Da=!1,h=t.memoizedState,l.state=h,Fs(t,r,l,o);var f=t.memoizedState;s!==m||h!==f||ut.current||Da?(typeof L=="function"&&(Du(t,a,L,r),f=t.memoizedState),(c=Da||Hf(t,a,c,r,h,f,i)||!1)?(p||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,f,i),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,f,i)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=f),l.props=r,l.state=f,l.context=i,r=c):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return Ou(e,t,a,r,n,o)}function Ou(e,t,a,r,o,n){Bm(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&Mf(t,a,!1),va(e,t,n);r=t.stateNode,Yx.current=t;var s=l&&typeof a.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=So(t,e.child,null,n),t.child=So(t,null,s,n)):tt(e,t,s,n),t.memoizedState=r.state,o&&Mf(t,a,!0),t.child}function zm(e){var t=e.stateNode;t.pendingContext?Af(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Af(e,t.context,!1),Ld(e,t.containerInfo)}function Kf(e,t,a,r,o){return Lo(),md(o),t.flags|=256,tt(e,t,a,r),t.child}var Uu={dehydrated:null,treeContext:null,retryLane:0};function _u(e){return{baseLanes:e,cachePool:null,transitions:null}}function Nm(e,t,a){var r=t.pendingProps,o=ve.current,n=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(n=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),ce(ve,o&1),e===null)return Au(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(l=r.children,e=r.fallback,n?(r=t.mode,n=t.child,l={mode:"hidden",children:l},(r&1)===0&&n!==null?(n.childLanes=0,n.pendingProps=l):n=Qs(l,r,0,null),e=Pr(e,r,a,null),n.return=t,e.return=t,n.sibling=e,t.child=n,t.child.memoizedState=_u(a),t.memoizedState=Uu,e):Rd(t,l));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Jx(e,t,l,r,s,o,a);if(n){n=r.fallback,l=t.mode,o=e.child,s=o.sibling;var i={mode:"hidden",children:r.children};return(l&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=i,t.deletions=null):(r=Ga(o,i),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?n=Ga(s,n):(n=Pr(n,l,a,null),n.flags|=2),n.return=t,r.return=t,r.sibling=n,t.child=r,r=n,n=t.child,l=e.child.memoizedState,l=l===null?_u(a):{baseLanes:l.baseLanes|a,cachePool:null,transitions:l.transitions},n.memoizedState=l,n.childLanes=e.childLanes&~a,t.memoizedState=Uu,r}return n=e.child,e=n.sibling,r=Ga(n,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=a),r.return=t,r.sibling=null,e!==null&&(a=t.deletions,a===null?(t.deletions=[e],t.flags|=16):a.push(e)),t.child=r,t.memoizedState=null,r}function Rd(e,t){return t=Qs({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function rs(e,t,a,r){return r!==null&&md(r),So(t,e.child,null,a),e=Rd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Jx(e,t,a,r,o,n,l){if(a)return t.flags&256?(t.flags&=-257,r=eu(Error(D(422))),rs(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(n=r.fallback,o=t.mode,r=Qs({mode:"visible",children:r.children},o,0,null),n=Pr(n,o,l,null),n.flags|=2,r.return=t,n.return=t,r.sibling=n,t.child=r,(t.mode&1)!==0&&So(t,e.child,null,l),t.child.memoizedState=_u(l),t.memoizedState=Uu,n);if((t.mode&1)===0)return rs(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,n=Error(D(419)),r=eu(n,r,void 0),rs(e,t,l,r)}if(s=(l&e.childLanes)!==0,it||s){if(r=ze,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|l))!==0?0:o,o!==0&&o!==n.retryLane&&(n.retryLane=o,ya(e,o),qt(r,e,o,-1))}return Dd(),r=eu(Error(D(421))),rs(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=fy.bind(null,e),o._reactRetry=t,null):(e=n.treeContext,ht=qa(o.nextSibling),xt=t,he=!0,_t=null,e!==null&&(kt[Pt++]=pa,kt[Pt++]=ma,kt[Pt++]=Tr,pa=e.id,ma=e.overflow,Tr=t),t=Rd(t,r.children),t.flags|=4096,t)}function Qf(e,t,a){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Mu(e.return,t,a)}function tu(e,t,a,r,o){var n=e.memoizedState;n===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:o}:(n.isBackwards=t,n.rendering=null,n.renderingStartTime=0,n.last=r,n.tail=a,n.tailMode=o)}function Om(e,t,a){var r=t.pendingProps,o=r.revealOrder,n=r.tail;if(tt(e,t,r.children,a),r=ve.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Qf(e,a,t);else if(e.tag===19)Qf(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ce(ve,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(a=t.child,o=null;a!==null;)e=a.alternate,e!==null&&As(e)===null&&(o=a),a=a.sibling;a=o,a===null?(o=t.child,t.child=null):(o=a.sibling,a.sibling=null),tu(t,!1,o,a,n);break;case"backwards":for(a=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&As(e)===null){t.child=o;break}e=o.sibling,o.sibling=a,a=o,o=e}tu(t,!0,a,null,n);break;case"together":tu(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function fs(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function va(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Fr|=t.lanes,(a&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(D(153));if(t.child!==null){for(e=t.child,a=Ga(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Ga(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function ey(e,t,a){switch(t.tag){case 3:zm(t),Lo();break;case 5:dm(t);break;case 1:dt(t.type)&&ks(t);break;case 4:Ld(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;ce(Ts,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ce(ve,ve.current&1),t.flags|=128,null):(a&t.child.childLanes)!==0?Nm(e,t,a):(ce(ve,ve.current&1),e=va(e,t,a),e!==null?e.sibling:null);ce(ve,ve.current&1);break;case 19:if(r=(a&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Om(e,t,a);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),ce(ve,ve.current),r)break;return null;case 22:case 23:return t.lanes=0,Dm(e,t,a)}return va(e,t,a)}var Um,Hu,_m,Hm;Um=function(e,t){for(var a=t.child;a!==null;){if(a.tag===5||a.tag===6)e.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===t)break;for(;a.sibling===null;){if(a.return===null||a.return===t)return;a=a.return}a.sibling.return=a.return,a=a.sibling}};Hu=function(){};_m=function(e,t,a,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,wr(aa.current);var n=null;switch(a){case"input":o=uu(e,o),r=uu(e,r),n=[];break;case"select":o=Se({},o,{value:void 0}),r=Se({},r,{value:void 0}),n=[];break;case"textarea":o=fu(e,o),r=fu(e,r),n=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Is)}mu(a,r);var l;a=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var s=o[c];for(l in s)s.hasOwnProperty(l)&&(a||(a={}),a[l]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ln.hasOwnProperty(c)?n||(n=[]):(n=n||[]).push(c,null));for(c in r){var i=r[c];if(s=o?.[c],r.hasOwnProperty(c)&&i!==s&&(i!=null||s!=null))if(c==="style")if(s){for(l in s)!s.hasOwnProperty(l)||i&&i.hasOwnProperty(l)||(a||(a={}),a[l]="");for(l in i)i.hasOwnProperty(l)&&s[l]!==i[l]&&(a||(a={}),a[l]=i[l])}else a||(n||(n=[]),n.push(c,a)),a=i;else c==="dangerouslySetInnerHTML"?(i=i?i.__html:void 0,s=s?s.__html:void 0,i!=null&&s!==i&&(n=n||[]).push(c,i)):c==="children"?typeof i!="string"&&typeof i!="number"||(n=n||[]).push(c,""+i):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ln.hasOwnProperty(c)?(i!=null&&c==="onScroll"&&fe("scroll",e),n||s===i||(n=[])):(n=n||[]).push(c,i))}a&&(n=n||[]).push("style",a);var c=n;(t.updateQueue=c)&&(t.flags|=4)}};Hm=function(e,t,a,r){a!==r&&(t.flags|=4)};function rn(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(t)for(var o=e.child;o!==null;)a|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)a|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=a,t}function ty(e,t,a){var r=t.pendingProps;switch(pd(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xe(t),null;case 1:return dt(t.type)&&ws(),Xe(t),null;case 3:return r=t.stateNode,bo(),pe(ut),pe(Qe),bd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ts(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,_t!==null&&(Ku(_t),_t=null))),Hu(e,t),Xe(t),null;case 5:Sd(t);var o=wr(An.current);if(a=t.type,e!==null&&t.stateNode!=null)_m(e,t,a,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(D(166));return Xe(t),null}if(e=wr(aa.current),ts(t)){r=t.stateNode,a=t.type;var n=t.memoizedProps;switch(r[ea]=t,r[En]=n,e=(t.mode&1)!==0,a){case"dialog":fe("cancel",r),fe("close",r);break;case"iframe":case"object":case"embed":fe("load",r);break;case"video":case"audio":for(o=0;o<dn.length;o++)fe(dn[o],r);break;case"source":fe("error",r);break;case"img":case"image":case"link":fe("error",r),fe("load",r);break;case"details":fe("toggle",r);break;case"input":rf(r,n),fe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!n.multiple},fe("invalid",r);break;case"textarea":nf(r,n),fe("invalid",r)}mu(a,n),o=null;for(var l in n)if(n.hasOwnProperty(l)){var s=n[l];l==="children"?typeof s=="string"?r.textContent!==s&&(n.suppressHydrationWarning!==!0&&es(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(n.suppressHydrationWarning!==!0&&es(r.textContent,s,e),o=["children",""+s]):Ln.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&fe("scroll",r)}switch(a){case"input":ql(r),of(r,n,!0);break;case"textarea":ql(r),lf(r);break;case"select":case"option":break;default:typeof n.onClick=="function"&&(r.onclick=Is)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=gp(a)),e==="http://www.w3.org/1999/xhtml"?a==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(a,{is:r.is}):(e=l.createElement(a),a==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,a),e[ea]=t,e[En]=r,Um(e,t,!1,!1),t.stateNode=e;e:{switch(l=gu(a,r),a){case"dialog":fe("cancel",e),fe("close",e),o=r;break;case"iframe":case"object":case"embed":fe("load",e),o=r;break;case"video":case"audio":for(o=0;o<dn.length;o++)fe(dn[o],e);o=r;break;case"source":fe("error",e),o=r;break;case"img":case"image":case"link":fe("error",e),fe("load",e),o=r;break;case"details":fe("toggle",e),o=r;break;case"input":rf(e,r),o=uu(e,r),fe("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Se({},r,{value:void 0}),fe("invalid",e);break;case"textarea":nf(e,r),o=fu(e,r),fe("invalid",e);break;default:o=r}mu(a,o),s=o;for(n in s)if(s.hasOwnProperty(n)){var i=s[n];n==="style"?yp(e,i):n==="dangerouslySetInnerHTML"?(i=i?i.__html:void 0,i!=null&&hp(e,i)):n==="children"?typeof i=="string"?(a!=="textarea"||i!=="")&&Sn(e,i):typeof i=="number"&&Sn(e,""+i):n!=="suppressContentEditableWarning"&&n!=="suppressHydrationWarning"&&n!=="autoFocus"&&(Ln.hasOwnProperty(n)?i!=null&&n==="onScroll"&&fe("scroll",e):i!=null&&Yu(e,n,i,l))}switch(a){case"input":ql(e),of(e,r,!1);break;case"textarea":ql(e),lf(e);break;case"option":r.value!=null&&e.setAttribute("value",""+$a(r.value));break;case"select":e.multiple=!!r.multiple,n=r.value,n!=null?fo(e,!!r.multiple,n,!1):r.defaultValue!=null&&fo(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Is)}switch(a){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Xe(t),null;case 6:if(e&&t.stateNode!=null)Hm(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(D(166));if(a=wr(An.current),wr(aa.current),ts(t)){if(r=t.stateNode,a=t.memoizedProps,r[ea]=t,(n=r.nodeValue!==a)&&(e=xt,e!==null))switch(e.tag){case 3:es(r.nodeValue,a,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&es(r.nodeValue,a,(e.mode&1)!==0)}n&&(t.flags|=4)}else r=(a.nodeType===9?a:a.ownerDocument).createTextNode(r),r[ea]=t,t.stateNode=r}return Xe(t),null;case 13:if(pe(ve),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(he&&ht!==null&&(t.mode&1)!==0&&(t.flags&128)===0)nm(),Lo(),t.flags|=98560,n=!1;else if(n=ts(t),r!==null&&r.dehydrated!==null){if(e===null){if(!n)throw Error(D(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(D(317));n[ea]=t}else Lo(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Xe(t),n=!1}else _t!==null&&(Ku(_t),_t=null),n=!0;if(!n)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=a,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ve.current&1)!==0?Me===0&&(Me=3):Dd())),t.updateQueue!==null&&(t.flags|=4),Xe(t),null);case 4:return bo(),Hu(e,t),e===null&&Rn(t.stateNode.containerInfo),Xe(t),null;case 10:return xd(t.type._context),Xe(t),null;case 17:return dt(t.type)&&ws(),Xe(t),null;case 19:if(pe(ve),n=t.memoizedState,n===null)return Xe(t),null;if(r=(t.flags&128)!==0,l=n.rendering,l===null)if(r)rn(n,!1);else{if(Me!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(l=As(e),l!==null){for(t.flags|=128,rn(n,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=a,a=t.child;a!==null;)n=a,e=r,n.flags&=14680066,l=n.alternate,l===null?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=l.childLanes,n.lanes=l.lanes,n.child=l.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=l.memoizedProps,n.memoizedState=l.memoizedState,n.updateQueue=l.updateQueue,n.type=l.type,e=l.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),a=a.sibling;return ce(ve,ve.current&1|2),t.child}e=e.sibling}n.tail!==null&&ke()>Io&&(t.flags|=128,r=!0,rn(n,!1),t.lanes=4194304)}else{if(!r)if(e=As(l),e!==null){if(t.flags|=128,r=!0,a=e.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),rn(n,!0),n.tail===null&&n.tailMode==="hidden"&&!l.alternate&&!he)return Xe(t),null}else 2*ke()-n.renderingStartTime>Io&&a!==1073741824&&(t.flags|=128,r=!0,rn(n,!1),t.lanes=4194304);n.isBackwards?(l.sibling=t.child,t.child=l):(a=n.last,a!==null?a.sibling=l:t.child=l,n.last=l)}return n.tail!==null?(t=n.tail,n.rendering=t,n.tail=t.sibling,n.renderingStartTime=ke(),t.sibling=null,a=ve.current,ce(ve,r?a&1|2:a&1),t):(Xe(t),null);case 22:case 23:return Md(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(gt&1073741824)!==0&&(Xe(t),t.subtreeFlags&6&&(t.flags|=8192)):Xe(t),null;case 24:return null;case 25:return null}throw Error(D(156,t.tag))}function ay(e,t){switch(pd(t),t.tag){case 1:return dt(t.type)&&ws(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return bo(),pe(ut),pe(Qe),bd(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Sd(t),null;case 13:if(pe(ve),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(D(340));Lo()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(ve),null;case 4:return bo(),null;case 10:return xd(t.type._context),null;case 22:case 23:return Md(),null;case 24:return null;default:return null}}var os=!1,Ke=!1,ry=typeof WeakSet=="function"?WeakSet:Set,U=null;function uo(e,t){var a=e.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(r){Ce(e,t,r)}else a.current=null}function qu(e,t,a){try{a()}catch(r){Ce(e,t,r)}}var Zf=!1;function oy(e,t){if(wu=Ss,e=Gp(),cd(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var o=r.anchorOffset,n=r.focusNode;r=r.focusOffset;try{a.nodeType,n.nodeType}catch{a=null;break e}var l=0,s=-1,i=-1,c=0,p=0,m=e,h=null;t:for(;;){for(var L;m!==a||o!==0&&m.nodeType!==3||(s=l+o),m!==n||r!==0&&m.nodeType!==3||(i=l+r),m.nodeType===3&&(l+=m.nodeValue.length),(L=m.firstChild)!==null;)h=m,m=L;for(;;){if(m===e)break t;if(h===a&&++c===o&&(s=l),h===n&&++p===r&&(i=l),(L=m.nextSibling)!==null)break;m=h,h=m.parentNode}m=L}a=s===-1||i===-1?null:{start:s,end:i}}else a=null}a=a||{start:0,end:0}}else a=null;for(ku={focusedElem:e,selectionRange:a},Ss=!1,U=t;U!==null;)if(t=U,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,U=e;else for(;U!==null;){t=U;try{var f=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(f!==null){var b=f.memoizedProps,E=f.memoizedState,u=t.stateNode,d=u.getSnapshotBeforeUpdate(t.elementType===t.type?b:Ot(t.type,b),E);u.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(D(163))}}catch(S){Ce(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,U=e;break}U=t.return}return f=Zf,Zf=!1,f}function xn(e,t,a){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var n=o.destroy;o.destroy=void 0,n!==void 0&&qu(t,a,n)}o=o.next}while(o!==r)}}function Xs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var a=t=t.next;do{if((a.tag&e)===e){var r=a.create;a.destroy=r()}a=a.next}while(a!==t)}}function Wu(e){var t=e.ref;if(t!==null){var a=e.stateNode;switch(e.tag){case 5:e=a;break;default:e=a}typeof t=="function"?t(e):t.current=e}}function qm(e){var t=e.alternate;t!==null&&(e.alternate=null,qm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ea],delete t[En],delete t[Tu],delete t[_x],delete t[Hx])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wm(e){return e.tag===5||e.tag===3||e.tag===4}function Yf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vu(e,t,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?a.nodeType===8?a.parentNode.insertBefore(e,t):a.insertBefore(e,t):(a.nodeType===8?(t=a.parentNode,t.insertBefore(e,a)):(t=a,t.appendChild(e)),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Is));else if(r!==4&&(e=e.child,e!==null))for(Vu(e,t,a),e=e.sibling;e!==null;)Vu(e,t,a),e=e.sibling}function ju(e,t,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ju(e,t,a),e=e.sibling;e!==null;)ju(e,t,a),e=e.sibling}var Oe=null,Ut=!1;function Aa(e,t,a){for(a=a.child;a!==null;)Vm(e,t,a),a=a.sibling}function Vm(e,t,a){if(ta&&typeof ta.onCommitFiberUnmount=="function")try{ta.onCommitFiberUnmount(_s,a)}catch{}switch(a.tag){case 5:Ke||uo(a,t);case 6:var r=Oe,o=Ut;Oe=null,Aa(e,t,a),Oe=r,Ut=o,Oe!==null&&(Ut?(e=Oe,a=a.stateNode,e.nodeType===8?e.parentNode.removeChild(a):e.removeChild(a)):Oe.removeChild(a.stateNode));break;case 18:Oe!==null&&(Ut?(e=Oe,a=a.stateNode,e.nodeType===8?Xi(e.parentNode,a):e.nodeType===1&&Xi(e,a),wn(e)):Xi(Oe,a.stateNode));break;case 4:r=Oe,o=Ut,Oe=a.stateNode.containerInfo,Ut=!0,Aa(e,t,a),Oe=r,Ut=o;break;case 0:case 11:case 14:case 15:if(!Ke&&(r=a.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var n=o,l=n.destroy;n=n.tag,l!==void 0&&((n&2)!==0||(n&4)!==0)&&qu(a,t,l),o=o.next}while(o!==r)}Aa(e,t,a);break;case 1:if(!Ke&&(uo(a,t),r=a.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=a.memoizedProps,r.state=a.memoizedState,r.componentWillUnmount()}catch(s){Ce(a,t,s)}Aa(e,t,a);break;case 21:Aa(e,t,a);break;case 22:a.mode&1?(Ke=(r=Ke)||a.memoizedState!==null,Aa(e,t,a),Ke=r):Aa(e,t,a);break;default:Aa(e,t,a)}}function Jf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var a=e.stateNode;a===null&&(a=e.stateNode=new ry),t.forEach(function(r){var o=py.bind(null,e,r);a.has(r)||(a.add(r),r.then(o,o))})}}function Nt(e,t){var a=t.deletions;if(a!==null)for(var r=0;r<a.length;r++){var o=a[r];try{var n=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:Oe=s.stateNode,Ut=!1;break e;case 3:Oe=s.stateNode.containerInfo,Ut=!0;break e;case 4:Oe=s.stateNode.containerInfo,Ut=!0;break e}s=s.return}if(Oe===null)throw Error(D(160));Vm(n,l,o),Oe=null,Ut=!1;var i=o.alternate;i!==null&&(i.return=null),o.return=null}catch(c){Ce(o,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)jm(t,e),t=t.sibling}function jm(e,t){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Nt(t,e),Yt(e),r&4){try{xn(3,e,e.return),Xs(3,e)}catch(b){Ce(e,e.return,b)}try{xn(5,e,e.return)}catch(b){Ce(e,e.return,b)}}break;case 1:Nt(t,e),Yt(e),r&512&&a!==null&&uo(a,a.return);break;case 5:if(Nt(t,e),Yt(e),r&512&&a!==null&&uo(a,a.return),e.flags&32){var o=e.stateNode;try{Sn(o,"")}catch(b){Ce(e,e.return,b)}}if(r&4&&(o=e.stateNode,o!=null)){var n=e.memoizedProps,l=a!==null?a.memoizedProps:n,s=e.type,i=e.updateQueue;if(e.updateQueue=null,i!==null)try{s==="input"&&n.type==="radio"&&n.name!=null&&pp(o,n),gu(s,l);var c=gu(s,n);for(l=0;l<i.length;l+=2){var p=i[l],m=i[l+1];p==="style"?yp(o,m):p==="dangerouslySetInnerHTML"?hp(o,m):p==="children"?Sn(o,m):Yu(o,p,m,c)}switch(s){case"input":du(o,n);break;case"textarea":mp(o,n);break;case"select":var h=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!n.multiple;var L=n.value;L!=null?fo(o,!!n.multiple,L,!1):h!==!!n.multiple&&(n.defaultValue!=null?fo(o,!!n.multiple,n.defaultValue,!0):fo(o,!!n.multiple,n.multiple?[]:"",!1))}o[En]=n}catch(b){Ce(e,e.return,b)}}break;case 6:if(Nt(t,e),Yt(e),r&4){if(e.stateNode===null)throw Error(D(162));o=e.stateNode,n=e.memoizedProps;try{o.nodeValue=n}catch(b){Ce(e,e.return,b)}}break;case 3:if(Nt(t,e),Yt(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{wn(t.containerInfo)}catch(b){Ce(e,e.return,b)}break;case 4:Nt(t,e),Yt(e);break;case 13:Nt(t,e),Yt(e),o=e.child,o.flags&8192&&(n=o.memoizedState!==null,o.stateNode.isHidden=n,!n||o.alternate!==null&&o.alternate.memoizedState!==null||(Fd=ke())),r&4&&Jf(e);break;case 22:if(p=a!==null&&a.memoizedState!==null,e.mode&1?(Ke=(c=Ke)||p,Nt(t,e),Ke=c):Nt(t,e),Yt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&(e.mode&1)!==0)for(U=e,p=e.child;p!==null;){for(m=U=p;U!==null;){switch(h=U,L=h.child,h.tag){case 0:case 11:case 14:case 15:xn(4,h,h.return);break;case 1:uo(h,h.return);var f=h.stateNode;if(typeof f.componentWillUnmount=="function"){r=h,a=h.return;try{t=r,f.props=t.memoizedProps,f.state=t.memoizedState,f.componentWillUnmount()}catch(b){Ce(r,a,b)}}break;case 5:uo(h,h.return);break;case 22:if(h.memoizedState!==null){tp(m);continue}}L!==null?(L.return=h,U=L):tp(m)}p=p.sibling}e:for(p=null,m=e;;){if(m.tag===5){if(p===null){p=m;try{o=m.stateNode,c?(n=o.style,typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none"):(s=m.stateNode,i=m.memoizedProps.style,l=i!=null&&i.hasOwnProperty("display")?i.display:null,s.style.display=xp("display",l))}catch(b){Ce(e,e.return,b)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(b){Ce(e,e.return,b)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Nt(t,e),Yt(e),r&4&&Jf(e);break;case 21:break;default:Nt(t,e),Yt(e)}}function Yt(e){var t=e.flags;if(t&2){try{e:{for(var a=e.return;a!==null;){if(Wm(a)){var r=a;break e}a=a.return}throw Error(D(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Sn(o,""),r.flags&=-33);var n=Yf(e);ju(e,n,o);break;case 3:case 4:var l=r.stateNode.containerInfo,s=Yf(e);Vu(e,s,l);break;default:throw Error(D(161))}}catch(i){Ce(e,e.return,i)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ny(e,t,a){U=e,Gm(e,t,a)}function Gm(e,t,a){for(var r=(e.mode&1)!==0;U!==null;){var o=U,n=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||os;if(!l){var s=o.alternate,i=s!==null&&s.memoizedState!==null||Ke;s=os;var c=Ke;if(os=l,(Ke=i)&&!c)for(U=o;U!==null;)l=U,i=l.child,l.tag===22&&l.memoizedState!==null?ap(o):i!==null?(i.return=l,U=i):ap(o);for(;n!==null;)U=n,Gm(n,t,a),n=n.sibling;U=o,os=s,Ke=c}ep(e,t,a)}else(o.subtreeFlags&8772)!==0&&n!==null?(n.return=o,U=n):ep(e,t,a)}}function ep(e){for(;U!==null;){var t=U;if((t.flags&8772)!==0){var a=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ke||Xs(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ke)if(a===null)r.componentDidMount();else{var o=t.elementType===t.type?a.memoizedProps:Ot(t.type,a.memoizedProps);r.componentDidUpdate(o,a.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var n=t.updateQueue;n!==null&&Of(t,n,r);break;case 3:var l=t.updateQueue;if(l!==null){if(a=null,t.child!==null)switch(t.child.tag){case 5:a=t.child.stateNode;break;case 1:a=t.child.stateNode}Of(t,l,a)}break;case 5:var s=t.stateNode;if(a===null&&t.flags&4){a=s;var i=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":i.autoFocus&&a.focus();break;case"img":i.src&&(a.src=i.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&wn(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(D(163))}Ke||t.flags&512&&Wu(t)}catch(h){Ce(t,t.return,h)}}if(t===e){U=null;break}if(a=t.sibling,a!==null){a.return=t.return,U=a;break}U=t.return}}function tp(e){for(;U!==null;){var t=U;if(t===e){U=null;break}var a=t.sibling;if(a!==null){a.return=t.return,U=a;break}U=t.return}}function ap(e){for(;U!==null;){var t=U;try{switch(t.tag){case 0:case 11:case 15:var a=t.return;try{Xs(4,t)}catch(i){Ce(t,a,i)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(i){Ce(t,o,i)}}var n=t.return;try{Wu(t)}catch(i){Ce(t,n,i)}break;case 5:var l=t.return;try{Wu(t)}catch(i){Ce(t,l,i)}}}catch(i){Ce(t,t.return,i)}if(t===e){U=null;break}var s=t.sibling;if(s!==null){s.return=t.return,U=s;break}U=t.return}}var ly=Math.ceil,Bs=La.ReactCurrentDispatcher,Td=La.ReactCurrentOwner,Tt=La.ReactCurrentBatchConfig,te=0,ze=null,Te=null,Ue=0,gt=0,co=Qa(0),Me=0,zn=null,Fr=0,Ks=0,Ed=0,yn=null,st=null,Fd=0,Io=1/0,ca=null,zs=!1,Gu=null,Va=null,ns=!1,Oa=null,Ns=0,vn=0,$u=null,ps=-1,ms=0;function at(){return(te&6)!==0?ke():ps!==-1?ps:ps=ke()}function ja(e){return(e.mode&1)===0?1:(te&2)!==0&&Ue!==0?Ue&-Ue:Wx.transition!==null?(ms===0&&(ms=Ep()),ms):(e=oe,e!==0||(e=window.event,e=e===void 0?16:Np(e.type)),e)}function qt(e,t,a,r){if(50<vn)throw vn=0,$u=null,Error(D(185));Nn(e,a,r),((te&2)===0||e!==ze)&&(e===ze&&((te&2)===0&&(Ks|=a),Me===4&&za(e,Ue)),ct(e,r),a===1&&te===0&&(t.mode&1)===0&&(Io=ke()+500,js&&Za()))}function ct(e,t){var a=e.callbackNode;j0(e,t);var r=Ls(e,e===ze?Ue:0);if(r===0)a!==null&&df(a),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(a!=null&&df(a),t===1)e.tag===0?qx(rp.bind(null,e)):am(rp.bind(null,e)),Ox(function(){(te&6)===0&&Za()}),a=null;else{switch(Fp(r)){case 1:a=rd;break;case 4:a=Rp;break;case 16:a=vs;break;case 536870912:a=Tp;break;default:a=vs}a=eg(a,$m.bind(null,e))}e.callbackPriority=t,e.callbackNode=a}}function $m(e,t){if(ps=-1,ms=0,(te&6)!==0)throw Error(D(327));var a=e.callbackNode;if(xo()&&e.callbackNode!==a)return null;var r=Ls(e,e===ze?Ue:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Os(e,r);else{t=r;var o=te;te|=2;var n=Km();(ze!==e||Ue!==t)&&(ca=null,Io=ke()+500,kr(e,t));do try{uy();break}catch(s){Xm(e,s)}while(!0);hd(),Bs.current=n,te=o,Te!==null?t=0:(ze=null,Ue=0,t=Me)}if(t!==0){if(t===2&&(o=Lu(e),o!==0&&(r=o,t=Xu(e,o))),t===1)throw a=zn,kr(e,0),za(e,r),ct(e,ke()),a;if(t===6)za(e,r);else{if(o=e.current.alternate,(r&30)===0&&!sy(o)&&(t=Os(e,r),t===2&&(n=Lu(e),n!==0&&(r=n,t=Xu(e,n))),t===1))throw a=zn,kr(e,0),za(e,r),ct(e,ke()),a;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(D(345));case 2:br(e,st,ca);break;case 3:if(za(e,r),(r&130023424)===r&&(t=Fd+500-ke(),10<t)){if(Ls(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){at(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Ru(br.bind(null,e,st,ca),t);break}br(e,st,ca);break;case 4:if(za(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-Ht(r);n=1<<l,l=t[l],l>o&&(o=l),r&=~n}if(r=o,r=ke()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ly(r/1960))-r,10<r){e.timeoutHandle=Ru(br.bind(null,e,st,ca),r);break}br(e,st,ca);break;case 5:br(e,st,ca);break;default:throw Error(D(329))}}}return ct(e,ke()),e.callbackNode===a?$m.bind(null,e):null}function Xu(e,t){var a=yn;return e.current.memoizedState.isDehydrated&&(kr(e,t).flags|=256),e=Os(e,t),e!==2&&(t=st,st=a,t!==null&&Ku(t)),e}function Ku(e){st===null?st=e:st.push.apply(st,e)}function sy(e){for(var t=e;;){if(t.flags&16384){var a=t.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var r=0;r<a.length;r++){var o=a[r],n=o.getSnapshot;o=o.value;try{if(!Wt(n(),o))return!1}catch{return!1}}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function za(e,t){for(t&=~Ed,t&=~Ks,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var a=31-Ht(t),r=1<<a;e[a]=-1,t&=~r}}function rp(e){if((te&6)!==0)throw Error(D(327));xo();var t=Ls(e,0);if((t&1)===0)return ct(e,ke()),null;var a=Os(e,t);if(e.tag!==0&&a===2){var r=Lu(e);r!==0&&(t=r,a=Xu(e,r))}if(a===1)throw a=zn,kr(e,0),za(e,t),ct(e,ke()),a;if(a===6)throw Error(D(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,br(e,st,ca),ct(e,ke()),null}function Ad(e,t){var a=te;te|=1;try{return e(t)}finally{te=a,te===0&&(Io=ke()+500,js&&Za())}}function Ar(e){Oa!==null&&Oa.tag===0&&(te&6)===0&&xo();var t=te;te|=1;var a=Tt.transition,r=oe;try{if(Tt.transition=null,oe=1,e)return e()}finally{oe=r,Tt.transition=a,te=t,(te&6)===0&&Za()}}function Md(){gt=co.current,pe(co)}function kr(e,t){e.finishedWork=null,e.finishedLanes=0;var a=e.timeoutHandle;if(a!==-1&&(e.timeoutHandle=-1,Nx(a)),Te!==null)for(a=Te.return;a!==null;){var r=a;switch(pd(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ws();break;case 3:bo(),pe(ut),pe(Qe),bd();break;case 5:Sd(r);break;case 4:bo();break;case 13:pe(ve);break;case 19:pe(ve);break;case 10:xd(r.type._context);break;case 22:case 23:Md()}a=a.return}if(ze=e,Te=e=Ga(e.current,null),Ue=gt=t,Me=0,zn=null,Ed=Ks=Fr=0,st=yn=null,Ir!==null){for(t=0;t<Ir.length;t++)if(a=Ir[t],r=a.interleaved,r!==null){a.interleaved=null;var o=r.next,n=a.pending;if(n!==null){var l=n.next;n.next=o,r.next=l}a.pending=r}Ir=null}return e}function Xm(e,t){do{var a=Te;try{if(hd(),ds.current=Ds,Ms){for(var r=Le.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Ms=!1}if(Er=0,Be=Ae=Le=null,hn=!1,Mn=0,Td.current=null,a===null||a.return===null){Me=1,zn=t,Te=null;break}e:{var n=e,l=a.return,s=a,i=t;if(t=Ue,s.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){var c=i,p=s,m=p.tag;if((p.mode&1)===0&&(m===0||m===11||m===15)){var h=p.alternate;h?(p.updateQueue=h.updateQueue,p.memoizedState=h.memoizedState,p.lanes=h.lanes):(p.updateQueue=null,p.memoizedState=null)}var L=Vf(l);if(L!==null){L.flags&=-257,jf(L,l,s,n,t),L.mode&1&&Wf(n,c,t),t=L,i=c;var f=t.updateQueue;if(f===null){var b=new Set;b.add(i),t.updateQueue=b}else f.add(i);break e}else{if((t&1)===0){Wf(n,c,t),Dd();break e}i=Error(D(426))}}else if(he&&s.mode&1){var E=Vf(l);if(E!==null){(E.flags&65536)===0&&(E.flags|=256),jf(E,l,s,n,t),md(Co(i,s));break e}}n=i=Co(i,s),Me!==4&&(Me=2),yn===null?yn=[n]:yn.push(n),n=l;do{switch(n.tag){case 3:n.flags|=65536,t&=-t,n.lanes|=t;var u=Fm(n,i,t);Nf(n,u);break e;case 1:s=i;var d=n.type,g=n.stateNode;if((n.flags&128)===0&&(typeof d.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Va===null||!Va.has(g)))){n.flags|=65536,t&=-t,n.lanes|=t;var S=Am(n,s,t);Nf(n,S);break e}}n=n.return}while(n!==null)}Zm(a)}catch(T){t=T,Te===a&&a!==null&&(Te=a=a.return);continue}break}while(!0)}function Km(){var e=Bs.current;return Bs.current=Ds,e===null?Ds:e}function Dd(){(Me===0||Me===3||Me===2)&&(Me=4),ze===null||(Fr&268435455)===0&&(Ks&268435455)===0||za(ze,Ue)}function Os(e,t){var a=te;te|=2;var r=Km();(ze!==e||Ue!==t)&&(ca=null,kr(e,t));do try{iy();break}catch(o){Xm(e,o)}while(!0);if(hd(),te=a,Bs.current=r,Te!==null)throw Error(D(261));return ze=null,Ue=0,Me}function iy(){for(;Te!==null;)Qm(Te)}function uy(){for(;Te!==null&&!z0();)Qm(Te)}function Qm(e){var t=Jm(e.alternate,e,gt);e.memoizedProps=e.pendingProps,t===null?Zm(e):Te=t,Td.current=null}function Zm(e){var t=e;do{var a=t.alternate;if(e=t.return,(t.flags&32768)===0){if(a=ty(a,t,gt),a!==null){Te=a;return}}else{if(a=ay(a,t),a!==null){a.flags&=32767,Te=a;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Me=6,Te=null;return}}if(t=t.sibling,t!==null){Te=t;return}Te=t=e}while(t!==null);Me===0&&(Me=5)}function br(e,t,a){var r=oe,o=Tt.transition;try{Tt.transition=null,oe=1,dy(e,t,a,r)}finally{Tt.transition=o,oe=r}return null}function dy(e,t,a,r){do xo();while(Oa!==null);if((te&6)!==0)throw Error(D(327));a=e.finishedWork;var o=e.finishedLanes;if(a===null)return null;if(e.finishedWork=null,e.finishedLanes=0,a===e.current)throw Error(D(177));e.callbackNode=null,e.callbackPriority=0;var n=a.lanes|a.childLanes;if(G0(e,n),e===ze&&(Te=ze=null,Ue=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||ns||(ns=!0,eg(vs,function(){return xo(),null})),n=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||n){n=Tt.transition,Tt.transition=null;var l=oe;oe=1;var s=te;te|=4,Td.current=null,oy(e,a),jm(a,e),Ax(ku),Ss=!!wu,ku=wu=null,e.current=a,ny(a,e,o),N0(),te=s,oe=l,Tt.transition=n}else e.current=a;if(ns&&(ns=!1,Oa=e,Ns=o),n=e.pendingLanes,n===0&&(Va=null),_0(a.stateNode,r),ct(e,ke()),t!==null)for(r=e.onRecoverableError,a=0;a<t.length;a++)o=t[a],r(o.value,{componentStack:o.stack,digest:o.digest});if(zs)throw zs=!1,e=Gu,Gu=null,e;return(Ns&1)!==0&&e.tag!==0&&xo(),n=e.pendingLanes,(n&1)!==0?e===$u?vn++:(vn=0,$u=e):vn=0,Za(),null}function xo(){if(Oa!==null){var e=Fp(Ns),t=Tt.transition,a=oe;try{if(Tt.transition=null,oe=16>e?16:e,Oa===null)var r=!1;else{if(e=Oa,Oa=null,Ns=0,(te&6)!==0)throw Error(D(331));var o=te;for(te|=4,U=e.current;U!==null;){var n=U,l=n.child;if((U.flags&16)!==0){var s=n.deletions;if(s!==null){for(var i=0;i<s.length;i++){var c=s[i];for(U=c;U!==null;){var p=U;switch(p.tag){case 0:case 11:case 15:xn(8,p,n)}var m=p.child;if(m!==null)m.return=p,U=m;else for(;U!==null;){p=U;var h=p.sibling,L=p.return;if(qm(p),p===c){U=null;break}if(h!==null){h.return=L,U=h;break}U=L}}}var f=n.alternate;if(f!==null){var b=f.child;if(b!==null){f.child=null;do{var E=b.sibling;b.sibling=null,b=E}while(b!==null)}}U=n}}if((n.subtreeFlags&2064)!==0&&l!==null)l.return=n,U=l;else e:for(;U!==null;){if(n=U,(n.flags&2048)!==0)switch(n.tag){case 0:case 11:case 15:xn(9,n,n.return)}var u=n.sibling;if(u!==null){u.return=n.return,U=u;break e}U=n.return}}var d=e.current;for(U=d;U!==null;){l=U;var g=l.child;if((l.subtreeFlags&2064)!==0&&g!==null)g.return=l,U=g;else e:for(l=d;U!==null;){if(s=U,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:Xs(9,s)}}catch(T){Ce(s,s.return,T)}if(s===l){U=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,U=S;break e}U=s.return}}if(te=o,Za(),ta&&typeof ta.onPostCommitFiberRoot=="function")try{ta.onPostCommitFiberRoot(_s,e)}catch{}r=!0}return r}finally{oe=a,Tt.transition=t}}return!1}function op(e,t,a){t=Co(a,t),t=Fm(e,t,1),e=Wa(e,t,1),t=at(),e!==null&&(Nn(e,1,t),ct(e,t))}function Ce(e,t,a){if(e.tag===3)op(e,e,a);else for(;t!==null;){if(t.tag===3){op(t,e,a);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Va===null||!Va.has(r))){e=Co(a,e),e=Am(t,e,1),t=Wa(t,e,1),e=at(),t!==null&&(Nn(t,1,e),ct(t,e));break}}t=t.return}}function cy(e,t,a){var r=e.pingCache;r!==null&&r.delete(t),t=at(),e.pingedLanes|=e.suspendedLanes&a,ze===e&&(Ue&a)===a&&(Me===4||Me===3&&(Ue&130023424)===Ue&&500>ke()-Fd?kr(e,0):Ed|=a),ct(e,t)}function Ym(e,t){t===0&&((e.mode&1)===0?t=1:(t=jl,jl<<=1,(jl&130023424)===0&&(jl=4194304)));var a=at();e=ya(e,t),e!==null&&(Nn(e,t,a),ct(e,a))}function fy(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Ym(e,a)}function py(e,t){var a=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(a=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(D(314))}r!==null&&r.delete(t),Ym(e,a)}var Jm;Jm=function(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps||ut.current)it=!0;else{if((e.lanes&a)===0&&(t.flags&128)===0)return it=!1,ey(e,t,a);it=(e.flags&131072)!==0}else it=!1,he&&(t.flags&1048576)!==0&&rm(t,Rs,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;fs(e,t),e=t.pendingProps;var o=vo(t,Qe.current);ho(t,a),o=Id(null,t,r,e,o,a);var n=wd();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,dt(r)?(n=!0,ks(t)):n=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,vd(t),o.updater=$s,t.stateNode=o,o._reactInternals=t,Bu(t,r,e,a),t=Ou(null,t,r,!0,n,a)):(t.tag=0,he&&n&&fd(t),tt(null,t,o,a),t=t.child),t;case 16:r=t.elementType;e:{switch(fs(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=gy(r),e=Ot(r,e),o){case 0:t=Nu(null,t,r,e,a);break e;case 1:t=Xf(null,t,r,e,a);break e;case 11:t=Gf(null,t,r,e,a);break e;case 14:t=$f(null,t,r,Ot(r.type,e),a);break e}throw Error(D(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ot(r,o),Nu(e,t,r,o,a);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ot(r,o),Xf(e,t,r,o,a);case 3:e:{if(zm(t),e===null)throw Error(D(387));r=t.pendingProps,n=t.memoizedState,o=n.element,um(e,t),Fs(t,r,null,a);var l=t.memoizedState;if(r=l.element,n.isDehydrated)if(n={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=n,t.memoizedState=n,t.flags&256){o=Co(Error(D(423)),t),t=Kf(e,t,r,a,o);break e}else if(r!==o){o=Co(Error(D(424)),t),t=Kf(e,t,r,a,o);break e}else for(ht=qa(t.stateNode.containerInfo.firstChild),xt=t,he=!0,_t=null,a=sm(t,null,r,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Lo(),r===o){t=va(e,t,a);break e}tt(e,t,r,a)}t=t.child}return t;case 5:return dm(t),e===null&&Au(t),r=t.type,o=t.pendingProps,n=e!==null?e.memoizedProps:null,l=o.children,Pu(r,o)?l=null:n!==null&&Pu(r,n)&&(t.flags|=32),Bm(e,t),tt(e,t,l,a),t.child;case 6:return e===null&&Au(t),null;case 13:return Nm(e,t,a);case 4:return Ld(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=So(t,null,r,a):tt(e,t,r,a),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ot(r,o),Gf(e,t,r,o,a);case 7:return tt(e,t,t.pendingProps,a),t.child;case 8:return tt(e,t,t.pendingProps.children,a),t.child;case 12:return tt(e,t,t.pendingProps.children,a),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,n=t.memoizedProps,l=o.value,ce(Ts,r._currentValue),r._currentValue=l,n!==null)if(Wt(n.value,l)){if(n.children===o.children&&!ut.current){t=va(e,t,a);break e}}else for(n=t.child,n!==null&&(n.return=t);n!==null;){var s=n.dependencies;if(s!==null){l=n.child;for(var i=s.firstContext;i!==null;){if(i.context===r){if(n.tag===1){i=ga(-1,a&-a),i.tag=2;var c=n.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?i.next=i:(i.next=p.next,p.next=i),c.pending=i}}n.lanes|=a,i=n.alternate,i!==null&&(i.lanes|=a),Mu(n.return,a,t),s.lanes|=a;break}i=i.next}}else if(n.tag===10)l=n.type===t.type?null:n.child;else if(n.tag===18){if(l=n.return,l===null)throw Error(D(341));l.lanes|=a,s=l.alternate,s!==null&&(s.lanes|=a),Mu(l,a,t),l=n.sibling}else l=n.child;if(l!==null)l.return=n;else for(l=n;l!==null;){if(l===t){l=null;break}if(n=l.sibling,n!==null){n.return=l.return,l=n;break}l=l.return}n=l}tt(e,t,o.children,a),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,ho(t,a),o=Et(o),r=r(o),t.flags|=1,tt(e,t,r,a),t.child;case 14:return r=t.type,o=Ot(r,t.pendingProps),o=Ot(r.type,o),$f(e,t,r,o,a);case 15:return Mm(e,t,t.type,t.pendingProps,a);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ot(r,o),fs(e,t),t.tag=1,dt(r)?(e=!0,ks(t)):e=!1,ho(t,a),Em(t,r,o),Bu(t,r,o,a),Ou(null,t,r,!0,e,a);case 19:return Om(e,t,a);case 22:return Dm(e,t,a)}throw Error(D(156,t.tag))};function eg(e,t){return Pp(e,t)}function my(e,t,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rt(e,t,a,r){return new my(e,t,a,r)}function Bd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function gy(e){if(typeof e=="function")return Bd(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ed)return 11;if(e===td)return 14}return 2}function Ga(e,t){var a=e.alternate;return a===null?(a=Rt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&14680064,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a}function gs(e,t,a,r,o,n){var l=2;if(r=e,typeof e=="function")Bd(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case eo:return Pr(a.children,o,n,t);case Ju:l=8,o|=8;break;case nu:return e=Rt(12,a,t,o|2),e.elementType=nu,e.lanes=n,e;case lu:return e=Rt(13,a,t,o),e.elementType=lu,e.lanes=n,e;case su:return e=Rt(19,a,t,o),e.elementType=su,e.lanes=n,e;case dp:return Qs(a,o,n,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ip:l=10;break e;case up:l=9;break e;case ed:l=11;break e;case td:l=14;break e;case Ma:l=16,r=null;break e}throw Error(D(130,e==null?e:typeof e,""))}return t=Rt(l,a,t,o),t.elementType=e,t.type=r,t.lanes=n,t}function Pr(e,t,a,r){return e=Rt(7,e,r,t),e.lanes=a,e}function Qs(e,t,a,r){return e=Rt(22,e,r,t),e.elementType=dp,e.lanes=a,e.stateNode={isHidden:!1},e}function au(e,t,a){return e=Rt(6,e,null,t),e.lanes=a,e}function ru(e,t,a){return t=Rt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function hy(e,t,a,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=_i(0),this.expirationTimes=_i(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_i(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function zd(e,t,a,r,o,n,l,s,i){return e=new hy(e,t,a,s,i),t===1?(t=1,n===!0&&(t|=8)):t=0,n=Rt(3,null,null,t),e.current=n,n.stateNode=e,n.memoizedState={element:r,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},vd(n),e}function xy(e,t,a){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:a}}function tg(e){if(!e)return Xa;e=e._reactInternals;e:{if(Dr(e)!==e||e.tag!==1)throw Error(D(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(dt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(D(171))}if(e.tag===1){var a=e.type;if(dt(a))return tm(e,a,t)}return t}function ag(e,t,a,r,o,n,l,s,i){return e=zd(a,r,!0,e,o,n,l,s,i),e.context=tg(null),a=e.current,r=at(),o=ja(a),n=ga(r,o),n.callback=t??null,Wa(a,n,o),e.current.lanes=o,Nn(e,o,r),ct(e,r),e}function Zs(e,t,a,r){var o=t.current,n=at(),l=ja(o);return a=tg(a),t.context===null?t.context=a:t.pendingContext=a,t=ga(n,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Wa(o,t,l),e!==null&&(qt(e,o,l,n),us(e,o,l)),l}function Us(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function np(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Nd(e,t){np(e,t),(e=e.alternate)&&np(e,t)}function yy(){return null}var rg=typeof reportError=="function"?reportError:function(e){console.error(e)};function Od(e){this._internalRoot=e}Ys.prototype.render=Od.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(D(409));Zs(e,t,null,null)};Ys.prototype.unmount=Od.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ar(function(){Zs(null,e,null,null)}),t[xa]=null}};function Ys(e){this._internalRoot=e}Ys.prototype.unstable_scheduleHydration=function(e){if(e){var t=Dp();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Ba.length&&t!==0&&t<Ba[a].priority;a++);Ba.splice(a,0,e),a===0&&zp(e)}};function Ud(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Js(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function lp(){}function vy(e,t,a,r,o){if(o){if(typeof r=="function"){var n=r;r=function(){var c=Us(l);n.call(c)}}var l=ag(t,r,e,0,null,!1,!1,"",lp);return e._reactRootContainer=l,e[xa]=l.current,Rn(e.nodeType===8?e.parentNode:e),Ar(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var c=Us(i);s.call(c)}}var i=zd(e,0,!1,null,null,!1,!1,"",lp);return e._reactRootContainer=i,e[xa]=i.current,Rn(e.nodeType===8?e.parentNode:e),Ar(function(){Zs(t,i,a,r)}),i}function ei(e,t,a,r,o){var n=a._reactRootContainer;if(n){var l=n;if(typeof o=="function"){var s=o;o=function(){var i=Us(l);s.call(i)}}Zs(t,l,e,o)}else l=vy(a,t,e,o,r);return Us(l)}Ap=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var a=un(t.pendingLanes);a!==0&&(od(t,a|1),ct(t,ke()),(te&6)===0&&(Io=ke()+500,Za()))}break;case 13:Ar(function(){var r=ya(e,1);if(r!==null){var o=at();qt(r,e,1,o)}}),Nd(e,1)}};nd=function(e){if(e.tag===13){var t=ya(e,134217728);if(t!==null){var a=at();qt(t,e,134217728,a)}Nd(e,134217728)}};Mp=function(e){if(e.tag===13){var t=ja(e),a=ya(e,t);if(a!==null){var r=at();qt(a,e,t,r)}Nd(e,t)}};Dp=function(){return oe};Bp=function(e,t){var a=oe;try{return oe=e,t()}finally{oe=a}};xu=function(e,t,a){switch(t){case"input":if(du(e,a),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<a.length;t++){var r=a[t];if(r!==e&&r.form===e.form){var o=Vs(r);if(!o)throw Error(D(90));fp(r),du(r,o)}}}break;case"textarea":mp(e,a);break;case"select":t=a.value,t!=null&&fo(e,!!a.multiple,t,!1)}};Sp=Ad;bp=Ar;var Ly={usingClientEntryPoint:!1,Events:[Un,oo,Vs,vp,Lp,Ad]},on={findFiberByHostInstance:Cr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Sy={bundleType:on.bundleType,version:on.version,rendererPackageName:on.rendererPackageName,rendererConfig:on.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:La.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=wp(e),e===null?null:e.stateNode},findFiberByHostInstance:on.findFiberByHostInstance||yy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(nn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!nn.isDisabled&&nn.supportsFiber))try{_s=nn.inject(Sy),ta=nn}catch{}var nn;Lt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ly;Lt.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ud(t))throw Error(D(200));return xy(e,t,null,a)};Lt.createRoot=function(e,t){if(!Ud(e))throw Error(D(299));var a=!1,r="",o=rg;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=zd(e,1,!1,null,null,a,!1,r,o),e[xa]=t.current,Rn(e.nodeType===8?e.parentNode:e),new Od(t)};Lt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(D(188)):(e=Object.keys(e).join(","),Error(D(268,e)));return e=wp(t),e=e===null?null:e.stateNode,e};Lt.flushSync=function(e){return Ar(e)};Lt.hydrate=function(e,t,a){if(!Js(t))throw Error(D(200));return ei(null,e,t,!0,a)};Lt.hydrateRoot=function(e,t,a){if(!Ud(e))throw Error(D(405));var r=a!=null&&a.hydratedSources||null,o=!1,n="",l=rg;if(a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onRecoverableError!==void 0&&(l=a.onRecoverableError)),t=ag(t,null,e,1,a??null,o,!1,n,l),e[xa]=t.current,Rn(e),r)for(e=0;e<r.length;e++)a=r[e],o=a._getVersion,o=o(a._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[a,o]:t.mutableSourceEagerHydrationData.push(a,o);return new Ys(t)};Lt.render=function(e,t,a){if(!Js(t))throw Error(D(200));return ei(null,e,t,!1,a)};Lt.unmountComponentAtNode=function(e){if(!Js(e))throw Error(D(40));return e._reactRootContainer?(Ar(function(){ei(null,null,e,!1,function(){e._reactRootContainer=null,e[xa]=null})}),!0):!1};Lt.unstable_batchedUpdates=Ad;Lt.unstable_renderSubtreeIntoContainer=function(e,t,a,r){if(!Js(a))throw Error(D(200));if(e==null||e._reactInternals===void 0)throw Error(D(38));return ei(e,t,a,!1,r)};Lt.version="18.3.1-next-f1338f8080-20240426"});var sg=da((BS,lg)=>{"use strict";function ng(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ng)}catch(e){console.error(e)}}ng(),lg.exports=og()});var ug=da(_d=>{"use strict";var ig=sg();_d.createRoot=ig.createRoot,_d.hydrateRoot=ig.hydrateRoot;var zS});var hg=da(oi=>{"use strict";var W1=Re(),V1=Symbol.for("react.element"),j1=Symbol.for("react.fragment"),G1=Object.prototype.hasOwnProperty,$1=W1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,X1={key:!0,ref:!0,__self:!0,__source:!0};function gg(e,t,a){var r,o={},n=null,l=null;a!==void 0&&(n=""+a),t.key!==void 0&&(n=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)G1.call(t,r)&&!X1.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:V1,type:e,key:n,ref:l,props:o,_owner:$1.current}}oi.Fragment=j1;oi.jsx=gg;oi.jsxs=gg});var X=da((dw,xg)=>{"use strict";xg.exports=hg()});var Kh=q(ug());var ri=q(Re(),1);var ti=(...e)=>e.filter((t,a,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===a).join(" ").trim();var dg=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var cg=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,r)=>r?r.toUpperCase():a.toLowerCase());var Hd=e=>{let t=cg(e);return t.charAt(0).toUpperCase()+t.slice(1)};var Hn=q(Re(),1);var ai={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var fg=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};var Po=q(Re(),1);var by=(0,Po.createContext)({});var pg=()=>(0,Po.useContext)(by);var mg=(0,Hn.forwardRef)(({color:e,size:t,strokeWidth:a,absoluteStrokeWidth:r,className:o="",children:n,iconNode:l,...s},i)=>{let{size:c=24,strokeWidth:p=2,absoluteStrokeWidth:m=!1,color:h="currentColor",className:L=""}=pg()??{},f=r??m?Number(a??p)*24/Number(t??c):a??p;return(0,Hn.createElement)("svg",{ref:i,...ai,width:t??c??ai.width,height:t??c??ai.height,stroke:e??h,strokeWidth:f,className:ti("lucide",L,o),...!n&&!fg(s)&&{"aria-hidden":"true"},...s},[...l.map(([b,E])=>(0,Hn.createElement)(b,E)),...Array.isArray(n)?n:[n]])});var I=(e,t)=>{let a=(0,ri.forwardRef)(({className:r,...o},n)=>(0,ri.createElement)(mg,{ref:n,iconNode:t,className:ti(`lucide-${dg(Hd(e))}`,`lucide-${e}`,r),...o}));return a.displayName=Hd(e),a};var Cy=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],ot=I("activity",Cy);var Iy=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Br=I("arrow-left",Iy);var wy=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ra=I("arrow-right",wy);var ky=[["path",{d:"M 22 14 L 22 10",key:"nqc4tb"}],["rect",{x:"2",y:"6",width:"16",height:"12",rx:"2",key:"13zb55"}]],qn=I("battery",ky);var Py=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Wn=I("book-open",Py);var Ry=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]],Vn=I("box",Ry);var Ty=[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],jn=I("building-2",Ty);var Ey=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Vt=I("chart-column",Ey);var Fy=[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]],Ya=I("chart-no-axes-column",Fy);var Ay=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Ro=I("check",Ay);var My=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Gn=I("chevron-down",My);var Dy=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],$n=I("chevron-left",Dy);var By=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Ja=I("chevron-right",By);var zy=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],At=I("circle-alert",zy);var Ny=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],er=I("circle-check",Ny);var Oy=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],He=I("circle-check-big",Oy);var Uy=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],jt=I("circle-question-mark",Uy);var _y=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Sa=I("circle-x",_y);var Hy=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],zr=I("clock",Hy);var qy=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],Xn=I("code",qy);var Wy=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],To=I("copy",Wy);var Vy=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],tr=I("cpu",Vy);var jy=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],St=I("database",jy);var Gy=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Kn=I("download",Gy);var $y=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]],Nr=I("droplets",$y);var Xy=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Qn=I("external-link",Xy);var Ky=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],Eo=I("eye-off",Ky);var Qy=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ba=I("eye",Qy);var Zy=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",key:"18mbvz"}],["path",{d:"M6.453 15h11.094",key:"3shlmq"}],["path",{d:"M8.5 2h7",key:"csnxdl"}]],ar=I("flask-conical",Zy);var Yy=[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]],Zn=I("git-branch",Yy);var Jy=[["circle",{cx:"12",cy:"18",r:"3",key:"1mpf1b"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",key:"1uq4wg"}],["path",{d:"M12 12v3",key:"158kv8"}]],Yn=I("git-fork",Jy);var e1=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],rr=I("globe",e1);var t1=[["path",{d:"M10 16h.01",key:"1bzywj"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"18tbho"}],["path",{d:"M21.946 12.013H2.054",key:"zqlbp7"}],["path",{d:"M6 16h.01",key:"1pmjb7"}]],Jn=I("hard-drive",t1);var a1=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],or=I("house",a1);var r1=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],el=I("info",r1);var o1=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],nr=I("layers",o1);var n1=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],tl=I("layout-dashboard",n1);var l1=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],lr=I("loader-circle",l1);var s1=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],oa=I("lock",s1);var i1=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],Fo=I("log-in",i1);var u1=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Ao=I("log-out",u1);var d1=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],na=I("mail",d1);var c1=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],sr=I("map-pin",c1);var f1=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],Or=I("menu",f1);var p1=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Ur=I("message-square",p1);var m1=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],al=I("monitor",m1);var g1=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],_r=I("moon",g1);var h1=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]],rl=I("network",h1);var x1=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],Hr=I("pause",x1);var y1=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],ol=I("phone",y1);var v1=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Ca=I("play",v1);var L1=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],la=I("plus",L1);var S1=[["path",{d:"M12 22v-5",key:"1ega77"}],["path",{d:"M15 8V2",key:"18g5xt"}],["path",{d:"M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z",key:"1xoxul"}],["path",{d:"M9 8V2",key:"14iosj"}]],nl=I("plug",S1);var b1=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Mo=I("radio",b1);var C1=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Ia=I("refresh-cw",C1);var I1=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Do=I("search",I1);var w1=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],ll=I("send",w1);var k1=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],qr=I("settings",k1);var P1=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],ir=I("shield",P1);var R1=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],sl=I("star",R1);var T1=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Wr=I("sun",T1);var E1=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],il=I("target",E1);var F1=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],ur=I("terminal",F1);var A1=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",key:"17jzev"}]],Vr=I("thermometer",A1);var M1=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Gt=I("trash-2",M1);var D1=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],wa=I("trending-up",D1);var B1=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],ul=I("upload",B1);var z1=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],Bo=I("user-plus",z1);var N1=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],dl=I("user",N1);var O1=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],dr=I("users",O1);var U1=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]],ka=I("wifi",U1);var _1=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]],jr=I("wind",_1);var H1=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],$t=I("x",H1);var q1=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Ne=I("zap",q1);var yg=q(X());var vg=q(X());var K1=q(X());var zo=q(X()),Q1=({size:e="md",className:t="",text:a})=>{let r={sm:"h-4 w-4",md:"h-8 w-8",lg:"h-12 w-12"};return(0,zo.jsx)("div",{className:`flex items-center justify-center ${t}`,children:(0,zo.jsxs)("div",{className:"flex flex-col items-center space-y-2",children:[(0,zo.jsx)(lr,{className:`animate-spin text-blue-600 ${r[e]}`}),a&&(0,zo.jsx)("p",{className:"text-sm text-gray-600 animate-pulse",children:a})]})})},qd=Q1;var Lg=q(X()),Z1=({children:e,size:t="lg",className:a=""})=>(0,Lg.jsx)("div",{className:`mx-auto px-4 sm:px-6 lg:px-8 ${{sm:"max-w-2xl",md:"max-w-4xl",lg:"max-w-6xl",xl:"max-w-7xl",full:"max-w-full"}[t]} ${a}`,children:e}),Wd=Z1;var Sg=q(X());var Ig=q(Re());var cr=q(Re()),Cg=q(X()),Y1={colors:{rust:"#0071E3",orange:"#0071E3",amber:"#0071E3",yellow:"#0071E3",gray:"#86868B",zinc:"#86868B",stone:"#86868B",slate:"#0071E3",indigo:"#0071E3",purple:"#0071E3",teal:"#0071E3",navy:"#1D1D1F",navyLight:"#3A3A3C",navyDark:"#000000",gold:"#0071E3",goldLight:"#2997FF",goldDark:"#0068D0",champagne:"#F5F5F7",success:"#34C759",warning:"#FF9500",error:"#FF3B30",info:"#0071E3",gruvYellow:"#0071E3",gruvYellowB:"#2997FF",gruvOrange:"#0071E3",gruvOrangeB:"#2997FF",gruvAqua:"#0071E3",gruvAquaB:"#2997FF",gruvBlue:"#0071E3",gruvBlueB:"#2997FF",gruvPurple:"#0071E3",gruvPurpleB:"#2997FF",gruvGreen:"#0071E3",gruvGreenB:"#2997FF",gruvRed:"#FF3B30",gruvRedB:"#FF453A",background:"#F5F5F7",surface:"#FFFFFF",card:"#FFFFFF",overlay:"rgba(255,255,255,0.85)",text:{primary:"#1D1D1F",secondary:"#86868B",tertiary:"#A1A1A6",inverse:"#FFFFFF"},border:{primary:"rgba(0,0,0,0.08)",secondary:"rgba(0,0,0,0.12)",focus:"#0071E3"},shadow:{sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)",lg:"0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.08)",xl:"0 1px 3px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.10)"}},gradients:{primary:"linear-gradient(135deg, #0071E3 0%, #2997FF 100%)",secondary:"linear-gradient(135deg, #34C759 0%, #30B0C7 100%)",accent:"linear-gradient(135deg, #0071E3 0%, #5856D6 100%)",background:"linear-gradient(180deg, #F5F5F7 0%, #FFFFFF 100%)",gold:"linear-gradient(135deg, #0068D0 0%, #0071E3 60%, #2997FF 100%)",glass:"rgba(255,255,255,0.72)"}},J1={colors:{rust:"#2997FF",orange:"#2997FF",amber:"#2997FF",yellow:"#2997FF",gray:"#636366",zinc:"#636366",stone:"#636366",slate:"#2997FF",indigo:"#2997FF",purple:"#2997FF",teal:"#2997FF",navy:"#F5F5F7",navyLight:"#E5E5EA",navyDark:"#000000",gold:"#2997FF",goldLight:"#5AC8FA",goldDark:"#0A84FF",champagne:"#2C2C2E",success:"#30D158",warning:"#FF9F0A",error:"#FF453A",info:"#2997FF",gruvYellow:"#2997FF",gruvYellowB:"#5AC8FA",gruvOrange:"#2997FF",gruvOrangeB:"#5AC8FA",gruvAqua:"#2997FF",gruvAquaB:"#5AC8FA",gruvBlue:"#2997FF",gruvBlueB:"#5AC8FA",gruvPurple:"#2997FF",gruvPurpleB:"#5AC8FA",gruvGreen:"#2997FF",gruvGreenB:"#5AC8FA",gruvRed:"#FF453A",gruvRedB:"#FF453A",background:"#000000",surface:"#1C1C1E",card:"#1C1C1E",overlay:"rgba(28,28,30,0.90)",text:{primary:"#F5F5F7",secondary:"#98989D",tertiary:"#636366",inverse:"#000000"},border:{primary:"rgba(255,255,255,0.08)",secondary:"rgba(255,255,255,0.12)",focus:"#2997FF"},shadow:{sm:"0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",md:"0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)",lg:"0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35)",xl:"0 1px 3px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.45)"}},gradients:{primary:"linear-gradient(135deg, #0A84FF 0%, #5AC8FA 100%)",secondary:"linear-gradient(135deg, #30D158 0%, #32ADE6 100%)",accent:"linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)",background:"linear-gradient(180deg, #000000 0%, #1C1C1E 100%)",gold:"linear-gradient(135deg, #0A84FF 0%, #2997FF 100%)",glass:"rgba(28,28,30,0.72)"}},bg=(0,cr.createContext)(void 0),Ee=()=>{let e=(0,cr.useContext)(bg);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Vd=({children:e})=>{let[t,a]=(0,cr.useState)(()=>localStorage.getItem("blazecore-theme")||"light"),r=t==="light"?Y1:J1;(0,cr.useEffect)(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("blazecore-theme",t)},[t]);let o=()=>a(l=>l==="light"?"dark":"light"),n=l=>a(l);return(0,Cg.jsx)(bg.Provider,{value:{theme:r,mode:t,toggleTheme:o,setTheme:n},children:e})};var wg=q(X());var ev=q(X());var kg=q(Re());var Pg=q(X());var Bt=q(Re());function cl(e,t){return function(){return e.apply(t,arguments)}}var{toString:tv}=Object.prototype,{getPrototypeOf:fr}=Object,{iterator:ml,toStringTag:Eg}=Symbol,fl=(({hasOwnProperty:e})=>(t,a)=>e.call(t,a))(Object.prototype),Fg=e=>typeof e=="string"&&(e==="__proto__"||e==="constructor"||e==="prototype"),Ag=(e,t,a)=>e===Object.prototype||!a&&t===null,av=e=>{if(!Object.isExtensible(e))return!1;let t=Object.getOwnPropertyNames(e);return Object.getOwnPropertySymbols&&t.push(...Object.getOwnPropertySymbols(e)),t.every(a=>{if(Fg(a))return!1;let r=Object.getOwnPropertyDescriptor(e,a);return!!r&&r.configurable&&r.writable===!0})},pl=(e,t)=>{let a=e,r=[];for(;a!=null;){if(r.indexOf(a)!==-1)return!1;r.push(a);let o=fr(a);if(Ag(a,o,a===e))return!1;if(fl(a,t))return!0;a=o}return!1},rv=(e,t)=>e!=null&&pl(e,t)?e[t]:void 0,ov=e=>{if(e==null||typeof e!="object"&&typeof e!="function")return e;let t=fr(e);if(t===null&&av(e))return e;let a=Object.create(null),r=Object.create(null),o=[],n=e;for(;n!=null&&o.indexOf(n)===-1;){o.push(n);let l=n===e?t:fr(n);if(Ag(n,l,n===e))break;let s=Object.getOwnPropertyNames(n);Object.getOwnPropertySymbols&&s.push(...Object.getOwnPropertySymbols(n));for(let i of s)Fg(i)||fl(r,i)||(a[i]=e[i],r[i]=!0);n=l}return a},Gd=(e=>t=>{let a=tv.call(t);return e[a]||(e[a]=a.slice(8,-1).toLowerCase())})(Object.create(null)),Mt=e=>(e=e.toLowerCase(),t=>Gd(t)===e),li=e=>t=>typeof t===e,{isArray:$r}=Array,Xr=li("undefined");function No(e){return e!==null&&!Xr(e)&&e.constructor!==null&&!Xr(e.constructor)&&ft(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var Mg=Mt("ArrayBuffer");function nv(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Mg(e.buffer),t}var lv=li("string"),ft=li("function"),Dg=li("number"),Oo=e=>e!==null&&typeof e=="object",sv=e=>e===!0||e===!1,ni=e=>{if(!Oo(e))return!1;let t=fr(e);return(t===null||t===Object.prototype||fr(t)===null)&&!pl(e,Eg)&&!pl(e,ml)},iv=e=>{if(!Oo(e)||No(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},uv=Mt("Date"),dv=Mt("File"),cv=e=>!!(e&&typeof e.uri<"u"),fv=e=>e&&typeof e.getParts<"u",pv=Mt("Blob"),mv=Mt("FileList"),gv=Mt("Set"),hv=e=>Oo(e)&&ft(e.pipe);function xv(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}var Rg=xv(),Tg=typeof Rg.FormData<"u"?Rg.FormData:void 0,yv=e=>{if(!e)return!1;if(Tg&&e instanceof Tg)return!0;let t=fr(e);if(!t||t===Object.prototype||!ft(e.append))return!1;let a=Gd(e);return a==="formdata"||a==="object"&&ft(e.toString)&&e.toString()==="[object FormData]"},vv=Mt("URLSearchParams"),[Lv,Sv,bv,Cv]=["ReadableStream","Request","Response","Headers"].map(Mt),Iv=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function gl(e,t,{allOwnKeys:a=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),$r(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{if(No(e))return;let n=a?Object.getOwnPropertyNames(e):Object.keys(e),l=n.length,s;for(r=0;r<l;r++)s=n[r],t.call(null,e[s],s,e)}}function Bg(e,t){if(No(e))return null;t=t.toLowerCase();let a=Object.keys(e),r=a.length,o;for(;r-- >0;)if(o=a[r],t===o.toLowerCase())return o;return null}var Gr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,zg=e=>!Xr(e)&&e!==Gr;function jd(...e){let{caseless:t,skipUndefined:a}=zg(this)&&this||{},r={},o=(n,l)=>{if(l==="__proto__"||l==="constructor"||l==="prototype")return;let s=t&&typeof l=="string"&&Bg(r,l)||l,i=fl(r,s)?r[s]:void 0;ni(i)&&ni(n)?r[s]=jd(i,n):ni(n)?r[s]=jd({},n):$r(n)?r[s]=n.slice():(!a||!Xr(n))&&(r[s]=n)};for(let n=0,l=e.length;n<l;n++){let s=e[n];if(!s||No(s)||(gl(s,o),typeof s!="object"||$r(s)))continue;let i=Object.getOwnPropertySymbols(s);for(let c=0;c<i.length;c++){let p=i[c];zv.call(s,p)&&o(s[p],p)}}return r}var wv=(e,t,a,{allOwnKeys:r}={})=>(gl(t,(o,n)=>{a&&ft(o)?Object.defineProperty(e,n,{__proto__:null,value:cl(o,a),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,n,{__proto__:null,value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),kv=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Pv=(e,t,a,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),a&&Object.assign(e.prototype,a)},Rv=(e,t,a,r)=>{let o,n,l,s={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),n=o.length;n-- >0;)l=o[n],(!r||r(l,e,t))&&!s[l]&&(t[l]=e[l],s[l]=!0);e=a!==!1&&fr(e)}while(e&&(!a||a(e,t))&&e!==Object.prototype);return t},Tv=(e,t,a)=>{e=String(e),(a===void 0||a>e.length)&&(a=e.length),a-=t.length;let r=e.indexOf(t,a);return r!==-1&&r===a},Ev=e=>{if(!e)return null;if($r(e))return e;let t=e.length;if(!Dg(t))return null;let a=new Array(t);for(;t-- >0;)a[t]=e[t];return a},Fv=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&fr(Uint8Array)),Av=(e,t)=>{let r=(e&&e[ml]).call(e),o;for(;(o=r.next())&&!o.done;){let n=o.value;t.call(e,n[0],n[1])}},Mv=(e,t)=>{let a,r=[];for(;(a=e.exec(t))!==null;)r.push(a);return r},Dv=Mt("HTMLFormElement"),Bv=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(a,r,o){return r.toUpperCase()+o}),{propertyIsEnumerable:zv}=Object.prototype,Nv=Mt("RegExp"),Ng=(e,t)=>{let a=Object.getOwnPropertyDescriptors(e),r={};gl(a,(o,n)=>{let l;(l=t(o,n,e))!==!1&&(r[n]=l||o)}),Object.defineProperties(e,r)},Ov=e=>{Ng(e,(t,a)=>{if(ft(e)&&["arguments","caller","callee"].includes(a))return!1;let r=e[a];if(ft(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+a+"'")})}})},Uv=(e,t)=>{let a={},r=o=>{o.forEach(n=>{a[n]=!0})};return $r(e)?r(e):r(String(e).split(t)),a},_v=()=>{},Hv=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function qv(e){return!!(e&&ft(e.append)&&e[Eg]==="FormData"&&e[ml])}var Wv=e=>{let t=new WeakSet,a=r=>{if(Oo(r)){if(t.has(r))return;if(No(r))return r;if(!("toJSON"in r)){t.add(r);let o;if(gv(r)){o=[];for(let n of r){let l=a(n);!Xr(l)&&o.push(l)}}else o=$r(r)?[]:{},gl(r,(n,l)=>{let s=a(n);!Xr(s)&&(o[l]=s)});return t.delete(r),o}}return r};return a(e)},Vv=Mt("AsyncFunction"),jv=e=>e&&(Oo(e)||ft(e))&&ft(e.then)&&ft(e.catch),Og=((e,t)=>e?setImmediate:t?((a,r)=>(Gr.addEventListener("message",({source:o,data:n})=>{o===Gr&&n===a&&r.length&&r.shift()()},!1),o=>{r.push(o),Gr.postMessage(a,"*")}))(`axios@${Math.random()}`,[]):a=>setTimeout(a))(typeof setImmediate=="function",ft(Gr.postMessage)),Gv=typeof queueMicrotask<"u"?queueMicrotask.bind(Gr):typeof process<"u"&&process.nextTick||Og,Ug=e=>e!=null&&ft(e[ml]),$v=e=>e!=null&&pl(e,ml)&&Ug(e),x={isArray:$r,isArrayBuffer:Mg,isBuffer:No,isFormData:yv,isArrayBufferView:nv,isString:lv,isNumber:Dg,isBoolean:sv,isObject:Oo,isPlainObject:ni,isEmptyObject:iv,isReadableStream:Lv,isRequest:Sv,isResponse:bv,isHeaders:Cv,isUndefined:Xr,isDate:uv,isFile:dv,isReactNativeBlob:cv,isReactNative:fv,isBlob:pv,isRegExp:Nv,isFunction:ft,isStream:hv,isURLSearchParams:vv,isTypedArray:Fv,isFileList:mv,forEach:gl,merge:jd,extend:wv,trim:Iv,stripBOM:kv,inherits:Pv,toFlatObject:Rv,kindOf:Gd,kindOfTest:Mt,endsWith:Tv,toArray:Ev,forEachEntry:Av,matchAll:Mv,isHTMLForm:Dv,hasOwnProperty:fl,hasOwnProp:fl,hasOwnInPrototypeChain:pl,getSafeProp:rv,toSafeFlatObject:ov,reduceDescriptors:Ng,freezeMethods:Ov,toObjectSet:Uv,toCamelCase:Bv,noop:_v,toFiniteNumber:Hv,findKey:Bg,global:Gr,isContextDefined:zg,isSpecCompliantForm:qv,toJSONObject:Wv,isAsyncFn:Vv,isThenable:jv,setImmediate:Og,asap:Gv,isIterable:Ug,isSafeIterable:$v};var Xv=x.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),_g=e=>{let t={},a,r,o;return e&&e.split(`
`).forEach(function(l){o=l.indexOf(":"),a=l.substring(0,o).trim().toLowerCase(),r=l.substring(o+1).trim();let s=x.hasOwnProp(t,a);!a||s&&x.hasOwnProp(Xv,a)||(a==="set-cookie"?s?t[a].push(r):t[a]=[r]:t[a]=s?t[a]+", "+r:r)}),t};function Kv(e){let t=0,a=e.length;for(;t<a;){let r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;a>t;){let r=e.charCodeAt(a-1);if(r!==9&&r!==32)break;a-=1}return t===0&&a===e.length?e:e.slice(t,a)}var Qv=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),Zv=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function $d(e,t){return x.isArray(e)?e.map(a=>$d(a,t)):Kv(String(e).replace(t,""))}var Hg=e=>$d(e,Qv),Yv=e=>$d(e,Zv);function si(e){let t=Object.create(null);return x.forEach(e.toJSON(),(a,r)=>{t[r]=Yv(a)}),t}var qg=Symbol("internals");function hl(e){return e&&String(e).trim().toLowerCase()}function ii(e){return e===!1||e==null?e:x.isArray(e)?e.map(ii):Hg(String(e))}function Jv(e){let t=Object.create(null),a=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,r;for(;r=a.exec(e);)t[r[1]]=r[2];return t}var eL=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function Xd(e){let t=0,a=e.length;for(;t<a;){let r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;a>t;){let r=e.charCodeAt(a-1);if(r!==9&&r!==32)break;a-=1}return t===0&&a===e.length?e:e.slice(t,a)}function tL(e){let t=e.length-1;if(t<1||e.charCodeAt(0)!==34||e.charCodeAt(t)!==34)return e;let a="";for(let r=1;r<t;r++){let o=e.charCodeAt(r);if(o===34||o===92&&(r+=1,r>=t))return e;a+=e[r]}return a}function aL(e){let t=Object.create(null),a=String(e),r=0,o=!1,n=!1;function l(s){let i=Xd(a.slice(r,s)),c=i.indexOf("=");if(c<1)return;let p=Xd(i.slice(0,c));if(!eL.test(p))return;let m=p.toLowerCase();if(m==="__proto__"||m==="constructor"||m==="prototype")return;let h=Xd(i.slice(c+1));t[m]=tL(h)}for(let s=0;s<a.length;s++){let i=a.charCodeAt(s);o?n?n=!1:i===92?n=!0:i===34&&(o=!1):i===34?o=!0:(i===44||i===59)&&(l(s),r=s+1)}return l(a.length),t}var rL=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Kd(e,t,a,r,o){if(x.isFunction(r))return r.call(this,t,a);if(o&&(t=a),!!x.isString(t)){if(x.isString(r))return t.indexOf(r)!==-1;if(x.isRegExp(r))return r.test(t)}}function oL(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,a,r)=>a.toUpperCase()+r)}function nL(e,t){let a=x.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+a,{__proto__:null,value:function(o,n,l){return this[r].call(this,t,o,n,l)},configurable:!0})})}var Uo=class{constructor(t){t&&this.set(t)}set(t,a,r){let o=this;function n(s,i,c){let p=hl(i);if(!p)return;let m=x.findKey(o,p);(!m||o[m]===void 0||c===!0||c===void 0&&o[m]!==!1)&&(o[m||i]=ii(s))}let l=(s,i)=>x.forEach(s,(c,p)=>n(c,p,i));if(x.isPlainObject(t)||t instanceof this.constructor)l(t,a);else if(x.isString(t)&&(t=t.trim())&&!rL(t))l(_g(t),a);else if(x.isObject(t)&&x.isSafeIterable(t)){let s=Object.create(null),i,c;for(let p of t){if(!x.isArray(p))throw new TypeError("Object iterator must return a key-value pair");c=p[0],x.hasOwnProp(s,c)?(i=s[c],s[c]=x.isArray(i)?[...i,p[1]]:[i,p[1]]):s[c]=p[1]}l(s,a)}else t!=null&&n(a,t,r);return this}get(t,a){if(t=hl(t),t){let r=x.findKey(this,t);if(r){let o=this[r];if(!a)return o;if(a===!0)return Jv(o);if(x.isFunction(a))return a.call(this,o,r);if(x.isRegExp(a))return a.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,a){if(t=hl(t),t){let r=x.findKey(this,t);return!!(r&&this[r]!==void 0&&(!a||Kd(this,this[r],r,a)))}return!1}delete(t,a){let r=this,o=!1;function n(l){if(l=hl(l),l){let s=x.findKey(r,l);s&&(!a||Kd(r,r[s],s,a))&&(delete r[s],o=!0)}}return x.isArray(t)?t.forEach(n):n(t),o}clear(t){let a=Object.keys(this),r=a.length,o=!1;for(;r--;){let n=a[r];(!t||Kd(this,this[n],n,t,!0))&&(delete this[n],o=!0)}return o}normalize(t){let a=this,r={};return x.forEach(this,(o,n)=>{let l=x.findKey(r,n);if(l){a[l]=ii(o),delete a[n];return}let s=t?oL(n):String(n).trim();s!==n&&delete a[n],a[s]=ii(o),r[s]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){let a=Object.create(null);return x.forEach(this,(r,o)=>{r!=null&&r!==!1&&(a[o]=t&&x.isArray(r)?r.join(", "):r)}),a}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,a])=>t+": "+a).join(`
`)}getSetCookie(){let t=this.get("set-cookie");return x.isArray(t)?t:t==null||t===!1?[]:[t]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static parseParameters(t){return aL(t)}static concat(t,...a){let r=new this(t);return a.forEach(o=>r.set(o)),r}static accessor(t){let r=(this[qg]=this[qg]={accessors:{}}).accessors,o=this.prototype;function n(l){let s=hl(l);r[s]||(nL(o,l),r[s]=!0)}return x.isArray(t)?t.forEach(n):n(t),this}};Uo.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);x.reduceDescriptors(Uo.prototype,({value:e},t)=>{let a=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[a]=r}}});x.freezeMethods(Uo);var Ie=Uo;var xl="[REDACTED ****]";function lL(e){if(x.hasOwnProp(e,"toJSON"))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(x.hasOwnProp(t,"toJSON"))return!0;t=Object.getPrototypeOf(t)}return!1}function sL(e,t){let a=new Set(t.map(n=>String(n).toLowerCase())),r=[],o=n=>{if(n===null||typeof n!="object"||x.isBuffer(n))return n;if(r.indexOf(n)!==-1)return;n instanceof Ie&&(n=n.toJSON()),r.push(n);let l;if(x.isArray(n))l=[],n.forEach((s,i)=>{let c=o(s);x.isUndefined(c)||(l[i]=c)});else{if(!x.isPlainObject(n)&&lL(n))return r.pop(),n;l=Object.create(null);for(let[s,i]of Object.entries(n)){let c=a.has(s.toLowerCase())?xl:o(i);x.isUndefined(c)||(l[s]=c)}}return r.pop(),l};return o(e)}function Wg(e){try{return String(e)}catch{return""}}function iL(e){return e.errors.map(a=>{try{return a&&a.message?Wg(a.message):Wg(a)}catch{return""}}).filter(Boolean).join("; ")||e.name||"AggregateError"}var qe=class e extends Error{static from(t,a,r,o,n,l){let s=t.message;!s&&x.isArray(t.errors)&&t.errors.length&&(s=iL(t));let i=new e(s,a||t.code,r,o,n);return Object.defineProperty(i,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),l&&Object.assign(i,l),i}constructor(t,a,r,o,n){super(t),Object.defineProperty(this,"message",{__proto__:null,value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,a&&(this.code=a),r&&(this.config=r),o&&(this.request=o),n&&(this.response=n,this.status=n.status)}toJSON(){let t=this.config,a=t&&x.hasOwnProp(t,"redact")?t.redact:void 0,r=x.isArray(a)&&a.length>0?sL(t,a):x.toJSONObject(t);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:r,code:this.code,status:this.status}}};qe.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";qe.ERR_BAD_OPTION="ERR_BAD_OPTION";qe.ECONNABORTED="ECONNABORTED";qe.ETIMEDOUT="ETIMEDOUT";qe.ECONNREFUSED="ECONNREFUSED";qe.ERR_NETWORK="ERR_NETWORK";qe.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";qe.ERR_DEPRECATED="ERR_DEPRECATED";qe.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";qe.ERR_BAD_REQUEST="ERR_BAD_REQUEST";qe.ERR_CANCELED="ERR_CANCELED";qe.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";qe.ERR_INVALID_URL="ERR_INVALID_URL";qe.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";var O=qe;var pr=null;var Yd=100;function Zd(e){return x.isPlainObject(e)||x.isArray(e)}function Vg(e){return x.endsWith(e,"[]")?e.slice(0,-2):e}function Qd(e,t,a){return e?e.concat(t).map(function(o,n){return o=Vg(o),!a&&n?"["+o+"]":o}).join(a?".":""):t}function uL(e){return x.isArray(e)&&!e.some(Zd)}var dL=x.toFlatObject(x,{},null,function(t){return/^is[A-Z]/.test(t)});function cL(e,t,a){if(!x.isObject(e))throw new TypeError("target must be an object");t=t||new(pr||FormData);let r=(d,g)=>{let S=x.getSafeProp(a,d);return x.isUndefined(S)?g:S},o=r("metaTokens",!0),n=r("visitor")||b,l=r("dots",!1),s=r("indexes",!1),i=r("Blob")||typeof Blob<"u"&&Blob,c=r("maxDepth",Yd),p=i&&x.isSpecCompliantForm(t),m=[];if(!x.isFunction(n))throw new TypeError("visitor must be a function");function h(d){if(d===null)return"";if(x.isDate(d))return d.toISOString();if(x.isBoolean(d))return d.toString();if(!p&&x.isBlob(d))throw new O("Blob is not supported. Use a Buffer instead.");if(x.isArrayBuffer(d)||x.isTypedArray(d)){if(p&&typeof i=="function")return new i([d]);if(pr&&pr.isBufferAvailable())return pr.from(d);throw new O("Blob is not supported. Use a Buffer instead.",O.ERR_NOT_SUPPORT)}return d}function L(d){if(d>c)throw new O("Object is too deeply nested ("+d+" levels). Max depth: "+c,O.ERR_FORM_DATA_DEPTH_EXCEEDED)}function f(d,g){if(c===1/0)return JSON.stringify(d);let S=[];return JSON.stringify(d,function(k,w){if(!x.isObject(w))return w;for(;S.length&&S[S.length-1]!==this;)S.pop();return S.push(w),L(g+S.length-1),w})}function b(d,g,S){let T=d;if(x.isReactNative(t)&&x.isReactNativeBlob(d))return t.append(Qd(S,g,l),h(d)),!1;if(d&&!S&&typeof d=="object"){if(x.endsWith(g,"{}"))g=o?g:g.slice(0,-2),d=f(d,1);else if(x.isArray(d)&&uL(d)||(x.isFileList(d)||x.endsWith(g,"[]"))&&(T=x.toArray(d)))return g=Vg(g),T.forEach(function(w,F){!(x.isUndefined(w)||w===null)&&t.append(s===!0?Qd([g],F,l):s===null?g:g+"[]",h(w))}),!1}return Zd(d)?!0:(t.append(Qd(S,g,l),h(d)),!1)}let E=Object.assign(dL,{defaultVisitor:b,convertValue:h,isVisitable:Zd});function u(d,g,S=0){if(!x.isUndefined(d)){if(L(S),m.indexOf(d)!==-1)throw new Error("Circular reference detected in "+g.join("."));m.push(d),x.forEach(d,function(k,w){(!(x.isUndefined(k)||k===null)&&n.call(t,k,x.isString(w)?w.trim():w,g,E))===!0&&u(k,g?g.concat(w):[w],S+1)}),m.pop()}}if(!x.isObject(e))throw new TypeError("data must be an object");return u(e),t}var mr=cL;function jg(e){let t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}function Gg(e,t){this._pairs=[],e&&mr(e,this,t)}var $g=Gg.prototype;$g.append=function(t,a){this._pairs.push([t,a])};$g.toString=function(t){let a=t?r=>t.call(this,r,jg):jg;return this._pairs.map(function(o){return a(o[0])+"="+a(o[1])},"").join("&")};var ui=Gg;function fL(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function yl(e,t,a){if(!t)return e;e=e||"";let r=x.isFunction(a)?{serialize:a}:a,o=x.getSafeProp(r,"encode")||fL,n=x.getSafeProp(r,"serialize"),l;if(n?l=n(t,r):l=x.isURLSearchParams(t)?t.toString():new ui(t,r).toString(o),l){let s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+l}return e}var vl=Symbol("internals");function Kg(e){return e?e.length:0}function Xg(e){if(e)for(;e.length&&e[e.length-1]===null;)e.pop()}function Ll(e,t){let a=e.handlers,r=Kg(a);a!==t.handlersRef?(t.handlersRef=a,t.handlerEntries.clear()):r!==t.handlersLength&&(r?t.handlerEntries.forEach(function(n,l){a[n.index]!==n.handler&&t.handlerEntries.delete(l)}):t.handlerEntries.clear()),t.handlersLength=r}var Jd=class{constructor(){this.handlers=[],this[vl]={handlersRef:this.handlers,handlersLength:this.handlers.length,handlerEntries:new Map,iterationDepth:0,nextId:0}}use(t,a,r){let o={fulfilled:t,rejected:a,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null},n=this[vl];this.handlers==null&&(this.handlers=[]),Ll(this,n);let l=n.nextId++;return this.handlers.push(o),n.handlerEntries.set(l,{handler:o,index:this.handlers.length-1}),n.handlersLength=this.handlers.length,l}eject(t){let a=this[vl];Ll(this,a);let r=a.handlerEntries.get(t);if(r){if(a.handlerEntries.delete(t),this.handlers[r.index]!==r.handler)return;this.handlers[r.index]=null,a.iterationDepth||(Xg(this.handlers),a.handlersLength=this.handlers.length)}}clear(){this.handlers&&(this.handlers=[],Ll(this,this[vl]))}forEach(t){let a=this[vl];Ll(this,a),a.iterationDepth++;try{x.forEach(this.handlers,function(o){o!==null&&t(o)})}finally{--a.iterationDepth||(Ll(this,a),Xg(this.handlers),a.handlersLength=Kg(this.handlers))}}},ec=Jd;var _o={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0};var Qg=typeof URLSearchParams<"u"?URLSearchParams:ui;var Zg=typeof FormData<"u"?FormData:null;var Yg=typeof Blob<"u"?Blob:null;var Jg={isBrowser:!0,classes:{URLSearchParams:Qg,FormData:Zg,Blob:Yg},protocols:["http","https","file","blob","url","data"]};var rc={};r0(rc,{hasBrowserEnv:()=>ac,hasStandardBrowserEnv:()=>pL,hasStandardBrowserWebWorkerEnv:()=>mL,navigator:()=>tc,origin:()=>gL});var ac=typeof window<"u"&&typeof document<"u",tc=typeof navigator=="object"&&navigator||void 0,pL=ac&&(!tc||["ReactNative","NativeScript","NS"].indexOf(tc.product)<0),mL=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",gL=ac&&window.location.href||"http://localhost";var me={...rc,...Jg};function oc(e,t){return mr(e,new me.classes.URLSearchParams,{visitor:function(a,r,o,n){return me.isNode&&x.isBuffer(a)?(this.append(r,a.toString("base64")),!1):n.defaultVisitor.apply(this,arguments)},...t})}var eh=Yd;function th(e){if(e>eh)throw new O("FormData field is too deeply nested ("+e+" levels). Max depth: "+eh,O.ERR_FORM_DATA_DEPTH_EXCEEDED)}function hL(e){let t=[],a=/[^.[\]]+|\[([^.[\]]*)]/g,r;for(;(r=a.exec(e))!==null;)th(t.length),t.push(r[0]==="[]"?"":r[1]||r[0]);return t}function xL(e){let t={},a=Object.keys(e),r,o=a.length,n;for(r=0;r<o;r++)n=a[r],t[n]=e[n];return t}function yL(e){function t(a,r,o,n){th(n);let l=a[n++];if(l==="__proto__")return!0;let s=Number.isFinite(+l),i=n>=a.length;return l=!l&&x.isArray(o)?o.length:l,i?(x.hasOwnProp(o,l)?o[l]=x.isArray(o[l])?o[l].concat(r):[o[l],r]:o[l]=r,!s):((!x.hasOwnProp(o,l)||!x.isObject(o[l]))&&(o[l]=[]),t(a,r,o[l],n)&&x.isArray(o[l])&&(o[l]=xL(o[l])),!s)}if(x.isFormData(e)&&x.isFunction(e.entries)){let a={};return x.forEachEntry(e,(r,o)=>{t(hL(r),o,a,0)}),a}return null}var di=yL;var vL=Object.freeze(["get","delete","head","options","post","put","patch","purge","link","unlink","query"]),ci=vL;var Ho=(e,t)=>e!=null&&x.hasOwnProp(e,t)?e[t]:void 0;function LL(e,t,a){if(x.isString(e))try{return(t||JSON.parse)(e),x.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(a||JSON.stringify)(e)}var nc={transitional:_o,adapter:["xhr","http","fetch"],transformRequest:[function(t,a){let r=a.getContentType()||"",o=r.indexOf("application/json")>-1,n=x.isObject(t);if(n&&x.isHTMLForm(t)&&(t=new FormData(t)),x.isFormData(t))return o?JSON.stringify(di(t)):t;if(x.isArrayBuffer(t)||x.isBuffer(t)||x.isStream(t)||x.isFile(t)||x.isBlob(t)||x.isReadableStream(t))return t;if(x.isArrayBufferView(t))return t.buffer;if(x.isURLSearchParams(t))return a.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let s;if(n){let i=Ho(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return oc(t,i).toString();if((s=x.isFileList(t))||r.indexOf("multipart/form-data")>-1){let c=Ho(this,"env"),p=c&&c.FormData;return mr(s?{"files[]":t}:t,p&&new p,i)}}return n||o?(a.setContentType("application/json",!1),LL(t)):t}],transformResponse:[function(t){let a=Ho(this,"transitional")||nc.transitional,r=a&&a.forcedJSONParsing,o=Ho(this,"responseType"),n=o==="json";if(x.isResponse(t)||x.isReadableStream(t))return t;if(t&&x.isString(t)&&(r&&!o||n)){let s=!(a&&a.silentJSONParsing)&&n;try{return JSON.parse(t,Ho(this,"parseReviver"))}catch(i){if(s)throw i.name==="SyntaxError"?O.from(i,O.ERR_BAD_RESPONSE,this,null,Ho(this,"response")):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:me.classes.FormData,Blob:me.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};x.forEach(ci,e=>{nc.headers[e]={}});var qo=nc;function Sl(e,t){let a=this||qo,r=t||a,o=Ie.from(r.headers),n=r.data;return x.forEach(e,function(s){n=s.call(a,n,o.normalize(),t?t.status:void 0)}),o.normalize(),n}function bl(e){return!!(e&&e.__CANCEL__)}var lc=class extends O{constructor(t,a,r){super(t??"canceled",O.ERR_CANCELED,a,r),this.name="CanceledError",this.__CANCEL__=!0}},sa=lc;function Cl(e,t,a){let r=a.config.validateStatus;!a.status||!r||r(a.status)?e(a):t(new O("Request failed with status code "+a.status,a.status>=400&&a.status<500?O.ERR_BAD_REQUEST:O.ERR_BAD_RESPONSE,a.config,a.request,a))}var SL=/[\t\n\r]/g;function Il(e){if(typeof e!="string")return e;let t=0;for(;t<e.length&&e.charCodeAt(t)<=32;)t++;return e.slice(t).replace(SL,"")}function wl(e){let t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||""}function bL(e,t){e=e||10;let a=new Array(e),r=new Array(e),o=0,n=0,l;return t=t!==void 0?t:1e3,function(i){let c=Date.now(),p=r[n];l||(l=c),a[o]=i,r[o]=c;let m=n,h=0;for(;m!==o;)h+=a[m++],m=m%e;if(o=(o+1)%e,o===n&&(n=(n+1)%e),c-l<t)return;let L=p&&c-p;return L?Math.round(h*1e3/L):void 0}}var ah=bL;function CL(e,t){let a=0,r=1e3/t,o,n,l=(p,m=Date.now())=>{a=m,o=null,n&&(clearTimeout(n),n=null),e(...p)};return[(...p)=>{let m=Date.now(),h=m-a;h>=r?l(p,m):(o=p,n||(n=setTimeout(()=>{n=null,l(o)},r-h)))},()=>o&&l(o),(...p)=>l(p)]}var rh=CL;var Wo=(e,t,a=3)=>{let r=0,o=ah(50,250);return rh(n=>{if(!n||!x.isNumber(n.loaded))return;let l=n.loaded,s=n.lengthComputable?n.total:void 0,i=Math.max(0,s!=null?Math.min(l,s):l),c=Math.max(0,i-r),p=o(c);r=Math.max(r,i);let m={loaded:i,total:s,progress:s?i/s:void 0,bytes:c,rate:p||void 0,estimated:p&&s?(s-i)/p:void 0,event:n,lengthComputable:s!=null,[t?"download":"upload"]:!0};e(m)},a)},sc=(e,t)=>{let a=e!=null;return[r=>t[0]({lengthComputable:a,total:e,loaded:r}),t[1]]},ic=(e,t=x.asap)=>(...a)=>t(()=>e(...a));var oh=me.hasStandardBrowserEnv?((e,t)=>a=>(a=new URL(a,me.origin),e.protocol===a.protocol&&e.host===a.host&&(t||e.port===a.port)))(new URL(me.origin),me.navigator&&/(msie|trident)/i.test(me.navigator.userAgent)):()=>!0;var nh=me.hasStandardBrowserEnv?{write(e,t,a,r,o,n,l){if(typeof document>"u")return;let s=[`${e}=${encodeURIComponent(t)}`];x.isNumber(a)&&s.push(`expires=${new Date(a).toUTCString()}`),x.isString(r)&&s.push(`path=${r}`),x.isString(o)&&s.push(`domain=${o}`),n===!0&&s.push("secure"),x.isString(l)&&s.push(`SameSite=${l}`),document.cookie=s.join("; ")},read(e){if(typeof document>"u")return null;let t=document.cookie.split(";");for(let a=0;a<t.length;a++){let r=t[a].replace(/^\s+/,""),o=r.indexOf("=");if(o!==-1&&r.slice(0,o)===e)try{return decodeURIComponent(r.slice(o+1))}catch{return r.slice(o+1)}}return null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function uc(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function dc(e,t){if(!t)return e;let a=e.length;for(;a>0&&e.charCodeAt(a-1)===47;)a--;return e.slice(0,a)+"/"+t.replace(/^\/+/,"")}var IL=/^https?:(?!\/\/)/i;function wL(e){return e&&e.replace(/(^|&)([^=&]*=)?[^&]+/g,(t,a,r="")=>`${a}${r}${xl}`)}function kL(e){let t=e.replace(/^(https?:\/{0,2})[^/?#]*@/i,`$1${xl}@`),a=t.indexOf("#"),o=(a===-1?t:t.slice(0,a)).replace(/([?&][^=&#]*=)[^&#]*/g,`$1${xl}`);return a===-1?o:`${o}#${wL(t.slice(a+1))}`}function lh(e,t){if(typeof e=="string"){let a=Il(e);if(IL.test(a))throw new O(`Invalid URL ${JSON.stringify(kL(a))}: missing "//" after protocol`,O.ERR_INVALID_URL,t)}}function kl(e,t,a,r){lh(t,r);let o=!uc(t);return e&&(o||a===!1)?(lh(e,r),dc(e,t)):t}var sh=e=>e instanceof Ie?{...e}:e,PL=e=>Object.getOwnPropertySymbols&&Object.getOwnPropertyDescriptor?Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter(t=>Object.getOwnPropertyDescriptor(e,t).enumerable)):Object.keys(e);function Xt(e,t){e=e||{},t=t||{};let a=Object.create(null);Object.defineProperty(a,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(p,m,h,L){return x.isPlainObject(p)&&x.isPlainObject(m)?x.merge.call({caseless:L},p,m):x.isPlainObject(m)?x.merge({},m):x.isArray(m)?m.slice():m}function o(p,m,h,L){if(x.isUndefined(m)){if(!x.isUndefined(p))return r(void 0,p,h,L)}else return r(p,m,h,L)}function n(p,m){if(!x.isUndefined(m))return r(void 0,m)}function l(p,m){if(x.isUndefined(m)){if(!x.isUndefined(p))return r(void 0,p)}else return r(void 0,m)}function s(p){let m=x.hasOwnProp(t,"transitional")?t.transitional:void 0;if(!x.isUndefined(m))if(x.isPlainObject(m)){if(x.hasOwnProp(m,p))return m[p]}else return;let h=x.hasOwnProp(e,"transitional")?e.transitional:void 0;if(x.isPlainObject(h)&&x.hasOwnProp(h,p))return h[p]}function i(p,m,h){if(x.hasOwnProp(t,h))return r(p,m);if(x.hasOwnProp(e,h))return r(void 0,p)}let c={url:n,method:n,data:n,baseURL:l,transformRequest:l,transformResponse:l,paramsSerializer:l,timeout:l,timeoutErrorMessage:l,withCredentials:l,withXSRFToken:l,adapter:l,responseType:l,xsrfCookieName:l,xsrfHeaderName:l,onUploadProgress:l,onDownloadProgress:l,decompress:l,maxContentLength:l,maxBodyLength:l,beforeRedirect:l,transport:l,httpAgent:l,httpsAgent:l,cancelToken:l,socketPath:l,allowedSocketPaths:l,responseEncoding:l,validateStatus:i,headers:(p,m,h)=>o(sh(p),sh(m),h,!0)};return x.forEach(PL({...e,...t}),function(m){if(m==="__proto__"||m==="constructor"||m==="prototype")return;let h=x.hasOwnProp(c,m)?c[m]:o,L=x.hasOwnProp(e,m)?e[m]:void 0,f=x.hasOwnProp(t,m)?t[m]:void 0,b=h(L,f,m);x.isUndefined(b)&&h!==i||(a[m]=b)}),x.hasOwnProp(t,"validateStatus")&&x.isUndefined(t.validateStatus)&&s("validateStatusUndefinedResolves")===!1&&(x.hasOwnProp(e,"validateStatus")?a.validateStatus=r(void 0,e.validateStatus):delete a.validateStatus),a}var RL=["content-type","content-length"];function cc(e,t,a){if(a!=="content-only"){e.set(t);return}Object.entries(t||{}).forEach(([r,o])=>{RL.includes(r.toLowerCase())&&e.set(r,o)})}var TL=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,a)=>String.fromCharCode(parseInt(a,16)));function EL(e){let t=Xt({},e),a=h=>x.hasOwnProp(t,h)?t[h]:void 0,r=a("data"),o=a("withXSRFToken"),n=a("xsrfHeaderName"),l=a("xsrfCookieName"),s=a("headers"),i=a("auth"),c=a("baseURL"),p=a("allowAbsoluteUrls"),m=a("url");if(t.headers=s=Ie.from(s),t.url=yl(kl(c,m,p,t),a("params"),a("paramsSerializer")),i){let h=x.getSafeProp(i,"username")||"",L=x.getSafeProp(i,"password")||"";try{s.set("Authorization","Basic "+btoa(h+":"+(L?TL(L):"")))}catch(f){throw O.from(f,O.ERR_BAD_OPTION_VALUE,e)}}if(x.isFormData(r)){let h=x.getSafeProp(r,"getHeaders");me.hasStandardBrowserEnv||me.hasStandardBrowserWebWorkerEnv||x.isReactNative(r)?s.setContentType(void 0):x.isFunction(h)&&cc(s,h.call(r),a("formDataHeaderPolicy"))}if(me.hasStandardBrowserEnv&&(x.isFunction(o)&&(o=o(t)),o===!0||o==null&&oh(t.url))){let L=n&&l&&nh.read(l);L&&s.set(n,L)}return t}var fi=EL;var FL=typeof XMLHttpRequest<"u",ih=FL&&function(e){return new Promise(function(a,r){let o=fi(e),n=o.data,l=Ie.from(o.headers).normalize(),{responseType:s,onUploadProgress:i,onDownloadProgress:c}=o,p,m,h,L,f,b;function E(){L&&L(),f&&f(),o.cancelToken&&o.cancelToken.unsubscribe(p),o.signal&&o.signal.removeEventListener("abort",p)}let u=new XMLHttpRequest;u.open(o.method.toUpperCase(),o.url,!0),u.timeout=o.timeout;function d(S){if(!u)return;if(u.status===0&&(wl(Il(o.url))||wl(me.origin))!=="file"&&!(u.responseURL&&u.responseURL.startsWith("file:"))){r(new O("Request aborted",O.ECONNABORTED,e,u)),E(),u=null;return}try{S?b&&b(S):f&&f()}catch(F){setTimeout(()=>{throw F})}if(!u)return;let T=Ie.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders()),w={data:!s||s==="text"||s==="json"?u.responseText:u.response,status:u.status,statusText:u.statusText,headers:T,config:e,request:u};Cl(function(A){a(A),E()},function(A){r(A),E()},w),u=null}"onloadend"in u?u.onloadend=d:u.onreadystatechange=function(){!u||u.readyState!==4||u.status===0&&!(u.responseURL&&u.responseURL.startsWith("file:"))||setTimeout(d)},u.onabort=function(){u&&(r(new O("Request aborted",O.ECONNABORTED,e,u)),E(),u=null)},u.onerror=function(T){let k=T&&T.message?T.message:"Network Error",w=new O(k,O.ERR_NETWORK,e,u);w.event=T||null,r(w),E(),u=null},u.ontimeout=function(){let T=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded",k=o.transitional||_o;o.timeoutErrorMessage&&(T=o.timeoutErrorMessage),r(new O(T,k.clarifyTimeoutError?O.ETIMEDOUT:O.ECONNABORTED,e,u)),E(),u=null},n===void 0&&l.setContentType(null),"setRequestHeader"in u&&x.forEach(si(l),function(T,k){u.setRequestHeader(k,T)}),x.isUndefined(o.withCredentials)||(u.withCredentials=!!o.withCredentials),s&&s!=="json"&&(u.responseType=o.responseType),c&&([h,f,b]=Wo(c,!0),u.addEventListener("progress",h)),i&&u.upload&&([m,L]=Wo(i),u.upload.addEventListener("progress",m),u.upload.addEventListener("loadend",L)),(o.cancelToken||o.signal)&&(p=S=>{u&&(r(!S||S.type?new sa(null,e,u):S),u.abort(),E(),u=null)},o.cancelToken&&o.cancelToken.subscribe(p),o.signal&&(o.signal.aborted?p():o.signal.addEventListener("abort",p)));let g=wl(o.url);if(g&&!me.protocols.includes(g)){r(new O("Unsupported protocol "+g+":",O.ERR_BAD_REQUEST,e)),E();return}u.send(n||null)})};var AL=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;let a=new AbortController,r=!1,o=function(i){if(!r){r=!0,l();let c=i instanceof Error?i:this.reason;a.abort(c instanceof O?c:new sa(c instanceof Error?c.message:c))}},n=t&&setTimeout(()=>{n=null,o(new O(`timeout of ${t}ms exceeded`,O.ETIMEDOUT))},t),l=()=>{e&&(n&&clearTimeout(n),n=null,e.forEach(i=>{i.unsubscribe?i.unsubscribe(o):i.removeEventListener("abort",o)}),e=null)};e.forEach(i=>{if(!r){if(i.aborted){o.call(i);return}i.addEventListener("abort",o,{once:!0})}});let{signal:s}=a;return s.unsubscribe=()=>x.asap(l),s},uh=AL;var ML=function*(e,t){let a=e.byteLength;if(!t||a<t){yield e;return}let r=0,o;for(;r<a;)o=r+t,yield e.slice(r,o),r=o},DL=async function*(e,t){for await(let a of BL(e))yield*ML(a,t)},BL=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}let t=e.getReader();try{for(;;){let{done:a,value:r}=await t.read();if(a)break;yield r}}finally{await t.cancel()}},fc=(e,t,a,r)=>{let o=DL(e,t),n=0,l,s=i=>{l||(l=!0,r&&r(i))};return new ReadableStream({async pull(i){try{let{done:c,value:p}=await o.next();if(c){s(),i.close();return}let m=p.byteLength;if(a){let h=n+=m;a(h)}i.enqueue(new Uint8Array(p))}catch(c){throw s(c),c}},cancel(i){return s(i),o.return()}},{highWaterMark:2})};var dh=e=>e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102,fh=(e,t,a)=>t+2<a&&dh(e.charCodeAt(t+1))&&dh(e.charCodeAt(t+2)),ch=e=>e<=57?e-48:(e&223)-55,zL=e=>e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===47||e===45||e===95,NL=e=>e===9||e===10||e===12||e===13||e===32,OL=e=>{let t=Math.floor(e/4),a=e%4;return t*3+(a===2?1:a===3?2:0)},UL=e=>{let t=e.length,a=0;return t>0&&e.charCodeAt(t-1)===61&&(a++,t>1&&e.charCodeAt(t-2)===61&&a++),Math.floor((t-a)*3/4)},_L=e=>{let t=e.length,a=0,r=0,o=!1;for(let n=0;n<t;n++){let l=e.charCodeAt(n);if(l===37&&fh(e,n,t)&&(l=ch(e.charCodeAt(n+1))*16+ch(e.charCodeAt(n+2)),n+=2),!NL(l)){if(l===61){r++;continue}if(!zL(l)||r>0){o=!0;continue}a++}}return o||r>2||r>0&&(a+r)%4!==0||a%4===1?UL(e):OL(a)},HL=(e,t)=>{if(!e||typeof e!="string"||!e.startsWith("data:"))return 0;let a=e.indexOf(",");if(a<0)return 0;let r=e.slice(5,a),o=e.slice(a+1);if(/;base64/i.test(r))return t(o);let l=0;for(let s=0,i=o.length;s<i;s++){let c=o.charCodeAt(s);if(c===37&&fh(o,s,i))l+=1,s+=2;else if(c<128)l+=1;else if(c<2048)l+=2;else if(c>=55296&&c<=56319&&s+1<i){let p=o.charCodeAt(s+1);p>=56320&&p<=57343?(l+=4,s++):l+=3}else l+=3}return l};function pc(e){let t=typeof e=="string"?e.indexOf("#"):-1;return HL(t===-1?e:e.slice(0,t),_L)}var Vo="1.20.0";var ph=64*1024,qL={cache:"default",redirect:"follow",referrer:"about:client",referrerPolicy:"",mode:"cors",integrity:"",keepalive:!1,priority:"auto",window:null},{isFunction:pi}=x,WL=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,a)=>String.fromCharCode(parseInt(a,16))),mh=e=>{if(!x.isString(e))return e;try{return decodeURIComponent(e)}catch{return e}},gh=(e,...t)=>{try{return!!e(...t)}catch{return!1}},VL=e=>{let t=e.indexOf("://"),a=e;return t!==-1&&(a=a.slice(t+3)),a.includes("@")||a.includes(":")},jL=e=>{let t=x.global!==void 0&&x.global!==null?x.global:globalThis,{ReadableStream:a,TextEncoder:r}=t;e=x.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);let{fetch:o,Request:n,Response:l}=e,s=o?pi(o):typeof fetch=="function",i=pi(n),c=pi(l);if(!s)return!1;let p=s&&pi(a),m=s&&(typeof r=="function"?(u=>d=>u.encode(d))(new r):async u=>new Uint8Array(await new n(u).arrayBuffer())),h=i&&p&&gh(()=>{let u=!1,d=new n(me.origin,{body:new a,method:"POST",get duplex(){return u=!0,"half"}}),g=d.headers.has("Content-Type");return d.body!=null&&d.body.cancel(),u&&!g}),L=c&&p&&gh(()=>x.isReadableStream(new l("").body)),f={stream:L&&(u=>u.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(u=>{!f[u]&&(f[u]=(d,g)=>{let S=d&&d[u];if(S)return S.call(d);throw new O(`Response type '${u}' is not supported`,O.ERR_NOT_SUPPORT,g)})});let b=async u=>{if(u==null)return 0;if(x.isBlob(u))return u.size;if(x.isSpecCompliantForm(u))return(await new n(me.origin,{method:"POST",body:u}).arrayBuffer()).byteLength;if(x.isArrayBufferView(u)||x.isArrayBuffer(u))return u.byteLength;if(x.isURLSearchParams(u)&&(u=u+""),x.isString(u))return(await m(u)).byteLength},E=async(u,d)=>{let g=x.toFiniteNumber(u.getContentLength());return g??b(d)};return async u=>{let{url:d,method:g,data:S,signal:T,cancelToken:k,timeout:w,onDownloadProgress:F,onUploadProgress:A,responseType:C,headers:N,withCredentials:W="same-origin",fetchOptions:le,maxContentLength:re,maxBodyLength:se,maxRedirects:nt}=fi(u),z=x.isNumber(re)&&re>-1,K=x.isNumber(se)&&se>-1,mt=ae=>x.hasOwnProp(u,ae)?u[ae]:void 0,be=o||fetch;C=C?(C+"").toLowerCase():"text";let Ye=uh([T,k&&k.toAbortSignal()],w),ye=null,V=Ye&&Ye.unsubscribe&&(()=>{Ye.unsubscribe()}),Je,Pe=null,gr=()=>new O("Request body larger than maxBodyLength limit",O.ERR_BAD_REQUEST,u,ye);try{let ae,We=mt("auth");if(We){let $=x.getSafeProp(We,"username")||"",ue=x.getSafeProp(We,"password")||"";ae={username:$,password:ue}}if(VL(d)){let $=new URL(d,me.origin);if(!ae&&($.username||$.password)){let ue=mh($.username),lt=mh($.password);ae={username:ue,password:lt}}($.username||$.password)&&($.username="",$.password="",d=$.href)}if(ae&&(N.delete("authorization"),N.set("Authorization","Basic "+btoa(WL((ae.username||"")+":"+(ae.password||""))))),z&&typeof d=="string"&&d.startsWith("data:")&&pc(d)>re)throw new O("maxContentLength size of "+re+" exceeded",O.ERR_BAD_RESPONSE,u,ye);if(K&&g!=="get"&&g!=="head"){let $=await b(S);if(typeof $=="number"&&isFinite($)&&(Je=$,$>se))throw gr()}let Ta=K&&(x.isReadableStream(S)||x.isStream(S)),Qt=($,ue,lt)=>fc($,ph,we=>{if(K&&we>se)throw Pe=gr();ue&&ue(we)},lt);if(h&&g!=="get"&&g!=="head"&&(A||Ta)){if(Je=Je??await E(N,S),Je!==0||Ta){let $=new n(d,{method:"POST",body:S,duplex:"half"}),ue;if(x.isFormData(S)&&(ue=$.headers.get("content-type"))&&N.setContentType(ue),$.body){let[lt,we]=A&&sc(Je,Wo(ic(A)))||[];S=Qt($.body,lt,we)}}}else if(Ta&&!i&&p&&g!=="get"&&g!=="head")S=Qt(S);else if(Ta&&i&&!h&&g!=="get"&&g!=="head")throw new O("Stream request bodies are not supported by the current fetch implementation",O.ERR_NOT_SUPPORT,u,ye);x.isString(W)||(W=W?"include":"omit");let Ea=i&&"credentials"in n.prototype;if(x.isFormData(S)){let $=N.getContentType();$&&/^multipart\/form-data/i.test($)&&!/boundary=/i.test($)&&N.delete("content-type")}N.set("User-Agent","axios/"+Vo,!1);let M=le==null?le:Object.assign(Object.create(null),le);M&&(delete M.body,delete M.headers,delete M.method,delete M.signal,delete M.duplex,delete M.credentials);let ee=Object.assign(Object.create(null),M,{signal:Ye,method:g.toUpperCase(),headers:si(N.normalize()),body:S,duplex:"half",credentials:Ea?W:void 0});i&&(x.forEach(qL,($,ue)=>{ee[ue]===void 0&&(ee[ue]=$)}),ee.signal===void 0&&(ee.signal=null),ee.body===void 0&&(ee.body=null)),nt===0&&(ee.redirect="manual",M&&(M.redirect="manual")),ye=i&&new n(d,ee);let Q=await(i?be(ye,M):be(d,ee)),Ve=Ie.from(Q.headers);if(z){let $=x.toFiniteNumber(Ve.getContentLength());if($!=null&&$>re)throw new O("maxContentLength size of "+re+" exceeded",O.ERR_BAD_RESPONSE,u,ye)}let De=L&&(C==="stream"||C==="response");if(L&&Q.body&&(F||z||De&&V)){let $={};["status","statusText","headers"].forEach(hr=>{$[hr]=Q[hr]});let ue=x.toFiniteNumber(Ve.getContentLength()),[lt,we]=F&&sc(ue,Wo(ic(F),!0))||[],Fl=0,It=hr=>{if(z&&(Fl=hr,Fl>re))throw new O("maxContentLength size of "+re+" exceeded",O.ERR_BAD_RESPONSE,u,ye);lt&&lt(hr)};Q=new l(fc(Q.body,ph,It,()=>{we&&we(),V&&V()}),$)}C=C||"text";let Y=await f[x.findKey(f,C)||"text"](Q,u);if(z&&!L&&!De){let $;if(Y!=null&&(typeof Y.byteLength=="number"?$=Y.byteLength:typeof Y.size=="number"?$=Y.size:typeof Y=="string"&&($=typeof r=="function"?new r().encode(Y).byteLength:Y.length)),typeof $=="number"&&$>re)throw new O("maxContentLength size of "+re+" exceeded",O.ERR_BAD_RESPONSE,u,ye)}return!De&&V&&V(),await new Promise(($,ue)=>{Cl($,ue,{data:Y,headers:Ie.from(Q.headers),status:Q.status,statusText:Q.statusText,config:u,request:ye})})}catch(ae){if(V&&V(),Ye&&Ye.aborted&&Ye.reason instanceof O){let We=Ye.reason;throw We.config=u,ye&&(We.request=ye),ae!==We&&Object.defineProperty(We,"cause",{__proto__:null,value:ae,writable:!0,enumerable:!1,configurable:!0}),We}if(Pe)throw ye&&!Pe.request&&(Pe.request=ye),Pe;if(ae instanceof O)throw ye&&!ae.request&&(ae.request=ye),ae;if(ae&&ae.name==="TypeError"&&/Load failed|fetch/i.test(ae.message)){let We=new O("Network Error",O.ERR_NETWORK,u,ye,ae&&ae.response);throw Object.defineProperty(We,"cause",{__proto__:null,value:ae.cause||ae,writable:!0,enumerable:!1,configurable:!0}),We}throw O.from(ae,ae&&ae.code,u,ye,ae&&ae.response)}}},GL=new Map,mc=e=>{let t=e&&e.env||{},{fetch:a,Request:r,Response:o}=t,n=[r,o,a],l=n.length,s=l,i,c,p=GL;for(;s--;)i=n[s],c=p.get(i),c===void 0&&p.set(i,c=s?new Map:jL(t)),p=c;return c},hP=mc();var gc={http:pr,xhr:ih,fetch:{get:mc}};x.forEach(gc,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});var hh=e=>`- ${e}`,XL=e=>x.isFunction(e)||e===null||e===!1;function KL(e,t){e=x.isArray(e)?e:[e];let{length:a}=e,r,o,n={};for(let l=0;l<a;l++){r=e[l];let s;if(o=r,!XL(r)&&(o=gc[(s=String(r)).toLowerCase()],o===void 0))throw new O(`Unknown adapter '${s}'`);if(o&&(x.isFunction(o)||(o=o.get(t))))break;n[s||"#"+l]=o}if(!o){let l=Object.entries(n).map(([i,c])=>`adapter ${i} `+(c===!1?"is not supported by the environment":"is not available in the build")),s=a?l.length>1?`since :
`+l.map(hh).join(`
`):" "+hh(l[0]):"as no adapter specified";throw new O("There is no suitable adapter to dispatch the request "+s,O.ERR_NOT_SUPPORT)}return o}var mi={getAdapter:KL,adapters:gc};function hc(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new sa(null,e)}function Pl(e){let t=x.toSafeFlatObject(e);return hc(t),t.headers=Ie.from(x.getSafeProp(t,"headers")),t.data=Sl.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),mi.getAdapter(t.adapter||qo.adapter,t)(t).then(function(o){hc(t),t.response=o;try{o.data=Sl.call(t,t.transformResponse,o)}finally{delete t.response}return o.headers=Ie.from(o.headers),o},function(o){if(!bl(o)&&(hc(t),o&&o.response)){t.response=o.response;try{o.response.data=Sl.call(t,t.transformResponse,o.response)}finally{delete t.response}o.response.headers=Ie.from(o.response.headers)}return Promise.reject(o)})}var gi={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{gi[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});var xh={};gi.transitional=function(t,a,r){function o(n,l){return"[Axios v"+Vo+"] Transitional option '"+n+"'"+l+(r?". "+r:"")}return(n,l,s)=>{if(t===!1)throw new O(o(l," has been removed"+(a?" in "+a:"")),O.ERR_DEPRECATED);return a&&!xh[l]&&(xh[l]=!0,console.warn(o(l," has been deprecated since v"+a+" and will be removed in the near future"))),t?t(n,l,s):!0}};gi.spelling=function(t){return(a,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function QL(e,t,a){if(typeof e!="object"||e===null)throw new O("options must be an object",O.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),o=r.length;for(;o-- >0;){let n=r[o],l=Object.prototype.hasOwnProperty.call(t,n)?t[n]:void 0;if(l){let s=e[n],i=s===void 0||l(s,n,e);if(i!==!0)throw new O("option "+n+" must be "+i,O.ERR_BAD_OPTION_VALUE);continue}if(a!==!0)throw new O("Unknown option "+n,O.ERR_BAD_OPTION)}}var Rl={assertOptions:QL,validators:gi};var Ze=Rl.validators,jo=class{constructor(t){this.defaults=t||{},this.interceptors={request:new ec,response:new ec}}async request(t,a){try{return await this._request(t,a)}catch(r){if(r instanceof Error)try{let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;let n=o.stack,l="";if(typeof n=="string"){let s=n.indexOf(`
`);l=s===-1?"":n.slice(s+1)}if(!r.stack)r.stack=l;else if(l){let s=l.indexOf(`
`),i=s===-1?-1:l.indexOf(`
`,s+1),c=i===-1?"":l.slice(i+1);String(r.stack).endsWith(c)||(r.stack+=`
`+l)}}catch{}throw r}}_request(t,a){typeof t=="string"?(a=a||{},a.url=t):a=t||{},a=Xt(this.defaults,a);let{transitional:r,paramsSerializer:o,headers:n}=a;r!==void 0&&Rl.assertOptions(r,{silentJSONParsing:Ze.transitional(Ze.boolean),forcedJSONParsing:Ze.transitional(Ze.boolean),clarifyTimeoutError:Ze.transitional(Ze.boolean),legacyInterceptorReqResOrdering:Ze.transitional(Ze.boolean),advertiseZstdAcceptEncoding:Ze.transitional(Ze.boolean),validateStatusUndefinedResolves:Ze.transitional(Ze.boolean)},!1),o!=null&&(x.isFunction(o)?a.paramsSerializer={serialize:o}:Rl.assertOptions(o,{encode:Ze.function,serialize:Ze.function},!0)),a.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?a.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:a.allowAbsoluteUrls=!0),Rl.assertOptions(a,{baseUrl:Ze.spelling("baseURL"),withXsrfToken:Ze.spelling("withXSRFToken")},!0),a.method=(x.getSafeProp(a,"method")||x.getSafeProp(this.defaults,"method")||"get").toLowerCase();let l=n&&x.merge(n.common,n[a.method]);n&&x.forEach(ci.concat("common"),f=>{delete n[f]}),a.headers=Ie.concat(l,n);let s=[],i=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(a)===!1)return;i=i&&b.synchronous;let E=a.transitional||_o;E&&E.legacyInterceptorReqResOrdering?s.unshift(b.fulfilled,b.rejected):s.push(b.fulfilled,b.rejected)});let c=[];this.interceptors.response.forEach(function(b){c.push(b.fulfilled,b.rejected)});let p,m=0,h;if(!i){let f=[Pl.bind(this),void 0];for(f.unshift(...s),f.push(...c),h=f.length,p=Promise.resolve(a);m<h;)p=p.then(f[m++],f[m++]);return p}h=s.length;let L=a;for(;m<h;){let f=s[m++],b=s[m++];try{L=f?f(L):L}catch(E){if(!b){p=Promise.reject(E);break}try{let u=b.call(this,E);x.isThenable(u)&&(p=Promise.resolve(u).then(()=>Pl.call(this,L)))}catch(u){p=Promise.reject(u)}break}}if(!p)try{p=Pl.call(this,L)}catch(f){p=Promise.reject(f)}for(m=0,h=c.length;m<h;)p=p.then(c[m++],c[m++]);return p}getUri(t){t=Xt(this.defaults,t);let a=kl(t.baseURL,t.url,t.allowAbsoluteUrls,t);return yl(a,t.params,t.paramsSerializer)}};x.forEach(["delete","get","head","options"],function(t){jo.prototype[t]=function(a,r){return this.request(Xt(r||{},{method:t,url:a,data:r&&x.hasOwnProp(r,"data")?r.data:void 0}))}});x.forEach(["post","put","patch","query"],function(t){function a(r){return function(n,l,s){return this.request(Xt(s||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:n,data:l}))}}jo.prototype[t]=a(),t!=="query"&&(jo.prototype[t+"Form"]=a(!0))});var Tl=jo;var xc=class e{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let a;this.promise=new Promise(function(n){a=n});let r=this;this.promise.then(o=>{if(!r._listeners)return;let n=r._listeners.length;for(;n-- >0;)r._listeners[n](o);r._listeners=null}),this.promise.then=o=>{let n,l=new Promise(s=>{r.subscribe(s),n=s}).then(o);return l.cancel=function(){r.unsubscribe(n)},l},t(function(n,l,s){r.reason||(r.reason=new sa(n,l,s),a(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;let a=this._listeners.indexOf(t);a!==-1&&this._listeners.splice(a,1)}toAbortSignal(){let t=new AbortController,a=r=>{t.abort(r)};return this.subscribe(a),t.signal.unsubscribe=()=>this.unsubscribe(a),t.signal}static source(){let t;return{token:new e(function(o){t=o}),cancel:t}}},yh=xc;function yc(e){return function(a){return e.apply(null,a)}}function vc(e){return x.isObject(e)&&e.isAxiosError===!0}var hi={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,ContentTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,UnprocessableContent:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerReturnsAnUnknownError:520,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(hi).forEach(([e,t])=>{hi[t]===void 0&&(hi[t]=e)});var vh=hi;function Lh(e){let t=new Tl(e),a=cl(Tl.prototype.request,t);return x.extend(a,Tl.prototype,t,{allOwnKeys:!0}),x.extend(a,t,null,{allOwnKeys:!0}),a.create=function(o){return Lh(Xt(e,o))},a}var Fe=Lh(qo);Fe.Axios=Tl;Fe.CanceledError=sa;Fe.CancelToken=yh;Fe.isCancel=bl;Fe.VERSION=Vo;Fe.toFormData=mr;Fe.AxiosError=O;Fe.Cancel=Fe.CanceledError;Fe.all=function(t){return Promise.all(t)};Fe.spread=yc;Fe.isAxiosError=vc;Fe.mergeConfig=Xt;Fe.AxiosHeaders=Ie;Fe.formToJSON=e=>di(x.isHTMLForm(e)?new FormData(e):e);Fe.getAdapter=mi.getAdapter;Fe.HttpStatusCode=vh;Fe.default=Fe;var Kr=Fe;var{Axios:gR,AxiosError:hR,CanceledError:xR,isCancel:yR,CancelToken:vR,VERSION:LR,all:SR,Cancel:bR,isAxiosError:CR,spread:IR,toFormData:wR,AxiosHeaders:kR,HttpStatusCode:PR,formToJSON:RR,getAdapter:TR,mergeConfig:ER,create:FR}=Kr;async function xi(e,t){let a;try{a=await e}catch{return{status:500,error:"Network or other error occurred"}}return a.status===t?{status:a.status,data:a.data}:{status:a.status,error:a.data}}async function Sh(e,t,a){let r=Kr.post(e,t,{headers:{"Content-Type":"application/json",token:"jwt"},validateStatus:()=>!0});return xi(r,a)}async function bh(e,t){let a=Kr.get(e,{headers:{"Content-Type":"application/json",token:"jwt"},validateStatus:()=>!0});return xi(a,t)}async function Ch(e,t){let a=Kr.delete(e,{headers:{"Content-Type":"application/json",token:"jwt"},validateStatus:()=>!0});return xi(a,t)}async function Ih(e,t,a){let r=Kr.put(e,t,{headers:{"Content-Type":"application/json",token:"jwt"},validateStatus:()=>!0});return xi(r,a)}var ia=class e{constructor(){this.baseUrl=e.getBaseUrl(),this.create=`${this.baseUrl}api/v1/experiments/create`,this.getExperiments=`${this.baseUrl}api/v1/experiments/get/all`,this.update=`${this.baseUrl}api/v1/experiments/update`,this.login=`${this.baseUrl}auth/login`}static getBaseUrl(){return`${window.location.origin}/`}deleteUrl(t){return`${this.baseUrl}api/v1/experiments/delete/${t}`}};async function Lc(){return await bh(new ia().getExperiments,200)}var ne=q(Re());var xe=q(Re());var R=q(X()),ZL={connected:"#dbeafe",gap:"#fef3c7",telemetry:"#d1fae5",error:"#fee2e2",raw:"rgba(148, 163, 184, 0.15)"},YL={idle:{background:"#e5e7eb",color:"#374151"},connecting:{background:"#fef3c7",color:"#92400e"},open:{background:"#d1fae5",color:"#065f46"},closed:{background:"#fee2e2",color:"#991b1b"}},JL=500,eS=()=>{let[e,t]=(0,xe.useState)("http"),[a,r]=(0,xe.useState)([]),[o,n]=(0,xe.useState)([{id:"1",name:"Get All Experiments",method:"GET",endpoint:"/api/v1/experiments/get/all",body:"",headers:{}},{id:"2",name:"Get Experiment by Name",method:"GET",endpoint:"/api/v1/experiments/get/{name}",body:"",headers:{}},{id:"3",name:"Create Experiment",method:"POST",endpoint:"/api/v1/experiments/create",body:'{"name": "New Test Experiment", "status": "PENDING"}',headers:{}},{id:"4",name:"Update Experiment",method:"PUT",endpoint:"/api/v1/experiments/update",body:'{"id": 1, "name": "Updated Experiment", "status": "DONE"}',headers:{}},{id:"5",name:"Delete Experiment",method:"DELETE",endpoint:"/api/v1/experiments/delete/{name}",body:"",headers:{}}]),[l,s]=(0,xe.useState)("GET"),[i,c]=(0,xe.useState)("/api/v1/experiments/get/all"),[p,m]=(0,xe.useState)(""),[h,L]=(0,xe.useState)(""),[f,b]=(0,xe.useState)(!1),[E,u]=(0,xe.useState)(!1),[d,g]=(0,xe.useState)(""),[S,T]=(0,xe.useState)(null),[k,w]=(0,xe.useState)("ws://localhost:8080/ws/telemetry/{experiment_id}"),[F,A]=(0,xe.useState)("1"),[C,N]=(0,xe.useState)(""),[W,le]=(0,xe.useState)("idle"),[re,se]=(0,xe.useState)([]),nt=(0,xe.useRef)(null),z=(0,xe.useRef)(null),K=(0,xe.useRef)(0),mt=W==="open"||W==="connecting",be=(M,ee)=>{se(Q=>[...Q,{id:++K.current,kind:M,text:ee,time:new Date().toLocaleTimeString()}].slice(-JL))},Ye=()=>{let M=k.trim().replace("{experiment_id}",encodeURIComponent(F.trim()));return C.trim()&&(M+=(M.includes("?")?"&":"?")+"access_token="+encodeURIComponent(C.trim())),M},ye=()=>{if(nt.current)return;let M=Ye();le("connecting"),be("raw","Connecting to "+M.replace(/access_token=[^&]+/,"access_token=***"));let ee;try{ee=new WebSocket(M)}catch(Q){le("closed"),be("error","Failed to create WebSocket: "+(Q instanceof Error?Q.message:String(Q)));return}nt.current=ee,ee.onopen=()=>le("open"),ee.onmessage=Q=>{let Ve="raw",De=String(Q.data);try{let Y=JSON.parse(De);Y.type==="connected"?Ve="connected":Y.type==="gap"?Ve="gap":Ve="telemetry",De=JSON.stringify(Y,null,2)}catch{}be(Ve,De)},ee.onerror=()=>{be("error","WebSocket error. Browsers hide the real reason; check the server logs or the Network tab for the close code / HTTP status.")},ee.onclose=Q=>{nt.current=null,le("closed"),be("raw",`Closed: code=${Q.code} reason=${Q.reason||"(none)"}`)}},V=()=>{nt.current?.close(1e3,"manual disconnect")},Je=()=>se([]);(0,xe.useEffect)(()=>()=>{nt.current?.close(1e3,"unmounted")},[]),(0,xe.useEffect)(()=>{z.current&&(z.current.scrollTop=z.current.scrollHeight)},[re]);let Pe=async()=>{b(!0);let M={"Content-Type":"application/json"};if(h)try{h.split(`
`).forEach(Ve=>{let[De,...Y]=Ve.split(":");De&&Y.length>0&&(M[De.trim()]=Y.join(":").trim())})}catch(Q){console.error("Error parsing headers:",Q)}let ee={method:l,endpoint:i,body:p,headers:M,response:"",status:"pending",timestamp:new Date().toLocaleTimeString()};try{let Q=`http://localhost:8001${i}`,Ve={method:l,headers:M};p&&(l==="POST"||l==="PUT")&&(Ve.body=p);let De=await fetch(Q,Ve),Y=await De.text();ee.response=Y,ee.status=De.ok?"success":"error"}catch(Q){ee.response=`Error: ${Q instanceof Error?Q.message:"Unknown error"}`,ee.status="error"}r(Q=>[ee,...Q].slice(0,10)),b(!1)},gr=M=>{s(M.method),c(M.endpoint),m(M.body||""),L(M.headers?Object.entries(M.headers).map(([ee,Q])=>`${ee}: ${Q}`).join(`
`):""),T(M.id)},ae=()=>{if(!d.trim())return;let M={};if(h)try{h.split(`
`).forEach(Ve=>{let[De,...Y]=Ve.split(":");De&&Y.length>0&&(M[De.trim()]=Y.join(":").trim())})}catch(Q){console.error("Error parsing headers:",Q)}let ee={id:Date.now().toString(),name:d,method:l,endpoint:i,body:p,headers:M};n(Q=>[...Q,ee]),u(!1),g("")},We=M=>{n(ee=>ee.filter(Q=>Q.id!==M)),S===M&&T(null)},Ta=()=>{r([])},Qt=M=>{navigator.clipboard.writeText(M)},Ea=M=>M?{boxShadow:"inset 0 0 0 2px rgb(192, 57, 43)"}:{};return(0,R.jsxs)("div",{className:"api-testing-section",children:[(0,R.jsxs)("div",{className:"section-header",children:[(0,R.jsx)("h1",{className:"section-title",children:"API Testing"}),(0,R.jsxs)("div",{className:"section-actions",children:[(0,R.jsxs)("button",{className:"action-button secondary",style:Ea(e==="http"),onClick:()=>t("http"),children:[(0,R.jsx)(ur,{size:16}),(0,R.jsx)("span",{children:"HTTP"})]}),(0,R.jsxs)("button",{className:"action-button secondary",style:Ea(e==="ws"),onClick:()=>t("ws"),children:[(0,R.jsx)(Mo,{size:16}),(0,R.jsx)("span",{children:"WebSocket"})]}),e==="http"?(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)("button",{className:"action-button secondary",onClick:Ta,children:[(0,R.jsx)(Gt,{size:16}),(0,R.jsx)("span",{children:"Clear"})]}),(0,R.jsxs)("button",{className:"action-button primary",onClick:Pe,disabled:f,children:[f?(0,R.jsx)(Ia,{size:16,className:"animate-spin"}):(0,R.jsx)(Ca,{size:16}),(0,R.jsx)("span",{children:f?"Testing...":"Execute"})]})]}):(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)("button",{className:"action-button secondary",onClick:Je,children:[(0,R.jsx)(Gt,{size:16}),(0,R.jsx)("span",{children:"Clear"})]}),mt?(0,R.jsxs)("button",{className:"action-button primary",onClick:V,children:[(0,R.jsx)(Sa,{size:16}),(0,R.jsx)("span",{children:"Disconnect"})]}):(0,R.jsxs)("button",{className:"action-button primary",onClick:ye,children:[(0,R.jsx)(nl,{size:16}),(0,R.jsx)("span",{children:"Connect"})]})]})]})]}),e==="http"&&(0,R.jsxs)("div",{className:"api-testing-grid",children:[(0,R.jsxs)("div",{className:"request-builder",children:[(0,R.jsx)("h3",{children:"Request Builder"}),(0,R.jsxs)("div",{className:"method-selector",children:[(0,R.jsx)("label",{children:"Method:"}),(0,R.jsxs)("select",{value:l,onChange:M=>s(M.target.value),children:[(0,R.jsx)("option",{value:"GET",children:"GET"}),(0,R.jsx)("option",{value:"POST",children:"POST"}),(0,R.jsx)("option",{value:"PUT",children:"PUT"}),(0,R.jsx)("option",{value:"DELETE",children:"DELETE"})]})]}),(0,R.jsxs)("div",{className:"endpoint-selector",children:[(0,R.jsx)("label",{children:"Endpoint:"}),(0,R.jsx)("input",{type:"text",value:i,onChange:M=>c(M.target.value),placeholder:"/api/v1/endpoint"})]}),(0,R.jsxs)("div",{className:"headers-input",children:[(0,R.jsx)("label",{children:"Headers (one per line, format: Key: Value):"}),(0,R.jsx)("textarea",{value:h,onChange:M=>L(M.target.value),placeholder:`Authorization: Bearer token
Content-Type: application/json`,rows:3})]}),(l==="POST"||l==="PUT")&&(0,R.jsxs)("div",{className:"body-input",children:[(0,R.jsx)("label",{children:"Request Body (JSON):"}),(0,R.jsx)("textarea",{value:p,onChange:M=>m(M.target.value),placeholder:'{"name": "Example", "status": "PENDING"}',rows:4})]}),(0,R.jsxs)("div",{className:"saved-endpoints",children:[(0,R.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[(0,R.jsx)("h4",{children:"Saved Endpoints:"}),(0,R.jsxs)("button",{className:"action-button secondary",onClick:()=>u(!0),children:[(0,R.jsx)(la,{size:14}),(0,R.jsx)("span",{children:"Save Current"})]})]}),(0,R.jsx)("div",{className:"saved-endpoints-list",children:o.map(M=>(0,R.jsxs)("div",{className:`saved-endpoint-item ${S===M.id?"active":""}`,onClick:()=>gr(M),children:[(0,R.jsxs)("div",{className:"saved-endpoint-info",children:[(0,R.jsx)("span",{className:`method-badge ${M.method.toLowerCase()}`,children:M.method}),(0,R.jsx)("span",{className:"endpoint-name",children:M.name}),(0,R.jsx)("span",{className:"endpoint-path",children:M.endpoint})]}),(0,R.jsx)("button",{className:"delete-endpoint-btn",onClick:ee=>{ee.stopPropagation(),We(M.id)},children:(0,R.jsx)(Gt,{size:12})})]},M.id))})]})]}),(0,R.jsxs)("div",{className:"response-display",children:[(0,R.jsx)("h3",{children:"Response History"}),a.length===0?(0,R.jsxs)("div",{className:"empty-state",children:[(0,R.jsx)(ur,{size:48}),(0,R.jsx)("p",{children:"No API tests executed yet. Use the request builder to test endpoints."})]}):(0,R.jsx)("div",{className:"test-history",children:a.map((M,ee)=>(0,R.jsxs)("div",{className:`test-result ${M.status}`,children:[(0,R.jsxs)("div",{className:"test-header",children:[(0,R.jsxs)("div",{className:"test-info",children:[(0,R.jsx)("span",{className:`method-badge ${M.method.toLowerCase()}`,children:M.method}),(0,R.jsx)("span",{className:"endpoint",children:M.endpoint}),(0,R.jsx)("span",{className:"timestamp",children:M.timestamp})]}),(0,R.jsxs)("div",{className:"test-actions",children:[M.status==="success"&&(0,R.jsx)(He,{size:16,className:"success-icon"}),M.status==="error"&&(0,R.jsx)(Sa,{size:16,className:"error-icon"}),(0,R.jsx)("button",{onClick:()=>Qt(M.response),children:(0,R.jsx)(To,{size:14})})]})]}),M.body&&(0,R.jsxs)("div",{className:"request-body",children:[(0,R.jsx)("strong",{children:"Request Body:"}),(0,R.jsx)("pre",{children:M.body})]}),M.headers&&Object.keys(M.headers).length>0&&(0,R.jsxs)("div",{className:"request-headers",children:[(0,R.jsx)("strong",{children:"Headers:"}),(0,R.jsx)("pre",{children:JSON.stringify(M.headers,null,2)})]}),(0,R.jsxs)("div",{className:"response-body",children:[(0,R.jsx)("strong",{children:"Response:"}),(0,R.jsx)("pre",{children:M.response})]})]},ee))})]})]}),e==="ws"&&(0,R.jsxs)("div",{className:"api-testing-grid",children:[(0,R.jsxs)("div",{className:"request-builder",children:[(0,R.jsx)("h3",{children:"WebSocket Connection"}),(0,R.jsxs)("div",{className:"endpoint-selector",children:[(0,R.jsxs)("label",{children:["URL template (keep ","{experiment_id}"," where the ID goes):"]}),(0,R.jsx)("input",{type:"text",value:k,onChange:M=>w(M.target.value),disabled:mt,placeholder:"ws://localhost:8080/ws/telemetry/{experiment_id}"})]}),(0,R.jsxs)("div",{className:"endpoint-selector",children:[(0,R.jsx)("label",{children:"Experiment ID:"}),(0,R.jsx)("input",{type:"number",value:F,onChange:M=>A(M.target.value),disabled:mt})]}),(0,R.jsxs)("div",{className:"endpoint-selector",children:[(0,R.jsx)("label",{children:"Access token (sent as ?access_token=..., browsers can't set custom headers):"}),(0,R.jsx)("input",{type:"password",value:C,onChange:M=>N(M.target.value),disabled:mt,autoComplete:"off",placeholder:"Paste a valid token from your login flow"})]}),(0,R.jsxs)("div",{style:{marginTop:"0.75rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[(0,R.jsx)("strong",{children:"Status:"}),(0,R.jsx)("span",{style:{...YL[W],padding:"0.2rem 0.65rem",borderRadius:"999px",fontSize:"0.8rem",fontWeight:600},children:W})]})]}),(0,R.jsxs)("div",{className:"response-display",children:[(0,R.jsxs)("h3",{children:["Live Messages (",re.length,")"]}),re.length===0?(0,R.jsxs)("div",{className:"empty-state",children:[(0,R.jsx)(Mo,{size:48}),(0,R.jsx)("p",{children:"No messages yet. Click Connect to start receiving telemetry."})]}):(0,R.jsx)("div",{className:"test-history",ref:z,style:{maxHeight:"32rem",overflowY:"auto"},children:re.map(M=>(0,R.jsxs)("div",{className:"test-result",style:{background:ZL[M.kind],color:"#1f2937"},children:[(0,R.jsxs)("div",{className:"test-header",children:[(0,R.jsxs)("div",{className:"test-info",children:[(0,R.jsx)("span",{className:"method-badge get",children:M.kind}),(0,R.jsx)("span",{className:"timestamp",children:M.time})]}),(0,R.jsx)("div",{className:"test-actions",children:(0,R.jsx)("button",{onClick:()=>Qt(M.text),children:(0,R.jsx)(To,{size:14})})})]}),(0,R.jsx)("pre",{children:M.text})]},M.id))})]})]}),E&&(0,R.jsx)("div",{className:"modal-overlay",onClick:M=>{M.target===M.currentTarget&&u(!1)},children:(0,R.jsxs)("div",{className:"modal-box",style:{maxWidth:"400px"},children:[(0,R.jsxs)("div",{className:"modal-header",children:[(0,R.jsx)("h2",{className:"modal-title",children:"Save Endpoint"}),(0,R.jsx)("button",{className:"modal-close",onClick:()=>u(!1),children:(0,R.jsx)($t,{size:18})})]}),(0,R.jsxs)("div",{className:"modal-field",children:[(0,R.jsx)("label",{className:"modal-label",children:"Endpoint Name"}),(0,R.jsx)("input",{type:"text",className:"modal-input",placeholder:"e.g. Get User Profile",value:d,onChange:M=>g(M.target.value),autoFocus:!0})]}),(0,R.jsxs)("div",{className:"modal-actions",children:[(0,R.jsx)("button",{type:"button",className:"modal-btn-cancel",onClick:()=>u(!1),children:"Cancel"}),(0,R.jsx)("button",{type:"button",onClick:ae,disabled:!d.trim(),style:{padding:"0.5625rem 1.25rem",border:"none",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:600,color:"white",cursor:d.trim()?"pointer":"not-allowed",background:d.trim()?"linear-gradient(135deg, rgb(155, 28, 28) 0%, rgb(192, 57, 43) 100%)":"#94a3b8",boxShadow:d.trim()?"rgba(192, 57, 43, 0.25) 0px 2px 8px":"none",transition:"all 0.2s"},children:"Save"})]})]})})]})},wh=eS;var Eh=q(Re());var Dt=q(Re()),Th=q(X()),kh={status:"offline",lastEvent:null,history:{},lastReceivedAt:null},Sc=class{constructor(){this.snapshots=new Map;this.listeners=new Map;this.sockets=new Map;this.reconnectTimers=new Map;this.disconnectTimers=new Map;this.lastConnectAttempt=new Map;this.MIN_RECONNECT_INTERVAL_MS=3e3;this.TEARDOWN_GRACE_PERIOD_MS=1e3}getSnapshot(t){return this.snapshots.get(t)||kh}subscribe(t,a){let r=this.disconnectTimers.get(t);r!==void 0&&(window.clearTimeout(r),this.disconnectTimers.delete(t));let o=this.listeners.get(t);return o||(o=new Set,this.listeners.set(t,o)),o.add(a),this.scheduleConnect(t,!1),()=>{if(o?.delete(a),o?.size===0){this.listeners.delete(t);let n=window.setTimeout(()=>{this.teardown(t),this.disconnectTimers.delete(t)},this.TEARDOWN_GRACE_PERIOD_MS);this.disconnectTimers.set(t,n)}}}setSnapshot(t,a){this.snapshots.set(t,a),this.listeners.get(t)?.forEach(r=>r())}scheduleConnect(t,a){if(this.reconnectTimers.has(t))return;let r=this.sockets.get(t);if(r&&(r.readyState===WebSocket.CONNECTING||r.readyState===WebSocket.OPEN))return;let o=this.lastConnectAttempt.get(t)??0,n=Date.now()-o,l=a?Math.max(0,this.MIN_RECONNECT_INTERVAL_MS-n):0,s=window.setTimeout(()=>{this.reconnectTimers.delete(t),this.executeConnect(t)},l);this.reconnectTimers.set(t,s)}executeConnect(t){if(!this.listeners.get(t)?.size)return;this.lastConnectAttempt.set(t,Date.now());let a=window.location.protocol==="https:"?"wss:":"ws:",r=localStorage.getItem("blazecore_token"),o=r?`?access_token=${encodeURIComponent(r)}`:"",n=new WebSocket(`${a}//${window.location.host}/api/v1/experiments/${t}/stream${o}`);this.sockets.set(t,n),this.setSnapshot(t,{...this.getSnapshot(t),status:"connecting"}),n.onopen=()=>{this.setSnapshot(t,{...this.getSnapshot(t),status:"live"})},n.onmessage=l=>{try{let s=JSON.parse(l.data);if(s.experiment_id!==t||!s.timestamp||!s.measurements)return;let c={...this.getSnapshot(t).history};Object.entries(s.measurements).forEach(([p,m])=>{Number.isFinite(m)&&(c[p]=[...c[p]||[],m].slice(-30))}),this.setSnapshot(t,{status:"live",lastEvent:s,history:c,lastReceivedAt:Date.now()})}catch{}},n.onerror=()=>{},n.onclose=()=>{if(this.sockets.delete(t),!this.listeners.get(t)?.size){this.setSnapshot(t,{...this.getSnapshot(t),status:"offline"});return}this.setSnapshot(t,{...this.getSnapshot(t),status:"reconnecting"}),this.scheduleConnect(t,!0)}}teardown(t){let a=this.reconnectTimers.get(t);a!==void 0&&(window.clearTimeout(a),this.reconnectTimers.delete(t));let r=this.sockets.get(t);r&&(r.onclose=null,r.close(),this.sockets.delete(t));let o=this.snapshots.get(t);o&&this.setSnapshot(t,{...o,status:"offline"})}},Ph=(0,Dt.createContext)(null),Rh=({children:e})=>{let t=(0,Dt.useRef)(new Sc).current;return(0,Th.jsx)(Ph.Provider,{value:t,children:e})};function yi(e){let t=(0,Dt.useContext)(Ph);if(!t)throw new Error("useTelemetry must be used inside TelemetryProvider");let a=(0,Dt.useCallback)(n=>t.subscribe(e,n),[t,e]),r=(0,Dt.useCallback)(()=>t.getSnapshot(e),[t,e]),o=(0,Dt.useCallback)(()=>kh,[]);return(0,Dt.useSyncExternalStore)(a,r,o)}function pt(e,t,a){return e.lastEvent?.measurements[t]??a}var G=q(X()),tS={gradient:"linear-gradient(135deg, #0071E3 0%, #5AC8FA 100%)",primary:"#0071E3",accent:"#5AC8FA",bgLight:"rgba(0,113,227,0.08)",bgMedium:"rgba(0,113,227,0.15)",borderColor:"rgba(0,113,227,0.25)"},aS=({experiment:e,onToggleStatus:t,onDelete:a,onRefresh:r,onClick:o,entityColors:n})=>{let l=n||tS,[s,i]=(0,Eh.useState)(!1),c=yi(e.id),p=pt(c,"signal_strength",0),m=pt(c,"battery_level",0),h=pt(c,"data_points",0),L=c.lastEvent?new Date(c.lastEvent.timestamp):null,f=["ONLINE","ACTIVE","RUNNING","DONE"].includes(e.status.toUpperCase()),b=async k=>{k.stopPropagation(),i(!0),await r(),setTimeout(()=>i(!1),1e3)},E=k=>{k.stopPropagation(),t()},u=k=>{k.stopPropagation(),a()},d=k=>{let w=k.toLowerCase();return w.includes("temp")||w.includes("thermostat")?(0,G.jsx)(Vr,{size:20}):w.includes("humid")||w.includes("hvac")?(0,G.jsx)(Nr,{size:20}):w.includes("wind")||w.includes("motion")||w.includes("fan")?(0,G.jsx)(jr,{size:20}):w.includes("light")||w.includes("energy")||w.includes("power")?(0,G.jsx)(Ne,{size:20}):(0,G.jsx)(St,{size:20})},g=f?pt(c,"progress",0):0,S=f?{bg:"rgba(16,185,129,0.12)",color:"#065F46",border:"rgba(16,185,129,0.25)",label:e.status}:{bg:"rgba(245,158,11,0.12)",color:"#B45309",border:"rgba(245,158,11,0.25)",label:e.status},T=m>=20?"#10B981":"#EF4444";return(0,G.jsx)("div",{onClick:o,title:e.name,style:{background:"var(--color-card)",borderRadius:"14px",border:"1px solid var(--color-border-primary)",borderLeft:`3px solid ${l.primary}`,boxShadow:"var(--shadow-sm)",overflow:"hidden",isolation:"isolate",cursor:o?"pointer":"default",transition:"box-shadow 200ms ease, transform 200ms ease",position:"relative",color:"var(--color-text-primary)"},onMouseEnter:k=>{o&&(k.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.08)",k.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:k=>{k.currentTarget.style.boxShadow="var(--shadow-sm)",k.currentTarget.style.transform="translateY(0)"},children:(0,G.jsxs)("div",{style:{padding:"20px"},children:[(0,G.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"1rem",gap:"0.75rem"},children:[(0,G.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"0.75rem",flex:1,minWidth:0},children:[(0,G.jsx)("div",{style:{width:"44px",height:"44px",borderRadius:"50%",background:`rgba(${l.primary.startsWith("#")?rS(l.primary):"0,113,227"}, 0.12)`,display:"flex",alignItems:"center",justifyContent:"center",color:l.primary,flexShrink:0},children:d(e.name)}),(0,G.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,G.jsx)("h3",{title:e.name,style:{fontSize:"16px",fontWeight:700,color:"var(--color-text-primary)",margin:"0 0 0.3rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"160px"},children:e.name}),(0,G.jsx)("span",{style:{display:"inline-flex",alignItems:"center",padding:"0.2rem 0.6rem",borderRadius:"100px",fontSize:"11px",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",background:S.bg,color:S.color,border:`1px solid ${S.border}`},children:S.label})]})]}),(0,G.jsxs)("div",{style:{display:"flex",gap:"0.3rem",flexShrink:0},children:[(0,G.jsx)("button",{onClick:E,title:f?"Pause":"Start",className:`control-btn ${f?"pause":"play"}`,children:f?(0,G.jsx)(Hr,{size:13}):(0,G.jsx)(Ca,{size:13})}),(0,G.jsx)("button",{onClick:b,disabled:s,title:"Refresh",className:"control-btn refresh",children:(0,G.jsx)(Ia,{size:13,style:{animation:s?"spin 0.7s linear infinite":"none"}})}),(0,G.jsx)("button",{onClick:u,title:"Delete",className:"control-btn delete",children:(0,G.jsx)(Gt,{size:13})})]})]}),(0,G.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",marginBottom:"1rem",border:"1px solid var(--color-border-primary)",borderRadius:"8px",overflow:"hidden"},children:[{icon:(0,G.jsx)(ot,{size:13}),label:"Data Points",value:h.toLocaleString()},{icon:(0,G.jsx)(zr,{size:13}),label:"Updated",value:L?L.toLocaleTimeString():"Waiting"}].map((k,w)=>(0,G.jsxs)("div",{style:{padding:"0.5rem 0.625rem",background:"var(--color-surface)",borderRight:w===0?"1px solid var(--color-border-primary)":"none"},children:[(0,G.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.25rem",marginBottom:"0.15rem",color:l.primary},children:[k.icon,(0,G.jsx)("span",{style:{fontSize:"10px",color:"var(--color-text-tertiary)",fontWeight:500},children:k.label})]}),(0,G.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"var(--color-text-primary)",fontFamily:"monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:k.value})]},w))}),(0,G.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.625rem",marginBottom:"1rem"},children:[{icon:(0,G.jsx)(ka,{size:12}),label:"Signal",value:p,barColor:"#10B981"},{icon:(0,G.jsx)(qn,{size:12}),label:"Battery",value:m,barColor:T}].map((k,w)=>(0,G.jsxs)("div",{children:[(0,G.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.25rem"},children:[(0,G.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.25rem",fontSize:"0.6875rem",color:"var(--color-text-tertiary)",fontWeight:500},children:[k.icon,k.label]}),(0,G.jsxs)("span",{style:{fontSize:"0.6875rem",fontWeight:700,color:"var(--color-text-primary)"},children:[k.value,"%"]})]}),(0,G.jsx)("div",{style:{height:"4px",background:"var(--color-border-primary)",borderRadius:"2px",overflow:"hidden"},children:(0,G.jsx)("div",{style:{height:"100%",width:`${k.value}%`,background:k.barColor,borderRadius:"2px",transition:"width 0.4s ease"}})})]},w))}),(0,G.jsxs)("div",{children:[(0,G.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.3rem"},children:[(0,G.jsx)("span",{style:{fontSize:"0.75rem",color:"var(--color-text-secondary)",fontWeight:500},children:"Task Progress"}),(0,G.jsx)("span",{style:{fontSize:"0.75rem",fontWeight:700,color:"var(--color-text-primary)"},children:f?`${g}%`:"\u2014"})]}),(0,G.jsx)("div",{style:{height:"4px",background:"var(--color-border-primary)",borderRadius:"2px",overflow:"hidden"},children:(0,G.jsx)("div",{style:{height:"100%",width:f?`${g}%`:"0%",background:l.gradient,borderRadius:"2px",transition:"width 0.5s ease"}})})]}),(0,G.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"0.875rem",paddingTop:"0.875rem",borderTop:"1px solid var(--color-border-primary)"},children:[(0,G.jsxs)("span",{style:{fontSize:"12px",color:"var(--color-text-tertiary)",display:"flex",alignItems:"center",gap:"0.25rem"},children:[(0,G.jsx)(wa,{size:12})," ID #",e.id]}),f?(0,G.jsxs)("span",{style:{fontSize:"0.6875rem",color:l.primary,fontWeight:600,display:"flex",alignItems:"center",gap:"0.3rem"},children:[(0,G.jsx)("span",{style:{display:"inline-block",width:7,height:7,borderRadius:"50%",background:l.primary,animation:"pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"}}),"Online"]}):(0,G.jsx)("span",{style:{fontSize:"0.6875rem",color:"var(--color-text-tertiary)",fontWeight:600},children:"\u25CB Offline"})]})]})})};function rS(e){let t=e.replace("#",""),a=parseInt(t,16),r=a>>16&255,o=a>>8&255,n=a&255;return`${r}, ${o}, ${n}`}var bc=aS;var Cc=q(Re());var P=q(X()),oS={gradient:"linear-gradient(135deg, #0071E3 0%, #2997FF 100%)",primary:"#0071E3",accent:"#5AC8FA",bgLight:"rgba(0,113,227,0.10)",bgMedium:"rgba(0,113,227,0.15)",borderColor:"rgba(0,113,227,0.25)"};function Fh({color:e,points:t}){let a=Math.max(...t),r=Math.min(...t),o=a-r||1,n=120,l=40,s=n/(t.length-1),i=m=>l-(m-r)/o*(l-6)-3,c=t.map((m,h)=>`${h===0?"M":"L"} ${h*s} ${i(m)}`).join(" "),p=`${c} L ${(t.length-1)*s} ${l} L 0 ${l} Z`;return(0,P.jsxs)("svg",{width:n,height:l,viewBox:`0 0 ${n} ${l}`,style:{overflow:"visible"},children:[(0,P.jsx)("defs",{children:(0,P.jsxs)("linearGradient",{id:`grad-${e.replace("#","")}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,P.jsx)("stop",{offset:"0%",stopColor:e,stopOpacity:"0.25"}),(0,P.jsx)("stop",{offset:"100%",stopColor:e,stopOpacity:"0"})]})}),(0,P.jsx)("path",{d:p,fill:`url(#grad-${e.replace("#","")})`}),(0,P.jsx)("path",{d:c,fill:"none",stroke:e,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,P.jsx)("circle",{cx:(t.length-1)*s,cy:i(t[t.length-1]),r:"3",fill:e})]})}function nS({color:e}){return(0,P.jsxs)("div",{style:{position:"relative",width:10,height:10,display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,P.jsx)("div",{style:{position:"absolute",inset:-4,borderRadius:"50%",background:e,opacity:.3,animation:"ripple 2s ease-out infinite"}}),(0,P.jsx)("div",{style:{width:8,height:8,borderRadius:"50%",background:e}})]})}var lS=({experiment:e,onBack:t,onDelete:a,onToggleStatus:r,onRefresh:o,entityColors:n})=>{let l=n||oS,s=l.primary,i=l.bgLight,c=l.gradient,[p,m]=(0,Cc.useState)(!1),h=yi(e.id),L=pt(h,"signal_strength",0),f=pt(h,"battery_level",0),b=pt(h,"data_points",0),E=pt(h,"cpu_usage",0),u=pt(h,"memory_usage",0),d=pt(h,"network_traffic",0),g=h.lastEvent?new Date(h.lastEvent.timestamp):null,S=g?Math.max(0,Math.floor((Date.now()-g.getTime())/1e3)):null,[T,k]=(0,Cc.useState)("overview"),w=h.history.signal_strength||[],F=h.history.cpu_usage||[],A=h.history.data_points||[],C=[{time:"Just now",msg:`Data stream active \u2014 ${b} points collected`,dot:"#34C759"},{time:"3 min ago",msg:"Signal recalibrated \u2014 strength 85%",dot:s},{time:"10 min ago",msg:"Memory usage optimised",dot:s},{time:"28 min ago",msg:"Battery level checked \u2014 92%",dot:"#34C759"},{time:"1 hr ago",msg:"Firmware version verified",dot:"#FF9F0A"}],N=async()=>{m(!0),await o(),setTimeout(()=>m(!1),1e3)},W=z=>{let K=z.toLowerCase();return K.includes("temperature")||K.includes("temp")?(0,P.jsx)(Vr,{size:32}):K.includes("humidity")||K.includes("hvac")?(0,P.jsx)(Nr,{size:32}):K.includes("motion")||K.includes("wind")?(0,P.jsx)(jr,{size:32}):K.includes("light")?(0,P.jsx)(Ne,{size:32}):(0,P.jsx)(ot,{size:32})},le=e.status.toUpperCase()==="DONE",se=[{label:"Status",value:(0,P.jsxs)("span",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"2px 10px",borderRadius:9999,fontSize:"0.75rem",fontWeight:600,background:le?"rgba(52,199,89,0.12)":"rgba(255,159,10,0.12)",color:le?"#1D8348":"#B7770D",border:`1px solid ${le?"rgba(52,199,89,0.25)":"rgba(255,159,10,0.25)"}`},children:[(0,P.jsx)(nS,{color:le?"#34C759":"#FF9F0A"}),e.status.toUpperCase()]})},{label:"Experiment ID",value:`#${e.id}`},{label:"Created",value:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})},{label:"Last updated",value:g?g.toLocaleTimeString():"Waiting"},{label:"Protocol",value:"MQTT over WebSockets"},{label:"Database",value:"PostgreSQL"}],nt=z=>({padding:"0.5rem 1rem",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:500,cursor:"pointer",border:"none",background:T===z?i:"transparent",color:T===z?s:"#8C959F",transition:"all 0.2s"});return(0,P.jsxs)("div",{style:{animation:"fadeIn 0.3s ease",minHeight:"100%"},children:[(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"0.75rem"},children:[(0,P.jsxs)("button",{onClick:t,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.5rem 0.875rem",borderRadius:"0.5rem",border:"1px solid var(--color-border-primary)",background:"var(--color-card)",color:"var(--color-text-secondary)",fontSize:"0.875rem",fontWeight:500,cursor:"pointer",transition:"all 0.2s"},onMouseEnter:z=>{z.currentTarget.style.color="var(--color-text-primary)",z.currentTarget.style.borderColor="var(--color-border-secondary)"},onMouseLeave:z=>{z.currentTarget.style.color="var(--color-text-secondary)",z.currentTarget.style.borderColor="var(--color-border-primary)"},children:[(0,P.jsx)(Br,{size:15})," Back to Experiments"]}),(0,P.jsx)("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[{label:le?"Pause":"Start",icon:le?(0,P.jsx)(Hr,{size:14}):(0,P.jsx)(Ca,{size:14}),onClick:r,bg:le?"rgba(255,159,10,0.1)":"rgba(52,199,89,0.1)",color:le?"#B7770D":"#1D8348"},{label:"Refresh",icon:(0,P.jsx)(Ia,{size:14,className:p?"animate-spin":""}),onClick:N,bg:i,color:s},{label:"Settings",icon:(0,P.jsx)(qr,{size:14}),onClick:()=>{},bg:"var(--color-surface)",color:"var(--color-text-secondary)"},{label:"Delete",icon:(0,P.jsx)(Gt,{size:14}),onClick:a,bg:"rgba(239,68,68,0.1)",color:"#DC2626"}].map((z,K)=>(0,P.jsxs)("button",{onClick:z.onClick,disabled:z.label==="Refresh"&&p,style:{display:"inline-flex",alignItems:"center",gap:"0.375rem",padding:"0.5rem 0.875rem",borderRadius:"0.5rem",border:"none",fontSize:"0.8125rem",fontWeight:500,cursor:"pointer",background:z.bg,color:z.color,transition:"all 0.2s",opacity:z.label==="Refresh"&&p?.5:1},children:[z.icon," ",z.label]},K))})]}),(0,P.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"260px 1fr 300px",gap:"1.25rem",alignItems:"start"},children:[(0,P.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",overflow:"hidden"},children:[(0,P.jsx)("div",{style:{height:6,background:c}}),(0,P.jsxs)("div",{style:{padding:"1.25rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.875rem",marginBottom:"1rem"},children:[(0,P.jsx)("div",{style:{width:52,height:52,borderRadius:"0.875rem",background:c,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0},children:W(e.name)}),(0,P.jsxs)("div",{style:{minWidth:0},children:[(0,P.jsx)("div",{style:{fontSize:"1rem",fontWeight:700,color:"var(--color-text-primary)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",letterSpacing:"-0.01em"},children:e.name}),(0,P.jsx)("div",{style:{fontSize:"0.75rem",color:"var(--color-text-tertiary)",marginTop:2},children:"IoT Experiment"})]})]}),(0,P.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:0},children:se.map((z,K)=>(0,P.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"140px 1fr",alignItems:"center",padding:"0.5rem 0",borderBottom:K<se.length-1?"1px solid var(--color-border-primary)":"none"},children:[(0,P.jsx)("span",{style:{fontSize:"0.8rem",color:"var(--color-text-tertiary)"},children:z.label}),(0,P.jsx)("span",{style:{fontSize:"0.8rem",color:"var(--color-text-primary)",fontWeight:600},children:z.value})]},K))})]})]}),(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"1.125rem"},children:[(0,P.jsx)("div",{style:{fontSize:"0.8125rem",fontWeight:700,color:"var(--color-text-primary)",marginBottom:"0.875rem",letterSpacing:"-0.01em"},children:"Device Status"}),[{label:"Battery level",value:f,unit:"%",barColor:"#34C759"},{label:"Signal strength",value:L,unit:"%",barColor:"#34C759"},{label:"Latency",value:`${pt(h,"latency_ms",0)} ms`,unit:"",barColor:null},{label:"Firmware",value:"v2.1.4",unit:"",barColor:null}].map((z,K)=>(0,P.jsxs)("div",{style:{marginBottom:"0.625rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[(0,P.jsx)("span",{style:{fontSize:"0.75rem",color:"var(--color-text-tertiary)"},children:z.label}),(0,P.jsx)("span",{style:{fontSize:"0.75rem",fontWeight:700,color:z.barColor||"var(--color-text-primary)"},children:typeof z.value=="number"?`${z.value}${z.unit}`:z.value})]}),z.barColor&&typeof z.value=="number"&&(0,P.jsx)("div",{style:{height:4,borderRadius:2,background:"var(--color-border-primary)",overflow:"hidden"},children:(0,P.jsx)("div",{style:{height:"100%",borderRadius:2,background:z.barColor,width:`${z.value}%`,transition:"width 0.5s ease"}})})]},K))]}),(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"1.125rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.875rem"},children:[(0,P.jsx)("span",{style:{fontSize:"0.8125rem",fontWeight:700,color:"var(--color-text-primary)",letterSpacing:"-0.01em"},children:"Activity Log"}),(0,P.jsx)(Ja,{size:14,style:{color:"var(--color-text-tertiary)"}})]}),(0,P.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:C.map((z,K)=>(0,P.jsxs)("div",{style:{display:"flex",gap:"0.625rem",alignItems:"flex-start"},children:[(0,P.jsx)("div",{style:{width:7,height:7,borderRadius:"50%",background:z.dot,flexShrink:0,marginTop:4}}),(0,P.jsxs)("div",{style:{flex:1},children:[(0,P.jsx)("div",{style:{fontSize:"0.75rem",color:"var(--color-text-secondary)",lineHeight:1.45},children:z.msg}),(0,P.jsx)("div",{style:{fontSize:"0.7rem",color:"var(--color-text-tertiary)",marginTop:2},children:z.time})]})]},K))})]})]}),(0,P.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,P.jsx)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"0.375rem",display:"flex",gap:"0.25rem"},children:["overview","metrics","settings"].map(z=>(0,P.jsx)("button",{style:nt(z),onClick:()=>k(z),children:z.charAt(0).toUpperCase()+z.slice(1)},z))}),(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"1.5rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"},children:[(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{style:{fontSize:"0.8125rem",color:"var(--color-text-tertiary)",fontWeight:500,marginBottom:4},children:"Data Rate"}),(0,P.jsxs)("div",{style:{fontSize:"2rem",fontWeight:800,color:"var(--color-text-primary)",letterSpacing:"-0.04em",lineHeight:1},children:[d," ",(0,P.jsx)("span",{style:{fontSize:"1rem",fontWeight:500,color:"var(--color-text-secondary)"},children:"MB/s"})]})]}),(0,P.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4},children:[(0,P.jsx)("div",{style:{fontSize:"0.75rem",color:"var(--color-text-tertiary)"},children:S===null?"Waiting for data":`Updated ${S}s ago`}),(0,P.jsxs)("div",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:9999,background:"rgba(52,199,89,0.1)",border:"1px solid rgba(52,199,89,0.2)",fontSize:"0.75rem",fontWeight:600,color:"#1D8348"},children:[(0,P.jsx)(wa,{size:11})," Stable"]})]})]}),A.length>1&&(0,P.jsx)(Fh,{color:s,points:A})]}),(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"1.5rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"},children:[(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{style:{fontSize:"0.8125rem",color:"var(--color-text-tertiary)",fontWeight:500,marginBottom:4},children:"Signal Strength"}),(0,P.jsxs)("div",{style:{fontSize:"2rem",fontWeight:800,color:"var(--color-text-primary)",letterSpacing:"-0.04em",lineHeight:1},children:[L,(0,P.jsx)("span",{style:{fontSize:"1rem",fontWeight:500,color:"var(--color-text-secondary)"},children:"%"})]})]}),(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.25rem"},children:[(0,P.jsx)(ka,{size:18,style:{color:s,opacity:.5}}),(0,P.jsx)(ka,{size:20,style:{color:s,opacity:.75}}),(0,P.jsx)(ka,{size:22,style:{color:s}})]})]}),(0,P.jsx)("div",{style:{display:"flex",gap:2,alignItems:"flex-end",height:44},children:w.map((z,K)=>(0,P.jsx)("div",{style:{flex:1,borderRadius:3,background:s,opacity:.2+z/100*.8,height:`${z/100*44}px`,transition:"all 0.5s ease"}},K))})]}),(0,P.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"},children:[{label:"CPU Usage",value:E,icon:(0,P.jsx)(tr,{size:16}),history:F},{label:"Memory",value:u,icon:(0,P.jsx)(Jn,{size:16}),history:[55,58,62,60,62,65,63,62,64,u]}].map((z,K)=>(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"1.25rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.75rem",color:"var(--color-text-secondary)"},children:[z.icon,(0,P.jsx)("span",{style:{fontSize:"0.8125rem",fontWeight:500},children:z.label})]}),(0,P.jsxs)("div",{style:{fontSize:"1.75rem",fontWeight:800,color:s,letterSpacing:"-0.04em",marginBottom:"0.625rem"},children:[z.value,"%"]}),(0,P.jsx)("div",{style:{height:5,borderRadius:3,background:"var(--color-border-primary)",overflow:"hidden"},children:(0,P.jsx)("div",{style:{height:"100%",width:`${z.value}%`,borderRadius:3,background:c,transition:"width 0.5s ease"}})})]},K))}),(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"1.5rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"},children:[(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{style:{fontSize:"0.8125rem",color:"var(--color-text-tertiary)",fontWeight:500,marginBottom:4},children:"Total Data Points"}),(0,P.jsx)("div",{style:{fontSize:"2rem",fontWeight:800,color:"var(--color-text-primary)",letterSpacing:"-0.04em",lineHeight:1},children:b.toLocaleString()})]}),(0,P.jsxs)("div",{style:{textAlign:"right"},children:[(0,P.jsx)("div",{style:{fontSize:"0.8125rem",color:"var(--color-text-secondary)",fontWeight:500},children:"Overview"}),(0,P.jsx)("div",{style:{display:"flex",gap:4,marginTop:4},children:["Overview","Firing rate","Waveform"].map((z,K)=>(0,P.jsx)("button",{style:{padding:"2px 8px",borderRadius:6,border:"1px solid var(--color-border-primary)",fontSize:"0.7rem",fontWeight:500,cursor:"pointer",background:K===0?s:"transparent",color:K===0?"#fff":"var(--color-text-secondary)"},children:z},K))})]})]}),A.length>1&&(0,P.jsx)(Fh,{color:s,points:A})]}),(0,P.jsxs)("button",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",width:"100%",padding:"0.875rem",borderRadius:"0.75rem",border:"none",background:c,color:"#fff",fontSize:"0.9375rem",fontWeight:600,cursor:"pointer",boxShadow:`0 4px 14px ${s}4D`,transition:"all 0.2s",letterSpacing:"-0.01em"},onMouseEnter:z=>{z.currentTarget.style.transform="translateY(-2px)",z.currentTarget.style.boxShadow=`0 8px 20px ${s}66`},onMouseLeave:z=>{z.currentTarget.style.transform="translateY(0)",z.currentTarget.style.boxShadow=`0 4px 14px ${s}4D`},children:[(0,P.jsx)(Kn,{size:16})," Export 24h data"]})]}),(0,P.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"1rem",border:"1px solid var(--color-border-primary)",boxShadow:"var(--shadow-sm)",padding:"1.25rem"},children:[(0,P.jsxs)("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.375rem 0.875rem",borderRadius:"9999px",background:"rgba(52,199,89,0.12)",border:"1px solid rgba(52,199,89,0.3)",fontSize:"0.8125rem",fontWeight:700,color:"#1D8348",marginBottom:"1rem"},children:[(0,P.jsx)(He,{size:13})," Connected"]}),(0,P.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[{label:"Last synced",value:S===null?"Waiting":`${S}s ago`},{label:"Battery level",value:`${f}%`},{label:"Signal strength",value:`${L}%`},{label:"Latency",value:`${pt(h,"latency_ms",0)} ms`}].map((z,K,mt)=>(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.5rem 0",borderBottom:K<mt.length-1?"1px solid var(--color-border-primary)":"none"},children:[(0,P.jsx)("span",{style:{fontSize:"0.8rem",color:"var(--color-text-tertiary)"},children:z.label}),(0,P.jsx)("span",{style:{fontSize:"0.8rem",fontWeight:700,color:"var(--color-text-primary)"},children:z.value})]},K))})]}),(0,P.jsxs)("div",{style:{background:i,border:`1px solid rgba(${l.bgLight.match(/[\d.]+/g)?.slice(0,3).join(",")||"0,113,227"},0.15)`,borderRadius:"1rem",padding:"2rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"240px",position:"relative",overflow:"hidden"},children:[(0,P.jsx)("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"},children:[80,64,48].map((z,K)=>(0,P.jsx)("div",{style:{position:"absolute",width:z*2,height:z*2,borderRadius:"50%",border:`1.5px solid ${s}`,opacity:.15+K*.08,animation:`orbit ${6+K*2}s linear infinite`}},K))}),(0,P.jsxs)("div",{style:{position:"relative",zIndex:1,textAlign:"center"},children:[(0,P.jsx)("div",{style:{width:56,height:56,borderRadius:"1rem",background:c,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem",boxShadow:`0 8px 24px ${s}4D`},children:(0,P.jsx)(ot,{size:28,color:"#fff"})}),(0,P.jsx)("div",{style:{fontSize:"0.875rem",fontWeight:700,color:"var(--color-text-primary)"},children:e.name}),(0,P.jsx)("div",{style:{fontSize:"0.75rem",color:s,marginTop:4,fontWeight:500},children:"Live monitoring"})]})]}),(0,P.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"},children:[{label:"Data Points",value:b.toLocaleString(),icon:(0,P.jsx)(St,{size:14}),color:s},{label:"Network",value:`${d} MB/s`,icon:(0,P.jsx)(rl,{size:14}),color:s},{label:"Uptime",value:"99.8%",icon:(0,P.jsx)(ot,{size:14}),color:"#34C759"},{label:"Alerts",value:"None",icon:(0,P.jsx)(ot,{size:14}),color:"var(--color-text-tertiary)"}].map((z,K)=>(0,P.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"0.75rem",border:"1px solid var(--color-border-primary)",padding:"0.875rem"},children:[(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.375rem",color:z.color,marginBottom:"0.5rem"},children:[z.icon,(0,P.jsx)("span",{style:{fontSize:"0.7rem",fontWeight:600,color:"var(--color-text-tertiary)"},children:z.label})]}),(0,P.jsx)("div",{style:{fontSize:"0.9375rem",fontWeight:700,color:"var(--color-text-primary)",letterSpacing:"-0.01em"},children:z.value})]},K))})]})]})]})},Ic=lS;var ge=q(Re());var B=q(X()),Dh="blzc-user-profile",sS="blzc-theme";function Bh(){try{let e=localStorage.getItem(Dh);return e?JSON.parse(e):{}}catch{return{}}}function Ah(e){let t=Bh();localStorage.setItem(Dh,JSON.stringify({...t,...e}))}function iS(e){let t=0;return e.length>=8&&t++,/[A-Z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^A-Za-z0-9]/.test(e)&&t++,t}var Mh=["#EF4444","#EF4444","#F59E0B","#10B981","#10B981"],uS=["","Weak","Fair","Good","Strong"],dS=({isOpen:e,onClose:t,currentEntity:a="FI"})=>{let{mode:r,setTheme:o}=Ee(),[n,l]=(0,ge.useState)("general"),s=(0,ge.useRef)(null),i=Bh(),[c,p]=(0,ge.useState)(i.fullName||"Admin"),[m,h]=(0,ge.useState)(i.displayName||"admin"),[L,f]=(0,ge.useState)(i.avatarUrl||""),[b,E]=(0,ge.useState)(!1),[u,d]=(0,ge.useState)(""),[g,S]=(0,ge.useState)(""),[T,k]=(0,ge.useState)(""),[w,F]=(0,ge.useState)(!1),[A,C]=(0,ge.useState)(!1),[N,W]=(0,ge.useState)(""),[le,re]=(0,ge.useState)(!1),[se,nt]=(0,ge.useState)(i.theme||"light"),[z,K]=(0,ge.useState)(i.defaultEntity||a),[mt,be]=(0,ge.useState)(i.notifyLiveAlerts??!0),[Ye,ye]=(0,ge.useState)(i.notifyExperimentUpdates??!0),[V,Je]=(0,ge.useState)(i.notifyWeeklyDigest??!1),[Pe,gr]=(0,ge.useState)(!1),ae=i.email||"admin@blazecore.io",We=i.role||"Researcher",Ta=c.split(" ").map(_=>_[0]).join("").toUpperCase().slice(0,2)||"AD",Qt=iS(g),Ea=(0,ge.useCallback)(_=>{_.key==="Escape"&&t()},[t]);(0,ge.useEffect)(()=>(e&&(document.addEventListener("keydown",Ea),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",Ea),document.body.style.overflow=""}),[e,Ea]);let M=_=>{let je=_.target.files?.[0];if(!je)return;let ua=new FileReader;ua.onload=Li=>f(Li.target?.result),ua.readAsDataURL(je)},ee=()=>{Ah({fullName:c,displayName:m,avatarUrl:L}),E(!0),setTimeout(()=>E(!1),2e3)},Q=u.length>0&&g.length>=8&&/[A-Z]/.test(g)&&/[0-9]/.test(g)&&/[^A-Za-z0-9]/.test(g)&&T===g,Ve=()=>{if(Q){if(g!==T){W("Passwords do not match.");return}W(""),re(!0),d(""),S(""),k(""),setTimeout(()=>re(!1),2e3)}},De=()=>{Ah({theme:se,defaultEntity:z,notifyLiveAlerts:mt,notifyExperimentUpdates:Ye,notifyWeeklyDigest:V}),se!=="system"&&o(se),localStorage.setItem(sS,se),gr(!0),setTimeout(()=>gr(!1),2e3)},Y=r==="dark",$=Y?"#1C1C1E":"#FFFFFF",ue=Y?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",lt=Y?"#F5F5F7":"#1D1D1F",we=Y?"#98989D":"#86868B",Fl=Y?"#2C2C2E":"#F5F5F7",It=Y?"#2997FF":"#0071E3",hr=Y?"rgba(41,151,255,0.12)":"rgba(0,113,227,0.08)",xr={width:"100%",padding:"0.625rem 0.875rem",borderRadius:"0.5rem",border:`1px solid ${ue}`,background:Fl,color:lt,fontSize:"0.875rem",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'},Al={display:"block",fontSize:"0.8125rem",fontWeight:500,color:we,marginBottom:"0.375rem"},yr=(_,je)=>(0,B.jsxs)("div",{style:{marginBottom:"1rem"},children:[(0,B.jsx)("label",{style:Al,children:_}),je]}),vi=(_,je,ua,Li,Zh="Save changes")=>(0,B.jsx)("button",{id:_,onClick:je,disabled:ua,style:{padding:"0.5625rem 1.25rem",border:"none",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:600,cursor:ua?"not-allowed":"pointer",background:ua?Y?"#3A3A3C":"#E5E5EA":It,color:ua?we:"#fff",display:"inline-flex",alignItems:"center",gap:"0.375rem",transition:"all 0.15s"},onMouseEnter:vr=>{ua||(vr.currentTarget.style.opacity="0.88")},onMouseLeave:vr=>{vr.currentTarget.style.opacity="1"},onMouseDown:vr=>{ua||(vr.currentTarget.style.transform="scale(0.97)")},onMouseUp:vr=>{vr.currentTarget.style.transform="scale(1)"},children:Li?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(Ro,{size:13})," Saved"]}):Zh}),Qh=(_,je)=>(0,B.jsx)("button",{role:"switch","aria-checked":_,onClick:()=>je(!_),style:{width:"2.25rem",height:"1.25rem",borderRadius:"9999px",border:"none",cursor:"pointer",transition:"background 0.2s",background:_?It:Y?"#3A3A3C":"#D1D1D6",position:"relative",flexShrink:0},children:(0,B.jsx)("span",{style:{position:"absolute",top:"0.125rem",left:_?"calc(100% - 1.125rem)":"0.125rem",width:"1rem",height:"1rem",borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}})});return e?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)("div",{style:{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.3)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:t}),(0,B.jsxs)("div",{ref:s,style:{position:"fixed",right:0,top:0,height:"100vh",width:"400px",zIndex:201,background:$,borderLeft:`1px solid ${ue}`,boxShadow:"-8px 0 40px rgba(0,0,0,0.18)",display:"flex",flexDirection:"column",animation:"slideInRight 0.25s cubic-bezier(0.16,1,0.3,1)",overflowY:"auto",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'},onClick:_=>_.stopPropagation(),children:[(0,B.jsx)("style",{children:`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
          .panel-field-input:focus {
            border-color: ${It} !important;
            box-shadow: 0 0 0 3px ${It}22 !important;
          }
          .panel-tab:focus-visible { outline: 2px solid ${It}; outline-offset: 2px; }
        `}),(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.25rem 1.5rem",borderBottom:`1px solid ${ue}`,flexShrink:0},children:[(0,B.jsxs)("div",{children:[(0,B.jsx)("h2",{style:{margin:0,fontSize:"1rem",fontWeight:700,color:lt,letterSpacing:"-0.01em"},children:"Account Settings"}),(0,B.jsx)("p",{style:{margin:"0.125rem 0 0",fontSize:"0.8125rem",color:we},children:"Manage your profile and preferences"})]}),(0,B.jsx)("button",{onClick:t,"aria-label":"Close panel",style:{width:"2rem",height:"2rem",borderRadius:"0.5rem",border:`1px solid ${ue}`,background:"transparent",color:we,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"},onMouseEnter:_=>{_.currentTarget.style.background=Y?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)"},onMouseLeave:_=>{_.currentTarget.style.background="transparent"},onMouseDown:_=>{_.currentTarget.style.transform="scale(0.95)"},onMouseUp:_=>{_.currentTarget.style.transform="scale(1)"},children:(0,B.jsx)($t,{size:15})})]}),(0,B.jsx)("div",{style:{display:"flex",gap:"0.25rem",padding:"0.75rem 1.5rem",borderBottom:`1px solid ${ue}`,flexShrink:0},children:["general","security","preferences"].map(_=>(0,B.jsx)("button",{className:"panel-tab",onClick:()=>l(_),style:{padding:"0.375rem 0.875rem",borderRadius:"0.5rem",border:"none",cursor:"pointer",fontSize:"0.8125rem",fontWeight:500,transition:"all 0.15s",textTransform:"capitalize",background:n===_?hr:"transparent",color:n===_?It:we},onMouseDown:je=>{je.currentTarget.style.transform="scale(0.97)"},onMouseUp:je=>{je.currentTarget.style.transform="scale(1)"},children:_},_))}),(0,B.jsxs)("div",{style:{flex:1,padding:"1.5rem",overflowY:"auto"},children:[n==="general"&&(0,B.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"0"},children:[(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.5rem",padding:"1rem",background:Y?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",borderRadius:"0.75rem",border:`1px solid ${ue}`},children:[(0,B.jsx)("div",{style:{width:"3.5rem",height:"3.5rem",borderRadius:"50%",background:L?"transparent":It,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden",fontSize:"1rem",fontWeight:700,color:"#fff"},children:L?(0,B.jsx)("img",{src:L,alt:"avatar",style:{width:"100%",height:"100%",objectFit:"cover"}}):Ta}),(0,B.jsxs)("div",{style:{flex:1},children:[(0,B.jsx)("div",{style:{fontSize:"0.875rem",fontWeight:600,color:lt,marginBottom:"0.375rem"},children:"Profile Photo"}),(0,B.jsxs)("div",{style:{display:"flex",gap:"0.5rem"},children:[(0,B.jsxs)("label",{style:{display:"inline-flex",alignItems:"center",gap:"0.375rem",padding:"0.375rem 0.75rem",borderRadius:"0.375rem",border:`1px solid ${ue}`,background:Y?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",fontSize:"0.75rem",fontWeight:500,color:we,cursor:"pointer",transition:"all 0.15s"},children:[(0,B.jsx)(ul,{size:12})," Upload",(0,B.jsx)("input",{type:"file",accept:"image/*",style:{display:"none"},onChange:M})]}),L&&(0,B.jsx)("button",{onClick:()=>f(""),style:{padding:"0.375rem 0.75rem",borderRadius:"0.375rem",border:"1px solid rgba(239,68,68,0.25)",background:"rgba(239,68,68,0.08)",fontSize:"0.75rem",fontWeight:500,color:"#EF4444",cursor:"pointer",transition:"all 0.15s"},children:"Remove"})]})]})]}),yr("Full Name",(0,B.jsx)("input",{id:"field-full-name",type:"text",className:"panel-field-input",value:c,onChange:_=>p(_.target.value),style:xr})),yr("Display Name / Handle",(0,B.jsx)("input",{id:"field-display-name",type:"text",className:"panel-field-input",value:m,onChange:_=>h(_.target.value),style:xr})),yr("Email Address",(0,B.jsxs)("div",{style:{position:"relative"},children:[(0,B.jsx)("input",{type:"email",value:ae,readOnly:!0,style:{...xr,opacity:.6,cursor:"not-allowed",paddingRight:"2.5rem"},title:"Contact admin to change email"}),(0,B.jsx)("span",{style:{position:"absolute",right:"0.75rem",top:"50%",transform:"translateY(-50%)",fontSize:"0.6875rem",color:we},children:"read-only"})]})),yr("Role",(0,B.jsx)("div",{style:{display:"inline-flex",alignItems:"center",padding:"0.3125rem 0.75rem",borderRadius:"9999px",background:`${It}12`,border:`1px solid ${It}30`,fontSize:"0.8125rem",fontWeight:600,color:It},children:We})),(0,B.jsx)("div",{style:{marginTop:"0.5rem"},children:vi("btn-save-general",ee,!c.trim(),b)})]}),n==="security"&&(0,B.jsxs)("div",{children:[yr("Current Password",(0,B.jsxs)("div",{style:{position:"relative"},children:[(0,B.jsx)("input",{id:"field-password-current",type:w?"text":"password",className:"panel-field-input",value:u,onChange:_=>d(_.target.value),style:{...xr,paddingRight:"2.5rem"}}),(0,B.jsx)("button",{onClick:()=>F(!w),style:{position:"absolute",right:"0.625rem",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:we,padding:"0.25rem",display:"flex",alignItems:"center",justifyContent:"center"},children:w?(0,B.jsx)(Eo,{size:14}):(0,B.jsx)(ba,{size:14})})]})),yr("New Password",(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)("div",{style:{position:"relative"},children:[(0,B.jsx)("input",{id:"field-password-new",type:A?"text":"password",className:"panel-field-input",value:g,onChange:_=>S(_.target.value),style:{...xr,paddingRight:"2.5rem"}}),(0,B.jsx)("button",{onClick:()=>C(!A),style:{position:"absolute",right:"0.625rem",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:we,padding:"0.25rem",display:"flex",alignItems:"center",justifyContent:"center"},children:A?(0,B.jsx)(Eo,{size:14}):(0,B.jsx)(ba,{size:14})})]}),g.length>0&&(0,B.jsxs)("div",{style:{marginTop:"0.5rem"},children:[(0,B.jsx)("div",{style:{display:"flex",gap:"0.25rem",marginBottom:"0.375rem"},children:[1,2,3,4].map(_=>(0,B.jsx)("div",{style:{flex:1,height:"4px",borderRadius:"2px",background:_<=Qt?Mh[Qt]:Y?"#3A3A3C":"#E5E5EA",transition:"background 0.2s"}},_))}),(0,B.jsx)("span",{style:{fontSize:"0.75rem",color:Mh[Qt],fontWeight:500},children:uS[Qt]})]}),(0,B.jsx)("div",{style:{marginTop:"0.625rem",display:"flex",flexDirection:"column",gap:"0.25rem"},children:[{label:"8+ characters",met:g.length>=8},{label:"Uppercase letter",met:/[A-Z]/.test(g)},{label:"Number",met:/[0-9]/.test(g)},{label:"Special character",met:/[^A-Za-z0-9]/.test(g)}].map(_=>(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.375rem",fontSize:"0.75rem",color:_.met?"#10B981":we},children:[(0,B.jsx)(Ro,{size:11,style:{opacity:_.met?1:.3,color:_.met?"#10B981":we}}),_.label]},_.label))})]})),yr("Confirm New Password",(0,B.jsxs)("div",{style:{position:"relative"},children:[(0,B.jsx)("input",{type:"password",className:"panel-field-input",value:T,onChange:_=>k(_.target.value),style:{...xr,paddingRight:"2rem"}}),g.length>0&&T.length>0&&(0,B.jsx)("span",{style:{position:"absolute",right:"0.625rem",top:"50%",transform:"translateY(-50%)",color:T===g?"#10B981":"#EF4444",fontSize:"0.875rem"},children:T===g?"\u2713":"\u2717"})]})),N&&(0,B.jsx)("div",{style:{marginBottom:"1rem",padding:"0.625rem 0.875rem",borderRadius:"0.5rem",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)",fontSize:"0.8125rem",color:"#EF4444"},children:N}),vi("btn-save-password",Ve,!Q,le,"Update password")]}),n==="preferences"&&(0,B.jsxs)("div",{children:[(0,B.jsxs)("div",{style:{marginBottom:"1.25rem"},children:[(0,B.jsx)("label",{style:Al,children:"Theme"}),(0,B.jsx)("div",{style:{display:"flex",gap:"0.25rem",background:Y?"#2C2C2E":"#F5F5F7",borderRadius:"0.5rem",padding:"0.25rem",border:`1px solid ${ue}`},children:[{val:"light",icon:(0,B.jsx)(Wr,{size:13}),label:"Light"},{val:"dark",icon:(0,B.jsx)(_r,{size:13}),label:"Dark"},{val:"system",icon:(0,B.jsx)(al,{size:13}),label:"System"}].map(_=>(0,B.jsxs)("button",{onClick:()=>nt(_.val),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.375rem",padding:"0.4375rem",borderRadius:"0.375rem",border:"none",cursor:"pointer",fontSize:"0.8125rem",fontWeight:500,background:se===_.val?Y?"#3A3A3C":"#FFFFFF":"transparent",color:se===_.val?lt:we,boxShadow:se===_.val?"0 1px 3px rgba(0,0,0,0.1)":"none",transition:"all 0.15s"},onMouseDown:je=>{je.currentTarget.style.transform="scale(0.96)"},onMouseUp:je=>{je.currentTarget.style.transform="scale(1)"},children:[_.icon," ",_.label]},_.val))})]}),(0,B.jsxs)("div",{style:{marginBottom:"1.25rem"},children:[(0,B.jsx)("label",{style:Al,children:"Default Entity"}),(0,B.jsxs)("select",{value:z,onChange:_=>K(_.target.value),style:{...xr,appearance:"none",cursor:"pointer"},children:[(0,B.jsx)("option",{value:"FI",children:"Foundation Institute (FI)"}),(0,B.jsx)("option",{value:"aragon",children:"Aragon Research Institute"})]})]}),(0,B.jsxs)("div",{style:{marginBottom:"1.5rem"},children:[(0,B.jsx)("label",{style:{...Al,marginBottom:"0.75rem"},children:"Notifications"}),(0,B.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[{label:"Live Alerts",sub:"Real-time device notifications",val:mt,set:be},{label:"Experiment Updates",sub:"Status changes and results",val:Ye,set:ye},{label:"Weekly Digest",sub:"Summary of activity each week",val:V,set:Je}].map(_=>(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.75rem",borderRadius:"0.5rem",background:Y?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",border:`1px solid ${ue}`},children:[(0,B.jsxs)("div",{children:[(0,B.jsx)("div",{style:{fontSize:"0.875rem",fontWeight:500,color:lt},children:_.label}),(0,B.jsx)("div",{style:{fontSize:"0.75rem",color:we,marginTop:"0.125rem"},children:_.sub})]}),Qh(_.val,_.set)]},_.label))})]}),vi("btn-save-preferences",De,!1,Pe,"Save preferences")]})]})]})]}):null},zh=dS;(()=>{let e=document.createElement("style");e.textContent=`/* \u2500\u2500 Dark mode depth overrides \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
[data-theme="dark"] .sidebar {
  background: #18181A;
  border-right-color: rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .main-content {
  background-color: #111113;
}

[data-theme="dark"] .sidebar-footer {
  border-top-color: rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .sidebar-workspace {
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .search-input {
  background-color: #2C2C2E;
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .search-input:focus {
  background-color: #3A3A3C;
}

[data-theme="dark"] .modal-box {
  background: #1C1C1E;
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .modal-input {
  background: #2C2C2E;
  border-color: rgba(255, 255, 255, 0.08);
  color: #F5F5F7;
}

/* \u2500\u2500 Dark mode text pass-through for card content \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
[data-theme="dark"] .blynk-card {
  color: var(--color-text-primary);
  background-color: var(--color-card);
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .progress-bar {
  background-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .signal-bar,
[data-theme="dark"] .battery-bar {
  background-color: rgba(255, 255, 255, 0.08);
}

/* === Dashboard Layout === */
.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: var(--color-surface);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
  color: var(--color-text-primary);
  overflow: hidden;
}

/* === Sidebar === */
.sidebar {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid var(--color-border-primary);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  z-index: 20;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.collapsed {
  transform: translateX(-240px);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.icon-only {
  width: 64px;
}

/* === Sidebar Brand Header (64px tall) === */
.sidebar-brand-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0 0.875rem;
  height: 64px;
  min-height: 64px;
  border-bottom: 1px solid var(--color-border-primary);
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar-brand-logo {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--entity-gradient, var(--gradient-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.sidebar-brand-logo:hover {
  opacity: 0.85;
}

.sidebar-brand-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.sidebar-brand-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.sidebar-brand-tagline {
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
  white-space: nowrap;
}

.sidebar-collapse-btn {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid var(--color-border-primary);
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;
  margin-left: auto;
}

.sidebar-collapse-btn:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

/* === Sidebar Sections === */
.sidebar-section {
  padding: 0;
  flex-shrink: 0;
}

.sidebar-nav-section {
  flex: 1;
}

/* === Section Labels === */
.nav-section-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-text-tertiary);
  padding: 16px 12px 6px;
  text-transform: uppercase;
}

/* === Nav Items === */
.nav-container {
  padding: 0.25rem 0;
}

.nav-container-system {
  flex: none;
}

.nav-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  margin: 2px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--color-text-secondary);
  gap: 0.625rem;
  white-space: nowrap;
  overflow: hidden;
}

.nav-item:hover {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: rgba(var(--entity-accent-rgb, 0, 113, 227), 0.1);
  color: var(--entity-accent, var(--macos-accent-blue));
  font-weight: 600;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: inherit;
}

.nav-text {
  font-size: 0.875rem;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-badge {
  margin-left: auto;
  background: var(--entity-gradient, var(--gradient-primary));
  color: #fff;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  line-height: 1.5;
  flex-shrink: 0;
}

.nav-divider {
  border-top: 1px solid var(--color-border-primary);
  margin: 0.5rem 0.75rem;
}

/* === Entity Switcher === */
.entity-switcher-wrap {
  position: relative;
  margin: 0 6px 4px;
}

.entity-switcher-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);
  background: var(--color-surface);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  min-height: 44px;
  overflow: hidden;
}

.entity-switcher-btn:hover,
.entity-switcher-btn.open {
  background: var(--color-card);
  border-color: var(--entity-accent, var(--color-border-secondary));
}

.entity-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.entity-switcher-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
}

.entity-switcher-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entity-switcher-sub {
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entity-chevron {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  transition: transform 200ms ease;
}

.entity-chevron.rotated {
  transform: rotate(180deg);
}

.entity-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--color-card);
  border: 1px solid var(--color-border-primary);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  z-index: 30;
  overflow: hidden;
  animation: slideDown 0.18s ease both;
}

.entity-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;
}

.entity-dropdown-item:hover {
  background: var(--color-surface);
}

.entity-dropdown-item.active {
  background: rgba(var(--entity-accent-rgb, 0, 113, 227), 0.08);
}

.entity-dropdown-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.entity-dropdown-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entity-dropdown-sub {
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
}

.entity-active-check {
  font-size: 0.75rem;
  color: var(--entity-accent, var(--macos-accent-blue));
  font-weight: 700;
}

/* === Live Status Section === */
.live-status-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 6px 8px;
}

.live-status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.live-status-text {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.live-status-icon {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.live-pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  flex-shrink: 0;
  animation: livePulse 2s ease-in-out infinite;
}

.live-dot-icon {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  margin: 8px auto;
  animation: livePulse 2s ease-in-out infinite;
}

.live-status-collapsed {
  padding: 4px 0;
}

@keyframes livePulse {

  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }

  50% {
    opacity: 0.8;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0);
  }
}

/* === Unified Sidebar Profile === */
.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 0.875rem;
  border-top: 1px solid var(--color-border-primary);
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  transition: background 0.18s ease;
  user-select: none;
  flex-shrink: 0;
}

.sidebar-profile:hover {
  background-color: var(--color-surface);
}

.sidebar-profile:active {
  transform: scale(0.98);
}

.sidebar-profile-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--entity-gradient, var(--gradient-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid var(--color-border-primary);
}

.sidebar-profile-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1px;
  flex: 1;
}

.sidebar-profile-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.sidebar-profile-role {
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-profile-badge {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.1875rem 0.5rem;
  border-radius: 9999px;
  background: rgba(var(--entity-accent-rgb, 0, 113, 227), 0.10);
  color: var(--entity-accent, #0071E3);
  border: 1px solid rgba(var(--entity-accent-rgb, 0, 113, 227), 0.25);
  flex-shrink: 0;
}

/* === Legacy sidebar-footer (backwards compat) === */
.sidebar-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-border-primary);
  display: flex;
  align-items: center;
  gap: 0.625rem;
  overflow: hidden;
  white-space: nowrap;
}

/* === Main Content === */
.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  background-color: var(--color-surface);
  margin-left: 240px;
  transition: margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
}

.main-content.sidebar-collapsed {
  margin-left: 0;
}

.main-content.sidebar-icon-only {
  margin-left: 64px;
}

.main-content-inner {
  padding: 32px 2rem 1.75rem;
  animation: fadeIn 0.2s ease;
  min-height: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === Content Cards === */
.content-card {
  background-color: var(--color-card);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.card-text {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 0.9375rem;
}

.content-placeholder {
  margin-top: 2rem;
  padding: 3rem;
  border: 2px dashed var(--color-border-primary);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
}

.placeholder-text {
  color: var(--color-text-tertiary);
  text-align: center;
  font-size: 0.875rem;
}

/* === Experiments Section === */
.experiments-section {
  animation: fadeIn 0.2s ease;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0 0;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* === Action Buttons === */
.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.125rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
}

.action-button.primary {
  background: var(--gradient-primary);
  color: #000000;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
}

.action-button.primary:hover {
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.4);
  transform: translateY(-1px);
}

.action-button.primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0, 122, 255, 0.3);
}

.action-button.secondary {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-primary);
}

.action-button.secondary:hover {
  background-color: var(--color-card);
  color: var(--color-text-primary);
  border-color: var(--color-border-secondary);
}

.action-button.danger {
  background-color: var(--macos-accent-red-light);
  color: var(--macos-accent-red);
  border: 1px solid rgba(255, 59, 48, 0.2);
}

.action-button.danger:hover {
  background-color: var(--macos-accent-red);
  color: white;
}

/* === Search === */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  color: var(--color-text-tertiary);
}

.search-input {
  padding: 0.625rem 1rem 0.625rem 2.625rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  font-size: 0.875rem;
  width: 240px;
  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--color-text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  border-color: var(--macos-accent-blue);
  background-color: var(--color-card);
}

/* === Experiment Grid === */
.experiment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.25rem;
  padding: 0.25rem 0;
}

/* === Experiment Card === */
.blynk-card {
  background-color: var(--color-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease, opacity 0.25s ease;
  position: relative;
  overflow: hidden;
}

.blynk-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.blynk-card.active::before {
  opacity: 1;
}

.blynk-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-secondary);
}

.blynk-card.clickable {
  cursor: pointer;
  will-change: transform;
}

.blynk-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.blynk-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 0.75rem;
}

.experiment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 0.75rem;
  background: var(--gradient-accent);
  color: white;
  flex-shrink: 0;
}

.experiment-title {
  flex: 1;
  min-width: 0;
}

.experiment-title h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.experiment-status {
  display: flex;
  align-items: center;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.status-indicator.success {
  background-color: var(--macos-accent-green-light);
  color: var(--macos-accent-green);
  border: 1px solid rgba(52, 199, 89, 0.25);
}

.status-indicator.warning {
  background-color: var(--macos-accent-orange-light);
  color: var(--macos-accent-orange);
  border: 1px solid rgba(255, 149, 0, 0.25);
}

.status-indicator.info {
  background-color: var(--macos-accent-blue-light);
  color: var(--macos-accent-blue);
  border: 1px solid rgba(0, 122, 255, 0.25);
}

.status-indicator.secondary {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-primary);
}

.card-actions {
  display: flex;
  gap: 0.3rem;
  flex-shrink: 0;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  color: #6B7280;
  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] .control-btn {
  border-color: rgba(255, 255, 255, 0.10);
  color: #9CA3AF;
}

.control-btn.play:hover {
  background-color: rgba(52, 199, 89, 0.12);
  color: #1D8348;
  border-color: rgba(52, 199, 89, 0.25);
}

.control-btn.pause:hover {
  background-color: rgba(255, 159, 10, 0.12);
  color: #B7770D;
  border-color: rgba(255, 159, 10, 0.25);
}

.control-btn.refresh:hover:not(:disabled) {
  background-color: var(--entity-accent-light, var(--macos-accent-blue-light));
  color: var(--entity-accent, var(--macos-accent-blue));
  border-color: transparent;
}

.control-btn.refresh:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.control-btn.delete:hover {
  background-color: rgba(239, 68, 68, 0.10);
  color: #DC2626;
  border-color: rgba(239, 68, 68, 0.2);
}

.control-btn.settings:hover {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

/* === Metrics === */
.blynk-metrics {
  margin-bottom: 1.25rem;
}

.metric-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.metric-row:last-child {
  margin-bottom: 0;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.metric-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 0.375rem;
  background-color: var(--color-surface);
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  border: 1px solid var(--color-border-primary);
}

.metric-info {
  flex: 1;
  min-width: 0;
}

.metric-label {
  display: block;
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
  margin-bottom: 0.125rem;
}

.metric-value {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text-primary);
  font-weight: 600;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* === Signal & Battery Bars === */
.signal-bar,
.battery-bar {
  display: inline-block;
  width: 36px;
  height: 4px;
  background-color: var(--color-border-primary);
  border-radius: 2px;
  overflow: hidden;
  margin-right: 0.375rem;
  vertical-align: middle;
}

.signal-fill,
.battery-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease, background 0.4s ease;
}

.signal-fill.strong,
.battery-fill.good {
  background: linear-gradient(90deg, var(--macos-accent-green), #28A745);
}

.signal-fill.medium,
.battery-fill.medium {
  background: linear-gradient(90deg, var(--macos-accent-orange), #E67E22);
}

.signal-fill.weak,
.battery-fill.low {
  background: linear-gradient(90deg, var(--macos-accent-red), #DC3545);
}

/* === Progress === */
.blynk-progress {
  margin-bottom: 1.25rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
}

.progress-label {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.progress-percentage {
  font-size: 0.8125rem;
  color: var(--color-text-primary);
  font-weight: 600;
  font-family: 'SF Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.progress-bar {
  height: 6px;
  background-color: var(--color-border-primary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-fill.active {
  background: var(--gradient-primary);
}

.progress-fill.inactive {
  background-color: var(--color-border-secondary);
}

/* === Stats Row === */
.blynk-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-primary);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
}

/* === Empty State === */
.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: var(--color-text-secondary);
  background-color: var(--color-card);
  border: 2px dashed var(--color-border-primary);
  border-radius: 1rem;
}

.empty-state svg {
  margin-bottom: 1rem;
  color: var(--color-text-tertiary);
  opacity: 0.6;
}

.empty-state h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  max-width: 320px;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

/* === Experiment Detail View === */
.experiment-detail-view {
  animation: fadeIn 0.2s ease;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border-primary);
  flex-wrap: wrap;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.back-button:hover {
  background-color: var(--color-card);
  color: var(--color-text-primary);
  border-color: var(--color-border-secondary);
}

.detail-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.detail-actions .control-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  width: auto;
  height: auto;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-info-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--color-card);
  border-radius: 1rem;
  padding: 1.75rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
}

.experiment-large-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 1rem;
  background: var(--gradient-accent);
  color: white;
  flex-shrink: 0;
}

.experiment-details {
  flex: 1;
}

.experiment-details h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.625rem 0;
  line-height: 1.2;
}

.experiment-details .experiment-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.experiment-details .status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.experiment-details .status-badge.success {
  background-color: rgba(16, 185, 129, 0.12);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.experiment-details .status-badge.warning {
  background-color: rgba(245, 158, 11, 0.12);
  color: #d97706;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.experiment-details .status-badge.secondary {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-primary);
}

.experiment-details .meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* === Metrics Grid === */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.metric-card {
  background-color: var(--color-card);
  border-radius: 0.875rem;
  padding: 1.25rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-secondary);
}

.metric-header h3 {
  font-size: 0.8125rem;
  font-weight: 500;
  margin: 0;
}

.metric-card .metric-value {
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 500;
}

.metric-trend.positive {
  color: #10b981;
}

.metric-trend.negative {
  color: #ef4444;
}

.signal-progress,
.battery-progress {
  height: 6px;
  background-color: var(--color-border-primary);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.signal-progress .signal-fill,
.battery-progress .battery-fill,
.metric-card .progress-bar .progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease, background 0.4s ease;
}

.metric-card .progress-bar {
  height: 6px;
  background-color: var(--color-border-primary);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

/* === Activity Chart Card === */
.activity-chart-card {
  background-color: var(--color-card);
  border-radius: 0.875rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.chart-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
}

.chart-header-left h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.chart-controls {
  display: flex;
  gap: 0.25rem;
  background-color: var(--color-surface);
  padding: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border-primary);
}

.chart-btn {
  padding: 0.3rem 0.75rem;
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.chart-btn:hover {
  color: var(--color-text-primary);
  background-color: var(--color-card);
}

.chart-btn.active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 1px 4px rgba(26, 39, 68, 0.25);
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  color: var(--color-text-secondary);
  text-align: center;
  border: 1px solid var(--color-border-primary);
}

.chart-placeholder svg {
  margin-bottom: 1rem;
  color: var(--color-text-tertiary);
  opacity: 0.6;
}

.chart-placeholder p {
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
  color: var(--color-text-secondary);
}

.chart-placeholder span {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

/* === Info Grid === */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.875rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--color-card);
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
  color: var(--color-text-secondary);
}

.info-card h4 {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--color-text-tertiary);
  margin: 0 0 0.2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-card p {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

/* === API Testing === */
.api-testing-section {
  animation: fadeIn 0.2s ease;
}

.api-testing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-top: 1.25rem;
}

.request-builder,
.response-display {
  background-color: var(--color-card);
  border-radius: 0.875rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
}

.request-builder h3,
.response-display h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--color-text-primary);
}

.method-selector,
.endpoint-selector,
.headers-input,
.body-input {
  margin-bottom: 1rem;
}

.method-selector label,
.endpoint-selector label,
.headers-input label,
.body-input label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.375rem;
}

.method-selector select,
.endpoint-selector input,
.headers-input textarea,
.body-input textarea {
  width: 100%;
  padding: 0.625rem 0.875rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.method-selector select:focus,
.endpoint-selector input:focus,
.headers-input textarea:focus,
.body-input textarea:focus {
  outline: none;
  border-color: var(--entity-accent, var(--macos-accent-blue));
  background-color: var(--color-card);
}

.endpoint-selector input::placeholder,
.headers-input textarea::placeholder,
.body-input textarea::placeholder {
  color: var(--color-text-tertiary);
}

.saved-endpoints {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border-primary);
}

.saved-endpoints h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text-primary);
}

.saved-endpoints-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.saved-endpoint-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.875rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.saved-endpoint-item:hover {
  background-color: var(--color-card);
  border-color: var(--color-border-secondary);
}

.saved-endpoint-item.active {
  background-color: var(--entity-accent-light, var(--macos-accent-blue-light));
  border-color: var(--entity-accent, var(--macos-accent-blue));
}

.saved-endpoint-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.saved-endpoint-info .method-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.1875rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  flex-shrink: 0;
}

.saved-endpoint-info .method-badge.get {
  background-color: rgba(16, 185, 129, 0.15);
  color: #10B981;
}

.saved-endpoint-info .method-badge.post {
  background-color: rgba(59, 130, 246, 0.15);
  color: #3B82F6;
}

.saved-endpoint-info .method-badge.put {
  background-color: rgba(245, 158, 11, 0.15);
  color: #F59E0B;
}

.saved-endpoint-info .method-badge.delete {
  background-color: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}

.endpoint-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.endpoint-path {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-endpoint-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}

.delete-endpoint-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.method-selector select,
.endpoint-selector select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border-primary);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.method-selector select:focus,
.endpoint-selector select:focus {
  outline: none;
  border-color: var(--entity-accent, var(--macos-accent-blue));
  box-shadow: 0 0 0 2px rgba(var(--entity-accent-rgb, 0, 113, 227), 0.15);
}

.body-input textarea {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--color-border-primary);
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  resize: vertical;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  min-height: 100px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.body-input textarea:focus {
  outline: none;
  border-color: var(--entity-accent, var(--macos-accent-blue));
  box-shadow: 0 0 0 2px rgba(var(--entity-accent-rgb, 0, 113, 227), 0.15);
}

.quick-tests h4 {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin: 0 0 0.625rem 0;
}

.quick-test-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.quick-test-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.625rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.quick-test-btn:hover {
  background-color: var(--color-card);
  border-color: var(--color-border-secondary);
  color: var(--color-text-primary);
}

.response-display {
  max-height: 600px;
  overflow-y: auto;
}

.test-history {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.test-result {
  border: 1px solid var(--color-border-primary);
  border-radius: 0.625rem;
  overflow: hidden;
}

.test-result.success {
  border-left: 3px solid #10b981;
}

.test-result.error {
  border-left: 3px solid #ef4444;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1rem;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-primary);
}

.test-info {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.method-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.method-badge.get {
  background-color: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}

.method-badge.post {
  background-color: rgba(16, 185, 129, 0.12);
  color: #059669;
}

.method-badge.put {
  background-color: rgba(245, 158, 11, 0.12);
  color: #d97706;
}

.method-badge.delete {
  background-color: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.endpoint {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

.timestamp {
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
}

.test-actions {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.test-actions button {
  padding: 0.25rem;
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: var(--color-text-tertiary);
  transition: color 0.15s ease;
}

.test-actions button:hover {
  color: var(--color-text-primary);
}

.success-icon {
  color: #10b981;
}

.error-icon {
  color: #ef4444;
}

.request-body,
.response-body {
  padding: 0.875rem 1rem;
}

.request-body strong,
.response-body strong {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.375rem;
}

.request-body pre,
.response-body pre {
  margin: 0;
  padding: 0.75rem;
  background-color: var(--color-surface);
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: var(--color-text-primary);
  overflow-x: auto;
  white-space: pre-wrap;
  border: 1px solid var(--color-border-primary);
}

/* === Modal === */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-box {
  background-color: var(--color-card);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 440px;
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-xl);
  animation: modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-8px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  padding: 0.375rem;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.modal-close:hover {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

.modal-field {
  margin-bottom: 1.25rem;
}

.modal-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.modal-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  box-sizing: border-box;
}

.modal-input::placeholder {
  color: var(--color-text-tertiary);
}

.modal-input:focus {
  outline: none;
  border-color: var(--entity-accent, var(--macos-accent-blue));
  box-shadow: 0 0 0 3px rgba(var(--entity-accent-rgb, 0, 113, 227), 0.15);
  background-color: var(--color-card);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.modal-btn-cancel {
  padding: 0.5625rem 1.25rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.modal-btn-cancel:hover {
  background-color: var(--color-card);
  color: var(--color-text-primary);
}

.modal-btn-create {
  padding: 0.5625rem 1.25rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(26, 39, 68, 0.25);
}

.modal-btn-create:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(26, 39, 68, 0.35);
  transform: translateY(-1px);
}

.modal-btn-create:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* === Global Button Audit \u2014 active press scale ===
   Applies to all interactive button-like elements in the dashboard */
button:active,
[role="button"]:active {
  transform: scale(0.97);
}

/* === Animations === */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }

  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

@keyframes blobMove1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(20px, -15px) scale(1.05);
  }

  66% {
    transform: translate(-10px, 10px) scale(0.97);
  }
}

@keyframes blobMove2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(-20px, 10px) scale(1.04);
  }

  66% {
    transform: translate(15px, -20px) scale(0.96);
  }
}

@keyframes blobMove3 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(10px, 15px) scale(1.03);
  }
}

/* Responsive experiment detail 3-column \u2192 1-column */
@media (max-width: 1100px) {
  .experiment-detail-view>div[style*="grid-template-columns: 260px"] {
    grid-template-columns: 1fr !important;
  }
}

/* === Responsive === */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .blynk-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .metric-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .api-testing-grid {
    grid-template-columns: 1fr;
  }

  .detail-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .metrics-grid {
    grid-template-columns: 1fr 1fr;
  }

  .sidebar {
    width: 240px;
    z-index: 50;
  }

  .sidebar.collapsed {
    transform: translateX(-240px);
    width: 240px;
  }

  .sidebar.icon-only {
    width: 240px;
  }

  .main-content {
    margin-left: 0 !important;
  }

  .search-input {
    width: 180px;
  }
}

/* Overlay for mobile sidebar */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 40;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

@media (max-width: 480px) {
  .main-content-inner {
    padding: 1.25rem 1rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .detail-info-card {
    flex-direction: column;
    text-align: center;
  }
}
`,document.head.appendChild(e)})();var y=q(X()),bt={THEME:"blzc.theme",ACTIVE_ENTITY:"blzc.activeEntity",USER_PROFILE:"blzc.userProfile",SESSION:"blzc.session",SIDEBAR_STATE:"blzc.sidebarCollapsed"};function cS(){[{old:"theme",newKey:bt.THEME},{old:"blazecore_entity",newKey:bt.ACTIVE_ENTITY},{old:"blzc-active-entity",newKey:bt.ACTIVE_ENTITY},{old:"blazecore_user",newKey:bt.SESSION},{old:"blzc-user-profile",newKey:bt.USER_PROFILE},{old:"user-profile",newKey:bt.USER_PROFILE}].forEach(({old:t,newKey:a})=>{let r=localStorage.getItem(t);r!==null&&(localStorage.getItem(a)||localStorage.setItem(a,r),localStorage.removeItem(t))})}var Kt={fi:{id:"fi",name:"FI",fullName:"Foundation Institute",tagline:"Open research infrastructure & experimentation",description:"The Foundation Institute node hosts cutting-edge IoT experiments across its distributed sensor network. Specialising in smart-city, environmental monitoring, and energy research.",location:"Barcelona, Spain",website:"fi.eus",devices:48,activeExperiments:12,researchers:34,colors:{gradient:"linear-gradient(135deg, #9B1C1C 0%, #C0392B 100%)",primary:"#C0392B",accent:"#E74C3C",bgLight:"rgba(192,57,43,0.10)",bgMedium:"rgba(192,57,43,0.14)",borderColor:"rgba(192,57,43,0.28)"},icon:"\u{1F3DB}"},aragon:{id:"aragon",name:"Aragon",fullName:"Aragon Research Institute",tagline:"Smart systems & connected infrastructure",description:"The Aragon node drives innovation in industrial IoT, precision agriculture, and autonomous systems research, leveraging state-of-the-art sensor fusion and edge computing.",location:"Zaragoza, Spain",website:"aragon.es",devices:36,activeExperiments:9,researchers:27,colors:{gradient:"linear-gradient(135deg, #1A56DB 0%, #3B82F6 100%)",primary:"#1A56DB",accent:"#3B82F6",bgLight:"rgba(26,86,219,0.10)",bgMedium:"rgba(26,86,219,0.14)",borderColor:"rgba(26,86,219,0.28)"},icon:"\u{1F52C}"}};function wc(e){let t=document.documentElement;e?(t.style.setProperty("--entity-accent",e.colors.primary),t.style.setProperty("--entity-accent-light",e.colors.bgLight),t.style.setProperty("--entity-accent-muted",e.colors.bgLight),t.style.setProperty("--entity-gradient",e.colors.gradient),document.body.setAttribute("data-entity",e.id),localStorage.setItem(bt.ACTIVE_ENTITY,JSON.stringify({entity:e.id,accent:e.colors.primary}))):(t.style.removeProperty("--entity-accent"),t.style.removeProperty("--entity-accent-light"),t.style.removeProperty("--entity-accent-muted"),t.style.removeProperty("--entity-gradient"),document.body.removeAttribute("data-entity"))}var kc=({onClose:e,onCreate:t,entity:a})=>{let{theme:r}=Ee(),[o,n]=(0,ne.useState)(""),[l,s]=(0,ne.useState)(!1),[i,c]=(0,ne.useState)(""),[p,m]=(0,ne.useState)(""),h=(0,ne.useRef)(null);(0,ne.useEffect)(()=>{h.current?.focus()},[]);let L=async E=>{E.preventDefault();let u=o.trim();if(!u)return;s(!0);let d=i.trim()&&p.trim()?{device:{device_id:i.trim(),name:i.trim(),protocol:"mqtt_web_socket",connector:{type:"mqtt_web_socket",topic:p.trim(),qos:1}}}:void 0;try{await t(u,d),e()}finally{s(!1)}},f=a?a.colors.primary:"#CE422B",b=a?a.colors.gradient:"linear-gradient(135deg, #CE422B 0%, #F97316 100%)";return(0,y.jsx)("div",{className:"modal-overlay",onClick:E=>{E.target===E.currentTarget&&e()},children:(0,y.jsxs)("div",{className:"modal-box",style:{maxWidth:"480px"},children:[(0,y.jsxs)("div",{className:"modal-header",children:[(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[(0,y.jsx)("div",{style:{width:"2rem",height:"2rem",borderRadius:"0.5rem",background:b,display:"flex",alignItems:"center",justifyContent:"center"},children:(0,y.jsx)(ar,{size:14,color:"#fff"})}),(0,y.jsxs)("h2",{className:"modal-title",children:["New Experiment",a?` \u2014 ${a.name}`:""]})]}),(0,y.jsx)("button",{className:"modal-close",onClick:e,children:(0,y.jsx)($t,{size:18})})]}),(0,y.jsx)("p",{style:{fontSize:"0.875rem",color:r.colors.text.secondary,marginBottom:"1.25rem"},children:a?`Create a new experiment in the ${a.fullName} node.`:"Create a new IoT experiment to start collecting data."}),(0,y.jsxs)("form",{onSubmit:L,children:[(0,y.jsxs)("div",{className:"modal-field",children:[(0,y.jsx)("label",{className:"modal-label",children:"Experiment Name"}),(0,y.jsx)("input",{ref:h,type:"text",className:"modal-input",placeholder:"e.g. Temperature Sensor Array #3",value:o,onChange:E=>n(E.target.value),disabled:l})]}),(0,y.jsxs)("div",{className:"modal-field",children:[(0,y.jsx)("label",{className:"modal-label",children:"Field DAQ Device ID (optional)"}),(0,y.jsx)("input",{className:"modal-input",type:"text",placeholder:"e.g. daq-field-01",value:i,onChange:E=>c(E.target.value),disabled:l})]}),(0,y.jsxs)("div",{className:"modal-field",children:[(0,y.jsx)("label",{className:"modal-label",children:"DAQ MQTT/WebSocket Topic (optional)"}),(0,y.jsx)("input",{className:"modal-input",type:"text",placeholder:"e.g. daq/daq-field-01/telemetry",value:p,onChange:E=>m(E.target.value),disabled:l})]}),(0,y.jsxs)("div",{className:"modal-actions",children:[(0,y.jsx)("button",{type:"button",className:"modal-btn-cancel",onClick:e,disabled:l,children:"Cancel"}),(0,y.jsx)("button",{type:"submit",disabled:l||!o.trim(),style:{padding:"0.5625rem 1.25rem",border:"none",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:600,color:"white",cursor:l||!o.trim()?"not-allowed":"pointer",background:l||!o.trim()?"#94a3b8":b,boxShadow:l||!o.trim()?"none":`0 2px 8px ${f}50`,transition:"all 0.2s"},children:l?"Creating\u2026":"Create Experiment"})]})]})]})})},fS=({activeEntityId:e,onSelect:t,collapsed:a,experimentsCount:r})=>{let[o,n]=(0,ne.useState)(!1),l=(0,ne.useRef)(null),s=Kt[e]||Kt.fi;return(0,ne.useEffect)(()=>{let i=c=>{l.current&&!l.current.contains(c.target)&&n(!1)};return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[]),(0,y.jsxs)("div",{ref:l,className:"entity-switcher-wrap",children:[(0,y.jsxs)("button",{className:`entity-switcher-btn ${o?"open":""}`,onClick:()=>n(i=>!i),title:a?s.fullName:void 0,children:[(0,y.jsx)("span",{className:"entity-dot",style:{background:s.colors.primary}}),!a&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"entity-switcher-info",children:[(0,y.jsx)("span",{className:"entity-switcher-name",children:s.name}),(0,y.jsxs)("span",{className:"entity-switcher-sub",children:[s.location," \xB7 ",r," exp"]})]}),(0,y.jsx)(Gn,{size:13,className:`entity-chevron ${o?"rotated":""}`})]})]}),o&&!a&&(0,y.jsx)("div",{className:"entity-dropdown",children:Object.values(Kt).map(i=>(0,y.jsxs)("button",{className:`entity-dropdown-item ${i.id===e?"active":""}`,onClick:()=>{t(i.id),n(!1)},children:[(0,y.jsx)("span",{className:"entity-dot",style:{background:i.colors.primary}}),(0,y.jsxs)("div",{className:"entity-dropdown-info",children:[(0,y.jsx)("span",{className:"entity-dropdown-name",children:i.fullName}),(0,y.jsx)("span",{className:"entity-dropdown-sub",children:i.location})]}),i.id===e&&(0,y.jsx)("span",{className:"entity-active-check",children:"\u2713"})]},i.id))})]})},pS=({collapsed:e,experiments:t})=>{let a=t.filter(o=>["ONLINE","ACTIVE","RUNNING","DONE"].includes(o.status.toUpperCase())).length,r=a;return e?(0,y.jsx)("div",{className:"sidebar-section live-status-collapsed",children:(0,y.jsx)("span",{className:"live-dot-icon",title:`${a} live sessions`})}):(0,y.jsxs)("div",{className:"sidebar-section",children:[(0,y.jsx)("span",{className:"nav-section-label",children:"Live Status"}),(0,y.jsxs)("div",{className:"live-status-items",children:[(0,y.jsxs)("div",{className:"live-status-item",children:[(0,y.jsx)("span",{className:"live-pulse-dot"}),(0,y.jsxs)("span",{className:"live-status-text",children:[a," Live sessions"]})]}),(0,y.jsxs)("div",{className:"live-status-item",children:[(0,y.jsx)(Ne,{size:12,className:"live-status-icon"}),(0,y.jsxs)("span",{className:"live-status-text",children:[r," devices online"]})]}),(0,y.jsxs)("div",{className:"live-status-item",children:[(0,y.jsx)(ir,{size:12,className:"live-status-icon"}),(0,y.jsx)("span",{className:"live-status-text",children:"TLS 1.3 secured"})]})]})]})},Nh=({icon:e,text:t,isActive:a=!1,onClick:r,badge:o,collapsed:n})=>(0,y.jsxs)("div",{className:`nav-item ${a?"active":""}`,onClick:r,title:n?t:void 0,"aria-current":a?"page":void 0,children:[(0,y.jsx)("div",{className:"nav-icon",children:e}),!n&&(0,y.jsx)("span",{className:"nav-text",children:t}),!n&&o!==void 0&&o>0&&(0,y.jsx)("span",{className:"nav-badge",children:o})]}),mS=({experiments:e,onCreateExperiment:t,onToggleStatus:a,onDeleteExperiment:r,onRefresh:o,onExperimentClick:n})=>{let{theme:l}=Ee(),[s,i]=(0,ne.useState)(null),[c,p]=(0,ne.useState)(null),[m,h]=(0,ne.useState)(""),[L,f]=(0,ne.useState)(!1),b=s?Kt[s]:null,E=e.filter(u=>u.name.toLowerCase().includes(m.toLowerCase()));return(0,ne.useEffect)(()=>{wc(b)},[s]),c&&b?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(Ic,{experiment:c,onBack:()=>p(null),onDelete:async()=>{await r(c.id),p(null)},onToggleStatus:()=>a(c.id),onRefresh:o,entityColors:b.colors}),L&&(0,y.jsx)(kc,{onClose:()=>f(!1),onCreate:t,entity:b})]}):b?(0,y.jsxs)("div",{className:"experiments-section",children:[(0,y.jsxs)("div",{style:{background:b.colors.gradient,borderRadius:"1.25rem",padding:"2rem",marginBottom:"1.75rem",position:"relative",overflow:"hidden"},children:[(0,y.jsx)("div",{style:{position:"absolute",top:"-2rem",right:"-2rem",width:"12rem",height:"12rem",background:"rgba(255,255,255,0.06)",borderRadius:"50%"}}),(0,y.jsx)("div",{style:{position:"absolute",bottom:"-3rem",right:"4rem",width:"8rem",height:"8rem",background:"rgba(255,255,255,0.04)",borderRadius:"50%"}}),(0,y.jsxs)("button",{onClick:()=>{i(null),h("")},style:{display:"inline-flex",alignItems:"center",gap:"0.375rem",padding:"0.375rem 0.875rem",borderRadius:"0.5rem",background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",fontSize:"0.8125rem",fontWeight:500,cursor:"pointer",marginBottom:"1.25rem"},children:[(0,y.jsx)(Br,{size:14})," All Entities"]}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"1rem",flexWrap:"wrap"},children:[(0,y.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.5rem"},children:[(0,y.jsx)("span",{style:{fontSize:"1.5rem"},children:b.icon}),(0,y.jsx)("h1",{style:{fontSize:"1.75rem",fontWeight:800,color:"#fff",margin:0,letterSpacing:"-0.025em"},children:b.fullName})]}),(0,y.jsx)("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"0.9375rem",margin:"0 0 1rem",lineHeight:1.6,maxWidth:"40rem"},children:b.description}),(0,y.jsx)("div",{style:{display:"flex",gap:"1.25rem",flexWrap:"wrap"},children:[{icon:(0,y.jsx)(sr,{size:13}),label:b.location},{icon:(0,y.jsx)(tr,{size:13}),label:`${b.devices} Devices`},{icon:(0,y.jsx)(dr,{size:13}),label:`${b.researchers} Researchers`}].map((u,d)=>(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"rgba(255,255,255,0.85)",fontSize:"0.8125rem"},children:[u.icon,u.label]},d))})]}),(0,y.jsx)("div",{style:{display:"flex",gap:"0.875rem",flexShrink:0},children:[{value:e.length,label:"Experiments"},{value:b.activeExperiments,label:"Active"}].map((u,d)=>(0,y.jsxs)("div",{style:{background:"rgba(255,255,255,0.12)",borderRadius:"0.875rem",padding:"0.875rem 1.25rem",textAlign:"center",border:"1px solid rgba(255,255,255,0.2)",backdropFilter:"blur(8px)",minWidth:"5rem"},children:[(0,y.jsx)("div",{style:{fontSize:"1.5rem",fontWeight:800,color:"#fff",lineHeight:1},children:u.value}),(0,y.jsx)("div",{style:{fontSize:"0.75rem",color:"rgba(255,255,255,0.75)",marginTop:"0.25rem",fontWeight:500},children:u.label})]},d))})]})]}),(0,y.jsxs)("div",{className:"section-header",children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("h1",{className:"section-title",children:"Experiments"}),(0,y.jsxs)("p",{className:"section-subtitle",children:[E.length," experiment",E.length!==1?"s":""," in ",b.name]})]}),(0,y.jsxs)("div",{className:"section-actions",children:[(0,y.jsxs)("div",{className:"search-container",children:[(0,y.jsx)(Do,{size:15,className:"search-icon"}),(0,y.jsx)("input",{type:"text",placeholder:"Search experiments\u2026",className:"search-input",value:m,onChange:u=>h(u.target.value)})]}),(0,y.jsxs)("button",{onClick:()=>f(!0),style:{display:"flex",alignItems:"center",gap:"0.375rem",padding:"0.5rem 1rem",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:600,cursor:"pointer",border:"none",color:"#fff",background:b.colors.gradient,boxShadow:`${b.colors.primary}40 0px 2px 8px`,transition:"0.2s"},children:[(0,y.jsx)(la,{size:15})," New Experiment"]})]})]}),(0,y.jsx)("div",{className:"experiment-grid",children:E.length>0?E.map(u=>(0,y.jsx)(bc,{experiment:u,onToggleStatus:()=>a(u.id),onDelete:()=>r(u.id),onRefresh:o,onClick:()=>n?n(u):p(u),entityColors:b.colors},u.id)):(0,y.jsxs)("div",{className:"empty-state",children:[(0,y.jsx)(ar,{size:44}),(0,y.jsx)("h3",{children:m?"No matches":"No Experiments Yet"}),(0,y.jsx)("p",{children:m?`No experiments match "${m}"`:`Start your first experiment in the ${b.name} node.`}),!m&&(0,y.jsxs)("button",{onClick:()=>f(!0),style:{display:"flex",alignItems:"center",gap:"0.375rem",padding:"0.5rem 1rem",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:600,cursor:"pointer",border:"none",color:"#fff",background:b.colors.gradient,boxShadow:`${b.colors.primary}40 0px 2px 8px`,transition:"0.2s"},children:[(0,y.jsx)(la,{size:15})," Create First Experiment"]})]})}),L&&(0,y.jsx)(kc,{onClose:()=>f(!1),onCreate:t,entity:b})]}):(0,y.jsxs)("div",{style:{animation:"fadeIn 0.2s ease"},children:[(0,y.jsxs)("div",{style:{marginBottom:"2rem"},children:[(0,y.jsx)("h1",{style:{fontSize:"1.375rem",fontWeight:800,color:"var(--color-text-primary)",margin:"0 0 0.375rem",letterSpacing:"-0.025em"},children:"Research Entities"}),(0,y.jsx)("p",{style:{fontSize:"0.9375rem",color:"var(--color-text-secondary)",margin:0},children:"Select a node to browse and manage its experiments"})]}),(0,y.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))",gap:"1.5rem",marginBottom:"2.5rem"},children:Object.values(Kt).map(u=>(0,y.jsxs)("div",{onClick:()=>i(u.id),style:{borderRadius:"1.25rem",overflow:"hidden",border:`1px solid ${u.colors.borderColor}`,boxShadow:"var(--shadow-md)",cursor:"pointer",transition:"transform 0.2s ease, box-shadow 0.25s ease",background:"var(--color-card)"},onMouseEnter:d=>{d.currentTarget.style.transform="translateY(-4px)",d.currentTarget.style.boxShadow=`0 16px 40px ${u.colors.primary}25`},onMouseLeave:d=>{d.currentTarget.style.transform="translateY(0)",d.currentTarget.style.boxShadow="var(--shadow-md)"},children:[(0,y.jsxs)("div",{style:{background:u.colors.gradient,padding:"1.75rem",position:"relative",overflow:"hidden"},children:[(0,y.jsx)("div",{style:{position:"absolute",top:"-1.5rem",right:"-1.5rem",width:"8rem",height:"8rem",background:"rgba(255,255,255,0.08)",borderRadius:"50%"}}),(0,y.jsx)("div",{style:{fontSize:"2.25rem",marginBottom:"0.625rem"},children:u.icon}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.25rem"},children:[(0,y.jsx)("h2",{style:{fontSize:"1.375rem",fontWeight:800,color:"#fff",margin:0,letterSpacing:"-0.025em"},children:u.fullName}),(0,y.jsx)("span",{style:{background:"rgba(255,255,255,0.2)",color:"#fff",borderRadius:"999px",padding:"0.15rem 0.625rem",fontSize:"0.6875rem",fontWeight:700,letterSpacing:"0.06em"},children:u.name})]}),(0,y.jsx)("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"0.875rem",margin:0},children:u.tagline})]}),(0,y.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",borderBottom:`1px solid ${u.colors.borderColor}`},children:[{value:e.length,label:"Experiments"},{value:u.devices,label:"Devices"},{value:u.researchers,label:"Researchers"}].map((d,g)=>(0,y.jsxs)("div",{style:{padding:"1.125rem 0.75rem",textAlign:"center",borderRight:g<2?`1px solid ${u.colors.borderColor}`:"none"},children:[(0,y.jsx)("div",{style:{fontSize:"1.375rem",fontWeight:800,color:u.colors.primary,letterSpacing:"-0.02em"},children:d.value}),(0,y.jsx)("div",{style:{fontSize:"0.75rem",color:"var(--color-text-tertiary)",marginTop:"0.2rem",fontWeight:500},children:d.label})]},g))}),(0,y.jsxs)("div",{style:{padding:"1.375rem"},children:[(0,y.jsx)("p",{style:{fontSize:"0.875rem",color:"var(--color-text-secondary)",lineHeight:1.65,margin:"0 0 1.25rem"},children:u.description}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem"},children:[(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem",fontSize:"0.8125rem",color:"var(--color-text-tertiary)"},children:[(0,y.jsx)(sr,{size:13})," ",u.location]}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.375rem",padding:"0.5rem 1.125rem",borderRadius:"0.5rem",background:u.colors.gradient,color:"#fff",fontSize:"0.875rem",fontWeight:600,boxShadow:`0 2px 10px ${u.colors.primary}35`},children:["View Experiments ",(0,y.jsx)(Ja,{size:14})]})]})]})]},u.id))}),(0,y.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:"1rem"},children:[{icon:(0,y.jsx)(rr,{size:18}),label:"Total Entities",value:"2"},{icon:(0,y.jsx)(tr,{size:18}),label:"Total Devices",value:String(Object.values(Kt).reduce((u,d)=>u+d.devices,0))},{icon:(0,y.jsx)(ar,{size:18}),label:"All Experiments",value:String(e.length)},{icon:(0,y.jsx)(ot,{size:18}),label:"Live Sessions",value:String(Object.values(Kt).reduce((u,d)=>u+d.activeExperiments,0))},{icon:(0,y.jsx)(oa,{size:18}),label:"Security",value:"TLS 1.3"}].map((u,d)=>(0,y.jsxs)("div",{style:{background:"var(--color-card)",borderRadius:"0.875rem",border:"1px solid var(--color-border-primary)",padding:"1rem 1.125rem",display:"flex",alignItems:"center",gap:"0.75rem",boxShadow:"var(--shadow-sm)"},children:[(0,y.jsx)("div",{style:{width:"2.25rem",height:"2.25rem",borderRadius:"0.5rem",background:"var(--entity-accent-muted, var(--macos-accent-blue-light))",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--entity-accent, var(--macos-accent-blue))",flexShrink:0},children:u.icon}),(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontSize:"0.6875rem",color:"var(--color-text-tertiary)",fontWeight:500,marginBottom:"0.2rem"},children:u.label}),(0,y.jsx)("div",{style:{fontSize:"1rem",fontWeight:700,color:"var(--color-text-primary)"},children:u.value})]})]},d))})]})},gS=({experiments:e,onCreateExperiment:t,onToggleStatus:a,onDeleteExperiment:r,onRefresh:o})=>{let{mode:n}=Ee(),[l,s]=(0,ne.useState)(()=>{try{return localStorage.getItem(bt.SIDEBAR_STATE)!=="true"}catch{return!0}}),[i,c]=(0,ne.useState)("entities"),[p,m]=(0,ne.useState)(""),[h,L]=(0,ne.useState)(null),[f,b]=(0,ne.useState)(!1),[E,u]=(0,ne.useState)(!1),[d,g]=(0,ne.useState)(!1),[S,T]=(0,ne.useState)(()=>{try{let V=localStorage.getItem(bt.ACTIVE_ENTITY);if(V)return JSON.parse(V).entity||"fi"}catch{}return"fi"});(0,ne.useEffect)(()=>{cS()},[]),(0,ne.useEffect)(()=>{let V=()=>g(window.innerWidth<=768);return V(),window.addEventListener("resize",V),()=>window.removeEventListener("resize",V)},[]),(0,ne.useEffect)(()=>{try{let V=localStorage.getItem(bt.ACTIVE_ENTITY);if(V){let{entity:Je}=JSON.parse(V),Pe=Kt[Je];Pe&&wc(Pe)}}catch{}},[]),(0,ne.useEffect)(()=>{localStorage.setItem(bt.SIDEBAR_STATE,String(!l))},[l]);let k=(()=>{try{return JSON.parse(localStorage.getItem(bt.USER_PROFILE)||"{}")}catch{return{}}})(),w=(()=>{try{return localStorage.getItem(bt.SESSION)||"Admin"}catch{return"Admin"}})(),F=k.fullName||w,A=k.role||"Researcher",C=k.avatarUrl||"",N=F.split(" ").map(V=>V[0]).join("").toUpperCase().slice(0,2)||F.charAt(0).toUpperCase(),W=Kt[S]?.name||"FI",le=V=>{T(V),wc(Kt[V])},re=V=>{c(V),L(null),document.title=`${V.charAt(0).toUpperCase()+V.slice(1).replace("-"," ")} \u2014 Blazecore`,d&&s(!1)},se=V=>{L(V),d&&s(!1)},nt=()=>s(V=>!V),z=e.filter(V=>V.name.toLowerCase().includes(p.toLowerCase())),K=[{id:"entities",icon:(0,y.jsx)(jn,{size:20}),label:"Entities",badge:Object.keys(Kt).length},{id:"experiments",icon:(0,y.jsx)(tl,{size:20}),label:"Experiments"},{id:"api-testing",icon:(0,y.jsx)(ur,{size:20}),label:"API Testing"},{id:"resources",icon:(0,y.jsx)(Vn,{size:20}),label:"Resources"},{id:"reports",icon:(0,y.jsx)(Ya,{size:20}),label:"Reports"}],mt=[{id:"settings",icon:(0,y.jsx)(qr,{size:20}),label:"Settings"},{id:"help",icon:(0,y.jsx)(jt,{size:20}),label:"Help"}],be=l===!1&&!d,Ye=["sidebar","dashboard-desktop-sidebar",!l&&d?"collapsed":"",!l&&!d?"icon-only":""].filter(Boolean).join(" "),ye=()=>{switch(i){case"entities":return(0,y.jsx)(mS,{experiments:e,onCreateExperiment:t,onToggleStatus:a,onDeleteExperiment:r,onRefresh:o,onExperimentClick:se});case"experiments":return(0,y.jsx)("div",{className:"experiments-section",children:h?(0,y.jsx)(Ic,{experiment:h,onBack:()=>L(null),onDelete:async()=>{await r(h.id),L(null)},onToggleStatus:()=>a(h.id),onRefresh:o}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"section-header",children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("h1",{className:"section-title",children:"All Experiments"}),(0,y.jsxs)("p",{className:"section-subtitle",children:[e.length," experiment",e.length!==1?"s":""," across all entities"]})]}),(0,y.jsxs)("div",{className:"section-actions",children:[(0,y.jsxs)("div",{className:"search-container",children:[(0,y.jsx)(Do,{size:15,className:"search-icon"}),(0,y.jsx)("input",{type:"text",placeholder:"Search\u2026",className:"search-input",value:p,onChange:Pe=>m(Pe.target.value)})]}),(0,y.jsxs)("button",{className:"action-button primary",onClick:()=>b(!0),children:[(0,y.jsx)(la,{size:15}),(0,y.jsx)("span",{children:"New Experiment"})]})]})]}),(0,y.jsx)("div",{className:"experiment-grid",children:z.length>0?z.map(Pe=>(0,y.jsx)(bc,{experiment:Pe,onToggleStatus:()=>a(Pe.id),onDelete:()=>r(Pe.id),onRefresh:o,onClick:()=>se(Pe)},Pe.id)):(0,y.jsxs)("div",{className:"empty-state",children:[(0,y.jsx)(St,{size:44}),(0,y.jsx)("h3",{children:p?"No matches":"No Experiments"}),(0,y.jsx)("p",{children:p?`No experiments match "${p}"`:"Create your first IoT experiment to get started."}),!p&&(0,y.jsxs)("button",{className:"action-button primary",onClick:()=>b(!0),children:[(0,y.jsx)(la,{size:15}),(0,y.jsx)("span",{children:"Create Experiment"})]})]})})]})});case"api-testing":return(0,y.jsx)(wh,{});default:let Je={resources:{title:"Resources",subtitle:"Manage assets and storage across your IoT network."},reports:{title:"Reports & Analytics",subtitle:"View performance reports and generate insights."},settings:{title:"System Settings",subtitle:"Configure your Blazecore platform."},help:{title:"Help & Support",subtitle:"Documentation, guides, and community resources."}}[i]||{title:i,subtitle:""};return(0,y.jsxs)("div",{className:"content-card",children:[(0,y.jsx)("h1",{className:"card-title",style:{fontSize:"22px",fontWeight:700,color:"var(--text-primary)",marginBottom:"4px"},children:Je.title}),(0,y.jsx)("p",{className:"card-text",children:Je.subtitle}),(0,y.jsxs)("div",{className:"content-placeholder",children:[(0,y.jsx)(ar,{size:32,style:{color:"var(--color-text-tertiary)",opacity:.5,marginBottom:"0.75rem"}}),(0,y.jsx)("p",{className:"placeholder-text",children:"Coming soon \u2014 this section is under active development."})]})]})}};return(0,y.jsxs)(y.Fragment,{children:[l&&d&&(0,y.jsx)("div",{style:{position:"fixed",inset:0,zIndex:45,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(2px)"},onClick:()=>s(!1)}),!l&&d&&(0,y.jsx)("button",{onClick:nt,style:{position:"fixed",top:"1rem",left:"1rem",zIndex:60,width:"40px",height:"40px",borderRadius:"10px",background:"var(--color-card)",border:"1px solid var(--color-border-primary)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"var(--shadow-md)",color:"var(--color-text-secondary)"},"aria-label":"Open navigation",children:(0,y.jsx)(Or,{size:18})}),(0,y.jsxs)("div",{className:"dashboard-container",children:[(0,y.jsxs)("aside",{className:Ye,children:[(0,y.jsxs)("div",{className:"sidebar-brand-header",children:[(0,y.jsx)("div",{className:"sidebar-brand-logo",onClick:()=>window.location.href="/",title:"Blazecore",children:(0,y.jsx)(Ne,{size:14,color:"#fff"})}),!be&&(0,y.jsxs)("div",{className:"sidebar-brand-info",children:[(0,y.jsx)("span",{className:"sidebar-brand-name",children:"Blazecore"}),(0,y.jsx)("span",{className:"sidebar-brand-tagline",children:"IoT Platform"})]}),(0,y.jsx)("button",{className:"sidebar-collapse-btn",onClick:nt,title:l?"Collapse sidebar":"Expand sidebar","aria-label":l?"Collapse sidebar":"Expand sidebar",children:be?(0,y.jsx)(Ja,{size:14}):(0,y.jsx)($n,{size:14})})]}),(0,y.jsxs)("div",{className:"sidebar-section",children:[!be&&(0,y.jsx)("span",{className:"nav-section-label",children:"Workspace"}),(0,y.jsx)(fS,{activeEntityId:S,onSelect:le,collapsed:be,experimentsCount:e.length})]}),(0,y.jsxs)("div",{className:"sidebar-section sidebar-nav-section",children:[!be&&(0,y.jsx)("span",{className:"nav-section-label",children:"Navigation"}),(0,y.jsx)("nav",{className:"nav-container",children:K.map(V=>(0,y.jsx)(Nh,{icon:V.icon,text:V.label,isActive:i===V.id,onClick:()=>re(V.id),badge:V.badge,collapsed:be},V.id))})]}),(0,y.jsxs)("div",{className:"sidebar-section",children:[!be&&(0,y.jsx)("span",{className:"nav-section-label",children:"System"}),(0,y.jsx)("nav",{className:"nav-container nav-container-system",children:mt.map(V=>(0,y.jsx)(Nh,{icon:V.icon,text:V.label,isActive:i===V.id,onClick:()=>re(V.id),collapsed:be},V.id))})]}),(0,y.jsx)(pS,{collapsed:be,experiments:e}),(0,y.jsxs)("div",{id:"sidebar-profile",className:"sidebar-profile",onClick:()=>u(!0),role:"button",tabIndex:0,"aria-label":"Open account settings",title:be?`${F} \xB7 ${A}`:void 0,onKeyDown:V=>{(V.key==="Enter"||V.key===" ")&&u(!0)},children:[(0,y.jsx)("div",{className:"sidebar-profile-avatar",children:C?(0,y.jsx)("img",{src:C,alt:"avatar",style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}):N}),!be&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"sidebar-profile-info",children:[(0,y.jsx)("span",{className:"sidebar-profile-name",children:F}),(0,y.jsx)("span",{className:"sidebar-profile-role",children:A})]}),(0,y.jsx)("div",{className:"sidebar-profile-badge",children:W})]})]})]}),(0,y.jsx)("main",{className:`main-content ${!l&&d?"sidebar-collapsed":""} ${!l&&!d?"sidebar-icon-only":""}`,children:(0,y.jsx)("div",{className:"main-content-inner",children:ye()})})]}),f&&(0,y.jsx)(kc,{onClose:()=>b(!1),onCreate:t}),(0,y.jsx)(zh,{isOpen:E,onClose:()=>u(!1),currentEntity:W}),(0,y.jsx)("style",{children:`
        @media (max-width: 767px) {
          .dashboard-desktop-sidebar { position: fixed !important; z-index: 50 !important; }
        }
        .sidebar-profile:focus-visible {
          outline: 2px solid var(--entity-accent, #0071E3);
          outline-offset: 2px;
        }
      `})]})},Oh=gS;async function Uh(e,t){let a={name:e,status:"PENDING",field_daq:t};return Sh(new ia().create,a,201)}async function _h(e){return Ch(new ia().deleteUrl(e),200)}async function Hh(e,t,a){let r={id:a,name:e,status:t};return Ih(new ia().update,r,200)}var Pa=q(Re());var H=q(X()),xS=["section-hero","section-stats","section-research-tools","section-about","section-contact"],yS=["landing","about","contact"],vS=({onNavigate:e,currentPage:t,isAuthenticated:a,onLogout:r})=>{let{mode:o,toggleTheme:n}=Ee(),[l,s]=Pa.default.useState(!1),[i,c]=Pa.default.useState(!1),[p,m]=Pa.default.useState("section-hero"),h=(0,Pa.useRef)(null),L=yS.includes(t);Pa.default.useEffect(()=>{let A=()=>c(window.scrollY>16);return window.addEventListener("scroll",A,{passive:!0}),()=>window.removeEventListener("scroll",A)},[]),(0,Pa.useEffect)(()=>{if(!L){m("section-hero");return}h.current&&h.current.disconnect(),h.current=new IntersectionObserver(N=>{N.forEach(W=>{W.isIntersecting&&m(W.target.id)})},{threshold:.4,rootMargin:"-64px 0px 0px 0px"});let C=setTimeout(()=>{xS.forEach(N=>{let W=document.getElementById(N);W&&h.current?.observe(W)})},120);return()=>{clearTimeout(C),h.current?.disconnect()}},[L,t]);let f=(A,C)=>{if(C)if(L){let N=document.getElementById(C);N&&N.scrollIntoView({behavior:"smooth",block:"start"})}else e("landing",C);else e(A);s(!1)},b=A=>L?p===A:!1,E=o==="light"?"#0071E3":"#2997FF",u=o==="light"?"#1D1D1F":"#F5F5F7",d=o==="light"?"#86868B":"#98989D",g=o==="light"?"rgba(255,255,255,0.82)":"rgba(28,28,30,0.82)",S=o==="light"?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.08)",T=o==="light"?"rgba(0,113,227,0.08)":"rgba(41,151,255,0.12)",k=o==="light"?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",w={display:"inline-flex",alignItems:"center",gap:"0.375rem",padding:"0.4375rem 0.875rem",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:500,cursor:"pointer",border:"none",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',letterSpacing:"0.01em",textDecoration:"none",transition:"all 0.18s ease"},F=[{sectionId:"section-hero",icon:(0,H.jsx)(or,{size:13}),label:"Home"},{sectionId:"section-about",icon:(0,H.jsx)(el,{size:13}),label:"About"},{sectionId:"section-contact",icon:(0,H.jsx)(Ur,{size:13}),label:"Contact"}];return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)("style",{children:`
        .nav-desktop { display: none; }
        .nav-hamburger { display: flex; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex; align-items: center; gap: 0.125rem; }
          .nav-hamburger { display: none; }
        }
        .mobile-nav-menu { display: none; }
        .mobile-nav-menu.open { display: flex; }
        .nav-link-btn {
          background: transparent; color: ${d};
          cursor: pointer;
        }
        .nav-link-btn:hover { background: ${k} !important; color: ${u} !important; }
        .nav-link-btn:active { transform: scale(0.97) !important; }
        .nav-link-btn:focus-visible { outline: 2px solid ${E}; outline-offset: 2px; }
        .nav-link-active { background: var(--entity-accent-muted, ${T}) !important; color: var(--entity-accent, ${E}) !important; }
        .theme-toggle-btn:hover { border-color: ${E} !important; color: ${E} !important; }
        .signup-btn:hover { transform: translateY(-1px) !important; box-shadow: 0 6px 20px rgba(0,113,227,0.35) !important; }
        .signup-btn:active { transform: scale(0.97) !important; }
        html { scroll-padding-top: var(--nav-height, 4rem); }
      `}),(0,H.jsx)("nav",{id:"nav-primary",style:{position:"fixed",top:0,left:0,right:0,zIndex:100,background:i?g:"transparent",backdropFilter:i?"blur(20px) saturate(1.8)":"none",WebkitBackdropFilter:i?"blur(20px) saturate(1.8)":"none",borderBottom:i?`1px solid ${S}`:"1px solid transparent",boxShadow:i?o==="light"?"0 1px 3px rgba(0,0,0,0.06)":"0 1px 3px rgba(0,0,0,0.3)":"none",transition:"background 0.25s ease, backdrop-filter 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"},children:(0,H.jsxs)("div",{style:{maxWidth:"82rem",margin:"0 auto",padding:"0 1.5rem"},children:[(0,H.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"4rem"},children:[(0,H.jsxs)("button",{onClick:()=>f("landing","section-hero"),style:{display:"flex",alignItems:"center",gap:"0.625rem",cursor:"pointer",border:"none",background:"none",padding:0},onMouseDown:A=>{A.currentTarget.style.transform="scale(0.97)"},onMouseUp:A=>{A.currentTarget.style.transform="scale(1)"},children:[(0,H.jsx)("div",{style:{width:"2rem",height:"2rem",borderRadius:"0.5rem",background:E,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 2px 8px ${E}40`},children:(0,H.jsx)(Ne,{size:13,color:"#FFFFFF"})}),(0,H.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",lineHeight:1.1},children:[(0,H.jsx)("span",{style:{fontSize:"1rem",fontWeight:600,color:u,letterSpacing:"-0.02em"},children:"Blazecore"}),(0,H.jsx)("span",{style:{fontSize:"0.6rem",fontWeight:600,letterSpacing:"0.10em",color:d,textTransform:"uppercase",marginTop:"-1px"},children:"IoT Platform"})]})]}),(0,H.jsxs)("div",{className:"nav-desktop",children:[F.map(({sectionId:A,icon:C,label:N})=>(0,H.jsxs)("button",{"data-target":A,className:`nav-link-btn ${b(A)?"nav-link-active":""}`,onClick:()=>f("landing",A),style:w,children:[C,(0,H.jsx)("span",{children:N})]},A)),a?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)("button",{"data-target":"dashboard",className:`nav-link-btn ${t==="dashboard"?"nav-link-active":""}`,onClick:()=>f("dashboard"),style:w,children:[(0,H.jsx)(Vt,{size:13}),(0,H.jsx)("span",{children:"Dashboard"})]}),(0,H.jsx)("div",{style:{width:1,height:"1.125rem",background:S,margin:"0 0.375rem"}}),(0,H.jsxs)("button",{className:"nav-link-btn",onClick:()=>{r(),s(!1)},style:w,children:[(0,H.jsx)(Ao,{size:13}),(0,H.jsx)("span",{children:"Logout"})]})]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)("div",{style:{width:1,height:"1.125rem",background:S,margin:"0 0.375rem"}}),(0,H.jsxs)("button",{className:`nav-link-btn ${t==="login"?"nav-link-active":""}`,onClick:()=>f("login"),style:w,children:[(0,H.jsx)(Fo,{size:13}),(0,H.jsx)("span",{children:"Login"})]}),(0,H.jsxs)("button",{className:"signup-btn",onClick:()=>f("signup"),style:{display:"inline-flex",alignItems:"center",gap:"0.375rem",padding:"0.4375rem 1rem",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:600,cursor:"pointer",background:E,border:"none",color:"#FFFFFF",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',boxShadow:`0 2px 8px ${E}35`,transition:"background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",marginLeft:"0.25rem"},children:[(0,H.jsx)(Bo,{size:13}),(0,H.jsx)("span",{children:"Sign Up"})]})]})]}),(0,H.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[(0,H.jsx)("button",{className:"theme-toggle-btn",onClick:n,"aria-label":"Toggle theme",style:{width:"2rem",height:"2rem",borderRadius:"0.5rem",background:o==="light"?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",border:`1px solid ${S}`,color:d,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"border-color 0.15s ease, color 0.15s ease"},onMouseDown:A=>{A.currentTarget.style.transform="scale(0.95)"},onMouseUp:A=>{A.currentTarget.style.transform="scale(1)"},children:o==="light"?(0,H.jsx)(_r,{size:14}):(0,H.jsx)(Wr,{size:14})}),(0,H.jsx)("button",{onClick:()=>s(!l),className:"nav-hamburger","aria-label":"Toggle mobile menu","aria-expanded":l,style:{width:"2rem",height:"2rem",borderRadius:"0.5rem",background:o==="light"?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.06)",border:`1px solid ${S}`,color:d,cursor:"pointer",alignItems:"center",justifyContent:"center",transition:"all 0.15s"},onMouseDown:A=>{A.currentTarget.style.transform="scale(0.95)"},onMouseUp:A=>{A.currentTarget.style.transform="scale(1)"},children:l?(0,H.jsx)($t,{size:15}):(0,H.jsx)(Or,{size:15})})]})]}),(0,H.jsxs)("div",{className:`mobile-nav-menu${l?" open":""}`,style:{borderTop:`1px solid ${S}`,paddingTop:"0.75rem",paddingBottom:"1rem",flexDirection:"column",gap:"0.25rem",background:o==="light"?"rgba(255,255,255,0.95)":"rgba(28,28,30,0.95)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"},children:[F.map(({sectionId:A,icon:C,label:N})=>(0,H.jsxs)("button",{"data-target":A,onClick:()=>f("landing",A),className:`nav-link-btn ${b(A)?"nav-link-active":""}`,style:{...w,justifyContent:"flex-start",width:"100%"},children:[C,(0,H.jsx)("span",{children:N})]},A)),a?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)("button",{onClick:()=>f("dashboard"),className:`nav-link-btn ${t==="dashboard"?"nav-link-active":""}`,style:{...w,justifyContent:"flex-start",width:"100%"},children:[(0,H.jsx)(Vt,{size:15}),(0,H.jsx)("span",{children:"Dashboard"})]}),(0,H.jsxs)("button",{onClick:()=>{r(),s(!1)},className:"nav-link-btn",style:{...w,justifyContent:"flex-start",width:"100%"},children:[(0,H.jsx)(Ao,{size:15}),(0,H.jsx)("span",{children:"Logout"})]})]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)("button",{onClick:()=>f("login"),className:`nav-link-btn ${t==="login"?"nav-link-active":""}`,style:{...w,justifyContent:"flex-start",width:"100%"},children:[(0,H.jsx)(Fo,{size:15}),(0,H.jsx)("span",{children:"Login"})]}),(0,H.jsxs)("button",{onClick:()=>f("signup"),style:{display:"flex",alignItems:"center",gap:"0.375rem",padding:"0.625rem 1rem",borderRadius:"0.5rem",fontSize:"0.875rem",fontWeight:600,cursor:"pointer",background:E,border:"none",color:"#FFFFFF",width:"100%",marginTop:"0.25rem"},children:[(0,H.jsx)(Bo,{size:15}),(0,H.jsx)("span",{children:"Sign Up"})]})]})]})]})})]})},qh=vS;var ie=q(Re());var v=q(X()),LS=26,Wh=120,Vh=Wh*Wh,SS=({isDark:e})=>{let t=(0,ie.useRef)(null);return(0,ie.useEffect)(()=>{let a=t.current;if(!a)return;let r=a.getContext("2d",{alpha:!0});if(!r)return;let o,n=!0,l=[],s=()=>{a.width=a.offsetWidth,a.height=a.offsetHeight},i=()=>{l=Array.from({length:LS},()=>({x:Math.random()*a.width,y:Math.random()*a.height,vx:(Math.random()-.5)*.32,vy:(Math.random()-.5)*.32,r:Math.random()*1.6+.7}))},c=e?"rgba(41,151,255,0.42)":"rgba(0,113,227,0.32)",p=e?"41,151,255":"0,113,227",m=()=>{if(!n){o=requestAnimationFrame(m);return}r.clearRect(0,0,a.width,a.height);let f=l.length;for(let b=0;b<f;b++){let E=l[b];E.x+=E.vx,E.y+=E.vy,(E.x<0||E.x>a.width)&&(E.vx*=-1),(E.y<0||E.y>a.height)&&(E.vy*=-1),r.beginPath(),r.arc(E.x,E.y,E.r,0,Math.PI*2),r.fillStyle=c,r.fill();for(let u=b+1;u<f;u++){let d=l[u].x-E.x,g=l[u].y-E.y,S=d*d+g*g;if(S<Vh){let T=.09*(1-S/Vh);r.beginPath(),r.moveTo(E.x,E.y),r.lineTo(l[u].x,l[u].y),r.strokeStyle=`rgba(${p},${T.toFixed(3)})`,r.lineWidth=.7,r.stroke()}}}o=requestAnimationFrame(m)},h=new IntersectionObserver(([f])=>{n=f.isIntersecting});h.observe(a),s(),i(),m();let L=new ResizeObserver(()=>{s(),i()});return L.observe(a),()=>{cancelAnimationFrame(o),L.disconnect(),h.disconnect()}},[e]),(0,v.jsx)("canvas",{ref:t,style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",willChange:"auto"}})},bS=({value:e,color:t})=>{let a=(0,ie.useRef)(null),[r,o]=(0,ie.useState)("0"),[n,l]=(0,ie.useState)(0),s=parseFloat(e.replace(/[^0-9.]/g,""))||0,i=e.replace(/[0-9.]/g,""),c=(0,ie.useCallback)(()=>{let p=performance.now(),m=1100;l(L=>L+1);let h=L=>{let f=Math.min((L-p)/m,1),b=1-Math.pow(1-f,3);s>10?o(Math.round(b*s).toString()):o((b*s).toFixed(s%1?1:0)),f<1&&requestAnimationFrame(h)};requestAnimationFrame(h)},[s]);return(0,ie.useEffect)(()=>{let p=a.current;if(!p)return;let m=new IntersectionObserver(([h])=>{h.isIntersecting&&(c(),m.disconnect())},{threshold:.4});return m.observe(p),()=>m.disconnect()},[c]),(0,v.jsx)("div",{ref:a,className:"animate-count",style:{fontSize:"2rem",fontWeight:700,letterSpacing:"-0.03em",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',color:t},children:s>0?r+i:e},n)},Pc=({children:e,color:t,style:a,className:r,onMouseEnter:o,onMouseLeave:n})=>{let[l,s]=(0,ie.useState)(0),[i,c]=(0,ie.useState)(!1),p=(0,ie.useRef)(null),m=(0,ie.useRef)(!1),h=(0,ie.useCallback)(()=>{c(!1),requestAnimationFrame(()=>{c(!0),s(L=>L+1)})},[]);return(0,ie.useEffect)(()=>{let L=p.current;if(!L)return;let f=new IntersectionObserver(([b])=>{b.isIntersecting&&!m.current&&(m.current=!0,setTimeout(()=>h(),120))},{threshold:.18});return f.observe(L),()=>f.disconnect()},[h]),(0,v.jsxs)("div",{ref:p,className:r,style:{position:"relative",overflow:"hidden",borderRadius:"1rem",...a},onMouseEnter:()=>{h(),c(!0),o?.()},onMouseLeave:()=>{n?.()},children:[i&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("span",{className:"trace-top",style:{background:t}},`t-${l}`),(0,v.jsx)("span",{className:"trace-right",style:{background:t}},`r-${l}`),(0,v.jsx)("span",{className:"trace-bottom",style:{background:t}},`b-${l}`),(0,v.jsx)("span",{className:"trace-left",style:{background:t}},`l-${l}`)]}),e]})};function Go(e=.12){let t=(0,ie.useRef)(null),[a,r]=(0,ie.useState)(!1);return(0,ie.useEffect)(()=>{let o=t.current;if(!o)return;let n=new IntersectionObserver(([l])=>{l.isIntersecting&&(r(!0),n.disconnect())},{threshold:e});return n.observe(o),()=>n.disconnect()},[]),{ref:t,visible:a}}var CS=({p:e})=>{let[t,a]=(0,ie.useState)({name:"",email:"",message:""}),[r,o]=(0,ie.useState)(!1),[n,l]=(0,ie.useState)(!1),[s,i]=(0,ie.useState)(""),c=async m=>{m.preventDefault(),o(!0),i("");try{await new Promise(h=>setTimeout(h,1200)),l(!0),a({name:"",email:"",message:""}),setTimeout(()=>l(!1),4e3)}catch{i("Failed to send. Please try again.")}finally{o(!1)}},p={width:"100%",padding:"0.75rem 1rem",borderRadius:"0.625rem",border:`1.5px solid ${e.glassBorder}`,background:e.isDark?"rgba(44,44,46,0.8)":"rgba(245,245,247,0.8)",color:e.fg,fontSize:"0.9375rem",outline:"none",transition:"border-color 0.2s",boxSizing:"border-box",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'};return(0,v.jsxs)("form",{onSubmit:c,style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[s&&(0,v.jsxs)("div",{style:{padding:"0.75rem 1rem",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:"0.625rem",display:"flex",alignItems:"center",gap:"0.625rem"},children:[(0,v.jsx)(At,{size:14,color:"#EF4444"}),(0,v.jsx)("span",{style:{fontSize:"0.875rem",color:"#EF4444"},children:s})]}),n&&(0,v.jsxs)("div",{style:{padding:"0.75rem 1rem",background:"rgba(52,199,89,0.08)",border:"1px solid rgba(52,199,89,0.25)",borderRadius:"0.625rem",display:"flex",alignItems:"center",gap:"0.625rem"},children:[(0,v.jsx)(He,{size:14,color:"#34C759"}),(0,v.jsx)("span",{style:{fontSize:"0.875rem",color:"#1D8348"},children:"\u2713 Message sent \u2014 we'll respond within 24h."})]}),(0,v.jsx)("input",{type:"text",placeholder:"Your name",required:!0,value:t.name,onChange:m=>a({...t,name:m.target.value}),disabled:r,style:p}),(0,v.jsx)("input",{type:"email",placeholder:"your@email.com",required:!0,value:t.email,onChange:m=>a({...t,email:m.target.value}),disabled:r,style:p,autoComplete:"email"}),(0,v.jsx)("textarea",{placeholder:"Your message\u2026",required:!0,value:t.message,onChange:m=>a({...t,message:m.target.value}),disabled:r,rows:4,style:{...p,resize:"vertical",lineHeight:1.6}}),(0,v.jsx)("button",{type:"submit",disabled:r,style:{width:"100%",padding:"0.8125rem 1.5rem",background:r?e.isDark?"#3A3A3C":"#E5E5EA":e.accent,color:r?e.fg2:"#fff",border:"none",borderRadius:"0.625rem",fontSize:"0.9375rem",fontWeight:600,cursor:r?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",boxShadow:r?"none":`0 4px 14px ${e.accent}40`,transition:"all 0.2s"},onMouseEnter:m=>{r||(m.currentTarget.style.transform="translateY(-1px)",m.currentTarget.style.opacity="0.9")},onMouseLeave:m=>{m.currentTarget.style.transform="",m.currentTarget.style.opacity="1"},onMouseDown:m=>{r||(m.currentTarget.style.transform="scale(0.97)")},onMouseUp:m=>{m.currentTarget.style.transform=""},children:r?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{style:{width:"1rem",height:"1rem",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}),"Sending..."]}):(0,v.jsxs)(v.Fragment,{children:["Send Message ",(0,v.jsx)(ll,{size:16})]})})]})},IS=({onNavigate:e,scrollToSection:t,onScrollComplete:a})=>{let{mode:r}=Ee(),[o,n]=(0,ie.useState)(0),l="IoT Experiment Platform";(0,ie.useEffect)(()=>{if(o<l.length){let C=setTimeout(()=>n(N=>N+1),52);return()=>clearTimeout(C)}},[o]),(0,ie.useEffect)(()=>{if(t){let C=(N=0)=>{let W=document.getElementById(t);W?setTimeout(()=>{W.scrollIntoView({behavior:"smooth",block:"start"}),a?.()},80):N<8&&setTimeout(()=>C(N+1),100)};C()}},[t]);let s=Go(),i=Go(),c=Go(),p=Go(),m=Go(),h=Go(),L=r==="dark",f={isDark:L,accent:L?"#2997FF":"#0071E3",accentB:L?"#5AC8FA":"#2997FF",accentGreen:L?"#30D158":"#34C759",fg:L?"#F5F5F7":"#1D1D1F",fg2:L?"#98989D":"#86868B",fg3:L?"#636366":"#A1A1A6",bg:L?"#000000":"#F5F5F7",bg4:L?"#3A3A3C":"#86868B",border:L?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",glass:L?"rgba(28,28,30,0.72)":"rgba(255,255,255,0.72)",glassBorder:L?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",glassShadow:L?"0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)":"0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)",cardBg:L?"#1C1C1E":"#FFFFFF",shadow:L?"0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)":"0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)"},b=(C,N,W=!1)=>({"--r":`${C}deg`,transform:`rotate(${C}deg)`,animation:`${W?"floatAlt":"float"} ${W?6.5:5}s ease-in-out infinite`,animationDelay:N,background:f.glass,backdropFilter:"blur(20px) saturate(1.6)",WebkitBackdropFilter:"blur(20px) saturate(1.6)",border:`1px solid ${f.glassBorder}`,boxShadow:f.glassShadow,padding:"1.25rem",position:"relative",overflow:"hidden"}),E=(0,v.jsx)("div",{style:{position:"absolute",inset:0,pointerEvents:"none",borderRadius:"inherit",background:"linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 55%, transparent 100%)"}}),u=(0,v.jsx)("div",{style:{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg, transparent, ${f.accent}, transparent)`,borderRadius:"inherit"}}),d=C=>(0,v.jsxs)("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.3125rem 0.875rem",borderRadius:"9999px",background:`${f.accent}12`,border:`1px solid ${f.accent}30`,fontSize:"0.73rem",fontWeight:600,color:f.accent,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:"1.25rem"},children:[(0,v.jsx)("span",{style:{width:5,height:5,borderRadius:"50%",background:f.accent,animation:"pulse 2s ease-in-out infinite",display:"inline-block"}}),C]}),g=(C,N,W,le)=>(0,v.jsxs)("button",{onClick:()=>e(N,le),style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.5rem",borderRadius:"0.5625rem",fontSize:"0.9375rem",fontWeight:600,cursor:"pointer",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',letterSpacing:"-0.01em",transition:"all 0.22s ease",...W?{background:f.accent,border:"none",color:"#FFFFFF",boxShadow:`0 2px 8px ${f.accent}40`}:{background:L?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:`1px solid ${f.border}`,color:f.fg2}},onMouseEnter:re=>{let se=re.currentTarget;se.style.transform="translateY(-2px)",se.style.boxShadow=W?`0 6px 20px ${f.accent}45`:"0 4px 12px rgba(0,0,0,0.10)"},onMouseLeave:re=>{let se=re.currentTarget;se.style.transform="translateY(0)",se.style.boxShadow=W?`0 2px 8px ${f.accent}40`:"none"},onMouseDown:re=>{re.currentTarget.style.transform="scale(0.97)"},onMouseUp:re=>{re.currentTarget.style.transform=""},children:[C,W&&(0,v.jsx)(ra,{size:15})]}),S=[{icon:(0,v.jsx)(ot,{size:19}),title:"Real-time Monitoring",desc:"Live data streaming from all IoT devices with instant threshold alerts."},{icon:(0,v.jsx)(St,{size:19}),title:"Data Management",desc:"Structured experiment data with PostgreSQL and time-series storage."},{icon:(0,v.jsx)(ir,{size:19}),title:"Secure Auth",desc:"Enterprise-grade JWT auth with role-based access control."},{icon:(0,v.jsx)(Vt,{size:19}),title:"Analytics Dashboard",desc:"Comprehensive dashboards with exportable reports and insights."},{icon:(0,v.jsx)(rr,{size:19}),title:"REST API",desc:"OpenAPI-compliant interface for seamless third-party integration."},{icon:(0,v.jsx)(nr,{size:19}),title:"Microservices",desc:"Rust-powered distributed services built for performance."}],T=[{icon:(0,v.jsx)(Wn,{size:18}),title:"Open Datasets",desc:"Curated datasets for research and academic publication."},{icon:(0,v.jsx)(Zn,{size:18}),title:"Version Control",desc:"Track every experiment iteration for reproducibility."},{icon:(0,v.jsx)(dr,{size:18}),title:"Collaborative",desc:"Share experiments across institutions and teams."},{icon:(0,v.jsx)(wa,{size:18}),title:"Deep Analytics",desc:"Statistical tools for data-driven scientific discovery."}],k=[{value:"100%",label:"Open Source",sub:"MIT Licensed"},{value:"Rust",label:"Powered By",sub:"High performance"},{value:"2.4 TB",label:"Processed",sub:"Across nodes"},{value:"84+",label:"Devices",sub:"Connected"}],w=[{icon:(0,v.jsx)(il,{size:24,color:f.accent}),title:"Our Mission",desc:"To simplify IoT experiment management and provide powerful tools for developers and researchers to build the future of connected systems."},{icon:(0,v.jsx)(ba,{size:24,color:f.accentB}),title:"Our Vision",desc:"Becoming the leading platform for IoT experimentation, enabling innovation through accessible, scalable, and open-source technology."},{icon:(0,v.jsx)(dr,{size:24,color:f.accentGreen}),title:"Our Community",desc:"Building a community of IoT enthusiasts, developers, and researchers who share knowledge and push the boundaries of what's possible."}],F=[{icon:(0,v.jsx)(na,{size:20,color:f.accent}),title:"Email Us",content:"support@blazecore.io",description:"We respond within 24 hours"},{icon:(0,v.jsx)(ol,{size:20,color:f.accent}),title:"Call Us",content:"+1 (555) 123-4567",description:"Mon\u2013Fri 9am\u20136pm EST"},{icon:(0,v.jsx)(sr,{size:20,color:f.accent}),title:"Visit Us",content:"123 Tech Street",description:"San Francisco, CA 94102"}],A=(C,N,W)=>(0,v.jsxs)("div",{style:{textAlign:"center",marginBottom:"3rem"},children:[(0,v.jsx)("div",{style:{fontSize:"0.75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:f.accent,marginBottom:"0.625rem"},children:C}),(0,v.jsx)("h2",{style:{fontSize:"clamp(1.75rem, 3.5vw, 2.5rem)",fontWeight:700,color:f.fg,margin:"0 0 0.625rem",letterSpacing:"-0.025em"},children:N}),W&&(0,v.jsx)("p",{style:{fontSize:"1rem",color:f.fg2,margin:0,maxWidth:"42rem",marginLeft:"auto",marginRight:"auto",lineHeight:1.7},children:W})]});return(0,v.jsxs)("main",{id:"page-home",style:{minHeight:"100vh",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'},children:[(0,v.jsx)("style",{children:`
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-form-input:focus {
          border-color: ${f.accent} !important;
          box-shadow: 0 0 0 3px ${f.accent}20 !important;
        }
        .card-hover:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
        }
      `}),(0,v.jsxs)("section",{id:"section-hero",style:{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:"3rem",overflow:"hidden"},children:[(0,v.jsx)(SS,{isDark:L}),(0,v.jsxs)("div",{style:{position:"absolute",inset:0,pointerEvents:"none"},children:[(0,v.jsx)("div",{style:{position:"absolute",top:"-8rem",right:"-6rem",width:"38rem",height:"38rem",borderRadius:"50%",background:`radial-gradient(circle, ${f.accent}14 0%, transparent 65%)`,animation:"blobMove1 14s ease-in-out infinite"}}),(0,v.jsx)("div",{style:{position:"absolute",top:"35%",left:"-8rem",width:"30rem",height:"30rem",borderRadius:"50%",background:`radial-gradient(circle, ${f.accentB}0C 0%, transparent 65%)`,animation:"blobMove2 17s ease-in-out infinite"}}),(0,v.jsx)("div",{style:{position:"absolute",bottom:"-4rem",right:"25%",width:"24rem",height:"24rem",borderRadius:"50%",background:`radial-gradient(circle, ${f.accent}0A 0%, transparent 65%)`,animation:"blobMove3 11s ease-in-out infinite"}}),(0,v.jsx)("div",{style:{position:"absolute",inset:0,backgroundImage:`radial-gradient(circle, ${f.bg4}28 1px, transparent 1px)`,backgroundSize:"28px 28px",opacity:.35}})]}),(0,v.jsx)("div",{style:{position:"relative",zIndex:2,width:"100%"},children:(0,v.jsx)("div",{style:{maxWidth:"82rem",margin:"0 auto",padding:"0 1.5rem"},children:(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))",gap:"4.5rem",alignItems:"center"},children:[(0,v.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1.75rem"},children:[(0,v.jsx)("div",{className:"animate-fade-up",style:{animationDelay:"0ms"},children:d("Open Source \xB7 Research-First")}),(0,v.jsx)("div",{className:"animate-fade-up",style:{animationDelay:"80ms"},children:(0,v.jsxs)("h1",{style:{margin:0,lineHeight:1.04},children:[(0,v.jsx)("span",{style:{display:"block",fontSize:"clamp(2.75rem, 5.5vw, 4.75rem)",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',fontWeight:700,color:f.fg,letterSpacing:"-0.03em"},children:"Blazecore"}),(0,v.jsxs)("span",{style:{display:"block",marginTop:"0.4rem",fontSize:"clamp(1.25rem, 2.6vw, 2rem)",fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',fontWeight:500,letterSpacing:"-0.02em",color:f.accent},children:[l.slice(0,o),(0,v.jsx)("span",{style:{animation:"pulse 0.9s ease-in-out infinite",opacity:o<l.length?1:0},children:"|"})]})]})}),(0,v.jsx)("div",{className:"animate-fade-up",style:{animationDelay:"160ms"},children:(0,v.jsx)("p",{style:{margin:0,fontSize:"1.0625rem",lineHeight:1.75,color:f.fg2,maxWidth:"30rem",fontWeight:400},children:"Empowering research institutions with open-source IoT experiment management, live monitoring, and comprehensive data infrastructure."})}),(0,v.jsxs)("div",{className:"animate-fade-up",style:{animationDelay:"240ms",display:"flex",gap:"0.75rem",flexWrap:"wrap",alignItems:"center"},children:[g("Get Started","signup",!0),g("Learn More","landing",!1,"section-about")]}),(0,v.jsx)("div",{className:"animate-fade-up",style:{animationDelay:"320ms",display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[{icon:(0,v.jsx)(sl,{size:12}),label:"2.1k",text:"Stars"},{icon:(0,v.jsx)(Yn,{size:12}),label:"384",text:"Forks"},{icon:(0,v.jsx)(ba,{size:12}),label:"91",text:"Watching"}].map((C,N)=>(0,v.jsxs)("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.3rem",padding:"0.3rem 0.75rem",borderRadius:"0.375rem",background:f.glass,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",border:`1px solid ${f.glassBorder}`,fontSize:"0.78rem",fontWeight:500,color:f.fg2},children:[(0,v.jsx)("span",{style:{color:f.accent},children:C.icon}),(0,v.jsx)("span",{style:{fontWeight:700,color:f.fg},children:C.label}),(0,v.jsx)("span",{children:C.text})]},N))}),(0,v.jsx)("div",{className:"animate-fade-up",style:{animationDelay:"400ms",display:"flex",flexDirection:"column",gap:"0.45rem"},children:["No credit card required","MIT Licensed \u2014 fully open-source","Self-hostable on any infrastructure"].map((C,N)=>(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.875rem",color:f.fg3},children:[(0,v.jsx)(er,{size:13,style:{color:f.accentGreen,flexShrink:0}}),C]},N))})]}),(0,v.jsxs)("div",{className:"hidden lg:block",style:{position:"relative",height:"480px"},children:[(0,v.jsxs)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:320,height:320,pointerEvents:"none"},children:[(0,v.jsx)("div",{className:"orbit-ring",style:{inset:0}}),(0,v.jsx)("div",{className:"orbit-ring-r",style:{inset:28}}),(0,v.jsx)("div",{className:"orbit-ring",style:{inset:58,animationDuration:"32s"}})]}),(0,v.jsx)("div",{className:"animate-fade-right",style:{animationDelay:"180ms",position:"absolute",top:"1rem",right:"0",width:"18.5rem"},children:(0,v.jsxs)("div",{style:{...b(1.5,"0s"),borderRadius:"1rem"},children:[E,u,(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem"},children:[(0,v.jsx)("div",{style:{width:"2.25rem",height:"2.25rem",borderRadius:"0.625rem",background:`${f.accent}18`,display:"flex",alignItems:"center",justifyContent:"center"},children:(0,v.jsx)(ot,{size:16,color:f.accent})}),(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontSize:"0.8125rem",fontWeight:600,color:f.fg},children:"Live Monitoring"}),(0,v.jsx)("div",{style:{fontSize:"0.6875rem",color:f.fg2},children:"84 devices online"})]}),(0,v.jsxs)("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:"0.25rem"},children:[(0,v.jsx)("span",{style:{width:6,height:6,borderRadius:"50%",background:f.accentGreen,animation:"pulse 2s ease-in-out infinite",display:"inline-block"}}),(0,v.jsx)("span",{style:{fontSize:"0.6875rem",color:f.accentGreen,fontWeight:600},children:"LIVE"})]})]}),(0,v.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:["Sensor Array #1","Temperature Grid","Humidity Network"].map((C,N)=>(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.625rem"},children:[(0,v.jsx)("div",{style:{flex:1,height:"5px",borderRadius:"3px",background:L?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.06)",overflow:"hidden"},children:(0,v.jsx)("div",{style:{height:"100%",width:`${[72,58,84][N]}%`,background:f.accent,borderRadius:"3px",transition:"width 0.4s ease"}})}),(0,v.jsxs)("span",{style:{fontSize:"0.6875rem",color:f.fg2,minWidth:"2rem",textAlign:"right"},children:[[72,58,84][N],"%"]})]},N))})]})}),(0,v.jsx)("div",{className:"animate-fade-right",style:{animationDelay:"280ms",position:"absolute",top:"38%",left:"0",width:"16.5rem"},children:(0,v.jsxs)("div",{style:{...b(-2,"0.3s",!0),borderRadius:"1rem"},children:[E,u,(0,v.jsx)("div",{style:{fontSize:"0.8125rem",fontWeight:600,color:f.fg,marginBottom:"0.75rem"},children:"Experiment Status"}),[{label:"Active",color:f.accentGreen,count:12},{label:"Pending",color:f.accent,count:5},{label:"Completed",color:f.fg3,count:28}].map((C,N)=>(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.375rem"},children:[(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.375rem"},children:[(0,v.jsx)("span",{style:{width:6,height:6,borderRadius:"50%",background:C.color,display:"inline-block"}}),(0,v.jsx)("span",{style:{fontSize:"0.75rem",color:f.fg2},children:C.label})]}),(0,v.jsx)("span",{style:{fontSize:"0.75rem",fontWeight:700,color:f.fg},children:C.count})]},N))]})}),(0,v.jsx)("div",{className:"animate-fade-right",style:{animationDelay:"360ms",position:"absolute",bottom:"2rem",right:"1.5rem",width:"14rem"},children:(0,v.jsxs)("div",{style:{...b(1,"0.6s"),borderRadius:"1rem"},children:[E,u,(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.625rem",marginBottom:"0.5rem"},children:[(0,v.jsx)(St,{size:14,color:f.accent}),(0,v.jsx)("span",{style:{fontSize:"0.75rem",color:f.fg2,fontWeight:500},children:"Data Processed"})]}),(0,v.jsx)("div",{style:{fontSize:"1.625rem",fontWeight:800,color:f.fg,letterSpacing:"-0.03em",lineHeight:1},children:"2.4 TB"}),(0,v.jsx)("div",{style:{fontSize:"0.6875rem",color:f.accentGreen,marginTop:"0.25rem",fontWeight:500},children:"\u2191 18% this week"})]})})]})]})})})]}),(0,v.jsx)("section",{id:"section-stats",style:{padding:"5rem 1.5rem",maxWidth:"82rem",margin:"0 auto"},children:(0,v.jsx)("div",{ref:p.ref,style:{opacity:p.visible?1:0,transform:p.visible?"none":"translateY(24px)",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)"},children:(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"1.5rem"},children:k.map((C,N)=>(0,v.jsxs)(Pc,{color:f.accent,style:{background:f.cardBg,border:`1px solid ${f.border}`,boxShadow:f.shadow,padding:"2rem 1.5rem",textAlign:"center"},children:[(0,v.jsx)(bS,{value:C.value,color:f.accent}),(0,v.jsx)("div",{style:{fontSize:"0.9375rem",fontWeight:600,color:f.fg,margin:"0.5rem 0 0.25rem"},children:C.label}),(0,v.jsx)("div",{style:{fontSize:"0.8125rem",color:f.fg2},children:C.sub})]},N))})})}),(0,v.jsx)("section",{id:"section-research-tools",style:{padding:"5rem 1.5rem",background:L?"rgba(28,28,30,0.5)":"rgba(0,0,0,0.02)"},children:(0,v.jsxs)("div",{style:{maxWidth:"82rem",margin:"0 auto"},children:[(0,v.jsxs)("div",{ref:s.ref,style:{opacity:s.visible?1:0,transform:s.visible?"none":"translateY(24px)",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)"},children:[A("Platform Features","Everything You Need","A comprehensive suite of tools for managing IoT experiments at scale."),(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.25rem",marginBottom:"4rem"},children:S.map((C,N)=>(0,v.jsxs)(Pc,{color:f.accent,style:{background:f.cardBg,border:`1px solid ${f.border}`,boxShadow:f.shadow,padding:"1.75rem"},children:[(0,v.jsx)("div",{style:{width:"2.75rem",height:"2.75rem",borderRadius:"0.75rem",background:`${f.accent}14`,display:"flex",alignItems:"center",justifyContent:"center",color:f.accent,marginBottom:"1.125rem",border:`1px solid ${f.accent}20`},children:C.icon}),(0,v.jsx)("h3",{style:{fontSize:"1.0625rem",fontWeight:700,color:f.fg,margin:"0 0 0.5rem",letterSpacing:"-0.01em"},children:C.title}),(0,v.jsx)("p",{style:{fontSize:"0.9rem",color:f.fg2,lineHeight:1.65,margin:0},children:C.desc})]},N))})]}),(0,v.jsxs)("div",{ref:i.ref,style:{opacity:i.visible?1:0,transform:i.visible?"none":"translateY(24px)",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)"},children:[A("Research-First","Built for Science","Tools designed for rigorous academic and industrial IoT research."),(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"1.25rem"},children:T.map((C,N)=>(0,v.jsxs)(Pc,{color:f.accentGreen,style:{background:f.cardBg,border:`1px solid ${f.border}`,boxShadow:f.shadow,padding:"1.75rem"},children:[(0,v.jsx)("div",{style:{width:"2.75rem",height:"2.75rem",borderRadius:"0.75rem",background:`${f.accentGreen}14`,display:"flex",alignItems:"center",justifyContent:"center",color:f.accentGreen,marginBottom:"1.125rem",border:`1px solid ${f.accentGreen}20`},children:C.icon}),(0,v.jsx)("h3",{style:{fontSize:"1rem",fontWeight:700,color:f.fg,margin:"0 0 0.375rem"},children:C.title}),(0,v.jsx)("p",{style:{fontSize:"0.875rem",color:f.fg2,lineHeight:1.6,margin:0},children:C.desc})]},N))})]})]})}),(0,v.jsx)("section",{id:"section-about",style:{padding:"6rem 1.5rem"},children:(0,v.jsx)("div",{style:{maxWidth:"82rem",margin:"0 auto"},children:(0,v.jsxs)("div",{ref:m.ref,style:{opacity:m.visible?1:0,transform:m.visible?"none":"translateY(24px)",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)"},children:[A("About Us","Building the Future of IoT","Blazecore is an open-source platform designed to streamline IoT experiment management, built with Rust and React for maximum performance."),(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem",marginBottom:"4rem"},children:w.map((C,N)=>(0,v.jsxs)("div",{className:"card-hover",style:{background:f.cardBg,borderRadius:"1rem",border:`1px solid ${f.border}`,boxShadow:f.shadow,padding:"2rem",transition:"transform 0.25s ease, box-shadow 0.25s ease"},children:[(0,v.jsx)("div",{style:{width:"3rem",height:"3rem",borderRadius:"0.75rem",background:`${f.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem",border:`1px solid ${f.border}`},children:C.icon}),(0,v.jsx)("h3",{style:{fontSize:"1.125rem",fontWeight:700,color:f.fg,margin:"0 0 0.625rem"},children:C.title}),(0,v.jsx)("p",{style:{fontSize:"0.9375rem",color:f.fg2,lineHeight:1.65,margin:0},children:C.desc})]},N))}),(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"3rem",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontSize:"0.8125rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:f.accent,marginBottom:"0.5rem"},children:"Our Story"}),(0,v.jsx)("h3",{style:{fontSize:"1.75rem",fontWeight:700,color:f.fg,margin:"0 0 1.25rem",letterSpacing:"-0.025em"},children:"How Blazecore Began"}),(0,v.jsx)("p",{style:{fontSize:"0.9375rem",color:f.fg2,lineHeight:1.75,marginBottom:"1rem"},children:"Blazecore was born from a simple need: managing IoT experiments efficiently. What started as an internal tool quickly evolved into a comprehensive platform that combines the raw performance of Rust with React's modern UI flexibility."}),(0,v.jsx)("p",{style:{fontSize:"0.9375rem",color:f.fg2,lineHeight:1.75,marginBottom:"1.75rem"},children:"Today, Blazecore serves developers, researchers, and organizations worldwide, giving them everything they need to manage experiments, monitor data in real time, and scale their IoT operations confidently."}),["Open-source and community-driven","REST API for full integration","Real-time metrics and monitoring"].map((C,N)=>(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.625rem",marginBottom:"0.625rem"},children:[(0,v.jsx)(He,{size:15,color:f.accentGreen,style:{flexShrink:0}}),(0,v.jsx)("span",{style:{fontSize:"0.9375rem",color:f.fg2},children:C})]},N))]}),(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"},children:[{icon:(0,v.jsx)(Xn,{size:24,color:f.accent}),name:"Rust",role:"High Performance Backend"},{icon:(0,v.jsx)(rr,{size:24,color:f.accentB}),name:"React",role:"Modern UI Layer"},{icon:(0,v.jsx)(St,{size:24,color:f.accentGreen}),name:"PostgreSQL",role:"Reliable Storage"},{icon:(0,v.jsx)(ir,{size:24,color:f.accent}),name:"Security First",role:"Enterprise Grade"}].map((C,N)=>(0,v.jsxs)("div",{className:"card-hover",style:{background:f.cardBg,border:`1px solid ${f.border}`,borderRadius:"1rem",padding:"1.5rem",boxShadow:f.shadow,transition:"transform 0.25s ease, box-shadow 0.25s ease"},children:[(0,v.jsx)("div",{style:{width:"2.75rem",height:"2.75rem",borderRadius:"0.625rem",background:`${f.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"0.875rem"},children:C.icon}),(0,v.jsx)("div",{style:{fontSize:"1rem",fontWeight:700,color:f.fg},children:C.name}),(0,v.jsx)("div",{style:{fontSize:"0.8125rem",color:f.fg2,marginTop:"0.25rem"},children:C.role})]},N))})]})]})})}),(0,v.jsx)("section",{style:{padding:"0 1.5rem 4rem"},children:(0,v.jsx)("div",{ref:c.ref,style:{maxWidth:"82rem",margin:"0 auto",opacity:c.visible?1:0,transform:c.visible?"none":"translateY(24px)",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)"},children:(0,v.jsxs)("div",{style:{padding:"3.5rem 2rem",background:`linear-gradient(135deg, ${f.accent} 0%, ${f.accentB} 100%)`,borderRadius:"1.5rem",textAlign:"center",boxShadow:`0 20px 40px ${f.accent}30`},children:[(0,v.jsx)("h2",{style:{fontSize:"clamp(1.5rem, 3vw, 2.25rem)",fontWeight:700,color:"#fff",margin:"0 0 0.75rem",letterSpacing:"-0.025em"},children:"Ready to Get Started?"}),(0,v.jsx)("p",{style:{color:"rgba(255,255,255,0.85)",fontSize:"1.0625rem",margin:"0 0 2rem"},children:"Join the growing community of IoT professionals using Blazecore."}),(0,v.jsxs)("div",{style:{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"},children:[(0,v.jsxs)("button",{onClick:()=>e("signup"),style:{padding:"0.875rem 2rem",background:"#fff",color:f.accent,border:"none",borderRadius:"0.625rem",fontSize:"0.9375rem",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem",boxShadow:"0 4px 14px rgba(0,0,0,0.15)",transition:"all 0.2s"},onMouseEnter:C=>{C.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:C=>{C.currentTarget.style.transform=""},onMouseDown:C=>{C.currentTarget.style.transform="scale(0.97)"},onMouseUp:C=>{C.currentTarget.style.transform=""},children:["Create Free Account ",(0,v.jsx)(ra,{size:16})]}),(0,v.jsx)("button",{onClick:()=>{document.getElementById("section-contact")?.scrollIntoView({behavior:"smooth",block:"start"})},style:{padding:"0.875rem 2rem",background:"rgba(255,255,255,0.15)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:"0.625rem",fontSize:"0.9375rem",fontWeight:600,cursor:"pointer",transition:"all 0.2s"},onMouseEnter:C=>{C.currentTarget.style.background="rgba(255,255,255,0.22)"},onMouseLeave:C=>{C.currentTarget.style.background="rgba(255,255,255,0.15)"},onMouseDown:C=>{C.currentTarget.style.transform="scale(0.97)"},onMouseUp:C=>{C.currentTarget.style.transform=""},children:"Contact Us"})]})]})})}),(0,v.jsx)("section",{id:"section-contact",style:{padding:"5rem 1.5rem 6rem",background:L?"rgba(28,28,30,0.5)":"rgba(0,0,0,0.02)"},children:(0,v.jsx)("div",{style:{maxWidth:"82rem",margin:"0 auto"},children:(0,v.jsxs)("div",{ref:h.ref,style:{opacity:h.visible?1:0,transform:h.visible?"none":"translateY(24px)",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)"},children:[A("Contact","Get in Touch","Have questions about Blazecore? We're here to help."),(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1.25rem",marginBottom:"3rem"},children:F.map((C,N)=>(0,v.jsxs)("div",{style:{background:f.cardBg,border:`1px solid ${f.border}`,borderRadius:"1rem",boxShadow:f.shadow,padding:"1.5rem",textAlign:"center"},children:[(0,v.jsx)("div",{style:{width:"3rem",height:"3rem",borderRadius:"0.75rem",background:`${f.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem",border:`1px solid ${f.accent}20`},children:C.icon}),(0,v.jsx)("h3",{style:{fontSize:"0.9375rem",fontWeight:700,color:f.fg,margin:"0 0 0.375rem"},children:C.title}),(0,v.jsx)("p",{style:{fontSize:"0.9375rem",fontWeight:600,color:f.fg,margin:"0 0 0.25rem"},children:C.content}),(0,v.jsx)("p",{style:{fontSize:"0.8125rem",color:f.fg2,margin:0},children:C.description})]},N))}),(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"2rem",alignItems:"start"},children:[(0,v.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem"},children:[(0,v.jsxs)("div",{style:{background:f.cardBg,border:`1px solid ${f.border}`,borderRadius:"1rem",boxShadow:f.shadow,padding:"1.75rem"},children:[(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem"},children:[(0,v.jsx)("div",{style:{width:"2.5rem",height:"2.5rem",borderRadius:"0.625rem",background:`linear-gradient(135deg, ${f.accent}, ${f.accentB})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 10px ${f.accent}30`},children:(0,v.jsx)(Ne,{size:16,color:"#fff"})}),(0,v.jsx)("span",{style:{fontSize:"1.0625rem",fontWeight:700,color:f.fg},children:"Blazecore"})]}),(0,v.jsx)("p",{style:{fontSize:"0.9rem",color:f.fg2,lineHeight:1.65,margin:"0 0 1.25rem"},children:"Dedicated to providing the best open-source IoT experiment management platform for developers and researchers worldwide."}),(0,v.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"0.625rem"},children:[{icon:(0,v.jsx)(zr,{size:14,color:f.fg2}),text:"24/7 Technical Support"},{icon:(0,v.jsx)(Ur,{size:14,color:f.fg2}),text:"Live Chat Available"},{icon:(0,v.jsx)(na,{size:14,color:f.fg2}),text:"Email Response in 24h"}].map((C,N)=>(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.625rem"},children:[C.icon,(0,v.jsx)("span",{style:{fontSize:"0.875rem",color:f.fg2},children:C.text})]},N))})]}),(0,v.jsxs)("div",{style:{background:f.cardBg,border:`1px solid ${f.border}`,borderRadius:"1rem",boxShadow:f.shadow,padding:"1.75rem"},children:[(0,v.jsx)("p",{style:{fontSize:"0.8125rem",fontWeight:700,color:f.fg2,margin:"0 0 1rem",textTransform:"uppercase",letterSpacing:"0.06em"},children:"Follow Our Progress"}),(0,v.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"0.625rem"},children:["GitHub","Twitter / X","LinkedIn"].map((C,N)=>(0,v.jsxs)("button",{style:{display:"flex",alignItems:"center",gap:"0.625rem",padding:"0.625rem 0.875rem",background:L?"#2C2C2E":"#F5F5F7",border:`1px solid ${f.border}`,borderRadius:"0.5rem",color:f.fg2,fontSize:"0.875rem",fontWeight:500,cursor:"pointer",transition:"all 0.15s",width:"100%"},onMouseEnter:W=>{W.currentTarget.style.borderColor=f.accent,W.currentTarget.style.color=f.accent},onMouseLeave:W=>{W.currentTarget.style.borderColor=f.border,W.currentTarget.style.color=f.fg2},onMouseDown:W=>{W.currentTarget.style.transform="scale(0.97)"},onMouseUp:W=>{W.currentTarget.style.transform=""},children:[(0,v.jsx)(Qn,{size:14})," ",C]},N))})]})]}),(0,v.jsxs)("div",{style:{background:f.cardBg,border:`1px solid ${f.border}`,borderRadius:"1rem",boxShadow:f.shadow,padding:"2rem"},children:[(0,v.jsx)("h3",{style:{fontSize:"1.25rem",fontWeight:700,color:f.fg,margin:"0 0 0.5rem",letterSpacing:"-0.02em"},children:"Send us a Message"}),(0,v.jsx)("p",{style:{fontSize:"0.9rem",color:f.fg2,margin:"0 0 1.75rem"},children:"Fill out the form and we'll get back to you shortly."}),(0,v.jsx)(CS,{p:f})]})]})]})})}),(0,v.jsx)("footer",{style:{padding:"2rem 1.5rem",borderTop:`1px solid ${f.border}`,textAlign:"center"},children:(0,v.jsx)("p",{style:{margin:0,fontSize:"0.8125rem",color:f.fg3},children:"\xA9 2026 Blazecore \u2014 MIT License. Built with Rust & React."})})]})},Rc=IS;var $o=q(Re());var Z=q(X()),wS=({onNavigate:e,onLoginSuccess:t})=>{let{theme:a,mode:r}=Ee(),[o,n]=(0,$o.useState)(""),[l,s]=(0,$o.useState)(""),[i,c]=(0,$o.useState)(!1),[p,m]=(0,$o.useState)(""),[h,L]=(0,$o.useState)(!1),f=r==="light"?"#0071E3":"#2997FF",b=async d=>{d.preventDefault(),c(!0),m(""),L(!1);try{let g=btoa(`${o}:${l}`),S=await fetch("http://0.0.0.0:8001/api/v1/auth/login",{method:"GET",headers:{Authorization:`Basic ${g}`,"Content-Type":"application/json"}});if(S.ok){let T=await S.json();L(!0),localStorage.setItem("blazecore_token",T.token||g),localStorage.setItem("blazecore_user",o),t(T.token||g),setTimeout(()=>e("dashboard"),1e3)}else{let T=await S.json().catch(()=>({}));m(T.message||"Invalid email or password")}}catch{m("Network error. Please try again.")}finally{c(!1)}},E={width:"100%",padding:"0.75rem 1rem",borderRadius:"0.5rem",border:`1px solid ${a.colors.border.primary}`,background:r==="light"?"#FFFFFF":"#2C2C2E",color:a.colors.text.primary,fontSize:"0.9375rem",outline:"none",transition:"border-color 0.2s, box-shadow 0.2s",boxSizing:"border-box"},u={display:"block",fontSize:"0.875rem",fontWeight:500,color:a.colors.text.secondary,marginBottom:"0.375rem"};return(0,Z.jsxs)("div",{style:{minHeight:"100vh",background:r==="light"?"#F5F5F7":"#000000",display:"flex",alignItems:"center",justifyContent:"center",padding:"5rem 1rem 2rem"},children:[(0,Z.jsx)("div",{style:{width:"100%",maxWidth:"420px"},children:(0,Z.jsxs)("div",{style:{background:r==="light"?"#FFFFFF":"#1C1C1E",borderRadius:"1.25rem",border:`1px solid ${a.colors.border.primary}`,boxShadow:"0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",padding:"2.5rem"},children:[(0,Z.jsxs)("div",{style:{textAlign:"center",marginBottom:"2rem"},children:[(0,Z.jsxs)("button",{onClick:()=>e("landing"),style:{background:"none",border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.5rem"},children:[(0,Z.jsx)("div",{style:{width:"2.25rem",height:"2.25rem",borderRadius:"0.5625rem",background:f,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 2px 8px ${f}40`},children:(0,Z.jsx)(Ne,{size:16,color:"#fff"})}),(0,Z.jsx)("span",{style:{fontSize:"1.0625rem",fontWeight:600,color:a.colors.text.primary,letterSpacing:"-0.02em"},children:"Blazecore"})]}),(0,Z.jsx)("h1",{style:{fontSize:"1.625rem",fontWeight:700,color:a.colors.text.primary,margin:"0 0 0.375rem",letterSpacing:"-0.025em"},children:"Welcome back"}),(0,Z.jsx)("p",{style:{color:a.colors.text.secondary,fontSize:"0.9375rem",margin:0},children:"Sign in to your IoT dashboard"})]}),p&&(0,Z.jsxs)("div",{style:{marginBottom:"1.25rem",padding:"0.75rem 1rem",background:"rgba(255,59,48,0.06)",border:"1px solid rgba(255,59,48,0.20)",borderRadius:"0.5rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[(0,Z.jsx)(At,{size:15,color:"#FF3B30",style:{flexShrink:0}}),(0,Z.jsx)("span",{style:{fontSize:"0.875rem",color:"#FF3B30"},children:p})]}),h&&(0,Z.jsxs)("div",{style:{marginBottom:"1.25rem",padding:"0.75rem 1rem",background:"rgba(52,199,89,0.06)",border:"1px solid rgba(52,199,89,0.20)",borderRadius:"0.5rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[(0,Z.jsx)(He,{size:15,color:"#34C759",style:{flexShrink:0}}),(0,Z.jsx)("span",{style:{fontSize:"0.875rem",color:"#34C759"},children:"Login successful! Redirecting..."})]}),(0,Z.jsxs)("form",{onSubmit:b,children:[(0,Z.jsxs)("div",{style:{marginBottom:"1rem"},children:[(0,Z.jsx)("label",{style:u,children:"Email Address"}),(0,Z.jsxs)("div",{style:{position:"relative"},children:[(0,Z.jsx)(na,{size:15,color:a.colors.text.tertiary,style:{position:"absolute",left:"0.875rem",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}),(0,Z.jsx)("input",{type:"email",placeholder:"you@example.com",value:o,onChange:d=>n(d.target.value),required:!0,disabled:i,style:{...E,paddingLeft:"2.5rem"},autoComplete:"email",onFocus:d=>{d.target.style.borderColor=f,d.target.style.boxShadow=`0 0 0 3px ${f}18`},onBlur:d=>{d.target.style.borderColor=a.colors.border.primary,d.target.style.boxShadow="none"}})]})]}),(0,Z.jsxs)("div",{style:{marginBottom:"1.5rem"},children:[(0,Z.jsx)("label",{style:u,children:"Password"}),(0,Z.jsxs)("div",{style:{position:"relative"},children:[(0,Z.jsx)(oa,{size:15,color:a.colors.text.tertiary,style:{position:"absolute",left:"0.875rem",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}),(0,Z.jsx)("input",{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:l,onChange:d=>s(d.target.value),required:!0,disabled:i,style:{...E,paddingLeft:"2.5rem"},autoComplete:"current-password",onFocus:d=>{d.target.style.borderColor=f,d.target.style.boxShadow=`0 0 0 3px ${f}18`},onBlur:d=>{d.target.style.borderColor=a.colors.border.primary,d.target.style.boxShadow="none"}})]})]}),(0,Z.jsx)("button",{type:"submit",disabled:i,style:{width:"100%",padding:"0.8125rem 1.5rem",background:i?a.colors.border.secondary:f,color:"#fff",border:"none",borderRadius:"0.5625rem",fontSize:"0.9375rem",fontWeight:600,cursor:i?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",boxShadow:i?"none":`0 2px 8px ${f}35`,transition:"all 0.2s",letterSpacing:"-0.01em"},children:i?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("div",{style:{width:"1rem",height:"1rem",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}),"Signing In..."]}):(0,Z.jsxs)(Z.Fragment,{children:["Sign In ",(0,Z.jsx)(ra,{size:15})]})})]}),(0,Z.jsxs)("p",{style:{textAlign:"center",marginTop:"1.5rem",fontSize:"0.875rem",color:a.colors.text.secondary},children:["Don't have an account?"," ",(0,Z.jsx)("button",{onClick:()=>e("signup"),style:{background:"none",border:"none",cursor:"pointer",color:f,fontWeight:600,fontSize:"0.875rem"},children:"Sign up"})]})]})}),(0,Z.jsx)("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]})},jh=wS;var Ra=q(Re());var j=q(X()),kS=({onNavigate:e,onSignupSuccess:t})=>{let{theme:a,mode:r}=Ee(),[o,n]=(0,Ra.useState)(""),[l,s]=(0,Ra.useState)(""),[i,c]=(0,Ra.useState)(""),[p,m]=(0,Ra.useState)(""),[h,L]=(0,Ra.useState)(!1),[f,b]=(0,Ra.useState)(!1),[E,u]=(0,Ra.useState)(""),[d,g]=(0,Ra.useState)(!1),S=async A=>{if(A.preventDefault(),b(!0),u(""),g(!1),i!==p){u("Passwords do not match"),b(!1);return}if(i.length<6){u("Password must be at least 6 characters"),b(!1);return}if(!h){u("Please agree to the terms and conditions"),b(!1);return}try{let C=await fetch("/api/v1/auth/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:l,password:i})});if(C.ok)g(!0),t(),setTimeout(()=>e("dashboard"),2e3);else{let N=await C.json().catch(()=>({}));u(N.message||"Failed to create account. Email may already exist.")}}catch{u("Network error. Please try again.")}finally{b(!1)}},T={width:"100%",padding:"0.75rem 1rem",borderRadius:"0.625rem",border:`1.5px solid ${a.colors.border.primary}`,background:r==="light"?"#F5F5F7":"#2C2C2E",color:a.colors.text.primary,fontSize:"0.9375rem",outline:"none",transition:"border-color 0.2s",boxSizing:"border-box"},k={display:"block",fontSize:"0.875rem",fontWeight:500,color:a.colors.text.secondary,marginBottom:"0.375rem"},w=(A,C)=>(0,j.jsxs)("div",{style:{marginBottom:"1.125rem"},children:[(0,j.jsx)("label",{style:k,children:A}),C]}),F=(A,C)=>(0,j.jsxs)("div",{style:{position:"relative"},children:[(0,j.jsx)("div",{style:{position:"absolute",left:"0.875rem",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},children:A}),C]});return(0,j.jsxs)("div",{style:{minHeight:"100vh",background:r==="light"?"#F5F5F7":"#000000",display:"flex",alignItems:"center",justifyContent:"center",padding:"5rem 1rem 2rem"},children:[(0,j.jsx)("div",{style:{width:"100%",maxWidth:"480px"},children:(0,j.jsxs)("div",{style:{background:r==="light"?"#FFFFFF":"#1C1C1E",borderRadius:"1.25rem",border:`1px solid ${a.colors.border.primary}`,boxShadow:a.colors.shadow.xl,padding:"2.5rem"},children:[(0,j.jsxs)("div",{style:{textAlign:"center",marginBottom:"2rem"},children:[(0,j.jsxs)("button",{onClick:()=>e("landing"),style:{background:"none",border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"0.625rem",marginBottom:"1.5rem"},children:[(0,j.jsx)("div",{style:{width:"2.5rem",height:"2.5rem",borderRadius:"0.625rem",background:a.gradients.primary,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,113,227,0.3)"},children:(0,j.jsx)(Ne,{size:18,color:"#fff"})}),(0,j.jsx)("span",{style:{fontSize:"1.125rem",fontWeight:700,color:a.colors.text.primary,letterSpacing:"-0.02em"},children:"Blazecore"})]}),(0,j.jsx)("h1",{style:{fontSize:"1.75rem",fontWeight:700,color:a.colors.text.primary,margin:"0 0 0.5rem",letterSpacing:"-0.025em"},children:"Create your account"}),(0,j.jsx)("p",{style:{color:a.colors.text.secondary,fontSize:"0.9375rem",margin:0},children:"Start managing IoT experiments for free"})]}),E&&(0,j.jsxs)("div",{style:{marginBottom:"1.25rem",padding:"0.75rem 1rem",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:"0.625rem",display:"flex",alignItems:"center",gap:"0.625rem"},children:[(0,j.jsx)(At,{size:16,color:"#EF4444",style:{flexShrink:0}}),(0,j.jsx)("span",{style:{fontSize:"0.875rem",color:"#EF4444"},children:E})]}),d&&(0,j.jsxs)("div",{style:{marginBottom:"1.25rem",padding:"0.75rem 1rem",background:"rgba(52,199,89,0.08)",border:"1px solid rgba(52,199,89,0.25)",borderRadius:"0.625rem",display:"flex",alignItems:"center",gap:"0.625rem"},children:[(0,j.jsx)(He,{size:16,color:"#34C759",style:{flexShrink:0}}),(0,j.jsx)("span",{style:{fontSize:"0.875rem",color:"#1D8348"},children:"Account created! Redirecting to login..."})]}),(0,j.jsxs)("form",{onSubmit:S,children:[w("Full Name",F((0,j.jsx)(dl,{size:16,color:a.colors.text.tertiary}),(0,j.jsx)("input",{type:"text",placeholder:"Your full name",value:o,onChange:A=>n(A.target.value),required:!0,disabled:f,style:{...T,paddingLeft:"2.5rem"},autoComplete:"name"}))),w("Email Address",F((0,j.jsx)(na,{size:16,color:a.colors.text.tertiary}),(0,j.jsx)("input",{type:"email",placeholder:"you@example.com",value:l,onChange:A=>s(A.target.value),required:!0,disabled:f,style:{...T,paddingLeft:"2.5rem"},autoComplete:"email"}))),(0,j.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.875rem",marginBottom:"1.125rem"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("label",{style:k,children:"Password"}),F((0,j.jsx)(oa,{size:16,color:a.colors.text.tertiary}),(0,j.jsx)("input",{type:"password",placeholder:"Min. 6 chars",value:i,onChange:A=>c(A.target.value),required:!0,disabled:f,style:{...T,paddingLeft:"2.5rem"},autoComplete:"new-password"}))]}),(0,j.jsxs)("div",{children:[(0,j.jsx)("label",{style:k,children:"Confirm Password"}),F((0,j.jsx)(oa,{size:16,color:a.colors.text.tertiary}),(0,j.jsx)("input",{type:"password",placeholder:"Repeat password",value:p,onChange:A=>m(A.target.value),required:!0,disabled:f,style:{...T,paddingLeft:"2.5rem"},autoComplete:"new-password"}))]})]}),(0,j.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"0.625rem",marginBottom:"1.75rem"},children:[(0,j.jsx)("input",{type:"checkbox",id:"terms",checked:h,onChange:A=>L(A.target.checked),disabled:f,style:{marginTop:"0.2rem",accentColor:a.colors.rust,width:"1rem",height:"1rem",flexShrink:0}}),(0,j.jsxs)("label",{htmlFor:"terms",style:{fontSize:"0.875rem",color:a.colors.text.secondary,cursor:"pointer",lineHeight:1.5},children:["I agree to the"," ",(0,j.jsx)("button",{type:"button",style:{background:"none",border:"none",cursor:"pointer",color:a.colors.rust,fontWeight:600,fontSize:"0.875rem",padding:0},children:"Terms of Service"})," ","and"," ",(0,j.jsx)("button",{type:"button",style:{background:"none",border:"none",cursor:"pointer",color:a.colors.rust,fontWeight:600,fontSize:"0.875rem",padding:0},children:"Privacy Policy"})]})]}),(0,j.jsx)("button",{type:"submit",disabled:f||!h,style:{width:"100%",padding:"0.8125rem 1.5rem",background:f||!h?a.colors.border.secondary:a.gradients.primary,color:"#fff",border:"none",borderRadius:"0.625rem",fontSize:"0.9375rem",fontWeight:600,cursor:f||!h?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",boxShadow:f||!h?"none":"0 4px 14px rgba(0,113,227,0.3)",transition:"all 0.2s"},children:f?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{style:{width:"1rem",height:"1rem",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}),"Creating Account..."]}):(0,j.jsxs)(j.Fragment,{children:["Create Account ",(0,j.jsx)(ra,{size:16})]})})]}),(0,j.jsxs)("p",{style:{textAlign:"center",marginTop:"1.5rem",fontSize:"0.875rem",color:a.colors.text.secondary},children:["Already have an account?"," ",(0,j.jsx)("button",{onClick:()=>e("dashboard"),style:{background:"none",border:"none",cursor:"pointer",color:a.colors.rust,fontWeight:600,fontSize:"0.875rem"},children:"Sign in"})]})]})}),(0,j.jsx)("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]})},Gh=kS;var Ct=q(X()),PS=()=>{let{theme:e,mode:t}=Ee(),[a,r]=(0,Bt.useState)(null),[o,n]=(0,Bt.useState)(!0),[l,s]=(0,Bt.useState)([]),[i,c]=(0,Bt.useState)("landing"),[p,m]=(0,Bt.useState)(!1),h=(0,Bt.useRef)(null),L=async(k=!1)=>{k||n(!0);try{let w=await Lc();if(console.log("API Response:",w),!w.data){console.warn("No data in response"),s([]);return}let F=typeof w.data=="string"?JSON.parse(w.data):w.data;console.log("Parsed response data:",F);let A=[];if(F.experiments){let C=F.experiments;A=Object.entries(C).map(([N,W])=>({id:W.id||0,name:N,status:(W.status||"PENDING").toUpperCase()}))}else if(F.pending||F.done){let C=(F.pending||[]).map((W,le)=>({id:W.id||le,name:W.name,status:"PENDING"})),N=(F.done||[]).map((W,le)=>({id:W.id||le+1e3,name:W.name,status:"DONE"}));A=[...C,...N]}console.log("Processed experiments array:",A),s(A),r(F)}catch(w){console.error("Failed to fetch experiments:",w),s([])}finally{k||n(!1)}},f=async(k,w)=>{try{let F=await Uh(k,w);if(F.error||F.status!==201){console.error("Failed to create experiment. Backend returned:",F),alert(`Failed to create experiment: ${F.error||"Unknown error"}`);return}await L()}catch(F){console.error("Failed to create experiment:",F),alert("Failed to create experiment due to a network or unexpected error.")}},b=async k=>{try{let w=l.find(F=>F.id===k);if(w){let F=w.status==="DONE"?"PENDING":"DONE",A=await Hh(w.name,F,k);if(A.error||A.status!==200){console.error("Failed to toggle experiment status. Backend returned:",A),alert(`Failed to update experiment status: ${A.error||"Unknown error"}`);return}await L()}}catch(w){console.error("Failed to toggle experiment:",w),alert("Failed to update experiment status due to a network or unexpected error.")}},E=async k=>{try{let w=l.find(F=>F.id===k);if(w){let F=await _h(w.name);if(F.error||F.status!==200){console.error("Failed to delete experiment. Backend returned:",F),alert(`Failed to delete experiment: ${F.error||"Unknown error"}`);return}await L()}}catch(w){console.error("Failed to delete experiment:",w),alert("Failed to delete experiment due to a network or unexpected error.")}},u=(k,w)=>{w&&(k==="landing"||k==="about"||k==="contact")?(h.current=w,c("landing"),window.location.hash="landing"):(c(k),window.location.hash=k)},d=k=>{m(!0),localStorage.setItem("blazecore_token",k),u("dashboard")},g=()=>{m(!1),localStorage.removeItem("blazecore_token"),localStorage.removeItem("blazecore_user"),localStorage.removeItem("blzc-session"),u("landing")};(0,Bt.useEffect)(()=>{let k=localStorage.getItem("blazecore_token");k&&m(!0);let w=window.location.hash.slice(1)||"landing";["landing","about","contact"].includes(w)?(c("landing"),w!=="landing"&&(h.current=`section-${w}`)):c(w),k&&w==="dashboard"&&L()},[]),(0,Bt.useEffect)(()=>{p&&i==="dashboard"&&L()},[p,i]),(0,Bt.useEffect)(()=>{if(!p||i!=="dashboard")return;let k=setInterval(()=>{L(!0)},5e3);return()=>clearInterval(k)},[p,i]);let S=i==="dashboard"&&p,T=()=>{if(o&&i==="dashboard")return(0,Ct.jsx)(Wd,{className:"min-h-screen flex items-center justify-center",children:(0,Ct.jsx)(qd,{size:"lg",text:"Loading Blazecore Dashboard..."})});switch(i){case"landing":return(0,Ct.jsx)(Rc,{onNavigate:u,scrollToSection:h.current||void 0,onScrollComplete:()=>{h.current=null}});case"login":return(0,Ct.jsx)(jh,{onNavigate:u,onLoginSuccess:d});case"signup":return(0,Ct.jsx)(Gh,{onNavigate:u,onSignupSuccess:()=>d("")});case"dashboard":return p?(0,Ct.jsx)(Oh,{experiments:l,onCreateExperiment:f,onToggleStatus:b,onDeleteExperiment:E,onRefresh:L}):(u("login"),null);default:return(0,Ct.jsx)(Rc,{onNavigate:u,scrollToSection:h.current||void 0,onScrollComplete:()=>{h.current=null}})}};return(0,Ct.jsxs)("div",{style:{minHeight:"100vh",backgroundColor:e.colors.background},children:[(0,Ct.jsx)("div",{style:{position:"fixed",inset:0,opacity:.3,pointerEvents:"none",zIndex:0,background:t==="light"?"radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,227,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(88,86,214,0.04) 0%, transparent 50%)":"radial-gradient(ellipse 80% 50% at 50% 0%, rgba(41,151,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(94,92,230,0.06) 0%, transparent 50%)"}}),!S&&(0,Ct.jsx)(qh,{onNavigate:u,currentPage:i,isAuthenticated:p,onLogout:g}),(0,Ct.jsx)("main",{style:{position:"relative",zIndex:1,paddingTop:S?0:"4rem",minHeight:"100vh"},children:T()})]})},$h=PS;var El=q(X()),RS=()=>(0,El.jsx)(Vd,{children:(0,El.jsx)(Rh,{children:(0,El.jsx)($h,{})})}),Xh=document.getElementById("root");Xh?Kh.default.createRoot(Xh).render((0,El.jsx)(RS,{})):console.error("Root element not found");
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/activity.mjs:
lucide-react/dist/esm/icons/arrow-left.mjs:
lucide-react/dist/esm/icons/arrow-right.mjs:
lucide-react/dist/esm/icons/battery.mjs:
lucide-react/dist/esm/icons/book-open.mjs:
lucide-react/dist/esm/icons/box.mjs:
lucide-react/dist/esm/icons/building-2.mjs:
lucide-react/dist/esm/icons/chart-column.mjs:
lucide-react/dist/esm/icons/chart-no-axes-column.mjs:
lucide-react/dist/esm/icons/check.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/chevron-left.mjs:
lucide-react/dist/esm/icons/chevron-right.mjs:
lucide-react/dist/esm/icons/circle-alert.mjs:
lucide-react/dist/esm/icons/circle-check.mjs:
lucide-react/dist/esm/icons/circle-check-big.mjs:
lucide-react/dist/esm/icons/circle-question-mark.mjs:
lucide-react/dist/esm/icons/circle-x.mjs:
lucide-react/dist/esm/icons/clock.mjs:
lucide-react/dist/esm/icons/code.mjs:
lucide-react/dist/esm/icons/copy.mjs:
lucide-react/dist/esm/icons/cpu.mjs:
lucide-react/dist/esm/icons/database.mjs:
lucide-react/dist/esm/icons/download.mjs:
lucide-react/dist/esm/icons/droplets.mjs:
lucide-react/dist/esm/icons/external-link.mjs:
lucide-react/dist/esm/icons/eye-off.mjs:
lucide-react/dist/esm/icons/eye.mjs:
lucide-react/dist/esm/icons/flask-conical.mjs:
lucide-react/dist/esm/icons/git-branch.mjs:
lucide-react/dist/esm/icons/git-fork.mjs:
lucide-react/dist/esm/icons/globe.mjs:
lucide-react/dist/esm/icons/hard-drive.mjs:
lucide-react/dist/esm/icons/house.mjs:
lucide-react/dist/esm/icons/info.mjs:
lucide-react/dist/esm/icons/layers.mjs:
lucide-react/dist/esm/icons/layout-dashboard.mjs:
lucide-react/dist/esm/icons/loader-circle.mjs:
lucide-react/dist/esm/icons/lock.mjs:
lucide-react/dist/esm/icons/log-in.mjs:
lucide-react/dist/esm/icons/log-out.mjs:
lucide-react/dist/esm/icons/mail.mjs:
lucide-react/dist/esm/icons/map-pin.mjs:
lucide-react/dist/esm/icons/menu.mjs:
lucide-react/dist/esm/icons/message-square.mjs:
lucide-react/dist/esm/icons/monitor.mjs:
lucide-react/dist/esm/icons/moon.mjs:
lucide-react/dist/esm/icons/network.mjs:
lucide-react/dist/esm/icons/pause.mjs:
lucide-react/dist/esm/icons/phone.mjs:
lucide-react/dist/esm/icons/play.mjs:
lucide-react/dist/esm/icons/plus.mjs:
lucide-react/dist/esm/icons/plug.mjs:
lucide-react/dist/esm/icons/radio.mjs:
lucide-react/dist/esm/icons/refresh-cw.mjs:
lucide-react/dist/esm/icons/search.mjs:
lucide-react/dist/esm/icons/send.mjs:
lucide-react/dist/esm/icons/settings.mjs:
lucide-react/dist/esm/icons/shield.mjs:
lucide-react/dist/esm/icons/star.mjs:
lucide-react/dist/esm/icons/sun.mjs:
lucide-react/dist/esm/icons/target.mjs:
lucide-react/dist/esm/icons/terminal.mjs:
lucide-react/dist/esm/icons/thermometer.mjs:
lucide-react/dist/esm/icons/trash-2.mjs:
lucide-react/dist/esm/icons/trending-up.mjs:
lucide-react/dist/esm/icons/upload.mjs:
lucide-react/dist/esm/icons/user-plus.mjs:
lucide-react/dist/esm/icons/user.mjs:
lucide-react/dist/esm/icons/users.mjs:
lucide-react/dist/esm/icons/wifi.mjs:
lucide-react/dist/esm/icons/wind.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/icons/zap.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.14.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=bundle.js.map
