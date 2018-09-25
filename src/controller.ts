import { defineMetadata, getMetadata, metadataKeys, Declaration } from './utils';
import { Provider } from './provider';
import { IModule, Injectable, IControllerConstructor } from 'angular';

export function Controller(name: string) {
  return (Class: any) => {
    defineMetadata(metadataKeys.declaration, Declaration.Controller, Class);
    defineMetadata(metadataKeys.name, name, Class);
  };
}

/** @internal */
export function registerController(module: IModule, controllerConstructor: Injectable<IControllerConstructor>) {
  const name = getMetadata(metadataKeys.name, controllerConstructor);
  module.controller(name, controllerConstructor);
}
