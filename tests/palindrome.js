//palindrome
// is a string which is same when read backward and forward

function palindrome(string){
    lower = string.toLowerCase()
    let array= []
lower.split('').forEach(element => {
if( element>= "a" && element <="z"){
array.push(element)
}
    
});
if(array.join()==array.reverse().join()){
    console.log("yes")
}else console.log("no")

}

palindrome("test12342442")