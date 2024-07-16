import { Api, ApiListResponse } from '../base/Api';
import { IOrder, IOrderResult, IProduct, IWebLarekAPI } from '../../types';

export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly url: string;

	constructor(url: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.url = url;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.url + item.image,
			}))
		);
	}

	getProductItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.url + item.image,
		}));
	}

	orderProducts(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
