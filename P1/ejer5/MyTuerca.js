 
class MyTuerca extends THREE.Object3D {
    constructor() {
        super();
        
        // Como material se crea uno a partir de un color
        var material = new THREE.MeshNormalMaterial();

        // Cilindro principal
        var cilindroPrincipal = new THREE.CylinderGeometry (3.0, 3.0, 2.0, 6.0);
        var cilindroAgujero = new THREE.CylinderGeometry (1.5, 1.5, 2.0, 20.0);
        var toro1 = new THREE.TorusGeometry (1.5, 0.2, 3.0, 16.0);

        // Esfera para los bordes redondeados
        var esfera = new THREE.SphereGeometry (3.0, 32.0, 32.0);

        // Gestiones varias
        toro1.rotateX(Math.PI/2);
        toro1.translate(0.0, 0.8, 0.0);

        // Creamos nodos ThreeBSP
        var cilindroPbsp = new ThreeBSP (cilindroPrincipal);
        var cilindroAbsp = new ThreeBSP (cilindroAgujero);
        var toro1bsp = new ThreeBSP (toro1);       
        var esferabsp = new ThreeBSP (esfera);
        
        // Árbol binario con las operaciones
        var partialResult = cilindroPbsp.intersect (esferabsp);
        var partialResult2 = partialResult.subtract (cilindroAbsp);
        var finalResult = partialResult2.subtract (toro1bsp);

        var lim = 0.7;

        while(lim >= -0.8) {
            toro1.translate(0.0, -0.3, 0.0);
            toro1bsp = new ThreeBSP (toro1);
            finalResult = finalResult.subtract(toro1bsp);
            lim -= 0.1;
        }

        // Ya podemos construir el Mesh
        this.resultado = finalResult.toMesh(material);
        this.resultado.geometry.computeFaceNormals();
        this.resultado.geometry.computeVertexNormals();

        this.resultado.position.set(9, 0, 0);

        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.resultado);
    }

    update () {
        this.resultado.rotation.x += 0.01;
        this.resultado.rotation.y += 0.01;
    }
}