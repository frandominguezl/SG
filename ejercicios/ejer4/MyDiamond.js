 
class MyDiamond extends THREE.Object3D {
    constructor(gui,titleGui) {
    super();
    
    var diamondShape = new THREE.Shape()
    .moveTo(0, 0)
    .lineTo(2.0, 4.0)
    .lineTo(6.0, 4.0)
    .lineTo(4.0, 1.0);

    // Variables para la extrusión
    var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1 };

    var geoDiamante = new THREE.ExtrudeBufferGeometry(diamondShape, extrudeSettings);

    this.diamante = new THREE.Mesh(geoDiamante, new THREE.MeshPhongMaterial({color: 0xff0000}));

    this.diamante.position.set(-4.0, 2.0, 0.0);
    this.diamante.rotation.set(0.0, 0.0, 1.0);
    this.diamante.scale.set(0.75, 0.75, 0.75);

    this.add(this.diamante);
    }

    update () {
    }
}