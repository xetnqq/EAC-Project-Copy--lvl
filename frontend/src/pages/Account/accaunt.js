import React, { Component } from 'react';
import './accaunt.css';

class Accaunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      progress: JSON.parse(localStorage.getItem('progress')) || 0,
      level: JSON.parse(localStorage.getItem('level')) || 1,
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('loggedInUsername');
    this.setState({ username });

    window.addEventListener('storage', this.syncProgress);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.syncProgress);
  }

  syncProgress = () => {
    const progress = JSON.parse(localStorage.getItem('progress')) || 0;
    const level = JSON.parse(localStorage.getItem('level')) || 1;
    this.setState({ progress, level });
  };

  goBack = () => {
    window.history.back();
  };

  handleResetProgress = () => {
    this.setState({
      progress: 0,
      selectedItems: {},
      level: 1,
    });
    const images = document.querySelectorAll('.balls-1');
    images.forEach((image) => {
      image.src = './img/LowBattery.png';
    });
    localStorage.setItem('progress', JSON.stringify(0));
    localStorage.setItem('level', JSON.stringify(1));
    localStorage.removeItem('selectedItems');

    // Оновлюємо рівень в базі даних
    fetch('/api/update_level', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: localStorage.getItem('loggedInUsername'),
        level: 1,
      }),
    });
  };

  render() {
    const { username, progress, level } = this.state;

    return (
      <>
        <header>
          <img src='./img/mingcute_right-line.png' alt='' className='goBack' onClick={this.goBack} />
        </header>

        <div className='userDiscr'>
          <img src='./img/UserPhotoB.png' alt='1' className='userPhoto' />
          <p>{username}</p>
        </div>

        <div className='cont-lvl'>
          <div className='bg-lvl'>
            <div className='lvl'>{level}lvl</div>
            <div className='progress-bar'>
              <div className='progress-bar-inner' style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <a href='/achievement'>
            <img src='./img/achievement.png' alt='' className='achievement' />
          </a>
        </div>

        <div className='cont-info'>
          <div className='bg-info'>
            <p>Account settings</p>
            <input type='' placeholder='Name' />
            <input type='' placeholder='Email' />
            <input type='' placeholder='Change Password' />
            <input type='' placeholder='Change profile photo' />
          </div>
        </div>

        <footer>
          <div className='cont-foot'>
            <a href='/home' className='text'><img src='./img/Home.png' alt='' /></a>
            <a href='/share' className='text'><img src='./img/Share.png' alt='' /></a>
            <a href='/community' className='text'><img src='./img/Community.png' alt='' /></a>
            <a href='/activity' className='text'><img src='./img/Activity.png' alt='' /></a>
          </div>
        </footer>
      </>
    );
  }
}

export default Accaunt;
