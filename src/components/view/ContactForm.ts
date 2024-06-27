import { Form } from './Form';
import { IOrderForm } from '../../types';
import { IEvents } from '../base/Events';

// =======================
// Реализация Не Закончена
// =======================
export class ContactsForm extends Form<IOrderForm> {
	protected _phone: HTMLInputElement;
	protected _email: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._phone = container.elements.namedItem('phone') as HTMLInputElement;
		this._email = container.elements.namedItem('email') as HTMLInputElement;
	}

	set phone(value: string) {
		return;
	}

	set email(value: string) {
		return;
	}
}
