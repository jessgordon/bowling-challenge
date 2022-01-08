class Frame {
  constructor() {
    this.rolls = [];
    this.bonus = [];
    this.strike = false;
    this.spare = false;
  }

  update_roll(current_roll, pins_knocked_down) {
    this.rolls[current_roll - 1] = pins_knocked_down;
    if (current_roll === 1 && pins_knocked_down === 10) {
      this.strike = true;
    } else if (
      current_roll === 2 && this._rollsTotalScore() === 10
    ) {
      this.spare = true;
    }
  }

  _rollsTotalScore() {
    return this.rolls.reduce((item, acc) => item + acc, 0)
  }

}

module.exports = Frame;
