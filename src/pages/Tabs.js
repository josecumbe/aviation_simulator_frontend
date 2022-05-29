import { useState } from "react";
import '../App.js';
import Map from './Map.js';
import Manage from './Manage.js';


function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
    
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <h2>SHOW RECEIVERS</h2>
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <h2>MANAGE RECEIVERS (BACKEND)</h2>
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
            
          <Map />
            
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <Manage />
        </div>

      </div>
    </div>
  );
}

export default Tabs;