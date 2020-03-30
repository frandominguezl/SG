 
class MyHeart extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
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

    // Variables para la extrusión
    var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };

    var geoCorazon = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);

    var material = new THREE.MeshPhongMaterial({color: 0xff0000})

    this.corazon = new THREE.Mesh(geoCorazon, material);
    
    this.corazon.rotation.set(0, 0, Math.PI);
    this.corazon.position.set(4.0, -2.0, 0);
    this.corazon.scale.set(0.75, 0.75, 0.75);

    this.add(this.corazon);
  }
  
  update () {

  }
}