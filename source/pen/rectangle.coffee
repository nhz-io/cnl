module.exports = class Rectangle extends require '../lib/pen'
  constructor: (args = {}) ->
    @size = args.size or width:0, height:0
    {@fill, @stroke, @lineWidth} = args
    return super

  draw: (context, args = {}) ->
    if context
      origin = args.origin or @origin or x:0, y:0
      size = args.size or @size or width:0, height:0
      fill = args.fill or @fill
      stroke = args.stroke or @stroke
      lineWidth = args.lineWidth or @lineWidth

      if lineWidth % 2
        origin.x += 0.5
        origin.y += 0.5

      if fill instanceof Object
        context.save()
        context.translate origin.x, origin.y
        origin.x = origin.y = 0

      if fill or stroke
        context.beginPath()

      if fill
        context.fillStyle = fill
        context.fillRect origin.x, origin.y, size.width, size.height

      if stroke
        context.strokeStyle = stroke
        context.lineWidth = lineWidth if lineWidth
        context.strokeRect origin.x, origin.y, size.width, size.height

      if fill instanceof Object
        context.restore()

    super
