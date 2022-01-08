const Points = require('../lib/points')
const Frame = require('../lib/frame')

describe('Points', () => {
  beforeEach(() => {
    points = new Points()
  });

  describe('initialize', () => {
    it('sets up instance variables for the total score summation and a score breakdown per frame', () => {
      expect(points.current_score).toEqual(0)
      expect(points.frames).toBeInstanceOf(Array)
      expect(points.frames.length).toEqual(10)
      expect(points.frames[0]]).toBeInstanceOf(Frame)
    });
  });

  describe('#update_roll(current_frame, current_roll, pins_knocked_down)', () => {
    // it('sends a message to relevant frame instance to update roll score', () => {     
    //   expect(points.frames[0]).to receive(:update_roll)

    //   points.update_roll(1, 1, 4)
    // // });

    // it('updates current score if on roll 2', () => {
    // //   expect(points).to receive(:update_total)

    // //   points.update_roll(1, 1, 5)
    // //   points.update_roll(1, 2, 5)
    // // });

    // it('updates current score if a strike occured', () => {
    //   expect(points).to receive(:update_total)

    //   points.update_roll(1, 1, 10)
    // });
  });

  describe('#update_total(score)', () => {
    it('adds score for completed frame onto total score instance variable', () => {
      expect(points.current_score).toEqual(0)
      points.update_total(9)
      expect(points.current_score).toEqual(9)
    });
  });

  describe('#add_bonus_points(current_frame_number)', () => {
    it('updates current score with any bonus points from a strike', () => {
      points.update_roll(1, 1, 10)
      points.update_roll(2, 1, 3)
      points.update_roll(2, 2, 4)

      expect(points.current_score).toEqual(17)

      points.add_bonus_points(2)

      expect(points.current_score).toEqual(24)
    });

    it('updates current score with bonus points from consecutive strikes once two rolls are complete', () => {
      points.update_roll(1, 1, 10)
      points.update_roll(2, 1, 10)
      points.update_roll(3, 1, 3)
      points.update_roll(3, 2, 4)

      expect(points.current_score).toEqual(27)

      points.add_bonus_points(3)

      expect(points.current_score).toEqual(47)
    });

    it('updates current score with bonus points from consecutive strikes once two rolls are complete', () => {
      points.update_roll(1, 1, 10)
      points.update_roll(2, 1, 10)
      points.update_roll(3, 1, 10)
      
      expect(points.current_score).toEqual(30)

      points.add_bonus_points(3)

      expect(points.current_score).toEqual(50)
    });

    it('updates current score with any bonus points from a spare', () => {
      points.update_roll(1, 1, 5)
      points.update_roll(1, 2, 5)
      points.update_roll(2, 1, 4)
      points.update_roll(2, 2, 3)

      expect(points.current_score).toEqual(17)

      points.add_bonus_points(2)

      expect(points.current_score).toEqual(21)
    });
  });

  describe('#add_final_round_bonus_points(current_frame, number)', () => {
    it('saves bonus roll scores in frame instance and updates current score when bonus rolls end (strike)', () => {
      points.update_roll(10, 1, 10)
      points.add_final_round_bonus_points(10, 5)
      points.add_final_round_bonus_points(10, 4)

      expect(points.current_score).toEqual(19)
    });

    it('saves bonus roll scores in frame instance and does not update current score if bonus rolls not finished (strike)', () => {
      points.update_roll(10, 1, 10)
      points.add_final_round_bonus_points(10, 5)

      expect(points.current_score).toEqual(10)
    });

    it('saves bonus roll scores in frame instance and updates current score when bonus rolls end (spare)', () => {
      points.update_roll(10, 1, 5)
      points.update_roll(10, 2, 5)
      points.add_final_round_bonus_points(10, 5)

      expect(points.current_score).toEqual(15)
    });
  });

  describe('#score_breakdown', () => {
    it('offers a visual breakdown of the games scores', () => {
      points.update_roll(1, 1, 4)
      points.update_roll(1, 2, 3)

      expect(points.score_breakdown).toEqual("Frame | Pins | Bonus    \n=====================\n  1  | 4 , 3 |  0\n  2  |  ,  |  0\n  3  |  ,  |  0\n  4  |  ,  |  0\n  5  |  ,  |  0\n  6  |  ,  |  0\n  7  |  ,  |  0\n  8  |  ,  |  0\n  9  |  ,  |  0\n  10  |  ,  |  0\n")
    });

    it('provides a score breakdown at the end of the game', () => {
      for(i = 0; i < 10; i++) {
        let frame = new Frame();
        points.update_roll(frame, 1, 4)
        points.update_roll(frame, 2, 3)
      }

      expect(points.score_breakdown('GAME OVER')).toEqual("Frame | Pins | Bonus    \n=====================\n  1  | 4 , 3 |  0\n  2  | 4 , 3 |  0\n  3  | 4 , 3 |  0\n  4  | 4 , 3 |  0\n  5  | 4 , 3 |  0\n  6  | 4 , 3 |  0\n  7  | 4 , 3 |  0\n  8  | 4 , 3 |  0\n  9  | 4 , 3 |  0\n  10  | 4 , 3 |  0\n=====================\n FINAL SCORE: 70\n=====================\n *** GAME OVER *** ")
    });
  });

  describe('#reset', () => {
    it('resets the score instance variables back to zero', () => {
      points.update_roll(1, 1, 4)
      points.update_roll(1, 2, 3)

      expect(points.current_score).toEqual(7)
      expect(points.frames.first.rolls.length).toEqual(2)
      expect(points.frames.first.rolls[0]).toEqual(4)
      expect(points.frames.first.rolls[1]).toEqual(3)

      points.reset

      expect(points.current_score).toEqual(0)
      expect(points.frames[0].rolls.length).toBe(0)
    });
  });
});
