import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useEffect } from 'react';

export default function RiveTest() {
  const { RiveComponent, rive } = useRive({
    src: '/rive/spark_case_studie_elements.riv',
    artboard: 'Spark Active 1',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (rive) {
      rive.resizeDrawingSurfaceToCanvas();
    }
  }, [rive]);

  return (
    <div style={{ width: '393px', height: '393px', background: '#DEE1FF', borderRadius: '10px' }}>
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />
    </div>
  );
}
