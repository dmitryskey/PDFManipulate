import { USI9 } from '../templates/src/USI9/USI9'
import * as $ from 'jquery';

describe('US I-9', () => {
    let form = new USI9(null);

    form.renderSections();

    it('Section 1', () => {
        for (let d of [1, 2]) {
          expect(true).toBe(false);
        }
    });
});