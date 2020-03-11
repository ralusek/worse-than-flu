import React, { useMemo, useState } from 'react';

// Types
import { Language } from 'constants/i18n/types';

// Data
import predictThePestilentFuture from 'utils/predictThePestilentFuture';

// Custom Hooks
import { useWindowDimensions } from './hooks';

// Helpers
import { getChartDimensions, getYouTubeVideoDimensions } from './helpers';

// Constants
import languageRef from '../constants/i18n/languageRef';
import { LANGUAGE } from '../constants/i18n';

// Views
import RootView from './rootView';
import { SimulatedDay } from 'utils/predictThePestilentFuture/types';


/**
 * RootContainer.
 */
function RootContainer() {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const { chartDimensions, youtubeVideoDimensions } = useMemo(() => {
    return {
      chartDimensions: getChartDimensions({ windowHeight, windowWidth }),
      youtubeVideoDimensions: getYouTubeVideoDimensions({ windowHeight, windowWidth }),
    };
  }, [windowHeight, windowWidth]);

  const [daysToSimulate, setDaysToSimulate] = useState(600);
  const [fixedProbabilityOfSpread, setFixedProbabilityOfSpread] = useState(220);
  const [fixedInterpersonalInteractions, setFixedInterpersonalInteractions] = useState(12);

  const [language, setLanguage] = useState<Language>(LANGUAGE.ENGLISH);
  const activeLanguageRef = useMemo(() => languageRef[language], [language]);

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
    chartDimensions={chartDimensions}
    youtubeVideoDimensions={youtubeVideoDimensions}
    setDaysToSimulate={setDaysToSimulate}
    fixedProbabilityOfSpread={fixedProbabilityOfSpread}
    setFixedProbabilityOfSpread={setFixedProbabilityOfSpread}
    fixedInterpersonalInteractions={fixedInterpersonalInteractions}
    setFixedInterpersonalInteractions={setFixedInterpersonalInteractions}
  />;
}

export default RootContainer;
