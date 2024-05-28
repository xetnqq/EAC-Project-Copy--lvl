import React, { Component } from 'react';
import './community.css';

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userData: null,
      friendsList: [],
      currentFriends: [],
    };
  }

  componentDidMount() {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    if (loggedInUsername) {
      this.setState({ username: loggedInUsername }, () => {
        this.fetchFriends();
        this.fetchCurrentFriends();
      });
    }
  }

  fetchFriends = async () => {
    const { username } = this.state;
    try {
      const response = await fetch(`/api/user_friends?username=${username}`);
      const friendsList = await response.json();
      this.setState({ friendsList });
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  fetchCurrentFriends = async () => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    try {
      const response = await fetch(`/api/user_friends?username=${loggedInUsername}`);
      const currentFriends = await response.json();
      
      const progressPromises = currentFriends.map(async (friend) => {
        const progressResponse = await fetch(`/api/get_progress?username=${friend.username}`);
        const progressData = await progressResponse.json();
        return { ...friend, progress: progressData.progress };
      });
  
      const friendsWithProgress = await Promise.all(progressPromises);
  
      this.setState({ currentFriends: friendsWithProgress });
    } catch (error) {
      console.error('Error fetching current friends:', error);
    }
  };
  
  
  handleChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username } = this.state;
    try {
      const response = await fetch(`/api/users`);
      const users = await response.json();
      const filteredUser = users.find(user => user.username === username);
      this.setState({ userData: filteredUser });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  addToFriends = async () => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    const { userData } = this.state;
    if (userData && loggedInUsername) {
      try {
        await fetch('/api/add_friend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ loggedInUsername, friendUsername: userData.username }),
        });
        this.setState(prevState => ({
          friendsList: [...prevState.friendsList, { username: userData.username }]
        }), this.fetchCurrentFriends);
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    }
  };

  removeFromFriends = async () => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    const { userData } = this.state;
    if (userData && loggedInUsername) {
      try {
        await fetch(`/api/remove_friend?username=${loggedInUsername}&friendUsername=${userData.username}`, {
          method: 'DELETE',
        });
        this.setState(prevState => ({
          friendsList: prevState.friendsList.filter(friend => friend.username !== userData.username)
        }), this.fetchCurrentFriends);
      } catch (error) {
        console.error('Error removing friend:', error);
      }
    }
  };
  

  render() {
    const { userData, friendsList, currentFriends } = this.state;
    return (
      <>
        <header>
          <a href="/accaunt-settings" className='text'><img src='./img/UserPhotoS.png' alt='' className='profile-settings' /></a>
          <a href="/settings" className='text'><img src='./img/Menu.png' alt='' className='settings' /></a>
        </header>
  
        <div className='bg-commu'>
          <div className='cont-commu'>
            <div className='fstr1'>Make new <br />friends</div>
            <div className='fstr2'>By adding a new friends to your list, you
              <br />can view their activity during the day</div>
          </div>
        </div>
  
        <div className='bg-search'>
          <div className='cont-search'>
            <form onSubmit={this.handleSubmit}>
              <input className='inp-search' type="text" id='3' placeholder="Enter username" onChange={this.handleChange} />
              <button type="submit" className='btac'><img src='./img/search.png' alt='' className='search12' /></button>
            </form>
          </div>
        </div>
  
        <div className='bg-friends'>
          <div className='cont-friends'>
            <div className='list'>Your searched user:</div>
            {userData && (
              <div key={userData.username}>
                <div className='bgoflist'>
                  <img src='./img/User35x35.png' alt='' className='usr1' />
                  <div className='contoflist'>
                    <div className='tupo'>{userData.username} average emissions <br /> are reduced by <span>0%</span></div>
                    {friendsList.some(friend => friend.username === userData.username) ? (
                      <div className='add' onClick={this.removeFromFriends}>-</div>
                    ) : (
                      <div className='add' onClick={this.addToFriends}>+</div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className='bg-current-friends'>
              <div className='cont-current-friends'>
                <div className='list-'>Your current friends:</div>
                {currentFriends.map(friend => (
                  <div key={friend.username} className='bgoflist'>
                    <img src='./img/User35x35.png' alt='' className='usr1-' />
                    <div className='contoflist'>
                      <div className='tupo-'>{friend.username} average emissions <br /> are reduced by <span>{friend.progress}%</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        <footer>
          <div className='footer77'>
            <a href="/home" className='text'><img src='./img/Home.png' alt='' /></a>
            <a href="/share" className='text'><img src='./img/Share.png' alt='' /></a>
            <a href="/community" className='text'><img src='./img/Community.png' alt='' /></a>
            <a href="/activity" className='text'><img src='./img/Activity.png' alt='' /></a>
          </div>
        </footer>
      </>
    );
  }
}  

export default Community;
