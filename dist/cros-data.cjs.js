"use strict";var Client=function(){function t(t){var e=this;this.parent=window,this.origin=new URL(t).origin,this.sendQueue=[],this.messageId=0,this.cbs={},this.child=null,this.createIframe(t),window.addEventListener("message",(function(t){if("string"==typeof t.data&&""!==t.data){var s=JSON.parse(t.data);s.status?t.origin===e.origin&&e.cbs[s.messageId].reslove(s.data):e.cbs[s.messageId].reject(s.error)}}))}return t.prototype.createIframe=function(t){var e=this,s=document.createElement("iframe");s.style.cssText="width:1px;height:1px;border:0;position:absolute;left:-9999px;top:-9999px;",s.setAttribute("src",t),document.body.appendChild(s),s.onload=function(){e.child=s.contentWindow,e.sendQueue.forEach((function(t){return t()}))}},t.prototype.postHanle=function(t,e,s){var a=this,i={messageId:this.messageId,action:t,origin:new URL(location.href).origin,data:e?{key:e,val:s}:void 0};return this.child?this.child.postMessage(JSON.stringify(i),this.origin):this.sendQueue.push((function(){a.child.postMessage(JSON.stringify(i),a.origin)})),new Promise((function(t,e){a.cbs[a.messageId]={reslove:t,reject:e},a.messageId++}))},t.prototype.set=function(t,e){return this.postHanle("set",t,e)},t.prototype.get=function(t,e){return this.postHanle("get",t,e)},t.prototype.del=function(t,e){return this.postHanle("del",t,e)},t.prototype.clear=function(){return this.postHanle("clear")},t}(),Hub=function(){function t(t){var e=this;this.Permissions=[],this.Permissions=t,window.addEventListener("message",(function(t){if("string"==typeof t.data&&""!==t.data){var s=JSON.parse(t.data);if(s.origin===t.origin){s.data;var a=s.action;if(e.permitted(s)){i=e[a].apply(e,[s]);window.top.postMessage(JSON.stringify(i),t.origin)}else{var i={messageId:s.messageId,data:{},status:!1,error:"没有权限"};window.top.postMessage(JSON.stringify(i),t.origin)}}}}))}return t.prototype.permitted=function(t){for(var e=0;e<this.Permissions.length;e++){var s=this.Permissions[e];if(s.origin.test(t.origin))return s.allow.indexOf(t.action)>-1}return!1},t.prototype.set=function(t){var e;return window.localStorage.setItem(t.data.key,t.data.val),{messageId:t.messageId,data:(e={},e[t.data.key]=t.data.val,e),status:!0}},t.prototype.get=function(t){var e;return window.localStorage.getItem(t.data.key),{messageId:t.messageId,data:(e={},e[t.data.key]=t.data.val,e),status:!0}},t.prototype.del=function(t){var e;return window.localStorage.removeItem(t.data.key),{messageId:t.messageId,data:(e={},e[t.data.key]=t.data.val,e),status:!0}},t.prototype.clear=function(t){return window.localStorage.clear(),{messageId:t.messageId,status:!0}},t}(),crosData={Client:Client,Hub:Hub,_VERSION:"1.0.0"};module.exports=crosData;
