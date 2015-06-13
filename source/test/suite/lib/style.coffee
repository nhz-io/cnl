should = require 'should'
Base = require '../../../lib/base'

module.exports = (Test, name = 'Style') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Base', ->
      Test::.should.be.an.instanceof Base

    describe '#constructor()', ->
      it 'should return an instance of Test', -> (new Test).should.be.an.instanceof Test

      it 'should set the mapper', -> (new Test mapper:'test').mapper.should.be.equal 'test'
      it 'should set the data', -> (new Test data:'test').data.should.be.equal 'test'

    describe 'instance', ->
      it 'should have a data property', -> (new Test).should.have.property 'data'

      it 'should have a mapper() method', -> (new Test).mapper.should.be.a.Function
      it 'should have a load() method', -> (new Test).load.should.be.a.Function
      it 'should have a get() method', -> (new Test).get.should.be.a.Function

      describe '#load()', ->
        it 'should return the style', -> (test = new Test).load().should.be.equal test
        it 'should call the mapper', ->
          test = new Test mapper:(data, ctx, cb) ->
            data.should.be.equal test.data
            ctx.should.be.equal test
            cb()

      describe '#get()', ->
        it 'should return all the data when called without arguments', ->
          (test = new Test data: data = {}).get().should.be.equal data

        it 'should return a value if called with one string argument', ->
          (test = new Test data: foo:'bar').get('foo').should.be.equal 'bar'

        it 'should return an array if called with one array argument', ->
          test = new Test data: foo:'bar', bar:'foo', FOO:'BAR', BAR:'FOO'
          result = test.get ['foo','bar','FOO']
          result.should.be.an.Array
          result[0].should.be.equal 'bar'
          result[1].should.be.equal 'foo'
          result[2].should.be.equal 'BAR'

        it 'should return and array when called with multiple arguments', ->
          test = new Test data: foo:'bar', bar:'foo', FOO:'BAR', BAR:'FOO'
          result = test.get 'foo','bar','BAR'
          result.should.be.an.Array
          result[0].should.be.equal 'bar'
          result[1].should.be.equal 'foo'
          result[2].should.be.equal 'FOO'





