class Case {
    constructor(number, flag){
        this.number = number;
        this.flag = flag;
        this.revealed = false;
    }

    raiseNumber(){
        this.number++;
    }

    get isBomb(){
        return this.number === 9;
    }

    get isFlagCorrect(){
        return this.isBomb && this.flag;
    }

    reveal(){
        this.revealed = true;
        return this.isBomb;
    }

    changeFlag(){
        this.flag = !this.flag;
        return this.flag;
    }
}