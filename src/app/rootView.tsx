import React from 'react';
import YouTube from 'react-youtube'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Constants
import * as CONTROL_LABEL from 'constants/controlLabels';
import * as SIMULATED_DAY_PROPERTY from 'constants/simulatedDayProperties';
import * as TITLE from 'constants/titles';
import { Language, LANGUAGES } from '../constants';

// Utils
import { SimulatedDay } from 'utils/predictThePestilentFuture/types';

// Styles
import './rootStyles';

// Types
import { Translation } from '../constants/i18n/types';

type Props = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translation;
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
  translations,
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
          translations[TITLE.ROOT_VIEW].name
        }
      </div>
      <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
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
      <div className="controls-container">
        <div className="controls">
          <div className="control">
            <div className="label">
              {
                translations[CONTROL_LABEL.DAYS_TO_SIMULATE].name
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
                translations[CONTROL_LABEL.CHANCE_OF_SPREADING].name
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
                translations[CONTROL_LABEL.NUMBER_OF_DAILY_PERSONAL_INTERACTIONS].name
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
    <AreaChart
      width={chartDimensions.width}
      height={chartDimensions.height}
      data={simulatedDays}
      syncId="anyId"
      margin={{
        top: 10, right: 30, left: 100, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis />
      <YAxis dataKey="totalCases" width={40} />
      <Tooltip />
      {/* <Area type="monotone" dataKey="totalIncreaseFactor" /> */}
      <Area
        type="monotone"
        dataKey={SIMULATED_DAY_PROPERTY.GROWTH_FACTOR}
        name={translations[SIMULATED_DAY_PROPERTY.GROWTH_FACTOR].name}
      />
      <Area
        type="monotone"
        dataKey={SIMULATED_DAY_PROPERTY.TOTAL_CASES}
        name={translations[SIMULATED_DAY_PROPERTY.TOTAL_CASES].name}
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey={SIMULATED_DAY_PROPERTY.ACTIVE_CASES}
        name={translations[SIMULATED_DAY_PROPERTY.ACTIVE_CASES].name}
        stroke="#FF84d8"
        fill="#FF84d8"
      />
      <Area
        type="monotone"
        dataKey={SIMULATED_DAY_PROPERTY.TOTAL_FATALITIES}
        name={translations[SIMULATED_DAY_PROPERTY.TOTAL_FATALITIES].name}
        stroke="#FF0000"
        fill="#FF0000"
      />
      <Area
        type="monotone"
        dataKey={SIMULATED_DAY_PROPERTY.NEW_CASES}
        name={translations[SIMULATED_DAY_PROPERTY.NEW_CASES].name}
        stroke="#88FFd8"
        fill="#88FFd8"
      />
    </AreaChart>
  </div>;
}

export default withRouter(RootView);
