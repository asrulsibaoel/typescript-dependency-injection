"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Memstore = require("memstore").Store;
class Injector {
    constructor(config) {
        this.registeredComponents = {};
        this.config = config;
    }
    bind(key, value) {
        let registered = this.registeredComponents[key];
        if (registered !== undefined)
            throw new Error(`${key} is already registered.`);
        this.registeredComponents[key] = value;
    }
    get(key) {
        let registered = this.registeredComponents[key];
        if (registered !== undefined) {
            return registered;
        }
        else {
            throw new Error(`${key} was not registered.`);
        }
    }
    getWithKey(key) {
        let registered = this.registeredComponents[key];
        if (registered !== undefined) {
            return { [key]: registered };
        }
        else {
            throw new Error(`${key} was not registered.`);
        }
    }
    resolve(component) {
        return this;
    }
    assignToObject(key, type) {
        let dataType = {
            "string": "",
            "int": 0,
            "object": new Object,
            "any": new Object,
            "boolean": false,
            "[string]": [""],
            "[int]": [0],
            "[object]": [new Object],
            "[boolean]": [false]
        };
        if (dataType[type] === undefined) {
            throw new Error("Cannot assigning attibute caused by unknown data type");
        }
        return { [key]: dataType[type] };
    }
    start() {
        try {
            for (let i in this.config.components) {
                let component = this.config.components[i];
                const importedComponent = require("./" + component.file);
                let key = this.config.components[i].dependencies;
                let instance;
                if (key !== []) {
                    let dependencies = {};
                    let object = new importedComponent.default;
                    for (let j = 0; j < key.length; j++) {
                        let getDependency = this.getWithKey(key[j]);
                        dependencies = Object.assign(dependencies, getDependency);
                    }
                    instance = Object.assign(object, dependencies);
                }
                else {
                    instance = new importedComponent.default;
                }
                let options = this.config.components[i].options;
                if (options !== undefined) {
                    let schema = options.schema;
                    if (schema !== undefined) {
                        for (let k in schema) {
                            let dataType = schema[k];
                            let attribute = this.assignToObject(k, dataType);
                            instance = Object.assign(instance, attribute);
                        }
                    }
                }
                this.bind(i, instance);
                console.log(this.get(i));
            }
        }
        catch (exception) {
            throw new Error(exception);
        }
        this.server = this.get(this.config.main.component);
        this.server[this.config.main.method](this.config.main.args[0]);
    }
}
exports.Injector = Injector;
//# sourceMappingURL=Injector.js.map