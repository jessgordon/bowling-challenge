const Frame = require("../lib/frame");

describe("Frame", () => {
  beforeEach(() => {
    frame1 = new Frame();
    frame2 = new Frame();
    frame3 = new Frame();
  });

  it("creates an instance of Frame with instance variables", () => {
    expect(frame1.rolls).toBeInstanceOf(Array);
    expect(frame1.rolls.length).toBe(0);
    expect(frame1.bonus).toBeInstanceOf(Array);
    expect(frame1.bonus.length).toBe(0);
    expect(frame1.strike).toBe(false);
    expect(frame1.spare).toBe(false);
  });

  describe("#update_roll(current_roll, pins_knocked_down)", () => {
    it("updates the roll score instance variable", () => {
      expect(frame1.rolls.length).toBe(0);

      frame1.update_roll(1, 7);
      frame1.update_roll(2, 1);

      expect(frame1.rolls[0]).toBe(7);
      expect(frame1.rolls[1]).toBe(1);
    });

    it("records if the roll was a strike", () => {
      frame1.update_roll(1, 10);

      expect(frame1.strike).toBe(true);
    });

    it("voids the second roll if the first roll was a strike", () => {
      frame1.update_roll(1, 10);

      expect(frame1.rolls.length).toBe(1);
    });

    it("records if the roll was a spare", () => {
      frame1.update_roll(1, 5);
      frame1.update_roll(2, 5);

      expect(frame1.spare).toBe(true);
    });
  });

  describe("#add_bonus", () => {
    it("calculates bonus points from a strike and saves them in a bonus instance variable", () => {
      frame1.update_roll(1, 10);
      frame2.update_roll(1, 3);
      frame2.update_roll(2, 4);

      frame1.add_bonus(frame2);

      expect(frame1.bonus).toEqual([3, 4]);
    });

    it("calculates bonus points for two strikes in a row", () => {
      frame1.update_roll(1, 10);
      frame2.update_roll(1, 10);
      frame3.update_roll(1, 3);
      frame3.update_roll(2, 4);

      frame1.add_bonus(frame3, frame2);

      expect(frame1.bonus).toEqual([10, 3]);
    });

    it("calculates bonus points for two or more strikes in a row", () => {
      frame1.update_roll(1, 10);
      frame2.update_roll(1, 10);
      frame3.update_roll(1, 10);

      frame1.add_bonus(frame3, frame2);

      expect(frame1.bonus).toEqual([10, 10]);
    });

    it("calculates bonus points from a spare and saves them in a bonus instance variable", () => {
      frame1.update_roll(1, 5);
      frame1.update_roll(2, 5);
      frame2.update_roll(1, 4);
      frame2.update_roll(2, 3);

      frame1.add_bonus(frame2);

      expect(frame1.bonus).toEqual([4]);
    });
  });

  describe("#final_round_bonus", () => {
    it("adds bonus scores for a strike on frame 10", () => {
      frame1.update_roll(1, 10);

      frame1.final_round_bonus(6);
      frame1.final_round_bonus(2);

      expect(frame1.bonus).toEqual([6, 2]);
    });

    it("adds bonus scores for a strike on frame 10", () => {
      frame1.update_roll(1, 10);

      frame1.final_round_bonus(10);
      frame1.final_round_bonus(10);

      expect(frame1.bonus).toEqual([10, 10]);
    });

    it("adds bonus scores for a spare on frame 10", () => {
      frame1.update_roll(1, 8);
      frame1.update_roll(2, 2);

      frame1.final_round_bonus(4);

      expect(frame1.bonus).toEqual([4]);
    });
  });
});
