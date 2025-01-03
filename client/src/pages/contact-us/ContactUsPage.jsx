import { useState } from "react";
import Button from "../../components/button/Button";
import "./style.css";
import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { Oval } from 'react-loader-spinner'

const ContactUsPage = () => {
    const form = useRef()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        emailjs
          .sendForm('service_mfgf0x5', 'template_59cxs9m', form.current, {
            publicKey: 'xJ_AJyhqbLSyJUFkt',
          })
          .then(
            () => {
              console.log('SUCCESS!');
              setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          ).finally(() => {
            setIsLoading(false)
          })
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="contact-us-page-container">
            <div className="container">
                <h1 className="title">Contact Us</h1>
                <p className="title-text">Feel free to contact us!</p>
                <div className="contact-us-container">
                    <div className="left">
                        <h2>Send your request</h2>
                        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
                            <div className="input-row">
                                <ContactInput
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <ContactInput
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-row">
                                <ContactInput
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <ContactInput
                                    label="Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <ContactTextArea
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            <Button className="submit-button" type="submit">
                                <p>Submit</p>
                                {isLoading &&
                                    <Oval
                                        height={30} 
                                        width={30} 
                                        color="#fff" /* Neutral gray or preferred color */
                                        strokeWidth={4} // Primary stroke width (thicker lines)
                                        secondaryColor="#ddd" /* Optional lighter color */
                                        ariaLabel="oval-loading"
                                    />
                                }
                            </Button>
                        </form>
                    </div>
                    <div className="right">
                        <h3>Reach us</h3>
                        <table>
                            <tbody>
                                <tr className="contact-us-table-row">
                                    <td className="contact-us-table-row-cell">Email</td>
                                    <td className="contact-us-table-row-cell">abdullah-rafeq@hotmail.com</td>
                                </tr>
                                <tr className="contact-us-table-row">
                                    <td className="contact-us-table-row-cell">Phone</td>
                                    <td className="contact-us-table-row-cell">+46 707834821</td>
                                </tr>
                                <tr className="contact-us-table-row">
                                    <td className="contact-us-table-row-cell">Address</td>
                                    <td className="contact-us-table-row-cell">
                                        Rödbenevägen<br />Bro
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactInput = ({ label, name, value, onChange }) => (
    <div className="contact-input-group">
        <label htmlFor={name}>{label}:</label>
        <input
            id={name}
            name={name}
            className="contact-input"
            type="text"
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

const ContactTextArea = ({ label, name, value, onChange }) => (
    <div className="contact-input-group">
        <label htmlFor={name}>{label}:</label>
        <textarea
            id={name}
            name={name}
            className="contact-text-area"
            rows="5"
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

export default ContactUsPage;
