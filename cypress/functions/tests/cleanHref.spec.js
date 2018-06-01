/*eslint-disable*/
import { expect } from 'chai';
import cleanHref from '../cleanHref';

it('Should return a href without the get request', () => {
    const res = cleanHref(
        'http://localhost:3000?id=1'
    );

    expect(res).to.equal('http://localhost:3000');
    
});

it('Should return a normal href if no get request', () => {
    const res = cleanHref(
        'http://localhost:3000'
    );

    expect(res).to.equal('http://localhost:3000');
})