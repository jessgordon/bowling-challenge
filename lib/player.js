class Player {
  constructor(name) {
    this.name = name;
    this.current_frame = 1;
    this.current_roll = 1;
  }

  pins_knocked_down(number, points) {
    let end_of_frame = points.update_roll(
      this.current_frame,
      this.current_roll,
      number
    );
    let bonusPoints = this._bonusRolls(points);
    if (
      this.current_frame === 10 &&
      this.current_roll === 2 &&
      bonusPoints === false
    ) {
      points.add_bonus_points(this.current_frame);
      console.log(points.score_breakdown("GAME OVER"));
      this.current_frame = 1;
      this.current_roll = 1;
    } else if (this.current_frame === 10 && bonusPoints === true) {
      points.add_bonus_points(this.current_frame);
      console.log("INPUT BONUS ROLLS");
      console.log("e.g. player.bonus_roll(5, points)");
    } else {
      this._update_roll_return_score(number, points, end_of_frame);
    }
  }

  bonus_roll(number, points) {
    let end_of_frame = points.add_final_round_bonus_points(
      this.current_frame,
      number
    );
    if (end_of_frame === true) {
      console.log(points.score_breakdown("GAME OVER"));
      this.current_frame = 1;
      this.current_roll = 1;
    }
  }

  _update_roll_return_score(number, points, end_of_frame) {
    if (end_of_frame === true) {
      points.add_bonus_points(this.current_frame);
      this.current_roll = 1;
      this._update_frame();
      return points.current_score();
    } else if (this.current_roll === 1) {
      this.current_roll = 2;
      return number;
    }
  }

  _update_frame() {
    if (this.current_frame < 10) {
      this.current_frame += 1;
    } else {
      this.current_frame = 1;
    }
  }

  _bonusRolls(points) {
    return points.frames[9].strike || points.frames[9].spare;
  }
}

module.exports = Player;
