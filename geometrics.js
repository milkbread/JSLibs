// function to check if a point lies inside of a triangle
function pointInTriangle(p, a,b,c) {
    var as_x = p[0]-a[0];
	var as_y = p[1]-a[1];

	s_ab = (b[0]-a[0])*as_y-(b[1]-a[1])*as_x > 0;

	if((c[0]-a[0])*as_y-(c[1]-a[1])*as_x > 0 == s_ab) return false;

	if((c[0]-b[0])*(p[1]-b[1])-(c[1]-b[1])*(p[0]-b[0]) > 0 != s_ab) return false;

	return true;
}

function getExtentOfTriangle(triangle) {
	var extent = [Infinity, Infinity, -Infinity, -Infinity]; // minx, miny, maxx, maxy
	triangle.forEach(function(p) {
		if(p[0]<extent[0]) extent[0] = p[0];
		if(p[1]<extent[1]) extent[1] = p[1];
		if(p[0]>extent[2]) extent[2] = p[0];
		if(p[1]>extent[3]) extent[3] = p[1];
	});
	return extent;
}