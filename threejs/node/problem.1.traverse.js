

function calculate(w,r,h) {
	var W = w,
		R = r,
		H = h;
	var PI = Math.acos( -1 );
	var alpha, beta, gama;
	alpha = asin(H/W);
	gama = SINE_degree(W-R, alpha, R);
	beta = 180 - (alpha + gama);
	c = W/2;//SINE_size(W-R, alpha, beta);

	var retX = [], retY = [];
	var inputX = [];
	for(var i=0;i<R;i+=0.05) {
		var ret = ix(i,c,alpha,W,H);
		retX.push(ret.x);
		retY.push(ret.y);
		inputX.push(i);
		//console.log(i, ix(i,c,alpha,W,H));
	}

	for(var i=0;i<inputX.length;i++)
		console.log(Math.sqrt(R*R-inputX[i]*inputX[i])+';');

	function ix(x, c, alpha, W, H) {
		var L1 = COSINE_size(x, c, alpha);
		var ret = {x: null, y: null};
		ret.x = W*cos(alpha) - (W-x)/L1*(c*cos(alpha)-x) -x;
		ret.y = H - (W-x)/L1*c*sin(alpha);
		return ret;
	}


	function sin( theta ) {
		return Math.sin( theta / 180 * PI );
	}

	function asin( radio ) {
		return Math.asin( radio ) / PI * 180;
	}

	function cos( theta ) {
		return Math.cos( theta / 180 * PI );
	}

	function tan( theta ) {
		return Math.tan( theta / 180 * PI );
	}

	function atan( radio ) {
		return Math.atan( radio ) / PI * 180;
	}

	function acos( radio ) {
		return Math.acos( radio ) / PI * 180;
	}

	function SINE_degree( r, R, a ) {
		return asin( a / r * sin(R) );
	}

	function SINE_size( r, R, a ) {
		return sin(a) * r / sin(R);
	}

	function COSINE_size( a, b, C ) {
		return Math.sqrt( a*a + b*b - 2*a*b*cos(C) );
	}


}

calculate(6,2.5,5.3);

