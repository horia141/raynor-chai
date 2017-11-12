/** Extends [chai]{@link https://chaijs.com} with [Raynor]{@link https://github.com/horia141/raynor} interop. */

/** Imports. Also so typedoc will workd. */
import { Marshaller } from 'raynor'


/**
 * A chai helper which adds the "raynor" method to {@link Chai.Assertion}. This method can be used
 * with a marshaller to test that an object can be parsed by that marshaller.
 * @param chai - an instance of the chai object.
 * @param _utils - a utilities object.
 */
export function raynorChai(chai: any, _utils: any): void {
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
            /**
             * Asserts that the built-up assertion's current object can be extracted by the supplied marshaller.
             * @param marshaller - a marshaller to test the object against.
             */
            raynor(marshaller: Marshaller<any>): void;
        }
    }
}
