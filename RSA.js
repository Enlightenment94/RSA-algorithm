//Algorytm Rivesta-Shamira-Adlemana (RSA)
class RSA{
    constructor(){
        this.p = -1n;
        this.q = -1n;
        this.n = -1n;
        this.fi = -1n;
        this.e = -1n;
        this.d = -1n;
    
        this.eTimeStart = "";
        this.eTimeEnd = "";
    }
    
    generatePQNFi(digitsP, digitsQ){
        this.p = BigInt(getRandomPrime(digitsP));
        this.q = BigInt(getRandomPrime(digitsQ));

        this.n = BigInt(this.p * this.q);
        this.fi = (this.p-1n)*(this.q-1n);
    }
    
    //(1 < e < φ(n))
    //Most too cost operation in Algorithms
    //Realistic time for digits p i q length max 256
    //https://en.wikipedia.org/wiki/RSA_numbers
    //RSA-4096 ??? decimal digits (4,096)          <-- no realistic time 
    //RSA-2048 has 617 decimal digits (2,048 bits) <-- too long 
    //RSA-310 has 310 decimal digits (1,028 bits)  <-- optimal p i q koło 164
    //If you not have a time to generate choose number e popular 65537
    generateE(){
        let fiLength = this.fi.toString().length;
        let lowNumber = genLowNumber(fiLength);

        while(this.e >= this.fi || this.e <= lowNumber ){
            this.e = BigInt(getRandomPrime(fiLength));
        }
    }

    //Realisstic primeLength 
    //low 128 mid 300 high 500    
    generateRealisticTimeE(realisticPrimeLegnth){
        let fiLength = this.fi.toString().length;
        let lowNumber = genLowNumber(fiLength);

        //Random numebr and check prime Miller Riben Test

        let realisticPrimeMax = genHighNumber(realisticPrimeLegnth);
        let realisticPrimeMin = genLowNumber(realisticPrimeLegnth);
        this.e = BigInt(getRandomPrime(realisticPrimeLegnth));

        while((this.e >= this.fi || this.e <= lowNumber) && (this.e >= realisticPrimeMax || this.e <= realisticPrimeMin)){
            this.e = BigInt(getRandomPrime(realisticPrimeLegnth));
        }
    }

    //d ≡ e^(−1) (mod λ(n))
    //Inverse modulo is not possible in normal calculate
    //We need write specialist function because overflow BigInt 
    countD(){
        this.d = BigInt(modInverse(this.e, this.fi));
    }

    generatePairKey(){
        this.generateE();
        this.countD();
        let publicKey = new Array(this.n, this.e);
        let privateKey = new Array(this.n, this.d);
        return new Array(publicKey, privateKey); 
    }

    generatePairKeyERealisticTime(realisticPrimeLegnth){

        this.generateRealisticTimeE(realisticPrimeLegnth);
        

        this.countD();

        let publicKey = new Array(this.n, this.e);
        let privateKey = new Array(this.n, this.d);
        return new Array(publicKey, privateKey); 
    }

    //c = m^(e) mod n 
    //Pow modulo is not possible in normal calculate 
    //We need write specialist function because overflow BigInt 
    encryptSign(msg){
        if(this.e > -1 && this.n > -1){
            let encrypted = rightToLeftBinaryModPow(msg, this.e, this.n)
            return encrypted;
        }
        return -1;
    }

    //...
    //m = c^(d) mod n
    decryptSign(msg){
        if(this.d > -1 && this.n > -1){
            let decrypted = rightToLeftBinaryModPow(msg, this.d, this.n)
            return decrypted;
        }
        return -1;
    }

    encryptArr(msgArr){
        if(this.e > -1 && this.n > -1){
            let encryptedArr = new Array();
            let encrypted;
            let i = 0;
            for(i = 0; i < msgArr.length; i++){
                encrypted = rightToLeftBinaryModPow(msgArr[i], this.e, this.n)
                encryptedArr.push(encrypted);
            }
            return encryptedArr;
        }
        return -1;
    }

    decryptArr(encryptedArr){
        if(this.e > -1 && this.n > -1){
            let decryptedArr = new Array();
            let decrypted;
            let i = 0;
            for(i = 0; i < encryptedArr.length; i++){
                decrypted = rightToLeftBinaryModPow(encryptedArr[i], this.d, this.n)
                decryptedArr.push(decrypted);
            }
            return decryptedArr;
        }
        return -1;
    }

}

