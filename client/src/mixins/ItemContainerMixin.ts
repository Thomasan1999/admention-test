import {Model} from '@/types';
import Vue from 'vue';

export default Vue.extend({
    methods: {
        async onItemInput(item: Model, prop: keyof Model, value: any): Promise<void> {
            await this.$store.dispatch('updateItem', {item, prop, value});
        },
        async removeItem(item: Model): Promise<void> {
            await this.$store.dispatch('removeItem', {item, tableName: this.tableName});
        },
        async submitItem(item: Model): Promise<void> {
            await this.$store.dispatch('submitItem', {item, tableName: this.tableName});
        }
    },
    data() {
        return {
            tableName: ''
        };
    }
});
