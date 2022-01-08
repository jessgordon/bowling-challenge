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
    } else if (current_roll === 2 && this._rollsTotalScore() === 10) {
      this.spare = true;
    }
  }

  add_bonus(current_frame, prev_frame1 = "not required") {
    if (this.strike === true) {
      if (prev_frame1 === "not required" && current_frame.strike === false) {
        this.bonus.push(current_frame.rolls[0]);
        this.bonus.push(current_frame.rolls[1]);
      } else if (prev_frame1 instanceof Frame) {
        this.bonus.push(prev_frame1.rolls[0]);
        this.bonus.push(current_frame.rolls[0]);
      }
    } else if (this.spare === true) {
      this.bonus.push(current_frame.rolls[0]);
    }
  }

  _rollsTotalScore() {
    return this.rolls.reduce((item, acc) => item + acc, 0);
  }

  final_round_bonus(pins_knocked_down) {
    if (this.strike === true && this.bonus.length < 2) {
      this.bonus.push(pins_knocked_down);
    }
    if (this.spare === true && this.bonus.length < 1) {
      this.bonus.push(pins_knocked_down);
    }
  }
}

module.exports = Frame;
