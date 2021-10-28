<template>
<div class="item-form-element" :class="{slim}">
    <slot/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ItemFormElement',
    props: {
        slim: {
            default: false,
            type: Boolean
        }
    }
});
</script>

<style lang="scss" scoped>
.item-form-element
{
    border-left: 1px solid var(--primary-border-color);
    display: flex;
    flex: 1 0 0;

    &.slim
    {
        flex: 0;
    }

    & > *:not([type=checkbox])
    {
        &:not(:last-child)
        {
            border-right: 0;
        }
    }

    ::v-deep label
    {
        align-items: center;
        display: flex;
    }

    ::v-deep input[type=checkbox]
    {
        margin-right: 5px;
        width: auto;
    }

    ::v-deep select, ::v-deep input, ::v-deep label
    {
        width: 100%;
    }
}
</style>
