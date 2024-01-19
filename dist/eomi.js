function e(e){return String.fromCharCode(588*e[0]+28*e[1]+e[2]+44032)}function i(e){var i=e.charCodeAt(e.length-1)-44032;return[i/588|0,i%588/28|0,i%28]}function t(e){var t=i(e)[2];return 0===t?"":"ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ"[t-1]}function o(e){return"가"<=e[0]&&e[0]<="힣"}var n,r=/*#__PURE__*/function(){function o(e,i,o){this.hada=void 0,this.hae=void 0,this.hani=void 0,this.hamyeon=void 0,this.batchim=void 0,this.hada=e.slice(0,-1),this.batchim=t(this.hada),this.hae=i||this.recoverHae(),this.hani=o?o.slice(0,-1):this.recoverHani(),this.hamyeon="ㄹ"===this.batchim?this.hada:this.hani}var n=o.prototype;return n._=function(e,i){if(e instanceof h){if(null!=i)throw Error("If the first argument is a proper Eomi, only one argument should be given.")}else e=new h(e,i);return e.after(this)},n.recoverHae=function(){var t=i(this.hada);if(!this.batchim){if(0===t[1]||4===t[1])return this.hada;if(18===t[1])return t[1]=4,this.hada.slice(0,-1)+e(t)}return this.hada+(0===t[1]||8===t[1]?"아":"어")},n.recoverHani=function(){var t=i(this.hada);if("ㄹ"===this.batchim)return t[2]=0,this.hada.slice(0,-1)+e(t);var o=this.hae.slice(-1);return-1!=="아어".indexOf(o)?this.hae.slice(0,-1)+(this.batchim&&"으"):-1!=="와워".indexOf(o)?this.hae.slice(0,-1)+"우":"ㅎ"===this.batchim?(t[2]=0,this.hada.slice(0,-1)+e(t)):this.hada},n.valueOf=function(){return this.hada+"다"},o}();!function(e){e.DIRECT="",e.A_EO="(아/어)",e.EU="(으)"}(n||(n={}));var a=/*#__PURE__*/function(){function r(e){this.eomiType=void 0,this.body=void 0,this.dropRieul=void 0;var i=new Error("Cannot parse given string "+e+" to EomiUnit");"-"===e[0]&&(e=e.slice(1));var r=e.match(/^[(]?([아-앟어-엏])(?:[/]([아-앟어-엏]))?[)]?(.*)$/),a=e.match(/^[(]?([으-읗])[)]?(.*)$/),h=e.match(/^([ㅅㅆ].*)$/),s=e.match(/^([ㄱ-ㅎ].*)$/);if(null!==r){var u=r[1],c=r[2],d=r[3];if(c&&t(u)!==t(c))throw i;this.body=t(u)+d,this.eomiType=n.A_EO}else if(null!==a){var f=a[2];this.body=t(a[1])+f,this.eomiType=n.EU}else null!==h?(this.body=h[1],this.eomiType=n.A_EO):null!==s?(this.body=s[1],this.eomiType=n.EU):(this.body=e,this.eomiType=n.DIRECT);if(o(this.body)){var l=(this.body.charCodeAt(0)-44032)/588|0;this.dropRieul=-1!==[2,9,11].indexOf(l)}else this.dropRieul=-1!=="ㄴㄹㅂ".indexOf(this.body[0])}var a=r.prototype;return a.after=function(r){var a=r.hada;return this.eomiType===n.A_EO?a=r.hae:this.eomiType===n.EU?a=this.dropRieul?r.hani:r.hamyeon:this.dropRieul&&"ㄹ"===r.batchim&&(a=r.hani),function(n,r){var a=new Error("Cannot concatenate '"+n+"' and '"+r+"'");if(!n||!r||o(r))return n+r;var h=[,,"ㄱㄱ","ㄱㅅ",,"ㄴㅈ","ㄴㅎ",,,"ㄹㄱ","ㄹㅁ","ㄹㅂ","ㄹㅅ","ㄹㅌ","ㄹㅍ","ㄹㅎ",,,"ㅂㅅ",,"ㅅㅅ"].indexOf(t(n)+r[0]);if(-1===h){if(t(n))throw a;if(0===(h="ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ".indexOf(r[0])+1))throw a}var s=i(n);return s[2]=h,n.slice(0,-1)+e(s)+r.slice(1)}(a,this.body)},a.valueOf=function(){return"-"+this.eomiType+this.body},r}(),h=/*#__PURE__*/function(){function e(e,i){this.eomi=void 0,this.eomiAfterBatchim=void 0,"string"==typeof e&&(e=new a(e)),"string"==typeof i&&(i=new a(i)),this.eomi=e,this.eomiAfterBatchim=i}var i=e.prototype;return i.after=function(e){var i=this.eomi;return null!=this.eomiAfterBatchim&&e.batchim&&("ㄹ"===e.batchim&&i.dropRieul||(i=this.eomiAfterBatchim)),i.after(e)},i.valueOf=function(){var e=this.eomiAfterBatchim;return this.eomi+(null!=e?"/"+e:"")},e}();function s(e,i){(null==i||i>e.length)&&(i=e.length);for(var t=0,o=new Array(i);t<i;t++)o[t]=e[t];return o}function u(e,i){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(t)return(t=t.call(e)).next.bind(t);if(Array.isArray(e)||(t=function(e,i){if(e){if("string"==typeof e)return s(e,i);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?s(e,i):void 0}}(e))||i&&e&&"number"==typeof e.length){t&&(e=t);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e){if(!e.children)return{values:e.values};for(var i,t=new Map,o=u(e.children.entries());!(i=o()).done;){var n=i.value;t.set(n[0],c(n[1]))}return{values:e.values,children:t}}var d=/*#__PURE__*/function(){function e(){this.root=void 0,this.root={}}var i=e.prototype;return i.clone=function(){var i=new e;return i.root=c(this.root),i},i.get=function(e){for(var i,t=this.root,o=u(e);!(i=o()).done;){if(!t.children)return[];var n=t.children.get(i.value);if(!n)return[];t=n}return t.values||[]},i.set=function(e,i){for(var t,o=this.root,n=u(e);!(t=n()).done;){var r=t.value;o.children||(o.children=new Map);var a=o.children.get(r);a||o.children.set(r,a={}),o=a}o.values?o.values.push(i):o.values=[i]},i.allPrefixes=function(e){for(var i=[],t=this.root,o=0;o<e.length&&t.children;o++){var n=t.children.get(e[o]);if(!n)break;n.values&&n.values.length&&i.push([n.values,e.slice(o+1)]),t=n}return i},e}();function f(e){if(e<"ㄱ"||"ㅎ"<e)return e;var i=["ㄸ","ㅃ","ㅉ"];if(-1!==i.indexOf(e[0]))return e;var t=e.charCodeAt(0)-"ㄱ".charCodeAt(0);return i.forEach(function(i){return t-=e>i?1:0}),String.fromCharCode(t+4520)}function l(e){return e.split("").map(f).join("").normalize("NFD")}exports.Analyzer=/*#__PURE__*/function(){function e(i,t){var o=this;void 0===t&&(t=[]),this.yongeons=void 0,this.eomis=void 0,i instanceof e?(this.yongeons=i.yongeons.clone(),this.eomis=new Map(i.eomis)):(this.yongeons=new d,i.forEach(function(e){return o.addYongeon(e)}),this.eomis=new Map,t.forEach(function(e){return o.addEomi(e)}))}var i=e.prototype;return i.clone=function(){return new e(this)},i.addYongeon=function(e){var i="ㄹ"!==e.batchim&&void 0;this.yongeons.set(l(e.hada),{yongeon:e,eomiType:"",dropRieul:i}),this.yongeons.set(l(e.hae),{yongeon:e,eomiType:"(아/어)"}),this.yongeons.set(l(e.hamyeon),{yongeon:e,eomiType:"(으)",dropRieul:i}),"ㄹ"===e.batchim&&(this.yongeons.set(l(e.hani),{yongeon:e,eomiType:"",dropRieul:!0}),this.yongeons.set(l(e.hani),{yongeon:e,eomiType:"(으)",dropRieul:!0}))},i.addEomi=function(e){this.addEomiUnit(l(e.eomi.body),{eomi:e,eomiType:e.eomi.eomiType,dropRieul:e.eomi.dropRieul}),e.eomiAfterBatchim&&this.addEomiUnit(l(e.eomiAfterBatchim.body),{eomi:e,eomiType:e.eomiAfterBatchim.eomiType,dropRieul:e.eomiAfterBatchim.dropRieul})},i.addEomiUnit=function(e,i){var t=this.eomis.get(e);t?t.push(i):this.eomis.set(e,[i])},i.analyze=function(e){for(var i,t=[],o=u(this.yongeons.allPrefixes(l(e)));!(i=o()).done;)for(var n,r=i.value,a=r[0],h=u(this.eomis.get(r[1])||[]);!(n=h()).done;)for(var s,c=n.value,d=c.eomi,f=c.eomiType,m=c.dropRieul,v=u(a);!(s=v()).done;){var y=s.value;f===y.eomiType&&(null!=y.dropRieul&&m!==y.dropRieul||t.push([y.yongeon,d]))}return t},e}(),exports.E=h,exports.Eomi=h,exports.V=r,exports.Yongeon=r;
//# sourceMappingURL=eomi.js.map
