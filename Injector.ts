import { Components } from "./components";
import ServerApi from "./components/server/api_server";

export class Injector {

    private config: any;
    private registeredComponents: {[key: string]: any} = {};
    public server: ServerApi;

    constructor(config: any) {
        this.config = config;
    }

    /**
     *
     * @param key the component's key
     * @param value the component's value
     */
    public bind(key: string, value: any): void {
        let registered = this.registeredComponents[key];
        if (registered !== undefined) throw new Error(`${key} is already registered.`);
        this.registeredComponents[key] = value;
    }

    /**
     *
     * @param key the component's key
     */
    public get(key: string): any {
        let registered = this.registeredComponents[key];
        if (registered !== undefined) {
            return registered;
        } else {
            throw new Error(`${key} was not registered.`);
        }
    }

    /**
     *
     * @param key the component's key
     */
    public getWithKey(key: string): any {
        let registered = this.registeredComponents[key];
        if (registered !== undefined) {
            return { [key] : registered };
        } else {
            throw new Error(`${key} was not registered.`);
        }
    }

    /**
     * Get component by name
     * will initialize component when not initialized yet
     */
    public resolve(i: string): object {

        try {
            let component: Components = this.config.components[i];
            const importedComponent = require("./" + component.file);

            let key: Array<string> = this.config.components[i].dependencies;
            let instance: any;
            if (key !== []) {
                let dependencies = {};
                let object = new importedComponent.default;
                // get parameter bag
                for (let j = 0; j < key.length; j++) {
                    let getDependency = this.getWithKey(key[j]);
                    dependencies = Object.assign(dependencies, getDependency);
                }
                instance = Object.assign(object, dependencies);
            } else {
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

            return instance;
        } catch (exception) {
            throw new Error(exception);
        }
    }

    /**
     *
     * @param key the attribute's key
     * @param type the attribute's data type
     */
    private assignToObject(key: string, type: string): any {
        let dataType: any = {
            "string" : "",
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

        return { [key] : dataType[type] };
    }

    /**
     * Execute "main", defined by configuration with
     * defined arguments
     */
    public start(): void {
        try {
            for (let i in this.config.components) {
                let instance = this.resolve(i);
                // register to container bag;
                this.bind(i, instance);
                console.log(this.get(i));
            }
        } catch (exception) {
            throw new Error(exception);
        }
        // start server
        this.server = this.get(this.config.main.component);
        this.server[this.config.main.method](this.config.main.args[0]);
    }
}