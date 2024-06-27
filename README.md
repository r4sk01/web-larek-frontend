# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Архитектура Проекта
В проекте используется событийно-ориентированный подход. Взаимодействие между слоями приложения происходит через обмен данными, вызванными определенными событиями.

Используется подход Model-View Presenter (MVP), который позволяет разделить отображение и данные. Архитектура состоит из трех слоев:
1. Model (Слой Данных) - бизнес логика, хранение и изменение данных.
2. View (Слой Представления) - отображение данных.
3. Presenter - взаимодействие Слоя Данных со Слоем Представления. Задача: получать данные из вне и отправлять данные.

# Слой Данных

## Interface `IProduct`
Описывает продукт в каталоге.
- `id: string` - уникальный идентификатор продукта.
- `title: string` - название продукта.
- `description?: string` - необязательное описание продукта.
- `category: string` - категория продукта
- `price: number` - цена продукта.
- `image: string` - URL на изображения продукта.

## Interface `IBasket`
Описывает корзину.
- `id: string` - уникальный идентификатор корзины (своя корзина есть у каждого пользователя приложения).
- `price: number` - базовая стоимость продуктов в корзине.
- `total: number` - стоимость продукта в корзине с учетом скидок.
- `items: string[]` - перечень продуктов в корзине.

## Interface `IOrderForm`
Описывает форму оформления заказа.
- `email: string` - электронная почта покупателя.
- `phone: string` - телефонный номер покупателя.
- `address: string` - адрес доставки.
- `payment: string` - метод оплаты.

## Interface `IOrderAddress`
Описывает адрес заказа.
- `address: string` - адрес доставки.
- `payment: string` - метод оплаты.

## Interface `IOrderContacts`
Описывает контактные данные заказа.
- `email: string` - электронный адрес.
- `phone: string` - номер телефона.

## Interface `IOrder` extends `IOrderAddress`, `IOrderContacts`
Описывает заказ, расширяет IOrderAddress и IOrderContacts.
- `items: string[]` - перечень продуктов в заказе.
- `total: number` - стоимость продуктов в заказе.

## Interface `IOrderResult`
Описывает результат оформления заказа.
- `id: string` - уникальный идентификатор заказа.
- `total: number` - стоимость списанная или к оплате за заказ.

## Class `Model<T>`
Базовая модель для данных, позволяет работать с событиями.

### Свойства
- **events**: `IEvents` - Интерфейс для управления событиями. Это защищенное свойство.

### Конструктор
```typescript
constructor(data: Partial<T>, events: IEvents)
```
- **data**: `Partial<T>` - Частичные данные для инициализации модели. Тип `T` представляет собой тип данных модели.
- **events**: `IEvents` - Интерфейс для управления событиями.

### Методы
#### emitChanges
```typescript
emitChanges(event: string, payload?: object): void
```
- **event**: `string` - Имя события, которое нужно вызвать.
- **payload**: `object` (необязательно) - Дополнительные данные, которые передаются вместе с событием. По умолчанию пустой объект.
- **Return**: `void` - Этот метод ничего не возвращает.

## Class `AppState` extends `Model<IAppState>`
Управляет состоянием приложения, включая каталог продуктов, корзину и заказы.

### Свойства
- **basket**: `IProduct[]` - Массив продуктов, добавленных в корзину.
- **catalog**: `IProduct[]` - Массив продуктов в каталоге.
- **order**: `IOrder` - Объект, представляющий текущий заказ.
- **preview**: `string | null` - Идентификатор продукта для предпросмотра.
- **formErrors**: `FormErrors` - Объект, содержащий ошибки формы.

### Конструктор
Инициализация свойств: **basket**, **catalog**, **order**, **preview**, **formErrors**.

### Методы
#### getBasketItems
```typescript
getBasketItems(): IProduct[]
```
- **Return**: `IProduct[]` - Массив продуктов в корзине.

