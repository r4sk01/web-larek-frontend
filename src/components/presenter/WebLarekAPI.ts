import { Api } from '../base/Api';
import { IOrder, IOrderResult, IProduct, IWebLarekAPI } from '../../types';

// =======================
// Реализация Не Закончена
// =======================
export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly url: string;

	constructor(url: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.url = url;
	}

	getProductList(): Promise<IProduct[]> {
		return;
	}

	getProductItem(id: string): Promise<IProduct> {
		return;
	}

	orderProducts(order: IOrder): Promise<IOrderResult> {
		return;
	}
}
