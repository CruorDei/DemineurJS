export class Case {
    BOMB = 9;
    constructor(number , id, flag = false){
        this.number = number;
        this.flag = flag;
        this.revealed = false;
        this.id = id;
    }

    raiseNumber(){
        this.number++;
    }

    get isBomb(){
        return this.number === this.BOMB;
    }

    reveal(){
        this.revealed = true;
        return this;
    }

    changeFlag(){
        this.flag = !this.flag;
        return this.flag;
    }

    toString(){
        return this.revealed ? this.number : this.flag ? "🚩" : "";
    }
}