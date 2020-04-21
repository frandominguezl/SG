 
class MyHeart extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    var x = -1, y = -1;

    // Creamos la figura
    var heartShape = new THREE.Shape()
    .moveTo( x + 25/25, y + 25/25 )
    .bezierCurveTo( x + 30/25, y + 25/25, x + 20/25, y, x, y )
    .bezierCurveTo( x - 30/25, y, x - 30/25, y + 35/25, x - 30/25, y + 35/25 )
    .bezierCurveTo( x - 30/25, y + 55/25, x - 25/25, y + 77/25, x + 25/25, y + 95/25 )
    .bezierCurveTo( x + 60/25, y + 77/25, x + 80/25, y + 55/25, x + 80/25, y + 35/25 )
    .bezierCurveTo( x + 80/25, y + 35/25, x + 80/25, y, x + 50/25, y )
    .bezierCurveTo( x + 35/25, y, x + 25/25, y + 25/25, x + 25/25, y + 25/25 );

    // Variables para la extrusión
    var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };

    var geoCorazon = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);

    var material = new THREE.MeshPhongMaterial({color: 0xff0000})

    this.corazon = new THREE.Mesh(geoCorazon, material);
    this.corazon.rotation.set(0, 0, Math.PI);
    this.corazon.scale.set(0.75, 0.75, 0.75);

    // Primer nodo
    this.nodo1 = new THREE.Object3D();
    this.nodo1.position.set(4.0, -2.5, 0);
    this.nodo1.add (this.corazon);

    // Segundo nodo
    this.nodo2 = new THREE.Object3D();
    this.nodo2.add(this.nodo1);

    this.add(this.nodo2);
  }
  
  update () {
    this.nodo2.rotation.z += 0.01;
    this.nodo1.rotation.z -= 0.01;
    this.corazon.rotation.y += 0.015;
  }
}