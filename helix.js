class Helix {
    constructor(scene) {
        this.group = new THREE.Group();

        const size = 61;
        const angle = (2 * Math.PI) / 30;
        for (let i = 0; i < size; ++i) {
            const p = PairFactory.getPair(0, 2*i, 0);
            p.rotateY(angle*i);
            this.group.add(p);
        }

        // this.group.rotateZ(Math.PI/2);
        // this.group.rotateX(Math.PI/2);
        // this.group.rotateY(Math.PI/2);


        this.tl = new TimelineMax({repeat: 2});
        this.tl.to(this.group.position, 10, {y: -120});
        this.tl.to(this.group.position, 10, {y: 0});

        const p = PairFactory.getPair();
        this.group.add(p);
        scene.add(this.group);
    }
}