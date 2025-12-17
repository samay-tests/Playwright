function prime(number){
   
   
    for(let count=2; count<=number; count++){
         let isPrime = true;
          if( number <2){
        isPrime = false
    }

    for(let i=2; i<=Math.sqrt(count); i++){
        if(count%i==0)
        {
            isPrime= false
            break;
        }
}
 if(isPrime){
            console.log(count)
        }
    }
}

    

prime(100)