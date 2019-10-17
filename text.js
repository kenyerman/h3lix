class Text {
    constructor(callback, text = 'h3lix') {
        this.callback = callback;
        this.text = text;
        this.geometry = null;
        this.material = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF});
        this.material.transparent = true;
        this.material.opacity = 0;

        this.mesh = null;
        this.loader = new THREE.FontLoader().load(
            'Montserrat_Thin_Regular.json', (font) => {
                this.geometry = new THREE.TextGeometry( this.text, {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 120,
                    bevelEnabled: true,
                    bevelThickness: .2,
                    bevelSize: 0.2,
                    bevelOffset: 0,
                    bevelSegments: 50
                } );
                new TimelineMax().delay(0.3).to(this.material, .5, {opacity: 1, ease:Linear.easeNone});
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.mesh.position.z = -135;
                this.mesh.position.x = -10;
                this.mesh.position.y = -5;
                this.callback(this.mesh);
            } 
        );
    }
}