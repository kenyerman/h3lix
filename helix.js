class Helix {
    constructor(scene, addNew) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.angle = (2 * Math.PI) / 15;

        this.ttl = 10 * Math.random() + 5;
        this.addPair();
        new TimelineMax().to(this.group.rotation, this.ttl, {y: 2*Math.PI, ease: Linear.easeNone});
        new TimelineMax({onComplete: ()=>{
            addNew();
            removeChildren(this.group.children, this.scene);
            scene.remove(this.group);
        }}).to(this.group.position, this.ttl, {z: 170, ease: Linear.easeNone});
        scene.add(this.group);
    }

    addPair() {
        if (this.group.children.length > 10) return;
        const i = this.group.children.length;
        const p = PairFactory.getPair(
            0,
            2*i,
            0, 10, 1, ()=>{this.addPair()});
        p.rotateY(this.angle*i);
        this.group.add(p);
    }
}

function removeChildren(children, scene) {
    children.forEach((child) => {
        if (child.children.length) {
            removeChildren(child.children, scene);
        }
        scene.remove(child);
    })
}