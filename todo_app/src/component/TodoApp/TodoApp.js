import React, { Component } from 'react';
import './TodoApp.css';

export default class TodoApp extends Component {
    state = {
        input: "",
        items: [],
        isEditing: null, // Track the index of the item being edited
        editInput: "" // Track the edited text
    };

    onHandleChange = (event) => {
        this.setState({
            input: event.target.value
        });
    };

    storeItems = (event) => {
        event.preventDefault();
        const { input } = this.state;

        if (input.trim()) {
            this.setState({
                items: [...this.state.items, input],
                input: ""
            });
        }
    };

    deleteItem = (index) => {
        this.setState({
            items: this.state.items.filter((_, i) => i !== index)
        });
    };

    // Start editing a specific item
    editItem = (index) => {
        this.setState({
            isEditing: index,
            editInput: this.state.items[index]
        });
    };

    // Handle changes in the edit input field
    onEditChange = (event) => {
        this.setState({
            editInput: event.target.value
        });
    };

    // Save the edited item
    saveEdit = (index) => {
        const updatedItems = [...this.state.items];
        updatedItems[index] = this.state.editInput;

        this.setState({
            items: updatedItems,
            isEditing: null, // Reset editing state
            editInput: ""
        });
    };

    render() {
        const { input, items, isEditing, editInput } = this.state;

        return (
            <div className="todo-container">
                <form className="input-section" onSubmit={this.storeItems}>
                    <h1>Todo App</h1>
                    <input
                        type="text"
                        value={input}
                        onChange={this.onHandleChange}
                        placeholder="Enter here..."
                    />
                </form>

                <ul>
                    {items.map((data, index) => (
                        <li key={index}>
                            {isEditing === index ? (
                                // Show input for editing
                                <input
                                    type="text"
                                    value={editInput}
                                    onChange={this.onEditChange}
                                />
                            ) : (
                                // Show item text if not editing
                                data
                            )}

                            <span className="icon">
                                {isEditing === index ? (
                                    <i
                                        className="fas fa-save"
                                        onClick={() => this.saveEdit(index)}
                                    ></i>
                                ) : (
                                    <i
                                        className="fas fa-edit"
                                        onClick={() => this.editItem(index)}
                                    ></i>
                                )}
                                <i
                                    className="fa-solid fa-trash-can"
                                    onClick={() => this.deleteItem(index)}
                                ></i>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
