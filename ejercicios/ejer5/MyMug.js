 
class MyMug extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Como material se crea uno a partir de un color
        var material = new THREE.MeshNormalMaterial();

        // Creamos el cilindro
        var cilindro1 = new THREE.CylinderGeometry (1.5, 1.5, 4.0, 20.0);
        var cilindro2 = new THREE.CylinderGeometry (1.45, 1.45, 4.0, 20.0);
        
        // Creamos el toro
        var toro1 = new THREE.TorusGeometry (1.2, 0.3, 15.0, 15.0, Math.PI*2);

        // Trasladamos
        toro1.rotateZ(Math.PI/2);
        toro1.translate(-1.5, 0.0, 0.0);
        cilindro2.translate(0.0, 0.2, 0.0);

        // Creamos nodos ThreeBSP
        var cilindro1bsp = new ThreeBSP (cilindro1);
        var cilindro2bsp = new ThreeBSP (cilindro2);
        var toro1bsp = new ThreeBSP (toro1);
        
        // Árbol binario con las operaciones
        
        var partialResult = toro1bsp.union (cilindro1bsp);
        var finalResult = partialResult.subtract (cilindro2bsp);

        // Ya podemos construir el Mesh
        this.resultado = finalResult.toMesh(material);
        this.resultado.geometry.computeFaceNormals();
        this.resultado.geometry.computeVertexNormals();

        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.resultado);
    }

    createGUI (gui,titleGui) {
        
    }

    update () {
        
    }
}