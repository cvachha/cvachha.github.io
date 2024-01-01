---
layout: post
title: NeRF Environment Creation System Proposal (2022)

show_tile: false
---

<ul class="actions">
	<li><a href="experimentationNeural.html" class="button small">Go back and see more Neural Rendering projects</a></li>
</ul>

## NeRF Environment Creation Concept

I would like to create a system to create NeRF based environments fully in VR. The main goal is to have a full system to Capture, Edit, and View large NeRF environments (composed synthetically and/or real). I drafted a mockup of a VR system that could allow a user to create a synthetic photorealistic environment by capturing, editing, and placing NeRFs all within VR. In this, the a guided AR or passthrough VR/MR experience could guide a user around a room to capture the environment in a bounding box, and the user could import this environment into the editor where the user could either combine existing NeRFs or create new synthetic NeRFs on the spot through voice or text. The system could also intelligently use natural language commands or outpaint/inpaint parts of the room.

### Capture
Currently, capturing a NeRF requires stabilized slow camera movement/orbiting around an object at a high resolution from multiple viewpoints and angles to capture the lighting all around an object/environment. However, for capturing environments, I find moving around a phone or camera sometimes problematic to ensure that I capture all of the environment. In my plan, I propose using a VR/AR/MR headset to capture the environment from its color passthrough cameras (or possibly with an additional depth camera) as well as leverage the headset's positional tracking to obtain the camera poses/transforms.

<center>
	<img src="{% link assets/images/nerf_capture_design.PNG %}" alt="" data-position="25% 25%" height=306px width=545px />
</center>

In my system, a user could designate a capture volume in a Mixed Reality/Augmented Reality view (similar to as setting up the Oculus guardian system). Then an AR HUD style system guides the user around the room and prompts the user where to move or look around to keep track of what the user has captured and to prompt for additional views if the object or environment is not fully captured. The wide angle lenses and multiple cameras on the HMDs can assist in creating a better NeRF than from a single phone camera, however, motion blur and sudden movement of the headset could be problematic. A 360 camera mounted on the headset could help with preventing the need for users to move their head too much. Even if there are parts of the room too hard to capture (like from the bottom angles), a diffusion model can add detail and views there (related to the neural completion system).

### Edit
The ability to edit the NeRF environment within VR allows for a multitude of possibilities in more intuitive creation and exploration. The user would be able to place additional NeRFs or meshes into the environment. Leveraging eye and hand tracking offered by VR can allow the user to more intuitively place objects in an environment as well as select volumes, objects, areas, or general spaces. 

Users can generate objects on the spot with text or voice to NeRF, where the request is sent to the cloud and outputs a NeRF (related work as DreamFusion/DreamFields). Voice interaction can allow the user to naturally use creation tools or the environment. For instance, a user can point or look at an empty wall in a room and say "place a door over here", and a synthetic NeRF of a door would appear at the optimal location matching the existing style of the room. Voice also allows for implicit references to objects or spaces: "place that chair to the right of the table".


Further NeRF editing tools would consist of slicing or cropping existing NeRFs either based on hand controls or voice. Current NeRF editing tools are limited to just slicing, however, this system would support editing semantic features of NeRFs such as colors, shapes, textures, or styles. For instance users could say, "change the color of this desk to white" or "modernize the style of this sofa". Additionally, object variations can be created.

<center>
	<img src="{% link assets/images/nerf_edit_design.PNG %}" alt="" data-position="25% 25%" height=306px width=545px />
</center>

This system would also support neurally complete partially captured NeRFs with diffusion models. Current problems with viewing NeRFs is that when the user steps slightly outside of the captured area or the input dataset does not properly cover all areas or angles of an object or environment, the NeRF falls apart and becomes blurry/cloudy. I propose using diffusion models to create additional views of an object to neurally complete it. Additionally the diffusion model can be used to add synthetic detail to an existing NeRF since captures are dependent on their dataset image resolution, and diffusion models can add texture or detail to obscured or objects taken at poor angles. Additionally, the ability to create extensions of NeRFs (analogous to outpainting for Dall-e) can improve the volumes as well as create additional NeRF content in the environment. Ideally a user could start with an empty room and say, "add a doorway into the living room here", and the system would create a fully furnished living room. Currently diffusion models can achieve this with 2D images, but I would like to explore expanding the capability to 3D environments.

### View
Viewing the fully constructed NeRF environment in VR comfortably (high frame rate, high resolution) as of now requires heavy optimization. I am currently exploring ways to this through using Google's Mobile NeRF (there is a Unity plugin to incorporate this method) or Luma Labs AI NeRFs to run VR NeRFs. The system should also be able to export and share these NeRF environments not only as walkable environments accessible on any VR headset, but also have a way to incorporate it by importing them into Unity or Unreal to add static (or possibly in the future dynamic) realistic environments. I would like to see a full pipeline for visual effects focused tools and integration with NeRFs and this creation system. Additionally, there can be a suite of basic filmmaking tools such as VR controlled camera control to allow for shot planning or even filming. Regarding visual effects, being able to composite people or objects into NeRFs is very promising since unlike a single HDR environment map, a NeRF captures the radiance everywhere in a volume. Therefore, relighting could be more realistic. Using neural relighting methods as presented by Google (Total Portrait Relighting) or NVidia, people can be composited into these NeRF environments instead of just HDR maps. Possibly as an optimized technique, a 360 video of HDR environment maps can be captured from a NeRF and a diffusion model can be used to fill in the gaps of the 360 capture where the NeRF did not capture. This can allow a person to be viewing a sunset obscured by a building next to a street light, and as the person moves around the building, the light effects on the person from the multiple light sources change in intensity while walking around.

### Slide Deck
<iframe src="assets/pdfs/NeRF Creation Plan.pdf" width="100%" height="500px">
</iframe>

<ul class="actions">
	<li><a href="experimentationNeural.html" class="button small">Go back and see more Neural Rendering projects</a></li>
</ul>
