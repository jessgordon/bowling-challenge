const Player = require("../lib/player");

describe("Player", () => {
  beforeEach(() => {
    points = {
      update_roll: () => false,
      current_score: () => "current score",
      score_breakdown: () => "score breakdown",
      reset: () => "reset",
      add_final_round_bonus_points: () => "add_final_round_bonus_points",
    };
    points_end_of_frame = {
      update_roll: () => true,
      current_score: () => "current score",
      score_breakdown: () => "score breakdown",
      reset: () => "reset",
      add_bonus_points: () => "add_bonus_points",
    };
    player = new Player("John Smith");
  });

  describe("initialize", () => {
    it("records players name and their current frame", () => {
      expect(player.name).toEqual("John Smith");
      expect(player.current_frame).toEqual(1);
    });
  });

  describe("#pins_knocked_down", () => {
    // it("sends a message to an instance of the points class to #update_roll", () => {
    //   expect(update_roll).toHaveBeenCalled();

    //   player.pins_knocked_down(7, points);
    // });

    it("returns the number of pins knocked, down if on roll 1", () => {
      expect(player.pins_knocked_down(7, points)).toEqual(7);
    });

    // it("returns the current score at the end of each frame (2 rolls)", () => {
    //   player.pins_knocked_down(7, points);

    //   expect(points_end_of_frame.current_score()).toHaveBeenCalled();

    //   player.pins_knocked_down(1, points_end_of_frame);
    // });

    // it("returns the current score at the end of each frame (strike)", () => {
    //   expect(points_end_of_frame.current_score()).toHaveBeenCalled();

    //   player.pins_knocked_down(10, points_end_of_frame);
    // });

    // it("informs player game has ended after frame 10 by returning the score breakdown", () => {
    //   for (let i = 0; i < 9; i++) {
    //     player.pins_knocked_down(4, points);
    //     player.pins_knocked_down(4, points_end_of_frame);
    //   }

    //   player.pins_knocked_down(4, points);

    //   expect(points_end_of_frame.score_breakdown()).toHaveBeenCalled();

    //   player.pins_knocked_down(4, points_end_of_frame);
    // });

    it("resets the current frame back to 1 after frame 10 complete", () => {
      for (let i = 0; i < 10; i++) {
        player.pins_knocked_down(4, points);
        player.pins_knocked_down(4, points_end_of_frame);
      }

      expect(player.current_frame).toEqual(1);
    });
  });

  // describe("#bonus_roll(number, points)", () => {
  //   it("calls on points to save bonus points for frame 10", () => {
  //     expect(points.add_final_round_bonus_points()).toHaveBeenCalled();

  //     player.bonus_roll(5, points);
  //   });
  // });
});
