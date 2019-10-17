class PairFactory {
    static getPair(x = 0, y = 0, z = 0, length = 10, r = 1, after = ()=>{}) {
        const group = new THREE.Group();

        const right = ElemFactory.getElem(length, r, 0xFF0000);
        right.position.set(length/2 - r,0,0)
        group.add(right);

        const left = ElemFactory.getElem(length, r, 0x00FF00, -Math.PI, after);
        left.position.set(-length/2 + r,0,0);
        group.add(left);

        group.position.set(x,y,z);

        return group;
    }
}