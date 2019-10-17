class ElemFactory {
    static getElem (length = 10, r = 1, color = 0xFF0000, rotationAngle = 0, after = ()=>{}) {
        const group = new THREE.Group();
        group.add(this.addCylinder(length, r, color));
        group.add(this.addSphere(r));

        group.rotation.y = -Math.PI/2;

        new TimelineMax({onComplete: after}).delay(0.3).to(group.rotation, .5, {y: rotationAngle, ease:Linear.easeNone});
        return group;
    }

    static addSphere(r) {
        let geometry = new THREE.SphereGeometry(r, 32, 32);
        let material = new THREE.MeshPhysicalMaterial({color: 0x0000FF});
        material.transparent = true;
        material.opacity = 0;
        new TimelineMax().delay(0.3).to(material, .5, {opacity: 1, ease:Linear.easeNone});

        let mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    static addCylinder(length, r, color) {
        let l = (length - (4*r))/2;

        let geometry = new THREE.CylinderGeometry( r/4, r/4, l, 32 );
        let material = new THREE.MeshPhysicalMaterial({color: color});
        material.transparent = true;
        material.opacity = 0;
        new TimelineMax().delay(0.3).to(material, .5, {opacity: 1, ease:Linear.easeNone});

        let mesh = new THREE.Mesh( geometry, material );

        mesh.rotateZ(Math.PI/2);
        mesh.position.set(-l/2 - r, 0, 0);

        return mesh;
    }
}