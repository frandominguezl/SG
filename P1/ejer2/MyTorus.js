 
class MyTorus extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var torusGeo = new THREE.TorusGeometry (this.guiControls.radio, this.guiControls.tubo,
         this.guiControls.segRadial, this.guiControls.segTubo, this.guiControls.arco);
      // Como material se crea uno a partir de un color
      var torusMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.torus = new THREE.Mesh (torusGeo, torusMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.torus);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.torus.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radio = 1.0;
        this.tubo = 0.2;
        this.segRadial = 3.0;
        this.segTubo = 3.0;
        this.arco = Math.PI*2;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio = 1.0;
            this.tubo = 0.2;
            this.segRadial = 3.0;
            this.segTubo = 3.0;
            this.arco = Math.PI*2;
        }
      }
  
      // Creamos un puntero al ámbito actual, para luego poder usarlo dentro de onChange
      var that = this;
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio Principal: ').listen()
        .onChange(function(radio){
          var newGeo = new THREE.TorusGeometry(radio, that.guiControls.tubo,
             that.guiControls.segRadial, that.guiControls.segTubo);
          that.torus.geometry = newGeo;
        });
  
      folder.add (this.guiControls, 'tubo', 0.2, 1.0, 0.1).name ('Radio Tubo: ').listen()
        .onChange(function(tubo){
          var newGeo = new THREE.TorusGeometry(that.guiControls.radio, tubo,
             that.guiControls.segRadial, that.guiControls.segTubo);
          that.torus.geometry = newGeo;
        });
  
      folder.add (this.guiControls, 'segRadial', 3.0, 15.0, 1.0).name ('Res. Toro: ').listen()
        .onChange(function(segRadial){
          var newGeo = new THREE.TorusGeometry(that.guiControls.radio, that.guiControls.tubo,
             segRadial, that.guiControls.segTubo);
          that.torus.geometry = newGeo;
        });

      folder.add (this.guiControls, 'segTubo', 3.0, 15.0, 1.0).name ('Res. Tubo: ').listen()
        .onChange(function(segTubo){
          var newGeo = new THREE.TorusGeometry(that.guiControls.radio, that.guiControls.tubo,
            that.guiControls.segRadial, segTubo);
          that.torus.geometry = newGeo;
        });
      
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      this.torus.rotation.y += 0.015;
      this.torus.rotation.x += 0.015;
    }
  }