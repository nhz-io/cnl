# TEST CLASS: Pen
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Pen, name='Pen') ->

      describe name, ->
        it 'should be a class', -> Pen.should.be.a.class

        describe '#constructor(args)', ->
          it 'should return an instance of Pen', ->
            (new Pen).should.be.an.instanceof Pen


[Pen#constructor]: ../pen.litcoffee#constructor
[Parent]: ./index.litcoffee
