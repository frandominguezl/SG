 
class MyNave extends THREE.Object3D {
    constructor() {
        super();

        // Definimos el spline por el punto de control
        this.camino = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.0, 5.0, 0.0), new THREE.Vector3(8.0, 3.0, 0.0),
            new THREE.Vector3(5.0, 5.0, 5.0), new THREE.Vector3(3.0, 5.0, 7.0),
            new THREE.Vector3(0.0, 7.0, -3.0), new THREE.Vector3(-5.0, 7.0, -5.0),
            new THREE.Vector3(-8.0, 5.0, 7.0), new THREE.Vector3(0.0, 5.0, 0.0)
        ]);

        // Para visualizar una línea de segmentos rectos
        var geometryLine = new THREE.Geometry();

        // Tomamos los vértices del spline con 100 muestras
        geometryLine.vertices = this.camino.getPoints(100);

        // Creamos la línea visible con un material de línea
        var materialLinea = new THREE.LineBasicMaterial({color: 0xff0000});
        var visibleSpline = new THREE.Line(geometryLine, materialLinea);

        // Creamos la nave
        var geoNave = new THREE.ConeGeometry(1.0, 1.5, 3.0);
        var materialCono = new THREE.MeshNormalMaterial();
        this.nave = new THREE.Mesh(geoNave, materialCono);

        // Referencia externa
        var that = this;

        // Primera animacion
        var origen1 = {x: 0.0};
        var destino1 = {x: 0.5};

        var movimiento1 = new TWEEN.Tween(origen1).to(destino1, 4000)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(function() {
                var posicion = that.camino.getPointAt(origen1.x);
                that.nave.position.copy(posicion);

                // Obtenemos la tangente
                var tangente = that.camino.getTangentAt(origen1.x);
                
                // Añadimos al punto anterior
                posicion.add(tangente);

                // Hacemos que la nave mire a esa posición
                that.nave.lookAt(posicion);
            });

        // Segunda animación
        var origen2 = {x: 0.5};
        var destino2 = {x: 1.0};

        var movimiento2 = new TWEEN.Tween(origen2).to(destino2, 8000)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(function() {
                var posicion = that.camino.getPointAt(origen2.x);
                that.nave.position.copy(posicion);

                // Obtenemos la tangente
                var tangente = that.camino.getTangentAt(origen2.x);
                
                // Añadimos al punto anterior
                posicion.add(tangente);

                // Hacemos que la nave mire a esa posición
                that.nave.lookAt(posicion);
            });
        
        // Encadenamos ambas animaciones
        movimiento1.chain(movimiento2);
        movimiento2.chain(movimiento1);

        movimiento1.start();

        this.add(this.nave);
        this.add(visibleSpline);
    }

    update() {
        // Creamos la variable tiempo
        var time = Date.now();
        var looptime = 20000;
        var t = (time % looptime) / looptime;

        // Update para Tween
        TWEEN.update();
    }
}