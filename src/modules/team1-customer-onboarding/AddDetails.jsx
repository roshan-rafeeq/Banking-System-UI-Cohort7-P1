import React from 'react'
import Navbar from '../Navbar'

const AddDetails = () => {
    return (
        <>
            <Navbar />
            <div className="card" style={{ width: "38rem" }}>
                <div className="card-body">
                    <div class="row align-items-start">
                        <div class="col">
                           <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                        </div>
                        <div class="col">
                            One of three columns
                        </div>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDetails
