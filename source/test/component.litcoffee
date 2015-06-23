# TEST CLASS: Component
* Parent: [Index][Parent]

---

    should = require 'should'
    Event = require 'ecl/dist/event'
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

Mousedown capturing listener
        
      describe '#mousedownCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .mousedownCaptureListener()
            .should.be.equal component

        it 'should set the active state', ->
          component = new Component
            origin  : x:0, y:0
            regions : active: [0,0,1,1]
          
          component
            .mousedownCaptureListener x:0.5, y:0.5
            .state.should.be.equal 'active'

        it 'should set the hover state', ->
          component = new Component
            origin  : x:0, y:0
            regions : hover: [0,0,1,1]
          
          component
            .mousedownCaptureListener x:0.5, y:0.5
            .state.should.be.equal 'hover'

        it 'should set the normal state', ->
          component = new Component
            origin  : x:0, y:0
            regions : normal: [0,0,1,1]
          
          component
            .mousedownCaptureListener x:0.5, y:0.5
            .state.should.be.equal 'normal'

        it 'should result in calling mousedownListener', (done) ->
          component = new Component
            origin  : x:0, y:0
            regions : active: [0,0,1,1]
            events  : mousedown:true

          component.addListener 'mousedown', -> done()
          component.broadcastEvent new Event
            type:'mousedown', x:0.5, y:0.5

Mouseup capturing listener
      
      describe '#mouseupCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .mouseupCaptureListener()
            .should.be.equal component

        it 'should set the active state', ->
          component = new Component
            origin  : x:0, y:0
            regions : active: [0,0,1,1]
          
          component
            .mouseupCaptureListener x:0.5, y:0.5
            .state.should.be.equal 'active'

        it 'should set event target to this component', ->
          component = new Component
            origin  : x:0, y:0
            regions : active: [0,0,1,1]
          
          component.mouseupCaptureListener (event = x:0.5, y:0.5)
          event.target.should.be.equal component

        it 'should set the hover state', ->
          component = new Component
            origin  : x:0, y:0
            regions : hover: [0,0,1,1]
          
          component
            .mouseupCaptureListener x:0.5, y:0.5
            .state.should.be.equal 'hover'

        it 'should set event target to this component', ->
          component = new Component
            origin  : x:0, y:0
            regions : hover: [0,0,1,1]
          
          component.mouseupCaptureListener (event = x:0.5, y:0.5)
          event.target.should.be.equal component

        it 'should set the normal state', ->
          component = new Component
            origin  : x:0, y:0
            regions : normal: [0,0,1,1]
          
          component
            .mouseupCaptureListener x:0.5, y:0.5
            .state.should.be.equal 'normal'

        it 'should set event target to this component', ->
          component = new Component
            origin  : x:0, y:0
            regions : normal: [0,0,1,1]
          
          component.mouseupCaptureListener (event = x:0.5, y:0.5)
          event.target.should.be.equal component

        it 'should broadcast release event to itself', (done) ->
          component = new Component
            origin  : x:0, y:0
            regions : active: [0,0,1,1]
            events  : release:true

          component.broadcastEvent = -> done()
          component.___runtime.grab = true
          component.mouseupCaptureListener x:0.5, y:0.5

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
          (component = new Component origin: x:10, y:25)
            .dragCaptureListener (event = x:20, y:30)

          event.localX.should.be.equal 10
          event.localY.should.be.equal 5

Grab capturing listener

      describe '#grabCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .grabCaptureListener()
            .should.be.equal component

        it 'should save the event in #___runtime', ->
          (component = new Component)
            .grabCaptureListener 'test'
            .___runtime.grabEvent.should.be.equal 'test'

        it 'should localize the event coordinates', ->
          (component = new Component origin: x:10, y:25)
            .grabCaptureListener (event = x:20, y:30)

          event.localX.should.be.equal 10
          event.localY.should.be.equal 5

Release capturing listener

      describe '#releaseCaptureListener', ->
        it 'should return the component', ->
          (component = new Component)
            .releaseCaptureListener()
            .should.be.equal component

        it 'should save the event in #___runtime', ->
          (component = new Component)
            .releaseCaptureListener 'test'
            .___runtime.releaseEvent.should.be.equal 'test'

        it 'should localize the event coordinates', ->
          (component = new Component origin: x:10, y:25)
            .releaseCaptureListener (event = x:20, y:30)

          event.localX.should.be.equal 10
          event.localY.should.be.equal 5

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

        it 'should deliver the grab event to itself', (done) ->
          (component = new Component state:'active', events:grab:true)
            .broadcastEvent = -> done()
          component.mousedownListener {}

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
