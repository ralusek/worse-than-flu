import React, { useMemo, useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

// Types
import { Language } from 'constants/i18n/types';

// Data
import predictThePestilentFuture from 'utils/predictThePestilentFuture';

// Constants
import languageRef from '../constants/i18n/languageRef';
import { LANGUAGE } from '../constants/i18n';

// Views
import RootView from './rootView';


/**
 * RootContainer.
 */
function RootContainer() {
  
  const [startingNumberOfCases, setStartingNumberOfCases] = useState(150000);
  const [daysToSimulate, setDaysToSimulate] = useState(600);
  const [fixedProbabilityOfSpread, setFixedProbabilityOfSpread] = useState(220);
  const [fixedInterpersonalInteractions, setFixedInterpersonalInteractions] = useState(12);
  const [zoomRange, setZoomRange] = useState<[number, number]>([0, 0]);
  const [debouncedZoomRange, setDebouncedZoomRange] = useState<[number, number]>(zoomRange);
  const setZoomRangeDebounced = useCallback(debounce((newZoomRange: [number, number]) => {
    setDebouncedZoomRange(newZoomRange);
  }, 500, { maxWait: 2000 }), []);
  const setZoomRangeCombined = useCallback((newZoomRange: [number, number]) => {
    setZoomRange(newZoomRange);
    setZoomRangeDebounced(newZoomRange);
  }, []);

  const [language, setLanguage] = useState<Language>(LANGUAGE.ENGLISH);
  const activeLanguageRef = useMemo(() => languageRef[language], [language])

  // View properties
  const [videoContainerWidth, setVideoContainerWidth] = useState(0);
  const [chartContainerWidth, setChartContainerWidth] = useState(0);
  

  const simulatedDays = useMemo(() => {
    return predictThePestilentFuture({
      daysToSimulate,
      fixedProbabilityOfSpread: 1 / fixedProbabilityOfSpread,
      fixedInterpersonalInteractions,
      startingNumberOfCases,
    });
  }, [startingNumberOfCases, daysToSimulate, fixedProbabilityOfSpread, fixedInterpersonalInteractions]);

  const zoomedSimulatedDays = useMemo(() => {
    return (simulatedDays || []).slice(debouncedZoomRange[0], debouncedZoomRange[1]);
  }, [simulatedDays, debouncedZoomRange]);

  useEffect(() => {
    const lower = zoomRange[0] <= simulatedDays.length ? zoomRange[0] : 0;
    const upper = zoomRange[1] && (zoomRange[1] <= simulatedDays.length) ? zoomRange[1] : simulatedDays.length;
    setZoomRange([lower, upper]);
    setDebouncedZoomRange([lower, upper]);
  }, [simulatedDays.length]);

  return <RootView
    language={language}
    setLanguage={setLanguage}
    languageRef={activeLanguageRef}
    simulatedDays={simulatedDays}
    zoomedSimulatedDays={zoomedSimulatedDays}
    zoomRange={zoomRange}
    setZoomRange={setZoomRangeCombined}
    startingNumberOfCases={startingNumberOfCases}
    setStartingNumberOfCases={setStartingNumberOfCases}
    daysToSimulate={daysToSimulate}
    setDaysToSimulate={setDaysToSimulate}
    fixedProbabilityOfSpread={fixedProbabilityOfSpread}
    setFixedProbabilityOfSpread={setFixedProbabilityOfSpread}
    fixedInterpersonalInteractions={fixedInterpersonalInteractions}
    setFixedInterpersonalInteractions={setFixedInterpersonalInteractions}
    // View Props
    chartContainerWidth={chartContainerWidth}
    setChartContainerWidth={setChartContainerWidth}
    videoContainerWidth={videoContainerWidth}
    setVideoContainerWidth={setVideoContainerWidth}
  />;
}

export default RootContainer;
