<template>
<item-container
    class="authors"
    add-button-text="Pridať autora"
    :show-add-button-top-border="!authors.length"
    @add="addAuthor"
>
    <author
        v-for="author in authors"
        :key="author.tempId || author.id"
        :books_count="author.books_count"
        :name="author.name"
        :surname="author.surname"
        @input="(prop, value) => onItemInput(author, prop, value)"
        @remove="removeItem(author)"
        @submit="submitItem(author)"
    />
</item-container>
</template>

<script lang="ts">
import Author from '@/components/Author.vue';
import ItemContainer from '@/components/ItemContainer.vue';
import ItemContainerMixin from '@/mixins/ItemContainerMixin';
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    name: 'Authors',
    mixins: [ItemContainerMixin],
    components: {
        Author,
        ItemContainer
    },
    methods: {
        async addAuthor(): Promise<void> {
            await this.$store.dispatch('addAuthor');
        }
    },
    data() {
        return {
            tableName: 'authors'
        };
    },
    computed: {
        ...mapState(['authors'])
    }
});
</script>

<style lang="scss" scoped>

</style>