#### addToBasket
```typescript
addToBasket(product: IProduct): void
```
- **product**: `IProduct` - Продукт, который нужно добавить в корзину.

#### removeFromBasket
```typescript
removeFromBasket(product: IProduct): void
```
- **product**: `IProduct` - Продукт, который нужно удалить из корзины.

#### clearBasket
```typescript
clearBasket(): void
```
- Очищает корзину.

#### getTotal
```typescript
getTotal(): number
```
- **Return**: `number` - Общая сумма продуктов в корзине.

#### setCatalog
```typescript
setCatalog(products: IProduct[]): void
```
- **products**: `IProduct[]` - Массив продуктов для установки в каталог.

#### setPreview
```typescript
setPreview(product: IProduct): void
```
- **product**: `IProduct` - Продукт для установки в качестве предварительного просмотра.

#### isProductInBasket
```typescript
isProductInBasket(product: IProduct): boolean
```
- **product**: `IProduct` - Продукт для проверки наличия в корзине.
- **Return**: `boolean` - Возвращает `true`, если продукт находится в корзине, иначе `false`.

#### setOrder
```typescript
setOrder(): void
```
- Устанавливает текущий заказ на основе продуктов в корзине.

#### setOrderField
```typescript
setOrderField(field: keyof IOrderAddress, value: string): void
```
- **field**: `keyof IOrderAddress` - Поле заказа для обновления.
- **value**: `string` - Значение для обновления поля заказа.

#### setContactsField
```typescript
setContactsField(field: keyof IOrderContacts, value: string): void
```
- **field**: `keyof IOrderContacts` - Поле контактов для обновления.
- **value**: `string` - Значение для обновления поля контактов.

#### validateOrderPaymentMethod
```typescript
validateOrderPaymentMethod(): boolean
```
- **Return**: `boolean` - Возвращает `true`, если все данные оплаты и адреса корректны, иначе `false`.

#### validateOrderContacts
```typescript
validateOrderContacts(): boolean
```
- **Return**: `boolean` - Возвращает `true`, если все контактные данные корректны, иначе `false`.

# Слой Представления

## Class `Component<T>`
Базовый класс, в котором находятся все методы управления DOM-элементами.

### Конструктор
```typescript
constructor(container: HTMLElement)
```
- **container**: `HTMLElement` - Корневой контейнер для компонента.

### Свойства
- **container**: `HTMLElement` - Корневой контейнер для компонента. Это защищенное и доступное только для чтения свойство.

### Методы
#### toggleClass
```typescript
toggleClass(element: HTMLElement, className: string, force?: boolean): void
```
- **element**: `HTMLElement` - DOM-элемент, для которого нужно переключить класс.
- **className**: `string` - Название класса для переключения.
- **force**: `boolean` (опционально) - Если указано, добавляет или удаляет класс в зависимости от значения.

#### setText
```typescript
protected setText(element: HTMLElement, value: unknown): void
```
- **element**: `HTMLElement` - DOM-элемент, для которого нужно установить текстовое содержимое.
- **value**: `unknown` - Значение, которое будет преобразовано в строку и установлено как текстовое содержимое элемента.

#### setDisabled
```typescript
setDisabled(element: HTMLElement, state: boolean): void
```
- **element**: `HTMLElement` - DOM-элемент, для которого нужно изменить состояние блокировки.
- **state**: `boolean` - Если `true`, элемент будет заблокирован (атрибут `disabled` будет установлен). Если `false`, элемент будет разблокирован (атрибут `disabled` будет удален).

#### setHidden
```typescript
protected setHidden(element: HTMLElement): void
```
- **element**: `HTMLElement` - DOM-элемент, который нужно скрыть. Устанавливает CSS-свойство `display` в значение `none`.

#### setVisible
```typescript
protected setVisible(element: HTMLElement): void
```
- **element**: `HTMLElement` - DOM-элемент, который нужно показать. Удаляет CSS-свойство `display`.

