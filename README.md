# Raynor-Chai [![npm version](https://badge.fury.io/js/raynor-chai.svg)](https://badge.fury.io/js/raynor-chai) [![Build Status](https://travis-ci.org/horia141/raynor-chai.svg?branch=master)](https://travis-ci.org/horia141/raynor-chai) [![Coverage](https://codecov.io/gh/horia141/raynor-chai/branch/master/graph/badge.svg)](https://codecov.io/gh/horia141/raynor-chai) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://img.shields.io/badge/license-MIT-blue.svg) [![Dependencies](https://david-dm.org/horia141/raynor-chai.svg)](https://david-dm.org/horia141/raynor-chai.svg)

A [chai](http://chaijs.com/) extension which allows the use of [raynor](https://github.com/horia141/raynor) marshallers in assertions.

```js
import * as chai from 'chai'
import { raynorChai } from 'raynor-chai'

class User {
    @MarshalWith(StringMarshaller)
    name: string;
    @MarshalWith(ArrayOf(IntegerMarshaller))
    scoresByDay: number[];

    totalScore(): number {
        return this.scoresByDay.reduce((a,b) => a + b, 0);
    }
}

chai.use(raynorChai);

const user = new User();
user.name = 'Raynor';
user.scoresByDay = [10, 20, 30];

chai.expect(user).to.be.raynor(new (MarshalFrom(User))()); // Assertion passes

const badUser = new User();
badUser.name = 'Raynor';
badUser.scoresByDay = [10, 20.5, 30];

chai.expect(badUSer).to.not.be.raynor(new (MarshalFrom(User))()); // Assertion passes
```
