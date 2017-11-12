import { expect, use } from 'chai'
import 'mocha'
import {
    ArrayOf,
    MarshalFrom,
    MarshalWith,
    IntegerMarshaller,
    StringMarshaller
} from 'raynor'

import { raynorChai } from './index'


use(raynorChai);


describe('raynorChai', () => {
    class User {
        @MarshalWith(StringMarshaller)
        name: string;
        @MarshalWith(ArrayOf(IntegerMarshaller))
        scoresByDay: number[];

        totalScore(): number {
            return this.scoresByDay.reduce((a,b) => a + b, 0);
        }
    }

    it('should match a good instance', () => {
        const user = new User();
        user.name = 'Raynor'
        user.scoresByDay = [10, 20, 30];

        expect(user).to.be.raynor(new (MarshalFrom(User))());
    });

    it('should not match a bad instance', () => {
        const user = new User();
        user.name = 'Raynor'
        user.scoresByDay = [10, 20.5, 30];

        expect(user).to.not.be.raynor(new (MarshalFrom(User))());
    });    
});
