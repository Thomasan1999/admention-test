<template>
<div class="item">
    <form class="item-form" @submit.prevent="$emit('submit')">
        <div class="item-form-elements">
            <slot/>
        </div>
        <item-form-element slim>
            <button class="item-button" :disabled="!valid" :title="submitButtonTitle" type="submit">✓</button>
        </item-form-element>
    </form>
    <item-form-element slim>
        <button
            class="item-button item-remove-button"
            :disabled="removeDisabled"
            :title="removeButtonTitle"
            type="button"
            @click="$emit('remove')"
        >X
        </button>
    </item-form-element>
</div>
</template>

<script lang="ts">
import ItemFormElement from '@/components/ItemFormElement.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'Item',
    components: {
        ItemFormElement
    },
    props: {
        removeDisabled: {
            default: false,
            type: Boolean
        },
        removeButtonText: {
            default: 'Vymazať',
            type: String
        },
        removeButtonTextDisabled: {
            default: 'Nie je možné vymazať',
            type: String
        },
        submitButtonText: {
            default: 'Uložiť',
            type: String
        },
        submitButtonTextDisabled: {
            default: 'Nie je možné uložiť',
            type: String
        },
        valid: {
            required: true,
            type: Boolean
        }
    },
    computed: {
        removeButtonTitle() {
            if (this.removeDisabled) {
                return this.removeButtonTextDisabled;
            }

            return this.removeButtonText;
        },
        submitButtonTitle() {
            if (!this.valid) {
                return this.submitButtonTextDisabled;
            }

            return this.submitButtonText;
        }
    }
});
</script>

<style lang="scss" scoped>
.item
{
    border-bottom: 1px solid var(--primary-border-color);
    border-top: 1px solid var(--primary-border-color);
    display: flex;

    &:not(:first-child)
    {
        border-top: 0;
    }
}

.item-form
{
    display: flex;
    flex-grow: 1;
}

.item-form-elements
{
    display: flex;
    flex-grow: 1;
}

.item-button
{
    width: 2rem;

    &[disabled]
    {
        color: #cccccc;
        cursor: default;
    }
}

.item-remove-button
{
    border-right: 1px solid var(--primary-border-color);
}
</style>
