import './style.css';

const AdminGuidePage = () => {
    return (
        <main className='admin-guide-page'>
            <section className='container'>
                <section className='admin-guide'>
                    <h1>Admin Guide: Manage Scholars, Books, and Quotes</h1>
                    <p>As an admin, you can manage scholars, books, and quotes in the system by following these steps:</p>
                    <h2>Scholar</h2>
                    <ul>
                        <li><strong>Adding a Scholar:</strong>
                            <ol>
                                <li>Navigate to <b>Scholar</b> in the <b>navigation bar</b>.</li>
                                <li>Click the "Add New Scholar" button which is a card with <b>"+"</b> sign.</li>
                                <li>Fill in the required details.</li>
                                <li>Click "Save" to add the scholar to the system.</li>
                            </ol>
                        </li>
                        <li><strong>Editing a Scholar:</strong>
                            <ol>
                                <li>Navigate to <b>Scholar</b> in the <b>navigation bar</b>.</li>
                                <li>Hover over the scholar you want to edit in the list.</li>
                                <li>Click the "Edit" button which is displayed as a <b>gear</b> at the <b>top right</b> of the scholar card.</li>
                                <li>Update the scholar's information as needed.</li>
                                <li>Click "Save" to apply the changes.</li>
                            </ol>
                        </li>
                        <li><strong>Deleting a Scholar:</strong>
                            <ol>
                                <li>Navigate to <b>Scholar</b> in the <b>navigation bar</b>.</li>
                                <li>Hover over the scholar you want to edit in the list.</li>
                                <li>Click the "Delete" button which is displayed as a <b>trash can</b> at the <b>top right</b> of the scholar card.</li>
                                <li>You will be shown a warning before you completely delete the scholar.</li>
                                <li>Click "Delete" to delete the scholar.</li>
                            </ol>
                        </li>
                    </ul>
                    <h2>Book</h2>
                    <ul>
                        <li><strong>Adding a Book:</strong>
                            <ol>
                                <li>Navigate to <b>Book</b> in the <b>navigation bar</b>.</li>
                                <li>Click the "Add New Book" button which is a card with <b>"+"</b> sign.</li>
                                <li>Fill in the required details.</li>
                                <li>Click "Save" to add the book to the system.</li>
                            </ol>
                        </li>
                        <li><strong>Editing a Book:</strong>
                            <ol>
                                <li>Navigate to <b>Book</b> in the <b>navigation bar</b>.</li>
                                <li>Hover over the book you want to edit in the list.</li>
                                <li>Click the "Edit" button which is displayed as a <b>gear</b> at the <b>top right</b> of the scholar card.</li>
                                <li>Update the book's information as needed.</li>
                                <li>Click "Save" to apply the changes.</li>
                            </ol>
                        </li>
                        <li><strong>Deleting a Book:</strong>
                            <ol>
                                <li>Navigate to <b>Book</b> in the <b>navigation bar</b>.</li>
                                <li>Hover over the book you want to edit in the list.</li>
                                <li>Click the "Delete" button which is displayed as a <b>trash can</b> at the <b>top right</b> of the scholar card.</li>
                                <li>You will be shown a warning before you completely delete the book.</li>
                                <li>Click "Delete" to delete the book.</li>
                            </ol>
                        </li>
                    </ul>
                    <h2>Quote</h2>
                    <ul>
                        <li><strong>Adding a Quote:</strong>
                            <ol>
                                <li>Navigate to <b>Home</b> in the <b>navigation bar or by clicking the logo at the top of the page</b>.</li>
                                <li>Click the "Add New Quote" button which is a card with <b>"+"</b> sign.</li>
                                <li>Fill in the required details.</li>
                                <li>Click "Save" to add the book to the system.</li>
                            </ol>
                        </li>
                        <li><strong>Editing a Quote:</strong>
                            <ol>
                                <li>Navigate to <b>Home</b> in the <b>navigation bar or by clicking the logo at the top of the page</b>.</li>
                                <li>Hover over the quote you want to edit in the list.</li>
                                <li>Click the "Edit" button which is displayed as a <b>gear</b> at the <b>top right</b> of the scholar card.</li>
                                <li>Update the quote's information as needed.</li>
                                <li>Click "Save" to apply the changes.</li>
                            </ol>
                        </li>
                        <li><strong>Deleting a Quote:</strong>
                            <ol>
                                <li>Navigate to <b>Quote</b> in the <b>navigation bar</b>.</li>
                                <li>Hover over the qupte you want to edit in the list.</li>
                                <li>Click the "Delete" button which is displayed as a <b>trash can</b> at the <b>top right</b> of the scholar card.</li>
                                <li>You will be shown a warning before you completely delete the book.</li>
                                <li>Click "Delete" to delete the quote.</li>
                            </ol>
                        </li>
                    </ul>
                    <p>For further assistance, please refer to the admin documentation or contact technical support which u can find at the bottom of the page.</p>
                </section>
            </section>
        </main>
    );
};

export default AdminGuidePage;
