module.exports = class Line extends require '../lib/pen'
  constructor: (args = {}) ->
    @origin = args.origin or @origin or x:0, y:0
    @font = args.font or @font
    @fill = args.fill or @fill
    @stroke = args.stroke or @stroke
    @lineWidth = args.lineWidth or @lineWidth
    @baseline = args.baseline or @baseline
    return super

  draw: (context, args = {}) ->
    if context and text = args.text
      origin = args.origin or @origin or x:0, y:0
      font = args.font or @font
      fill = args.fill or @fill
      stroke = args.stroke or @stroke
      baseline = args.baseline or @baseline or 'top'

      if fill or stroke then context.baseline = baseline

      if fill instanceof Object
        context.save()
        context.translate origin.x, origin.y
        origin.x = origin.y = 0

      if font then context.font = font

      if fill
        context.fillStyle = fill
        context.fillText text, origin.x, origin.y

      if stroke
        context.lineWidth = lineWidth if lineWidth
        context.strokeStyle = stroke
        context.strokeText text, origin.x, origin.y
