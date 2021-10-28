<template>
<select
    :class="{'active-placeholder-option': !value}"
    :value="value"
    @change="($event) => $emit('input', parseInt($event.target.value))"
>
    <option v-if="!value" value="0">Autor</option>
    <option
        v-for="author in submittedAuthors"
        :key="author.id"
        :value="author.id"
    >{{ author.name }} {{ author.surname }}
    </option>
</select>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    name: 'AuthorSelect',
    props: {
        value: {
            required: true,
            type: Number
        }
    },
    computed: {
        ...mapState(['authors']),
        submittedAuthors() {
            return this.authors.filter((author) => author.id);
        }
    }
});
</script>

<style lang="scss" scoped>
</style>
