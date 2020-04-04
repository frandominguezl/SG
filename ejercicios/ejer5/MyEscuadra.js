 
class MyEscuadra extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Como material se crea uno a partir de un color
        var material = new THREE.MeshNormalMaterial();

        // Partes de la escuadra
        var segmento1 = new THREE.BoxGeometry(0.5, 3.5, 2);
        var segmento2 = new THREE.BoxGeometry(0.5, 3.5, 2);
        segmento1.translate(0, -2, 0);
        segmento2.translate(0, -1.5, 0);
        segmento2.rotateZ(Math.PI/2);

        // Cilindro en medio para hacer el efecto de curva
        var cilindro1 = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
        cilindro1.rotateX(Math.PI/2);
        cilindro1.translate(0.25, -0.3, 0);

        // Conos para simular los agujeros
        var cono1 = new THREE.ConeGeometry(0.5, 2, 32);
        var cono2 = new THREE.ConeGeometry(0.5, 2, 32);
        cono1.translate(2, 0, 0);
        cono2.rotateZ(Math.PI/2);
        cono2.translate(0, -2, 0);

        // Nodos BSP
        var segmento1bsp = new ThreeBSP (segmento1);
        var segmento2bsp = new ThreeBSP (segmento2);
        var cilindro1bsp = new ThreeBSP (cilindro1);
        var cono1 = new ThreeBSP (cono1);
        var cono2 = new ThreeBSP (cono2);

        // Árbol binario con las operaciones
        var parcial1 = segmento1bsp.union(segmento2bsp);
        var parcial2 = parcial1.subtract(cono1);
        var parcial3 = parcial2.subtract(cono2);
        var resultado = parcial3.union(cilindro1bsp);

        // Construimos el mesh
        this.final = resultado.toMesh(material);
        this.final.geometry.computeFaceNormals();
        this.final.geometry.computeVertexNormals();
        this.final.position.set(0, 2, 0);

        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.final);
    }

    createGUI (gui,titleGui) {
        
    }

    update () {
        this.final.rotation.x += 0.01;
        this.final.rotation.y += 0.01;
    }
}