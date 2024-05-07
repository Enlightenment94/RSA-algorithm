function modInverse(a, m) {
    const s = [];
    let b = BigInt(m);
    while(b) {
        [a, b] = [b, a % b];
        s.push({a, b});
    }

    if (a !== 1n) {
        return NaN;
    }

    let x = 1n;
    let y = 0n;
    for(let i = BigInt(s.length - 2); i >= 0n; --i) {
        [x, y] = [y,  x - y * (s[i].a / s[i].b)];
    }

    return (y % m + m) % m;
}

function rightToLeftBinaryModPow(b, e, m){
    if (m == 1n){
        return 0n;
    }else{
        let r = 1n;
        b = b % m;
        while (e > 0n){
            if(e % 2n == 1n){
                r = (r*b) % m;
            }
            b = (b*b) % m;
            e = e >> 1n;  
        }
        return r;
    }
}
