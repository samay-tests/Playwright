// find the factorial of a number

function factorial(number, recursion){
let factor= 1;
switch(recursion){
    case "no":
            
    for(let i= 1; i<=number; i++){
        // let fac = number-i
    factor= i*factor
    }
        console.log(factor)
        break;

    case "yes":
    if(number==0)return
    console.log(factor)
    factor = factor*factorial(number-1, "yes")
    


    }   
}


function printDown(n) {
  if (n === 0) return 1;   // base case

  return n*printDown(n - 1);      // recursive call
}

console.log(printDown(5))



// factorial(5, "no")