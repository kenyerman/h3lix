class PairFactory {
    static getPair(x = 0, y = 0, z = 0, length = 10, r = 1) {
        const group = new THREE.Group();
        group.add(this.addCylinder((length - (4*r))/4, length, r, 0xFF0000));
        group.add(this.addCylinder(-(length - (4*r))/4, length, r, 0x00FF00));
        group.add(this.addSphere((length/2) - r, r));
        group.add(this.addSphere(-((length/2) - r), ));

        group.position.set(x,y,z);
        return group;
    }

    static addSphere(x, r) {
        let geometry = new THREE.SphereGeometry(r, 32, 32);
        let material = new THREE.MeshLambertMaterial({color: 0x0000FF});
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, 0, 0);
        mesh.scale.x = 0.001;
        mesh.scale.y = 0.001;
        mesh.scale.z = 0.001;

        new TimelineMax().delay(.3).to(mesh.scale, .5, {x: 1, y: 1, z: 1});
        return mesh;
    }

    static addCylinder(x, length, r, color) {
        let l = (length - (4*r))/2;

        let geometry = new THREE.CylinderGeometry( r/4, r/4, l, 32 );
        let material = new THREE.MeshLambertMaterial({color: color});
        let mesh = new THREE.Mesh( geometry, material );

        mesh.rotateZ(Math.PI/2);
        mesh.position.set(x, 0, 0);

        mesh.scale.x = 0.001;
        mesh.scale.y = 0.001;
        mesh.scale.z = 0.001;

        new TimelineMax().delay(1).to(mesh.scale, .5, {x: 1, y: 1, z: 1});
        return mesh;
    }
}