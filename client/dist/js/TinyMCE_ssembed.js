<<<<<<< HEAD
!function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=180)}({0:function(e,t){e.exports=React},1:function(e,t){e.exports=i18n},155:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){var r=e.config.sections.find(function(e){return e.name===_}),n=t.fileAttributes?t.fileAttributes.Url:"",i=r.form.remoteEditForm.schemaUrl,o=n&&i+"/?embedurl="+encodeURIComponent(n),a=r.form.remoteCreateForm.schemaUrl;return{sectionConfig:r,schemaUrl:o||a,targetUrl:n}}function l(e){return{actions:{schema:(0,m.bindActionCreators)(w,e)}}}Object.defineProperty(t,"__esModule",{value:!0}),t.InsertEmbedModal=void 0;var d=function(){function e(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(1),f=n(c),p=r(0),h=n(p),m=r(6),v=r(3),b=r(26),g=n(b),y=r(56),w=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(y),_="SilverStripe\\AssetAdmin\\Controller\\AssetAdmin",P=function(e){function t(e){i(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.handleSubmit=r.handleSubmit.bind(r),r}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.setOverrides(this.props)}},{key:"componentWillReceiveProps",value:function(e){e.show&&!this.props.show&&this.setOverrides(e)}},{key:"componentWillUnmount",value:function(){this.clearOverrides()}},{key:"setOverrides",value:function(e){if(this.props.schemaUrl!==e.schemaUrl&&this.clearOverrides(),e.schemaUrl){var t=Object.assign({},e.fileAttributes);delete t.ID;var r={fields:Object.entries(t).map(function(e){var t=d(e,2);return{name:t[0],value:t[1]}})};this.props.actions.schema.setSchemaStateOverrides(e.schemaUrl,r)}}},{key:"getModalProps",value:function(){var e=Object.assign({handleSubmit:this.handleSubmit,onLoadingError:this.handleLoadingError,showErrorMessage:!0,responseClassBad:"alert alert-danger",identifier:"AssetAdmin.InsertEmbedModal"},this.props,{className:"insert-embed-modal "+this.props.className,bsSize:"lg",handleHide:this.props.onHide,title:this.props.targetUrl?f.default._t("AssetAdmin.EditTitle","Media from the web"):f.default._t("AssetAdmin.CreateTitle","Insert new media from the web")});return delete e.onHide,delete e.sectionConfig,delete e.onInsert,delete e.fileAttributes,e}},{key:"clearOverrides",value:function(){this.props.actions.schema.setSchemaStateOverrides(this.props.schemaUrl,null)}},{key:"handleLoadingError",value:function(e){"function"==typeof this.props.onLoadingError&&this.props.onLoadingError(e)}},{key:"handleSubmit",value:function(e,t){switch(t){case"action_addmedia":this.props.onCreate(e);break;case"action_insertmedia":this.props.onInsert(e);break;case"action_cancel":this.props.onHide()}return Promise.resolve()}},{key:"render",value:function(){return h.default.createElement(g.default,this.getModalProps())}}]),t}(p.Component);P.propTypes={sectionConfig:p.PropTypes.shape({url:p.PropTypes.string,form:p.PropTypes.object}),show:p.PropTypes.bool,onInsert:p.PropTypes.func.isRequired,onCreate:p.PropTypes.func.isRequired,fileAttributes:p.PropTypes.shape({Url:p.PropTypes.string,CaptionText:p.PropTypes.string,PreviewUrl:p.PropTypes.string,Placement:p.PropTypes.string,Width:p.PropTypes.number,Height:p.PropTypes.number}),onHide:p.PropTypes.func.isRequired,className:p.PropTypes.string,actions:p.PropTypes.object,schemaUrl:p.PropTypes.string.isRequired,targetUrl:p.PropTypes.string,onLoadingError:p.PropTypes.func},P.defaultProps={className:"",fileAttributes:{}},t.InsertEmbedModal=P,t.default=(0,v.connect)(s,l)(P)},180:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=function(){function e(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=r(8),s=n(a),l=r(0),d=n(l),u=r(5),c=n(u),f=r(4),p=r(7),h=r(155),m=n(h),v=r(1),b=n(v),g=(0,p.provideInjector)(m.default),y='div[data-shortcode="embed"]';!function(){var e={init:function(e){var t=b.default._t("AssetAdmin.INSERT_VIA_URL","Insert media via URL");e.addButton("ssembed",{icon:"media",title:t,cmd:"ssembed"}),e.addMenuItem("ssembed",{icon:"media",text:t,cmd:"ssembed"}),e.addCommand("ssembed",function(){(0,s.default)("#"+e.id).entwine("ss").openEmbedDialog()}),e.on("BeforeExecCommand",function(t){var r=t.command,n=t.ui,i=t.value;"mceAdvMedia"!==r&&"mceAdvMedia"!==r||(t.preventDefault(),e.execCommand("ssembed",n,i))}),e.on("SaveContent",function(e){var t=(0,s.default)("<div>"+e.content+"</div>"),r=function(e){return Object.entries(e).map(function(e){var t=o(e,2),r=t[0],n=t[1];return n?r+'="'+n+'"':null}).filter(function(e){return null!==e}).join(" ")};t.find(y).each(function(){var e=(0,s.default)(this),t=e.find("img.placeholder");if(0===t.length)return e.removeAttr("data-url"),void e.removeAttr("data-shortcode");var n=e.find(".caption").text(),i=parseInt(t.attr("width"),10),o=parseInt(t.attr("height"),10),a=e.data("url"),l={url:a,thumbnail:t.prop("src"),class:e.prop("class"),width:isNaN(i)?null:i,height:isNaN(o)?null:o,caption:n},d="[embed "+r(l)+"]"+a+"[/embed]";e.replaceWith(d)}),e.content=t.html()}),e.on("BeforeSetContent",function(e){for(var t=e.content,r=/\[embed(.*?)](.+?)\[\/\s*embed\s*]/gi,n=r.exec(t);n;){var o=function(e){return e.match(/([^\s\/'"=,]+)\s*=\s*(('([^']+)')|("([^"]+)")|([^\s,\]]+))/g).reduce(function(e,t){var r=t.match(/^([^\s\/'"=,]+)\s*=\s*(?:(?:'([^']+)')|(?:"([^"]+)")|(?:[^\s,\]]+))$/),n=r[1],o=r[2]||r[3]||r[4];return Object.assign({},e,i({},n,o))},{})}(n[1]),a=(0,s.default)("<div/>").attr("data-url",o.url||n[2]).attr("data-shortcode","embed").addClass(o.class).addClass("ss-htmleditorfield-file embed"),l=(0,s.default)("<img />").attr("src",o.thumbnail).addClass("placeholder");if(o.width&&(a.width(o.width),l.attr("width",o.width)),o.height&&l.attr("height",o.height),a.append(l),o.caption){var d=(0,s.default)("<p />").addClass("caption").text(o.caption);a.append(d)}t=t.replace(n[0],(0,s.default)("<div/>").append(a).html()),n=r.exec(t)}e.content=t})}};tinymce.PluginManager.add("ssembed",function(t){return e.init(t)})}(),s.default.entwine("ss",function(e){e("#insert-embed-react__dialog-wrapper").entwine({Element:null,Data:{},onunmatch:function(){this._clearModal()},_clearModal:function(){c.default.unmountComponentAtNode(this[0])},open:function(){this._renderModal(!0)},close:function(){this.setData({}),this._renderModal(!1)},_renderModal:function(e){var t=this,r=function(){return t.close()},n=function(){return t._handleInsert.apply(t,arguments)},i=function(){return t._handleCreate.apply(t,arguments)},o=function(){return t._handleLoadingError.apply(t,arguments)},a=window.ss.store,s=window.ss.apolloClient,l=this.getOriginalAttributes();c.default.render(d.default.createElement(f.ApolloProvider,{store:a,client:s},d.default.createElement(g,{show:e,onCreate:i,onInsert:n,onHide:r,onLoadingError:o,bodyClassName:"modal__dialog modal__dialog--scrollable",className:"insert-embed-react__dialog-wrapper",fileAttributes:l})),this[0])},_handleLoadingError:function(){this.setData({}),this.open()},_handleInsert:function(e){var t=this.getData();this.setData(Object.assign({Url:t.Url},e)),this.insertRemote(),this.close()},_handleCreate:function(e){this.setData(Object.assign({},this.getData(),e)),this.open()},getOriginalAttributes:function(){var t=this.getData(),r=this.getElement();if(!r)return t;var n=e(r.getEditor().getSelectedNode());if(!n.length)return t;var i=n.closest(y).add(n.filter(y));if(!i.length)return t;var o=i.find("img.placeholder");if(0===o.length)return t;var a=i.find(".caption").text(),s=parseInt(o.width(),10),l=parseInt(o.height(),10);return{Url:i.data("url")||t.Url,CaptionText:a,PreviewUrl:o.attr("src"),Width:isNaN(s)?null:s,Height:isNaN(l)?null:l,Placement:this.findPosition(i.prop("class"))}},findPosition:function(e){var t=["leftAlone","center","rightAlone","left","right"];if("string"!=typeof e)return"";var r=e.split(" ");return t.find(function(e){return r.indexOf(e)>-1})},insertRemote:function(){var t=this.getElement();if(!t)return!1;var r=t.getEditor();if(!r)return!1;var n=this.getData(),i=(0,s.default)("<div/>").attr("data-url",n.Url).attr("data-shortcode","embed").addClass(n.Placement).addClass("ss-htmleditorfield-file embed"),o=(0,s.default)("<img />").attr("src",n.PreviewUrl).addClass("placeholder");if(n.Width&&(i.width(n.Width),o.attr("width",n.Width)),n.Height&&o.attr("height",n.Height),i.append(o),n.CaptionText){var a=(0,s.default)("<p />").addClass("caption").text(n.CaptionText);i.append(a)}var l=e(r.getSelectedNode()),d=e(null);return l.length&&(d=l.filter(y),0===d.length&&(d=l.closest(y)),0===d.length&&(d=l.filter("img.placeholder"))),d.length?d.replaceWith(i):(r.repaint(),r.insertContent(e("<div />").append(i.clone()).html(),{skip_undo:1})),r.addUndo(),r.repaint(),!0}})})},26:function(e,t){e.exports=FormBuilderModal},3:function(e,t){e.exports=ReactRedux},4:function(e,t){e.exports=ReactApollo},5:function(e,t){e.exports=ReactDom},56:function(e,t){e.exports=SchemaActions},6:function(e,t){e.exports=Redux},7:function(e,t){e.exports=Injector},8:function(e,t){e.exports=jQuery}});
=======
!function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=181)}({0:function(e,t){e.exports=React},1:function(e,t){e.exports=i18n},156:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){var r=e.config.sections.find(function(e){return e.name===_}),n=t.fileAttributes?t.fileAttributes.Url:"",i=r.form.remoteEditForm.schemaUrl,o=n&&i+"/?embedurl="+encodeURIComponent(n),a=r.form.remoteCreateForm.schemaUrl;return{sectionConfig:r,schemaUrl:o||a,targetUrl:n}}function l(e){return{actions:{schema:(0,m.bindActionCreators)(w,e)}}}Object.defineProperty(t,"__esModule",{value:!0}),t.InsertEmbedModal=void 0;var d=function(){function e(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(1),f=n(c),p=r(0),h=n(p),m=r(6),v=r(4),b=r(26),g=n(b),y=r(56),w=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(y),_="SilverStripe\\AssetAdmin\\Controller\\AssetAdmin",P=function(e){function t(e){i(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.handleSubmit=r.handleSubmit.bind(r),r}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.setOverrides(this.props)}},{key:"componentWillReceiveProps",value:function(e){e.show&&!this.props.show&&this.setOverrides(e)}},{key:"componentWillUnmount",value:function(){this.clearOverrides()}},{key:"setOverrides",value:function(e){if(this.props.schemaUrl!==e.schemaUrl&&this.clearOverrides(),e.schemaUrl){var t=Object.assign({},e.fileAttributes);delete t.ID;var r={fields:Object.entries(t).map(function(e){var t=d(e,2);return{name:t[0],value:t[1]}})};this.props.actions.schema.setSchemaStateOverrides(e.schemaUrl,r)}}},{key:"getModalProps",value:function(){var e=Object.assign({handleSubmit:this.handleSubmit,onLoadingError:this.handleLoadingError,showErrorMessage:!0,responseClassBad:"alert alert-danger",identifier:"AssetAdmin.InsertEmbedModal"},this.props,{className:"insert-embed-modal "+this.props.className,bsSize:"lg",handleHide:this.props.onHide,title:this.props.targetUrl?f.default._t("AssetAdmin.EditTitle","Media from the web"):f.default._t("AssetAdmin.CreateTitle","Insert new media from the web")});return delete e.onHide,delete e.sectionConfig,delete e.onInsert,delete e.fileAttributes,e}},{key:"clearOverrides",value:function(){this.props.actions.schema.setSchemaStateOverrides(this.props.schemaUrl,null)}},{key:"handleLoadingError",value:function(e){"function"==typeof this.props.onLoadingError&&this.props.onLoadingError(e)}},{key:"handleSubmit",value:function(e,t){switch(t){case"action_addmedia":this.props.onCreate(e);break;case"action_insertmedia":this.props.onInsert(e);break;case"action_cancel":this.props.onHide()}return Promise.resolve()}},{key:"render",value:function(){return h.default.createElement(g.default,this.getModalProps())}}]),t}(p.Component);P.propTypes={sectionConfig:p.PropTypes.shape({url:p.PropTypes.string,form:p.PropTypes.object}),show:p.PropTypes.bool,onInsert:p.PropTypes.func.isRequired,onCreate:p.PropTypes.func.isRequired,fileAttributes:p.PropTypes.shape({Url:p.PropTypes.string,CaptionText:p.PropTypes.string,PreviewUrl:p.PropTypes.string,Placement:p.PropTypes.string,Width:p.PropTypes.number,Height:p.PropTypes.number}),onHide:p.PropTypes.func.isRequired,className:p.PropTypes.string,actions:p.PropTypes.object,schemaUrl:p.PropTypes.string.isRequired,targetUrl:p.PropTypes.string,onLoadingError:p.PropTypes.func},P.defaultProps={className:"",fileAttributes:{}},t.InsertEmbedModal=P,t.default=(0,v.connect)(s,l)(P)},181:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=function(){function e(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=r(8),s=n(a),l=r(0),d=n(l),u=r(5),c=n(u),f=r(3),p=r(7),h=r(156),m=n(h),v=r(1),b=n(v),g=(0,p.provideInjector)(m.default),y='div[data-shortcode="embed"]';!function(){var e={init:function(e){var t=b.default._t("AssetAdmin.INSERT_VIA_URL","Insert media via URL");e.addButton("ssembed",{icon:"media",title:t,cmd:"ssembed"}),e.addMenuItem("ssembed",{icon:"media",text:t,cmd:"ssembed"}),e.addCommand("ssembed",function(){(0,s.default)("#"+e.id).entwine("ss").openEmbedDialog()}),e.on("BeforeExecCommand",function(t){var r=t.command,n=t.ui,i=t.value;"mceAdvMedia"!==r&&"mceAdvMedia"!==r||(t.preventDefault(),e.execCommand("ssembed",n,i))}),e.on("SaveContent",function(e){var t=(0,s.default)("<div>"+e.content+"</div>"),r=function(e){return Object.entries(e).map(function(e){var t=o(e,2),r=t[0],n=t[1];return n?r+'="'+n+'"':null}).filter(function(e){return null!==e}).join(" ")};t.find(y).each(function(){var e=(0,s.default)(this),t=e.find("img.placeholder");if(0===t.length)return e.removeAttr("data-url"),void e.removeAttr("data-shortcode");var n=e.find(".caption").text(),i=parseInt(t.attr("width"),10),o=parseInt(t.attr("height"),10),a=e.data("url"),l={url:a,thumbnail:t.prop("src"),class:e.prop("class"),width:isNaN(i)?null:i,height:isNaN(o)?null:o,caption:n},d="[embed "+r(l)+"]"+a+"[/embed]";e.replaceWith(d)}),e.content=t.html()}),e.on("BeforeSetContent",function(e){for(var t=e.content,r=/\[embed(.*?)](.+?)\[\/\s*embed\s*]/gi,n=r.exec(t);n;){var o=function(e){return e.match(/([^\s\/'"=,]+)\s*=\s*(('([^']+)')|("([^"]+)")|([^\s,\]]+))/g).reduce(function(e,t){var r=t.match(/^([^\s\/'"=,]+)\s*=\s*(?:(?:'([^']+)')|(?:"([^"]+)")|(?:[^\s,\]]+))$/),n=r[1],o=r[2]||r[3]||r[4];return Object.assign({},e,i({},n,o))},{})}(n[1]),a=(0,s.default)("<div/>").attr("data-url",o.url||n[2]).attr("data-shortcode","embed").addClass(o.class).addClass("ss-htmleditorfield-file embed"),l=(0,s.default)("<img />").attr("src",o.thumbnail).addClass("placeholder");if(o.width&&(a.width(o.width),l.attr("width",o.width)),o.height&&l.attr("height",o.height),a.append(l),o.caption){var d=(0,s.default)("<p />").addClass("caption").text(o.caption);a.append(d)}t=t.replace(n[0],(0,s.default)("<div/>").append(a).html()),n=r.exec(t)}e.content=t})}};tinymce.PluginManager.add("ssembed",function(t){return e.init(t)})}(),s.default.entwine("ss",function(e){e("#insert-embed-react__dialog-wrapper").entwine({Element:null,Data:{},onunmatch:function(){this._clearModal()},_clearModal:function(){c.default.unmountComponentAtNode(this[0])},open:function(){this._renderModal(!0)},close:function(){this.setData({}),this._renderModal(!1)},_renderModal:function(e){var t=this,r=function(){return t.close()},n=function(){return t._handleInsert.apply(t,arguments)},i=function(){return t._handleCreate.apply(t,arguments)},o=function(){return t._handleLoadingError.apply(t,arguments)},a=window.ss.store,s=window.ss.apolloClient,l=this.getOriginalAttributes();c.default.render(d.default.createElement(f.ApolloProvider,{store:a,client:s},d.default.createElement(g,{show:e,onCreate:i,onInsert:n,onHide:r,onLoadingError:o,bodyClassName:"modal__dialog fill-height",className:"insert-embed-react__dialog-wrapper",fileAttributes:l})),this[0])},_handleLoadingError:function(){this.setData({}),this.open()},_handleInsert:function(e){var t=this.getData();this.setData(Object.assign({Url:t.Url},e)),this.insertRemote(),this.close()},_handleCreate:function(e){this.setData(Object.assign({},this.getData(),e)),this.open()},getOriginalAttributes:function(){var t=this.getData(),r=this.getElement();if(!r)return t;var n=e(r.getEditor().getSelectedNode());if(!n.length)return t;var i=n.closest(y).add(n.filter(y));if(!i.length)return t;var o=i.find("img.placeholder");if(0===o.length)return t;var a=i.find(".caption").text(),s=parseInt(o.width(),10),l=parseInt(o.height(),10);return{Url:i.data("url")||t.Url,CaptionText:a,PreviewUrl:o.attr("src"),Width:isNaN(s)?null:s,Height:isNaN(l)?null:l,Placement:this.findPosition(i.prop("class"))}},findPosition:function(e){var t=["leftAlone","center","rightAlone","left","right"];if("string"!=typeof e)return"";var r=e.split(" ");return t.find(function(e){return r.indexOf(e)>-1})},insertRemote:function(){var t=this.getElement();if(!t)return!1;var r=t.getEditor();if(!r)return!1;var n=this.getData(),i=(0,s.default)("<div/>").attr("data-url",n.Url).attr("data-shortcode","embed").addClass(n.Placement).addClass("ss-htmleditorfield-file embed"),o=(0,s.default)("<img />").attr("src",n.PreviewUrl).addClass("placeholder");if(n.Width&&(i.width(n.Width),o.attr("width",n.Width)),n.Height&&o.attr("height",n.Height),i.append(o),n.CaptionText){var a=(0,s.default)("<p />").addClass("caption").text(n.CaptionText);i.append(a)}var l=e(r.getSelectedNode()),d=e(null);return l.length&&(d=l.filter(y),0===d.length&&(d=l.closest(y)),0===d.length&&(d=l.filter("img.placeholder"))),d.length?d.replaceWith(i):(r.repaint(),r.insertContent(e("<div />").append(i.clone()).html(),{skip_undo:1})),r.addUndo(),r.repaint(),!0}})})},26:function(e,t){e.exports=FormBuilderModal},3:function(e,t){e.exports=ReactApollo},4:function(e,t){e.exports=ReactRedux},5:function(e,t){e.exports=ReactDom},56:function(e,t){e.exports=SchemaActions},6:function(e,t){e.exports=Redux},7:function(e,t){e.exports=Injector},8:function(e,t){e.exports=jQuery}});
>>>>>>> New bulk publish/unpublish feature
