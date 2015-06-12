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

    it 'should set the event phase', -> (new Test phase:'test').phase.should.be.equal 'test'
    it 'should set the event cancelable', -> (new Test cancelable:'test').cancelable.should.be.equal 'test'
    it 'should set the event bubbles', -> (new Test bubbles:'test').bubbles.should.be.equal 'test'
    it 'should set the event source', -> (new Test source:'test').source.should.be.equal 'test'
    it 'should set the event target', -> (new Test target:'test').target.should.be.equal 'test'
    it 'should set the event bubbling', -> (new Test bubbling:'test').bubbling.should.be.equal 'test'
    it 'should set the event sinking', -> (new Test sinking:'test').sinking.should.be.equal 'test'
    it 'should set the event started', -> (new Test started:'test').started.should.be.equal 'test'
    it 'should set the event stopped', -> (new Test stopped:'test').stopped.should.be.equal 'test'
    it 'should set the event canceled', -> (new Test canceled:'test').canceled.should.be.equal 'test'
    it 'should set the event aborted', -> (new Test aborted:'test').aborted.should.be.equal 'test'
    it 'should set the event done', -> (new Test done:'test').done.should.be.equal 'test'
    it 'should set the event timestamp', -> (new Test).timestamp.should.be.a.Number

    describe 'instance', ->
      it 'should have a type property', -> (new Test).should.have.property 'type'
      it 'should have a phase property', -> (new Test).should.have.property 'phase'
      it 'should have a cancelable property', -> (new Test).should.have.property 'cancelable'
      it 'should have a bubbles property', -> (new Test).should.have.property 'bubbles'
      it 'should have a source property', -> (new Test).should.have.property 'source'
      it 'should have a target property', -> (new Test).should.have.property 'target'
      it 'should have a bubbling property', -> (new Test).should.have.property 'bubbling'
      it 'should have a sinking property', -> (new Test).should.have.property 'sinking'
      it 'should have a started property', -> (new Test).should.have.property 'started'
      it 'should have a stopped property', -> (new Test).should.have.property 'stopped'
      it 'should have a canceled property', -> (new Test).should.have.property 'canceled'
      it 'should have a aborted property', -> (new Test).should.have.property 'aborted'
      it 'should have a done property', -> (new Test).should.have.property 'done'
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
