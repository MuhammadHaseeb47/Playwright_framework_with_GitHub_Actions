class CommonMethods{
    
    generateRandomNumber(number){
        let random = Math.floor(Math.random() * number)
        let randomNumber = random.toString();
        console.log(randomNumber)
        return randomNumber;
    }

}export default CommonMethods