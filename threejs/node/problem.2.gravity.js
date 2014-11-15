var A = 0;
var H = 70;
var R = 40;
var PI = Math.acos(-1);
var core = coreTransform(H,R);
main();


function main() {
	var WArr = [80.7,78.1,83.1,77.9,85.3,86.1,76.8,89.4,76.7,76.6,98.2,76.6,100,76.7,103.3,76.9,77,108.8,77.1,111.3,77.4,116.7,77.5,77.7,77.8,78,124.6,78.3,133.9,78.8,134.4,136.7,79.2,79.4,79.7,79.8,80.1,80.2,80.5,81.1,81.5,82.3,83.3,83.5,83.7,85.3,85.4,86,86.1,87.3,88.7,89.7,91.4,91.8,92.3,93.8,96.2,98.4,109.7,111.1,112.6,114.2,119.5,133.1];
	var rArr = [0.017,0.062,0.064,0.071,0.098,0.109,0.149,0.149,0.164,0.188,0.231,0.236,0.245,0.262,0.269,0.293,0.305,0.305,0.316,0.32,0.343,0.35,0.351,0.366,0.373,0.386,0.389,0.404,0.429,0.431,0.431,0.44,0.45,0.459,0.472,0.476,0.488,0.492,0.503,0.524,0.537,0.561,0.588,0.593,0.598,0.634,0.636,0.648,0.65,0.672,0.695,0.71,0.733,0.738,0.744,0.761,0.785,0.804,0.872,0.878,0.884,0.89,0.907,0.937];

	var barCenterHeight = [];
	var barDegree = [];
	var roundCenterHeight = H * PI * R * R / 4; 

	for(var i=0;i<WArr.length;i++) {
		var W = WArr[i];
		var r = rArr[i];

		var gravity = calcGravity(W,r);

		var delta = 0.1;
		var CenterHeight = 0;
		var fail = false;
		for(var j=0;j<R;j+=delta ) {
			var x = Math.sqrt(R*R-(R-j)*(R-j));
			var len = W-A-x;
			var sinBeta = gravity.s(x);
			

			CenterHeight += (H - len * sinBeta) * len * delta;
			if ( len * sinBeta>H ) {
				fail = true;
				break;
			}

			/*if ( len * sinBeta>H ) {
				fail = true;
				break;
			}*/
		}
		var beta = gravity.b(R);

		barDegree[i] = fail ? 0: beta/PI*180;
		barCenterHeight[i] = (fail|| barDegree[i]<90 ) ? 0: (CenterHeight + roundCenterHeight);
		
	}

	for(var i=0;i<WArr.length;i++) 
		console.log(barCenterHeight[i]+',');
	console.log('\n\n\n\n\n\n');
	for(var i=0;i<WArr.length;i++) 
		console.log(barDegree[i]+',');

}













function calcGravity(W,r) {
	var alpha = Math.asin( H/(W-A) );

	return {
		s: function (x) {
			return core.sinBeta(W,alpha,x,A,r);
		},
		b: function (x) {
			return core.beta(W,alpha,x,A,r);
		},
		c: function (x) {
			return core.cosBeta(W,alpha,x,A,r);
		}
	};
}



function coreTransform(H,R) {
	//变量 alpha, x, A
	var ret = {
		beta: function (W,alpha, x, A, r) {
			var s = ret.sinBeta(W,alpha,x,A,r);
			var c = ret.cosBeta(W,alpha,x,A,r);
			if(s>=0 && c>=0)
				return PI-Math.asin( ret.sinBeta(W,alpha,x,A, r) );
			else if(s>=0)
				return Math.asin( ret.sinBeta(W,alpha,x,A, r) );
			else if(s<=0 && c>=0)
				return PI-Math.asin( ret.sinBeta(W,alpha,x,A, r) );
			else if(s<=0)
				return Math.asin( ret.sinBeta(W,alpha,x,A, r) );
		},
		sinBeta: function (W,alpha, x, A, r) {
			var W_A = W - A;
			return (W_A)*sin(alpha)*r/ret.L1(W,alpha, x, A, r);
		},
		cosBeta: function (W,alpha, x, A, r) {
			var W_A = W - A;
			return (x-W_A*r*cos(alpha))/ret.L1(W,alpha, x, A, r);
		},
		L1: function (W,alpha, x, A, r) {
			var W_A = W - A;
			return Math.sqrt(x*x+W_A*W_A*r*r-2*x*W_A*r*cos(alpha));
		},
		retX: function (W,alpha, x, A, r) {
			var W_A = W - A;
			return W_A*cos(alpha)-x-(W_A-x)*ret.cosBeta(W,alpha, x, A, r);
		},
		retY: function (W,alpha, x, A, r) {
			var W_A = W - A;
			return W_A*sin(alpha)-(W_A-x)*ret.sinBeta(W,alpha, x, A, r);
		}
	};
	return ret;
	function sin(t) { return Math.sin(t);}
	function cos(t) { return Math.cos(t);}
}