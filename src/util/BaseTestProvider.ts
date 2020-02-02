// @ts-ignore
import {NodeEnvironment} from 'jest-environment-node';
import {Browser} from "./Browser";

class BaseTestProvider extends NodeEnvironment {
    global: any;
    constructor() {
        super();
        jest.setTimeout(10000);
        this.global.browser = new Browser();
    }
    async teeardown(){
        this.global.browser.close();
        await super.teardown();
    }

}