'use client'
import React from 'react'
import styles from './ContactSeller.module.scss'

type Props = {}

enum ContactMessage {
    LeaveMessage = 1,
    ProductContact = 2,
}

const ContactSeller = (props: Props) => {
    const [contactMessage, setContactMessage] = React.useState<ContactMessage>(ContactMessage.LeaveMessage)

    const handleRadioChange = () => {
        if (contactMessage == ContactMessage.LeaveMessage) {
            setContactMessage(ContactMessage.ProductContact);
        }
        if (contactMessage == ContactMessage.ProductContact) {
            setContactMessage(ContactMessage.LeaveMessage);
        }
    };

    return (
        <div className={styles.type}>
            <div className={styles.content}>
                <div className={styles.custom_radio}>
                    <div className={styles.formContainer}>
                        <input
                            type='radio'
                            id='radioButton1'
                            className={styles.radio_input}
                            name='radioGroup'
                            onChange={handleRadioChange}
                            checked={contactMessage == ContactMessage.LeaveMessage}
                        />
                        <label htmlFor='radioButton1' className={styles.radio_label}>
                            Leave a message
                        </label>

                        {contactMessage == ContactMessage.LeaveMessage && (
                            <h1>Product contact</h1>
                        )}
                    </div>

                    <div className={styles.formDeliveryContainer}>
                        <input
                            type='radio'
                            id='radioButton2'
                            className={styles.radio_input}
                            name='radioGroup'
                            onChange={handleRadioChange}
                            checked={contactMessage == ContactMessage.ProductContact}
                        />

                        <label htmlFor='radioButton2' className={styles.radio_label}>
                            Contact for a product
                        </label>
                        {contactMessage == ContactMessage.ProductContact && (
                            <h1>Product contact</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ContactSeller