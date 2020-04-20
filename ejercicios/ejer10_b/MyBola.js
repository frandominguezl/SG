 
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

        // Nodo para el cilindro
        this.nodoCilindro = new THREE.Object3D();
        this.nodoCilindro.add(this.cilindro);

        // Creamos la bola
        var geoBola = new THREE.SphereGeometry(0.5, 32.0, 32.0);
        var matBola = new THREE.MeshNormalMaterial();
        this.bola = new THREE.Mesh(geoBola, matBola);
        this.bola.position.set(this.guiControls.radioCilindro+0.5, 0.5, 0.0);

        // Nodo bola
        this.nodoBola = new THREE.Object3D();
        this.nodoBola.add(this.bola);

        // Nodo final
        this.nodoFinal = new THREE.Object3D();
        this.nodoFinal.add(this.nodoCilindro);
        this.nodoFinal.add(this.nodoBola);

        // Origen y destino - Tween
        this.origen = {rotation: 0, x: 0.0, y: 0.0, z: 0.0};
        this.destino = {rotation: 2*Math.PI, x: 0.0, y: 5.0, z: 0.0};

        // Movimiento Tween
        var movimiento = new TWEEN.Tween(this.origen).to(this.destino, 4000);

        var that = this;
        movimiento.onUpdate(function() {
            that.nodoBola.rotation.y = that.origen.rotation;
            that.nodoBola.position.set(that.origen.x, that.origen.y, that.origen.z);
        });

        // Segunda parte del movimiento
        this.origen2 = {rotation: 0.0, x: 0.0, y: 5.0, z: 0.0};
        this.destino2 = {rotation: 2*Math.PI, x: 0.0, y: 0.0, z: 0.0};

        var movimiento2 = new TWEEN.Tween(this.origen2).to(this.destino2, 4000);
        
        movimiento2.onUpdate(function() {
            that.nodoBola.rotation.y = that.origen2.rotation;
            that.nodoBola.position.set(that.origen2.x, that.origen2.y, that.origen2.z);
        });

        // Generamos la animación infinita
        movimiento.chain(movimiento2);
        movimiento2.chain(movimiento);

        movimiento.start();

        this.add(this.nodoFinal);
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
                that.nodoBola.position.set(radio, 0.0, 0.0);
            });
    }

    update() {
        TWEEN.update();
    }
}