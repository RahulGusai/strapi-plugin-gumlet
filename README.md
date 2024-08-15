# Strapi Gumlet Video Uploader

This plugin provides the ability to upload and manage videos to gumlet.

<h3>Steps to use in your strapi project</h3>
1. Clone this repository in your system
<br>
2. Go to the strapi's project root directory.
<br>
3. Move the strapi-plugin-gumlet directory to /src/plugins/ directory.
<br>
4. Add the following code in the config/plugins.js.
<pre>'strapi-plugin-gumlet': {
    enabled: true,
    resolve: './src/plugins/strapi-plugin-gumlet'
  },</pre>

5. Go go the /src/plugins/strapi-plugin-gumlet/ directory and run following commands.
<pre>
  npm install
  npm run build
</pre>
6. Rebuild your strapi project by running npm run build in the root directory of your project and you are good to go.
