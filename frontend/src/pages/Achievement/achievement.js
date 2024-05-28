import React, { Component } from 'react'
import './achievement.css';

export class Achievement extends Component {
  render() {
    return (
      <>
      <body>
       <header>
         <a href="/accaunt-settings" className='text'><img src='./img/UserPhotoS.png' alt='' className='profile-settings'/></a>
         <a href="/settings" className='text'><img src='./img/Menu.png' alt='' className='settings'/></a>
       </header>

       <div className='bg-ach'>
        <div className='cont-ach'>
            <p>Your current <br/> achievements</p>
            <img src='./img/achievement-1.png' alt=''/>
        </div>
       </div>

       <div className='bg-ach-1'>
        <div className='cont-ach-1'>
            <div className='ach-done'>
                <p>Achievement 1</p>
                <img src='./img/done.png' alt=''/>
                <div className='section-ach'></div>
            </div>
            <div className='ach-done'>
                <p>Achievement 2</p>
                <img src='./img/done.png' alt=''/>
                <div className='section-ach'></div>
            </div>
            <div className='ach-close'>
                <p>Achievement 3</p>
                <img src='./img/close.png' alt=''/>
                <div className='section-ach'></div>
            </div>
            <div className='ach-close'>
                <p>Achievement 4</p>
                <img src='./img/close.png' alt=''/>
                <div className='section-ach'></div>
            </div>
        </div>
      </div>

      <footer>
        <div className='fot-ach'>
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

export default Achievement