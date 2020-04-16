 
class MySphere extends THREE.Object3D {
    constructor() {
      super();
      // Un Mesh se compone de geometría y material
      var sphGeom = new THREE.SphereGeometry (1.0, 25.0, 25.0);
      // Como material se crea uno a partir de un color
      var sphMat = new THREE.MeshPhongMaterial({color: 0x43B611});
      
      // Ya podemos construir el Mesh
      this.sph = new THREE.Mesh (sphGeom, sphMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.sph);     
    }
  }