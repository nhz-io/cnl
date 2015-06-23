# TEST CLASS: Shape
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Shape, name='Shape') ->

      describe name, ->
        it 'should be a class', -> Shape.should.be.a.class

---

## CONSTRUCTOR

        describe '#constructor(args)', ->
          it 'should return an instance of Shape', ->
            (new Shape).should.be.an.instanceof Shape

Constructor should copy regions passed as named arguments into the instance

          it 'should copy the regions to the instance', ->
            shape = new Shape regions: (regions = test: (region = []))
            shape.regions.test.should.be.equal region
            shape.regions.should.not.be.equal regions

---

## METHODS

        describe '#getEventRegions', ->
          it 'should return the regions matching the event', ->
            shape = new Shape regions: test: [0,0,10,10]
            regions = shape.getEventRegions localX:5, localY:5
            regions.should.have.property 'test'
            regions.test[0].should.be.equal 0
            regions.test[1].should.be.equal 0
            regions.test[2].should.be.equal 10
            regions.test[3].should.be.equal 10

          it 'should return undefined if no regions match', ->
            shape = new Shape regions: test: [0,0,10,10]
            should(shape.getEventRegions localX:20, localY:20).not.be.ok

        describe '#draw', ->
          it 'should return the shape', ->
            (shape = new Shape).draw().should.be.equal shape

---

## LISTENERS

Mousemove capturing listener should store the event in the runtime
and localize the event coordinates.

        describe '#mousemoveCaptureListener', ->
          it 'should return the shape', ->
            (shape = new Shape)
              .mousemoveCaptureListener()
              .should.be.equal shape

---

Mousedown capturing listener should store the event in the runtime
and localize the event coordinates.

        describe '#mousedownCaptureListener', ->
          it 'should return the shape', ->
            (shape = new Shape)
              .mousedownCaptureListener()
              .should.be.equal shape

---

Mouseup capturing listener should store the event in the runtime
and localize the event coordinates.

        describe '#mouseupCaptureListener', ->
          it 'should return the shape', ->
            (shape = new Shape)
              .mouseupCaptureListener()
              .should.be.equal shape


[Shape#constructor]: ../shape.litcoffee#constructor
[Parent]: ./index.litcoffee
