import { IEvents } from './Events';

// Базовый Класс Модели Данных
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	// Вызов События
	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}

// Проверка Является ли Объект Экземпляром Класса
export const isModel = (obj: unknown): obj is Model<any> => {
	return obj instanceof Model;
};
