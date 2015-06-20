# TEST CLASS: Style
* Parent: [Index][Parent]

---

    should = require 'should'
    module.exports = (Style, name='Style') ->

      describe name, ->
        it 'should be a class', -> Style.should.be.a.class

        describe '#constructor(args)', ->
          it 'should return an instance of Style', ->
            (new Style).should.be.an.instanceof Style


[Style#constructor]: ../style.litcoffee#constructor
[Parent]: ./index.litcoffee
