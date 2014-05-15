// function to check if a point lies inside of a triangle
function pointInTriangle(p, a,b,c) {
    var as_x = p[0]-a[0];
	var as_y = p[1]-a[1];

	s_ab = (b[0]-a[0])*as_y-(b[1]-a[1])*as_x > 0;

	if((c[0]-a[0])*as_y-(c[1]-a[1])*as_x > 0 == s_ab) return false;

	if((c[0]-b[0])*(p[1]-b[1])-(c[1]-b[1])*(p[0]-b[0]) > 0 != s_ab) return false;

	return true;
}
