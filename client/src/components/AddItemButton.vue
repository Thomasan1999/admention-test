<template>
<button
    class="add-item-button"
    :class="{'show-top-border': showTopBorder}"
    @click="$emit('click')"
>{{ text }}
</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'AddItemButton',
    props: {
        showTopBorder: {
            required: true,
            type: Boolean
        },
        text: {
            required: true,
            type: String
        }
    }
});
</script>

<style lang="scss" scoped>
.add-item-button
{
    border-bottom: 1px solid #000000;
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;

    &.show-top-border
    {
        border-top: 1px solid #000000;
    }
}
</style>
