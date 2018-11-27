import React, { Component } from 'react';
import Portfolio from './Portfolio';
import BuySell from './BuySell';

export default class PorfolioView extends React.Component {
  render() {
    return (
      <div className="portfolio-view">
        <Portfolio />
        <BuySell />
      </div>
    );
  }
}
