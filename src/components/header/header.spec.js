import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import Header from './index.js';

describe("Header", function() {
  it("should render header element", function() {
    const header = shallow(<Header />);
    expect(header.contains(<h1>Welcome To Email Service</h1>)).to.equal(true);
  });
});