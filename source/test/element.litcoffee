# TEST CLASS: Element
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Element, name='Element') ->

      describe name, ->
        it 'should be a class', -> Element.should.be.a.class

        describe '#constructor(args)', ->
          it 'should return an instance of Element', ->
            (new Element).should.be.an.instanceof Element

---

Mousemove capturing listener should store the event in the runtime
for later use.

        describe '#mousemoveCaptureListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mousemoveCaptureListener()
              .should.be.equal element

          it 'should store the event in #___runtime', ->
            (new Element)
              .mousemoveCaptureListener('test')
              .___runtime.mousemoveEvent.should.be.equal 'test'

---

Mousedown capturing listener should store the event in the runtime
for later use.

        describe '#mousedownCaptureListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mousedownCaptureListener()
              .should.be.equal element

          it 'should store the event in #___runtime', ->
            (new Element)
              .mousedownCaptureListener('test')
              .___runtime.mousedownEvent.should.be.equal 'test'

---

Mouseup capturing listener should store the event in the runtime
for later use.

        describe '#mouseupCaptureListener', ->
          it 'should return the element', ->
            (element = new Element)
              .mouseupCaptureListener()
              .should.be.equal element

          it 'should store the event in #___runtime', ->
            (new Element)
              .mouseupCaptureListener('test')
              .___runtime.mouseupEvent.should.be.equal 'test'

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
