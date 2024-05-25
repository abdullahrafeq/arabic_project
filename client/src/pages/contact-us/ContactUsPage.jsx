import Button from "../../components/button/Button";
import "./style.css";

const ContactUsPage = () => {
    return (
        <div className="contact-us-page-container">
            <div className="container">
                <h1 className="title">Conatct Us</h1>
                <p className="title-text">Feel free to contact us!</p>
                <div className="contact-us-container">
                    <div className="left">
                        <h2>
                            Send your request
                        </h2>
                        <div className="input-row">
                            <ContactForm title="Name" isMessageForm={false} inputClassName="contact-input"/>
                            <ContactForm title="Phone" isMessageForm={false} inputClassName="contact-input"/>
                        </div>
                        <div className="input-row">
                            <ContactForm title="Email" isMessageForm={false} inputClassName="contact-input"/>
                            <ContactForm title="Subject" isMessageForm={false} inputClassName="contact-input"/>
                        </div>
                        <ContactForm title="Message" isMessageForm={true} textAreaClassName="contact-text-area"/>
                    </div>
                    <div className="right">
                        <h3>Reach us</h3>
                        <table>
                            <tr className="contact-us-table-row">
                                <td className="contact-us-table-row-cell">
                                    Email
                                </td>
                                <td className="contact-us-table-row-cell">
                                    contactus@example.com
                                </td>
                            </tr>
                            <tr className="contact-us-table-row">
                                <td className="contact-us-table-row-cell">
                                    Phone
                                </td>
                                <td className="contact-us-table-row-cell">
                                    +46 012 345 6789
                                </td>
                            </tr>
                            <tr className="contact-us-table-row">
                                <td className="contact-us-table-row-cell">
                                    Adress
                                </td>
                                <td className="contact-us-table-row-cell">
                                    Rödbenevägen
                                    <br />
                                    Bro
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContactForm = ({ title, isMessageForm, inputClassName, textAreaClassName}) => {
    return (
        <form action="">
            <label>{title}:</label>
            <br />
            {isMessageForm ? (
                <>
                    <textarea className={textAreaClassName} rows="5" />
                    <br />
                    <Button className="submit-button" children={<SubmitButtonContent/>}/>
                </>
            ) : (
                <>
                    <input className={inputClassName} type="text" />
                </>
            )}
        </form>
    )
}

const SubmitButtonContent = () => {
    return (
        <p className="contact-button-text">
            Submit
        </p>
    )
}

export default ContactUsPage;