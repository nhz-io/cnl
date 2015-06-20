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


[Element#constructor]: ../element.litcoffee#constructor
[Parent]: ./index.litcoffee
