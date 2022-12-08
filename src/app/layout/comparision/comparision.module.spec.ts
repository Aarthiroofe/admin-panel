import { ComparisionModule } from './comparision.module';

describe('ComparisionModule', () => {
  let comparisionModule: ComparisionModule;

  beforeEach(() => {
    comparisionModule = new ComparisionModule();
  });

  it('should create an instance', () => {
    expect(comparisionModule).toBeTruthy();
  });
});
