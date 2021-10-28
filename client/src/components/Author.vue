<template>
<item
    class="author"
    :remove-disabled="books_count > 0"
    remove-button-text="Vymazať autora"
    remove-button-text-disabled="Nie je možné vymazať autora, pokiaľ k nemu patrí aspoň jedna kniha"
    submit-button-text="Uložiť autora"
    :valid="valid"
    @remove="$emit('remove')"
    @submit="$emit('submit')"
>
    <item-form-element>
        <input placeholder="Meno" :value="name" @input="($event) => onInput('name', $event.target.value)">
    </item-form-element>
    <item-form-element>
        <input
            placeholder="Priezvisko"
            :value="surname"
            @input="($event) => onInput('surname', $event.target.value)"
        >
    </item-form-element>
    <item-form-element slim>
        <span class="author-books-count">Počet kníh: {{books_count}}</span>
    </item-form-element>
</item>
</template>

<script lang="ts">
import Item from '@/components/Item.vue';
import ItemFormElement from '@/components/ItemFormElement.vue';
import ItemMixin from '@/mixins/ItemMixin';
import Vue from 'vue';

export default Vue.extend({
    name: 'Author',
    mixins: [ItemMixin],
    components: {
        Item,
        ItemFormElement
    },
    props: {
        books_count: {
            required: true,
            type: Number
        },
        name: {
            required: true,
            type: String
        },
        surname: {
            required: true,
            type: String
        }
    },
    computed: {
        valid() {
            return Boolean(this.name && this.surname);
        }
    }
});
</script>

<style lang="scss" scoped>
.author-books-count
{
    line-height: var(--line-height);
    padding-left: var(--input-horizontal-padding);
    padding-right: var(--input-horizontal-padding);
    white-space: pre;
}
</style>
