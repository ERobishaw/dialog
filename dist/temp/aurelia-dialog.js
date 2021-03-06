'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogConfiguration = exports.DialogService = exports.AiDialogHeader = exports.AiDialogFooter = exports.DialogRenderer = exports.DialogController = exports.dialogOptions = exports.DialogResult = exports.AiDialogBody = exports.AiDialog = exports.AttachFocus = exports.Renderer = undefined;

var _dec, _class, _class2, _temp, _dec2, _dec3, _class3, _dec4, _dec5, _class4, _dec6, _class7, _dec7, _dec8, _class9, _desc, _value, _class10, _descriptor, _descriptor2, _class11, _temp2, _dec9, _dec10, _class12, _class13, _temp3, _class14, _temp4;

exports.invokeLifecycle = invokeLifecycle;

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaMetadata = require('aurelia-metadata');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = exports.Renderer = function () {
  function Renderer() {
    _classCallCheck(this, Renderer);
  }

  Renderer.prototype.getDialogContainer = function getDialogContainer() {
    throw new Error('DialogRenderer must implement getDialogContainer().');
  };

  Renderer.prototype.showDialog = function showDialog(dialogController) {
    throw new Error('DialogRenderer must implement showDialog().');
  };

  Renderer.prototype.hideDialog = function hideDialog(dialogController) {
    throw new Error('DialogRenderer must implement hideDialog().');
  };

  return Renderer;
}();

function invokeLifecycle(instance, name, model) {
  if (typeof instance[name] === 'function') {
    var result = instance[name](model);

    if (result instanceof Promise) {
      return result;
    }

    if (result !== null && result !== undefined) {
      return Promise.resolve(result);
    }

    return Promise.resolve(true);
  }

  return Promise.resolve(true);
}

var AttachFocus = exports.AttachFocus = (_dec = (0, _aureliaTemplating.customAttribute)('attach-focus'), _dec(_class = (_temp = _class2 = function () {
  function AttachFocus(element) {
    _classCallCheck(this, AttachFocus);

    this.value = true;

    this.element = element;
  }

  AttachFocus.prototype.attached = function attached() {
    if (this.value && this.value !== 'false') {
      this.element.focus();
    }
  };

  AttachFocus.prototype.valueChanged = function valueChanged(newValue) {
    this.value = newValue;
  };

  return AttachFocus;
}(), _class2.inject = [Element], _temp)) || _class);
var AiDialog = exports.AiDialog = (_dec2 = (0, _aureliaTemplating.customElement)('ai-dialog'), _dec3 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec2(_class3 = _dec3(_class3 = function AiDialog() {
  _classCallCheck(this, AiDialog);
}) || _class3) || _class3);
var AiDialogBody = exports.AiDialogBody = (_dec4 = (0, _aureliaTemplating.customElement)('ai-dialog-body'), _dec5 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec4(_class4 = _dec5(_class4 = function AiDialogBody() {
  _classCallCheck(this, AiDialogBody);
}) || _class4) || _class4);

var DialogResult = exports.DialogResult = function DialogResult(cancelled, output) {
  _classCallCheck(this, DialogResult);

  this.wasCancelled = false;

  this.wasCancelled = cancelled;
  this.output = output;
};

var dialogOptions = exports.dialogOptions = {
  lock: true,
  centerHorizontalOnly: false,
  startingZIndex: 1000,
  ignoreTransitions: false
};

var DialogController = exports.DialogController = function () {
  function DialogController(renderer, settings, resolve, reject) {
    _classCallCheck(this, DialogController);

    this.renderer = renderer;
    this.settings = settings;
    this._resolve = resolve;
    this._reject = reject;
  }

  DialogController.prototype.ok = function ok(output) {
    return this.close(true, output);
  };

  DialogController.prototype.cancel = function cancel(output) {
    return this.close(false, output);
  };

  DialogController.prototype.error = function error(message) {
    var _this = this;

    return invokeLifecycle(this.viewModel, 'deactivate').then(function () {
      return _this.renderer.hideDialog(_this);
    }).then(function () {
      _this.controller.unbind();
      _this._reject(message);
    });
  };

  DialogController.prototype.close = function close(ok, output) {
    var _this2 = this;

    if (this._closePromise) return this._closePromise;

    this._closePromise = invokeLifecycle(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
      if (canDeactivate) {
        return invokeLifecycle(_this2.viewModel, 'deactivate').then(function () {
          return _this2.renderer.hideDialog(_this2);
        }).then(function () {
          var result = new DialogResult(!ok, output);
          _this2.controller.unbind();
          _this2._resolve(result);
          return result;
        });
      }

      return Promise.resolve();
    });

    return this._closePromise;
  };

  return DialogController;
}();

