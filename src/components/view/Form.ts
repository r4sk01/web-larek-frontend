import { Component } from '../base/Component';
import { IFormState } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

// =======================
// Реализация Не Закончена
// =======================
export class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (evt: Event) => {
			const target = evt.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (evt: Event) => {
			evt.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string): void {
		return;
	}

	set valid(value: boolean) {
		return;
	}

	set errors(value: string) {
		return;
	}

	render(state: Partial<T> & IFormState) {
		// To Be done
		return this.container;
	}
}
