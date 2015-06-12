should = require 'should'
Node = require '../../../lib/node'
Event = require '../../../lib/event'
Element = require '../../../lib/element'

module.exports = (Test, name = 'Element') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Node', ->
      Test::.should.be.an.instanceof Node

    describe '#constructor()', -> it 'should return an instance of Element', -> (new Test).should.be.an.instanceof Test

    describe 'instance', ->
      it 'should have listeners property', -> (new Test).should.have.property 'listeners'
      it 'should have addEventListener() method', -> (new Test).addEventListener.should.be.a.Function
      it 'should have removeEventListener() method', -> (new Test).removeEventListener.should.be.a.Function
      it 'should have dispatchEvent() method', -> (new Test).dispatchEvent.should.be.a.Function
      it 'should have broadcastEvent() method', -> (new Test).broadcastEvent.should.be.a.Function

      describe '#listeners', ->
        it 'should be an array of two objects', ->
          (new Test).listeners.length.should.be.equal 2
          (new Test).listeners[0].should.be.an.Object
          (new Test).listeners[1].should.be.an.Object

      describe '#addEventListener(type, listener, capture = false)', ->
        it 'should return the element', -> (test = new Test).addEventListener().should.be.equal test

        it 'should add event listener to bubbling listeners (default)', ->
          (test = new Test).addEventListener('test', (listener = ->)).listeners[0].test[0].should.be.equal listener

        it 'should add event listener to capturing listeners', ->
          (test = new Test).addEventListener('test', (listener = ->), yes).listeners[1].test[0].should.be.equal listener

        it 'should not add duplicates', ->
          (test = new Test)
            .addEventListener('test', (listener = ->))
            .addEventListener('test', listener)
            .listeners[0].test.length.should.be.equal 1

          (test = new Test)
            .addEventListener('test', (listener = ->), yes)
            .addEventListener('test', listener, yes)
            .listeners[1].test.length.should.be.equal 1

        it 'should add only functions', ->
          (test = new Test).addEventListener('test', {}).listeners[0].should.not.have.property 'test'
          (test = new Test).addEventListener('test', {}, yes).listeners[1].should.not.have.property 'test'

      describe '#removeEventListener(type, listener, capture = false)', ->
        it 'should return the element', -> (test = new Test).removeEventListener().should.be.equal test
        it 'should remove event listener from bubbling listeners (default)', ->
          (test = new Test)
            .addEventListener('test', (listener = ->))
            .removeEventListener('test', listener)
            .listeners[0].test.length.should.be.equal 0

        it 'should remove event listener from capturing listeners', ->
          (test = new Test)
            .addEventListener('test', (listener = ->), yes)
            .removeEventListener('test', listener, yes)
            .listeners[1].test.length.should.be.equal 0

      describe '#dispatchEvent(event)', ->
        it 'should return the element', -> (test = new Test).dispatchEvent().should.be.equal test
        it 'should dispatch the event to bubbling listeners', ->
          count = 0
          (event = new Event 'test').phase = 2
          (new Test)
            .addEventListener 'test', -> count++
            .addEventListener 'test', -> count++
            .addEventListener 'test', -> count++
            .dispatchEvent event
          count.should.be.equal 3

        it 'should dispatch the event to capturing listeners', ->
          count = 0
          (event = new Event 'test').phase = 1
          (new Test)
            .addEventListener 'test', (-> count++), yes
            .addEventListener 'test', (-> count++), yes
            .addEventListener 'test', (-> count++), yes
            .dispatchEvent event
          count.should.be.equal 3

        it 'should not dispatch events in any other phase', ->
          pass = yes
          event = new Event 'test'
          test = new Test
          test
            .addEventListener 'test', (-> pass = no)
            .addEventListener 'test', (-> pass = no), yes
            .dispatchEvent event
          pass.should.be.ok

          event.phase = 3
          test.dispatchEvent event
          pass.should.be.ok

        it 'should not dispatch aborted events', ->
          pass = yes
          (event = new Event 'test').phase = 1
          event.abort()
          test = new Test
          test
            .addEventListener 'test', (-> pass = no)
            .addEventListener 'test', (-> pass = no), yes
            .dispatchEvent event
          pass.should.be.ok

          event.phase = 2
          test.dispatchEvent event
          pass.should.be.ok

        it 'should start the event before dispatching', ->
          pass = no
          test = new Test
          event = new Event 'test'
          event.phase = 1
          test
            .addEventListener 'test', ((e) -> pass = e.started is yes)
            .addEventListener 'test', ((e) -> pass = e.started is yes), yes
            .dispatchEvent event
          pass.should.be.ok
          pass = no
          event.phase = 2
          test.dispatchEvent event
          pass.should.be.ok

      describe '#broadcastEvent(event)', ->
        it 'should return the element', -> (test = new Test).broadcastEvent().should.be.equal test

        it 'should set event phase to capturing if phase is not truthly', ->
          pass = no
          (parent = new Test).appendChild(child = new Element)
          (event = new Event 'test')
          child.broadcastEvent = (e) -> pass = (e.phase is 1)
          parent.broadcastEvent event
          pass.should.be.ok

        it 'should broadcast the event to children', ->
          pass = no
          (parent = new Test).appendChild(child = new Element)
          child.broadcastEvent = -> pass = yes
          parent.broadcastEvent new Event 'test'
          pass.should.be.ok

        it 'should set the element as the event source if there is no source already', ->
          (test = new Test).broadcastEvent(event = new Event 'test')
          event.source.should.be.equal test

        it 'should not broadcast the event to children if this element is the target of the event', ->
          pass = yes
          (parent = new Test).appendChild(child = new Element)
          (event = new Event 'test').target = parent
          child.broadcastEvent = -> pass = no
          parent.broadcastEvent event
          pass.should.be.ok

        it 'should not broadcast finished event to children', ->
          pass = yes
          (parent = new Test).appendChild(child = new Element)
          (event = new Event 'test').phase = 3
          child.broadcastEvent = -> pass = no
          parent.broadcastEvent event
          pass.should.be.ok

        it 'should not broadcast aborted event to children', ->
          pass = yes
          (parent = new Test).appendChild(child = new Element)
          (event = new Event 'test').abort()
          child.broadcastEvent = -> pass = no
          parent.broadcastEvent event
          pass.should.be.ok

        it 'should call dispatchEvent on this element before broadcasting it to children', ->
          broadcasted = no
          dispatched = no
          (parent = new Test).appendChild(child = new Element)
          parent.dispatchEvent = -> dispatched = not broadcasted
          child.broadcastEvent = -> broadcasted = yes
          parent.broadcastEvent new Event 'test'
          broadcasted.should.be.ok
          dispatched.should.be.ok

        it 'should not call dispatchEvent if event is finished', ->
          pass = yes
          (parent = new Test).dispatchEvent = -> pass = no
          (event = new Event 'test').phase = 3
          parent.broadcastEvent event
          pass.should.be.ok

        it 'should not call dispatchEvent if event is aborted', ->
          pass = yes
          (parent = new Test).dispatchEvent = -> pass = no
          (event = new Event 'test').abort()
          parent.broadcastEvent event
          pass.should.be.ok

        it 'should call event callback upon completion if event source is this element', ->
          pass = no
          (event = new Event 'test').callback = -> pass = yes
          event.target = (test = new Test)
          test.broadcastEvent event
          pass.should.be.ok

        it 'should not call event callback for finished events', ->
          pass = yes
          (event = new Event 'test').callback = -> pass = no
          event.phase = 3
          event.target = (test = new Test)
          test.broadcastEvent event
          pass.should.be.ok

        it 'should mark event as finished after calling the event callback', ->
          pass = no
          (event = new Event 'test').callback = (e) -> pass = (e.phase isnt 3)
          event.target = (test = new Test)
          test.broadcastEvent event
          pass.should.be.ok
          event.phase.should.be.equal 3
          event.done.should.be.ok
