function Rect(width, height) {
    this.width = width;
    this.height = height;
    this.returnArea = function() {
        return this.height * this.width;
    };
}

const rect = new Rect(100, 20);
console.log(rect.returnArea());
