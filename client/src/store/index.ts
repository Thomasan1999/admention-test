import {AuthorModel, BookModel, Model} from '@/types';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authors: [] as AuthorModel[],
        books: [] as BookModel[],
        initialized: false
    },
    mutations: {
        addAuthor(state, newAuthor): void {
            state.authors.push(newAuthor);
        },
        addBook(state, newBook): void {
            state.books.push(newBook);
        },
        decrementBookCount(state, {author_id}: {author_id: number}): void {
            const author = state.authors.find((author) => author.id === author_id)!;

            author.books_count--;
        },
        incrementBookCount(state, {author_id}: {author_id: number}): void {
            const author = state.authors.find((author) => author.id === author_id)!;

            author.books_count++;
        },
        loadStoredItems(state, {items, tableName}: {items: Model[], tableName: string}): void {
            state[tableName] = items;
        },
        removeItem(state, {item, tableName}: {item: Model, tableName: string}): void {
            const collection = state[tableName];

            const itemIndex = state[tableName].indexOf(item);

            collection.splice(itemIndex, 1);
        },
        set(state, {prop, value}: {prop: keyof Model, value: any}): void {
            state[prop] = value;
        },
        submitItem(state, {item, newValue}: {item: Model, newValue: Model, tableName: string}): void {
            if (item.tempId) {
                Vue.delete(item, 'tempId');
            }

            Object.entries(newValue).forEach(([prop, value]) => {
                item[prop] = value;
            });
        },
        updateItem({}, {item, prop, value}: {item: Model, prop: keyof Model, value: any}): void {
            item[prop] = value;
        }
    },
    actions: {
        async addAuthor({commit, dispatch, state}): Promise<void> {
            const newAuthor: Omit<AuthorModel, 'id'> = {
                books_count: 0,
                name: '',
                surname: '',
                tempId: await dispatch('getTempId', {items: state.authors})
            };

            await dispatch('makeValueReactive', {value: newAuthor});

            commit('addAuthor', newAuthor);
        },
        async addBook({commit, dispatch, state}): Promise<void> {
            const newBook: Omit<BookModel, 'id'> = {
                author_id: 0,
                is_borrowed: false,
                tempId: await dispatch('getTempId', {items: state.books}),
                title: ''
            };

            await dispatch('makeValueReactive', {value: newBook});

            commit('addBook', newBook);
        },
        async fetchItems({dispatch}, {tableName}: {tableName: string}): Promise<Model[]> {
            const url = await dispatch('getApiUrl', {path: tableName});

            const res = await fetch(url, {method: 'GET'});

            return res.json();
        },
        async getApiUrl({}, {path}: {path: string}): Promise<string> {
            return `${process.env.VUE_APP_API_URL}/${path}`;
        },
        async getTempId({}, {items}: {items: Model[]}): Promise<number> {
            const lastItem = items[items.length - 1];
            const currentMaxTempId: number = lastItem?.id ?? lastItem?.tempId ?? 0;

            return currentMaxTempId + 1;
        },
        async init({commit, dispatch, state}): Promise<void> {
            if (state.initialized) {
                throw new Error('Store has been already initialized');
            }

            await Promise.all([
                dispatch('loadStoredItems', {tableName: 'authors'}),
                dispatch('loadStoredItems', {tableName: 'books'})
            ]);

            commit('set', {prop: 'initialized', value: true});
        },
        async loadStoredItems({commit, dispatch}, {tableName}: {tableName: string}) {
            const storedItems = await dispatch('fetchItems', {tableName});

            await dispatch('makeValueReactive', {value: storedItems});

            commit('loadStoredItems', {items: storedItems, tableName});
        },
        async makeValueReactive(
            {dispatch},
            {key, value, wrapper}: {key: string, value: any, wrapper?: Record<string, any>}
        ): Promise<void> {
            if (typeof value !== 'object' || value === null) {
                Vue.set(wrapper!, key, value);
                return;
            }

            const promises = Object.entries(value).map(async ([nestedKey, nestedValue]) => {
                await dispatch('makeValueReactive', {key: nestedKey, value: nestedValue, wrapper: value});
            });

            await Promise.all(promises);
        },
        async removeBook({commit, dispatch}, {book}: {book: BookModel}): Promise<void> {
            const tableName = 'books';

            await dispatch('removeItem', {item: book, tableName});

            if (book.author_id) {
                commit('decrementBookCount', {author_id: book.author_id, tableName});
            }
        },
        async removeItem({commit, dispatch}, {item, tableName}: {item: Model, tableName: string}): Promise<void> {
            if (item.id) {
                const url = await dispatch('getApiUrl', {path: `${tableName}/${item.id}`});

                await fetch(url, {method: 'DELETE'});
            }

            commit('removeItem', {item, tableName});
        },
        async submitBook({commit, dispatch}, {book}: {book: BookModel}): Promise<void> {
            const tableName = 'books';

            const notSubmitted = Boolean(book.tempId);

            const newValue = await dispatch('submitItem', {item: book, tableName});

            commit('submitItem', {item: book, newValue, tableName});

            if (notSubmitted) {
                commit('incrementBookCount', {author_id: book.author_id});
            }
        },
        async submitItem({commit, dispatch}, {item, tableName}: {item: Model, tableName: string}): Promise<Model> {
            const method = item.tempId ? 'POST' : 'PATCH';
            const path = method === 'PATCH' ? `${tableName}/${item.id}` : tableName;
            const url = await dispatch('getApiUrl', {path});

            const res = await fetch(url, {
                body: JSON.stringify(item),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method
            });

            const newValue = await res.json();

            commit('submitItem', {item, newValue, tableName});

            return newValue;
        },
        async updateBook(
            {commit, dispatch},
            {book, prop, value}: {book: BookModel, prop: keyof BookModel, value: any}
        ): Promise<void> {
            const oldAuthorId = book.author_id;

            await dispatch('updateItem', {item: book, prop, value});

            if (book.id && prop === 'author_id') {
                if (oldAuthorId) {
                    commit('decrementBookCount', {author_id: oldAuthorId});
                }

                commit('incrementBookCount', {author_id: book.author_id});
            }
        },
        async updateItem({commit}, {item, prop, value}: {item: Model, prop: keyof Model, value: any}): Promise<void> {
            commit('updateItem', {item, prop, value});
        }
    }
});
