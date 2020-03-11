import React, { useMemo, useState } from 'react';

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
  

  const [daysToSimulate, setDaysToSimulate] = useState(600);
  const [fixedProbabilityOfSpread, setFixedProbabilityOfSpread] = useState(220);
  const [fixedInterpersonalInteractions, setFixedInterpersonalInteractions] = useState(12);

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
    });
  }, [daysToSimulate, fixedProbabilityOfSpread, fixedInterpersonalInteractions]);

  return <RootView
    language={language}
    setLanguage={setLanguage}
    languageRef={activeLanguageRef}
    simulatedDays={simulatedDays}
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
