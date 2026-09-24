# Shoe Slider React Task

A React + JavaScript recreation of the supplied shoe product reference.

## Run
```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Main interactions
- Product shoe enters from the right when the product changes.
- The previous visual leaves the scene and the new visual settles into the same position.
- Click the three angle thumbnails to animate a new shoe image into the stage.
- Click sizes to change the selected size.
- Click **ADD TO BAG** to increment the bag counter and show a toast.
- Click the bottom product cards or use **Left / Right Arrow** keys to switch products.
- Press **Enter** to add the current size to the bag.

## Where to edit
- Product names, prices, sizes and image paths: `src/main.jsx` → `PRODUCTS`
- Animation, layout and responsive design: `src/styles.css`
- Shoe assets extracted from your supplied reference screenshots: `public/shoes/`

Replace the generated PNGs in `public/shoes/` with your own transparent shoe PNGs if your college task requires original product images.
