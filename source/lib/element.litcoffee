# CLASS: Element
* Extends: [Evented][Evented]

    Event = require './event'
    localizeEventCoordinates = require '../helper/localize-event-coordinates'

    module.exports = class Element extends require './evented'

Visual Element

## CONSTRUCTOR

### new Element(args)
* Returns: [Element][Element]

Creates a new Element instance
      
      constructor: (args = {}) ->
        super

optionally setting **origin**, **size**, **state** and **style**.

        for key in ['origin', 'size', 'state', 'style']
          this[key] = args[key] if args[key]

Copy **styles** and **states** if they were passed in **args**

        (@styles ||= {}) and @styles[key] = value for key, value of args.styles
        (@states ||= {}) and @states[key] = value for key, value of args.states

Register capturing and non-capturing validation listeners. Those will stop the
event propagation if the event **type** is not enabled.

        for name in ['mousemove', 'mousedown', 'mouseup', 'update', 'render']
          do (name) =>
            @addListener name, ((e) -> e.stop() unless @events?[name]), yes
            @addListener name, ((e) -> e.stop() unless @events?[name]), no

Register capturing and non-capturing extendable listeners. Those listeners
can be extended on subclasses.

        for name in ['mousemove', 'mousedown', 'mouseup']
          @addListener name, this["#{name}CaptureListener"], yes
          @addListener name, this["#{name}Listener"], no

### PARAMETERS
**args**
* Type: [Object][Object] - constructor arguments

**args.origin**
* Type: [Object][Object] - element origin
* Optional

**args.origin.x**
* Type: [Number][Number] - element origin x coordinate

**args.origin.y**
* Type: [Number][Number] - element origin y coordinate

**args.size**
* Type: [Object][Object] - element size
* Optional

**args.size.width**
* Type: [Number][Number] - element width

**args.size.height**
* Type: [Number][Number] - element height

**args.state**
* Type: [String][String] - the name of currently active state
* Optional

**args.style**
* Type: [String][String] - the name of currently active style
* Optional

**args.state**
* Type: [Object][Object] - collection of named states
* Optional

**args.style**
* Type: [Object][Object] - collection of named styles
* Optional

---

## METHODS

### #mousemoveCaptureListener(event)
* Returns: [Element][Element]

Extendable default mousemoveCaptureListener

      mousemoveCaptureListener: (event) ->

Store the event in runtime for later and localize event coordinates

        @___runtime.mousemoveEvent = event
        localizeEventCoordinates event, @origin
        return this

#### PARAMETERS
**event**
Type: [Event][Event]

---

### #mousedownCaptureListener(event)
* Returns: [Element][Element]

Extendable default mousedownCaptureListener

      mousedownCaptureListener: (event) ->

Store the event in runtime for later and localize event coordinates

        @___runtime.mousedownEvent = event
        localizeEventCoordinates event, @origin
        return this

#### PARAMETERS
**event**
Type: [Event][Event]

---

### #mouseupCaptureListener(event)

Extendable default mouseupCaptureListener
      
      mouseupCaptureListener: (event) ->

Store the event in runtime for later and localize event coordinates

        @___runtime.mouseupEvent = event
        localizeEventCoordinates event, @origin
        return this

#### PARAMETERS
**event**
Type: [Event][Event]

---

### mousedownListener(event)
* Returns: [Element][Element]

Extendable mousedownListener stub

      mousedownListener: -> this

#### PARAMETERS
**event**
Type: [Event][Event]      

---

### mouseupListener(event)
* Returns: [Element][Element]

Extendable mouseupListener stub

      mouseupListener: -> this

#### PARAMETERS
**event**
Type: [Event][Event]

---

### mousemoveListener(event)
* Returns: [Element][Element]

Extendable mousemoveListener stub

      mousemoveListener: -> this

#### PARAMETERS
**event**
Type: [Event][Event]

---
### #update(args)
* Returns: [Element][Element]

Extendable default updater.

      update: (args) ->

Broadcasts update event to itself if update event is enabled

        if @events?.update then @broadcastEvent new Event
          type:'update', target:this, args:args
        return this

#### PARAMETERS
**args**
Type: [Object][Object] - arbitrary data for update

---
### #render(context)
* Returns: [Element][Element]

Extendable default renderer.

      render: (context) ->

Broadcasts render event to itself if render event is enabled, then
render is called for every child element with the same context argument

        if @events?.render then @broadcastEvent new Event
          type:'render', target:this, context:context, args:args
        if children = @children then (child.render context for child in children)
        return this

#### PARAMETERS
**context**
Type: [Object][Object] - a context to render in

[Element]: ./element.litcoffee
[Evented]: ./evented.litcoffee
[Event]: ./event.litcoffee
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
