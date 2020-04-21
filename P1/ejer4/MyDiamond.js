 
class MyDiamond extends THREE.Object3D {
    constructor(gui,titleGui) {
    super();
    
    var diamondShape = new THREE.Shape()
    .moveTo(0, 0)
    .lineTo(2.0, 4.0)
    .lineTo(0.0, 8.0)
    .lineTo(-2.0, 4.0);

    // Variables para la extrusión
    var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };

    var geoDiamante = new THREE.ExtrudeBufferGeometry(diamondShape, extrudeSettings);
    
    // Primera parte del diamante
    this.diamante = new THREE.Mesh(geoDiamante, new THREE.MeshPhongMaterial({color: 0xff0000}));
    this.diamante.scale.set(0.7, 0.7, 0.7);
    this.diamante.position.set(0.0, -2.5, 0.0);
    
    // Primer nodo
    this.nodo = new THREE.Object3D();
    this.nodo.position.set(-4.0, 3.5, 0.0);
    this.nodo.add(this.diamante);
    
    // Nodo final
    this.nodofinal = new THREE.Object3D();
    this.nodofinal.add(this.nodo);

    this.add(this.nodofinal);
    }

    update () {
        this.nodofinal.rotation.z += 0.01;
        this.nodo.rotation.z -= 0.01;
        this.diamante.rotation.y += 0.015;
    }
}