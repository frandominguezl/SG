 
class MyCone extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var conoGeo = new THREE.ConeGeometry (this.guiControls.radio, this.guiControls.altura, this.guiControls.segmentos);
      // Como material se crea uno a partir de un color
      var conoMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.cono = new THREE.Mesh (conoGeo, conoMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.cono);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.cono.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radio = 1.0;
        this.altura = 1.0;
        this.segmentos = 3.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio = 1.0;
            this.altura = 1.0;
            this.segmentos = 3.0;
        }
      } 
      
      // Creamos un puntero al ámbito actual, para luego poder usarlo dentro de onChange
      var that = this;

      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio: ').listen()
        .onChange(function(radio){
            var newGeo = new THREE.ConeGeometry(radio, that.guiControls.altura, that.guiControls.segmentos);
            that.cono.radio = radio;
            that.cono.geometry = newGeo;
        });
      folder.add (this.guiControls, 'altura', 1.0, 5.0, 0.1).name ('Altura: ').listen()
        .onChange(function(altura){
            var newGeo = new THREE.ConeGeometry(that.guiControls.radio, altura, that.guiControls.segmentos);
            that.cono.altura = altura;
            that.cono.geometry = newGeo;
        });
      folder.add (this.guiControls, 'segmentos', 3.0, 20.0, 1.0).name ('Resolución: ').listen()
        .onChange(function(segmentos){
            var newGeo = new THREE.ConeGeometry(that.guiControls.radio, that.guiControls.altura, segmentos);
            that.cono.segmentos = segmentos;
            that.cono.geometry = newGeo;
        });
      
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
        this.cono.rotation.y += 0.015;
        this.cono.rotation.x += 0.015;
    }
  }