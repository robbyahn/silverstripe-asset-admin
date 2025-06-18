/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/components/AssetDropzone/AssetDropzone.js":
/*!**************************************************************!*\
  !*** ./client/src/components/AssetDropzone/AssetDropzone.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _dropzone = _interopRequireDefault(__webpack_require__(/*! dropzone */ "./node_modules/dropzone/dist/dropzone.mjs"));
var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
var _DataFormat = __webpack_require__(/*! lib/DataFormat */ "lib/DataFormat");
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
let idCounter = 0;
class AssetDropzone extends _react.Component {
  constructor(props) {
    super(props);
    this.dropzone = null;
    this.dragging = false;
    this.handleAccept = this.handleAccept.bind(this);
    this.handleAddedFile = this.handleAddedFile.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleUploadProgress = this.handleUploadProgress.bind(this);
    this.handleUploadComplete = this.handleUploadComplete.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSending = this.handleSending.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleQueueComplete = this.handleQueueComplete.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.handleMaxFilesExceeded = this.handleMaxFilesExceeded.bind(this);
  }
  componentDidMount() {
    this.dropzone = new _dropzone.default(this.dropzoneRef, Object.assign({}, this.getDefaultOptions(), this.props.options));
    const {
      name
    } = this.props;
    if (name && this.dropzone.hiddenFileInput) {
      this.dropzone.hiddenFileInput.classList.add(`dz-input-${name}`);
    }
    if (typeof this.props.promptOnRemove !== 'undefined') {
      this.setPromptOnRemove(this.props.promptOnRemove);
    }
  }
  componentDidUpdate(prevProps) {
    const {
      name
    } = this.props;
    if (name && this.dropzone.hiddenFileInput) {
      this.dropzone.hiddenFileInput.classList.add(`dz-input-${name}`);
    }
    if (this.props.canUpload && prevProps.options !== this.props.options) {
      if (this.dropzone) {
        this.dropzone.enable();
        this.dropzone.options = Object.assign({}, this.getDefaultOptions(), this.dropzone.options, this.props.options);
      }
    }
  }
  componentWillUnmount() {
    this.dropzone.files = [];
    this.dropzone.destroy();
  }
  getDefaultOptions() {
    let clickable = null;
    let uploadSelector = this.props.uploadSelector;
    if (!uploadSelector && this.props.uploadButton) {
      uploadSelector = '.asset-dropzone__upload-button';
    }
    if (uploadSelector) {
      const found = (0, _jquery.default)(this.dropzoneRef).find(uploadSelector);
      if (found && found.length) {
        clickable = found.toArray();
      }
    }
    return {
      accept: this.handleAccept,
      addedfile: this.handleAddedFile,
      dragenter: this.handleDragEnter,
      dragleave: this.handleDragLeave,
      drop: this.handleDrop,
      maxfilesexceeded: this.handleMaxFilesExceeded,
      uploadprogress: this.handleUploadProgress,
      complete: this.handleUploadComplete,
      dictDefaultMessage: _i18n.default._t('AssetAdmin.DROPZONE_DEFAULT_MESSAGE', 'Drop files here to upload'),
      dictFallbackMessage: _i18n.default._t('AssetAdmin.DROPZONE_FALLBACK_MESSAGE', 'Your browser does not support drag\'n\'drop file uploads.'),
      dictFallbackText: _i18n.default._t('AssetAdmin.DROPZONE_FALLBACK_TEXT', 'Please use the fallback form below to upload your files like in the olden days.'),
      dictInvalidFileType: _i18n.default._t('AssetAdmin.DROPZONE_INVALID_FILE_TYPE', 'You can\'t upload files of this type.'),
      dictResponseError: _i18n.default._t('AssetAdmin.DROPZONE_RESPONSE_ERROR', 'Server responded with an error.'),
      dictCancelUpload: _i18n.default._t('AssetAdmin.DROPZONE_CANCEL_UPLOAD', 'Cancel upload'),
      dictCancelUploadConfirmation: _i18n.default._t('AssetAdmin.DROPZONE_CANCEL_UPLOAD_CONFIRMATION', 'Are you sure you want to cancel this upload?'),
      dictRemoveFile: _i18n.default._t('AssetAdmin.DROPZONE_REMOVE_FILE', 'Remove file'),
      dictMaxFilesExceeded: _i18n.default._t('AssetAdmin.DROPZONE_MAX_FILES_EXCEEDED', 'You can not upload any more files.'),
      error: this.handleError,
      sending: this.handleSending,
      success: this.handleSuccess,
      queuecomplete: this.handleQueueComplete,
      thumbnailHeight: 150,
      thumbnailWidth: 200,
      timeout: 0,
      clickable
    };
  }
  getFileCategory(fileType) {
    return fileType.split('/')[0];
  }
  getLoadPreview(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = event => {
        if (this.getFileCategory(file.type) === 'image') {
          const img = new Image();
          resolve(this.loadImage(img, event.target.result));
        } else {
          resolve({});
        }
      };
      reader.readAsDataURL(file);
    });
  }
  getFileTitle(filename) {
    return filename.replace(/[.][^.]+$/, '').replace(/-_/, ' ');
  }
  setPromptOnRemove(userPrompt) {
    this.dropzone.options.dictRemoveFileConfirmation = userPrompt;
  }
  handleDragEnter(event) {
    if (!this.props.canUpload) {
      return;
    }
    this.dragging = true;
    this.forceUpdate();
    if (typeof this.props.onDragEnter === 'function') {
      this.props.onDragEnter(event);
    }
  }
  handleDragLeave(event) {
    const componentNode = this.dropzoneRef;
    if (!this.props.canUpload) {
      return;
    }
    if (event.target !== componentNode) {
      return;
    }
    this.dragging = false;
    this.forceUpdate();
    if (typeof this.props.onDragLeave === 'function') {
      this.props.onDragLeave(event, componentNode);
    }
  }
  handleUploadProgress(file, progress, bytesSent) {
    if (typeof this.props.onUploadProgress === 'function') {
      this.props.onUploadProgress(file, progress, bytesSent);
    }
  }
  handleUploadComplete(file) {
    if (typeof this.props.onUploadComplete === 'function') {
      this.props.onUploadComplete(file.status);
    }
  }
  handleDrop(event) {
    this.dragging = false;
    this.forceUpdate();
    if (typeof this.props.onDrop === 'function') {
      this.props.onDrop(event);
    }
  }
  handleSending(file, xhr, formData) {
    if (typeof this.props.updateFormData === 'function') {
      this.props.updateFormData(formData);
    }
    formData.append('SecurityID', this.props.securityID);
    formData.append('ParentID', this.props.folderId);
    const newXhr = Object.assign({}, xhr, {
      abort: () => {
        this.dropzone.cancelUpload(file);
        xhr.abort();
      }
    });
    if (typeof this.props.onSending === 'function') {
      this.props.onSending(file, newXhr, formData);
    }
  }
  handleMaxFilesExceeded(file) {
    if (typeof this.props.onMaxFilesExceeded === 'function') {
      return this.props.onMaxFilesExceeded(file);
    }
    return true;
  }
  generateQueuedId() {
    idCounter += 1;
    return idCounter;
  }
  handleAccept(file, done) {
    if (typeof this.props.canFileUpload === 'function' && !this.props.canFileUpload(file)) {
      return done(_i18n.default._t('AssetAdmin.DROPZONE_CANNOT_UPLOAD', 'Uploading not permitted.'));
    }
    if (!this.props.canUpload) {
      return done(_i18n.default._t('AssetAdmin.DROPZONE_CANNOT_UPLOAD', 'Uploading not permitted.'));
    }
    return done();
  }
  handleAddedFile(file) {
    file._queuedId = this.generateQueuedId();
    const details = {
      category: this.getFileCategory(file.type),
      filename: file.name,
      queuedId: file._queuedId,
      size: file.size,
      title: this.getFileTitle(file.name),
      extension: (0, _DataFormat.getFileExtension)(file.name),
      type: file.type,
      uploadedToFolderId: this.props.folderId
    };
    this.props.onAddedFile(details);
    const loadPreview = this.getLoadPreview(file);
    return loadPreview.then(preview => {
      const previewDetails = {
        height: preview.height,
        width: preview.width,
        url: preview.thumbnailURL,
        thumbnail: preview.thumbnailURL,
        smallThumbnail: preview.thumbnailURL
      };
      if (typeof this.props.onPreviewLoaded === 'function') {
        this.props.onPreviewLoaded(details, previewDetails);
      }
      return {
        ...details,
        ...previewDetails
      };
    });
  }
  loadImage(img, newSource) {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      img.onload = () => {
        const previewWidth = this.props.preview.width * 2;
        const previewHeight = this.props.preview.height * 2;
        const ratio = img.naturalWidth / img.naturalHeight;
        if (img.naturalWidth < previewWidth || img.naturalHeight < previewHeight) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        } else if (ratio < 1) {
          canvas.width = previewWidth;
          canvas.height = previewWidth / ratio;
        } else {
          canvas.width = previewHeight * ratio;
          canvas.height = previewHeight;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const thumbnailURL = canvas.toDataURL('image/png');
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          thumbnailURL
        });
      };
      img.src = newSource;
    });
  }
  handleError(file, message) {
    this.dropzone.removeFile(file);
    this.props.onError(file, message);
  }
  handleSuccess(file) {
    this.dropzone.removeFile(file);
    this.props.onSuccess(file);
  }
  handleQueueComplete() {
    if (this.props.onQueueComplete) {
      this.props.onQueueComplete();
    }
  }
  render() {
    const className = ['asset-dropzone'];
    if (this.props.className) {
      className.push(this.props.className);
    }
    const buttonProps = {
      className: 'asset-dropzone__upload-button ss-ui-button font-icon-upload',
      type: 'button'
    };
    if (!this.props.canUpload) {
      buttonProps.disabled = true;
    }
    if (this.dragging === true) {
      className.push('dragging');
    }
    return _react.default.createElement("div", {
      className: className.join(' '),
      ref: node => {
        this.dropzoneRef = node;
      }
    }, this.props.uploadButton && _react.default.createElement("button", buttonProps, _i18n.default._t('AssetAdmin.DROPZONE_UPLOAD')), this.props.children);
  }
}
AssetDropzone.propTypes = {
  folderId: _propTypes.default.number.isRequired,
  onAccept: _propTypes.default.func,
  onAddedFile: _propTypes.default.func.isRequired,
  onDragEnter: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  onError: _propTypes.default.func.isRequired,
  onPreviewLoaded: _propTypes.default.func,
  onSending: _propTypes.default.func,
  onSuccess: _propTypes.default.func.isRequired,
  onMaxFilesExceeded: _propTypes.default.func,
  updateFormData: _propTypes.default.func,
  canFileUpload: _propTypes.default.func,
  onQueueComplete: _propTypes.default.func,
  options: _propTypes.default.shape({
    url: _propTypes.default.string.isRequired
  }),
  promptOnRemove: _propTypes.default.string,
  securityID: _propTypes.default.string.isRequired,
  uploadButton: _propTypes.default.bool,
  uploadSelector: _propTypes.default.string,
  canUpload: _propTypes.default.bool.isRequired,
  preview: _propTypes.default.shape({
    width: _propTypes.default.number,
    height: _propTypes.default.number
  }),
  className: _propTypes.default.string
};
AssetDropzone.defaultProps = {
  uploadButton: true
};
var _default = exports["default"] = AssetDropzone;

/***/ }),

/***/ "./client/src/components/BulkActions/BulkActions.js":
/*!**********************************************************!*\
  !*** ./client/src/components/BulkActions/BulkActions.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BulkActions extends _react.Component {
  constructor(props) {
    super(props);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.renderChild = this.renderChild.bind(this);
  }
  getOptionByValue(value) {
    return this.props.actions.find(action => action.value === value);
  }
  handleChangeValue(event) {
    let promise = null;
    const option = this.getOptionByValue(event.target.value);
    if (option === null) {
      return null;
    }
    if (typeof option.confirm === 'function') {
      promise = option.confirm(this.props.items).then(() => option.callback(event, this.props.items)).catch(reason => {
        if (reason !== 'cancelled') {
          throw reason;
        }
      });
    } else {
      promise = option.callback(event, this.props.items) || Promise.resolve();
    }
    return promise;
  }
  renderChild(action, i) {
    const className = (0, _classnames.default)('bulk-actions__action', action.className || 'font-icon-info-circled', {
      btn: i < 2,
      'bulk-actions__action--more': i > 2
    });
    if (i < 2) {
      return _react.default.createElement(_reactstrap.Button, {
        className: className,
        key: action.value,
        onClick: this.handleChangeValue,
        value: action.value,
        color: action.color
      }, action.label);
    }
    return _react.default.createElement(_reactstrap.DropdownItem, {
      type: "button",
      className: className,
      key: action.value,
      onClick: this.handleChangeValue,
      value: action.value
    }, action.label);
  }
  render() {
    if (!this.props.items.length) {
      return null;
    }
    let children = this.props.actions.filter(action => !action.canApply || action.canApply(this.props.items));
    children = children.map(this.renderChild);
    if (!children.length) {
      return null;
    }
    const {
      ActionMenu,
      showCount
    } = this.props;
    const selectAll = _i18n.default._t('AssetAdmin.BULK_ACTIONS_SELECT_ALL', 'Select all');
    const selected = _i18n.default.sprintf(_i18n.default._t('AssetAdmin.BULK_ACTIONS_SELECTED', '%s selected'), this.props.items.length);
    const title = _i18n.default._t('AssetAdmin.BULK_ACTIONS_CLEAR_SELECTION', 'Clear selection');
    return _react.default.createElement("div", {
      className: "bulk-actions fieldholder-small"
    }, showCount && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactstrap.Button, {
      className: "bulk-actions-counter font-icon-cross-mark",
      onClick: this.props.onClearSelection,
      title: title
    }, selected), _react.default.createElement("div", {
      className: "bulk-actions-select-all"
    }, _react.default.createElement(_reactstrap.Button, {
      onClick: this.props.onSelectAll
    }, selectAll))), children.slice(0, 2), children.length > 2 && ActionMenu ? _react.default.createElement(ActionMenu, {
      id: "BulkActions",
      className: "bulk-actions__more-actions-menu"
    }, children.slice(2)) : children.slice(2));
  }
}
exports.Component = BulkActions;
BulkActions.propTypes = {
  items: _propTypes.default.array,
  actions: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired,
    className: _propTypes.default.string,
    destructive: _propTypes.default.bool,
    callback: _propTypes.default.func,
    canApply: _propTypes.default.func,
    confirm: _propTypes.default.func
  })),
  ActionMenu: _propTypes.default.elementType,
  showCount: _propTypes.default.bool,
  onClearSelection: _propTypes.default.func.isRequired,
  onSelectAll: _propTypes.default.func.isRequired
};
BulkActions.defaultProps = {
  items: [],
  actions: [],
  ActionMenu: null,
  total: null,
  showCount: true,
  totalReachedMessage: _i18n.default._t('')
};
function mapStateToProps(state) {
  return {
    gallery: state.assetAdmin.gallery
  };
}
const BulkActionsWithState = (0, _reactRedux.connect)(mapStateToProps)(BulkActions);
var _default = exports["default"] = (0, _Injector.inject)(['ActionMenu'], ActionMenu => ({
  ActionMenu
}), () => 'BulkActions')(BulkActionsWithState);

/***/ }),

/***/ "./client/src/components/GalleryItem/GalleryItem.js":
/*!**********************************************************!*\
  !*** ./client/src/components/GalleryItem/GalleryItem.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Folder = exports.File = exports.Component = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
var _fileShape = _interopRequireDefault(__webpack_require__(/*! lib/fileShape */ "./client/src/lib/fileShape.js"));
var _draggable = _interopRequireDefault(__webpack_require__(/*! components/GalleryItem/draggable */ "./client/src/components/GalleryItem/draggable.js"));
var _droppable = _interopRequireDefault(__webpack_require__(/*! components/GalleryItem/droppable */ "./client/src/components/GalleryItem/droppable.js"));
var _Badge = _interopRequireDefault(__webpack_require__(/*! components/Badge/Badge */ "components/Badge/Badge"));
var _FileStatusIcon = _interopRequireDefault(__webpack_require__(/*! components/FileStatusIcon/FileStatusIcon */ "components/FileStatusIcon/FileStatusIcon"));
var _configShape = _interopRequireDefault(__webpack_require__(/*! lib/configShape */ "./client/src/lib/configShape.js"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactSelectable = __webpack_require__(/*! react-selectable */ "./node_modules/react-selectable/dist/react-selectable.js");
var imageLoadActions = _interopRequireWildcard(__webpack_require__(/*! state/imageLoad/ImageLoadActions */ "./client/src/state/imageLoad/ImageLoadActions.js"));
var _ImageLoadStatus = _interopRequireDefault(__webpack_require__(/*! state/imageLoad/ImageLoadStatus */ "./client/src/state/imageLoad/ImageLoadStatus.js"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function shouldLoadImage(props) {
  return props.item.thumbnail && props.item.category === 'image' && props.item.exists && !props.item.queuedId && props.sectionConfig.imageRetry.minRetry && props.sectionConfig.imageRetry.maxRetry;
}
const preventFocus = event => {
  event.preventDefault();
};
class GalleryItem extends _react.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
  }
  componentDidUpdate() {
    if (shouldLoadImage(this.props)) {
      this.props.actions.imageLoad.loadImage(this.props.item.thumbnail, this.props.sectionConfig.imageRetry);
    }
  }
  getThumbnailStyles() {
    const {
      item: {
        thumbnail,
        version
      },
      bustCache
    } = this.props;
    if (!this.isImage() || !thumbnail || this.missing()) {
      return {};
    }
    const url = bustCache === false || !version || thumbnail.startsWith('data:image/') ? thumbnail : `${thumbnail}?vid=${version}`;
    switch (this.props.loadState) {
      case _ImageLoadStatus.default.SUCCESS:
      case _ImageLoadStatus.default.DISABLED:
        return {
          backgroundImage: `url(${url})`
        };
      default:
        return {};
    }
  }
  getErrorMessage() {
    let message = null;
    const {
      item,
      loadState
    } = this.props;
    if (this.hasError()) {
      message = item.message.value;
    } else if (this.missing()) {
      message = _i18n.default._t('AssetAdmin.FILE_MISSING', 'File cannot be found');
    } else if (loadState === _ImageLoadStatus.default.FAILED) {
      message = _i18n.default._t('AssetAdmin.FILE_LOAD_ERROR', 'Thumbnail not available');
    }
    if (message !== null) {
      const updateErrorMessage = this.getItemFunction('updateErrorMessage');
      message = updateErrorMessage(message, this.props);
      return _react.default.createElement("span", {
        className: "gallery-item__error-message"
      }, message);
    }
    return null;
  }
  getThumbnailClassNames() {
    const thumbnailClassNames = ['gallery-item__thumbnail'];
    if (this.isImageSmallerThanThumbnail()) {
      thumbnailClassNames.push('gallery-item__thumbnail--small');
    }
    if (!this.props.item.thumbnail && this.isImage()) {
      thumbnailClassNames.push('gallery-item__thumbnail--no-preview');
    }
    switch (this.props.loadState) {
      case _ImageLoadStatus.default.LOADING:
      case _ImageLoadStatus.default.WAITING:
        thumbnailClassNames.push('gallery-item__thumbnail--loading');
        break;
      case _ImageLoadStatus.default.FAILED:
        thumbnailClassNames.push('gallery-item__thumbnail--error');
        break;
      default:
        break;
    }
    return thumbnailClassNames.join(' ');
  }
  getItemClassNames() {
    const category = this.props.item.category || 'false';
    const selected = this.props.selectable && (this.props.item.selected || this.props.isDragging);
    return (0, _classnames.default)({
      'gallery-item': true,
      [`gallery-item--${category}`]: true,
      'gallery-item--max-selected': this.props.maxSelected && !selected,
      'gallery-item--missing': this.missing(),
      'gallery-item--selectable': this.props.selectable,
      'gallery-item--selected': selected,
      'gallery-item--dropping': this.props.isDropping,
      'gallery-item--highlighted': this.props.item.highlighted,
      'gallery-item--error': this.hasError(),
      'gallery-item--dragging': this.props.isDragging
    });
  }
  getItemFunction(functionName) {
    const {
      item
    } = this.props;
    return typeof item[functionName] === 'function' ? item[functionName] : this.props[functionName];
  }
  getStatusFlags() {
    let flags = [];
    const {
      item
    } = this.props;
    if (item.type !== 'folder') {
      if (item.draft) {
        flags.push({
          key: 'status-draft',
          title: _i18n.default._t('File.DRAFT', 'Draft'),
          className: 'gallery-item--draft'
        });
      } else if (item.modified) {
        flags.push({
          key: 'status-modified',
          title: _i18n.default._t('File.MODIFIED', 'Modified'),
          className: 'gallery-item--modified'
        });
      }
    }
    const updateStatusFlags = this.getItemFunction('updateStatusFlags');
    flags = updateStatusFlags(flags, this.props);
    return _react.default.createElement("div", {
      className: "gallery-item__status-flags"
    }, flags.map(attrs => _react.default.createElement("span", attrs)));
  }
  getStatusIcons() {
    const {
      item
    } = this.props;
    const icons = [];
    if (item.hasRestrictedAccess) {
      icons.push({
        key: 'status-restricted',
        fileID: item.id,
        hasRestrictedAccess: true,
        placement: 'top',
        disableTooltip: item.type === 'folder',
        includeBackground: item.type !== 'folder'
      });
    }
    if (item.isTrackedFormUpload && item.type !== 'folder') {
      icons.push({
        key: 'status-tracked-form-upload',
        fileID: item.id,
        isTrackedFormUpload: true,
        hasRestrictedAccess: item.hasRestrictedAccess,
        placement: 'top',
        includeBackground: true
      });
    }
    return _react.default.createElement("div", {
      className: "gallery-item__status-icons"
    }, icons.map(attrs => _react.default.createElement(_FileStatusIcon.default, attrs)));
  }
  getProgressBar() {
    let progressBar = null;
    const {
      item
    } = this.props;
    const progressBarProps = {
      className: 'gallery-item__progress-bar',
      style: {
        width: `${item.progress}%`
      }
    };
    if (!this.hasError() && this.uploading() && !this.complete()) {
      progressBar = _react.default.createElement("div", {
        className: "gallery-item__upload-progress"
      }, _react.default.createElement("div", progressBarProps));
    }
    const updateProgressBar = this.getItemFunction('updateProgressBar');
    progressBar = updateProgressBar(progressBar, this.props);
    return progressBar;
  }
  isImageSmallerThanThumbnail() {
    if (!this.isImage() || this.missing()) {
      return false;
    }
    const width = this.props.item.width;
    const height = this.props.item.height;
    return height && width && height < _index.default.THUMBNAIL_HEIGHT && width < _index.default.THUMBNAIL_WIDTH;
  }
  complete() {
    return this.props.item.queuedId && this.saved();
  }
  saved() {
    return this.props.item.id > 0;
  }
  missing() {
    return !this.exists() && this.saved();
  }
  uploading() {
    return this.props.item.queuedId && !this.saved();
  }
  exists() {
    return this.props.item.exists;
  }
  isImage() {
    return this.props.item.category === 'image';
  }
  canBatchSelect() {
    return this.props.selectable && this.props.item.canEdit;
  }
  hasError() {
    let hasError = false;
    if (this.props.item.message) {
      hasError = this.props.item.message.type === 'error';
    }
    return hasError;
  }
  handleActivate(event) {
    event.stopPropagation();
    if (typeof this.props.onActivate === 'function' && this.saved()) {
      this.props.onActivate(event, this.props.item);
    }
  }
  handleSelect(event) {
    event.stopPropagation();
    event.preventDefault();
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(event, this.props.item);
    }
  }
  handleKeyDown(event) {
    if (_index.default.SPACE_KEY_CODE === event.keyCode) {
      event.preventDefault();
      if (this.canBatchSelect()) {
        this.handleSelect(event);
      }
    }
    if (_index.default.RETURN_KEY_CODE === event.keyCode) {
      this.handleActivate(event);
    }
  }
  handleCancelUpload(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.hasError()) {
      this.props.onRemoveErroredUpload(this.props.item);
    } else if (this.props.onCancelUpload) {
      this.props.onCancelUpload(this.props.item);
    }
  }
  render() {
    let action = null;
    let actionIcon = null;
    let overlay = null;
    const {
      id,
      queuedId
    } = this.props.item;
    const htmlID = id ? `item-${id}` : `queued-${queuedId}`;
    if (this.props.selectable) {
      if (this.canBatchSelect()) {
        action = this.handleSelect;
      }
      actionIcon = 'font-icon-tick';
    }
    if (this.uploading()) {
      action = this.handleCancelUpload;
      actionIcon = 'font-icon-cancel';
    } else if (this.exists()) {
      const label = _i18n.default._t('AssetAdmin.VIEW', 'View');
      overlay = _react.default.createElement("div", {
        className: "gallery-item--overlay font-icon-eye"
      }, label);
    }
    const badge = this.props.badge;
    const inputProps = {
      className: 'gallery-item__checkbox',
      type: 'checkbox',
      title: _i18n.default._t('AssetAdmin.SELECT', 'Select'),
      tabIndex: -1,
      onMouseDown: preventFocus,
      id: htmlID
    };
    const inputLabelClasses = ['gallery-item__checkbox-label', actionIcon];
    if (!this.canBatchSelect()) {
      inputProps.disabled = true;
      inputLabelClasses.push('gallery-item__checkbox-label--disabled');
    }
    const inputLabelProps = {
      className: inputLabelClasses.join(' '),
      onClick: action
    };
    return _react.default.createElement("div", {
      className: this.getItemClassNames(),
      "data-id": this.props.item.id,
      tabIndex: 0,
      role: "button",
      onKeyDown: this.handleKeyDown,
      onClick: this.handleActivate
    }, !!badge && _react.default.createElement(_Badge.default, {
      className: "gallery-item__badge",
      status: badge.status,
      message: badge.message
    }), _react.default.createElement("div", {
      ref: thumbnail => {
        this.thumbnail = thumbnail;
      },
      className: this.getThumbnailClassNames(),
      style: this.getThumbnailStyles()
    }, overlay, this.getStatusFlags(), this.getStatusIcons()), this.getProgressBar(), this.getErrorMessage(), this.props.children, _react.default.createElement("div", {
      className: "gallery-item__title",
      ref: title => {
        this.title = title;
      }
    }, _react.default.createElement("label", _extends({}, inputLabelProps, {
      htmlFor: htmlID
    }), _react.default.createElement("input", inputProps)), this.props.item.title));
  }
}
exports.Component = GalleryItem;
GalleryItem.propTypes = {
  sectionConfig: _configShape.default,
  item: _fileShape.default,
  loadState: _propTypes.default.oneOf(Object.values(_ImageLoadStatus.default)),
  bustCache: _propTypes.default.bool,
  highlighted: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  isDropping: _propTypes.default.bool,
  isDragging: _propTypes.default.bool,
  message: _propTypes.default.shape({
    value: _propTypes.default.string,
    type: _propTypes.default.string
  }),
  selectable: _propTypes.default.bool,
  onActivate: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onCancelUpload: _propTypes.default.func,
  onRemoveErroredUpload: _propTypes.default.func,
  badge: _propTypes.default.shape({
    status: _propTypes.default.string,
    message: _propTypes.default.string
  }),
  updateStatusFlags: _propTypes.default.func,
  updateProgressBar: _propTypes.default.func,
  updateErrorMessage: _propTypes.default.func
};
GalleryItem.defaultProps = {
  item: {},
  sectionConfig: {
    imageRetry: {}
  },
  updateStatusFlags: flags => flags,
  updateProgressBar: progressBar => progressBar,
  updateErrorMessage: message => message,
  bustCache: true
};
function mapStateToProps(state, ownprops) {
  const sectionConfigKey = 'SilverStripe\\AssetAdmin\\Controller\\AssetAdmin';
  const {
    bustCache
  } = state.config.sections.find(section => section.name === sectionConfigKey);
  let loadState = _ImageLoadStatus.default.DISABLED;
  if (shouldLoadImage(ownprops)) {
    const imageLoad = state.assetAdmin.imageLoad;
    const file = imageLoad.files.find(next => ownprops.item.thumbnail === next.url);
    loadState = file && file.status || _ImageLoadStatus.default.NONE;
  }
  return {
    bustCache,
    loadState
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      imageLoad: (0, _redux.bindActionCreators)(imageLoadActions, dispatch)
    }
  };
}
const ConnectedGalleryItem = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GalleryItem);
const type = 'GalleryItem';
const File = exports.File = (0, _reactSelectable.createSelectable)((0, _draggable.default)(type)(ConnectedGalleryItem));
const Folder = exports.Folder = (0, _reactSelectable.createSelectable)((0, _droppable.default)(type)(File));
var _default = exports["default"] = ConnectedGalleryItem;

/***/ }),

/***/ "./client/src/components/GalleryItem/GalleryItemDragLayer.js":
/*!*******************************************************************!*\
  !*** ./client/src/components/GalleryItem/GalleryItemDragLayer.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
var _Badge = _interopRequireDefault(__webpack_require__(/*! components/Badge/Badge */ "components/Badge/Badge"));
var _GalleryItem = _interopRequireDefault(__webpack_require__(/*! ./GalleryItem */ "./client/src/components/GalleryItem/GalleryItem.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class GalleryItemDragLayer extends _react.Component {
  getOffset() {
    const {
      offset,
      dragged
    } = this.props;
    return {
      transform: offset && `translate(${offset.x + dragged.x}px, ${offset.y + dragged.y}px)`
    };
  }
  render() {
    if (!this.props.isDragging) {
      return null;
    }
    const {
      item
    } = this.props;
    if (!item.selected) {
      return null;
    }
    const selectionCount = item.selected.length;
    const shadows = [selectionCount > 1 ? _react.default.createElement("div", {
      key: "1",
      className: "gallery-item__drag-shadow"
    }) : null, selectionCount > 2 ? _react.default.createElement("div", {
      key: "2",
      className: "gallery-item__drag-shadow gallery-item__drag-shadow--second"
    }) : null];
    return _react.default.createElement("div", {
      className: "gallery-item__drag-layer"
    }, _react.default.createElement("div", {
      className: "gallery-item__drag-layer-item",
      style: this.getOffset()
    }, _react.default.createElement("div", {
      className: "gallery-item__drag-layer-preview"
    }, shadows, _react.default.createElement(_GalleryItem.default, _extends({}, item.props, {
      isDragging: true
    }))), selectionCount > 1 ? _react.default.createElement(_Badge.default, {
      className: "gallery-item__drag-layer-count",
      status: "info",
      message: `${selectionCount}`
    }) : null));
  }
}
GalleryItemDragLayer.propTypes = {
  item: _propTypes.default.object,
  offset: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  }),
  isDragging: _propTypes.default.bool.isRequired
};
const collect = monitor => ({
  item: monitor.getItem(),
  offset: monitor.getInitialClientOffset(),
  dragged: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging()
});
var _default = exports["default"] = (0, _reactDnd.DragLayer)(collect)(GalleryItemDragLayer);

/***/ }),

/***/ "./client/src/components/GalleryItem/draggable.js":
/*!********************************************************!*\
  !*** ./client/src/components/GalleryItem/draggable.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = draggable;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
var _reactDndHtml5Backend = __webpack_require__(/*! react-dnd-html5-backend */ "react-dnd-html5-backend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function draggable(type) {
  const spec = {
    canDrag(props) {
      return props.canDrag;
    },
    beginDrag(props) {
      const {
        id
      } = props.item;
      if (typeof props.onDrag === 'function') {
        props.onDrag(true, id);
      }
      const selected = props.selectedFiles.concat([]);
      if (!selected.includes(id)) {
        selected.push(id);
      }
      return {
        selected,
        props
      };
    },
    endDrag(props) {
      const {
        id
      } = props.item;
      if (typeof props.onDrag === 'function') {
        props.onDrag(false, id);
      }
    }
  };
  const collect = (connect, monitor) => ({
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  });
  const dragItem = (0, _reactDnd.DragSource)(type, spec, collect);
  return Item => {
    class DraggableItem extends _react.Component {
      componentDidMount() {
        this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
          captureDraggingState: true
        });
      }
      render() {
        const {
          connectDragSource
        } = this.props;
        const item = _react.default.createElement(Item, this.props);
        if (typeof item.type === 'string') {
          return connectDragSource(item);
        }
        return connectDragSource(_react.default.createElement("div", {
          className: "gallery-item__draggable"
        }, item));
      }
    }
    DraggableItem.propTypes = {
      connectDragSource: _propTypes.default.func.isRequired,
      connectDragPreview: _propTypes.default.func.isRequired,
      item: _propTypes.default.shape({
        id: _propTypes.default.number.isRequired
      }).isRequired,
      onDrag: _propTypes.default.func,
      selectedFiles: _propTypes.default.arrayOf(_propTypes.default.number)
    };
    return dragItem(DraggableItem);
  };
}

/***/ }),

/***/ "./client/src/components/GalleryItem/droppable.js":
/*!********************************************************!*\
  !*** ./client/src/components/GalleryItem/droppable.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = droppable;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function droppable(types) {
  const spec = {
    drop(props, monitor) {
      if (monitor.canDrop()) {
        const item = monitor.getItem();
        props.onDropFiles(props.item.id, item.selected);
      }
    },
    canDrop(props, monitor) {
      const item = monitor.getItem();
      return !item.selected.includes(props.item.id);
    }
  };
  const collect = (connect, monitor) => {
    const over = monitor.isOver();
    return {
      isDropping: over && monitor.canDrop(),
      connectDropTarget: connect.dropTarget(),
      isOver: over
    };
  };
  const dropItem = (0, _reactDnd.DropTarget)(types, spec, collect);
  return Item => {
    class DroppableItem extends _react.Component {
      render() {
        const {
          connectDropTarget
        } = this.props;
        const item = _react.default.createElement(Item, this.props);
        if (typeof item.type === 'string') {
          return connectDropTarget(item);
        }
        return connectDropTarget(_react.default.createElement("div", {
          className: "gallery-item__droppable"
        }, item));
      }
    }
    DroppableItem.propTypes = {
      connectDropTarget: _propTypes.default.func.isRequired,
      item: _propTypes.default.shape({
        id: _propTypes.default.number.isRequired
      }).isRequired
    };
    return dropItem(DroppableItem);
  };
}

/***/ }),

/***/ "./client/src/constants/index.js":
/*!***************************************!*\
  !*** ./client/src/constants/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports["default"] = {
  ACTIONS: {
    CREATE_FOLDER: 'create-folder',
    EDIT_FILE: 'edit'
  },
  MOVE_SUCCESS_DURATION: 3000,
  CSS_TRANSITION_TIME: 300,
  SMALL_THUMBNAIL_HEIGHT: 60,
  SMALL_THUMBNAIL_WIDTH: 60,
  THUMBNAIL_HEIGHT: 150,
  THUMBNAIL_WIDTH: 200,
  BULK_ACTIONS: [{
    value: 'delete',
    label: _i18n.default._t('AssetAdmin.BULK_ACTIONS_DELETE', 'Delete'),
    className: 'font-icon-trash',
    destructive: true,
    callback: null,
    canApply: items => items.every(item => item && item.canDelete)
  }, {
    value: 'archive',
    label: _i18n.default._t('AssetAdmin.BULK_ACTIONS_ARCHIVE', 'Archive'),
    className: 'font-icon-box',
    destructive: true,
    callback: null,
    canApply: items => items.every(item => item && item.canDelete)
  }, {
    value: 'edit',
    label: _i18n.default._t('AssetAdmin.BULK_ACTIONS_EDIT', 'Edit'),
    className: 'font-icon-edit',
    destructive: false,
    canApply: items => items.length === 1,
    callback: null
  }, {
    value: 'move',
    label: _i18n.default._t('AssetAdmin.BULK_ACTIONS_MOVE', 'Move'),
    className: 'font-icon-folder-move',
    canApply: items => items.every(item => item && item.canEdit),
    destructive: false,
    callback: null
  }, {
    value: 'publish',
    label: _i18n.default._t('AssetAdmin.BULK_ACTIONS_PUBLISH', 'Publish'),
    className: 'font-icon-rocket',
    destructive: false,
    callback: null,
    canApply: items => items.some(item => item && item.modified) && items.every(item => item.canEdit && item.type !== 'folder'),
    confirm: null
  }, {
    value: 'unpublish',
    label: _i18n.default._t('AssetAdmin.BULK_ACTIONS_UNPUBLISH', 'Unpublish'),
    className: 'font-icon-cancel-circled',
    destructive: false,
    callback: null,
    canApply: items => items.some(item => item.published) && items.every(item => item.canEdit && item.type !== 'folder'),
    confirm: null
  }, {
    value: 'insert',
    label: _i18n.default._t('AssetAdmin.BULK_ACTIONS_INSERT', 'Insert'),
    className: 'font-icon-plus-circled btn-primary',
    destructive: false,
    callback: null,
    canApply: items => items.length,
    confirm: null
  }],
  BULK_ACTIONS_PLACEHOLDER: _i18n.default._t('AssetAdmin.BULK_ACTIONS_PLACEHOLDER'),
  SPACE_KEY_CODE: 32,
  RETURN_KEY_CODE: 13,
  DEFAULT_PREVIEW: 'framework/client/dist/images/app_icons/generic_92.png',
  MODAL_MOVE: 'MODAL_MOVE'
};

/***/ }),

/***/ "./client/src/containers/AssetAdmin/AssetAdmin.js":
/*!********************************************************!*\
  !*** ./client/src/containers/AssetAdmin/AssetAdmin.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _redux = __webpack_require__(/*! redux */ "redux");
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var galleryActions = _interopRequireWildcard(__webpack_require__(/*! state/gallery/GalleryActions */ "./client/src/state/gallery/GalleryActions.js"));
var toastsActions = _interopRequireWildcard(__webpack_require__(/*! state/toasts/ToastsActions */ "state/toasts/ToastsActions"));
var queuedFilesActions = _interopRequireWildcard(__webpack_require__(/*! state/queuedFiles/QueuedFilesActions */ "./client/src/state/queuedFiles/QueuedFilesActions.js"));
var displaySearchActions = _interopRequireWildcard(__webpack_require__(/*! state/displaySearch/DisplaySearchActions */ "./client/src/state/displaySearch/DisplaySearchActions.js"));
var _Editor = _interopRequireDefault(__webpack_require__(/*! containers/Editor/Editor */ "./client/src/containers/Editor/Editor.js"));
var _Gallery = _interopRequireDefault(__webpack_require__(/*! containers/Gallery/Gallery */ "./client/src/containers/Gallery/Gallery.js"));
var _Toolbar = _interopRequireDefault(__webpack_require__(/*! components/Toolbar/Toolbar */ "components/Toolbar/Toolbar"));
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _Search = _interopRequireWildcard(__webpack_require__(/*! components/Search/Search */ "components/Search/Search"));
var _SearchToggle = _interopRequireDefault(__webpack_require__(/*! components/Search/SearchToggle */ "components/Search/SearchToggle"));
var _deleteFilesMutation = _interopRequireDefault(__webpack_require__(/*! state/files/deleteFilesMutation */ "./client/src/state/files/deleteFilesMutation.js"));
var _unpublishFilesMutation = _interopRequireDefault(__webpack_require__(/*! state/files/unpublishFilesMutation */ "./client/src/state/files/unpublishFilesMutation.js"));
var _publishFilesMutation = _interopRequireDefault(__webpack_require__(/*! state/files/publishFilesMutation */ "./client/src/state/files/publishFilesMutation.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
var _configShape = _interopRequireDefault(__webpack_require__(/*! lib/configShape */ "./client/src/lib/configShape.js"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var confirmDeletionActions = _interopRequireWildcard(__webpack_require__(/*! state/confirmDeletion/ConfirmDeletionActions */ "./client/src/state/confirmDeletion/ConfirmDeletionActions.js"));
var _getFormSchema = _interopRequireDefault(__webpack_require__(/*! lib/getFormSchema */ "./client/src/lib/getFormSchema.js"));
var _BulkDeleteConfirmation = _interopRequireDefault(__webpack_require__(/*! ../BulkDeleteConfirmation/BulkDeleteConfirmation */ "./client/src/containers/BulkDeleteConfirmation/BulkDeleteConfirmation.js"));
var _AssetAdminBreadcrumb = _interopRequireDefault(__webpack_require__(/*! ./AssetAdminBreadcrumb */ "./client/src/containers/AssetAdmin/AssetAdminBreadcrumb.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class AssetAdmin extends _react.Component {
  constructor(props) {
    super(props);
    this.handleOpenFile = this.handleOpenFile.bind(this);
    this.handleCloseFile = this.handleCloseFile.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.doPublish = this.doPublish.bind(this);
    this.doUnpublish = this.doUnpublish.bind(this);
    this.handleUnpublish = this.handleUnpublish.bind(this);
    this.handleDoSearch = this.handleDoSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleSubmitEditor = this.handleSubmitEditor.bind(this);
    this.handleOpenFolder = this.handleOpenFolder.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSetPage = this.handleSetPage.bind(this);
    this.createEndpoint = this.createEndpoint.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleFolderIcon = this.handleFolderIcon.bind(this);
    this.handleBrowse = this.handleBrowse.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUploadQueue = this.handleUploadQueue.bind(this);
    this.handleCreateFolder = this.handleCreateFolder.bind(this);
    this.handleMoveFilesSuccess = this.handleMoveFilesSuccess.bind(this);
  }
  componentDidUpdate() {
    if (typeof this.props.onReplaceUrl === 'function' && !this.props.loading && this.props.folder && this.props.folderId !== this.props.folder.id) {
      this.props.onReplaceUrl(this.props.folder.id, this.props.fileId, this.props.query, this.props.viewAction);
    }
  }
  getFolderId() {
    if (this.props.folderId !== null) {
      return this.props.folderId;
    }
    if (this.props.folder) {
      return this.props.folder.id;
    }
    return 0;
  }
  getFiles() {
    const {
      files,
      queuedFiles,
      folderId
    } = this.props;
    const combinedFilesList = [...queuedFiles.items.filter(item => (!item.id || !files.find(file => file.id === item.id)) && (!item.hasOwnProperty('uploadedToFolderId') || item.uploadedToFolderId === folderId)), ...files];
    const foldersList = combinedFilesList.filter(file => file.type === 'folder');
    const filesList = combinedFilesList.filter(file => file.type !== 'folder');
    return foldersList.concat(filesList);
  }
  handleBrowse(folderId, fileId, query) {
    if (typeof this.props.onBrowse === 'function') {
      this.props.onBrowse(folderId, fileId, query);
    }
    if (folderId !== this.getFolderId()) {
      this.props.actions.gallery.deselectFiles();
    }
  }
  handleSetPage(page) {
    this.handleBrowse(this.getFolderId(), this.props.fileId, Object.assign({}, this.props.query, {
      page
    }));
  }
  handleDoSearch(data) {
    this.props.actions.gallery.deselectFiles();
    this.props.actions.queuedFiles.purgeUploadQueue();
    this.props.actions.files.readFiles();
    this.handleBrowse(data.currentFolderOnly ? this.getFolderId() : 0, null, {
      filter: data,
      view: this.props.query.view
    });
  }
  handleClearSearch(event) {
    this.props.actions.displaySearch.closeSearch();
    this.props.actions.gallery.deselectFiles();
    this.props.actions.queuedFiles.purgeUploadQueue();
    this.props.actions.files.readFiles();
    this.handleOpenFolder(event, this.props.folder);
  }
  handleSort(sort) {
    this.handleBrowse(this.getFolderId(), this.props.fileId, {
      ...this.props.query,
      sort,
      limit: undefined,
      page: undefined
    });
  }
  handleViewChange(view) {
    this.handleBrowse(this.getFolderId(), this.props.fileId, Object.assign({}, this.props.query, {
      view
    }));
  }
  createEndpoint(endpointConfig) {
    let includeToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return _Backend.default.createEndpointFetcher(Object.assign({}, endpointConfig, includeToken ? {
      defaultData: {
        SecurityID: this.props.securityId
      }
    } : {}));
  }
  handleBackButtonClick(event) {
    event.preventDefault();
    this.props.actions.gallery.deselectFiles();
    if (this.props.folder) {
      this.handleOpenFolder(this.props.folder.parentId || 0);
    } else {
      this.handleOpenFolder(0);
    }
  }
  resetFile(file) {
    if (file.queuedId) {
      this.props.actions.queuedFiles.removeQueuedFile(file.queuedId);
    }
    if (this.props.fileId === file.id) {
      this.props.resetFileDetails(this.getFolderId(), file.id, this.props.query);
    }
  }
  handleFolderIcon() {
    this.handleOpenFile(this.getFolderId());
  }
  handleOpenFile(fileId) {
    this.handleBrowse(this.getFolderId(), fileId, this.props.query);
  }
  handleSubmitEditor(data, action, submitFn) {
    let promise = null;
    if (action === 'action_insert' && this.props.type === 'select') {
      const files = this.getFiles();
      const file = files.find(item => item.id === parseInt(data.ID, 10));
      this.props.onInsertMany(null, [file]);
      return Promise.resolve();
    }
    if (typeof this.props.onSubmitEditor === 'function') {
      const file = this.findFile(this.props.fileId);
      promise = this.props.onSubmitEditor(data, action, submitFn, file);
    } else {
      promise = submitFn();
    }
    if (!promise) {
      throw new Error('Promise was not returned for submitting');
    }
    return promise.then(response => {
      if (action === 'action_createfolder' && this.props.type === 'admin') {
        this.handleOpenFile(response.record.id);
      }
      return this.props.actions.files.readFiles().then(() => {
        if (action === 'action_createfolder' && this.props.type !== 'admin') {
          this.handleOpenFolder(this.getFolderId());
        }
        return response;
      });
    });
  }
  handleCloseFile() {
    this.handleBrowse(this.getFolderId(), null, this.props.query);
  }
  handleOpenFolder(folderId) {
    const {
      page,
      filter,
      ...query
    } = this.props.query;
    this.handleBrowse(folderId, null, query);
  }
  handleDelete(ids) {
    this.props.actions.confirmDeletion.deleting();
    const files = ids.map(id => {
      const result = this.findFile(id);
      if (!result) {
        throw new Error(`File selected for deletion cannot be found: ${id}`);
      }
      if (result.queuedId) {
        this.props.actions.queuedFiles.removeQueuedFile(result.queuedId);
      }
      return result;
    });
    const fileIDs = files.map(file => file.id);
    const parentId = this.props.folder ? this.props.folder.id : 0;
    return this.props.actions.files.deleteFiles(fileIDs, parentId).then(_ref => {
      let {
        data: {
          deleteFiles
        }
      } = _ref;
      this.handleBrowse(parentId, null, this.props.query);
      const queuedFiles = this.props.queuedFiles.items.filter(file => fileIDs.includes(file.id));
      queuedFiles.forEach(file => {
        if (file.queuedId) {
          this.props.actions.queuedFiles.removeQueuedFile(file.queuedId);
        }
      });
      this.props.actions.files.readFiles();
      return deleteFiles;
    }).then(resultItems => {
      const successes = resultItems.filter(result => result).length;
      const {
        archiveFiles
      } = this.props.sectionConfig;
      if (successes !== ids.length) {
        let transKey = 'AssetAdmin.BULK_ACTIONS_DELETE_FAIL_02';
        let transDefault = '%s folders/files were successfully deleted, but %s files were not able to be deleted.';
        if (archiveFiles) {
          transKey = 'AssetAdmin.BULK_ACTIONS_ARCHIVE_FAIL_02';
          transDefault = '%s folders/files were successfully archived, but %s files were not able to be archived.';
        }
        this.props.actions.toasts.error(_i18n.default.sprintf(_i18n.default._t(transKey, transDefault), successes, ids.length - successes));
      } else {
        let transKey = 'AssetAdmin.BULK_ACTIONS_DELETE_SUCCESS_02';
        let transDefault = '%s folders/files were successfully deleted.';
        if (archiveFiles) {
          transKey = 'AssetAdmin.BULK_ACTIONS_ARCHIVE_SUCCESS_02';
          transDefault = '%s folders/files were successfully archived.';
        }
        this.props.actions.toasts.success(_i18n.default.sprintf(_i18n.default._t(transKey, transDefault), successes));
        this.props.actions.gallery.deselectFiles();
      }
      return resultItems;
    }).finally(this.props.actions.confirmDeletion.reset);
  }
  doUnpublish(ids) {
    let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const files = ids.map(id => {
      const result = this.findFile(id);
      if (!result) {
        throw new Error(`File selected for unpublishing cannot be found: ${id}`);
      } else if (result.type === 'folder') {
        throw new Error('Cannot unpublish folders');
      }
      return result;
    });
    const fileIDs = files.map(file => file.id);
    return this.props.actions.files.unpublishFiles(fileIDs, force).then(_ref2 => {
      let {
        data: {
          unpublishFiles
        }
      } = _ref2;
      const successes = unpublishFiles.filter(result => result.__typename === 'File');
      const confirmationRequired = unpublishFiles.filter(result => result.__typename === 'PublicationNotice' && result.noticeType === 'HAS_OWNERS');
      const successful = successes.map(file => {
        this.resetFile(file);
        return file;
      });
      const displayedMessages = confirmationRequired.slice(0, 4);
      const rest = confirmationRequired.slice(5);
      const body = displayedMessages.map(warning => warning.message);
      if (rest.length) {
        body.push(_i18n.default.inject(_i18n.default._t('AssetAdmin.BULK_OWNED_WARNING_REMAINING', 'And {count} other file(s)'), {
          count: rest.length
        }));
      }
      if (displayedMessages.length) {
        const alertMessage = [_i18n.default.inject(_i18n.default._t('AssetAdmin.BULK_OWNED_WARNING_HEADING', '{count} file(s) are being used by other published content.'), {
          count: confirmationRequired.length
        }), body.join('\n'), _i18n.default._t('AssetAdmin.BULK_OWNED_WARNING_FOOTER', 'Unpublishing will only remove files from the published version of the content. They will remain on the draft version. Unpublish anyway?')];
        if (confirm(alertMessage.join('\n\n'))) {
          const secondPassIDs = confirmationRequired.reduce((acc, curr) => acc.concat(curr.ids), []);
          return this.doUnpublish(secondPassIDs, true).then(next => successful.concat(next));
        }
      }
      return successful;
    });
  }
  handleUnpublish(fileIds) {
    return this.doUnpublish(fileIds).then(response => {
      const {
        fileId
      } = this.props;
      this.props.actions.files.readFiles().then(() => {
        if (fileId && response.find(file => file.id === fileId)) {
          this.props.resetFileDetails(this.getFolderId(), fileId, this.props.query);
        }
      });
    });
  }
  doPublish(ids) {
    const files = ids.map(id => {
      const result = this.findFile(id);
      if (!result) {
        throw new Error(`File selected for publishing cannot be found: ${id}`);
      } else if (result.type === 'folder') {
        throw new Error('Cannot publish folders');
      }
      return result;
    });
    const fileIDs = files.map(file => file.id);
    return this.props.actions.files.publishFiles(fileIDs).then(_ref3 => {
      let {
        data: {
          publishFiles
        }
      } = _ref3;
      const successes = publishFiles.filter(result => result.__typename === 'File');
      const successful = successes.map(file => {
        this.resetFile(file);
        return file;
      });
      return successful;
    });
  }
  findFile(fileId) {
    const allFiles = this.getFiles();
    return allFiles.find(item => item.id === parseInt(fileId, 10));
  }
  handleUpload() {}
  handleUploadQueue() {
    if (this.props.fileId) {
      this.props.actions.files.readFiles();
    }
  }
  handleCreateFolder() {
    this.props.onBrowse(this.getFolderId(), null, this.props.query, _index.default.ACTIONS.CREATE_FOLDER);
  }
  handleMoveFilesSuccess(folderId, fileIds) {
    const files = this.props.queuedFiles.items.filter(file => fileIds.includes(file.id));
    files.forEach(file => {
      if (file.queuedId) {
        this.props.actions.queuedFiles.removeQueuedFile(file.queuedId);
      }
    });
    this.props.actions.gallery.deselectFiles();
    this.props.actions.files.readFiles();
  }
  renderGallery() {
    const {
      GalleryComponent
    } = this.props;
    const config = this.props.sectionConfig;
    const createFileApiUrl = config.createFileEndpoint.url;
    const createFileApiMethod = config.createFileEndpoint.method;
    const limit = this.props.query && parseInt(this.props.query.limit || config.limit, 10);
    const page = this.props.query && parseInt(this.props.query.page || 1, 10);
    const sort = this.props.query && this.props.query.sort;
    const view = this.props.query && this.props.query.view;
    const filters = this.props.query.filter || {};
    return _react.default.createElement(GalleryComponent, {
      files: this.getFiles(),
      fileId: this.props.fileId,
      folderId: this.getFolderId(),
      folder: this.props.folder,
      type: this.props.type,
      limit: limit,
      page: page,
      totalCount: this.props.filesTotalCount,
      view: view,
      filters: filters,
      graphQLErrors: this.props.graphQLErrors,
      createFileApiUrl: createFileApiUrl,
      createFileApiMethod: createFileApiMethod,
      onInsertMany: this.props.onInsertMany,
      onPublish: this.doPublish,
      onUnpublish: this.doUnpublish,
      onOpenFile: this.handleOpenFile,
      onOpenFolder: this.handleOpenFolder,
      onSuccessfulUpload: this.handleUpload,
      onSuccessfulUploadQueue: this.handleUploadQueue,
      onCreateFolder: this.handleCreateFolder,
      onMoveFilesSuccess: this.handleMoveFilesSuccess,
      onClearSearch: this.handleClearSearch,
      onSort: this.handleSort,
      onSetPage: this.handleSetPage,
      onViewChange: this.handleViewChange,
      sort: sort,
      sectionConfig: config,
      loading: this.props.loading,
      maxFilesSelect: this.props.maxFiles,
      dialog: this.props.dialog
    });
  }
  renderEditor() {
    const {
      sectionConfig: config,
      viewAction,
      type,
      fileId,
      dialog,
      requireLinkText,
      fileSelected,
      EditorComponent
    } = this.props;
    const {
      schemaUrl,
      targetId
    } = (0, _getFormSchema.default)({
      config,
      viewAction,
      folderId: this.getFolderId(),
      type,
      fileId
    });
    if (!schemaUrl) {
      return null;
    }
    const schemaUrlQueries = [];
    if (requireLinkText) {
      schemaUrlQueries.push({
        name: 'requireLinkText',
        value: true
      });
    }
    if (fileSelected) {
      schemaUrlQueries.push({
        name: 'fileSelected',
        value: true
      });
    }
    const editorProps = {
      dialog,
      fileId: targetId,
      schemaUrl,
      schemaUrlQueries,
      onClose: this.handleCloseFile,
      onSubmit: this.handleSubmitEditor,
      onUnpublish: this.handleUnpublish,
      addToCampaignSchemaUrl: config.form.addToCampaignForm.schemaUrl
    };
    return _react.default.createElement(EditorComponent, editorProps);
  }
  render() {
    const {
      folder,
      folderId,
      query,
      getUrl,
      type,
      maxFiles,
      toolbarChildren,
      SearchComponent,
      BulkDeleteConfirmationComponent
    } = this.props;
    const showBackButton = Boolean(folderId || (0, _Search.hasFilters)(query.filter));
    const searchFormSchemaUrl = this.props.sectionConfig.form.fileSearchForm.schemaUrl;
    const filters = query.filter || {};
    const classNames = (0, _classnames.default)('fill-height asset-admin', type === 'select' && {
      'asset-admin--single-select': maxFiles === 1,
      'asset-admin--multi-select': maxFiles !== 1
    });
    const showSearch = (0, _Search.hasFilters)(query.filter) || this.props.showSearch;
    const onSearchToggle = this.props.actions.displaySearch ? this.props.actions.displaySearch.toggleSearch : undefined;
    const breadcrumbProps = {
      folder,
      query,
      getUrl,
      onBrowse: this.handleBrowse,
      onFolderIcon: this.handleFolderIcon
    };
    return _react.default.createElement("div", {
      className: classNames
    }, _react.default.createElement(_Toolbar.default, {
      showBackButton: showBackButton,
      onBackButtonClick: this.handleBackButtonClick
    }, _react.default.createElement(_AssetAdminBreadcrumb.default, breadcrumbProps), _react.default.createElement("div", {
      className: "asset-admin__toolbar-extra pull-xs-right fill-width vertical-align-items"
    }, _react.default.createElement(_SearchToggle.default, {
      toggled: showSearch,
      onToggle: onSearchToggle
    }), toolbarChildren)), showSearch && _react.default.createElement(SearchComponent, {
      onSearch: this.handleDoSearch,
      id: "AssetSearchForm",
      formSchemaUrl: searchFormSchemaUrl,
      onHide: this.handleClearSearch,
      displayBehavior: "HIDEABLE",
      filters: filters,
      name: "name"
    }), _react.default.createElement("div", {
      className: "flexbox-area-grow fill-width fill-height gallery"
    }, this.renderGallery(), this.renderEditor()), _react.default.createElement(BulkDeleteConfirmationComponent, {
      onConfirm: this.handleDelete
    }));
  }
}
exports.Component = AssetAdmin;
AssetAdmin.propTypes = {
  dialog: _propTypes.default.bool,
  sectionConfig: _configShape.default,
  fileId: _propTypes.default.number,
  folderId: _propTypes.default.number,
  resetFileDetails: _propTypes.default.func,
  onBrowse: _propTypes.default.func,
  onReplaceUrl: _propTypes.default.func,
  onInsertMany: _propTypes.default.func,
  graphQLErrors: _propTypes.default.arrayOf(_propTypes.default.string),
  getUrl: _propTypes.default.func,
  query: _propTypes.default.shape({
    sort: _propTypes.default.string,
    limit: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    page: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    filter: _propTypes.default.object
  }),
  onSubmitEditor: _propTypes.default.func,
  type: _propTypes.default.oneOf(['insert-media', 'insert-link', 'select', 'admin']),
  files: _propTypes.default.array,
  queuedFiles: _propTypes.default.shape({
    items: _propTypes.default.array.isRequired
  }),
  filesTotalCount: _propTypes.default.number,
  folder: _propTypes.default.shape({
    id: _propTypes.default.number,
    title: _propTypes.default.string,
    parents: _propTypes.default.array,
    parentId: _propTypes.default.number,
    canView: _propTypes.default.bool,
    canEdit: _propTypes.default.bool
  }),
  loading: _propTypes.default.bool,
  actions: _propTypes.default.object,
  maxFiles: _propTypes.default.number,
  fileSelected: _propTypes.default.bool,
  EditorComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  GalleryComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  SearchComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  BulkDeleteConfirmationComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
};
AssetAdmin.defaultProps = {
  type: 'admin',
  query: {
    sort: '',
    limit: null,
    page: 0,
    filter: {}
  },
  maxFiles: null,
  EditorComponent: _Editor.default,
  GalleryComponent: _Gallery.default,
  SearchComponent: _Search.default,
  BulkDeleteConfirmationComponent: _BulkDeleteConfirmation.default
};
function mapStateToProps(state, ownProps) {
  const {
    formSchema
  } = state.assetAdmin.modal;
  return {
    securityId: state.config.SecurityID,
    queuedFiles: state.assetAdmin.queuedFiles,
    showSearch: state.assetAdmin.displaySearch.isOpen,
    type: formSchema && formSchema.type || ownProps.type
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      gallery: (0, _redux.bindActionCreators)(galleryActions, dispatch),
      toasts: (0, _redux.bindActionCreators)(toastsActions, dispatch),
      displaySearch: (0, _redux.bindActionCreators)(displaySearchActions, dispatch),
      queuedFiles: (0, _redux.bindActionCreators)(queuedFilesActions, dispatch),
      confirmDeletion: (0, _redux.bindActionCreators)(confirmDeletionActions, dispatch)
    }
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _Injector.injectGraphql)('ReadFilesQuery'), _deleteFilesMutation.default, _unpublishFilesMutation.default, _publishFilesMutation.default, _hoc.withApollo)(AssetAdmin);

/***/ }),

/***/ "./client/src/containers/AssetAdmin/AssetAdminBreadcrumb.js":
/*!******************************************************************!*\
  !*** ./client/src/containers/AssetAdmin/AssetAdminBreadcrumb.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _Breadcrumb = __webpack_require__(/*! components/Breadcrumb/Breadcrumb */ "components/Breadcrumb/Breadcrumb");
var _Search = __webpack_require__(/*! components/Search/Search */ "components/Search/Search");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AssetAdminBreadcrumb = _ref => {
  let {
    folder,
    query,
    getUrl,
    onBrowse,
    onFolderIcon,
    PlainBreadcrumbComponent
  } = _ref;
  const handleClick = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return event => {
      event.preventDefault();
      onBrowse(...args);
    };
  };
  const hrefBuilder = function () {
    return getUrl && getUrl(...arguments);
  };
  const breadcrumbs = [{
    text: _i18n.default._t('AssetAdmin.FILES', 'Files'),
    href: hrefBuilder(0, null, query),
    onClick: handleClick(0, null, query)
  }];
  if (folder && folder.id) {
    if (folder.parents) {
      folder.parents.forEach(parent => {
        breadcrumbs.push({
          text: parent.title,
          href: hrefBuilder(parent.id, null, query),
          onClick: handleClick(parent.id, null, query)
        });
      });
    }
    const icons = [{
      className: 'icon font-icon-edit-list',
      onClick: e => {
        e.preventDefault();
        onFolderIcon();
      }
    }];
    if (folder.hasRestrictedAccess) {
      icons.push({
        nodeName: 'FileStatusIcon',
        hasRestrictedAccess: true
      });
    }
    breadcrumbs.push({
      text: folder.title,
      href: hrefBuilder(folder.id, null, query),
      onClick: handleClick(folder.id, null, query),
      icons
    });
  }
  if ((0, _Search.hasFilters)(query.filter)) {
    breadcrumbs.push({
      text: _i18n.default._t('LeftAndMain.SEARCHRESULTS', 'Search results')
    });
  }
  return _react.default.createElement(PlainBreadcrumbComponent, {
    multiline: true,
    crumbs: breadcrumbs
  });
};
AssetAdminBreadcrumb.propTypes = {
  onBrowse: _propTypes.default.func,
  onFolderIcon: _propTypes.default.func,
  getUrl: _propTypes.default.func,
  query: _propTypes.default.shape({
    sort: _propTypes.default.string,
    limit: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    page: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    filter: _propTypes.default.object,
    view: _propTypes.default.string
  }),
  folder: _propTypes.default.shape({
    id: _propTypes.default.number,
    title: _propTypes.default.string,
    parents: _propTypes.default.array,
    parentId: _propTypes.default.number,
    canView: _propTypes.default.bool,
    canEdit: _propTypes.default.bool
  }),
  PlainBreadcrumbComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
};
AssetAdminBreadcrumb.defaultProps = {
  PlainBreadcrumbComponent: _Breadcrumb.Component
};
var _default = exports["default"] = AssetAdminBreadcrumb;

/***/ }),

/***/ "./client/src/containers/AssetAdmin/AssetAdminRouter.js":
/*!**************************************************************!*\
  !*** ./client/src/containers/AssetAdmin/AssetAdminRouter.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Component = void 0;
exports.buildUrl = buildUrl;
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _withRouter = _interopRequireWildcard(__webpack_require__(/*! lib/withRouter */ "lib/withRouter"));
var _AssetAdmin = _interopRequireDefault(__webpack_require__(/*! containers/AssetAdmin/AssetAdmin */ "./client/src/containers/AssetAdmin/AssetAdmin.js"));
var _DataFormat = __webpack_require__(/*! lib/DataFormat */ "lib/DataFormat");
var _qs = _interopRequireDefault(__webpack_require__(/*! qs */ "qs"));
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
var _configShape = _interopRequireDefault(__webpack_require__(/*! lib/configShape */ "./client/src/lib/configShape.js"));
var _urls = __webpack_require__(/*! lib/urls */ "lib/urls");
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const sectionConfigKey = 'SilverStripe\\AssetAdmin\\Controller\\AssetAdmin';
const actions = Object.keys(_index.default.ACTIONS).map(key => _index.default.ACTIONS[key]);
function buildUrl(_ref) {
  let {
    base,
    folderId,
    fileId,
    query,
    action
  } = _ref;
  if (action && actions.indexOf(action) === -1) {
    throw new Error(`Invalid action provided: ${action}`);
  }
  let url = null;
  if (fileId) {
    url = (0, _urls.joinUrlPaths)(base, `show/${folderId}/${_index.default.ACTIONS.EDIT_FILE}/${fileId}`);
  } else if (folderId) {
    url = (0, _urls.joinUrlPaths)(base, `show/${folderId}`);
  } else {
    url = base;
  }
  if (action === _index.default.ACTIONS.CREATE_FOLDER) {
    url = (0, _urls.joinUrlPaths)(base, `show/${folderId || 0}/${action}`);
  }
  const hasQuery = query && Object.keys(query).length > 0;
  if (hasQuery) {
    url = `${url}?${_qs.default.stringify(query)}`;
  }
  return url;
}
class AssetAdminRouter extends _react.Component {
  constructor(props) {
    super(props);
    this.handleBrowse = this.handleBrowse.bind(this);
    this.handleReplaceUrl = this.handleReplaceUrl.bind(this);
    this.handleResetDetails = this.handleResetDetails.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }
  getUrl() {
    let folderId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let fileId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _index.default.ACTIONS.EDIT_FILE;
    const newFolderId = parseInt(folderId || 0, 10);
    const newFileId = parseInt(fileId || 0, 10);
    const hasFolderChanged = newFolderId !== this.getFolderId();
    const newQuery = Object.assign({}, query);
    if (hasFolderChanged || newQuery.page <= 1) {
      delete newQuery.page;
    }
    return buildUrl({
      base: `/${this.props.sectionConfig.reactRoutePath}`,
      folderId: newFolderId,
      fileId: newFileId,
      query: newQuery,
      action
    });
  }
  getFolderId() {
    if (this.props.router.params && this.props.router.params.folderId) {
      return parseInt(this.props.router.params.folderId, 10);
    }
    return 0;
  }
  getFileId() {
    if (this.props.router.params && this.props.router.params.fileId) {
      return parseInt(this.props.router.params.fileId, 10);
    }
    return 0;
  }
  getViewAction() {
    if (this.props.router.params && this.props.router.params.viewAction) {
      return this.props.router.params.viewAction;
    }
    return _index.default.ACTIONS.EDIT_FILE;
  }
  getSectionProps() {
    return {
      sectionConfig: this.props.sectionConfig,
      type: 'admin',
      folderId: this.getFolderId(),
      viewAction: this.getViewAction(),
      fileId: this.getFileId(),
      query: this.getQuery(),
      getUrl: this.getUrl,
      onBrowse: this.handleBrowse,
      onReplaceUrl: this.handleReplaceUrl,
      resetFileDetails: this.handleResetDetails
    };
  }
  getQuery() {
    return (0, _DataFormat.decodeQuery)(this.props.router.location.search);
  }
  handleBrowse(folderId, fileId, query, action) {
    const pathname = this.getUrl(folderId, fileId, query, action);
    this.props.router.navigate(pathname);
  }
  handleReplaceUrl(folderId, fileId, query, action) {
    const pathname = this.getUrl(folderId, fileId, query, action);
    this.props.router.navigate(pathname, {
      replace: true
    });
  }
  handleResetDetails(folderId, fileId, query) {
    const currentPathname = this.getUrl(folderId, fileId, query);
    const clearPathname = this.getUrl(folderId, null, query);
    this.props.router.navigate(clearPathname, {
      replace: true,
      state: {
        reset: true,
        resetPath: currentPathname
      }
    });
  }
  render() {
    const {
      AssetAdminComponent
    } = this.props;
    const locationState = this.props.router.location.state;
    if (locationState && locationState && locationState.reset) {
      return _react.default.createElement(_reactRouterDom.Navigate, {
        to: locationState.resetPath,
        replace: true
      });
    }
    if (!this.props.sectionConfig) {
      return null;
    }
    return _react.default.createElement(AssetAdminComponent, this.getSectionProps());
  }
}
exports.Component = AssetAdminRouter;
AssetAdminRouter.propTypes = {
  sectionConfig: _configShape.default,
  router: _withRouter.routerPropTypes,
  AssetAdminComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
};
AssetAdminRouter.defaultProps = {
  AssetAdminComponent: _AssetAdmin.default
};
function mapStateToProps(state) {
  const sectionConfig = state.config.sections.find(section => section.name === sectionConfigKey);
  return {
    sectionConfig
  };
}
var _default = exports["default"] = (0, _withRouter.default)((0, _reactRedux.connect)(mapStateToProps)(AssetAdminRouter));

/***/ }),

/***/ "./client/src/containers/AssetAdmin/stateRouter.js":
/*!*********************************************************!*\
  !*** ./client/src/containers/AssetAdmin/stateRouter.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.AssetAdminStateRouter = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _AssetAdminRouter = __webpack_require__(/*! containers/AssetAdmin/AssetAdminRouter */ "./client/src/containers/AssetAdmin/AssetAdminRouter.js");
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
var _ModalActions = __webpack_require__(/*! state/modal/ModalActions */ "./client/src/state/modal/ModalActions.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const sectionConfigKey = 'SilverStripe\\AssetAdmin\\Controller\\AssetAdmin';
const initialState = {
  folderId: null,
  fileId: null,
  query: {},
  action: _index.default.ACTIONS.EDIT_FILE
};
class AssetAdminStateRouter extends _react.Component {
  constructor(props) {
    super(props);
    this.handleBrowse = this.handleBrowse.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.state = Object.assign({}, initialState, {
      folderId: props.folderId
    });
  }
  getUrl() {
    let folderId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let fileId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _index.default.ACTIONS.EDIT_FILE;
    const newFolderId = parseInt(folderId || 0, 10);
    const newFileId = parseInt(fileId || 0, 10);
    const oldFolderId = this.getFolderId();
    const hasFolderChanged = newFolderId !== oldFolderId && oldFolderId !== null;
    const newQuery = Object.assign({}, query);
    if (hasFolderChanged || newQuery.page <= 1) {
      delete newQuery.page;
    }
    return (0, _AssetAdminRouter.buildUrl)({
      base: this.props.sectionConfig.reactRoutePath,
      folderId: newFolderId,
      fileId: newFileId,
      query: newQuery,
      action
    });
  }
  getFolderId() {
    if (this.state.folderId === null) {
      return null;
    }
    return parseInt(this.state.folderId || 0, 10);
  }
  getFileId() {
    return parseInt(this.state.fileId || this.props.fileId || 0, 10);
  }
  getViewAction() {
    return this.state.action || _index.default.ACTIONS.EDIT_FILE;
  }
  getSectionProps() {
    const props = Object.assign({}, this.props, {
      folderId: this.getFolderId(),
      fileId: this.getFileId(),
      viewAction: this.getViewAction(),
      query: this.state.query,
      getUrl: this.getUrl,
      onBrowse: this.handleBrowse
    });
    delete props.Component;
    return props;
  }
  handleBrowse(folderId, fileId) {
    let query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _index.default.ACTIONS.EDIT_FILE;
    if (action && Object.values(_index.default.ACTIONS).indexOf(action) === -1) {
      throw new Error(`Invalid action provided: ${action}`);
    }
    if (this.state.fileId !== fileId) {
      this.props.actions.resetFormStack();
    }
    this.setState({
      folderId,
      fileId,
      query,
      action
    });
  }
  render() {
    const sectionProps = this.getSectionProps();
    const AssetAdmin = this.props.Component;
    return _react.default.createElement(AssetAdmin, sectionProps);
  }
}
exports.AssetAdminStateRouter = AssetAdminStateRouter;
AssetAdminStateRouter.propTypes = {
  Component: _propTypes.default.elementType,
  sectionConfig: _propTypes.default.shape({
    url: _propTypes.default.string.isRequired
  }).isRequired,
  fileId: _propTypes.default.number
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      resetFormStack: () => dispatch((0, _ModalActions.resetFormStack)())
    }
  };
}
function stateRouter(AssetAdmin) {
  function mapStateToProps(state) {
    const sectionConfig = state.config.sections.find(section => section.name === sectionConfigKey);
    return {
      Component: AssetAdmin,
      sectionConfig
    };
  }
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AssetAdminStateRouter);
}
var _default = exports["default"] = stateRouter;

/***/ }),

/***/ "./client/src/containers/BulkDeleteConfirmation/BulkDeleteConfirmation.js":
/*!********************************************************************************!*\
  !*** ./client/src/containers/BulkDeleteConfirmation/BulkDeleteConfirmation.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var confirmDeletionActions = _interopRequireWildcard(__webpack_require__(/*! state/confirmDeletion/ConfirmDeletionActions */ "./client/src/state/confirmDeletion/ConfirmDeletionActions.js"));
var TRANSITIONS = _interopRequireWildcard(__webpack_require__(/*! state/confirmDeletion/ConfirmDeletionTransitions */ "./client/src/state/confirmDeletion/ConfirmDeletionTransitions.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _fileShape = _interopRequireDefault(__webpack_require__(/*! lib/fileShape */ "./client/src/lib/fileShape.js"));
var _DeletionModal = _interopRequireDefault(__webpack_require__(/*! ./DeletionModal */ "./client/src/containers/BulkDeleteConfirmation/DeletionModal.js"));
var _BulkDeleteMessage = _interopRequireDefault(__webpack_require__(/*! ./BulkDeleteMessage */ "./client/src/containers/BulkDeleteConfirmation/BulkDeleteMessage.js"));
var _helpers = __webpack_require__(/*! ./helpers */ "./client/src/containers/BulkDeleteConfirmation/helpers.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BulkDeleteConfirmation = _ref => {
  let {
    loading,
    LoadingComponent,
    transition,
    files,
    descendantFileCounts,
    onModalClose,
    onCancel,
    onConfirm,
    archiveFiles
  } = _ref;
  let body = null;
  const transKey = archiveFiles ? 'AssetAdmin.ARCHIVE' : 'AssetAdmin.DELETE';
  const transDefault = archiveFiles ? 'Archive' : 'Delete';
  let actions = [{
    label: _i18n.default._t(transKey, transDefault),
    handler: () => onConfirm(files.map(_ref2 => {
      let {
        id
      } = _ref2;
      return id;
    })),
    color: 'danger'
  }, {
    label: _i18n.default._t('AssetAdmin.CANCEL', 'Cancel'),
    handler: onCancel
  }];
  if (loading) {
    body = _react.default.createElement(LoadingComponent, null);
  } else {
    const folderCount = Object.keys(descendantFileCounts).length;
    const folderDescendantFileTotals = (0, _helpers.getFolderDescendantFileTotals)(files, descendantFileCounts);
    const fileTotalItems = (0, _helpers.getFileTotalItems)(files);
    const bodyProps = {
      folderCount,
      folderDescendantFileTotals,
      fileTotalItems,
      archiveFiles
    };
    body = _react.default.createElement(_BulkDeleteMessage.default, bodyProps);
    if (folderDescendantFileTotals.totalItems || fileTotalItems) {
      actions = [{
        label: _i18n.default._t('AssetAdmin.CANCEL', 'Cancel'),
        handler: onCancel,
        color: 'primary'
      }, {
        label: _i18n.default._t(transKey, transDefault),
        handler: () => onConfirm(files.map(_ref3 => {
          let {
            id
          } = _ref3;
          return id;
        })),
        color: 'danger'
      }];
    }
  }
  const isOpen = ![TRANSITIONS.CANCELING, TRANSITIONS.DELETING].includes(transition);
  return _react.default.createElement(_DeletionModal.default, {
    body: body,
    isOpen: isOpen,
    actions: actions,
    onCancel: onCancel,
    onClosed: onModalClose,
    archiveFiles: archiveFiles
  });
};
exports.Component = BulkDeleteConfirmation;
BulkDeleteConfirmation.propTypes = {
  loading: _propTypes.default.bool.isRequired,
  LoadingComponent: _propTypes.default.elementType,
  transition: _propTypes.default.oneOf(['canceling', 'deleting', false]),
  files: _propTypes.default.arrayOf(_fileShape.default),
  descendantFileCounts: _propTypes.default.object,
  onCancel: _propTypes.default.func.isRequired,
  onModalClose: _propTypes.default.func.isRequired,
  onConfirm: _propTypes.default.func.isRequired,
  archiveFiles: _propTypes.default.bool.isRequired
};
const ConnectedModal = (0, _redux.compose)((0, _Injector.inject)(['Loading'], Loading => ({
  LoadingComponent: Loading
})), (0, _Injector.injectGraphql)('readDescendantFileCountsQuery'), _hoc.withApollo)(BulkDeleteConfirmation);
const ConditionalModal = _ref4 => {
  let {
    showConfirmation,
    files,
    ...props
  } = _ref4;
  return showConfirmation && files.length > 0 ? _react.default.createElement(ConnectedModal, _extends({}, props, {
    files: files
  })) : null;
};
const mapStateToProps = _ref5 => {
  let {
    assetAdmin: {
      confirmDeletion
    }
  } = _ref5;
  return confirmDeletion;
};
const mapDispatchToProps = {
  onCancel: confirmDeletionActions.cancel,
  onModalClose: confirmDeletionActions.modalClose
};
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(ConditionalModal);

/***/ }),

/***/ "./client/src/containers/BulkDeleteConfirmation/BulkDeleteMessage.js":
/*!***************************************************************************!*\
  !*** ./client/src/containers/BulkDeleteConfirmation/BulkDeleteMessage.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _helpers = __webpack_require__(/*! ./helpers */ "./client/src/containers/BulkDeleteConfirmation/helpers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const confirmationMessage = (folderCount, folderDescendantFileTotals, fileTotalItems, archiveFiles) => {
  const fileCount = folderDescendantFileTotals.totalCount + fileTotalItems;
  if (fileCount > 0) {
    let transKey = 'AssetAdmin.BULK_ACTIONS_DELETE_ITEMS_CONFIRM';
    let transDefault = ["You're about to delete %s file(s) which may be used in your site's content.", 'Carefully check the file usage on the files before deleting the file(s).'].join(' ');
    if (archiveFiles) {
      transKey = 'AssetAdmin.BULK_ACTIONS_ARCHIVE_ITEMS_CONFIRM';
      transDefault = ["You're about to archive %s file(s) which may be used in your site's content.", 'Carefully check the file usage on the files before archiving the file(s).'].join(' ');
    }
    return _i18n.default.sprintf(_i18n.default._t(transKey, transDefault), fileCount);
  } else if (folderCount === 1) {
    let transKey = 'AssetAdmin.BULK_ACTIONS_DELETE_FOLDER_CONFIRM';
    let transDefault = 'Are you sure you want to delete this folder?';
    if (archiveFiles) {
      transKey = 'AssetAdmin.BULK_ACTIONS_ARCHIVE_FOLDER_CONFIRM';
      transDefault = 'Are you sure you want to archive this folder?';
    }
    return _i18n.default._t(transKey, transDefault);
  }
  let transKey = 'AssetAdmin.BULK_ACTIONS_DELETE_FOLDERS_CONFIRM';
  let transDefault = 'Are you sure you want to delete these folders?';
  if (archiveFiles) {
    transKey = 'AssetAdmin.BULK_ACTIONS_ARCHIVE_FOLDERS_CONFIRM';
    transDefault = 'Are you sure you want to archive these folders?';
  }
  return _i18n.default._t(transKey, transDefault);
};
const BulkDeleteMessage = _ref => {
  let {
    folderCount,
    folderDescendantFileTotals,
    fileTotalItems,
    archiveFiles
  } = _ref;
  let transKey = 'AssetAdmin.BULK_ACTIONS_DELETE_WARNING';
  let transDefault = 'Ensure files are removed from content areas prior to deleting them, otherwise they will ' + 'appear as broken links.';
  if (archiveFiles) {
    transKey = 'AssetAdmin.BULK_ACTIONS_ARCHIVE_WARNING';
    transDefault = 'Ensure files are removed from content areas prior to archiving them, otherwise they will ' + 'appear as broken links.';
  }
  const message = confirmationMessage(folderCount, folderDescendantFileTotals, fileTotalItems, archiveFiles);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, message), (folderDescendantFileTotals.totalItems > 0 || fileTotalItems > 0) && _react.default.createElement("p", null, _i18n.default._t(transKey, transDefault)));
};
BulkDeleteMessage.propTypes = {
  folderCount: _propTypes.default.number,
  folderDescendantFileTotals: _helpers.descendantFileTotalsShape,
  fileTotalItems: _propTypes.default.number
};
BulkDeleteMessage.defaultProps = {
  folderCount: 0,
  folderDescendantFileTotals: {
    totalItems: 0,
    totalCount: 0
  },
  fileTotalItems: 0
};
var _default = exports["default"] = BulkDeleteMessage;

/***/ }),

/***/ "./client/src/containers/BulkDeleteConfirmation/DeletionModal.js":
/*!***********************************************************************!*\
  !*** ./client/src/containers/BulkDeleteConfirmation/DeletionModal.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DeletionModal = _ref => {
  let {
    isOpen,
    body,
    onCancel,
    actions,
    archiveFiles
  } = _ref;
  let transKey = 'AssetAdmin.CONFIRM_FILE_DELETION';
  let transDefault = 'Confirm deletion';
  if (archiveFiles) {
    transKey = 'AssetAdmin.CONFIRM_FILE_ARCHIVE';
    transDefault = 'Confirm archive';
  }
  return _react.default.createElement(_reactstrap.Modal, {
    isOpen: isOpen,
    toggle: onCancel
  }, _react.default.createElement(_reactstrap.ModalHeader, {
    toggle: onCancel
  }, _i18n.default._t(transKey, transDefault)), _react.default.createElement(_reactstrap.ModalBody, null, body), _react.default.createElement(_reactstrap.ModalFooter, null, actions.map(_ref2 => {
    let {
      label,
      handler,
      color
    } = _ref2;
    return _react.default.createElement(_reactstrap.Button, {
      key: label,
      color: color,
      onClick: handler
    }, label);
  })));
};
DeletionModal.propTypes = {
  isOpen: _propTypes.default.bool.isRequired,
  body: _propTypes.default.node.isRequired,
  onCancel: _propTypes.default.func.isRequired,
  actions: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    handler: _propTypes.default.func,
    color: _propTypes.default.string
  })),
  archiveFiles: _propTypes.default.bool.isRequired
};
var _default = exports["default"] = DeletionModal;

/***/ }),

/***/ "./client/src/containers/BulkDeleteConfirmation/helpers.js":
/*!*****************************************************************!*\
  !*** ./client/src/containers/BulkDeleteConfirmation/helpers.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getFolderDescendantFileTotals = exports.getFileTotalItems = exports.descendantFileTotalsShape = void 0;
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const isFolder = _ref => {
  let {
    type
  } = _ref;
  return type === 'folder';
};
const isFile = file => !isFolder(file);
const descendantFileCountsReducer = descendentFileCount => (accumulator, _ref2) => {
  let {
    id
  } = _ref2;
  return descendentFileCount[id] > 0 ? {
    totalItems: accumulator.totalItems + 1,
    totalCount: accumulator.totalCount + descendentFileCount[id]
  } : accumulator;
};
const descendantFileCountsInitAccumulator = {
  totalItems: 0,
  totalCount: 0
};
const descendantFileTotalsShape = exports.descendantFileTotalsShape = _propTypes.default.shape({
  totalItems: _propTypes.default.number,
  totalCount: _propTypes.default.number
});
const getFolderDescendantFileTotals = (files, descendantFileCounts) => files.filter(isFolder).reduce(descendantFileCountsReducer(descendantFileCounts), descendantFileCountsInitAccumulator);
exports.getFolderDescendantFileTotals = getFolderDescendantFileTotals;
const getFileTotalItems = files => files.filter(isFile).length;
exports.getFileTotalItems = getFileTotalItems;

/***/ }),

/***/ "./client/src/containers/Editor/Editor.js":
/*!************************************************!*\
  !*** ./client/src/containers/Editor/Editor.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _redux = __webpack_require__(/*! redux */ "redux");
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
var _FormBuilderLoader = _interopRequireDefault(__webpack_require__(/*! containers/FormBuilderLoader/FormBuilderLoader */ "containers/FormBuilderLoader/FormBuilderLoader"));
var _FormBuilderModal = _interopRequireDefault(__webpack_require__(/*! components/FormBuilderModal/FormBuilderModal */ "components/FormBuilderModal/FormBuilderModal"));
var UnsavedFormsActions = _interopRequireWildcard(__webpack_require__(/*! state/unsavedForms/UnsavedFormsActions */ "state/unsavedForms/UnsavedFormsActions"));
var _fileShape = _interopRequireDefault(__webpack_require__(/*! lib/fileShape */ "./client/src/lib/fileShape.js"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var confirmDeletionActions = _interopRequireWildcard(__webpack_require__(/*! state/confirmDeletion/ConfirmDeletionActions */ "./client/src/state/confirmDeletion/ConfirmDeletionActions.js"));
var modalActions = _interopRequireWildcard(__webpack_require__(/*! state/modal/ModalActions */ "./client/src/state/modal/ModalActions.js"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _url = _interopRequireDefault(__webpack_require__(/*! url */ "url"));
var _qs = _interopRequireDefault(__webpack_require__(/*! qs */ "qs"));
var _EditorHeader = _interopRequireWildcard(__webpack_require__(/*! ./EditorHeader */ "./client/src/containers/Editor/EditorHeader.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const formIdentifier = 'AssetAdmin.EditForm';
class Editor extends _react.Component {
  constructor(props) {
    super(props);
    this.getFormSchemaUrl = this.getFormSchemaUrl.bind(this);
    this.handleCancelKeyDown = this.handleCancelKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleLoadingSuccess = this.handleLoadingSuccess.bind(this);
    this.handleLoadingError = this.handleLoadingError.bind(this);
    this.handleFetchingSchema = this.handleFetchingSchema.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.createFn = this.createFn.bind(this);
    this.editorHeader = this.editorHeader.bind(this);
    this.state = {
      openModal: false,
      loadingForm: false,
      loadingError: null
    };
  }
  getFormSchemaUrl() {
    const {
      schemaUrlQueries,
      schemaUrl,
      fileId
    } = this.props;
    const parsedURL = _url.default.parse(schemaUrl);
    const parsedQs = schemaUrlQueries.reduce((accumulator, _ref) => {
      let {
        name,
        value
      } = _ref;
      return {
        ...accumulator,
        [name]: value
      };
    }, {});
    return _url.default.format({
      ...parsedURL,
      pathname: `${parsedURL.path}/${fileId}`,
      search: _qs.default.stringify(parsedQs)
    });
  }
  handleAction(event) {
    switch (event.currentTarget.name) {
      case 'action_addtocampaign':
        this.openModal();
        event.preventDefault();
        break;
      case 'action_replacefile':
        this.replaceFile();
        event.preventDefault();
        break;
      case 'action_downloadfile':
        this.downloadFile();
        event.preventDefault();
        break;
      case 'action_delete':
        this.props.actions.confirmDeletion.confirm([this.props.file]);
        event.preventDefault();
        break;
      default:
        break;
    }
  }
  handleCancelKeyDown(event) {
    if (event.keyCode === _index.default.SPACE_KEY_CODE || event.keyCode === _index.default.RETURN_KEY_CODE) {
      this.handleClose(event);
    }
  }
  handleSubmit(data, action, submitFn) {
    const {
      showingSubForm,
      actions
    } = this.props;
    if (typeof this.props.onSubmit === 'function') {
      return this.props.onSubmit(data, action, submitFn).finally(() => {
        if (showingSubForm && ['action_save', 'action_publish'].indexOf(action) !== -1) {
          actions.modal.popFormStackEntry();
        }
      });
    }
    return submitFn();
  }
  handleClose(event) {
    const {
      showingSubForm,
      onClose,
      actions
    } = this.props;
    if (showingSubForm) {
      actions.modal.popFormStackEntry();
    } else {
      onClose();
      this.closeModal();
    }
    if (event) {
      event.preventDefault();
    }
  }
  openModal() {
    this.setState({
      openModal: true
    });
  }
  closeModal() {
    this.setState({
      openModal: false
    });
  }
  replaceFile() {
    const hiddenFileInput = document.querySelector('.dz-input-PreviewImage');
    if (hiddenFileInput) {
      hiddenFileInput.click();
    }
  }
  downloadFile() {
    function downloadURI(uri, name) {
      const link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    downloadURI(this.props.file.url, this.props.file.name);
    document.getElementById('Form_fileEditForm_PopoverActions').focus();
  }
  handleLoadingError(exception) {
    this.setState({
      loadingForm: false,
      loadingError: exception.errors[0]
    });
  }
  handleLoadingSuccess() {
    this.setState({
      loadingForm: false,
      loadingError: null
    });
  }
  handleFetchingSchema() {
    this.setState({
      loadingForm: true
    });
  }
  editorHeader(_ref2) {
    let {
      SchemaComponent,
      ...fieldProps
    } = _ref2;
    const {
      dialog,
      nextType,
      showingSubForm,
      actions,
      file,
      EditorHeaderComponent
    } = this.props;
    const schemaUrl = this.getFormSchemaUrl();
    let showButton = _EditorHeader.buttonStates.SWITCH;
    if (dialog && file && file.type !== 'folder') {
      showButton = showingSubForm ? _EditorHeader.buttonStates.ALWAYS_BACK : _EditorHeader.buttonStates.ONLY_BACK;
    }
    const {
      formid
    } = fieldProps;
    const onDetails = nextType && file && file.type !== 'folder' ? () => {
      actions.modal.stashFormValues(formid, schemaUrl);
      actions.modal.pushFormStackEntry(nextType);
    } : undefined;
    const props = {
      onCancel: this.handleClose,
      showButton,
      onDetails
    };
    return _react.default.createElement(EditorHeaderComponent, props, _react.default.createElement(SchemaComponent, fieldProps));
  }
  createFn(SchemaComponent, componentProps) {
    if (componentProps.name === 'AssetEditorHeaderFieldGroup') {
      const CreatedEditorHeader = this.editorHeader;
      const editorHeaderProps = {
        key: componentProps.id,
        SchemaComponent,
        ...componentProps
      };
      return _react.default.createElement(CreatedEditorHeader, editorHeaderProps);
    }
    return _react.default.createElement(SchemaComponent, _extends({
      key: componentProps.id
    }, componentProps));
  }
  render() {
    const {
      FormBuilderLoaderComponent,
      FormBuilderModalComponent
    } = this.props;
    const formSchemaUrl = this.getFormSchemaUrl();
    const modalSchemaUrl = `${this.props.addToCampaignSchemaUrl}/${this.props.fileId}`;
    const editorClasses = (0, _classnames.default)('panel', 'form--no-dividers', 'editor', {
      'editor--asset-dropzone--disable': !this.props.enableDropzone
    }, this.props.className);
    let error = null;
    if (this.state.loadingError) {
      let message = this.state.loadingError.value;
      if (this.state.loadingError.code === 404) {
        message = _i18n.default._t('AssetAdmin.FILE_MISSING', 'File cannot be found');
      }
      if (!message) {
        message = _i18n.default._t('Admin.UNKNOWN_ERROR', 'An unknown error has occurred');
      }
      error = _react.default.createElement("div", {
        className: "editor__file-preview-message--file-missing"
      }, message);
    }
    const campaignTitle = _i18n.default._t('Admin.ADD_TO_CAMPAIGN', 'Add to campaign');
    const Loading = this.props.loadingComponent;
    const {
      file
    } = this.props;
    return _react.default.createElement("div", {
      className: editorClasses
    }, _react.default.createElement("div", {
      className: "editor__details fill-height"
    }, _react.default.createElement(FormBuilderLoaderComponent, {
      identifier: formIdentifier,
      schemaUrl: formSchemaUrl,
      onSubmit: this.handleSubmit,
      onAction: this.handleAction,
      onLoadingSuccess: this.handleLoadingSuccess,
      onLoadingError: this.handleLoadingError,
      onFetchingSchema: this.handleFetchingSchema,
      createFn: this.createFn,
      file: file
    }), error, _react.default.createElement(FormBuilderModalComponent, {
      title: campaignTitle,
      identifier: "AssetAdmin.AddToCampaign",
      isOpen: this.state.openModal,
      onClosed: this.closeModal,
      schemaUrl: modalSchemaUrl,
      bodyClassName: "modal__dialog",
      responseClassBad: "modal__response modal__response--error",
      responseClassGood: "modal__response modal__response--good"
    }), this.state.loadingForm && _react.default.createElement(Loading, null)));
  }
}
exports.Component = Editor;
Editor.propTypes = {
  file: _fileShape.default,
  className: _propTypes.default.string,
  fileId: _propTypes.default.number.isRequired,
  enableDropzone: _propTypes.default.bool,
  dialog: _propTypes.default.bool,
  onClose: _propTypes.default.func.isRequired,
  onSubmit: _propTypes.default.func.isRequired,
  schemaUrl: _propTypes.default.string.isRequired,
  schemaUrlQueries: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.any
  })),
  addToCampaignSchemaUrl: _propTypes.default.string,
  actions: _propTypes.default.object,
  showingSubForm: _propTypes.default.bool,
  nextType: _propTypes.default.string,
  EditorHeaderComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  FormBuilderLoaderComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  FormBuilderModalComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
};
Editor.defaultProps = {
  EditorHeaderComponent: _EditorHeader.default,
  FormBuilderLoaderComponent: _FormBuilderLoader.default,
  FormBuilderModalComponent: _FormBuilderModal.default
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      unsavedForms: (0, _redux.bindActionCreators)(UnsavedFormsActions, dispatch),
      confirmDeletion: (0, _redux.bindActionCreators)(confirmDeletionActions, dispatch),
      modal: (0, _redux.bindActionCreators)(modalActions, dispatch)
    }
  };
}
function mapStateToProps(_ref3) {
  let {
    assetAdmin: {
      gallery,
      modal
    }
  } = _ref3;
  return {
    enableDropzone: gallery.enableDropzone,
    nextType: modal.formSchema && modal.formSchema.nextType,
    showingSubForm: modal.formSchemaStack && modal.formSchemaStack.length > 1
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['Loading'], Loading => ({
  loadingComponent: Loading
}), () => 'AssetAdmin.Editor'), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _Injector.injectGraphql)('ReadOneFileQuery'))(Editor);

/***/ }),

/***/ "./client/src/containers/Editor/EditorHeader.js":
/*!******************************************************!*\
  !*** ./client/src/containers/Editor/EditorHeader.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.buttonStates = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _Button = _interopRequireDefault(__webpack_require__(/*! components/Button/Button */ "components/Button/Button"));
var _BackButton = _interopRequireDefault(__webpack_require__(/*! components/Button/BackButton */ "components/Button/BackButton"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const handle = handler => e => {
  e.preventDefault();
  if (handler) {
    handler();
  }
};
const ALWAYS_BACK = 'ALWAYS_BACK';
const ALWAYS_CANCEL = 'ALWAYS_CANCEL';
const SWITCH = 'SWITCH';
const ONLY_BACK = 'ONLY_BACK';
const ONLY_CANCEL = 'ONLY_CANCEL';
const NONE = 'NONE';
const buttonStates = exports.buttonStates = {
  ALWAYS_BACK,
  ALWAYS_CANCEL,
  SWITCH,
  ONLY_BACK,
  ONLY_CANCEL,
  NONE
};
const EditorHeader = _ref => {
  let {
    onCancel,
    onDetails,
    showButton,
    children
  } = _ref;
  const cancelHandler = handle(onCancel);
  const showBack = [ALWAYS_BACK, SWITCH, ONLY_BACK].indexOf(showButton) >= 0;
  const showCancel = [ALWAYS_CANCEL, SWITCH, ONLY_CANCEL].indexOf(showButton) >= 0;
  const backClassName = (0, _classnames.default)('editor-header__back-button', 'btn--icon-xl', {
    'editor-header__back-button--md-below': [SWITCH, ONLY_BACK].indexOf(showButton) >= 0
  });
  const cancelClassName = (0, _classnames.default)('editor-header__cancel-button', 'btn--icon-xl', {
    'editor-header__cancel-button--lg-above': [SWITCH, ONLY_CANCEL].indexOf(showButton) >= 0
  });
  return _react.default.createElement("div", {
    className: "editor-header"
  }, showBack && _react.default.createElement(_BackButton.default, {
    className: backClassName,
    onClick: cancelHandler
  }), _react.default.createElement("div", {
    className: "editor-header__field"
  }, children), onDetails && _react.default.createElement(_Button.default, {
    onClick: handle(onDetails),
    icon: "edit-list",
    className: "editor-header__edit",
    outline: true
  }, _i18n.default._t('AssetAdmin.DETAILS', 'Details')), showCancel && _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
    icon: "cancel",
    className: cancelClassName,
    noText: true,
    onClick: cancelHandler
  }, _i18n.default._t('AssetAdmin.CANCEL'))));
};
EditorHeader.propTypes = {
  onCancel: _propTypes.default.func,
  onDetails: _propTypes.default.func,
  showButton: _propTypes.default.oneOf(Object.keys(buttonStates).map(state => buttonStates[state])),
  children: _propTypes.default.node
};
var _default = exports["default"] = EditorHeader;

/***/ }),

/***/ "./client/src/containers/Gallery/Gallery.js":
/*!**************************************************!*\
  !*** ./client/src/containers/Gallery/Gallery.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.galleryViewPropTypes = exports.galleryViewDefaultProps = exports["default"] = exports.Component = void 0;
var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _redux = __webpack_require__(/*! redux */ "redux");
var _AssetDropzone = _interopRequireDefault(__webpack_require__(/*! components/AssetDropzone/AssetDropzone */ "./client/src/components/AssetDropzone/AssetDropzone.js"));
var _BulkActions = _interopRequireDefault(__webpack_require__(/*! components/BulkActions/BulkActions */ "./client/src/components/BulkActions/BulkActions.js"));
var _ThumbnailView = _interopRequireDefault(__webpack_require__(/*! containers/ThumbnailView/ThumbnailView */ "./client/src/containers/ThumbnailView/ThumbnailView.js"));
var _TableView = _interopRequireDefault(__webpack_require__(/*! containers/TableView/TableView */ "./client/src/containers/TableView/TableView.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
var _FormAlert = _interopRequireDefault(__webpack_require__(/*! components/FormAlert/FormAlert */ "components/FormAlert/FormAlert"));
var galleryActions = _interopRequireWildcard(__webpack_require__(/*! state/gallery/GalleryActions */ "./client/src/state/gallery/GalleryActions.js"));
var toastsActions = _interopRequireWildcard(__webpack_require__(/*! state/toasts/ToastsActions */ "state/toasts/ToastsActions"));
var queuedFilesActions = _interopRequireWildcard(__webpack_require__(/*! state/queuedFiles/QueuedFilesActions */ "./client/src/state/queuedFiles/QueuedFilesActions.js"));
var confirmDeletionActions = _interopRequireWildcard(__webpack_require__(/*! state/confirmDeletion/ConfirmDeletionActions */ "./client/src/state/confirmDeletion/ConfirmDeletionActions.js"));
var _moveFilesMutation = _interopRequireDefault(__webpack_require__(/*! state/files/moveFilesMutation */ "./client/src/state/files/moveFilesMutation.js"));
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _reactSelectable = __webpack_require__(/*! react-selectable */ "./node_modules/react-selectable/dist/react-selectable.js");
var _configShape = _interopRequireDefault(__webpack_require__(/*! lib/configShape */ "./client/src/lib/configShape.js"));
var _getStatusCodeMessage = _interopRequireDefault(__webpack_require__(/*! lib/getStatusCodeMessage */ "./client/src/lib/getStatusCodeMessage.js"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _MoveModal = _interopRequireDefault(__webpack_require__(/*! ../MoveModal/MoveModal */ "./client/src/containers/MoveModal/MoveModal.js"));
var _GalleryDND = _interopRequireDefault(__webpack_require__(/*! ./GalleryDND */ "./client/src/containers/Gallery/GalleryDND.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ACTION_TYPES = {
  DELETE: 'delete',
  ARCHIVE: 'archive',
  EDIT: 'edit',
  MOVE: 'move',
  PUBLISH: 'publish',
  UNPUBLISH: 'unpublish',
  INSERT: 'insert',
  ADMIN: 'admin',
  SELECT: 'select'
};
class Gallery extends _react.Component {
  constructor(props) {
    super(props);
    this.handleOpenFolder = this.handleOpenFolder.bind(this);
    this.handleOpenFile = this.handleOpenFile.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddedFile = this.handleAddedFile.bind(this);
    this.handlePreviewLoaded = this.handlePreviewLoaded.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.handleRemoveErroredUpload = this.handleRemoveErroredUpload.bind(this);
    this.handleUploadProgress = this.handleUploadProgress.bind(this);
    this.handleSending = this.handleSending.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSetPage = this.handleSetPage.bind(this);
    this.handleSuccessfulUpload = this.handleSuccessfulUpload.bind(this);
    this.handleQueueComplete = this.handleQueueComplete.bind(this);
    this.handleFailedUpload = this.handleFailedUpload.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleEnableDropzone = this.handleEnableDropzone.bind(this);
    this.handleMoveFiles = this.handleMoveFiles.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkPublish = this.handleBulkPublish.bind(this);
    this.handleBulkUnpublish = this.handleBulkUnpublish.bind(this);
    this.handleBulkMove = this.handleBulkMove.bind(this);
    this.handleBulkInsert = this.handleBulkInsert.bind(this);
    this.handleBeginSelection = this.handleBeginSelection.bind(this);
    this.handleGroupSelect = this.handleGroupSelect.bind(this);
    this.handleClearSelection = this.handleClearSelection.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.toggleSelectConcat = this.toggleSelectConcat.bind(this);
    this.getSelectableFiles = this.getSelectableFiles.bind(this);
  }
  componentDidMount() {
    this.initSortDropdown();
    window.addEventListener('keydown', this.toggleSelectConcat);
    window.addEventListener('keyup', this.toggleSelectConcat);
  }
  componentDidUpdate(prevProps) {
    this.initSortDropdown();
    this.initFlushUploadFiles(prevProps);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.toggleSelectConcat);
    window.removeEventListener('keyup', this.toggleSelectConcat);
  }
  initFlushUploadFiles(prevProps) {
    if (this.props.view !== 'tile') {
      const $select = this.getSortElement();
      $select.off('change');
    }
    if (prevProps.folderId !== this.props.folderId) {
      this.props.actions.queuedFiles.purgeUploadQueue();
    }
  }
  getSortElement() {
    return (0, _jquery.default)(this.gallery).find('.gallery__sort .dropdown');
  }
  getSearchMessage(filters) {
    const messages = [];
    if (filters.name) {
      messages.push(_i18n.default._t('AssetAdmin.SEARCHRESULTSMESSAGEKEYWORDS', 'with keywords \'{name}\''));
    }
    if (filters.lastEditedFrom && filters.lastEditedTo) {
      messages.push(_i18n.default._t('AssetAdmin.SEARCHRESULTSMESSAGEEDITEDBETWEEN', 'last edited between \'{lastEditedFrom}\' and \'{lastEditedTo}\''));
    } else if (filters.lastEditedFrom) {
      messages.push(_i18n.default._t('AssetAdmin.SEARCHRESULTSMESSAGEEDITEDFROM', 'last edited after \'{lastEditedFrom}\''));
    } else if (filters.lastEditedTo) {
      messages.push(_i18n.default._t('AssetAdmin.SEARCHRESULTSMESSAGEEDITEDTO', 'last edited before \'{lastEditedTo}\''));
    }
    if (filters.appCategory) {
      messages.push(_i18n.default._t('AssetAdmin.SEARCHRESULTSMESSAGECATEGORY', 'categorised as \'{appCategory}\''));
    }
    if (filters.currentFolderOnly && this.props.folder.title) {
      messages.push(_i18n.default._t('AssetAdmin.SEARCHRESULTSMESSAGELIMIT', 'limited to the folder \'{folder}\''));
    }
    const parts = [messages.slice(0, -1).join(`${_i18n.default._t('AssetAdmin.JOIN', ',')} `), messages.slice(-1)].filter(part => part).join(` ${_i18n.default._t('AssetAdmin.JOINLAST', 'and')} `);
    if (parts === '') {
      return '';
    }
    const searchResults = {
      parts: _i18n.default.inject(parts, Object.assign({
        folder: this.props.folder.title
      }, filters, {
        appCategory: filters.appCategory ? filters.appCategory.toLowerCase() : undefined
      }))
    };
    return _i18n.default.inject(_i18n.default._t('AssetAdmin.SEARCHRESULTSMESSAGE', 'Search results {parts}'), searchResults);
  }
  getSelection(firstId, lastId) {
    const selectable = this.getSelectableFiles();
    const indexes = [firstId, lastId].map(id => selectable.findIndex(file => file.id === id)).filter(index => index !== -1).sort((a, b) => a - b);
    if (indexes.length !== 2) {
      return indexes.map(index => selectable[index].id);
    }
    const [firstIndex, lastIndex] = indexes;
    return selectable.filter((file, index) => index >= firstIndex && index <= lastIndex).map(file => file.id);
  }
  getSelectableFiles() {
    const selectable = this.props.files.filter(file => file.id);
    if (this.props.type === ACTION_TYPES.SELECT) {
      return selectable.filter(item => item.type !== 'folder');
    }
    return selectable;
  }
  handleBulkInsert(event, items) {
    this.props.onInsertMany(event, items);
  }
  handleBulkPublish(event, items) {
    const publishItems = items.map(item => item.id);
    if (!publishItems.length) {
      this.props.actions.gallery.deselectFiles();
      return Promise.resolve(true);
    }
    this.props.actions.gallery.setLoading(true);
    return this.props.onPublish(publishItems).then(resultItems => {
      this.props.actions.gallery.setLoading(false);
      this.props.actions.toasts.success(_i18n.default.sprintf(_i18n.default._t('AssetAdmin.BULK_ACTIONS_PUBLISH_SUCCESS', '%s folders/files were successfully published.'), resultItems.length));
      this.props.actions.gallery.deselectFiles();
    });
  }
  handleBulkUnpublish(event, items) {
    const unpublishItems = items.filter(item => item.published).map(item => item.id);
    if (!unpublishItems.length) {
      this.props.actions.gallery.deselectFiles();
      return Promise.resolve(true);
    }
    this.props.actions.gallery.setLoading(true);
    return this.props.onUnpublish(unpublishItems).then(resultItems => {
      this.props.actions.gallery.setLoading(false);
      this.props.actions.toasts.success(_i18n.default.sprintf(_i18n.default._t('AssetAdmin.BULK_ACTIONS_UNPUBLISH_SUCCESS', '%s folders/files were successfully unpublished.'), resultItems.length));
      this.props.actions.gallery.deselectFiles();
    });
  }
  initSortDropdown() {
    if (this.props.view === 'tile') {
      const $select = this.getSortElement();
      $select.chosen({
        allow_single_deselect: true,
        disable_search_threshold: 20
      });
      $select.off('change');
      $select.on('change', () => $select.find(':selected')[0].click());
    }
  }
  handleSort(value) {
    this.props.actions.queuedFiles.purgeUploadQueue();
    this.props.onSort(value);
  }
  handleSetPage(page) {
    this.props.onSetPage(page);
  }
  handleCancelUpload(fileData) {
    fileData.xhr.abort();
    this.props.actions.queuedFiles.removeQueuedFile(fileData.queuedId);
  }
  handleRemoveErroredUpload(fileData) {
    this.props.actions.queuedFiles.removeQueuedFile(fileData.queuedId);
  }
  handleAddedFile(fileData) {
    this.props.actions.queuedFiles.addQueuedFile(fileData);
  }
  handlePreviewLoaded(fileData, previewData) {
    this.props.actions.queuedFiles.updateQueuedFile(fileData.queuedId, previewData);
  }
  handleSending(file, xhr) {
    this.props.actions.queuedFiles.updateQueuedFile(file._queuedId, {
      xhr
    });
  }
  handleUploadProgress(file, progress) {
    this.props.actions.queuedFiles.updateQueuedFile(file._queuedId, {
      progress
    });
  }
  handleSuccessfulUpload(fileXhr) {
    const json = JSON.parse(fileXhr.xhr.response);
    if (typeof json[0].error !== 'undefined') {
      this.handleFailedUpload(fileXhr);
      return;
    }
    this.props.actions.queuedFiles.succeedUpload(fileXhr._queuedId, json[0]);
    if (this.props.onSuccessfulUpload) {
      this.props.onSuccessfulUpload(json);
    }
    const filesInProgress = this.props.queuedFiles.items.reduce((inProgress, file) => {
      if (file.progress !== 100) {
        return inProgress + 1;
      }
      return inProgress;
    }, 0);
    if (!this.props.fileId && !this.props.selectedFiles.length && filesInProgress === 0) {
      const lastFile = json.pop();
      this.props.onOpenFile(lastFile.id);
    }
  }
  handleQueueComplete() {
    if (this.props.onSuccessfulUploadQueue) {
      this.props.onSuccessfulUploadQueue();
    }
  }
  handleFailedUpload(fileXhr, response) {
    const statusCodeMessage = fileXhr.xhr && fileXhr.xhr.status ? (0, _getStatusCodeMessage.default)(fileXhr.xhr.status, fileXhr.xhr) : '';
    this.props.actions.queuedFiles.failUpload(fileXhr._queuedId, response, statusCodeMessage);
  }
  itemIsSelected(id) {
    return this.props.selectedFiles.indexOf(id) > -1;
  }
  toggleSelectConcat(event) {
    this.props.actions.gallery.setConcatenateSelect(this.isConcat(event));
  }
  isConcat(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey;
  }
  itemIsHighlighted(id) {
    return this.props.fileId === id;
  }
  hasOpenedItem() {
    return !!this.props.fileId;
  }
  handleClearSearch(event) {
    this.props.onClearSearch(event);
  }
  handleGroupSelect(items, event) {
    const {
      setSelectedFiles,
      selectFiles
    } = this.props.actions.gallery;
    const selectableFiles = this.getSelectableFiles();
    const selectItems = items.filter((id, index) => {
      if (items.indexOf(id) !== index) {
        return false;
      }
      return selectableFiles.find(file => file.id === id);
    });
    const concat = this.props.concatenateSelect || this.isConcat(event);
    if (this.props.maxFilesSelect !== null) {
      let totalFiles = selectItems.length;
      if (concat) {
        const totalSelected = this.props.selectedFiles.filter(id => !this.props.selectedFiles.includes(id)).concat(this.props.selectedFiles);
        totalFiles = totalSelected.length;
      }
      if (totalFiles >= this.props.maxFilesSelect) {
        return;
      }
    }
    if (!concat) {
      setSelectedFiles(selectItems);
    } else {
      selectFiles(selectItems);
    }
  }
  handleClearSelection() {
    this.props.actions.gallery.deselectFiles();
  }
  handleSelectAll() {
    const ids = this.props.files.map(file => file.id);
    this.handleGroupSelect(ids, new Event('na'));
  }
  handleBeginSelection(e) {
    let node = e.target;
    while (node) {
      if (node.classList.contains('griddle-footer')) {
        return false;
      }
      if (node.classList.contains('gallery__main--selectable')) {
        break;
      }
      node = node.parentNode;
    }
    return true;
  }
  handleOpenFolder(event, folder) {
    event.preventDefault();
    this.props.onOpenFolder(folder.id);
  }
  handleOpenFile(event, file) {
    event.preventDefault();
    if (file.created === null) {
      return;
    }
    if ((!this.props.selectedFiles.length || this.props.maxFilesSelect === 1) && this.props.type === ACTION_TYPES.SELECT) {
      this.handleSelect(event, file);
    }
    this.props.onOpenFile(file.id, file);
  }
  handleSelect(event, item) {
    const maxFiles = this.props.maxFilesSelect;
    const selectable = this.getSelectableFiles();
    let selectedItemIDs = selectable.filter(file => file.id === item.id).map(file => file.id);
    if (maxFiles === 1) {
      this.props.actions.gallery.setSelectedFiles(selectedItemIDs);
      return;
    }
    if (this.props.selectedFiles.indexOf(item.id) === -1) {
      if (event.shiftKey) {
        selectedItemIDs = this.getSelection(this.props.lastSelected, item.id);
      }
      const totalSelected = this.props.selectedFiles.filter(id => !selectedItemIDs.includes(id)).concat(selectedItemIDs);
      if (totalSelected.length > maxFiles && maxFiles !== null) {
        return;
      }
      this.props.actions.gallery.selectFiles(selectedItemIDs);
      this.props.actions.gallery.setLastSelected(item.id);
    } else {
      this.props.actions.gallery.deselectFiles([item.id]);
      if (event.shiftKey) {
        this.props.actions.gallery.setLastSelected(null);
      }
    }
  }
  handleEnableDropzone(enabled) {
    this.props.actions.gallery.setEnableDropzone(enabled);
  }
  handleMoveFiles(folderId, fileIds) {
    this.props.actions.files.moveFiles(folderId, fileIds).then(() => {
      const duration = _index.default.MOVE_SUCCESS_DURATION;
      const message = `+${fileIds.length}`;
      this.props.actions.gallery.setFileBadge(folderId, message, 'success', duration);
      if (typeof this.props.onMoveFilesSuccess === 'function') {
        this.props.onMoveFilesSuccess(folderId, fileIds);
      }
    }).catch(() => {
      this.props.actions.toasts.error(_i18n.default._t('AssetAdmin.FAILED_MOVE', 'There was an error moving the selected items.'));
    });
  }
  handleBulkEdit(event, items) {
    this.handleOpenFile(event, items[0]);
  }
  handleBulkMove() {
    this.props.actions.gallery.activateModal(_index.default.MODAL_MOVE);
  }
  renderTransitionBulkActions() {
    return this.renderBulkActions();
  }
  renderBulkActions() {
    const {
      type,
      dialog,
      maxFilesSelect,
      files,
      selectedFiles,
      BulkActionsComponent,
      sectionConfig
    } = this.props;
    const actionFilter = type === ACTION_TYPES.SELECT || dialog ? action => action.value === ACTION_TYPES.INSERT : action => action.value !== ACTION_TYPES.INSERT;
    const deleteButtonFilter = sectionConfig.archiveFiles ? action => action.value !== ACTION_TYPES.DELETE : action => action.value !== ACTION_TYPES.ARCHIVE;
    const actions = _index.default.BULK_ACTIONS.filter(actionFilter).filter(deleteButtonFilter).map(action => {
      if (action.callback) {
        return action;
      }
      switch (action.value) {
        case ACTION_TYPES.DELETE:
        case ACTION_TYPES.ARCHIVE:
          {
            return {
              ...action,
              callback: (event, items) => {
                this.props.actions.confirmDeletion.confirm(items);
              },
              confirm: undefined
            };
          }
        case ACTION_TYPES.EDIT:
          {
            return {
              ...action,
              callback: this.handleBulkEdit
            };
          }
        case ACTION_TYPES.MOVE:
          {
            return {
              ...action,
              callback: this.handleBulkMove
            };
          }
        case ACTION_TYPES.PUBLISH:
          {
            return {
              ...action,
              callback: this.handleBulkPublish
            };
          }
        case ACTION_TYPES.UNPUBLISH:
          {
            return {
              ...action,
              callback: this.handleBulkUnpublish
            };
          }
        case ACTION_TYPES.INSERT:
          {
            return {
              ...action,
              callback: this.handleBulkInsert,
              color: 'primary'
            };
          }
        default:
          {
            return action;
          }
      }
    });
    const selected = selectedFiles.map(id => files.find(file => file && id === file.id)).filter(item => item);
    if (selected.length > 0 && [ACTION_TYPES.ADMIN, ACTION_TYPES.SELECT].includes(type)) {
      return _react.default.createElement(BulkActionsComponent, {
        actions: actions,
        items: selected,
        total: maxFilesSelect,
        key: selected.length > 0,
        container: this.gallery,
        showCount: maxFilesSelect !== 1,
        onClearSelection: this.handleClearSelection,
        onSelectAll: this.handleSelectAll
      });
    }
    return null;
  }
  renderGalleryView() {
    const GalleryView = this.props.view === 'table' ? _TableView.default : _ThumbnailView.default;
    const files = this.props.files.map(file => {
      const selected = this.itemIsSelected(file.id);
      const highlighted = this.itemIsHighlighted(file.id);
      const key = (file.queuedId ? `queueId${file.queuedId}` : `id${file.id}`) + (selected ? '--selected' : '');
      return {
        ...file,
        selected,
        highlighted,
        key
      };
    });
    const {
      type,
      loading,
      dialog,
      page,
      totalCount,
      limit,
      sort,
      selectedFiles,
      badges,
      maxFilesSelect,
      sectionConfig
    } = this.props;
    const selectableItems = type === ACTION_TYPES.SELECT || type === ACTION_TYPES.ADMIN && (!maxFilesSelect || maxFilesSelect > 1);
    const props = {
      selectableItems,
      selectableFolders: type !== ACTION_TYPES.SELECT && !dialog,
      files,
      loading,
      page,
      totalCount,
      limit,
      sort,
      selectedFiles,
      badges,
      onSort: this.handleSort,
      onSetPage: this.handleSetPage,
      onOpenFile: this.handleOpenFile,
      onOpenFolder: this.handleOpenFolder,
      onSelect: this.handleSelect,
      onCancelUpload: this.handleCancelUpload,
      onDropFiles: this.handleMoveFiles,
      onRemoveErroredUpload: this.handleRemoveErroredUpload,
      onEnableDropzone: this.handleEnableDropzone,
      sectionConfig,
      canDrag: type === ACTION_TYPES.ADMIN,
      maxFilesSelect
    };
    return _react.default.createElement(GalleryView, props);
  }
  renderToolbar() {
    const {
      GalleryToolbar,
      sort,
      view,
      folder,
      onCreateFolder,
      onOpenFolder,
      onViewChange
    } = this.props;
    const props = {
      onMoveFiles: this.handleMoveFiles,
      onSort: this.handleSort,
      onCreateFolder,
      onOpenFolder,
      onViewChange,
      view,
      sort,
      folder
    };
    return _react.default.createElement(GalleryToolbar, props);
  }
  render() {
    const {
      folder,
      loading,
      errorMessage,
      graphQLErrors,
      noticeMessage
    } = this.props;
    const Loading = this.props.LoadingComponent;
    const hasGraphQLErrors = graphQLErrors && graphQLErrors.length > 0;
    if (!folder) {
      if (errorMessage || hasGraphQLErrors) {
        return _react.default.createElement("div", {
          className: "gallery__error flexbox-area-grow"
        }, _react.default.createElement("div", {
          className: "gallery__error-message"
        }, _react.default.createElement("h3", null, _i18n.default._t('AssetAdmin.DROPZONE_RESPONSE_ERROR', 'Server responded with an error.')), errorMessage && _react.default.createElement("p", null, errorMessage), hasGraphQLErrors && graphQLErrors.map((error, index) => _react.default.createElement("p", {
          key: index
        }, error))));
      }
      if (loading) {
        return _react.default.createElement("div", {
          className: "flexbox-area-grow"
        }, _react.default.createElement(Loading, null));
      }
      return _react.default.createElement("div", {
        className: "flexbox-area-grow"
      }, _react.default.createElement("div", {
        className: "editor__file-preview-message--file-missing m-t-3"
      }, _i18n.default._t('Admin.UNKNOWN_ERROR', 'An unknown error has occurred')));
    }
    const messages = _react.default.createElement("div", {
      className: "gallery_messages"
    }, errorMessage && _react.default.createElement(_FormAlert.default, {
      value: errorMessage,
      type: "danger"
    }), noticeMessage && _react.default.createElement(_FormAlert.default, {
      value: noticeMessage,
      type: "success"
    }));
    const dimensions = {
      height: _index.default.THUMBNAIL_HEIGHT,
      width: _index.default.THUMBNAIL_WIDTH
    };
    const dropzoneOptions = {
      url: this.props.createFileApiUrl,
      method: this.props.createFileApiMethod,
      paramName: 'Upload',
      clickable: '#upload-button',
      ...this.props.sectionConfig.dropzoneOptions
    };
    const securityID = this.props.securityId;
    const canEdit = this.props.folder.canEdit && this.props.enableDropzone;
    const galleryClasses = ['panel', 'panel--padded', 'panel--scrollable', 'gallery__main', 'fill-height'];
    if (this.props.type === ACTION_TYPES.INSERT) {
      galleryClasses.push('insert-media-modal__main');
    }
    const cssClasses = galleryClasses;
    if (this.hasOpenedItem()) {
      cssClasses.push('gallery__main--has-opened-item');
    }
    return _react.default.createElement("div", {
      className: "flexbox-area-grow gallery__outer",
      ref: gallery => {
        this.gallery = gallery;
      }
    }, this.renderTransitionBulkActions(), _react.default.createElement(_GalleryDND.default, {
      className: galleryClasses.join(' ')
    }, this.renderToolbar(), _react.default.createElement(_reactSelectable.SelectableGroup, {
      enabled: this.props.view === 'tile' && this.props.type === ACTION_TYPES.ADMIN,
      className: "flexbox-area-grow fill-height gallery__main--selectable",
      onSelection: this.handleGroupSelect,
      onNonItemClick: this.handleClearSelection,
      onBeginSelection: this.handleBeginSelection,
      preventDefault: false,
      fixedPosition: true
    }, _react.default.createElement(_AssetDropzone.default, {
      name: "gallery-container",
      className: "flexbox-area-grow",
      canUpload: canEdit,
      onAddedFile: this.handleAddedFile,
      onPreviewLoaded: this.handlePreviewLoaded,
      onError: this.handleFailedUpload,
      onSuccess: this.handleSuccessfulUpload,
      onQueueComplete: this.handleQueueComplete,
      onSending: this.handleSending,
      onUploadProgress: this.handleUploadProgress,
      preview: dimensions,
      folderId: this.props.folderId,
      options: dropzoneOptions,
      securityID: securityID,
      uploadButton: false
    }, messages, this.renderGalleryView()))), this.props.loading && _react.default.createElement(Loading, null), _react.default.createElement(_MoveModal.default, {
      sectionConfig: this.props.sectionConfig,
      folderId: this.props.folderId,
      onSuccess: this.props.onMoveFilesSuccess,
      onOpenFolder: this.props.onOpenFolder
    }));
  }
}
exports.Component = Gallery;
const sharedDefaultProps = {
  page: 1,
  limit: 15
};
const sharedPropTypes = {
  sectionConfig: _configShape.default,
  loading: _propTypes.default.bool,
  sort: _propTypes.default.string,
  files: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number,
    parent: _propTypes.default.shape({
      id: _propTypes.default.number
    })
  })).isRequired,
  selectedFiles: _propTypes.default.arrayOf(_propTypes.default.number),
  totalCount: _propTypes.default.number,
  page: _propTypes.default.number,
  limit: _propTypes.default.number,
  badges: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number,
    message: _propTypes.default.node,
    status: _propTypes.default.string
  })),
  onOpenFile: _propTypes.default.func.isRequired,
  onOpenFolder: _propTypes.default.func.isRequired,
  onSort: _propTypes.default.func.isRequired,
  onSetPage: _propTypes.default.func.isRequired,
  maxFilesSelect: _propTypes.default.number
};
const galleryViewDefaultProps = exports.galleryViewDefaultProps = Object.assign({}, sharedDefaultProps, {
  selectableItems: false
});
const galleryViewPropTypes = exports.galleryViewPropTypes = Object.assign({}, sharedPropTypes, {
  selectableItems: _propTypes.default.bool,
  selectableFolders: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  onCancelUpload: _propTypes.default.func,
  onRemoveErroredUpload: _propTypes.default.func,
  onEnableDropzone: _propTypes.default.func
});
Gallery.defaultProps = Object.assign({}, sharedDefaultProps, {
  type: ACTION_TYPES.ADMIN,
  view: 'tile',
  enableDropzone: true,
  dialog: false,
  BulkActionsComponent: _BulkActions.default
});
Gallery.propTypes = Object.assign({}, sharedPropTypes, {
  onSuccessfulUpload: _propTypes.default.func,
  onSuccessfulUploadQueue: _propTypes.default.func,
  onCreateFolder: _propTypes.default.func,
  onMoveFilesSuccess: _propTypes.default.func,
  onPublish: _propTypes.default.func,
  onUnpublish: _propTypes.default.func,
  type: _propTypes.default.oneOf(['insert-media', 'insert-link', ACTION_TYPES.SELECT, ACTION_TYPES.ADMIN]),
  view: _propTypes.default.oneOf(['tile', 'table']),
  lastSelected: _propTypes.default.number,
  dialog: _propTypes.default.bool,
  fileId: _propTypes.default.number,
  folderId: _propTypes.default.number.isRequired,
  folder: _propTypes.default.shape({
    id: _propTypes.default.number,
    title: _propTypes.default.string,
    parentId: _propTypes.default.number,
    canView: _propTypes.default.bool,
    canEdit: _propTypes.default.bool
  }),
  files: _propTypes.default.array,
  errorMessage: _propTypes.default.string,
  graphQLErrors: _propTypes.default.arrayOf(_propTypes.default.string),
  actions: _propTypes.default.object,
  securityId: _propTypes.default.string,
  onViewChange: _propTypes.default.func.isRequired,
  createFileApiUrl: _propTypes.default.string,
  createFileApiMethod: _propTypes.default.string,
  search: _propTypes.default.object,
  enableDropzone: _propTypes.default.bool,
  concatenateSelect: _propTypes.default.bool,
  GalleryToolbar: _propTypes.default.elementType,
  sorters: _propTypes.default.arrayOf(_propTypes.default.shape({
    field: _propTypes.default.string.isRequired,
    direction: _propTypes.default.oneOf(['asc', 'desc']).isRequired,
    label: _propTypes.default.string.isRequired
  })).isRequired,
  BulkActionsComponent: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
});
function mapStateToProps(state, ownProps) {
  let {
    sort
  } = ownProps;
  const {
    selectedFiles,
    errorMessage,
    noticeMessage,
    enableDropzone,
    badges,
    concatenateSelect,
    loading,
    sorters,
    lastSelected
  } = state.assetAdmin.gallery;
  if (!sort && sorters && sorters[0]) {
    sort = `${sorters[0].field},${sorters[0].direction}`;
  }
  return {
    lastSelected,
    selectedFiles,
    errorMessage,
    noticeMessage,
    enableDropzone,
    badges,
    concatenateSelect,
    loading: ownProps.loading || loading,
    queuedFiles: state.assetAdmin.queuedFiles,
    securityId: state.config.SecurityID,
    sorters,
    sort
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      gallery: (0, _redux.bindActionCreators)(galleryActions, dispatch),
      toasts: (0, _redux.bindActionCreators)(toastsActions, dispatch),
      queuedFiles: (0, _redux.bindActionCreators)(queuedFilesActions, dispatch),
      confirmDeletion: (0, _redux.bindActionCreators)(confirmDeletionActions, dispatch)
    }
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['GalleryToolbar', 'Loading'], (GalleryToolbar, Loading) => ({
  GalleryToolbar,
  LoadingComponent: Loading
}), () => 'AssetAdmin.Gallery'), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _moveFilesMutation.default, component => (0, _hoc.withApollo)(component))(Gallery);

/***/ }),

/***/ "./client/src/containers/Gallery/GalleryDND.js":
/*!*****************************************************!*\
  !*** ./client/src/containers/Gallery/GalleryDND.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _GalleryItemDragLayer = _interopRequireDefault(__webpack_require__(/*! components/GalleryItem/GalleryItemDragLayer */ "./client/src/components/GalleryItem/GalleryItemDragLayer.js"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _withDragDropContext = _interopRequireDefault(__webpack_require__(/*! lib/withDragDropContext */ "lib/withDragDropContext"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class GalleryDND extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false
    };
    this.mounted = false;
    this.handleDrop = this.handleDrop.bind(this);
  }
  componentDidMount() {
    this.mounted = true;
    window.addEventListener('drop', this.handleDrop, true);
  }
  componentDidUpdate() {
    setTimeout(() => {
      if (!this.mounted || !this.context.dragDropManager) {
        return;
      }
      const manager = this.context.dragDropManager;
      const dragging = manager.monitor.isDragging();
      if (this.state.dragging !== dragging) {
        this.setState({
          dragging
        });
      }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('drop', this.handleDrop, true);
  }
  handleDrop() {
    const manager = this.context.dragDropManager;
    const backend = manager && manager.backend;
    if (backend && backend.isDraggingNativeItem()) {
      backend.endDragNativeItem();
    }
  }
  render() {
    const {
      className,
      children
    } = this.props;
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(className, {
        'gallery__main--dragging': this.state.dragging
      })
    }, children, _react.default.createElement(_GalleryItemDragLayer.default, null));
  }
}
GalleryDND.contextTypes = {
  dragDropManager: _propTypes.default.object
};
GalleryDND.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};
var _default = exports["default"] = (0, _withDragDropContext.default)(GalleryDND);

/***/ }),

/***/ "./client/src/containers/InsertMediaModal/InsertMediaModal.js":
/*!********************************************************************!*\
  !*** ./client/src/containers/InsertMediaModal/InsertMediaModal.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _AssetAdmin = _interopRequireDefault(__webpack_require__(/*! containers/AssetAdmin/AssetAdmin */ "./client/src/containers/AssetAdmin/AssetAdmin.js"));
var _stateRouter = _interopRequireDefault(__webpack_require__(/*! containers/AssetAdmin/stateRouter */ "./client/src/containers/AssetAdmin/stateRouter.js"));
var _fileSchemaModalHandler = _interopRequireDefault(__webpack_require__(/*! containers/InsertLinkModal/fileSchemaModalHandler */ "containers/InsertLinkModal/fileSchemaModalHandler"));
var galleryActions = _interopRequireWildcard(__webpack_require__(/*! state/gallery/GalleryActions */ "./client/src/state/gallery/GalleryActions.js"));
var modalActions = _interopRequireWildcard(__webpack_require__(/*! state/modal/ModalActions */ "./client/src/state/modal/ModalActions.js"));
var _FormBuilderModal = _interopRequireDefault(__webpack_require__(/*! components/FormBuilderModal/FormBuilderModal */ "components/FormBuilderModal/FormBuilderModal"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _getFormSchema = _interopRequireDefault(__webpack_require__(/*! lib/getFormSchema */ "./client/src/lib/getFormSchema.js"));
var _qs = _interopRequireDefault(__webpack_require__(/*! qs */ "qs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class InsertMediaModal extends _react.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const {
      isOpen,
      onBrowse,
      setOverrides,
      fileAttributes,
      folderId
    } = this.props;
    if (!isOpen) {
      onBrowse(folderId || 0);
    } else if (typeof setOverrides === 'function' && fileAttributes.ID) {
      setOverrides(this.props);
      onBrowse(folderId, fileAttributes.ID);
    }
  }
  componentDidUpdate(prevProps) {
    if (!this.props.isOpen && prevProps.isOpen) {
      this.props.onBrowse(this.props.folderId);
      this.props.actions.gallery.deselectFiles();
    }
    if (typeof prevProps.setOverrides === 'function' && this.props.isOpen && !prevProps.isOpen) {
      prevProps.setOverrides(this.props);
      this.props.onBrowse(this.props.folderId, this.props.fileAttributes ? this.props.fileAttributes.ID : null);
    }
  }
  getSectionProps() {
    return {
      ...this.props,
      dialog: true,
      toolbarChildren: this.renderToolbarChildren(),
      onSubmitEditor: this.handleSubmit,
      onReplaceUrl: this.props.onBrowse
    };
  }
  getModalProps() {
    const {
      onHide,
      onInsert,
      sectionConfig,
      schemaUrl,
      className,
      ...props
    } = this.props;
    return {
      ...props,
      className: (0, _classnames.default)('insert-media-modal', className),
      size: 'lg',
      showCloseButton: false
    };
  }
  handleSubmit(data, action, submitFn, file) {
    if (action === 'action_insert') {
      return this.props.onInsert(data, file);
    }
    return submitFn();
  }
  renderToolbarChildren() {
    return _react.default.createElement("button", {
      type: "button",
      className: "close modal__close-button insert-media-modal__close-button",
      onClick: this.props.onClosed,
      "aria-label": _i18n.default._t('FormBuilderModal.CLOSE', 'Close')
    }, _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"));
  }
  render() {
    const modalProps = this.getModalProps();
    const sectionProps = this.getSectionProps();
    const assetAdmin = this.props.isOpen ? _react.default.createElement(_AssetAdmin.default, sectionProps) : null;
    return _react.default.createElement(_FormBuilderModal.default, modalProps, assetAdmin);
  }
}
exports.Component = InsertMediaModal;
InsertMediaModal.propTypes = {
  sectionConfig: _propTypes.default.shape({
    url: _propTypes.default.string,
    form: _propTypes.default.object
  }),
  type: _propTypes.default.oneOf(['insert-media', 'insert-link', 'select', 'admin']),
  schemaUrl: _propTypes.default.string,
  isOpen: _propTypes.default.bool,
  setOverrides: _propTypes.default.func,
  onInsert: _propTypes.default.func.isRequired,
  fileAttributes: _propTypes.default.shape({
    ID: _propTypes.default.number,
    AltText: _propTypes.default.string,
    Width: _propTypes.default.number,
    Height: _propTypes.default.number,
    Loading: _propTypes.default.string,
    TitleTooltip: _propTypes.default.string,
    Alignment: _propTypes.default.string,
    Description: _propTypes.default.string,
    TargetBlank: _propTypes.default.bool
  }),
  requireLinkText: _propTypes.default.bool,
  folderId: _propTypes.default.number,
  fileId: _propTypes.default.number,
  viewAction: _propTypes.default.string,
  query: _propTypes.default.object,
  getUrl: _propTypes.default.func,
  onBrowse: _propTypes.default.func.isRequired,
  onClosed: _propTypes.default.func,
  className: _propTypes.default.string,
  actions: _propTypes.default.object,
  maxFiles: _propTypes.default.number,
  fileSelected: _propTypes.default.bool
};
InsertMediaModal.defaultProps = {
  className: '',
  fileAttributes: {},
  type: 'insert-media',
  folderId: 0,
  maxFiles: 1
};
function mapStateToProps(state, ownProps) {
  const config = ownProps.sectionConfig;
  if (!config) {
    return {};
  }
  let folderId = 0;
  if (ownProps.folderId !== null) {
    folderId = ownProps.folderId;
  } else if (ownProps.folder) {
    folderId = ownProps.folder.id;
  }
  const fileId = ownProps.fileAttributes ? ownProps.fileAttributes.ID : ownProps.fileId;
  const formSchema = state.assetAdmin.modal.formSchema;
  const props = {
    config,
    viewAction: ownProps.viewAction,
    folderId,
    type: formSchema && formSchema.type,
    fileId
  };
  const {
    schemaUrl,
    targetId
  } = (0, _getFormSchema.default)(props);
  if (!schemaUrl) {
    return {};
  }
  const queryMap = {};
  if (ownProps.requireLinkText) {
    queryMap.requireLinkText = true;
  }
  if (ownProps.fileSelected) {
    queryMap.fileSelected = true;
  }
  let query = _qs.default.stringify(queryMap);
  query = query ? `?${query}` : '';
  return {
    schemaUrl: `${schemaUrl}/${targetId}${query}`,
    type: formSchema && formSchema.type
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      gallery: (0, _redux.bindActionCreators)(galleryActions, dispatch),
      modal: (0, _redux.bindActionCreators)(modalActions, dispatch)
    }
  };
}
var _default = exports["default"] = (0, _redux.compose)(_stateRouter.default, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _fileSchemaModalHandler.default)(InsertMediaModal);

/***/ }),

/***/ "./client/src/containers/MoveModal/MoveModal.js":
/*!******************************************************!*\
  !*** ./client/src/containers/MoveModal/MoveModal.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _redux = __webpack_require__(/*! redux */ "redux");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _GalleryActions = __webpack_require__(/*! state/gallery/GalleryActions */ "./client/src/state/gallery/GalleryActions.js");
var _ToastsActions = __webpack_require__(/*! state/toasts/ToastsActions */ "state/toasts/ToastsActions");
var _FormBuilderModal = _interopRequireDefault(__webpack_require__(/*! components/FormBuilderModal/FormBuilderModal */ "components/FormBuilderModal/FormBuilderModal"));
var _configShape = _interopRequireDefault(__webpack_require__(/*! lib/configShape */ "./client/src/lib/configShape.js"));
var _moveFilesMutation = _interopRequireDefault(__webpack_require__(/*! state/files/moveFilesMutation */ "./client/src/state/files/moveFilesMutation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MoveModal extends _react.default.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.timeout = null;
  }
  handleSubmit(_ref) {
    let {
      FolderID
    } = _ref;
    const {
      moveFiles
    } = this.props.actions.files;
    const {
      selectedFiles,
      onSuccess,
      onClosed,
      setNotice,
      setError,
      setBadge
    } = this.props;
    return moveFiles(FolderID || 0, selectedFiles).then(_ref2 => {
      let {
        data: {
          moveFiles: {
            id,
            filename
          }
        }
      } = _ref2;
      if (typeof onSuccess === 'function') {
        onSuccess(FolderID, selectedFiles);
      }
      setBadge(id, `${selectedFiles.length}`, 'success', _index.default.MOVE_SUCCESS_DURATION);
      setNotice(_i18n.default.sprintf(_i18n.default._t('AssetAdmin.MOVED_ITEMS_TO', 'Moved %s item(s) to %s'), selectedFiles.length, filename), [{
        label: _i18n.default._t('AssetAdmin.GO_TO_FOLDER', 'Go to folder'),
        onClick: () => this.props.onOpenFolder(id)
      }]);
      onClosed();
    }).catch(() => {
      setError(_i18n.default._t('AssetAdmin.FAILED_MOVE', 'There was an error moving the selected items.'));
    });
  }
  render() {
    const {
      isOpen,
      onClosed,
      title,
      folderId,
      sectionConfig
    } = this.props;
    const {
      schemaUrl
    } = sectionConfig.form.moveForm;
    return _react.default.createElement(_FormBuilderModal.default, {
      title: title,
      isOpen: isOpen,
      onClosed: onClosed,
      onSubmit: this.handleSubmit,
      identifier: "AssetAdmin.MoveForm",
      schemaUrl: `${schemaUrl}/${folderId}`
    });
  }
}
MoveModal.propTypes = {
  sectionConfig: _configShape.default,
  folderId: _propTypes.default.number.isRequired,
  isOpen: _propTypes.default.bool,
  onClosed: _propTypes.default.func,
  setNotice: _propTypes.default.func,
  setBadge: _propTypes.default.func,
  setError: _propTypes.default.func,
  title: _propTypes.default.string,
  onSuccess: _propTypes.default.func,
  onOpenFolder: _propTypes.default.func.isRequired,
  selectedFiles: _propTypes.default.array.isRequired,
  actions: _propTypes.default.shape({
    files: _propTypes.default.shape({
      moveFiles: _propTypes.default.func
    })
  }).isRequired
};
MoveModal.defaultProps = {
  isOpen: false
};
function mapStateToProps(state) {
  const {
    modal,
    selectedFiles
  } = state.assetAdmin.gallery;
  return {
    isOpen: modal === _index.default.MODAL_MOVE,
    selectedFiles,
    title: _i18n.default.sprintf(_i18n.default._t('AssetAdmin.MOVE_ITEMS_TO', 'Move %s item(s) to...'), selectedFiles.length)
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onClosed() {
      dispatch((0, _GalleryActions.deactivateModal)());
    },
    setNotice(msg) {
      let actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      dispatch((0, _ToastsActions.display)({
        text: msg,
        type: 'success',
        actions
      }));
    },
    setError(msg) {
      dispatch((0, _ToastsActions.display)({
        text: msg,
        type: 'error'
      }));
    },
    setBadge() {
      dispatch((0, _GalleryActions.setFileBadge)(...arguments));
    }
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _moveFilesMutation.default)(MoveModal);

/***/ }),

/***/ "./client/src/containers/TableView/TableView.js":
/*!******************************************************!*\
  !*** ./client/src/containers/TableView/TableView.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _griddleReact = _interopRequireDefault(__webpack_require__(/*! griddle-react */ "./node_modules/griddle-react/modules/griddle.jsx.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _FileStatusIcon = _interopRequireDefault(__webpack_require__(/*! components/FileStatusIcon/FileStatusIcon */ "components/FileStatusIcon/FileStatusIcon"));
var _Gallery = __webpack_require__(/*! containers/Gallery/Gallery */ "./client/src/containers/Gallery/Gallery.js");
var _DataFormat = __webpack_require__(/*! lib/DataFormat */ "lib/DataFormat");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _redux = __webpack_require__(/*! redux */ "redux");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class TableView extends _react.Component {
  constructor(props) {
    super(props);
    this.getColumns = this.getColumns.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSetPage = this.handleSetPage.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.renderNoItemsNotice = this.renderNoItemsNotice.bind(this);
  }
  getColumns() {
    const columns = ['thumbnail', 'title', 'status', 'size', 'lastEdited'];
    if (this.props.selectableItems) {
      columns.unshift('selected');
    }
    return columns;
  }
  getColumnConfig() {
    return [{
      columnName: 'selected',
      sortable: false,
      displayName: '',
      cssClassName: 'gallery__table-column--select',
      customComponent: this.renderSelect
    }, {
      columnName: 'thumbnail',
      sortable: false,
      displayName: '',
      cssClassName: 'gallery__table-column--image',
      customComponent: this.renderThumbnail
    }, {
      columnName: 'title',
      customCompareFn: () => 0,
      displayName: _i18n.default._t('File.TITLE', 'Title'),
      cssClassName: 'gallery__table-column--title',
      customComponent: this.renderTitle
    }, {
      columnName: 'status',
      sortable: false,
      cssClassName: 'sort--disabled',
      customComponent: this.renderStatus,
      displayName: _i18n.default._t('File.STATUS', 'Status')
    }, {
      columnName: 'lastEdited',
      displayName: _i18n.default._t('File.MODIFIED', 'Modified'),
      customComponent: this.renderDate
    }, {
      columnName: 'size',
      sortable: false,
      displayName: _i18n.default._t('File.SIZE', 'Size'),
      cssClassName: 'sort--disabled',
      customComponent: this.renderSize
    }];
  }
  getRowMetadata(rowData) {
    return `gallery__table-row ${rowData.highlighted ? 'gallery__table-row--highlighted' : ''}`;
  }
  getTableProps() {
    const [sortColumn, sortDirection] = this.props.sort.split(',');
    return {
      tableClassName: 'gallery__table table table-hover',
      gridClassName: 'gallery__main-view--table',
      rowMetadata: {
        bodyCssClassName: this.getRowMetadata,
        key: 'key'
      },
      sortAscendingComponent: '',
      sortDescendingComponent: '',
      useExternal: true,
      externalSetPage: this.handleSetPage,
      externalChangeSort: this.handleSort,
      externalSetFilter: () => null,
      externalSetPageSize: () => null,
      externalCurrentPage: this.props.page - 1,
      externalMaxPage: Math.ceil(this.props.totalCount / this.props.limit),
      externalSortColumn: sortColumn,
      externalSortAscending: sortDirection === 'asc',
      initialSort: sortColumn,
      columns: this.getColumns(),
      columnMetadata: this.getColumnConfig(),
      useGriddleStyles: false,
      onRowClick: this.handleRowClick,
      results: this.props.files,
      customNoDataComponent: this.renderNoItemsNotice
    };
  }
  handleActivate(event, item) {
    if (item.type === 'folder') {
      this.props.onOpenFolder(event, item);
    } else {
      this.props.onOpenFile(event, item);
    }
  }
  handleRowClick(row, event) {
    const item = row.props.data;
    if (event.currentTarget.classList.contains('gallery__table-column--select')) {
      event.stopPropagation();
      event.preventDefault();
      if (typeof this.props.onSelect === 'function') {
        this.props.onSelect(event, item);
        return;
      }
    }
    this.handleActivate(event, item);
  }
  handleSort(column, ascending) {
    const direction = ascending ? 'asc' : 'desc';
    this.props.onSort(`${column},${direction}`);
  }
  handleSetPage(page) {
    this.props.onSetPage(page + 1);
  }
  preventFocus(event) {
    event.preventDefault();
  }
  renderNoItemsNotice() {
    if (this.props.files.length === 0 && !this.props.loading) {
      return _react.default.createElement("p", {
        className: "gallery__no-item-notice"
      }, _i18n.default._t('AssetAdmin.NOITEMSFOUND'));
    }
    return null;
  }
  renderSize(props) {
    if (props.rowData.type === 'folder') {
      return null;
    }
    const description = (0, _DataFormat.fileSize)(props.data);
    return _react.default.createElement("span", null, description);
  }
  renderStatus(props) {
    let flags = [];
    const item = props.rowData;
    const {
      VersionedBadge
    } = this.props;
    if (item.type !== 'folder') {
      if (item.draft) {
        flags.push({
          key: 'status-draft',
          status: 'draft'
        });
      } else if (item.modified) {
        flags.push({
          key: 'status-modified',
          status: 'modified'
        });
      }
    }
    flags = flags.map(_ref => {
      let {
        ...attributes
      } = _ref;
      return _react.default.createElement(VersionedBadge, attributes);
    });
    return flags ? _react.default.createElement("span", null, flags) : null;
  }
  renderProgressBar(rowData) {
    if (!rowData.queuedId || rowData.message && rowData.message.type === 'error') {
      return null;
    }
    if (rowData.id > 0) {
      return _react.default.createElement("div", {
        className: "gallery__progress-bar--complete"
      });
    }
    const progressBarProps = {
      className: 'gallery__progress-bar-progress',
      style: {
        width: `${rowData.progress}%`
      }
    };
    return _react.default.createElement("div", {
      className: "gallery__progress-bar"
    }, _react.default.createElement("div", progressBarProps));
  }
  renderRestrictedAccess(rowData) {
    const {
      hasRestrictedAccess
    } = rowData;
    const attrs = {
      fileID: rowData.id,
      placement: 'top',
      hasRestrictedAccess
    };
    return _react.default.createElement(_FileStatusIcon.default, attrs);
  }
  renderTrackedFormUpload(rowData) {
    const {
      isTrackedFormUpload,
      hasRestrictedAccess
    } = rowData;
    const attrs = {
      fileID: rowData.id,
      placement: 'top',
      isTrackedFormUpload,
      hasRestrictedAccess
    };
    return _react.default.createElement(_FileStatusIcon.default, attrs);
  }
  renderTitle(props) {
    const progress = this.renderProgressBar(props.rowData);
    return _react.default.createElement("div", {
      className: "fill-width"
    }, _react.default.createElement("div", {
      className: "flexbox-area-grow"
    }, _react.default.createElement("span", null, props.data), props.rowData.hasRestrictedAccess && this.renderRestrictedAccess(props.rowData), props.rowData.isTrackedFormUpload && this.renderTrackedFormUpload(props.rowData)), progress);
  }
  renderSelect(props) {
    if (this.props.selectableItems && (this.props.selectableFolders || props.rowData.type !== 'folder')) {
      const checkboxProps = {
        type: 'checkbox',
        title: _i18n.default._t('AssetAdmin.SELECT'),
        defaultChecked: props.data,
        tabIndex: -1,
        onMouseDown: this.preventFocus
      };
      const maxSelected = ![null, 1].includes(this.props.maxFilesSelect) && this.props.selectedFiles.length >= this.props.maxFilesSelect;
      if (maxSelected && !props.data) {
        checkboxProps.disabled = true;
      }
      return _react.default.createElement("input", checkboxProps);
    }
    return null;
  }
  renderDate(props) {
    if (props.rowData.type === 'folder') {
      return null;
    }
    moment.locale(_i18n.default.detectLocale());
    return _react.default.createElement("span", null, moment(props.data).format('L LT'));
  }
  renderThumbnail(props) {
    const url = props.data || props.rowData.url;
    const uploading = props.rowData.queuedId && !props.rowData.id;
    const category = props.rowData.category || 'false';
    const baseClass = 'gallery__table-image';
    const classNames = [baseClass];
    const styles = {};
    classNames.push(`${baseClass}--${category}`);
    if (category === 'image' && url) {
      styles.backgroundImage = `url("${url}")`;
    }
    if (!uploading && !url && category !== 'folder') {
      classNames.push(`${baseClass}--error`);
    }
    return _react.default.createElement("div", {
      className: classNames.join(' '),
      style: styles
    });
  }
  render() {
    return _react.default.createElement(_griddleReact.default, this.getTableProps());
  }
}
exports.Component = TableView;
TableView.defaultProps = _Gallery.galleryViewDefaultProps;
TableView.propTypes = {
  ..._Gallery.galleryViewPropTypes,
  sort: _propTypes.default.string.isRequired,
  VersionedBadge: _propTypes.default.elementType
};
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['VersionedBadge'], VersionedBadge => ({
  VersionedBadge
})))(TableView);

/***/ }),

/***/ "./client/src/containers/ThumbnailView/ThumbnailView.js":
/*!**************************************************************!*\
  !*** ./client/src/containers/ThumbnailView/ThumbnailView.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _Gallery = __webpack_require__(/*! containers/Gallery/Gallery */ "./client/src/containers/Gallery/Gallery.js");
var _griddleReact = _interopRequireDefault(__webpack_require__(/*! griddle-react */ "./node_modules/griddle-react/modules/griddle.jsx.js"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ThumbnailView extends _react.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.handleSetPage = this.handleSetPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  handleDrag(dragging) {
    this.props.onEnableDropzone(!dragging);
  }
  handleSetPage(page) {
    this.props.onSetPage(page + 1);
  }
  handleNextPage() {
    const currentPage = this.props.page - 1;
    this.handleSetPage(currentPage + 1);
  }
  handlePrevPage() {
    const currentPage = this.props.page - 1;
    if (currentPage === 0) {
      this.handleSetPage(currentPage);
      return;
    }
    this.handleSetPage(currentPage - 1);
  }
  folderFilter(file) {
    return file.type === 'folder';
  }
  fileFilter(file) {
    return file.type !== 'folder';
  }
  renderPagination() {
    if (this.props.totalCount <= this.props.limit) {
      return null;
    }
    const props = {
      setPage: this.handleSetPage,
      maxPage: Math.ceil(this.props.totalCount / this.props.limit),
      next: this.handleNextPage,
      nextText: _i18n.default._t('AssetAdmin.NEXT', 'Next'),
      previous: this.handlePrevPage,
      previousText: _i18n.default._t('AssetAdmin.PREVIOUS', 'Previous'),
      currentPage: this.props.page - 1,
      useGriddleStyles: false
    };
    return _react.default.createElement("div", {
      className: "griddle-footer"
    }, _react.default.createElement(_griddleReact.default.GridPagination, props));
  }
  renderItem(item) {
    const {
      File,
      Folder,
      badges,
      sectionConfig,
      selectedFiles,
      selectableItems,
      selectableFolders
    } = this.props;
    const badge = badges.find(badgeItem => badgeItem.id === item.id);
    let props = {
      sectionConfig,
      key: item.key,
      selectableKey: item.id,
      item,
      selectedFiles,
      onDrag: this.handleDrag,
      badge,
      canDrag: this.props.canDrag
    };
    if (item.queuedId && !item.id) {
      const {
        onCancelUpload,
        onRemoveErroredUpload
      } = this.props;
      props = {
        ...props,
        onCancelUpload,
        onRemoveErroredUpload
      };
    } else {
      const {
        onOpenFolder,
        onOpenFile
      } = this.props;
      props = {
        ...props,
        onActivate: item.type === 'folder' ? onOpenFolder : onOpenFile
      };
    }
    if (selectableItems && (selectableFolders || item.type !== 'folder')) {
      const maxSelected = ![null, 1].includes(this.props.maxFilesSelect) && this.props.selectedFiles.length >= this.props.maxFilesSelect;
      const onSelect = this.props.maxFilesSelect === 1 ? props.onActivate : this.props.onSelect;
      props = {
        ...props,
        selectable: true,
        onSelect,
        maxSelected
      };
    }
    if (item.type === 'folder') {
      const {
        onDropFiles
      } = this.props;
      props = {
        ...props,
        onDropFiles
      };
      return _react.default.createElement(Folder, props);
    }
    return _react.default.createElement(File, props);
  }
  render() {
    const className = 'gallery__main-view--tile';
    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement("div", {
      className: "gallery__folders"
    }, this.props.files.filter(this.folderFilter).map(this.renderItem)), _react.default.createElement("div", {
      className: "gallery__files"
    }, this.props.files.filter(this.fileFilter).map(this.renderItem)), this.props.files.length === 0 && !this.props.loading && _react.default.createElement("p", {
      className: "gallery__no-item-notice"
    }, _i18n.default._t('AssetAdmin.NOITEMSFOUND')), _react.default.createElement("div", {
      className: "gallery__load"
    }, this.renderPagination()));
  }
}
exports.Component = ThumbnailView;
ThumbnailView.defaultProps = _Gallery.galleryViewDefaultProps;
ThumbnailView.propTypes = {
  ..._Gallery.galleryViewPropTypes,
  File: _propTypes.default.elementType.isRequired,
  Folder: _propTypes.default.elementType.isRequired
};
const injector = (0, _Injector.inject)(['GalleryItemFile', 'GalleryItemFolder'], (GalleryItemFile, GalleryItemFolder) => ({
  File: GalleryItemFile,
  Folder: GalleryItemFolder
}), () => 'AssetAdmin.Gallery.ThumbnailView');
var _default = exports["default"] = injector(ThumbnailView);

/***/ }),

/***/ "./client/src/entwine/TinyMCE_ssmedia_sizepressets.js":
/*!************************************************************!*\
  !*** ./client/src/entwine/TinyMCE_ssmedia_sizepressets.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.imageSizePresetButtons = imageSizePresetButtons;
function presetButton(editor, preset) {
  const {
    name,
    width,
    text
  } = preset;
  const formatName = `ssmedia${name}`;
  editor.on('init', () => {
    editor.formatter.register(formatName, {
      selector: 'img',
      attributes: {
        width: width ? width.toString() : ''
      }
    });
  });
  const image = () => {
    let img = editor.selection.getNode();
    if (img.tagName !== 'IMG' && img.children.item('img')) {
      img = img.children.item('img');
    }
    return img && img.tagName === 'IMG' ? img : undefined;
  };
  const disableCheck = button => {
    const img = image();
    button.disabled(img && width ? img.naturalWidth < width : false);
  };
  const formatMatches = () => {
    if (editor.formatter.match(formatName)) {
      return true;
    }
    const img = image();
    if (!width && img) {
      const imgWidth = img.getAttribute('width');
      return !imgWidth || imgWidth.toString() === img.naturalWidth.toString();
    }
    return false;
  };
  const onPostRender = event => {
    const button = event.target;
    const onFormatChanged = () => {
      button.active(formatMatches());
    };
    editor.on('NodeChange', () => {
      disableCheck(button);
      onFormatChanged();
    });
    disableCheck(button);
    if (editor.formatter) {
      editor.formatter.formatChanged(formatName, onFormatChanged);
      if (formatMatches()) {
        editor.formatter.apply(formatName);
        const img = image();
        if (img) {
          img.setAttribute('width', width || img.naturalWidth);
        }
      }
    }
  };
  const onAction = () => {
    const img = image();
    if (!img) {
      return;
    }
    img.removeAttribute('height');
    img.removeAttribute('width');
    editor.formatter.apply(formatName);
    if (width) {
      img.setAttribute('height', img.clientHeight);
    } else {
      img.setAttribute('width', img.naturalWidth);
      img.setAttribute('height', img.naturalHeight);
    }
  };
  editor.ui.registry.addButton(formatName, {
    text,
    onAction,
    onPostRender
  });
  return formatName;
}
function imageSizePresetButtons(editor, sizePresets) {
  return sizePresets.map(preset => presetButton(editor, preset));
}

/***/ }),

/***/ "./client/src/lib/configShape.js":
/*!***************************************!*\
  !*** ./client/src/lib/configShape.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const configShape = _propTypes.default.shape({
  url: _propTypes.default.string,
  limit: _propTypes.default.number,
  imageRetry: _propTypes.default.shape({
    minRetry: _propTypes.default.number,
    maxRetry: _propTypes.default.number,
    expiry: _propTypes.default.number
  }),
  form: _propTypes.default.object,
  dropzoneOptions: _propTypes.default.object
});
var _default = exports["default"] = configShape;

/***/ }),

/***/ "./client/src/lib/fileFragments.js":
/*!*****************************************!*\
  !*** ./client/src/lib/fileFragments.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fileInterface = exports.file = void 0;
const fileInterface = exports.fileInterface = `
  fragment FileInterfaceFields on FileInterface {
    canDelete
    canEdit
    canView
    category
    exists
    filename
    id
    lastEdited
    name
    parentId
    title
    type
    url
    visibility
    hasRestrictedAccess
  }
`;
const file = exports.file = `
  fragment FileFields on File {
    draft
    extension
    published
    modified
    size
    smallThumbnail
    thumbnail
    version
    isTrackedFormUpload
  }
`;

/***/ }),

/***/ "./client/src/lib/fileShape.js":
/*!*************************************!*\
  !*** ./client/src/lib/fileShape.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fileShape = _propTypes.default.shape({
  canEdit: _propTypes.default.bool,
  canDelete: _propTypes.default.bool,
  canView: _propTypes.default.bool,
  exists: _propTypes.default.bool,
  type: _propTypes.default.string,
  smallThumbnail: _propTypes.default.string,
  thumbnail: _propTypes.default.string,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  category: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  id: _propTypes.default.number,
  url: _propTypes.default.string,
  title: _propTypes.default.string,
  progress: _propTypes.default.number,
  visibility: _propTypes.default.string,
  hasRestrictedAccess: _propTypes.default.bool,
  isTrackedFormUpload: _propTypes.default.bool
});
var _default = exports["default"] = fileShape;

/***/ }),

/***/ "./client/src/lib/getFormSchema.js":
/*!*****************************************!*\
  !*** ./client/src/lib/getFormSchema.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getFormSchema;
var _index = _interopRequireDefault(__webpack_require__(/*! constants/index */ "./client/src/constants/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  CREATE_FOLDER,
  EDIT_FILE
} = _index.default.ACTIONS;
function getFormSchema(_ref) {
  let {
    config: {
      form
    },
    viewAction,
    folderId,
    fileId,
    type
  } = _ref;
  let schemaUrl = null;
  let targetId = null;
  if (viewAction === CREATE_FOLDER) {
    schemaUrl = form.folderCreateForm.schemaUrl;
    targetId = folderId;
    return {
      schemaUrl,
      targetId
    };
  }
  if (viewAction === EDIT_FILE && fileId) {
    switch (type) {
      case 'insert-media':
        schemaUrl = form.fileInsertForm.schemaUrl;
        break;
      case 'insert-link':
        schemaUrl = form.fileEditorLinkForm.schemaUrl;
        break;
      case 'select':
        schemaUrl = form.fileSelectForm.schemaUrl;
        break;
      case 'admin':
      default:
        schemaUrl = form.fileEditForm.schemaUrl;
        break;
    }
    targetId = fileId;
    return {
      schemaUrl,
      targetId
    };
  }
  return {};
}

/***/ }),

/***/ "./client/src/lib/getStatusCodeMessage.js":
/*!************************************************!*\
  !*** ./client/src/lib/getStatusCodeMessage.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getStatusCodeMessage;
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getStatusCodeMessage(statusCode, xhr) {
  if (statusCode === 413) {
    return _i18n.default._t('AssetAdmin.ERROR_FILE_SIZE', 'File size limit exceeded');
  }
  if (statusCode === 403) {
    if (xhr && typeof xhr.response === 'string') {
      return xhr.response;
    }
  }
  return _i18n.default._t('AssetAdmin.ERROR_DEFAULT', 'Something went wrong, please try again');
}

/***/ }),

/***/ "./client/src/state/confirmDeletion/ConfirmDeletionActionTypes.js":
/*!************************************************************************!*\
  !*** ./client/src/state/confirmDeletion/ConfirmDeletionActionTypes.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  CONFIRM_DELETION_ASK: 'CONFIRM_DELETION_ASK',
  CONFIRM_DELETION_CONFIRM: 'CONFIRM_DELETION_CONFIRM',
  CONFIRM_DELETION_CANCEL: 'CONFIRM_DELETION_CANCEL',
  CONFIRM_DELETION_RESET: 'CONFIRM_DELETION_RESET',
  CONFIRM_DELETION_MODAL_CLOSE: 'CONFIRM_DELETION_MODAL_CLOSE'
};

/***/ }),

/***/ "./client/src/state/confirmDeletion/ConfirmDeletionActions.js":
/*!********************************************************************!*\
  !*** ./client/src/state/confirmDeletion/ConfirmDeletionActions.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.cancel = cancel;
exports.confirm = confirm;
exports.deleting = deleting;
exports.modalClose = modalClose;
exports.reset = reset;
var _ConfirmDeletionActionTypes = _interopRequireDefault(__webpack_require__(/*! ./ConfirmDeletionActionTypes */ "./client/src/state/confirmDeletion/ConfirmDeletionActionTypes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function confirm(files) {
  return {
    type: _ConfirmDeletionActionTypes.default.CONFIRM_DELETION_ASK,
    payload: {
      files
    }
  };
}
function deleting() {
  return {
    type: _ConfirmDeletionActionTypes.default.CONFIRM_DELETION_CONFIRM,
    payload: {}
  };
}
function cancel() {
  return {
    type: _ConfirmDeletionActionTypes.default.CONFIRM_DELETION_CANCEL,
    payload: {}
  };
}
function reset() {
  return {
    type: _ConfirmDeletionActionTypes.default.CONFIRM_DELETION_RESET,
    payload: {}
  };
}
function modalClose() {
  return {
    type: _ConfirmDeletionActionTypes.default.CONFIRM_DELETION_MODAL_CLOSE,
    payload: {}
  };
}

/***/ }),

/***/ "./client/src/state/confirmDeletion/ConfirmDeletionTransitions.js":
/*!************************************************************************!*\
  !*** ./client/src/state/confirmDeletion/ConfirmDeletionTransitions.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NO_TRANSITION = exports.DELETING = exports.CANCELING = void 0;
const NO_TRANSITION = exports.NO_TRANSITION = false;
const CANCELING = exports.CANCELING = 'canceling';
const DELETING = exports.DELETING = 'deleting';

/***/ }),

/***/ "./client/src/state/displaySearch/DisplaySearchActionTypes.js":
/*!********************************************************************!*\
  !*** ./client/src/state/displaySearch/DisplaySearchActionTypes.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  TOGGLE_SEARCH: 'TOGGLE_SEARCH',
  OPEN_SEARCH: 'OPEN_SEARCH',
  CLOSE_SEARCH: 'CLOSE_SEARCH'
};

/***/ }),

/***/ "./client/src/state/displaySearch/DisplaySearchActions.js":
/*!****************************************************************!*\
  !*** ./client/src/state/displaySearch/DisplaySearchActions.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.closeSearch = closeSearch;
exports.openSearch = openSearch;
exports.toggleSearch = toggleSearch;
var _DisplaySearchActionTypes = _interopRequireDefault(__webpack_require__(/*! ./DisplaySearchActionTypes */ "./client/src/state/displaySearch/DisplaySearchActionTypes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function toggleSearch() {
  return {
    type: _DisplaySearchActionTypes.default.TOGGLE_SEARCH,
    payload: null
  };
}
function openSearch() {
  return {
    type: _DisplaySearchActionTypes.default.OPEN_SEARCH,
    payload: null
  };
}
function closeSearch() {
  return {
    type: _DisplaySearchActionTypes.default.CLOSE_SEARCH,
    payload: null
  };
}

/***/ }),

/***/ "./client/src/state/files/buildPublicationMutation.js":
/*!************************************************************!*\
  !*** ./client/src/state/files/buildPublicationMutation.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _fileFragments = __webpack_require__(/*! lib/fileFragments */ "./client/src/lib/fileFragments.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const buildPublicationMutation = mutationName => {
  const operationName = mutationName.charAt(0).toUpperCase() + mutationName.slice(1);
  const mutation = (0, _graphqlTag.default)`
  mutation ${operationName}($ids:[ID]!, $force:Boolean, $quiet:Boolean) {
    ${mutationName}(ids: $ids, force: $force, quiet: $quiet) {
      ...on File {
        __typename
        ...FileInterfaceFields
        ...FileFields
      }
      ...on PublicationNotice {
        __typename
        noticeType
        message
        ids
      }
    }
  }
  ${_fileFragments.fileInterface}
  ${_fileFragments.file}
`;
  const isProd = "development" === 'production';
  const config = {
    props: _ref => {
      let {
        mutate,
        ownProps: {
          actions
        }
      } = _ref;
      const mutationAction = function (ids) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        let quiet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isProd;
        return mutate({
          variables: {
            ids,
            quiet,
            force
          }
        });
      };
      return {
        actions: {
          ...actions,
          files: {
            ...actions.files,
            [mutationName]: mutationAction
          }
        }
      };
    }
  };
  return {
    mutation,
    config
  };
};
var _default = exports["default"] = buildPublicationMutation;

/***/ }),

/***/ "./client/src/state/files/deleteFilesMutation.js":
/*!*******************************************************!*\
  !*** ./client/src/state/files/deleteFilesMutation.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _Injector = _interopRequireDefault(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`mutation DeleteFiles($ids:[ID]!) {
  deleteFiles(ids: $ids)
}`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps
    } = _ref;
    const {
      actions
    } = ownProps;
    const deleteFiles = function (ids) {
      let parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return mutate({
        variables: {
          ids
        },
        update: store => {
          const readFilesQuery = _Injector.default.query.get('ReadFilesQuery');
          const readFilesConfig = readFilesQuery.getApolloConfig();
          const variables = readFilesConfig.options(ownProps).variables;
          if (parentId !== null) {
            variables.rootFilter.id = parentId;
            variables.rootFilter.anyChildId = null;
          }
          const query = readFilesQuery.getGraphqlAST();
          const data = store.readQuery({
            query,
            variables
          });
          if (!data) {
            return;
          }
          const newData = JSON.parse(JSON.stringify(data));
          if (newData.readFiles.nodes) {
            let {
              nodes
            } = newData.readFiles.nodes[0].children;
            nodes = nodes.filter(node => !ids.includes(node.id));
            newData.readFiles.nodes[0].children.nodes = nodes;
            newData.readFiles.nodes[0].children.pageInfo.totalCount = nodes.length;
          } else {
            let {
              nodes
            } = newData.readFiles[0].children;
            nodes = nodes.filter(node => !ids.includes(node.id));
            newData.readFiles[0].children.nodes = nodes;
            newData.readFiles[0].children.pageInfo.totalCount = nodes.length;
          }
          store.writeQuery({
            query,
            data: newData,
            variables
          });
        }
      });
    };
    return {
      actions: {
        ...actions,
        files: {
          ...actions.files,
          deleteFiles
        }
      }
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/files/moveFilesMutation.js":
/*!*****************************************************!*\
  !*** ./client/src/state/files/moveFilesMutation.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _fileFragments = __webpack_require__(/*! lib/fileFragments */ "./client/src/lib/fileFragments.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
  mutation MoveFiles($folderId:ID!, $fileIds:[ID]!) {
    moveFiles(folderId: $folderId, fileIds: $fileIds) {
      ...FileInterfaceFields
      ...FileFields
    }
  }
  ${_fileFragments.fileInterface}
  ${_fileFragments.file}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions = {}
      }
    } = _ref;
    return {
      actions: Object.assign({}, actions, {
        files: Object.assign({}, actions.files, {
          moveFiles: (folderId, fileIds) => mutate({
            variables: {
              folderId,
              fileIds
            },
            update: () => {
              window.ss.apolloClient.resetStore();
            }
          })
        })
      })
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/files/publishFilesMutation.js":
/*!********************************************************!*\
  !*** ./client/src/state/files/publishFilesMutation.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _buildPublicationMutation = _interopRequireDefault(__webpack_require__(/*! ./buildPublicationMutation */ "./client/src/state/files/buildPublicationMutation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  mutation,
  config
} = (0, _buildPublicationMutation.default)('publishFiles');
exports.config = config;
exports.mutation = mutation;
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/files/unpublishFilesMutation.js":
/*!**********************************************************!*\
  !*** ./client/src/state/files/unpublishFilesMutation.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _buildPublicationMutation = _interopRequireDefault(__webpack_require__(/*! ./buildPublicationMutation */ "./client/src/state/files/buildPublicationMutation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  mutation,
  config
} = (0, _buildPublicationMutation.default)('unpublishFiles');
exports.config = config;
exports.mutation = mutation;
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/gallery/GalleryActionTypes.js":
/*!********************************************************!*\
  !*** ./client/src/state/gallery/GalleryActionTypes.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = ['SET_LAST_SELECTED', 'SET_SELECTED_FILES', 'DESELECT_FILES', 'SELECT_FILES', 'LOAD_FILE_REQUEST', 'LOAD_FILE_SUCCESS', 'HIGHLIGHT_FILES', 'UPDATE_BATCH_ACTIONS', 'SET_NOTICE_MESSAGE', 'SET_ERROR_MESSAGE', 'SET_ENABLE_DROPZONE', 'SET_FILE_BADGE', 'CLEAR_FILE_BADGE', 'ACTIVATE_MODAL', 'DEACTIVATE_MODAL', 'CONCATENATE_SELECT', 'SET_LOADING'].reduce((obj, item) => Object.assign(obj, {
  [item]: `GALLERY.${item}`
}), {});

/***/ }),

/***/ "./client/src/state/gallery/GalleryActions.js":
/*!****************************************************!*\
  !*** ./client/src/state/gallery/GalleryActions.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.activateModal = activateModal;
exports.clearFileBadge = clearFileBadge;
exports.deactivateModal = deactivateModal;
exports.deselectFiles = deselectFiles;
exports.loadFile = loadFile;
exports.selectFiles = selectFiles;
exports.setConcatenateSelect = setConcatenateSelect;
exports.setEnableDropzone = setEnableDropzone;
exports.setErrorMessage = setErrorMessage;
exports.setFileBadge = setFileBadge;
exports.setLastSelected = setLastSelected;
exports.setLoading = setLoading;
exports.setNoticeMessage = setNoticeMessage;
exports.setSelectedFiles = setSelectedFiles;
var _GalleryActionTypes = _interopRequireDefault(__webpack_require__(/*! ./GalleryActionTypes */ "./client/src/state/gallery/GalleryActionTypes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function setLastSelected(id) {
  return dispatch => {
    dispatch({
      type: _GalleryActionTypes.default.SET_LAST_SELECTED,
      payload: {
        id
      }
    });
  };
}
function setSelectedFiles(files) {
  return dispatch => {
    dispatch({
      type: _GalleryActionTypes.default.SET_SELECTED_FILES,
      payload: {
        files
      }
    });
  };
}
function loadFile(id, file) {
  return dispatch => {
    dispatch({
      type: _GalleryActionTypes.default.LOAD_FILE_SUCCESS,
      payload: {
        id,
        file
      }
    });
  };
}
function selectFiles() {
  let ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return dispatch => dispatch({
    type: _GalleryActionTypes.default.SELECT_FILES,
    payload: {
      ids
    }
  });
}
function setConcatenateSelect(concat) {
  return dispatch => dispatch({
    type: _GalleryActionTypes.default.CONCATENATE_SELECT,
    payload: !!concat
  });
}
function deselectFiles() {
  let ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return dispatch => dispatch({
    type: _GalleryActionTypes.default.DESELECT_FILES,
    payload: {
      ids
    }
  });
}
function setNoticeMessage(message) {
  return dispatch => dispatch({
    type: _GalleryActionTypes.default.SET_NOTICE_MESSAGE,
    payload: {
      message
    }
  });
}
function setErrorMessage(message) {
  return dispatch => dispatch({
    type: _GalleryActionTypes.default.SET_ERROR_MESSAGE,
    payload: {
      message
    }
  });
}
function setEnableDropzone(enableDropzone) {
  return dispatch => dispatch({
    type: _GalleryActionTypes.default.SET_ENABLE_DROPZONE,
    payload: {
      enableDropzone
    }
  });
}
function clearFileBadge(id) {
  return dispatch => {
    dispatch({
      type: _GalleryActionTypes.default.CLEAR_FILE_BADGE,
      payload: {
        id
      }
    });
  };
}
function setFileBadge(id, message, status, duration) {
  return (dispatch, getState) => {
    const {
      assetAdmin
    } = getState();
    const badge = assetAdmin.gallery.badges.find(item => item.id === id);
    if (badge && badge.timer) {
      clearTimeout(badge.timer);
    }
    const timer = duration > 0 ? setTimeout(() => clearFileBadge(id)(dispatch), duration) : null;
    dispatch({
      type: _GalleryActionTypes.default.SET_FILE_BADGE,
      payload: {
        id,
        message,
        status,
        timer
      }
    });
  };
}
function activateModal(name) {
  return dispatch => {
    dispatch({
      type: _GalleryActionTypes.default.ACTIVATE_MODAL,
      payload: name
    });
  };
}
function deactivateModal() {
  return dispatch => {
    dispatch({
      type: _GalleryActionTypes.default.DEACTIVATE_MODAL
    });
  };
}
function setLoading(active) {
  return dispatch => {
    dispatch({
      type: _GalleryActionTypes.default.SET_LOADING,
      payload: !!active
    });
  };
}

/***/ }),

/***/ "./client/src/state/imageLoad/ImageLoadActionHandler.js":
/*!**************************************************************!*\
  !*** ./client/src/state/imageLoad/ImageLoadActionHandler.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaultImageFactory = exports["default"] = void 0;
var _ImageLoadStatus = _interopRequireDefault(__webpack_require__(/*! ./ImageLoadStatus */ "./client/src/state/imageLoad/ImageLoadStatus.js"));
var _ImageLoadLocker = _interopRequireDefault(__webpack_require__(/*! ./ImageLoadLocker */ "./client/src/state/imageLoad/ImageLoadLocker.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = {
  minRetry: 0,
  maxRetry: 0,
  expiry: 0,
  onStatusChange: () => null,
  onRetry: () => null,
  onReset: () => null,
  onTimeout: () => null
};
const defaultImageFactory = (url, resolve, reject) => {
  const img = new Image();
  img.onload = resolve;
  img.onerror = reject;
  img.src = url;
};
exports.defaultImageFactory = defaultImageFactory;
class ImageLoadActionHandler {
  constructor(options) {
    let factory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultImageFactory;
    this.options = {
      ...defaultOptions,
      ...options
    };
    this.factory = factory;
  }
  loadImage(url) {
    if (!this.options.minRetry) {
      return null;
    }
    if (!_ImageLoadLocker.default.lock(url)) {
      return null;
    }
    return this.loadImageLoop(url, this.options.minRetry);
  }
  loadImageLoop(url, retryAfter) {
    this.options.onStatusChange(url, _ImageLoadStatus.default.LOADING);
    return new Promise((resolve, reject) => this.factory(url, resolve, reject)).then(() => this.handleSuccess(url)).catch(() => this.handleError(url, retryAfter));
  }
  handleReset(url, resolve) {
    this.options.onReset(url);
    resolve();
  }
  handleTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
    this.options.onTimeout(id, delay);
    return id;
  }
  handleSuccess(url) {
    _ImageLoadLocker.default.unlock(url);
    this.options.onStatusChange(url, _ImageLoadStatus.default.SUCCESS);
  }
  handleFailure(url) {
    _ImageLoadLocker.default.unlock(url);
    this.options.onStatusChange(url, _ImageLoadStatus.default.FAILED);
    if (this.options.expiry) {
      return new Promise(resolve => {
        this.handleTimeout(() => this.handleReset(url, resolve), this.options.expiry * 1000);
      });
    }
    return null;
  }
  handleError(url, retryAfter) {
    if (retryAfter > this.options.maxRetry) {
      return this.handleFailure(url);
    }
    this.options.onStatusChange(url, _ImageLoadStatus.default.WAITING);
    return this.handleRetry(url, retryAfter);
  }
  handleRetry(url, retryAfter) {
    const promise = new Promise(resolve => {
      this.handleTimeout(() => resolve(this.loadImageLoop(url, retryAfter * 2)), retryAfter * 1000);
    });
    this.options.onRetry(url, retryAfter, promise);
    return promise;
  }
  setOnRetry(callback) {
    this.options.onRetry = callback;
  }
  setOnReset(callback) {
    this.options.onReset = callback;
  }
  setOnStatusChange(callback) {
    this.options.onStatusChange = callback;
  }
  setOnTimeout(callback) {
    this.options.onTimeout = callback;
  }
}
var _default = exports["default"] = ImageLoadActionHandler;

/***/ }),

/***/ "./client/src/state/imageLoad/ImageLoadActionTypes.js":
/*!************************************************************!*\
  !*** ./client/src/state/imageLoad/ImageLoadActionTypes.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  SET_STATUS: 'IMAGE_LOAD_SET_STATUS',
  RESET: 'IMAGE_LOAD_RESET'
};

/***/ }),

/***/ "./client/src/state/imageLoad/ImageLoadActions.js":
/*!********************************************************!*\
  !*** ./client/src/state/imageLoad/ImageLoadActions.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadImage = loadImage;
var _ImageLoadActionTypes = _interopRequireDefault(__webpack_require__(/*! ./ImageLoadActionTypes */ "./client/src/state/imageLoad/ImageLoadActionTypes.js"));
var _ImageLoadActionHandler = _interopRequireDefault(__webpack_require__(/*! ./ImageLoadActionHandler */ "./client/src/state/imageLoad/ImageLoadActionHandler.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function loadImage(url, options) {
  return (dispatch, getState) => {
    if (!url) {
      return null;
    }
    const state = getState();
    const currentFile = state.assetAdmin.imageLoad.files.find(file => file.url === url);
    if (currentFile) {
      return null;
    }
    const loadOptions = {
      ...options,
      onStatusChange: (statusURL, status) => dispatch({
        type: _ImageLoadActionTypes.default.SET_STATUS,
        payload: {
          status,
          url: statusURL
        }
      }),
      onReset: statusURL => dispatch({
        type: _ImageLoadActionTypes.default.RESET,
        payload: {
          url: statusURL
        }
      })
    };
    const handler = new _ImageLoadActionHandler.default(loadOptions);
    return handler.loadImage(url);
  };
}

/***/ }),

/***/ "./client/src/state/imageLoad/ImageLoadLocker.js":
/*!*******************************************************!*\
  !*** ./client/src/state/imageLoad/ImageLoadLocker.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
class ImageLoadLocker {
  constructor() {
    this.urls = [];
  }
  lock(url) {
    const index = this.urls.indexOf(url);
    if (index >= 0) {
      return false;
    }
    this.urls = [...this.urls, url];
    return true;
  }
  unlock(url) {
    this.urls = this.urls.filter(next => next !== url);
  }
}
exports.Component = ImageLoadLocker;
window.ss = window.ss || {};
window.ss.imagelocker = window.ss.imagelocker || new ImageLoadLocker();
var _default = exports["default"] = window.ss.imagelocker;

/***/ }),

/***/ "./client/src/state/imageLoad/ImageLoadStatus.js":
/*!*******************************************************!*\
  !*** ./client/src/state/imageLoad/ImageLoadStatus.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  DISABLED: 'DISABLED',
  NONE: 'NONE',
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
  WAITING: 'WAITING',
  FAILED: 'FAILED'
};

/***/ }),

/***/ "./client/src/state/modal/ModalActionTypes.js":
/*!****************************************************!*\
  !*** ./client/src/state/modal/ModalActionTypes.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  DEFINE_IMAGE_SIZE_PRESETS: 'DEFINE_IMAGE_SIZE_PRESETS',
  INIT_FORM_SCHEMA_STACK: 'INIT_FORM_SCHEMA_STACK',
  POP_FORM_SCHEMA: 'POP_FORM_SCHEMA',
  PUSH_FORM_SCHEMA: 'PUSH_FORM_SCHEMA',
  RESET: 'RESET',
  RESET_FORM_STACK: 'RESET_FORM_STACK'
};

/***/ }),

/***/ "./client/src/state/modal/ModalActions.js":
/*!************************************************!*\
  !*** ./client/src/state/modal/ModalActions.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defineImageSizePresets = defineImageSizePresets;
exports.initFormStack = initFormStack;
exports.popFormStackEntry = popFormStackEntry;
exports.pushFormStackEntry = pushFormStackEntry;
exports.reset = reset;
exports.resetFormStack = resetFormStack;
exports.stashFormValues = stashFormValues;
var _getIn = _interopRequireDefault(__webpack_require__(/*! redux-form/lib/structure/plain/getIn */ "./node_modules/redux-form/lib/structure/plain/getIn.js"));
var _SchemaActions = __webpack_require__(/*! state/schema/SchemaActions */ "state/schema/SchemaActions");
var _ModalActionTypes = _interopRequireDefault(__webpack_require__(/*! ./ModalActionTypes */ "./client/src/state/modal/ModalActionTypes.js"));
var _helpers = _interopRequireDefault(__webpack_require__(/*! ./helpers */ "./client/src/state/modal/helpers.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function defineImageSizePresets(imageSizePresets) {
  return {
    type: _ModalActionTypes.default.DEFINE_IMAGE_SIZE_PRESETS,
    payload: {
      imageSizePresets
    }
  };
}
function stashFormValues(formIdentifier, schemaUrl) {
  return (dispatch, getState) => {
    const state = getState();
    const values = (0, _getIn.default)(state.form.formState, `${formIdentifier}.values`);
    const fieldSchema = (0, _getIn.default)(state.form.formSchemas, `${schemaUrl}.schema.fields`);
    if (values) {
      const fields = Object.keys(values).filter(name => values[name] !== null && (0, _helpers.default)(name, fieldSchema)).map(name => ({
        name,
        value: values[name]
      }));
      dispatch((0, _SchemaActions.setSchemaStateOverrides)(schemaUrl, {
        fields
      }));
    }
  };
}
function pushFormStackEntry(type) {
  let nextType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return {
    type: _ModalActionTypes.default.PUSH_FORM_SCHEMA,
    payload: {
      formSchema: {
        type,
        nextType
      }
    }
  };
}
function initFormStack(type) {
  let nextType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return {
    type: _ModalActionTypes.default.INIT_FORM_SCHEMA_STACK,
    payload: {
      formSchema: {
        type,
        nextType
      }
    }
  };
}
function popFormStackEntry() {
  return {
    type: _ModalActionTypes.default.POP_FORM_SCHEMA
  };
}
function reset() {
  return {
    type: _ModalActionTypes.default.RESET
  };
}
function resetFormStack() {
  return {
    type: _ModalActionTypes.default.RESET_FORM_STACK
  };
}

/***/ }),

/***/ "./client/src/state/modal/helpers.js":
/*!*******************************************!*\
  !*** ./client/src/state/modal/helpers.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isStashableField;
exports.findField = findField;
function findField(fieldName, fieldTree) {
  let i;
  for (i = 0; i < fieldTree.length; i++) {
    const field = fieldTree[i];
    if (field.name === fieldName) {
      return field;
    }
    if (field.children) {
      const child = findField(fieldName, field.children);
      if (child) {
        return child;
      }
    }
  }
  return false;
}
function isStashableField(fieldName, fieldTree) {
  const field = findField(fieldName, fieldTree);
  return field && field.type !== 'hidden' && field.schemaType !== 'Structural' && !field.readOnly && !field.disabled;
}

/***/ }),

/***/ "./client/src/state/queuedFiles/QueuedFilesActionTypes.js":
/*!****************************************************************!*\
  !*** ./client/src/state/queuedFiles/QueuedFilesActionTypes.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  ADD_QUEUED_FILE: 'ADD_QUEUED_FILE',
  FAIL_UPLOAD: 'FAIL_UPLOAD',
  PURGE_UPLOAD_QUEUE: 'PURGE_UPLOAD_QUEUE',
  REMOVE_QUEUED_FILE: 'REMOVE_QUEUED_FILE',
  SUCCEED_UPLOAD: 'SUCCEED_UPLOAD',
  UPDATE_QUEUED_FILE: 'UPDATE_QUEUED_FILE'
};

/***/ }),

/***/ "./client/src/state/queuedFiles/QueuedFilesActions.js":
/*!************************************************************!*\
  !*** ./client/src/state/queuedFiles/QueuedFilesActions.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addQueuedFile = addQueuedFile;
exports.failUpload = failUpload;
exports.purgeUploadQueue = purgeUploadQueue;
exports.removeQueuedFile = removeQueuedFile;
exports.succeedUpload = succeedUpload;
exports.updateQueuedFile = updateQueuedFile;
var _QueuedFilesActionTypes = _interopRequireDefault(__webpack_require__(/*! ./QueuedFilesActionTypes */ "./client/src/state/queuedFiles/QueuedFilesActionTypes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function addQueuedFile(file) {
  return dispatch => dispatch({
    type: _QueuedFilesActionTypes.default.ADD_QUEUED_FILE,
    payload: {
      file
    }
  });
}
function failUpload(queuedId, response, statusCodeMessage) {
  return dispatch => {
    let message = response.message;
    if (response.errors && response.errors.length) {
      message = response.errors[0];
    }
    if (typeof response === 'string') {
      message = {
        value: statusCodeMessage || response,
        type: 'error'
      };
    }
    return dispatch({
      type: _QueuedFilesActionTypes.default.FAIL_UPLOAD,
      payload: {
        queuedId,
        message
      }
    });
  };
}
function purgeUploadQueue() {
  return dispatch => dispatch({
    type: _QueuedFilesActionTypes.default.PURGE_UPLOAD_QUEUE,
    payload: null
  });
}
function removeQueuedFile(queuedId) {
  return dispatch => dispatch({
    type: _QueuedFilesActionTypes.default.REMOVE_QUEUED_FILE,
    payload: {
      queuedId
    }
  });
}
function succeedUpload(queuedId, json) {
  return dispatch => dispatch({
    type: _QueuedFilesActionTypes.default.SUCCEED_UPLOAD,
    payload: {
      queuedId,
      json
    }
  });
}
function updateQueuedFile(queuedId, updates) {
  return dispatch => dispatch({
    type: _QueuedFilesActionTypes.default.UPDATE_QUEUED_FILE,
    payload: {
      queuedId,
      updates
    }
  });
}

/***/ }),

/***/ "./node_modules/create-react-class/factory.js":
/*!****************************************************!*\
  !*** ./node_modules/create-react-class/factory.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

// -- Inlined from fbjs --

var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function _invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var warning = function(){};

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

// /-- Inlined from fbjs --

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (true) {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillMount`.
     *
     * @optional
     */
    UNSAFE_componentWillMount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillReceiveProps`.
     *
     * @optional
     */
    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillUpdate`.
     *
     * @optional
     */
    UNSAFE_componentWillUpdate: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Similar to ReactClassInterface but for static methods.
   */
  var ReactClassStaticInterface = {
    /**
     * This method is invoked after a component is instantiated and when it
     * receives new props. Return an object to update state in response to
     * prop changes. Return null to indicate no change to state.
     *
     * If an object is returned, its keys will be merged into the existing state.
     *
     * @return {object || null}
     * @optional
     */
    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (true) {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (true) {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (true) {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (true) {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (true) {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (true) {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (true) {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }

    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isAlreadyDefined = name in Constructor;
      if (isAlreadyDefined) {
        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
          ? ReactClassStaticInterface[name]
          : null;

        _invariant(
          specPolicy === 'DEFINE_MANY_MERGED',
          'ReactClass: You are attempting to define ' +
            '`%s` on your component more than once. This conflict may be ' +
            'due to a mixin.',
          name
        );

        Constructor[name] = createMergedResultFunction(Constructor[name], property);

        return;
      }

      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (true) {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (true) {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (true) {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (true) {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (true) {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (true) {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (true) {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (true) {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.UNSAFE_componentWillRecieveProps,
        '%s has a method called UNSAFE_componentWillRecieveProps(). ' +
          'Did you mean UNSAFE_componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;


/***/ }),

/***/ "./node_modules/create-react-class/index.js":
/*!**************************************************!*\
  !*** ./node_modules/create-react-class/index.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var React = __webpack_require__(/*! react */ "react");
var factory = __webpack_require__(/*! ./factory */ "./node_modules/create-react-class/factory.js");

if (typeof React === 'undefined') {
  throw Error(
    'create-react-class could not find the React object. If you are using script tags, ' +
      'make sure that React is being loaded before create-react-class.'
  );
}

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),

/***/ "./node_modules/griddle-react/modules/columnProperties.js":
/*!****************************************************************!*\
  !*** ./node_modules/griddle-react/modules/columnProperties.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var map = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
var filter = __webpack_require__(/*! lodash/filter */ "./node_modules/lodash/filter.js");
var find = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
var sortBy = __webpack_require__(/*! lodash/sortBy */ "./node_modules/lodash/sortBy.js");
var difference = __webpack_require__(/*! lodash/difference */ "./node_modules/lodash/difference.js");

var ColumnProperties = (function () {
  function ColumnProperties() {
    var allColumns = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var filteredColumns = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var childrenColumnName = arguments.length <= 2 || arguments[2] === undefined ? "children" : arguments[2];
    var columnMetadata = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
    var metadataColumns = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

    _classCallCheck(this, ColumnProperties);

    this.allColumns = allColumns;
    this.filteredColumns = filteredColumns;
    this.childrenColumnName = childrenColumnName;
    this.columnMetadata = columnMetadata;
    this.metadataColumns = metadataColumns;
  }

  _createClass(ColumnProperties, [{
    key: 'getMetadataColumns',
    value: function getMetadataColumns() {
      var meta = map(filter(this.columnMetadata, { visible: false }), function (item) {
        return item.columnName;
      });
      if (meta.indexOf(this.childrenColumnName) < 0) {
        meta.push(this.childrenColumnName);
      }
      return meta.concat(this.metadataColumns);
    }
  }, {
    key: 'getVisibleColumnCount',
    value: function getVisibleColumnCount() {
      return this.getColumns().length;
    }
  }, {
    key: 'getColumnMetadataByName',
    value: function getColumnMetadataByName(name) {
      return find(this.columnMetadata, { columnName: name });
    }
  }, {
    key: 'hasColumnMetadata',
    value: function hasColumnMetadata() {
      return this.columnMetadata !== null && this.columnMetadata.length > 0;
    }
  }, {
    key: 'getMetadataColumnProperty',
    value: function getMetadataColumnProperty(columnName, propertyName, defaultValue) {
      var meta = this.getColumnMetadataByName(columnName);

      //send back the default value if meta isn't there
      if (typeof meta === "undefined" || meta === null) return defaultValue;

      return meta.hasOwnProperty(propertyName) ? meta[propertyName] : defaultValue;
    }
  }, {
    key: 'orderColumns',
    value: function orderColumns(cols) {
      var _this = this;

      var ORDER_MAX = 100;

      var orderedColumns = sortBy(cols, function (item) {
        var metaItem = find(_this.columnMetadata, { columnName: item });

        if (typeof metaItem === 'undefined' || metaItem === null || isNaN(metaItem.order)) {
          return ORDER_MAX;
        }

        return metaItem.order;
      });

      return orderedColumns;
    }
  }, {
    key: 'getColumns',
    value: function getColumns() {
      //if we didn't set default or filter
      var filteredColumns = this.filteredColumns.length === 0 ? this.allColumns : this.filteredColumns;

      filteredColumns = difference(filteredColumns, this.metadataColumns);

      filteredColumns = this.orderColumns(filteredColumns);

      return filteredColumns;
    }
  }]);

  return ColumnProperties;
})();

module.exports = ColumnProperties;


/***/ }),

/***/ "./node_modules/griddle-react/modules/customFilterContainer.jsx.js":
/*!*************************************************************************!*\
  !*** ./node_modules/griddle-react/modules/customFilterContainer.jsx.js ***!
  \*************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");

var CustomFilterContainer = createReactClass({
  getDefaultProps: function getDefaultProps() {
    return {
      "placeholderText": ""
    };
  },
  render: function render() {
    var that = this;

    if (typeof that.props.customFilterComponent !== 'function') {
      console.log("Couldn't find valid template.");
      return React.createElement('div', null);
    }

    return React.createElement(that.props.customFilterComponent, {
      changeFilter: this.props.changeFilter,
      results: this.props.results,
      currentResults: this.props.currentResults,
      placeholderText: this.props.placeholderText });
  }
});

module.exports = CustomFilterContainer;


/***/ }),

/***/ "./node_modules/griddle-react/modules/customPaginationContainer.jsx.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/griddle-react/modules/customPaginationContainer.jsx.js ***!
  \*****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   Griddle - Simple Grid Component for React
   https://github.com/DynamicTyped/Griddle
   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");

var CustomPaginationContainer = createReactClass({
  getDefaultProps: function getDefaultProps() {
    return {
      "maxPage": 0,
      "nextText": "",
      "previousText": "",
      "currentPage": 0,
      "customPagerComponent": {},
      "customPagerComponentOptions": {}
    };
  },
  render: function render() {
    var that = this;

    if (typeof that.props.customPagerComponent !== 'function') {
      console.log("Couldn't find valid template.");
      return React.createElement('div', null);
    }

    return React.createElement(that.props.customPagerComponent, _extends({}, this.props.customPagerComponentOptions, { maxPage: this.props.maxPage, nextText: this.props.nextText, previousText: this.props.previousText, currentPage: this.props.currentPage, setPage: this.props.setPage, previous: this.props.previous, next: this.props.next }));
  }
});

module.exports = CustomPaginationContainer;


/***/ }),

/***/ "./node_modules/griddle-react/modules/customRowComponentContainer.jsx.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/griddle-react/modules/customRowComponentContainer.jsx.js ***!
  \*******************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   Griddle - Simple Grid Component for React
   https://github.com/DynamicTyped/Griddle
   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");

var CustomRowComponentContainer = createReactClass({
  getDefaultProps: function getDefaultProps() {
    return {
      "data": [],
      "metadataColumns": [],
      "className": "",
      "customComponent": {},
      "globalData": {}
    };
  },
  render: function render() {
    var that = this;

    if (typeof that.props.customComponent !== 'function') {
      console.log("Couldn't find valid template.");
      return React.createElement('div', { className: this.props.className });
    }

    var nodes = this.props.data.map(function (row, index) {
      return React.createElement(that.props.customComponent, { data: row, metadataColumns: that.props.metadataColumns, key: index, globalData: that.props.globalData });
    });

    var footer = this.props.showPager && this.props.pagingContent;
    return React.createElement('div', { className: this.props.className, style: this.props.style }, nodes);
  }
});

module.exports = CustomRowComponentContainer;


/***/ }),

/***/ "./node_modules/griddle-react/modules/deep.js":
/*!****************************************************!*\
  !*** ./node_modules/griddle-react/modules/deep.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(/*! lodash/forEach */ "./node_modules/lodash/forEach.js");
var isObject = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
var isArray = __webpack_require__(/*! lodash/isArray */ "./node_modules/lodash/isArray.js");
var isFunction = __webpack_require__(/*! lodash/isFunction */ "./node_modules/lodash/isFunction.js");
var isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ "./node_modules/lodash/isPlainObject.js");
var forOwn = __webpack_require__(/*! lodash/forOwn */ "./node_modules/lodash/forOwn.js");

// Credits: https://github.com/documentcloud/underscore-contrib
// Sub module: underscore.object.selectors
// License: MIT (https://github.com/documentcloud/underscore-contrib/blob/master/LICENSE)
// https://github.com/documentcloud/underscore-contrib/blob/master/underscore.object.selectors.js

// Will take a path like 'element[0][1].subElement["Hey!.What?"]["[hey]"]'
// and return ["element", "0", "1", "subElement", "Hey!.What?", "[hey]"]
function keysFromPath(path) {
  // from http://codereview.stackexchange.com/a/63010/8176
  /**
   * Repeatedly capture either:
   * - a bracketed expression, discarding optional matching quotes inside, or
   * - an unbracketed expression, delimited by a dot or a bracket.
   */
  var re = /\[("|')(.+)\1\]|([^.\[\]]+)/g;

  var elements = [];
  var result;
  while ((result = re.exec(path)) !== null) {
    elements.push(result[2] || result[3]);
  }
  return elements;
}

// Gets the value at any depth in a nested object based on the
// path described by the keys given. Keys may be given as an array
// or as a dot-separated string.
function getPath(obj, ks) {
  if (typeof ks == "string") {
    if (obj[ks] !== undefined) {
      return obj[ks];
    }
    ks = keysFromPath(ks);
  }

  var i = -1,
      length = ks.length;

  // If the obj is null or undefined we have to break as
  // a TypeError will result trying to access any property
  // Otherwise keep incrementally access the next property in
  // ks until complete
  while (++i < length && obj != null) {
    obj = obj[ks[i]];
  }
  return i === length ? obj : void 0;
}

// Based on the origin underscore _.pick function
// Credit: https://github.com/jashkenas/underscore/blob/master/underscore.js
function powerPick(object, keys) {
  var result = {},
      obj = object,
      iteratee;
  iteratee = function (key, obj) {
    return key in obj;
  };

  obj = Object(obj);

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    if (iteratee(key, obj)) result[key] = getPath(obj, key);
  }

  return result;
}

// Gets all the keys for a flattened object structure.
// Doesn't flatten arrays.
// Input:
// {
//  a: {
//    x: 1,
//    y: 2
//  },
//  b: [3, 4],
//  c: 5
// }
// Output:
// [
//  "a.x",
//  "a.y",
//  "b",
//  "c"
// ]
function getKeys(obj, prefix) {
  var keys = [];

  forEach(obj, function (value, key) {
    var fullKey = prefix ? prefix + "." + key : key;
    if (isObject(value) && !isArray(value) && !isFunction(value) && !(value instanceof Date)) {
      keys = keys.concat(getKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  });

  return keys;
}

// Recursivly traverse plain objects and arrays calling `fn` on each
// non-object/non-array leaf node.
function iterObject(thing, fn) {
  if (isArray(thing)) {
    forEach(thing, function (item) {
      iterObject(item, fn);
    });
  } else if (isPlainObject(thing)) {
    forOwn(thing, function (item) {
      iterObject(item, fn);
    });
  } else {
    fn(thing);
  }
}

// Recursivly traverse plain objects and arrays and build a list of all
// non-object/non-array leaf nodes.
//
// Input:
// { "array": [1, "two", {"tree": 3}], "string": "a string" }
//
// Output:
// [1, 'two', 3, 'a string']
//
function getObjectValues(thing) {
  var results = [];
  iterObject(thing, function (value) {
    results.push(value);
  });
  return results;
}

module.exports = {
  pick: powerPick,
  getAt: getPath,
  keys: getKeys,
  getObjectValues: getObjectValues
};


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridFilter.jsx.js":
/*!**************************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridFilter.jsx.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");

var GridFilter = createReactClass({
    getDefaultProps: function getDefaultProps() {
        return {
            "placeholderText": ""
        };
    },
    handleChange: function handleChange(event) {
        this.props.changeFilter(event.target.value);
    },
    render: function render() {
        return React.createElement('div', { className: 'filter-container' }, React.createElement('input', { type: 'text', name: 'filter', placeholder: this.props.placeholderText, className: 'form-control', onChange: this.handleChange }));
    }
});

module.exports = GridFilter;


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridNoData.jsx.js":
/*!**************************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridNoData.jsx.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");

var GridNoData = createReactClass({
    getDefaultProps: function getDefaultProps() {
        return {
            "noDataMessage": "No Data"
        };
    },
    render: function render() {
        var that = this;

        return React.createElement('div', null, this.props.noDataMessage);
    }
});

module.exports = GridNoData;


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridPagination.jsx.js":
/*!******************************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridPagination.jsx.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");
var assign = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");

//needs props maxPage, currentPage, nextFunction, prevFunction
var GridPagination = createReactClass({
    getDefaultProps: function getDefaultProps() {
        return {
            "maxPage": 0,
            "nextText": "",
            "previousText": "",
            "currentPage": 0,
            "useGriddleStyles": true,
            "nextClassName": "griddle-next",
            "previousClassName": "griddle-previous",
            "nextIconComponent": null,
            "previousIconComponent": null
        };
    },
    pageChange: function pageChange(event) {
        this.props.setPage(parseInt(event.target.value, 10) - 1);
    },
    render: function render() {
        var previous = "";
        var next = "";

        if (this.props.currentPage > 0) {
            previous = React.createElement('button', { type: 'button', onClick: this.props.previous, style: this.props.useGriddleStyles ? { "color": "#222", border: "none", background: "none", margin: "0 0 0 10px" } : null }, this.props.previousIconComponent, this.props.previousText);
        }

        if (this.props.currentPage !== this.props.maxPage - 1) {
            next = React.createElement('button', { type: 'button', onClick: this.props.next, style: this.props.useGriddleStyles ? { "color": "#222", border: "none", background: "none", margin: "0 10px 0 0" } : null }, this.props.nextText, this.props.nextIconComponent);
        }

        var leftStyle = null;
        var middleStyle = null;
        var rightStyle = null;

        if (this.props.useGriddleStyles === true) {
            var baseStyle = {
                "float": "left",
                minHeight: "1px",
                marginTop: "5px"
            };

            rightStyle = assign({ textAlign: "right", width: "34%" }, baseStyle);
            middleStyle = assign({ textAlign: "center", width: "33%" }, baseStyle);
            leftStyle = assign({ width: "33%" }, baseStyle);
        }

        var options = [];

        for (var i = 1; i <= this.props.maxPage; i++) {
            options.push(React.createElement('option', { value: i, key: i }, i));
        }

        return React.createElement('div', { style: this.props.useGriddleStyles ? { minHeight: "35px" } : null }, React.createElement('div', { className: this.props.previousClassName, style: leftStyle }, previous), React.createElement('div', { className: 'griddle-page', style: middleStyle }, React.createElement('select', { value: this.props.currentPage + 1, onChange: this.pageChange }, options), ' / ', this.props.maxPage), React.createElement('div', { className: this.props.nextClassName, style: rightStyle }, next));
    }
});

module.exports = GridPagination;


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridRow.jsx.js":
/*!***********************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridRow.jsx.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");
var ColumnProperties = __webpack_require__(/*! ./columnProperties.js */ "./node_modules/griddle-react/modules/columnProperties.js");
var deep = __webpack_require__(/*! ./deep.js */ "./node_modules/griddle-react/modules/deep.js");
var isFunction = __webpack_require__(/*! lodash/isFunction */ "./node_modules/lodash/isFunction.js");
var zipObject = __webpack_require__(/*! lodash/zipObject */ "./node_modules/lodash/zipObject.js");
var assign = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");
var defaults = __webpack_require__(/*! lodash/defaults */ "./node_modules/lodash/defaults.js");
var toPairs = __webpack_require__(/*! lodash/toPairs */ "./node_modules/lodash/toPairs.js");
var without = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");

var GridRow = createReactClass({
    getDefaultProps: function getDefaultProps() {
        return {
            "isChildRow": false,
            "showChildren": false,
            "data": {},
            "columnSettings": null,
            "rowSettings": null,
            "hasChildren": false,
            "useGriddleStyles": true,
            "useGriddleIcons": true,
            "isSubGriddle": false,
            "paddingHeight": null,
            "rowHeight": null,
            "parentRowCollapsedClassName": "parent-row",
            "parentRowExpandedClassName": "parent-row expanded",
            "parentRowCollapsedComponent": "▶",
            "parentRowExpandedComponent": "▼",
            "onRowClick": null,
            "multipleSelectionSettings": null,
            "onRowMouseEnter": null,
            "onRowMouseLeave": null,
            "onRowWillMount": null,
            "onRowWillUnmount": null
        };
    },
    componentWillMount: function componentWillMount() {
        if (this.props.onRowWillMount !== null && isFunction(this.props.onRowWillMount)) {
            this.props.onRowWillMount(this);
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        if (this.props.onRowWillUnmount !== null && isFunction(this.props.onRowWillUnmount)) {
            this.props.onRowWillUnmount(this);
        }
    },
    handleClick: function handleClick(e) {
        if (this.props.onRowClick !== null && isFunction(this.props.onRowClick)) {
            this.props.onRowClick(this, e);
        } else if (this.props.hasChildren) {
            this.props.toggleChildren();
        }
    },
    handleMouseEnter: function handleMouseEnter(e) {
        if (this.props.onRowMouseEnter !== null && isFunction(this.props.onRowMouseEnter)) {
            this.props.onRowMouseEnter(this, e);
        }
    },
    handleMouseLeave: function handleMouseLeave(e) {
        if (this.props.onRowMouseLeave !== null && isFunction(this.props.onRowMouseLeave)) {
            this.props.onRowMouseLeave(this, e);
        }
    },
    handleSelectionChange: function handleSelectionChange(e) {
        //hack to get around warning that's not super useful in this case
        return;
    },
    handleSelectClick: function handleSelectClick(e) {
        if (this.props.multipleSelectionSettings.isMultipleSelection) {
            if (e.target.type === "checkbox") {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, this.refs.selected.checked);
            } else {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, !this.refs.selected.checked);
            }
        }
    },
    verifyProps: function verifyProps() {
        if (this.props.columnSettings === null) {
            console.error("gridRow: The columnSettings prop is null and it shouldn't be");
        }
    },
    formatData: function formatData(data) {
        if (typeof data === 'boolean') {
            return String(data);
        }
        return data;
    },
    render: function render() {
        var _this = this;

        this.verifyProps();
        var that = this;
        var columnStyles = null;

        if (this.props.useGriddleStyles) {
            columnStyles = {
                margin: "0px",
                padding: that.props.paddingHeight + "px 5px " + that.props.paddingHeight + "px 5px",
                height: that.props.rowHeight ? this.props.rowHeight - that.props.paddingHeight * 2 + "px" : null,
                backgroundColor: "#FFF",
                borderTopColor: "#DDD",
                color: "#222"
            };
        }

        var columns = this.props.columnSettings.getColumns();

        // make sure that all the columns we need have default empty values
        // otherwise they will get clipped
        var defaultValues = zipObject(columns, []);

        // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
        var dataView = assign({}, this.props.data);

        defaults(dataView, defaultValues);
        var data = toPairs(deep.pick(dataView, without(columns, 'children')));
        var nodes = data.map(function (col, index) {
            var returnValue = null;
            var meta = _this.props.columnSettings.getColumnMetadataByName(col[0]);

            //todo: Make this not as ridiculous looking
            var firstColAppend = index === 0 && _this.props.hasChildren && _this.props.showChildren === false && _this.props.useGriddleIcons ? React.createElement('span', { style: _this.props.useGriddleStyles ? { fontSize: "10px", marginRight: "5px" } : null }, _this.props.parentRowCollapsedComponent) : index === 0 && _this.props.hasChildren && _this.props.showChildren && _this.props.useGriddleIcons ? React.createElement('span', { style: _this.props.useGriddleStyles ? { fontSize: "10px" } : null }, _this.props.parentRowExpandedComponent) : "";

            if (index === 0 && _this.props.isChildRow && _this.props.useGriddleStyles) {
                columnStyles = assign(columnStyles, { paddingLeft: 10 });
            }

            if (_this.props.columnSettings.hasColumnMetadata() && typeof meta !== 'undefined' && meta !== null) {
                if (typeof meta.customComponent !== 'undefined' && meta.customComponent !== null) {
                    var customComponent = React.createElement(meta.customComponent, { data: col[1], rowData: dataView, metadata: meta });
                    returnValue = React.createElement('td', { onClick: _this.handleClick, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave, className: meta.cssClassName, key: index, style: columnStyles }, customComponent);
                } else {
                    returnValue = React.createElement('td', { onClick: _this.handleClick, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave, className: meta.cssClassName, key: index, style: columnStyles }, firstColAppend, _this.formatData(col[1]));
                }
            }

            return returnValue || React.createElement('td', { onClick: _this.handleClick, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave, key: index, style: columnStyles }, firstColAppend, col[1]);
        });

        // Don't compete with onRowClick, but if no onRowClick function then
        // clicking on the row should trigger select
        var trOnClick, tdOnClick;
        if (this.props.onRowClick !== null && isFunction(this.props.onRowClick)) {
            trOnClick = null;
            tdOnClick = this.handleSelectClick;
        } else {
            if (this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
                trOnClick = this.handleSelectClick;
                tdOnClick = null;
            } else {
                trOnClick = null;
                tdOnClick = null;
            }
        }

        if (nodes && this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
            var selectedRowIds = this.props.multipleSelectionSettings.getSelectedRowIds();

            nodes.unshift(React.createElement('td', {
                key: 'selection',
                style: columnStyles,
                className: 'griddle-select griddle-select-cell',
                onClick: tdOnClick
            }, React.createElement('input', {
                type: 'checkbox',
                checked: this.props.multipleSelectionSettings.getIsRowChecked(dataView),
                onChange: this.handleSelectionChange,
                ref: 'selected'
            })));
        }

        //Get the row from the row settings.
        var className = that.props.rowSettings && that.props.rowSettings.getBodyRowMetadataClass(that.props.data) || "standard-row";

        if (that.props.isChildRow) {
            className = "child-row";
        } else if (that.props.hasChildren) {
            className = that.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName;
        }

        return React.createElement('tr', { onClick: trOnClick, className: className }, nodes);
    }
});

module.exports = GridRow;


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridRowContainer.jsx.js":
/*!********************************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridRowContainer.jsx.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");
var ColumnProperties = __webpack_require__(/*! ./columnProperties.js */ "./node_modules/griddle-react/modules/columnProperties.js");
var pick = __webpack_require__(/*! lodash/pick */ "./node_modules/lodash/pick.js");

var GridRowContainer = createReactClass({
  getDefaultProps: function getDefaultProps() {
    return {
      "useGriddleStyles": true,
      "useGriddleIcons": true,
      "isSubGriddle": false,
      "columnSettings": null,
      "rowSettings": null,
      "paddingHeight": null,
      "rowHeight": null,
      "parentRowCollapsedClassName": "parent-row",
      "parentRowExpandedClassName": "parent-row expanded",
      "parentRowCollapsedComponent": "▶",
      "parentRowExpandedComponent": "▼",
      "onRowClick": null,
      "onRowMouseEnter": null,
      "onRowMouseLeave": null,
      "onRowWillMount": null,
      "onRowWillUnmount": null,
      "multipleSelectionSettings": null
    };
  },
  getInitialState: function getInitialState() {
    return {
      "data": {},
      "showChildren": false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps() {
    this.setShowChildren(false);
  },
  toggleChildren: function toggleChildren() {
    this.setShowChildren(this.state.showChildren === false);
  },
  setShowChildren: function setShowChildren(visible) {
    this.setState({
      showChildren: visible
    });
  },
  verifyProps: function verifyProps() {
    if (this.props.columnSettings === null) {
      console.error("gridRowContainer: The columnSettings prop is null and it shouldn't be");
    }
  },
  render: function render() {
    this.verifyProps();
    var that = this;
    if (typeof this.props.data === "undefined") {
      return React.createElement('tbody', null);
    }
    var arr = [];

    var columns = this.props.columnSettings.getColumns();

    arr.push(React.createElement(this.props.rowSettings.rowComponent, {
      useGriddleStyles: this.props.useGriddleStyles,
      isSubGriddle: this.props.isSubGriddle,
      data: this.props.rowSettings.isCustom ? pick(this.props.data, columns) : this.props.data,
      rowData: this.props.rowSettings.isCustom ? this.props.data : null,
      columnSettings: this.props.columnSettings,
      rowSettings: this.props.rowSettings,
      hasChildren: that.props.hasChildren,
      toggleChildren: that.toggleChildren,
      showChildren: that.state.showChildren,
      key: that.props.uniqueId + '_base_row',
      useGriddleIcons: that.props.useGriddleIcons,
      parentRowExpandedClassName: this.props.parentRowExpandedClassName,
      parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
      parentRowExpandedComponent: this.props.parentRowExpandedComponent,
      parentRowCollapsedComponent: this.props.parentRowCollapsedComponent,
      paddingHeight: that.props.paddingHeight,
      rowHeight: that.props.rowHeight,
      onRowClick: that.props.onRowClick,
      onRowMouseEnter: that.props.onRowMouseEnter,
      onRowMouseLeave: that.props.onRowMouseLeave,
      multipleSelectionSettings: this.props.multipleSelectionSettings,
      onRowWillMount: that.props.onRowWillMount,
      onRowWillUnmount: that.props.onRowWillUnmount }));

    var children = null;

    if (that.state.showChildren) {
      children = that.props.hasChildren && this.props.data["children"].map(function (row, index) {
        var key = that.props.rowSettings.getRowKey(row, index);

        if (typeof row["children"] !== "undefined") {
          var Griddle = that.constructor.Griddle;
          return React.createElement('tr', { key: key, style: { paddingLeft: 5 } }, React.createElement('td', { colSpan: that.props.columnSettings.getVisibleColumnCount(), className: 'griddle-parent', style: that.props.useGriddleStyles ? { border: "none", "padding": "0 0 0 5px" } : null }, React.createElement(Griddle, {
            rowMetadata: { key: 'id' },
            isSubGriddle: true,
            results: [row],
            columns: that.props.columnSettings.getColumns(),
            tableClassName: that.props.tableClassName,
            parentRowExpandedClassName: that.props.parentRowExpandedClassName,
            parentRowCollapsedClassName: that.props.parentRowCollapsedClassName,
            showTableHeading: false,
            showPager: false,
            columnMetadata: that.props.columnSettings.columnMetadata,
            parentRowExpandedComponent: that.props.parentRowExpandedComponent,
            parentRowCollapsedComponent: that.props.parentRowCollapsedComponent,
            paddingHeight: that.props.paddingHeight,
            rowHeight: that.props.rowHeight
          })));
        }

        return React.createElement(that.props.rowSettings.rowComponent, {
          useGriddleStyles: that.props.useGriddleStyles,
          isSubGriddle: that.props.isSubGriddle,
          data: row,
          columnSettings: that.props.columnSettings,
          isChildRow: true,
          columnMetadata: that.props.columnSettings.columnMetadata,
          key: key
        });
      });
    }

    return that.props.hasChildren === false ? arr[0] : React.createElement('tbody', null, that.state.showChildren ? arr.concat(children) : arr);
  }
});

module.exports = GridRowContainer;


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridSettings.jsx.js":
/*!****************************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridSettings.jsx.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");
var includes = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
var without = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
var find = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");

var GridSettings = createReactClass({
    getDefaultProps: function getDefaultProps() {
        return {
            "columns": [],
            "columnMetadata": [],
            "selectedColumns": [],
            "settingsText": "",
            "maxRowsText": "",
            "resultsPerPage": 0,
            "enableToggleCustom": false,
            "useCustomComponent": false,
            "useGriddleStyles": true,
            "toggleCustomComponent": function toggleCustomComponent() {}
        };
    },
    setPageSize: function setPageSize(event) {
        var value = parseInt(event.target.value, 10);
        this.props.setPageSize(value);
    },
    handleChange: function handleChange(event) {
        var columnName = event.target.dataset ? event.target.dataset.name : event.target.getAttribute('data-name');
        if (event.target.checked === true && includes(this.props.selectedColumns, columnName) === false) {
            this.props.selectedColumns.push(columnName);
            this.props.setColumns(this.props.selectedColumns);
        } else {
            /* redraw with the selected columns minus the one just unchecked */
            this.props.setColumns(without(this.props.selectedColumns, columnName));
        }
    },
    render: function render() {
        var that = this;

        var nodes = [];
        //don't show column selector if we're on a custom component
        if (that.props.useCustomComponent === false) {
            nodes = this.props.columns.map(function (col, index) {
                var checked = includes(that.props.selectedColumns, col);
                //check column metadata -- if this one is locked make it disabled and don't put an onChange event
                var meta = find(that.props.columnMetadata, { columnName: col });
                var displayName = col;

                if (typeof meta !== "undefined" && typeof meta.displayName !== "undefined" && meta.displayName != null) {
                    displayName = meta.displayName;
                }

                if (typeof meta !== "undefined" && meta != null && meta.locked) {
                    return React.createElement('div', { className: 'column checkbox' }, React.createElement('label', null, React.createElement('input', { type: 'checkbox', disabled: true, name: 'check', checked: checked, 'data-name': col }), displayName));
                } else if (typeof meta !== "undefined" && meta != null && typeof meta.visible !== "undefined" && meta.visible === false) {
                    return null;
                }
                return React.createElement('div', { className: 'griddle-column-selection checkbox', key: col, style: that.props.useGriddleStyles ? { "float": "left", width: "20%" } : null }, React.createElement('label', null, React.createElement('input', { type: 'checkbox', name: 'check', onChange: that.handleChange, checked: checked, 'data-name': col }), displayName));
            });
        }

        var toggleCustom = that.props.enableToggleCustom ? React.createElement('div', { className: 'form-group' }, React.createElement('label', { htmlFor: 'maxRows' }, React.createElement('input', { type: 'checkbox', checked: this.props.useCustomComponent, onChange: this.props.toggleCustomComponent }), ' ', this.props.enableCustomFormatText)) : "";

        var setPageSize = this.props.showSetPageSize ? React.createElement('div', null, React.createElement('label', { htmlFor: 'maxRows' }, this.props.maxRowsText, ':', React.createElement('select', { onChange: this.setPageSize, value: this.props.resultsPerPage }, React.createElement('option', { value: '5' }, '5'), React.createElement('option', { value: '10' }, '10'), React.createElement('option', { value: '25' }, '25'), React.createElement('option', { value: '50' }, '50'), React.createElement('option', { value: '100' }, '100')))) : "";

        return React.createElement('div', { className: 'griddle-settings', style: this.props.useGriddleStyles ? { backgroundColor: "#FFF", border: "1px solid #DDD", color: "#222", padding: "10px", marginBottom: "10px" } : null }, React.createElement('h6', null, this.props.settingsText), React.createElement('div', { className: 'griddle-columns', style: this.props.useGriddleStyles ? { clear: "both", display: "table", width: "100%", borderBottom: "1px solid #EDEDED", marginBottom: "10px" } : null }, nodes), setPageSize, toggleCustom);
    }
});

module.exports = GridSettings;


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridTable.jsx.js":
/*!*************************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridTable.jsx.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");
var GridTitle = __webpack_require__(/*! ./gridTitle.jsx */ "./node_modules/griddle-react/modules/gridTitle.jsx.js");
var GridRowContainer = __webpack_require__(/*! ./gridRowContainer.jsx */ "./node_modules/griddle-react/modules/gridRowContainer.jsx.js");
var ColumnProperties = __webpack_require__(/*! ./columnProperties.js */ "./node_modules/griddle-react/modules/columnProperties.js");
var RowProperties = __webpack_require__(/*! ./rowProperties.js */ "./node_modules/griddle-react/modules/rowProperties.js");

var GridTable = createReactClass({
  getDefaultProps: function getDefaultProps() {
    return {
      "data": [],
      "columnSettings": null,
      "rowSettings": null,
      "sortSettings": null,
      "multipleSelectionSettings": null,
      "className": "",
      "enableInfiniteScroll": false,
      "nextPage": null,
      "hasMorePages": false,
      "useFixedHeader": false,
      "useFixedLayout": true,
      "paddingHeight": null,
      "rowHeight": null,
      "filterByColumn": null,
      "infiniteScrollLoadTreshold": null,
      "bodyHeight": null,
      "useGriddleStyles": true,
      "useGriddleIcons": true,
      "isSubGriddle": false,
      "parentRowCollapsedClassName": "parent-row",
      "parentRowExpandedClassName": "parent-row expanded",
      "parentRowCollapsedComponent": "▶",
      "parentRowExpandedComponent": "▼",
      "externalLoadingComponent": null,
      "externalIsLoading": false,
      "onRowClick": null,
      "onRowMouseEnter": null,
      "onRowMouseLeave": null,
      "onRowWillMount": null,
      "onRowWillUnmount": null
    };
  },
  getInitialState: function getInitialState() {
    return {
      scrollTop: 0,
      scrollHeight: this.props.bodyHeight,
      clientHeight: this.props.bodyHeight
    };
  },
  componentDidMount: function componentDidMount() {
    // After the initial render, see if we need to load additional pages.
    this.gridScroll();
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    // After the subsequent renders, see if we need to load additional pages.
    this.gridScroll();
  },
  gridScroll: function gridScroll() {
    if (this.props.enableInfiniteScroll && !this.props.externalIsLoading) {
      // If the scroll height is greater than the current amount of rows displayed, update the page.
      var scrollable = this.refs.scrollable;
      var scrollTop = scrollable.scrollTop;
      var scrollHeight = scrollable.scrollHeight;
      var clientHeight = scrollable.clientHeight;

      // If the scroll position changed and the difference is greater than a row height
      if (this.props.rowHeight !== null && this.state.scrollTop !== scrollTop && Math.abs(this.state.scrollTop - scrollTop) >= this.getAdjustedRowHeight()) {
        var newState = {
          scrollTop: scrollTop,
          scrollHeight: scrollHeight,
          clientHeight: clientHeight
        };

        // Set the state to the new state
        this.setState(newState);
      }

      // Determine the diff by subtracting the amount scrolled by the total height, taking into consideratoin
      // the spacer's height.
      var scrollHeightDiff = scrollHeight - (scrollTop + clientHeight) - this.props.infiniteScrollLoadTreshold;

      // Make sure that we load results a little before reaching the bottom.
      var compareHeight = scrollHeightDiff * 0.6;

      if (compareHeight <= this.props.infiniteScrollLoadTreshold) {
        this.props.nextPage();
      }
    }
  },
  verifyProps: function verifyProps() {
    if (this.props.columnSettings === null) {
      console.error("gridTable: The columnSettings prop is null and it shouldn't be");
    }
    if (this.props.rowSettings === null) {
      console.error("gridTable: The rowSettings prop is null and it shouldn't be");
    }
  },
  getAdjustedRowHeight: function getAdjustedRowHeight() {
    return this.props.rowHeight + this.props.paddingHeight * 2; // account for padding.
  },
  getNodeContent: function getNodeContent() {
    this.verifyProps();
    var that = this;

    //figure out if we need to wrap the group in one tbody or many
    var anyHasChildren = false;

    // If the data is still being loaded, don't build the nodes unless this is an infinite scroll table.
    if (!this.props.externalIsLoading || this.props.enableInfiniteScroll) {
      var nodeData = that.props.data;
      var aboveSpacerRow = null;
      var belowSpacerRow = null;
      var usingDefault = false;

      // If we have a row height specified, only render what's going to be visible.
      if (this.props.enableInfiniteScroll && this.props.rowHeight !== null && this.refs.scrollable !== undefined) {
        var adjustedHeight = that.getAdjustedRowHeight();
        var visibleRecordCount = Math.ceil(that.state.clientHeight / adjustedHeight);

        // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
        var displayStart = Math.max(0, Math.floor(that.state.scrollTop / adjustedHeight) - visibleRecordCount * 0.25);
        var displayEnd = Math.min(displayStart + visibleRecordCount * 1.25, this.props.data.length - 1);

        // Split the amount of nodes.
        nodeData = nodeData.slice(displayStart, displayEnd + 1);

        // Set the above and below nodes.
        var aboveSpacerRowStyle = { height: displayStart * adjustedHeight + "px" };
        aboveSpacerRow = React.createElement('tr', { key: 'above-' + aboveSpacerRowStyle.height, style: aboveSpacerRowStyle });
        var belowSpacerRowStyle = { height: (this.props.data.length - displayEnd) * adjustedHeight + "px" };
        belowSpacerRow = React.createElement('tr', { key: 'below-' + belowSpacerRowStyle.height, style: belowSpacerRowStyle });
      }

      var nodes = nodeData.map(function (row, index) {
        var hasChildren = typeof row["children"] !== "undefined" && row["children"].length > 0;
        var uniqueId = that.props.rowSettings.getRowKey(row, index);

        //at least one item in the group has children.
        if (hasChildren) {
          anyHasChildren = hasChildren;
        }

        return React.createElement(GridRowContainer, {
          useGriddleStyles: that.props.useGriddleStyles,
          isSubGriddle: that.props.isSubGriddle,
          parentRowExpandedClassName: that.props.parentRowExpandedClassName,
          parentRowCollapsedClassName: that.props.parentRowCollapsedClassName,
          parentRowExpandedComponent: that.props.parentRowExpandedComponent,
          parentRowCollapsedComponent: that.props.parentRowCollapsedComponent,
          data: row,
          key: uniqueId + '-container',
          uniqueId: uniqueId,
          columnSettings: that.props.columnSettings,
          rowSettings: that.props.rowSettings,
          paddingHeight: that.props.paddingHeight,
          multipleSelectionSettings: that.props.multipleSelectionSettings,
          rowHeight: that.props.rowHeight,
          hasChildren: hasChildren,
          tableClassName: that.props.className,
          onRowClick: that.props.onRowClick,
          onRowMouseEnter: that.props.onRowMouseEnter,
          onRowMouseLeave: that.props.onRowMouseLeave,
          onRowWillMount: that.props.onRowWillMount,
          onRowWillUnmount: that.props.onRowWillUnmount
        });
      });

      // no data section
      if (this.props.showNoData) {
        var colSpan = this.props.columnSettings.getVisibleColumnCount();
        nodes.push(React.createElement('tr', { key: 'no-data-section' }, React.createElement('td', { colSpan: colSpan }, this.props.noDataSection)));
      }

      // Add the spacer rows for nodes we're not rendering.
      if (aboveSpacerRow) {
        nodes.unshift(aboveSpacerRow);
      }
      if (belowSpacerRow) {
        nodes.push(belowSpacerRow);
      }

      // Send back the nodes.
      return {
        nodes: nodes,
        anyHasChildren: anyHasChildren
      };
    } else {
      return null;
    }
  },
  render: function render() {
    var that = this;
    var nodes = [];

    // for if we need to wrap the group in one tbody or many
    var anyHasChildren = false;

    // Grab the nodes to render
    var nodeContent = this.getNodeContent();
    if (nodeContent) {
      nodes = nodeContent.nodes;
      anyHasChildren = nodeContent.anyHasChildren;
    }

    var gridStyle = null;
    var loadingContent = null;
    var tableStyle = {
      width: "100%"
    };

    if (this.props.useFixedLayout) {
      tableStyle.tableLayout = "fixed";
    }

    if (this.props.enableInfiniteScroll) {
      // If we're enabling infinite scrolling, we'll want to include the max height of the grid body + allow scrolling.
      gridStyle = {
        "position": "relative",
        "overflowY": "scroll",
        "height": this.props.bodyHeight + "px",
        "width": "100%"
      };
    }

    // If we're currently loading, populate the loading content
    if (this.props.externalIsLoading) {
      var defaultLoadingStyle = null;
      var defaultColSpan = null;

      if (this.props.useGriddleStyles) {
        defaultLoadingStyle = {
          textAlign: "center",
          paddingBottom: "40px"
        };
      }

      defaultColSpan = this.props.columnSettings.getVisibleColumnCount();

      var loadingComponent = this.props.externalLoadingComponent ? React.createElement(this.props.externalLoadingComponent, null) : React.createElement('div', null, 'Loading...');

      loadingContent = React.createElement('tbody', null, React.createElement('tr', null, React.createElement('td', { style: defaultLoadingStyle, colSpan: defaultColSpan }, loadingComponent)));
    }

    //construct the table heading component
    var tableHeading = this.props.showTableHeading ? React.createElement(GridTitle, { useGriddleStyles: this.props.useGriddleStyles, useGriddleIcons: this.props.useGriddleIcons,
      sortSettings: this.props.sortSettings,
      multipleSelectionSettings: this.props.multipleSelectionSettings,
      columnSettings: this.props.columnSettings,
      filterByColumn: this.props.filterByColumn,
      rowSettings: this.props.rowSettings }) : undefined;

    //check to see if any of the rows have children... if they don't wrap everything in a tbody so the browser doesn't auto do this
    if (!anyHasChildren) {
      nodes = React.createElement('tbody', null, nodes);
    }

    var pagingContent = React.createElement('tbody', null);
    if (this.props.showPager) {
      var pagingStyles = this.props.useGriddleStyles ? {
        padding: "0px",
        backgroundColor: "#EDEDED",
        border: "0px",
        color: "#222",
        height: this.props.showNoData ? "20px" : null
      } : null;
      pagingContent = React.createElement('tbody', null, React.createElement('tr', null, React.createElement('td', { colSpan: this.props.multipleSelectionSettings.isMultipleSelection ? this.props.columnSettings.getVisibleColumnCount() + 1 : this.props.columnSettings.getVisibleColumnCount(), style: pagingStyles, className: 'footer-container' }, !this.props.showNoData ? this.props.pagingContent : null)));
    }

    // If we have a fixed header, split into two tables.
    if (this.props.useFixedHeader) {
      if (this.props.useGriddleStyles) {
        tableStyle.tableLayout = "fixed";
      }

      return React.createElement('div', null, React.createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading), React.createElement('div', { ref: 'scrollable', onScroll: this.gridScroll, style: gridStyle }, React.createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, nodes, loadingContent, pagingContent)));
    }

    return React.createElement('div', { ref: 'scrollable', onScroll: this.gridScroll, style: gridStyle }, React.createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading, nodes, loadingContent, pagingContent));
  }
});

module.exports = GridTable;


/***/ }),

/***/ "./node_modules/griddle-react/modules/gridTitle.jsx.js":
/*!*************************************************************!*\
  !*** ./node_modules/griddle-react/modules/gridTitle.jsx.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
 See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
 */


var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var React = __webpack_require__(/*! react */ "react");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");
var ColumnProperties = __webpack_require__(/*! ./columnProperties.js */ "./node_modules/griddle-react/modules/columnProperties.js");
var assign = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");

var DefaultHeaderComponent = createReactClass({
    render: function render() {
        return React.createElement('span', null, this.props.displayName);
    }
});

var GridTitle = createReactClass({
    getDefaultProps: function getDefaultProps() {
        return {
            "columnSettings": null,
            "filterByColumn": function filterByColumn() {},
            "rowSettings": null,
            "sortSettings": null,
            "multipleSelectionSettings": null,
            "headerStyle": null,
            "useGriddleStyles": true,
            "useGriddleIcons": true,
            "headerStyles": {}
        };
    },
    componentWillMount: function componentWillMount() {
        this.verifyProps();
    },
    sort: function sort(column) {
        var that = this;
        return function (event) {
            that.props.sortSettings.changeSort(column);
        };
    },
    toggleSelectAll: function toggleSelectAll(event) {
        this.props.multipleSelectionSettings.toggleSelectAll();
    },
    handleSelectionChange: function handleSelectionChange(event) {
        //hack to get around warning message that's not helpful in this case
        return;
    },
    verifyProps: function verifyProps() {
        if (this.props.columnSettings === null) {
            console.error("gridTitle: The columnSettings prop is null and it shouldn't be");
        }

        if (this.props.sortSettings === null) {
            console.error("gridTitle: The sortSettings prop is null and it shouldn't be");
        }
    },
    render: function render() {
        this.verifyProps();
        var that = this;
        var titleStyles = {};

        var nodes = this.props.columnSettings.getColumns().map(function (col, index) {
            var defaultTitleStyles = {};
            var columnSort = "";
            var columnIsSortable = that.props.columnSettings.getMetadataColumnProperty(col, "sortable", true);
            var sortComponent = columnIsSortable ? that.props.sortSettings.sortDefaultComponent : null;

            if (that.props.sortSettings.sortColumn == col && that.props.sortSettings.sortDirection === 'asc') {
                columnSort = that.props.sortSettings.sortAscendingClassName;
                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortAscendingComponent;
            } else if (that.props.sortSettings.sortColumn == col && that.props.sortSettings.sortDirection === 'desc') {
                columnSort += that.props.sortSettings.sortDescendingClassName;
                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortDescendingComponent;
            }

            var meta = that.props.columnSettings.getColumnMetadataByName(col);
            var displayName = that.props.columnSettings.getMetadataColumnProperty(col, "displayName", col);
            var HeaderComponent = that.props.columnSettings.getMetadataColumnProperty(col, "customHeaderComponent", DefaultHeaderComponent);
            var headerProps = that.props.columnSettings.getMetadataColumnProperty(col, "customHeaderComponentProps", {});

            columnSort = meta == null ? columnSort : (columnSort && columnSort + " " || columnSort) + that.props.columnSettings.getMetadataColumnProperty(col, "cssClassName", "");

            if (that.props.useGriddleStyles) {
                defaultTitleStyles = {
                    backgroundColor: "#EDEDEF",
                    border: "0px",
                    borderBottom: "1px solid #DDD",
                    color: "#222",
                    padding: "5px",
                    cursor: columnIsSortable ? "pointer" : "default"
                };
            }
            titleStyles = meta && meta.titleStyles ? assign({}, defaultTitleStyles, meta.titleStyles) : assign({}, defaultTitleStyles);

            var ComponentClass = displayName ? 'th' : 'td';
            return React.createElement(ComponentClass, { onClick: columnIsSortable ? that.sort(col) : null, 'data-title': col, className: columnSort, key: col,
                style: titleStyles }, React.createElement(HeaderComponent, _extends({ columnName: col, displayName: displayName,
                filterByColumn: that.props.filterByColumn }, headerProps)), sortComponent);
        });

        if (nodes && this.props.multipleSelectionSettings.isMultipleSelection) {
            nodes.unshift(React.createElement('th', { key: 'selection', onClick: this.toggleSelectAll, style: titleStyles, className: 'griddle-select griddle-select-title' }, React.createElement('input', {
                type: 'checkbox',
                checked: this.props.multipleSelectionSettings.getIsSelectAllChecked(),
                onChange: this.handleSelectionChange
            })));
        }

        //Get the row from the row settings.
        var className = that.props.rowSettings && that.props.rowSettings.getHeaderRowMetadataClass() || null;

        return React.createElement('thead', null, React.createElement('tr', {
            className: className,
            style: this.props.headerStyles }, nodes));
    }
});

module.exports = GridTitle;


/***/ }),

/***/ "./node_modules/griddle-react/modules/griddle.jsx.js":
/*!***********************************************************!*\
  !*** ./node_modules/griddle-react/modules/griddle.jsx.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*
   Griddle - Simple Grid Component for React
   https://github.com/DynamicTyped/Griddle
   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/


var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var React = __webpack_require__(/*! react */ "react");
var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");
var createReactClass = __webpack_require__(/*! create-react-class */ "./node_modules/create-react-class/index.js");
var GridTable = __webpack_require__(/*! ./gridTable.jsx */ "./node_modules/griddle-react/modules/gridTable.jsx.js");
var GridFilter = __webpack_require__(/*! ./gridFilter.jsx */ "./node_modules/griddle-react/modules/gridFilter.jsx.js");
var GridPagination = __webpack_require__(/*! ./gridPagination.jsx */ "./node_modules/griddle-react/modules/gridPagination.jsx.js");
var GridSettings = __webpack_require__(/*! ./gridSettings.jsx */ "./node_modules/griddle-react/modules/gridSettings.jsx.js");
var GridNoData = __webpack_require__(/*! ./gridNoData.jsx */ "./node_modules/griddle-react/modules/gridNoData.jsx.js");
var GridRow = __webpack_require__(/*! ./gridRow.jsx */ "./node_modules/griddle-react/modules/gridRow.jsx.js");
var GridRowContainer = __webpack_require__(/*! ./gridRowContainer.jsx */ "./node_modules/griddle-react/modules/gridRowContainer.jsx.js");
var CustomRowComponentContainer = __webpack_require__(/*! ./customRowComponentContainer.jsx */ "./node_modules/griddle-react/modules/customRowComponentContainer.jsx.js");
var CustomPaginationContainer = __webpack_require__(/*! ./customPaginationContainer.jsx */ "./node_modules/griddle-react/modules/customPaginationContainer.jsx.js");
var CustomFilterContainer = __webpack_require__(/*! ./customFilterContainer.jsx */ "./node_modules/griddle-react/modules/customFilterContainer.jsx.js");
var ColumnProperties = __webpack_require__(/*! ./columnProperties */ "./node_modules/griddle-react/modules/columnProperties.js");
var RowProperties = __webpack_require__(/*! ./rowProperties */ "./node_modules/griddle-react/modules/rowProperties.js");
var deep = __webpack_require__(/*! ./deep */ "./node_modules/griddle-react/modules/deep.js");

var drop = __webpack_require__(/*! lodash/drop */ "./node_modules/lodash/drop.js");
var dropRight = __webpack_require__(/*! lodash/dropRight */ "./node_modules/lodash/dropRight.js");
var find = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
var first = __webpack_require__(/*! lodash/take */ "./node_modules/lodash/take.js");
var forEach = __webpack_require__(/*! lodash/forEach */ "./node_modules/lodash/forEach.js");
var initial = __webpack_require__(/*! lodash/initial */ "./node_modules/lodash/initial.js");
var intersection = __webpack_require__(/*! lodash/intersection */ "./node_modules/lodash/intersection.js");
var isArray = __webpack_require__(/*! lodash/isArray */ "./node_modules/lodash/isArray.js");
var isEmpty = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
var isNull = __webpack_require__(/*! lodash/isNull */ "./node_modules/lodash/isNull.js");
var isUndefined = __webpack_require__(/*! lodash/isUndefined */ "./node_modules/lodash/isUndefined.js");
var omit = __webpack_require__(/*! lodash/omit */ "./node_modules/lodash/omit.js");
var map = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
var extend = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");
var _filter = __webpack_require__(/*! lodash/filter */ "./node_modules/lodash/filter.js");

var _orderBy = __webpack_require__(/*! lodash/orderBy */ "./node_modules/lodash/orderBy.js");
var _property = __webpack_require__(/*! lodash/property */ "./node_modules/lodash/property.js");
var _get = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
var _some = __webpack_require__(/*! lodash/some */ "./node_modules/lodash/some.js");

var Griddle = createReactClass({
    statics: {
        GridTable: GridTable,
        GridFilter: GridFilter,
        GridPagination: GridPagination,
        GridSettings: GridSettings,
        GridRow: GridRow
    },
    columnSettings: null,
    rowSettings: null,
    getDefaultProps: function getDefaultProps() {
        return {
            "columns": [],
            "gridMetadata": null,
            "columnMetadata": [],
            "rowMetadata": null,
            "results": [], // Used if all results are already loaded.
            "initialSort": "",
            "gridClassName": "",
            "tableClassName": "",
            "customRowComponentClassName": "",
            "settingsText": "Settings",
            "filterPlaceholderText": "Filter Results",
            "nextText": "Next",
            "previousText": "Previous",
            "maxRowsText": "Rows per page",
            "enableCustomFormatText": "Enable Custom Formatting",
            //this column will determine which column holds subgrid data
            //it will be passed through with the data object but will not be rendered
            "childrenColumnName": "children",
            //Any column in this list will be treated as metadata and will be passed through with the data but won't be rendered
            "metadataColumns": [],
            "showFilter": false,
            "showSettings": false,
            "useCustomRowComponent": false,
            "useCustomGridComponent": false,
            "useCustomPagerComponent": false,
            "useCustomFilterer": false,
            "useCustomFilterComponent": false,
            "useGriddleStyles": true,
            "useGriddleIcons": true,
            "customRowComponent": null,
            "customGridComponent": null,
            "customPagerComponent": {},
            "customFilterComponent": null,
            "customFilterer": null,
            "globalData": null,
            "enableToggleCustom": false,
            "noDataMessage": "There is no data to display.",
            "noDataClassName": "griddle-nodata",
            "customNoDataComponent": null,
            "customNoDataComponentProps": null,
            "allowEmptyGrid": false,
            "showTableHeading": true,
            "showPager": true,
            "useFixedHeader": false,
            "useExternal": false,
            "externalSetPage": null,
            "externalChangeSort": null,
            "externalSetFilter": null,
            "externalSetPageSize": null,
            "externalMaxPage": null,
            "externalCurrentPage": null,
            "externalSortColumn": null,
            "externalSortAscending": true,
            "externalLoadingComponent": null,
            "externalIsLoading": false,
            "enableInfiniteScroll": false,
            "bodyHeight": null,
            "paddingHeight": 5,
            "rowHeight": 25,
            "infiniteScrollLoadTreshold": 50,
            "useFixedLayout": true,
            "isSubGriddle": false,
            "enableSort": true,
            "onRowClick": null,
            "onRowMouseEnter": null,
            "onRowMouseLeave": null,
            "onRowWillMount": null,
            "onRowWillUnmount": null,
            /* css class names */
            "sortAscendingClassName": "sort-ascending",
            "sortDescendingClassName": "sort-descending",
            "parentRowCollapsedClassName": "parent-row",
            "parentRowExpandedClassName": "parent-row expanded",
            "settingsToggleClassName": "settings",
            "nextClassName": "griddle-next",
            "previousClassName": "griddle-previous",
            "headerStyles": {},
            /* icon components */
            "sortAscendingComponent": " ▲",
            "sortDescendingComponent": " ▼",
            "sortDefaultComponent": null,
            "parentRowCollapsedComponent": "▶",
            "parentRowExpandedComponent": "▼",
            "settingsIconComponent": "",
            "nextIconComponent": "",
            "previousIconComponent": "",
            "isMultipleSelection": false, //currently does not support subgrids
            "selectedRowIds": [],
            "uniqueIdentifier": "id",
            "onSelectionChange": null,
            "columnFilterFunc": null
        };
    },
    propTypes: {
        isMultipleSelection: PropTypes.bool,
        selectedRowIds: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.arrayOf(PropTypes.string)]),
        uniqueIdentifier: PropTypes.string,
        onSelectionChange: PropTypes.func,
        columnFilterFunc: PropTypes.func
    },
    defaultFilter: function defaultFilter(results, filter) {
        var that = this;
        return _filter(results, function (item) {
            var arr = deep.keys(item);
            for (var i = 0; i < arr.length; i++) {
                var isFilterable = that.columnSettings.getMetadataColumnProperty(arr[i], "filterable", true);
                if (isFilterable && (deep.getAt(item, arr[i]) || "").toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                    return true;
                }
            }
            return false;
        });
    },

    defaultColumnFilter: function defaultColumnFilter(columnName, value, filter) {
        var filters = map(isArray(filter) ? filter : [filter], function (filter) {
            return (filter || '').toLowerCase();
        });
        return _some(deep.getObjectValues(value), function (value) {
            value = value.toString().toLowerCase();
            return _some(filters, function (filter) {
                return value.indexOf(filter) >= 0;
            });
        });
    },

    filterByColumnFilters: function filterByColumnFilters(columnFilters) {
        var filterFunction = this.props.columnFilterFunc || this.defaultColumnFilter;
        var filteredResults = Object.keys(columnFilters).reduce(function (previous, current) {
            return _filter(previous, function (item) {
                var value = deep.getAt(item, current || "");
                var filter = columnFilters[current];
                return filterFunction(current || '', value, filter);
            });
        }, this.props.results);

        var newState = {
            columnFilters: columnFilters
        };

        if (columnFilters) {
            newState.filteredResults = filteredResults;
            newState.maxPage = this.getMaxPage(newState.filteredResults);
        } else if (this.state.filter) {
            newState.filteredResults = this.props.useCustomFilterer ? this.props.customFilterer(this.props.results, filter) : this.defaultFilter(this.props.results, filter);
        } else {
            newState.filteredResults = null;
        }

        this.setState(newState);
    },

    filterByColumn: function filterByColumn(filter, column) {
        var columnFilters = this.state.columnFilters;

        //if filter is "" remove it from the columnFilters object
        if (columnFilters.hasOwnProperty(column) && !filter) {
            columnFilters = omit(columnFilters, column);
        } else {
            var newObject = {};
            newObject[column] = filter;
            columnFilters = extend({}, columnFilters, newObject);
        }

        this.filterByColumnFilters(columnFilters);
    },

    /* if we have a filter display the max page and results accordingly */
    setFilter: function setFilter(filter) {
        var updatedResults = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        if (this.props.useExternal) {
            this.props.externalSetFilter(filter);
            return;
        }

        var that = this,
            updatedState = {
            page: 0,
            filter: filter
        };

        // Obtain the state results.
        updatedState.filteredResults = this.props.useCustomFilterer ? this.props.customFilterer(updatedResults || this.props.results, filter) : this.defaultFilter(updatedResults || this.props.results, filter);

        // Update the max page.
        updatedState.maxPage = that.getMaxPage(updatedState.filteredResults);

        //if filter is null or undefined reset the filter.
        if (isUndefined(filter) || isNull(filter) || isEmpty(filter)) {
            updatedState.filter = filter;
            updatedState.filteredResults = null;
        }

        // Set the state.
        that.setState(updatedState);

        this._resetSelectedRows();
    },
    setPageSize: function setPageSize(size) {
        if (this.props.useExternal) {
            this.setState({
                resultsPerPage: size
            });
            this.props.externalSetPageSize(size);
            return;
        }
        //make this better.
        this.state.resultsPerPage = size;
        this.setMaxPage();
    },
    toggleColumnChooser: function toggleColumnChooser() {
        this.setState({
            showColumnChooser: !this.state.showColumnChooser
        });
    },
    isNullOrUndefined: function isNullOrUndefined(value) {
        return value === undefined || value === null;
    },
    shouldUseCustomRowComponent: function shouldUseCustomRowComponent() {
        return this.isNullOrUndefined(this.state.useCustomRowComponent) ? this.props.useCustomRowComponent : this.state.useCustomRowComponent;
    },
    shouldUseCustomGridComponent: function shouldUseCustomGridComponent() {
        return this.isNullOrUndefined(this.state.useCustomGridComponent) ? this.props.useCustomGridComponent : this.state.useCustomGridComponent;
    },
    toggleCustomComponent: function toggleCustomComponent() {
        if (this.state.customComponentType === "grid") {
            this.setState({
                useCustomGridComponent: !this.shouldUseCustomGridComponent()
            });
        } else if (this.state.customComponentType === "row") {
            this.setState({
                useCustomRowComponent: !this.shouldUseCustomRowComponent()
            });
        }
    },
    getMaxPage: function getMaxPage(results, totalResults) {
        if (this.props.useExternal) {
            return this.props.externalMaxPage;
        }

        if (!totalResults) {
            totalResults = (results || this.getCurrentResults()).length;
        }
        var maxPage = Math.ceil(totalResults / this.state.resultsPerPage);
        return maxPage;
    },
    setMaxPage: function setMaxPage(results) {
        var maxPage = this.getMaxPage(results);
        //re-render if we have new max page value
        if (this.state.maxPage !== maxPage) {
            this.setState({ page: 0, maxPage: maxPage, filteredColumns: this.columnSettings.filteredColumns });
        }
    },
    setPage: function setPage(number) {
        if (this.props.useExternal) {
            this.props.externalSetPage(number);
            return;
        }

        //check page size and move the filteredResults to pageSize * pageNumber
        if (number * this.state.resultsPerPage <= this.state.resultsPerPage * this.state.maxPage) {
            var that = this,
                state = {
                page: number
            };

            that.setState(state);
        }

        //When infinite scrolling is enabled, uncheck the "select all" checkbox, since more unchecked rows will be appended at the end
        if (this.props.enableInfiniteScroll) {
            this.setState({
                isSelectAllChecked: false
            });
        }
    },
    setColumns: function setColumns(columns) {
        this.columnSettings.filteredColumns = isArray(columns) ? columns : [columns];

        this.setState({
            filteredColumns: this.columnSettings.filteredColumns
        });
    },
    nextPage: function nextPage() {
        var currentPage = this.getCurrentPage();
        if (currentPage < this.getCurrentMaxPage() - 1) {
            this.setPage(currentPage + 1);
        }
    },
    previousPage: function previousPage() {
        var currentPage = this.getCurrentPage();
        if (currentPage > 0) {
            this.setPage(currentPage - 1);
        }
    },
    changeSort: function changeSort(column) {
        if (this.props.enableSort === false) {
            return;
        }

        if (this.props.useExternal) {
            var isAscending = this.props.externalSortColumn === column ? !this.props.externalSortAscending : true;
            this.setState({
                sortColumn: column,
                sortDirection: isAscending ? 'asc' : 'desc'
            });
            this.props.externalChangeSort(column, isAscending);
            return;
        }
        var columnMeta = find(this.props.columnMetadata, { columnName: column }) || {};
        var sortDirectionCycle = columnMeta.sortDirectionCycle ? columnMeta.sortDirectionCycle : [null, 'asc', 'desc'];
        var sortDirection = null;
        // Find the current position in the cycle (or -1).
        var i = sortDirectionCycle.indexOf(this.state.sortDirection && column === this.state.sortColumn ? this.state.sortDirection : null);

        // Proceed to the next position in the cycle (or start at the beginning).
        i = (i + 1) % sortDirectionCycle.length;

        if (sortDirectionCycle[i]) {
            sortDirection = sortDirectionCycle[i];
        } else {
            sortDirection = null;
        }

        var state = {
            page: 0,
            sortColumn: column,
            sortDirection: sortDirection
        };

        this.setState(state);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // Check if results props changed
        if (nextProps.results !== this.props.results) {
            this.setFilter(this.state.filter, nextProps.results);
        }

        this.setMaxPage(nextProps.results);
        if (nextProps.resultsPerPage !== this.props.resultsPerPage) {
            this.setPageSize(nextProps.resultsPerPage);
        }
        //This will updaet the column Metadata
        this.columnSettings.columnMetadata = nextProps.columnMetadata;
        if (nextProps.results.length > 0) {
            var deepKeys = deep.keys(nextProps.results[0]);

            var is_same = this.columnSettings.allColumns.length == deepKeys.length && this.columnSettings.allColumns.every(function (element, index) {
                return element === deepKeys[index];
            });

            if (!is_same) {
                this.columnSettings.allColumns = deepKeys;
            }
        } else if (this.columnSettings.allColumns.length > 0) {
            this.columnSettings.allColumns = [];
        }

        if (nextProps.selectedRowIds) {
            var visibleRows = this.getDataForRender(this.getCurrentResults(nextProps.results), this.columnSettings.getColumns(), true);

            this.setState({
                isSelectAllChecked: this._getAreAllRowsChecked(nextProps.selectedRowIds, map(visibleRows, this.props.uniqueIdentifier)),
                selectedRowIds: nextProps.selectedRowIds
            });
        }
    },
    getInitialState: function getInitialState() {
        var state = {
            maxPage: 0,
            page: 0,
            filteredResults: null,
            filteredColumns: [],
            filter: "",
            //this sets the individual column filters
            columnFilters: {},
            resultsPerPage: this.props.resultsPerPage || 5,
            showColumnChooser: false,
            isSelectAllChecked: false,
            selectedRowIds: this.props.selectedRowIds
        };
        return state;
    },
    componentWillMount: function componentWillMount() {
        this.verifyExternal();
        this.verifyCustom();

        this.columnSettings = new ColumnProperties(this.props.results.length > 0 ? deep.keys(this.props.results[0]) : [], this.props.columns, this.props.childrenColumnName, this.props.columnMetadata, this.props.metadataColumns);

        this.rowSettings = new RowProperties(this.props.rowMetadata, this.props.useCustomTableRowComponent && this.props.customTableRowComponent ? this.props.customTableRowComponent : GridRow, this.props.useCustomTableRowComponent);

        if (this.props.initialSort) {
            // shouldn't change Sort on init for external
            if (this.props.useExternal) {
                this.setState({
                    sortColumn: this.props.externalSortColumn,
                    sortDirection: this.props.externalSortAscending ? 'asc' : 'desc'
                });
            } else {
                this.changeSort(this.props.initialSort);
            }
        }
        this.setMaxPage();

        //don't like the magic strings
        if (this.shouldUseCustomGridComponent()) {
            this.setState({
                customComponentType: "grid"
            });
        } else if (this.shouldUseCustomRowComponent()) {
            this.setState({
                customComponentType: "row"
            });
        } else {
            this.setState({
                filteredColumns: this.columnSettings.filteredColumns
            });
        }
    },
    componentDidMount: function componentDidMount() {
        if (this.props.componentDidMount && typeof this.props.componentDidMount === "function") {
            return this.props.componentDidMount();
        }
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.props.componentDidUpdate && typeof this.props.componentDidUpdate === "function") {
            return this.props.componentDidUpdate(this.state);
        }
    },
    //todo: clean these verify methods up
    verifyExternal: function verifyExternal() {
        if (this.props.useExternal === true) {
            //hooray for big ugly nested if
            if (this.props.externalSetPage === null) {
                console.error("useExternal is set to true but there is no externalSetPage function specified.");
            }

            if (this.props.externalChangeSort === null) {
                console.error("useExternal is set to true but there is no externalChangeSort function specified.");
            }

            if (this.props.externalSetFilter === null) {
                console.error("useExternal is set to true but there is no externalSetFilter function specified.");
            }

            if (this.props.externalSetPageSize === null) {
                console.error("useExternal is set to true but there is no externalSetPageSize function specified.");
            }

            if (this.props.externalMaxPage === null) {
                console.error("useExternal is set to true but externalMaxPage is not set.");
            }

            if (this.props.externalCurrentPage === null) {
                console.error("useExternal is set to true but externalCurrentPage is not set. Griddle will not page correctly without that property when using external data.");
            }
        }
    },
    //TODO: Do this with propTypes
    verifyCustom: function verifyCustom() {
        if (this.props.useCustomGridComponent === true && this.props.customGridComponent === null) {
            console.error("useCustomGridComponent is set to true but no custom component was specified.");
        }
        if (this.props.useCustomRowComponent === true && this.props.customRowComponent === null) {
            console.error("useCustomRowComponent is set to true but no custom component was specified.");
        }
        if (this.props.useCustomGridComponent === true && this.props.useCustomRowComponent === true) {
            console.error("Cannot currently use both customGridComponent and customRowComponent.");
        }
        if (this.props.useCustomFilterer === true && this.props.customFilterer === null) {
            console.error("useCustomFilterer is set to true but no custom filter function was specified.");
        }
        if (this.props.useCustomFilterComponent === true && this.props.customFilterComponent === null) {
            console.error("useCustomFilterComponent is set to true but no customFilterComponent was specified.");
        }
    },
    getDataForRender: function getDataForRender(data, cols, pageList) {
        var _this = this;

        var that = this;

        if (!this.props.useExternal) {
            if (this.state.sortColumn !== "") {
                var column = this.state.sortColumn;
                var sortColumn = _filter(this.props.columnMetadata, { columnName: column });
                var customCompareFn;
                var multiSort = {
                    columns: [],
                    orders: []
                };

                if (sortColumn.length > 0) {
                    customCompareFn = sortColumn[0].hasOwnProperty("customCompareFn") && sortColumn[0]["customCompareFn"];
                    if (sortColumn[0]["multiSort"]) {
                        multiSort = sortColumn[0]["multiSort"];
                    }
                }

                if (this.state.sortDirection) {
                    if (typeof customCompareFn === 'function') {
                        if (customCompareFn.length === 2) {
                            data = data.sort(function (a, b) {
                                return customCompareFn(_get(a, column), _get(b, column));
                            });

                            if (this.state.sortDirection === 'desc') {
                                data.reverse();
                            }
                        } else if (customCompareFn.length === 1) {
                            data = _orderBy(data, function (item) {
                                return customCompareFn(_get(item, column));
                            }, [this.state.sortDirection]);
                        }
                    } else {
                        var iteratees = [function (row) {
                            return (_get(row, column) || '').toString().toLowerCase();
                        }];
                        var orders = [this.state.sortDirection];
                        multiSort.columns.forEach(function (col, i) {
                            iteratees.push(function (row) {
                                return (_get(row, col) || '').toString().toLowerCase();
                            });
                            if (multiSort.orders[i] === 'asc' || multiSort.orders[i] === 'desc') {
                                orders.push(multiSort.orders[i]);
                            } else {
                                orders.push(_this.state.sortDirection);
                            }
                        });

                        data = _orderBy(data, iteratees, orders);
                    }
                }
            }

            var currentPage = this.getCurrentPage();

            if (!this.props.useExternal && pageList && this.state.resultsPerPage * (currentPage + 1) <= this.state.resultsPerPage * this.state.maxPage && currentPage >= 0) {
                if (this.isInfiniteScrollEnabled()) {
                    // If we're doing infinite scroll, grab all results up to the current page.
                    data = first(data, (currentPage + 1) * this.state.resultsPerPage);
                } else {
                    //the 'rest' is grabbing the whole array from index on and the 'initial' is getting the first n results
                    var rest = drop(data, currentPage * this.state.resultsPerPage);
                    data = (dropRight || initial)(rest, rest.length - this.state.resultsPerPage);
                }
            }
        }

        var transformedData = [];

        for (var i = 0; i < data.length; i++) {
            var mappedData = data[i];

            if (typeof mappedData[that.props.childrenColumnName] !== "undefined" && mappedData[that.props.childrenColumnName].length > 0) {
                //internally we're going to use children instead of whatever it is so we don't have to pass the custom name around
                mappedData["children"] = that.getDataForRender(mappedData[that.props.childrenColumnName], cols, false);

                if (that.props.childrenColumnName !== "children") {
                    delete mappedData[that.props.childrenColumnName];
                }
            }

            transformedData.push(mappedData);
        }
        return transformedData;
    },
    getCurrentResults: function getCurrentResults(results) {
        return this.state.filteredResults || results || this.props.results;
    },
    getCurrentPage: function getCurrentPage() {
        return this.props.externalCurrentPage || this.state.page;
    },
    getCurrentSort: function getCurrentSort() {
        return this.props.useExternal ? this.props.externalSortColumn : this.state.sortColumn;
    },
    getCurrentSortAscending: function getCurrentSortAscending() {
        return this.props.useExternal ? this.props.externalSortAscending : this.state.sortDirection === 'asc';
    },
    getCurrentMaxPage: function getCurrentMaxPage() {
        return this.props.useExternal ? this.props.externalMaxPage : this.state.maxPage;
    },
    //This takes the props relating to sort and puts them in one object
    getSortObject: function getSortObject() {
        return {
            enableSort: this.props.enableSort,
            changeSort: this.changeSort,
            sortColumn: this.getCurrentSort(),
            sortAscending: this.getCurrentSortAscending(),
            sortDirection: this.state.sortDirection,
            sortAscendingClassName: this.props.sortAscendingClassName,
            sortDescendingClassName: this.props.sortDescendingClassName,
            sortAscendingComponent: this.props.sortAscendingComponent,
            sortDescendingComponent: this.props.sortDescendingComponent,
            sortDefaultComponent: this.props.sortDefaultComponent
        };
    },
    _toggleSelectAll: function _toggleSelectAll() {
        var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true),
            newIsSelectAllChecked = !this.state.isSelectAllChecked,
            newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

        var self = this;
        forEach(visibleRows, function (row) {
            self._updateSelectedRowIds(row[self.props.uniqueIdentifier], newSelectedRowIds, newIsSelectAllChecked);
        }, this);

        this.setState({
            isSelectAllChecked: newIsSelectAllChecked,
            selectedRowIds: newSelectedRowIds
        });

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(newSelectedRowIds, newIsSelectAllChecked);
        }
    },
    _toggleSelectRow: function _toggleSelectRow(row, isChecked) {
        var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true),
            newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

        this._updateSelectedRowIds(row[this.props.uniqueIdentifier], newSelectedRowIds, isChecked);

        var newIsSelectAllChecked = this._getAreAllRowsChecked(newSelectedRowIds, map(visibleRows, this.props.uniqueIdentifier));

        this.setState({
            isSelectAllChecked: newIsSelectAllChecked,
            selectedRowIds: newSelectedRowIds
        });

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(newSelectedRowIds, newIsSelectAllChecked);
        }
    },
    _updateSelectedRowIds: function _updateSelectedRowIds(id, selectedRowIds, isChecked) {

        var isFound;

        if (isChecked) {
            isFound = find(selectedRowIds, function (item) {
                return id === item;
            });

            if (isFound === undefined) {
                selectedRowIds.push(id);
            }
        } else {
            selectedRowIds.splice(selectedRowIds.indexOf(id), 1);
        }
    },
    _getIsSelectAllChecked: function _getIsSelectAllChecked() {

        return this.state.isSelectAllChecked;
    },
    _getAreAllRowsChecked: function _getAreAllRowsChecked(selectedRowIds, visibleRowIds) {

        return visibleRowIds.length === intersection(visibleRowIds, selectedRowIds).length;
    },
    _getIsRowChecked: function _getIsRowChecked(row) {

        return this.state.selectedRowIds.indexOf(row[this.props.uniqueIdentifier]) > -1 ? true : false;
    },
    getSelectedRowIds: function getSelectedRowIds() {

        return this.state.selectedRowIds;
    },
    _resetSelectedRows: function _resetSelectedRows() {

        this.setState({
            isSelectAllChecked: false,
            selectedRowIds: []
        });
    },
    //This takes the props relating to multiple selection and puts them in one object
    getMultipleSelectionObject: function getMultipleSelectionObject() {

        return {
            isMultipleSelection: find(this.props.results, function (result) {
                return 'children' in result;
            }) ? false : this.props.isMultipleSelection, //does not support subgrids
            toggleSelectAll: this._toggleSelectAll,
            getIsSelectAllChecked: this._getIsSelectAllChecked,
            toggleSelectRow: this._toggleSelectRow,
            getSelectedRowIds: this.getSelectedRowIds,
            getIsRowChecked: this._getIsRowChecked
        };
    },
    isInfiniteScrollEnabled: function isInfiniteScrollEnabled() {
        // If a custom pager is included, don't allow for infinite scrolling.
        if (this.props.useCustomPagerComponent) {
            return false;
        }

        // Otherwise, send back the property.
        return this.props.enableInfiniteScroll;
    },
    getClearFixStyles: function getClearFixStyles() {
        return {
            clear: "both",
            display: "table",
            width: "100%"
        };
    },
    getSettingsStyles: function getSettingsStyles() {
        return {
            "float": "left",
            width: "50%",
            textAlign: "right"
        };
    },
    getFilterStyles: function getFilterStyles() {
        return {
            "float": "left",
            width: "50%",
            textAlign: "left",
            color: "#222",
            minHeight: "1px"
        };
    },
    getFilter: function getFilter() {
        return this.props.showFilter && this.shouldUseCustomGridComponent() === false ? this.props.useCustomFilterComponent ? React.createElement(CustomFilterContainer, { changeFilter: this.setFilter, placeholderText: this.props.filterPlaceholderText, customFilterComponent: this.props.customFilterComponent, results: this.props.results, currentResults: this.getCurrentResults() }) : React.createElement(GridFilter, { changeFilter: this.setFilter, placeholderText: this.props.filterPlaceholderText }) : "";
    },
    getSettings: function getSettings() {
        return this.props.showSettings ? React.createElement('button', { type: 'button', className: this.props.settingsToggleClassName, onClick: this.toggleColumnChooser,
            style: this.props.useGriddleStyles ? { background: "none", border: "none", padding: 0, margin: 0, fontSize: 14 } : null }, this.props.settingsText, this.props.settingsIconComponent) : "";
    },
    getTopSection: function getTopSection(filter, settings) {
        if (this.props.showFilter === false && this.props.showSettings === false) {
            return "";
        }

        var filterStyles = null,
            settingsStyles = null,
            topContainerStyles = null;

        if (this.props.useGriddleStyles) {
            filterStyles = this.getFilterStyles();
            settingsStyles = this.getSettingsStyles();

            topContainerStyles = this.getClearFixStyles();
        }

        return React.createElement('div', { className: 'top-section', style: topContainerStyles }, React.createElement('div', { className: 'griddle-filter', style: filterStyles }, filter), React.createElement('div', { className: 'griddle-settings-toggle', style: settingsStyles }, settings));
    },
    getPagingSection: function getPagingSection(currentPage, maxPage) {
        if ((this.props.showPager && !this.isInfiniteScrollEnabled() && !this.shouldUseCustomGridComponent()) === false) {
            return undefined;
        }

        return React.createElement('div', { className: 'griddle-footer' }, this.props.useCustomPagerComponent ? React.createElement(CustomPaginationContainer, { customPagerComponentOptions: this.props.customPagerComponentOptions, next: this.nextPage, previous: this.previousPage, currentPage: currentPage, maxPage: maxPage, setPage: this.setPage, nextText: this.props.nextText, previousText: this.props.previousText, customPagerComponent: this.props.customPagerComponent }) : React.createElement(GridPagination, { useGriddleStyles: this.props.useGriddleStyles, next: this.nextPage, previous: this.previousPage, nextClassName: this.props.nextClassName, nextIconComponent: this.props.nextIconComponent, previousClassName: this.props.previousClassName, previousIconComponent: this.props.previousIconComponent, currentPage: currentPage, maxPage: maxPage, setPage: this.setPage, nextText: this.props.nextText, previousText: this.props.previousText }));
    },
    getColumnSelectorSection: function getColumnSelectorSection(keys, cols) {
        return this.state.showColumnChooser ? React.createElement(GridSettings, { columns: keys, selectedColumns: cols, setColumns: this.setColumns, settingsText: this.props.settingsText,
            settingsIconComponent: this.props.settingsIconComponent, maxRowsText: this.props.maxRowsText, setPageSize: this.setPageSize,
            showSetPageSize: !this.shouldUseCustomGridComponent(), resultsPerPage: this.state.resultsPerPage, enableToggleCustom: this.props.enableToggleCustom,
            toggleCustomComponent: this.toggleCustomComponent, useCustomComponent: this.shouldUseCustomRowComponent() || this.shouldUseCustomGridComponent(),
            useGriddleStyles: this.props.useGriddleStyles, enableCustomFormatText: this.props.enableCustomFormatText, columnMetadata: this.props.columnMetadata }) : "";
    },
    getCustomGridSection: function getCustomGridSection() {
        return React.createElement(this.props.customGridComponent, _extends({ data: this.props.results, className: this.props.customGridComponentClassName }, this.props.gridMetadata));
    },
    getCustomRowSection: function getCustomRowSection(data, cols, meta, pagingContent, globalData) {
        return React.createElement('div', null, React.createElement(CustomRowComponentContainer, { data: data, columns: cols, metadataColumns: meta, globalData: globalData,
            className: this.props.customRowComponentClassName, customComponent: this.props.customRowComponent,
            style: this.props.useGriddleStyles ? this.getClearFixStyles() : null }), this.props.showPager && pagingContent);
    },
    getStandardGridSection: function getStandardGridSection(data, cols, meta, pagingContent, hasMorePages) {
        var sortProperties = this.getSortObject();
        var multipleSelectionProperties = this.getMultipleSelectionObject();

        // no data section
        var showNoData = this.shouldShowNoDataSection(data);
        var noDataSection = this.getNoDataSection();

        return React.createElement('div', { className: 'griddle-body' }, React.createElement(GridTable, { useGriddleStyles: this.props.useGriddleStyles,
            noDataSection: noDataSection,
            showNoData: showNoData,
            columnSettings: this.columnSettings,
            rowSettings: this.rowSettings,
            sortSettings: sortProperties,
            multipleSelectionSettings: multipleSelectionProperties,
            filterByColumn: this.filterByColumn,
            isSubGriddle: this.props.isSubGriddle,
            useGriddleIcons: this.props.useGriddleIcons,
            useFixedLayout: this.props.useFixedLayout,
            showPager: this.props.showPager,
            pagingContent: pagingContent,
            data: data,
            className: this.props.tableClassName,
            enableInfiniteScroll: this.isInfiniteScrollEnabled(),
            nextPage: this.nextPage,
            showTableHeading: this.props.showTableHeading,
            useFixedHeader: this.props.useFixedHeader,
            parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
            parentRowExpandedClassName: this.props.parentRowExpandedClassName,
            parentRowCollapsedComponent: this.props.parentRowCollapsedComponent,
            parentRowExpandedComponent: this.props.parentRowExpandedComponent,
            bodyHeight: this.props.bodyHeight,
            paddingHeight: this.props.paddingHeight,
            rowHeight: this.props.rowHeight,
            infiniteScrollLoadTreshold: this.props.infiniteScrollLoadTreshold,
            externalLoadingComponent: this.props.externalLoadingComponent,
            externalIsLoading: this.props.externalIsLoading,
            hasMorePages: hasMorePages,
            onRowClick: this.props.onRowClick,
            onRowMouseEnter: this.props.onRowMouseEnter,
            onRowMouseLeave: this.props.onRowMouseLeave,
            onRowWillMount: this.props.onRowWillMount,
            onRowWillUnmount: this.props.onRowWillUnmount }));
    },
    getContentSection: function getContentSection(data, cols, meta, pagingContent, hasMorePages, globalData) {
        if (this.shouldUseCustomGridComponent() && this.props.customGridComponent !== null) {
            return this.getCustomGridSection();
        } else if (this.shouldUseCustomRowComponent()) {
            return this.getCustomRowSection(data, cols, meta, pagingContent, globalData);
        } else {
            return this.getStandardGridSection(data, cols, meta, pagingContent, hasMorePages);
        }
    },
    getNoDataSection: function getNoDataSection() {
        if (this.props.customNoDataComponent != null) {
            return React.createElement('div', { className: this.props.noDataClassName }, React.createElement(this.props.customNoDataComponent, this.props.customNoDataComponentProps));
        }
        return React.createElement(GridNoData, { noDataMessage: this.props.noDataMessage });
    },
    shouldShowNoDataSection: function shouldShowNoDataSection(results) {
        if (this.props.allowEmptyGrid) {
            return false;
        }

        return this.props.useExternal === false && (typeof results === 'undefined' || results.length === 0) || this.props.useExternal === true && this.props.externalIsLoading === false && results.length === 0;
    },
    render: function render() {
        var that = this,
            results = this.getCurrentResults(); // Attempt to assign to the filtered results, if we have any.

        var headerTableClassName = this.props.tableClassName + " table-header";

        //figure out if we want to show the filter section
        var filter = this.getFilter();
        var settings = this.getSettings();

        //if we have neither filter or settings don't need to render this stuff
        var topSection = this.getTopSection(filter, settings);

        var keys = [];
        var cols = this.columnSettings.getColumns();
        //figure out which columns are displayed and show only those
        var data = this.getDataForRender(results, cols, true);

        var meta = this.columnSettings.getMetadataColumns();

        if (this.props.columnMetadata) {
            // Get column keys from column metadata
            forEach(this.props.columnMetadata, function (meta) {
                if (!(typeof meta.visible === 'boolean' && meta.visible === false)) {
                    keys.push(meta.columnName);
                }
            });
        } else {
            // Grab the column keys from the first results
            keys = deep.keys(omit(results[0], meta));
        }

        // sort keys by order
        keys = this.columnSettings.orderColumns(keys);

        // Grab the current and max page values.
        var currentPage = this.getCurrentPage();
        var maxPage = this.getCurrentMaxPage();

        // Determine if we need to enable infinite scrolling on the table.
        var hasMorePages = currentPage + 1 < maxPage;

        // Grab the paging content if it's to be displayed
        var pagingContent = this.getPagingSection(currentPage, maxPage);

        var resultContent = this.getContentSection(data, cols, meta, pagingContent, hasMorePages, this.props.globalData);

        var columnSelector = this.getColumnSelectorSection(keys, cols);

        var gridClassName = this.props.gridClassName.length > 0 ? "griddle " + this.props.gridClassName : "griddle";
        //add custom to the class name so we can style it differently
        gridClassName += this.shouldUseCustomRowComponent() ? " griddle-custom" : "";

        return React.createElement('div', { className: gridClassName }, topSection, columnSelector, React.createElement('div', { className: 'griddle-container', style: this.props.useGriddleStyles && !this.props.isSubGriddle ? { border: "1px solid #DDD" } : null }, resultContent));
    }
});

GridRowContainer.Griddle = module.exports = Griddle;


/***/ }),

/***/ "./node_modules/griddle-react/modules/rowProperties.js":
/*!*************************************************************!*\
  !*** ./node_modules/griddle-react/modules/rowProperties.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _uniqueId = __webpack_require__(/*! lodash/uniqueId */ "./node_modules/lodash/uniqueId.js");

var RowProperties = (function () {
  function RowProperties() {
    var rowMetadata = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var rowComponent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var isCustom = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    _classCallCheck(this, RowProperties);

    this.rowMetadata = rowMetadata;
    this.rowComponent = rowComponent;
    this.isCustom = isCustom;
    // assign unique Id to each griddle instance
  }

  _createClass(RowProperties, [{
    key: 'getRowKey',
    value: function getRowKey(row, key) {
      var uniqueId;

      if (this.hasRowMetadataKey()) {
        uniqueId = row[this.rowMetadata.key];
      } else {
        uniqueId = _uniqueId("grid_row");
      }

      //todo: add error handling

      return uniqueId;
    }
  }, {
    key: 'hasRowMetadataKey',
    value: function hasRowMetadataKey() {
      return this.hasRowMetadata() && this.rowMetadata.key !== null && this.rowMetadata.key !== undefined;
    }
  }, {
    key: 'getBodyRowMetadataClass',
    value: function getBodyRowMetadataClass(rowData) {
      if (this.hasRowMetadata() && this.rowMetadata.bodyCssClassName !== null && this.rowMetadata.bodyCssClassName !== undefined) {
        if (typeof this.rowMetadata.bodyCssClassName === 'function') {
          return this.rowMetadata.bodyCssClassName(rowData);
        } else {
          return this.rowMetadata.bodyCssClassName;
        }
      }
      return null;
    }
  }, {
    key: 'getHeaderRowMetadataClass',
    value: function getHeaderRowMetadataClass() {
      return this.hasRowMetadata() && this.rowMetadata.headerCssClassName !== null && this.rowMetadata.headerCssClassName !== undefined ? this.rowMetadata.headerCssClassName : null;
    }
  }, {
    key: 'hasRowMetadata',
    value: function hasRowMetadata() {
      return this.rowMetadata !== null;
    }
  }]);

  return RowProperties;
})();

module.exports = RowProperties;


/***/ }),

/***/ "./node_modules/just-extend/index.esm.js":
/*!***********************************************!*\
  !*** ./node_modules/just-extend/index.esm.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ objectExtend; }
/* harmony export */ });
var objectExtend = extend;

/*
  var obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}

  var obj = {a: 3, b: 5};
  extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3]}

  extend({a: 4, b: 5}); // {a: 4, b: 5}
  extend({a: 4, b: 5}, 3); {a: 4, b: 5}
  extend({a: 4, b: 5}, true); {a: 4, b: 5}
  extend('hello', {a: 4, b: 5}); // throws
  extend(3, {a: 4, b: 5}); // throws
*/

function extend(/* [deep], obj1, obj2, [objn] */) {
  var args = [].slice.call(arguments);
  var deep = false;
  if (typeof args[0] == 'boolean') {
    deep = args.shift();
  }
  var result = args[0];
  if (isUnextendable(result)) {
    throw new Error('extendee must be an object');
  }
  var extenders = args.slice(1);
  var len = extenders.length;
  for (var i = 0; i < len; i++) {
    var extender = extenders[i];
    for (var key in extender) {
      if (Object.prototype.hasOwnProperty.call(extender, key)) {
        var value = extender[key];
        if (deep && isCloneable(value)) {
          var base = Array.isArray(value) ? [] : {};
          result[key] = extend(
            true,
            Object.prototype.hasOwnProperty.call(result, key) && !isUnextendable(result[key])
              ? result[key]
              : base,
            value
          );
        } else {
          result[key] = value;
        }
      }
    }
  }
  return result;
}

function isCloneable(obj) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}

function isUnextendable(val) {
  return !val || (typeof val != 'object' && typeof val != 'function');
}




/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "./node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "./node_modules/lodash/_setCacheHas.js");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/***/ (function(module) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayIncludes.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_arrayIncludesWith.js ***!
  \***************************************************/
/***/ (function(module) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "./node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "./node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "./node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "./node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "./node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "./node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "./node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "./node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseDifference.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseDifference.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "./node_modules/lodash/_arrayIncludesWith.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),

/***/ "./node_modules/lodash/_baseEach.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ "./node_modules/lodash/_baseForOwn.js"),
    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ "./node_modules/lodash/_createBaseEach.js");

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),

/***/ "./node_modules/lodash/_baseFilter.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseFilter.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js");

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;


/***/ }),

/***/ "./node_modules/lodash/_baseFindIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseFindIndex.js ***!
  \***********************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ "./node_modules/lodash/_isFlattenable.js");

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseHasIn.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseHasIn.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIndexOf.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ "./node_modules/lodash/_baseFindIndex.js"),
    baseIsNaN = __webpack_require__(/*! ./_baseIsNaN */ "./node_modules/lodash/_baseIsNaN.js"),
    strictIndexOf = __webpack_require__(/*! ./_strictIndexOf */ "./node_modules/lodash/_strictIndexOf.js");

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseIntersection.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIntersection.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "./node_modules/lodash/_arrayIncludesWith.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined;
  }
  array = arrays[0];

  var index = -1,
      seen = caches[0];

  outer:
  while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if (!(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseIntersection;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "./node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "./node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "./node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),

/***/ "./node_modules/lodash/_baseIsMatch.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsMatch.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNaN.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsNaN.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseMatches = __webpack_require__(/*! ./_baseMatches */ "./node_modules/lodash/_baseMatches.js"),
    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ "./node_modules/lodash/_baseMatchesProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    property = __webpack_require__(/*! ./property */ "./node_modules/lodash/property.js");

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_baseMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseMap.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),

/***/ "./node_modules/lodash/_baseMatches.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseMatches.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ "./node_modules/lodash/_baseIsMatch.js"),
    getMatchData = __webpack_require__(/*! ./_getMatchData */ "./node_modules/lodash/_getMatchData.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/lodash/_matchesStrictComparable.js");

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),

/***/ "./node_modules/lodash/_baseMatchesProperty.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_baseMatchesProperty.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js"),
    get = __webpack_require__(/*! ./get */ "./node_modules/lodash/get.js"),
    hasIn = __webpack_require__(/*! ./hasIn */ "./node_modules/lodash/hasIn.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/lodash/_isStrictComparable.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/lodash/_matchesStrictComparable.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),

/***/ "./node_modules/lodash/_baseOrderBy.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseOrderBy.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    baseMap = __webpack_require__(/*! ./_baseMap */ "./node_modules/lodash/_baseMap.js"),
    baseSortBy = __webpack_require__(/*! ./_baseSortBy */ "./node_modules/lodash/_baseSortBy.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    compareMultiple = __webpack_require__(/*! ./_compareMultiple */ "./node_modules/lodash/_compareMultiple.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function(iteratee) {
      if (isArray(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;


/***/ }),

/***/ "./node_modules/lodash/_basePick.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_basePick.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var basePickBy = __webpack_require__(/*! ./_basePickBy */ "./node_modules/lodash/_basePickBy.js"),
    hasIn = __webpack_require__(/*! ./hasIn */ "./node_modules/lodash/hasIn.js");

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;


/***/ }),

/***/ "./node_modules/lodash/_basePickBy.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_basePickBy.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js"),
    baseSet = __webpack_require__(/*! ./_baseSet */ "./node_modules/lodash/_baseSet.js"),
    castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js");

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;


/***/ }),

/***/ "./node_modules/lodash/_baseProperty.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseProperty.js ***!
  \**********************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ "./node_modules/lodash/_basePropertyDeep.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_basePropertyDeep.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "./node_modules/lodash/_baseSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseSet.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "./node_modules/lodash/_baseSlice.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseSlice.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ "./node_modules/lodash/_baseSome.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseSome.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js");

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  baseEach(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

module.exports = baseSome;


/***/ }),

/***/ "./node_modules/lodash/_baseSortBy.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseSortBy.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseToPairs.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseToPairs.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js");

/**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the key-value pairs.
 */
function baseToPairs(object, props) {
  return arrayMap(props, function(key) {
    return [key, object[key]];
  });
}

module.exports = baseToPairs;


/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "./node_modules/lodash/_baseTrim.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseTrim.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "./node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_baseUnset.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnset.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    last = __webpack_require__(/*! ./last */ "./node_modules/lodash/last.js"),
    parent = __webpack_require__(/*! ./_parent */ "./node_modules/lodash/_parent.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;


/***/ }),

/***/ "./node_modules/lodash/_baseValues.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseValues.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js");

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),

/***/ "./node_modules/lodash/_baseZipObject.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseZipObject.js ***!
  \***********************************************/
/***/ (function(module) {

/**
 * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */
function baseZipObject(props, values, assignFunc) {
  var index = -1,
      length = props.length,
      valsLength = values.length,
      result = {};

  while (++index < length) {
    var value = index < valsLength ? values[index] : undefined;
    assignFunc(result, props[index], value);
  }
  return result;
}

module.exports = baseZipObject;


/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ "./node_modules/lodash/_castArrayLikeObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_castArrayLikeObject.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js");

/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

module.exports = castArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/_castFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_castFunction.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/***/ (function(module) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_compareAscending.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_compareAscending.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;


/***/ }),

/***/ "./node_modules/lodash/_compareMultiple.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_compareMultiple.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var compareAscending = __webpack_require__(/*! ./_compareAscending */ "./node_modules/lodash/_compareAscending.js");

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ "./node_modules/lodash/_createBaseEach.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/***/ (function(module) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ "./node_modules/lodash/_createFind.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createFind.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;


/***/ }),

/***/ "./node_modules/lodash/_createToPairs.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createToPairs.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseToPairs = __webpack_require__(/*! ./_baseToPairs */ "./node_modules/lodash/_baseToPairs.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/lodash/_mapToArray.js"),
    setToPairs = __webpack_require__(/*! ./_setToPairs */ "./node_modules/lodash/_setToPairs.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/**
 * Creates a `_.toPairs` or `_.toPairsIn` function.
 *
 * @private
 * @param {Function} keysFunc The function to get the keys of a given object.
 * @returns {Function} Returns the new pairs function.
 */
function createToPairs(keysFunc) {
  return function(object) {
    var tag = getTag(object);
    if (tag == mapTag) {
      return mapToArray(object);
    }
    if (tag == setTag) {
      return setToPairs(object);
    }
    return baseToPairs(object, keysFunc(object));
  };
}

module.exports = createToPairs;


/***/ }),

/***/ "./node_modules/lodash/_customOmitClone.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_customOmitClone.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPlainObject = __webpack_require__(/*! ./isPlainObject */ "./node_modules/lodash/isPlainObject.js");

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

module.exports = customOmitClone;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "./node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ "./node_modules/lodash/_flatRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_flatRest.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var flatten = __webpack_require__(/*! ./flatten */ "./node_modules/lodash/flatten.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "./node_modules/lodash/_getMatchData.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getMatchData.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/lodash/_isStrictComparable.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/lodash/_hasPath.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hasPath.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "./node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "./node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "./node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_isFlattenable.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_isStrictComparable.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash/_isStrictComparable.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/***/ (function(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ "./node_modules/lodash/_matchesStrictComparable.js":
/*!*********************************************************!*\
  !*** ./node_modules/lodash/_matchesStrictComparable.js ***!
  \*********************************************************/
/***/ (function(module) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoize = __webpack_require__(/*! ./memoize */ "./node_modules/lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/***/ (function(module) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "./node_modules/lodash/_parent.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_parent.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js"),
    baseSlice = __webpack_require__(/*! ./_baseSlice */ "./node_modules/lodash/_baseSlice.js");

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/***/ (function(module) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ "./node_modules/lodash/_setToPairs.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToPairs.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */
function setToPairs(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = [value, value];
  });
  return result;
}

module.exports = setToPairs;


/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/***/ (function(module) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "./node_modules/lodash/_strictIndexOf.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_strictIndexOf.js ***!
  \***********************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "./node_modules/lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/lodash/_trimmedEndIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_trimmedEndIndex.js ***!
  \*************************************************/
/***/ (function(module) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "./node_modules/lodash/assign.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/assign.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;


/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "./node_modules/lodash/defaults.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/defaults.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(object, sources) {
  object = Object(object);

  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : undefined;

  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }

  while (++index < length) {
    var source = sources[index];
    var props = keysIn(source);
    var propsIndex = -1;
    var propsLength = props.length;

    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];

      if (value === undefined ||
          (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        object[key] = source[key];
      }
    }
  }

  return object;
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/lodash/difference.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/difference.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseDifference = __webpack_require__(/*! ./_baseDifference */ "./node_modules/lodash/_baseDifference.js"),
    baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "./node_modules/lodash/_baseFlatten.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js");

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
});

module.exports = difference;


/***/ }),

/***/ "./node_modules/lodash/drop.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/drop.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSlice = __webpack_require__(/*! ./_baseSlice */ "./node_modules/lodash/_baseSlice.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js");

/**
 * Creates a slice of `array` with `n` elements dropped from the beginning.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.drop([1, 2, 3]);
 * // => [2, 3]
 *
 * _.drop([1, 2, 3], 2);
 * // => [3]
 *
 * _.drop([1, 2, 3], 5);
 * // => []
 *
 * _.drop([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function drop(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  return baseSlice(array, n < 0 ? 0 : n, length);
}

module.exports = drop;


/***/ }),

/***/ "./node_modules/lodash/dropRight.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/dropRight.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSlice = __webpack_require__(/*! ./_baseSlice */ "./node_modules/lodash/_baseSlice.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js");

/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropRight([1, 2, 3]);
 * // => [1, 2]
 *
 * _.dropRight([1, 2, 3], 2);
 * // => [1]
 *
 * _.dropRight([1, 2, 3], 5);
 * // => []
 *
 * _.dropRight([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, 0, n < 0 ? 0 : n);
}

module.exports = dropRight;


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/***/ (function(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/lodash/filter.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/filter.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    baseFilter = __webpack_require__(/*! ./_baseFilter */ "./node_modules/lodash/_baseFilter.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 *
 * // Combining several predicates using `_.overEvery` or `_.overSome`.
 * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
 * // => objects for ['fred', 'barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;


/***/ }),

/***/ "./node_modules/lodash/find.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/find.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var createFind = __webpack_require__(/*! ./_createFind */ "./node_modules/lodash/_createFind.js"),
    findIndex = __webpack_require__(/*! ./findIndex */ "./node_modules/lodash/findIndex.js");

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;


/***/ }),

/***/ "./node_modules/lodash/findIndex.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/findIndex.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ "./node_modules/lodash/_baseFindIndex.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;


/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/flatten.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "./node_modules/lodash/_baseFlatten.js");

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ "./node_modules/lodash/forEach.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/forEach.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js"),
    castFunction = __webpack_require__(/*! ./_castFunction */ "./node_modules/lodash/_castFunction.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ }),

/***/ "./node_modules/lodash/forOwn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/forOwn.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ "./node_modules/lodash/_baseForOwn.js"),
    castFunction = __webpack_require__(/*! ./_castFunction */ "./node_modules/lodash/_castFunction.js");

/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forOwn(object, iteratee) {
  return object && baseForOwn(object, castFunction(iteratee));
}

module.exports = forOwn;


/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ "./node_modules/lodash/hasIn.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/hasIn.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ "./node_modules/lodash/_baseHasIn.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/includes.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/includes.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isString = __webpack_require__(/*! ./isString */ "./node_modules/lodash/isString.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js"),
    values = __webpack_require__(/*! ./values */ "./node_modules/lodash/values.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;


/***/ }),

/***/ "./node_modules/lodash/initial.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/initial.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSlice = __webpack_require__(/*! ./_baseSlice */ "./node_modules/lodash/_baseSlice.js");

/**
 * Gets all but the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.initial([1, 2, 3]);
 * // => [1, 2]
 */
function initial(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 0, -1) : [];
}

module.exports = initial;


/***/ }),

/***/ "./node_modules/lodash/intersection.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/intersection.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseIntersection = __webpack_require__(/*! ./_baseIntersection */ "./node_modules/lodash/_baseIntersection.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    castArrayLikeObject = __webpack_require__(/*! ./_castArrayLikeObject */ "./node_modules/lodash/_castArrayLikeObject.js");

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
var intersection = baseRest(function(arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : [];
});

module.exports = intersection;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "./node_modules/lodash/isEmpty.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEmpty.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "./node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),

/***/ "./node_modules/lodash/isNull.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/isNull.js ***!
  \***************************************/
/***/ (function(module) {

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "./node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),

/***/ "./node_modules/lodash/isString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isString.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/isUndefined.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isUndefined.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;


/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/last.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/last.js ***!
  \*************************************/
/***/ (function(module) {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),

/***/ "./node_modules/lodash/map.js":
/*!************************************!*\
  !*** ./node_modules/lodash/map.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    baseMap = __webpack_require__(/*! ./_baseMap */ "./node_modules/lodash/_baseMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;


/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "./node_modules/lodash/omit.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/omit.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseClone = __webpack_require__(/*! ./_baseClone */ "./node_modules/lodash/_baseClone.js"),
    baseUnset = __webpack_require__(/*! ./_baseUnset */ "./node_modules/lodash/_baseUnset.js"),
    castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    customOmitClone = __webpack_require__(/*! ./_customOmitClone */ "./node_modules/lodash/_customOmitClone.js"),
    flatRest = __webpack_require__(/*! ./_flatRest */ "./node_modules/lodash/_flatRest.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/lodash/_getAllKeysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

module.exports = omit;


/***/ }),

/***/ "./node_modules/lodash/orderBy.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/orderBy.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseOrderBy = __webpack_require__(/*! ./_baseOrderBy */ "./node_modules/lodash/_baseOrderBy.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

module.exports = orderBy;


/***/ }),

/***/ "./node_modules/lodash/pick.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/pick.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var basePick = __webpack_require__(/*! ./_basePick */ "./node_modules/lodash/_basePick.js"),
    flatRest = __webpack_require__(/*! ./_flatRest */ "./node_modules/lodash/_flatRest.js");

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;


/***/ }),

/***/ "./node_modules/lodash/property.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/property.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseProperty = __webpack_require__(/*! ./_baseProperty */ "./node_modules/lodash/_baseProperty.js"),
    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ "./node_modules/lodash/_basePropertyDeep.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),

/***/ "./node_modules/lodash/some.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/some.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySome = __webpack_require__(/*! ./_arraySome */ "./node_modules/lodash/_arraySome.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    baseSome = __webpack_require__(/*! ./_baseSome */ "./node_modules/lodash/_baseSome.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, guard) {
  var func = isArray(collection) ? arraySome : baseSome;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = some;


/***/ }),

/***/ "./node_modules/lodash/sortBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/sortBy.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "./node_modules/lodash/_baseFlatten.js"),
    baseOrderBy = __webpack_require__(/*! ./_baseOrderBy */ "./node_modules/lodash/_baseOrderBy.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

module.exports = sortBy;


/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/take.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/take.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSlice = __webpack_require__(/*! ./_baseSlice */ "./node_modules/lodash/_baseSlice.js"),
    toInteger = __webpack_require__(/*! ./toInteger */ "./node_modules/lodash/toInteger.js");

/**
 * Creates a slice of `array` with `n` elements taken from the beginning.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.take([1, 2, 3]);
 * // => [1]
 *
 * _.take([1, 2, 3], 2);
 * // => [1, 2]
 *
 * _.take([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * _.take([1, 2, 3], 0);
 * // => []
 */
function take(array, n, guard) {
  if (!(array && array.length)) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  return baseSlice(array, 0, n < 0 ? 0 : n);
}

module.exports = take;


/***/ }),

/***/ "./node_modules/lodash/toFinite.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toFinite.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),

/***/ "./node_modules/lodash/toInteger.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/toInteger.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toFinite = __webpack_require__(/*! ./toFinite */ "./node_modules/lodash/toFinite.js");

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "./node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/lodash/toPairs.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/toPairs.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var createToPairs = __webpack_require__(/*! ./_createToPairs */ "./node_modules/lodash/_createToPairs.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable string keyed-value pairs for `object`
 * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
 * entries are returned.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias entries
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
var toPairs = createToPairs(keys);

module.exports = toPairs;


/***/ }),

/***/ "./node_modules/lodash/toPath.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/toPath.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/lodash/_stringToPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
}

module.exports = toPath;


/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "./node_modules/lodash/uniqueId.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/uniqueId.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;


/***/ }),

/***/ "./node_modules/lodash/values.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/values.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseValues = __webpack_require__(/*! ./_baseValues */ "./node_modules/lodash/_baseValues.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),

/***/ "./node_modules/lodash/without.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/without.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseDifference = __webpack_require__(/*! ./_baseDifference */ "./node_modules/lodash/_baseDifference.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js");

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;


/***/ }),

/***/ "./node_modules/lodash/zipObject.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/zipObject.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseZipObject = __webpack_require__(/*! ./_baseZipObject */ "./node_modules/lodash/_baseZipObject.js");

/**
 * This method is like `_.fromPairs` except that it accepts two arrays,
 * one of property identifiers and one of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 0.4.0
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.zipObject(['a', 'b'], [1, 2]);
 * // => { 'a': 1, 'b': 2 }
 */
function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue);
}

module.exports = zipObject;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/react-selectable/dist/react-selectable.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-selectable/dist/react-selectable.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom"));else { var r, n; }}(this,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=12)}([function(e,t,n){"use strict";function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(s===setTimeout)return setTimeout(e,0);if((s===r||!s)&&setTimeout)return s=setTimeout,setTimeout(e,0);try{return s(e,0)}catch(t){try{return s.call(null,e,0)}catch(t){return s.call(this,e,0)}}}function u(e){if(p===clearTimeout)return clearTimeout(e);if((p===o||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(e);try{return p(e)}catch(t){try{return p.call(null,e)}catch(t){return p.call(this,e)}}}function a(){b&&y&&(b=!1,y.length?h=y.concat(h):v=-1,h.length&&c())}function c(){if(!b){var e=i(a);b=!0;for(var t=h.length;t;){for(y=h,h=[];++v<t;)y&&y[v].run();v=-1,t=h.length}y=null,b=!1,u(e)}}function f(e,t){this.fun=e,this.array=t}function l(){}var s,p,d=e.exports={};!function(){try{s="function"==typeof setTimeout?setTimeout:r}catch(e){s=r}try{p="function"==typeof clearTimeout?clearTimeout:o}catch(e){p=o}}();var y,h=[],b=!1,v=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new f(e,t)),1!==h.length||b||i(c)},f.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,n){"use strict";function r(e){return function(){return e}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},function(e,t,n){"use strict";(function(t){function n(e,t,n,o,i,u,a,c){if(r(t),!e){var f;if(void 0===t)f=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,o,i,u,a,c],s=0;f=new Error(t.replace(/%s/g,function(){return l[s++]})),f.name="Invariant Violation"}throw f.framesToPop=1,f}}var r=function(e){};"production"!==t.env.NODE_ENV&&(r=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")}),e.exports=n}).call(t,n(0))},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){if("function"!=typeof t)throw new Error("isNodeIn second parameter must be a function");for(var n=e;n;){if(t(n))return!0;n=n.parentNode}return!1};t.default=r},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";(function(t){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};if("production"!==t.env.NODE_ENV){var o="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,i=function(e){return"object"===(void 0===e?"undefined":r(e))&&null!==e&&e.$$typeof===o};e.exports=n(14)(i,!0)}else e.exports=n(17)()}).call(t,n(0))},function(e,t,n){"use strict";(function(t){var r=n(1),o=r;if("production"!==t.env.NODE_ENV){var i=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=0,i="Warning: "+e.replace(/%s/g,function(){return n[o++]});"undefined"!=typeof console&&console.error(i);try{throw new Error(i)}catch(e){}};o=function(e,t){if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==t.indexOf("Failed Composite propType: ")&&!e){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];i.apply(void 0,[t].concat(r))}}}e.exports=o}).call(t,n(0))},function(e,t){(function(t){e.exports=t}).call(t,{})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i=function(e,t){return(0,o.default)(e,function(e){return e===t})};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.getBoundingClientRect();return{top:t.top+document.body.scrollTop,left:t.left+document.body.scrollLeft,offsetWidth:e.offsetWidth,offsetHeight:e.offsetHeight}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.nodeInRoot=t.isNodeIn=t.createSelectable=t.SelectableGroup=void 0;var o=n(13),i=r(o),u=n(22),a=r(u),c=n(4),f=r(c),l=n(10),s=r(l);t.SelectableGroup=i.default,t.createSelectable=a.default,t.isNodeIn=f.default,t.nodeInRoot=s.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(5),f=r(c),l=n(6),s=n(7),p=r(s),d=n(18),y=r(d),h=n(10),b=r(h),v=n(4),m=r(v),g=n(11),_=r(g),w=n(19),x=r(w),O=n(20),S=r(O),j=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isBoxSelecting:!1,boxWidth:0,boxHeight:0},n._mouseDownData=null,n._rect=null,n._registry=[],n._openSelector=n._openSelector.bind(n),n._mouseDown=n._mouseDown.bind(n),n._mouseUp=n._mouseUp.bind(n),n._selectElements=n._selectElements.bind(n),n._registerSelectable=n._registerSelectable.bind(n),n._unregisterSelectable=n._unregisterSelectable.bind(n),n._throttledSelect=(0,S.default)(n._selectElements,50),n}return u(t,e),a(t,[{key:"getChildContext",value:function(){return{selectable:{register:this._registerSelectable,unregister:this._unregisterSelectable}}}},{key:"componentDidMount",value:function(){this._applyMousedown(this.props.enabled),this._rect=this._getInitialCoordinates()}},{key:"componentWillUnmount",value:function(){this._applyMousedown(!1)}},{key:"componentWillReceiveProps",value:function(e){e.enabled!==this.props.enabled&&this._applyMousedown(e.enabled)}},{key:"_registerSelectable",value:function(e,t){this._registry.push({key:e,domNode:t})}},{key:"_unregisterSelectable",value:function(e){this._registry=this._registry.filter(function(t){return t.key!==e})}},{key:"_applyMousedown",value:function(e){var t=e?"addEventListener":"removeEventListener";(0,l.findDOMNode)(this)[t]("mousedown",this._mouseDown)}},{key:"_openSelector",value:function(e){var t=Math.abs(this._mouseDownData.initialW-e.pageX+this._rect.x),n=Math.abs(this._mouseDownData.initialH-e.pageY+this._rect.y);this.setState({isBoxSelecting:!0,boxWidth:t,boxHeight:n,boxLeft:Math.min(e.pageX-this._rect.x,this._mouseDownData.initialW),boxTop:Math.min(e.pageY-this._rect.y,this._mouseDownData.initialH)}),this._throttledSelect(e)}},{key:"_getInitialCoordinates",value:function(){if(this.props.fixedPosition)return{x:0,y:0};var e=window.getComputedStyle(document.body),t=e.getPropertyValue("margin-top"),n=e.getPropertyValue("margin-left"),r=parseInt(n.slice(0,n.length-2),10),o=parseInt(t.slice(0,t.length-2),10),i=document.body.getBoundingClientRect(),u=(0,l.findDOMNode)(this).getBoundingClientRect();return{x:Math.round(u.left-i.left+r),y:Math.round(u.top-i.top+o)}}},{key:"_mouseDown",value:function(e){var t=this.props,n=t.onBeginSelection,r=t.preventDefault;if(!(0,m.default)(e.target,function(e){return!!e.draggable})&&("function"!=typeof n||!1!==n(e))){var o=(0,l.findDOMNode)(this),i=void 0;window.addEventListener("mouseup",this._mouseUp),3!==e.which&&2!==e.button&&((0,b.default)(e.target,o)||(i=(0,_.default)(o),(0,x.default)({top:i.top,left:i.left,bottom:i.offsetHeight,right:i.offsetWidth},{top:e.pageY-this._rect.y,left:e.pageX-this._rect.x,offsetWidth:0,offsetHeight:0})))&&(this._rect=this._getInitialCoordinates(),this._mouseDownData={boxLeft:e.pageX-this._rect.x,boxTop:e.pageY-this._rect.y,initialW:e.pageX-this._rect.x,initialH:e.pageY-this._rect.y},r&&e.preventDefault(),window.addEventListener("mousemove",this._openSelector))}}},{key:"_mouseUp",value:function(e){var t=this.props.onNonItemClick,n=this.state.isBoxSelecting;e.stopPropagation(),window.removeEventListener("mousemove",this._openSelector),window.removeEventListener("mouseup",this._mouseUp),this._mouseDownData&&(t&&!n&&(this._registry.some(function(t){var n=t.domNode;return(0,b.default)(e.target,n)})||t(e)),this._selectElements(e,!0),this._mouseDownData=null,this.setState({isBoxSelecting:!1,boxWidth:0,boxHeight:0}))}},{key:"_selectElements",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.props,r=n.tolerance,o=n.onSelection,i=n.onEndSelection,u=[],a=(0,l.findDOMNode)(this.refs.selectbox);a&&(this._registry.forEach(function(e){e.domNode&&(0,x.default)(a,e.domNode,r)&&!u.includes(e.key)&&u.push(e.key)}),t?"function"==typeof i&&i(u,e):"function"==typeof o&&o(u,e))}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.enabled,r=e.fixedPosition,o=e.className,i=e.selectingClassName,u=this.state,a=u.isBoxSelecting,c=u.boxLeft,l=u.boxTop,s=u.boxWidth,p=u.boxHeight,d=this.props.component;if(!n)return f.default.createElement(d,{className:o},t);var h={left:c,top:l,width:s,height:p,zIndex:9e3,position:r?"fixed":"absolute",cursor:"default"},b={backgroundColor:"transparent",border:"1px dashed #999",width:"100%",height:"100%",float:"left"},v={position:"relative",overflow:"visible"};return f.default.createElement(d,{className:(0,y.default)(o,a?i:null),style:v},a?f.default.createElement("div",{style:h,ref:"selectbox"},f.default.createElement("span",{style:b})):null,t)}}]),t}(c.Component);j.propTypes={children:p.default.node,onBeginSelection:p.default.func,onEndSelection:p.default.func,onSelection:p.default.func,component:p.default.node,tolerance:p.default.number,fixedPosition:p.default.bool,preventDefault:p.default.bool,onNonItemClick:p.default.func,enabled:p.default.bool,className:p.default.string,selectingClassName:p.default.string},j.defaultProps={component:"div",tolerance:0,fixedPosition:!1,preventDefault:!0,enabled:!0},j.childContextTypes={selectable:p.default.object},t.default=j},function(e,t,n){"use strict";(function(t){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=n(1),i=n(2),u=n(8),a=n(15),c=n(3),f=n(16);e.exports=function(e,n){function l(e){var t=e&&(N&&e[N]||e[P]);if("function"==typeof t)return t}function s(e,t){return e===t?0!==e||1/e==1/t:e!==e&&t!==t}function p(e){this.message=e,this.stack=""}function d(e){function r(r,f,l,s,d,y,h){if(s=s||k,y=y||l,h!==c)if(n)i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==t.env.NODE_ENV&&"undefined"!=typeof console){var b=s+":"+l;!o[b]&&a<3&&(u(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",y,s),o[b]=!0,a++)}return null==f[l]?r?new p(null===f[l]?"The "+d+" `"+y+"` is marked as required in `"+s+"`, but its value is `null`.":"The "+d+" `"+y+"` is marked as required in `"+s+"`, but its value is `undefined`."):null:e(f,l,s,d,y)}if("production"!==t.env.NODE_ENV)var o={},a=0;var f=r.bind(null,!1);return f.isRequired=r.bind(null,!0),f}function y(e){function t(t,n,r,o,i,u){var a=t[n];if(S(a)!==e)return new p("Invalid "+o+" `"+i+"` of type `"+j(a)+"` supplied to `"+r+"`, expected `"+e+"`.");return null}return d(t)}function h(e){function t(t,n,r,o,i){if("function"!=typeof e)return new p("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=t[n];if(!Array.isArray(u)){return new p("Invalid "+o+" `"+i+"` of type `"+S(u)+"` supplied to `"+r+"`, expected an array.")}for(var a=0;a<u.length;a++){var f=e(u,a,r,o,i+"["+a+"]",c);if(f instanceof Error)return f}return null}return d(t)}function b(e){function t(t,n,r,o,i){if(!(t[n]instanceof e)){var u=e.name||k;return new p("Invalid "+o+" `"+i+"` of type `"+T(t[n])+"` supplied to `"+r+"`, expected instance of `"+u+"`.")}return null}return d(t)}function v(e){function n(t,n,r,o,i){for(var u=t[n],a=0;a<e.length;a++)if(s(u,e[a]))return null;return new p("Invalid "+o+" `"+i+"` of value `"+u+"` supplied to `"+r+"`, expected one of "+JSON.stringify(e)+".")}return Array.isArray(e)?d(n):("production"!==t.env.NODE_ENV&&u(!1,"Invalid argument supplied to oneOf, expected an instance of array."),o.thatReturnsNull)}function m(e){function t(t,n,r,o,i){if("function"!=typeof e)return new p("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var u=t[n],a=S(u);if("object"!==a)return new p("Invalid "+o+" `"+i+"` of type `"+a+"` supplied to `"+r+"`, expected an object.");for(var f in u)if(u.hasOwnProperty(f)){var l=e(u,f,r,o,i+"."+f,c);if(l instanceof Error)return l}return null}return d(t)}function g(e){function n(t,n,r,o,i){for(var u=0;u<e.length;u++){if(null==(0,e[u])(t,n,r,o,i,c))return null}return new p("Invalid "+o+" `"+i+"` supplied to `"+r+"`.")}if(!Array.isArray(e))return"production"!==t.env.NODE_ENV&&u(!1,"Invalid argument supplied to oneOfType, expected an instance of array."),o.thatReturnsNull;for(var r=0;r<e.length;r++){var i=e[r];if("function"!=typeof i)return u(!1,"Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.",E(i),r),o.thatReturnsNull}return d(n)}function _(e){function t(t,n,r,o,i){var u=t[n],a=S(u);if("object"!==a)return new p("Invalid "+o+" `"+i+"` of type `"+a+"` supplied to `"+r+"`, expected `object`.");for(var f in e){var l=e[f];if(l){var s=l(u,f,r,o,i+"."+f,c);if(s)return s}}return null}return d(t)}function w(e){function t(t,n,r,o,i){var u=t[n],f=S(u);if("object"!==f)return new p("Invalid "+o+" `"+i+"` of type `"+f+"` supplied to `"+r+"`, expected `object`.");var l=a({},t[n],e);for(var s in l){var d=e[s];if(!d)return new p("Invalid "+o+" `"+i+"` key `"+s+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(t[n],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var y=d(u,s,r,o,i+"."+s,c);if(y)return y}return null}return d(t)}function x(t){switch(void 0===t?"undefined":r(t)){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(x);if(null===t||e(t))return!0;var n=l(t);if(!n)return!1;var o,i=n.call(t);if(n!==t.entries){for(;!(o=i.next()).done;)if(!x(o.value))return!1}else for(;!(o=i.next()).done;){var u=o.value;if(u&&!x(u[1]))return!1}return!0;default:return!1}}function O(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}function S(e){var t=void 0===e?"undefined":r(e);return Array.isArray(e)?"array":e instanceof RegExp?"object":O(t,e)?"symbol":t}function j(e){if(void 0===e||null===e)return""+e;var t=S(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function E(e){var t=j(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}function T(e){return e.constructor&&e.constructor.name?e.constructor.name:k}var N="function"==typeof Symbol&&Symbol.iterator,P="@@iterator",k="<<anonymous>>",D={array:y("array"),bool:y("boolean"),func:y("function"),number:y("number"),object:y("object"),string:y("string"),symbol:y("symbol"),any:function(){return d(o.thatReturnsNull)}(),arrayOf:h,element:function(){function t(t,n,r,o,i){var u=t[n];if(!e(u)){return new p("Invalid "+o+" `"+i+"` of type `"+S(u)+"` supplied to `"+r+"`, expected a single ReactElement.")}return null}return d(t)}(),instanceOf:b,node:function(){function e(e,t,n,r,o){return x(e[t])?null:new p("Invalid "+r+" `"+o+"` supplied to `"+n+"`, expected a ReactNode.")}return d(e)}(),objectOf:m,oneOf:v,oneOfType:g,shape:_,exact:w};return p.prototype=Error.prototype,D.checkPropTypes=f,D.PropTypes=D,D}}).call(t,n(0))},function(e,t,n){"use strict";function r(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,a,c=r(e),f=1;f<arguments.length;f++){n=Object(arguments[f]);for(var l in n)i.call(n,l)&&(c[l]=n[l]);if(o){a=o(n);for(var s=0;s<a.length;s++)u.call(n,a[s])&&(c[a[s]]=n[a[s]])}}return c}},function(e,t,n){"use strict";(function(t){function r(e,n,r,f,l){if("production"!==t.env.NODE_ENV)for(var s in e)if(e.hasOwnProperty(s)){var p;try{i("function"==typeof e[s],"%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.",f||"React class",r,s,o(e[s])),p=e[s](n,s,f,r,null,a)}catch(e){p=e}if(u(!p||p instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",f||"React class",r,s,void 0===p?"undefined":o(p)),p instanceof Error&&!(p.message in c)){c[p.message]=!0;var d=l?l():"";u(!1,"Failed %s type: %s%s",r,p.message,null!=d?d:"")}}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};if("production"!==t.env.NODE_ENV)var i=n(2),u=n(8),a=n(3),c={};e.exports=r}).call(t,n(0))},function(e,t,n){"use strict";var r=n(1),o=n(2),i=n(3);e.exports=function(){function e(e,t,n,r,u,a){a!==i&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=r,n.PropTypes=n,n}},function(e,t,n){"use strict";var r,o,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){function u(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=void 0===n?"undefined":i(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var o=u.apply(null,n);o&&e.push(o)}else if("object"===r)for(var c in n)a.call(n,c)&&n[c]&&e.push(c)}}return e.join(" ")}var a={}.hasOwnProperty;void 0!==e&&e.exports?(u.default=u,e.exports=u):"object"===i(n(9))&&n(9)?(r=[],void 0!==(o=function(){return u}.apply(t,r))&&(e.exports=o)):window.classNames=u}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(11),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i=function(e,t,n,r,o,i,u,a,c){return!(e+i-c<n||e+c>n+a||t+o-c<r||t+c>r+u)};t.default=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=e instanceof HTMLElement?(0,o.default)(e):e,u=t instanceof HTMLElement?(0,o.default)(t):t;return i(r.top,r.left,u.top,u.left,r.offsetWidth,r.offsetHeight,u.offsetWidth,u.offsetHeight,n)}},function(e,t,n){"use strict";(function(t){function n(e,t,n){function r(t){var n=h,r=b;return h=b=void 0,w=t,m=e.apply(r,n)}function i(e){return w=e,g=setTimeout(l,t),j?r(e):m}function u(e){var n=e-_,r=e-w,o=t-n;return E?O(o,v-r):o}function c(e){var n=e-_,r=e-w;return void 0===_||n>=t||n<0||E&&r>=v}function l(){var e=S();if(c(e))return s(e);g=setTimeout(l,u(e))}function s(e){return g=void 0,T&&h?r(e):(h=b=void 0,m)}function p(){void 0!==g&&clearTimeout(g),w=0,h=_=b=g=void 0}function d(){return void 0===g?m:s(S())}function y(){var e=S(),n=c(e);if(h=arguments,b=this,_=e,n){if(void 0===g)return i(_);if(E)return g=setTimeout(l,t),r(_)}return void 0===g&&(g=setTimeout(l,t)),m}var h,b,v,m,g,_,w=0,j=!1,E=!1,T=!0;if("function"!=typeof e)throw new TypeError(f);return t=a(t)||0,o(n)&&(j=!!n.leading,E="maxWait"in n,v=E?x(a(n.maxWait)||0,t):v,T="trailing"in n?!!n.trailing:T),y.cancel=p,y.flush=d,y}function r(e,t,r){var i=!0,u=!0;if("function"!=typeof e)throw new TypeError(f);return o(r)&&(i="leading"in r?!!r.leading:i,u="trailing"in r?!!r.trailing:u),n(e,t,{leading:i,maxWait:t,trailing:u})}function o(e){var t=void 0===e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==(void 0===e?"undefined":c(e))}function u(e){return"symbol"==(void 0===e?"undefined":c(e))||i(e)&&w.call(e)==s}function a(e){if("number"==typeof e)return e;if(u(e))return l;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(p,"");var n=y.test(e);return n||h.test(e)?b(e.slice(2),n?2:8):d.test(e)?l:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f="Expected a function",l=NaN,s="[object Symbol]",p=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,y=/^0b[01]+$/i,h=/^0o[0-7]+$/i,b=parseInt,v="object"==(void 0===t?"undefined":c(t))&&t&&t.Object===Object&&t,m="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,g=v||m||Function("return this")(),_=Object.prototype,w=_.toString,x=Math.max,O=Math.min,S=function(){return g.Date.now()};e.exports=r}).call(t,n(21))},function(e,t,n){"use strict";var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":o(window))&&(r=window)}e.exports=r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(5),f=r(c),l=n(6),s=n(7),p=r(s),d=function(e){var t=function(t){function n(){return o(this,n),i(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return u(n,t),a(n,[{key:"componentDidMount",value:function(){this.context.selectable.register(this.props.selectableKey,(0,l.findDOMNode)(this))}},{key:"componentWillUnmount",value:function(){this.context.selectable.unregister(this.props.selectableKey)}},{key:"render",value:function(){return f.default.createElement("div",{id:"selectableItem-"+this.props.selectableKey},f.default.createElement(e,this.props,this.props.children))}}]),n}(f.default.Component);return t.contextTypes={selectable:p.default.object},t.propTypes={children:p.default.node,selectableKey:p.default.any.isRequired},t};t.default=d}])});

/***/ }),

/***/ "./node_modules/redux-form/lib/structure/plain/getIn.js":
/*!**************************************************************!*\
  !*** ./node_modules/redux-form/lib/structure/plain/getIn.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports["default"] = void 0;

var _toPath2 = _interopRequireDefault(__webpack_require__(/*! lodash/toPath */ "./node_modules/lodash/toPath.js"));

var getIn = function getIn(state, field) {
  if (!state) {
    return state;
  }

  var path = (0, _toPath2["default"])(field);
  var length = path.length;

  if (!length) {
    return undefined;
  }

  var result = state;

  for (var i = 0; i < length && result; ++i) {
    result = result[path[i]];
  }

  return result;
};

var _default = getIn;
exports["default"] = _default;

/***/ }),

/***/ "@apollo/client/react/hoc":
/*!***************************************!*\
  !*** external "ApolloClientReactHoc" ***!
  \***************************************/
/***/ (function(module) {

"use strict";
module.exports = ApolloClientReactHoc;

/***/ }),

/***/ "components/Button/BackButton":
/*!*****************************!*\
  !*** external "BackButton" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = BackButton;

/***/ }),

/***/ "lib/Backend":
/*!**************************!*\
  !*** external "Backend" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = Backend;

/***/ }),

/***/ "components/Badge/Badge":
/*!************************!*\
  !*** external "Badge" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = Badge;

/***/ }),

/***/ "components/Breadcrumb/Breadcrumb":
/*!*****************************!*\
  !*** external "Breadcrumb" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = Breadcrumb;

/***/ }),

/***/ "components/Button/Button":
/*!*************************!*\
  !*** external "Button" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = Button;

/***/ }),

/***/ "lib/DataFormat":
/*!*****************************!*\
  !*** external "DataFormat" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = DataFormat;

/***/ }),

/***/ "containers/InsertLinkModal/fileSchemaModalHandler":
/*!*****************************************!*\
  !*** external "FileSchemaModalHandler" ***!
  \*****************************************/
/***/ (function(module) {

"use strict";
module.exports = FileSchemaModalHandler;

/***/ }),

/***/ "components/FileStatusIcon/FileStatusIcon":
/*!*********************************!*\
  !*** external "FileStatusIcon" ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = FileStatusIcon;

/***/ }),

/***/ "components/FormAlert/FormAlert":
/*!****************************!*\
  !*** external "FormAlert" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = FormAlert;

/***/ }),

/***/ "containers/FormBuilderLoader/FormBuilderLoader":
/*!************************************!*\
  !*** external "FormBuilderLoader" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = FormBuilderLoader;

/***/ }),

/***/ "components/FormBuilderModal/FormBuilderModal":
/*!***********************************!*\
  !*** external "FormBuilderModal" ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = FormBuilderModal;

/***/ }),

/***/ "graphql-tag":
/*!*****************************!*\
  !*** external "GraphQLTag" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = GraphQLTag;

/***/ }),

/***/ "lib/Injector":
/*!***************************!*\
  !*** external "Injector" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = Injector;

/***/ }),

/***/ "url":
/*!**************************!*\
  !*** external "NodeUrl" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = NodeUrl;

/***/ }),

/***/ "prop-types":
/*!****************************!*\
  !*** external "PropTypes" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = PropTypes;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = React;

/***/ }),

/***/ "react-dnd":
/*!***************************!*\
  !*** external "ReactDND" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = ReactDND;

/***/ }),

/***/ "react-dnd-html5-backend":
/*!***************************************!*\
  !*** external "ReactDNDHtml5Backend" ***!
  \***************************************/
/***/ (function(module) {

"use strict";
module.exports = ReactDNDHtml5Backend;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDom" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = ReactDom;

/***/ }),

/***/ "react-dom/client":
/*!*********************************!*\
  !*** external "ReactDomClient" ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = ReactDomClient;

/***/ }),

/***/ "react-redux":
/*!*****************************!*\
  !*** external "ReactRedux" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = ReactRedux;

/***/ }),

/***/ "react-router-dom":
/*!*********************************!*\
  !*** external "ReactRouterDom" ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = ReactRouterDom;

/***/ }),

/***/ "reactstrap":
/*!*****************************!*\
  !*** external "Reactstrap" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = Reactstrap;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "Redux" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = Redux;

/***/ }),

/***/ "state/schema/SchemaActions":
/*!********************************!*\
  !*** external "SchemaActions" ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = SchemaActions;

/***/ }),

/***/ "components/Search/Search":
/*!*************************!*\
  !*** external "Search" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = Search;

/***/ }),

/***/ "components/Search/SearchToggle":
/*!*******************************!*\
  !*** external "SearchToggle" ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = SearchToggle;

/***/ }),

/***/ "lib/ShortcodeSerialiser":
/*!**************************************!*\
  !*** external "ShortcodeSerialiser" ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = ShortcodeSerialiser;

/***/ }),

/***/ "state/toasts/ToastsActions":
/*!********************************!*\
  !*** external "ToastsActions" ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = ToastsActions;

/***/ }),

/***/ "components/Toolbar/Toolbar":
/*!**************************!*\
  !*** external "Toolbar" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = Toolbar;

/***/ }),

/***/ "state/unsavedForms/UnsavedFormsActions":
/*!**************************************!*\
  !*** external "UnsavedFormsActions" ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = UnsavedFormsActions;

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = classnames;

/***/ }),

/***/ "i18n":
/*!***********************!*\
  !*** external "i18n" ***!
  \***********************/
/***/ (function(module) {

"use strict";
module.exports = i18n;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jQuery;

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/***/ (function(module) {

"use strict";
module.exports = qs;

/***/ }),

/***/ "lib/urls":
/*!***************************!*\
  !*** external "ssUrlLib" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = ssUrlLib;

/***/ }),

/***/ "lib/withDragDropContext":
/*!**************************************!*\
  !*** external "withDragDropContext" ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = withDragDropContext;

/***/ }),

/***/ "lib/withRouter":
/*!*****************************!*\
  !*** external "withRouter" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = withRouter;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ (function(module) {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/dropzone/dist/dropzone.mjs":
/*!*************************************************!*\
  !*** ./node_modules/dropzone/dist/dropzone.mjs ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dropzone: function() { return /* binding */ $3ed269f2f0fb224b$export$2e2bcd8739ae039; },
/* harmony export */   "default": function() { return /* binding */ $3ed269f2f0fb224b$export$2e2bcd8739ae039; }
/* harmony export */ });
/* harmony import */ var just_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-extend */ "./node_modules/just-extend/index.esm.js");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

class $4040acfd8584338d$export$2e2bcd8739ae039 {
    // Add an event listener for given event
    on(event, fn) {
        this._callbacks = this._callbacks || {
        };
        // Create namespace for this event
        if (!this._callbacks[event]) this._callbacks[event] = [];
        this._callbacks[event].push(fn);
        return this;
    }
    emit(event, ...args) {
        this._callbacks = this._callbacks || {
        };
        let callbacks = this._callbacks[event];
        if (callbacks) for (let callback of callbacks)callback.apply(this, args);
        // trigger a corresponding DOM event
        if (this.element) this.element.dispatchEvent(this.makeEvent("dropzone:" + event, {
            args: args
        }));
        return this;
    }
    makeEvent(eventName, detail) {
        let params = {
            bubbles: true,
            cancelable: true,
            detail: detail
        };
        if (typeof window.CustomEvent === "function") return new CustomEvent(eventName, params);
        else {
            // IE 11 support
            // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
    }
    // Remove event listener for given event. If fn is not provided, all event
    // listeners for that event will be removed. If neither is provided, all
    // event listeners will be removed.
    off(event, fn) {
        if (!this._callbacks || arguments.length === 0) {
            this._callbacks = {
            };
            return this;
        }
        // specific event
        let callbacks = this._callbacks[event];
        if (!callbacks) return this;
        // remove all handlers
        if (arguments.length === 1) {
            delete this._callbacks[event];
            return this;
        }
        // remove specific handler
        for(let i = 0; i < callbacks.length; i++){
            let callback = callbacks[i];
            if (callback === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    }
}



var $fd6031f88dce2e32$exports = {};
$fd6031f88dce2e32$exports = "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail=\"\"></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size=\"\"></span></div>\n    <div class=\"dz-filename\"><span data-dz-name=\"\"></span></div>\n  </div>\n  <div class=\"dz-progress\">\n    <span class=\"dz-upload\" data-dz-uploadprogress=\"\"></span>\n  </div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage=\"\"></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z\"></path>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z\"></path>\n    </svg>\n  </div>\n</div>\n";


let $4ca367182776f80b$var$defaultOptions = {
    /**
   * Has to be specified on elements other than form (or when the form doesn't
   * have an `action` attribute).
   *
   * You can also provide a function that will be called with `files` and
   * `dataBlocks`  and must return the url as string.
   */ url: null,
    /**
   * Can be changed to `"put"` if necessary. You can also provide a function
   * that will be called with `files` and must return the method (since `v3.12.0`).
   */ method: "post",
    /**
   * Will be set on the XHRequest.
   */ withCredentials: false,
    /**
   * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
   * If set to null or 0, no timeout is going to be set.
   */ timeout: null,
    /**
   * How many file uploads to process in parallel (See the
   * Enqueuing file uploads documentation section for more info)
   */ parallelUploads: 2,
    /**
   * Whether to send multiple files in one request. If
   * this it set to true, then the fallback file input element will
   * have the `multiple` attribute as well. This option will
   * also trigger additional events (like `processingmultiple`). See the events
   * documentation section for more information.
   */ uploadMultiple: false,
    /**
   * Whether you want files to be uploaded in chunks to your server. This can't be
   * used in combination with `uploadMultiple`.
   *
   * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
   */ chunking: false,
    /**
   * If `chunking` is enabled, this defines whether **every** file should be chunked,
   * even if the file size is below chunkSize. This means, that the additional chunk
   * form data will be submitted and the `chunksUploaded` callback will be invoked.
   */ forceChunking: false,
    /**
   * If `chunking` is `true`, then this defines the chunk size in bytes.
   */ chunkSize: 2097152,
    /**
   * If `true`, the individual chunks of a file are being uploaded simultaneously.
   */ parallelChunkUploads: false,
    /**
   * Whether a chunk should be retried if it fails.
   */ retryChunks: false,
    /**
   * If `retryChunks` is true, how many times should it be retried.
   */ retryChunksLimit: 3,
    /**
   * The maximum filesize (in MiB) that is allowed to be uploaded.
   */ maxFilesize: 256,
    /**
   * The name of the file param that gets transferred.
   * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
   * Dropzone will append `[]` to the name.
   */ paramName: "file",
    /**
   * Whether thumbnails for images should be generated
   */ createImageThumbnails: true,
    /**
   * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
   */ maxThumbnailFilesize: 10,
    /**
   * If `null`, the ratio of the image will be used to calculate it.
   */ thumbnailWidth: 120,
    /**
   * The same as `thumbnailWidth`. If both are null, images will not be resized.
   */ thumbnailHeight: 120,
    /**
   * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
   * Can be either `contain` or `crop`.
   */ thumbnailMethod: "crop",
    /**
   * If set, images will be resized to these dimensions before being **uploaded**.
   * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
   * ratio of the file will be preserved.
   *
   * The `options.transformFile` function uses these options, so if the `transformFile` function
   * is overridden, these options don't do anything.
   */ resizeWidth: null,
    /**
   * See `resizeWidth`.
   */ resizeHeight: null,
    /**
   * The mime type of the resized image (before it gets uploaded to the server).
   * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
   * See `resizeWidth` for more information.
   */ resizeMimeType: null,
    /**
   * The quality of the resized images. See `resizeWidth`.
   */ resizeQuality: 0.8,
    /**
   * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
   * Can be either `contain` or `crop`.
   */ resizeMethod: "contain",
    /**
   * The base that is used to calculate the **displayed** filesize. You can
   * change this to 1024 if you would rather display kibibytes, mebibytes,
   * etc... 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte`
   * not `1 kilobyte`. You can change this to `1024` if you don't care about
   * validity.
   */ filesizeBase: 1000,
    /**
   * If not `null` defines how many files this Dropzone handles. If it exceeds,
   * the event `maxfilesexceeded` will be called. The dropzone element gets the
   * class `dz-max-files-reached` accordingly so you can provide visual
   * feedback.
   */ maxFiles: null,
    /**
   * An optional object to send additional headers to the server. Eg:
   * `{ "My-Awesome-Header": "header value" }`
   */ headers: null,
    /**
   * Should the default headers be set or not?
   * Accept: application/json <- for requesting json response
   * Cache-Control: no-cache <- Request shouldnt be cached
   * X-Requested-With: XMLHttpRequest <- We sent the request via XMLHttpRequest
   */ defaultHeaders: true,
    /**
   * If `true`, the dropzone element itself will be clickable, if `false`
   * nothing will be clickable.
   *
   * You can also pass an HTML element, a CSS selector (for multiple elements)
   * or an array of those. In that case, all of those elements will trigger an
   * upload when clicked.
   */ clickable: true,
    /**
   * Whether hidden files in directories should be ignored.
   */ ignoreHiddenFiles: true,
    /**
   * The default implementation of `accept` checks the file's mime type or
   * extension against this list. This is a comma separated list of mime
   * types or file extensions.
   *
   * Eg.: `image/*,application/pdf,.psd`
   *
   * If the Dropzone is `clickable` this option will also be used as
   * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
   * parameter on the hidden file input as well.
   */ acceptedFiles: null,
    /**
   * **Deprecated!**
   * Use acceptedFiles instead.
   */ acceptedMimeTypes: null,
    /**
   * If false, files will be added to the queue but the queue will not be
   * processed automatically.
   * This can be useful if you need some additional user input before sending
   * files (or if you want want all files sent at once).
   * If you're ready to send the file simply call `myDropzone.processQueue()`.
   *
   * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
   * section for more information.
   */ autoProcessQueue: true,
    /**
   * If false, files added to the dropzone will not be queued by default.
   * You'll have to call `enqueueFile(file)` manually.
   */ autoQueue: true,
    /**
   * If `true`, this will add a link to every file preview to remove or cancel (if
   * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
   * and `dictRemoveFile` options are used for the wording.
   */ addRemoveLinks: false,
    /**
   * Defines where to display the file previews – if `null` the
   * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
   * selector. The element should have the `dropzone-previews` class so
   * the previews are displayed properly.
   */ previewsContainer: null,
    /**
   * Set this to `true` if you don't want previews to be shown.
   */ disablePreviews: false,
    /**
   * This is the element the hidden input field (which is used when clicking on the
   * dropzone to trigger file selection) will be appended to. This might
   * be important in case you use frameworks to switch the content of your page.
   *
   * Can be a selector string, or an element directly.
   */ hiddenInputContainer: "body",
    /**
   * If null, no capture type will be specified
   * If camera, mobile devices will skip the file selection and choose camera
   * If microphone, mobile devices will skip the file selection and choose the microphone
   * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
   * On apple devices multiple must be set to false.  AcceptedFiles may need to
   * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
   */ capture: null,
    /**
   * **Deprecated**. Use `renameFile` instead.
   */ renameFilename: null,
    /**
   * A function that is invoked before the file is uploaded to the server and renames the file.
   * This function gets the `File` as argument and can use the `file.name`. The actual name of the
   * file that gets used during the upload can be accessed through `file.upload.filename`.
   */ renameFile: null,
    /**
   * If `true` the fallback will be forced. This is very useful to test your server
   * implementations first and make sure that everything works as
   * expected without dropzone if you experience problems, and to test
   * how your fallbacks will look.
   */ forceFallback: false,
    /**
   * The text used before any files are dropped.
   */ dictDefaultMessage: "Drop files here to upload",
    /**
   * The text that replaces the default message text it the browser is not supported.
   */ dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
    /**
   * The text that will be added before the fallback form.
   * If you provide a  fallback element yourself, or if this option is `null` this will
   * be ignored.
   */ dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
    /**
   * If the filesize is too big.
   * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
   */ dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
    /**
   * If the file doesn't match the file type.
   */ dictInvalidFileType: "You can't upload files of this type.",
    /**
   * If the server response was invalid.
   * `{{statusCode}}` will be replaced with the servers status code.
   */ dictResponseError: "Server responded with {{statusCode}} code.",
    /**
   * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
   */ dictCancelUpload: "Cancel upload",
    /**
   * The text that is displayed if an upload was manually canceled
   */ dictUploadCanceled: "Upload canceled.",
    /**
   * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
   */ dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
    /**
   * If `addRemoveLinks` is true, the text to be used to remove a file.
   */ dictRemoveFile: "Remove file",
    /**
   * If this is not null, then the user will be prompted before removing a file.
   */ dictRemoveFileConfirmation: null,
    /**
   * Displayed if `maxFiles` is st and exceeded.
   * The string `{{maxFiles}}` will be replaced by the configuration value.
   */ dictMaxFilesExceeded: "You can not upload any more files.",
    /**
   * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
   * `b` for bytes.
   */ dictFileSizeUnits: {
        tb: "TB",
        gb: "GB",
        mb: "MB",
        kb: "KB",
        b: "b"
    },
    /**
   * Called when dropzone initialized
   * You can add event listeners here
   */ init () {
    },
    /**
   * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
   * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
   * of a function, this needs to return a map.
   *
   * The default implementation does nothing for normal uploads, but adds relevant information for
   * chunked uploads.
   *
   * This is the same as adding hidden input fields in the form element.
   */ params (files, xhr, chunk) {
        if (chunk) return {
            dzuuid: chunk.file.upload.uuid,
            dzchunkindex: chunk.index,
            dztotalfilesize: chunk.file.size,
            dzchunksize: this.options.chunkSize,
            dztotalchunkcount: chunk.file.upload.totalChunkCount,
            dzchunkbyteoffset: chunk.index * this.options.chunkSize
        };
    },
    /**
   * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
   * and a `done` function as parameters.
   *
   * If the done function is invoked without arguments, the file is "accepted" and will
   * be processed. If you pass an error message, the file is rejected, and the error
   * message will be displayed.
   * This function will not be called if the file is too big or doesn't match the mime types.
   */ accept (file, done) {
        return done();
    },
    /**
   * The callback that will be invoked when all chunks have been uploaded for a file.
   * It gets the file for which the chunks have been uploaded as the first parameter,
   * and the `done` function as second. `done()` needs to be invoked when everything
   * needed to finish the upload process is done.
   */ chunksUploaded: function(file, done) {
        done();
    },
    /**
   * Sends the file as binary blob in body instead of form data.
   * If this is set, the `params` option will be ignored.
   * It's an error to set this to `true` along with `uploadMultiple` since
   * multiple files cannot be in a single binary body.
   */ binaryBody: false,
    /**
   * Gets called when the browser is not supported.
   * The default implementation shows the fallback input field and adds
   * a text.
   */ fallback () {
        // This code should pass in IE7... :(
        let messageElement;
        this.element.className = `${this.element.className} dz-browser-not-supported`;
        for (let child of this.element.getElementsByTagName("div"))if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message"; // Removes the 'dz-default' class
            break;
        }
        if (!messageElement) {
            messageElement = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement('<div class="dz-message"><span></span></div>');
            this.element.appendChild(messageElement);
        }
        let span = messageElement.getElementsByTagName("span")[0];
        if (span) {
            if (span.textContent != null) span.textContent = this.options.dictFallbackMessage;
            else if (span.innerText != null) span.innerText = this.options.dictFallbackMessage;
        }
        return this.element.appendChild(this.getFallbackForm());
    },
    /**
   * Gets called to calculate the thumbnail dimensions.
   *
   * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
   *
   *  - `srcWidth` & `srcHeight` (required)
   *  - `trgWidth` & `trgHeight` (required)
   *  - `srcX` & `srcY` (optional, default `0`)
   *  - `trgX` & `trgY` (optional, default `0`)
   *
   * Those values are going to be used by `ctx.drawImage()`.
   */ resize (file, width, height, resizeMethod) {
        let info = {
            srcX: 0,
            srcY: 0,
            srcWidth: file.width,
            srcHeight: file.height
        };
        let srcRatio = file.width / file.height;
        // Automatically calculate dimensions if not specified
        if (width == null && height == null) {
            width = info.srcWidth;
            height = info.srcHeight;
        } else if (width == null) width = height * srcRatio;
        else if (height == null) height = width / srcRatio;
        // Make sure images aren't upscaled
        width = Math.min(width, info.srcWidth);
        height = Math.min(height, info.srcHeight);
        let trgRatio = width / height;
        if (info.srcWidth > width || info.srcHeight > height) {
            // Image is bigger and needs rescaling
            if (resizeMethod === "crop") {
                if (srcRatio > trgRatio) {
                    info.srcHeight = file.height;
                    info.srcWidth = info.srcHeight * trgRatio;
                } else {
                    info.srcWidth = file.width;
                    info.srcHeight = info.srcWidth / trgRatio;
                }
            } else if (resizeMethod === "contain") {
                // Method 'contain'
                if (srcRatio > trgRatio) height = width / srcRatio;
                else width = height * srcRatio;
            } else throw new Error(`Unknown resizeMethod '${resizeMethod}'`);
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        info.trgWidth = width;
        info.trgHeight = height;
        return info;
    },
    /**
   * Can be used to transform the file (for example, resize an image if necessary).
   *
   * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
   * images according to those dimensions.
   *
   * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
   * to be invoked with the file when the transformation is done.
   */ transformFile (file, done) {
        if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
        else return done(file);
    },
    /**
   * A string that contains the template used for each dropped
   * file. Change it to fulfill your needs but make sure to properly
   * provide all elements.
   *
   * If you want to use an actual HTML element instead of providing a String
   * as a config option, you could create a div with the id `tpl`,
   * put the template inside it and provide the element like this:
   *
   *     document
   *       .querySelector('#tpl')
   *       .innerHTML
   *
   */ previewTemplate: (/*@__PURE__*/$parcel$interopDefault($fd6031f88dce2e32$exports)),
    /*
   Those functions register themselves to the events on init and handle all
   the user interface specific stuff. Overwriting them won't break the upload
   but can break the way it's displayed.
   You can overwrite them if you don't like the default behavior. If you just
   want to add an additional event handler, register it on the dropzone object
   and don't overwrite those options.
   */ // Those are self explanatory and simply concern the DragnDrop.
    drop (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragstart (e) {
    },
    dragend (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragenter (e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragover (e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragleave (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    paste (e) {
    },
    // Called whenever there are no files left in the dropzone anymore, and the
    // dropzone should be displayed as if in the initial state.
    reset () {
        return this.element.classList.remove("dz-started");
    },
    // Called when a file is added to the queue
    // Receives `file`
    addedfile (file) {
        if (this.element === this.previewsContainer) this.element.classList.add("dz-started");
        if (this.previewsContainer && !this.options.disablePreviews) {
            file.previewElement = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(this.options.previewTemplate.trim());
            file.previewTemplate = file.previewElement; // Backwards compatibility
            this.previewsContainer.appendChild(file.previewElement);
            for (var node of file.previewElement.querySelectorAll("[data-dz-name]"))node.textContent = file.name;
            for (node of file.previewElement.querySelectorAll("[data-dz-size]"))node.innerHTML = this.filesize(file.size);
            if (this.options.addRemoveLinks) {
                file._removeLink = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<a class="dz-remove" href="javascript:undefined;" data-dz-remove>${this.options.dictRemoveFile}</a>`);
                file.previewElement.appendChild(file._removeLink);
            }
            let removeFileEvent = (e)=>{
                e.preventDefault();
                e.stopPropagation();
                if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm(this.options.dictCancelUploadConfirmation, ()=>this.removeFile(file)
                );
                else {
                    if (this.options.dictRemoveFileConfirmation) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm(this.options.dictRemoveFileConfirmation, ()=>this.removeFile(file)
                    );
                    else return this.removeFile(file);
                }
            };
            for (let removeLink of file.previewElement.querySelectorAll("[data-dz-remove]"))removeLink.addEventListener("click", removeFileEvent);
        }
    },
    // Called whenever a file is removed.
    removedfile (file) {
        if (file.previewElement != null && file.previewElement.parentNode != null) file.previewElement.parentNode.removeChild(file.previewElement);
        return this._updateMaxFilesReachedClass();
    },
    // Called when a thumbnail has been generated
    // Receives `file` and `dataUrl`
    thumbnail (file, dataUrl) {
        if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            for (let thumbnailElement of file.previewElement.querySelectorAll("[data-dz-thumbnail]")){
                thumbnailElement.alt = file.name;
                thumbnailElement.src = dataUrl;
            }
            return setTimeout(()=>file.previewElement.classList.add("dz-image-preview")
            , 1);
        }
    },
    // Called whenever an error occurs
    // Receives `file` and `message`
    error (file, message) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-error");
            if (typeof message !== "string" && message.error) message = message.error;
            for (let node of file.previewElement.querySelectorAll("[data-dz-errormessage]"))node.textContent = message;
        }
    },
    errormultiple () {
    },
    // Called when a file gets processed. Since there is a cue, not all added
    // files are processed immediately.
    // Receives `file`
    processing (file) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-processing");
            if (file._removeLink) return file._removeLink.innerHTML = this.options.dictCancelUpload;
        }
    },
    processingmultiple () {
    },
    // Called whenever the upload progress gets updated.
    // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
    // To get the total number of bytes of the file, use `file.size`
    uploadprogress (file, progress, bytesSent) {
        if (file.previewElement) for (let node of file.previewElement.querySelectorAll("[data-dz-uploadprogress]"))node.nodeName === "PROGRESS" ? node.value = progress : node.style.width = `${progress}%`;
    },
    // Called whenever the total upload progress gets updated.
    // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
    totaluploadprogress () {
    },
    // Called just before the file is sent. Gets the `xhr` object as second
    // parameter, so you can modify it (for example to add a CSRF token) and a
    // `formData` object to add additional information.
    sending () {
    },
    sendingmultiple () {
    },
    // When the complete upload is finished and successful
    // Receives `file`
    success (file) {
        if (file.previewElement) return file.previewElement.classList.add("dz-success");
    },
    successmultiple () {
    },
    // When the upload is canceled.
    canceled (file) {
        return this.emit("error", file, this.options.dictUploadCanceled);
    },
    canceledmultiple () {
    },
    // When the upload is finished, either with success or an error.
    // Receives `file`
    complete (file) {
        if (file._removeLink) file._removeLink.innerHTML = this.options.dictRemoveFile;
        if (file.previewElement) return file.previewElement.classList.add("dz-complete");
    },
    completemultiple () {
    },
    maxfilesexceeded () {
    },
    maxfilesreached () {
    },
    queuecomplete () {
    },
    addedfiles () {
    }
};
var $4ca367182776f80b$export$2e2bcd8739ae039 = $4ca367182776f80b$var$defaultOptions;


class $3ed269f2f0fb224b$export$2e2bcd8739ae039 extends $4040acfd8584338d$export$2e2bcd8739ae039 {
    static initClass() {
        // Exposing the emitter class, mainly for tests
        this.prototype.Emitter = $4040acfd8584338d$export$2e2bcd8739ae039;
        /*
     This is a list of all available events you can register on a dropzone object.

     You can register an event handler like this:

     dropzone.on("dragEnter", function() { });

     */ this.prototype.events = [
            "drop",
            "dragstart",
            "dragend",
            "dragenter",
            "dragover",
            "dragleave",
            "addedfile",
            "addedfiles",
            "removedfile",
            "thumbnail",
            "error",
            "errormultiple",
            "processing",
            "processingmultiple",
            "uploadprogress",
            "totaluploadprogress",
            "sending",
            "sendingmultiple",
            "success",
            "successmultiple",
            "canceled",
            "canceledmultiple",
            "complete",
            "completemultiple",
            "reset",
            "maxfilesexceeded",
            "maxfilesreached",
            "queuecomplete", 
        ];
        this.prototype._thumbnailQueue = [];
        this.prototype._processingThumbnail = false;
    }
    // Returns all files that have been accepted
    getAcceptedFiles() {
        return this.files.filter((file)=>file.accepted
        ).map((file)=>file
        );
    }
    // Returns all files that have been rejected
    // Not sure when that's going to be useful, but added for completeness.
    getRejectedFiles() {
        return this.files.filter((file)=>!file.accepted
        ).map((file)=>file
        );
    }
    getFilesWithStatus(status) {
        return this.files.filter((file)=>file.status === status
        ).map((file)=>file
        );
    }
    // Returns all files that are in the queue
    getQueuedFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED);
    }
    getUploadingFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING);
    }
    getAddedFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED);
    }
    // Files that are either queued or uploading
    getActiveFiles() {
        return this.files.filter((file)=>file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED
        ).map((file)=>file
        );
    }
    // The function that gets called when Dropzone is initialized. You
    // can (and should) setup event listeners inside this function.
    init() {
        // In case it isn't set already
        if (this.element.tagName === "form") this.element.setAttribute("enctype", "multipart/form-data");
        if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) this.element.appendChild($3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<div class="dz-default dz-message"><button class="dz-button" type="button">${this.options.dictDefaultMessage}</button></div>`));
        if (this.clickableElements.length) {
            let setupHiddenFileInput = ()=>{
                if (this.hiddenFileInput) this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                this.hiddenFileInput = document.createElement("input");
                this.hiddenFileInput.setAttribute("type", "file");
                if (this.options.maxFiles === null || this.options.maxFiles > 1) this.hiddenFileInput.setAttribute("multiple", "multiple");
                this.hiddenFileInput.className = "dz-hidden-input";
                if (this.options.acceptedFiles !== null) this.hiddenFileInput.setAttribute("accept", this.options.acceptedFiles);
                if (this.options.capture !== null) this.hiddenFileInput.setAttribute("capture", this.options.capture);
                // Making sure that no one can "tab" into this field.
                this.hiddenFileInput.setAttribute("tabindex", "-1");
                // Not setting `display="none"` because some browsers don't accept clicks
                // on elements that aren't displayed.
                this.hiddenFileInput.style.visibility = "hidden";
                this.hiddenFileInput.style.position = "absolute";
                this.hiddenFileInput.style.top = "0";
                this.hiddenFileInput.style.left = "0";
                this.hiddenFileInput.style.height = "0";
                this.hiddenFileInput.style.width = "0";
                $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.hiddenInputContainer, "hiddenInputContainer").appendChild(this.hiddenFileInput);
                this.hiddenFileInput.addEventListener("change", ()=>{
                    let { files: files  } = this.hiddenFileInput;
                    if (files.length) for (let file of files)this.addFile(file);
                    this.emit("addedfiles", files);
                    setupHiddenFileInput();
                });
            };
            setupHiddenFileInput();
        }
        this.URL = window.URL !== null ? window.URL : window.webkitURL;
        // Setup all event listeners on the Dropzone object itself.
        // They're not in @setupEventListeners() because they shouldn't be removed
        // again when the dropzone gets disabled.
        for (let eventName of this.events)this.on(eventName, this.options[eventName]);
        this.on("uploadprogress", ()=>this.updateTotalUploadProgress()
        );
        this.on("removedfile", ()=>this.updateTotalUploadProgress()
        );
        this.on("canceled", (file)=>this.emit("complete", file)
        );
        // Emit a `queuecomplete` event if all files finished uploading.
        this.on("complete", (file)=>{
            if (this.getAddedFiles().length === 0 && this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) // This needs to be deferred so that `queuecomplete` really triggers after `complete`
            return setTimeout(()=>this.emit("queuecomplete")
            , 0);
        });
        const containsFiles = function(e) {
            if (e.dataTransfer.types) // Because e.dataTransfer.types is an Object in
            // IE, we need to iterate like this instead of
            // using e.dataTransfer.types.some()
            for(var i = 0; i < e.dataTransfer.types.length; i++){
                if (e.dataTransfer.types[i] === "Files") return true;
            }
            return false;
        };
        let noPropagation = function(e) {
            // If there are no files, we don't want to stop
            // propagation so we don't interfere with other
            // drag and drop behaviour.
            if (!containsFiles(e)) return;
            e.stopPropagation();
            if (e.preventDefault) return e.preventDefault();
            else return e.returnValue = false;
        };
        // Create the listeners
        this.listeners = [
            {
                element: this.element,
                events: {
                    dragstart: (e)=>{
                        return this.emit("dragstart", e);
                    },
                    dragenter: (e)=>{
                        noPropagation(e);
                        return this.emit("dragenter", e);
                    },
                    dragover: (e)=>{
                        // Makes it possible to drag files from chrome's download bar
                        // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
                        // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
                        let efct;
                        try {
                            efct = e.dataTransfer.effectAllowed;
                        } catch (error) {
                        }
                        e.dataTransfer.dropEffect = "move" === efct || "linkMove" === efct ? "move" : "copy";
                        noPropagation(e);
                        return this.emit("dragover", e);
                    },
                    dragleave: (e)=>{
                        return this.emit("dragleave", e);
                    },
                    drop: (e)=>{
                        noPropagation(e);
                        return this.drop(e);
                    },
                    dragend: (e)=>{
                        return this.emit("dragend", e);
                    }
                }
            }, 
        ];
        this.clickableElements.forEach((clickableElement)=>{
            return this.listeners.push({
                element: clickableElement,
                events: {
                    click: (evt)=>{
                        // Only the actual dropzone or the message element should trigger file selection
                        if (clickableElement !== this.element || evt.target === this.element || $3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside(evt.target, this.element.querySelector(".dz-message"))) this.hiddenFileInput.click(); // Forward the click
                        return true;
                    }
                }
            });
        });
        this.enable();
        return this.options.init.call(this);
    }
    // Not fully tested yet
    destroy() {
        this.disable();
        this.removeAllFiles(true);
        if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
            this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
            this.hiddenFileInput = null;
        }
        delete this.element.dropzone;
        return $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.splice($3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.indexOf(this), 1);
    }
    updateTotalUploadProgress() {
        let totalUploadProgress;
        let totalBytesSent = 0;
        let totalBytes = 0;
        let activeFiles = this.getActiveFiles();
        if (activeFiles.length) {
            for (let file of this.getActiveFiles()){
                totalBytesSent += file.upload.bytesSent;
                totalBytes += file.upload.total;
            }
            totalUploadProgress = 100 * totalBytesSent / totalBytes;
        } else totalUploadProgress = 100;
        return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    }
    // @options.paramName can be a function taking one parameter rather than a string.
    // A parameter name for a file is obtained simply by calling this with an index number.
    _getParamName(n) {
        if (typeof this.options.paramName === "function") return this.options.paramName(n);
        else return `${this.options.paramName}${this.options.uploadMultiple ? `[${n}]` : ""}`;
    }
    // If @options.renameFile is a function,
    // the function will be used to rename the file.name before appending it to the formData
    _renameFile(file) {
        if (typeof this.options.renameFile !== "function") return file.name;
        return this.options.renameFile(file);
    }
    // Returns a form that can be used as fallback if the browser does not support DragnDrop
    //
    // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
    // This code has to pass in IE7 :(
    getFallbackForm() {
        let existingFallback, form;
        if (existingFallback = this.getExistingFallback()) return existingFallback;
        let fieldsString = '<div class="dz-fallback">';
        if (this.options.dictFallbackText) fieldsString += `<p>${this.options.dictFallbackText}</p>`;
        fieldsString += `<input type="file" name="${this._getParamName(0)}" ${this.options.uploadMultiple ? 'multiple="multiple"' : undefined} /><input type="submit" value="Upload!"></div>`;
        let fields = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(fieldsString);
        if (this.element.tagName !== "FORM") {
            form = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<form action="${this.options.url}" enctype="multipart/form-data" method="${this.options.method}"></form>`);
            form.appendChild(fields);
        } else {
            // Make sure that the enctype and method attributes are set properly
            this.element.setAttribute("enctype", "multipart/form-data");
            this.element.setAttribute("method", this.options.method);
        }
        return form != null ? form : fields;
    }
    // Returns the fallback elements if they exist already
    //
    // This code has to pass in IE7 :(
    getExistingFallback() {
        let getFallback = function(elements) {
            for (let el of elements){
                if (/(^| )fallback($| )/.test(el.className)) return el;
            }
        };
        for (let tagName of [
            "div",
            "form"
        ]){
            var fallback;
            if (fallback = getFallback(this.element.getElementsByTagName(tagName))) return fallback;
        }
    }
    // Activates all listeners stored in @listeners
    setupEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.addEventListener(event, listener, false));
                }
                return result;
            })()
        );
    }
    // Deactivates all listeners stored in @listeners
    removeEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.removeEventListener(event, listener, false));
                }
                return result;
            })()
        );
    }
    // Removes all event listeners and cancels all files in the queue or being processed.
    disable() {
        this.clickableElements.forEach((element)=>element.classList.remove("dz-clickable")
        );
        this.removeEventListeners();
        this.disabled = true;
        return this.files.map((file)=>this.cancelUpload(file)
        );
    }
    enable() {
        delete this.disabled;
        this.clickableElements.forEach((element)=>element.classList.add("dz-clickable")
        );
        return this.setupEventListeners();
    }
    // Returns a nicely formatted filesize
    filesize(size) {
        let selectedSize = 0;
        let selectedUnit = "b";
        if (size > 0) {
            let units = [
                "tb",
                "gb",
                "mb",
                "kb",
                "b"
            ];
            for(let i = 0; i < units.length; i++){
                let unit = units[i];
                let cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
                if (size >= cutoff) {
                    selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
                    selectedUnit = unit;
                    break;
                }
            }
            selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
        }
        return `<strong>${selectedSize}</strong> ${this.options.dictFileSizeUnits[selectedUnit]}`;
    }
    // Adds or removes the `dz-max-files-reached` class from the form.
    _updateMaxFilesReachedClass() {
        if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
            if (this.getAcceptedFiles().length === this.options.maxFiles) this.emit("maxfilesreached", this.files);
            return this.element.classList.add("dz-max-files-reached");
        } else return this.element.classList.remove("dz-max-files-reached");
    }
    drop(e) {
        if (!e.dataTransfer) return;
        this.emit("drop", e);
        // Convert the FileList to an Array
        // This is necessary for IE11
        let files = [];
        for(let i = 0; i < e.dataTransfer.files.length; i++)files[i] = e.dataTransfer.files[i];
        // Even if it's a folder, files.length will contain the folders.
        if (files.length) {
            let { items: items  } = e.dataTransfer;
            if (items && items.length && items[0].webkitGetAsEntry != null) // The browser supports dropping of folders, so handle items instead of files
            this._addFilesFromItems(items);
            else this.handleFiles(files);
        }
        this.emit("addedfiles", files);
    }
    paste(e) {
        if ($3ed269f2f0fb224b$var$__guard__(e != null ? e.clipboardData : undefined, (x)=>x.items
        ) == null) return;
        this.emit("paste", e);
        let { items: items  } = e.clipboardData;
        if (items.length) return this._addFilesFromItems(items);
    }
    handleFiles(files) {
        for (let file of files)this.addFile(file);
    }
    // When a folder is dropped (or files are pasted), items must be handled
    // instead of files.
    _addFilesFromItems(items) {
        return (()=>{
            let result = [];
            for (let item of items){
                var entry;
                if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
                    if (entry.isFile) result.push(this.addFile(item.getAsFile()));
                    else if (entry.isDirectory) // Append all files from that directory to files
                    result.push(this._addFilesFromDirectory(entry, entry.name));
                    else result.push(undefined);
                } else if (item.getAsFile != null) {
                    if (item.kind == null || item.kind === "file") result.push(this.addFile(item.getAsFile()));
                    else result.push(undefined);
                } else result.push(undefined);
            }
            return result;
        })();
    }
    // Goes through the directory, and adds each file it finds recursively
    _addFilesFromDirectory(directory, path) {
        let dirReader = directory.createReader();
        let errorHandler = (error)=>$3ed269f2f0fb224b$var$__guardMethod__(console, "log", (o)=>o.log(error)
            )
        ;
        var readEntries = ()=>{
            return dirReader.readEntries((entries)=>{
                if (entries.length > 0) {
                    for (let entry of entries){
                        if (entry.isFile) entry.file((file)=>{
                            if (this.options.ignoreHiddenFiles && file.name.substring(0, 1) === ".") return;
                            file.fullPath = `${path}/${file.name}`;
                            return this.addFile(file);
                        });
                        else if (entry.isDirectory) this._addFilesFromDirectory(entry, `${path}/${entry.name}`);
                    }
                    // Recursively call readEntries() again, since browser only handle
                    // the first 100 entries.
                    // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
                    readEntries();
                }
                return null;
            }, errorHandler);
        };
        return readEntries();
    }
    // If `done()` is called without argument the file is accepted
    // If you call it with an error message, the file is rejected
    // (This allows for asynchronous validation)
    //
    // This function checks the filesize, and if the file.type passes the
    // `acceptedFiles` check.
    accept(file, done) {
        if (this.options.maxFilesize && file.size > this.options.maxFilesize * 1048576) done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
        else if (!$3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile(file, this.options.acceptedFiles)) done(this.options.dictInvalidFileType);
        else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
            done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
            this.emit("maxfilesexceeded", file);
        } else this.options.accept.call(this, file, done);
    }
    addFile(file) {
        file.upload = {
            uuid: $3ed269f2f0fb224b$export$2e2bcd8739ae039.uuidv4(),
            progress: 0,
            // Setting the total upload size to file.size for the beginning
            // It's actual different than the size to be transmitted.
            total: file.size,
            bytesSent: 0,
            filename: this._renameFile(file)
        };
        this.files.push(file);
        file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED;
        this.emit("addedfile", file);
        this._enqueueThumbnail(file);
        this.accept(file, (error)=>{
            if (error) {
                file.accepted = false;
                this._errorProcessing([
                    file
                ], error); // Will set the file.status
            } else {
                file.accepted = true;
                if (this.options.autoQueue) this.enqueueFile(file);
                 // Will set .accepted = true
            }
            this._updateMaxFilesReachedClass();
        });
    }
    // Wrapper for enqueueFile
    enqueueFiles(files) {
        for (let file of files)this.enqueueFile(file);
        return null;
    }
    enqueueFile(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED && file.accepted === true) {
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
            if (this.options.autoProcessQueue) return setTimeout(()=>this.processQueue()
            , 0); // Deferring the call
        } else throw new Error("This file can't be queued because it has already been processed or was rejected.");
    }
    _enqueueThumbnail(file) {
        if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1048576) {
            this._thumbnailQueue.push(file);
            return setTimeout(()=>this._processThumbnailQueue()
            , 0); // Deferring the call
        }
    }
    _processThumbnailQueue() {
        if (this._processingThumbnail || this._thumbnailQueue.length === 0) return;
        this._processingThumbnail = true;
        let file = this._thumbnailQueue.shift();
        return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, (dataUrl)=>{
            this.emit("thumbnail", file, dataUrl);
            this._processingThumbnail = false;
            return this._processThumbnailQueue();
        });
    }
    // Can be called by the user to remove a file
    removeFile(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) this.cancelUpload(file);
        this.files = $3ed269f2f0fb224b$var$without(this.files, file);
        this.emit("removedfile", file);
        if (this.files.length === 0) return this.emit("reset");
    }
    // Removes all files that aren't currently processed from the list
    removeAllFiles(cancelIfNecessary) {
        // Create a copy of files since removeFile() changes the @files array.
        if (cancelIfNecessary == null) cancelIfNecessary = false;
        for (let file of this.files.slice())if (file.status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || cancelIfNecessary) this.removeFile(file);
        return null;
    }
    // Resizes an image before it gets sent to the server. This function is the default behavior of
    // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
    // the resized blob.
    resizeImage(file, width, height, resizeMethod, callback) {
        return this.createThumbnail(file, width, height, resizeMethod, true, (dataUrl, canvas)=>{
            if (canvas == null) // The image has not been resized
            return callback(file);
            else {
                let { resizeMimeType: resizeMimeType  } = this.options;
                if (resizeMimeType == null) resizeMimeType = file.type;
                let resizedDataURL = canvas.toDataURL(resizeMimeType, this.options.resizeQuality);
                if (resizeMimeType === "image/jpeg" || resizeMimeType === "image/jpg") // Now add the original EXIF information
                resizedDataURL = $3ed269f2f0fb224b$var$ExifRestore.restore(file.dataURL, resizedDataURL);
                return callback($3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob(resizedDataURL));
            }
        });
    }
    createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
        let fileReader = new FileReader();
        fileReader.onload = ()=>{
            file.dataURL = fileReader.result;
            // Don't bother creating a thumbnail for SVG images since they're vector
            if (file.type === "image/svg+xml") {
                if (callback != null) callback(fileReader.result);
                return;
            }
            this.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
        };
        fileReader.readAsDataURL(file);
    }
    // `mockFile` needs to have these attributes:
    //
    //     { name: 'name', size: 12345, imageUrl: '' }
    //
    // `callback` will be invoked when the image has been downloaded and displayed.
    // `crossOrigin` will be added to the `img` tag when accessing the file.
    displayExistingFile(mockFile, imageUrl, callback, crossOrigin, resizeThumbnail = true) {
        this.emit("addedfile", mockFile);
        this.emit("complete", mockFile);
        if (!resizeThumbnail) {
            this.emit("thumbnail", mockFile, imageUrl);
            if (callback) callback();
        } else {
            let onDone = (thumbnail)=>{
                this.emit("thumbnail", mockFile, thumbnail);
                if (callback) callback();
            };
            mockFile.dataURL = imageUrl;
            this.createThumbnailFromUrl(mockFile, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, this.options.fixOrientation, onDone, crossOrigin);
        }
    }
    createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
        // Not using `new Image` here because of a bug in latest Chrome versions.
        // See https://github.com/enyo/dropzone/pull/226
        let img = document.createElement("img");
        if (crossOrigin) img.crossOrigin = crossOrigin;
        // fixOrientation is not needed anymore with browsers handling imageOrientation
        fixOrientation = getComputedStyle(document.body)["imageOrientation"] == "from-image" ? false : fixOrientation;
        img.onload = ()=>{
            let loadExif = (callback)=>callback(1)
            ;
            if (typeof EXIF !== "undefined" && EXIF !== null && fixOrientation) loadExif = (callback)=>EXIF.getData(img, function() {
                    return callback(EXIF.getTag(this, "Orientation"));
                })
            ;
            return loadExif((orientation)=>{
                file.width = img.width;
                file.height = img.height;
                let resizeInfo = this.options.resize.call(this, file, width, height, resizeMethod);
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = resizeInfo.trgWidth;
                canvas.height = resizeInfo.trgHeight;
                if (orientation > 4) {
                    canvas.width = resizeInfo.trgHeight;
                    canvas.height = resizeInfo.trgWidth;
                }
                switch(orientation){
                    case 2:
                        // horizontal flip
                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1);
                        break;
                    case 3:
                        // 180° rotate left
                        ctx.translate(canvas.width, canvas.height);
                        ctx.rotate(Math.PI);
                        break;
                    case 4:
                        // vertical flip
                        ctx.translate(0, canvas.height);
                        ctx.scale(1, -1);
                        break;
                    case 5:
                        // vertical flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);
                        break;
                    case 6:
                        // 90° rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -canvas.width);
                        break;
                    case 7:
                        // horizontal flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(canvas.height, -canvas.width);
                        ctx.scale(-1, 1);
                        break;
                    case 8:
                        // 90° rotate left
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-canvas.height, 0);
                        break;
                }
                // This is a bugfix for iOS' scaling bug.
                $3ed269f2f0fb224b$var$drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
                let thumbnail = canvas.toDataURL("image/png");
                if (callback != null) return callback(thumbnail, canvas);
            });
        };
        if (callback != null) img.onerror = callback;
        return img.src = file.dataURL;
    }
    // Goes through the queue and processes files if there aren't too many already.
    processQueue() {
        let { parallelUploads: parallelUploads  } = this.options;
        let processingLength = this.getUploadingFiles().length;
        let i = processingLength;
        // There are already at least as many files uploading than should be
        if (processingLength >= parallelUploads) return;
        let queuedFiles = this.getQueuedFiles();
        if (!(queuedFiles.length > 0)) return;
        if (this.options.uploadMultiple) // The files should be uploaded in one request
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
        else while(i < parallelUploads){
            if (!queuedFiles.length) return;
             // Nothing left to process
            this.processFile(queuedFiles.shift());
            i++;
        }
    }
    // Wrapper for `processFiles`
    processFile(file) {
        return this.processFiles([
            file
        ]);
    }
    // Loads the file, then calls finishedLoading()
    processFiles(files) {
        for (let file of files){
            file.processing = true; // Backwards compatibility
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING;
            this.emit("processing", file);
        }
        if (this.options.uploadMultiple) this.emit("processingmultiple", files);
        return this.uploadFiles(files);
    }
    _getFilesWithXhr(xhr) {
        let files;
        return files = this.files.filter((file)=>file.xhr === xhr
        ).map((file)=>file
        );
    }
    // Cancels the file upload and sets the status to CANCELED
    // **if** the file is actually being uploaded.
    // If it's still in the queue, the file is being removed from it and the status
    // set to CANCELED.
    cancelUpload(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) {
            let groupedFiles = this._getFilesWithXhr(file.xhr);
            for (let groupedFile of groupedFiles)groupedFile.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
            if (typeof file.xhr !== "undefined") file.xhr.abort();
            for (let groupedFile1 of groupedFiles)this.emit("canceled", groupedFile1);
            if (this.options.uploadMultiple) this.emit("canceledmultiple", groupedFiles);
        } else if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED) {
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
            this.emit("canceled", file);
            if (this.options.uploadMultiple) this.emit("canceledmultiple", [
                file
            ]);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    resolveOption(option, ...args) {
        if (typeof option === "function") return option.apply(this, args);
        return option;
    }
    uploadFile(file) {
        return this.uploadFiles([
            file
        ]);
    }
    uploadFiles(files) {
        this._transformFiles(files, (transformedFiles)=>{
            if (this.options.chunking) {
                // Chunking is not allowed to be used with `uploadMultiple` so we know
                // that there is only __one__file.
                let transformedFile = transformedFiles[0];
                files[0].upload.chunked = this.options.chunking && (this.options.forceChunking || transformedFile.size > this.options.chunkSize);
                files[0].upload.totalChunkCount = Math.ceil(transformedFile.size / this.options.chunkSize);
            }
            if (files[0].upload.chunked) {
                // This file should be sent in chunks!
                // If the chunking option is set, we **know** that there can only be **one** file, since
                // uploadMultiple is not allowed with this option.
                let file = files[0];
                let transformedFile = transformedFiles[0];
                let startedChunkCount = 0;
                file.upload.chunks = [];
                let handleNextChunk = ()=>{
                    let chunkIndex = 0;
                    // Find the next item in file.upload.chunks that is not defined yet.
                    while(file.upload.chunks[chunkIndex] !== undefined)chunkIndex++;
                    // This means, that all chunks have already been started.
                    if (chunkIndex >= file.upload.totalChunkCount) return;
                    startedChunkCount++;
                    let start = chunkIndex * this.options.chunkSize;
                    let end = Math.min(start + this.options.chunkSize, transformedFile.size);
                    let dataBlock = {
                        name: this._getParamName(0),
                        data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
                        filename: file.upload.filename,
                        chunkIndex: chunkIndex
                    };
                    file.upload.chunks[chunkIndex] = {
                        file: file,
                        index: chunkIndex,
                        dataBlock: dataBlock,
                        status: $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING,
                        progress: 0,
                        retries: 0
                    };
                    this._uploadData(files, [
                        dataBlock
                    ]);
                };
                file.upload.finishedChunkUpload = (chunk, response)=>{
                    let allFinished = true;
                    chunk.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
                    // Clear the data from the chunk
                    chunk.dataBlock = null;
                    chunk.response = chunk.xhr.responseText;
                    chunk.responseHeaders = chunk.xhr.getAllResponseHeaders();
                    // Leaving this reference to xhr will cause memory leaks.
                    chunk.xhr = null;
                    for(let i = 0; i < file.upload.totalChunkCount; i++){
                        if (file.upload.chunks[i] === undefined) return handleNextChunk();
                        if (file.upload.chunks[i].status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS) allFinished = false;
                    }
                    if (allFinished) this.options.chunksUploaded(file, ()=>{
                        this._finished(files, response, null);
                    });
                };
                if (this.options.parallelChunkUploads) for(let i = 0; i < file.upload.totalChunkCount; i++)handleNextChunk();
                else handleNextChunk();
            } else {
                let dataBlocks = [];
                for(let i = 0; i < files.length; i++)dataBlocks[i] = {
                    name: this._getParamName(i),
                    data: transformedFiles[i],
                    filename: files[i].upload.filename
                };
                this._uploadData(files, dataBlocks);
            }
        });
    }
    /// Returns the right chunk for given file and xhr
    _getChunk(file, xhr) {
        for(let i = 0; i < file.upload.totalChunkCount; i++){
            if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) return file.upload.chunks[i];
        }
    }
    // This function actually uploads the file(s) to the server.
    //
    //  If dataBlocks contains the actual data to upload (meaning, that this could
    // either be transformed files, or individual chunks for chunked upload) then
    // they will be used for the actual data to upload.
    _uploadData(files, dataBlocks) {
        let xhr = new XMLHttpRequest();
        // Put the xhr object in the file objects to be able to reference it later.
        for (let file of files)file.xhr = xhr;
        if (files[0].upload.chunked) // Put the xhr object in the right chunk object, so it can be associated
        // later, and found with _getChunk.
        files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
        let method = this.resolveOption(this.options.method, files, dataBlocks);
        let url = this.resolveOption(this.options.url, files, dataBlocks);
        xhr.open(method, url, true);
        // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
        let timeout = this.resolveOption(this.options.timeout, files);
        if (timeout) xhr.timeout = this.resolveOption(this.options.timeout, files);
        // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
        xhr.withCredentials = !!this.options.withCredentials;
        xhr.onload = (e)=>{
            this._finishedUploading(files, xhr, e);
        };
        xhr.ontimeout = ()=>{
            this._handleUploadError(files, xhr, `Request timedout after ${this.options.timeout / 1000} seconds`);
        };
        xhr.onerror = ()=>{
            this._handleUploadError(files, xhr);
        };
        // Some browsers do not have the .upload property
        let progressObj = xhr.upload != null ? xhr.upload : xhr;
        progressObj.onprogress = (e)=>this._updateFilesUploadProgress(files, xhr, e)
        ;
        let headers = this.options.defaultHeaders ? {
            Accept: "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        } : {
        };
        if (this.options.binaryBody) headers["Content-Type"] = files[0].type;
        if (this.options.headers) (0,just_extend__WEBPACK_IMPORTED_MODULE_0__["default"])(headers, this.options.headers);
        for(let headerName in headers){
            let headerValue = headers[headerName];
            if (headerValue) xhr.setRequestHeader(headerName, headerValue);
        }
        if (this.options.binaryBody) {
            // Since the file is going to be sent as binary body, it doesn't make
            // any sense to generate `FormData` for it.
            for (let file of files)this.emit("sending", file, xhr);
            if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr);
            this.submitRequest(xhr, null, files);
        } else {
            let formData = new FormData();
            // Adding all @options parameters
            if (this.options.params) {
                let additionalParams = this.options.params;
                if (typeof additionalParams === "function") additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
                for(let key in additionalParams){
                    let value = additionalParams[key];
                    if (Array.isArray(value)) // The additional parameter contains an array,
                    // so lets iterate over it to attach each value
                    // individually.
                    for(let i = 0; i < value.length; i++)formData.append(key, value[i]);
                    else formData.append(key, value);
                }
            }
            // Let the user add additional data if necessary
            for (let file of files)this.emit("sending", file, xhr, formData);
            if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr, formData);
            this._addFormElementData(formData);
            // Finally add the files
            // Has to be last because some servers (eg: S3) expect the file to be the last parameter
            for(let i = 0; i < dataBlocks.length; i++){
                let dataBlock = dataBlocks[i];
                formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
            }
            this.submitRequest(xhr, formData, files);
        }
    }
    // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
    _transformFiles(files, done) {
        let transformedFiles = [];
        // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
        let doneCounter = 0;
        for(let i = 0; i < files.length; i++)this.options.transformFile.call(this, files[i], (transformedFile)=>{
            transformedFiles[i] = transformedFile;
            if (++doneCounter === files.length) done(transformedFiles);
        });
    }
    // Takes care of adding other input elements of the form to the AJAX request
    _addFormElementData(formData) {
        // Take care of other input elements
        if (this.element.tagName === "FORM") for (let input of this.element.querySelectorAll("input, textarea, select, button")){
            let inputName = input.getAttribute("name");
            let inputType = input.getAttribute("type");
            if (inputType) inputType = inputType.toLowerCase();
            // If the input doesn't have a name, we can't use it.
            if (typeof inputName === "undefined" || inputName === null) continue;
            if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
                // Possibly multiple values
                for (let option of input.options)if (option.selected) formData.append(inputName, option.value);
            } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) formData.append(inputName, input.value);
        }
    }
    // Invoked when there is new progress information about given files.
    // If e is not provided, it is assumed that the upload is finished.
    _updateFilesUploadProgress(files, xhr, e) {
        if (!files[0].upload.chunked) // Handle file uploads without chunking
        for (let file of files){
            if (file.upload.total && file.upload.bytesSent && file.upload.bytesSent == file.upload.total) continue;
            if (e) {
                file.upload.progress = 100 * e.loaded / e.total;
                file.upload.total = e.total;
                file.upload.bytesSent = e.loaded;
            } else {
                // No event, so we're at 100%
                file.upload.progress = 100;
                file.upload.bytesSent = file.upload.total;
            }
            this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
        }
        else {
            // Handle chunked file uploads
            // Chunked upload is not compatible with uploading multiple files in one
            // request, so we know there's only one file.
            let file = files[0];
            // Since this is a chunked upload, we need to update the appropriate chunk
            // progress.
            let chunk = this._getChunk(file, xhr);
            if (e) {
                chunk.progress = 100 * e.loaded / e.total;
                chunk.total = e.total;
                chunk.bytesSent = e.loaded;
            } else {
                // No event, so we're at 100%
                chunk.progress = 100;
                chunk.bytesSent = chunk.total;
            }
            // Now tally the *file* upload progress from its individual chunks
            file.upload.progress = 0;
            file.upload.total = 0;
            file.upload.bytesSent = 0;
            for(let i = 0; i < file.upload.totalChunkCount; i++)if (file.upload.chunks[i] && typeof file.upload.chunks[i].progress !== "undefined") {
                file.upload.progress += file.upload.chunks[i].progress;
                file.upload.total += file.upload.chunks[i].total;
                file.upload.bytesSent += file.upload.chunks[i].bytesSent;
            }
            // Since the process is a percentage, we need to divide by the amount of
            // chunks we've used.
            file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
            this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
        }
    }
    _finishedUploading(files, xhr, e) {
        let response;
        if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
        if (xhr.readyState !== 4) return;
        if (xhr.responseType !== "arraybuffer" && xhr.responseType !== "blob") {
            response = xhr.responseText;
            if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) try {
                response = JSON.parse(response);
            } catch (error) {
                e = error;
                response = "Invalid JSON response from server.";
            }
        }
        this._updateFilesUploadProgress(files, xhr);
        if (!(200 <= xhr.status && xhr.status < 300)) this._handleUploadError(files, xhr, response);
        else if (files[0].upload.chunked) files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr), response);
        else this._finished(files, response, e);
    }
    _handleUploadError(files, xhr, response) {
        if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
        if (files[0].upload.chunked && this.options.retryChunks) {
            let chunk = this._getChunk(files[0], xhr);
            if ((chunk.retries++) < this.options.retryChunksLimit) {
                this._uploadData(files, [
                    chunk.dataBlock
                ]);
                return;
            } else console.warn("Retried this chunk too often. Giving up.");
        }
        this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
    }
    submitRequest(xhr, formData, files) {
        if (xhr.readyState != 1) {
            console.warn("Cannot send this request because the XMLHttpRequest.readyState is not OPENED.");
            return;
        }
        if (this.options.binaryBody) {
            if (files[0].upload.chunked) {
                const chunk = this._getChunk(files[0], xhr);
                xhr.send(chunk.dataBlock.data);
            } else xhr.send(files[0]);
        } else xhr.send(formData);
    }
    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.
    _finished(files, responseText, e) {
        for (let file of files){
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
            this.emit("success", file, responseText, e);
            this.emit("complete", file);
        }
        if (this.options.uploadMultiple) {
            this.emit("successmultiple", files, responseText, e);
            this.emit("completemultiple", files);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.
    _errorProcessing(files, message, xhr) {
        for (let file of files){
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR;
            this.emit("error", file, message, xhr);
            this.emit("complete", file);
        }
        if (this.options.uploadMultiple) {
            this.emit("errormultiple", files, message, xhr);
            this.emit("completemultiple", files);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    static uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
            return v.toString(16);
        });
    }
    constructor(el, options){
        super();
        let fallback, left;
        this.element = el;
        this.clickableElements = [];
        this.listeners = [];
        this.files = []; // All files
        if (typeof this.element === "string") this.element = document.querySelector(this.element);
        // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
        if (!this.element || this.element.nodeType == null) throw new Error("Invalid dropzone element.");
        if (this.element.dropzone) throw new Error("Dropzone already attached.");
        // Now add this dropzone to the instances.
        $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.push(this);
        // Put the dropzone inside the element itself.
        this.element.dropzone = this;
        let elementOptions = (left = $3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(this.element)) != null ? left : {
        };
        this.options = (0,just_extend__WEBPACK_IMPORTED_MODULE_0__["default"])(true, {
        }, $4ca367182776f80b$export$2e2bcd8739ae039, elementOptions, options != null ? options : {
        });
        this.options.previewTemplate = this.options.previewTemplate.replace(/\n*/g, "");
        // If the browser failed, just call the fallback and leave
        if (this.options.forceFallback || !$3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported()) return this.options.fallback.call(this);
        // @options.url = @element.getAttribute "action" unless @options.url?
        if (this.options.url == null) this.options.url = this.element.getAttribute("action");
        if (!this.options.url) throw new Error("No URL provided.");
        if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
        if (this.options.uploadMultiple && this.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
        if (this.options.binaryBody && this.options.uploadMultiple) throw new Error("You cannot set both: binaryBody and uploadMultiple.");
        // Backwards compatibility
        if (this.options.acceptedMimeTypes) {
            this.options.acceptedFiles = this.options.acceptedMimeTypes;
            delete this.options.acceptedMimeTypes;
        }
        // Backwards compatibility
        if (this.options.renameFilename != null) this.options.renameFile = (file)=>this.options.renameFilename.call(this, file.name, file)
        ;
        if (typeof this.options.method === "string") this.options.method = this.options.method.toUpperCase();
        if ((fallback = this.getExistingFallback()) && fallback.parentNode) // Remove the fallback
        fallback.parentNode.removeChild(fallback);
        // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
        if (this.options.previewsContainer !== false) {
            if (this.options.previewsContainer) this.previewsContainer = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.previewsContainer, "previewsContainer");
            else this.previewsContainer = this.element;
        }
        if (this.options.clickable) {
            if (this.options.clickable === true) this.clickableElements = [
                this.element
            ];
            else this.clickableElements = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements(this.options.clickable, "clickable");
        }
        this.init();
    }
}
$3ed269f2f0fb224b$export$2e2bcd8739ae039.initClass();
// This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elemens.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
$3ed269f2f0fb224b$export$2e2bcd8739ae039.options = {
};
// Returns the options for an element or undefined if none available.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement = function(element) {
    // Get the `Dropzone.options.elementId` for this element if it exists
    if (element.getAttribute("id")) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.options[$3ed269f2f0fb224b$var$camelize(element.getAttribute("id"))];
    else return undefined;
};
// Holds a list of all dropzone instances
$3ed269f2f0fb224b$export$2e2bcd8739ae039.instances = [];
// Returns the dropzone for given element if any
$3ed269f2f0fb224b$export$2e2bcd8739ae039.forElement = function(element) {
    if (typeof element === "string") element = document.querySelector(element);
    if ((element != null ? element.dropzone : undefined) == null) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    return element.dropzone;
};
// Looks for all .dropzone elements and creates a dropzone for them
$3ed269f2f0fb224b$export$2e2bcd8739ae039.discover = function() {
    let dropzones;
    if (document.querySelectorAll) dropzones = document.querySelectorAll(".dropzone");
    else {
        dropzones = [];
        // IE :(
        let checkElements = (elements)=>(()=>{
                let result = [];
                for (let el of elements)if (/(^| )dropzone($| )/.test(el.className)) result.push(dropzones.push(el));
                else result.push(undefined);
                return result;
            })()
        ;
        checkElements(document.getElementsByTagName("div"));
        checkElements(document.getElementsByTagName("form"));
    }
    return (()=>{
        let result = [];
        for (let dropzone of dropzones)// Create a dropzone unless auto discover has been disabled for specific element
        if ($3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(dropzone) !== false) result.push(new $3ed269f2f0fb224b$export$2e2bcd8739ae039(dropzone));
        else result.push(undefined);
        return result;
    })();
};
// Some browsers support drag and drog functionality, but not correctly.
//
// So I created a blocklist of userAgents. Yes, yes. Browser sniffing, I know.
// But what to do when browsers *theoretically* support an API, but crash
// when using it.
//
// This is a list of regular expressions tested against navigator.userAgent
//
// ** It should only be used on browser that *do* support the API, but
// incorrectly **
$3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers = [
    // The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
    /opera.*(Macintosh|Windows Phone).*version\/12/i, 
];
// Checks if the browser is supported
$3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported = function() {
    let capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
        if (!("classList" in document.createElement("a"))) capableBrowser = false;
        else {
            if ($3ed269f2f0fb224b$export$2e2bcd8739ae039.blacklistedBrowsers !== undefined) // Since this has been renamed, this makes sure we don't break older
            // configuration.
            $3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers = $3ed269f2f0fb224b$export$2e2bcd8739ae039.blacklistedBrowsers;
            // The browser supports the API, but may be blocked.
            for (let regex of $3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers)if (regex.test(navigator.userAgent)) {
                capableBrowser = false;
                continue;
            }
        }
    } else capableBrowser = false;
    return capableBrowser;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob = function(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(",")[1]);
    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for(let i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--)ia[i] = byteString.charCodeAt(i);
    // write the ArrayBuffer to a blob
    return new Blob([
        ab
    ], {
        type: mimeString
    });
};
// Returns an array without the rejected item
const $3ed269f2f0fb224b$var$without = (list, rejectedItem)=>list.filter((item)=>item !== rejectedItem
    ).map((item)=>item
    )
;
// abc-def_ghi -> abcDefGhi
const $3ed269f2f0fb224b$var$camelize = (str)=>str.replace(/[\-_](\w)/g, (match)=>match.charAt(1).toUpperCase()
    )
;
// Creates an element from string
$3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement = function(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
};
// Tests if given element is inside (or simply is) the container
$3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside = function(element, container) {
    if (element === container) return true;
     // Coffeescript doesn't support do/while loops
    while(element = element.parentNode){
        if (element === container) return true;
    }
    return false;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement = function(el, name) {
    let element;
    if (typeof el === "string") element = document.querySelector(el);
    else if (el.nodeType != null) element = el;
    if (element == null) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector or a plain HTML element.`);
    return element;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements = function(els, name) {
    let el, elements;
    if (els instanceof Array) {
        elements = [];
        try {
            for (el of els)elements.push(this.getElement(el, name));
        } catch (e) {
            elements = null;
        }
    } else if (typeof els === "string") {
        elements = [];
        for (el of document.querySelectorAll(els))elements.push(el);
    } else if (els.nodeType != null) elements = [
        els
    ];
    if (elements == null || !elements.length) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`);
    return elements;
};
// Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) return accepted();
    else if (rejected != null) return rejected();
};
// Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
$3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile = function(file, acceptedFiles) {
    if (!acceptedFiles) return true;
     // If there are no accepted mime types, it's OK
    acceptedFiles = acceptedFiles.split(",");
    let mimeType = file.type;
    let baseMimeType = mimeType.replace(/\/.*$/, "");
    for (let validType of acceptedFiles){
        validType = validType.trim();
        if (validType.charAt(0) === ".") {
            if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) return true;
        } else if (/\/\*$/.test(validType)) {
            // This is something like a image/* mime type
            if (baseMimeType === validType.replace(/\/.*$/, "")) return true;
        } else {
            if (mimeType === validType) return true;
        }
    }
    return false;
};
// Augment jQuery
if (typeof jQuery !== "undefined" && jQuery !== null) jQuery.fn.dropzone = function(options) {
    return this.each(function() {
        return new $3ed269f2f0fb224b$export$2e2bcd8739ae039(this, options);
    });
};
// Dropzone file status codes
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED = "added";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED = "queued";
// For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ACCEPTED = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
$3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING = "uploading";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.PROCESSING = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING; // alias
$3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED = "canceled";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR = "error";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS = "success";
/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */ // Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
let $3ed269f2f0fb224b$var$detectVerticalSquash = function(img) {
    let iw = img.naturalWidth;
    let ih = img.naturalHeight;
    let canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let { data: data  } = ctx.getImageData(1, 0, 1, ih);
    // search image edge pixel position in case it is squashed vertically.
    let sy = 0;
    let ey = ih;
    let py = ih;
    while(py > sy){
        let alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) ey = py;
        else sy = py;
        py = ey + sy >> 1;
    }
    let ratio = py / ih;
    if (ratio === 0) return 1;
    else return ratio;
};
// A replacement for context.drawImage
// (args are for source and destination).
var $3ed269f2f0fb224b$var$drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    let vertSquashRatio = $3ed269f2f0fb224b$var$detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
};
// Based on MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html
class $3ed269f2f0fb224b$var$ExifRestore {
    static initClass() {
        this.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }
    static encode64(input) {
        let output = "";
        let chr1 = undefined;
        let chr2 = undefined;
        let chr3 = "";
        let enc1 = undefined;
        let enc2 = undefined;
        let enc3 = undefined;
        let enc4 = "";
        let i = 0;
        while(true){
            chr1 = input[i++];
            chr2 = input[i++];
            chr3 = input[i++];
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;
            if (isNaN(chr2)) enc3 = enc4 = 64;
            else if (isNaN(chr3)) enc4 = 64;
            output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
            if (!(i < input.length)) break;
        }
        return output;
    }
    static restore(origFileBase64, resizedFileBase64) {
        if (!origFileBase64.match("data:image/jpeg;base64,")) return resizedFileBase64;
        let rawImage = this.decode64(origFileBase64.replace("data:image/jpeg;base64,", ""));
        let segments = this.slice2Segments(rawImage);
        let image = this.exifManipulation(resizedFileBase64, segments);
        return `data:image/jpeg;base64,${this.encode64(image)}`;
    }
    static exifManipulation(resizedFileBase64, segments) {
        let exifArray = this.getExifArray(segments);
        let newImageArray = this.insertExif(resizedFileBase64, exifArray);
        let aBuffer = new Uint8Array(newImageArray);
        return aBuffer;
    }
    static getExifArray(segments) {
        let seg = undefined;
        let x = 0;
        while(x < segments.length){
            seg = segments[x];
            if (seg[0] === 255 & seg[1] === 225) return seg;
            x++;
        }
        return [];
    }
    static insertExif(resizedFileBase64, exifArray) {
        let imageData = resizedFileBase64.replace("data:image/jpeg;base64,", "");
        let buf = this.decode64(imageData);
        let separatePoint = buf.indexOf(255, 3);
        let mae = buf.slice(0, separatePoint);
        let ato = buf.slice(separatePoint);
        let array = mae;
        array = array.concat(exifArray);
        array = array.concat(ato);
        return array;
    }
    static slice2Segments(rawImageArray) {
        let head = 0;
        let segments = [];
        while(true){
            var length;
            if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) break;
            if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) head += 2;
            else {
                length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
                let endPoint = head + length + 2;
                let seg = rawImageArray.slice(head, endPoint);
                segments.push(seg);
                head = endPoint;
            }
            if (head > rawImageArray.length) break;
        }
        return segments;
    }
    static decode64(input) {
        let output = "";
        let chr1 = undefined;
        let chr2 = undefined;
        let chr3 = "";
        let enc1 = undefined;
        let enc2 = undefined;
        let enc3 = undefined;
        let enc4 = "";
        let i = 0;
        let buf = [];
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        let base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.");
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while(true){
            enc1 = this.KEY_STR.indexOf(input.charAt(i++));
            enc2 = this.KEY_STR.indexOf(input.charAt(i++));
            enc3 = this.KEY_STR.indexOf(input.charAt(i++));
            enc4 = this.KEY_STR.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            buf.push(chr1);
            if (enc3 !== 64) buf.push(chr2);
            if (enc4 !== 64) buf.push(chr3);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
            if (!(i < input.length)) break;
        }
        return buf;
    }
}
$3ed269f2f0fb224b$var$ExifRestore.initClass();
/*
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 */ // @win window reference
// @fn function reference
let $3ed269f2f0fb224b$var$contentLoaded = function(win, fn) {
    let done = false;
    let top = true;
    let doc = win.document;
    let root = doc.documentElement;
    let add = doc.addEventListener ? "addEventListener" : "attachEvent";
    let rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
    let pre = doc.addEventListener ? "" : "on";
    var init = function(e) {
        if (e.type === "readystatechange" && doc.readyState !== "complete") return;
        (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) return fn.call(win, e.type || e);
    };
    var poll = function() {
        try {
            root.doScroll("left");
        } catch (e) {
            setTimeout(poll, 50);
            return;
        }
        return init("poll");
    };
    if (doc.readyState !== "complete") {
        if (doc.createEventObject && root.doScroll) {
            try {
                top = !win.frameElement;
            } catch (error) {
            }
            if (top) poll();
        }
        doc[add](pre + "DOMContentLoaded", init, false);
        doc[add](pre + "readystatechange", init, false);
        return win[add](pre + "load", init, false);
    }
};
function $3ed269f2f0fb224b$var$__guard__(value, transform) {
    return typeof value !== "undefined" && value !== null ? transform(value) : undefined;
}
function $3ed269f2f0fb224b$var$__guardMethod__(obj, methodName, transform) {
    if (typeof obj !== "undefined" && obj !== null && typeof obj[methodName] === "function") return transform(obj, methodName);
    else return undefined;
}



//# sourceMappingURL=dropzone.mjs.map


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!***********************************************!*\
  !*** ./client/src/entwine/TinyMCE_ssmedia.js ***!
  \***********************************************/


var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _client = __webpack_require__(/*! react-dom/client */ "react-dom/client");
var _Injector = _interopRequireWildcard(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
var _InsertMediaModal = _interopRequireDefault(__webpack_require__(/*! containers/InsertMediaModal/InsertMediaModal */ "./client/src/containers/InsertMediaModal/InsertMediaModal.js"));
var _ShortcodeSerialiser = _interopRequireWildcard(__webpack_require__(/*! lib/ShortcodeSerialiser */ "lib/ShortcodeSerialiser"));
var modalActions = _interopRequireWildcard(__webpack_require__(/*! state/modal/ModalActions */ "./client/src/state/modal/ModalActions.js"));
var _TinyMCE_ssmedia_sizepressets = __webpack_require__(/*! ./TinyMCE_ssmedia_sizepressets */ "./client/src/entwine/TinyMCE_ssmedia_sizepressets.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const InjectableInsertMediaModal = (0, _Injector.loadComponent)(_InsertMediaModal.default);
const TinyMCE_ssmedia_filter = 'img[data-shortcode="image"]';
(() => {
  const ssmedia = {
    init(editor) {
      const insertTitle = _i18n.default._t('AssetAdmin.INSERT_FROM_FILES', 'Insert from Files');
      const editTitle = _i18n.default._t('AssetAdmin.EDIT_IMAGE', 'Edit image');
      const deleteTitle = _i18n.default._t('AssetAdmin.DELETE_IMAGE', 'Delete image');
      const contextTitle = _i18n.default._t('AssetAdmin.FILE', 'File');
      editor.addCommand('ssmedia', () => {
        (0, _jquery.default)(`#${editor.id}`).entwine('ss').openMediaDialog();
      });
      editor.addCommand('ssmedia-delete', () => {
        const node = editor.selection.getNode();
        if (editor.dom.is(node, TinyMCE_ssmedia_filter)) {
          node.remove();
        } else {
          console.error({
            error: 'Unexpected selection - expected image',
            selectedNode: node
          });
        }
      });
      editor.ui.registry.addButton('ssmedia', {
        tooltip: insertTitle,
        icon: 'image',
        onAction: () => editor.execCommand('ssmedia'),
        stateSelector: TinyMCE_ssmedia_filter
      });
      editor.ui.registry.addMenuItem('ssmedia', {
        text: contextTitle,
        icon: 'image',
        onAction: () => editor.execCommand('ssmedia')
      });
      editor.ui.registry.addButton('ssmediaedit', {
        tooltip: editTitle,
        icon: 'edit-block',
        onAction: () => editor.execCommand('ssmedia')
      });
      editor.ui.registry.addButton('ssmediadelete', {
        tooltip: deleteTitle,
        icon: 'remove',
        onAction: () => editor.execCommand('ssmedia-delete')
      });
      const sizePresets = editor.getParam('image_size_presets');
      let buttonList = [];
      if (sizePresets) {
        buttonList = (0, _TinyMCE_ssmedia_sizepressets.imageSizePresetButtons)(editor, sizePresets);
      }
      editor.ui.registry.addContextToolbar('ssmedia', {
        predicate: node => editor.dom.is(node, TinyMCE_ssmedia_filter),
        position: 'node',
        scope: 'node',
        items: `${buttonList.join(' ')} | ssmediaedit ssmediadelete`
      });
      editor.on('BeforeExecCommand', e => {
        const cmd = e.command;
        const ui = e.ui;
        const val = e.value;
        if (cmd === 'mceEditImage' || cmd === 'mceImage') {
          e.preventDefault();
          editor.execCommand('ssmedia', ui, val);
        }
      });
      editor.on('GetContent', o => {
        const content = (0, _jquery.default)(`<div>${o.content}</div>`);
        content.find(TinyMCE_ssmedia_filter).add(content.filter(TinyMCE_ssmedia_filter)).each(function () {
          const el = (0, _jquery.default)(this);
          const obj = {
            src: el.attr('src'),
            id: el.data('id'),
            width: el.attr('width'),
            height: el.attr('height'),
            class: el.attr('class'),
            title: el.attr('title'),
            alt: el.attr('alt'),
            loading: el.data('loading')
          };
          const shortCode = _ShortcodeSerialiser.default.serialise({
            name: 'image',
            properties: (0, _ShortcodeSerialiser.sanitiseShortCodeProperties)(obj),
            wrapped: false
          });
          el.replaceWith(shortCode);
        });
        o.content = '';
        content.each(function () {
          if (this.innerHTML !== undefined) {
            o.content += this.innerHTML;
          }
        });
      });
      editor.on('BeforeSetContent', o => {
        let content = o.content;
        let match = _ShortcodeSerialiser.default.match('image', false, content);
        while (match) {
          const attrs = match.properties;
          const el = (0, _jquery.default)('<img>').attr(Object.assign({}, attrs, {
            id: undefined,
            'data-id': attrs.id,
            'data-shortcode': 'image',
            'data-loading': attrs.loading
          })).addClass('ss-htmleditorfield-file image');
          content = content.replace(match.original, (0, _jquery.default)('<div></div>').append(el).html());
          match = _ShortcodeSerialiser.default.match('image', false, content);
        }
        o.content = content;
      });
      return {
        getMetadata() {
          return {
            name: 'Silverstripe Media',
            url: 'https://docs.silverstripe.org/en/4/developer_guides/forms/field_types/htmleditorfield'
          };
        }
      };
    }
  };
  tinymce.PluginManager.add('ssmedia', editor => ssmedia.init(editor));
})();
_jquery.default.entwine('ss', $ => {
  $('.js-injector-boot #insert-media-react__dialog-wrapper').entwine({
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
      const {
        dispatch
      } = _Injector.default.reducer.store;
      dispatch(modalActions.initFormStack('insert-media', 'admin'));
      const imageSizePresets = tinymce.activeEditor.getParam('image_size_presets');
      dispatch(modalActions.defineImageSizePresets(imageSizePresets));
      this._renderModal(true);
    },
    close() {
      const {
        dispatch
      } = _Injector.default.reducer.store;
      dispatch(modalActions.reset());
      this._renderModal(false);
    },
    _renderModal(isOpen) {
      var _this = this;
      const handleHide = () => this.close();
      const handleInsert = function () {
        return _this._handleInsert(...arguments);
      };
      const {
        url,
        ...attrs
      } = this.getOriginalAttributes();
      const fileSelected = attrs.hasOwnProperty('ID') && attrs.ID !== null;
      const folderId = this.getFolderId();
      const editor = this.getElement().getEditor();
      const selection = editor.getInstance().selection;
      const selectionContent = editor.getSelection();
      const tagName = selection.getNode().tagName;
      const requireLinkText = tagName !== 'A' && (tagName === 'IMG' || selectionContent.trim() === '');
      let root = this.getReactRoot();
      if (!root) {
        root = (0, _client.createRoot)(this[0]);
      }
      root.render(_react.default.createElement(InjectableInsertMediaModal, {
        title: false,
        isOpen: isOpen,
        folderId: folderId,
        onInsert: handleInsert,
        onClosed: handleHide,
        bodyClassName: "modal__dialog",
        className: "insert-media-react__dialog-wrapper",
        requireLinkText: requireLinkText,
        fileAttributes: attrs,
        fileSelected: fileSelected
      }));
      this.setReactRoot(root);
    },
    _handleInsert(data, file) {
      let result = false;
      this.setData(Object.assign({}, data, file));
      try {
        let category = null;
        if (file) {
          category = file.category;
        } else {
          category = 'image';
        }
        switch (category) {
          case 'image':
            result = this.insertImage();
            break;
          default:
            result = this.insertFile();
        }
      } catch (e) {
        this.statusMessage(e, 'bad');
      }
      if (result) {
        this.close();
      }
      return Promise.resolve();
    },
    getFolderId() {
      const $field = this.getElement();
      if (!$field) {
        return null;
      }
      const folderId = Number($field.data('config').upload_folder_id);
      return isNaN(folderId) ? null : folderId;
    },
    getOriginalAttributes() {
      const $field = this.getElement();
      if (!$field) {
        return {};
      }
      const node = $field.getEditor().getSelectedNode();
      if (!node) {
        return {};
      }
      const $node = $(node);
      const hrefParts = ($node.attr('href') || '').split('#');
      if (hrefParts[0]) {
        const shortcode = _ShortcodeSerialiser.default.match('file_link', false, hrefParts[0]);
        if (shortcode) {
          return {
            ID: shortcode.properties.id ? parseInt(shortcode.properties.id, 10) : 0,
            Anchor: hrefParts[1] || '',
            Description: $node.attr('title'),
            TargetBlank: !!$node.attr('target')
          };
        }
      }
      const $caption = $node.parent('.captionImage').find('.caption');
      const attr = {
        url: $node.attr('src'),
        AltText: $node.attr('alt'),
        Width: $node.attr('width'),
        Height: $node.attr('height'),
        Loading: $node.attr('data-loading'),
        TitleTooltip: $node.attr('title'),
        Alignment: this.findPosition($node.attr('class')),
        Caption: $caption.text(),
        ID: $node.attr('data-id')
      };
      ['Width', 'Height', 'ID'].forEach(item => {
        attr[item] = typeof attr[item] === 'string' ? parseInt(attr[item], 10) : null;
      });
      return attr;
    },
    findPosition(cssClass) {
      const alignments = ['leftAlone', 'center', 'rightAlone', 'left', 'right'];
      if (typeof cssClass !== 'string') {
        return '';
      }
      const classes = cssClass.split(' ');
      return alignments.find(alignment => classes.indexOf(alignment) > -1);
    },
    getAttributes() {
      const data = this.getData();
      return {
        src: data.url,
        alt: data.AltText,
        width: data.Width,
        height: data.Height,
        title: data.TitleTooltip,
        class: data.Alignment,
        'data-id': data.ID,
        'data-shortcode': 'image',
        'data-loading': data.Loading
      };
    },
    getExtraData() {
      const data = this.getData();
      return {
        CaptionText: data && data.Caption
      };
    },
    insertFile() {
      const data = this.getData();
      const editor = this.getElement().getEditor();
      const $node = $(editor.getSelectedNode());
      const shortcode = _ShortcodeSerialiser.default.serialise({
        name: 'file_link',
        properties: {
          id: data.ID
        }
      }, true);
      const selectionContent = editor.getSelection();
      let linkText = selectionContent || data.Text || data.filename;
      if ($node.is('a') && $node.html()) {
        linkText = '';
      }
      const linkAttributes = {
        href: shortcode,
        target: data.TargetBlank ? '_blank' : '',
        title: data.Description
      };
      if ($node.is('img')) {
        linkText = data.Text || data.filename;
        const newLink = $('<a />').attr(linkAttributes).text(linkText);
        $node.replaceWith(newLink);
        editor.addUndo();
        editor.repaint();
      } else {
        this.insertLinkInEditor(linkAttributes, linkText);
      }
      return true;
    },
    insertImage() {
      const $field = this.getElement();
      if (!$field) {
        return false;
      }
      const editor = $field.getEditor();
      if (!editor) {
        return false;
      }
      const node = $(editor.getSelectedNode());
      const attrs = this.getAttributes();
      const extraData = this.getExtraData();
      let replacee = node && node.is('img,a') ? node : null;
      if (replacee && replacee.parent().is('.captionImage')) replacee = replacee.parent();
      const img = node && node.is('img') ? node : $('<img />');
      img.attr(attrs).addClass('ss-htmleditorfield-file image');
      let container = img.parent('.captionImage');
      let caption = container.find('.caption');
      if (extraData.CaptionText) {
        if (!container.length) {
          container = $('<div></div>');
        }
        container.attr('class', `captionImage ${attrs.class}`).removeAttr('data-mce-style').width(attrs.width);
        if (!caption.length) {
          caption = $('<p class="caption"></p>').appendTo(container);
        }
        caption.attr('class', `caption ${attrs.class}`).text(extraData.CaptionText);
      } else {
        container = null;
        caption = null;
      }
      const replacer = container || img;
      if (replacee && replacee.not(replacer).length) {
        replacee.replaceWith(replacer);
      }
      if (container) {
        container.prepend(img);
      }
      if (!replacee) {
        editor.repaint();
        editor.insertContent($('<div />').append(replacer).html(), {
          skip_undo: 1
        });
      }
      editor.addUndo();
      editor.repaint();
      return true;
    },
    statusMessage(text, type) {
      const content = $('<div/>').text(text).html();
      _jquery.default.noticeAdd({
        text: content,
        type,
        stayTime: 5000,
        inEffect: {
          left: '0',
          opacity: 'show'
        }
      });
    }
  });
});
}();
/******/ })()
;
//# sourceMappingURL=TinyMCE_ssmedia.js.map