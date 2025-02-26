var sum_to_n_a=function(n){
    if (n<=0){ 
        return -1;
    }

    return (n*(1+n))/2
}
var sum_to_n_b=function(n){
    if (n<=0){ 
        return -1;
    }
    let total=0;
    for (let i=1;i<=n;i++){
        total+=i
    }    
    return total;
}
var sum_to_n_c=function(n){
    if (n>0){
   const arr= Array.from({length:n},(_,i)=>i+1);
   return arr.reduce((total,cur)=>total+cur, 0);
}
    return -1;
}