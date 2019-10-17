class Main {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 100, 170 );
        this.addRenderer();
        this.addCamera();

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth,window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            
            this.camera.updateProjectionMatrix();
        });
        this.addLight();
        this.addText();
        for (let i = 0; i < 10; ++i) {
            this.addHelix();
        }
    }

    addCamera() {
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
        this.camera.position.z = 20;
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

        this.controls.update();
    }

    addRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor("#000");
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    addLight() {
        let light = new THREE.PointLight(0xFFFFFF, 1, 1000)
        light.position.set(0,0,10);
        this.scene.add(light);

        light = new THREE.PointLight(0xFF0000, 0.4, 1000)
        light.position.set(0,0,-100);
        this.scene.add(light);

        light = new THREE.PointLight(0xFFFFFF, 1, 1000)
        light.position.set(0,0,30);
        this.scene.add(light);
    }

    addHelix() {
        const h = new Helix(this.scene, ()=>{this.addHelix();});

        const x = ((2 * Math.random()) - 1) * 100;
        const y = ((2 * Math.random()) - 1) * 50;
        const z = -150 + (((2 * Math.random()) - 1) * 150);
        h.group.position.set(x, y, z);

        h.group.rotation.x = -(Math.random() * Math.PI);
        h.group.rotation.y = -(Math.random() * Math.PI);
        h.group.rotation.z = -(Math.random() * Math.PI);
    }

    addText() {
        new Text((mesh)=>{
            this.scene.add(mesh);
        });
    }
}

const m = new Main();
var render = function () {
    requestAnimationFrame(render);
    m.renderer.render(m.scene, m.camera);
}
render();

