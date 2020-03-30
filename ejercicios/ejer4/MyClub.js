 
class MyClub extends THREE.Object3D {
    constructor(gui,titleGui) {
    super();

    // Pie de la figura
    this.points = [];

    this.points.push(new THREE.Vector3 (0.0,0.0,0.0));
    this.points.push(new THREE.Vector3 (0.25,0.0,0.0));
    this.points.push(new THREE.Vector3 (0.1,0.25,0.0));
    this.points.push(new THREE.Vector3 (0.0,0.75,0.0));

    var geoPie = new THREE.LatheGeometry(this.points);
    var material = new THREE.MeshPhongMaterial({color: 0x0208ca});

    this.pie = new THREE.Mesh(geoPie, material);

    // Creamos la figura
    var clubShape = new THREE.Shape()
    .moveTo( 1.5, 0.0 )
    .bezierCurveTo( -4.5, -3.7, -3, 5.3, 0, 3 )
    .bezierCurveTo( -1.4, 7.5, 4.4, 7, 3, 3)
    .bezierCurveTo( 6.5, 4.3, 7.0, -3.7, 1.5, 0.0);

    var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };

    var geoClub = new THREE.ExtrudeBufferGeometry(clubShape, extrudeSettings);
    this.trebol = new THREE.Mesh(geoClub, material);
    this.pie.scale.set(3, 3, 3);
    this.pie.position.set(1.5, -3.0, 0.0);

    this.nodo = new THREE.Object3D();
    this.nodo.position.set(-5.0, -4.5, 0.0);
    this.nodo.add(this.trebol);
    this.nodo.add(this.pie);
    this.nodo.scale.set(0.5,0.5,0.5);

    this.spade = new THREE.Object3D();
    this.spade.add(this.nodo);

    this.add(this.spade);
    }

    update () {
    }
}