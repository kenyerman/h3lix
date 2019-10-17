class Main {
    constructor() {
        this.Objects = [];
        this.scene = new THREE.Scene();

        this.addCamera();
        this.addRenderer();

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth,window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            
            this.camera.updateProjectionMatrix();
        });
        // this.addSkybox();
        this.addLights();
        this.addObjects();
    }

    addCamera() {
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
        this.camera.position.z = 10;
    }

    addRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor("#000");
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    addLights() {
        let light = new THREE.PointLight(0xFFFFFF, 1, 1000)
        light.position.set(0,0,10);
        this.scene.add(light);

        // light = new THREE.AmbientLight(0xFFFFFF, 0.5, 1000)
        // light.position.set(0,0,25);
        // this.scene.add(light);
    }

    addSkybox() {
        let texture = new THREE.TextureLoader().load( "skybox2.jpg" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set( 4, 4 );

        this.scene.background = texture;
    }


    addObjects() {
        const h = new Helix(this.scene);
        this.Objects.push(h);
    }
}

const m = new Main();
var render = function () {
    requestAnimationFrame(render);
    m.renderer.render(m.scene, m.camera);
}
render();