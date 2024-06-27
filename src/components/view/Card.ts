import { Component } from '../base/Component';
import { ICard, IProductActions } from '../../types';
import { ensureElement } from '../../utils/utils';

// =======================
// Реализация Не Закончена
// =======================
export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: IProductActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = container.querySelector(`.${blockName}__image`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__text`);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._category = container.querySelector(`.${blockName}__category`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		return;
	}

	get id(): string {
		return;
	}

	set title(value: string) {
		return;
	}

	get title(): string {
		return;
	}

	set image(value: string) {
		return;
	}

	set description(value: string) {
		return;
	}

	set price(value: number) {
		return;
	}

	get price(): number | null {
		return;
	}

	set category(value: string) {
		return;
	}

	get category(): string {
		return;
	}

	set button(value: string) {
		return;
	}

	toggleButton(state: boolean): void {
		return;
	}
}
