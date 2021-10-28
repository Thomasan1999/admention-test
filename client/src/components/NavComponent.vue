<template>
<div class="nav-component">
    <div class="nav-link-container">
        <router-link
            v-for="item in items"
            :key="item.id"
            class="nav-link"
            active-class="active"
            :title="item.text"
            :to="item.to"
        >{{ item.text }}
        </router-link>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'NavComponent',
    data() {
        return {
            items: [
                {
                    id: 1,
                    text: 'Autori',
                    to: {name: 'Authors'}
                },
                {
                    id: 2,
                    text: 'Knihy',
                    to: {name: 'Books'}
                }
            ]
        };
    }
});
</script>

<style lang="scss" scoped>
.nav-link-container
{
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.nav-link
{
    border: 1px solid var(--primary-border-color);
    padding-left: 5px;
    padding-right: 5px;
    text-decoration: none;
    transition: all .25s;

    &:not(:first-child)
    {
        border-left: 0;
    }

    &, &:focus, &:visited
    {
        color: inherit;
    }

    &.active
    {
        background-color: var(--active-color);
    }
}
</style>
