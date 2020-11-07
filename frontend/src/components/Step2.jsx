import React,{Component} from 'react'
import Steps from './Steps'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRoom } from '../actions/Room'
import Axios from '../api/axiosConfig'
import { setAlert } from '../actions/alert'

 class Step2 extends Component {
    
    
    
    state={
        address:'',
        bedroom:'',
        bathroom:'',
        description:'',
        redirect:false
    }

    componentDidMount(){
        if(this.props.room.roomDetails){
            this.setState({
                ...this.state,
                address:this.props.room.roomDetails.address,
                bedroom:parseInt(this.props.room.roomDetails.bedroom),
                bathroom:parseInt(this.props.room.roomDetails.bathroom),
                description:this.props.room.roomDetails.description
                
                
            })
        }else{
         const getAddress=async()=>{
            window.navigator.geolocation.getCurrentPosition(
                position =>{ 
                   const fetchAddress=async()=>{
                       const {data} = await Axios.get(`https://developers.zomato.com/api/v2.1/cities?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                       
                       this.setState({
                           
                           address:data.location_suggestions[0].name});
                   } 
                   fetchAddress()
                })

        }
        getAddress() 
        this.props.setAlert('Location Fetched','alert-success')       
    }
}

    componentDidUpdate(){
        console.log(this.state);
        console.log("2 props",this)
    }

    handleChange=(e)=>{
        const {name,value} = e.target;
        console.log(name,value)
        this.setState({
            [name]:value
        })

    }


    isValid(){
        const {address,bedroom,bathroom } = this.state;
        if(address!=='' && bedroom!=='' && bathroom!==''){
            return true;
        }
        return false;
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.setRoom(this.state);
        this.setState({
            
            redirect:true
        })

    }

    
    render(){
        if(this.state.redirect){
            return <Redirect to={{pathname:"/step3",data:this.state}}/>
        }
        console.log(this.isValid());
    return (
        <React.Fragment>
            <Steps step2/>
        <div className="routes mt-2 form-container d-flex justify-content-between">
        <div className="col-md-12 mb-3">
            
            <div className="row">
                <div className="col-md-6 mx-auto">

                    
                    <div className="card rounded-0">
                        <div className="card-header">
                            <h3 className="mb-0">Room Details</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" onSubmit={(e)=>this.handleSubmit(e)}>
                            <div className="form-group">
                                    <label for="bedroom">Address</label>
                                    <input onChange={(e)=>this.handleChange(e)} 
                                    type="text" 
                                    className="form-control form-control-lg rounded-0" 
                                    name="address" 
                                    id="address" 
                                    value={this.state.address}
                                    required/>
                                </div>
                                <div className="form-group">
                                    <label for="bedroom">Bedroom</label>
                                    <input onChange={this.handleChange} type="number" 
                                    className="form-control form-control-lg rounded-0" 
                                    name="bedroom" id="bedroom" 
                                    max="10"
                                    min="0"
                                    value={this.state.bedroom}
                                    required/>
                                </div>
                                <div className="form-group">
                                    <label for="bathroom">Bathroom</label>
                                    <input type="number" 
                                    onChange={this.handleChange}
                                    className="form-control
                                     form-control-lg rounded-0"
                                     value={this.state.bathroom}
                                     name="bathroom" 
                                     min="0"
                                     max="5"
                                     id="bathroom" required/>
                                    
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                    value={this.state.description}
                                    onChange={(e)=>this.handleChange(e)} 
                                    className="form-control form-control-lg rounded-0" 
                                    name="description"
                                    id="description"/>
                                </div>
                                <Link to='/' className="btn btn-primary btn-lg float-left">Previous</Link>
                            
                                <button disabled={!this.isValid()} type="submit" className="btn btn-success btn-lg float-right">Submit</button>
                            </form>
                        </div>
                    </div>
                    
                </div>


            </div>
            

        </div>
        </div>
        </React.Fragment>
    )

    }
}

const mapStateToProps=(state)=>({
   
    room:state.room
    
     
     
   })
 

export default withRouter(connect(mapStateToProps,{setRoom,setAlert})(Step2))