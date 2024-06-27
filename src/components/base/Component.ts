export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	// Переключение Класса
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	// Установить Текст
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	// Сменить Статус Блокировки
	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	// Сделать Hidden
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	// Сделать Visible
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	// Установить Картинку
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	// Возвращает Корневой Элемент (для наследующих классов будет переопределено)
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
