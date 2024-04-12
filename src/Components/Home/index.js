import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Hourglass } from 'react-loader-spinner'
import Header from '../Header';
import PriceCard from '../PriceCard';

const apiFetchStatus = {
  initial: 'INITIAL',
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

class Home extends Component {
  state = {
    apiStatus: apiFetchStatus.initial,
    populationData: [],
    cryptoPrices: []
  };

  componentDidMount() {
    this.getPopulationData();
    this.getCryptoPrices();
  }

  getPopulationData = async () => {
    this.setState({ apiStatus: apiFetchStatus.fetching });
    const url = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    if (url.ok) {
      const response = await url.json();
      this.setState({ populationData: response.data, apiStatus: apiFetchStatus.success });
    } else {
      this.setState({ apiStatus: apiFetchStatus.failure });
    }
  };

  getCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const responseJson = await response.json();
      const cryptoPrices = Object.keys(responseJson.bpi).map(currencyCode => ({
        code: currencyCode,
        ...responseJson.bpi[currencyCode]
      }));
      this.setState({ cryptoPrices });
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  };

  renderFailureView = () => (
    <div>Fail</div>
  );

  renderAllData = () => {
    const { populationData, cryptoPrices } = this.state;

    return (
      <div className='py-10 px-6 w-full border-amber-50'>
        <div className='md:flex justify-between items-center text-white'>
          <div>
            <h1 className='font-bold text-3xl'>Hello, <span className='bg-gradient-to-r from-green-500 to-yellow-400 inline-block text-transparent bg-clip-text'>Brooklyn Simmons</span>👋</h1>
            <p className='text-xl'>Welcome to <span className='text-green-500'>Spot trading!</span></p>
          </div>
          <button className='mt-3 bg-green-500 px-4 h-12 text-lg font-semibold mr-4 rounded-sm'>Start Trading</button>
        </div>
        <div className='w-full md:bg-stone-900 w-2/4 p-4 rounded-md mt-9'>
            <p className='text-white text-center py-2'>The American Community Survey (ACS) is conducted by the US Census and sent to a portion of the population every year.</p>
            <hr className='py-1'/>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={populationData}>
              <XAxis dataKey="Year" />
              <YAxis yAxisId="left" type="number" domain={[dataMin => dataMin / 1000000, dataMax => dataMax / 1000000 + 1]} tickFormatter={(value) => `${value / 1000000}M`} />
              <YAxis yAxisId="right" type="number" domain={[dataMin => dataMin - 1, dataMax => dataMax + 1]} tickFormatter={(value) => `${value.toFixed(0)}`} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Population" stroke="#0acc12" yAxisId="right" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='text-white mt-4'>
          <h2 className='text-2xl font-bold'>Cryptocurrency Prices</h2>
          <ul className='flex flex-wrap'>
          {cryptoPrices.map((eachItem) => (
            <PriceCard key={eachItem.code} eachItem={eachItem} />
          ))}
          </ul>
          <p className='text-red-700 mt-3'><span className='font-bold'>Note: </span>This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org</p>
        </div>
      </div>
    );
  };

  renderLoaderView = () => (
    <div className="w-full h-screen flex justify-center items-center">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#4fa94d', '#ffffff']}
        />
    </div>
  );

  renderData = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiFetchStatus.failure:
        return this.renderFailureView();
      case apiFetchStatus.success:
        return this.renderAllData();
      case apiFetchStatus.fetching:
        return this.renderLoaderView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className='bg-black md:flex w-full'>
        <Header />
        {this.renderData()}
      </div>
    );
  }
}

export default Home;
