 
class MyHeartSpline extends THREE.Object3D {
    constructor(gui,titleGui) {
    super();
    var material = new THREE.MeshPhongMaterial({color: 0x088A29});
    var x = 0, y = 0;

    // Creamos la figura
    var heartShape = new THREE.Shape()
    .moveTo( x + 25/25, y + 25/25 )
    .bezierCurveTo( x + 30/25, y + 25/25, x + 20/25, y, x, y )
    .bezierCurveTo( x - 30/25, y, x - 30/25, y + 35/25, x - 30/25, y + 35/25 )
    .bezierCurveTo( x - 30/25, y + 55/25, x - 25/25, y + 77/25, x + 25/25, y + 95/25 )
    .bezierCurveTo( x + 60/25, y + 77/25, x + 80/25, y + 55/25, x + 80/25, y + 35/25 )
    .bezierCurveTo( x + 80/25, y + 35/25, x + 80/25, y, x + 50/25, y )
    .bezierCurveTo( x + 35/25, y, x + 25/25, y + 25/25, x + 25/25, y + 25/25 );

    // Ruta de la columna
    var puntos = [];

    for(var i = 0; i < 5; i++) {
        puntos[i] = (new THREE.Vector3(( i - 4.5 ) * 10, THREE.Math.randFloat( -10, 10 ), THREE.Math.randFloat( -10, 10 )));
    }

    var ruta = new THREE.CatmullRomCurve3(puntos);

    var extrudeSettings = { steps: 200, bevelEnabled: false, extrudePath: ruta };

    this.heartSpline = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);

    this.columna = new THREE.Mesh(this.heartSpline, material);

    this.columna.position.set(15.0, 4.0, 0.0);
    this.columna.scale.set(0.25, 0.25, 0.25);
    this.columna.rotation.z = 1/2 * Math.PI;

    this.add(this.columna);
    }

    update () {
        this.columna.rotation.y += 0.01;
        this.columna.rotation.x += 0.005;
    }
}