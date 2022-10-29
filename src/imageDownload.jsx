import {React, Component} from 'react';
import axios from 'axios'

export default class Image_Download extends Component{
    state={
        loading: false,
        notification: false,
        domain: "",
        message: ""
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.setState({
            loading: true,
            notification: true,
            message: "Please Wait till image is download!"
        })
        let payload={
            domain: this.state.domain
        }
        axios.post("http://localhost:2000/imageDownload", payload).then(resp =>{
            console.log(resp)
            // if(resp.data.status === "success"){
                this.setState({
                    loading: false,
                    notification: true,
                    message: resp.data.message
                })
                setTimeout(()=>{
                    this.setState({
                        notification: false,
                        domain: ""
                    })
                }, 3000)
            // }
        })
    }
    

    render(){
        return(
            <div>
                {
                    this.state.notification === true ? (
                        <div>
                            {this.state.message}
                        </div>
                    ) : null
                }


               <form onSubmit={this.handleSubmit}>
                <input type="text" name="domain" onChange={this.handleChange} />
                <button type="submit">Download</button>
                </form> 
            </div>

        )
    }
}