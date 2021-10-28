<template>
<item-container
    class="books"
    add-button-text="Pridať knihu"
    :show-add-button-top-border="!books.length"
    @add="addBook"
>
    <book
        v-for="book in books"
        :key="book.id"
        :author_id="book.author_id"
        :is_borrowed="book.is_borrowed"
        :title="book.title"
        @input="(prop, value) => onItemInput(book, prop, value)"
        @remove="removeItem(book)"
        @submit="submitItem(book)"
    />
</item-container>
</template>

<script lang="ts">
import AddItemButton from '@/components/AddItemButton.vue';
import Book from '@/components/Book.vue';
import ItemContainer from '@/components/ItemContainer.vue';
import ItemContainerMixin from '@/mixins/ItemContainerMixin';
import {BookModel} from '@/types';
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    name: 'Books',
    mixins: [ItemContainerMixin],
    components: {
        AddItemButton,
        Book,
        ItemContainer
    },
    methods: {
        async addBook(): Promise<void> {
            await this.$store.dispatch('addBook');
        },
        async onItemInput(book: BookModel, prop: keyof BookModel, value: any): Promise<void> {
            await this.$store.dispatch('updateBook', {book, prop, value});
        },
        async submitItem(book: BookModel): Promise<void> {
            await this.$store.dispatch('submitBook', {book});
        },
        async removeItem(book: BookModel): Promise<void> {
            await this.$store.dispatch('removeBook', {book});
        }
    },
    data() {
        return {
            tableName: 'books'
        };
    },
    computed: {
        ...mapState(['books'])
    }
});
</script>
