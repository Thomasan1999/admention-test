<template>
<div id="app">
    <nav-component/>
    <router-view v-if="$store.state.initialized" class="view"/>
</div>
</template>

<script lang="ts">
import NavComponent from '@/components/NavComponent.vue';
import Vue from 'vue';

export default Vue.extend({
    components: {
        NavComponent
    },
    async created(): Promise<void> {
        await this.$store.dispatch('init');
    }
});
</script>

<style lang="scss">
@import 'styles/reset.scss';
@import 'https://fonts.googleapis.com/css2?family=Roboto:wght&display=swap';

#app
{
    font-family: 'Roboto', sans-serif;
    padding: 15px;

    --active-color: lightgreen;
    --input-horizontal-padding: 5px;
    --line-height: 2rem;
    --placeholder-color: #777777;
    --primary-border-color: #000000;
}

.view
{
    align-items: center;
    display: flex;
}

button
{
    border: 0;
}

a, button
{
    background: transparent;
    cursor: pointer;
}

a, button, input, select
{
    color: inherit;
    font: inherit;
    line-height: var(--line-height);
    min-height: var(--line-height);
}

input, select
{

    border: 0;
}

input
{
    padding-left: var(--input-horizontal-padding);
    padding-right: var(--input-horizontal-padding);

    &::placeholder
    {
        color: var(--placeholder-color);
        opacity: 1;
    }

    &:focus
    {
        outline: none;
    }
}

select
{
    &.active-placeholder-option
    {
        color: var(--placeholder-color);
    }
}
</style>