#### setImage
```typescript
protected setImage(element: HTMLImageElement, src: string, alt?: string): void
```
- **element**: `HTMLImageElement` - DOM-элемент изображения, для которого нужно установить источник и альтернативный текст.
- **src**: `string` - URL изображения.
- **alt**: `string` (опционально) - Альтернативный текст для изображения.

#### render
```typescript
render(data?: Partial<T>): HTMLElement
```
- **data**: `Partial<T>` (опционально) - Объект с данными, которые нужно применить к текущему экземпляру компонента.
- **Return**: `HTMLElement` - Возвращает корневой контейнер компонента.

## Class `Page<T>` extends `Component<IPage>`
Наследует класс `Component` и управляет элементами страницы, такими как корзина, каталог и обертка страницы.

### Свойства
- **_counter**: `HTMLElement` - Счетчик корзины. Это защищенное свойство.
- **_catalog**: `HTMLElement` - Элемент каталога. Это защищенное свойство.
- **_wrapper**: `HTMLElement` - Обертка страницы. Это защищенное свойство.
- **_basket**: `HTMLElement` - Элемент корзины. Это защищенное свойство.
- **events**: `IEvents` - Интерфейс для управления событиями. Это защищенное свойство.

### Конструктор
```typescript
constructor(container: HTMLElement, events: IEvents)
```
- **container**: `HTMLElement` - Контейнер для компонента.
- **events**: `IEvents` - Интерфейс для управления событиями.

### Методы
#### set counter
```typescript
set counter(value: number)
```
- **value**: `number` - Значение для установки в счетчик корзины.

#### set catalog
```typescript
set catalog(items: HTMLElement[])
```
- **items**: `HTMLElement[]` - Массив элементов для замены содержимого каталога.

#### set locked
```typescript
set locked(value: boolean)
```
- **value**: `boolean` - Логическое значение для блокировки или разблокировки обертки страницы.

## Class `Modal<T>` extends `Component<IModal>`
Класс для управления модальными окнами.

### Свойства

- **_closeButton**: `HTMLButtonElement` - Кнопка для закрытия модального окна. Это защищенное свойство.
- **_content**: `HTMLElement` - Контейнер для содержимого модального окна. Это защищенное свойство.
- **events**: `IEvents` - Интерфейс для управления событиями. Это защищенное свойство.

### Конструктор
```typescript
constructor(container: HTMLElement, events: IEvents)
```
- **container**: `HTMLElement` - Контейнер, в котором находится модальное окно.
- **events**: `IEvents` - Интерфейс для управления событиями.

### Методы
#### set content
```typescript
set content(value: HTMLElement)
```
- **value**: `HTMLElement` - Новый элемент, который будет установлен в качестве содержимого модального окна.

#### open
```typescript
open(): void
```
Открывает модальное окно и добавляет обработчик для закрытия по нажатию клавиши `Escape`.

#### close
```typescript
close(): void
```
Закрывает модальное окно и удаляет обработчик для закрытия по нажатию клавиши `Escape`.

#### render
```typescript
render(data: IModal): HTMLElement
```
- **data**: `IModal` - Данные для рендеринга модального окна.
- **Return**: `HTMLElement` - Возвращает контейнер модального окна.

## Class `Card<T>` extends `Component<ICard>`
Класс для управления карточкой продукта на веб-странице.

### Свойства
- **_title**: `HTMLElement` - Элемент заголовка карточки. Это защищенное свойство.
- **_image**: `HTMLImageElement` | `undefined` - Элемент изображения карточки. Это защищенное свойство.
- **_description**: `HTMLElement` | `undefined` - Элемент описания карточки. Это защищенное свойство.
- **_button**: `HTMLButtonElement` | `undefined` - Элемент кнопки карточки. Это защищенное свойство.
- **_price**: `HTMLElement` - Элемент цены карточки. Это защищенное свойство.
- **_category**: `HTMLElement` | `undefined` - Элемент категории карточки. Это защищенное свойство.

