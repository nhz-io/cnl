# CLASS: Renderer
* Extends: [Base][Base]

An animator class based on `requestAnimationFrame`.
Runs an animation callback in a loop, around 60 times per second.c
    
    module.exports = class Renderer extends require './base'      

## CONSTRUCTOR

### #new Renderer()
* Returns: [Renderer][Renderer]

---

## PROPERTIES
### #active
* Type: [Boolean][Boolean] - active animation flag

---

## METHODS
### #start(callbac)
* Returns: [Renderer][Renderer]



      start: (callback) ->
        if @active then @stop()
        @active = true
        @loop callback
        return this

      stop: ->
        @active = false
        if @frameId then cancelAnimationFrame @frameId
        @frameId = null
        return this

      loop: (callback = ->) ->
        if @active
          @frameId = requestAnimationFrame (time) =>
            @thisFrameTime = time
            @previousFrameTime ||= time
            elapsed = @thisFrameTime - @previousFrameTime
            if @active
              callback time, elapsed
              @loop callback
            else
              cancelAnimationFrame @frameId
        return this
