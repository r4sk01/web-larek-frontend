export enum ApplicationEvents {
	AddressErrorsChange = 'addressErrors:change',
	BasketAdd = 'basket:add',
	BasketChange = 'basket:change',
	BasketOpen = 'basket:open',
	BasketRemove = 'basket:remove',
	CardBasket = 'card:basket',
	CardSelect = 'card:select',
	ContactsErrorsChange = 'contactsErrors:change',
	ContactsSubmit = 'contacts:submit',
	ItemsChange = 'items:change',
	ModalOpen = 'modal:open',
	ModalClose = 'modal:close',
	OrderReady = 'order:ready',
	OrderOpen = 'order:open',
	OrderSubmit = 'order:submit',
	OrderSuccess = 'order:success',
	PreviewChange = 'preview:change',
}

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
	cardIndex?: string;
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

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IProductActions {
	onClick: (event: MouseEvent) => void;
}

export interface ISuccessActions {
	onClick: () => void;
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
