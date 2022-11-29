export var food = {
  location: {
    x: Math.floor((Math.random() * 1000) % 19),
    y: Math.floor((Math.random() * 1000) % 19),
  },
  color: "",
  newLocation: function () {
    this.location.x = Math.floor((Math.random() * 1000) % 19);
    this.location.y = Math.floor((Math.random() * 1000) % 19);
  },
};

export var snake = {
  headLocation: [{ x: 0, y: 0 }],
  
  resetHead: function () {
    this.headLocation = [{ x: 0, y: 0 }];
    
  },
  moveRight: function () {
    this.headLocation[0] = {
      ...this.headLocation[0],
      y: (this.headLocation[0].y + 1) % 20,
    };
  },
  moveLeft: function () {
    this.headLocation[0] = {
      ...this.headLocation[0],
      y: this.headLocation[0].y - 1 >= 0 ? this.headLocation[0].y - 1 : 19,
    };
  },
  moveUp: function () {
    this.headLocation[0] = {
      ...this.headLocation[0],
      x: this.headLocation[0].x - 1 >= 0 ? this.headLocation[0].x - 1 : 19,
    };
  },
  moveDown: function () {
    this.headLocation[0] = {
      ...this.headLocation[0],
      x: (this.headLocation[0].x + 1) % 20,
    };
  },
};
