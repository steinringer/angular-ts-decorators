import {
  Declaration, defineMetadata, getAttributeName, getMetadata, isAttributeSelector, kebabToCamel,
  metadataKeys
} from './utils';
import { IHostListeners } from './hostListener';
import { IViewChildren } from './viewChild';
import { extendWithHostListenersAndChildren, replaceLifecycleHooks } from './component';
import { IController, IDirective, IModule, IDirectiveCompileFn, IDirectivePrePost, IDirectiveLinkFn } from 'angular';

export interface IDirectiveSt {
  compile?: IDirectiveCompileFn;
  link?: IDirectiveLinkFn | IDirectivePrePost;
}

export interface DirectiveOptionsDecorated extends IDirective {
  selector: string;
}

export interface DirectiveConstructor {
  new(...args: any[]): IDirectiveSt;
}

export function Directive({ selector, ...options }: DirectiveOptionsDecorated) {
  return (ctrl: DirectiveConstructor) => {
    const bindings = getMetadata(metadataKeys.bindings, ctrl);
    if (bindings) {
      options.bindToController = bindings;
    }
    const require = getMetadata(metadataKeys.require, ctrl);
    if (require) {
      options.require = require;
      if (!options.bindToController) options.bindToController = true;
    }
    options.restrict = options.restrict || 'A';

    const selectorName = isAttributeSelector(selector) ? getAttributeName(selector) : selector;
    defineMetadata(metadataKeys.name, kebabToCamel(selectorName), ctrl);
    defineMetadata(metadataKeys.declaration, Declaration.Directive, ctrl);
    defineMetadata(metadataKeys.options, options, ctrl);
  };
}

/** @internal */
export function registerDirective(module: IModule, ctorFn: DirectiveConstructor) {
  // let directiveFunc;
  const name = getMetadata(metadataKeys.name, ctorFn);
  const options = getMetadata(metadataKeys.options, ctorFn);
  // replaceLifecycleHooks(ctorFn);
  // const listeners: IHostListeners = getMetadata(metadataKeys.listeners, ctorFn);
  // const viewChildren: IViewChildren = getMetadata(metadataKeys.viewChildren, ctorFn);
  // options.controller = listeners || viewChildren ?
  //   extendWithHostListenersAndChildren(ctorFn, listeners, viewChildren) : ctorFn;
  // directiveFunc = () => options;

  let facArray: any[] = ctorFn.$inject.slice();
  facArray.push((...args) => {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        ctorFn.prototype[key] = options[key];
      }
    }
    return new ctorFn(...args);
  });

  module.directive(name, facArray);
}
