import { WordLimitPipe } from './word-limit.pipe';

describe('WordLimitPipe', () => {
  it('create an instance', () => {
    const pipe = new WordLimitPipe();
    expect(pipe).toBeTruthy();
  });
});
