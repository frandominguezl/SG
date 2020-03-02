
class MyCylinder extends THREE.Object3D {
    constructor(gui,titleGui){
        super();

        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Un Mesh se compone de geometría y material
        var cylGeom = new THREE.CylinderGeometry (1,1,1,3);
        // Como material se crea uno a partir de un color
        var cylMat = new THREE.MeshNormalMaterial();
        
        // Ya podemos construir el Mesh
        this.cyl = new THREE.Mesh (cylGeom, cylMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.cyl);

        // Lo cambiamos de posición
        this.cyl.position.y = 7;
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
        this.topRadius = 1.0;
        this.bottomRadius = 1.0;
        this.height = 1.0;
        this.segments = 3.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.topRadius = 1.0;
            this.bottomRadius = 1.0;
            this.height = 1.0;
            this.segments = 3.0;
        }
    }

    // Creamos un puntero al ámbito actual, para luego poder usarlo dentro de onChange
    var that = this;

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'topRadius', 0.1, 5.0, 0.1).name ('Radio Superior : ').listen()
        .onChange(function(topRadius){
            var newGeo = new THREE.CylinderGeometry(topRadius, this.bottomRadius, this.height, this.segments);
            that.cyl.geometry = newGeo;
        });

    folder.add (this.guiControls, 'bottomRadius', 0.1, 5.0, 0.1).name ('Radio Inferior : ').listen()
        .onChange(function(bottomRadius){
            var newGeo = new THREE.CylinderGeometry(this.topRadius, bottomRadius, this.height, this.segments);
            that.cyl.geometry = newGeo;
        });

    folder.add (this.guiControls, 'height', 0.1, 5.0, 0.1).name ('Altura : ').listen()
        .onChange(function(height){
            var newGeo = new THREE.CylinderGeometry(this.topRadius, this.bottomRadius, height, this.segments);
            that.cyl.geometry = newGeo;
        });

    folder.add (this.guiControls, 'segments', 3, 50.0, 1.0).name ('Segmentos : ').listen()
        .onChange(function(segments){
            var newGeo = new THREE.CylinderGeometry(this.topRadius, this.bottomRadius, this.height, segments);
            that.cyl.geometry = newGeo;
        });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');

    }

    update () {

    }
}