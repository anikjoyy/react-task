import React, {useState, useEffect} from 'react';
import {Button, Modal, Form}  from 'react-bootstrap';

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);


    useEffect(() => {
        const apiUrl = 'https://contact.mediusware.com/api/contacts/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setContacts(data))
    }, []);


    useEffect(() => {
        const filtered = onlyEven ? contacts.filter(contact => contact.id % 2 === 0) : contacts;
        const searchFiltered = Array.isArray(filtered)
        ? filtered.filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];
        setFilteredContacts(searchFiltered);
    }, [contacts, onlyEven, searchQuery]);

    const openModalA = () => {
        setShowModalA(true);
        setShowModalB(false);
        setShowModalC(false);
    };

    const openModalB = () => {
        setShowModalA(false);
        setShowModalB(true);
        setShowModalC(false);
    };

    const closeModal = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
    };

    const openModalC = (contact) => {
        setSelectedContact(contact);
        setShowModalC(true);
    };

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                <button className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                </div>
            </div>

            <Modal show={showModalA || showModalB} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{showModalA ? 'All Contacts' : 'US Contacts'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Search Contacts"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Only Even"
                        checked={onlyEven}
                        onChange={() => setOnlyEven(!onlyEven)}
                    />
                    <ul className="list-group">
                        {filteredContacts.map(contact => (
                            <li
                                key={contact.id}
                                className="list-group-item"
                                onClick={()=> openModalC(contact)}
                            >
                                {contact.name}
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalC} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedContact && (
                        <div>
                            <h5>Contact Name:</h5>
                            <p>{selectedContact.name}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Problem2;