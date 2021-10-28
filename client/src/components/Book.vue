<template>
<item
    class="book"
    remove-button-text="Vymazať knihu"
    submit-button-text="Uložiť knihu"
    :valid="valid" @submit="$emit('submit')" @remove="$emit('remove')">
    <item-form-element>
        <label>
            <input
                type="checkbox"
                :checked="is_borrowed"
                @input="($event) => onInput('is_borrowed', $event.target.checked)"
            >
            <span>Požičaná</span>
        </label>
    </item-form-element>
    <item-form-element>
        <input placeholder="Názov" :value="title" @input="($event) => onInput('title', $event.target.value)">
    </item-form-element>
    <item-form-element>
        <author-select :value="author_id" @input="(value) => onInput('author_id', value)"/>
    </item-form-element>
</item>
</template>

<script lang="ts">
import AuthorSelect from '@/components/AuthorSelect.vue';
import Item from '@/components/Item.vue';
import ItemFormElement from '@/components/ItemFormElement.vue';
import ItemMixin from '@/mixins/ItemMixin';
import Vue from 'vue';

export default Vue.extend({
    name: 'Book',
    mixins: [ItemMixin],
    components: {
        AuthorSelect,
        Item,
        ItemFormElement
    },
    props: {
        author_id: {
            required: true,
            type: Number
        },
        is_borrowed: {
            required: true,
            type: Boolean
        },
        title: {
            required: true,
            type: String
        }
    },
    computed: {
        valid() {
            return Boolean(this.author_id && this.title);
        }
    }
});
</script>

<style lang="scss" scoped>
</style>