### Конструктор
```typescript
constructor(blockName: string, container: HTMLElement, actions?: IProductActions)
```
- **blockName**: `string` - Имя блока для поиска элементов внутри контейнера.
- **container**: `HTMLElement` - Контейнер, в котором находится карточка.
- **actions**: `IProductActions` - Объект с действиями для карточки, может содержать обработчик кликов.

### Методы и Сеттеры/Геттеры
#### id
```typescript
set id(value: string)
```
- **value**: `string` - Идентификатор карточки.

```typescript
get id(): string
```
- **Return**: `string` - Идентификатор карточки.

#### title
```typescript
set title(value: string)
```
- **value**: `string` - Заголовок карточки.

```typescript
get title(): string
```
- **Return**: `string` - Заголовок карточки.

#### image
```typescript
set image(value: string)
```
- **value**: `string` - URL изображения карточки.

#### description
```typescript
set description(value: string)
```
- **value**: `string` - Описание карточки.

#### price
```typescript
set price(value: number)
```
- **value**: `number` - Цена карточки. Если значение `null`, то цена устанавливается как "Бесценно".

```typescript
get price(): number | null
```
- **Return**: `number | null` - Цена карточки.

#### category
```typescript
set category(value: string)
```
- **value**: `string` - Категория карточки.

```typescript
get category(): string
```
- **Return**: `string` - Категория карточки.

#### button
```typescript
set button(value: string)
```
- **value**: `string` - Текст кнопки карточки.

#### toggleButton
```typescript
toggleButton(state: boolean)
```
- **state**: `boolean` - Состояние кнопки: `true` - отключена, `false` - включена.

## Class `Basket<T>` extends `Component<IBasket>`
Управляет корзиной товаров на веб-странице.

### Свойства
- **_list**: `HTMLElement` - HTML элемент, представляющий список товаров в корзине. Это защищенное свойство.
- **_total**: `HTMLElement` - HTML элемент, представляющий общую стоимость товаров в корзине. Это защищенное свойство.
- **_button**: `HTMLElement` - HTML элемент, представляющий кнопку для оформления заказа. Это защищенное свойство.
- **events**: `EventEmitter` - Экземпляр класса `EventEmitter`, используемый для управления событиями. Это защищенное свойство.

### Конструктор
```typescript
constructor(container: HTMLElement, events: EventEmitter)
```
- **container**: `HTMLElement` - HTML элемент, в который будет встроена корзина.
- **events**: `EventEmitter` - Экземпляр класса `EventEmitter`, используемый для управления событиями.

### Методы
#### set items
```typescript
set items(items: HTMLElement[])
```
- **items**: `HTMLElement[]` - Массив HTML элементов, представляющих товары в корзине.

#### set total
```typescript
set total(price: number)
```
- **price**: `number` - Общая стоимость товаров в корзине.

## Class `Form<T>` extends `Component<IFormState>`
Компонент формы, который управляет ее состоянием и событиями.

### Свойства
- **container**: `HTMLFormElement` - HTML-элемент формы, который является контейнером для компонента. Это защищенное свойство.
- **events**: `IEvents` - Объект для управления событиями. Это защищенное свойство.
- **_submit**: `HTMLButtonElement` - Кнопка отправки формы. Это защищенное свойство.
- **_errors**: `HTMLElement` - Элемент для отображения ошибок формы. Это защищенное свойство.

### Конструктор
```typescript
constructor(container: HTMLFormElement, events: IEvents)
```
- **container**: `HTMLFormElement` - HTML-элемент формы, который является контейнером для компонента.
- **events**: `IEvents` - Объект для управления событиями.

### Методы
#### onInputChange

```typescript
protected onInputChange(field: keyof T, value: string): void
```
- **field**: `keyof T` - Поле формы, которое было изменено.
- **value**: `string` - Новое значение поля.
- **Return**: `void`

