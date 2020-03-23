 
class MySpade extends THREE.Object3D {
    constructor(gui,titleGui) {
    super();

    var x = 0, y = 0;

    // Pie de la figura
    this.points = [];

    this.points.push(new THREE.Vector3 (0.0,0.0,0.0));
    this.points.push(new THREE.Vector3 (0.25,0.0,0.0));
    this.points.push(new THREE.Vector3 (0.1,0.25,0.0));
    this.points.push(new THREE.Vector3 (0.0,0.75,0.0));

    var geoPie = new THREE.LatheGeometry(this.points);
    var material = new THREE.MeshPhongMaterial({color: 0xff0000});

    this.pie = new THREE.Mesh(geoPie, material);

    // Creamos la figura
    var spadeShape = new THREE.Shape()
    .moveTo( x + 25/25, y + 25/25 )
    .bezierCurveTo( x + 30/25, y + 25/25, x + 20/25, y, x, y )
    .bezierCurveTo( x - 30/25, y, x - 30/25, y + 35/25, x - 30/25, y + 35/25 )
    .bezierCurveTo( x - 30/25, y + 55/25, x - 25/25, y + 77/25, x + 25/25, y + 95/25 )
    .bezierCurveTo( x + 60/25, y + 77/25, x + 80/25, y + 55/25, x + 80/25, y + 35/25 )
    .bezierCurveTo( x + 80/25, y + 35/25, x + 80/25, y, x + 50/25, y )
    .bezierCurveTo( x + 35/25, y, x + 25/25, y + 25/25, x + 25/25, y + 25/25 );

    var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1 };

    var geoSpade = new THREE.ExtrudeBufferGeometry(spadeShape, extrudeSettings);
    this.pica = new THREE.Mesh(geoSpade, material);
    this.pie.scale.set(2, 2, 2);
    this.pie.position.set(1.0, -0.5, 0.0);

    this.nodo = new THREE.Object3D();
    this.nodo.position.set(2.0, 2.0, 0.0);
    this.nodo.add(this.pica);
    this.nodo.add(this.pie);

    this.spade = new THREE.Object3D();
    this.spade.add(this.nodo);

    this.add(this.spade);
    }

    update () {
    }
}