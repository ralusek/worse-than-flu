import React from 'react';
import YouTube from 'react-youtube'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend } from 'recharts';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';
import { Range } from 'rc-slider';

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
import 'rc-slider/assets/index.css';

type Props = {
  language: Language;
  setLanguage: (lang: Language) => void;
  languageRef: Translation;
  simulatedDays: SimulatedDay[];
  zoomedSimulatedDays: SimulatedDay[];
  zoomRange: [number, number];
  setZoomRange: (zoomRange: [number, number]) => void;
  startingNumberOfCases: number;
  setStartingNumberOfCases: (startingNumberOfCases: number) => void;
  daysToSimulate: number;
  setDaysToSimulate: (daysToSimulate: number) => void;
  fixedProbabilityOfSpread: number;
  setFixedProbabilityOfSpread: (fixedProbabilityOfSpread: number) => void;
  fixedInterpersonalInteractions: number;
  setFixedInterpersonalInteractions: (fixedInterpersonalInteractions: number) => void;
  // View props
  chartContainerWidth: number;
  setChartContainerWidth: (width: number) => void;
  videoContainerWidth: number;
  setVideoContainerWidth: (width: number) => void;
} & RouteComponentProps;


/**
 * RootView.
 */
function RootView({
  language,
  setLanguage,
  languageRef,
  simulatedDays,
  zoomedSimulatedDays,
  zoomRange,
  setZoomRange,
  startingNumberOfCases,
  setStartingNumberOfCases,
  daysToSimulate,
  setDaysToSimulate,
  fixedProbabilityOfSpread,
  setFixedProbabilityOfSpread,
  fixedInterpersonalInteractions,
  setFixedInterpersonalInteractions,
  // View props
  videoContainerWidth,
  setVideoContainerWidth,
  chartContainerWidth,
  setChartContainerWidth,
}: Props) {
  return <div className="RootView">
    <div className="content-wrapper">
      <div className="header">
        <div className="title card">
          <div className="header-text">{
            languageRef[TITLE.ROOT_VIEW].name
          }</div>
          <div className="contrib">
            Want to help improve this tool? Please feel free at https://github.com/ralusek/worse-than-flu
          </div>
        </div>
        <div className="controls-container card">
          <div className="controls">
            <div className="control">
              <div className="label">
                {
                  languageRef[CONTROL_LABEL.STARTING_NUMBER_OF_CASES].name
                }
              </div>
              <input
                className="value"
                value={startingNumberOfCases}
                onChange={(evt) => setStartingNumberOfCases(Number(evt.target.value))}
              />
            </div>
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
            <ReactResizeDetector handleWidth
                                 refreshMode='debounce'
                                 refreshRate={500}
                                 onResize={(width) => setVideoContainerWidth(width)} />
            <YouTube
              videoId="J6h4ewePMgQ"
              opts={{
                width: String(videoContainerWidth),
                height: String(videoContainerWidth * 9 / 16),
              }}
            />
          </div>
        </div>
      </div>
      <div className='charts card'>
        <Range
          value={zoomRange}
          min={0}
          max={simulatedDays.length}
          onChange={(zoomRange: [number, number]) => setZoomRange(zoomRange)}
        />
        <ReactResizeDetector handleWidth
                             refreshMode='debounce'
                             refreshRate={500}
                             onResize={(width) => setChartContainerWidth(width)} />
        <AreaChart
          width={chartContainerWidth}
          height={chartContainerWidth * 9 / 16}
          data={zoomedSimulatedDays}
          syncId="anyId"
          margin={{
            top: 20, right: 0, left: 0, bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
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
          <Legend
            wrapperStyle={{
              bottom: 15
            }}
          />
          {/* <Area type="monotone" dataKey="totalIncreaseFactor" /> */}
          <Area
            type="monotone"
            dataKey={SIMULATED_DAY_PROPERTY.TOTAL_CASES}
            name={languageRef[SIMULATED_DAY_PROPERTY.TOTAL_CASES].name}
            stroke="#ADABAB"
            fill="#ADABAB"
          />
          <Area
            type="monotone"
            dataKey={SIMULATED_DAY_PROPERTY.ACTIVE_CASES}
            name={languageRef[SIMULATED_DAY_PROPERTY.ACTIVE_CASES].name}
            stroke="#B4B60D"
            fill="#B4B60D"
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
            stroke="#0FEAE0"
            fill="#0FEAE0"
          />
          <Area
            type="monotone"
            dataKey={SIMULATED_DAY_PROPERTY.GROWTH_FACTOR}
            name={languageRef[SIMULATED_DAY_PROPERTY.GROWTH_FACTOR].name}
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
          <option key={language} value={language}>
            {
              language
            }
          </option>
        ))
      }
      </select>
    </div>
  </div>;
}

export default withRouter(RootView);
