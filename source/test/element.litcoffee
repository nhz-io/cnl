# TEST CLASS: Element
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Element, name='Element') ->

      describe name, ->
        it 'should be a class', -> Element.should.be.a.class

---

## CONSTRUCTOR

        describe '#constructor(args)', ->
          it 'should return an instance of Element', ->
            (new Element).should.be.an.instanceof Element

Constructor should copy the **origin** passed as named arguments into the instance

          it 'should copy the origin to the instance', ->
            element = new Element origin: (origin = x:10, y:20)
            element.origin.x.should.be.equal 10
            element.origin.y.should.be.equal 20
            element.origin.should.not.be.equal origin

---

## METHODS

        describe '#localizeEventCoordinates(event)', ->
          it 'should localize event coordinates', ->
            element = new Element origin: x:5, y:10
            event = x:10, y:20
            element.localizeEventCoordinates event
            event.localX.should.be.equal 5
            event.localY.should.be.equal 10

---

## LISTENERS

Mousemove capturing listener should store the event in the runtime
and localize the event coordinates.

        describe '#mousemoveCaptureListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mousemoveCaptureListener()
              .should.be.equal element

          it 'should store the event in #___runtime', ->
            (new Element)
              .mousemoveCaptureListener('test')
              .___runtime.mousemoveEvent.should.be.equal 'test'

          it 'should localize the event coordinates', ->
            (new Element origin: x:10, y:20)
              .mousemoveCaptureListener (event = x:15, y:30)
            event.localX.should.be.equal 5
            event.localY.should.be.equal 10

---

Mousedown capturing listener should store the event in the runtime
and localize the event coordinates.

        describe '#mousedownCaptureListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mousedownCaptureListener()
              .should.be.equal element

          it 'should store the event in #___runtime', ->
            (new Element)
              .mousedownCaptureListener('test')
              .___runtime.mousedownEvent.should.be.equal 'test'

          it 'should localize the event coordinates', ->
            (new Element origin: x:10, y:20)
              .mousedownCaptureListener (event = x:15, y:30)
            event.localX.should.be.equal 5
            event.localY.should.be.equal 10

---

Mouseup capturing listener should store the event in the runtime
and localize the event coordinates.

        describe '#mouseupCaptureListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mouseupCaptureListener()
              .should.be.equal element

          it 'should store the event in #___runtime', ->
            (new Element)
              .mouseupCaptureListener('test')
              .___runtime.mouseupEvent.should.be.equal 'test'

          it 'should localize the event coordinates', ->
            (new Element origin: x:10, y:20)
              .mouseupCaptureListener (event = x:15, y:30)
            event.localX.should.be.equal 5
            event.localY.should.be.equal 10

---

Mousemove listener. A stub for descendants to call `super` on.

        describe '#mousemoveListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mousemoveCaptureListener()
              .should.be.equal element

---

Mousedown listener. A stub for descendants to call `super` on.

        describe '#mousedownListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mousedownCaptureListener()
              .should.be.equal element

---

Mouseup listener. A stub for descendants to call `super` on.

        describe '#mouseupListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mouseupCaptureListener()
              .should.be.equal element

[Element#constructor]: ../element.litcoffee#constructor
[Parent]: ./index.litcoffee
