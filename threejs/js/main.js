
var container, stats;

var camera, controls, scene, renderer;

var cube, plane;

var group = [];

var PI = Math.acos(-1);

init();
animate();


function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';

    container.appendChild( info );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 150;
    camera.position.set(-74,71,108);
    //水平视角camera.position.set(-148.85752071033144,0,-4.720488068786309);
    controls = new THREE.OrbitControls( camera );

    scene = new THREE.Scene();

    var light = new THREE.PointLight( 0xffffff, 1.5 );
    light.position.set( 1000, 1000, 2000 );
    scene.add( light );
    

    renderer = new THREE.WebGLRenderer( { antialias: true } ); // WebGLRenderer CanvasRenderer
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.domElement.id = "threejsCanvas";
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    bindClick();
}

function bindClick() {

    //桌面配置函数
    var product = {
        formGeneral: function (W, r, R, H) {
            var depth, A;
            W = W || 106.88;
            r = r || 0.357;
            R = R || 40;
            depth = 3;
            H = (H || 70)-depth;
            A = Math.sqrt(R*R-(R-1.25)*(R-1.25));

            calcDetail(function (detail, A) {
                for(var i=0;i<R/2.5*2;i++)
                {
                    var w;
                    if( i<R/2.5) {
                        w = 2*Math.sqrt(R*R-(R-i*2.5-1.25)*(R-i*2.5-1.25));
                    }
                    else {
                        w = 2*Math.sqrt(-(R-(i+1)*2.5+1.25)*(R-(i+1)*2.5+1.25)+R*R);
                    }

                    detail.push({
                        sX: w,
                        sY: depth,
                        sZ: 2.5,
                        pX: 0,
                        pY: 0,
                        pZ: -R+2.5*i,
                        len: W-w/2,
                        coreX: w/2-A,
                        extra: 0
                    });
                }
                return coreTransform(W,H,R,r,depth);
            }, A,W,H,R,r,depth);
        },
        formRhombus: function () {
            var A = 2;
            var W = 83.76,
                depth = 3,
                H = 73-depth,
                R = 40,
                r = 0.566;
            calcDetail(function (detail, A) {
                for(var i=0;i<R/2*2;i++)
                {
                    var w;
                    if( i<R/2) {
                        w = 2*((i+1)*2);
                    }
                    else {
                        w = 2*(2*R-i*2);
                    }

                    detail.push({
                        sX: w ,
                        sY: depth,
                        sZ: 2,
                        pX: 0,
                        pY: 0,
                        pZ: -R+2*i,
                        len: W-w/2,
                        coreX: w/2-A,
                        extra: 0
                    });
                }
                return coreTransform(W,H,R,r,depth);
            }, A,W,H,R,r,depth);
        },
        formRhombusRound: function () {
            var A = 2.5;
            var W = 58.2,
                depth = 3,
                H = 53-depth,
                R = 25,
                r = 0.511;
            calcDetail(function (detail, A) {
                for(var i=0;i<20;i++)
                {
                    var w;
                    var wAdd;
                    if (i==0 || i==19) {
                        w = 2*A;
                        wAdd =0;
                    }
                    else if( i<=9) {
                        w = 2*((i+1)*2.5);
                    }
                    else {
                        w = 2*(50-i*2.5);
                    }

                    switch( parseInt(i/10) ? (19-i) : i){
                        case 0: wAdd = 0;break;
                        case 1: wAdd = 3.25;break;
                        case 2: wAdd = 5.5;break;
                        case 3: wAdd = 7;break;
                        case 4: wAdd = 8;break;
                        case 5: wAdd = 7.75;break;
                        case 6: wAdd = 6.75;break;
                        case 7: wAdd = 4.5;break;
                        case 8: wAdd = 2.5;break;
                        case 9: wAdd = 0;break;
                    }

                    detail.push({
                        sX: w ,
                        sY: depth,
                        sZ: 2.5,
                        pX: 0,
                        pY: 0,
                        pZ: -25+2.5*i,
                        len: W-w/2,
                        coreX: w/2-A,
                        extra: -wAdd
                    });
                }
                return coreTransform(W,50,25,r,depth);
            }, A,W,H,R,r,depth);
        }, 
        formEllipse: function () {
            
            var W = 111.36,
                depth = 3,
                H = 83-depth,
                R = 80/2,
                r = 0.579;
            var A = 1.5*Math.sqrt(R*R-(R-1.25)*(R-1.25));
            var ellipseRadio = 1.5;
            calcDetail(function (detail, A) {
                for(var i=0;i<R/2.5*2;i++)
                {
                    var w;
                    if (i==0 || i==R/2.5*2-1) {
                        w = 2*A;
                    }
                    else if( i<R/2.5) {
                        w = 2*Math.sqrt(R*R-(R-i*2.5)*(R-i*2.5));
                        //w = 2*((i+1)*2.5);
                    }
                    else {
                        w = 2*Math.sqrt(-(R-(i+1)*2.5)*(R-(i+1)*2.5)+R*R);
                        //w = 2*(50-i*2.5);
                    }
                    w *= ellipseRadio;
                    detail.push({
                        sX: w,
                        sY: depth,
                        sZ: 2.5,
                        pX: 0,
                        pY: 0,
                        pZ: -R+2.5*i,
                        len: W-w/2,
                        coreX: w/2-A,
                        extra: 0
                    });
                }
                return coreTransform(W,H,R,r,depth);
            }, A,W,H,R,r,depth);
        }
    };

    $('.product').on('click', function () {
        var _self = this;
        var W = getData(_self, 'w'),
            r = getData(_self, 'r'),
            R = getData(_self, 'rr'),
            H = getData(_self, 'h');
        product['formGeneral'] && product['formGeneral'](W,r,R,H);
        console.log(W,r,R,H);
        function getData(self, attr) { return -(-($(self).data(attr))) }
    });
    $('.newProduct').on('click', function () {
        var role = $(this).data('role');
        product[role] && product[role]();
    });
}

