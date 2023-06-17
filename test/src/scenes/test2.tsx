import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { HighlightedTxt } from '@components/HighlightedTextComponent';
import { Gradient } from '@motion-canvas/2d/lib/partials';
import { createRef } from '@motion-canvas/core/lib/utils';
import { waitFor } from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  
  // Rounded
  const basicHighlight = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={basicHighlight} text={"Bloop"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono'/>);
  yield* waitFor(.1);
  yield basicHighlight().opacity(0)

  // Squared
  const squareHigh = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={squareHigh} text={"Doodle"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono' roundedCorners={false}/>);
  yield* waitFor(.1);
  yield squareHigh().opacity(0)

  // Outlined squared
  const outlHigh = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={outlHigh} text={"Noodle"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono' roundedCorners={false} outlined={true}/>);
  yield* waitFor(.1);
  yield outlHigh().opacity(0)

  // Outlined rounded
  const boutHigh = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={boutHigh} text={"Wobble"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono' outlined={true}/>);
  yield* waitFor(.1);
  yield boutHigh().opacity(0)

  //Two colors
  const doubleHigh = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={doubleHigh} text={"Gobble"} fontSize={50} fill={"#bbbf"} fontFamily='JetBrains Mono' fill2={"#88fbf5"}/>);
  yield* waitFor(.1);
  yield doubleHigh().opacity(0)

  //Gradient
  const gradient = new Gradient({
    type: 'radial',
    from: -50,
    to: -100,
    toRadius: 210,
    stops: [
      {offset: 0, color: '#f3303f'},
      {offset: 0.6, color: '#FFC66D'},
      {offset: 1, color: '#4aaaf1'},
    ],
  });
  const gradHigh = createRef<HighlightedTxt>();
  view.add(<HighlightedTxt ref={gradHigh} text={"Puddle"} fontSize={50} fill={gradient} fontFamily='JetBrains Mono'/>);
  yield* waitFor(.1);
  yield gradHigh().opacity(0)


});
