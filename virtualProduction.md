---
layout: post
title: Virtual Production

show_tile: false
---

<ul class="actions">
	<li><a href="experimentationNeural.html" class="button small">Go back and see more Neural Rendering projects</a></li>
</ul>

I am trying to create new ways of leveraging realtime rendering, AR/VR, and other graphics methods to enable virtual production. I have experimented with using Unity and Unreal for humans and backgrounds, as well as currently experimenting with NeRFs for compositing and relighting people/objects/meshes/other NeRFs.

### Virtual Backgrounds/Props

In early 2020 for a film project for my English class, I created virtual sets in Blender and Unity, and created a Spark AR filter to virtual composite myself, as well as my team in the 3D environment (due to online school we had to work remotely). The AR allowed me to enable camera tracking and added a greater sense of depth rather than a traditional green screen effect. 


<center>
Video of the Spark AR test of an 3D office room captured realtime on an iPhone
<br>
<video id="v0" width="60%" autoplay loop muted controls>
    <source src="assets/videos/sparkAROffice_vp.mp4" type="video/mp4" />
</video>
</center>

I used Unity for the background scenes with dynamic camera movement and close up of animated virtual props for the final render of the background.

<center>
<video id="v0" width="60%" autoplay loop muted controls>
    <source src="assets/videos/unity_vp_demo.mp4" type="video/mp4" />
</video>
</center>


<center>
Virtual Realtime AR Prop using Spark AR
<br>
<a class="image">
	<img src="{% link assets/images/phoneAR.PNG %}" alt="" data-position="25% 25%" />
</a>
</center>

## Virtual actors (Deepfake Over Unreal Engine MetaHuman)

In summer 2021, I experimented with creating virtual actors using metahumans after seeing the realism in the real time rendering of Unreal Engine 5. Due to the limited customization of the face of the MetaHumans in the Creator web tool, I thought about using deep fakes to create my own scenes and try to re-create movie scenes.

As an experiment, I created a MetaHuman to resemble myself and tried DeepFaceLab for the first time and created a deepfake of myself. I then deepfaked my face over the MetaHuman's face. I found the results not ideal, but better than I expected.

<center>
<video id="v0" width="60%" autoplay loop muted controls>
    <source src="assets/videos/myself_result.mp4" type="video/mp4" />
</video>
</center>

Next, I replicated the process to create a virtual Indiana Jones, by creating another MetaHuman resembling him and deepfaking his face over it. Interestingly, I found that some facial expressions different across the deepfake and original MetaHuman facial animations, which I found showed the actor's resemblance in the movements, despite the different motion capture actor's expressions.

<center>
Training (220k iters) using DeepFaceLab
<br>
<a class="image">
	<img src="{% link assets/images/deepfacelabIndy.PNG %}" alt="" data-position="25% 25%" height=306px width=545px />
</a>
</center>


<center>
Final Result
<br>
<video id="v0" width="60%" autoplay loop muted controls>
    <source src="assets/videos/indy_df_cropped.mp4" type="video/mp4" />
</video>
</center>

Next, I wanted to develop this into a small film like scene. I tried to import this into Unreal 5 with a Nanite enabled detailed Quixel Megascan environment, but unfortunately, my laptop could not handle the scene and would often crash, so I was unable to animate and create this. However, to edit the MetaHuman and add an Indy hat, I used Snap's LenStudio and created a small AR effect that would composite a hat on the MetaHuman.

<center>
<video id="v0" width="60%" autoplay loop muted controls>
    <source src="assets/videos/indy_df_hat_cropped.mp4" type="video/mp4" />
</video>
</center>

Despite the low performance of the AR effects, I think that with more power, these real time editors can be used to simplify a lot of work needed to composite or relight the objects/actors using AI/ML.

Later, I explored how to use light fields and how to composite the deepfaked metahuman actors into them to create realistic film quality shots. In early 2022, I found that NeRFs would be able to achieve this, and since then I have been experimenting with how to incorporate these systems together. I believe that compositing actors or 3D meshes can be achieved well with NeRFs given that the radiance of every point is able to be computed. I also believe that diffusion models can be used to add global illumination and other environmental lighting onto composited objects to create intelligent relighting systems.

<ul class="actions">
	<li><a href="experimentationNeural.html" class="button small">Go back and see more Neural Rendering projects</a></li>
</ul>
