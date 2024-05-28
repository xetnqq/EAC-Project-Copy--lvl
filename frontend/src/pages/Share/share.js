import React, { Component } from 'react'
import './share.css'

export class Share extends Component {
  render() {
    return (
<>

      <header>
        <a href="/accaunt-settings" className='text'><img src='./img/UserPhotoS.png' alt='' className='profile-settings'/></a>
        <a href="/settings" className='text'><img src='./img/Menu.png' alt='' className='settings'/></a>
      </header>
<div className='yaebav'>
  <div className='textbla'>
    <p>Here you can share your activity and achievements with others</p>
  </div>
</div>
<a href="/battery" className='text'> <div className='section1'>
         <img src='./img/Instagram.png' alt='' className='icons'/>
          <div className='textelem'>Instagram</div>
        </div> </a>

        <a href="/battery" className='text'> <div className='section2'>
         <img src='./img/TwitterX.png' alt='' className='icons'/>
          <div className='textelem'>X</div>
        </div> </a>

        <a href="/battery" className='text'> <div className='section3'>
         <img src='./img/DiscordNew.png' alt='' className='icons'/>
          <div className='textelem'>Discord</div>
        </div> </a>
        <a href="/battery" className='text'> <div className='section3'>
         <img src='./img/TikTok.png' alt='' className='icons'/>
          <div className='textelem'>Tik Tok</div>
        </div> </a>


        <footer>
        <div className='footxui'>
            <a href="/home" className='text1'><img src='./img/Home.png' alt=''/></a>
            <a href="/share" className='text2'><img src='./img/Share.png' alt=''/></a>
            <a href="/community" className='text3'><img src='./img/Community.png' alt=''/></a>
            <a href="/activity" className='text4'><img src='./img/Activity.png' alt=''/></a>
        </div>
      </footer>




</>
    )
  }
}

export default Share