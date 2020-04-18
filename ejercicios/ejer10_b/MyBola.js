 
class MyBola extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        // Creamos la GUI
        this.createGUI(gui, titleGui);

        // Creamos el cilindro transparente
        var geoCilindro = new THREE.CylinderGeometry(this.guiControls.radioCilindro, this.guiControls.radioCilindro, 5.0, 32.0);
        var materialCilindro = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true});
        this.cilindro = new THREE.Mesh(geoCilindro, materialCilindro);
        this.cilindro.position.set(0.0, 2.5, 0.0);

        /*// Nodo para el cilindro
        this.nodoCilindro = new THREE.Object3D();
        this.nodoCilindro.add(this.cilindro);*/

        // Creamos la bola
        var geoBola = new THREE.SphereGeometry(0.5, 32.0, 32.0);
        var matBola = new THREE.MeshNormalMaterial();
        this.bola = new THREE.Mesh(geoBola, matBola);
        this.bola.position.set(this.guiControls.radioCilindro+0.5, 0.5, 0.0);

        // Origen y destino - Tween
        var origen = {x: this.guiControls.radioCilindro+0.5, y: 0.0, z: 0.0};
        var destino = {x: 0.0, y: 5.0, z: -this.guiControls.radioCilindro+0.5};

        // Movimiento Tween
        var movimiento = new TWEEN.Tween(origen).to(destino, 7000)
            .repeat(Infinity);

        var that = this;
        movimiento.onUpdate(function() {
            that.bola.position.x = origen.x;
            that.bola.position.y = origen.x;
            that.bola.position.z = origen.z;
        });

        movimiento.start();

        TWEEN.update();

        this.add(this.cilindro);
        this.add(this.bola);
    }

    createGUI(gui, titleGui) {
        this.guiControls = new function() {
            this.radioCilindro = 1.0;
        }

        var that = this;
        
        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'radioCilindro', 1.0, 5.0, 0.5).name ('Radio: ').listen()
            .onChange(function(radio) {
                var newGeo = new THREE.CylinderGeometry(radio, radio, 5.0, 32.0);
                that.cilindro.geometry = newGeo;
            });
    }

    update() {

    }
}