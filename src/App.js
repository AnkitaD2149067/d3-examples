import './App.css';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import DonutChart from './components/DonutChart';
import LineChart from './components/LineChart';
import Scatterplot2 from './components/ScatterPlot2';
import Scatterplot1 from './components/ScatterPlot1';

function App() {
  return (
    <div className="App">
      <LineChart />
      <BarChart />
      <PieChart />
      <DonutChart />
      <Scatterplot1 />
      <Scatterplot2 />
    </div>
  );
}

export default App;