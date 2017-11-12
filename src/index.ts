import { Marshaller } from 'raynor'

export function raynorChai(chai: any, _utils: any): any {
    chai.Assertion.addMethod('raynor', function(this: typeof chai, marshaller: Marshaller<any>): void {
        try {
            marshaller.extract(this._obj);
            this.assert(true, 'expected #{this} to be parsable by ' + ((marshaller.constructor as any).name));
        } catch (e) {
            this.assert(false, 'expected #{this} to be parsable by ' + ((marshaller.constructor as any).name) + ' but got ' + e.toString());
        }
    });
}


declare global {
    export namespace Chai {
        interface Assertion {
            raynor(marshaller: Marshaller<any>): void;
        }
    }
}
