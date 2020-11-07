import React from 'react'
import { withRouter } from 'react-router-dom'
import Steps from './Steps'
import { resetRoom } from '../actions/Room'
import { connect } from 'react-redux'

const Step1 = ({history,resetRoom}) => {
    const step2handler=()=>{
        
        history.push('/step2');

    }
    const step3handler=()=>{
        resetRoom()
        history.push('/step3');

    }


    return (
        <React.Fragment>
        <Steps/>
        <div className="routes mt-3 second d-flex justify-content-between">

<button type="button" onClick={step2handler} class="btn btn-primary">From Scratch</button>
<button type="button" onClick={step3handler} class="btn btn-primary">Upload CSV</button>
        </div>
        </React.Fragment>
    )
}

export default withRouter(connect(null,{resetRoom})(Step1))
