import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { ICard, IProductActions } from '../../types';
import { categorySettings } from '../../utils/categorySettings';

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _cardIndex?: HTMLElement;

	constructor(container: HTMLElement, actions?: IProductActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = container.querySelector('.card__image');
		this._button = container.querySelector('.card__button');
		this._description = container.querySelector('.card__text');
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._category = container.querySelector('.card__category');
		this._cardIndex = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: number) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
			this.toggleButton(true);
			this.button = 'Нельзя купить';
		} else {
			this.setText(this._price, `${value} синапсов`);
			this.toggleButton(false);
		}
	}

	get price(): number | null {
		return Number(this._price.textContent);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(
			this._category,
			`card__category_${categorySettings[value]}`
		);
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set cardIndex(value: string) {
		this._cardIndex.textContent = value;
	}

	get cardIndex(): string {
		return this._cardIndex.textContent || '';
	}

	set button(value: string) {
		this.setText(this._button, value);
	}

	toggleButton(state: boolean) {
		this.setDisabled(this._button, state);
	}
}
