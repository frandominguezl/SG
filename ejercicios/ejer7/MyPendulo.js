 
class MyPendulo extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        // Creamos la GUI
        this.createGUI(gui, titleGui);
        
        // Como material se crea uno a partir de un color
        var materialCajaVerde = new THREE.MeshPhongMaterial({color: 0x43B611});
        var materialCajaRoja = new THREE.MeshPhongMaterial({color: 0xff0000});

        // Primera caja
        var cajaA = new THREE.BoxGeometry(2.0, 2.0, 0.5);
        cajaA.translate(0.0, -0.5, 0.0);
        var cajaAMesh = new THREE.Mesh(cajaA, materialCajaVerde);

        this.add(cajaAMesh);
    }

    createGUI(gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.resolucion = 3;
            this.angulo = 1;
        }
  
        // Creamos un puntero al ámbito actual, para luego poder usarlo dentro de onChange
        var that = this;
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'resolucion', 3, 25, 1).name ('Resolución').listen()
            .onChange(function(segmentos){
            var newGeo = new THREE.LatheGeometry(that.points, segmentos, 0, that.guiControls.angulo);
            that.resolucion = segmentos;
            that.latheObject.geometry = newGeo;
            });
    
            folder.add (this.guiControls, 'angulo', 0.1, 2*Math.PI, 0.1).name ('Ángulo').listen()
            .onChange(function(angulo){
            var newGeo = new THREE.LatheGeometry(that.points, that.guiControls.resolucion, 0, angulo);
            that.angulo = angulo;
            that.latheObject.geometry = newGeo;
            });
    }
}