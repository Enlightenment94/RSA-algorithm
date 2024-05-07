function millerRabinTest(d, n){
    const r = BigInt(Math.floor(Math.random() * 100_000))

    const y = r*(n-2n)/100_000n
	let a = 2n + y % (n - 4n);

	let x = rightToLeftBinaryModPow(a, d, n);

	if (x == 1n || x == n-1n)
		return true;

	while (d != n-1n){
		x = (x * x) % n;
		d *= 2n;

		if (x == 1n)	
			return false;
		if (x == n-1n)
			return true;
	}

	return false;
}

function isPrime( n, k=40){
	if (n <= 1n || n == 4n) return false;
	if (n <= 3n) return true;


	let d = n - 1n;
	while (d % 2n == 0n)
		d /= 2n;

	for (let i = 0; i < k; i++)
		if (!millerRabinTest(d, n))
			return false;

	return true;
}

