# js-threejs-atua-website

An initial experiment to put a 3D model of Tāwhirimātea into our Atua-ar.herokuapp.com website.

We built an augmented reality application of Tāwhirimātea using Mapbox, Unity and ARKit for iOS. We built the atua-ar website to explain the concept. But it just doesn't demonstrate it well enough with a 2D version of Tāwhirimātea. So why not use three.js to import the same 3D model we used in the AR app, into the website.

I needed im import the .fbx and export it with colours as a .dae file from Blender. The import the model into three.js using Collada Loader. 

Getting the background .svg in there was tricky. Backgrounds are just pictures that are expected to repeat. Their proportions need to be divisible by 2. You load the .svg as a texture and then paint the mesh over the terrain.

Ideally we would have a giant background image in future so the user could rotate around the whole Wellington scene to view Tāwhirimātea from each angle.

The goal is to animate the Tāwhirimātea 3D object so his hair and clothing respond to live weather data from an api, which is what the AR app did. The user can then move him aroudn and his hair and clothing will still be blowing in the right direction, with the intensity, to match the current force and direction of the wind. Users can then check out the website or the AR app to get a sense of what the weather is doing ,from the God of Wind himself.
