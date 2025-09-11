import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import css from './BookingForm.module.css';

const BookingForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            bookingDate: '',
            comment: '',
        },
        onSubmit: (values, { resetForm }) => {
            setTimeout(() => {
                toast.success('Your booking request has been sent!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetForm();

            }, 500);
        }

    });

    return (
        <form className={css.form} onSubmit={formik.handleSubmit}>
            <div className={css.titleWrapper}>
                <h2 className={css.title}>Book your car now</h2>
                <p className={css.text}>Stay connected! We are always ready to help you.</p>
            </div>
            <div className={css.inputWrapper}>
                <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Name*"
                    className={css.inputName}
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Email*"
                    className={css.inputEmail}
                    required
                />



                <input
                    type="date"
                    name="bookingDate"
                    value={formik.values.bookingDate}
                    onChange={formik.handleChange}
                    className={css.inputDate}
                />


                <textarea
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    placeholder="Comment"
                    className={css.textarea}
                />

            </div>


            <button type="submit" className={css.buttonBooking}>Send</button>
        </form>
    );
};

export default BookingForm;