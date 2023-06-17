# Motion Canvas Highlighted Text Component


https://github.com/dct-LuLu/motion-canvas-highlighted-text-component/assets/69580109/6ee6955b-7d0f-4700-8fba-8c0c583fa719


Run `npm install @dct-lulu/motion-canvas-highlighted-text-component` in your motion canvas project

Then import the component in your scene like so:

```tsx
import { HighlightedTxt } from '@dct-lulu/motion-canvas-highlighted-text-component';
```


# Usage examples

Here are some examples demonstrating the usage of the component:

### Basic usage
To create a basic highlighted text component, use the following code:

```tsx
view.add(<HighlightedTxt text={"Bloop"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono'/>);
```
![RoundedFull](https://github.com/dct-LuLu/motion-canvas-highlighted-text-component/assets/69580109/a5b2dc52-8692-419a-b1d4-f2cf5fd21712)


### Square Highlight
If you prefer the highlight to have square corners, you can set the roundedCorners prop to false:

```tsx
view.add(<HighlightedTxt text={"Doodle"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono' roundedCorners={false}/>);
```
![SquaredFull](https://github.com/dct-LuLu/motion-canvas-highlighted-text-component/assets/69580109/3a0412c8-a824-4e04-96a9-81463018bfda)


### Rounded Outline
Instead of a full highlight, you can opt for an outline:

```tsx
view.add(<HighlightedTxt text={"Wobble"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono' outlined={true}/>);
```
![RoundedOutline](https://github.com/dct-LuLu/motion-canvas-highlighted-text-component/assets/69580109/3318e475-3819-4e80-80f7-bc1cafdc7eb3)


### Square Outline
For a combination of square corners and an outline, use the following code:

```tsx
view.add(<HighlightedTxt text={"Noodle"} fontSize={50} fill={"#f5555f"} fontFamily='JetBrains Mono' roundedCorners={false} outlined={true}/>);
```
![SquaredOutline](https://github.com/dct-LuLu/motion-canvas-highlighted-text-component/assets/69580109/f5d089ea-8cea-4b9a-888a-1f1d92db9085)


### Two colors
By default, the second fill color has less opacity and is the same as the first fill color
But you can specify two different fill colors using the fill1 and fill2 props:
```tsx
view.add(<HighlightedTxt text={"Gobble"} fontSize={50} fill={"#bbbf"} fontFamily='JetBrains Mono' fill2={"#88fbf5"}/>);
```
![TwoColors](https://github.com/dct-LuLu/motion-canvas-highlighted-text-component/assets/69580109/a022fa14-1fdd-42c7-a80b-792c29852754)


### Using Gradient

You can employ gradient filling by utilizing the following code snippets:

To begin, ensure that you import the following before executing the code:
```tsx
import { Gradient } from '@motion-canvas/2d/lib/partials';
```

This will enable you to utilize gradient filling functionality in your project.

```tsx
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

view.add(<HighlightedTxt text={"Puddle"} fontSize={50} fill={gradient} fontFamily='JetBrains Mono'/>);
```
![Gradient](https://github.com/dct-LuLu/motion-canvas-highlighted-text-component/assets/69580109/32c39bee-0acd-4dfe-a568-5b2d6666cbb1)