var containerTagName = 'ai-dialog-container';
var overlayTagName = 'ai-dialog-overlay';
var transitionEvent = function () {
  var transition = null;

  return function () {
    if (transition) return transition;

    var t = void 0;
    var el = _aureliaPal.DOM.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        transition = transitions[t];
        return transition;
      }
    }
  };
}();

var DialogRenderer = exports.DialogRenderer = (_dec6 = (0, _aureliaDependencyInjection.transient)(), _dec6(_class7 = function () {
  function DialogRenderer() {
    var _this3 = this;

    _classCallCheck(this, DialogRenderer);

    this.dialogControllers = [];

    this.escapeKeyEvent = function (e) {
      if (e.keyCode === 27) {
        var top = _this3.dialogControllers[_this3.dialogControllers.length - 1];
        if (top && top.settings.lock !== true) {
          top.cancel();
        }
      }
    };

    this.defaultSettings = dialogOptions;
  }

  DialogRenderer.prototype.getDialogContainer = function getDialogContainer() {
    return _aureliaPal.DOM.createElement('div');
  };

  DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
    var _this4 = this;

    var settings = Object.assign({}, this.defaultSettings, dialogController.settings);
    var body = _aureliaPal.DOM.querySelectorAll('body')[0];
    var wrapper = document.createElement('div');

    this.modalOverlay = _aureliaPal.DOM.createElement(overlayTagName);
    this.modalContainer = _aureliaPal.DOM.createElement(containerTagName);
    this.anchor = dialogController.slot.anchor;
    wrapper.appendChild(this.anchor);
    this.modalContainer.appendChild(wrapper);

    this.stopPropagation = function (e) {
      e._aureliaDialogHostClicked = true;
    };
    this.closeModalClick = function (e) {
      if (!settings.lock && !e._aureliaDialogHostClicked) {
        dialogController.cancel();
      } else {
        return false;
      }
    };

    dialogController.centerDialog = function () {
      if (settings.centerHorizontalOnly) return;
      centerDialog(_this4.modalContainer);
    };

    this.modalOverlay.style.zIndex = this.defaultSettings.startingZIndex;
    this.modalContainer.style.zIndex = this.defaultSettings.startingZIndex;

    var lastContainer = Array.from(body.querySelectorAll(containerTagName)).pop();

    if (lastContainer) {
      lastContainer.parentNode.insertBefore(this.modalContainer, lastContainer.nextSibling);
      lastContainer.parentNode.insertBefore(this.modalOverlay, lastContainer.nextSibling);
    } else {
      body.insertBefore(this.modalContainer, body.firstChild);
      body.insertBefore(this.modalOverlay, body.firstChild);
    }

    if (!this.dialogControllers.length) {
      _aureliaPal.DOM.addEventListener('keyup', this.escapeKeyEvent);
    }

    this.dialogControllers.push(dialogController);

    dialogController.slot.attached();

    if (typeof settings.position === 'function') {
      settings.position(this.modalContainer, this.modalOverlay);
    } else {
      dialogController.centerDialog();
    }

    this.modalContainer.addEventListener('click', this.closeModalClick);
    this.anchor.addEventListener('click', this.stopPropagation);

    return new Promise(function (resolve) {
      var renderer = _this4;
      if (settings.ignoreTransitions) {
        resolve();
      } else {
        _this4.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
      }

      _this4.modalOverlay.classList.add('active');
      _this4.modalContainer.classList.add('active');
      body.classList.add('ai-dialog-open');

      function onTransitionEnd(e) {
        if (e.target !== renderer.modalContainer) {
          return;
        }
        renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
        resolve();
      }
    });
  };

  DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
    var _this5 = this;

    var settings = Object.assign({}, this.defaultSettings, dialogController.settings);
    var body = _aureliaPal.DOM.querySelectorAll('body')[0];

    this.modalContainer.removeEventListener('click', this.closeModalClick);
    this.anchor.removeEventListener('click', this.stopPropagation);

    var i = this.dialogControllers.indexOf(dialogController);
    if (i !== -1) {
      this.dialogControllers.splice(i, 1);
    }

    if (!this.dialogControllers.length) {
      _aureliaPal.DOM.removeEventListener('keyup', this.escapeKeyEvent);
    }

    return new Promise(function (resolve) {
      var renderer = _this5;
      if (settings.ignoreTransitions) {
        resolve();
      } else {
        _this5.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
      }

      _this5.modalOverlay.classList.remove('active');
      _this5.modalContainer.classList.remove('active');

      function onTransitionEnd() {
        renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
        resolve();
      }
    }).then(function () {
      body.removeChild(_this5.modalOverlay);
      body.removeChild(_this5.modalContainer);
      dialogController.slot.detached();

      if (!_this5.dialogControllers.length) {
        body.classList.remove('ai-dialog-open');
      }

      return Promise.resolve();
    });
  };

  return DialogRenderer;
}()) || _class7);


