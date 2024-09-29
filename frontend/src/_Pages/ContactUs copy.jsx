import React from 'react'
import ContactUsHero from '../_components/ContactUsHero'
import Footer from '../_components/Footer'
import ContactUsForm from '../_components/ContactUsForm'
import Location from '../_components/Location'
import Reviews from '../_components/Reviews'
import AddReview from '../_components/AddReview'
import FollowUs from '../_components/FollowUs'

const ContactUs = () => {
  return (
    <>
    <ContactUsHero />
    <ContactUsForm />
    <Location />
    <Reviews />
    <AddReview />
    <FollowUs />
    <Footer />
    </>
  )
}

export default ContactUs