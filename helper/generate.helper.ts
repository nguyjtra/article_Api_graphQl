export const generateRandomString=(length:number):string=>{
    const chareacters="qwertyuiopasdfghjklzxcvbnm1234567890";
    let result="";
    for(let i=0;i<length;i++){
        result+=chareacters.charAt(Math.floor(Math.random()*chareacters.length))
    }
    return result;
};                 