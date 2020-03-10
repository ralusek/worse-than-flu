import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import _ from 'lodash';
import YouTube from 'react-youtube'

// Children


// Styles
import './rootStyles';
import { SimulatedDay } from 'utils/predictThePestilentFuture/types';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { GROWTH_FACTOR } from 'constants/simulatedDayProperties';



type Props = {
  languageRef: any;
  simulatedDays: SimulatedDay[];
  daysToSimulate: number;
  setDaysToSimulate: (daysToSimulate: number) => void;
  fixedProbabilityOfSpread: number;
  setFixedProbabilityOfSpread: (fixedProbabilityOfSpread: number) => void;
  fixedInterpersonalInteractions: number;
  setFixedInterpersonalInteractions: (fixedInterpersonalInteractions: number) => void;
} & RouteComponentProps;


/**
 * RootView.
 */
function RootView({
  languageRef,
  simulatedDays,
  daysToSimulate,
  setDaysToSimulate,
  fixedProbabilityOfSpread,
  setFixedProbabilityOfSpread,
  fixedInterpersonalInteractions,
  setFixedInterpersonalInteractions,
}: Props) {
  return <div className='RootView'>
    <div className='header'>
      <div className='title'>This is not the flu, ya dingus.</div>
      <div className='controls-container'>
        <div className='controls'>
          <div className='control'>
            <div className='label'>
              Days To Simulate
            </div>
            <input
              className='value'
              value={daysToSimulate}
              onChange={(evt) => setDaysToSimulate(Number(evt.target.value))}
            />
          </div>
          <div className='control'>
            <div className='label'>
              Chance of Spreading (1 in)
            </div>
            <input
              className='value'
              value={fixedProbabilityOfSpread}
              onChange={(evt) => setFixedProbabilityOfSpread(Number(evt.target.value))}
            />
          </div>
          <div className='control'>
            <div className='label'>
              Number of Daily Personal Interactions
            </div>
            <input
              className='value'
              value={fixedInterpersonalInteractions}
              onChange={(evt) => setFixedInterpersonalInteractions(Number(evt.target.value))}
            />
          </div>
        </div>
        <div className='video'>
          <YouTube
            videoId='eejhwa-OzEo'
            opts={{
              width: '500',
              height: '200',
            }}
          />
        </div>
      </div>
    </div>
    <AreaChart
      width={1200}
      height={400}
      data={simulatedDays}
      syncId="anyId"
      margin={{
        top: 10, right: 30, left: 100, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis />
      <YAxis dataKey="totalCases" />
      <Tooltip />
      {/* <Area type="monotone" dataKey="totalIncreaseFactor" /> */}
      {/* TODO convert the rest of these to i18n */}
      <Area type="monotone" dataKey={GROWTH_FACTOR} name={languageRef[GROWTH_FACTOR].name} />
      <Area type="monotone" dataKey="totalCases" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="activeCases" stroke="#FF84d8" fill="#FF84d8" />
      <Area type="monotone" dataKey="totalFatalities" stroke="#FF0000" fill="#FF0000" />
      <Area type="monotone" dataKey="newCases" stroke="#88FFd8" fill="#88FFd8" />
    </AreaChart>
  </div>;
}

export default withRouter(RootView);
