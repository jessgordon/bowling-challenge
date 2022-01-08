const Frame = require('../lib/frame');

describe('Frame', () => {
  const frame1 = new Frame();
  const frame2 = new Frame();
  const frame3 = new Frame();

  it('creates an instance of Frame with instance variables', () => {
    expect(frame1.rolls.length).toBe(0);
    expect(frame1.strike).toBe(false);
    expect(frame1.spare).toBe(false);
    expect(frame1.bonus.length).toBe(0);
  });
})