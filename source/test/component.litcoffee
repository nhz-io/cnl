# TEST CLASS: Component
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Component, name='Component') ->

## CONSTRUCTOR

      describe name, ->
        it 'should be a class', -> Component.should.be.a.class

        describe '#constructor(args)', ->
          it 'should return an instance of Component', ->
            (new Component).should.be.an.instanceof Component

---

## LISTENERS

Mousemove capturing listener

      describe '#mousemoveCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .mousemoveCaptureListener()
            .should.be.equal component

        it 'should set the state to active if component is grabbed', ->
          component = new Component
          component.___runtime.grab = true
          component.state = null
          component.mousemoveCaptureListener({})
          component.state.should.be.equal 'active'

        it 'should broadcast drag event with drag offset', (done) ->
          component = new Component events:drag:true
          component.___runtime.grab = true
          component.___runtime.grabEvent = x:10, y:10
          component.broadcastEvent = (event) ->
            event.offsetX.should.be.equal 10
            event.offsetY.should.be.equal 5
            done()
          component.mousemoveCaptureListener x:20, y:15

        it 'should broadcast drag event with drag offset using previous drag', (done) ->
          component = new Component events:drag:true
          component.___runtime.grab = true
          component.___runtime.dragEvent = x:10, y:10
          component.broadcastEvent = (event) ->
            event.offsetX.should.be.equal 10
            event.offsetY.should.be.equal 5
            done()
          component.mousemoveCaptureListener x:20, y:15

        it 'should set the component state to hover', ->
          component = new Component
            origin  : x:0, y:0
            regions : hover: [0,0,1,1]
          component.mousemoveCaptureListener x:0.5, y:0.5
          component.state.should.be.equal 'hover'

        it 'should set the component state to hover', ->
          component = new Component
            origin  : x:0, y:0
            regions : normal: [0,0,1,1]
          component.mousemoveCaptureListener x:0.5, y:0.5
          component.state.should.be.equal 'normal'

        it 'should set the component state to hover preceeding normal', ->
          component = new Component
            origin  : x:0, y:0
            regions : normal: [0,0,1,1], hover: [0,0,1,1]
          component.mousemoveCaptureListener x:0.5, y:0.5
          component.state.should.be.equal 'hover'

Drag capturing listener

      describe '#dragCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .mousemoveCaptureListener()
            .should.be.equal component

        it 'should save the event in #___runtime', ->
          (component = new Component)
            .dragCaptureListener 'test'
            .___runtime.dragEvent.should.be.equal 'test'

        it 'should localize the event coordinates', ->
          (component = new Component origin: x:10, y:15)
            .dragCaptureListener (event = x:20, y:30)

          event.localX.should.be.equal 10
          event.localY.should.be.equal 15

Grab capturing listener

      describe '#grabCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .grabCaptureListener()
            .should.be.equal component

Release capturing listener

      describe '#releaseCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .releaseCaptureListener()
            .should.be.equal component

Mousedown listener

      describe '#mousedownListener', ->
        it 'should return the component', ->
          (component = new Component)
            .mousedownListener()
            .should.be.equal component

        it 'should set grab flag in #___runtime', ->
          (component = new Component state:'active', events:grab:true)
            .mousedownListener {}
            .___runtime.grab.should.be.true

Drag listener
      
      describe '#dragListener', ->
        it 'should return the component', ->
          (component = new Component)
            .dragListener()
            .should.be.equal component

Grab listener

      describe '#grabListener', ->
        it 'should return the component', ->
          (component = new Component)
            .grabListener()
            .should.be.equal component

Release listener

      describe '#releaseListener', ->
        it 'should return the component', ->
          (component = new Component)
            .releaseListener()
            .should.be.equal component

[Component#constructor]: ../component.litcoffee#constructor
[Parent]: ./index.litcoffee
