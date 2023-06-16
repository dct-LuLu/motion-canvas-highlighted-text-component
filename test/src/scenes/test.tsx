import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { HighlightedTxt } from '@components/HighlightedTextComponent';
import { Gradient } from '@motion-canvas/2d/lib/partials';
import { createRef, range, Reference, useScene } from '@motion-canvas/core/lib/utils';
import { Line, Rect, Txt } from '@motion-canvas/2d/lib/components';
import { all, delay, loop, waitUntil, waitFor, sequence } from '@motion-canvas/core/lib/flow';
import { slideTransition } from '@motion-canvas/core/lib/transitions';
import { Direction } from '@motion-canvas/core/lib/types';
import { CodeBlock, insert, lines, word, remove } from '@motion-canvas/2d/lib/components/CodeBlock';
import { easeOutCubic, easeOutBack, easeInOutCubic } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
  
  const easy = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={easy} text={"Fancy?"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono'/>);

  yield* slideTransition(Direction.Bottom, 1);
  const assign = createRef<CodeBlock>();
	view.add(
		<CodeBlock
			ref={assign}
			fontSize={25}
			code={""}
			lineHeight={30}
			opacity={1}
      position={[0, 200]}
		/>
	);

  yield* assign().edit(2)`${insert(`const easy = createRef<HighlightedTxt>();\nview.add(<HighlightedTxt ref={easy} text={"Fancy?"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono'/>);`)}`;

  yield* waitFor(1);

  yield* assign().edit(2)`const easy = createRef<HighlightedTxt>();\nview.add(<HighlightedTxt ref={easy} text={"Fancy?"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono'/>);${insert(`\nyield* easy().text("Yes indeed!", 1);`)}`;
  yield* easy().text("Yes indeed!", 1); 
  
  yield* waitFor(1);

  yield assign().opacity(0,1)
  yield easy().opacity(0,1)
  
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
  
  yield* waitFor(1);
  const j = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={j} text={"Hi"} fontSize={50} fill={gradient} fontFamily='JetBrains Mono'/>);
  yield* slideTransition(Direction.Bottom, 1);
  yield* waitFor(1);
  yield* j().text("Hi, I think this is pretty neat", 1)
  yield* waitFor(1); 
  yield* j().text("", 1)
  yield* waitFor(1);

  //const incr = new Gradient
  yield* j().text("Or so I thought", 1)
  yield* waitFor(1);
  yield* j().fontSize(30, 1)
  yield* waitFor(1);
  yield* j().fontSize(70, 1)
  yield* waitFor(1);
  yield* j().opacity(0,1)
});
