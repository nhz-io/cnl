# TEST CLASS: Shape
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Shape, name='Shape') ->

      describe name, ->
        it 'should be a class', -> Shape.should.be.a.class

        describe '#constructor(args)', ->
          it 'should return an instance of Shape', ->
            (new Shape).should.be.an.instanceof Shape


[Shape#constructor]: ../shape.litcoffee#constructor
[Parent]: ./index.litcoffee
