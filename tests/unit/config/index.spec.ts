describe('config', () => {

  it('should init values', () => {
    expect(global.env).toBeDefined();
    expect(global.port).toBeDefined();
  });
});
