export interface IProduct {
	id: string;
	title: string;
	description?: string;
	category: string;
	price: number | null;
	image: string;
}

export interface ICard extends IProduct {
	buttonTitle?: string;
}

export interface IBasket {
	id: string;
	price: number;
	total: number;
	items: string[];
}

export interface IOrderForm {
	email: string;
	phone: string;
	address: string;
	payment: string;
	buttons: string[];
}

export type PaymentMethod = 'cash' | 'card';

export interface IOrderAddress {
	address: string;
	payment: string;
}

export interface IOrderContacts {
	email: string;
	phone: string;
}

export interface IOrder extends IOrderAddress, IOrderContacts {
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IAppState {
	catalog: IProduct[];
	basket: string[];
	order: IOrderForm | null;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IModal {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface ISuccess {
	total: number;
}

export interface IWebLarekAPI {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}
