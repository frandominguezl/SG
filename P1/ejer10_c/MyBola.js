 
class MyBola extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        // Creamos la GUI
        this.createGUI(gui, titleGui);

        // Creamos el cilindro transparente
        var geoCilindro = new THREE.CylinderGeometry(3.0, 3.0, 3.0, 32.0);
        var materialCilindro = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true});
        this.cilindro = new THREE.Mesh(geoCilindro, materialCilindro);

        // Nodo para el cilindro
        this.nodoCilindro = new THREE.Object3D();
        this.nodoCilindro.add(this.cilindro);

        // Creamos la bola
        var geoBola = new THREE.SphereGeometry(0.5, 32.0, 32.0);
        var matBola = new THREE.MeshNormalMaterial();
        this.bola = new THREE.Mesh(geoBola, matBola);
        this.bola.position.set(3.5, 0.75, 0.0);

        // Nodo bola
        this.nodoBola = new THREE.Object3D();
        this.nodoBola.add(this.bola);

        // Nodo empujador
        this.nodoEmpujador = new THREE.Object3D();
        this.nodoEmpujador.add(this.nodoBola);
        this.nodoEmpujador.position.x = 3.5;

        // Nodo final
        this.nodoFinal = new THREE.Object3D();
        this.nodoFinal.add(this.nodoCilindro);
        this.nodoFinal.add(this.nodoEmpujador);

        // Rotación de la esfera
        this.origen = {rotation: 0};
        this.destino = {rotation: 2*Math.PI};

        // Referencia externa
        var that = this;

        // Movimiento Tween
        var movimiento = new TWEEN.Tween(this.origen).to(this.destino, 4000)
            .repeat(Infinity)
            .onUpdate(function() {
                that.nodoBola.rotation.y = that.origen.rotation;
        });

        // Animación del empujador
        this.origenEmpuje = {x: 1.0};
        this.destinoEmpuje = {x: -1.0};

        var movimiento2 = new TWEEN.Tween(this.origenEmpuje).to(this.destinoEmpuje, 2000)
            .repeat(Infinity)
            .yoyo(true)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function() {
                that.nodoEmpujador.position.x = that.origenEmpuje.x * that.guiControls.desfase;
        });

        movimiento.start();
        movimiento2.start();

        this.add(this.nodoFinal);
    }

    createGUI(gui, titleGui) {
        this.guiControls = new function() {
            this.desfase = 0.0;
            this.radioMenor = 3.0;
            this.radioMayor = 3.0;
        }

        var that = this;
        
        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'desfase', 0.0, 8.0, 0.1).name ('Extensión: ').listen()
            .onChange(function(extension) {
                that.guiControls.desfase = extension;
                that.guiControls.radioMayor = that.guiControls.radioMenor + extension
                that.nodoCilindro.scale.x = that.guiControls.radioMayor/that.guiControls.radioMenor;
            });
    }

    update() {
        TWEEN.update();
    }
}