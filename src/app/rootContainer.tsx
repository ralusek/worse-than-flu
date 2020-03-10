import React, { useMemo, useState } from 'react';

// Data
import predictThePestilentFuture from 'utils/predictThePestilentFuture';

// Custom Hooks
import { useWindowDimensions } from './hooks';

// Helpers
import { getChartDimensions, getYouTubeVideoDimensions } from './helpers';

// Constants
import i18nTranslations from '../constants/i18n';
import { Language } from '../constants';

// Views
import RootView from './rootView';


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

  const [language, setLanguage] = useState(Language.English);
  const translations = useMemo(() => i18nTranslations[language], [language]);

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
    translations={translations}
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
