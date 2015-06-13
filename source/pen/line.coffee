module.exports = class Line extends require '../lib/pen'
  constructor: (args = {}) ->
    @start = args.start or x:0, y:0
    @end = args.end or x:0, y:0
    {@stroke, @lineWidth} = args
    {@fill, @stroke, @lineWidth} = args
    return super

  draw: (context, args = {}) ->
    if context
      start = args.start or @start or x:0, y:0
      end = args.end or @end or x:0, y:0
      stroke = args.stroke or @stroke
      lineWidth = args.lineWidth or @lineWidth

      if lineWidth % 2
        start.x += 0.5
        end.x += 0.5

      if stroke then context.beginPath()

      context.moveTo.apply context, start
      context.lineTo.apply context, end

      if stroke
        context.strokeStyle = stroke
        context.lineWidth = lineWidth if lineWidth
        context.stroke()

    super
