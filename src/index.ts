import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { API_URL, CDN_URL } from './utils/constants';
import { WebLarekAPI } from './components/presenter/WebLarekAPI';
import { EventEmitter } from './components/base/Events';
import { AppState, CatalogChangeEvent } from './components/model/AppState';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { OrderForm } from './components/view/OrderForm';
import { ContactsForm } from './components/view/ContactForm';
import { Success } from './components/view/Success';
import { Card } from './components/view/Card';
import { ApplicationEvents } from './components/base/ApplicationEvents';
import { IOrderAddress, IOrderContacts, IProduct } from './types';

const cardCatalogTmp = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTmp = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTmp = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTmp = ensureElement<HTMLTemplateElement>('#basket');
const orderTmp = ensureElement<HTMLTemplateElement>('#order');
const contactsTmp = ensureElement<HTMLTemplateElement>('#contacts');
const successTmp = ensureElement<HTMLTemplateElement>('#success');

const larekAPI = new WebLarekAPI(CDN_URL, API_URL);
const events = new EventEmitter();
const appState = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTmp), events);
const orderForm = new OrderForm(cloneTemplate(orderTmp), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTmp), events);
const success = new Success(cloneTemplate(successTmp), {
	onClick: () => modal.close(),
});

// @todo: Catalog Elements changed
events.on<CatalogChangeEvent>(ApplicationEvents.ItemsChange, () => {
	page.catalog = appState.catalog.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTmp), {
			onClick: () => events.emit(ApplicationEvents.CardSelect, item),
		});
		return card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});

	page.counter = appState.getBasketItems().length;
});

// @todo: Open Item Card
events.on(ApplicationEvents.CardSelect, (item: IProduct) => {
	appState.setPreview(item);
});

// @todo: Change to Chosen Item
events.on(ApplicationEvents.PreviewChange, (item: IProduct) => {
	const card = new Card('card', cloneTemplate(cardPreviewTmp), {
		onClick: () => {
			events.emit(ApplicationEvents.CardBasket, item);
			card.button = appState.isProductInBasket(item)
				? 'Удалить из корзины'
				: 'В корзину';
		},
	});

	// Button Initial State When Item Card is Opened
	card.button = appState.isProductInBasket(item)
		? 'Удалить из корзины'
		: 'В корзину';

	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
			description: item.description,
		}),
	});
});

// @todo: Switch Item Card Buttons (Add, Remove)
events.on(ApplicationEvents.CardBasket, (item: IProduct) => {
	if (appState.basket.indexOf(item) === -1) {
		events.emit(ApplicationEvents.BasketAdd, item);
	} else {
		events.emit(ApplicationEvents.BasketRemove, item);
	}
});

// @todo: Add Item to Basket
events.on(ApplicationEvents.BasketAdd, (item: IProduct) => {
	appState.addToBasket(item);
});

// @todo: Remove Item From Basket
events.on(ApplicationEvents.BasketRemove, (item: IProduct) => {
	appState.removeFromBasket(item);
});

// @todo: Basket Size
events.on(ApplicationEvents.BasketChange, () => {
	page.counter = appState.basket.length;
});

// @todo: Open Basket
events.on(ApplicationEvents.BasketOpen, () => {
	basket.total = appState.getTotal();
	modal.render({
		content: basket.render({
			price: appState.getTotal(),
		}),
	});
});

// @todo: Basket Update
events.on(ApplicationEvents.BasketChange, () => {
	basket.items = appState.basket.map((item) => {
		const card = new Card('card', cloneTemplate(cardBasketTmp), {
			onClick: () => {
				events.emit(ApplicationEvents.BasketRemove, item);
			},
		});
		return card.render({
			title: item.title,
			price: item.price,
		});
	});

	basket.total = appState.getTotal();
});

//@todo: Open First Modal with Address
events.on(ApplicationEvents.OrderOpen, () => {
	modal.render({
		content: orderForm.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

//@todo: Handler for Fields Change within Modal with Address
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderAddress; value: string }) => {
		appState.setOrderField(data.field, data.value);
	}
);

//@todo: Open Second Modal with Email and Phone Number
events.on(ApplicationEvents.OrderSubmit, () => {
	modal.render({
		content: contactsForm.render({
			phone: '',
			email: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

//@todo: Handler for Fields Change within Modal with Address
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderContacts; value: string }) => {
		appState.setContactsField(data.field, data.value);
	}
);

//@todo: Display Errors in Forms Input (For Both Forms)
events.on(
	ApplicationEvents.AddressErrorsChange,
	(errors: Partial<IOrderAddress>) => {
		const { address, payment } = errors;
		orderForm.valid = !payment && !address;
		orderForm.errors = Object.values({ payment, address })
			.filter((i) => !!i)
			.join('; ');
	}
);

events.on(
	ApplicationEvents.ContactsErrorsChange,
	(errors: Partial<IOrderContacts>) => {
		const { email, phone } = errors;
		contactsForm.valid = !email && !phone;
		contactsForm.errors = Object.values({ email, phone })
			.filter((i) => !!i)
			.join('; ');
	}
);

//@todo: Block Scroll if any Modal is Opened
events.on(ApplicationEvents.ModalOpen, () => {
	page.locked = true;
});

//@todo: Unblock Scroll if any Modal is Opened
events.on(ApplicationEvents.ModalClose, () => {
	page.locked = false;
});

//@todo: Get Items from the Server
larekAPI
	.getProductList()
	.then(appState.setCatalog.bind(appState))
	.catch(console.error);

//@todo: Send an Order to the Server
events.on(ApplicationEvents.ContactsSubmit, () => {
	appState.setOrder();
	larekAPI
		.orderProducts(appState.order)
		.then((res) => {
			page.counter = appState.basket.length;
			modal.render({
				content: success.render({
					total: appState.getTotal(),
				}),
			});
			appState.clearBasket();
			events.emit(ApplicationEvents.OrderSuccess, res);
		})
		.catch(console.error);
});
