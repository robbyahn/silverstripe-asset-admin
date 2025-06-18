/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/components/InsertEmbedModal/InsertEmbedModal.js":
/*!********************************************************************!*\
  !*** ./client/src/components/InsertEmbedModal/InsertEmbedModal.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _FormBuilderModal = _interopRequireDefault(__webpack_require__(/*! components/FormBuilderModal/FormBuilderModal */ "components/FormBuilderModal/FormBuilderModal"));
var schemaActions = _interopRequireWildcard(__webpack_require__(/*! state/schema/SchemaActions */ "state/schema/SchemaActions"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _urls = __webpack_require__(/*! lib/urls */ "lib/urls");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const sectionConfigKey = 'SilverStripe\\AssetAdmin\\Controller\\AssetAdmin';
class InsertEmbedModal extends _react.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setOverrides(this.props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.setOverrides(this.props);
    }
  }
  componentWillUnmount() {
    this.clearOverrides();
  }
  setOverrides(props) {
    if (this.props.schemaUrl !== props.schemaUrl) {
      this.clearOverrides();
    }
    if (props.schemaUrl) {
      const attrs = Object.assign({}, props.fileAttributes);
      delete attrs.ID;
      const overrides = {
        fields: Object.entries(attrs).map(field => {
          const [name, value] = field;
          return {
            name,
            value
          };
        })
      };
      this.props.actions.schema.setSchemaStateOverrides(props.schemaUrl, overrides);
    }
  }
  getModalProps() {
    const props = Object.assign({
      onSubmit: this.handleSubmit,
      onLoadingError: this.handleLoadingError,
      showErrorMessage: true,
      responseClassBad: 'alert alert-danger',
      identifier: 'AssetAdmin.InsertEmbedModal'
    }, this.props, {
      className: `insert-embed-modal ${this.props.className}`,
      size: 'lg',
      onClosed: this.props.onClosed,
      title: this.props.targetUrl ? _i18n.default._t('AssetAdmin.EditTitle', 'Media from the web') : _i18n.default._t('AssetAdmin.CreateTitle', 'Insert new media from the web')
    });
    delete props.sectionConfig;
    delete props.onInsert;
    delete props.fileAttributes;
    return props;
  }
  clearOverrides() {
    this.props.actions.schema.setSchemaStateOverrides(this.props.schemaUrl, null);
  }
  handleLoadingError(error) {
    if (typeof this.props.onLoadingError === 'function') {
      this.props.onLoadingError(error);
    }
  }
  handleSubmit(data, action) {
    switch (action) {
      case 'action_addmedia':
        {
          this.props.onCreate(data);
          break;
        }
      case 'action_insertmedia':
        {
          this.props.onInsert(data);
          break;
        }
      case 'action_cancel':
        {
          this.props.onClosed();
          break;
        }
      default:
        {}
    }
    return Promise.resolve();
  }
  render() {
    const {
      FormBuilderModalComponent
    } = this.props;
    return _react.default.createElement(FormBuilderModalComponent, this.getModalProps());
  }
}
exports.Component = InsertEmbedModal;
InsertEmbedModal.propTypes = {
  sectionConfig: _propTypes.default.shape({
    url: _propTypes.default.string,
    form: _propTypes.default.object
  }),
  isOpen: _propTypes.default.bool,
  onInsert: _propTypes.default.func.isRequired,
  onCreate: _propTypes.default.func.isRequired,
  fileAttributes: _propTypes.default.shape({
    Url: _propTypes.default.string,
    CaptionText: _propTypes.default.string,
    PreviewUrl: _propTypes.default.string,
    Placement: _propTypes.default.string,
    Width: _propTypes.default.number,
    Height: _propTypes.default.number
  }),
  onClosed: _propTypes.default.func.isRequired,
  className: _propTypes.default.string,
  actions: _propTypes.default.object,
  schemaUrl: _propTypes.default.string.isRequired,
  targetUrl: _propTypes.default.string,
  onLoadingError: _propTypes.default.func,
  FormBuilderModalComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
};
InsertEmbedModal.defaultProps = {
  className: '',
  fileAttributes: {},
  FormBuilderModalComponent: _FormBuilderModal.default
};
function mapStateToProps(state, ownProps) {
  const sectionConfig = state.config.sections.find(section => section.name === sectionConfigKey);
  const targetUrl = ownProps.fileAttributes ? ownProps.fileAttributes.Url : '';
  const baseEditUrl = sectionConfig.form.remoteEditForm.schemaUrl;
  const editUrl = targetUrl && (0, _urls.joinUrlPaths)(baseEditUrl, `/?embedurl=${encodeURIComponent(targetUrl)}`);
  const createUrl = sectionConfig.form.remoteCreateForm.schemaUrl;
  const schemaUrl = editUrl || createUrl;
  return {
    sectionConfig,
    schemaUrl,
    targetUrl
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      schema: (0, _redux.bindActionCreators)(schemaActions, dispatch)
    }
  };
}
var _default = exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InsertEmbedModal);

