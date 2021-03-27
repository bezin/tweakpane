import {Formatter} from '../../../common/converter/formatter';
import {BufferedValue} from '../../../common/model/buffered-value';
import {ViewProps} from '../../../common/model/view-props';
import {ClassName} from '../../../common/view/class-name';
import {bindViewProps} from '../../../common/view/reactive';
import {View} from '../../../common/view/view';

interface Config<T> {
	formatter: Formatter<T>;
	lineCount: number;
	value: BufferedValue<T>;
	viewProps: ViewProps;
}

const className = ClassName('mll');

/**
 * @hidden
 */
export class MultiLogView<T> implements View {
	public readonly element: HTMLElement;
	public readonly value: BufferedValue<T>;
	private formatter_: Formatter<T>;
	private textareaElem_: HTMLTextAreaElement;

	constructor(doc: Document, config: Config<T>) {
		this.onValueUpdate_ = this.onValueUpdate_.bind(this);

		this.formatter_ = config.formatter;

		this.element = doc.createElement('div');
		this.element.classList.add(className());
		bindViewProps(config.viewProps, this.element);

		const textareaElem = doc.createElement('textarea');
		textareaElem.classList.add(className('i'));
		textareaElem.style.height = `calc(var(--unit-size) * ${config.lineCount})`;
		textareaElem.readOnly = true;
		this.element.appendChild(textareaElem);
		this.textareaElem_ = textareaElem;

		config.value.emitter.on('change', this.onValueUpdate_);
		this.value = config.value;

		this.update();
	}

	public update(): void {
		const elem = this.textareaElem_;
		const shouldScroll =
			elem.scrollTop === elem.scrollHeight - elem.clientHeight;

		const lines: string[] = [];
		this.value.rawValue.forEach((value) => {
			if (value !== undefined) {
				lines.push(this.formatter_(value));
			}
		});
		elem.textContent = lines.join('\n');

		if (shouldScroll) {
			elem.scrollTop = elem.scrollHeight;
		}
	}

	private onValueUpdate_(): void {
		this.update();
	}
}
