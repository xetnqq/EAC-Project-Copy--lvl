import React, { Component } from 'react';
import './elecwaste.css';

class ElecWaste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: JSON.parse(localStorage.getItem('selectedItems')) || {},
      progress: JSON.parse(localStorage.getItem('progress')) || 0,
      level: JSON.parse(localStorage.getItem('level')) || 1,
    };
  }

  componentDidMount() {
    this.addEventListeners();
    this.updateImages();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  addEventListeners = () => {
    document.querySelectorAll('.balls-1').forEach((image) => {
      image.addEventListener('click', this.handleImageClick);
    });
  };

  removeEventListeners = () => {
    document.querySelectorAll('.balls-1').forEach((image) => {
      image.removeEventListener('click', this.handleImageClick);
    });
  };

  updateImages = () => {
    Object.keys(this.state.selectedItems).forEach((itemId) => {
      const image = document.querySelector(`.balls-1[data-item-id="${itemId}"]`);
      if (image) {
        image.src = this.state.selectedItems[itemId] ? './img/LowBattery.png' : './img/Battery.png';
      }
    });
  };

  handleImageClick = async (event) => {
    const currentSrc = event.target.src;
    const isLowBattery = currentSrc.includes('LowBattery.png');
    const itemId = event.target.dataset.itemId;
    const selectedItems = { ...this.state.selectedItems };
    selectedItems[itemId] = !isLowBattery;
    this.setState({ selectedItems }, () => {
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    });
    event.target.src = isLowBattery ? './img/Battery.png' : './img/LowBattery.png';

    // Збільшуємо прогрес на 1 при кожному кліку
    this.setState((prevState) => ({ progress: prevState.progress + 1 }), async () => {
      localStorage.setItem('progress', JSON.stringify(this.state.progress));
      await fetch('/api/update_progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: localStorage.getItem('loggedInUsername'),
          progress: this.state.progress,
        }),
      });

      // Перевіряємо, чи досягнуто 100% прогресу і збільшуємо рівень на 1
      if (this.state.progress >= 100) {
        const newLevel = this.state.level + 1;
        this.setState({
          level: newLevel,
          progress: 0, // Скидаємо прогрес на початкове значення
        });
        localStorage.setItem('level', JSON.stringify(newLevel));
        localStorage.setItem('progress', JSON.stringify(0));

        await fetch('/api/update_level', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: localStorage.getItem('loggedInUsername'),
            level: newLevel,
          }),
        });
      }
    });
  };

  render() {
    const { progress, level } = this.state;
    return (
      <div>
        <header>
          <a href="/accaunt-settings" className='text'><img src='./img/UserPhotoS.png' alt='' className='profile-settings'/></a>
          <a href="/settings" className='text'><img src='./img/Menu.png' alt='' className='settings'/></a>
        </header>
        <button onClick={this.handleResetProgress} className='reset'>Скинути прогрес</button>

        <p className='text-png'>Your amount of waste</p>
        <div className='penis'>
          <img src='./img/Battery.png' alt='' className='balls'/>
          <div className='nuts'>Electronic Waste</div>
        </div>

        <div className='penis-1'>
          {[...Array(6)].map((_, index) => (
            <img
              key={index}
              src='./img/LowBattery.png'
              alt=''
              className='balls-1'
              data-item-id={index}
            />
          ))}
        </div>

        <div className='penis-2'>
          {[...Array(6)].map((_, index) => (
            <img
              key={index + 6}
              src='./img/LowBattery.png'
              alt=''
              className='balls-1'
              data-item-id={index + 6}
            />
          ))}
        </div>

        <div className='penis-3'>
          {[...Array(6)].map((_, index) => (
            <img
              key={index + 12}
              src='./img/LowBattery.png'
              alt=''
              className='balls-1'
              data-item-id={index + 12}
            />
          ))}
        </div>

        <div className='card'>
          <div className="item-wrapper">
            <div className="item-count">
              <img src="./img/Battery.png" alt="Item 1 icon" className="item-icon" />
              <div className="item-quantity">X6</div>
            </div>
            <div className="item-details">
              <div className="item-name">Чепуха</div>
              <img src="./img/UserPhotoS.png" alt="Item 1 details" className="item-icon" />
            </div>
          </div>
          <div className="item-wrapper">
            <div className="item-count">
              <img src="./img/Battery.png" alt="Item 2 icon" className="item-icon" />
              <div className="item-quantity">X4</div>
            </div>
            <div className="item-details">
              <div className="item-name">Чепух</div>
              <img src="./img/UserPhotoS.png" alt="Item 2 details" className="item-icon" />
            </div>
          </div>
          <div className="item-wrapper">
            <div className="item-count">
              <img src="./img/Battery.png" alt="Item 2 icon" className="item-icon" />
              <div className="item-quantity">X4</div>
            </div>
            <div className="item-details">
              <div className="item-name">Чепух</div>
              <img src="./img/UserPhotoS.png" alt="Item 2 details" className="item-icon" />
            </div>
          </div>
        </div>

        <footer>
          <div className='contfoot'>
            <a href='/home' className='text'><img src='./img/Home.png' alt=''/></a>
            <a href='/share' className='text'><img src='./img/Share.png' alt=''/></a>
            <a href='/community' className='text'><img src='./img/Community.png' alt=''/></a>
            <a href='/activity' className='text'><img src='./img/Activity.png' alt=''/></a>
          </div>
        </footer>
      </div>
    );
  }
}

export default ElecWaste;
