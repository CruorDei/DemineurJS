export class Case {
    BOMB = 9;
    constructor(number, flag = false){
        this.number = number;
        this.flag = flag;
        this.revealed = false;
    }

    raiseNumber(){
        this.number++;
    }

    get isBomb(){
        return this.number === this.BOMB;
    }

    reveal(){
        this.revealed = true;
        return this.isBomb;
    }

    changeFlag(){
        this.flag = !this.flag;
        return this.flag;
    }

    toString(){
        return this.revealed ? this.number : this.flag ? "🚩" : "*";
    }
}