import { Component } from "react";
import Header from '../Header';
import { Hourglass } from 'react-loader-spinner'
import PriceCard from '../PriceCard';

const apiFetchStatus = {
    initial: 'INITIAL',
    fetching: 'FETCHING',
    success: 'SUCCESS',
    failure: 'FAILURE',
  };

class Prices extends Component{
    state = {
        apiStatus: apiFetchStatus.initial,
        cryptoPrices: []
    }

    componentDidMount() {
        this.getCryptoPrices();
    }

    getCryptoPrices = async () => {
        this.setState({apiStatus: apiFetchStatus.fetching});
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const responseJson = await response.json();
        const cryptoPrices = Object.keys(responseJson.bpi).map(currencyCode => ({
        code: currencyCode,
        ...responseJson.bpi[currencyCode]
        }));
        this.setState({ cryptoPrices ,apiStatus: apiFetchStatus.success});
      };

    renderFailureView = () => (
        <div>Fail</div>
      );
    
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

      renderAllData = () => {
        const { cryptoPrices } = this.state;
        return (
            <div className='text-white mt-8 mx-3'>
                <h2 className='text-2xl font-bold'>Cryptocurrency Prices</h2>
                <ul className='flex flex-wrap'>
                {cryptoPrices.map((eachItem) => (
                    <PriceCard key={eachItem.code} eachItem={eachItem} />
                ))}
                </ul>
            </div>
        )
    }

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

export default Prices