import { Form } from './Form';
import { IOrderForm } from '../../types';
import { IEvents } from '../base/Events';
import { ensureAllElements } from '../../utils/utils';

// =======================
// Реализация Не Закончена
// =======================
export class OrderForm extends Form<IOrderForm> {
	protected _address: HTMLInputElement;
	protected _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._address = container.elements.namedItem('address') as HTMLInputElement;
		this._buttons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				this.class = button.name;
			});
		});
	}

	set class(name: string) {
		return;
	}

	set address(value: string) {
		return;
	}
}
