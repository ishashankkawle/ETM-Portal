import { Component } from 'react'
import './loader.css'
import preloader from '../../assets/Rolling.gif'

export function getLoader(message = "") 
{
    return (
        <div className="ag-overlay-loading-center d-flex main-loader justify-content-center align-middle">
            <img src={preloader} className='main-loader-gif-independent'/> <span style={{ alignSelf: 'center' }}> &nbsp; {message}</span>
        </div>
    )
}

export function getFullScreenLoader(message = "") 
{
    return (
        <div className="ag-overlay-loading-center d-flex main-loader-full justify-content-center align-middle">
            <img src={preloader} className='main-loader-gif-independent'/> <span style={{ alignSelf: 'center' }}> &nbsp; {message}</span>
        </div>
    )
}

class Loader extends Component
{
    render()
    {
        return (
            <div className="ag-overlay-loading-center">
                <img src={preloader} className='main-loader-gif'/>
            </div>
        )
    }
}
export default Loader;
