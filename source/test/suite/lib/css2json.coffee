should = require 'should'

module.exports = (test, name = 'CSS to JSON mapper') ->
  describe name, ->
    it 'should convert CSS to JSON', ->
      result = test '@media test { test { foo: bar; bar: foo } } test { foo: bar; bar: foo } test { foo: baz }'
      result['@media test'].should.be.an.Object
      result['@media test'].test.should.be.an.Object
      result['@media test'].test.foo.should.be.equal 'bar'
      result['@media test'].test.bar.should.be.equal 'foo'

      result['test'].should.be.an.Object
      result['test'].foo.should.be.equal 'baz'
      result['test'].bar.should.be.equal 'foo'



