import React from 'react'

const Heading = (props) => {
  return (
    <div className={`row ${props.className}`}>
        <div className={`col-12 ${props.form ? `col-md-9 col-lg-8` : null}`}>
            <div className=" border-b-2 pb-3 border-b-orange-600 capitalize text-6xl md:text-5xl lg:text-6xl tracking-wider">
                    {props.heading}
            </div>
        </div>
    </div>
  )
}

export default Heading