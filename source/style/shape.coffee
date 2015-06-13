_ = (o, p) -> Object.prototype.hasOwnProperty.call o, p

module.exports = class Shape extends require '../lib/style'
  mapper: (data, context, callback) ->
    if (_ data, 'width') or (_ data, 'height')
      context.size = width:(data.width or 0), height:(data.height or 0)

    if (_ data, 'top') or (_ data, 'left')
      context.origin = x:(data.x or 0), y:(data.y or 0)

    if (_ data, 'background') then context.fill = data['background']

    if (_ data, 'fill') then context.fill = data['fill']

    if (_ data, 'color') then context.stroke = data['color']

    if (_ data, 'stroke') then context.stroke = data['stroke']

    if (_ data, 'line-width') then context.line-width = data['line-width']

    if url = context.fill?.match /url\(\s*(["'']?)\s*(.+)\1\)/
      if repeat = context.fill.match /norepeat|repeat-x|repeat-y/
        repeat = repeat[0]
      else
        repeat = null

      fill = null

      (image = new Image).src = url[2]
      image.onload = =>
        context.fill = document.createElement('canvas').getContext '2d'
          .createPattern image, repeat or 'repeat'
        callback?.call this, null, context

      image.onerror = (e) => callback?.call this, e, context

    else
      callback?.call this, null, context

