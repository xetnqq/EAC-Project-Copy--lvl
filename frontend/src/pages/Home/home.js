import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './home.css';

class Home extends Component {
  render() {
    const progress = JSON.parse(localStorage.getItem('progress')) || 100;
    const progress1 = JSON.parse(localStorage.getItem('progress1')) || 100;

    return (
      <>
        <header>
          <a href="/accaunt-settings" className="text">
            <img
              src="./img/UserPhotoS.png"
              alt=""
              className="profile-settings"
            />
          </a>
          <a href="/settings" className="text">
            <img src="./img/Menu.png" alt="" className="settings" />
          </a>
        </header>

        <div style={{ width: '200px', height: '200px' }}>
          <CircularProgressbar
            value={progress}
            text={`${progress.toFixed(2)}%`}
            styles={{
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `rgba(62, 152, 199, ${progress / 100})`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            }}
          />
        </div>

        <div className="bg-of-elem">
          <div className="cont-of-elem">
            <a href="/elecwaste" className="text">
              {" "}
              <div className="section">
                <img src="./img/Battery.png" alt="" className="icons" />
                <div className="textelem">Electronic Waste</div>
              </div>{" "}
            </a>

            <a href="/organicwaste" className="text">
              {" "}
              <div className="section">
                <img src="./img/Wastesorting.png" alt="" className="icons" />
                <div className="textelem">Organic Waste</div>
              </div>{" "}
            </a>

            <a href="/plastwaste" className="text">
              {" "}
              <div className="section">
                <img src="./img/Bottle.png" alt="" className="icons" />
                <div className="textelem">Plastics</div>
              </div>{" "}
            </a>

            <a href="/solidwaste" className="text">
              {" "}
              <div className="section">
                <img src="./img/Waste.png" alt="" className="icons" />
                <div className="textelem">Solid Waste</div>
              </div>{" "}
            </a>

            <a href="/glasswaste" className="text">
              {" "}
              <div className="section">
                <img src="./img/BrokenBottle.png" alt="" className="icons" />
                <div className="textelem">Glass Waste</div>
              </div>{" "}
            </a>
          </div>
        </div>

        <footer>
          <div className="contfoot">
            <a href="/home" className="text">
              <img src="./img/Home.png" alt="" />
            </a>
            <a href="/share" className="text">
              <img src="./img/Share.png" alt="" />
            </a>
            <a href="/community" className="text">
              <img src="./img/Community.png" alt="" />
            </a>
            <a href="/activity" className="text">
              <img src="./img/Activity.png" alt="" />
            </a>
          </div>
        </footer>
      </>
    );
  }
}

export default Home;