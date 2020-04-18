 
class MySatelites extends THREE.Object3D {
    constructor(position) {
        super();

        // Geometría esferas
        var geoEsfera = new THREE.SphereGeometry(2.0, 32.0, 32.0);

        // Texturas
        var texturaTierra = new THREE.TextureLoader().load('../imgs/tierra.jpg');
        var texturaCara = new THREE.TextureLoader().load('../imgs/cara.jpg');

        // Materiales
        var materialTexturaTierra = new THREE.MeshPhongMaterial({map: texturaTierra});
        var materialTexturaCara = new THREE.MeshPhongMaterial({map: texturaCara});

        // Mesh Tierra
        var tierra = new THREE.Mesh(geoEsfera, materialTexturaTierra);

        // Nodo tierra
        this.nodoTierra = new THREE.Object3D();
        this.nodoTierra.add(tierra);

        // Mesh primer satélite
        var satelite1 = new THREE.Mesh(geoEsfera, materialTexturaCara);
        satelite1.rotation.y = Math.PI;
        satelite1.position.set(7.0, 0.0, 0.0);

        // Nodo satélite 1
        this.nodo1 = new THREE.Object3D();
        this.nodo1.add(satelite1);
        this.nodo1.add(this.nodoTierra);

        // Mesh segundo satélite
        this.satelite2 = new THREE.Mesh(geoEsfera, materialTexturaCara);
        this.satelite2.lookAt(-30.0, 0.0, 0.0);
        this.satelite2.position.set(14.0, 0.0, 0.0);

        // Nodo satélite 2
        this.nodo2 = new THREE.Object3D();
        this.nodo2.add(this.satelite2);
        this.nodo2.add(this.nodo1);

        // Mesh tercer satélite
        this.satelite3 = new THREE.Mesh(geoEsfera, materialTexturaCara);
        this.satelite3.rotation.y = Math.PI;
        this.satelite3.position.set(21.0, 0.0, 0.0);

        // Nodo final
        this.nodoFinal = new THREE.Object3D();
        this.nodoFinal.add(this.satelite3);
        this.nodoFinal.add(this.nodo2);

        this.add(this.nodoFinal);
    }

    update() {
        this.nodoFinal.rotation.y += 0.01;
        this.satelite3.rotation.y += 0.005;
        this.satelite2.rotation.y -= 0.01;
    }
}