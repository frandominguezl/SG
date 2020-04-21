 
class MyReloj extends THREE.Object3D {
    constructor(gui, titleGui) {
      super();
      this.createGUI(gui, titleGui);

      // Esfera a modo de aguja
      this.aguja = new MySphere(0xff0000);
      this.aguja.position.set(-8, 0, 0);
      this.nodoAguja = new THREE.Object3D();
      this.nodoAguja.add(this.aguja);
      this.add(this.nodoAguja);
      
      // Resto de esferas
      this.esfera1 = new MySphere(0x43B611);
      this.esfera1.position.set(-10, 0, 0);
      this.add (this.esfera1);

      this.esfera2 = new MySphere(0x43B611);
      this.esfera2.position.set(10, 0, 0);
      this.add (this.esfera2);

      this.esfera3 = new MySphere(0x43B611);
      this.esfera3.position.set(0, 0, 10);
      this.add (this.esfera3);

      this.esfera4 = new MySphere(0x43B611);
      this.esfera4.position.set(0, 0, -10);
      this.add (this.esfera4);

      this.esfera5 = new MySphere(0x43B611);
      this.esfera5.position.set(-8, 0, -5);
      this.add (this.esfera5);

      this.esfera6 = new MySphere(0x43B611);
      this.esfera6.position.set(-4, 0, -8);
      this.add (this.esfera6);

      this.esfera7 = new MySphere(0x43B611);
      this.esfera7.position.set(8, 0, 5);
      this.add (this.esfera7);

      this.esfera8 = new MySphere(0x43B611);
      this.esfera8.position.set(4, 0, 8);
      this.add (this.esfera8);

      this.esfera9 = new MySphere(0x43B611);
      this.esfera9.position.set(4, 0, -9);
      this.add (this.esfera9);

      this.esfera10 = new MySphere(0x43B611);
      this.esfera10.position.set(8, 0, -5);
      this.add (this.esfera10);

      this.esfera11 = new MySphere(0x43B611);
      this.esfera11.position.set(-4, 0, 9);
      this.add (this.esfera11);

      this.esfera12 = new MySphere(0x43B611);
      this.esfera12.position.set(-8, 0, 5);
      this.add (this.esfera12);    
    }

    createGUI (gui,titleGui) {
      this.guiControls = new function () {
          this.velocidad = 1.0;
      } 
      var that = this

      var folder = gui.addFolder (titleGui);

      folder.add (this.guiControls, 'velocidad', -12, 12, 1).name ('Velocidad: ').listen().onChange(function(velocidad){
          that.guiControls.velocidad = velocidad;
      });

    }

    update() {
      //this.aguja.rotation.y += this.guiControls.velocidad;
      this.nodoAguja.rotation.y -= this.guiControls.velocidad/100;
    }
  }