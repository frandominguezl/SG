 
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
    
    // Nodo inicial
    var geoClub = new THREE.ExtrudeBufferGeometry(clubShape, extrudeSettings);
    this.trebol = new THREE.Mesh(geoClub, material);
    this.trebol.scale.set(0.5, 0.5, 0.5);
    this.pie.scale.set(2, 2, 2);
    this.pie.position.set(0.7, -2.0, 0.0);

    this.nodoInicial = new THREE.Object3D();
    this.nodoInicial.add(this.trebol);
    this.nodoInicial.add(this.pie);
    this.nodoInicial.position.set(-0.5, -0.5, 0.0);
    
    // Segundo nodo
    this.nodo2 = new THREE.Object3D();
    this.nodo2.position.set(-5.0, -4.5, 0.0);
    this.nodo2.add(this.nodoInicial);

    this.club = new THREE.Object3D();
    this.club.add(this.nodo2);

    this.add(this.club);
    }

    update () {
        this.club.rotation.z += 0.01;
        this.nodo2.rotation.z -= 0.01;
        this.nodoInicial.rotation.y += 0.015;
    }
}