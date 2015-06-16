# Class: Shape

    _ = (o, p) -> Object.prototype.hasOwnProperty.call o, p

    module.exports = class Shape extends require '../lib/style'
      mapper: (data, context, callback) ->
        if (_ data, 'width') or (_ data, 'height')
          width = (parseFloat data['width']) or 0
          height = (parseFloat data['height']) or 0
          context.size = width:width, height:height

        if (_ data, 'top') or (_ data, 'left')
          x = (parseFloat data['left']) or 0
          y = (parseFloat data['top']) or 0
          context.origin = x:x, y:y

        if (_ data, 'background') then context.fill = data['background']

        if (_ data, 'fill') then context.fill = data['fill']

        if (_ data, 'color') then context.stroke = data['color']

        if (_ data, 'stroke') then context.stroke = data['stroke']

        if (_ data, 'line-width')
          context.line-width = (parseFloat data['line-width']) or 0

        if url = context.fill?.match /url\(\s*(["'']?)\s*(.+)\1\)/
          url = url[2]
          if repeat = context.fill.match /(norepeat|repeat-x|repeat-y)/
            repeat = repeat[1]
          else
            repeat = null

          fill = null

          (image = new Image).src = url
          image.onload = =>
            context.fill = document.createElement('canvas').getContext '2d'
              .createPattern image, repeat or 'repeat'
            callback?.call this, null, context

          image.onerror = (e) => callback?.call this, e, context

        else
          callback?.call this, null, context

