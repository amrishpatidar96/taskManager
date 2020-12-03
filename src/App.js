import React,{Component} from 'react';
import Header from './components/Header/Header';
import TaskDetails from './components/TaskDetails/TaskDetails';
class App extends Component {


  render() {
    return(
      <div>
        <Header />
        <TaskDetails />
      </div>
    );
  }

}

export default App;
