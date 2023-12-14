"use client"

import React, { useState } from 'react'
import Form from '@components/Form'
import Navbar from '@components/Navbar'

const EditWork = () => {

  return (
    <>
      <Navbar />
      <Form
        type="Edit"
        work={work}
        setWork={setWork}
      />
    </>
  )
}

export default EditWork