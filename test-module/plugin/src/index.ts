import Tweakpane from 'tweakpane';
// Import individual classes
import {ValueController} from 'tweakpane/lib/plugin/common/controller/value';
import {stringFromUnknown} from 'tweakpane/lib/plugin/common/converter/string';
import {Value} from 'tweakpane/lib/plugin/common/model/value';
import {ViewProps} from 'tweakpane/lib/plugin/common/model/view-props';
import {
	equalsPrimitive,
	writePrimitive,
} from 'tweakpane/lib/plugin/common/primitive';
import {ClassName} from 'tweakpane/lib/plugin/common/view/class-name';
import {View} from 'tweakpane/lib/plugin/common/view/view';
import {InputBindingPlugin} from 'tweakpane/lib/plugin/input-binding';

interface ViewConfig {
	value: Value<string>;
}

class TestView implements View {
	public readonly element: HTMLElement;
	public readonly value: Value<string>;
	private valueElem_: HTMLElement;

	constructor(doc: Document, config: ViewConfig) {
		this.value = config.value;

		this.element = doc.createElement('div');

		const className = ClassName('tst');
		this.valueElem_ = doc.createElement('button');
		this.valueElem_.classList.add(className('v'));
		this.element.appendChild(this.valueElem_);

		this.update();
	}

	public update(): void {
		this.valueElem_.textContent = this.value.rawValue;
	}
}

class TestController implements ValueController<string> {
	public readonly value: Value<string>;
	public readonly view: TestView;
	public readonly viewProps: ViewProps;

	constructor(
		doc: Document,
		config: {
			value: Value<string>;
			viewProps: ViewProps;
		},
	) {
		this.value = config.value;
		this.viewProps = config.viewProps;

		this.view = new TestView(doc, {
			value: config.value,
		});
	}
}

{
	Tweakpane.registerPlugin({
		type: 'input',
		plugin: {
			id: 'input-test',
			accept(value, params) {
				if (params.view !== 'test') {
					return null;
				}
				return typeof value === 'string' ? value : null;
			},
			binding: {
				reader: () => stringFromUnknown,
				equals: equalsPrimitive,
				writer: () => writePrimitive,
			},
			controller(args) {
				return new TestController(args.document, {
					value: args.value,
					viewProps: args.viewProps,
				});
			},
		} as InputBindingPlugin<string, string>,
	});
}
