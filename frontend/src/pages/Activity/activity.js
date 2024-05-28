import React, { Component } from 'react'
import './activity.css';

export class Activity extends Component {
  render() {
    return (
      <>
      <body>

      <header>
        <a href="/accaunt-settings" className='text'><img src='./img/UserPhotoS.png' alt='' className='profile-settings'/></a>
        <a href="/settings" className='text'><img src='./img/Menu.png' alt='' className='settings'/></a>
      </header>

      <div className='bg-activ'>
        <div className='cont-activ'>
            <div className='track'>Track your <br/>activity</div>
            <div className='emiss'>Your logged emission</div>
        </div>
      </div>

      <div className='bg-activ-1'>
        <div className='cont-activ-1'>
            <p>Yesterday</p>
            <div className='section-done'>
                <img src='./img/done.png' alt=''/>
                <p>Your average emissions <br/> are reduced by <span>36%</span></p>
            </div>
            <p>Tuesday</p>
            <div className='section-done'>
                <img src='./img/done.png' alt=''/>
                <p>Your average emissions <br/> are reduced by <span>63%</span></p>
            </div>
            <p>Monday</p>
            <div className='section-close'>
                <img src='./img/close.png' alt=''/>
                <p>You have not been <br/> active this day</p>
            </div>
            <p>Sunday</p>
            <div className='section-done'>
                <img src='./img/done.png' alt=''/>
                <p>Your average emissions <br/> are reduced by <span>28%</span></p>
            </div>
        </div>
      </div>

      <footer>
        <div className='ftrt'>
            <a href="/home" className='text'><img src='./img/Home.png' alt=''/></a>
            <a href="/share" className='text'><img src='./img/Share.png' alt=''/></a>
            <a href="/community" className='text'><img src='./img/Community.png' alt=''/></a>
            <a href="/activity" className='text'><img src='./img/Activity.png' alt=''/></a>
        </div>
      </footer>

      </body>
      </>
    )
  }
}

export default Activity