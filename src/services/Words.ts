class Words{
    words: Array<string>
    constructor(){
        this.words = ['mouse']
    }

    getRandomWord = (): string => {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
}

const words = new Words();
export default words;