#### render
```typescript
render(state: Partial<T> & IFormState): HTMLFormElement
```
- **state**: `Partial<T> & IFormState` - Состояние формы, включающее частичное состояние полей формы и состояние интерфейса формы.
- **Return**: `HTMLFormElement` - Возвращает HTML-элемент формы.

### Сеттеры
#### valid
```typescript
set valid(value: boolean)
```
- **value**: `boolean` - Устанавливает, является ли форма валидной.

#### errors
```typescript
set errors(value: string)
```
- **value**: `string` - Устанавливает текст ошибок формы.

## Class `OrderForm` extends `Form<IOrderForm>`
Управляет формой заказа, наследует функциональность от класса `Form`.

### Свойства
- **_address**: `HTMLInputElement` - Поле ввода адреса. Это защищенное свойство.
- **_buttons**: `HTMLButtonElement[]` - Массив кнопок управления. Это защищенное свойство.

### Конструктор
```typescript
constructor(container: HTMLFormElement, events: IEvents)
```
- **container**: `HTMLFormElement` - HTML-элемент формы, в котором находятся все элементы формы.
- **events**: `IEvents` - Интерфейс для управления событиями формы.

### Методы
#### set class
```typescript
set class(name: string)
```
- **name**: `string` - Имя класса, который будет применен к кнопкам.

#### set address
```typescript
set address(value: string)
```
- **value**: `string` - Значение адреса.

## Class `ContactForm` extends `Form<IOrderForm>`
Управляет формой контактных данных для заказа.

### Свойства
- **_phone**: `HTMLInputElement` - Поле ввода для номера телефона. Это защищенное свойство.
- **_email**: `HTMLInputElement` - Поле ввода для адреса электронной почты. Это защищенное свойство.

### Конструктор
```typescript
constructor(container: HTMLFormElement, events: IEvents)
```
- **container**: `HTMLFormElement` - HTML-форма, содержащая элементы для ввода данных.
- **events**: `IEvents` - Объект, управляющий событиями формы.

### Методы
Этот класс наследует методы от класса `Form<IOrderForm>`.

### Сеттеры
#### phone
```typescript
set phone(value: string)
```
- **value**: `string` - Значение, которое будет установлено в поле ввода для номера телефона.

#### email
```typescript
set email(value: string)
```
- **value**: `string` - Значение, которое будет установлено в поле ввода для адреса электронной почты.

## Class `Success` extends `Component<ISuccess>`
Управляет отображением успешным завершением заказа.

### Свойства
- **_close**: `HTMLButtonElement` - Кнопка закрытия компонента. Это защищенное свойство.
- **_total**: `HTMLElement` - Элемент, отображающий общую сумму списания. Это защищенное свойство.

### Конструктор
```typescript
constructor(container: HTMLElement, actions: ISuccessActions)
```
- **container**: `HTMLElement` - Контейнер, в который будет встроен компонент.
- **actions**: `ISuccessActions` - Объект, содержащий действия для компонента успеха. Может включать обработчик события клика.

### Методы

#### set total
```typescript
set total(price: number)
```
- **price**: `number` - Сумма, которая будет отображена в элементе `_total`.

# Слой Presenter (Коммуникации)

## Class `API`
Управляет запросами к удаленному серверу.

### Свойства
- **baseUrl**: `string` - Базовый URL для API-запросов. Это свойство доступно только для чтения.
- **options**: `RequestInit` - Опции для настройки запросов. Это защищенное свойство.

### Конструктор
```typescript
constructor(baseUrl: string, options: RequestInit = {})
```
- **baseUrl**: `string` - Базовый URL для API-запросов.
- **options**: `RequestInit` - Опции для настройки запросов. По умолчанию включает заголовок `'Content-Type': 'application/json'`.

### Методы

#### handleResponse
```typescript
protected handleResponse(response: Response): Promise<object>
```
- **response**: `Response` - Ответ от сервера.
- **Return**: `Promise<object>` - Промис, который разрешается в объект, если ответ успешен, или отклоняется с ошибкой.