function centerDialog(modalContainer) {
  var child = modalContainer.children[0];
  var vh = Math.max(_aureliaPal.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);

  child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
  child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
}

var AiDialogFooter = exports.AiDialogFooter = (_dec7 = (0, _aureliaTemplating.customElement)('ai-dialog-footer'), _dec8 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n\n    <template if.bind="buttons.length > 0">\n      <button type="button" class="btn btn-default" repeat.for="button of buttons" click.trigger="close(button)">${button}</button>\n    </template>\n  </template>\n'), _dec7(_class9 = _dec8(_class9 = (_class10 = (_temp2 = _class11 = function () {
  function AiDialogFooter(controller) {
    _classCallCheck(this, AiDialogFooter);

    _initDefineProp(this, 'buttons', _descriptor, this);

    _initDefineProp(this, 'useDefaultButtons', _descriptor2, this);

    this.controller = controller;
  }

  AiDialogFooter.prototype.close = function close(buttonValue) {
    if (AiDialogFooter.isCancelButton(buttonValue)) {
      this.controller.cancel(buttonValue);
    } else {
      this.controller.ok(buttonValue);
    }
  };

  AiDialogFooter.prototype.useDefaultButtonsChanged = function useDefaultButtonsChanged(newValue) {
    if (newValue) {
      this.buttons = ['Cancel', 'Ok'];
    }
  };

  AiDialogFooter.isCancelButton = function isCancelButton(value) {
    return value === 'Cancel';
  };

  return AiDialogFooter;
}(), _class11.inject = [DialogController], _temp2), (_descriptor = _applyDecoratedDescriptor(_class10.prototype, 'buttons', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class10.prototype, 'useDefaultButtons', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
})), _class10)) || _class9) || _class9);
var AiDialogHeader = exports.AiDialogHeader = (_dec9 = (0, _aureliaTemplating.customElement)('ai-dialog-header'), _dec10 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <button type="button" class="dialog-close" aria-label="Close" if.bind="!controller.settings.lock" click.trigger="controller.cancel()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n\n    <div class="dialog-header-content">\n      <slot></slot>\n    </div>\n  </template>\n'), _dec9(_class12 = _dec10(_class12 = (_temp3 = _class13 = function AiDialogHeader(controller) {
  _classCallCheck(this, AiDialogHeader);

  this.controller = controller;
}, _class13.inject = [DialogController], _temp3)) || _class12) || _class12);
var DialogService = exports.DialogService = (_temp4 = _class14 = function () {
  function DialogService(container, compositionEngine) {
    _classCallCheck(this, DialogService);

    this.container = container;
    this.compositionEngine = compositionEngine;
    this.controllers = [];
    this.hasActiveDialog = false;
  }

  DialogService.prototype.open = function open(settings) {
    var _this6 = this;

    var dialogController = void 0;

    var promise = new Promise(function (resolve, reject) {
      var childContainer = _this6.container.createChild();
      dialogController = new DialogController(childContainer.get(Renderer), settings, resolve, reject);
      childContainer.registerInstance(DialogController, dialogController);
      return _openDialog(_this6, childContainer, dialogController);
    });

    return promise.then(function (result) {
      var i = _this6.controllers.indexOf(dialogController);
      if (i !== -1) {
        _this6.controllers.splice(i, 1);
        _this6.hasActiveDialog = !!_this6.controllers.length;
      }

      return result;
    });
  };

  DialogService.prototype.openAndYieldController = function openAndYieldController(settings) {
    var _this7 = this;

    var childContainer = this.container.createChild();
    var dialogController = new DialogController(childContainer.get(Renderer), settings, null, null);
    childContainer.registerInstance(DialogController, dialogController);

    dialogController.result = new Promise(function (resolve, reject) {
      dialogController._resolve = resolve;
      dialogController._reject = reject;
    }).then(function (result) {
      var i = _this7.controllers.indexOf(dialogController);
      if (i !== -1) {
        _this7.controllers.splice(i, 1);
        _this7.hasActiveDialog = !!_this7.controllers.length;
      }
      return result;
    });

    return _openDialog(this, childContainer, dialogController).then(function () {
      return dialogController;
    });
  };

  return DialogService;
}(), _class14.inject = [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine], _temp4);


