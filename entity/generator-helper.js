module.exports = class GeneratorPrivateHelper extends Generator{
    constructor(args, options) {
        super(args, options);
        this._ = _; // making all private
    }

    convertToLowercase(str){
        return str.toLowerCase();
    }
}
