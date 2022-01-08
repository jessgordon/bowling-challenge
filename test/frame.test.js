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
});
