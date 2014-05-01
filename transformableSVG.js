function TransformableSVG(body, width, height, scaleInterval) {
	var self = this,
		scale = 1,
		translate = {x: 0, y: 0},
		translateCache = {x: 0, y: 0};
	self.scaleInterval = (typeof scaleInterval !== "undefined" ? scaleInterval : .1)
	self.width = (typeof width !== "undefined" ? width : 100);
	self.height = (typeof height !== "undefined" ? height : 100);

	var svg = body.append("svg")
		.attr("height", self.height)
		.attr("width", self.width)
		.on("mousedown", startMoving)
		.on("mouseup", stopMoving)
		.call( d3.behavior.zoom().on("zoom", reScale) );


	var transformationGroup = svg.append("g");

	self.transformAction = function() {
	};

	function transformGroup() {
		transformationGroup.attr("transform", "scale("+scale+") translate("+translate.x+", "+translate.y+")");

		self.transformAction();
	}

	transformGroup();

	function reScale() {
		// check if the drag-event is a mousewheel event
		if (d3.event.sourceEvent.type.indexOf("wheel") != -1){
			// init  a local variable for changed scale
	  		var scaleChange = self.scaleInterval;
	  		if (d3.event.sourceEvent.wheelDelta){
				if (d3.event.sourceEvent.wheelDelta < 0){
					scaleChange =  scaleChange * -1;
				}
			} else {
				if (d3.event.sourceEvent.detail < 0){
					scaleChange =  scaleChange * -1;
				}
			}
			// Re-Define the new global 'scale'
			scale = scale + scaleChange;
			transformGroup();
		}
	}

	// Action when mouse-movement has started
	function startMoving() {
		// save the starting position of the mouse
		var startingPosition = d3.mouse(this);
		// add mouse-move event listener to svg-container
		svg.on("mousemove", function() {
			// get current position of the mouse
			var currentPosition = d3.mouse(this);
			translate.x = translateCache.x + ( currentPosition[0] - startingPosition[0] ) / scale;
			translate.y = translateCache.y + ( currentPosition[1] - startingPosition[1] ) / scale;
			// Apply transformation to the major
			transformGroup();
		});
	}

	// Action when the mouse-movement has stopped
	function stopMoving() {
		// remove mouse-move event listener from the svg-container
		svg.on("mousemove", null);
		// Re-Define the globally defined old group position
		translateCache.x = translate.x;
		translateCache.y = translate.y;
	}

	self.getTransformationGroup = function() {
		return transformationGroup;
	};
	return self;
}