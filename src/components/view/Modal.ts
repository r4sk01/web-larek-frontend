import { Component } from '../base/Component';
import { IModal } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

// =======================
// Реализация Не Закончена
// =======================
export class Modal extends Component<IModal> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('mousedown', this.close.bind(this));
		this.container.addEventListener('mousedown', this.close.bind(this));
		this._content.addEventListener('mousedown', (event) =>
			event.stopPropagation()
		);
	}

	private _toggleModal(state = true): void {
		return;
	}

	private _handleEscape = (evt: KeyboardEvent): void => {
		return;
	};

	set content(value: HTMLElement) {
		return;
	}

	open(): void {
		return;
	}

	close(): void {
		return;
	}

	render(data: IModal): HTMLElement {
		return;
	}
}
