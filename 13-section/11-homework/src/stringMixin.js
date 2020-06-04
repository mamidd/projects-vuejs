export const stringMixin = {
    computed: {
        reversedMixin(){
            return this.text.split("").reverse().join("");
        },
        characterCountedMixin(){
            let value = this.text;
            return value + " (" + value.length + ")";
        }
    },
}