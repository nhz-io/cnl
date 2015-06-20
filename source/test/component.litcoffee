# TEST CLASS: Component
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Component, name='Component') ->

      describe name, ->
        it 'should be a class', -> Component.should.be.a.class

        describe '#constructor(args)', ->
          it 'should return an instance of Component', ->
            (new Component).should.be.an.instanceof Component


[Component#constructor]: ../component.litcoffee#constructor
[Parent]: ./index.litcoffee
