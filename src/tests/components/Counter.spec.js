import { mount } from '@vue/test-utils';
import { expect } from 'expect';
import { ref } from 'vue';

const Counter = {
    template: `
        <button @click="handleClick">
            Increment
        </button>
    `,
    emits: ['increment'],
    setup(props, {emit}) {
        const count = ref(0);
        const handleClick = () => {
            count.value += 1;
            emit('increment', count.value)
        };

        return {
            count,
            handleClick,
        };
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
