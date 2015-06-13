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

      if lineWidth % 2 then origin.x += 0.5

      if fill or stroke
        if fill instanceof Object
          context.save()
          context.translate origin.x, origin.y
          origin.x = origin.y = 0

        context.beginPath()
        context.moveTo.apply context, origin
        context.lineTo origin[0]+size[0], origin[1]
        context.lineTo origin[0]+size[0], origin[1]+size[1]
        context.lineTo origin[0], origin[1]+size[1]
        context.lineTo.apply context, origin

      if fill
        context.fillStyle = fill
        context.fill()

      if stroke
        context.strokeStyle = stroke
        context.lineWidth = lineWidth or 1
        context.stroke()

      if fill instanceof Object
        context.restore()

    super
