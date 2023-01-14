import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest';
import TodoListEditor from 'components/TodoListEditor.vue';

describe('TodoListEditor', () => {
    const todoList = [
        {
            id: 1,
            value: 'Buy a book',
            completed: false,
        },
    ];

    test('props: todoList', () => {
        expect(TodoListEditor).toBeTruthy()
    
        const wrapper = mount(TodoListEditor, {
            props: {
                todoList,
            },
        });
    
        expect(wrapper.vm.todoList).toStrictEqual(todoList);
        expect(wrapper.props('todoList')).toStrictEqual(todoList);
        expect(wrapper.vm.remaining).toBe(1);
    });

    describe('section', () => {
        test('value should be text of label', () => {
            const wrapper = mount(TodoListEditor, {
                props: {
                    todoList,
                },
            });
        
            expect(wrapper.vm.todoList).toStrictEqual(todoList);
        
            const section = wrapper.find('section');
        
            expect(section.classes('main')).toBe(true);
            expect(section.find('ul.todo-list').exists()).toBe(true);
            expect(section.find('div.view>label').text()).toBe('Buy a book');
        });

        test('Completed should be true after click', async () => {
            const wrapper = mount(TodoListEditor, {
                props: {
                    todoList,
                },
            });

            const section = wrapper.find('section');
            const checked = section.find('div.view>input');

            expect(checked.element.type).toBe('checkbox');
            expect(checked.classes()).toContain('toggle');
            expect(checked.element.checked).toBe(false);
        
            checked.trigger('click');
        
            expect(checked.element.checked).toBe(true);
        });

        test('todoList is empty', () => {
            const wrapper = mount(TodoListEditor, {
                props: {
                    todoList: [],
                },
            });

            expect(wrapper.find('li.todo').exists()).toBe(false);
        });

        test('Nothing is editing', () => {
            const wrapper = mount(TodoListEditor, {
                props: {
                    todoList,
                },
            });

            expect(wrapper.find('input.edit').isVisible()).toBe(false);
        });
    });

    test('Footer', () => {
        const wrapper = mount(TodoListEditor, {
            props: {
                todoList,
            },
        });

        const footer = wrapper.find('footer');
    
        expect(footer.classes('footer')).toBe(true);
        expect(footer.find('ul.filters').exists()).toBe(true);
        expect(footer.find('span.todo-count').text()).toBe('1 item left');
        expect(footer.find('Button').text()).toBe('Clear completed');
    });
});