/***/ }),

/***/ "components/FormBuilderModal/FormBuilderModal":
/*!***********************************!*\
  !*** external "FormBuilderModal" ***!
  \***********************************/
/***/ (function(module) {

module.exports = FormBuilderModal;

/***/ }),

/***/ "lib/Injector":
/*!***************************!*\
  !*** external "Injector" ***!
  \***************************/
/***/ (function(module) {

module.exports = Injector;

/***/ }),

/***/ "prop-types":
/*!****************************!*\
  !*** external "PropTypes" ***!
  \****************************/
/***/ (function(module) {

module.exports = PropTypes;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = React;

/***/ }),

/***/ "react-dom/client":
/*!*********************************!*\
  !*** external "ReactDomClient" ***!
  \*********************************/
/***/ (function(module) {

module.exports = ReactDomClient;

/***/ }),

/***/ "react-redux":
/*!*****************************!*\
  !*** external "ReactRedux" ***!
  \*****************************/
/***/ (function(module) {

module.exports = ReactRedux;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "Redux" ***!
  \************************/
/***/ (function(module) {

module.exports = Redux;

/***/ }),

/***/ "state/schema/SchemaActions":
/*!********************************!*\
  !*** external "SchemaActions" ***!
  \********************************/
/***/ (function(module) {

module.exports = SchemaActions;

/***/ }),

/***/ "lib/ShortcodeSerialiser":
/*!**************************************!*\
  !*** external "ShortcodeSerialiser" ***!
  \**************************************/
/***/ (function(module) {

module.exports = ShortcodeSerialiser;

/***/ }),

/***/ "i18n":
/*!***********************!*\
  !*** external "i18n" ***!
  \***********************/
/***/ (function(module) {

module.exports = i18n;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ "lib/urls":
/*!***************************!*\
  !*** external "ssUrlLib" ***!
  \***************************/
/***/ (function(module) {

module.exports = ssUrlLib;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./client/src/entwine/TinyMCE_ssembed.js ***!
  \***********************************************/


var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _client = __webpack_require__(/*! react-dom/client */ "react-dom/client");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _ShortcodeSerialiser = _interopRequireWildcard(__webpack_require__(/*! lib/ShortcodeSerialiser */ "lib/ShortcodeSerialiser"));
var _InsertEmbedModal = _interopRequireDefault(__webpack_require__(/*! components/InsertEmbedModal/InsertEmbedModal */ "./client/src/components/InsertEmbedModal/InsertEmbedModal.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const InjectableInsertEmbedModal = (0, _Injector.loadComponent)(_InsertEmbedModal.default);
const filter = 'div[data-shortcode="embed"]';
(() => {
  const ssembed = {
    init: editor => {
      const insertTitle = _i18n.default._t('AssetAdmin.INSERT_VIA_URL', 'Insert media via URL');
      const editTitle = _i18n.default._t('AssetAdmin.EDIT_MEDIA', 'Edit media');
      const deleteTitle = _i18n.default._t('AssetAdmin.DELETE_MEDIA', 'Delete media');
      const contextTitle = _i18n.default._t('AssetAdmin.MEDIA', 'Media');
      editor.addCommand('ssembed', () => {
        (0, _jquery.default)(`#${editor.id}`).entwine('ss').openEmbedDialog();
      });
      editor.addCommand('ssembed-delete', () => {
        const node = editor.selection.getNode();
        if (editor.dom.is(node, filter)) {
          node.remove();
        } else if (editor.dom.is(node.parentNode, filter)) {
          node.parentNode.remove();
        } else {
          console.error({
            error: 'Unexpected selection - expected embed',
            selectedNode: node
          });
        }
      });
      editor.ui.registry.addButton('ssembed', {
        tooltip: insertTitle,
        icon: 'embed',
        onAction: () => editor.execCommand('ssembed'),
        stateSelector: filter
      });
      editor.ui.registry.addMenuItem('ssembed', {
        text: contextTitle,
        icon: 'embed',
        onAction: () => editor.execCommand('ssembed')
      });
      editor.ui.registry.addButton('ssembededit', {
        tooltip: editTitle,
        icon: 'edit-block',
        onAction: () => editor.execCommand('ssembed')
      });
      editor.ui.registry.addButton('ssembeddelete', {
        tooltip: deleteTitle,
        icon: 'remove',
        onAction: () => editor.execCommand('ssembed-delete')
      });
      editor.ui.registry.addContextToolbar('ssembed', {
        predicate: node => editor.dom.is(node, filter),
        position: 'node',
        scope: 'node',
        items: 'alignleft aligncenter alignright | ssembededit ssembeddelete'
      });
      editor.on('BeforeExecCommand', e => {
        const cmd = e.command;
        const ui = e.ui;
        const val = e.value;
        if (cmd === 'mceMedia') {
          e.preventDefault();
          editor.execCommand('ssembed', ui, val);
        }
      });
      editor.on('GetContent', o => {
        const content = (0, _jquery.default)(`<div>${o.content}</div>`);
        content.find(filter).each(function replaceWithShortCode() {
          const embed = (0, _jquery.default)(this);
          const placeholder = embed.find('img.placeholder');
          if (placeholder.length === 0) {
            embed.removeAttr('data-url');
            embed.removeAttr('data-shortcode');
            return;
          }
          const caption = embed.find('.caption').text();
          const width = parseInt(placeholder.attr('width'), 10);
          const height = parseInt(placeholder.attr('height'), 10);
          const url = embed.data('url');
          const properties = (0, _ShortcodeSerialiser.sanitiseShortCodeProperties)({
            url,
            thumbnail: placeholder.prop('src'),
            class: embed.prop('class'),
            width: isNaN(width) ? null : width,
            height: isNaN(height) ? null : height,
            caption
          });
          const shortCode = _ShortcodeSerialiser.default.serialise({
            name: 'embed',
            properties,
            wrapped: true,
            content: properties.url
          });
          embed.replaceWith(shortCode);
        });
        o.content = content.html();
      });
      editor.on('BeforeSetContent', o => {
        let content = o.content;
        let match = _ShortcodeSerialiser.default.match('embed', true, content);
        while (match) {
          const data = match.properties;
          const base = (0, _jquery.default)('<div/>').attr('data-url', data.url || match.content).attr('data-shortcode', 'embed').addClass(data.class).addClass('ss-htmleditorfield-file embed');
          const placeholder = (0, _jquery.default)('<img />').attr('src', data.thumbnail).addClass('placeholder');
          if (data.width) {
            placeholder.attr('width', data.width);
          }
          if (data.height) {
            placeholder.attr('height', data.height);
          }
          base.append(placeholder);
          if (data.caption) {
            const caption = (0, _jquery.default)('<p />').addClass('caption').text(data.caption);
            base.append(caption);
          }
          content = content.replace(match.original, (0, _jquery.default)('<div/>').append(base).html());
          match = _ShortcodeSerialiser.default.match('embed', true, content);
        }
        o.content = content;
      });
      return {
        getMetadata() {
          return {
            name: 'Silverstripe Embed',
            url: 'https://docs.silverstripe.org/en/4/developer_guides/forms/field_types/htmleditorfield'
          };
        }
      };
    }
  };
  tinymce.PluginManager.add('ssembed', editor => ssembed.init(editor));
})();
_jquery.default.entwine('ss', $ => {
  $('.js-injector-boot #insert-embed-react__dialog-wrapper').entwine({
    Element: null,
    Data: {},
    ReactRoot: null,
    onunmatch() {
      this._clearModal();
    },
    _clearModal() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },
    open() {
      this._renderModal(true);
    },
    close() {
      this.setData({});
      this._renderModal(false);
    },
    _renderModal(isOpen) {
      var _this = this;
      const handleHide = () => this.close();
      const handleInsert = function () {
        return _this._handleInsert(...arguments);
      };
      const handleCreate = function () {
        return _this._handleCreate(...arguments);
      };
      const handleLoadingError = function () {
        return _this._handleLoadingError(...arguments);
      };
      const attrs = this.getOriginalAttributes();
      let root = this.getReactRoot();
      if (!root) {
        root = (0, _client.createRoot)(this[0]);
      }
      root.render(_react.default.createElement(InjectableInsertEmbedModal, {
        isOpen: isOpen,
        onCreate: handleCreate,
        onInsert: handleInsert,
        onClosed: handleHide,
        onLoadingError: handleLoadingError,
        bodyClassName: "modal__dialog",
        className: "insert-embed-react__dialog-wrapper",
        fileAttributes: attrs
      }));
      this.setReactRoot(root);
    },
    _handleLoadingError() {
      this.setData({});
      this.open();
    },
    _handleInsert(data) {
      const oldData = this.getData();
      this.setData(Object.assign({
        Url: oldData.Url
      }, data));
      this.insertRemote();
      this.close();
    },
    _handleCreate(data) {
      this.setData(Object.assign({}, this.getData(), data));
      this.open();
    },
    getOriginalAttributes() {
      const data = this.getData();
      const $field = this.getElement();
      if (!$field) {
        return data;
      }
      const node = $($field.getEditor().getSelectedNode());
      if (!node.length) {
        return data;
      }
      const element = node.closest(filter).add(node.filter(filter));
      if (!element.length) {
        return data;
      }
      const image = element.find('img.placeholder');
      if (image.length === 0) {
        return data;
      }
      const caption = element.find('.caption').text();
      const width = parseInt(image.width(), 10);
      const height = parseInt(image.height(), 10);
      return {
        Url: element.data('url') || data.Url,
        CaptionText: caption,
        PreviewUrl: image.attr('src'),
        Width: isNaN(width) ? null : width,
        Height: isNaN(height) ? null : height,
        Placement: this.findPosition(element.prop('class'))
      };
    },
    findPosition(cssClass) {
      const alignments = ['leftAlone', 'center', 'rightAlone', 'left', 'right'];
      if (typeof cssClass !== 'string') {
        return '';
      }
      const classes = cssClass.split(' ');
      return alignments.find(alignment => classes.indexOf(alignment) > -1);
    },
    insertRemote() {
      const $field = this.getElement();
      if (!$field) {
        return false;
      }
      const editor = $field.getEditor();
      if (!editor) {
        return false;
      }
      const data = this.getData();
      const base = (0, _jquery.default)('<div/>').attr('data-url', data.Url).attr('data-shortcode', 'embed').addClass(data.Placement).addClass('ss-htmleditorfield-file embed');
      const placeholder = (0, _jquery.default)('<img />').attr('src', data.PreviewUrl).addClass('placeholder');
      if (data.Width) {
        placeholder.attr('width', data.Width);
      }
      if (data.Height) {
        placeholder.attr('height', data.Height);
      }
      base.append(placeholder);
      if (data.CaptionText) {
        const caption = (0, _jquery.default)('<p />').addClass('caption').text(data.CaptionText);
        base.append(caption);
      }
      const node = $(editor.getSelectedNode());
      let replacee = $(null);
      if (node.length) {
        replacee = node.filter(filter);
        if (replacee.length === 0) {
          replacee = node.closest(filter);
        }
        if (replacee.length === 0) {
          replacee = node.filter('img.placeholder');
        }
      }
      if (replacee.length) {
        replacee.replaceWith(base);
      } else {
        editor.repaint();
        editor.insertContent($('<div />').append(base.clone()).html(), {
          skip_undo: 1
        });
      }
      editor.addUndo();
      editor.repaint();
      return true;
    }
  });
});
/******/ })()
;
//# sourceMappingURL=TinyMCE_ssembed.js.map