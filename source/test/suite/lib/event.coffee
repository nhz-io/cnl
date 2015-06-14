should = require 'should'
Base = require '../../../lib/base'

module.exports = (Test, name = 'Event') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be an subclass of Base', -> Test::.should.be.an.instanceof Base

  describe '#constructor()', ->
    it 'should return an instance of Test', -> (new Test).should.be.an.instanceof Test

    it 'should set the event type', -> (new Test 'test').type.should.be.equal 'test'

    it 'should set the event callback from the last argument', ->
      (new Test (cb = ->)).callback.should.be.equal cb

    it 'should set the event callback from args', ->
      (new Test callback:(cb = ->)).callback.should.be.equal cb

    it 'should override callback from last argument with the callback from args', ->
      (new Test callback:(cb = ->), (->)).callback.should.be.equal cb

    it 'should set the event type from first argument if it is a string', ->
      (new Test 'test').type.should.be.equal 'test'

    it 'should set the event type from the args', ->
      (new Test type:'test').type.should.be.equal 'test'

    it 'should set any key/value pair passed in args', ->
      (new Test foo:'bar').foo.should.be.equal 'bar'

    it 'should not overwrite the timestamp from args', ->
      should(new Test(timestamp:null).timestamp).be.equal null

    describe 'instance', ->
      it 'should have a timestamp property', -> (new Test).should.have.property 'timestamp'

      it 'should have a start() method', -> (new Test).start.should.be.a.Function
      it 'should have a stop() method', -> (new Test).stop.should.be.a.Function
      it 'should have a cancel() method', -> (new Test).cancel.should.be.a.Function
      it 'should have an abort() method', -> (new Test).abort.should.be.a.Function
      it 'should have a finish() method', -> (new Test).finish.should.be.a.Function
      it 'should have a callback() method', -> (new Test).callback.should.be.a.Function

      describe '#timestamp', ->
        it 'should be a valid timestamp', ->
          date = Date.now()
          perf = performance?.now() or 0
          timestamp = 1000 * date + Math.floor 1000 * (perf - Math.floor perf) - 1
          test = new Test
          test.timestamp.should.be.greaterThan 0
          test.timestamp.should.be.greaterThan timestamp

      describe '#start()', ->
        it 'should return the event', -> (test = new Test).start().should.be.equal test
        it 'should set started to true', -> (new Test).start().started.should.be.ok

      describe '#stop()', ->
        it 'should return the event', -> (test = new Test).stop().should.be.equal test
        it 'should set stopped to true', -> (new Test).stop().stopped.should.be.ok

      describe '#cancel()', ->
        it 'should return the event', -> (test = new Test).cancel().should.be.equal test
        it 'should set canceled to true', -> (new Test).cancel().canceled.should.be.ok

      describe '#abort()', ->
        it 'should return the event', -> (test = new Test).abort().should.be.equal test
        it 'should set aborted to true', -> (new Test).abort().aborted.should.be.ok

      describe '#finish()', ->
        it 'should return the event', -> (test = new Test).finish().should.be.equal test
        it 'should set done to true', -> (new Test).finish().done.should.be.ok
