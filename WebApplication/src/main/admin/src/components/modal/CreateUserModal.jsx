import React, { useState } from "react";

function CreateUserModal() {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the name and email values
        console.log(name, email);
        // Close the modal
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={handleShowModal}>Create User</button>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Create User</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateUserModal;