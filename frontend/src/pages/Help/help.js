import React, { Component } from 'react';
import './help.css';

export class Help extends Component {
  goBack = () => {
    window.history.back();
  };
  render() {
    return (
<>
<body>
<header>
          <img src='./img/mingcute_right-line.png' alt='' className='goBack'onClick={this.goBack} />
            <img src='./img/Help.png' alt='' className='settings'/>
          </header>
<div className='userDiscr'>
        <img src='./img/UserPhotoB.png' alt='1' className='userPhoto' />
        <p>Username</p>
      </div>

      <div className='cont-lvl'>
      <div className='bg-lvl'>
        <div className='lvl'>69lvl</div>
      </div>
      <a href="/achievement"><img src='./img/achievement.png' alt='' className='achievement' /> </a>
      </div>
    
      <div className="support-info">
  Below is a list of common queries. For any issues
  <br />
  or queries other than this, please reach out to us
  <br />
  at our email address: <span className="support-email">cftsupport@gmail.com</span>
    </div>

<footer>
        <div className='foot20'>
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

export default Help