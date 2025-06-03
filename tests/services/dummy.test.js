import * as helperModule from '../../src/services/helper.js';
//* we can import all the named exports as a single object using this
import { execute } from '../../src/services/dummy-service.js';

test('dummy test 1', () => {
    const spy = jest.spyOn(helperModule, 'helper').mockImplementation(() => true);
    
    const response = execute();

    expect(spy).toHaveBeenCalled();
    expect(response).toBe("Number comes out to be even");

    spy.mockRestore();
    //* this will restore the original implementation of the function so that it does not hamper the other tests or functionalities
});

test('dummy test 2', () => {
    const spy = jest.spyOn(helperModule, 'helper').mockImplementation(() => false);
    
    const response = execute();

    expect(spy).toHaveBeenCalled();
    expect(response).toBe("Number comes out to be odd");

    spy.mockRestore();
    //* this will restore the original implementation of the function so that it does not hamper the other tests or functionalities
});