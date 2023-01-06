import Model from './model';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 */
export default class CollectionModel extends Model {
  #store;
  #adapt;
  #filter;
  #sort;

  /**
   * @type {Item[]}  намечаем что будем получать из модели
   */
  #items;

  /**
   * @param {Object} setup объект
   * @param {Store<Item>} setup.store хранилище объектов(айтемов)
   * @param {AdaptCallback<Item,ItemAdapter>} setup.adapt колбек для преобразования объектов из хранилища в нужный вид
   * @param {FilterCallback<ItemAdapter>} [setup.filter]
   * @param {SortCallback<ItemAdapter>} [setup.sort]
   */
  constructor(setup) {
    super();

    this.#store = setup.store;
    this.#adapt = setup.adapt;
    this.#filter = setup.filter;
    this.#sort = setup.sort;

  }

  /**
   * @override
   */
  async ready() {
    this.#items = await this.#store.list(); /**Получили коллекцию и дальше работаем синхронно */
  }

  /**
   * @param {FilterCallback<ItemAdapter>} filter
   */
  setFilter(filter, notify = true) {
    this.#filter = filter;

    if(notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }
  }

  getFilter() {
    return this.#filter;
  }

  /**
   * @param {SortCallback<ItemAdapter>} sort
   */
  setSort(sort, notify = true) {
    this.#sort = sort;

    if(notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }
  }

  getSort() {
    return this.#sort;
  }

  list(
    filter = this.getFilter(),
    sort = this.getSort()
  ) {
    return this.listAll().filter(filter).sort(sort);
  }

  listAll() {
    return this.#items.map(this.#adapt); /**возвращаем садаптированное значение, чтобы работать с тем, что нам удобно, а не с тем говном что шлет сервер */
  }

  /**
   * @param {number} [index]
   */
  item(index) {
    if(arguments.length) { /**проверяем, если аргументы есть, значит выполнится условие */
      const item = this.#items[index];

      return item && this.#adapt(item); /** если вернется item то запишется его адаптированое значение. */
    }

    return this.#adapt();

  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    return this.listAll().find((item) => item[key] === value);
  }

  /**
   * @param {string} id
   */
  findById(id) {
    return this.findBy('id', id);
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findIndexBy(key, value) {
    return this.listAll().findIndex((item) => item[key] === value);
  }

  /**
   * @param {string} id
   */
  findIndexById(id) {
    return this.findIndexBy('id', id);
  }

  /**
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());
    const detail = this.#adapt(newItem);

    this.#items.push(newItem);
    this.dispatchEvent(new CustomEvent('add', {detail}));

    return detail;
  }

  /**
   * @param {ItemAdapter} item
   */
  async update(item) {
    const newItem = await this.#store.update(item.toJSON());
    const index = this.findIndexById(item.id);
    const detail = {newItem: this.#adapt(newItem), oldItem: this.item(index)};

    this.#items.splice(index, 1, newItem);
    this.dispatchEvent(new CustomEvent('update', {detail}));

    return detail;
  }

  /**
   * @param {string} id
   */
  async delete(id) {
    await this.#store.delete(id);

    const index = this.findIndexById(id);
    const detail = this.item(index);

    this.#items.splice(index, 1);
    this.dispatchEvent(new CustomEvent('delete'));
    return detail;
  }
}
