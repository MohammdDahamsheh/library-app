export const Heros = () => {
  return (
    <div>
      <div className=" d-lg-block">
        <div className="row g-0 mt-5 ">
          <div className="col-sm-6 col-md-6 mt-5">
            <div className="col-image-left"></div>
          </div>
          <div className="col-sm-5 col-md-5 container mt-5 ">
            <h4>What have you been reading?</h4>
            <p>
              The library team would love to know what you have been reading.
              Whether it is to learn a new skill or grow withn one,we will be
              able to provide the top content for you !
            </p>
            <a href="#" className="btn btn-sm main-color text-white">
              sgin up
            </a>
          </div>
        </div>

        <div className="row g-0  ">
          <div className="col-sm-5 col-md-5 container mt-5">
            <h4>Our collection is always changing!</h4>
            <p className="">
              Try ro check in daily as our collection is always changing !
              we work nonsrop to provide the most accurate book selection 
              possible for our library read student! we are diligent about
              our book selection and our books are always going 
              to be our
              top priority .
            </p>
            
          </div>

          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>
       {/* Mobile Heros */}
            <div className='d-md-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>What have you been reading?</h1>
                            <p className='lead'>
                                The library team would love to know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able to provide the top content for you!
                            </p>
                            <a className='btn main-color btn-lg text-white' href='#'>Sign up</a>
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate book selection possible
                                for our Luv 2 Read students! We are diligent about our book selection
                                and our books are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};