function createGeometry(sX,sY,sZ,pX,pY,pZ,color,cylinder) {

    var g = new THREE.Object3D();
    var mesh1 = null;
    var mesh2 = null;
    color = color || 0x844d26;
    if (cylinder) {
        mesh1 = new THREE.Mesh( new THREE.CylinderGeometry(sY,sY,sZ,32), new THREE.MeshBasicMaterial( { color: color, wireframe: false} ));
        mesh1.rotation.set(PI/2,0,0);
    }
    else {
        mesh1 = new THREE.Mesh( new THREE.BoxGeometry(sX,sY,sZ), new THREE.MeshBasicMaterial( { color: color, wireframe: false} ));
        mesh2 = new THREE.Mesh( new THREE.BoxGeometry(sX,sY,sZ),new THREE.MeshBasicMaterial( { color: 0x000, wireframe: true} ) );
    }

    mesh1 && mesh1.position.set(pX,pY,pZ);
    mesh2 && mesh2.position.set(pX,pY,pZ);

    mesh1 && g.add(mesh1);
    mesh2 && g.add(mesh2);

    return g;
}


//木条位置计算 和 动画计算
function calcDetail(getW, A,W,H,R,r,depth) {
    while ( window.group.length ) {
        scene.remove(group[0]);
        group.shift();
    }
    var detail = [];
    A = A || 5;
    var core = getW(detail, A,r);

    //创建 圆形桌面 group
    var desktopGroup = new THREE.Object3D();
    for(var i=0;i<detail.length;i++) {
        var d = detail[i];
        desktopGroup.add( createGeometry(d.sX,d.sY,d.sZ,d.pX,d.pY,d.pZ,0x9D5E32) );
    }
    scene.add(desktopGroup);

    //创建 长条
    var dynamicGroup_1 = new THREE.Object3D();
    for(var i=0;i<detail.length;i++) {
        var d = detail[i];
        if ( i==0 ) {
            var g = new THREE.Object3D();
            g.add(  createGeometry(d.len+d.extra,d.sY,d.sZ,-W+d.len/2-d.extra/2,d.pY,d.pZ)  );
            g.add(  createGeometry(0.55,0.55,2*R+2,-(W-(d.len+d.extra)*(1-r)),d.pY,-1.25,0xbbbbbb,true)  );
            dynamicGroup_1.add(g);
        }
        else
            dynamicGroup_1.add( createGeometry(d.len+d.extra,d.sY,d.sZ,-W+d.len/2-d.extra/2,d.pY,d.pZ) );
    }
    scene.add(dynamicGroup_1);

    var dynamicGroup_2 = new THREE.Object3D();
    for(var i=0;i<detail.length;i++) {
        var d = detail[i];
        if ( i==0 ) {
            var g2 = new THREE.Object3D();
            g2.add(  createGeometry(d.len+d.extra,d.sY,d.sZ,W-d.len/2+d.extra/2,d.pY,d.pZ)  );
            g2.add(  createGeometry(0.55,0.55,2*R+2,(W-(d.len+d.extra)*(1-r)),d.pY,-1.25,0xbbbbbb,true)  );
            dynamicGroup_2.add(g2);
        }
        else
            dynamicGroup_2.add( createGeometry(d.len+d.extra,d.sY,d.sZ,W-d.len/2+d.extra/2,d.pY,d.pZ) );
    }
    scene.add(dynamicGroup_2);

    group.push(desktopGroup);
    group.push(dynamicGroup_1);
    group.push(dynamicGroup_2);

    var degree = 0;
    var async = false;
    var rotateHandler = function (reset, degInterval) {
        if ( Math.sin((degree+degInterval)/180*PI)>H/(W-A) && degInterval>0 ) {
            async = false;
            return;
        }

        if (degree <  1*Math.abs(degInterval) && degInterval<0) {
            reset = true;
            degree = -degInterval;//0.000000001;
        }

        async = true;
        degree += degInterval;
        var objs = dynamicGroup_1.children;
        for(var i=0;i<objs.length;i++) {
            var o = objs[i];
            var d = detail[i];

            var deg = core.beta(PI/2/90*degree, d.coreX, A);
            if(false && degree>45)deg += Math.atan(d.sY/core.L1(PI/2/90*degree, d.coreX, A)/2);
            o.rotation.set(0,0,deg);
            o.position.set((d.sX)*(Math.cos(deg)-1)/2-d.sY/2*Math.sin(deg),(d.sX)*Math.sin(deg)/2-d.sY/2*(1-Math.cos(deg)),0);
        }

        var objs = dynamicGroup_2.children;
        for(var i=0;i<objs.length;i++) {
            var o = objs[i];
            var d = detail[i];

            var deg = core.beta(PI/2/90*degree, d.coreX, A);
            if(false && degree>45)deg += Math.atan(d.sY/core.L1(PI/2/90*degree, d.coreX, A)/2);
            o.rotation.set(0,0,-deg);
            o.position.set(-(d.sX)*(Math.cos(-deg)-1)/2+d.sY/2*Math.sin(deg),-(d.sX)*Math.sin(-deg)/2-d.sY/2*(1-Math.cos(-deg)),0);
        }


        render();


/*                  //输出特定角度 参数
        var aaaaa = Math.asin(H/(W-A))/PI*180;

        consoleInfo(aaaaa*1/4);
        consoleInfo(aaaaa*2/4);
        consoleInfo(aaaaa*3/4);
        consoleInfo(aaaaa*4/4);

        function consoleInfo(degr) {
            if ( Math.abs(degree-degr)<Math.abs(degInterval)/2 ) {
                for (var i=0;i<objs.length;i++) {
                    var o = objs[i];
                    var d = detail[i];
                    console.log(i,degr,d.pZ,core.retX(PI/2/90*degr, d.coreX, A),core.retY(PI/2/90*degr, d.coreX, A));
                }
            }
        }*/

        //输出最终情况下 加工尺寸
        /*var aaaaa = Math.asin(H/(W-A))/PI*180;
        slotInfo(aaaaa*4/4);

        function slotInfo(degr) {
            if ( Math.abs(degree-degr)<Math.abs(degInterval) ) {
                for (var i=0;i<objs.length;i++) {
                    var o = objs[i];
                    var d = detail[i];
                    console.log(i,degr,(W-A)*r+A-d.sX/2,core.L1(PI/2/90*degr, d.coreX, A),core.L1(PI/2/90*degr, d.coreX, A)-((W-A)*r+A-d.sX/2),d.len);
                }
            }
        }*/

        if(reset) {
            async = false;
            return;
        }
        setTimeout( function(){rotateHandler(reset,degInterval)},17 );
    };


    render();


    $('.event').off('click').on('click', function () {
        var role = $(this).data('role');
        if ( async ) return;
        switch(role) {
            case 'animate':
                setTimeout( function(){rotateHandler(false,0.5)},17 );
                break;
            case 'reset':
                setTimeout( function(){rotateHandler(false,-0.5)},17 );
                break;
            case 'plus':
                setTimeout( function(){rotateHandler(true,0.5)},17 );
                break;
            case 'minus':
                setTimeout( function(){rotateHandler(true,-0.5)},17 );
                break;
            case 'plus8':
                setTimeout( function(){rotateHandler(true,Math.asin(H/(W-A))/PI*180/8)},17 );
                break;
            case 'minus8':
                setTimeout( function(){rotateHandler(true,-Math.asin(H/(W-A))/PI*180/8)},17 );
                break;
            default:break;
        }

    });

}