function _openDialog(service, childContainer, dialogController) {
  var host = dialogController.renderer.getDialogContainer();
  var instruction = {
    container: service.container,
    childContainer: childContainer,
    model: dialogController.settings.model,
    view: dialogController.settings.view,
    viewModel: dialogController.settings.viewModel,
    viewSlot: new _aureliaTemplating.ViewSlot(host, true),
    host: host
  };

  return _getViewModel(instruction, service.compositionEngine).then(function (returnedInstruction) {
    dialogController.viewModel = returnedInstruction.viewModel;
    dialogController.slot = returnedInstruction.viewSlot;

    return invokeLifecycle(dialogController.viewModel, 'canActivate', dialogController.settings.model).then(function (canActivate) {
      if (canActivate) {
        service.controllers.push(dialogController);
        service.hasActiveDialog = !!service.controllers.length;

        return service.compositionEngine.compose(returnedInstruction).then(function (controller) {
          dialogController.controller = controller;
          dialogController.view = controller.view;

          return dialogController.renderer.showDialog(dialogController);
        });
      }
    });
  });
}

function _getViewModel(instruction, compositionEngine) {
  if (typeof instruction.viewModel === 'function') {
    instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
  }

  if (typeof instruction.viewModel === 'string') {
    return compositionEngine.ensureViewModel(instruction);
  }

  return Promise.resolve(instruction);
}

var defaultRenderer = DialogRenderer;

var resources = {
  'ai-dialog': './ai-dialog',
  'ai-dialog-header': './ai-dialog-header',
  'ai-dialog-body': './ai-dialog-body',
  'ai-dialog-footer': './ai-dialog-footer',
  'attach-focus': './attach-focus'
};

var defaultCSSText = 'ai-dialog-container,ai-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ai-dialog,ai-dialog-container>div>div{min-width:300px;margin:auto;display:block}ai-dialog-overlay{opacity:0}ai-dialog-overlay.active{opacity:1}ai-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ai-dialog-container.active{opacity:1}ai-dialog-container>div{padding:30px}ai-dialog-container>div>div{width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content}ai-dialog-container,ai-dialog-container>div,ai-dialog-container>div>div{outline:0}ai-dialog{box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ai-dialog>ai-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ai-dialog>ai-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ai-dialog>ai-dialog-body{display:block;padding:16px}ai-dialog>ai-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ai-dialog>ai-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ai-dialog>ai-dialog-footer button:disabled{cursor:default;opacity:.45}ai-dialog>ai-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ai-dialog-open{overflow:hidden}';

var DialogConfiguration = exports.DialogConfiguration = function () {
  function DialogConfiguration(aurelia) {
    _classCallCheck(this, DialogConfiguration);

    this.aurelia = aurelia;
    this.settings = dialogOptions;
    this.resources = [];
    this.cssText = defaultCSSText;
    this.renderer = defaultRenderer;
  }

  DialogConfiguration.prototype.useDefaults = function useDefaults() {
    return this.useRenderer(defaultRenderer).useCSS(defaultCSSText).useStandardResources();
  };

  DialogConfiguration.prototype.useStandardResources = function useStandardResources() {
    return this.useResource('ai-dialog').useResource('ai-dialog-header').useResource('ai-dialog-body').useResource('ai-dialog-footer').useResource('attach-focus');
  };

  DialogConfiguration.prototype.useResource = function useResource(resourceName) {
    this.resources.push(resourceName);
    return this;
  };

  DialogConfiguration.prototype.useRenderer = function useRenderer(renderer, settings) {
    this.renderer = renderer;
    this.settings = Object.assign(this.settings, settings || {});
    return this;
  };

  DialogConfiguration.prototype.useCSS = function useCSS(cssText) {
    this.cssText = cssText;
    return this;
  };

  DialogConfiguration.prototype._apply = function _apply() {
    var _this8 = this;

    this.aurelia.transient(Renderer, this.renderer);
    this.resources.forEach(function (resourceName) {
      return _this8.aurelia.globalResources(resources[resourceName]);
    });

    if (this.cssText) {
      _aureliaPal.DOM.injectStyles(this.cssText);
    }
  };

  return DialogConfiguration;
}();