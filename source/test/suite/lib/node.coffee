should = require 'should'
Base = require '../../../lib/base'

module.exports = (Test, name = 'Node') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Base', ->
      Test::.should.be.an.instanceof Base

    describe '#constructor()', -> it 'should return an instance of Node', ->
      (new Test).should.be.an.instanceof Test

    describe 'instance', ->

      it 'should have appendChild() method', -> (new Test).appendChild.should.be.a.Function
      it 'should have removeChild() method', -> (new Test).removeChild.should.be.a.Function

      describe '#appendChild(child)', ->
        it 'should return the node', -> (test = new Test).appendChild({}).should.be.equal test

        it 'should append the child to children', ->
          (parent = new Test).appendChild(child = new Test).children[0].should.be.equal child

        it 'should only add an instances of Test (or any subclass)', ->
          (parent = new Test).appendChild({}).should.not.have.property 'children'

        it 'should not add duplicates', ->
          (parent = new Test).appendChild(child = new Test).appendChild(child).children.length.should.be.equal 1

        it 'should remove the child from its parent', ->
          (parent = new Test).appendChild(child = new Test).children.length.should.be.equal 1
          (new Test).appendChild(child).children[0].should.be.equal child
          parent.should.not.have.property 'children'

      describe '#removeChild(child)', ->
        it 'should return the node', -> (test = new Test).removeChild({}).should.be.equal test
        it 'should remove the child', ->
          (new Test).appendChild(child = new Test).removeChild(child).should.not.have.property 'children'
