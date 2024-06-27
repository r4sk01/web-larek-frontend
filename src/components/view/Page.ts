import { Component } from '../base/Component';
import { IPage } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { ApplicationEvents } from '../base/ApplicationEvents';

// =======================
// Реализация Не Закончена
// =======================
export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit(ApplicationEvents.BasketOpen);
		});
	}

	set counter(value: number) {
		return;
	}

	set catalog(items: HTMLElement[]) {
		return;
	}

	set locked(value: boolean) {
		return;
	}
}