#### get
```typescript
get(uri: string): Promise<object>
```
- **uri**: `string` - URI для GET-запроса.
- **Return**: `Promise<object>` - Промис, который разрешается в объект, содержащий данные ответа.

#### post
```typescript
post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>
```
- **uri**: `string` - URI для POST-запроса.
- **data**: `object` - Данные для отправки в теле запроса.
- **method**: `ApiPostMethods` - Метод HTTP-запроса. По умолчанию `'POST'`.
- **Return**: `Promise<object>` - Промис, который разрешается в объект, содержащий данные ответа.

## Class `WebLarekAPI` extends `Api` implements `IWebLarekAPI`
Расширяет базовый класс API для работы приложения.
### Свойства
- **url**: `string` - Базовый URL. Это свойство доступно только для чтения.

### Конструктор
```typescript
constructor(url: string, baseUrl: string, options?: RequestInit)
```
- **url**: `string` - Базовый URL.
- **baseUrl**: `string` - Базовый URL для API-запросов.
- **options**: `RequestInit` - Опции для настройки запросов. По умолчанию включает заголовок `'Content-Type': 'application/json'`.

### Методы

#### getProductList
```typescript
getProductList(): Promise<IProduct[]>
```
- **Return**: `Promise<IProduct[]>` - Промис, который разрешается в массив объектов `IProduct`, содержащий список продуктов.

#### getProductItem
```typescript
getProductItem(id: string): Promise<IProduct>
```
- **id**: `string` - Идентификатор продукта.
- **Return**: `Promise<IProduct>` - Промис, который разрешается в объект `IProduct`, содержащий данные о продукте.

#### orderProducts
```typescript
orderProducts(order: IOrder): Promise<IOrderResult>
```
- **order**: `IOrder` - Объект заказа, содержащий информацию о заказанных продуктах.
- **Return**: `Promise<IOrderResult>` - Промис, который разрешается в объект `IOrderResult`, содержащий результат обработки заказа.

## Class `EventEmitter`
Реализация брокера событий, который позволяет подписываться на события, инициировать события с данными и управлять подписками.

### Свойства
- **_events**: `Map<EventName, Set<Subscriber>>` - Карта, хранящая события и их подписчиков. Это защищенное свойство.

### Конструктор
```typescript
constructor()
```
Конструктор инициализирует пустую карту `_events`.

### Методы

#### on
```typescript
on<T extends object>(eventName: EventName, callback: (event: T) => void): void
```
- **eventName**: `EventName` - Имя события, на которое устанавливается обработчик. Может быть строкой или регулярным выражением.
- **callback**: `(event: T) => void` - Функция-обработчик, которая будет вызвана при возникновении события.
- **Return**: `void`

#### off
```typescript
off(eventName: EventName, callback: Subscriber): void
```
- **eventName**: `EventName` - Имя события, с которого снимается обработчик. Может быть строкой или регулярным выражением.
- **callback**: `Subscriber` - Функция-обработчик, которая будет удалена.
- **Return**: `void`

#### emit
```typescript
emit<T extends object>(eventName: string, data?: T): void
```
- **eventName**: `string` - Имя события, которое инициируется.
- **data**: `T` - Данные, передаваемые в обработчики события. Необязательный параметр.
- **Return**: `void`

#### onAll
```typescript
onAll(callback: (event: EmitterEvent) => void): void
```
- **callback**: `(event: EmitterEvent) => void` - Функция-обработчик, которая будет вызвана при возникновении любого события.
- **Return**: `void`

#### offAll
```typescript
offAll(): void
```
- **Return**: `void`
- Сбрасывает все обработчики событий.

#### trigger
```typescript
trigger<T extends object>(eventName: string, context?: Partial<T>): (event: T) => void
```
- **eventName**: `string` - Имя события, которое будет инициировано.
- **context**: `Partial<T>` - Контекст, который будет передан в событие. Необязательный параметр.
- **Return**: `(event: T) => void` - Функция, которая при вызове инициирует событие с заданным именем и контекстом.