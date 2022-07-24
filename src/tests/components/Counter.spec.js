import { mount } from '@vue/test-utils';
import { expect } from 'expect';

const Counter = {
    template: `
        <button @click="handleClick">
            Increment
        </button>
    `,
    data() {
        return {
            count: 0
        };
    },
    emits: ['increment'],
    methods: {
        handleClick() {
            this.count += 1
            this.$emit('increment', this.count)
        },
    },
};

it('Init data count = 0', () => {
    const wrapper = mount(Counter);

    expect(wrapper.vm.count).toBe(0);
});

it('button elemnt is exist', () => {
    const wrapper = mount(Counter);

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Increment');
});

it('emits an event when clicked', () => {
    const wrapper = mount(Counter);

    wrapper.find('button').trigger('click');
    wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('increment');
    expect(wrapper.emitted().increment).toHaveLength(2);
    expect(wrapper.emitted().increment[0]).toEqual([1]);
    expect(wrapper.emitted().increment[1]).toEqual([2]);
    expect(wrapper.vm.count).toBe(2);
});
