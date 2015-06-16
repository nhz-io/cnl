# CLASS: Pen
    module.exports = class Pen
      constructor: -> return => @draw?.apply this, arguments

