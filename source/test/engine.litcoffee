# TEST CLASS: Engine
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Engine, name='Engine') ->

      describe name, ->
        it 'should be a class', -> Engine.should.be.a.class

        describe '#constructor(args)', ->
          it 'should return an instance of Engine', ->
            (new Engine).should.be.an.instanceof Engine


[Engine#constructor]: ../engine.litcoffee#constructor
[Parent]: ./index.litcoffee