function coreTransform(W,H,R,r) {
    //变量 alpha, x, A
    var ret = {
        beta: function (alpha, x, A) {
            var s = ret.sinBeta(alpha,x,A);
            var c = ret.cosBeta(alpha,x,A);
            if(s>=0 && c>=0)
                return PI-Math.asin( ret.sinBeta(alpha,x,A) );
            else if(s>=0)
                return Math.asin( ret.sinBeta(alpha,x,A) );
            else if(s<=0 && c>=0)
                return PI-Math.asin( ret.sinBeta(alpha,x,A) );
            else if(s<=0)
                return Math.asin( ret.sinBeta(alpha,x,A) );
        },
        sinBeta: function (alpha, x, A) {
            var W_A = W - A;
            return (W_A)*sin(alpha)*r/ret.L1(alpha, x, A);
        },
        cosBeta: function (alpha, x, A) {
            var W_A = W - A;
            return (x-W_A*r*cos(alpha))/ret.L1(alpha, x, A);
        },
        L1: function (alpha, x, A) {
            var W_A = W - A;
            return Math.sqrt(x*x+W_A*W_A*r*r-2*x*W_A*r*cos(alpha));
        },
        retX: function (alpha, x, A) {
            var W_A = W - A;
            //console.log('  ', W_A*cos(alpha),x,(W_A-x)*ret.cosBeta(alpha, x, A))
            return W_A*cos(alpha)-x+(W_A-x)*ret.cosBeta(alpha, x, A);
        },
        retY: function (alpha, x, A) {
            var W_A = W - A;
            return W_A*sin(alpha)-(W_A-x)*ret.sinBeta(alpha, x, A);
        }
    };
    return ret;
    function sin(t) { return Math.sin(t);}
    function cos(t) { return Math.cos(t);}
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    controls.update();

    render();
/*  stats.update();
*/
}

function render() {

    renderer.render( scene, camera );

}