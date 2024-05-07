function genRandomNumber(len) {
    var nums = "0123456789";
    var rand;
    var res = "";
    var i = 0;
    for(i = 0; i < len; i++){
        rand = Math.floor(Math.random() * 10);
        res += nums[rand];
    }
    return res;
}

function getRandomPrime(len){
    var bigNumber;
    for(;;){
        bigNumber = genRandomNumber(len);
        if( true == isPrime( BigInt(bigNumber) ) ){
            break;
        }
    }
    return bigNumber;
}

function genLowNumber(len) {
    var nums = "0";
    var res = "1";
    var i;
    for(i = 1; i < len; i++){
        res += nums[0];
    }
    return res;
}

function genHighNumber(len) {
    var nums = "9";
    var res = "9";
    var i;
    for(i = 1; i < len; i++){
        res += nums[0];
    }
    return res;
}
