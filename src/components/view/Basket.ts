import { Component } from '../base/Component';
import { IBasket } from '../../types';
import { EventEmitter } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { ApplicationEvents } from '../base/ApplicationEvents';

// =======================
// Реализация Не Закончена
// =======================
export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit(ApplicationEvents.OrderOpen);
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		return;
	}

	set total(price: number) {
		return;
	}
}
