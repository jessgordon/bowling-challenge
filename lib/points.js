const Frame = require('./frame')

class Points {

  USER_REQUEST = 'USER REQUEST'
  GAME_OVER = 'GAME OVER'
  END_OF_FRAME = true

  constructor() {
    this.current_score = 0

    this.frames = []

    for(i = 0; i < 10; i++) {
      this.frames.push(Frame.new)
    }
  }

  update_roll(current_frame, current_roll, pins_knocked_down) {
    let frame_index = current_frame - 1
    this.frames[frame_index].update_roll(current_roll, pins_knocked_down)
    if(current_roll === 2 || this.frames[frame_index].strike === true) {
      update_total(this.frames[frame_index].rolls.sum)
      return true
    } else {
      return false
    }
  }

  update_total(score) {
    this.current_score += score
  }

  add_bonus_points(current_frame_number) {
    let current_frame = this.frames[current_frame_number - 1] 
    let prev_frame1 = this.frames[current_frame_number - 2] 
    let prev_frame2 = this.frames[current_frame_number - 3]

    if(current_frame_number > 1 && (prev_frame1.strike || prev_frame1.spare)) {
      this._add_bonus_for_last_frame(current_frame, prev_frame1)
    }

    if(current_frame_number > 2 && (prev_frame1.strike && prev_frame2.strike)) {
      this._add_bonus_for_two_frames_ago(current_frame, prev_frame1, prev_frame2)
    }
  }

  add_final_round_bonus_points(current_frame_number, number) {
    let current_frame = this.frames[current_frame_number - 1] 
    let previous_frame = this.frames[current_frame_number - 2]
    if(previous_frame.strike && current_frame.strike && current_frame_number === 10) {
      previous_frame.final_round_bonus(current_frame.rolls[0])
      previous_frame.final_round_bonus(number)
    }
    if(current_frame_number === 10 && current_frame.spare) {
      current_frame.final_round_bonus(number)
      update_total(current_frame.bonus.sum)
      return true
    } else if(current_frame_number === 10 && current_frame.strike && current_frame.bonus.length === 0) {
      current_frame.final_round_bonus(number)
    } else if(current_frame_number === 10 && current_frame.strike && current_frame.bonus.length === 1) {
      current_frame.final_round_bonus(number)
      update_total(current_frame.bonus.sum)
      return true
    }
  }

  score_breakdown(reason = 'USER REQUEST') {
    let breakdown = "Frame | Pins | Bonus    \n=====================\n"
    // this.frames.each_with_index do |frame, index|
    //   breakdown += "  #{index + 1}  | #{frame.rolls[0]} , #{frame.rolls[1]} |  #{frame.bonus.sum}\n"
    // end
    if(reason == 'GAME OVER') {
      breakdown += "=====================\n FINAL SCORE: #{this.current_score}\n=====================\n *** GAME OVER *** "
      this.reset()
    }
    return breakdown
  }

  reset() {
    this.current_score = 0
    this.frames = []
    for(i = 0; i < 10; i++) {
      this.frames.push(new Frame)
    }
  }

  _add_bonus_for_last_frame(current_frame, prev_frame1) {
    prev_frame1.add_bonus(current_frame)
    update_total(prev_frame1.bonus.sum)
  }

  _add_bonus_for_two_frames_ago(current_frame, prev_frame1, prev_frame2) {
    prev_frame2.add_bonus(current_frame, prev_frame1)
    update_total(prev_frame2.bonus.sum)
  }
}