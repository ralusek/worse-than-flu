import React from 'react';
import YouTube from 'react-youtube'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Types
import { SimulatedDay } from 'utils/predictThePestilentFuture/types';
import { Language, Translation } from '../constants/i18n/types';

// Constants
import * as CONTROL_LABEL from 'constants/controlLabels';
import * as SIMULATED_DAY_PROPERTY from 'constants/simulatedDayProperties';
import * as TITLE from 'constants/titles';
import { LANGUAGES } from '../constants/i18n';

// Utils
import millify from './helpers/configuredMillify';
import tooltipFormatter from './helpers/tooltipFormatter';

// Styles
import './rootStyles';

type Props = {
  language: Language;
  setLanguage: (lang: Language) => void;
  languageRef: Translation;
  simulatedDays: SimulatedDay[];
  daysToSimulate: number;
  chartDimensions: { height: number, width: number },
  youtubeVideoDimensions: { height: string, width: string },
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
  language,
  setLanguage,
  languageRef,
  simulatedDays,
  daysToSimulate,
  chartDimensions,
  youtubeVideoDimensions,
  setDaysToSimulate,
  fixedProbabilityOfSpread,
  setFixedProbabilityOfSpread,
  fixedInterpersonalInteractions,
  setFixedInterpersonalInteractions,
}: Props) {
  return <div className="RootView">
    <div className="header">
      <div className="title">
        {
          languageRef[TITLE.ROOT_VIEW].name
        }
      </div>
      <div className="controls-container">
        <div className="controls">
          <div className="control">
            <div className="label">
              {
                languageRef[CONTROL_LABEL.DAYS_TO_SIMULATE].name
              }
            </div>
            <input
              className="value"
              value={daysToSimulate}
              onChange={(evt) => setDaysToSimulate(Number(evt.target.value))}
            />
          </div>
          <div className="control">
            <div className="label">
              {
                languageRef[CONTROL_LABEL.CHANCE_OF_SPREADING].name
              }
            </div>
            <input
              className="value"
              value={fixedProbabilityOfSpread}
              onChange={(evt) => setFixedProbabilityOfSpread(Number(evt.target.value))}
            />
          </div>
          <div className="control">
            <div className="label">
              {
                languageRef[CONTROL_LABEL.NUMBER_OF_DAILY_PERSONAL_INTERACTIONS].name
              }
            </div>
            <input
              className="value"
              value={fixedInterpersonalInteractions}
              onChange={(evt) => setFixedInterpersonalInteractions(Number(evt.target.value))}
            />
          </div>
        </div>
        <div className="video">
          <YouTube
            videoId="eejhwa-OzEo"
            opts={youtubeVideoDimensions}
          />
        </div>
      </div>
    </div>
    <div className='charts'>
      <AreaChart
        width={chartDimensions.width}
        height={chartDimensions.height}
        data={simulatedDays}
        syncId="anyId"
        margin={{
          top: 20, right: 30, left: 30, bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          label={{
            value: languageRef[TITLE.DAYS].name,
            dy: 20
          }} />
        <YAxis
          dataKey="totalCases"
          unit={` ${languageRef[TITLE.PEOPLE].name}`}
          tickFormatter={
            (number) => millify(number)
          }
          width={150} />
        <Tooltip
          formatter={
            (value, prop, { dataKey }) => {
              const key = String(dataKey);
              // @ts-ignore
              return (key in tooltipFormatter) ? tooltipFormatter[key](value) : value;
            }
          }
        />
        {/* <Area type="monotone" dataKey="totalIncreaseFactor" /> */}
        <Area
          type="monotone"
          dataKey={SIMULATED_DAY_PROPERTY.GROWTH_FACTOR}
          name={languageRef[SIMULATED_DAY_PROPERTY.GROWTH_FACTOR].name}
        />
        <Area
          type="monotone"
          dataKey={SIMULATED_DAY_PROPERTY.TOTAL_CASES}
          name={languageRef[SIMULATED_DAY_PROPERTY.TOTAL_CASES].name}
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey={SIMULATED_DAY_PROPERTY.ACTIVE_CASES}
          name={languageRef[SIMULATED_DAY_PROPERTY.ACTIVE_CASES].name}
          stroke="#FF84d8"
          fill="#FF84d8"
        />
        <Area
          type="monotone"
          dataKey={SIMULATED_DAY_PROPERTY.TOTAL_FATALITIES}
          name={languageRef[SIMULATED_DAY_PROPERTY.TOTAL_FATALITIES].name}
          stroke="#FF0000"
          fill="#FF0000"
        />
        <Area
          type="monotone"
          dataKey={SIMULATED_DAY_PROPERTY.NEW_CASES}
          name={languageRef[SIMULATED_DAY_PROPERTY.NEW_CASES].name}
          stroke="#88FFd8"
          fill="#88FFd8"
        />
      </AreaChart>
    </div>
    <select
      className='select-language'
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
    >
      {
        LANGUAGES.map((language) => (
          <option value={language}>
            {
              language
            }
          </option>
        ))
      }
    </select>
  </div>;
}

export default withRouter(RootView);
