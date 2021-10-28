import Vue from 'vue';

export default Vue.extend({
    methods: {
        onInput(prop: string, value: any): void {
            this.$emit('input', prop, value);
        }
    }
});
