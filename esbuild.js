import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';

// esbuild build options
esbuild.build({
  entryPoints: ['./src/main.js'],
  bundle: true,
  minify: true,
  sourcemap: false,
  outfile: './public/build/bundle.js', // and bundle.css
  plugins: [
    sveltePlugin()
  ]
}).catch(e => {
  console.error(e);
});
