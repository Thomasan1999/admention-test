<template>
<div class="item-container">
    <div class="view-content">
        <slot/>
        <add-item-button :show-top-border="showAddButtonTopBorder" :text="addButtonText" @click="$emit('add')"/>
    </div>
</div>
</template>

<script lang="ts">
import AddItemButton from '@/components/AddItemButton.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'ItemContainer',
    components: {
        AddItemButton
    },
    props: {
        addButtonText: {
            required: true,
            type: String
        },
        showAddButtonTopBorder: {
            required: true,
            type: Boolean
        }
    }
});
</script>

<style lang="scss" scoped>
.view-content
{
    max-width: 1100px;
    width: 100%;
}

.item-container
{
    display: flex;
    flex-direction: column;
}
</style>
