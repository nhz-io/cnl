# Function: findPointZones

    module.exports = (x, y, zones) ->
      result = {}
      result[name] = $ for name, $ of zones when (
        $[0] <= x <= ($[0] + $[2]) and $[1] <= y <= ($[1] + $[3])
      )
      return result
