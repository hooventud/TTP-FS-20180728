import React from 'react';
import Portfolio from './Portfolio';
import BuySell from './BuySell';

export default class PorfolioView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleLoading = this.handleLoading.bind(this);
  }

  handleLoading() {
    this.setState(state => {
      return { loading: !state.loading };
    });
  }

  render() {
    return (
      <div className="portfolio-view">
        <Portfolio
          handleLoading={this.handleLoading}
          loading={this.state.loading}
        />
        <BuySell handleLoading={this.handleLoading} />
      </div>
    );
  }
}
