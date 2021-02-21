import {assert} from 'chai';
import {describe, it} from 'mocha';

import {TestUtil} from '../../../../misc/test-util';
import {
	ColorFormatter,
	colorToHexRgbString,
} from '../../../common/formatter/color';
import {Color} from '../../../common/model/color';
import {Value} from '../../../common/model/value';
import {ViewModel} from '../../../common/model/view-model';
import {CompositeColorParser} from '../../../common/parser/string-color';
import {ColorSwatchTextController} from './color-swatch-text';

describe(ColorSwatchTextController.name, () => {
	it('should dispose', () => {
		const doc = TestUtil.createWindow().document;
		const c = new ColorSwatchTextController(doc, {
			formatter: new ColorFormatter(colorToHexRgbString),
			parser: CompositeColorParser,
			supportsAlpha: false,
			value: new Value(new Color([0, 0, 0], 'rgb')),
			viewModel: new ViewModel(),
		});
		c.viewModel.dispose();
		assert.strictEqual(c.viewModel.disposed, true);
	});
});
