import { Model } from '../base/Model';
import {
	IAppState,
	IProduct,
	IOrder,
	FormErrors,
	IOrderAddress,
	IOrderContacts,
} from '../../types';

// =======================
// Реализация Не Закончена
// =======================
export class AppState extends Model<IAppState> {
	basket: IProduct[] = [];
	catalog: IProduct[];
	order: IOrder = {
		email: '',
		phone: '',
		items: [],
		total: 0,
		payment: '',
		address: '',
	};
	preview: string | null;
	formErrors: FormErrors = {};

	getBasketItems(): IProduct[] {
		return this.basket;
	}

	addToBasket(product: IProduct): void {
		return;
	}

	removeFromBasket(product: IProduct): void {
		return;
	}

	clearBasket(): void {
		return;
	}

	getTotal(): number {
		return;
	}

	setCatalog(products: IProduct[]): void {
		return;
	}

	setPreview(product: IProduct): void {
		return;
	}

	isProductInBasket(product: IProduct): boolean {
		return;
	}

	setOrder(): void {
		return;
	}

	setOrderField(field: keyof IOrderAddress, value: string): void {
		return;
	}

	setContactsField(field: keyof IOrderContacts, value: string): void {
		return;
	}

	validateOrderPaymentMethod() {
		return;
	}

	validateOrderContacts() {
		return;
	}
}
