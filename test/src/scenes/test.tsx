import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {waitFor} from '@motion-canvas/core/lib/flow';
import { HighlightedTxt } from '@components/HighlightedTextComponent';
import { Gradient } from '@motion-canvas/2d/lib/partials';
import { createRef, range, Reference, useScene } from '@motion-canvas/core/lib/utils';

export default makeScene2D(function* (view) {
  // Create your animations here

  const grad = "#f5555f"
  const gradient = new Gradient({
    type: 'radial',
    from: -100,
    to: -100,
    toRadius: 320,
    stops: [
      {offset: 0, color: '#f3303f'},
      {offset: 0.6, color: '#FFC66D'},
      {offset: 1, color: '#4aaaf1'},
    ],
  });

  const j = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={j} text={"Test 1 2 3"} fontSize={50} fill={gradient} fontFamily='JetBrains Mono'/>);
  yield* waitFor(1);
  yield j().text("Test 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", 1)
  yield waitFor(1); 
  yield* waitFor(1);
  yield* waitFor(1);


  yield* waitFor(5);
});
