 
class MyIcosahedron extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Un Mesh se compone de geometría y material
      var icoGeom = new THREE.IcosahedronGeometry (this.guiControls.radio, this.guiControls.detalle);
      // Como material se crea uno a partir de un color
      var icoMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.ico = new THREE.Mesh (icoGeom, icoMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.ico);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.ico.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radio = 1.0;
        this.detalle = 0.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.radio = 1.0;
          this.detalle = 0.0;
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
          var newGeo = new THREE.IcosahedronGeometry(radio, that.guiControls.detalle);
          that.ico.geometry = newGeo;
        });
  
      folder.add (this.guiControls, 'detalle', 0.0, 3.0, 1.0).name ('Subdivisión: ').listen()
        .onChange(function(detalle){
          var newGeo = new THREE.IcosahedronGeometry(that.guiControls.radio, detalle);
          that.ico.geometry = newGeo;
        });
      
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      this.ico.rotation.y += 0.015;
      this.ico.rotation.x += 0.015;
    }
  }